import React, { memo, useMemo, useRef, useEffect, useState } from 'react';
import { 
  Bot, 
  Phone, 
  BarChart3, 
  MessageSquare, 
  Zap, 
  Filter 
} from 'lucide-react';

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
    }, { threshold: 0.1, rootMargin: '50px' });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-gray-800/50 hover:border-purple-500/50 hover:bg-gray-800/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon size={20} className="text-white lg:w-6 lg:h-6" />
      </div>
      
      <h3 className="text-lg lg:text-xl font-bold text-white mb-3 leading-tight">
        {title}
      </h3>
      
      <p className="text-gray-300 mb-4 leading-relaxed text-sm">
        {description}
      </p>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

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
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center mb-8 lg:mb-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold mb-6">
        <Zap className="w-4 h-4" />
        <span>Our Solutions</span>
      </div>
      
      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Transform Your
        </span>
        <br />
        <span className="text-white">Business Operations</span>
      </h2>
      
      <p className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Comprehensive AI-powered solutions designed to automate your workflows and accelerate growth
      </p>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

const Services = () => {
  const servicesData = useMemo(() => [
    {
      icon: Bot,
      title: 'AI Lead Qualification',
      description: '24/7 intelligent bots that automatically qualify and score leads based on your criteria.',
      features: ['Smart conversation flows', 'Advanced lead scoring', 'CRM integration ready', 'Multi-language support', 'Always-on availability']
    },
    {
      icon: Filter,
      title: 'Automated Funnels',
      description: 'Sophisticated nurture sequences that guide leads from initial contact to conversion.',
      features: ['Personalized user journeys', 'A/B testing capabilities', 'Detailed conversion analytics', 'Email automation', 'Performance insights']
    },
    {
      icon: Phone,
      title: 'Voice AI Solutions',
      description: 'Natural-sounding AI that handles calls, scheduling, and lead qualification seamlessly.',
      features: ['Human-like conversations', 'Automated appointment booking', 'Complete call transcriptions', 'Lead qualification', 'CRM synchronization']
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights platform to track performance, ROI, and optimize your operations.',
      features: ['Real-time metrics', 'Traffic source analysis', 'Conversion tracking', 'Custom reports', 'Personalized dashboards']
    },
    {
      icon: MessageSquare,
      title: 'Omnichannel Messaging',
      description: 'Unified communication platform combining WhatsApp, email, SMS, and live chat.',
      features: ['Centralized inbox', 'Multi-channel campaigns', 'SMS/Email/Chat integration', 'WhatsApp Business API', 'Workflow automation']
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'Eliminate repetitive tasks and streamline operations with intelligent automation.',
      features: ['Custom workflow builder', 'API integrations', 'Task automation bots', 'Visual process designer', 'Team collaboration tools']
    }
  ], []);

  return (
    <section 
      id="services" 
      className="py-12 lg:py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <SectionHeader />
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              delay={index * 100} 
            />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="inline-block p-6 lg:p-8 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl shadow-xl backdrop-blur-sm border border-white/10 max-w-4xl">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
              Need a Custom Solution?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto leading-relaxed">
              We build tailored AI automations specifically for your business needs. Let's discuss how we can transform your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+918788775779" 
                className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Schedule Consultation
              </a>
              <a 
                href="mailto:hello@sentientlabs.in" 
                className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Services);