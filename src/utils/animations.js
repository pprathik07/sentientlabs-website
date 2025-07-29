import { useState, useEffect } from 'react'

// Cached reduced motion preference
let cachedPrefersReducedMotion = null

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (cachedPrefersReducedMotion !== null) return cachedPrefersReducedMotion
    if (typeof window !== 'undefined') {
      cachedPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return cachedPrefersReducedMotion
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e) => {
      cachedPrefersReducedMotion = e.matches
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Simplified animation variants for better performance
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
}

// Simplified scale animation
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
}

// Performance-optimized hover variants
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.15, ease: 'easeOut' }
}

export const hoverScaleSmall = {
  scale: 1.01,
  transition: { duration: 0.15, ease: 'easeOut' }
}