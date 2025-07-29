// src/utils/performance.js - Performance optimization utilities

// Debounce function for performance-critical operations
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle function for scroll and resize events
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// RequestAnimationFrame-based throttle for smooth animations
export const rafThrottle = (func) => {
  let rafId = null;
  return function(...args) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    }
  };
};

// Intersection Observer with performance optimizations
export const createOptimizedObserver = (callback, options = {}) => {
  const defaultOptions = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(
    throttle(callback, 100), // Throttle callback to prevent excessive firing
    defaultOptions
  );
};

// Lazy loading utility for images
export const lazyLoadImage = (img, src, srcset = null, sizes = null) => {
  return new Promise((resolve, reject) => {
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      // Use requestAnimationFrame for smooth transition
      requestAnimationFrame(() => {
        img.src = src;
        if (srcset) img.srcset = srcset;
        if (sizes) img.sizes = sizes;
        img.classList.add('loaded');
        resolve(img);
      });
    };
    
    imageLoader.onerror = reject;
    imageLoader.src = src;
    if (srcset) imageLoader.srcset = srcset;
  });
};

// Preload critical resources
export const preloadResource = (href, as, type = null, crossorigin = null) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    if (crossorigin) link.crossOrigin = crossorigin;
    
    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Failed to preload ${href}`));
    
    document.head.appendChild(link);
  });
};

// Dynamic import with error handling and retry
export const importWithRetry = async (importFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await importFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

// Bundle splitting utility
export const loadChunk = (chunkName) => {
  return importWithRetry(() => import(/* webpackChunkName: "[request]" */ `../components/${chunkName}.jsx`));
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: name,
        value: Math.round(end - start)
      });
    }
    
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  };
};

// Memory cleanup utility
export const cleanupRefs = (...refs) => {
  refs.forEach(ref => {
    if (ref.current) {
      ref.current = null;
    }
  });
};

// Optimized scroll to function
export const smoothScrollTo = (element, offset = 0, duration = 800) => {
  if (!element) return Promise.resolve();
  
  return new Promise((resolve) => {
    const start = window.pageYOffset;
    const target = element.offsetTop - offset;
    const distance = target - start;
    const startTime = performance.now();
    
    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic bezier easing
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress
        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
      
      window.scrollTo(0, start + distance * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        resolve();
      }
    };
    
    requestAnimationFrame(animateScroll);
  });
};

// Viewport detection utilities
export const isInViewport = (element, threshold = 0.1) => {
  const rect = element.getBoundingClientRect();
  const height = window.innerHeight || document.documentElement.clientHeight;
  const width = window.innerWidth || document.documentElement.clientWidth;
  
  const verticalThreshold = height * threshold;
  const horizontalThreshold = width * threshold;
  
  return (
    rect.top >= -verticalThreshold &&
    rect.left >= -horizontalThreshold &&
    rect.bottom <= height + verticalThreshold &&
    rect.right <= width + horizontalThreshold
  );
};

// Device detection utilities
export const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Resource hints utility
export const addResourceHints = (hints) => {
  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.as) link.as = hint.as;
    if (hint.type) link.type = hint.type;
    if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
    document.head.appendChild(link);
  });
};

// Critical CSS inlining utility
export const inlineCriticalCSS = (css) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Web Vitals tracking
export const trackWebVitals = () => {
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (typeof gtag !== 'undefined') {
        gtag('event', 'LCP', {
          value: Math.round(lastEntry.startTime),
          custom_parameters: {
            metric_name: 'largest_contentful_paint'
          }
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'FID', {
            value: Math.round(entry.processingStart - entry.startTime),
            custom_parameters: {
              metric_name: 'first_input_delay'
            }
          });
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'CLS', {
          value: Math.round(clsValue * 1000),
          custom_parameters: {
            metric_name: 'cumulative_layout_shift'
          }
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  // Track Web Vitals
  trackWebVitals();
  
  // Track page load time
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_load_time', {
        value: loadTime,
        custom_parameters: {
          metric_name: 'page_load'
        }
      });
    }
  });
  
  // Track DOM Content Loaded
  document.addEventListener('DOMContentLoaded', () => {
    const domTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    if (typeof gtag !== 'undefined') {
      gtag('event', 'dom_content_loaded', {
        value: domTime,
        custom_parameters: {
          metric_name: 'dom_ready'
        }
      });
    }
  });
};