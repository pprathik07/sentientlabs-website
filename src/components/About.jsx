import { memo, useMemo, useRef, useEffect, useState } from 'react';
import { Zap, Target, TrendingUp, Users, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';

// Enhanced Icon wrapper - optimized
const IconWrapper = memo(({ Icon }) => (
  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
    <Icon size={18} className="text-white" />
  </div>
));

IconWrapper.displayName = 'IconWrapper';

// Simplified Feature card - reduced animations
const FeatureCard = memo(({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group p-4 bg-gray-900/40 rounded-xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <IconWrapper Icon={Icon} />
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
});

FeatureCard.displayName = 'FeatureCard';

// Simplified Section header
const SectionHeader = memo(({ title, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center mb-10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-4">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>About SentientLabs</span>
      </div>
      
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      
      <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

const About = () => {
  const aboutData = useMemo(() => ({
    header: {
      title: 'Revolutionizing Business with AI',
      subtitle: 'We combine cutting-edge artificial intelligence with proven business strategies to help companies automate operations, increase efficiency, and drive sustainable growth.'
    },
    features: [
      {
        icon: Zap,
        title: 'Lightning Fast Implementation',
        description: 'Deploy AI-powered automation systems that eliminate manual work and boost team productivity from day one.'
      },
      {
        icon: Target,
        title: 'Precision-Driven Solutions',
        description: 'Our intelligent algorithms automatically identify and qualify high-value opportunities for maximum ROI.'
      },
      {
        icon: TrendingUp,
        title: 'Infinitely Scalable Growth',
        description: 'Built-to-scale solutions that evolve with your business journey—from startup to enterprise level.'
      },
      {
        icon: Users,
        title: 'Dedicated Expert Support',
        description: 'Our specialized team provides continuous support and optimization to ensure maximum performance.'
      }
    ]
  }), []);

  return (
    <section 
      id="about" 
      className="py-12 lg:py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <SectionHeader 
          title={aboutData.header.title} 
          subtitle={aboutData.header.subtitle} 
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {aboutData.features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Optimized CTA Section - Compact & Clean */}
        <div className="text-center">
          <div className="inline-block p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg border border-white/10 max-w-lg">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to Transform Your Business?
            </h3>
            <p className="text-blue-100 text-sm mb-4 leading-relaxed">
              Join hundreds of companies using our AI solutions to accelerate growth.
            </p>
            
            {/* Compact Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="tel:+918788775779"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-sm"
              >
                <Phone size={16} />
                Call Now
              </a>
              
              <a
                href="mailto:hello@sentientlabs.in"
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/40 text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 text-sm"
              >
                <Mail size={16} />
                Email Us
              </a>
              
              <button className="inline-flex items-center gap-1 px-3 py-2 text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);