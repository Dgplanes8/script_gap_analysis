import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Users, TrendingUp, Target, Zap, CheckCircle, AlertCircle, Clock, Award, Brain, Gift, Lock, Unlock, BarChart3, ArrowUpRight } from 'lucide-react';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'Freemium to Premium Conversion Optimization: Psychology-Driven Framework | Apsics Media',
  description: 'Master freemium conversion optimization with psychology-based methodology. Weekly intelligence framework increases free-to-paid conversion rates by 35-60% for subscription apps.',
  keywords: 'freemium conversion optimization, freemium mobile app marketing, weekly conversion optimization, premium subscription conversion, freemium psychology, free to paid conversion',
  openGraph: {
    title: 'Freemium to Premium Conversion Optimization: Psychology-Driven Framework',
    description: 'Master freemium conversion optimization with psychology-based methodology. Weekly intelligence framework increases free-to-paid conversion rates by 35-60%.',
    type: 'article',
  },
  alternates: {
    canonical: '/freemium-to-premium-conversion-optimization',
  },
};

// Freemium psychology principles
const psychologyPrinciples = [
  {
    principle: 'Loss Aversion & Investment Theory',
    description: 'Users become attached to free features they\'ve invested time in, making premium feel like "protecting investment" rather than new expense',
    application: 'Progressive feature usage tracking, investment visualization, upgrade messaging focused on "protection" rather than "purchase"',
    conversionImpact: '25-40% lift in upgrade consideration',
    weeklyOptimization: 'Monitor feature usage patterns, identify high-investment users, optimize upgrade timing and messaging'
  },
  {
    principle: 'Social Proof & Status Signaling',
    description: 'Premium features serve as status symbols within user communities, driving upgrades through social comparison and aspiration',
    application: 'Visible premium badges, exclusive community access, social sharing of premium achievements, peer comparison features',
    conversionImpact: '30-50% improvement in social-driven conversions',
    weeklyOptimization: 'Track social feature engagement, identify status-driven upgrade patterns, optimize community-based conversion paths'
  },
  {
    principle: 'Scarcity & Exclusivity Psychology',
    description: 'Limited premium slots or time-sensitive offers create urgency and increase perceived value of premium features',
    application: 'Limited premium memberships, time-limited upgrade offers, exclusive feature access, early bird pricing',
    conversionImpact: '40-65% increase in conversion velocity',
    weeklyOptimization: 'Test scarcity messaging, optimize offer timing, analyze urgency-based conversion patterns'
  },
  {
    principle: 'Reciprocity & Commitment Consistency',
    description: 'Users feel obligated to reciprocate value received, especially when they\'ve publicly committed to goals or communities',
    application: 'Value-first onboarding, public goal setting, community commitments, progressive value delivery',
    conversionImpact: '20-35% lift in long-term conversion rates',
    weeklyOptimization: 'Monitor value realization moments, optimize commitment mechanisms, track reciprocity-driven upgrade behavior'
  }
];

