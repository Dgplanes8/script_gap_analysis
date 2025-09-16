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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why I Started This
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              After managing $250MM+ in ad spend across hundreds of campaigns, I saw the same pattern everywhere: 
              brilliant founders struggling with creative strategy, spending thousands on ads that generate engagement 
              but don't move the revenue needle.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              I built these systems working with companies that scaled from startup to IPO. Now I'm making 
              them accessible without hiring expensive agencies or burning through cash on failed tests.
            </p>
          </div>
        </motion.div>

        {/* Founding Offer Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Limited Time Badge */}
          <div className="absolute -top-3 left-6 z-10">
            <div className="bg-[#126DFB] text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Limited Time
            </div>
          </div>

          {/* Founding Member Card */}
          <div className="bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] rounded-2xl p-8 text-white shadow-xl border-2 border-[#126DFB]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left: Offer Details */}
              <div className="flex-1 text-left">
                <div className="flex items-center justify-start gap-2 mb-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-2xl font-bold">Founding Member</h3>
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold mb-1">$20</div>
                  <div className="text-blue-100">for the whole year</div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-400" />
                    <span className="leading-relaxed text-left">Competitive Edge Package</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-400" />
                    <span className="leading-relaxed text-left">Direct access to founder for any questions about media buying or creative strategy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-400" />
                    <span className="leading-relaxed text-left">Lock in price for a year</span>
                  </li>
                </ul>
              </div>

              {/* Right: CTA */}
              <div className="text-center">
                <motion.button
                  onClick={() => openModal({
                    source: 'founder-cta',
                    title: 'Claim Founding Member Access',
                    subtitle: 'Lock in the Competitive Edge package for $20 for the year and get direct founder access.',
                    tier: 'Founding Member'
                  })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#126DFB] font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Claim Founding Member
                </motion.button>
                <p className="text-blue-100 text-sm mt-2">First 100 founders only</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
