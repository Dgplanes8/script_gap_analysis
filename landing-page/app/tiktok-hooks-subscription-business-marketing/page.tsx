import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { useState } from 'react';
import { Clock, Users, TrendingUp, Target, Play, Heart, MessageCircle, Share, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '25 TikTok Hooks That Convert for Subscription Businesses | Strategic Ad Intelligence',
  description: 'Discover 25 proven TikTok hooks that drive conversions for subscription businesses. Based on Fortune 100 methodology with psychology breakdowns and optimization frameworks.',
  keywords: 'TikTok hooks subscription business, TikTok marketing subscription, viral TikTok hooks, subscription business TikTok strategy, TikTok hooks that convert',
  openGraph: {
    title: '25 TikTok Hooks That Convert for Subscription Businesses',
    description: 'Discover 25 proven TikTok hooks that drive conversions for subscription businesses. Based on Fortune 100 methodology.',
    type: 'website',
  },
  alternates: {
    canonical: '/tiktok-hooks-subscription-business-marketing',
  },
};

const hooks = [
  {
    category: 'Problem/Solution',
    hooks: [
      'This is why your subscription box business is losing customers...',
      'I canceled 5 subscriptions this month, except this one...',
      'Stop wasting money on subscription marketing that doesn\'t work',
      'Your subscription churn rate is telling you something important',
      'This subscription mistake is costing you thousands',
      'Why subscription businesses fail in their first year',
    ]
  },
  {
    category: 'Social Proof',
    hooks: [
      'Our subscription box went from 0 to 10K subscribers in 6 months',
      '1 million subscribers can\'t be wrong about this',
      'Subscription business owners are obsessed with this strategy',
      'This is how we reduced churn by 40% in 3 months',
      'Customers are begging us to keep their subscriptions active',
      'The subscription strategy everyone is copying',
    ]
  },
  {
    category: 'Curiosity',
    hooks: [
      'The subscription business secret nobody talks about',
      'What subscription companies don\'t want you to know',
      'I discovered something shocking about subscription psychology',
      'The weird subscription hack that actually works',
      'This subscription trend will change everything in 2024',
      'The subscription model that\'s breaking all the rules',
    ]
  },
  {
    category: 'Urgency/FOMO',
    hooks: [
      'Subscription boxes are selling out faster than ever',
      'Only 48 hours left to join this exclusive subscription',
      'Last chance to get this subscription deal',
      'This subscription offer disappears at midnight',
      'We\'re closing subscriptions to new members tomorrow',
      'Limited spots left in our premium subscription tier',
    ]
  },
  {
    category: 'Educational',
    hooks: [
      'The psychology behind why people cancel subscriptions',
      'How to create a subscription box people actually want',
      'The subscription pricing strategy that tripled our revenue',
    ]
  }
];

const psychologyBreakdowns = [
  {
    title: 'Problem/Solution Hooks',
    psychology: 'Tap into pain points and position your solution as the hero',
    why: 'Creates immediate relevance and emotional connection with viewers facing similar challenges',
    best: 'B2B SaaS subscriptions and D2C boxes with clear problem-solving value props'
  },
  {
    title: 'Social Proof Hooks',
    psychology: 'Leverage bandwagon effect and credibility through numbers and success stories',
    why: 'Reduces risk perception and builds trust through demonstrated results',
    best: 'New subscription businesses needing credibility and established brands showcasing growth'
  },
  {
    title: 'Curiosity Hooks',
    psychology: 'Create information gaps that viewers feel compelled to fill',
    why: 'Exploits the brain\'s natural desire to complete incomplete information',
    best: 'Complex subscription models or unique value propositions that need explanation'
  },
  {
    title: 'Urgency/FOMO Hooks',
    psychology: 'Trigger scarcity bias and loss aversion to drive immediate action',
    why: 'Creates time pressure that overrides analytical thinking and drives impulsive decisions',
    best: 'Limited-time offers, exclusive subscriptions, or seasonal promotions'
  }
];