// Freemium conversion methodology
const conversionMethodology = [
  {
    phase: 'Week 1-2',
    title: 'Baseline Analysis & User Segmentation',
    focus: 'Understanding current conversion patterns and user behavior',
    objective: 'Establish conversion baseline and identify high-potential user segments',
    activities: [
      'Analyze current free-to-paid conversion funnel and drop-off points',
      'Segment users by engagement level, feature usage, and conversion probability',
      'Identify key moments of value realization and premium feature discovery',
      'Map user journey from activation to premium consideration',
      'Establish tracking for conversion-predictive behaviors'
    ],
    deliverables: [
      'Conversion funnel analysis with segment-specific insights',
      'User behavior heatmaps and engagement patterns',
      'Value realization moment identification',
      'Premium feature usage correlation analysis'
    ],
    expectedResults: 'Clear understanding of conversion drivers and optimization opportunities'
  },
  {
    phase: 'Week 3-4',
    title: 'Psychology-Based Optimization',
    focus: 'Implementing behavioral psychology principles to improve conversion',
    objective: 'Deploy psychology-driven interventions to increase conversion rates',
    activities: [
      'Implement loss aversion messaging for high-engagement users',
      'Deploy social proof elements and community status features',
      'Create scarcity-based upgrade offers and exclusive access opportunities',
      'Optimize upgrade timing based on value realization moments',
      'A/B test psychological triggers across different user segments'
    ],
    deliverables: [
      'Psychology-optimized upgrade flows and messaging',
      'Social proof integration across key conversion points',
      'Scarcity-based offer system implementation',
      'Behavioral trigger optimization framework'
    ],
    expectedResults: '25-45% improvement in conversion rates through psychological optimization'
  },
  {
    phase: 'Week 5-6',
    title: 'Feature Gating & Value Ladder',
    focus: 'Strategic feature limitation and progressive value delivery',
    objective: 'Optimize feature availability to drive premium upgrades without hurting retention',
    activities: [
      'Redesign feature gating strategy based on user value patterns',
      'Create progressive value ladder encouraging natural upgrade progression',
      'Implement smart paywall timing based on engagement momentum',
      'Optimize free feature set for maximum conversion without churn risk',
      'Deploy contextual upgrade prompts at high-value moments'
    ],
    deliverables: [
      'Optimized feature gating strategy implementation',
      'Progressive value ladder system',
      'Smart paywall timing algorithm',
      'Contextual upgrade prompt optimization'
    ],
    expectedResults: '15-30% increase in upgrade consideration with maintained free user retention'
  },
  {
    phase: 'Week 7-8',
    title: 'Advanced Optimization & Scaling',
    focus: 'Predictive modeling and automated optimization systems',
    objective: 'Scale successful interventions and implement predictive conversion systems',
    activities: [
      'Deploy machine learning models for conversion probability prediction',
      'Implement automated upgrade prompt optimization based on user behavior',
      'Scale successful psychology-based interventions across user base',
      'Create predictive churning prevention for high-value free users',
      'Build sustainable weekly optimization workflows'
    ],
    deliverables: [
      'Predictive conversion model implementation',
      'Automated optimization system deployment',
      'Scaled psychology-based intervention framework',
      'Weekly optimization workflow documentation'
    ],
    expectedResults: '40-70% total conversion improvement with scalable optimization systems'
  }
];

// Feature gating strategies
const featureGatingStrategies = [
  {
    strategy: 'Progressive Value Gates',
    description: 'Gradually introduce premium feature limitations as users increase engagement',
    implementation: [
      'Week 1: Full feature access to encourage deep engagement',
      'Week 2-3: Introduce soft limits with clear premium benefit messaging',
      'Week 4+: Implement full gates with emphasis on "investment protection"'
    ],
    psychology: 'Users develop attachment to features before facing limitations, making premium feel necessary rather than optional',
    conversionMetrics: 'Typical improvement: 35-55% in conversion rates',
    bestFor: 'Productivity apps, creative tools, fitness platforms'
  },
  {
    strategy: 'Social Feature Gating',
    description: 'Limit social and community features to create exclusivity and status motivation',
    implementation: [
      'Free users: Basic community access and standard profiles',
      'Premium users: Enhanced profiles, exclusive groups, priority support',
      'Premium features: Social badges, leaderboards, mentorship access'
    ],
    psychology: 'Social status and community belonging drive upgrades, especially for users with high social engagement',
    conversionMetrics: 'Typical improvement: 40-70% among socially active users',
    bestFor: 'Social fitness apps, learning platforms, professional networks'
  },
  {
    strategy: 'Usage-Based Smart Gates',
    description: 'Dynamic feature limitations based on individual user engagement patterns',
    implementation: [
      'Monitor individual usage patterns and engagement signals',
      'Apply personalized limits based on conversion probability',
      'Adjust gating timing based on value realization moments'
    ],
    psychology: 'Personalized limitations feel fair and relevant, increasing acceptance and conversion likelihood',
    conversionMetrics: 'Typical improvement: 45-60% with reduced churn risk',
    bestFor: 'Data analysis tools, design software, educational platforms'
  }
];

