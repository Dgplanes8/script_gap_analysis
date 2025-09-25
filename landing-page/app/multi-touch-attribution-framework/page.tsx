import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, Target, BarChart3, Users, Zap, Calculator, BookOpen, PlayCircle, Activity, Network, GitBranch, PieChart, LineChart, Filter } from 'lucide-react';
import { FreeWeekButton } from '@/components/ui/free-week-button';

const AttributionCalculator = dynamic(
  () => import('@/components/calculators/attribution-calculator').then((mod) => ({ default: mod.AttributionCalculator })),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
);

export const metadata: Metadata = {
  title: 'Multi-Touch Attribution Framework: Weekly Intelligence Attribution for Subscription Businesses | Apsics Media',
  description: 'Advanced attribution modeling for subscription businesses with weekly performance tracking. Intelligence-driven attribution optimization, ROI measurement across touchpoints, and strategic attribution framework.',
  keywords: 'multi-touch attribution subscription business, subscription attribution modeling, weekly attribution intelligence, marketing attribution framework, subscription marketing attribution, attribution model setup',
  openGraph: {
    title: 'Multi-Touch Attribution Framework: Weekly Intelligence Attribution for Subscription Businesses',
    description: 'Advanced attribution modeling and weekly performance tracking for subscription businesses with intelligence-driven optimization.',
    type: 'article',
  },
  alternates: {
    canonical: '/multi-touch-attribution-framework',
  },
};

// Attribution model components
const attributionModels = [
  {
    model: 'First-Touch Attribution',
    description: 'Credits the first touchpoint in the customer journey for driving conversion',
    useCase: 'Brand awareness campaigns and top-of-funnel optimization',
    pros: ['Simple to implement', 'Clear awareness impact', 'Good for brand measurement'],
    cons: ['Ignores nurturing touchpoints', 'Undervalues conversion drivers', 'Limited optimization insights'],
    bestFor: 'Subscription businesses focusing on awareness and new customer acquisition'
  },
  {
    model: 'Last-Touch Attribution',
    description: 'Assigns full credit to the final touchpoint before conversion',
    useCase: 'Direct response campaigns and conversion optimization',
    pros: ['Easy to understand', 'Direct ROI calculation', 'Conversion-focused insights'],
    cons: ['Ignores awareness building', 'Undervalues nurturing', 'Incomplete journey view'],
    bestFor: 'Subscription services with short consideration periods'
  },
  {
    model: 'Linear Attribution',
    description: 'Distributes conversion credit equally across all touchpoints in the journey',
    useCase: 'Comprehensive multi-channel subscription marketing strategies',
    pros: ['Recognizes all touchpoints', 'Balanced perspective', 'Multi-channel optimization'],
    cons: ['May dilute key insights', 'Equal weight assumption', 'Complex optimization'],
    bestFor: 'Mature subscription businesses with established multi-channel presence'
  },
  {
    model: 'Time-Decay Attribution',
    description: 'Gives more credit to touchpoints closer to the conversion event',
    useCase: 'Subscription businesses with complex nurturing sequences',
    pros: ['Conversion-weighted insights', 'Nurturing optimization', 'Realistic influence modeling'],
    cons: ['Complex to implement', 'May undervalue awareness', 'Requires time analysis'],
    bestFor: 'B2B SaaS with long sales cycles and multiple touchpoints'
  },
  {
    model: 'Position-Based (U-Shaped) Attribution',
    description: 'Assigns 40% credit each to first and last touchpoints, 20% to middle touches',
    useCase: 'Balanced awareness and conversion optimization strategies',
    pros: ['Values awareness and conversion', 'Strategic balance', 'Multi-stage optimization'],
    cons: ['Arbitrary percentage allocation', 'Complex reporting', 'May not fit all journeys'],
    bestFor: 'Subscription businesses balancing acquisition and conversion optimization'
  },
  {
    model: 'Data-Driven Attribution',
    description: 'Uses machine learning to assign credit based on actual conversion impact',
    useCase: 'Advanced subscription marketing with sufficient data volume',
    pros: ['Accurate impact measurement', 'Dynamic credit allocation', 'Optimization insights'],
    cons: ['Requires significant data', 'Complex implementation', 'Black box algorithms'],
    bestFor: 'Enterprise subscription companies with large datasets and advanced analytics'
  }
];

const implementationSteps = [
  {
    phase: 'Phase 1: Foundation Setup',
    title: 'Attribution Infrastructure Development',
    description: 'Establish tracking, data collection, and measurement infrastructure',
    icon: Network,
    timeline: 'Weeks 1-2',
    components: [
      'Multi-channel tracking pixel implementation across all marketing touchpoints',
      'Customer journey mapping and touchpoint identification for subscription funnels',
      'Data integration setup connecting advertising platforms, CRM, and analytics systems',
      'Attribution model selection and business objective alignment for subscription metrics'
    ],
    deliverables: 'Complete attribution tracking infrastructure with multi-channel visibility'
  },
  {
    phase: 'Phase 2: Model Implementation',
    title: 'Attribution Model Configuration',
    description: 'Configure chosen attribution models and establish measurement protocols',
    icon: GitBranch,
    timeline: 'Weeks 3-4',
    components: [
      'Attribution model configuration in Google Analytics, Facebook Attribution, and custom systems',
      'Subscription-specific conversion goal setup including trial signups, paid conversions, and renewals',
      'Cross-device and cross-platform attribution setup for comprehensive customer journey tracking',
      'Custom attribution reporting dashboard development with subscription business KPIs'
    ],
    deliverables: 'Fully configured attribution models with subscription-optimized measurement'
  },
  {
    phase: 'Phase 3: Intelligence Integration',
    title: 'Weekly Performance Analysis Setup',
    description: 'Integrate attribution data with creative intelligence and competitive analysis',
    icon: Activity,
    timeline: 'Weeks 5-6',
    components: [
      'Weekly attribution performance reporting with creative intelligence correlation analysis',
      'Competitive attribution analysis and benchmarking against industry subscription standards',
      'Attribution-driven creative optimization recommendations based on touchpoint performance',
      'ROI and CAC optimization using multi-touch attribution insights and performance data'
    ],
    deliverables: 'Intelligence-driven attribution optimization system with weekly insights'
  },
  {
    phase: 'Phase 4: Optimization & Scaling',
    title: 'Advanced Attribution Analytics',
    description: 'Deploy advanced analytics and automated optimization based on attribution insights',
    icon: TrendingUp,
    timeline: 'Weeks 7-8',
    components: [
      'Predictive attribution modeling using machine learning and historical subscription data',
      'Automated budget allocation optimization based on multi-touch attribution performance',
      'Advanced customer lifetime value attribution connecting acquisition to retention performance',
      'Strategic attribution insights for long-term subscription business planning and growth'
    ],
    deliverables: 'Advanced attribution analytics with automated optimization and strategic insights'
  }
];

