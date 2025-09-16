import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, Target, Settings, BarChart3, Users, Zap, Download, Calculator, BookOpen, PlayCircle, Workflow, Bot, Clock, Database, GitBranch, Layers } from 'lucide-react';
import { Header } from '@/components/layout/secondary-header';

export const metadata: Metadata = {
  title: 'Marketing Automation for Weekly Creative Intelligence: Subscription Business Setup Guide | Apsics Media',
  description: 'Complete marketing automation setup guide for weekly creative intelligence in subscription businesses. Automation tool setup, weekly intelligence automation, and subscription-specific workflow optimization.',
  keywords: 'marketing automation subscription business, creative intelligence automation, weekly marketing automation, subscription automation strategy, marketing workflow automation, subscription business automation setup',
  openGraph: {
    title: 'Marketing Automation for Weekly Creative Intelligence: Subscription Business Setup Guide',
    description: 'Master marketing automation setup for weekly creative intelligence with comprehensive subscription business workflow optimization.',
    type: 'article',
  },
  alternates: {
    canonical: '/marketing-automation-weekly-creative-intelligence-setup',
  },
};

// Automation framework components
const automationFrameworks = [
  {
    framework: 'Intelligence Gathering Automation',
    description: 'Automated competitive intelligence and market data collection for weekly creative insights',
    icon: Database,
    components: [
      'Competitive monitoring automation using tools like SEMrush, Ahrefs, and social media APIs for continuous intelligence',
      'Market trend detection and alert systems for emerging opportunities and subscription business intelligence',
      'Content performance aggregation from multiple platforms including Facebook, TikTok, LinkedIn, and Google Analytics',
      'Weekly intelligence report generation with automated data synthesis and performance correlation analysis',
      'Competitor campaign change detection and strategic alert systems for proactive subscription business response'
    ],
    outcome: 'Automated intelligence gathering with 90% time reduction and comprehensive competitive coverage'
  },
  {
    framework: 'Creative Development Automation',
    description: 'Systematic creative concept development and performance optimization workflow automation',
    icon: Bot,
    components: [
      'Creative brief automation using performance data and competitive intelligence for strategic concept development',
      'Hook and headline testing automation with A/B testing setup and statistical significance tracking',
      'Creative asset generation workflows including design template automation and content variation creation',
      'Performance scoring automation using the 25-point framework with automated evaluation and recommendation',
      'Creative approval workflows with stakeholder notification and collaborative feedback systems for efficient iteration'
    ],
    outcome: 'Creative development automation with 3x faster concept iteration and consistent quality delivery'
  },
  {
    framework: 'Campaign Execution Automation',
    description: 'Automated campaign deployment, monitoring, and optimization for subscription business growth',
    icon: Workflow,
    components: [
      'Campaign setup automation across Facebook, TikTok, LinkedIn with consistent tracking and optimization parameters',
      'Budget allocation automation based on performance data and competitive intelligence insights for ROI optimization',
      'Creative rotation automation with fatigue detection and proactive creative refresh for sustained performance',
      'Performance monitoring with automated alerting for subscription conversion anomalies and optimization opportunities',
      'Weekly optimization automation including bid adjustments, audience refinements, and creative performance optimization'
    ],
    outcome: 'Campaign execution automation with 40% performance improvement and proactive optimization'
  },
  {
    framework: 'Reporting & Analytics Automation',
    description: 'Comprehensive reporting automation and strategic insights generation for subscription business optimization',
    icon: BarChart3,
    components: [
      'Weekly performance reporting automation with subscription conversion tracking and ROI analysis across all channels',
      'Competitive intelligence synthesis with automated strategic recommendation generation and market positioning insights',
      'Custom dashboard creation with real-time subscription business KPIs and performance correlation analysis',
      'Automated stakeholder reporting with executive summaries and strategic optimization recommendations',
      'Performance prediction automation using historical data and machine learning for proactive strategic planning'
    ],
    outcome: 'Reporting automation with comprehensive insights and strategic recommendations for data-driven decisions'
  }
];

