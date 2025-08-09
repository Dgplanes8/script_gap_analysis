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
      badge: 'Perfect for growth teams testing new angles',
      badgeColor: 'bg-orange-100 text-orange-800',
      borderColor: 'border-orange-200 hover:border-orange-400',
      ctaColor: 'bg-orange-600 hover:bg-orange-700 text-white',
      ideal: 'Growth teams at 5-25 employee subscription companies testing creative concepts weekly'
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
      badge: 'Most Popular - Ideal for saturated audiences',
      badgeColor: 'bg-teal-100 text-teal-800',
      borderColor: 'border-teal-300 hover:border-teal-500',
      ctaColor: 'bg-teal-600 hover:bg-teal-700 text-white',
      popular: true,
      ideal: 'Performance marketers at 25-75 employee companies who\'ve saturated their core audiences'
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
        'Performance marketing methodology application',
        'Priority support with strategic consultation'
      ],
      badge: 'Premium - For $50k+ monthly ad spend',
      badgeColor: 'bg-navy-100 text-navy-800',
      borderColor: 'border-navy-300 hover:border-navy-500',
      ctaColor: 'bg-navy-600 hover:bg-navy-700 text-white',
      ideal: 'Heads of Growth at subscription companies scaling beyond $50k/month ad spend'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Built for Growth Leaders
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Creative Concepts Delivered Every Monday (Not Every Month)
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Fresh creative concepts and audience insights for performance marketers who can't wait weeks for agencies. 
            48-hour delivery vs industry standard 1-2 week turnaround.
          </p>
          <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto shadow-lg border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600">48 Hours</div>
                <div className="text-sm text-gray-600">Not 2 Weeks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">Growth Focus</div>
                <div className="text-sm text-gray-600">Subscription Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-navy-600">$67/Month</div>
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
                  tier.popular ? 'ring-2 ring-teal-500 transform scale-105' : ''
                } ${tier.borderColor} border-2`}
                onMouseEnter={() => setSelectedTier(tier.id as any)}
                onMouseLeave={() => setSelectedTier(null)}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
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
                        <Check className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
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
              Not Sure Which Plan Fits Your Growth Stage?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Book a growth assessment to get personalized recommendations based on your current ad spend and team size.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ConsultationBookingCTA 
                text="Book Strategy Call"
                variant="primary"
              />
              <div className="text-sm text-gray-500">
                • 30-minute growth bottleneck assessment
                <br />
                • Creative delivery plan recommendation  
                <br />
                • Performance marketing acceleration strategies
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}