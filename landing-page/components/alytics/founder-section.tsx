'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star, Clock } from 'lucide-react';
import { useFreeWeek } from '@/components/contexts/free-week-context';

export function FounderSection() {
  const { openModal } = useFreeWeek();
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Founder Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">
            Making Executive-Level Strategy Accessible
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-[#374151] leading-relaxed mb-6">
              After reaching senior leadership at household brand names and managing $250MM+ in strategic decisions,
              I developed systematic frameworks that consistently outperform industry benchmarks. These aren't
              theoretical concepts — they're battle-tested strategies used to guide billion-dollar decisions.
            </p>
            <p className="text-lg text-[#374151] leading-relaxed mb-8">
              I'm now making this executive-level thinking accessible to businesses of all sizes, delivering
              the same strategic intelligence that drives success at the highest levels — without the $10,000+
              monthly agency fees or the need to hire expensive strategic consultants.
            </p>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-lg text-[#4B5563] mb-6">
            Ready to access proven strategic frameworks for your business?
          </p>
          <motion.a
            href="#service-tiers"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg"
          >
            See Pricing Options
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
