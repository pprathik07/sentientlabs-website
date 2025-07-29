import { useRef, useCallback, useMemo, useEffect, useState } from 'react'
import { ArrowRight, Zap } from 'lucide-react'

// Enhanced reduced motion hook with better browser support
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReduced(mediaQuery.matches)
      
      const handleChange = (e) => setPrefersReduced(e.matches)
      
      // Use both new and legacy event listeners for better compatibility
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange)
        return () => mediaQuery.removeListener(handleChange)
      }
    } catch (error) {
      console.warn('Reduced motion detection failed:', error)
    }
  }, [])

  return prefersReduced
}

// Enhanced aesthetic HeroLogo with visual effects
const HeroLogo = ({ className }) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  // Aesthetic fallback with gradient and glow
  const FallbackIcon = () => (
    <div className="relative">
      {/* Outer glow ring */}
      <div 
        className={`absolute inset-0 rounded-full blur-md opacity-75 ${!prefersReducedMotion ? 'animate-spin' : ''}`}
        style={{ 
          animationDuration: '4s',
          background: 'conic-gradient(from 0deg, #8b5cf6, #a855f7, #c084fc, #8b5cf6)'
        }}
      />
      {/* Main logo container */}
      <div 
        className={`relative w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-2xl ${!prefersReducedMotion ? 'animate-spin' : ''}`}
        style={{ animationDuration: '3s' }}
        role="img"
        aria-label="SentientLabs Logo"
      >
        <Zap className="w-10 h-10 text-white drop-shadow-lg" aria-hidden="true" />
        {/* Inner highlight */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
      </div>
    </div>
  )

  if (imageError) {
    return <FallbackIcon />
  }

  return (
    <div className="relative inline-block">
      {/* Loading state with aesthetic shimmer */}
      {!imageLoaded && (
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{ 
              width: '80px', 
              height: '80px',
              background: 'linear-gradient(90deg, rgba(51, 65, 85, 0.4) 25%, rgba(71, 85, 105, 0.8) 50%, rgba(51, 65, 85, 0.4) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite'
            }}
            aria-hidden="true"
          />
          <style jsx>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
        </div>
      )}
      
      {/* Main logo with aesthetic enhancements */}
      <div className="relative">
        {/* Rotating glow ring behind logo */}
        <div 
          className={`absolute -inset-2 rounded-full opacity-30 blur-sm ${!prefersReducedMotion ? 'animate-spin' : ''}`}
          style={{ 
            animationDuration: '4s',
            background: 'conic-gradient(from 0deg, rgba(139, 92, 246, 0.5), rgba(168, 85, 247, 0.7), rgba(192, 132, 252, 0.5), rgba(139, 92, 246, 0.5))'
          }}
          aria-hidden="true"
        />
        
        {/* Subtle pulsing backdrop */}
        <div 
          className={`absolute -inset-1 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 ${!prefersReducedMotion ? 'animate-pulse' : ''}`}
          style={{ animationDuration: '2s' }}
          aria-hidden="true"
        />
        
        {/* Main logo image */}
        <img
          src="/logo-sentientlabs.webp"
          alt="SentientLabs Logo - Intelligent Automation Solutions"
          className={`
            relative z-10 object-contain transition-all duration-500 filter drop-shadow-lg
            ${!prefersReducedMotion ? 'animate-spin hover:scale-110' : 'hover:scale-105'} 
            ${className} 
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ 
            width: '80px',
            height: '80px',
            animationDuration: '3s',
            filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))'
          }}
          loading="eager"
          decoding="async"
          width="80"
          height="80"
          onLoad={handleImageLoad}
          onError={handleImageError}
          fetchPriority="high"
        />
        
        {/* Subtle highlight overlay */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

// Enhanced Hero component with comprehensive optimizations
const Hero = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Enhanced Intersection Observer with better performance
  useEffect(() => {
    if (!isClient) return

    let observer
    let timeoutId

    try {
      if ('IntersectionObserver' in window && sectionRef.current) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Debounce the visibility change
                timeoutId = setTimeout(() => {
                  setIsVisible(true)
                }, 50)
                observer?.disconnect()
              }
            })
          },
          { 
            threshold: 0.1, 
            rootMargin: '0px 0px -10% 0px'
          }
        )

        observer.observe(sectionRef.current)
      } else {
        setIsVisible(true)
      }
    } catch (error) {
      console.warn('IntersectionObserver failed, using fallback:', error)
      setIsVisible(true)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      try {
        observer?.disconnect()
      } catch (error) {
        console.warn('Observer cleanup failed:', error)
      }
    }
  }, [isClient])

  // Enhanced analytics tracking with error handling
  const handleCTAClick = useCallback((action) => {
    return (e) => {
      try {
        // Google Analytics 4
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'click', {
            event_category: 'CTA',
            event_label: `Hero ${action}`,
            value: 1
          })
        }
        
        // Alternative analytics tracking (Facebook Pixel, etc.)
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', { content_name: `Hero ${action}` })
        }
      } catch (error) {
        console.warn('Analytics tracking failed:', error)
      }
    }
  }, [])

  // Enhanced scroll handling with performance optimizations
  const handleScrollToSection = useCallback((sectionId) => {
    return (e) => {
      e.preventDefault()
      
      try {
        const element = document.getElementById(sectionId)
        if (element) {
          // Use requestIdleCallback for better performance if available
          const scrollFunction = () => {
            element.scrollIntoView({ 
              behavior: prefersReducedMotion ? 'auto' : 'smooth', 
              block: 'start' 
            })
          }

          if ('requestIdleCallback' in window) {
            requestIdleCallback(scrollFunction, { timeout: 100 })
          } else {
            requestAnimationFrame(scrollFunction)
          }
        }
      } catch (error) {
        console.warn('Scroll to section failed:', error)
        // Fallback scroll without smooth behavior
        try {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ block: 'start' })
          }
        } catch (fallbackError) {
          console.warn('Fallback scroll failed:', fallbackError)
        }
      }
    }
  }, [prefersReducedMotion])

  // Optimized service tags with better semantic structure
  const serviceTags = useMemo(() => [
    {
      text: 'CRM + Email + LinkedIn integration',
      schema: 'Customer Relationship Management and Email Marketing Integration'
    },
    {
      text: 'custom funnel automation',
      schema: 'Custom Sales Funnel Automation Solutions'
    }, 
    {
      text: 'intelligent lead qualification',
      schema: 'AI-Powered Lead Qualification Systems'
    }
  ], [])

  // Enhanced animation classes with better performance
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 translate-y-8'
    if (prefersReducedMotion) return 'opacity-100 translate-y-0'
    return 'opacity-100 translate-y-0 transition-all duration-700 ease-out will-change-transform'
  }

  // Enhanced background styles with better performance
  const backgroundStyles = useMemo(() => ({
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #1e293b 100%)',
    backgroundColor: '#1e293b'
  }), [])

  return (
    <>
      {/* SEO and Schema.org structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SentientLabs",
          "url": "https://sentientlabs.in",
          "logo": "https://sentientlabs.in/logo-sentientlabs.webp",
          "description": "Intelligent automation systems that fill your pipeline while you sleep. We build custom CRM integrations, email automation, and lead qualification systems.",
          "serviceType": ["Marketing Automation", "Lead Generation", "CRM Integration"],
          "areaServed": "Global",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "hello@sentientlabs.in",
            "contactType": "Customer Service"
          }
        })
      }} />

      <section 
        ref={sectionRef}
        className="relative min-h-screen text-white overflow-hidden"
        style={backgroundStyles}
        role="banner"
        aria-labelledby="hero-heading"
        aria-describedby="hero-description"
      >
        {/* Enhanced background with better performance */}
        <div className="absolute inset-0 will-change-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,255,120,0.03),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className={`text-center space-y-8 ${getAnimationClass()}`}>
            
            {/* Enhanced main headline with better semantics */}
            <header className="space-y-6">
              <h1 
                id="hero-heading"
                className="font-bold leading-tight tracking-tight"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
              >
                {/* WE AUT[LOGO]MATE. with enhanced accessibility */}
                <div className="flex items-center justify-center flex-wrap gap-2" role="text" aria-label="We Automate">
                  <span className="text-white">WE AUT</span>
                  <div className="inline-block mx-2" aria-hidden="true">
                    <HeroLogo />
                  </div>
                  <span className="text-white">MATE.</span>
                </div>
                
                {/* YOU GROW. with enhanced gradient */}
                <div className="mt-4">
                  <span 
                    className="bg-clip-text text-transparent font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                    role="text"
                    aria-label="You Grow"
                  >
                    YOU GROW.
                  </span>
                </div>
              </h1>
            </header>

            {/* Enhanced subheading with better structure */}
            <div id="hero-description" className="max-w-4xl mx-auto space-y-6">
              <p className="text-2xl md:text-3xl text-gray-300 font-medium">
                Manual lead gen is dead.
              </p>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                We build intelligent automation systems that fill your pipeline while you sleep.
              </p>
            </div>

            {/* Enhanced service tags with schema markup */}
            <div className="flex flex-wrap justify-center items-center gap-4 max-w-5xl mx-auto" role="list" aria-label="Our services">
              {serviceTags.map((tag, index) => (
                <div key={index} className="flex items-center" role="listitem">
                  <span 
                    className="px-4 py-2 rounded-full text-sm text-gray-300 backdrop-blur-sm border transition-colors duration-200 hover:bg-slate-600/40"
                    style={{
                      backgroundColor: 'rgba(51, 65, 85, 0.6)',
                      borderColor: 'rgba(71, 85, 105, 0.5)'
                    }}
                    title={tag.schema}
                  >
                    {tag.text}
                  </span>
                  {index < serviceTags.length - 1 && (
                    <span className="mx-3 text-gray-400 text-sm" aria-hidden="true">and</span>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced CTA buttons with better accessibility */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-8" role="group" aria-label="Call to action buttons">
              <a
                href="mailto:hello@sentientlabs.in"
                onClick={handleCTAClick('Get Custom Automation')}
                className="group w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-slate-900"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #9333ea 100%)'
                }}
                aria-label="Contact us to get your custom automation system - opens email client"
              >
                <span>Get Your Custom Automation</span>
                <ArrowRight 
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" 
                  aria-hidden="true" 
                />
              </a>

              <a
                href="#process"
                onClick={handleScrollToSection('process')}
                className="group w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 text-white text-lg font-bold rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-slate-900"
                style={{
                  backgroundColor: 'rgba(51, 65, 85, 0.4)',
                  border: '2px solid rgba(71, 85, 105, 0.6)'
                }}
                aria-label="Learn about our automation process - scrolls to process section"
              >
                <span>See How It Works</span>
                <ArrowRight 
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" 
                  aria-hidden="true" 
                />
              </a>
            </div>

            {/* Enhanced scroll indicator with better accessibility */}
            <div className="pt-16" role="region" aria-label="Scroll indicator">
              <p className="text-sm text-gray-500 mb-4" id="scroll-hint">Scroll to explore</p>
              <div 
                className="w-6 h-10 mx-auto border-2 border-gray-600 rounded-full flex justify-center"
                aria-labelledby="scroll-hint"
                role="img"
                aria-label="Scroll down indicator"
              >
                <div 
                  className={`w-1 h-3 bg-blue-400 rounded-full mt-2 ${!prefersReducedMotion ? 'animate-bounce' : ''}`}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero