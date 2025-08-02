'use client';

import { useState } from 'react';
import { Check, ArrowRight, Zap, Target, Crown, Building2, TrendingUp, Calendar } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

interface ServiceTiersProps {
  onOpenConsultation: () => void;
}

export function ServiceTiers({ onOpenConsultation }: ServiceTiersProps) {
  const [selectedTier, setSelectedTier] = useState<'assessment' | 'foundation' | 'growth' | 'enterprise' | null>(null);

  const tiers = [
    {
      id: 'assessment',
      name: 'Assessment',
      icon: Target,
      price: '$500',
      period: '/month',
      description: 'Strategic assessment and optimization guidance for early-stage companies',
      features: [
        'Monthly strategic assessment and recommendations',
        'CAC optimization audit and action plan',
        'Creative performance evaluation',
        'Channel effectiveness analysis',
        'Growth strategy roadmap development',
        'Email support and strategic guidance',
        'Access to strategic frameworks and templates',
        'Quarterly performance review sessions'
      ],
      badge: 'Great for Under $500K ARR',
      badgeColor: 'bg-green-100 text-green-800',
      borderColor: 'border-green-200 hover:border-green-400',
      ctaColor: 'bg-green-600 hover:bg-green-700 text-white',
      ideal: 'Early-stage companies under $500K ARR needing strategic direction'
    },
    {
      id: 'foundation',
      name: 'Foundation',
      icon: Building2,
      price: '$1,500',
      period: '/month',
      description: 'Core strategic optimization and validation for growing SaaS companies',
      features: [
        'Everything in Assessment, plus:',
        'Bi-weekly strategic consultation sessions',
        '11-Phase strategic methodology implementation',
        'Custom CAC optimization roadmap',
        'Creative performance validation framework',
        'Direct access to strategic team',
        'Market positioning and messaging refinement',
        'Attribution modeling setup guidance'
      ],
      badge: 'Perfect for $500K-$1M ARR',
      badgeColor: 'bg-blue-100 text-blue-800',
      borderColor: 'border-blue-200 hover:border-blue-400',
      ctaColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      ideal: 'Companies with $500K-$1M ARR seeking systematic growth optimization'
    },
    {
      id: 'growth',
      name: 'Growth',
      icon: TrendingUp,
      price: '$4,500',
      period: '/month',
      description: 'Complete strategic transformation with hands-on implementation',
      features: [
        'Everything in Foundation, plus:',
        'Bi-weekly strategic implementation calls',
        'Custom creative asset development',
        'Advanced attribution and analytics setup',
        'Cross-channel optimization strategies',
        'Team training and knowledge transfer',
        'Priority support and rapid response',
        'Custom ROI tracking and reporting',
        'Competitive intelligence and positioning',
        'Advanced funnel optimization'
      ],
      badge: 'Most Popular - $1M-$2M ARR',
      badgeColor: 'bg-green-100 text-green-800',
      borderColor: 'border-green-300 hover:border-green-500',
      ctaColor: 'bg-green-600 hover:bg-green-700 text-white',
      popular: true,
      ideal: 'High-growth companies scaling from $1M to $2M+ ARR'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Crown,
      price: '$9,500',
      period: '/month',
      description: 'Full strategic transformation partnership with dedicated team',
      features: [
        'Everything in Growth, plus:',
        'Dedicated strategic account manager',
        'Weekly strategic planning sessions',
        'Custom technology stack integration',
        'Advanced predictive modeling and forecasting',
        'Executive-level strategic consulting',
        'Multi-channel attribution modeling',
        'Custom dashboard and reporting suite',
        'Strategic partnerships and channel development',
        'Board-level performance reporting',
        'Emergency strategic support (24/7)'
      ],
      badge: 'Enterprise - $2M+ ARR',
      badgeColor: 'bg-purple-100 text-purple-800',
      borderColor: 'border-purple-300 hover:border-purple-500',
      ctaColor: 'bg-purple-600 hover:bg-purple-700 text-white',
      ideal: 'Enterprise SaaS companies with $2M+ ARR requiring comprehensive transformation'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-6">
            <Building2 className="h-4 w-4 mr-2" />
            Fortune 100 Systematic Methodology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Strategic Ad Intelligence System
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Transform your subscription business with the same systematic 11-phase methodology 
            used to manage $100M+ in ad spend for Fortune 100 companies. Choose the partnership 
            level that matches your growth stage and revenue goals.
          </p>
          <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto shadow-lg border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600">$100M+</div>
                <div className="text-sm text-gray-600">Ad Spend Managed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">11-Phase</div>
                <div className="text-sm text-gray-600">Systematic Process</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">Fortune 100</div>
                <div className="text-sm text-gray-600">Proven Methods</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl flex flex-col h-full ${
                  tier.popular ? 'ring-2 ring-green-500 transform scale-105' : ''
                } ${tier.borderColor} border-2`}
                onMouseEnter={() => setSelectedTier(tier.id as any)}
                onMouseLeave={() => setSelectedTier(null)}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-4 ${tier.badgeColor}`}>
                    <Icon className="h-4 w-4 mr-2" />
                    {tier.badge}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {tier.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-lg text-gray-500">{tier.period}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className={`text-gray-700 ${feature.startsWith('Everything') ? 'font-semibold text-gray-900' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Ideal for:</div>
                  <div className="text-sm text-gray-600">{tier.ideal}</div>
                </div>

                <div className="mt-auto">
                  <button
                  onClick={onOpenConsultation}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${tier.ctaColor}`}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Strategic Consultation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Free consultation • No obligation • Custom proposal provided
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Not Sure Which Tier is Right for You?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Book a free strategic consultation to get a custom recommendation based on your 
              current ARR, growth goals, and specific challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ConsultationBookingCTA 
                text="Book Free Strategic Consultation"
                variant="primary"
              />
              <div className="text-sm text-gray-500">
                • 30-minute strategic assessment
                <br />
                • Custom ROI projection
                <br />
                • No-obligation strategic guidance
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}