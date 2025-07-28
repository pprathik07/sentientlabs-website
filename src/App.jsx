import React, { Suspense, lazy } from 'react'
import Navigation from './components/Navigation.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import './App.css'

const Hero = lazy(() => import('./components/Hero.jsx'))
const About = lazy(() => import('./components/About.jsx'))
const Services = lazy(() => import('./components/Services.jsx'))
const Trust = lazy(() => import('./components/Trust.jsx'))
const Process = lazy(() => import('./components/Process.jsx'))
const Team = lazy(() => import('./components/Team.jsx'))
const CTA = lazy(() => import('./components/CTA.jsx'))
const Footer = lazy(() => import('./components/Footer.jsx'))

const LoadingFallback = () => (
  <div 
    className="flex items-center justify-center min-h-screen bg-black"
    role="status"
    aria-label="Loading page content"
  >
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    <span className="sr-only">Loading...</span>
  </div>
)

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <CustomCursor />
      <Navigation />
      
      <main id="main-content" tabIndex="-1">
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
          <About />
          <Services />
          <Trust />
          <Process />
          <Team />
          <CTA />
        </Suspense>
      </main>
      
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App