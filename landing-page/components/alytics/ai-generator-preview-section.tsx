'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight, Clock, Target } from 'lucide-react';

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

export function AIGeneratorPreviewSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#126DFB] to-[#0F5AD6] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-white"
        >

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4 mr-2" />
              LIVE DEMO
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See Your Business Turn Into{' '}
              <span className="text-yellow-300">
                High-Converting Ads
              </span>
            </h2>

            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Experience how $250M+ of campaign data becomes your breakthrough ad copy. Generate a custom script for your business in under 60 seconds.
            </p>
          </motion.div>

          {/* Demo Features */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Target className="w-6 h-6 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Industry Intelligence</h3>
              <p className="text-blue-100 text-sm">AI analyzes your market and surfaces proven conversion triggers from $250M+ spend</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Clock className="w-6 h-6 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Instant Generation</h3>
              <p className="text-blue-100 text-sm">Complete ad scripts in 60 seconds - faster than brainstorming a single hook</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <ArrowRight className="w-6 h-6 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Copy & Launch</h3>
              <p className="text-blue-100 text-sm">Platform-optimized scripts ready to paste into TikTok, Meta, YouTube, or LinkedIn</p>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">
                Turn Your Business Into High-Converting Ads
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Experience how industry research transforms into revenue-driving campaigns. No signup required for your first script.
              </p>

              {/* Live Generator Link */}
              <motion.a
                href="/ai-ad-script-generator"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-yellow-400 text-[#126DFB] font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-yellow-300 transition-all duration-200 inline-flex items-center gap-2"
              >
                Generate My First Ad (Free)
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <p className="text-blue-200 text-sm mt-4">
                ⚡ Live now - see results in 60 seconds • Get 10 more with free account
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}