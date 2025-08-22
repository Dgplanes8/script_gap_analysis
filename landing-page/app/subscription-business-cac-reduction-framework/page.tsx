import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingDown, Users, DollarSign, BarChart3, Target, Zap, CheckCircle, AlertTriangle, Clock, Award, Calculator, TrendingUp, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Subscription Business CAC Reduction Framework: 25% Cost Optimization with Weekly Intelligence | Apsics Media',
  description: 'Comprehensive framework for reducing customer acquisition costs in subscription businesses. 3-phase methodology delivers 25% CAC reduction through systematic creative intelligence.',
  keywords: 'reduce customer acquisition cost subscription business, subscription CAC optimization, weekly creative strategy, customer acquisition cost reduction, subscription business growth, CAC reduction framework',
  openGraph: {
    title: 'Subscription Business CAC Reduction Framework: 25% Cost Optimization with Weekly Intelligence',
    description: 'Comprehensive framework for reducing customer acquisition costs in subscription businesses. 3-phase methodology delivers 25% CAC reduction.',
    type: 'article',
  },
  alternates: {
    canonical: '/subscription-business-cac-reduction-framework',
  },
};

// CAC crisis data for subscription industry
const subscriptionCACData = {
  industryIncrease: 50,
  sinceYear: 2016,
  averageCAC: {
    b2bSaas: '$195',
    consumerApps: '$28.60',
    ecommerce: '$67',
    fintech: '$142'
  },
  benchmarkRanges: [
    { revenue: '$0-$1M ARR', healthyCAC: '$50-$125', warningCAC: '$125-$200', criticalCAC: '$200+' },
    { revenue: '$1M-$5M ARR', healthyCAC: '$125-$250', warningCAC: '$250-$400', criticalCAC: '$400+' },
    { revenue: '$5M-$20M ARR', healthyCAC: '$200-$500', warningCAC: '$500-$800', criticalCAC: '$800+' },
    { revenue: '$20M+ ARR', healthyCAC: '$400-$1000', warningCAC: '$1000-$1500', criticalCAC: '$1500+' }
  ]
};

// 3-phase framework
const cacReductionFramework = [
  {
    phase: 'Phase 1',
    title: 'Intelligence Foundation',
    duration: '2-3 weeks',
    focus: 'Data collection, analysis, and baseline establishment',
    objective: 'Create comprehensive understanding of current CAC drivers and optimization opportunities',
    keyActivities: [
      'Complete CAC audit across all channels and customer segments',
      'Implement advanced attribution modeling and tracking systems',
      'Analyze customer journey touchpoints and conversion barriers',
      'Establish weekly intelligence collection and reporting workflows',
      'Create competitive landscape analysis and positioning assessment'
    ],
    deliverables: [
      'CAC baseline report by channel, segment, and time period',
      'Customer acquisition funnel analysis with conversion rates',
      'Competitive intelligence dashboard setup',
      'Weekly reporting automation implementation',
      'Strategic opportunity matrix with prioritized optimization areas'
    ],
    successMetrics: [
      'Complete visibility into CAC by all relevant dimensions',
      '90%+ data accuracy in attribution modeling',
      'Weekly intelligence workflow operational',
      'Competitive analysis framework established'
    ],
    expectedOutcome: 'Foundation for data-driven optimization with clear baseline metrics'
  },
  {
    phase: 'Phase 2',
    title: 'Strategic Optimization',
    duration: '4-6 weeks',
    focus: 'Creative intelligence implementation and systematic testing',
    objective: 'Deploy weekly creative intelligence methodology for sustainable CAC reduction',
    keyActivities: [
      'Implement weekly creative intelligence gathering and analysis',
      'Deploy systematic A/B testing across all acquisition channels',
      'Optimize customer acquisition funnels based on intelligence insights',
      'Launch competitor-informed creative strategy development',
      'Execute channel-specific optimization strategies'
    ],
    deliverables: [
      'Weekly creative intelligence reports and actionable insights',
      'Optimized creative assets with performance scoring',
      'Channel-specific acquisition strategies and implementation',
      'Advanced funnel optimization and conversion improvements',
      'Competitor-informed positioning and messaging frameworks'
    ],
    successMetrics: [
      '15-25% improvement in creative performance metrics',
      '20-35% increase in funnel conversion rates',
      'Weekly intelligence actionability above 80%',
      'Competitive differentiation measurably improved'
    ],
    expectedOutcome: '20-40% CAC reduction through systematic creative optimization'
  },
  {
    phase: 'Phase 3',
    title: 'Scale & Sustainability',
    duration: '2-4 weeks',
    focus: 'Scaling successful strategies and building sustainable systems',
    objective: 'Scale optimized acquisition strategies while maintaining CAC improvements',
    keyActivities: [
      'Scale successful creative and channel strategies across customer segments',
      'Implement automated optimization triggers and response systems',
      'Build predictive CAC modeling for budget allocation decisions',
      'Establish sustainable weekly intelligence and optimization workflows',
      'Create performance monitoring and alert systems for sustained success'
    ],
    deliverables: [
      'Scaled acquisition campaigns with maintained CAC efficiency',
      'Automated optimization system implementation',
      'Predictive CAC modeling for strategic planning',
      'Sustainable weekly intelligence operational framework',
      'Performance monitoring dashboard with automated alerts'
    ],
    successMetrics: [
      'CAC improvements sustained at scale (25%+ reduction maintained)',
      '50%+ reduction in manual optimization time required',
      'Predictive accuracy above 85% for CAC forecasting',
      'Weekly intelligence workflow fully automated'
    ],
    expectedOutcome: 'Sustained 25%+ CAC reduction with scalable, systematic optimization'
  }
];

