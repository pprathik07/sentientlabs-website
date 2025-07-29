// scripts/compress-assets.js - Production compression script
import { promises as fs } from 'fs'
import { createGzip, createBrotliCompress } from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pipeline } from 'stream/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DIST_DIR = path.join(__dirname, '../dist')
const COMPRESSIBLE_EXTENSIONS = ['.js', '.css', '.html', '.json', '.svg', '.txt', '.xml']

async function getFiles(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      await getFiles(fullPath, files)
    } else if (COMPRESSIBLE_EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath)
    }
  }
  
  return files
}

async function compressFile(filePath, algorithm = 'gzip') {
  const ext = algorithm === 'gzip' ? '.gz' : '.br'
  const outputPath = filePath + ext
  
  try {
    const compressor = algorithm === 'gzip' 
      ? createGzip({ level: 9 }) 
      : createBrotliCompress({ 
          params: {
            [require('zlib').constants.BROTLI_PARAM_QUALITY]: 11,
            [require('zlib').constants.BROTLI_PARAM_SIZE_HINT]: (await fs.stat(filePath)).size
          }
        })
    
    await pipeline(
      createReadStream(filePath),
      compressor,
      createWriteStream(outputPath)
    )
    
    const originalSize = (await fs.stat(filePath)).size
    const compressedSize = (await fs.stat(outputPath)).size
    const ratio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
    
    console.log(`✓ ${algorithm.toUpperCase()}: ${path.relative(DIST_DIR, filePath)} (${ratio}% smaller)`)
    
  } catch (error) {
    console.error(`✗ Failed to compress ${filePath}:`, error.message)
  }
}

async function main() {
  try {
    console.log('🗜️  Starting asset compression...')
    
    const files = await getFiles(DIST_DIR)
    console.log(`Found ${files.length} compressible files`)
    
    // Compress files in parallel with both algorithms
    const compressionPromises = []
    
    for (const file of files) {
      compressionPromises.push(compressFile(file, 'gzip'))
      compressionPromises.push(compressFile(file, 'brotli'))
    }
    
    await Promise.allSettled(compressionPromises)
    
    // Create .htaccess for serving compressed files
    const htaccessContent = `
# Serve pre-compressed files
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Check for Brotli
    RewriteCond %{HTTP:Accept-Encoding} br
    RewriteCond %{REQUEST_FILENAME}\\.br -f
    RewriteRule ^(.*)$ $1.br [L]
    
    # Check for Gzip
    RewriteCond %{HTTP:Accept-Encoding} gzip
    RewriteCond %{REQUEST_FILENAME}\\.gz -f
    RewriteRule ^(.*)$ $1.gz [L]
</IfModule>

# Set correct content types for compressed files
<IfModule mod_mime.c>
    AddType text/css .css.gz
    AddType application/javascript .js.gz
    AddType text/html .html.gz
    AddType application/json .json.gz
    AddType image/svg+xml .svg.gz
    
    AddType text/css .css.br
    AddType application/javascript .js.br
    AddType text/html .html.br
    AddType application/json .json.br
    AddType image/svg+xml .svg.br
</IfModule>

# Set encoding headers
<IfModule mod_headers.c>
    <FilesMatch "\\.gz$">
        Header set Content-Encoding gzip
    </FilesMatch>
    
    <FilesMatch "\\.br$">
        Header set Content-Encoding br
    </FilesMatch>
</IfModule>
`
    
    await fs.writeFile(path.join(DIST_DIR, '.htaccess'), htaccessContent.trim())
    console.log('✅ Asset compression complete!')
    
    // Calculate total savings
    const stats = await Promise.all(files.map(async (file) => {
      const original = (await fs.stat(file)).size
      const gzipped = await fs.stat(file + '.gz').then(s => s.size).catch(() => original)
      const brotli = await fs.stat(file + '.br').then(s => s.size).catch(() => original)
      
      return { original, gzipped, brotli }
    }))
    
    const totals = stats.reduce((acc, curr) => ({
      original: acc.original + curr.original,
      gzipped: acc.gzipped + curr.gzipped,
      brotli: acc.brotli + curr.brotli
    }), { original: 0, gzipped: 0, brotli: 0 })
    
    const gzipSavings = ((totals.original - totals.gzipped) / totals.original * 100).toFixed(1)
    const brotliSavings = ((totals.original - totals.brotli) / totals.original * 100).toFixed(1)
    
    console.log(`\n📊 Compression Summary:`)
    console.log(`   Original: ${(totals.original / 1024).toFixed(1)} KB`)
    console.log(`   Gzipped: ${(totals.gzipped / 1024).toFixed(1)} KB (${gzipSavings}% savings)`)
    console.log(`   Brotli: ${(totals.brotli / 1024).toFixed(1)} KB (${brotliSavings}% savings)`)
    
  } catch (error) {
    console.error('❌ Compression failed:', error)
    process.exit(1)
  }
}

main()