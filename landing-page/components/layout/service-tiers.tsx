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
      id: 'starter',
      name: 'Concept Starter',
      icon: Zap,
      price: '$97',
      period: '/month',
      description: '1 expert creative concept per week with 3 ready-to-develop scripts',
      features: [
        '1 expert creative concept per week (4/month)',
        'Each concept includes 3 ready-to-develop scripts',
        'Trending concept analysis',
        'Basic competitive context',
        '48-hour turnaround guarantee',
        'Email delivery and support'
      ],
      badge: 'Perfect for testing Aspics Media',
      badgeColor: 'bg-green-100 text-green-800',
      borderColor: 'border-green-200 hover:border-green-400',
      ctaColor: 'bg-green-600 hover:bg-green-700 text-white',
      ideal: 'D2C brands wanting to test our creative approach with executable scripts'
    },
    {
      id: 'intelligence',
      name: 'Intelligence Accelerator',
      icon: Target,
      price: '$297',
      period: '/month',
      description: '3 expert concepts weekly plus competitive intelligence and research',
      features: [
        '3 expert creative concepts per week',
        'Each concept includes 3 ready-to-develop scripts (9 scripts/week)',
        'Monthly competitive intelligence report',
        'Customer language research and insights',
        'Strategic rationale for each concept',
        'Performance optimization insights',
        'Priority email support'
      ],
      badge: 'Most Popular - High Volume Scripts',
      badgeColor: 'bg-blue-100 text-blue-800',
      borderColor: 'border-blue-300 hover:border-blue-500',
      ctaColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      popular: true,
      ideal: 'Growing businesses needing consistent creative output with strategic backing'
    },
    {
      id: 'performance',
      name: 'Performance Accelerator',
      icon: Crown,
      price: '$997',
      period: '/month',
      description: 'Full performance marketing acceleration with strategic consultation',
      features: [
        'Everything in Intelligence Accelerator, plus:',
        'Custom media performance assessment',
        'Campaign setup and attribution modeling consultation',
        'Full 11-phase strategic approach',
        'Ready-to-develop scripts with creative briefs',
        'Monthly strategy calls (30 minutes)',
        'Priority support and direct access'
      ],
      badge: 'Full Service - $10K-$1MM ad spend',
      badgeColor: 'bg-purple-100 text-purple-800',
      borderColor: 'border-purple-300 hover:border-purple-500',
      ctaColor: 'bg-purple-600 hover:bg-purple-700 text-white',
      ideal: 'High-growth companies requiring comprehensive performance marketing acceleration'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Performance Marketing Acceleration
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready-to-Develop Scripts in 48 Hours
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Each creative concept includes 3 ready-to-develop scripts optimized for different platforms. 
            Expert strategy with AI-enhanced research delivered in 48 hours, not weeks.
          </p>
          <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto shadow-lg border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600">48 Hours</div>
                <div className="text-sm text-gray-600">Script Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">3 Scripts</div>
                <div className="text-sm text-gray-600">Per Concept</div>
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
              Book a $100 strategy consultation (fully credited toward any package you choose) 
              to get a custom recommendation based on your performance marketing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ConsultationBookingCTA 
                text="Book $100 Strategy Consultation"
                variant="primary"
              />
              <div className="text-sm text-gray-500">
                • 30-minute performance marketing assessment
                <br />
                • $100 credit applied to chosen package
                <br />
                • Custom strategy recommendation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}