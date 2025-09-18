'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Clock } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export function AlyticsHero() {
  return (
    <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          
          {/* Trust Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200">
              <Award className="w-4 h-4 text-[#126DFB]" />
              <span className="text-sm font-medium text-gray-700">12+ Years Scaling Media | $250MM+ Managed</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
              You're One Creative Breakthrough Away From{' '}
              <span className="text-transparent bg-gradient-to-r from-[#126DFB] to-[#126DFB] bg-clip-text">
                Doubling Your Revenue
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Weekly creative intelligence that turns your ad spend into predictable revenue. No more $10K+ testing cycles or guessing what will work.
              <br />
              <span className="text-gray-700 font-medium">Every month you delay is revenue left on the table while competitors scale with proven systems.</span>
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.a
              href="#service-tiers"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg"
            >
              Start Free Week Trial
            </motion.a>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-500"
            >
              <CheckCircle className="w-4 h-4 text-[#126DFB]" />
              No credit card required
            </motion.div>

            {/* Value Props */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-[#126DFB]" />
                <span className="font-medium">Weekly Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-[#126DFB]" />
                <span className="font-medium">Proven Frameworks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5 text-[#126DFB]" />
                <span className="font-medium">Ready to Use</span>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
