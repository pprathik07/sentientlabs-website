import { useRef, useCallback, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram, Linkedin, Twitter, Mail, MapPin, Heart } from 'lucide-react'

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  return typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
}

const Footer = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { 
    once: true, 
    threshold: 0.1,
    margin: "-5% 0px -5% 0px"
  })
  const prefersReducedMotion = usePrefersReducedMotion()

  // Memoized data to prevent unnecessary re-renders
  const socialLinks = useMemo(() => [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/sentientlabs.ai/",
      description: "Follow us on Instagram for behind-the-scenes content"
    },
    {
      name: "LinkedIn", 
      icon: Linkedin,
      href: "https://www.linkedin.com/company/sentienlabsai/",
      description: "Connect with us on LinkedIn for professional updates"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/sentient_labs_",
      description: "Follow us on Twitter for real-time updates"
    }
  ], [])

  const contactInfo = useMemo(() => [
    {
      icon: Mail,
      label: "Email",
      value: "hello@sentientlabs.in",
      href: "mailto:hello@sentientlabs.in"
    },
    {
      icon: MapPin,
      label: "Serving clients in",
      value: "the US, UK, and Dubai",
      href: null
    }
  ], [])

  // Optimized click handlers for analytics
  const handleSocialClick = useCallback((socialName) => {
    return (e) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'Social',
          event_label: socialName
        })
      }
    }
  }, [])

  const handleEmailClick = useCallback((e) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'Contact',
        event_label: 'Footer Email'
      })
    }
  }, [])

  const handleNavigationClick = useCallback((linkName) => {
    return (e) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'Footer Navigation',
          event_label: linkName
        })
      }
    }
  }, [])

  // Optimized animation variants
  const fadeInUp = useMemo(() => prefersReducedMotion ? {} : {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  }, [prefersReducedMotion])

  const heartAnimation = useMemo(() => prefersReducedMotion ? {} : {
    scale: [1, 1.1, 1],
    transition: { 
      repeat: Infinity, 
      duration: 2,
      ease: "easeInOut"
    }
  }, [prefersReducedMotion])

  return (
    <footer 
      ref={sectionRef} 
      className="section-reveal py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          
          {/* Left Side - Brand & Message */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src="/src/assets/images/logo - sentientlabs.png" 
                alt="SentientLabs Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                loading="lazy"
                decoding="async"
              />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                SENTIENTLABS
              </h2>
            </div>

            {/* Built with Love Message */}
            <div className="space-y-3 sm:space-y-4">
              <motion.div 
                className="flex items-center space-x-2 text-base sm:text-lg lg:text-xl font-semibold text-white"
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={prefersReducedMotion ? {} : { 
                  delay: 0.1, 
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                <span>Built with</span>
                <motion.div animate={heartAnimation}>
                  <Heart 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-current" 
                    aria-label="love"
                  />
                </motion.div>
                <span>by SentientLabs</span>
              </motion.div>
              
              <motion.p 
                className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-md"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={prefersReducedMotion ? {} : { 
                  delay: 0.2, 
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                Helping marketing agencies scale smarter with automation.
              </motion.p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 sm:space-y-4" role="list">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  className="flex items-start space-x-3"
                  role="listitem"
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={prefersReducedMotion ? {} : { 
                    delay: 0.3 + index * 0.05, 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                >
                  <contact.icon 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-1 flex-shrink-0" 
                    aria-hidden="true"
                  />
                  <div>
                    <span className="text-gray-400 text-xs sm:text-sm">{contact.label}:</span>
                    {contact.href ? (
                      <a 
                        href={contact.href}
                        onClick={contact.href.includes('mailto:') ? handleEmailClick : undefined}
                        className="block text-white hover:text-primary transition-colors duration-200 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                        aria-label={`${contact.label}: ${contact.value}`}
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="block text-white font-medium text-sm sm:text-base">
                        {contact.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Social Links */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReducedMotion ? {} : { 
              delay: 0.2, 
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              Connect With Us
            </h3>
            
            <nav className="space-y-4 sm:space-y-6" aria-label="Social media links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSocialClick(social.name)}
                  className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-white/5 border border-gray-700 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-900"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.01, x: 3 }}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={prefersReducedMotion ? {} : { 
                    delay: 0.4 + index * 0.05, 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  aria-label={social.description}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-white font-semibold text-base sm:text-lg group-hover:text-primary transition-colors duration-200">
                      {social.name}
                    </span>
                    <p className="text-gray-400 text-xs sm:text-sm">Follow us for updates</p>
                  </div>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-gray-700 pt-6 sm:pt-8"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={prefersReducedMotion ? {} : { 
            delay: 0.5, 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
              © 2025 SentientLabs. All rights reserved
            </p>
            
            <nav className="flex items-center space-x-4 sm:space-x-6" aria-label="Footer navigation">
              <a 
                href="#privacy" 
                onClick={handleNavigationClick('Privacy Policy')}
                className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                onClick={handleNavigationClick('Terms of Service')}
                className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
              >
                Terms of Service
              </a>
            </nav>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer