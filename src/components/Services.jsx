import { motion } from 'framer-motion'
import {
  ArrowRight,
  Clock,
  DollarSign,
  TrendingDown,
  AlertTriangle
} from 'lucide-react'

const Services = () => {
  const challenges = [
    {
      emoji: '🧠',
      title: "You're relying on outdated tactics",
      description: "Still using manual outreach methods that worked 5 years ago",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
    },
    {
      emoji: '⏳',
      title: "Wasting hours every week on outreach",
      description: "Endless cold calls, email sequences and follow-ups eating your time",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
    },
    {
      emoji: '💸',
      title: "Paying for tools and teams that don't scale",
      description: "Costs grow faster than results, killing your margins",
      icon: DollarSign,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      emoji: '📉',
      title: "Leads coming in—but conversions falling flat",
      description: "Getting traffic but struggling to turn prospects into paying clients",
      icon: TrendingDown,
      color: "from-purple-500 to-purple-600",
    },
    {
      emoji: '📵',
      title: "And worst of all? It's not even predictable",
      description: "Revenue rollercoaster making it impossible to plan and scale",
      icon: AlertTriangle,
      color: "from-gray-500 to-gray-600",
    },
  ]

  return (
    <section id="challenges" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 bg-red-500/10 text-red-400 text-xs sm:text-sm font-semibold rounded-full mb-4">
            ⚠️ THE PROBLEM
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Why You're Still Stuck in the<br className="hidden sm:inline"/> Lead Gen Loop:
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Sound familiar? You're not alone. Here's what keeps most businesses trapped in inefficient lead-gen cycles:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {challenges.map((c, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col p-4 sm:p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg xl:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
            >
              <motion.div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.color}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />

              <div className="flex items-center mb-4">
                <span className="text-2xl sm:text-3xl mr-3">{c.emoji}</span>
                <motion.div
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${c.color} text-white`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <c.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </div>

              <motion.h3
                className="text-lg sm:text-xl font-semibold text-white mb-2"
                whileHover={{ color: "#f87171" }}
                transition={{ duration: 0.2 }}
              >
                {c.title}
              </motion.h3>
              
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed flex-grow">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6">
            Let's change that. <span className="text-primary">Permanently.</span>
          </h3>
          <motion.a
            href="#services"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-purple-600 text-white text-base sm:text-lg font-semibold rounded-full shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(122, 99, 255, 0.4), 0 10px 10px -5px rgba(122, 99, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            See Our Solution
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
