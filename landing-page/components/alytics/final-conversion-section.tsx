'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Shield, ArrowRight, Zap } from 'lucide-react';
import { useFreeWeek } from '@/components/contexts/free-week-context';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
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

export function FinalConversionSection() {
  const { openModal } = useFreeWeek();
  
  const riskReversals = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: "No payment required to claim your credits"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Credits refresh every month"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Upgrade or cancel anytime"
    }
  ];

  const urgencyPoints = [
    "Founding offer: lock $29/mo Studio pricing for six months",
    "Expert crafted concept package delivered in your first month",
    "Credits work across all tools with more functionality coming soon"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          
          {/* Main Headline */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Stop guessing.{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
                Start converting.
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
  Join growth teams who use proven creative intelligence to consistently drive revenue from their ad spend.
            </p>
          </motion.div>

          {/* Urgency Box */}
          <motion.div 
            variants={itemVariants}
            className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-brand-600" />
              <span className="text-brand-800 font-semibold">Limited Time Offer</span>
            </div>
            <ul className="space-y-2">
              {urgencyPoints.map((point, index) => (
                <li key={index} className="flex items-center justify-center gap-2 text-brand-700">
                  <div className="w-1.5 h-1.5 bg-brand-600 rounded-full"></div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Main CTA */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.button
              onClick={() => openModal({
                title: "Claim Your Free Credits",
                subtitle: "Create a free account to unlock 10 monthly credits and explore every generator.",
                source: "final-conversion-cta"
              })}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(18, 109, 251, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg group"
            >
              <span className="flex items-center gap-3">
                Claim Your Free Credits
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Risk Reversal */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {riskReversals.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="text-brand-600">{item.icon}</div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What Happens Next */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What happens next?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Choose Your Tier</h4>
                <p className="text-gray-600 text-sm">Select the plan that matches your content needs</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Brand Onboarding</h4>
                <p className="text-gray-600 text-sm">Quick setup to understand your brand and target audience</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Receive Concepts</h4>
                <p className="text-gray-600 text-sm">Fully-developed creative concepts with strategic insights delivered weekly</p>
              </div>
            </div>
          </motion.div>

          {/* Final Urgency */}
          <motion.div variants={itemVariants} className="mt-8">
            <p className="text-gray-500 text-sm">
              ⚡ Quick brand setup • First concepts delivered Monday • Implementation timeline varies
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
