import { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { User, Brain, TrendingUp, Phone, Linkedin, Users } from 'lucide-react'

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  return typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
}

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1, rootMargin = '50px') => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold, rootMargin })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isVisible]
}

const Team = () => {
  const [imageLoadErrors, setImageLoadErrors] = useState({})
  const [headerRef, isHeaderVisible] = useIntersectionObserver(0.5)
  const [gridRef, isGridVisible] = useIntersectionObserver(0.2)
  const [ctaRef, isCtaVisible] = useIntersectionObserver(0.3)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Team members data
  const teamMembers = useMemo(() => [
    {
      id: 'krish-dubey',
      emoji: "👨‍💼",
      name: "Krish Dubey",
      position: "Founder & CEO",
      bio: "Vision. Sales. Relentless execution.",
      image: "/images/krish_dubey_pfp.webp",
      phone: "+918788775779",
      linkedin: "https://www.linkedin.com/in/dubeykrish/",
      icon: User,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "from-blue-400 to-blue-500",
      ariaLabel: "Krish Dubey, Founder and CEO"
    },
    {
      id: 'karthik-chaudhary',
      emoji: "🧠",
      name: "Karthik Chaudhary", 
      position: "Co-Founder & Chief Intelligence Officer",
      bio: "Product strategy & AI brain of the ops.",
      image: "/images/karthik_chaudhary_pfp.webp",
      phone: "+917020080167",
      linkedin: "https://www.linkedin.com/in/karthik-chaudhary-0082b630a/",
      icon: Brain,
      gradient: "from-purple-500 to-purple-600",
      hoverGradient: "from-purple-400 to-purple-500",
      ariaLabel: "Karthik Chaudhary, Co-Founder and Chief Intelligence Officer"
    },
    {
      id: 'harshit-dubey',
      emoji: "📈",
      name: "Harshit Dubey",
      position: "Co-Founder & Chief Growth Officer", 
      bio: "Growth hacking meets lead engineering.",
      image: "/images/harshit.webp",
      phone: "+917800292464",
      linkedin: "https://www.linkedin.com/in/harshit-dubey-11b115376/",
      icon: TrendingUp,
      gradient: "from-green-500 to-green-600",
      hoverGradient: "from-green-400 to-green-500",
      ariaLabel: "Harshit Dubey, Co-Founder and Chief Growth Officer"
    }
  ], [])

  // Enhanced click handlers with error handling
  const handlePhoneClick = useCallback((memberName, phone) => {
    return (e) => {
      try {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'click', {
            event_category: 'Team Contact',
            event_label: `Call ${memberName}`
          })
        }
        
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          try {
            const utterance = new SpeechSynthesisUtterance(`Calling ${memberName}`)
            utterance.volume = 0.1
            speechSynthesis.speak(utterance)
          } catch (speechError) {
            console.warn('Speech synthesis failed:', speechError)
          }
        }
      } catch (error) {
        console.warn('Phone click handler failed:', error)
      }
    }
  }, [])

  const handleLinkedInClick = useCallback((memberName) => {
    return (e) => {
      try {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'click', {
            event_category: 'Team Contact',
            event_label: `LinkedIn ${memberName}`
          })
        }
      } catch (error) {
        console.warn('LinkedIn click handler failed:', error)
      }
    }
  }, [])

  const handleImageError = useCallback((memberId) => {
    console.warn(`Failed to load image for ${memberId}`)
    setImageLoadErrors(prev => ({
      ...prev,
      [memberId]: true
    }))
  }, [])

  // Enhanced fallback component
  const ImageFallback = ({ member }) => (
    <div className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
      <span 
        className="text-4xl sm:text-5xl lg:text-6xl filter drop-shadow-lg" 
        role="img" 
        aria-label={member.name}
      >
        {member.emoji}
      </span>
    </div>
  )

  return (
    <section 
      id="team" 
      className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
      aria-labelledby="team-heading"
      role="region"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Enhanced Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold mb-6">
            <Users className="w-4 h-4" aria-hidden="true" />
            OUR TEAM
          </div>
          
          <h2 
            id="team-heading"
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            The{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              SentientLabs
            </span>{' '}
            Team
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're a lean, obsessed, automation-first squad that eats, breathes, and lives AI systems.
          </p>
        </div>

        {/* Enhanced Team Grid */}
        <div 
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
            isGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {teamMembers.map((member, index) => (
            <article
              key={member.id}
              className={`group text-center relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${
                isGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: isGridVisible ? `${index * 100}ms` : '0ms'
              }}
              aria-labelledby={`member-${member.id}-name`}
            >
              {/* Enhanced Profile Image Container */}
              <div className="relative mb-6 mx-auto">
                <div 
                  className={`w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto rounded-2xl border-4 border-gradient-to-br ${member.gradient} overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-${member.gradient.split('-')[1]}-500/30 transition-all duration-500 relative transform group-hover:scale-105`}
                >
                  {imageLoadErrors[member.id] ? (
                    <ImageFallback member={member} />
                  ) : (
                    <img 
                      src={member.image} 
                      alt={`Profile photo of ${member.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      onError={() => handleImageError(member.id)}
                      onLoad={() => console.log(`Successfully loaded image for ${member.name}`)}
                    />
                  )}
                  
                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
                    <span 
                      className="text-2xl sm:text-3xl filter drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      role="img"
                      aria-label={`${member.name} emoji`}
                    >
                      {member.emoji}
                    </span>
                  </div>
                </div>
                
                {/* Enhanced Role Icon */}
                <div 
                  className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border-2 border-gray-900`}
                  aria-hidden="true"
                >
                  <member.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Enhanced Content */}
              <div className="space-y-4">
                <h3 
                  id={`member-${member.id}-name`}
                  className="text-2xl lg:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300"
                >
                  {member.name}
                </h3>
                
                <p className={`bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent text-base lg:text-lg font-semibold leading-tight`}>
                  {member.position}
                </p>
                
                <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-sm mx-auto">
                  {member.bio}
                </p>
                
                {/* Enhanced Contact Options */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
                  <a
                    href={`tel:${member.phone}`}
                    onClick={handlePhoneClick(member.name, member.phone)}
                    className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${member.gradient} text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-900`}
                    aria-label={`Call ${member.name} at ${member.phone}`}
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>Call</span>
                  </a>
                  
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkedInClick(member.name)}
                    className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-gray-600 text-white text-sm font-semibold rounded-xl hover:border-blue-500 hover:bg-blue-500/10 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label={`View ${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div
          ref={ctaRef}
          className={`text-center transition-all duration-1000 ${
            isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to meet the team that will transform your business?
            </h3>
            <p className="text-blue-100 mb-6 max-w-md mx-auto">
              Let's have a conversation about how we can help you scale with AI automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+918788775779" 
                className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Schedule Call
              </a>
              <a 
                href="mailto:hello@sentientlabs.in" 
                className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team