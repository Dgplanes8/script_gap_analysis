'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, TrendingUp, Building2, Crown, Sparkles } from 'lucide-react';
import { SimpleAirtableForm } from '@/components/forms/simple-airtable-form';
import { trackWeeklyTrialClick } from '@/components/analytics/gtm';

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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export function ServiceTiersSection() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const lifetimeOffer = {
    id: 'founders-special',
    name: 'FOUNDER\'S SPECIAL',
    icon: Crown,
    price: '$50',
    period: 'lifetime',
    yearlyPrice: 'One-time payment',
    description: 'Limited-time lifetime access - everything in GROWTH tier forever',
    features: [
      '2 custom content ideas + 4 scripts weekly',
      'All platforms (TikTok, Instagram, Facebook, LinkedIn)',
      'Trending analysis + competitor insights',
      'Priority email support'
    ],
    badge: 'LIMITED - FIRST 100 FOUNDERS',
    badgeColor: 'bg-red-500',
    popular: false,
    lifetime: true,
    ideal: 'Early adopters who want lifetime access (normally $1,820/year)'
  };

  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Zap,
      price: '$15',
      period: '/week',
      yearlyPrice: '$60/month',
      description: 'Perfect for solo founders getting started with custom content',
      features: [
        '1 custom content idea + 2 scripts weekly',
        'TikTok + Instagram optimization',
        'Email delivery Monday mornings',
        '7-day FREE trial'
      ],
      badge: 'Great for beginners',
      badgeColor: 'bg-blue-500',
      popular: false,
      ideal: 'Solo founders ($500-$2K monthly ad spend)'
    },
    {
      id: 'growth',
      name: 'Growth',
      icon: TrendingUp,
      price: '$35',
      period: '/week',
      yearlyPrice: '$140/month',
      description: 'For growing startups with comprehensive trending content intelligence',
      features: [
        '2 custom content ideas + 4 scripts weekly',
        'All platforms (TikTok, Instagram, Facebook, LinkedIn)',
        'Trending analysis + competitor insights',
        'Priority email support',
        '7-day FREE trial'
      ],
      badge: 'MOST POPULAR',
      badgeColor: 'bg-green-500',
      popular: true,
      ideal: 'Growing startups ($2K-$10K monthly ad spend)'
    },
    {
      id: 'scale',
      name: 'Scale',
      icon: Building2,
      price: '$99',
      period: '/week',
      yearlyPrice: '$396/month',
      description: 'For scaling teams needing direct access and personalized support',
      features: [
        '3 custom content ideas + 6 scripts weekly',
        'All platforms + emerging channels',
        'Direct team access via Slack',
        'Weekly 30-min strategy calls',
        '7-day FREE trial'
      ],
      badge: 'Premium Support',
      badgeColor: 'bg-purple-500',
      popular: false,
      ideal: 'Scaling teams ($10K+ monthly ad spend)'
    }
  ];

  const handleTierSelect = (tier: any) => {
    trackWeeklyTrialClick(tier.name, 'alytics-service-tiers');
    setSelectedTier(tier.name);
  };

  return (
    <section id="pricing" className="py-20 px-6" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-[1200px] mx-auto">
        
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
              Choose Your Plan
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            Start Your{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
              Free Week Trial
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your startup's content intelligence needs. All plans include a 7-day free trial with no contracts or commitments.
          </p>
        </motion.div>

        {/* Lifetime Offer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Crown className="w-8 h-8 text-yellow-300" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  {lifetimeOffer.badge}
                </div>
                <h3 className="text-2xl font-bold mb-2">{lifetimeOffer.name}</h3>
                <p className="text-red-100 mb-4">{lifetimeOffer.description}</p>
                <div className="text-3xl font-bold">{lifetimeOffer.price} <span className="text-lg font-normal">lifetime</span></div>
                <p className="text-red-200 text-sm">{lifetimeOffer.ideal}</p>
              </div>
              
              <div>
                <ul className="space-y-2 mb-6">
                  {lifetimeOffer.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-yellow-300 mr-3 flex-shrink-0" />
                      <span className="text-red-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTierSelect(lifetimeOffer)}
                  className="bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition-all duration-200 flex items-center"
                >
                  Claim Lifetime Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Regular Tiers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
              }}
              className={`bg-white rounded-2xl p-8 shadow-lg border-2 relative group cursor-pointer ${
                tier.popular ? 'border-blue-500' : 'border-gray-100'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {tier.badge}
                  </div>
                </div>
              )}

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors">
                  <tier.icon className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    {tier.price}<span className="text-lg font-normal text-gray-600">{tier.period}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{tier.yearlyPrice}</p>
                </div>

                <ul className="space-y-3 mb-8 text-left">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTierSelect(tier)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>

                <p className="text-gray-500 text-sm mt-4">{tier.ideal}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Form Modal */}
        {selectedTier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTier(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Start Your Free Trial
                </h3>
                <p className="text-gray-600">
                  Selected: <span className="font-semibold text-blue-600">{selectedTier}</span>
                </p>
              </div>

              <SimpleAirtableForm
                buttonText="Start My FREE Week Trial"
                buttonClassName="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center"
                source="alytics-service-tiers"
                tier={selectedTier}
                onSuccess={() => setSelectedTier(null)}
                onError={() => console.error('Form submission failed')}
              />

              <button
                onClick={() => setSelectedTier(null)}
                className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}

      </div>
    </section>
  );
}