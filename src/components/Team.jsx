import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { User, Brain, TrendingUp, Phone, Linkedin } from 'lucide-react'

const Team = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 })

  const teamMembers = [
    {
      emoji: "👨‍💼",
      name: "Krish Dubey",
      position: "Co-Founder & CEO",
      bio: "Vision. Sales. Relentless execution.",
      image: "/src/assets/images/krish_dubey_pfp.jpeg",
      phone: "+918788775779",
      linkedin: "https://www.linkedin.com/in/dubeykrish/",
      icon: User,
      color: "from-blue-500 to-blue-600"
    },
    {
      emoji: "🧠",
      name: "Karthik Chaudhary", 
      position: "Co-Founder & Chief Intelligence Officer",
      bio: "Product strategy & AI brain of the ops.",
      image: "/src/assets/images/karthik_chaudhary_pfp.jpg",
      phone: "+917020080167",
      linkedin: "https://www.linkedin.com/in/karthik-chaudhary-0082b630a/",
      icon: Brain,
      color: "from-purple-500 to-purple-600"
    },
    {
      emoji: "📈",
      name: "Harshit Dubey",
      position: "Co-Founder & Chief Growth Officer", 
      bio: "Growth hacking meets lead engineering.",
      image: "/src/assets/images/harshit.jpg",
      phone: "+917800292464",
      linkedin: "https://www.linkedin.com/in/harshit-dubey-11b115376/",
      icon: TrendingUp,
      color: "from-green-500 to-green-600"
    }
  ]

  return (
    <section ref={sectionRef} id="team" className="section-reveal py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-6">
            👥 OUR TEAM
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            The <span className="text-primary">SentientLabs</span> Team
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
            We're a lean, obsessed, automation-first squad that eats, breathes, and lives AI systems.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group text-center relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              {/* Profile Image Container */}
              <motion.div 
                className="relative mb-6 sm:mb-8 mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto rounded-full border-4 border-gradient-to-br ${member.color} overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 relative`}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay with emoji */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 sm:pb-4">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">{member.emoji}</span>
                  </div>
                </div>
                
                {/* Role Icon */}
                <motion.div 
                  className={`absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 15 }}
                >
                  <member.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
              </motion.div>
              
              {/* Content */}
              <div className="space-y-3 sm:space-y-4">
                <motion.h3 
                  className="text-xl sm:text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {member.name}
                </motion.h3>
                
                <p className="text-primary text-sm sm:text-base lg:text-lg font-semibold leading-tight">
                  {member.position}
                </p>
                
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-sm mx-auto font-medium">
                  {member.bio}
                </p>
                
                {/* Contact Options */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center mt-4 sm:mt-6">
                  <motion.a
                    href={`tel:${member.phone}`}
                    className={`inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r ${member.color} text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Call</span>
                  </motion.a>
                  
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 px-3 sm:px-4 py-2 border-2 border-gradient-to-r ${member.color.replace('from-', 'border-').replace('to-', '')} text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-white/10 transition-all duration-300`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="inline-block px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/30 rounded-2xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
              Ready to meet the team that will transform your business? 
              <span className="text-primary"> Let's talk.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Team
