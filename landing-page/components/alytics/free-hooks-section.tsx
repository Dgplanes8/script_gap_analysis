'use client';

import { motion } from 'framer-motion';
import { Download, Zap, Target, TrendingUp } from 'lucide-react';
import { ConvertKitForm } from '@/components/forms/convertkit-form';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function FreeHooksSection() {
  const benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Revenue-Driving Hooks",
      description: "Each hook designed to drive sales, not just clicks"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Tested Across Verticals",
      description: "SaaS, ecommerce, apps, subscriptions - proven everywhere"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Copy-Paste Ready",
      description: "Customize with your details and launch immediately"
    }
  ];

  return (
    <section id="free-templates" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Download className="w-4 h-4 mr-2" />
              FREE REVENUE-DRIVING HOOKS
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get 10 Hooks That Drive{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                Sales, Not Just Clicks
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The exact hook frameworks I've used across $250MM+ in campaigns. 
              Each hook includes psychological trigger explanation + why it drives revenue.
            </p>
          </motion.div>

          {/* Email Capture Form */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Download Your 10 Revenue-Driving Hooks
                </h3>
                <p className="text-gray-600 mb-6">
                  Enter your email to get proven hooks that convert viewers into customers
                </p>
                
                <ConvertKitForm
                  formId={process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID || '8372309'}
                  className="ck-reset"
                />
                <p className="text-xs text-gray-500 text-center mt-4">
                  Powered by ConvertKit • Instant download • Based on $250MM+ campaigns
                </p>
              </div>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* What You'll Get Preview */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What You'll Get
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    10 Proven Hook Frameworks
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Problem-solution hooks that create urgency</li>
                    <li>• Authority-based hooks that build trust</li>
                    <li>• Transformation hooks that show outcomes</li>
                    <li>• Social proof hooks that reduce risk</li>
                    <li>• Scarcity hooks that drive immediate action</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Psychology Breakdown
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Why each hook drives sales (not just engagement)</li>
                    <li>• When to use each framework</li>
                    <li>• Cross-vertical adaptation examples</li>
                    <li>• Performance optimization tips</li>
                    <li>• Common mistakes that kill conversions</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
