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
      className={`rounded-2xl p-8 border relative ${
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

      <ul className="space-y-3 mb-8 min-h-[160px]">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${highlight ? 'text-[#126DFB]' : 'text-[#10B981]'}`} />
            <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
          </li>
        ))}
      </ul>

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
        'Unlimited expert concept reviews and feedback loops',
        'Slack access for rapid iteration and campaign pivots',
        'Quarterly performance planning with senior leadership'
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
        'Expert crafted concept in month one (2 personas, 3 asset recs, full copy)',
        'Comprehensive audience & competitor research baked in',
        'Weekly creative intelligence reviews with trend insights',
        'Unlocks advanced research features across every generator'
      ],
      highlight: true,
      badge: 'Most Popular',
      footnote: 'Lock $29/mo for the first 6 months. Renews at $49/mo afterwards.',
      buttonText: 'Unlock Studio Founding Offer',
      modalTitle: 'Unlock Studio Founding Offer',
      modalSubtitle: 'Founding members secure $29/mo pricing for six months plus an expert-crafted concept in month one.',
      source: 'pricing-studio',
      tier: 'studio'
    },
    {
      name: 'Essentials',
      price: '$19',
      description: 'Never run a losing ad again.',
      credits: '150 credits per month',
      features: [
        'Fuel multiple scripts, briefs, and iterations each week',
        'Priority processing + saved brand workspaces',
        'Performance notes baked into every output',
        'Perfect for teams replacing ad hoc freelancers'
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
      description: 'Test every generator before you upgrade.',
      credits: '10 credits included every month',
      features: [
        'Email-only signup with instant workspace access',
        'Use on the script, brief, and iteration tools',
        'Save outputs and revisit your prompts anytime',
        'Upgrade the moment you need more volume'
      ],
      buttonText: 'Claim 10 Free Credits',
      modalTitle: 'Claim Your Free Credits',
      modalSubtitle: 'Create your free APSICS Media account and unlock 10 monthly credits across every generator.',
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
            Replace $5,000+ Agency Retainers Starting at $19/Month
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get 150 revenue-ready ads every month for less than one agency creative brief. Join the 500+ teams who reduced CAC 25% with proven frameworks.
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
                Studio members receive a bespoke concept package during their first 30 days. Our senior strategists audit your market, surface winning angles, and deliver ready-to-launch creative.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-brand-600" />
                <span>2 high-impact target personas with positioning notes and buying triggers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-brand-600" />
                <span>3 asset recommendations (video & static) with full copy and production direction.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-brand-600" />
                <span>Comprehensive audience research, competitive teardown, and trend analysis.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-4 w-4 text-brand-600" />
                <span>Framework application tailored to your product roadmaps and channel mix.</span>
              </li>
            </ul>
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
