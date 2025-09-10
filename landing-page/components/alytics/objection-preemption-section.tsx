'use client';

import { motion } from 'framer-motion';
import { DollarSign, Clock, AlertCircle, TrendingUp, Shield, CheckCircle } from 'lucide-react';

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

export function ObjectionPreemptionSection() {
  const objections = [
    {
      icon: DollarSign,
      title: "I Can't Afford to Waste Money",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
      concerns: [
        {
          point: "$15/week starting price",
          detail: "Less than a daily coffee. No $5K agency minimums."
        },
        {
          point: "First week FREE",
          detail: "Experience the value before paying a penny."
        },
        {
          point: "Cancel anytime",
          detail: "No contracts, no commitments, no risk."
        }
      ]
    },
    {
      icon: Clock,
      title: "I Don't Have Time to Learn",
      iconBg: "bg-orange-100", 
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
      concerns: [
        {
          point: "Ready-to-use content ideas",
          detail: "Copy, customize, launch. No learning curve."
        },
        {
          point: "Step-by-step scripts",
          detail: "Exactly what to say, when to say it."
        },
        {
          point: "Monday delivery",
          detail: "Fits into your weekly planning routine."
        }
      ]
    },
    {
      icon: AlertCircle,
      title: "How Do I Know It'll Work?",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600", 
      borderColor: "border-blue-200",
      concerns: [
        {
          point: "Proven methodologies",
          detail: "Based on $250MM+ in managed ad spend."
        },
        {
          point: "Performance scoring system", 
          detail: "Each script rated for success probability."
        },
        {
          point: "Free week trial",
          detail: "Experience results before committing."
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
            <div className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Everything You Need to Create Viral Content
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            "But I'm Not Sure If This Will{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
              Work for My Startup...
            </span>
            "
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every startup founder worries about the same things. Here's why our weekly content intelligence service is built specifically for your concerns.
          </p>
        </motion.div>

        {/* Objection Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {objections.map((objection, index) => (
            <motion.div
              key={objection.title}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
              }}
              className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${objection.borderColor} group cursor-pointer`}
            >
              <div className={`w-16 h-16 ${objection.iconBg} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <objection.icon className={`h-8 w-8 ${objection.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center group-hover:text-gray-800 transition-colors">
                "{objection.title}"
              </h3>
              
              <div className="space-y-4">
                {objection.concerns.map((concern, concernIndex) => (
                  <div key={concernIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 font-semibold text-sm mb-1">
                        {concern.point}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {concern.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Risk Reversal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-3xl font-bold mb-4">
              Zero-Risk Startup Guarantee
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-2xl font-bold mb-2">FREE First Week</div>
              <p className="text-sm opacity-90">Experience full value before paying anything</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-2xl font-bold mb-2">Cancel Anytime</div>
              <p className="text-sm opacity-90">No contracts, no commitments, no questions asked</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-2xl font-bold mb-2">Startup Pricing</div>
              <p className="text-sm opacity-90">Built for bootstrap budgets, not enterprise wallets</p>
            </motion.div>
          </div>
          
          <div className="text-center">
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              If our weekly content intelligence doesn't help you create better content in your first week, 
              simply cancel - no questions asked, no risk to you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const serviceSection = document.getElementById('pricing');
                  if (serviceSection) {
                    serviceSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                Start My FREE Week Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/free-hooks'}
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-4 rounded-xl transition-colors duration-200"
              >
                Get Free Templates First
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}