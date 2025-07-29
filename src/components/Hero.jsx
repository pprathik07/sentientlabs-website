import { useRef, useCallback, useMemo, useEffect, useState } from 'react'
import { ArrowRight, Zap } from 'lucide-react'

// Lightweight reduced motion hook
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)
    
    const handleChange = (e) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}

// EXACT rotating logo using your logo-sentientlabs.png
const HeroLogo = ({ className }) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <img
      src="/logo-sentientlabs.png"
      alt="SentientLabs Logo"
      className={`object-contain ${!prefersReducedMotion ? 'animate-spin' : ''} ${className}`}
      style={{ 
        width: '80px',
        height: '80px',
        animationDuration: '3s'
      }}
      loading="eager"
      decoding="sync"
      width="80"
      height="80"
    />
  )
}

const Hero = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Fixed Intersection Observer with error handling
  useEffect(() => {
    let observer

    try {
      if ('IntersectionObserver' in window && sectionRef.current) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setIsVisible(true)
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
      try {
        observer?.disconnect()
      } catch (error) {
        console.warn('Observer cleanup failed:', error)
      }
    }
  }, [])

  // Enhanced click handlers with error handling
  const handleCTAClick = useCallback((action) => {
    return (e) => {
      try {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'click', {
            event_category: 'CTA',
            event_label: `Hero ${action}`,
            value: 1
          })
        }
      } catch (error) {
        console.warn('Analytics tracking failed:', error)
      }
    }
  }, [])

  const handleScrollToSection = useCallback((sectionId) => {
    return (e) => {
      e.preventDefault()
      try {
        const element = document.getElementById(sectionId)
        if (element) {
          requestAnimationFrame(() => {
            element.scrollIntoView({ 
              behavior: prefersReducedMotion ? 'auto' : 'smooth', 
              block: 'start' 
            })
          })
        }
      } catch (error) {
        console.warn('Scroll to section failed:', error)
        try {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView()
          }
        } catch (fallbackError) {
          console.warn('Fallback scroll failed:', fallbackError)
        }
      }
    }
  }, [prefersReducedMotion])

  // EXACT service tags matching the design
  const serviceTags = useMemo(() => [
    'CRM + Email + LinkedIn integration',
    'custom funnel automation', 
    'intelligent lead qualification'
  ], [])

  // Safe animation classes
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 translate-y-8'
    if (prefersReducedMotion) return 'opacity-100 translate-y-0'
    return 'opacity-100 translate-y-0 transition-all duration-700 ease-out'
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #1e293b 100%)',
        backgroundColor: '#1e293b'
      }}
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* EXACT background matching your image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,255,120,0.03),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className={`text-center space-y-8 ${getAnimationClass()}`}>
          
          {/* EXACT Main Headline with rotating logo */}
          <div className="space-y-6">
            <h1 
              id="hero-heading"
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              {/* WE AUT[LOGO]MATE. in one line */}
              <div className="flex items-center justify-center flex-wrap gap-2">
                <span className="text-white">WE AUT</span>
                <div className="inline-block mx-2">
                  <HeroLogo />
                </div>
                <span className="text-white">MATE.</span>
              </div>
              
              {/* YOU GROW. with purple gradient */}
              <div className="mt-4">
                <span 
                  className="bg-clip-text text-transparent font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  YOU GROW.
                </span>
              </div>
            </h1>
          </div>

          {/* EXACT Subheading */}
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-2xl md:text-3xl text-gray-300 font-medium">
              Manual lead gen is dead.
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              We build intelligent automation systems that fill your pipeline while you sleep.
            </p>
          </div>

          {/* EXACT Service tags with "and" between them */}
          <div className="flex flex-wrap justify-center items-center gap-4 max-w-5xl mx-auto">
            {serviceTags.map((tag, index) => (
              <div key={index} className="flex items-center">
                <span 
                  className="px-4 py-2 rounded-full text-sm text-gray-300 backdrop-blur-sm border"
                  style={{
                    backgroundColor: 'rgba(51, 65, 85, 0.6)',
                    borderColor: 'rgba(71, 85, 105, 0.5)'
                  }}
                >
                  {tag}
                </span>
                {index < serviceTags.length - 1 && (
                  <span className="mx-3 text-gray-400 text-sm">and</span>
                )}
              </div>
            ))}
          </div>

          {/* EXACT CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-8">
            <a
              href="mailto:hello@sentientlabs.in"
              onClick={handleCTAClick('Get Custom Automation')}
              className="group w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #9333ea 100%)'
              }}
              aria-label="Get your custom automation system"
            >
              <span>Get Your Custom Automation</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>

            <a
              href="#process"
              onClick={handleScrollToSection('process')}
              className="group w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 text-white text-lg font-bold rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              style={{
                backgroundColor: 'rgba(51, 65, 85, 0.4)',
                border: '2px solid rgba(71, 85, 105, 0.6)'
              }}
              aria-label="See how our automation process works"
            >
              <span>See How It Works</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>

          {/* EXACT Scroll indicator */}
          <div className="pt-16">
            <p className="text-sm text-gray-500 mb-4">Scroll to explore</p>
            <div className="w-6 h-10 mx-auto border-2 border-gray-600 rounded-full flex justify-center">
              <div className={`w-1 h-3 bg-blue-400 rounded-full mt-2 ${!prefersReducedMotion ? 'animate-bounce' : ''}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero