// src/components/Trust.jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BadgeCheck, Zap, Users } from 'lucide-react'

const Trust = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 })

  const trustPoints = [
    {
      icon: BadgeCheck,
      title: 'Affordable Automation',
      description:
        'Cost-effective AI that lets small businesses automate without breaking the bank.'
    },
    {
      icon: Zap,
      title: 'Fast Implementation',
      description:
        'Rapid, end-to-end deployment customised to your exact workflows for maximum impact.'
    },
    {
      icon: Users,
      title: 'Tailored for You',
      description:
        'Every solution is engineered around your goals, data, and growth stage—never off-the-shelf.'
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="section-reveal bg-bg-light text-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-8 sm:mb-12 lg:mb-16 max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8">
            Why Our Clients Trust Us
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 sm:mb-12">
            At SentientLabs we turn complex AI automation into simple, practical tools
            that save time, slash costs, and help small businesses scale
            effortlessly—backed by years of deep engineering experience.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-6">
            What Sets Us Apart
          </h3>
        </motion.div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trustPoints.map((point, idx) => (
            <motion.div
              key={point.title}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 flex items-center justify-center text-primary">
                <point.icon size={48} className="sm:w-14 sm:h-14" />
              </div>

              <h4 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">
                {point.title}
              </h4>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trust
