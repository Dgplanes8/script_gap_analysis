import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, Target, Facebook, BarChart3, Users, Zap, Download, Calculator, BookOpen, PlayCircle, Settings, Eye, Brain, Layers, Activity, Filter } from 'lucide-react';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'Facebook Ad Creative Intelligence System: Weekly Optimization for Subscription Businesses | Apsics Media',
  description: 'Facebook creative intelligence gathering and weekly optimization framework for subscription businesses. Meta platform strategy, Facebook ad optimization, and subscription-specific Facebook advertising tactics.',
  keywords: 'Facebook ad optimization subscription business, Facebook creative intelligence, weekly Facebook optimization, subscription Facebook strategy, Meta advertising subscription, Facebook ad creative intelligence',
  openGraph: {
    title: 'Facebook Ad Creative Intelligence System: Weekly Optimization for Subscription Businesses',
    description: 'Master Facebook creative intelligence with weekly optimization framework for subscription business growth.',
    type: 'article',
  },
  alternates: {
    canonical: '/facebook-ad-creative-intelligence-system',
  },
};

// Facebook intelligence components
const facebookSystems = [
  {
    system: 'Creative Intelligence Gathering',
    description: 'Systematic collection and analysis of Facebook creative performance data and competitor insights',
    icon: Brain,
    components: [
      'Facebook Ads Library competitive analysis and creative strategy reverse-engineering for subscription businesses',
      'Creative performance pattern recognition across subscription business verticals and audience segments',
      'Meta platform algorithm intelligence including Facebook and Instagram feed optimization strategies',
      'Audience insight extraction and demographic targeting optimization for subscription customer acquisition',
      'Cross-campaign creative performance analysis with subscription conversion correlation and optimization insights'
    ],
    outcome: 'Comprehensive Facebook creative intelligence with 90% competitor coverage and performance insights'
  },
  {
    system: 'Weekly Optimization Framework',
    description: 'Systematic weekly optimization process for Facebook ad creative and subscription conversion performance',
    icon: Settings,
    components: [
      'Weekly creative performance analysis with subscription conversion tracking and ROI optimization',
      'A/B testing framework for Facebook creative optimization with statistical significance and subscription focus',
      'Audience targeting refinement based on creative performance data and subscription customer behavior analysis',
      'Budget allocation optimization using creative performance insights and subscription lifetime value calculations',
      'Creative refresh recommendations based on engagement patterns and subscription business performance data'
    ],
    outcome: 'Weekly optimization process delivering 35% improvement in subscription conversion rates'
  },
  {
    system: 'Subscription-Specific Facebook Strategy',
    description: 'Facebook marketing strategies designed specifically for subscription business models and customer acquisition',
    icon: Target,
    components: [
      'Free trial promotion optimization using Facebook creative formats and subscription-focused messaging strategies',
      'Subscription value demonstration through Facebook video and carousel formats with conversion optimization',
      'Retargeting campaign development for subscription trial-to-paid conversion and customer retention optimization',
      'Lookalike audience creation based on high-value subscription customers and lifetime value optimization',
      'Facebook community building strategies for subscriber retention and advocacy through organic engagement tactics'
    ],
    outcome: 'Subscription-optimized Facebook strategy with 40% higher customer acquisition efficiency'
  },
  {
    system: 'Meta Platform Integration',
    description: 'Holistic approach to Facebook and Instagram creative intelligence with cross-platform optimization',
    icon: Layers,
    components: [
      'Cross-platform creative adaptation optimizing Facebook and Instagram performance with unified subscription messaging',
      'Platform-specific format optimization including Facebook feed, Stories, Reels, and Instagram integration strategies',
      'Unified audience targeting across Meta platforms with subscription customer journey mapping and optimization',
      'Creative asset optimization for Facebook and Instagram with subscription business branding consistency',
      'Performance correlation analysis between Facebook and Instagram with subscription conversion optimization insights'
    ],
    outcome: 'Integrated Meta platform strategy with 50% higher cross-platform subscription conversion rates'
  }
];

