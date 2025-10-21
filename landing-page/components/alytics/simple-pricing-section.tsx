'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';
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
  priceSuffix?: string;
  originalPrice?: string;
  description: string;
  credits: string;
  features: string[];
  highlight?: boolean;
  buttonText: string;
  badge?: string;
  footnote?: string;
  onButtonClick?: () => void;
}

function PricingTier({
  name,
  price,
  priceSuffix = 'per month',
  originalPrice,
  description,
  credits,
  features,
  highlight,
  buttonText,
  badge,
  footnote,
  onButtonClick,
}: PricingTierProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: highlight ? 0 : -8,
        boxShadow: highlight ? "0 25px 50px rgba(18, 109, 251, 0.2)" : "0 20px 40px rgba(0, 0, 0, 0.08)"
      }}
      className={`rounded-2xl p-8 border relative flex flex-col h-full ${
        highlight
          ? 'bg-gradient-to-b from-blue-50 via-white to-white border-[#126DFB] shadow-xl'
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

      {highlight && (
        <div className="absolute -top-4 right-6">
          <div className="bg-gradient-to-r from-[#126DFB] to-[#126DFB] text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${highlight ? 'text-[#0F5AD6]' : 'text-gray-900'}`}>
          {name}
        </h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="mb-6">
          {originalPrice && (
            <div className="text-lg text-gray-400 line-through mb-1">{originalPrice}</div>
          )}
          <div className={`text-4xl font-bold ${highlight ? 'text-[#126DFB]' : 'text-gray-900'}`}>
            {price}
          </div>
          <div className="text-sm text-gray-500 mt-1">{priceSuffix}</div>
          <div className="text-sm font-medium text-gray-700 mt-3">{credits}</div>
          {footnote && (
            <div className="text-xs text-gray-500 mt-2 leading-relaxed">{footnote}</div>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-grow flex flex-col justify-start">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${highlight ? 'text-[#126DFB]' : 'text-[#10B981]'}`} />
            <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <motion.button
          onClick={onButtonClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
            highlight
              ? 'bg-[#126DFB] hover:bg-[#0F5AD6] text-white shadow-lg'
              : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg'
          }`}
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
}

type PricingTierConfig = PricingTierProps & {
  source: string;
  modalTitle: string;
  modalSubtitle: string;
  tier: string;
};

export function SimplePricingSection() {
  const { openModal } = useFreeWeek();
  const pricingTiers: PricingTierConfig[] = [
    {
      name: 'Concierge',
      price: '$249',
      description: 'Scale breakthrough campaigns at enterprise velocity.',
      credits: '2,000 credits per month',
      features: [
        'Everything in Studio plus direct strategist collaboration',
        'Weekly expert concept reviews and custom tailored strategy',
        'Direct access to our senior team for rapid iteration and campaign pivots',
      ],
      buttonText: 'Talk to a Strategist',
      modalTitle: 'Talk to a Strategist',
      modalSubtitle: 'Schedule time with our senior team to tailor Concierge access to your roadmap.',
      source: 'pricing-concierge',
      tier: 'concierge'
    },
    {
      name: 'Studio',
      price: '$29',
      originalPrice: '$49',
      description: 'Turn creative bottlenecks into revenue multipliers.',
      credits: '800 credits per month',
      features: [
        'Only 25 packages available',
        'Expert crafted creative concept package delivered for the first 6 months',
        'Priority support and direct access to founder',
        'Early access to additional tools and functionality being developed (coming soon)'
      ],
      highlight: true,
      badge: 'Most Popular',
      footnote: 'Lock $29/mo for the first 6 months. Renews at $49/mo afterwards.',
      buttonText: 'Unlock Studio Founding Offer',
      modalTitle: 'Unlock Studio Founding Offer',
      modalSubtitle: 'Founding members secure $29/mo pricing for six months plus an expert-crafted concept for 6 months.',
      source: 'pricing-studio',
      tier: 'studio'
    },
    {
      name: 'Essentials',
      price: '$19',
      description: 'Jumpstart your ad performance',
      credits: '150 credits per month',
      features: [
        'Fuel multiple scripts, briefs, and iterations',
        'Email support available',
        'Perfect for teams replacing freelancers or starting to scale'
      ],
      buttonText: 'Upgrade to Essentials',
      modalTitle: 'Upgrade to Essentials',
      modalSubtitle: 'Lock in 150 credits per month with priority processing for your entire team.',
      source: 'pricing-essentials',
      tier: 'essentials'
    },
    {
      name: 'Explore',
      price: '$0',
      description: 'Test every tool before you upgrade.',
      credits: '10 credits included every month',
      features: [
        'Email-only signup with instant workspace access',
        'Use on the script, brief, and iteration tools',
        'Download and share completed assets',
      ],
      buttonText: 'Claim 10 Free Credits',
      modalTitle: 'Claim Your Free Credits',
      modalSubtitle: 'Create your free APSICS Media account and unlock 10 monthly credits across every tool.',
      source: 'pricing-explore',
      tier: 'explore'
    }
  ];

  return (
    <section id="service-tiers" className="py-20 bg-[#F8F8F8] relative">
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
Turn Ad Spend Into Revenue Growth Starting at $19/Month
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
Get 150+ fully-developed creative concepts every month - complete with scripts, strategic insights, and positioning frameworks. Access comprehensive creative intelligence that includes market research, competitor analysis, and trend-based recommendations.
          </motion.p>

          {/* Value Anchoring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 mb-2">
                One platform. Three revenue engines. Credits that work across every breakthrough tool.
              </div>
              <div className="text-sm text-gray-600">
                Script generator • Ad iteration engine • Creative brief builder • Expert concept delivery for Studio+
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 max-w-5xl mx-auto mb-16 sm:grid-cols-2 xl:grid-cols-4"
        >
          {pricingTiers.map((tier) => (
            <PricingTier
              key={tier.name}
              name={tier.name}
              price={tier.price}
              priceSuffix={tier.priceSuffix}
              originalPrice={tier.originalPrice}
              description={tier.description}
              credits={tier.credits}
              features={tier.features}
              highlight={tier.highlight}
              buttonText={tier.buttonText}
              badge={tier.badge}
              footnote={tier.footnote}
              onButtonClick={() => openModal({
                title: tier.modalTitle,
                subtitle: tier.modalSubtitle,
                source: tier.source,
                tier: tier.tier
              })}
            />
          ))}
        </motion.div>

        {/* Expert Crafted Concept Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-16 rounded-3xl border border-blue-100 bg-white p-8 shadow-lg"
        >
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">Studio Founding Bonus</p>
              <h3 className="mt-2 text-2xl font-semibold text-gray-900">Expert Crafted Concept in Month One</h3>
              <p className="mt-3 text-sm text-gray-600">
                Studio members receive a comprehensive creative concept package during their first 30 days. Our strategists analyze your market, identify winning angles, and deliver fully-developed creative strategies with complete implementation guidance.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-brand-600" />
                <span>2 detailed target personas with specific positioning strategies and conversion triggers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-brand-600" />
                <span>3 asset recommendations including complete scripts, copy, and detailed production guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-brand-600" />
                <span>In-depth market research with competitive intelligence and current trend integration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-brand-600" />
                <span>Custom framework application aligned with your specific product goals and marketing channels</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Risk Reversal Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 mb-16 max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            30-Day Revenue Improvement Guarantee
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            If our credit-based creative intelligence doesn't improve your ad performance within 30 days, we'll refund your entire investment. No questions asked.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Full refund guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>No long-term contracts</span>
            </div>
          </div>
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
            Join SaaS, ecommerce, and B2B growth teams who turned ad spend into predictable revenue. Every month you delay is potential ROI left on the table.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
