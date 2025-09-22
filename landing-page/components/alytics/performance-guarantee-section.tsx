'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, TrendingUp, Award } from 'lucide-react';
import { useFreeWeek } from '@/components/contexts/free-week-context';

export function PerformanceGuaranteeSection() {
  const { openModal } = useFreeWeek();

  return (
    <section className="py-20 bg-gradient-to-r from-[#EFF6FF] to-[#E0E7FF] relative">
      <div className="max-w-4xl mx-auto px-6">

        {/* Main Guarantee Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <Shield className="w-full h-full text-[#126DFB]" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#EFF6FF] rounded-full mb-6">
                <Shield className="w-6 h-6 text-[#126DFB]" />
                <span className="text-[#126DFB] font-semibold text-lg">Performance Improvement Guarantee</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                See Measurably Better Results or Get Your Money Back
              </h2>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We're so confident in our proven strategic frameworks that we guarantee performance improvement within your first month — or full refund, no questions asked.
              </p>
            </div>

            {/* Three Pillars */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#10B981]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Better Performance</h3>
                <p className="text-gray-600">Higher CTR, lower CPC, or improved conversion rates within 30 days</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#126DFB]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Service Trial</h3>
                <p className="text-gray-600">Get complete access to your chosen tier for 7 days — no limitations</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#F3E8FF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#9333EA]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Access</h3>
                <p className="text-gray-600">Work directly with senior strategist, not account managers or junior staff</p>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <motion.button
                onClick={() => openModal({
                  source: 'guarantee-cta',
                  title: 'Start Your Risk-Free Trial',
                  subtitle: 'Experience proven strategic frameworks with our performance improvement guarantee.',
                  tier: 'Any Tier'
                })}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] hover:from-[#0F5AD6] hover:to-[#0B4BC7] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                Start Risk-Free Trial
              </motion.button>
              <p className="text-gray-500 text-sm mt-3">
                No credit card required • Cancel anytime • Performance guaranteed
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}