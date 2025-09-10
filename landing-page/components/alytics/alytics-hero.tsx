'use client';

import { motion } from 'framer-motion';
import { TrustBadge } from './trust-badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export function AlyticsHero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          
          {/* Trust Badge */}
          <motion.div variants={itemVariants}>
            <TrustBadge />
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[0.9] tracking-tight max-w-5xl mx-auto">
              Turn Content Chaos Into{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
                Conversion Intelligence
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Weekly content intelligence + custom scripts for UGC and paid ads. 
              Built from trending data analysis and tailored to your specific needs—without the chaos.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg"
            >
              Start Free Week
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-500"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              No credit card required
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}