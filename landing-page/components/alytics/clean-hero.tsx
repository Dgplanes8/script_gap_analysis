'use client';

import { motion } from 'framer-motion';

interface CleanHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export function CleanHero({ 
  title, 
  subtitle, 
  ctaText,
  onCtaClick 
}: CleanHeroProps) {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const serviceSection = document.getElementById('service-tiers');
      if (serviceSection) {
        serviceSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            $250MM+ Managed Spend Experience
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={handleCtaClick}
            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {ctaText}
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4">Trusted by startup founders</p>
            <div className="flex justify-center items-center space-x-6 opacity-60">
              <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded">
                Weekly Delivery
              </div>
              <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded">
                No Contracts
              </div>
              <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded">
                Cancel Anytime
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-50 opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gray-50 opacity-30"></div>
      </div>
    </section>
  );
}