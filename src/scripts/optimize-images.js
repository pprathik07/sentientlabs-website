// scripts/optimize-images.js
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../src/assets/images');
const outputDir = path.join(__dirname, '../public/optimized-images');

// Image optimization settings
const QUALITY_SETTINGS = {
  webp: { quality: 85, effort: 6 },
  jpeg: { quality: 85, progressive: true, mozjpeg: true },
  png: { quality: 85, compressionLevel: 9 }
};

const SIZES = [
  { suffix: '', width: null }, // Original size
  { suffix: '@2x', width: null }, // 2x for retina
  { suffix: '-lg', width: 1200 }, // Large screens
  { suffix: '-md', width: 800 },  // Medium screens
  { suffix: '-sm', width: 400 }   // Small screens
];

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputDir, filename) {
  const name = path.parse(filename).name;
  const results = [];

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    const { width: originalWidth, height: originalHeight } = metadata;

    for (const size of SIZES) {
      const targetWidth = size.width || originalWidth;
      const targetHeight = size.width ? Math.round((originalHeight * size.width) / originalWidth) : originalHeight;
      
      // Skip if target size is larger than original
      if (size.width && size.width > originalWidth) continue;

      let sharpInstance = sharp(inputPath);
      
      if (size.width) {
        sharpInstance = sharpInstance.resize(targetWidth, targetHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Generate WebP (priority format)
      const webpOutput = path.join(outputDir, `${name}${size.suffix}.webp`);
      await sharpInstance
        .clone()
        .webp(QUALITY_SETTINGS.webp)
        .toFile(webpOutput);
      
      // Generate optimized original format as fallback
      const ext = path.extname(filename).toLowerCase();
      const fallbackOutput = path.join(outputDir, `${name}${size.suffix}${ext}`);
      
      if (ext === '.jpg' || ext === '.jpeg') {
        await sharpInstance
          .clone()
          .jpeg(QUALITY_SETTINGS.jpeg)
          .toFile(fallbackOutput);
      } else if (ext === '.png') {
        await sharpInstance
          .clone()
          .png(QUALITY_SETTINGS.png)
          .toFile(fallbackOutput);
      }

      results.push({
        webp: webpOutput,
        fallback: fallbackOutput,
        size: size.suffix || 'original',
        dimensions: `${targetWidth}x${targetHeight}`
      });
    }

    return results;
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error);
    return [];
  }
}

async function generateImageMap() {
  const imageMap = {};
  const files = await fs.readdir(inputDir);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      const name = path.parse(file).name;
      const inputPath = path.join(inputDir, file);
      
      console.log(`Optimizing ${file}...`);
      const results = await optimizeImage(inputPath, outputDir, file);
      
      if (results.length > 0) {
        imageMap[name] = {
          original: file,
          optimized: results.reduce((acc, result) => {
            acc[result.size] = {
              webp: path.relative(path.join(__dirname, '../public'), result.webp),
              fallback: path.relative(path.join(__dirname, '../public'), result.fallback),
              dimensions: result.dimensions
            };
            return acc;
          }, {})
        };
      }
    }
  }

  // Save image map for runtime use
  const mapPath = path.join(__dirname, '../src/utils/imageMap.json');
  await fs.writeFile(mapPath, JSON.stringify(imageMap, null, 2));
  
  console.log(`Generated image map with ${Object.keys(imageMap).length} images`);
  return imageMap;
}

async function generateResponsiveImageComponent() {
  const componentCode = `// Auto-generated responsive image component
import { useState, useCallback } from 'react';
import imageMap from '../utils/imageMap.json';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  sizes = '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px',
  priority = false,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract image name from src
  const imageName = src?.split('/').pop()?.split('.')[0];
  const imageData = imageMap[imageName];

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Fallback to original image if optimization data not found
  if (!imageData || hasError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    );
  }

  const { optimized } = imageData;
  
  // Generate srcSet for WebP
  const webpSrcSet = Object.entries(optimized)
    .filter(([size, data]) => data.webp)
    .map(([size, data]) => {
      const width = data.dimensions.split('x')[0];
      return \`/\${data.webp} \${width}w\`;
    })
    .join(', ');

  // Generate srcSet for fallback
  const fallbackSrcSet = Object.entries(optimized)
    .filter(([size, data]) => data.fallback)
    .map(([size, data]) => {
      const width = data.dimensions.split('x')[0];
      return \`/\${data.fallback} \${width}w\`;
    })
    .join(', ');

  return (
    <picture className={className}>
      {/* WebP source with responsive sizes */}
      <source
        srcSet={webpSrcSet}
        sizes={sizes}
        type="image/webp"
      />
      
      {/* Fallback source with responsive sizes */}
      <source
        srcSet={fallbackSrcSet}
        sizes={sizes}
      />
      
      {/* Fallback img element */}
      <img
        src={\`/\${optimized.original?.fallback || optimized['']?.fallback}\`}
        alt={alt}
        loading={priority ? 'eager' : loading}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;`;

  const componentPath = path.join(__dirname, '../src/components/ResponsiveImage.jsx');
  await fs.writeFile(componentPath, componentCode);
  console.log('Generated ResponsiveImage component');
}

async function main() {
  try {
    console.log('Starting image optimization...');
    
    // Ensure output directory exists
    await ensureDir(outputDir);
    
    // Generate optimized images and map
    await generateImageMap();
    
    // Generate responsive image component
    await generateResponsiveImageComponent();
    
    console.log('Image optimization complete!');
    console.log(`Optimized images saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('Error during image optimization:', error);
    process.exit(1);
  }
}

main();