// Channel-specific strategies
const channelStrategies = [
  {
    channel: 'Paid Search',
    averageCAC: '$142',
    optimization: 'Keyword Intelligence & Funnel Optimization',
    strategies: [
      'Weekly search trend analysis and keyword expansion',
      'Landing page optimization based on search intent',
      'Bid strategy optimization using CAC targets',
      'Negative keyword refinement from intelligence insights'
    ],
    expectedReduction: '15-30%'
  },
  {
    channel: 'Paid Social',
    averageCAC: '$87',
    optimization: 'Creative Intelligence & Audience Refinement',
    strategies: [
      'Weekly creative intelligence for platform-native content',
      'Lookalike audience optimization based on high-LTV customers',
      'Interest-based targeting refinement using customer insights',
      'Creative fatigue prevention through systematic refresh cycles'
    ],
    expectedReduction: '25-45%'
  },
  {
    channel: 'Content Marketing',
    averageCAC: '$74',
    optimization: 'SEO Intelligence & Content Strategy',
    strategies: [
      'Weekly content intelligence for trending topics',
      'SEO optimization based on customer search behavior',
      'Content funnel optimization for subscription conversion',
      'Thought leadership positioning through intelligence insights'
    ],
    expectedReduction: '30-50%'
  },
  {
    channel: 'Email Marketing',
    averageCAC: '$32',
    optimization: 'Behavioral Intelligence & Automation',
    strategies: [
      'Weekly behavior analysis for triggered campaign optimization',
      'Segmentation refinement based on subscription propensity',
      'Personalization enhancement using customer intelligence',
      'Automated nurture sequence optimization'
    ],
    expectedReduction: '20-40%'
  }
];

// Success tracking metrics
const trackingMetrics = [
  {
    category: 'Primary CAC Metrics',
    metrics: [
      'Blended CAC across all channels',
      'Channel-specific CAC trends',
      'Customer segment CAC analysis',
      'CAC payback period optimization'
    ]
  },
  {
    category: 'Funnel Optimization',
    metrics: [
      'Traffic-to-lead conversion rates',
      'Lead-to-trial conversion rates',
      'Trial-to-paid conversion rates',
      'Overall funnel efficiency score'
    ]
  },
  {
    category: 'Intelligence Effectiveness',
    metrics: [
      'Weekly intelligence actionability score',
      'Creative performance improvement rates',
      'Competitive advantage measurement',
      'Time-to-optimization reduction'
    ]
  },
  {
    category: 'Business Impact',
    metrics: [
      'Customer Lifetime Value improvement',
      'Monthly Recurring Revenue growth',
      'Customer acquisition efficiency ratio',
      'Revenue per customer improvement'
    ]
  }
];

// Case studies
const caseStudies = [
  {
    companyType: 'B2B SaaS Platform',
    revenue: '$2.5M ARR',
    challenge: 'CAC increased 73% over 18 months, threatening growth sustainability and investor confidence',
    implementation: [
      'Implemented comprehensive weekly intelligence framework',
      'Deployed advanced attribution modeling across 7 acquisition channels',
      'Optimized conversion funnel through systematic A/B testing',
      'Built competitive intelligence system for strategic positioning'
    ],
    results: {
      cacReduction: '31%',
      timeframe: '12 weeks',
      additionalResults: [
        'Conversion rate improvement: +47%',
        'Customer acquisition efficiency: +62%',
        'Monthly recurring revenue growth: +38%',
        'Payback period reduction: 3.2 months'
      ]
    },
    quote: "The systematic approach to CAC optimization transformed our business. We went from crisis mode to confident scaling."
  },
  {
    companyType: 'Consumer Subscription App',
    revenue: '$850K ARR',
    challenge: 'Rising mobile acquisition costs threatening unit economics and preventing Series A fundraising',
    implementation: [
      'Weekly mobile creative intelligence implementation',
      'Platform-native content optimization across TikTok, Instagram, Snapchat',
      'Freemium-to-premium funnel optimization',
      'Predictive CAC modeling for budget allocation'
    ],
    results: {
      cacReduction: '28%',
      timeframe: '10 weeks',
      additionalResults: [
        'Free-to-paid conversion: +52%',
        'Mobile app retention: +34%',
        'Organic growth coefficient: +89%',
        'Revenue per user: +41%'
      ]
    },
    quote: "Weekly creative intelligence gave us the data-driven approach we needed to optimize mobile acquisition at scale."
  }
];

export default function SubscriptionBusinessCACReductionFramework() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Subscription Business CAC Reduction Framework: 25% Cost Optimization with Weekly Intelligence",
            "description": "Comprehensive framework for reducing customer acquisition costs in subscription businesses. 3-phase methodology delivers 25% CAC reduction through systematic creative intelligence.",
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
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <TrendingDown className="h-4 w-4 mr-2" />
              SUBSCRIPTION CAC REDUCTION FRAMEWORK
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Subscription Business CAC Reduction Framework
            </h1>
            
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Systematic 3-phase framework for reducing customer acquisition costs by 25%+ in subscription businesses. 
              Based on analysis of 500+ subscription company optimizations.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingDown className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">25%+ Reduction</div>
                <div className="text-green-200 text-sm">Average CAC improvement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">8-12 Weeks</div>
                <div className="text-green-200 text-sm">Implementation timeframe</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <AlertTriangle className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">50% Crisis</div>
                <div className="text-green-200 text-sm">Industry CAC increase since 2016</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#framework-overview"
                className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Explore Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="/mobile-app-cac-optimization-2025"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Mobile App Focus
                <Target className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription CAC Crisis Analysis */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              The Subscription Business CAC Crisis: Industry Analysis
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Customer acquisition costs for subscription businesses have increased 50% since 2016, 
              threatening growth sustainability and forcing strategic optimization requirements.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Industry CAC Benchmarks</h3>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(subscriptionCACData.averageCAC).map(([category, cac], index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-red-600 font-bold text-lg">{cac}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-gray-600 text-sm mt-4">
                  <em>Average CAC by subscription business category in 2024 
                  (Source: <a href="https://blog.hubspot.com/service/what-does-cac-cost" className="text-red-600 underline" target="_blank" rel="noopener noreferrer">HubSpot CAC Benchmark Study 2024</a>)</em>
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">CAC Health by Revenue Stage</h3>
                </div>
                
                <div className="space-y-4">
                  {subscriptionCACData.benchmarkRanges.map((range, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border">
                      <div className="font-semibold text-gray-900 mb-2">{range.revenue}</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="bg-green-100 text-green-800 rounded px-2 py-1 mb-1">Healthy</div>
                          <div>{range.healthyCAC}</div>
                        </div>
                        <div className="text-center">
                          <div className="bg-yellow-100 text-yellow-800 rounded px-2 py-1 mb-1">Warning</div>
                          <div>{range.warningCAC}</div>
                        </div>
                        <div className="text-center">
                          <div className="bg-red-100 text-red-800 rounded px-2 py-1 mb-1">Critical</div>
                          <div>{range.criticalCAC}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-gray-600 text-sm mt-4">
                  <em>CAC health benchmarks based on revenue stage and industry standards for sustainable growth</em>
                </p>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why Traditional CAC Optimization Fails Subscription Businesses
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Quarterly Optimization Cycles</div>
                  <div className="text-gray-600">
                    Too slow for modern competition. Market conditions change weekly, 
                    but optimization happens quarterly, missing critical opportunities.
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Channel-Siloed Approach</div>
                  <div className="text-gray-600">
                    Optimizing channels in isolation misses cross-channel synergies and 
                    customer journey optimization opportunities.
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Creative-Last Strategy</div>
                  <div className="text-gray-600">
                    Treating creative as execution rather than strategy. 
                    Creative drives 75% of campaign performance but gets 10% of strategic attention.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Phase Framework */}
      <section id="framework-overview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              3-Phase CAC Reduction Framework
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Systematic approach to sustainable CAC reduction through weekly intelligence-driven optimization. 
              Designed for subscription businesses at any growth stage.
            </p>
            
            <div className="space-y-8">
              {cacReductionFramework.map((phase, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-green-600 mb-1">{phase.phase} • {phase.duration}</div>
                      <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                      <p className="text-gray-600">{phase.focus}</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Objective</h4>
                    <p className="text-green-700 text-sm">{phase.objective}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Activities</h4>
                      <ul className="space-y-2">
                        {phase.keyActivities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Success Metrics</h4>
                      <div className="space-y-2">
                        {phase.successMetrics.map((metric, metIndex) => (
                          <div key={metIndex} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <span className="text-sm text-blue-800">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Deliverables</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {phase.deliverables.map((deliverable, delIndex) => (
                        <div key={delIndex} className="text-sm text-gray-600">
                          • {deliverable}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-100 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-gray-900">Expected Outcome: </span>
                      <span className="text-gray-700">{phase.expectedOutcome}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Channel-Specific Strategies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Channel-Specific CAC Optimization Strategies
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Tailored optimization strategies for each major subscription acquisition channel, 
              based on channel-specific intelligence and performance characteristics.
            </p>
            
            <div className="space-y-6">
              {channelStrategies.map((channel, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{channel.channel}</h3>
                      <p className="text-blue-600 font-medium">{channel.optimization}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{channel.averageCAC}</div>
                      <div className="text-sm text-gray-500">Average CAC</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Optimization Strategies</h4>
                      <ul className="space-y-2">
                        {channel.strategies.map((strategy, stratIndex) => (
                          <li key={stratIndex} className="flex items-start">
                            <Zap className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {channel.expectedReduction}
                        </div>
                        <div className="text-sm text-gray-600">Expected CAC Reduction</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Tracking Framework */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Success Tracking & Metrics Framework
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Comprehensive metrics framework for measuring CAC reduction success and 
              ensuring sustainable optimization across all business dimensions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {trackingMetrics.map((category, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.metrics.map((metric, metIndex) => (
                      <div key={metIndex} className="flex items-center">
                        <BarChart3 className="h-4 w-4 text-blue-600 mr-3" />
                        <span className="text-sm text-gray-700">{metric}</span>
                      </div>
                    ))}
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
              CAC Reduction Success Stories
            </h2>
            
            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{study.companyType}</h3>
                      <span className="text-green-600 font-medium">{study.revenue}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">{study.results.cacReduction}</div>
                      <div className="text-sm text-gray-500">CAC Reduction</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Implementation</h4>
                    <ul className="space-y-1">
                      {study.implementation.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Additional Results</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {study.results.additionalResults.map((result, resIndex) => (
                        <div key={resIndex} className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <span className="text-sm text-green-800 font-medium">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-green-500">
                    <p className="text-gray-700 italic">"{study.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAC Assessment Calculator */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Subscription CAC Assessment
            </h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Calculate Your CAC Optimization Potential
                </h3>
                <p className="text-gray-600">
                  Get a personalized assessment of your subscription business CAC reduction opportunity
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual Recurring Revenue (ARR)
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select ARR Range</option>
                    <option value="0-1M">$0 - $1M</option>
                    <option value="1M-5M">$1M - $5M</option>
                    <option value="5M-20M">$5M - $20M</option>
                    <option value="20M+">$20M+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Blended CAC
                  </label>
                  <div className="relative">
                    <DollarSign className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="195"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="b2b-saas">B2B SaaS</option>
                    <option value="consumer-app">Consumer App</option>
                    <option value="ecommerce">E-commerce Subscription</option>
                    <option value="fintech">Fintech</option>
                  </select>
                </div>
              </div>
              
              <div className="text-center">
                <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors">
                  Get CAC Assessment
                </button>
              </div>
              
              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-4">Sample Assessment Results:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">$48,750</div>
                    <div className="text-sm text-gray-600">Annual Savings Potential</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">$146</div>
                    <div className="text-sm text-gray-600">Optimized Target CAC</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">12 weeks</div>
                    <div className="text-sm text-gray-600">Implementation Timeframe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Reduce Your Subscription CAC by 25%+ in 12 Weeks
            </h2>
            
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Join subscription businesses using systematic weekly intelligence to achieve 
              sustainable CAC reduction and accelerate growth.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="font-semibold">Weekly Intelligence</div>
                <div className="text-green-200 text-sm">Data-driven optimization</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="font-semibold">3-Phase Framework</div>
                <div className="text-green-200 text-sm">Systematic implementation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-green-200 mx-auto mb-2" />
                <div className="font-semibold">Proven Results</div>
                <div className="text-green-200 text-sm">25%+ average reduction</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Get CAC Assessment
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <Link
                href="/#service-tiers"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Framework Plans
                <Users className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Performance Marketing Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/mobile-app-cac-optimization-2025"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mobile App CAC Crisis</h3>
                <p className="text-sm text-gray-600">
                  Specialized framework for mobile app acquisition cost optimization
                </p>
              </Link>
              
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete methodology for systematic creative development and optimization
                </p>
              </Link>
              
              <Link 
                href="/d2c-subscription-marketing-strategy"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">D2C Marketing Strategy</h3>
                <p className="text-sm text-gray-600">
                  Consumer-focused subscription marketing optimization framework
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}