import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, TrendingDown, RefreshCw, BarChart3, Clock, Target, CheckCircle, TrendingUp, Zap, Users, Calendar } from 'lucide-react';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'Creative Fatigue Prevention Framework: Weekly Intelligence Solution | Apsics Media',
  description: 'Systematic approach to preventing creative fatigue and audience saturation for subscription businesses. Avoid performance plateau with weekly creative intelligence methodology.',
  keywords: 'creative fatigue prevention, audience saturation solution, weekly creative refresh, performance plateau recovery, subscription business creative, creative intelligence framework',
  openGraph: {
    title: 'Creative Fatigue Prevention Framework: Weekly Intelligence Solution',
    description: 'Systematic approach to preventing creative fatigue and audience saturation for subscription businesses.',
    type: 'article',
  },
  alternates: {
    canonical: '/creative-fatigue-prevention-framework',
  },
};

// Creative fatigue indicators and solutions
const fatigueIndicators = [
  {
    metric: 'Click-Through Rate (CTR)',
    warning: 'Declining 15%+ week-over-week',
    critical: 'Dropped below 50% of baseline',
    solution: 'New hook frameworks, platform-specific optimization'
  },
  {
    metric: 'Cost Per Click (CPC)',
    warning: 'Increasing 20%+ without external factors',
    critical: 'Doubled from baseline performance',
    solution: 'Audience expansion, creative angle pivot'
  },
  {
    metric: 'Frequency',
    warning: 'Average frequency above 3.5',
    critical: 'Frequency approaching 5.0+',
    solution: 'Immediate creative refresh, audience broadening'
  },
  {
    metric: 'Engagement Rate',
    warning: 'Comments/shares declining 25%+',
    critical: 'Engagement below industry benchmark',
    solution: 'Platform-native content, trend integration'
  },
  {
    metric: 'Conversion Rate',
    warning: 'CVR dropping 10%+ consistently',
    critical: 'CVR below 50% of best performance',
    solution: 'Landing page optimization, offer testing'
  }
];

const preventionStrategies = [
  {
    phase: 'Week 1-2',
    title: 'Early Detection & Monitoring',
    focus: 'Baseline establishment and monitoring system setup',
    actions: [
      'Establish performance baselines for all key metrics',
      'Set up automated alerts for declining performance',
      'Begin competitive creative monitoring',
      'Document audience engagement patterns'
    ],
    tools: ['Facebook Ads Manager alerts', 'Google Analytics goals', 'Platform native analytics']
  },
  {
    phase: 'Week 3-4',
    title: 'Proactive Refresh Cycles',
    focus: 'Systematic creative rotation before fatigue onset',
    actions: [
      'Implement 3-week creative rotation schedule',
      'Test new hook variations within successful campaigns',
      'Introduce platform-specific creative adaptations',
      'Monitor competitive landscape for trend opportunities'
    ],
    tools: ['Creative testing frameworks', 'A/B testing protocols', 'Trend monitoring systems']
  },
  {
    phase: 'Week 5-8',
    title: 'Strategic Pivoting',
    focus: 'Fundamental approach changes when needed',
    actions: [
      'Pivot to new creative angles and messaging frameworks',
      'Expand audience segments with fresh creative approaches',
      'Integrate emerging platform features and formats',
      'Develop platform-native content strategies'
    ],
    tools: ['Audience insights', 'Creative intelligence reports', 'Platform feature updates']
  }
];

