import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Add cursor interactions for specific elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]')
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="hide-touch fixed top-0 left-0 w-6 h-6 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor Trail */}
      <motion.div
        className="hide-touch fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          delay: 0.1,
        }}
      />
    </>
  )
}

export default CustomCursor
