import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lightbulb, Rocket, RotateCcw, Zap } from 'lucide-react'

const Process = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 })

  const processSteps = [
    {
      icon: Lightbulb,
      title: "Plan",
      subtitle: "Custom Automation Blueprint",
      description: "We reverse-engineer your dream client's journey and map every step with AI logic.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Rocket,
      title: "Build",
      subtitle: "End-to-End Deployment",
      description: "Our team integrates tools, writes the copy, trains the bots, and automates your outreach.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: RotateCcw,
      title: "Manage",
      subtitle: "Continuous Optimization",
      description: "We monitor, tweak, and scale every automation so it keeps getting smarter.",
      color: "from-purple-500 to-purple-600"
    }
  ]

  return (
    <section ref={sectionRef} id="process" className="section-reveal py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-6">
            ⚡ HOW IT WORKS
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 tracking-wide">
            Plan → Build → Manage
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-2">
            Zero Manual Effort. Maximum ROI.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative group"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Step Number */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <motion.div 
                    className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                  </motion.div>
                  
                  {/* Arrow for non-last items */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 ml-6 lg:ml-12">
                      <motion.svg
                        width="40"
                        height="20"
                        viewBox="0 0 40 20"
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                      >
                        <path
                          d="M0 10h35m-5-5l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                      </motion.svg>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 text-gray-300">
                  {step.subtitle}
                </h4>
                
                <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/30 rounded-2xl">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
              We don't just give you leads. We build machines that work for you 24/7.
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center space-x-2 px-6 sm:px-8 lg:px-12 py-3 sm:py-4 bg-gradient-to-r from-primary to-purple-600 text-white text-base sm:text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(122, 99, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>START YOUR AUTOMATION</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Process
