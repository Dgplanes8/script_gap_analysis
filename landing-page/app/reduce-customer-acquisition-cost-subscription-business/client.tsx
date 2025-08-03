'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { StrategyROICalculator } from '@/components/calculators/strategic-roi-calculator';
import { CACOptimizationCalculator } from '@/components/calculators/cac-optimization-calculator';
import { useState } from 'react';
import { useConsultation } from '@/components/contexts/consultation-context';
import { Clock, Users, TrendingDown, Target, DollarSign, Zap, CheckCircle, AlertTriangle, ArrowRight, Calendar } from 'lucide-react';

const optimizationLevers = [
  {
    title: 'Attribution Model Optimization',
    impact: 'High',
    difficulty: 'Medium',
    timeframe: '2-4 weeks',
    description: 'Implement multi-touch attribution to accurately measure customer journey and redistribute budget to highest-performing touchpoints.',
    tactics: [
      'Set up server-side tracking for iOS 14.5+ compliance',
      'Implement first-party data collection strategies',
      'Use attribution modeling to identify undervalued channels',
      'Optimize budget allocation based on true contribution metrics'
    ],
    expectedReduction: '8-15%'
  },
  {
    title: 'Landing Page Conversion Optimization',
    impact: 'High',
    difficulty: 'Low',
    timeframe: '1-2 weeks',
    description: 'Systematic testing and optimization of landing page elements to increase conversion rates without additional traffic costs.',
    tactics: [
      'A/B test headline variations focused on customer language',
      'Optimize form fields to reduce friction and abandonment',
      'Test social proof placement and messaging',
      'Implement exit-intent popups with compelling offers'
    ],
    expectedReduction: '5-12%'
  },
  {
    title: 'Audience Segmentation Refinement',
    impact: 'High',
    difficulty: 'Medium',
    timeframe: '2-3 weeks',
    description: 'Create more precise audience segments to improve ad relevance and reduce wasted spend on low-intent users.',
    tactics: [
      'Analyze customer data to identify high-LTV segments',
      'Create lookalike audiences based on best customers',
      'Implement behavior-based custom audiences',
      'Use negative audiences to exclude low-converting segments'
    ],
    expectedReduction: '10-18%'
  },
  {
    title: 'Creative Performance Analysis',
    impact: 'Medium',
    difficulty: 'Low',
    timeframe: '1 week',
    description: 'Data-driven creative optimization to improve engagement rates and reduce cost per engagement.',
    tactics: [
      'Identify top-performing creative elements across campaigns',
      'Test customer language in ad copy and hooks',
      'Optimize creative refresh schedule to combat fatigue',
      'Implement dynamic creative testing frameworks'
    ],
    expectedReduction: '3-8%'
  },
  {
    title: 'Funnel Friction Analysis',
    impact: 'Medium',
    difficulty: 'Medium',
    timeframe: '2-3 weeks',
    description: 'Identify and eliminate conversion bottlenecks throughout the customer acquisition funnel.',
    tactics: [
      'Implement comprehensive funnel tracking and analytics',
      'Analyze drop-off points and optimize accordingly',
      'Test different onboarding sequences for trial users',
      'Optimize mobile experience and page load speeds'
    ],
    expectedReduction: '4-10%'
  },
  {
    title: 'Bidding Strategy Optimization',
    impact: 'Medium',
    difficulty: 'High',
    timeframe: '3-4 weeks',
    description: 'Advanced bidding strategy implementation to improve cost efficiency across advertising platforms.',
    tactics: [
      'Test automated bidding strategies vs manual optimization',
      'Implement value-based bidding where available',
      'Optimize bid adjustments based on device, time, location',
      'Use portfolio bidding strategies for campaign efficiency'
    ],
    expectedReduction: '5-12%'
  },
  {
    title: 'Customer Journey Optimization',
    impact: 'High',
    difficulty: 'High',
    timeframe: '4-6 weeks',
    description: 'Comprehensive customer journey mapping and optimization to improve conversion rates at each touchpoint.',
    tactics: [
      'Map complete customer journey from awareness to subscription',
      'Implement retargeting sequences for each journey stage',
      'Optimize email nurture sequences for trial conversions',
      'Create personalized experiences based on customer segments'
    ],
    expectedReduction: '8-20%'
  }
];

