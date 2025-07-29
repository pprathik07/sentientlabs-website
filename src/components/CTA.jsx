import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, Linkedin, Instagram, Twitter, ArrowRight, Zap } from 'lucide-react'

const CTA = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 })

  const teamContacts = [
    {
      name: "Krish Dubey",
      role: "CEO",
      phone: "+918788775779",
      linkedin: "https://www.linkedin.com/in/dubeykrish/",
      color: "from-blue-500 to-blue-600",
      emoji: "👨‍💼"
    },
    {
      name: "Karthik Chaudhary", 
      role: "CIO",
      phone: "+917020080167",
      linkedin: "https://www.linkedin.com/in/karthik-chaudhary-0082b630a/",
      color: "from-purple-500 to-purple-600",
      emoji: "🧠"
    },
    {
      name: "Harshit Dubey",
      role: "CGO", 
      phone: "+917800292464",
      linkedin: "https://www.linkedin.com/in/harshit-dubey-11b115376/",
      color: "from-green-500 to-green-600",
      emoji: "📈"
    }
  ]

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/sentientlabs.ai/",
      color: "from-pink-500 to-red-500"
    },
    {
      name: "LinkedIn", 
      icon: Linkedin,
      href: "https://www.linkedin.com/company/sentienlabsai/",
      color: "from-blue-600 to-blue-700"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/sentient_labs_",
      color: "from-sky-400 to-sky-600"
    }
  ]

  return (
    <section ref={sectionRef} id="contact" className="relative bg-gray-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(120, 99, 255, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at 70% 80%, rgba(255, 99, 120, 0.3) 0%, transparent 50%)`
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <Zap className="w-4 h-4" />
            <span>Ready to Transform?</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
            LET'S <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AUTOMATE</span><br/>
            YOUR WORKFLOW.
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
            Ready to scale your business with intelligent automation? Let's build your custom AI system together.
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <motion.a
              href="mailto:hello@sentientlabs.in"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-8 lg:px-12 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-base sm:text-lg lg:text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(139, 92, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Email Us Now</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            <motion.a
              href="#team"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-8 lg:px-12 py-3 sm:py-4 border-2 border-gray-600 text-white text-base sm:text-lg lg:text-xl font-bold rounded-full bg-white/5 backdrop-blur-sm hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Call Our Team</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-6 sm:px-8 lg:px-12 py-4 sm:py-6 bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-3xl backdrop-blur-sm">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
              Ready to 10x your lead generation? 
              <span className="text-purple-400"> We're just one message away.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA