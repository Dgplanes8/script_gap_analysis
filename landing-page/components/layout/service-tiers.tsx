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
      name: 'Trend Tracker',
      icon: Zap,
      price: '$67',
      period: '/month',
      description: '1 trending concept delivered every Monday with 2 ready-to-develop scripts',
      features: [
        '1 creative concept delivered every Monday',
        '2 ready-to-develop scripts per concept',
        'Based on current social media trends',
        'Trend source attribution (TikTok, Instagram, etc.)',
        'Weekly delivery consistency',
        'Email delivery and support'
      ],
      badge: 'Perfect for testing trending concepts',
      badgeColor: 'bg-green-100 text-green-800',
      borderColor: 'border-green-200 hover:border-green-400',
      ctaColor: 'bg-green-600 hover:bg-green-700 text-white',
      ideal: 'Small businesses and startups testing creative concepts with trending formats'
    },
    {
      id: 'intelligence',
      name: 'Competitive Edge',
      icon: Target,
      price: '$197',
      period: '/month',
      description: '2 concepts weekly: 1 trend-based + 1 competitor-inspired with analysis',
      features: [
        '2 creative concepts delivered every Monday',
        '3 ready-to-develop scripts total per week',
        '1 trend-based + 1 competitor-inspired concept',
        'Brief competitive context analysis',
        'Weekly trend intelligence updates',
        'Competitor analysis methodology',
        'Priority email support'
      ],
      badge: 'Most Popular - Trend + Competitor Intelligence',
      badgeColor: 'bg-blue-100 text-blue-800',
      borderColor: 'border-blue-300 hover:border-blue-500',
      ctaColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      popular: true,
      ideal: 'Growing D2C brands seeking competitive advantage with strategic intelligence'
    },
    {
      id: 'performance',
      name: 'Market Intelligence',
      icon: Crown,
      price: '$497',
      period: '/month',
      description: 'Full market intelligence with direct team access for strategic support',
      features: [
        '3 creative concepts delivered every Monday',
        '4 ready-to-develop scripts total per week',
        'Trend analysis + competitor breakdown + original concept',
        'Weekly "what\'s working" insight summary',
        'Direct team access for strategic support',
        'Fortune 100 proven methodology application',
        'Priority support with strategic consultation'
      ],
      badge: 'Premium - Market Intelligence + Direct Access',
      badgeColor: 'bg-purple-100 text-purple-800',
      borderColor: 'border-purple-300 hover:border-purple-500',
      ctaColor: 'bg-purple-600 hover:bg-purple-700 text-white',
      ideal: 'Established subscription businesses requiring comprehensive creative strategy'
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
            Weekly Trend Intelligence Delivered Every Monday
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Fresh scripts based on trending social media formats + competitor analysis. 
            Weekly delivery vs industry standard 1-2 week turnaround from traditional agencies.
          </p>
          <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto shadow-lg border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600">Weekly</div>
                <div className="text-sm text-gray-600">Monday Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">Trending</div>
                <div className="text-sm text-gray-600">Fresh Concepts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">$67/Month</div>
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
              Not Sure Which Weekly Plan is Right for You?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Book a strategy consultation to get personalized recommendations for your subscription business growth needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ConsultationBookingCTA 
                text="Book Strategy Call"
                variant="primary"
              />
              <div className="text-sm text-gray-500">
                • 30-minute subscription business assessment
                <br />
                • Weekly trend intelligence plan recommendation  
                <br />
                • Fortune 100 performance marketing insights
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}