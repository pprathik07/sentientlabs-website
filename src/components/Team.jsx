import { useRef, useCallback, useMemo, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { User, Brain, TrendingUp, Phone, Linkedin, Users } from 'lucide-react'

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  return typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
}

const Team = () => {
  const sectionRef = useRef(null)
  const [imageLoadErrors, setImageLoadErrors] = useState({})
  const isInView = useInView(sectionRef, { 
    once: true, 
    threshold: 0.1,
    margin: "-10% 0px -10% 0px"
  })
  const prefersReducedMotion = usePrefersReducedMotion()

  // Memoized team data to prevent unnecessary re-renders
  const teamMembers = useMemo(() => [
    {
      id: 'krish-dubey',
      emoji: "👨‍💼",
      name: "Krish Dubey",
      position: "Founder & CEO",
      bio: "Vision. Sales. Relentless execution.",
      image: "/src/assets/images/krish_dubey_pfp.jpeg",
      phone: "+918788775779",
      linkedin: "https://www.linkedin.com/in/dubeykrish/",
      icon: User,
      color: "from-blue-500 to-blue-600",
      ariaLabel: "Krish Dubey, Co-Founder and CEO"
    },
    {
      id: 'karthik-chaudhary',
      emoji: "🧠",
      name: "Karthik Chaudhary", 
      position: "Co-Founder & Chief Intelligence Officer",
      bio: "Product strategy & AI brain of the ops.",
      image: "/src/assets/images/karthik_chaudhary_pfp.jpg",
      phone: "+917020080167",
      linkedin: "https://www.linkedin.com/in/karthik-chaudhary-0082b630a/",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      ariaLabel: "Karthik Chaudhary, Co-Founder and Chief Intelligence Officer"
    },
    {
      id: 'harshit-dubey',
      emoji: "📈",
      name: "Harshit Dubey",
      position: "Co-Founder & Chief Growth Officer", 
      bio: "Growth hacking meets lead engineering.",
      image: "/src/assets/images/harshit.jpg",
      phone: "+917800292464",
      linkedin: "https://www.linkedin.com/in/harshit-dubey-11b115376/",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      ariaLabel: "Harshit Dubey, Co-Founder and Chief Growth Officer"
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }, [prefersReducedMotion])

  const cardVariants = useMemo(() => prefersReducedMotion ? {} : {
    hidden: { 
      opacity: 0, 
      y: 40,
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

  // Optimized click handlers for analytics and accessibility
  const handlePhoneClick = useCallback((memberName, phone) => {
    return (e) => {
      // Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'Team Contact',
          event_label: `Call ${memberName}`
        })
      }
      
      // Accessibility announcement
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Calling ${memberName}`)
        utterance.volume = 0.1
        speechSynthesis.speak(utterance)
      }
    }
  }, [])

  const handleLinkedInClick = useCallback((memberName) => {
    return (e) => {
      // Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'Team Contact',
          event_label: `LinkedIn ${memberName}`
        })
      }
    }
  }, [])

  // Image error handling
  const handleImageError = useCallback((memberId) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [memberId]: true
    }))
  }, [])

  // Fallback component for failed image loads
  const ImageFallback = ({ member }) => (
    <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
      <span className="text-4xl sm:text-5xl lg:text-6xl" role="img" aria-label={member.name}>
        {member.emoji}
      </span>
    </div>
  )

  return (
    <section 
      ref={sectionRef} 
      id="team" 
      className="section-reveal py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(122, 99, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, rgba(15, 13, 36, 0.98) 0%, rgba(30, 27, 75, 0.95) 50%, rgba(15, 13, 36, 1) 100%)
        `
      }}
      aria-labelledby="team-heading"
      role="region"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"
          animate={prefersReducedMotion ? {} : {
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 bg-purple-500/5 rounded-full blur-xl"
          animate={prefersReducedMotion ? {} : {
            y: [0, 15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-500/4 rounded-full blur-2xl"
          animate={prefersReducedMotion ? {} : {
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122, 99, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122, 99, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Animated Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={prefersReducedMotion ? {} : {
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2
          }}
        />

        <motion.div
          className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-purple-500/20 to-transparent"
          animate={prefersReducedMotion ? {} : {
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
            repeatDelay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <Users className="w-3 h-3" aria-hidden="true" />
              OUR TEAM
            </span>
          </div>
          
          <h2 
            id="team-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
          >
            The <span className="text-primary">SentientLabs</span> Team
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
            We're a lean, obsessed, automation-first squad that eats, breathes, and lives AI systems.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.id}
              className="group text-center relative backdrop-blur-sm bg-white/5 rounded-3xl p-6 border border-white/10"
              variants={cardVariants}
              whileHover={prefersReducedMotion ? {} : { 
                y: -6,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(122, 99, 255, 0.15)",
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              aria-labelledby={`member-${member.id}-name`}
            >
              {/* Profile Image Container */}
              <motion.div 
                className="relative mb-6 sm:mb-8 mx-auto"
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.03,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
              >
                <div className={`w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto rounded-full border-4 border-gradient-to-br ${member.color} overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-300 relative`}>
                  {imageLoadErrors[member.id] ? (
                    <ImageFallback member={member} />
                  ) : (
                    <img 
                      src={member.image} 
                      alt={`Profile photo of ${member.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={() => handleImageError(member.id)}
                    />
                  )}
                  
                  {/* Overlay with emoji */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 sm:pb-4">
                    <span 
                      className="text-2xl sm:text-3xl lg:text-4xl"
                      role="img"
                      aria-label={`${member.name} emoji`}
                    >
                      {member.emoji}
                    </span>
                  </div>
                </div>
                
                {/* Role Icon */}
                <motion.div 
                  className={`absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}
                  whileHover={prefersReducedMotion ? {} : {
                    rotate: 12,
                    transition: { duration: 0.2 }
                  }}
                  aria-hidden="true"
                >
                  <member.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
              </motion.div>
              
              {/* Content */}
              <div className="space-y-3 sm:space-y-4">
                <motion.h3 
                  id={`member-${member.id}-name`}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors duration-300"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {member.name}
                </motion.h3>
                
                <p className="text-primary text-sm sm:text-base lg:text-lg font-semibold leading-tight">
                  {member.position}
                </p>
                
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-sm mx-auto font-medium">
                  {member.bio}
                </p>
                
                {/* Contact Options */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center mt-4 sm:mt-6">
                  <motion.a
                    href={`tel:${member.phone}`}
                    onClick={handlePhoneClick(member.name, member.phone)}
                    className={`inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r ${member.color} text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-900`}
                    whileHover={prefersReducedMotion ? {} : { 
                      scale: 1.03, 
                      y: -1,
                      transition: { duration: 0.15 }
                    }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                    aria-label={`Call ${member.name} at ${member.phone}`}
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                    <span>Call</span>
                  </motion.a>
                  
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkedInClick(member.name)}
                    className={`inline-flex items-center space-x-2 px-3 sm:px-4 py-2 border-2 border-gray-600 text-white text-xs sm:text-sm font-semibold rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-900`}
                    whileHover={prefersReducedMotion ? {} : { 
                      scale: 1.03, 
                      y: -1,
                      transition: { duration: 0.15 }
                    }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                    aria-label={`View ${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom Statement */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? {} : { 
            delay: 0.6, 
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <div className="inline-block px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/30 rounded-2xl backdrop-blur-sm">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
              Ready to meet the team that will transform your business? 
              <span className="text-primary"> Let's talk.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Team
