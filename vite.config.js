import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  css: {
    postcss: './postcss.config.js'
  },
  
  build: {
    cssCodeSplit: false,
    minify: 'esbuild',
    sourcemap: false
  },
  
  server: {
    port: 5173,
    host: true
  },
  
  preview: {
    port: 4173,
    host: true
  }
})