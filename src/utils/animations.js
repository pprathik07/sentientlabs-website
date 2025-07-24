import { gsap } from 'gsap'

// Complex reveal animations for sections[41][47]
export const createRevealAnimation = (trigger, elements) => {
  return gsap.fromTo(elements,
    {
      y: 100,
      opacity: 0,
      rotationX: -30,
      transformOrigin: "center bottom"
    },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  )
}

// Magnetic button effect
export const createMagneticEffect = (element) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(element, {
      duration: 0.3,
      x: x * 0.3,
      y: y * 0.3,
      ease: "power2.out"
    })
  })
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      duration: 0.5,
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.3)"
    })
  })
}

// Particle system animation
export const createParticleSystem = (container, count = 50) => {
  const particles = []
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div')
    particle.className = 'absolute w-1 h-1 bg-primary/20 rounded-full pointer-events-none'
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    container.appendChild(particle)
    particles.push(particle)
    
    gsap.to(particle, {
      duration: Math.random() * 10 + 5,
      x: `random(-200, 200)`,
      y: `random(-200, 200)`,
      rotation: `random(0, 360)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  }
  
  return particles
}

// Text morphing animation
export const createTextMorph = (element, texts, duration = 2) => {
  let currentIndex = 0
  
  const morphText = () => {
    gsap.to(element, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      ease: "power2.in",
      onComplete: () => {
        currentIndex = (currentIndex + 1) % texts.length
        element.textContent = texts[currentIndex]
        gsap.to(element, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        })
      }
    })
  }
  
  const interval = setInterval(morphText, duration * 1000)
  return () => clearInterval(interval)
}

// Complex scroll-triggered timeline
export const createScrollTimeline = (trigger, animations) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      pin: false
    }
  })
  
  animations.forEach(({ element, from, to, duration = 1 }) => {
    tl.fromTo(element, from, { ...to, duration })
  })
  
  return tl
}