const implementationTimeline = [
  {
    week: 'Week 1',
    focus: 'Foundation & Quick Wins',
    activities: [
      'Audit current attribution setup and tracking',
      'Implement landing page conversion optimization tests',
      'Analyze creative performance data for immediate optimizations',
      'Set up comprehensive measurement framework'
    ]
  },
  {
    week: 'Week 2-3',
    focus: 'Audience & Targeting Optimization',
    activities: [
      'Refine audience segmentation based on customer data analysis',
      'Implement lookalike audience testing',
      'Set up negative audience exclusions',
      'Begin funnel friction analysis and mobile optimization'
    ]
  },
  {
    week: 'Week 4-5',
    focus: 'Advanced Optimization',
    activities: [
      'Implement multi-touch attribution modeling',
      'Test advanced bidding strategies',
      'Launch customer journey optimization initiatives',
      'Refine creative refresh and testing processes'
    ]
  },
  {
    week: 'Week 6+',
    focus: 'Measurement & Iteration',
    activities: [
      'Measure CAC reduction across all implemented changes',
      'Document successful optimizations for scaling',
      'Establish ongoing optimization processes',
      'Plan next phase of strategic improvements'
    ]
  }
];

const measurementFramework = [
  {
    metric: 'Blended CAC',
    calculation: 'Total marketing spend ÷ Total new customers',
    frequency: 'Weekly',
    target: '20% reduction from baseline'
  },
  {
    metric: 'Channel-Specific CAC',
    calculation: 'Channel spend ÷ Channel conversions',
    frequency: 'Weekly',
    target: 'Identify best performing channels'
  },
  {
    metric: 'Landing Page CVR',
    calculation: 'Conversions ÷ Landing page visits',
    frequency: 'Daily',
    target: '>2% conversion rate'
  },
  {
    metric: 'Cost Per Click',
    calculation: 'Ad spend ÷ Total clicks',
    frequency: 'Daily',
    target: 'Maintain or improve while optimizing'
  },
  {
    metric: 'LTV:CAC Ratio',
    calculation: 'Customer LTV ÷ Customer CAC',
    frequency: 'Monthly',
    target: '>3:1 ratio'
  }
];

