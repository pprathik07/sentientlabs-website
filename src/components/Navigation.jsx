import { memo, useState, useCallback, useEffect, useRef } from 'react'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'

// Ultra-lightweight logo component
const Logo = memo(() => (
  <div className="cursor-pointer">
    <div className="text-2xl font-bold text-white transition-colors duration-200 hover:text-gray-200">
      <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Sentient
      </span>
      <span className="text-white">Labs</span>
    </div>
  </div>
))

Logo.displayName = 'Logo'

// Precomputed navigation items
const NAV_ITEMS = Object.freeze([
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' }
])

// Optimized navigation link with minimal DOM manipulation
const NavLink = memo(({ href, label, onClick, isActive = false }) => {
  const handleClick = useCallback((e) => {
    e.preventDefault()
    const targetId = href.slice(1) // Remove '#'
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      // Use native smooth scrolling for better performance
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      })
      
      // Update URL without triggering navigation
      if (window.history.replaceState) {
        window.history.replaceState(null, null, href)
      }
    }
    
    onClick?.()
  }, [href, onClick])

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative text-gray-300 hover:text-white transition-colors duration-200 py-2 px-1 ${
        isActive ? 'text-white' : ''
      }`}
    >
      {label}
      <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 ${
        isActive ? 'w-full' : 'w-0 hover:w-full'
      }`} />
    </a>
  )
})

NavLink.displayName = 'NavLink'

// Simplified CTA button without complex animations
const CTAButton = memo(({ onClick, className = '' }) => (
  <a
    href="tel:+919876543210"
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 ${className}`}
  >
    <Phone size={16} />
    <span>Get Started</span>
    <ArrowRight size={16} />
  </a>
))

CTAButton.displayName = 'CTAButton'

// Optimized mobile menu with virtualization for large lists
const MobileMenu = memo(({ isOpen, onClose, activeSection }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Focus management for accessibility
      const timer = setTimeout(() => {
        const firstNavItem = menuRef.current?.querySelector('a')
        firstNavItem?.focus()
      }, 100)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Early return to prevent unnecessary rendering
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Panel */}
      <div 
        ref={menuRef}
        className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-gray-900 border-l border-gray-700 shadow-2xl transform transition-transform duration-300 ease-out"
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white">Navigation</h2>
            <button
              onClick={onClose}
              className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close navigation menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 space-y-2" role="navigation">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="block py-3 px-4 text-lg rounded-lg hover:bg-gray-800 transition-colors">
                <NavLink
                  href={item.href}
                  label={item.label}
                  onClick={onClose}
                  isActive={activeSection === item.href.slice(1)}
                />
              </div>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="pt-6 border-t border-gray-700">
            <CTAButton onClick={onClose} className="w-full justify-center" />
          </div>
        </div>
      </div>
    </div>
  )
})

MobileMenu.displayName = 'MobileMenu'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }
  }, [isScrolled])

  // Optimized intersection observer for active sections
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => 
      document.getElementById(item.href.slice(1))
    ).filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with highest intersection ratio
        let maxRatio = 0
        let activeId = ''
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            activeId = entry.target.id
          }
        })
        
        if (activeId && maxRatio > 0.3) {
          setActiveSection(activeId)
        }
      },
      { 
        threshold: [0.3, 0.5, 0.7], 
        rootMargin: '-20% 0px -20% 0px' 
      }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Optimized scroll event listener with passive option
  useEffect(() => {
    let ticking = false
    
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [handleScroll])

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), [])
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <NavLink 
                  key={item.href} 
                  href={item.href} 
                  label={item.label}
                  isActive={activeSection === item.href.slice(1)}
                />
              ))}
              <CTAButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu}
        activeSection={activeSection}
      />
    </>
  )
}

export default memo(Navigation)