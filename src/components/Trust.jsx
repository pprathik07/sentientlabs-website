import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { BadgeCheck, Zap, Users, Star, ChevronRight } from 'lucide-react'

// Lightweight reduced motion hook
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReduced(mediaQuery.matches)
      
      const handleChange = (e) => setPrefersReduced(e.matches)
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } catch (error) {
      setPrefersReduced(true)
    }
  }, [])

  return prefersReduced
}

// Fast intersection observer hook
const useIntersectionObserver = (threshold = 0.2, rootMargin = '50px') => {
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

// Interactive floating particles component
const FloatingParticles = ({ prefersReducedMotion }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (prefersReducedMotion) return

    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5
      }))
      setParticles(newParticles)
    }

    generateParticles()
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            transform: `scale(${particle.size / 4})`
          }}
        />
      ))}
    </div>
  )
}

// Trust card component
const TrustCard = ({ point, index, isVisible, prefersReducedMotion }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  return (
    <article
      className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${!prefersReducedMotion && isHovered ? 'scale-105' : ''}`}
      style={{ 
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-labelledby={`trust-${index}-title`}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        prefersReducedMotion ? '' : 'animate-gradient-shift'
      }`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon container with interactive effect */}
        <div 
          className={`w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300 ${
            !prefersReducedMotion && isHovered ? 'rotate-6 scale-110' : ''
          }`}
        >
          <point.icon 
            className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" 
            strokeWidth={2}
          />
        </div>

        {/* Title with interactive underline */}
        <h4 
          id={`trust-${index}-title`}
          className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-900 transition-colors duration-300 relative"
        >
          {point.title}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-500" />
        </h4>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
          {point.description}
        </p>

        {/* Interactive arrow */}
        <div className={`flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 ${
          !prefersReducedMotion ? 'transform translate-x-0 group-hover:translate-x-2' : ''
        }`}>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}

// Header component
const TrustHeader = ({ isVisible, prefersReducedMotion }) => (
  <header 
    className={`mb-16 max-w-4xl transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
  >
    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-6">
      <Star className="w-4 h-4" fill="currentColor" />
      TRUSTED BY AGENCIES
    </div>

    {/* Main heading */}
    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
      Why Our Clients{' '}
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
        Trust Us
      </span>
    </h2>

    {/* Description */}
    <p className="text-xl text-gray-700 leading-relaxed mb-8">
      At SentientLabs we turn complex AI automation into simple, practical tools
      that save time, slash costs, and help small businesses scale
      effortlessly—backed by years of deep engineering experience.
    </p>

    {/* Subheading */}
    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      What Sets Us Apart
    </h3>
  </header>
)

// Stats component
const TrustStats = ({ isVisible }) => {
  const stats = useMemo(() => [
    { label: 'Time Reduction', value: '85%' },
    { label: 'Cost Reduction', value: '80%' },
    { label: 'Setup Time', value: '7 Days' }
  ], [])

  return (
    <div 
      className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: '800ms' }}
    >
      {stats.map((stat, index) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {stat.value}
          </div>
          <div className="text-gray-600 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// Main Trust component
const Trust = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver(0.3)
  const [cardsRef, isCardsVisible] = useIntersectionObserver(0.2)
  const [statsRef, isStatsVisible] = useIntersectionObserver(0.3)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Trust points data
  const trustPoints = useMemo(() => [
    {
      icon: BadgeCheck,
      title: 'Affordable Automation',
      description: 'Cost-effective AI that lets small businesses automate without breaking the bank. Get enterprise-level automation at startup prices.'
    },
    {
      icon: Zap,
      title: 'Fast Implementation',
      description: 'Rapid, end-to-end deployment customized to your exact workflows for maximum impact. From planning to launch in just 7 days.'
    },
    {
      icon: Users,
      title: 'Tailored for You',
      description: 'Every solution is engineered around your goals, data, and growth stage—never off-the-shelf. Built specifically for your success.'
    }
  ], [])

  return (
    <section
      id="trust"
      className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden"
      aria-labelledby="trust-heading"
      role="region"
    >
      {/* Interactive Background Elements */}
      <FloatingParticles prefersReducedMotion={prefersReducedMotion} />
      
      {/* Geometric shapes */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div ref={headerRef}>
          <TrustHeader 
            isVisible={isHeaderVisible} 
            prefersReducedMotion={prefersReducedMotion} 
          />
        </div>

        {/* Trust Cards */}
        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
            isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {trustPoints.map((point, index) => (
            <TrustCard
              key={point.title}
              point={point}
              index={index}
              isVisible={isCardsVisible}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div ref={statsRef}>
          <TrustStats isVisible={isStatsVisible} />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SentientLabs",
            "description": "AI automation solutions for small businesses and agencies",
            "url": "https://sentientlabs.in",
            "foundingDate": "2023",
            "knowsAbout": ["AI Automation", "Business Process Automation", "Lead Generation"]
          })
        }}
      />
    </section>
  )
}

export default Trust