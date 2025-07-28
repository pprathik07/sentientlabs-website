import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail, ArrowRight, Phone, Linkedin } from 'lucide-react'
import { usePrefersReducedMotion } from '../utils/animations.js'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      
      setTimeout(() => {
        const firstFocusable = mobileMenuRef.current?.querySelector('a, button')
        firstFocusable?.focus()
      }, 100)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ]

  const mobileMenuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ]

  const teamContacts = [
    {
      name: "Krish Dubey",
      phone: "+91 8788775779",
      linkedin: "https://www.linkedin.com/in/dubeykrish/",
      role: "CEO"
    },
    {
      name: "Karthik Chaudhary", 
      phone: "+91 7020080167",
      linkedin: "https://www.linkedin.com/in/karthik-chaudhary-0082b630a/",
      role: "CIO"
    },
    {
      name: "Harshit Dubey",
      phone: "+91 7800292464",
      linkedin: "https://www.linkedin.com/in/harshit-dubey-11b115376/",
      role: "CGO"
    }
  ]

  const handleMenuClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <nav 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 navigation ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            <motion.a
              href="#home"
              className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.2 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            >
              <motion.img 
                src="/src/assets/images/logo - sentientlabs.png"  
                alt="SentientLabs Logo" 
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                whileHover={prefersReducedMotion ? {} : { rotate: 180 }}
                transition={prefersReducedMotion ? {} : { duration: 0.8 }}
                loading="eager"
              />
              <span className="text-base sm:text-lg lg:text-xl font-semibold tracking-wide group-hover:text-primary transition-colors duration-300">
                SentientLabs
              </span>
            </motion.a>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative px-3 xl:px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                  initial={prefersReducedMotion ? {} : { y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={prefersReducedMotion ? {} : { delay: 0.4 + index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { y: -1 }}
                >
                  {item.name}
                  <motion.span 
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full -translate-x-1/2"
                    whileHover={prefersReducedMotion ? {} : { width: '80%' }}
                    transition={prefersReducedMotion ? {} : { duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="hidden md:flex items-center space-x-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? {} : { delay: 0.8 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            <button
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={prefersReducedMotion ? {} : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={prefersReducedMotion ? {} : { rotate: 90, opacity: 0 }}
                    transition={prefersReducedMotion ? {} : { duration: 0.2 }}
                  >
                    <X size={20} className="sm:w-6 sm:h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={prefersReducedMotion ? {} : { rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={prefersReducedMotion ? {} : { rotate: -90, opacity: 0 }}
                    transition={prefersReducedMotion ? {} : { duration: 0.2 }}
                  >
                    <Menu size={20} className="sm:w-6 sm:h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div 
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
              onClick={() => setIsOpen(false)}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              aria-hidden="true"
            />
            
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              className="absolute right-0 top-0 h-full w-72 sm:w-80 max-w-[85vw] bg-gradient-to-b from-gray-900/98 to-purple-900/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-heading"
              initial={prefersReducedMotion ? {} : { x: "100%" }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? {} : { x: "100%" }}
              transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 300, damping: 35 }}
            >
              <div className="p-6 pt-20 sm:pt-24">
                <h2 id="mobile-menu-heading" className="sr-only">Navigation Menu</h2>
                
                <div className="space-y-2 mb-8">
                  {mobileMenuItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-lg sm:text-xl font-medium rounded-xl hover:bg-white/10 hover:text-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
                      onClick={handleMenuClick}
                      initial={prefersReducedMotion ? {} : { x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={prefersReducedMotion ? {} : { delay: index * 0.08, duration: 0.4 }}
                      whileHover={prefersReducedMotion ? {} : { x: 4 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>

                <motion.div 
                  className="space-y-4 mb-8"
                  initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={prefersReducedMotion ? {} : { delay: 0.6 }}
                >
                  <h3 className="text-xs sm:text-sm text-gray-400 mb-4 uppercase tracking-wider font-semibold">
                    Connect With Our Team
                  </h3>
                  
                  {teamContacts.map((contact, index) => (
                    <motion.div
                      key={contact.name}
                      className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
                      initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={prefersReducedMotion ? {} : { delay: 0.7 + index * 0.1 }}
                    >
                      <h4 className="text-white font-semibold text-sm mb-2">
                        {contact.name} ({contact.role})
                      </h4>
                      
                      <div className="flex flex-col space-y-2">
                        <a
                          href={`tel:${contact.phone}`}
                          className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors text-sm group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                        >
                          <Phone size={14} className="flex-shrink-0" aria-hidden="true" />
                          <span>{contact.phone}</span>
                        </a>
                        
                        <a
                          href={contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors text-sm group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                        >
                          <Linkedin size={14} className="flex-shrink-0" aria-hidden="true" />
                          <span>LinkedIn Profile</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm mb-6"
                  initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={prefersReducedMotion ? {} : { delay: 1 }}
                >
                  <h5 className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 uppercase tracking-wider font-semibold">
                    Email Us
                  </h5>
                  <a
                    href="mailto:hello@sentientlabs.in"
                    className="flex items-center space-x-3 text-white hover:text-primary transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                      <Mail size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">hello@sentientlabs.in</span>
                  </a>
                </motion.div>

                <motion.a
                  href="#contact"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-primary to-purple-600 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
                  onClick={handleMenuClick}
                  initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={prefersReducedMotion ? {} : { delay: 1.1 }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  <span>Start Your Automation</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation