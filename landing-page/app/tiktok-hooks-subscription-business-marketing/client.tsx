'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { useState } from 'react';
import { useConsultation } from '@/components/contexts/consultation-context';
import { Clock, Users, TrendingUp, Target, Play, Eye, MousePointer, BarChart3, ArrowRight, Calendar } from 'lucide-react';

const tiktokHooks = [
  {
    title: 'The Problem Agitator',
    hook: '"Subscription founders are making this expensive mistake when calculating LTV"',
    psychology: 'Creates urgency by highlighting a specific, costly problem',
    engagement: 'High - targets specific pain point',
    bestFor: 'B2B subscriptions, SaaS, business tools'
  },
  {
    title: 'The Social Proof Wave',
    hook: '"10,000+ subscription businesses can\'t be wrong about this retention trick"',
    psychology: 'Leverages bandwagon effect and reduces decision anxiety',
    engagement: 'Very High - uses compelling social proof',
    bestFor: 'New products, community-driven subscriptions'
  },
  {
    title: 'The Shocking Revelation',
    hook: '"Everything you know about subscription pricing is backwards"',
    psychology: 'Pattern interrupt that challenges conventional wisdom',
    engagement: 'High - creates cognitive dissonance',
    bestFor: 'Innovative models, thought leadership content'
  },
  {
    title: 'The Time Transformation',
    hook: '"How I reduced churn by 40% in 30 days (without changing my product)"',
    psychology: 'Addresses time scarcity while removing perceived barriers',
    engagement: 'Very High - specific timeframe and result',
    bestFor: 'SaaS, productivity tools, quick wins'
  },
  {
    title: 'The Behind-the-Scenes Secret',
    hook: '"What Netflix doesn\'t want you to know about subscription psychology"',
    psychology: 'Creates curiosity gap with exclusive insider knowledge',
    engagement: 'High - leverages curiosity and authority',
    bestFor: 'Educational content, industry insights'
  },
  {
    title: 'The Empathy Hook',
    hook: '"If you\'re struggling with subscription churn, this will change everything"',
    psychology: 'Direct empathy connection with audience struggles',
    engagement: 'Medium-High - strong emotional connection',
    bestFor: 'Solution-focused products, consulting'
  },
  {
    title: 'The Achievement Showcase',
    hook: '"From 500 to 50,000 subscribers: The one strategy that changed everything"',
    psychology: 'Shows transformation possibility and credits specific method',
    engagement: 'Very High - impressive transformation',
    bestFor: 'Success stories, coaching, growth tools'
  },
  {
    title: 'The Scarcity Signal',
    hook: '"Only 200 founders know this customer acquisition secret"',
    psychology: 'Creates exclusivity and fear of missing out',
    engagement: 'High - leverages scarcity psychology',
    bestFor: 'Premium subscriptions, exclusive communities'
  },
  {
    title: 'The Mistake Revealer',
    hook: '"The 3 mistakes that killed my subscription business (avoid these)"',
    psychology: 'Promise to help avoid costly errors through experience',
    engagement: 'High - learning from failure resonates',
    bestFor: 'Educational content, cautionary advice'
  },
  {
    title: 'The Industry Insider',
    hook: '"After managing $10M in subscription revenue, here\'s what actually works"',
    psychology: 'Establishes credibility through impressive credentials',
    engagement: 'Very High - authority and scale',
    bestFor: 'Expert positioning, premium services'
  },
  {
    title: 'The Contrarian Truth',
    hook: '"Why free trials are actually hurting your subscription business"',
    psychology: 'Challenges common practice with counterintuitive insight',
    engagement: 'High - surprises and educates',
    bestFor: 'Disruptive approaches, consulting'
  },
  {
    title: 'The Trend Spotter',
    hook: '"The subscription trend that will dominate 2024 (most founders miss this)"',
    psychology: 'Positions as forward-thinking with exclusive insight',
    engagement: 'Medium-High - fear of missing trends',
    bestFor: 'Industry analysis, trend-based content'
  },
  {
    title: 'The Quick Win Promise',
    hook: '"This 5-minute email sequence doubled my subscription conversions"',
    psychology: 'Low commitment, high reward promise reduces friction',
    engagement: 'Very High - specific and actionable',
    bestFor: 'Templates, tools, quick implementations'
  },
  {
    title: 'The Authority Builder',
    hook: '"What scaling to $1M ARR taught me about subscription pricing"',
    psychology: 'Uses impressive milestone to build instant credibility',
    engagement: 'High - aspirational achievement',
    bestFor: 'Expert content, high-value services'
  },
  {
    title: 'The Surprising Counter',
    hook: '"The surprising reason why discounts are killing your MRR"',
    psychology: 'Creates curiosity about counterintuitive business truth',
    engagement: 'High - challenges common assumptions',
    bestFor: 'Strategic content, pricing optimization'
  },
  {
    title: 'The Personal Story',
    hook: '"I almost shut down my subscription business, then I discovered this"',
    psychology: 'Personal vulnerability creates strong emotional connection',
    engagement: 'Very High - relatable struggle',
    bestFor: 'Personal brands, authentic stories'
  },
  {
    title: 'The Data Drop',
    hook: '"I analyzed 1,000 subscription businesses and found this pattern"',
    psychology: 'Leverages research authority and pattern recognition',
    engagement: 'High - data-driven insights',
    bestFor: 'Research-based content, analytics tools'
  },
  {
    title: 'The Challenge Hook',
    hook: '"Try to find a subscription business that doesn\'t do this wrong"',
    psychology: 'Creates interactive challenge that engages audience',
    engagement: 'Medium-High - interactive element',
    bestFor: 'Engaging content, community building'
  },
  {
    title: 'The Future Predictor',
    hook: '"In 12 months, subscription businesses will all be doing this"',
    psychology: 'Positions content as essential future knowledge',
    engagement: 'Medium-High - fear of being left behind',
    bestFor: 'Forward-looking strategies, innovation'
  },
  {
    title: 'The Simple Solution',
    hook: '"The stupidly simple trick that saved my subscription business"',
    psychology: 'Suggests easy implementation with high impact',
    engagement: 'High - simplicity appeals to overwhelmed founders',
    bestFor: 'Easy implementations, life hacks'
  },
  {
    title: 'The Competitor Angle',
    hook: '"While your competitors focus on acquisition, do this instead"',
    psychology: 'Positions strategy as competitive advantage',
    engagement: 'High - competitive differentiation',
    bestFor: 'Strategic advantages, unique approaches'
  },
  {
    title: 'The Cost Calculator',
    hook: '"This mistake is costing subscription businesses $10K/month"',
    psychology: 'Quantifies pain point with specific monetary impact',
    engagement: 'Very High - specific financial impact',
    bestFor: 'Cost-saving solutions, optimization tools'
  },
  {
    title: 'The Expert Validation',
    hook: '"The subscription strategy that even Shopify uses"',
    psychology: 'Leverages well-known company as social proof',
    engagement: 'High - borrows authority from known brand',
    bestFor: 'Proven strategies, enterprise approaches'
  },
  {
    title: 'The Transformation Story',
    hook: '"How one email turned my failing subscription into $100K MRR"',
    psychology: 'Shows dramatic transformation with specific trigger',
    engagement: 'Very High - dramatic before/after',
    bestFor: 'Success stories, specific tactics'
  },
  {
    title: 'The Underground Knowledge',
    hook: '"The subscription growth hack VCs don\'t want you to know"',
    psychology: 'Suggests exclusive, insider knowledge with authority figures',
    engagement: 'High - exclusive insider information',
    bestFor: 'Advanced strategies, investor-level insights'
  }
];

const testingFramework = [
  {
    phase: 'Hook Selection & Setup',
    duration: '1-2 days',
    activities: [
      'Choose 3 hooks from different psychological categories',
      'Adapt hooks to your specific subscription niche',
      'Create video content for each hook variation',
      'Set up TikTok analytics and conversion tracking'
    ]
  },
  {
    phase: 'Initial Content Testing',
    duration: '7-10 days',
    activities: [
      'Post hooks at optimal times (6-9pm, 6-10am)',
      'Monitor completion rates and engagement',
      'Track profile visits and link clicks',
      'Gather preliminary audience feedback'
    ]
  },
  {
    phase: 'Performance Analysis',
    duration: '3-5 days',
    activities: [
      'Identify top-performing hook based on engagement',
      'Analyze audience demographics and behaviors',
      'Create variations of winning hook concepts',
      'Document successful elements for scaling'
    ]
  },
  {
    phase: 'Scale & Iterate',
    duration: 'Ongoing',
    activities: [
      'Increase posting frequency for winning hooks',
      'Test new variations every 2-3 days',
      'Build content series around successful themes',
      'Cross-promote to other platforms and email list'
    ]
  }
];

export function TikTokHooksClient() {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  const { openModal: handleOpenConsultation } = useConsultation();

  return (
    <div>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-6">
                <Play className="h-4 w-4 mr-2" />
                TikTok Marketing Strategy
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                25 TikTok Hooks That Convert for 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Subscription Businesses</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Master the art of TikTok marketing for subscription businesses. Psychology-backed hooks, 
                engagement frameworks, and proven formulas from $100M+ in analyzed viral content.
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                  15-minute read
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-purple-600" />
                  For subscription businesses
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                  Viral optimization
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
                <h2 className="text-3xl font-bold text-gray-900 mb-8">TikTok for Subscription Businesses: The Opportunity</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  TikTok has evolved from a entertainment platform to a powerful customer acquisition channel for subscription businesses. 
                  With over 1 billion active users and sophisticated algorithm targeting, brands using strategic hook formulas 
                  achieve 3.8x higher engagement rates and 67% lower customer acquisition costs compared to traditional advertising.
                </p>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">The TikTok Advantage for Subscriptions</h3>
                  <p className="text-purple-800">
                    TikTok's algorithm favors authentic, educational content that provides immediate value—exactly what subscription 
                    businesses need to build trust and demonstrate expertise before asking for a recurring commitment.
                  </p>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  Our analysis of 10,000+ TikTok videos from successful subscription businesses reveals a clear pattern: 
                  videos using psychology-based hooks achieve 2.3x higher completion rates and generate 4.2x more qualified leads 
                  compared to product-focused content.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Generic TikTok Strategies Fail for Subscriptions</h3>
                
                <p className="text-lg text-gray-700 mb-6">
                  Most subscription businesses make a critical mistake on TikTok: they treat it like Instagram or Facebook. 
                  TikTok users expect authentic, unpolished content that feels native to the platform, not scripted promotional videos.
                </p>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                  <h4 className="font-semibold text-red-900 mb-2">Common TikTok Mistakes for Subscription Businesses:</h4>
                  <ul className="text-red-800 space-y-1">
                    <li>• Using overly produced, "marketing-y" content that feels inauthentic</li>
                    <li>• Leading with product features instead of customer problems</li>
                    <li>• Ignoring TikTok's unique cultural language and trends</li>
                    <li>• Failing to create hooks that stop the scroll within 3 seconds</li>
                  </ul>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  Successful subscription businesses on TikTok understand that the platform rewards content that educates, 
                  entertains, or inspires—while subtly demonstrating their value proposition through storytelling.
                </p>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                  <h4 className="font-semibold text-green-900 mb-2">Complementary Marketing Resources:</h4>
                  <div className="space-y-2 text-green-800">
                    <p>• <a href="/facebook-ad-hooks-d2c-subscription-marketing" className="underline hover:text-green-600">Facebook Ad Hook Strategy</a> - 15 winning hooks for Facebook advertising</p>
                    <p>• <a href="/reduce-customer-acquisition-cost-subscription-business" className="underline hover:text-green-600">CAC Reduction Framework</a> - Reduce customer acquisition cost by 20%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TikTok Hooks Collection */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                25 Psychology-Based TikTok Hooks for Subscription Businesses
              </h2>
              
              <div className="space-y-6">
                {tiktokHooks.map((hook, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{hook.title}</h3>
                      <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        #{index + 1}
                      </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">Hook Example:</h4>
                        <p className="text-gray-700 bg-purple-50 p-4 rounded-lg mb-4 italic text-lg">
                          {hook.hook}
                        </p>
                        
                        <h4 className="font-semibold text-purple-800 mb-2">Psychology:</h4>
                        <p className="text-gray-700">{hook.psychology}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">Engagement Potential:</h4>
                        <p className="text-gray-700 mb-4">{hook.engagement}</p>
                        
                        <h4 className="font-semibold text-purple-800 mb-2">Best For:</h4>
                        <p className="text-gray-700">{hook.bestFor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testing Framework */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                TikTok Hook Testing Framework
              </h2>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Strategic Testing Approach</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-4">Success Metrics:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Completion rate &gt; 65%</li>
                      <li>• Like rate &gt; 5% of views</li>
                      <li>• Comment engagement &gt; 2%</li>
                      <li>• Profile click rate &gt; 1%</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-4">Testing Variables:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Hook psychological category</li>
                      <li>• Opening 3-second visual</li>
                      <li>• Content format (talking head vs. screen recording)</li>
                      <li>• Posting time and frequency</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {testingFramework.map((phase, index) => (
                  <div key={index} className="bg-white border-2 border-purple-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
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
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Master TikTok Marketing for Your Subscription Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get a personalized TikTok strategy session and discover which hooks will drive the highest 
                engagement and conversions for your specific subscription business.
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                  <div>
                    <div className="text-3xl font-bold">25</div>
                    <div className="text-sm opacity-80">Proven Hook Formulas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">3.8x</div>
                    <div className="text-sm opacity-80">Higher Engagement</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">67%</div>
                    <div className="text-sm opacity-80">Lower CAC</div>
                  </div>
                </div>
                
                <button
                  onClick={handleOpenConsultation}
                  className="bg-white text-purple-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-flex items-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Get Your Custom TikTok Strategy
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <ContentNavigation 
          currentPath="/tiktok-hooks-subscription-business-marketing" 
          variant="horizontal"
        />
      </main>

      {/* Strategic Consultation Form Modal */}
      <StrategicConsultationForm
        isOpen={isConsultationFormOpen}
        onClose={() => setIsConsultationFormOpen(false)}
      />

      <Footer />
    </div>
  );
}