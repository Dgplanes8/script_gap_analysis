'use client';

import { useState } from 'react';
import { Check, ArrowRight, Zap, Target, Crown, Building2, TrendingUp, Calendar } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { useConsultation } from '@/components/contexts/consultation-context';

export function ServiceTiers() {
  const { openModal: openConsultation } = useConsultation();
  const [selectedTier, setSelectedTier] = useState<'assessment' | 'foundation' | 'growth' | 'enterprise' | null>(null);

  const tiers = [
    {
      id: 'sprint',
      name: 'AI Creative Sprints',
      icon: Zap,
      price: '$97',
      period: '/month',
      description: 'AI-powered creative concepts and strategic research delivered in 48 hours',
      features: [
        'Weekly Creative Concept Batch (5 AI-generated concepts)',
        'TikTok Trend Analysis (weekly report)',
        'Competitor Intelligence Digest (bi-weekly)',
        'Creative Performance Scoring (AI-powered)',
        'Template Library Access',
        'Community Discord Access',
        '48-Hour Turnaround Guarantee'
      ],
      badge: 'Perfect for $10K-$100K/month ad spend',
      badgeColor: 'bg-green-100 text-green-800',
      borderColor: 'border-green-200 hover:border-green-400',
      ctaColor: 'bg-green-600 hover:bg-green-700 text-white',
      ideal: 'D2C brands and subscription businesses needing fresh creative ideas fast'
    },
    {
      id: 'intelligence',
      name: 'Strategic Intelligence',
      icon: Target,
      price: '$297',
      period: '/month',
      description: 'Complete 11-phase methodology with strategic implementation guidance',
      features: [
        'Everything in AI Creative Sprints, plus:',
        'Full 11-Phase Strategic Process',
        'Monthly Strategic Consultation (60 min)',
        'Custom Brand Archetype Analysis',
        'Competitor Gap Analysis',
        'Customer Language Research',
        'Attribution Modeling Setup',
        'Creative Brief Development',
        'Performance Optimization Recommendations'
      ],
      badge: 'Most Popular - $50K-$500K ARR',
      badgeColor: 'bg-blue-100 text-blue-800',
      borderColor: 'border-blue-300 hover:border-blue-500',
      ctaColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      popular: true,
      ideal: 'Growing businesses wanting systematic creative strategy and implementation'
    },
    {
      id: 'transformation',
      name: 'Creative Transformation',
      icon: Crown,
      price: '$997',
      period: '/month + performance bonuses',
      description: 'Full creative transformation with dedicated strategic partnership',
      features: [
        'Everything in Strategic Intelligence, plus:',
        'Bi-weekly Strategy Sessions (90 min)',
        'Custom Creative Asset Development',
        'Advanced Performance Modeling',
        'Team Training & Knowledge Transfer',
        'Priority Support (24-hour response)',
        'Custom Dashboard & Reporting',
        'Creative Testing Framework',
        'Retention & LTV Optimization',
        'Performance-Based Success Bonuses'
      ],
      badge: 'Enterprise - $500K+ ARR',
      badgeColor: 'bg-purple-100 text-purple-800',
      borderColor: 'border-purple-300 hover:border-purple-500',
      ctaColor: 'bg-purple-600 hover:bg-purple-700 text-white',
      ideal: 'High-growth companies requiring comprehensive creative transformation'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-6">
            <Zap className="h-4 w-4 mr-2" />
            AI-Powered Creative Intelligence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            48-Hour Creative Intelligence Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Get AI-powered creative concepts and strategic research that traditionally takes weeks, 
            delivered in 48 hours. Choose the plan that matches your ad spend and growth goals.
          </p>
          <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto shadow-lg border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600">48 Hours</div>
                <div className="text-sm text-gray-600">Creative Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">AI-Powered</div>
                <div className="text-sm text-gray-600">Performance Scoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">$97/Month</div>
                <div className="text-sm text-gray-600">Starting Price</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  onClick={openConsultation}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${tier.ctaColor}`}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Get My {tier.name}
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
              Not Sure Which Plan is Right for You?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Book a free consultation to get a custom recommendation based on your 
              current ad spend, creative needs, and growth goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ConsultationBookingCTA 
                text="Book Free Creative Consultation"
                variant="primary"
              />
              <div className="text-sm text-gray-500">
                • 30-minute creative assessment
                <br />
                • Custom plan recommendation
                <br />
                • No-obligation creative guidance
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}