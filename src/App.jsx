import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Trust from './components/Trust'
import Team from './components/Team'
import CTA from './components/CTA'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef(null)

  useEffect(() => {
    // Global animations
    const sections = gsap.utils.toArray('.section-reveal')
    
    sections.forEach((section, index) => {
      gsap.fromTo(section, 
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={appRef} className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Process />
      <Trust />
      <Team />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