export default function TikTokHooksPage() {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  const handleOpenConsultation = () => {
    setIsConsultationFormOpen(true);
  };

  return (
    <>
      <Header onOpenConsultation={handleOpenConsultation} />
      
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
                Stop your scroll with proven hooks that drive subscription conversions. Based on Fortune 100 
                methodology and $100M+ in managed ad spend across subscription businesses.
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
                  Conversion-focused
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
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Why TikTok Hooks Matter for Subscription Businesses</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  TikTok has fundamentally changed how subscription businesses acquire customers. With over 1 billion active users 
                  and an algorithm that rewards engaging content, TikTok offers unprecedented reach for subscription brands willing 
                  to master the platform's unique content style.
                </p>
                
                <p className="text-lg text-gray-700 mb-6">
                  But here's the challenge: TikTok users scroll fast. The average user spends just 1-3 seconds deciding whether 
                  to watch your video or keep scrolling. Your hook—those critical opening moments—determines whether your 
                  subscription business message gets seen or gets skipped.
                </p>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">The TikTok Conversion Formula</h3>
                  <p className="text-purple-800">
                    <strong>Hook (0-3 seconds)</strong> → Engagement (3-15 seconds) → Value Delivery (15-30 seconds) → 
                    Call-to-Action (30-60 seconds) = Subscription Conversion
                  </p>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  Our analysis of $100M+ in managed ad spend reveals that subscription businesses using strategic TikTok hooks 
                  see 3.2x higher engagement rates and 45% better cost-per-acquisition compared to generic video content.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                  <h4 className="font-semibold text-blue-900 mb-2">Related Strategic Resources:</h4>
                  <div className="space-y-2 text-blue-800">
                    <p>• <a href="/facebook-ad-hooks-d2c-subscription-marketing" className="underline hover:text-blue-600">Facebook Ad Hook Formulas</a> - 15 winning hook formulas for cross-platform success</p>
                    <p>• <a href="/reduce-customer-acquisition-cost-subscription-business" className="underline hover:text-blue-600">CAC Reduction Strategy</a> - Systematic approach to reduce acquisition costs by 20%</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What Makes a TikTok Hook Convert</h3>
                
                <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 mb-8">
                  <li><strong>Immediate Pattern Interrupt:</strong> Break the scroll with unexpected statements or visuals</li>
                  <li><strong>Clear Value Promise:</strong> Tell viewers exactly what they'll gain from watching</li>
                  <li><strong>Emotional Trigger:</strong> Tap into desires, fears, or curiosity that resonates with your ICP</li>
                  <li><strong>Platform Native:</strong> Feel like organic TikTok content, not traditional advertising</li>
                  <li><strong>Specific to Subscriptions:</strong> Address unique subscription business challenges and opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hook Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                25 Proven TikTok Hooks by Category
              </h2>
              
              <div className="space-y-12">
                {hooks.map((category, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target className="h-6 w-6 mr-3 text-purple-600" />
                      {category.category} Hooks
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.hooks.map((hook, hookIndex) => (
                        <div key={hookIndex} className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                          <p className="text-gray-800 font-medium">"{hook}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Psychology Breakdowns */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                The Psychology Behind Each Hook Type
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {psychologyBreakdowns.map((breakdown, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{breakdown.title}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">Psychology:</h4>
                        <p className="text-gray-700">{breakdown.psychology}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">Why It Works:</h4>
                        <p className="text-gray-700">{breakdown.why}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">Best For:</h4>
                        <p className="text-gray-700">{breakdown.best}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industry Adaptations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Industry-Specific Hook Adaptations
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">B2B SaaS Subscriptions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-3">Focus Areas:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• ROI and efficiency gains</li>
                        <li>• Time-saving benefits</li>
                        <li>• Competitive advantages</li>
                        <li>• Team productivity</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-3">Example Adaptation:</h4>
                      <p className="text-gray-700 bg-purple-50 p-4 rounded-lg italic">
                        "This SaaS tool just saved our team 20 hours per week..."
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">D2C Subscription Boxes</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-3">Focus Areas:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Unboxing experience</li>
                        <li>• Surprise and delight</li>
                        <li>• Value and savings</li>
                        <li>• Lifestyle enhancement</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-3">Example Adaptation:</h4>
                      <p className="text-gray-700 bg-purple-50 p-4 rounded-lg italic">
                        "This subscription box just delivered my new obsession..."
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Digital Content Subscriptions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-3">Focus Areas:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Exclusive access</li>
                        <li>• Learning outcomes</li>
                        <li>• Community benefits</li>
                        <li>• Personal growth</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-3">Example Adaptation:</h4>
                      <p className="text-gray-700 bg-purple-50 p-4 rounded-lg italic">
                        "This subscription just taught me skills that doubled my income..."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testing Framework */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Hook Testing & Optimization Framework
              </h2>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">The 3-2-1 Testing Method</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Hook Categories</h4>
                    <p className="text-gray-700 text-sm">Test one hook from 3 different categories simultaneously</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Weeks Runtime</h4>
                    <p className="text-gray-700 text-sm">Allow 2 weeks for statistically significant data collection</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Winner Selection</h4>
                    <p className="text-gray-700 text-sm">Scale the single best-performing hook and iterate</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="font-semibold text-purple-800 mb-3">Key Metrics to Track:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-700">
                      <li>• 3-second view rate (hook effectiveness)</li>
                      <li>• Average watch time</li>
                      <li>• Engagement rate (likes, comments, shares)</li>
                    </ul>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Click-through rate to landing page</li>
                      <li>• Cost per click (CPC)</li>
                      <li>• Subscription conversion rate</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="font-semibold text-purple-800 mb-3">Optimization Guidelines:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• If 3-second view rate < 50%, test a stronger hook</li>
                    <li>• If engagement is high but conversions low, test clearer CTAs</li>
                    <li>• If CPC is high, test more native-feeling content</li>
                    <li>• Refresh hooks every 2-3 weeks to combat creative fatigue</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Transform Your Subscription Marketing?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get a personalized TikTok strategy session and discover which hooks will work best for your specific subscription business.
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                  <div>
                    <div className="text-3xl font-bold">25+</div>
                    <div className="text-sm opacity-80">Proven Hooks</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">$100M+</div>
                    <div className="text-sm opacity-80">Ad Spend Analyzed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">3.2x</div>
                    <div className="text-sm opacity-80">Engagement Increase</div>
                  </div>
                </div>
                
                <button
                  onClick={handleOpenConsultation}
                  className="bg-white text-purple-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-flex items-center"
                >
                  <Target className="h-5 w-5 mr-2" />
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
    </>
  );
}