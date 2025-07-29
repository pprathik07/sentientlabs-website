import { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { Lightbulb, Rocket, RotateCcw, Zap, ArrowRight } from 'lucide-react'

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
      setPrefersReduced(true) // Safe fallback
    }
  }, [])

  return prefersReduced
}

// Optimized intersection observer hook
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

// Memoized process step card component
const ProcessStepCard = ({ step, index, isVisible, prefersReducedMotion }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  return (
    <article
      className={`group relative h-full transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${!prefersReducedMotion && isHovered ? 'scale-105' : ''}`}
      style={{ 
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-labelledby={`step-${index + 1}-title`}
    >
      {/* Step Number */}
      <div 
        className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10 border-2 border-gray-900"
        role="img"
        aria-label={`Step ${index + 1}`}
      >
        {index + 1}
      </div>

      {/* Card Container */}
      <div className="h-full p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
        
        {/* Icon Container */}
        <div 
          className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg ${
            !prefersReducedMotion && isHovered ? 'scale-110' : ''
          } transition-transform duration-300`}
          aria-hidden="true"
        >
          <step.icon className="w-8 h-8 text-white" strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <header>
            <h3 
              id={`step-${index + 1}-title`}
              className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300"
            >
              {step.title}
            </h3>
            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
              {step.subtitle}
            </h4>
          </header>
          
          <p className="text-gray-300 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Connecting Arrow */}
        {index < 2 && (
          <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <ArrowRight className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

// Header component
const ProcessHeader = ({ isVisible, prefersReducedMotion }) => (
  <header 
    className={`text-center mb-16 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold mb-6">
      <Zap className="w-4 h-4" aria-hidden="true" />
      HOW IT WORKS
    </div>
    
    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
      Plan →{' '}
      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
        Build
      </span>{' '}
      → Manage
    </h2>
    
    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
      Zero Manual Effort. Maximum ROI.
    </p>
  </header>
)

// CTA component
const ProcessCTA = ({ isVisible, prefersReducedMotion }) => (
  <footer
    className={`text-center transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
    style={{ transitionDelay: '600ms' }}
  >
    <div className="inline-block p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-4">
        Simple process.{' '}
        <span className="text-blue-100">Extraordinary results.</span>
      </h3>
      <p className="text-blue-100 mb-6 max-w-md mx-auto">
        Ready to automate your agency's growth? Let's build your custom solution.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="tel:+918788775779" 
          className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Start Your Automation
        </a>
        <a 
          href="mailto:hello@sentientlabs.in" 
          className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300"
        >
          Get Free Consultation
        </a>
      </div>
    </div>
  </footer>
)

// Main Process component
const Process = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver(0.5)
  const [gridRef, isGridVisible] = useIntersectionObserver(0.2)
  const [ctaRef, isCtaVisible] = useIntersectionObserver(0.3)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Process steps data
  const processSteps = useMemo(() => [
    {
      icon: Lightbulb,
      title: "Plan",
      subtitle: "Custom Automation Blueprint",
      description: "We reverse-engineer your dream client's journey and map every step with AI logic.",
      gradient: "from-blue-500 to-blue-600",
      delay: 0
    },
    {
      icon: Rocket,
      title: "Build", 
      subtitle: "End-to-End Deployment",
      description: "Our team integrates tools, writes the copy, trains the bots, and automates your outreach.",
      gradient: "from-green-500 to-green-600",
      delay: 100
    },
    {
      icon: RotateCcw,
      title: "Manage",
      subtitle: "Continuous Optimization", 
      description: "We monitor, tweak, and scale every automation so it keeps getting smarter.",
      gradient: "from-purple-500 to-purple-600",
      delay: 200
    }
  ], [])

  return (
    <section 
      id="process" 
      className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
      aria-labelledby="process-heading"
      role="region"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div ref={headerRef}>
          <ProcessHeader 
            isVisible={isHeaderVisible} 
            prefersReducedMotion={prefersReducedMotion} 
          />
        </div>

        {/* Process Steps Grid */}
        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
            isGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {processSteps.map((step, index) => (
            <ProcessStepCard
              key={step.title}
              step={step}
              index={index}
              isVisible={isGridVisible}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef}>
          <ProcessCTA 
            isVisible={isCtaVisible} 
            prefersReducedMotion={prefersReducedMotion} 
          />
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "SentientLabs AI Automation Process",
            "description": "3-step process to implement AI automation for agencies",
            "step": processSteps.map((step, index) => ({
              "@type": "HowToStep",
              "position": index + 1,
              "name": step.title,
              "text": step.description
            }))
          })
        }}
      />
    </section>
  )
}

export default Process