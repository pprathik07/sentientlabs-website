import { memo, useState, useCallback, useEffect, useRef } from 'react'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'

// Enhanced Logo component with proper image handling
const Logo = memo(() => {
  const [imageError, setImageError] = useState(false)
  
  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  return (
    <div className="flex items-center space-x-3 cursor-pointer group">
      {/* Logo Image */}
      {!imageError ? (
        <img
          src="/logo-sentientlabs.webp"
          alt="SentientLabs Logo"
          className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
          loading="eager"
          onError={handleImageError}
        />
      ) : (
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      )}
      
      {/* Enhanced Text Logo */}
      <div className="text-2xl font-bold">
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-extrabold tracking-tight">
          Sentient
        </span>
        <span className="text-white font-bold ml-1">Labs</span>
      </div>
    </div>
  )
})

Logo.displayName = 'Logo'

// Navigation items configuration
const NAV_ITEMS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'contact', label: 'Contact', href: '#contact' }
]

// Enhanced Navigation Link with perfect scrolling
const NavLink = memo(({ item, isActive, onClick }) => {
  const handleClick = useCallback((e) => {
    e.preventDefault()
    
    // Close mobile menu if callback provided
    onClick?.()
    
    // Find target element with multiple fallback strategies
    let targetElement = document.getElementById(item.id)
    
    // Fallback: try to find by section with data attribute
    if (!targetElement) {
      targetElement = document.querySelector(`[data-section="${item.id}"]`)
    }
    
    // Fallback: try to find by class name
    if (!targetElement) {
      targetElement = document.querySelector(`.${item.id}-section`)
    }
    
    // Fallback: try exact href match
    if (!targetElement) {
      targetElement = document.querySelector(`section${item.href}`)
    }
    
    if (targetElement) {
      // Calculate proper offset
      const headerHeight = 80
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
      
      // Smooth scroll with requestAnimationFrame for better performance
      const scrollToElement = () => {
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(scrollToElement)
      
      // Update URL after a brief delay to ensure scroll started
      setTimeout(() => {
        if (window.history && window.history.pushState) {
          window.history.pushState(null, null, item.href)
        }
      }, 100)
    } else {
      // If element not found, try alternative navigation
      console.warn(`Section "${item.id}" not found, attempting alternative navigation`)
      
      // Force page scroll to approximate location based on typical section heights
      const sectionIndex = NAV_ITEMS.findIndex(navItem => navItem.id === item.id)
      const approximatePosition = sectionIndex * window.innerHeight * 0.8
      
      window.scrollTo({
        top: approximatePosition,
        behavior: 'smooth'
      })
    }
  }, [item, onClick])

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
        isActive 
          ? 'text-white bg-white/10' 
          : 'text-gray-300 hover:text-white hover:bg-white/5'
      }`}
    >
      {item.label}
      {/* Active indicator */}
      <span 
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${
          isActive ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-70'
        }`}
      />
    </a>
  )
})

NavLink.displayName = 'NavLink'

// Enhanced CTA Button
const CTAButton = memo(({ onClick, isMobile = false }) => {
  const handleClick = useCallback((e) => {
    e.preventDefault()
    onClick?.()
    
    // Navigate to contact section first, then initiate call
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' })
      
      // Small delay before opening phone app
      setTimeout(() => {
        window.location.href = 'tel:+918788775779'
      }, 500)
    }
  }, [onClick])

  return (
    <button
      onClick={handleClick}
      className={`group inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
        isMobile ? 'w-full justify-center py-3' : ''
      }`}
    >
      <Phone size={16} className="transition-transform duration-200 group-hover:rotate-12" />
      <span>Get Started</span>
      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
    </button>
  )
})

CTAButton.displayName = 'CTAButton'

// Mobile Menu Component
const MobileMenu = memo(({ isOpen, onClose, activeSection }) => {
  const menuRef = useRef(null)

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose()
      }
      
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-lg border-l border-gray-700/50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.id} className="block">
                  <NavLink
                    item={item}
                    isActive={activeSection === item.id}
                    onClick={onClose}
                  />
                </div>
              ))}
            </div>
          </nav>
          
          {/* CTA Button */}
          <div className="p-6 border-t border-gray-700/50">
            <CTAButton onClick={onClose} isMobile />
          </div>
        </div>
      </div>
    </div>
  )
})

MobileMenu.displayName = 'MobileMenu'

// Main Navigation Component
const Navigation = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Debug helper to log available sections
  useEffect(() => {
    const checkSections = () => {
      console.log('Checking for navigation sections...')
      NAV_ITEMS.forEach(item => {
        const element = document.getElementById(item.id)
        console.log(`Section "${item.id}":`, element ? 'Found' : 'Not found')
        
        if (!element) {
          // Check alternative selectors
          const alternatives = [
            document.querySelector(`[data-section="${item.id}"]`),
            document.querySelector(`.${item.id}-section`),
            document.querySelector(`section[class*="${item.id}"]`),
            document.querySelector(`div[class*="${item.id}"]`)
          ]
          
          alternatives.forEach((alt, index) => {
            if (alt) console.log(`  Alternative ${index + 1} found:`, alt)
          })
        }
      })
    }
    
    // Check immediately and after a delay to catch dynamically loaded content
    checkSections()
    const timer = setTimeout(checkSections, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section with Intersection Observer
  useEffect(() => {
    // Multiple strategies to find sections
    const findSections = () => {
      const sections = []
      
      NAV_ITEMS.forEach(item => {
        // Try multiple selectors to find sections
        let element = document.getElementById(item.id) ||
                     document.querySelector(`[data-section="${item.id}"]`) ||
                     document.querySelector(`.${item.id}-section`) ||
                     document.querySelector(`section[id*="${item.id}"]`) ||
                     document.querySelector(`div[id*="${item.id}"]`)
        
        if (element) {
          sections.push({ element, id: item.id })
        }
      })
      
      return sections
    }
    
    const sections = findSections()
    
    if (sections.length === 0) {
      console.warn('No sections found for navigation tracking')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0
        let activeId = ''
        
        entries.forEach((entry) => {
          const sectionId = sections.find(s => s.element === entry.target)?.id
          
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio && sectionId) {
            maxRatio = entry.intersectionRatio
            activeId = sectionId
          }
        })
        
        if (activeId && maxRatio > 0.2) {
          setActiveSection(activeId)
        }
      },
      { 
        threshold: [0.1, 0.2, 0.3, 0.5, 0.7],
        rootMargin: '-80px 0px -50% 0px'
      }
    )

    sections.forEach(({ element }) => observer.observe(element))
    
    return () => observer.disconnect()
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <NavLink 
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                />
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <CTAButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu}
        activeSection={activeSection}
      />
    </>
  )
})

Navigation.displayName = 'Navigation'

export default Navigation