// Conversion optimization tactics
const optimizationTactics = [
  {
    category: 'Onboarding Optimization',
    tactics: [
      'Value realization acceleration through guided feature tours',
      'Social proof integration during initial user experience',
      'Progressive goal setting to increase investment and commitment',
      'Community introduction to leverage social psychology'
    ],
    weeklyIntelligence: 'Onboarding completion rates, time-to-value analysis, feature discovery patterns, social engagement initiation',
    expectedImpact: '25-40% improvement in conversion-ready users'
  },
  {
    category: 'Upgrade Moment Optimization',
    tactics: [
      'Contextual upgrade prompts triggered by high-engagement actions',
      'Social proof display at premium feature discovery moments',
      'Limited-time upgrade offers during peak engagement periods',
      'Investment visualization showing accumulated value and progress'
    ],
    weeklyIntelligence: 'Engagement momentum patterns, optimal upgrade prompt timing, social proof effectiveness tracking',
    expectedImpact: '30-50% improvement in upgrade conversion rates'
  },
  {
    category: 'Retention-Conversion Balance',
    tactics: [
      'Free tier optimization for maximum value without cannibalizing premium',
      'Churn prediction and intervention for high-potential free users',
      'Progressive feature education to increase premium feature awareness',
      'Community building to increase switching costs and platform attachment'
    ],
    weeklyIntelligence: 'Free user lifetime value analysis, churn prediction accuracy, community engagement correlation with upgrades',
    expectedImpact: '40-60% improvement in long-term conversion rates with maintained retention'
  }
];

// Case studies
const caseStudies = [
  {
    appType: 'Fitness & Wellness App',
    userBase: '2.1M monthly active users',
    challenge: 'Low 2.3% free-to-paid conversion, high feature usage but poor upgrade consideration',
    conversionStrategy: [
      'Implemented social proof badges for premium members in community features',
      'Created progressive workout plan gates with "investment protection" messaging',
      'Added social comparison features exclusive to premium subscribers',
      'Deployed weekly habit tracking with premium-only advanced analytics'
    ],
    results: {
      timeframe: '8 weeks',
      conversionImprovement: '267%',
      metrics: [
        'Free-to-paid conversion: 2.3% → 6.1%',
        'Average time to conversion: 45 days → 23 days',
        'Premium user engagement: +89% vs free users',
        'Community participation among premium: +156%'
      ],
      revenueImpact: 'Monthly recurring revenue increased by $340K (278% growth)'
    },
    quote: "The psychology-based approach transformed our users from feature users to community members who happened to pay for premium access."
  },
  {
    appType: 'Creative Design Platform',
    userBase: '850K monthly active users',
    challenge: 'High engagement on free tier but users didn\'t understand premium value proposition',
    conversionStrategy: [
      'Introduced progressive project complexity requiring premium features',
      'Implemented "investment visualization" showing accumulated work and progress',
      'Created exclusive premium user showcases and community recognition',
      'Added smart gating based on individual creative output patterns'
    ],
    results: {
      timeframe: '6 weeks',
      conversionImprovement: '189%',
      metrics: [
        'Free-to-paid conversion: 3.8% → 11.2%',
        'Premium feature discovery: +234%',
        'Project completion rates: +67% among premium users',
        'User-generated content sharing: +145% from premium users'
      ],
      revenueImpact: 'Average revenue per user increased by 156%, customer lifetime value up 203%'
    },
    quote: "Understanding that our users weren't buying features—they were protecting their creative investments—changed everything."
  }
];

