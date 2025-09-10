'use client';

import { motion } from 'framer-motion';
import { Sparkles, Play, BarChart3, Target } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

export function WeeklyDeliveryShowcase() {
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Weekly Delivery
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            See What You'll{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
              Receive Every Monday
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get a behind-the-scenes look at the exact content ideas, scripts, and intelligence delivered to your inbox.
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 items-start mb-16"
        >
          
          {/* Left: Template Gallery */}
          <motion.div variants={cardVariants}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">This Week's Creative Templates</h3>
              
              {/* Template Previews Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center border-2 border-dashed border-orange-300">
                  <div className="text-center">
                    <Play className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-orange-700">[TikTok Template]</span>
                  </div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-300">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-blue-700">[Facebook Template]</span>
                  </div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center border-2 border-dashed border-purple-300">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-purple-700">[Instagram Template]</span>
                  </div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center border-2 border-dashed border-green-300">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-green-700">[LinkedIn Template]</span>
                  </div>
                </div>
              </div>
              
              {/* Asset Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong className="text-blue-900">[ASSET PLACEHOLDER]:</strong> Screenshots of actual weekly template deliveries with trending analysis
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Right: Sample Scripts & Performance */}
          <motion.div variants={cardVariants} className="space-y-6">
            
            {/* Performance Score Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sample Script Delivery</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Hook Performance Score</span>
                  <span className="text-blue-600 font-bold text-lg">23/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                    style={{width: '92%'}}
                  ></div>
                </div>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 mb-4 bg-blue-50 py-3 rounded-r-lg">
                <p className="text-gray-700 italic font-medium">
                  "Stop scrolling if you're tired of paying $50+ for basic SaaS tools that do half of what you need..."
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-600">Platform: TikTok + Instagram</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-600">Target: SaaS founders</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-600">Framework: Problem-Agitate-Solution</span>
                </div>
              </div>
            </div>

            {/* Intelligence Insights Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
              <h4 className="text-lg font-bold mb-4">+ Trending Intelligence Insights</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                  <span className="text-blue-100 text-sm">Competitor analysis from 50+ brands</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                  <span className="text-blue-100 text-sm">Viral format identification & adaptation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                  <span className="text-blue-100 text-sm">$250MM+ spend performance data</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong className="text-blue-900">[ASSET PLACEHOLDER]:</strong> Screenshots of custom script deliveries with trending analysis and performance scores
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Weekly Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={cardVariants} className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Monday Morning Delivery</h3>
            <p className="text-gray-600 leading-relaxed">
              Fresh content concepts arrive in your inbox every Monday at 9 AM EST with trending intelligence
            </p>
          </motion.div>
          
          <motion.div variants={cardVariants} className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Copy & Customize</h3>
            <p className="text-gray-600 leading-relaxed">
              Use our performance-tested scripts as-is or customize for your specific product and audience
            </p>
          </motion.div>
          
          <motion.div variants={cardVariants} className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Launch & Scale</h3>
            <p className="text-gray-600 leading-relaxed">
              Go live within 10 minutes and scale what converts best with data-driven confidence
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}