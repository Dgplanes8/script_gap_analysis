'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { useState } from 'react';
import { useConsultation } from '@/components/contexts/consultation-context';
import { Clock, Users, TrendingUp, Target, Facebook, Eye, MousePointer, BarChart3, ArrowRight } from 'lucide-react';

const hookFormulas = [
  {
    title: 'The Problem Agitator',
    formula: '"[Target Audience] are making this [costly mistake] when [doing activity]"',
    example: '"D2C founders are making this costly mistake when calculating customer lifetime value"',
    psychology: 'Creates urgency by highlighting a specific problem your audience faces',
    bestFor: 'B2B subscriptions, educational content, problem-solving products'
  },
  {
    title: 'The Social Proof Tsunami',
    formula: '"[Number] [Target Audience] can\'t be wrong about [solution/benefit]"',
    example: '"10,000 subscription box founders can\'t be wrong about this retention strategy"',
    psychology: 'Leverages bandwagon effect and reduces decision-making anxiety',
    bestFor: 'New products needing credibility, community-driven subscriptions'
  },
  {
    title: 'The Contrarian Truth',
    formula: '"Everything you know about [topic] is wrong. Here\'s why..."',
    example: '"Everything you know about subscription pricing is wrong. Here\'s why..."',
    psychology: 'Pattern interrupt that challenges conventional wisdom',
    bestFor: 'Innovative subscription models, educational content, thought leadership'
  },
  {
    title: 'The Time Transformer',
    formula: '"How to [achieve result] in [timeframe] without [common obstacle]"',
    example: '"How to reduce churn by 40% in 90 days without changing your product"',
    psychology: 'Addresses time scarcity while removing perceived barriers',
    bestFor: 'SaaS subscriptions, productivity tools, efficiency-focused products'
  },
  {
    title: 'The Behind-the-Scenes Reveal',
    formula: '"What [successful company/person] doesn\'t want you to know about [topic]"',
    example: '"What Netflix doesn\'t want you to know about subscription psychology"',
    psychology: 'Creates curiosity and positions content as exclusive insider knowledge',
    bestFor: 'Educational subscriptions, industry insights, competitive positioning'
  },
  {
    title: 'The Pain Point Amplifier',
    formula: '"If you\'re [struggling with X], this will change everything"',
    example: '"If you\'re struggling with subscription churn, this will change everything"',
    psychology: 'Direct empathy connection with audience pain points',
    bestFor: 'Solution-focused subscriptions, B2B tools, consulting services'
  },
  {
    title: 'The Achievement Anchor',
    formula: '"From [starting point] to [impressive result]: The [method/tool] that made it possible"',
    example: '"From 500 to 50,000 subscribers: The retention strategy that made it possible"',
    psychology: 'Shows transformation possibility and credits specific method',
    bestFor: 'Success stories, coaching subscriptions, business tools'
  },
  {
    title: 'The Scarcity Signal',
    formula: '"Only [number] [target audience] know this [secret/strategy]"',
    example: '"Only 200 D2C founders know this customer acquisition secret"',
    psychology: 'Creates exclusivity and fear of missing out',
    bestFor: 'Premium subscriptions, exclusive communities, limited-access content'
  },
  {
    title: 'The Mistake Revealer',
    formula: '"The [number] mistakes killing your [desired outcome]"',
    example: '"The 7 mistakes killing your subscription retention rate"',
    psychology: 'Promises to help avoid costly errors',
    bestFor: 'Educational content, consulting services, optimization tools'
  },
  {
    title: 'The Industry Insider',
    formula: '"After [time period] in [industry], here\'s what really works for [outcome]"',
    example: '"After 10 years in subscription marketing, here\'s what really works for retention"',
    psychology: 'Establishes credibility through experience and expertise',
    bestFor: 'Expert positioning, consulting services, premium subscriptions'
  },
  {
    title: 'The Comparison Crusher',
    formula: '"Why [popular solution] is failing [target audience] (and what to do instead)"',
    example: '"Why traditional email marketing is failing subscription businesses (and what to do instead)"',
    psychology: 'Challenges status quo while positioning alternative solution',
    bestFor: 'Disruptive products, alternative solutions, competitive positioning'
  },
  {
    title: 'The Trend Spotter',
    formula: '"The [industry/topic] trend that will [impact] in [timeframe]"',
    example: '"The subscription commerce trend that will reshape D2C in 2024"',
    psychology: 'Positions content as forward-thinking and valuable for planning',
    bestFor: 'Industry analysis, trend-based subscriptions, forward-looking content'
  },
  {
    title: 'The Quick Win Promise',
    formula: '"The [timeframe] [action] that [impressive result]"',
    example: '"The 5-minute email sequence that doubled our subscription conversions"',
    psychology: 'Low commitment, high reward promise reduces friction',
    bestFor: 'Quick implementation tools, templates, simple solutions'
  },
  {
    title: 'The Authority Builder',
    formula: '"What [impressive metric/achievement] taught me about [topic]"',
    example: '"What managing $10M in subscription revenue taught me about pricing"',
    psychology: 'Uses impressive credentials to build immediate trust',
    bestFor: 'Expert content, premium services, high-value subscriptions'
  },
  {
    title: 'The Surprise Reveal',
    formula: '"The surprising reason why [common belief] is keeping you from [desired outcome]"',
    example: '"The surprising reason why free trials are keeping you from profitable subscriptions"',
    psychology: 'Creates cognitive dissonance and curiosity about counterintuitive insights',
    bestFor: 'Educational content, paradigm-shifting products, consulting services'
  }
];