export function CACReductionClient() {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  const { openModal: handleOpenConsultation } = useConsultation();

  return (
    <div>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-6">
                <TrendingDown className="h-4 w-4 mr-2" />
                CAC Optimization Strategy
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How to Reduce CAC by 20% 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Without Increasing Ad Spend</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Proven Fortune 100 methodology to systematically reduce customer acquisition cost for subscription businesses. 
                7 strategic optimization levers with implementation framework and measurement tactics.
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-green-600" />
                  22-minute read
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-green-600" />
                  For subscription businesses
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                  ROI-focused
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
                <h2 className="text-3xl font-bold text-gray-900 mb-8">The CAC Crisis Facing Subscription Businesses in 2024</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  Customer acquisition cost has become the defining metric for subscription business success—and failure. 
                  With iOS 14.5+ privacy changes, increased competition, and rising platform costs, many subscription 
                  businesses are experiencing CAC inflation of 20-40% year-over-year.
                </p>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">The CAC Inflation Reality</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-red-800">
                    <div>
                      <p className="font-semibold">B2B SaaS:</p>
                      <p>Average CAC increased 22% in 2023</p>
                    </div>
                    <div>
                      <p className="font-semibold">D2C Subscriptions:</p>
                      <p>Average CAC increased 34% in 2023</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  But here's what most subscription businesses miss: the solution isn't always spending more on ads. 
                  Our analysis of $100M+ in managed ad spend reveals that strategic optimization of existing campaigns 
                  can reduce CAC by 15-25% without increasing total ad budget.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Traditional "Spend More" Approaches Fail</h3>
                
                <p className="text-lg text-gray-700 mb-6">
                  Most subscription businesses respond to rising CAC by increasing ad spend or expanding to new channels. 
                  This approach often backfires because it doesn't address the underlying inefficiencies in their 
                  acquisition system.
                </p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                  <h4 className="font-semibold text-yellow-900 mb-2">Common CAC Reduction Mistakes:</h4>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Focusing only on top-of-funnel metrics instead of conversion optimization</li>
                    <li>• Making budget allocation decisions without proper attribution data</li>
                    <li>• Ignoring landing page and funnel optimization opportunities</li>
                    <li>• Failing to segment audiences for improved relevance and efficiency</li>
                  </ul>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  The Fortune 100 approach is different: systematic optimization of every element in the customer 
                  acquisition system to maximize efficiency before scaling spend.
                </p>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
                  <h4 className="font-semibold text-purple-900 mb-2">Strategic Implementation Resources:</h4>
                  <div className="space-y-2 text-purple-800">
                    <p>• <a href="/facebook-ad-hooks-d2c-subscription-marketing" className="underline hover:text-purple-600">Facebook Ad Hook Optimization</a> - Improve ad performance with proven hook formulas</p>
                    <p>• <a href="/tiktok-hooks-subscription-business-marketing" className="underline hover:text-purple-600">TikTok Marketing Strategy</a> - 25 hooks that convert for subscription businesses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fortune 100 Methodology */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Fortune 100 CAC Optimization Methodology
              </h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">The 4-Pillar Framework</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Measurement Excellence</h4>
                        <p className="text-gray-700 text-sm">Implement accurate attribution and tracking systems</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Systematic Optimization</h4>
                        <p className="text-gray-700 text-sm">Apply proven optimization levers in strategic sequence</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Continuous Testing</h4>
                        <p className="text-gray-700 text-sm">Implement rigorous testing frameworks for all changes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Performance Monitoring</h4>
                        <p className="text-gray-700 text-sm">Track and iterate based on comprehensive performance data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-6">
                  This methodology has delivered consistent CAC reductions of 15-30% across subscription businesses 
                  ranging from $500K to $50M+ ARR, without requiring additional ad spend.
                </p>
                
                <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-lg">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Conservative Target: 20% CAC Reduction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Optimization Levers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                7 Strategic Optimization Levers
              </h2>
              
              <div className="space-y-8">
                {optimizationLevers.map((lever, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex flex-wrap items-start justify-between mb-6">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{lever.title}</h3>
                          <p className="text-gray-700">{lever.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lever.impact === 'High' ? 'bg-red-100 text-red-800' :
                          lever.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {lever.impact} Impact
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lever.difficulty === 'High' ? 'bg-red-100 text-red-800' :
                          lever.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {lever.difficulty} Difficulty
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {lever.timeframe}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="font-semibold text-gray-900 mb-3">Implementation Tactics:</h4>
                        <ul className="space-y-2">
                          {lever.tactics.map((tactic, tacticIndex) => (
                            <li key={tacticIndex} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{tactic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="lg:col-span-1">
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <h4 className="font-semibold text-green-800 mb-2">Expected CAC Reduction</h4>
                          <div className="text-2xl font-bold text-green-600">{lever.expectedReduction}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Framework */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Implementation Framework & Timeline
              </h2>
              
              <div className="space-y-6">
                {implementationTimeline.map((phase, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{phase.week}</h3>
                        <p className="text-green-700 font-semibold">{phase.focus}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {phase.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-start">
                          <Zap className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Measurement & Tracking */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Measurement & Tracking Setup
              </h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Performance Indicators (KPIs)</h3>
                
                <div className="space-y-4">
                  {measurementFramework.map((metric, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="grid md:grid-cols-4 gap-4 items-center">
                        <div>
                          <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Calculation:</p>
                          <p className="text-sm font-mono text-blue-600">{metric.calculation}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Frequency:</p>
                          <p className="text-sm font-semibold">{metric.frequency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Target:</p>
                          <p className="text-sm font-semibold text-green-600">{metric.target}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Critical Success Factors</h4>
                    <ul className="text-yellow-800 space-y-1 text-sm">
                      <li>• Establish baseline CAC measurements before implementing changes</li>
                      <li>• Allow sufficient time for statistical significance (minimum 2 weeks per test)</li>
                      <li>• Monitor for external factors that could impact results (seasonality, market changes)</li>
                      <li>• Document all changes for future reference and scaling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Calculate Your CAC Optimization Potential
              </h2>
              
              <div className="space-y-12">
                <StrategyROICalculator />
                <CACOptimizationCalculator />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Reduce Your CAC by 20%?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get a personalized CAC optimization strategy session and discover which optimization levers will 
                deliver the highest impact for your specific subscription business.
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                  <div>
                    <div className="text-3xl font-bold">7</div>
                    <div className="text-sm opacity-80">Optimization Levers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">20%</div>
                    <div className="text-sm opacity-80">CAC Reduction Target</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">6 weeks</div>
                    <div className="text-sm opacity-80">Implementation Timeline</div>
                  </div>
                </div>
                
                <button
                  onClick={handleOpenConsultation}
                  className="bg-white text-green-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-flex items-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Get Your Custom CAC Optimization Plan
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <ContentNavigation 
          currentPath="/reduce-customer-acquisition-cost-subscription-business" 
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