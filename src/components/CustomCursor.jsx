import { useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  return typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
}

// Custom hook for touch device detection
const useIsTouchDevice = () => {
  return useMemo(() => {
    if (typeof window === 'undefined') return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const prefersReducedMotion = usePrefersReducedMotion()
  const isTouchDevice = useIsTouchDevice()

  // Memoized event handlers for performance
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
    setIsVisible(true)
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])
  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])
  const handleMouseOut = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    // Don't render cursor on touch devices or if reduced motion is preferred
    if (isTouchDevice || prefersReducedMotion) return

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"], input, textarea, select, [role="button"]')
    
    // Add event listeners to interactive elements
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true })
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    })

    // Global mouse event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseOut, { passive: true })

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseOut)
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp, handleMouseOut, isTouchDevice, prefersReducedMotion])

  // Memoized animation variants
  const cursorVariants = useMemo(() => ({
    default: {
      scale: 1,
      opacity: 1,
    },
    hover: {
      scale: 1.5,
      opacity: 0.8,
    },
    click: {
      scale: 0.8,
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    }
  }), [])

  const outerCursorVariants = useMemo(() => ({
    default: {
      scale: 1,
      opacity: 0.3,
    },
    hover: {
      scale: 2,
      opacity: 0.6,
    },
    hidden: {
      opacity: 0,
    }
  }), [])

  // Don't render on touch devices or if reduced motion is preferred
  if (isTouchDevice || prefersReducedMotion) return null

  const getCurrentVariant = () => {
    if (!isVisible) return 'hidden'
    if (isClicking) return 'click'
    if (isHovering) return 'hover'
    return 'default'
  }

  const currentVariant = getCurrentVariant()

  return (
    <>
      {/* Inner cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        variants={cursorVariants}
        animate={currentVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        aria-hidden="true"
      />

      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        variants={outerCursorVariants}
        animate={isVisible ? (isHovering ? 'hover' : 'default') : 'hidden'}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8,
          delay: 0.1,
        }}
        aria-hidden="true"
      />
    </>
  )
}

export default CustomCursor