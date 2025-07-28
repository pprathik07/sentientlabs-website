import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lightbulb, Rocket, RotateCcw, Zap } from 'lucide-react'

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  return typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
}

const Process = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { 
    once: true, 
    threshold: 0.1,
    margin: "-10% 0px -10% 0px"
  })
  const prefersReducedMotion = usePrefersReducedMotion()

  // Memoized process steps to prevent unnecessary re-renders
  const processSteps = useMemo(() => [
    {
      icon: Lightbulb,
      title: "Plan",
      subtitle: "Custom Automation Blueprint",
      description: "We reverse-engineer your dream client's journey and map every step with AI logic.",
      color: "from-blue-500 to-blue-600",
      ariaLabel: "Step 1: Plan - Create custom automation blueprint"
    },
    {
      icon: Rocket,
      title: "Build",
      subtitle: "End-to-End Deployment",
      description: "Our team integrates tools, writes the copy, trains the bots, and automates your outreach.",
      color: "from-green-500 to-green-600",
      ariaLabel: "Step 2: Build - Deploy end-to-end automation"
    },
    {
      icon: RotateCcw,
      title: "Manage",
      subtitle: "Continuous Optimization",
      description: "We monitor, tweak, and scale every automation so it keeps getting smarter.",
      color: "from-purple-500 to-purple-600",
      ariaLabel: "Step 3: Manage - Continuously optimize performance"
    }
  ], [])

  // Optimized animation variants
  const fadeInUp = useMemo(() => prefersReducedMotion ? {} : {
    hidden: { 
      opacity: 0, 
      y: 30,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  }, [prefersReducedMotion])

  const staggerContainer = useMemo(() => prefersReducedMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }, [prefersReducedMotion])

  const cardVariants = useMemo(() => prefersReducedMotion ? {} : {
    hidden: { 
      opacity: 0, 
      y: 25,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef} 
      id="process" 
      className="section-reveal py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="process-heading"
      role="region"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-6">
            <span className="flex items-center gap-2">
              <Zap className="w-3 h-3" aria-hidden="true" />
              HOW IT WORKS
            </span>
          </div>
          
          <h2 
            id="process-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 tracking-wide"
          >
            Plan → Build → Manage
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-2">
            Zero Manual Effort. Maximum ROI.
          </p>
        </motion.div>

        {/* Process Steps Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="group relative"
              variants={cardVariants}
              whileHover={prefersReducedMotion ? {} : { 
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                {index + 1}
              </div>

              {/* Card */}
              <div 
                className="h-full p-6 sm:p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm hover:border-primary/30 hover:bg-gradient-to-br hover:from-gray-800/70 hover:to-gray-900/70 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10"
                role="article"
                aria-labelledby={`step-${index + 1}-title`}
                aria-describedby={`step-${index + 1}-description`}
              >
                {/* Icon */}
                <motion.div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200`}
                  whileHover={prefersReducedMotion ? {} : {
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <step.icon 
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
                    aria-hidden="true"
                  />
                </motion.div>

                {/* Content */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 
                      id={`step-${index + 1}-title`}
                      className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-200"
                    >
                      {step.title}
                    </h3>
                    <h4 className="text-base sm:text-lg font-semibold text-primary mb-3">
                      {step.subtitle}
                    </h4>
                  </div>
                  
                  <p 
                    id={`step-${index + 1}-description`}
                    className="text-gray-300 text-sm sm:text-base leading-relaxed"
                  >
                    {step.description}
                  </p>
                </div>

                {/* Connecting Arrow (hidden on mobile, visible on md+) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2 z-10">
                    <motion.div
                      className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center shadow-lg"
                      animate={prefersReducedMotion ? {} : {
                        x: [0, 3, 0],
                        transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                      }}
                      aria-hidden="true"
                    >
                      <svg 
                        className="w-4 h-4 lg:w-6 lg:h-6 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? {} : { 
            delay: 0.6, 
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <div className="inline-block px-6 sm:px-8 lg:px-12 py-4 sm:py-6 bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/30 rounded-3xl backdrop-blur-sm">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
              Simple process. 
              <span className="text-primary"> Extraordinary results.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Process