'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, Shield } from 'lucide-react';

export function FinalCTASection() {
  const benefits = [
    {
      icon: Zap,
      text: "First week completely FREE"
    },
    {
      icon: Clock,
      text: "Start creating content in 10 minutes"
    },
    {
      icon: Shield,
      text: "Cancel anytime, no commitments"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-600 to-red-700 text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-700/20"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 relative">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          
          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Start Creating{' '}
            <span className="text-yellow-300">
              Viral Content Today
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join startup teams getting trending content intelligence + custom scripts every Monday. Lock in launch pricing with no commitment.
          </p>

          {/* Benefits Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 text-lg font-medium"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-4 h-4" />
                </div>
                <span>{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Main CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const serviceSection = document.getElementById('pricing');
                if (serviceSection) {
                  serviceSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-10 py-5 rounded-2xl transition-all duration-200 shadow-2xl hover:shadow-3xl text-xl inline-flex items-center group"
            >
              Choose Your Plan - Start FREE
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-orange-200 text-lg font-medium mb-4">
              Trusted by 500+ startup founders
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300">
              {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <p className="text-orange-200 text-sm mt-2">
              4.9/5 from startup founders who scaled their content
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-white/20"
          >
            <p className="text-lg opacity-90 mb-2">Questions?</p>
            <motion.a 
              href="mailto:brian@apsicsmedia.com" 
              whileHover={{ scale: 1.05 }}
              className="text-orange-300 hover:text-orange-200 font-semibold text-xl transition-colors duration-200"
            >
              brian@apsicsmedia.com
            </motion.a>
          </motion.div>

        </motion.div>
        
      </div>
    </section>
  );
}