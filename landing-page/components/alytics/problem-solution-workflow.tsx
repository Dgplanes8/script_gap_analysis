'use client';

import { motion } from 'framer-motion';
import { ProcessAccordion } from './process-accordion';

export function ProblemSolutionWorkflow() {
  return (
    <section id="how-it-works" className="py-20 bg-[#F8F8F8] relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Creating content that drives sales takes{' '}
            <span className="text-transparent bg-gradient-to-r from-[#126DFB] to-[#126DFB] bg-clip-text">
              strategic intelligence
            </span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            You're spending money on ads that generate engagement but don't move the revenue needle. Our systematic approach eliminates the $10K+ testing cycles with proven methods that consistently drive sales.
          </motion.p>
        </motion.div>

        {/* Framework Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ProcessAccordion />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
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
        </motion.div>

      </div>
    </section>
  );
}
