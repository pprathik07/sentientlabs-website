import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram, Linkedin, Twitter, Mail, MapPin, Heart } from 'lucide-react'

const Footer = () => {
  const sectionRef = useRef(null)
  const isInView   = useInView(sectionRef, { once: true, threshold: 0.3 })

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/sentientlabs.ai/" },
    { name: "LinkedIn",  icon: Linkedin,  href: "https://www.linkedin.com/company/sentienlabsai/" },
    { name: "Twitter",   icon: Twitter,   href: "https://x.com/sentient_labs_" }
  ]

  const contactInfo = [
    { icon: Mail,    label: "Email",             value: "hello@sentientlabs.in", href: "mailto:hello@sentientlabs.in" },
    { icon: MapPin,  label: "Serving clients in", value: "the US, UK, and Dubai", href: null }
  ]

  return (
    <footer
      ref={sectionRef}
      className="section-reveal py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">

          {/* Left Side */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src="/logo-sentientlabs.webp" 
                alt="SentientLabs Logo" 
                width="80" 
                height="80"
                loading="lazy"
                decoding="async"
              />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                SENTIENTLABS
              </h2>
            </div>

            {/* Built with Love */}
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                className="flex items-center space-x-2 text-base sm:text-lg lg:text-xl font-semibold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span>Built with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-current" />
                </motion.div>
                <span>by SentientLabs</span>
              </motion.div>
              <motion.p
                className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Helping marketing agencies scale smarter with automation.
              </motion.p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((c, i) => (
                <motion.div
                  key={c.label}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                >
                  <c.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-400 text-xs sm:text-sm">{c.label}:</span>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="block text-white hover:text-primary transition-colors font-medium text-sm sm:text-base"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="block text-white font-medium text-sm sm:text-base">
                        {c.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              Connect With Us
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-white/5 border border-gray-700 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-white font-semibold text-base sm:text-lg group-hover:text-primary transition-colors">
                      {s.name}
                    </span>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Follow us for updates
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-gray-700 pt-6 sm:pt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
              © 2025 SentientLabs. All rights reserved
            </p>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
