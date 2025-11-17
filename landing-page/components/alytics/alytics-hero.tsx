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
    <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#126DFB] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#126DFB] rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          
          {/* Trust Badge */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-white rounded-full border border-blue-100 shadow-sm">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Award className="w-4 h-4 text-[#126DFB]" />
              </motion.div>
              <span className="text-sm font-semibold text-gray-700">Research-Backed Creative Development Platform</span>
            </div>
          </motion.div>

          {/* Main Headline - PAS Framework: Problem + Ease + Outcome */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
              Stop Wasting Ad Budget on Guesswork.{' '}
              <span className="text-transparent bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] bg-clip-text">
                Get Winning Scripts in 60 Seconds.
              </span>
            </h1>
          </motion.div>

          {/* Subtitle - Solution with authority */}
          <motion.div variants={itemVariants}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Generate research-backed ad concepts complete with scripts, strategic insights, and competitor analysis. Built from $250MM+ in proven frameworks - ready to copy, paste, and launch.
              <br />
              <span className="text-gray-700 font-medium">Try it free - 10 credits, no card required.</span>
            </p>
          </motion.div>

          {/* CTA Section - Green for free trial (removes friction) */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.a
              href="/ai-ad-script-generator"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 16px 40px rgba(16, 185, 129, 0.35)"
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-block bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/40 relative overflow-hidden group"
            >
              <span className="relative z-10">Claim 10 Free Credits</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.a>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-500"
            >
              <CheckCircle className="w-4 h-4 text-[#10B981]" />
              Email-only signup • Use across script, brief & iteration tools
            </motion.div>

            {/* Value Props - Blue for trust/credibility, Green for positive outcomes */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-[#126DFB]" />
                <span className="font-medium">60-Second Generation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-[#10B981]" />
                <span className="font-medium">$250MM+ Proven Frameworks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5 text-[#126DFB]" />
                <span className="font-medium">Ready to Launch</span>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
