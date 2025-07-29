// utils/imageOptimization.js

/**
 * Optimized Image Component with lazy loading and modern formats
 */
import { memo, useState, useEffect, useRef } from 'react';

const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  placeholder = 'blur',
  quality = 85,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState(priority ? src : '');
  const imgRef = useRef(null);

  // Convert images to WebP format if supported
  const getOptimizedSrc = (originalSrc) => {
    if (typeof window === 'undefined') return originalSrc;
    
    const supportsWebP = document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0;
    
    if (supportsWebP && originalSrc.includes('.')) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setImageSrc(getOptimizedSrc(src));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src, priority]);

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedSrc(src);
      document.head.appendChild(link);
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // Fallback to original format if WebP fails
    setImageSrc(src);
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      
      {/* Actual Image */}
      {isInView && imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{
            objectFit: 'cover',
            aspectRatio: width && height ? `${width}/${height}` : 'auto',
          }}
          {...props}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

/**
 * Font loading optimization
 */
export const optimizeFonts = () => {
  // Preload critical fonts
  const preloadFont = (fontPath, fontWeight = '400') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = fontPath;
    link.crossOrigin = 'anonymous';
    link.type = 'font/ttf';
    document.head.appendChild(link);
  };

  // Preload Gilroy font
  preloadFont('./assets/fonts/Gilroy-Regular.ttf');
};

/**
 * Critical CSS inlining
 */
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    /* Critical above-the-fold styles */
    body { 
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      background: #000; 
      color: #fff; 
      margin: 0; 
      -webkit-font-smoothing: antialiased;
    }
    .hero-container { 
      min-height: 100vh; 
      background: linear-gradient(135deg, #000 0%, #111 100%);
    }
    .nav-container { 
      position: fixed; 
      top: 0; 
      left: 0; 
      right: 0; 
      z-index: 1000;
      backdrop-filter: blur(10px);
    }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};

/**
 * Resource preloading utilities
 */
export const preloadResources = () => {
  // Preload critical images
  const criticalImages = [
    './assets/images/logo - sentientlabs.png',
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical scripts
  const criticalScripts = [
    'https://cdnjs.cloudflare.com/ajax/libs/framer-motion/10.16.4/framer-motion.min.js',
  ];

  criticalScripts.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Service Worker for caching
 */
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful');
      return registration;
    } catch (error) {
      console.log('ServiceWorker registration failed');
    }
  }
};

export default OptimizedImage;