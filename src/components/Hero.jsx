import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import CustomCursor from './CustomCursor'

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    // Title animation
    tl.fromTo(titleRef.current.querySelectorAll('.word'), 
      { 
        y: 100, 
        opacity: 0,
      },
      { 
        y: 0, 
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      }
    )

    // Logo rotation animation
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 8,
      ease: "none",
      repeat: -1
    })

    // Hide default cursor in this section
    const heroSection = heroRef.current
    heroSection.style.cursor = 'none'
    
    return () => {
      heroSection.style.cursor = 'auto'
    }
  }, [])

  const chipItems = [
    "CRM + Email + LinkedIn integration",
    "custom funnel automation", 
    "and",
    "intelligent lead qualification"
  ]

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden cursor-none bg-gradient-to-br from-black via-gray-900 to-purple-900/20 px-4 sm:px-6 lg:px-8"
      id="home"
    >
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,99,255,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,99,120,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,255,120,0.03),transparent_50%)]" />
      </div>

      <div className="container mx-auto text-center z-10 max-w-7xl">
        
        {/* Main Title */}
        <div ref={titleRef} className="mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] mb-2 sm:mb-4 lg:mb-6">
            <span className="word inline-block">WE</span>{' '}
            <span className="word inline-block">AUT</span>
            <motion.span 
              ref={logoRef}
              className="word inline-block mx-1 sm:mx-2 lg:mx-4"
            >
              <img 
                src="/src/assets/images/logo - sentientlabs.png" 
                alt="SentientLabs Logo" 
                className="h-8 xs:h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 inline-block"
              />
            </motion.span>
            <span className="word inline-block">MATE.</span>
          </h1>
          <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
            <span className="word inline-block text-primary bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">YOU</span>{' '}
            <span className="word inline-block">GROW.</span>
          </div>
        </div>

        {/* Enhanced Subtitle */}
        <motion.div 
          className="mb-6 sm:mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 sm:mb-4 max-w-5xl mx-auto leading-relaxed text-gray-300">
            Manual lead gen is dead.
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-5xl mx-auto leading-relaxed text-gray-300">
            We build intelligent automation systems that fill your pipeline while you sleep.
          </p>
        </motion.div>

        {/* Enhanced Feature Chips */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-12 lg:mb-16 px-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          {chipItems.map((item, index) => (
            <motion.span
              key={item}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 ${
                item === 'and' 
                  ? 'text-gray-400' 
                  : 'border border-gray-600 rounded-full bg-white/5 backdrop-blur-sm hover:border-primary hover:bg-primary/10 hover:scale-105 shadow-lg hover:shadow-primary/20'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 3 + index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={item !== 'and' ? { scale: 1.05 } : {}}
              data-cursor="pointer"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-12 sm:mb-16 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <motion.a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-primary to-purple-600 text-white text-sm sm:text-base lg:text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <span>Get Your Custom Automation</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.a>

          <motion.a
            href="#process"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 border border-gray-600 text-white text-sm sm:text-base lg:text-lg font-semibold rounded-xl bg-white/5 backdrop-blur-sm hover:border-primary hover:bg-primary/10 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <span>See How It Works</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-1 sm:space-y-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-xs sm:text-sm text-gray-400 font-medium">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
