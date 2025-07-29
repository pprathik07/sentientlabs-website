import { memo, useMemo, useRef, useEffect, useState } from 'react';
import { Bot, Phone, BarChart3, MessageSquare, Zap, Filter } from 'lucide-react';

const ServiceCard = memo(({ icon: Icon, title, description, features, delay = 0 }) => {
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
    }, { threshold: 0.2, rootMargin: '50px' });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

const SectionHeader = memo(() => {
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
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Our Services
        </span>
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Comprehensive AI-powered solutions designed to transform your agency's lead generation and customer engagement
      </p>
    </div>
  );
});

const Services = () => {
  const servicesData = useMemo(() => [
    {
      icon: Bot,
      title: 'AI Lead Qualification',
      description: '24/7 bots that qualify leads automatically.',
      features: ['Smart flows', 'Lead scoring', 'CRM ready', 'Multilingual', 'Always-on']
    },
    {
      icon: Filter,
      title: 'Automated Funnels',
      description: 'Auto nurture leads from contact to close.',
      features: ['Personalized flows', 'A/B testing', 'Conversion reports', 'Email automation', 'Analytics']
    },
    {
      icon: Phone,
      title: 'Voice AI Solutions',
      description: 'Phone AI that handles scheduling and lead calls.',
      features: ['Natural speech', 'Auto bookings', 'Call logs', 'Qualification', 'CRM sync']
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track performance, ROI, and insights in one place.',
      features: ['Live metrics', 'Source breakdown', 'Conversions', 'Reports', 'Custom views']
    },
    {
      icon: MessageSquare,
      title: 'Omnichannel Messaging',
      description: 'Combine WhatsApp, email, SMS, and more.',
      features: ['Unified inbox', 'Campaigns', 'SMS/Email/Chat', 'WhatsApp', 'Automation']
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'Eliminate repetitive work. Boost operations.',
      features: ['Custom workflows', 'APIs', 'Task bots', 'Process builder', 'Team tools']
    }
  ], []);

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} delay={index * 100} />
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
            <p className="text-blue-100 mb-6 max-w-md">We build tailored automations just for your agency. Let's talk.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Schedule Consultation</a>
              <a href="mailto:hello@sentientlabs.in" className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">Email Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