const testingFramework = [
  {
    phase: 'Phase 1: Hook Selection',
    duration: '1-2 days',
    activities: [
      'Choose 3 hook formulas from different psychological categories',
      'Adapt each hook to your specific subscription offering',
      'Create video/image creative for each hook variation',
      'Set up tracking pixels and conversion events'
    ]
  },
  {
    phase: 'Phase 2: Initial Testing',
    duration: '7-10 days',
    activities: [
      'Launch all 3 hook variations with identical budgets',
      'Monitor 3-second video views and engagement rates',
      'Track click-through rates to landing pages',
      'Gather preliminary conversion data'
    ]
  },
  {
    phase: 'Phase 3: Optimization',
    duration: '3-5 days',
    activities: [
      'Identify top-performing hook based on cost per conversion',
      'Scale budget on winning hook by 50-100%',
      'Pause underperforming variations',
      'Create 2-3 new variations of winning hook'
    ]
  },
  {
    phase: 'Phase 4: Iteration',
    duration: 'Ongoing',
    activities: [
      'Test new hook angles every 2-3 weeks',
      'Monitor creative fatigue indicators',
      'Build library of proven hooks for future campaigns',
      'Document learnings for team knowledge base'
    ]
  }
];

export function FacebookAdHooksClient() {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  const { openModal: handleOpenConsultation } = useConsultation();

  return (
    <React.Fragment>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook Ad Strategy
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Facebook Ad Creative Strategy: 15 Winning Hooks for 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> D2C Subscriptions</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Master the art of Facebook ad hooks that convert browsers into subscribers. Proven formulas, 
                psychology breakdowns, and A/B testing frameworks from Fortune 100 methodology.
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  18-minute read
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  For D2C subscriptions
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                  Conversion-optimized
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Facebook Ads for D2C Subscription Businesses: The 2024 Reality</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  Facebook advertising for D2C subscription businesses has evolved dramatically. With iOS 14.5+ privacy changes, 
                  increased competition, and rising CPMs, the margin for error has shrunk. Today's successful subscription brands 
                  win through superior creative strategy—and it all starts with the hook.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">The 3-Second Rule</h3>
                  <p className="text-blue-800">
                    Facebook users decide whether to engage with your ad in just 1.7 seconds on average. Your hook determines 
                    whether your subscription business message gets seen or gets scrolled past.
                  </p>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  Our analysis of $100M+ in managed Facebook ad spend for subscription businesses reveals a clear pattern: 
                  brands using strategic, psychology-based hooks achieve 2.8x higher engagement rates and 52% lower 
                  cost-per-acquisition compared to generic promotional content.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Traditional Product-Focused Hooks Fail</h3>
                
                <p className="text-lg text-gray-700 mb-6">
                  Most D2C subscription brands make a critical mistake: they lead with product features instead of customer emotions. 
                  Hooks like "Our monthly snack box delivers 12 premium treats" focus on what you do, not why someone should care.
                </p>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                  <h4 className="font-semibold text-red-900 mb-2">Common Hook Mistakes:</h4>
                  <ul className="text-red-800 space-y-1">
                    <li>• Leading with product features instead of customer benefits</li>
                    <li>• Using generic claims that could apply to any subscription</li>
                    <li>• Failing to create emotional connection or curiosity</li>
                    <li>• Ignoring platform-specific user behaviors and expectations</li>
                  </ul>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  Winning Facebook ad hooks for subscription businesses tap into deeper psychological triggers: fear of missing out, 
                  desire for transformation, social proof, and curiosity gaps that compel immediate attention.
                </p>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                  <h4 className="font-semibold text-green-900 mb-2">Complementary Strategic Resources:</h4>
                  <div className="space-y-2 text-green-800">
                    <p>• <a href="/tiktok-hooks-subscription-business-marketing" className="underline hover:text-green-600">TikTok Hooks for Subscriptions</a> - 25 proven hooks for viral TikTok marketing</p>
                    <p>• <a href="/reduce-customer-acquisition-cost-subscription-business" className="underline hover:text-green-600">CAC Optimization Framework</a> - Complete methodology to reduce costs by 20%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hook Formulas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                15 Proven Facebook Ad Hook Formulas
              </h2>
              
              <div className="space-y-8">
                {hookFormulas.map((hook, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{hook.title}</h3>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        #{index + 1}
                      </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Formula:</h4>
                        <p className="text-gray-700 bg-blue-50 p-4 rounded-lg mb-4 font-mono text-sm">
                          {hook.formula}
                        </p>
                        
                        <h4 className="font-semibold text-blue-800 mb-2">Example:</h4>
                        <p className="text-gray-700 bg-green-50 p-4 rounded-lg italic">
                          {hook.example}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Psychology:</h4>
                        <p className="text-gray-700 mb-4">{hook.psychology}</p>
                        
                        <h4 className="font-semibold text-blue-800 mb-2">Best For:</h4>
                        <p className="text-gray-700">{hook.bestFor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* A/B Testing Framework */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                A/B Testing Framework for Facebook Ad Hooks
              </h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">The Strategic Testing Approach</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-4">Testing Methodology:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Test 3 hooks from different psychological categories</li>
                      <li>• Use identical visuals, audience, and budgets</li>
                      <li>• Run for minimum 7 days or 1,000 impressions per ad</li>
                      <li>• Focus on cost per conversion, not just engagement</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-4">Success Metrics:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 3-second video view rate &gt; 45%</li>
                      <li>• Click-through rate &gt; 1.5%</li>
                      <li>• Cost per click 20% below account average</li>
                      <li>• Conversion rate &gt; 2% on landing page</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {testingFramework.map((phase, index) => (
                  <div key={index} className="bg-white border-2 border-blue-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{phase.phase}</h3>
                        <p className="text-sm text-gray-600">{phase.duration}</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 text-gray-700">
                      {phase.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Creative Refresh Strategy */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Creative Refresh Strategy: Avoiding Ad Fatigue
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Eye className="h-6 w-6 mr-3 text-blue-600" />
                    Recognizing Creative Fatigue
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 mb-2">↓ 25%</div>
                      <p className="text-sm text-gray-700">CTR decline from peak performance</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 mb-2">↑ 15%</div>
                      <p className="text-sm text-gray-700">CPC increase over 5-day period</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 mb-2">&lt; 2%</div>
                      <p className="text-sm text-gray-700">Engagement rate threshold</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <MousePointer className="h-6 w-6 mr-3 text-blue-600" />
                    Refresh Strategy Framework
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="font-semibold text-blue-800 mb-2">Week 1-2: Hook Iteration</h4>
                      <p className="text-gray-700">Keep core message, change hook angle or opening statement</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="font-semibold text-green-800 mb-2">Week 3-4: Visual Refresh</h4>
                      <p className="text-gray-700">Maintain hook, update imagery, colors, or video scenes</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="font-semibold text-purple-800 mb-2">Week 5-6: Format Variation</h4>
                      <p className="text-gray-700">Test same hook in different formats (video → carousel → single image)</p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="font-semibold text-orange-800 mb-2">Week 7+: Complete Refresh</h4>
                      <p className="text-gray-700">New hook category, messaging angle, and creative treatment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Measurement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Performance Measurement & Optimization
              </h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Performance Indicators (KPIs)</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-4">Top-Funnel Metrics:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-blue-200">
                        <span className="text-gray-700">3-Second Video Views</span>
                        <span className="font-semibold text-blue-600">&gt; 45%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-blue-200">
                        <span className="text-gray-700">Click-Through Rate</span>
                        <span className="font-semibold text-blue-600">&gt; 1.5%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-blue-200">
                        <span className="text-gray-700">Cost Per Click</span>
                        <span className="font-semibold text-blue-600">&lt; $0.75</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-4">Conversion Metrics:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-blue-200">
                        <span className="text-gray-700">Landing Page CVR</span>
                        <span className="font-semibold text-green-600">&gt; 2%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-blue-200">
                        <span className="text-gray-700">Cost Per Acquisition</span>
                        <span className="font-semibold text-green-600">&lt; $50</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-blue-200">
                        <span className="text-gray-700">ROAS (30-day)</span>
                        <span className="font-semibold text-green-600">&gt; 3:1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-4">Optimization Decision Framework:</h4>
                
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <p className="text-sm font-semibold text-yellow-800 mb-1">If 3-second view rate &lt; 35%:</p>
                    <p className="text-yellow-700 text-sm">Hook is not compelling enough → Test stronger opening statements</p>
                  </div>
                  
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                    <p className="text-sm font-semibold text-orange-800 mb-1">If CTR &lt; 1%:</p>
                    <p className="text-orange-700 text-sm">Creative lacks visual appeal → Refresh imagery or video content</p>
                  </div>
                  
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-sm font-semibold text-red-800 mb-1">If Landing Page CVR &lt; 1.5%:</p>
                    <p className="text-red-700 text-sm">Message-market fit issue → Review hook-to-landing page alignment</p>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-sm font-semibold text-green-800 mb-1">If all metrics performing well:</p>
                    <p className="text-green-700 text-sm">Scale budget by 25-50% and prepare next hook variation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Master Facebook Ad Hooks for Your Subscription Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get a personalized Facebook ad strategy session and discover which hook formulas will drive the highest 
                conversions for your specific D2C subscription business.
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                  <div>
                    <div className="text-3xl font-bold">15</div>
                    <div className="text-sm opacity-80">Proven Hook Formulas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">2.8x</div>
                    <div className="text-sm opacity-80">Higher Engagement</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">52%</div>
                    <div className="text-sm opacity-80">Lower CAC</div>
                  </div>
                </div>
                
                <button
                  onClick={handleOpenConsultation}
                  className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-flex items-center"
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Get Your Custom Facebook Ad Strategy
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <ContentNavigation 
          currentPath="/facebook-ad-hooks-d2c-subscription-marketing" 
          variant="horizontal"
        />
      </main>

      {/* Strategic Consultation Form Modal */}
      <StrategicConsultationForm
        isOpen={isConsultationFormOpen}
        onClose={() => setIsConsultationFormOpen(false)}
      />

      <Footer />
    </React.Fragment>
  );
}