const automationTools = [
  {
    category: 'Marketing Automation Platforms',
    tools: [
      {
        name: 'HubSpot Marketing Hub',
        use_case: 'Comprehensive marketing automation with CRM integration',
        subscription_benefits: 'Lead nurturing, subscription trial workflows, customer lifecycle automation',
        weekly_intelligence: 'Automated reporting, performance tracking, competitive analysis integration'
      },
      {
        name: 'Marketo Engage',
        use_case: 'Enterprise-grade marketing automation and lead management',
        subscription_benefits: 'Advanced subscription customer segmentation and personalized nurturing',
        weekly_intelligence: 'Advanced analytics, predictive insights, custom intelligence dashboards'
      },
      {
        name: 'Pardot (Salesforce)',
        use_case: 'B2B marketing automation with Salesforce integration',
        subscription_benefits: 'Subscription sales alignment, advanced lead scoring, opportunity tracking',
        weekly_intelligence: 'Salesforce integration, comprehensive attribution, strategic insights'
      }
    ]
  },
  {
    category: 'Creative Intelligence Tools',
    tools: [
      {
        name: 'Zapier',
        use_case: 'Workflow automation and app integration',
        subscription_benefits: 'Creative workflow automation, performance data integration',
        weekly_intelligence: 'Automated data collection, report generation, alert systems'
      },
      {
        name: 'Make (Integromat)',
        use_case: 'Advanced workflow automation and data processing',
        subscription_benefits: 'Complex subscription business workflow automation',
        weekly_intelligence: 'Advanced data manipulation, custom intelligence workflows'
      },
      {
        name: 'Microsoft Power Automate',
        use_case: 'Enterprise workflow automation and Microsoft integration',
        subscription_benefits: 'Office 365 integration, enterprise subscription workflows',
        weekly_intelligence: 'Microsoft ecosystem integration, advanced reporting automation'
      }
    ]
  },
  {
    category: 'Analytics & Intelligence',
    tools: [
      {
        name: 'Google Analytics 4',
        use_case: 'Comprehensive web analytics and conversion tracking',
        subscription_benefits: 'Subscription funnel analysis, customer journey tracking',
        weekly_intelligence: 'Automated insights, custom reports, performance alerts'
      },
      {
        name: 'Mixpanel',
        use_case: 'Product analytics and user behavior tracking',
        subscription_benefits: 'Subscription user behavior analysis, cohort tracking',
        weekly_intelligence: 'Behavioral insights, retention analysis, predictive analytics'
      },
      {
        name: 'Segment',
        use_case: 'Customer data platform and analytics integration',
        subscription_benefits: 'Unified subscription customer data, cross-platform tracking',
        weekly_intelligence: 'Data integration, comprehensive customer intelligence'
      }
    ]
  }
];

const implementationTimeline = [
  {
    phase: 'Week 1-2: Foundation Setup',
    title: 'Core Automation Infrastructure',
    icon: Settings,
    activities: [
      'Marketing automation platform selection and account setup with subscription business configuration',
      'Integration setup with existing tools including CRM, analytics, and advertising platforms',
      'Data flow architecture design for weekly intelligence automation and creative performance tracking',
      'Basic workflow automation including lead capture, nurturing sequences, and subscription trial management'
    ]
  },
  {
    phase: 'Week 3-4: Intelligence Automation',
    title: 'Weekly Creative Intelligence Automation',
    icon: Bot,
    activities: [
      'Competitive intelligence automation setup with monitoring tools and alert systems',
      'Performance data aggregation automation across all marketing channels and platforms',
      'Weekly reporting automation with custom dashboards and stakeholder notification systems',
      'Creative performance tracking automation with scoring and optimization recommendation systems'
    ]
  },
  {
    phase: 'Week 5-6: Campaign Automation',
    title: 'Campaign Execution & Optimization Automation',
    icon: Workflow,
    activities: [
      'Campaign deployment automation across Facebook, TikTok, LinkedIn with consistent tracking setup',
      'Budget optimization automation based on performance data and competitive intelligence insights',
      'Creative rotation automation with fatigue detection and automatic refresh triggers',
      'Performance monitoring automation with alerting for anomalies and optimization opportunities'
    ]
  },
  {
    phase: 'Week 7-8: Advanced Optimization',
    title: 'Strategic Automation & Scaling',
    icon: TrendingUp,
    activities: [
      'Advanced automation workflows including predictive optimization and strategic recommendation systems',
      'Cross-channel automation integration for comprehensive subscription business marketing coordination',
      'Performance prediction automation using machine learning and historical performance data',
      'Scaling automation infrastructure for enterprise-level subscription business growth'
    ]
  }
];