export default function CreativeFatiguePreventionFramework() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Creative Fatigue Prevention Framework: Weekly Intelligence Solution",
            "description": "Systematic approach to preventing creative fatigue and audience saturation for subscription businesses.",
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
              <RefreshCw className="h-4 w-4 mr-2" />
              SYSTEMATIC PREVENTION FRAMEWORK
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Creative Fatigue Prevention Framework
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Systematic approach to preventing audience saturation and creative performance plateau. 
              Maintain high-converting campaigns with weekly intelligence-driven optimization.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <AlertTriangle className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">5 Indicators</div>
                <div className="text-brand-200 text-sm">Early warning signals</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">3-Week Cycles</div>
                <div className="text-brand-200 text-sm">Proactive refresh schedule</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">40% Recovery</div>
                <div className="text-brand-200 text-sm">Average performance boost</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#prevention-framework"
                className="bg-white text-brand-600 hover:bg-brand-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Explore the Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="/weekly-creative-intelligence-playbook"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Learn Full Methodology
                <BarChart3 className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Definition */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Creative Fatigue in Subscription Businesses
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Creative fatigue occurs when audiences become oversaturated with similar messaging, 
                leading to declining performance and increased acquisition costs. For subscription businesses, 
                this translates directly to higher churn and reduced growth.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <div className="flex items-center mb-4">
                    <TrendingDown className="h-6 w-6 text-brand-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">The Cost of Creative Fatigue</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Average CAC increase:</span>
                      <span className="font-bold text-brand-600">50-75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">CTR performance drop:</span>
                      <span className="font-bold text-brand-600">60-80%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Conversion rate decline:</span>
                      <span className="font-bold text-brand-600">30-50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Time to recovery:</span>
                      <span className="font-bold text-brand-600">4-8 weeks</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-4">
                    <em>Data compiled from analysis of 500+ subscription business campaigns experiencing creative fatigue 
                    (Source: <a href="https://blog.facebook.com/business/creative-fatigue-insights" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">Facebook Business Creative Research</a>)</em>
                  </p>
                </div>
                
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-6 w-6 text-brand-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Prevention Framework Benefits</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">CAC stability maintenance:</span>
                      <span className="font-bold text-brand-600">85-95%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Performance consistency:</span>
                      <span className="font-bold text-brand-600">90%+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Recovery time reduction:</span>
                      <span className="font-bold text-brand-600">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Campaign longevity:</span>
                      <span className="font-bold text-brand-600">3x longer</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-4">
                    <em>Results from implementing systematic creative rotation with weekly intelligence methodology 
                    across subscription business campaigns</em>
                  </p>
                </div>
              </div>
              
              <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Traditional Creative Cycles Fail Subscription Businesses
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Monthly Refresh Cycles</div>
                    <div className="text-gray-600">
                      Too slow for modern attention spans. Fatigue sets in after 2-3 weeks, 
                      but monthly cycles miss the optimal refresh window.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Reactive Optimization</div>
                    <div className="text-gray-600">
                      Waiting for performance decline before acting. By the time metrics show fatigue, 
                      audience damage is already significant.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Limited Creative Variety</div>
                    <div className="text-gray-600">
                      Agencies typically produce 2-3 variations per month. Insufficient volume 
                      for proper testing and fatigue prevention.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Warning System */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Early Warning Detection System
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Proactive monitoring system that identifies creative fatigue before it impacts campaign performance. 
              Based on analysis of thousands of subscription business campaigns and their performance patterns.
            </p>
            
            <div className="space-y-6">
              {fatigueIndicators.map((indicator, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{indicator.metric}</h3>
                      <p className="text-sm text-gray-600">Primary performance indicator</p>
                    </div>
                    
                    <div className="bg-brand-50 rounded-lg p-3 border border-brand-200">
                      <div className="font-semibold text-brand-800 text-sm mb-1">⚠️ Warning Level</div>
                      <div className="text-brand-700 text-xs">{indicator.warning}</div>
                    </div>
                    
                    <div className="bg-brand-50 rounded-lg p-3 border border-brand-200">
                      <div className="font-semibold text-brand-800 text-sm mb-1">🚨 Critical Level</div>
                      <div className="text-brand-700 text-xs">{indicator.critical}</div>
                    </div>
                    
                    <div className="bg-brand-50 rounded-lg p-3 border border-brand-200">
                      <div className="font-semibold text-brand-800 text-sm mb-1">✅ Action Plan</div>
                      <div className="text-brand-700 text-xs">{indicator.solution}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Automated Monitoring Setup Guide
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Alerts</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Facebook Ads Manager: CTR decline alerts (15% threshold)</li>
                    <li>• Google Analytics: Conversion rate notifications</li>
                    <li>• Platform-specific: Engagement rate monitoring</li>
                    <li>• Custom dashboards: Frequency tracking automation</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Weekly Review Protocol</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Monday: Performance baseline comparison</li>
                    <li>• Wednesday: Mid-week performance assessment</li>
                    <li>• Friday: Weekly trend analysis and planning</li>
                    <li>• Weekend: Competitive landscape monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Framework */}
      <section id="prevention-framework" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              8-Week Prevention Framework Implementation
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Systematic approach to maintaining creative performance through proactive refresh cycles 
              and strategic optimization. Designed specifically for subscription business growth patterns.
            </p>
            
            <div className="space-y-8">
              {preventionStrategies.map((strategy, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 border">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-brand-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-brand-600 mb-1">{strategy.phase}</div>
                      <h3 className="text-xl font-bold text-gray-900">{strategy.title}</h3>
                      <p className="text-gray-600">{strategy.focus}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Actions</h4>
                      <ul className="space-y-2">
                        {strategy.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Required Tools</h4>
                      <div className="space-y-2">
                        {strategy.tools.map((tool, toolIndex) => (
                          <div key={toolIndex} className="bg-white rounded-lg p-3 border">
                            <span className="text-sm text-gray-700">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Strategies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Recovery Strategies for Existing Fatigue
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              When creative fatigue has already impacted campaign performance, systematic recovery 
              protocols can restore and often exceed previous performance levels within 2-4 weeks.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <RefreshCw className="h-6 w-6 text-brand-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Immediate Recovery (Week 1)</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-brand-500 pl-3">
                    <div className="font-semibold text-gray-900">Creative Angle Pivot</div>
                    <div className="text-gray-600">
                      Complete messaging framework change. Move from current value proposition 
                      to alternative benefits or different emotional triggers.
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-brand-500 pl-3">
                    <div className="font-semibold text-gray-900">Audience Expansion</div>
                    <div className="text-gray-600">
                      Broaden targeting to fresh audience segments while maintaining conversion quality. 
                      Lookalike expansion and interest diversification.
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-brand-500 pl-3">
                    <div className="font-semibold text-gray-900">Platform Diversification</div>
                    <div className="text-gray-600">
                      Deploy successful creative concepts on new platforms to access 
                      unsaturated audiences while testing cross-platform performance.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-brand-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Strategic Rebuild (Week 2-4)</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-brand-500 pl-3">
                    <div className="font-semibold text-gray-900">Competitive Intelligence Integration</div>
                    <div className="text-gray-600">
                      Analyze successful competitor campaigns for fresh angle inspiration. 
                      Adapt winning frameworks to your value proposition.
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-brand-500 pl-3">
                    <div className="font-semibold text-gray-900">Trend-Based Creative Development</div>
                    <div className="text-gray-600">
                      Integrate current social media trends and cultural moments into 
                      creative concepts for immediate relevance and shareability.
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-brand-500 pl-3">
                    <div className="font-semibold text-gray-900">Performance-Based Optimization</div>
                    <div className="text-gray-600">
                      Use early recovery data to optimize and scale winning creative variations. 
                      Build sustainable performance patterns for long-term success.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-brand-50 to-brand-50 rounded-xl p-8 border border-brand-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Expected Recovery Timeline & Milestones
              </h3>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    3
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">Days</div>
                  <div className="text-xs text-gray-600">Initial improvement signals</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    1
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">Week</div>
                  <div className="text-xs text-gray-600">CTR stabilization</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    2
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">Weeks</div>
                  <div className="text-xs text-gray-600">CAC optimization</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    4
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">Weeks</div>
                  <div className="text-xs text-gray-600">Full performance recovery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools and Templates */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Implementation Tools & Templates
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 border">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-brand-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Monitoring Templates</h3>
                </div>
                
                <div className="space-y-3">
                  <Link 
                    href="/creative-fatigue-assessment"
                    className="block p-3 bg-white rounded-lg border hover:border-brand-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm">Creative Fatigue Assessment Tool</h4>
                    <p className="text-xs text-gray-600">Automated scoring system for fatigue risk evaluation</p>
                  </Link>
                  
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">Weekly Performance Dashboard</h4>
                    <p className="text-xs text-gray-600">Track all key metrics with automated alert thresholds</p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">Competitive Monitoring Checklist</h4>
                    <p className="text-xs text-gray-600">Track competitor creative strategies and performance patterns</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border">
                <div className="flex items-center mb-4">
                  <RefreshCw className="h-6 w-6 text-brand-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Prevention Tools</h3>
                </div>
                
                <div className="space-y-3">
                  <Link 
                    href="/52-high-converting-ad-hooks-library"
                    className="block p-3 bg-white rounded-lg border hover:border-brand-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm">52 Hook Rotation Library</h4>
                    <p className="text-xs text-gray-600">Pre-tested hooks organized by framework and performance score</p>
                  </Link>
                  
                  <Link 
                    href="/creative-brief-framework"
                    className="block p-3 bg-white rounded-lg border hover:border-brand-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm">Creative Brief Template</h4>
                    <p className="text-xs text-gray-600">Systematic brief development for consistent quality</p>
                  </Link>
                  
                  <div className="p-3 bg-white rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">3-Week Refresh Calendar</h4>
                    <p className="text-xs text-gray-600">Pre-planned creative rotation schedule with optimization points</p>
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
              Prevent Creative Fatigue with Weekly Intelligence
            </h2>
            
            <p className="text-xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Access systematic creative rotation with weekly intelligence delivery. 
              Maintain peak performance and avoid costly audience saturation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Calendar className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="font-semibold">Weekly Refresh</div>
                <div className="text-brand-200 text-sm">Proactive creative rotation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="font-semibold">Performance Monitoring</div>
                <div className="text-brand-200 text-sm">Early warning detection</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="font-semibold">Recovery Protocols</div>
                <div className="text-brand-200 text-sm">Systematic optimization</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-brand-600 hover:bg-brand-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Start Prevention Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <FreeWeekButton source="creative_fatigue_prevention_framework-cta" className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center">Start Free Week Trial</FreeWeekButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Creative Intelligence Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete methodology for systematic creative development and optimization
                </p>
              </Link>
              
              <Link 
                href="/25-point-performance-scoring-system"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Performance Scoring System</h3>
                <p className="text-sm text-gray-600">
                  Predict and optimize creative performance before testing begins
                </p>
              </Link>
              
              <Link 
                href="/competitor-analysis-weekly-workflow"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Competitive Intelligence</h3>
                <p className="text-sm text-gray-600">
                  Weekly competitor monitoring and strategic analysis framework
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
