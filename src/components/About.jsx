import { memo, useMemo, useRef, useEffect, useState } from 'react';
import { Zap, Target, TrendingUp, Users } from 'lucide-react';

// Icon wrapper
const IconWrapper = memo(({ Icon }) => (
  <div className="p-3 bg-blue-600 bg-opacity-20 rounded-lg">
    <Icon size={24} className="text-blue-400" />
  </div>
));

// Feature card
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
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`p-6 bg-gray-900 bg-opacity-50 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <IconWrapper Icon={Icon} />
      <h3 className="text-xl font-semibold text-white my-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
});

// Section header
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
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
});

const About = () => {
  const aboutData = useMemo(() => ({
    header: {
      title: 'Revolutionizing Agency Automation',
      subtitle: 'We combine powerful AI tools with proven marketing strategies to help agencies grow efficiently and predictably.'
    },
    features: [
      {
        icon: Zap,
        title: 'Lightning Fast Automation',
        description: 'Deploy AI systems that cut down manual work and boost team output from day one.'
      },
      {
        icon: Target,
        title: 'Precision Targeting',
        description: 'Our algorithms qualify high-value leads automatically, so you focus only on what converts.'
      },
      {
        icon: TrendingUp,
        title: 'Scalable Growth',
        description: 'Solutions that evolve with your agency—from 5 clients to 500.'
      },
      {
        icon: Users,
        title: 'Expert Support',
        description: 'Our team is always available to make sure your automations run smoothly and deliver ROI.'
      }
    ]
  }), []);

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader title={aboutData.header.title} subtitle={aboutData.header.subtitle} />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutData.features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-white mb-1">
                Ready to Transform Your Agency?
              </h3>
              <p className="text-blue-100">
                Get started with a free consultation today
              </p>
            </div>
            <a
              href="tel:+919876543210"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
