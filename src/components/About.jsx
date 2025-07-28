import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '../utils/animations.js'

const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 })
  const prefersReducedMotion = usePrefersReducedMotion()

  const solutionPoints = [
    {
      icon: '🔧',
      title: 'Integrated Smart System',
      description: 'CRM + Email + LinkedIn + Data Scraping = One smart system'
    },
    {
      icon: '💡',
      title: 'Tailor-Made Funnels',
      description: 'Each funnel is tailor-made for your niche, target, and offer'
    },
    {
      icon: '📥',
      title: 'Complete Lead Management',
      description: 'Leads come in. We capture, nurture, and qualify them for you'
    },
    {
      icon: '📈',
      title: 'Zero Manual Work',
      description: 'All with zero manual intervention.'
    }
  ]

  const containerVariants = prefersReducedMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = prefersReducedMotion ? {} : {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="section-reveal bg-bg-light text-black min-h-screen"
      aria-labelledby="about-heading"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 min-h-screen">
        <motion.div 
          className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 xl:px-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={prefersReducedMotion ? {} : { duration: 1 }}
        >
          <div className="max-w-lg w-full">
            <motion.div
              className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-6"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={prefersReducedMotion ? {} : { delay: 0.2, duration: 0.6 }}
            >
              🚀 OUR SOLUTION STACK
            </motion.div>
            <h2 
              id="about-heading"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 lg:mb-6"
            >
              <span className="text-primary">Custom AI</span><br/>
              Automation Systems
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Built uniquely for every single client.
            </p>
          </div>
        </motion.div>

        <div className="flex items-center px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
          <motion.div 
            className="space-y-6 sm:space-y-8 lg:space-y-12 w-full"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {solutionPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6"
                variants={itemVariants}
              >
                <div className="flex-shrink-0">
                  <span 
                    className="text-2xl sm:text-3xl lg:text-4xl"
                    role="img"
                    aria-label={point.title}
                  >
                    {point.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed text-gray-700">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="pt-6 sm:pt-8 border-t border-gray-200"
              variants={itemVariants}
            >
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 leading-relaxed">
                You don't need a VA. You need <span className="text-primary">SentientLabs</span>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About