'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Building2, TrendingUp } from 'lucide-react';

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export function ProblemSolutionSection() {

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2" />
            Customer Research Intelligence
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            We Start With Deep Customer Research
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Before creating any content, we dive deep into your customers' actual pain points and dream outcomes. Here's how we build your strategic foundation.
          </p>
        </motion.div>

        {/* Customer Research Showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          
          {/* Main Research Image */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-100 mb-12"
          >
            <div className="relative">
              <Image
                src="/images/1_Customer-Research-Pain-and-Dream-Outcomes.png"
                alt="Customer Research: Pain & Dream Outcomes - Golden Pain Bank and Dream Outcome Vault methodology showing real customer insights and strategic positioning"
                width={1200}
                height={675}
                className="w-full h-auto rounded-xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-xl pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Research Process Explanation */}
          <motion.div
            variants={cardVariants}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            
            {/* Left: Process Description */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Our Strategic Intelligence Process
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Golden Pain Bank Collection</h4>
                    <p className="text-gray-600">We capture your customers' exact words describing their deepest frustrations and challenges.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-brand-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Dream Outcome Vault</h4>
                    <p className="text-gray-600">We identify the specific outcomes your customers desperately want to achieve.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-brand-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Strategic Content Creation</h4>
                    <p className="text-gray-600">Every script and hook is built from these real customer insights, not assumptions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Key Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Why This Approach Works</h4>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Uses your customers' actual language</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Addresses real pain points, not guesses</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Creates instant emotional connection</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Drives 3x higher conversion rates</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-blue-200">
                <p className="text-sm text-gray-600 italic">
                  "This research foundation is why our scripts consistently outperform industry benchmarks by 40-60%"
                </p>
              </div>
            </div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}