export default function MarketingAutomationWeeklyCreativeIntelligenceSetup() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-16 lg:pt-20">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Marketing Automation for Weekly Creative Intelligence: Subscription Business Setup Guide",
            "description": "Master marketing automation setup for weekly creative intelligence with comprehensive subscription business workflow optimization.",
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
              "@id": "https://apsicsmedia.com/marketing-automation-weekly-creative-intelligence-setup"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Settings className="h-4 w-4 mr-2" />
              MARKETING AUTOMATION SETUP
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Marketing Automation for Weekly Creative Intelligence
            </h1>
            
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Complete marketing automation setup guide for subscription businesses. 
              Automate weekly creative intelligence, competitive monitoring, and campaign optimization workflows.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="h-8 w-8 text-indigo-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">90% Time Saved</div>
                <div className="text-indigo-200 text-sm">Intelligence gathering</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Bot className="h-8 w-8 text-indigo-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">3x Faster</div>
                <div className="text-indigo-200 text-sm">Creative iteration</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-indigo-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">40% Better</div>
                <div className="text-indigo-200 text-sm">Campaign performance</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#automation-frameworks"
                className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore Automation Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="#implementation-guide"
                className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Start Implementation
                <PlayCircle className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Marketing Automation is Essential for Subscription Business Growth
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Subscription businesses require consistent, systematic marketing execution to maintain 
                competitive advantage and sustainable growth. Marketing automation enables weekly creative 
                intelligence delivery, competitive monitoring, and performance optimization at scale.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Manual Marketing Challenges</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Time-Intensive Intelligence Gathering</div>
                        <div className="text-gray-600">Manual competitive analysis and performance tracking consumes 15-20 hours weekly</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Inconsistent Creative Development</div>
                        <div className="text-gray-600">Manual creative processes produce variable quality and slower iteration cycles</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Reactive Campaign Management</div>
                        <div className="text-gray-600">Manual campaign optimization happens too late, missing performance opportunities</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Marketing Automation Advantages</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Automated Intelligence Delivery</div>
                        <div className="text-gray-600">Continuous competitive monitoring and weekly intelligence reports with 90% time savings</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Systematic Creative Optimization</div>
                        <div className="text-gray-600">Automated creative development workflows with consistent quality and 3x faster iteration</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Proactive Campaign Optimization</div>
                        <div className="text-gray-600">Real-time performance monitoring with automated optimization and 40% better results</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Subscription Business Automation ROI
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Operational Efficiency</div>
                    <div className="text-gray-600">
                      Marketing automation reduces manual tasks by 90%, enabling teams to focus on 
                      strategic planning and creative innovation for subscription growth.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Performance Consistency</div>
                    <div className="text-gray-600">
                      Automated workflows ensure consistent execution quality and performance optimization, 
                      eliminating human error and maintaining competitive advantage.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Scalable Growth</div>
                    <div className="text-gray-600">
                      Automation infrastructure scales with subscription business growth, maintaining 
                      performance quality while expanding market reach and customer acquisition.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Frameworks */}
      <section id="automation-frameworks" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              4-Framework Marketing Automation System
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Comprehensive marketing automation system for subscription businesses. Each framework 
              automates specific aspects of weekly creative intelligence and campaign optimization.
            </p>
            
            <div className="space-y-8">
              {automationFrameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                      <framework.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{framework.framework}</h3>
                      <p className="text-gray-700 mb-4">{framework.description}</p>
                      <div className="bg-green-50 px-3 py-2 rounded-full inline-block">
                        <span className="text-green-700 font-semibold text-sm">{framework.outcome}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-22">
                    <h4 className="font-semibold text-gray-900 mb-3">Automation Components:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {framework.components.map((component, componentIndex) => (
                        <div key={componentIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
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

      {/* Tool Selection Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Marketing Automation Tool Selection Guide
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Strategic tool selection for subscription business marketing automation. 
              Comprehensive evaluation of platforms, capabilities, and subscription-specific optimization.
            </p>
            
            <div className="space-y-8">
              {automationTools.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  
                  <div className="space-y-6">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="border border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">{tool.name}</h4>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-semibold text-gray-900 mb-2">Primary Use Case:</div>
                            <div className="text-gray-600">{tool.use_case}</div>
                          </div>
                          
                          <div>
                            <div className="font-semibold text-gray-900 mb-2">Subscription Benefits:</div>
                            <div className="text-gray-600">{tool.subscription_benefits}</div>
                          </div>
                          
                          <div>
                            <div className="font-semibold text-gray-900 mb-2">Weekly Intelligence:</div>
                            <div className="text-gray-600">{tool.weekly_intelligence}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section id="implementation-guide" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              8-Week Marketing Automation Implementation Timeline
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Systematic 8-week implementation roadmap for marketing automation in subscription businesses. 
                Progressive setup ensures comprehensive automation coverage and optimal performance outcomes.
              </p>
              
              <div className="space-y-6">
                {implementationTimeline.map((phase, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        <phase.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-indigo-600 mb-1">{phase.phase}</div>
                        <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
                      </div>
                    </div>
                    
                    <div className="ml-16">
                      <div className="grid md:grid-cols-2 gap-3">
                        {phase.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">8-Week Implementation Outcomes</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Operational Improvements</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• 90% reduction in manual intelligence gathering and competitive monitoring</li>
                      <li>• 3x faster creative concept development and iteration cycles</li>
                      <li>• 40% improvement in campaign performance through automated optimization</li>
                      <li>• Comprehensive weekly intelligence reports with strategic recommendations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Strategic Advantages</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Proactive competitive intelligence and market opportunity identification</li>
                      <li>• Systematic creative development with consistent quality and performance</li>
                      <li>• Real-time campaign optimization and performance monitoring</li>
                      <li>• Scalable automation infrastructure for sustainable subscription growth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Automate Your Marketing Intelligence for Subscription Growth
            </h2>
            
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Transform manual marketing processes with comprehensive automation. 
              Access systematic intelligence gathering, creative optimization, and performance automation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="h-8 w-8 text-indigo-200 mx-auto mb-2" />
                <div className="font-semibold">90% Time Saved</div>
                <div className="text-indigo-200 text-sm">Intelligence gathering</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Bot className="h-8 w-8 text-indigo-200 mx-auto mb-2" />
                <div className="font-semibold">3x Faster</div>
                <div className="text-indigo-200 text-sm">Creative iteration</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-indigo-200 mx-auto mb-2" />
                <div className="font-semibold">40% Better</div>
                <div className="text-indigo-200 text-sm">Performance</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#service-tiers"
                className="bg-green-600 text-white hover:bg-green-700 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Your FREE Week
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <Link
                href="/free-hooks"
                className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Get Free Hooks
                <Download className="h-5 w-5 ml-2" />
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
              Related Technical Implementation Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/first-party-data-collection-weekly-intelligence-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                  <Database className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">First-Party Data Collection Framework</h3>
                <p className="text-sm text-gray-600">
                  Privacy-compliant data collection and weekly intelligence integration strategies
                </p>
              </Link>
              
              <Link 
                href="/analytics-setup-weekly-creative-intelligence-tracking"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Analytics Setup Framework</h3>
                <p className="text-sm text-gray-600">
                  Analytics platform configuration for subscription business performance tracking
                </p>
              </Link>
              
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Creative Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete methodology for systematic creative development and automation integration
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}