export default function MultiTouchAttributionFramework() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Multi-Touch Attribution Framework: Weekly Intelligence Attribution for Subscription Businesses",
            "description": "Advanced attribution modeling and weekly performance tracking for subscription businesses with intelligence-driven optimization.",
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
              "@id": "https://apsicsmedia.com/multi-touch-attribution-framework"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <GitBranch className="h-4 w-4 mr-2" />
              ADVANCED ATTRIBUTION MODELING
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Multi-Touch Attribution Framework
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Advanced attribution modeling for subscription businesses with weekly intelligence tracking. 
              ROI measurement across touchpoints, strategic attribution optimization, and performance-driven budget allocation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <GitBranch className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">6 Models</div>
                <div className="text-brand-200 text-sm">Attribution methodologies</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Activity className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">Weekly Tracking</div>
                <div className="text-brand-200 text-sm">Performance intelligence</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BarChart3 className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">ROI Optimization</div>
                <div className="text-brand-200 text-sm">Cross-touchpoint measurement</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#attribution-models"
                className="bg-white text-brand-600 hover:bg-brand-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore Attribution Models
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="#implementation"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Start Implementation
                <PlayCircle className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Context Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Subscription Businesses Need Advanced Attribution
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Subscription businesses face unique attribution challenges. With complex customer journeys 
                spanning awareness, trial, conversion, and retention, traditional last-click attribution 
                misallocates budget and undervalues nurturing touchpoints critical for subscriber growth.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Attribution Blind Spots</h3>
                  <p className="text-gray-600 text-sm">
                    Last-click attribution misses 60-80% of the customer journey for subscription businesses, 
                    leading to misallocated budgets and undervalued awareness campaigns.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PieChart className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Complex Journey Mapping</h3>
                  <p className="text-gray-600 text-sm">
                    Subscription customer journeys involve multiple touchpoints across awareness, 
                    consideration, trial, conversion, and retention requiring sophisticated measurement.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LineChart className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">ROI Measurement Challenge</h3>
                  <p className="text-gray-600 text-sm">
                    Without proper attribution, subscription businesses cannot accurately measure 
                    campaign ROI, leading to suboptimal budget allocation and strategic decisions.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-brand-50 to-brand-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Subscription Business Attribution Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Multi-Stage Journey Tracking</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Awareness touchpoint impact measurement and brand building ROI</li>
                      <li>• Trial conversion attribution across multiple nurturing touchpoints</li>
                      <li>• Paid conversion attribution including trial-to-paid optimization</li>
                      <li>• Retention and renewal attribution connecting acquisition to lifetime value</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Strategic Optimization Requirements</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Cross-channel budget optimization based on true touchpoint contribution</li>
                      <li>• Creative performance attribution connecting messaging to conversion impact</li>
                      <li>• Customer lifetime value attribution for long-term strategic planning</li>
                      <li>• Competitive intelligence integration for market position optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attribution Models */}
      <section id="attribution-models" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              6 Attribution Models for Subscription Businesses
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Each attribution model offers unique insights for subscription marketing optimization. 
              Choose based on business stage, customer journey complexity, and strategic objectives.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {attributionModels.map((model, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-brand-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{model.model}</h3>
                      <p className="text-sm text-gray-600">{model.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Primary Use Case:</div>
                    <div className="text-xs text-gray-700 bg-gray-50 rounded p-2">{model.useCase}</div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Advantages:</div>
                      <div className="space-y-1">
                        {model.pros.map((pro, proIndex) => (
                          <div key={proIndex} className="flex items-center text-xs">
                            <CheckCircle className="h-3 w-3 text-brand-500 mr-1" />
                            <span className="text-gray-600">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Limitations:</div>
                      <div className="space-y-1">
                        {model.cons.map((con, conIndex) => (
                          <div key={conIndex} className="flex items-center text-xs">
                            <div className="w-3 h-3 bg-brand-500 rounded-full mr-1 flex-shrink-0"></div>
                            <span className="text-gray-600">{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-brand-50 rounded-lg p-3">
                    <div className="text-sm font-semibold text-brand-800">Best For:</div>
                    <div className="text-xs text-brand-700 mt-1">{model.bestFor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Attribution Impact Calculator
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Model different attribution scenarios and see the impact on budget allocation, 
                ROI measurement, and strategic decision-making for your subscription business.
              </p>
            </div>
            <AttributionCalculator />
          </div>
        </div>
      </section>

      {/* Implementation Framework */}
      <section id="implementation" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              8-Week Attribution Implementation Framework
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Systematic approach to implementing multi-touch attribution for subscription businesses. 
              Progressive setup ensures accurate measurement and strategic optimization capabilities.
            </p>
            
            <div className="space-y-8">
              {implementationSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-500 text-white rounded-xl flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-brand-600 mb-1">{step.phase}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-700 mb-4">{step.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="bg-brand-50 px-3 py-1 rounded-full">
                          <span className="text-brand-700 font-semibold">{step.timeline}</span>
                        </div>
                        <div className="bg-brand-50 px-3 py-1 rounded-full">
                          <span className="text-brand-700 font-semibold">{step.deliverables}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-22">
                    <h4 className="font-semibold text-gray-900 mb-3">Implementation Components:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {step.components.map((component, componentIndex) => (
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

      {/* Weekly Intelligence Integration */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Weekly Attribution Intelligence Integration
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Attribution insights become powerful when integrated with weekly creative intelligence. 
                Combine touchpoint performance with competitive analysis for strategic optimization.
              </p>
              
              <div className="timeline-container mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      MON
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Attribution Performance Review</h4>
                      <p className="text-gray-600 text-sm">
                        Weekly review of attribution performance across all touchpoints with 
                        creative intelligence correlation and competitive benchmark analysis.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      TUE
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Touchpoint Optimization Analysis</h4>
                      <p className="text-gray-600 text-sm">
                        Deep analysis of touchpoint performance with creative intelligence insights 
                        to identify optimization opportunities and strategic adjustments.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      WED
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Budget Allocation Optimization</h4>
                      <p className="text-gray-600 text-sm">
                        Attribution-driven budget reallocation recommendations with competitive 
                        intelligence integration for strategic market positioning.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      THU
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Strategic Attribution Planning</h4>
                      <p className="text-gray-600 text-sm">
                        Strategic planning based on attribution insights and competitive intelligence 
                        with recommendations for campaign optimization and market positioning.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      FRI
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Attribution Intelligence Report</h4>
                      <p className="text-gray-600 text-sm">
                        Comprehensive weekly attribution report with creative intelligence insights, 
                        competitive benchmarking, and strategic optimization recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-brand-50 to-brand-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Attribution Deliverables</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Performance Intelligence</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Multi-touch attribution performance analysis with ROI impact</li>
                      <li>• Creative intelligence correlation with touchpoint effectiveness</li>
                      <li>• Competitive benchmarking and market position analysis</li>
                      <li>• Customer journey optimization recommendations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Strategic Recommendations</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Attribution-driven budget allocation optimization</li>
                      <li>• Touchpoint strategy recommendations and implementation plans</li>
                      <li>• Creative strategy adjustments based on attribution insights</li>
                      <li>• Long-term attribution strategy and competitive positioning</li>
                    </ul>
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
              Master Multi-Touch Attribution for Subscription Growth
            </h2>
            
            <p className="text-xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Transform budget allocation with accurate attribution measurement. 
              Access advanced attribution modeling, weekly intelligence integration, and strategic optimization.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <GitBranch className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="font-semibold">6 Attribution Models</div>
                <div className="text-brand-200 text-sm">Complete methodology</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Activity className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="font-semibold">Weekly Intelligence</div>
                <div className="text-brand-200 text-sm">Performance tracking</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BarChart3 className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="font-semibold">ROI Optimization</div>
                <div className="text-brand-200 text-sm">Strategic insights</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-brand-600 hover:bg-brand-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Attribution Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <FreeWeekButton source="multi_touch_attribution_framework-cta" className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center">Claim 10 Free Credits</FreeWeekButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Attribution & Intelligence Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/fortune-100-creative-intelligence-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <Network className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fortune 100 Creative Intelligence</h3>
                <p className="text-sm text-gray-600">
                  Strategic competitive intelligence methodology for attribution-driven optimization
                </p>
              </Link>
              
              <Link 
                href="/saas-creative-strategy-roi-calculator"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <Calculator className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">SaaS Creative ROI Calculator</h3>
                <p className="text-sm text-gray-600">
                  Strategic ROI measurement with attribution modeling and performance optimization
                </p>
              </Link>
              
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Creative Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete methodology for attribution-integrated creative development and optimization
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
