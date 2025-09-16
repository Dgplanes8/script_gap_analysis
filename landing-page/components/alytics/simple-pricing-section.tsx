'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star, Clock, Zap } from 'lucide-react';
import { useFreeWeek } from '@/components/contexts/free-week-context';

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

interface PricingTierProps {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  badge?: string;
  yearlyOffer?: boolean;
  onButtonClick?: () => void;
}

function PricingTier({ name, price, originalPrice, description, features, popular, buttonText, badge, yearlyOffer, onButtonClick }: PricingTierProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: popular ? 0 : -8, 
        boxShadow: popular ? "0 25px 50px rgba(18, 109, 251, 0.2)" : "0 20px 40px rgba(0, 0, 0, 0.1)" 
      }}
      className={`rounded-2xl p-8 border relative ${
        popular 
          ? 'bg-gradient-to-b from-blue-50 to-white border-[#126DFB] shadow-xl' 
          : 'bg-white border-gray-200 shadow-lg'
      }`}
    >
      {badge && (
        <div className="absolute -top-4 left-6">
          <div className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
            {badge}
          </div>
        </div>
      )}

      {popular && (
        <div className="absolute -top-4 right-6">
          <div className="bg-gradient-to-r from-brand-500 to-brand-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${popular ? 'text-[#0F5AD6]' : 'text-gray-900'}`}>
          {name}
        </h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="mb-6">
          {originalPrice && (
            <div className="text-lg text-gray-400 line-through mb-1">{originalPrice}</div>
          )}
          <div className={`text-4xl font-bold ${popular ? 'text-[#126DFB]' : 'text-gray-900'}`}>
            {price}
          </div>
          <div className="text-sm text-gray-500 mt-1">{yearlyOffer ? 'for first year' : 'per week'}</div>
        </div>
      </div>

      <ul className="space-y-3 mb-8 min-h-[160px]">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${popular ? 'text-[#126DFB]' : 'text-[#10B981]'}`} />
            <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        onClick={onButtonClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
          popular
            ? 'bg-[#126DFB] hover:bg-[#0F5AD6] text-white shadow-lg'
            : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg'
        }`}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}

export function SimplePricingSection() {
  const { openModal } = useFreeWeek();
  const pricingTiers = [
    {
      name: "Trend Tracker",
      price: "$5",
      description: "Perfect for growing teams ready to scale content",
      features: [
        "1 strategic creative concept weekly",
        "2 ready-to-develop scripts per concept",
        "Platform-specific optimizations",
        "Weekly Monday delivery"
      ],
      buttonText: "Start Free Week Trial"
    },
    {
      name: "Competitive Edge",
      price: "$20",
      originalPrice: "$30",
      description: "Ideal for teams with growing ad spend",
      features: [
        "2 creative concepts weekly",
        "4 ready-to-test scripts total",
        "Competitor-inspired concepts included",
        "Priority support",
        "Weekly Monday delivery"
      ],
      popular: true,
      buttonText: "Start Free Week Trial"
    },
    {
      name: "Market Intelligence",
      price: "$50",
      description: "For teams needing comprehensive coverage",
      features: [
        "3 creative concepts weekly",
        "6 ready-to-test scripts total",
        "Direct team access",
        "Strategic consultation included",
        "Custom format requests",
        "Weekly Monday delivery"
      ],
      buttonText: "Start Free Week Trial"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#F8F8F8] relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Simple pricing,{' '}
            <span className="text-transparent bg-gradient-to-r from-[#126DFB] to-[#126DFB] bg-clip-text">
              maximum value
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Try any tier free for a week. No credit card required. Cancel anytime.
          </motion.p>

          {/* Free Trial Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-brand-50 border border-brand-200 rounded-full"
          >
            <CheckCircle className="w-5 h-5 text-brand-600" />
            <span className="text-brand-800 font-medium">FREE Week Trial • No Risk • Cancel Anytime</span>
          </motion.div>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {pricingTiers.map((tier, index) => (
            <PricingTier
              key={tier.name}
              name={tier.name}
              price={tier.price}
              originalPrice={tier.originalPrice}
              description={tier.description}
              features={tier.features}
              popular={tier.popular}
              buttonText={tier.buttonText}
              onButtonClick={() => openModal({
                title: "Start Your FREE Week Trial",
                subtitle: `Get ${tier.name} tier: ${tier.description}`,
                source: `pricing-${tier.name.toLowerCase().replace(/\s+/g, '-')}`,
                tier: tier.name
              })}
            />
          ))}
        </motion.div>

        {/* Urgency & Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join businesses across SaaS, ecommerce, apps, and subscriptions who use these frameworks to consistently drive revenue growth.
          </p>
        </motion.div>

      </div>
    </section>
  );
}