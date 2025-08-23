'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Zap, Target, Crown, Building2, TrendingUp, Calendar } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { useConsultation } from '@/components/contexts/consultation-context';
import { SimpleAirtableForm } from '@/components/forms/simple-airtable-form';

export function ServiceTiers() {
  const { openModal: openConsultation } = useConsultation();
  const [selectedTier, setSelectedTier] = useState<'assessment' | 'foundation' | 'growth' | 'enterprise' | null>(null);

  const tiers = [
    {
      id: 'creative-starter',
      name: 'Creative Starter',
      icon: Zap,
      price: '$5',
      period: '/week',
      description: 'Perfect entry point with 1 concept weekly and single platform focus',
      features: [
        '1 high-converting creative concept weekly',
        '2 ready-to-test scripts per concept',
        'Single platform optimization (TikTok, Facebook, OR Instagram)',
        'Basic trend insights & reasoning',
        'Email delivery with implementation tips',
        'Community access for questions'
      ],
      badge: 'Perfect for solopreneurs & early stage',
      badgeColor: 'bg-green-100 text-green-800',
      borderColor: 'border-green-200 hover:border-green-400',
      ctaColor: 'bg-green-600 hover:bg-green-700 text-white',
      ideal: 'Solo founders and early-stage startups with $500-$2K monthly ad spend testing creative approaches'
    },
    {
      id: 'trend-tracker',
      name: 'Trend Tracker',
      icon: TrendingUp,
      price: '$15',
      period: '/week',
      description: 'Weekly trending concepts with multi-platform optimization and strategic insights',
      features: [
        '1 strategic creative concept every Monday',
        '2 ready-to-develop scripts per concept',
        'Multi-platform optimization (TikTok + Facebook + Instagram)',
        'Trend analysis & competitive insights',
        'Performance scoring (25-point framework) - see methodology',
        'Email delivery + basic support',
        'Monthly strategy overview'
      ],
      badge: 'Most Popular - Growing startups',
      badgeColor: 'bg-orange-100 text-orange-800',
      borderColor: 'border-orange-200 hover:border-orange-400',
      ctaColor: 'bg-orange-600 hover:bg-orange-700 text-white',
      popular: true,
      ideal: 'Growth teams at subscription companies with $2K-$10K monthly ad spend needing consistent creative testing'
    },
    {
      id: 'competitive-edge',
      name: 'Competitive Edge',
      icon: Target,
      price: '$35',
      period: '/week',
      description: 'Advanced intelligence with competitor analysis and strategic support',
      features: [
        '2 creative concepts weekly (1 trend-based + 1 competitor-inspired)',
        '4 weekly scripts (2 per concept)',
        'Full competitive intelligence report',
        'Multi-platform + audience optimization',
        'Performance scoring & A/B test recommendations',
        'Priority email support (24hr response)',
        'Monthly strategic consultation call'
      ],
      badge: 'Performance marketing teams',
      badgeColor: 'bg-teal-100 text-teal-800',
      borderColor: 'border-teal-300 hover:border-teal-500',
      ctaColor: 'bg-teal-600 hover:bg-teal-700 text-white',
      ideal: 'Performance marketers with $10K-$50K monthly ad spend who have saturated audiences'
    },
    {
      id: 'market-intelligence',
      name: 'Market Intelligence',
      icon: Crown,
      price: '$99',
      period: '/week',
      description: 'Complete strategic intelligence with direct team access and custom insights',
      features: [
        '3 creative concepts delivered weekly',
        '6 ready-to-test scripts (2 per concept)',
        'Comprehensive competitive analysis',
        'Custom audience research & insights',
        'Direct team access for strategic support',
        'Performance benchmarking & optimization',
        'Weekly strategic review calls',
        'Custom creative brief development'
      ],
      badge: 'Premium - Scale companies $50K+ spend',
      badgeColor: 'bg-navy-100 text-navy-800',
      borderColor: 'border-navy-300 hover:border-navy-500',
      ctaColor: 'bg-navy-600 hover:bg-navy-700 text-white',
      ideal: 'Heads of Growth at scaling companies with $50K+ monthly ad spend requiring strategic creative intelligence'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Building2,
      price: 'Custom',
      period: '',
      description: 'Full-service creative and media buying solution with comprehensive strategic support',
      features: [
        'Custom creative concepts delivered weekly',
        'Full-service media buying management',
        'Dedicated account manager and creative team',
        'Custom competitive intelligence & market analysis',
        'Strategic planning and campaign optimization',
        'Direct executive access and quarterly reviews',
        'Custom reporting and performance dashboards'
      ],
      badge: 'Enterprise - $500K+ spend companies',
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
            🔥 LIMITED TIME: $5/Week Plan - First 50 Customers Only
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Weekly Creative Intelligence - Revolutionary Weekly Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Revolutionary weekly pricing aligned with weekly delivery. Get your first week FREE, then pay only for the weeks you want to continue. Cancel anytime, restart anytime.
          </p>
          <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto shadow-lg border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600">1st Week</div>
                <div className="text-sm text-gray-600">FREE Trial</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">Weekly Billing</div>
                <div className="text-sm text-gray-600">Cancel Anytime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-navy-600">$5/Week</div>
                <div className="text-sm text-gray-600">Starting Price</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-5 gap-8 max-w-7xl mx-auto pt-16 mt-8">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`relative bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl flex flex-col h-full ${
                  tier.popular ? 'ring-2 ring-orange-500 transform sm:scale-105' : ''
                } ${tier.borderColor} border-2`}
                style={{
                  marginTop: tier.popular ? '12px' : '36px'
                }}
                onMouseEnter={() => setSelectedTier(tier.id as any)}
                onMouseLeave={() => setSelectedTier(null)}
              >
                {tier.popular && (
                  <div className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center shadow-lg whitespace-nowrap">
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  {/* FREE Week Badge */}
                  <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-2 rounded-full mb-3">
                    🎉 FIRST WEEK FREE
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 ${tier.badgeColor}`}>
                    <Icon className="h-3 w-3 mr-1" />
                    {tier.badge}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {tier.name}
                  </h3>
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-base text-gray-500">{tier.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6 flex-1">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">What's Included:</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className={`text-gray-700 text-xs ${feature.startsWith('Everything') ? 'font-semibold text-gray-900' : ''}`}>
                          {feature.includes('25-point framework') ? (
                            <>
                              Performance scoring (
                              <Link 
                                href="/25-point-performance-scoring-system" 
                                className="text-blue-600 hover:text-blue-700 underline"
                              >
                                25-point framework
                              </Link>
                              ) - see methodology
                            </>
                          ) : feature.includes('creative brief development') ? (
                            <>
                              Custom{' '}
                              <Link 
                                href="/creative-brief-framework" 
                                className="text-blue-600 hover:text-blue-700 underline"
                              >
                                creative brief development
                              </Link>
                            </>
                          ) : feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-semibold text-gray-900 mb-1">Ideal for:</div>
                  <div className="text-xs text-gray-600">{tier.ideal}</div>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => openConsultation(tier.name)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center min-h-[48px] text-sm ${tier.ctaColor}`}
                  >
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-center flex-1">{tier.id === 'enterprise' ? 'Contact Us' : `Try Free Week`}</span>
                    <ArrowRight className="h-3 w-3 ml-2 flex-shrink-0" />
                  </button>

                  <p className="text-xs text-gray-500 mt-3 text-center min-h-[32px] flex items-center justify-center">
                    {tier.id === 'enterprise' 
                      ? 'Custom pricing • Dedicated support • Tailored solutions'
                      : 'First week FREE • Cancel anytime • No commitment'
                    }
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic Methodology Links */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Learn About Our Proven Methodology
              </h3>
              <p className="text-lg text-gray-600">
                Understand the Fortune 100 frameworks and systematic approach behind our weekly creative intelligence service
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Link href="/weekly-creative-intelligence-playbook" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Complete Methodology</h4>
                  <p className="text-sm text-gray-600 mb-3">Fortune 100 methodology for systematic creative intelligence implementation</p>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">Learn the Framework →</span>
                </div>
              </Link>
              
              <Link href="/25-point-performance-scoring-system" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                    <Target className="h-6 w-6 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Performance Scoring</h4>
                  <p className="text-sm text-gray-600 mb-3">25-point framework for predicting creative performance before testing</p>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">See Scoring System →</span>
                </div>
              </Link>
              
              <Link href="/creative-intelligence-implementation-guide" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Implementation Guide</h4>
                  <p className="text-sm text-gray-600 mb-3">8-week roadmap for implementing creative intelligence in your organization</p>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">Get Implementation Plan →</span>
                </div>
              </Link>
            </div>
          </div>
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