export default function FreemiumToPremiumConversionOptimization() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Freemium to Premium Conversion Optimization: Psychology-Driven Framework",
            "description": "Master freemium conversion optimization with psychology-based methodology. Weekly intelligence framework increases free-to-paid conversion rates by 35-60% for subscription apps.",
            "author": {
              "@type": "Organization",
              "name": "Apsics Media"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Apsics Media"
            },
            "datePublished": "2025-01-20",
            "dateModified": "2025-01-20"
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              FREEMIUM CONVERSION OPTIMIZATION
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Freemium to Premium Conversion Optimization
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Psychology-driven framework for optimizing freemium conversion rates. 
              Systematic methodology increases free-to-paid conversion by 35-60%.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">Psychology-Based</div>
                <div className="text-emerald-200 text-sm">Behavioral science approach</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">35-60% Lift</div>
                <div className="text-emerald-200 text-sm">Average conversion improvement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">8 Weeks</div>
                <div className="text-emerald-200 text-sm">Implementation timeframe</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#psychology-framework"
                className="bg-white text-emerald-600 hover:bg-brand-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Explore Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="/d2c-subscription-marketing-strategy"
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                D2C Strategy
                <Users className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Psychology Principles */}
      <section id="psychology-framework" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Freemium Conversion Psychology Framework
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Four core psychology principles that drive freemium-to-premium conversions, 
              with weekly intelligence optimization for sustainable growth.
            </p>
            
            <div className="space-y-8">
              {psychologyPrinciples.map((principle, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-brand-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{principle.principle}</h3>
                      <p className="text-gray-600">{principle.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Implementation Strategy</h4>
                      <p className="text-sm text-gray-700 mb-4">{principle.application}</p>
                      
                      <div className="bg-brand-50 rounded-lg p-4 border border-emerald-200">
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
                          <span className="font-semibold text-emerald-800">Expected Impact: {principle.conversionImpact}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Weekly Intelligence Optimization</h4>
                      <p className="text-sm text-gray-700">{principle.weeklyOptimization}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8-Week Methodology */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              8-Week Freemium Conversion Methodology
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Systematic approach to freemium conversion optimization using psychology principles 
              and weekly intelligence for sustainable improvement.
            </p>
            
            <div className="space-y-8">
              {conversionMethodology.map((phase, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-brand-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-emerald-600 mb-1">{phase.phase}</div>
                      <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                      <p className="text-gray-600">{phase.focus}</p>
                    </div>
                  </div>
                  
                  <div className="bg-brand-50 rounded-lg p-4 mb-6 border border-emerald-200">
                    <h4 className="font-semibold text-emerald-800 mb-2">Objective</h4>
                    <p className="text-emerald-700 text-sm">{phase.objective}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Activities</h4>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Deliverables</h4>
                      <div className="space-y-2">
                        {phase.deliverables.map((deliverable, delIndex) => (
                          <div key={delIndex} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <span className="text-sm text-blue-800">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-100 rounded-lg border-l-4 border-emerald-500">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-emerald-600 mr-2" />
                      <span className="font-semibold text-gray-900">Expected Results: </span>
                      <span className="text-gray-700">{phase.expectedResults}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Gating Strategies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Strategic Feature Gating Approaches
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Psychology-informed feature gating strategies that drive conversions while maintaining user satisfaction and retention.
            </p>
            
            <div className="space-y-8">
              {featureGatingStrategies.map((strategy, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{strategy.strategy}</h3>
                      <p className="text-gray-600">{strategy.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">{strategy.conversionMetrics.split(' ')[2]}</div>
                      <div className="text-sm text-gray-500">Improvement Range</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Implementation Framework</h4>
                      <div className="space-y-3">
                        {strategy.implementation.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start">
                            <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <span className="text-xs font-bold text-emerald-600">{stepIndex + 1}</span>
                            </div>
                            <span className="text-sm text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Psychology & Results</h4>
                      <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <h5 className="font-semibold text-blue-800 text-sm mb-2">Psychology Principle</h5>
                          <p className="text-blue-700 text-xs">{strategy.psychology}</p>
                        </div>
                        
                        <div className="bg-brand-50 rounded-lg p-4 border border-brand-200">
                          <h5 className="font-semibold text-brand-800 text-sm mb-2">Conversion Results</h5>
                          <p className="text-brand-700 text-xs font-medium">{strategy.conversionMetrics}</p>
                        </div>
                        
                        <div className="bg-brand-50 rounded-lg p-4 border border-brand-200">
                          <h5 className="font-semibold text-brand-800 text-sm mb-2">Best Applications</h5>
                          <p className="text-brand-700 text-xs">{strategy.bestFor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Optimization Tactics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Conversion Optimization Tactics by Category
            </h2>
            
            <div className="space-y-6">
              {optimizationTactics.map((category, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Optimization Tactics</h4>
                      <ul className="space-y-2">
                        {category.tactics.map((tactic, tacticIndex) => (
                          <li key={tacticIndex} className="flex items-start">
                            <Zap className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{tactic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Weekly Intelligence Focus</h4>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                        <p className="text-blue-700 text-sm">{category.weeklyIntelligence}</p>
                      </div>
                      
                      <div className="bg-brand-50 rounded-lg p-4 border border-emerald-200">
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
                          <span className="font-semibold text-emerald-800 text-sm">Expected Impact: {category.expectedImpact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Freemium Conversion Success Stories
            </h2>
            
            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{study.appType}</h3>
                      <span className="text-emerald-600 font-medium">{study.userBase}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-emerald-600">+{study.results.conversionImprovement}</div>
                      <div className="text-sm text-gray-500">Conversion Improvement</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Psychology-Based Strategy</h4>
                    <ul className="space-y-1">
                      {study.conversionStrategy.map((strategy, stratIndex) => (
                        <li key={stratIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Results ({study.results.timeframe})</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {study.results.metrics.map((metric, metIndex) => (
                        <div key={metIndex} className="bg-brand-50 rounded-lg p-3 border border-emerald-200">
                          <span className="text-sm text-emerald-800 font-medium">{metric}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-4 bg-brand-50 rounded-lg border border-brand-200">
                      <h5 className="font-semibold text-brand-800 mb-2">Revenue Impact</h5>
                      <p className="text-brand-700 text-sm font-medium">{study.results.revenueImpact}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-emerald-500">
                    <p className="text-gray-700 italic">"{study.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Calculator */}
      <section className="py-16 bg-brand-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Freemium Conversion Potential Calculator
            </h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <BarChart3 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Estimate Your Conversion Improvement Potential
                </h3>
                <p className="text-gray-600">
                  Calculate potential revenue impact from freemium conversion optimization
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Active Free Users
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="50000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="3.2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Average Monthly Subscription ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="29"
                  />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <button className="bg-brand-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-700 transition-colors">
                  Calculate Improvement Potential
                </button>
              </div>
              
              <div className="p-6 bg-brand-50 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-gray-900 mb-4">Expected Results (45% Conversion Improvement):</h4>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">2,320</div>
                    <div className="text-sm text-gray-600">New Monthly Conversions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">4.6%</div>
                    <div className="text-sm text-gray-600">Improved Conversion Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">$67,280</div>
                    <div className="text-sm text-gray-600">Additional Monthly Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-brand-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Optimize Your Freemium Conversions with Psychology
            </h2>
            
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Transform your freemium model with behavioral psychology insights and weekly intelligence optimization 
              for sustainable conversion growth.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                <div className="font-semibold">Psychology-Driven</div>
                <div className="text-emerald-200 text-sm">Behavioral science optimization</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                <div className="font-semibold">Smart Feature Gating</div>
                <div className="text-emerald-200 text-sm">Strategic limitation optimization</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                <div className="font-semibold">35-60% Improvement</div>
                <div className="text-emerald-200 text-sm">Proven conversion gains</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-emerald-600 hover:bg-brand-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Get Freemium Audit
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <FreeWeekButton source="freemium_to_premium_conversion_optimization-cta" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center">Start Free Week Trial</FreeWeekButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Conversion Optimization Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/mobile-app-cac-optimization-2025"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mobile App CAC</h3>
                <p className="text-sm text-gray-600">
                  Optimize mobile app acquisition costs with freemium conversion strategies
                </p>
              </Link>
              
              <Link 
                href="/d2c-subscription-marketing-strategy"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">D2C Marketing</h3>
                <p className="text-sm text-gray-600">
                  Consumer psychology strategies for direct-to-consumer subscription growth
                </p>
              </Link>
              
              <Link 
                href="/saas-creative-strategy-roi-calculator"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">SaaS ROI Calculator</h3>
                <p className="text-sm text-gray-600">
                  Calculate ROI impact of creative strategy optimization for SaaS businesses
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
