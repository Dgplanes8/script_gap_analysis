'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star, Zap } from 'lucide-react';
import { useFreeWeek } from '@/components/contexts/free-week-context';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
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
        y: -4,
        transition: { duration: 0.2 }
      }}
      className={`relative rounded-2xl p-6 sm:p-8 border flex flex-col h-full ${
        highlight
          ? 'bg-gradient-to-b from-[#F3F8FF] via-white to-white border-[#126DFB] shadow-[0_0_0_2px_#126DFB,0_20px_40px_rgba(18,109,251,0.15)] lg:scale-105 lg:-translate-y-4'
          : 'bg-white border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#126DFB]'
      } transition-all duration-300`}
    >
      {/* Badge */}
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            Most Popular
          </div>
        </div>
      )}

      {badge && !highlight && (
        <div className="absolute -top-3 left-6 z-10">
          <div className="bg-[#111827] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
            {badge}
          </div>
        </div>
      )}

      {/* Plan Name */}
      <div className="text-center mb-6">
        <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${highlight ? 'text-[#0F5AD6]' : 'text-gray-900'}`}>
          {name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-6">
        {originalPrice && (
          <div className="text-base text-gray-400 line-through mb-1">{originalPrice}</div>
        )}
        <div className={`text-5xl sm:text-[56px] font-bold leading-none tracking-tight ${
          highlight ? 'text-[#126DFB]' : 'text-gray-900'
        }`}>
          {price}
        </div>
        <div className="text-xs text-gray-500 mt-2">{priceSuffix}</div>
        <div className={`text-sm font-medium mt-3 ${highlight ? 'text-[#126DFB]' : 'text-gray-700'}`}>
          {credits}
        </div>
        {footnote && (
          <div className="text-xs text-gray-500 mt-3 leading-relaxed px-2">{footnote}</div>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-2.5"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <CheckCircle
              className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-transform duration-200 hover:scale-110 hover:rotate-6 ${
                highlight ? 'text-[#126DFB]' : 'text-[#10B981]'
              }`}
            />
            <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="mt-auto">
        <motion.button
          onClick={onButtonClick}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full min-h-[56px] sm:min-h-[48px] py-3.5 px-6 rounded-xl font-semibold text-base transition-all duration-200 ${
            highlight
              ? 'bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] hover:brightness-105 text-white shadow-[0_4px_12px_rgba(18,109,251,0.3),0_2px_4px_rgba(18,109,251,0.2)] hover:shadow-[0_8px_20px_rgba(18,109,251,0.4),0_4px_8px_rgba(18,109,251,0.2)]'
              : 'bg-[#111827] hover:bg-black text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
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
      name: 'Studio',
      price: '$29',
      originalPrice: '$49',
      description: 'Turn creative bottlenecks into revenue multipliers.',
      credits: '500 credits per month',
      features: [
        'One expert concept monthly for 6 months',
        'Priority support with founder access',
        'Early beta tool access'
      ],
      highlight: true,
      footnote: 'Lock $29/mo for the first 6 months. Renews at $49/mo afterwards.',
      buttonText: 'Unlock Studio Founding Offer',
      modalTitle: 'Unlock Studio Founding Offer',
      modalSubtitle: 'Founding members secure $29/mo pricing for six months plus one expert-crafted concept each month for 6 months.',
      source: 'pricing-studio',
      tier: 'studio'
    },
    {
      name: 'Essentials',
      price: '$19',
      description: 'Jumpstart your ad performance',
      credits: '100 credits per month',
      features: [
        'Generate scripts, briefs, iterations',
        'Email support available',
        'Perfect for scaling teams'
      ],
      buttonText: 'Upgrade to Essentials',
      modalTitle: 'Upgrade to Essentials',
      modalSubtitle: 'Lock in 100 credits per month with priority processing for your entire team.',
      source: 'pricing-essentials',
      tier: 'essentials'
    },
    {
      name: 'Concierge',
      price: '$249',
      description: 'Scale breakthrough campaigns at enterprise velocity.',
      credits: '1,500 credits per month',
      features: [
        'Direct strategist collaboration',
        'Weekly expert concept reviews',
        'Custom strategy for rapid iteration'
      ],
      buttonText: 'Talk to a Strategist',
      modalTitle: 'Talk to a Strategist',
      modalSubtitle: 'Schedule time with our senior team to tailor Concierge access to your roadmap.',
      source: 'pricing-concierge',
      tier: 'concierge'
    },
    {
      name: 'Explore',
      price: '$0',
      description: 'Test every tool before you upgrade.',
      credits: '10 credits included every month',
      features: [
        'Email-only signup, instant access',
        'Use script, brief, iteration tools',
        'Download completed assets'
      ],
      buttonText: 'Claim 10 Free Credits',
      modalTitle: 'Claim Your Free Credits',
      modalSubtitle: 'Create your free APSICS Media account and unlock 10 monthly credits across every tool.',
      source: 'pricing-explore',
      tier: 'explore'
    }
  ];

  return (
    <section id="service-tiers" className="py-16 sm:py-20 bg-[#F8F8F8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Turn Ad Spend Into Revenue Growth
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get 100+ fully-developed creative concepts every month. Complete with scripts, strategic insights, and positioning frameworks.
          </motion.p>

          {/* Value Anchoring */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-5 sm:p-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-[#126DFB]" />
              <div className="text-base sm:text-lg font-bold text-gray-900">
                One platform. Three revenue engines.
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Script generator • Ad iteration engine • Creative brief builder
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Grid - Mobile First */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 sm:gap-6 lg:gap-6 max-w-7xl mx-auto mb-12 sm:mb-16
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12 sm:mb-16 rounded-2xl sm:rounded-3xl border border-blue-100 bg-white p-6 sm:p-8 shadow-lg"
        >
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#126DFB]">Studio Founding Bonus</p>
              <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-900">Expert Crafted Concept Every Month for 6 Months</h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Studio members receive one comprehensive creative concept package each month for the first 6 months.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-[#126DFB] flex-shrink-0" />
                <span>2 detailed target personas with positioning strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-[#126DFB] flex-shrink-0" />
                <span>3 asset recommendations with complete scripts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-[#126DFB] flex-shrink-0" />
                <span>Market research with competitive intelligence</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Risk Reversal Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 max-w-3xl mx-auto text-center"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            30-Day Revenue Improvement Guarantee
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5 sm:mb-6">
            If our creative intelligence doesn't improve your ad performance within 30 days, we'll refund your entire investment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Full refund guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>No long-term contracts</span>
            </div>
          </div>
        </motion.div>

        {/* Urgency & Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Join SaaS, ecommerce, and B2B growth teams who turned ad spend into predictable revenue. Every month you delay is potential ROI left on the table.
          </p>
        </motion.div>

      </div>
    </section>
  );
}