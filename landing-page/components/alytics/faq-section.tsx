'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const faqs = [
    {
      question: "How does weekly billing work?",
      answer: "Your first week is completely FREE. After that, you're billed weekly and can cancel anytime. No long-term contracts or commitments required."
    },
    {
      question: "What's included in my first free week?",
      answer: "Full access to your chosen tier for 7 days. You'll receive winning content ideas, custom scripts, and trending intelligence exactly like paying customers - completely free."
    },
    {
      question: "How is this different from agencies?",
      answer: "Agencies require $5K-15K/month minimums with 6-month contracts. We start at $15/week with no contracts. Built specifically for startups with limited budgets and rapid iteration needs."
    },
    {
      question: "Can I change tiers anytime?",
      answer: "Yes! Upgrade or downgrade immediately. Need more content ideas this week? Upgrade instantly. Scaling back? Drop to a lower tier. You're in complete control of your subscription."
    },
    {
      question: "What platforms do you cover?",
      answer: "We provide custom scripts optimized for TikTok, Instagram, Facebook, LinkedIn, and emerging social platforms. Each script is tailored to the platform's unique requirements and audience behavior."
    },
    {
      question: "How quickly can I start creating content?",
      answer: "Immediately! Our content ideas and scripts are ready-to-use. Most founders are creating and launching content within 10 minutes of receiving their weekly delivery."
    },
    {
      question: "Do you provide content creation services?",
      answer: "We provide the intelligence and scripts - you create the content. This keeps costs low while giving you full control over your brand voice and creative execution."
    },
    {
      question: "How do I get started?",
      answer: "Choose your tier below and start your FREE week trial. No payment required upfront, no contracts, no commitment. Cancel anytime if it's not the right fit."
    }
  ];

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
              <HelpCircle className="w-4 h-4 mr-2" />
              Common Questions
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            Everything You{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
              Need to Know
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to the most common questions about our weekly content intelligence service.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <motion.button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors duration-200"
                whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openItems.has(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8">
            Still have questions? We're here to help!
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg"
            >
              Start My FREE Week Trial
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:brian@apsicsmedia.com"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold px-8 py-4 rounded-xl transition-colors duration-200"
            >
              Email us directly
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}