const facebookTactics = [
  {
    tactic: 'Video Creative Optimization',
    description: 'Facebook video creative strategies for subscription business engagement and conversion',
    elements: ['Hook optimization', 'Value demonstration', 'CTA placement', 'Format testing'],
    application: 'Subscription trial promotion and value communication',
    metrics: '65% higher engagement, 35% better conversion rates'
  },
  {
    tactic: 'Carousel Ad Intelligence',
    description: 'Multi-image carousel optimization for subscription feature demonstration',
    elements: ['Feature showcase', 'Progressive storytelling', 'Conversion optimization', 'Visual hierarchy'],
    application: 'Subscription feature education and trial conversion',
    metrics: '45% increase in click-through rates, 25% higher trial signups'
  },
  {
    tactic: 'Audience Intelligence & Targeting',
    description: 'Advanced Facebook audience targeting for subscription customer acquisition',
    elements: ['Interest targeting', 'Behavioral analysis', 'Lookalike optimization', 'Retargeting sequences'],
    application: 'Subscription customer acquisition and retention optimization',
    metrics: '30% lower CAC, 50% higher lifetime value customers'
  },
  {
    tactic: 'Creative Testing Framework',
    description: 'Systematic Facebook creative testing for subscription business optimization',
    elements: ['Statistical significance', 'Test design', 'Performance analysis', 'Winner scaling'],
    application: 'Data-driven creative optimization and subscription conversion improvement',
    metrics: '25% faster optimization cycles, 40% higher winning creative performance'
  },
  {
    tactic: 'Retargeting Campaign Intelligence',
    description: 'Advanced retargeting strategies for subscription trial-to-paid conversion',
    elements: ['Journey mapping', 'Creative sequencing', 'Conversion optimization', 'Value reinforcement'],
    application: 'Subscription trial conversion and customer retention',
    metrics: '60% higher trial-to-paid conversion, 35% increase in customer retention'
  }
];

const optimizationCycle = [
  {
    day: 'Monday',
    focus: 'Performance Analysis & Intelligence Gathering',
    activities: [
      'Weekly Facebook ad performance review with subscription conversion analysis',
      'Competitor creative analysis using Facebook Ads Library and intelligence tools',
      'Audience performance evaluation with subscription customer behavior insights',
      'Budget performance assessment and ROI calculation for subscription campaigns'
    ]
  },
  {
    day: 'Tuesday',
    focus: 'Creative Strategy Development & Testing Design',
    activities: [
      'New creative concept development based on performance intelligence and subscription focus',
      'A/B testing framework setup with statistical significance planning and subscription metrics',
      'Audience targeting strategy refinement based on performance data and subscription insights',
      'Campaign structure optimization for subscription customer acquisition and conversion'
    ]
  },
  {
    day: 'Wednesday',
    focus: 'Implementation & Campaign Launch',
    activities: [
      'New creative assets implementation with Facebook creative best practices and subscription messaging',
      'A/B testing campaign launch with proper tracking and subscription conversion measurement',
      'Budget allocation optimization based on performance insights and subscription ROI requirements',
      'Quality assurance and tracking verification for subscription campaign performance monitoring'
    ]
  },
  {
    day: 'Thursday',
    focus: 'Mid-Week Performance Assessment',
    activities: [
      'Initial A/B testing results analysis with subscription conversion preliminary assessment',
      'Campaign performance monitoring with subscription metrics tracking and optimization opportunities',
      'Audience engagement analysis and targeting refinement for subscription customer acquisition',
      'Creative performance evaluation with subscription business impact measurement and insights'
    ]
  },
  {
    day: 'Friday',
    focus: 'Weekly Optimization & Strategic Planning',
    activities: [
      'A/B testing results analysis with statistical significance validation and subscription impact',
      'Winning creative identification and scaling strategy development for subscription optimization',
      'Next week strategic planning based on performance insights and subscription business objectives',
      'Intelligence report compilation with subscription business recommendations and optimization strategies'
    ]
  }
];

export default function FacebookAdCreativeIntelligenceSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Facebook Ad Creative Intelligence System: Weekly Optimization for Subscription Businesses",
            "description": "Master Facebook creative intelligence with weekly optimization framework for subscription business growth.",
            "author": {
              "@type": "Organization",
              "name": "Apsics Media"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Apsics Media",
              "logo": {
                "@type": "ImageObject",
                "url": "https://apsicsmedia.com/images/logo.png"
              }
            },
            "datePublished": "2025-01-20",
            "dateModified": "2025-01-20",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://apsicsmedia.com/facebook-ad-creative-intelligence-system"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Facebook className="h-4 w-4 mr-2" />
              FACEBOOK CREATIVE INTELLIGENCE
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Facebook Ad Creative Intelligence System
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Master Facebook creative intelligence and systematic optimization for subscription business growth. 
              Weekly optimization framework, Meta platform integration, and subscription-focused advertising strategies.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BarChart3 className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">35% Higher</div>
                <div className="text-blue-200 text-sm">Conversion rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">40% Better</div>
                <div className="text-blue-200 text-sm">CAC efficiency</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">90% Coverage</div>
                <div className="text-blue-200 text-sm">Competitor intelligence</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#facebook-system"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore Facebook System
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="#optimization-cycle"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Optimization Process
                <PlayCircle className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Opportunity */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Facebook Remains Critical for Subscription Business Growth
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Despite privacy changes and increased competition, Facebook (Meta) maintains the most sophisticated 
                advertising platform with unmatched targeting capabilities and subscription business optimization 
                tools. With 2.9 billion monthly active users and advanced conversion tracking, Facebook remains 
                the primary customer acquisition channel for subscription businesses.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Massive Reach</h3>
                  <p className="text-gray-600 text-sm">
                    2.9 billion monthly active users across Facebook and Instagram, providing 
                    unmatched subscription customer acquisition potential across all demographics.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Advanced Targeting</h3>
                  <p className="text-gray-600 text-sm">
                    Most sophisticated audience targeting capabilities with subscription-specific 
                    optimization and lookalike audience creation based on customer lifetime value.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Conversion Optimization</h3>
                  <p className="text-gray-600 text-sm">
                    Advanced conversion tracking and optimization algorithms specifically designed 
                    for subscription business models and customer acquisition efficiency.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Facebook's Subscription Business Advantages
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Platform Sophistication</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Advanced conversion tracking with subscription-specific attribution</li>
                      <li>• Machine learning optimization for subscription customer acquisition</li>
                      <li>• Cross-device tracking enabling comprehensive subscription customer journey analysis</li>
                      <li>• Integration with Meta Business Suite for comprehensive subscription business intelligence</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Creative & Targeting Capabilities</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Multiple creative formats optimized for subscription business value demonstration</li>
                      <li>• Advanced audience insights enabling subscription customer behavior analysis</li>
                      <li>• Retargeting capabilities perfect for subscription trial-to-paid conversion optimization</li>
                      <li>• Competitive intelligence access through Facebook Ads Library for subscription market analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Intelligence System */}
      <section id="facebook-system" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              4-System Facebook Creative Intelligence Framework
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Comprehensive Facebook intelligence system designed specifically for subscription business optimization. 
              Each system provides systematic approach to Facebook success and subscription growth.
            </p>
            
            <div className="space-y-8">
              {facebookSystems.map((system, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                      <system.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{system.system}</h3>
                      <p className="text-gray-700 mb-4">{system.description}</p>
                      <div className="bg-brand-50 px-3 py-2 rounded-full inline-block">
                        <span className="text-brand-700 font-semibold text-sm">{system.outcome}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-22">
                    <h4 className="font-semibold text-gray-900 mb-3">System Components:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {system.components.map((component, componentIndex) => (
                        <div key={componentIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{component}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Tactics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              5 High-Performance Facebook Tactics for Subscription Businesses
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Proven Facebook advertising tactics specifically optimized for subscription business growth and conversion. 
              Each tactic integrates subscription messaging with Facebook's unique capabilities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {facebookTactics.slice(0, 4).map((tactic, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{tactic.tactic}</h3>
                      <p className="text-sm text-gray-600">{tactic.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Key Elements:</div>
                      <div className="flex flex-wrap gap-1">
                        {tactic.elements.map((element, elementIndex) => (
                          <span key={elementIndex} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Subscription Application:</div>
                      <div className="text-xs text-gray-700">{tactic.application}</div>
                    </div>
                    
                    <div className="bg-brand-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-brand-800">Performance Impact:</div>
                      <div className="text-xs text-brand-700">{tactic.metrics}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Fifth tactic spans full width */}
            <div className="mt-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{facebookTactics[4].tactic}</h3>
                    <p className="text-sm text-gray-600">{facebookTactics[4].description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">Key Elements:</div>
                    <div className="flex flex-wrap gap-1">
                      {facebookTactics[4].elements.map((element, elementIndex) => (
                        <span key={elementIndex} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-semibold text-gray-900 mb-1">Subscription Application:</div>
                    <div className="text-xs text-gray-700">{facebookTactics[4].application}</div>
                  </div>
                  
                  <div className="bg-brand-50 rounded-lg p-3">
                    <div className="text-sm font-semibold text-brand-800">Performance Impact:</div>
                    <div className="text-xs text-brand-700">{facebookTactics[4].metrics}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Optimization Cycle */}
      <section id="optimization-cycle" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Weekly Facebook Optimization Cycle
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Systematic weekly optimization process for Facebook advertising and subscription business growth. 
                Each day focuses on specific optimization activities for continuous performance improvement.
              </p>
              
              <div className="space-y-6">
                {optimizationCycle.map((day, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                        {day.day.slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{day.focus}</h3>
                        <p className="text-sm text-gray-600">Strategic focus for {day.day} optimization activities</p>
                      </div>
                    </div>
                    
                    <div className="ml-16">
                      <div className="grid md:grid-cols-2 gap-3">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Facebook Intelligence Deliverables</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Performance Intelligence</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Facebook ad performance analysis with subscription conversion tracking</li>
                      <li>• Competitor creative intelligence and market positioning insights</li>
                      <li>• Audience performance evaluation with subscription customer behavior analysis</li>
                      <li>• Creative optimization recommendations with A/B testing statistical analysis</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Strategic Recommendations</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Budget allocation optimization based on subscription ROI performance</li>
                      <li>• Creative strategy adjustments with subscription business focus</li>
                      <li>• Audience targeting refinements for subscription customer acquisition</li>
                      <li>• Campaign scaling strategies with subscription growth optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Platform Integration */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Meta Platform Integration Strategy
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Facebook className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Facebook Optimization</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Feed Advertising</h4>
                    <p className="text-xs text-gray-600">Detailed subscription value communication with comprehensive creative formats</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Audience Network</h4>
                    <p className="text-xs text-gray-600">Extended reach through Facebook's partner network for subscription business expansion</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Messenger Integration</h4>
                    <p className="text-xs text-gray-600">Direct subscription customer communication and support integration</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-brand-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Instagram Integration</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-brand-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Stories & Reels</h4>
                    <p className="text-xs text-gray-600">Native content formats for subscription business storytelling and engagement</p>
                  </div>
                  
                  <div className="bg-brand-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Feed Integration</h4>
                    <p className="text-xs text-gray-600">Visual subscription value demonstration through Instagram's creative formats</p>
                  </div>
                  
                  <div className="bg-brand-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Shopping Features</h4>
                    <p className="text-xs text-gray-600">Subscription product showcase with direct conversion capabilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Master Facebook Creative Intelligence
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform Facebook into your subscription business growth engine. 
              Access systematic optimization, creative intelligence, and conversion strategies.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BarChart3 className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">35% Higher</div>
                <div className="text-blue-200 text-sm">Conversion rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">40% Better</div>
                <div className="text-blue-200 text-sm">CAC efficiency</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">90% Coverage</div>
                <div className="text-blue-200 text-sm">Competitor intel</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Facebook System
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <FreeWeekButton source="facebook_ad_creative_intelligence_system-cta" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center">Claim 10 Free Credits</FreeWeekButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Platform Intelligence Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/tiktok-creative-intelligence-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">TikTok Creative Intelligence Framework</h3>
                <p className="text-sm text-gray-600">
                  Weekly trend analysis and creative intelligence for subscription business growth
                </p>
              </Link>
              
              <Link 
                href="/linkedin-creative-intelligence-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">LinkedIn Creative Intelligence</h3>
                <p className="text-sm text-gray-600">
                  B2B subscription marketing weekly framework for LinkedIn professional targeting
                </p>
              </Link>
              
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Creative Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete methodology for systematic creative development across all platforms
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
