'use client';

import { useState } from 'react';
import { Check, ArrowRight, Zap, Target, Crown, Building2, TrendingUp, Calendar } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { useConsultation } from '@/components/contexts/consultation-context';
import { SimpleAirtableForm } from '@/components/forms/simple-airtable-form';

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
      ideal: 'Growth teams at growing subscription companies testing creative concepts weekly'
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
        '4 weekly scripts - 2 per each concept',
        '1 trend-based + 1 competitor-inspired concept',
        'Brief competitive context analysis',
        'Weekly trend intelligence updates',
        'Competitor analysis methodology',
        'Priority email support'
      ],
      badge: 'Most Popular - Ideal for scaling revenue',
      badgeColor: 'bg-teal-100 text-teal-800',
      borderColor: 'border-teal-300 hover:border-teal-500',
      ctaColor: 'bg-teal-600 hover:bg-teal-700 text-white',
      popular: true,
      ideal: 'Performance marketers who\'ve saturated their core audiences and need fresh concepts'
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
        '6 weekly scripts - 2 per each concept',
        'Trend analysis + competitor breakdown + original concept',
        'Weekly "what\'s working" insight summary',
        'Direct team access for strategic support',
        'Performance marketing methodology application',
        'Priority support with strategic consultation'
      ],
      badge: 'Premium - For $200K+ monthly ad spend',
      badgeColor: 'bg-navy-100 text-navy-800',
      borderColor: 'border-navy-300 hover:border-navy-500',
      ctaColor: 'bg-navy-600 hover:bg-navy-700 text-white',
      ideal: 'Heads of Growth at subscription companies scaling beyond $200K/month ad spend'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Building2,
      price: 'Custom',
      period: '',
      description: 'Full-service creative and media buying solution with comprehensive strategic support',
      features: [
        'Creative concepts delivered weekly',
        'Full-service media buying management',
        'Dedicated account manager and creative team',
        'Comprehensive competitive intelligence',
        'Custom attribution and performance reporting',
        'Strategic consulting and growth planning',
        'Priority support with direct team access',
        'Custom packages tailored to business needs'
      ],
      badge: 'Enterprise - Full service solution',
      badgeColor: 'bg-purple-100 text-purple-800',
      borderColor: 'border-purple-300 hover:border-purple-500',
      ctaColor: 'bg-purple-600 hover:bg-purple-700 text-white',
      ideal: 'Large subscription companies with $500K+ monthly ad spend requiring comprehensive marketing solutions'
    }
  ];

  return (
    <>
    <section id="service-tiers" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Built for Growth Teams
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Creative Concepts Delivered Every Monday (Not Every Month)
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Fresh creative concepts and audience insights for performance marketers who can't wait weeks for agencies. 
            Weekly delivery vs industry standard 1-2 week turnaround.
          </p>
          <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto shadow-lg border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600">Weekly</div>
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

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
                    onClick={() => openConsultation(tier.name)}
                    className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center min-h-[56px] ${tier.ctaColor}`}
                  >
                    <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span className="text-center flex-1">{tier.id === 'enterprise' ? 'Contact Us' : `Start ${tier.name}`}</span>
                    <ArrowRight className="h-4 w-4 ml-2 flex-shrink-0" />
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center min-h-[36px] flex items-center justify-center">
                    {tier.id === 'enterprise' 
                      ? 'Custom pricing • Dedicated support • Tailored solutions'
                      : 'Get personalized recommendations • Optional consultation available • Cancel anytime'
                    }
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Start With Free Hooks - No Risk, Instant Value
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Experience our strategic approach with 10 high-converting hooks before choosing your weekly plan. Perfect for testing our creative intelligence methodology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => openConsultation("Not Sure - Help Me Decide")}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get My 10 Free Hooks
              </button>
              <div className="text-sm text-gray-500">
                • Instant access to hook bank PDF
                <br />
                • Weekly creative intelligence newsletter  
                <br />
                • See our strategic methodology firsthand
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}