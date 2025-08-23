import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, Target, Database, BarChart3, Users, Zap, Download, Calculator, BookOpen, PlayCircle, Shield, Lock, Eye, FileText, Server, Cloud } from 'lucide-react';

export const metadata: Metadata = {
  title: 'First-Party Data Collection: Weekly Intelligence Framework for Subscription Brands | Apsics Media',
  description: 'Privacy-compliant first-party data collection and weekly intelligence framework for subscription brands. Subscription data strategy, privacy compliance, and data-driven creative intelligence optimization.',
  keywords: 'first-party data collection subscription, subscription data strategy, weekly data intelligence, privacy-compliant data collection, subscription business data collection, first-party data marketing',
  openGraph: {
    title: 'First-Party Data Collection: Weekly Intelligence Framework for Subscription Brands',
    description: 'Master privacy-compliant first-party data collection with weekly intelligence integration for subscription business growth.',
    type: 'article',
  },
  alternates: {
    canonical: '/first-party-data-collection-weekly-intelligence-framework',
  },
};

// Data collection frameworks
const dataFrameworks = [
  {
    framework: 'Privacy-Compliant Data Collection',
    description: 'Comprehensive first-party data collection strategy ensuring GDPR, CCPA, and privacy compliance',
    icon: Shield,
    components: [
      'Consent management implementation with granular permission controls and subscription customer preference tracking',
      'Privacy policy optimization and transparent data usage communication for subscription business trust building',
      'Cookie strategy development including first-party cookie optimization and third-party cookie alternative solutions',
      'Data retention policy implementation with automated data lifecycle management and compliance monitoring',
      'User preference center creation enabling subscription customers to control their data sharing and communication preferences'
    ],
    outcome: 'Privacy-compliant data collection with 95% consent rates and comprehensive compliance coverage'
  },
  {
    framework: 'Customer Data Platform Integration',
    description: 'Unified customer data platform setup for comprehensive subscription customer intelligence',
    icon: Database,
    components: [
      'Customer data platform selection and implementation with subscription business-specific configuration and optimization',
      'Data integration across touchpoints including website, mobile app, email, and subscription management platforms',
      'Identity resolution and customer journey mapping for comprehensive subscription customer behavior analysis',
      'Real-time data synchronization ensuring consistent customer intelligence across all marketing and subscription platforms',
      'Data quality management with automated data cleansing, validation, and enrichment for accurate subscription intelligence'
    ],
    outcome: 'Unified customer data platform with 360-degree subscription customer intelligence and real-time synchronization'
  },
  {
    framework: 'Behavioral Intelligence Collection',
    description: 'Advanced behavioral data collection for subscription customer insight and weekly creative intelligence',
    icon: Eye,
    components: [
      'Website behavior tracking including page engagement, conversion funnel analysis, and subscription trial behavior patterns',
      'Email engagement intelligence with open rates, click patterns, and subscription communication preference analysis',
      'Product usage analytics for subscription engagement patterns, feature adoption, and customer success intelligence',
      'Creative performance correlation tracking connecting customer behavior to creative engagement and subscription conversion',
      'Predictive behavior modeling using machine learning for subscription churn prediction and customer lifetime value optimization'
    ],
    outcome: 'Comprehensive behavioral intelligence with predictive insights and subscription-specific optimization'
  },
  {
    framework: 'Weekly Intelligence Integration',
    description: 'Data integration with weekly creative intelligence processes for strategic subscription marketing optimization',
    icon: TrendingUp,
    components: [
      'Automated data aggregation for weekly intelligence reports with subscription customer behavior insights and performance correlation',
      'Performance attribution integration connecting first-party data to creative performance and subscription conversion outcomes',
      'Competitive intelligence enhancement using first-party data insights for strategic positioning and market advantage',
      'Customer segmentation automation based on behavioral data for personalized subscription marketing and creative optimization',
      'Strategic recommendation generation using data insights for weekly creative intelligence and subscription growth strategies'
    ],
    outcome: 'Integrated weekly intelligence system with data-driven strategic recommendations and subscription optimization'
  }
];

const dataTypes = [
  {
    category: 'Identity & Profile Data',
    description: 'Core customer identification and profile information',
    data_points: [
      'Customer identification (email, phone, subscription ID)',
      'Demographic information (age, location, company size)',
      'Subscription tier and billing information',
      'Account preferences and communication settings'
    ],
    weekly_intelligence_use: 'Customer segmentation and personalized creative development',
    privacy_considerations: 'Explicit consent required, secure storage, controlled access'
  },
  {
    category: 'Behavioral & Engagement Data',
    description: 'Customer interaction and engagement patterns',
    data_points: [
      'Website navigation and page engagement patterns',
      'Email engagement (opens, clicks, unsubscribes)',
      'Product usage and feature adoption metrics',
      'Support interactions and customer service history'
    ],
    weekly_intelligence_use: 'Engagement optimization and creative performance correlation',
    privacy_considerations: 'Anonymous tracking options, data minimization principles'
  },
  {
    category: 'Transaction & Subscription Data',
    description: 'Purchase behavior and subscription management data',
    data_points: [
      'Subscription history and billing cycles',
      'Payment method and transaction details',
      'Upgrade/downgrade patterns and timing',
      'Churn indicators and retention metrics'
    ],
    weekly_intelligence_use: 'Revenue optimization and customer lifetime value analysis',
    privacy_considerations: 'PCI compliance, encrypted storage, limited access'
  },
  {
    category: 'Creative Performance Data',
    description: 'Creative engagement and conversion correlation data',
    data_points: [
      'Creative engagement rates by customer segment',
      'Conversion attribution to specific creative elements',
      'A/B testing participation and response patterns',
      'Content preference and format performance'
    ],
    weekly_intelligence_use: 'Creative optimization and performance prediction',
    privacy_considerations: 'Aggregated analysis, anonymized reporting'
  }
];

const complianceFramework = [
  {
    regulation: 'GDPR (General Data Protection Regulation)',
    scope: 'EU residents and businesses operating in EU',
    key_requirements: [
      'Explicit consent for data collection and processing',
      'Right to access, rectify, and delete personal data',
      'Data portability and processing transparency',
      'Appointment of Data Protection Officer (DPO) if required'
    ],
    subscription_impact: 'EU subscription customers require explicit consent and comprehensive data rights',
    implementation_priority: 'High - Required for EU market access'
  },
  {
    regulation: 'CCPA (California Consumer Privacy Act)',
    scope: 'California residents and businesses serving California',
    key_requirements: [
      'Consumer right to know about data collection',
      'Right to delete personal information',
      'Right to opt-out of sale of personal information',
      'Non-discrimination for privacy rights exercise'
    ],
    subscription_impact: 'California subscription customers require transparency and opt-out capabilities',
    implementation_priority: 'High - Required for California market'
  },
  {
    regulation: 'PIPEDA (Personal Information Protection)',
    scope: 'Canadian residents and cross-border data transfers',
    key_requirements: [
      'Consent for collection, use, and disclosure',
      'Purpose limitation and data minimization',
      'Accuracy and security safeguards',
      'Individual access and correction rights'
    ],
    subscription_impact: 'Canadian subscription customers require purpose-limited data collection',
    implementation_priority: 'Medium - Important for Canadian expansion'
  }
];

export default function FirstPartyDataCollectionWeeklyIntelligenceFramework() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "First-Party Data Collection: Weekly Intelligence Framework for Subscription Brands",
            "description": "Master privacy-compliant first-party data collection with weekly intelligence integration for subscription business growth.",
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
              "@id": "https://apsicsmedia.com/first-party-data-collection-weekly-intelligence-framework"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Database className="h-4 w-4 mr-2" />
              FIRST-PARTY DATA INTELLIGENCE
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              First-Party Data Collection Framework
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Privacy-compliant first-party data collection and weekly intelligence framework for subscription brands. 
              Build comprehensive customer intelligence while maintaining privacy compliance and trust.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Shield className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">95% Consent</div>
                <div className="text-blue-200 text-sm">Privacy compliance rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Database className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">360° Intelligence</div>
                <div className="text-blue-200 text-sm">Customer insights</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">40% Better</div>
                <div className="text-blue-200 text-sm">Targeting accuracy</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#data-frameworks"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore Data Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="#compliance-guide"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Compliance Guide
                <Shield className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data Strategy Context */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why First-Party Data is Critical for Subscription Business Success
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Third-party cookie deprecation and privacy regulations fundamentally shift subscription marketing. 
                First-party data collection enables personalized customer experiences, accurate attribution, 
                and sustainable growth while building customer trust through transparency.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Third-Party Data Limitations</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Cookie Deprecation Impact</div>
                        <div className="text-gray-600">Chrome cookie elimination affects 60% of subscription business tracking and attribution</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Privacy Compliance Challenges</div>
                        <div className="text-gray-600">GDPR and CCPA requirements create complex compliance obligations for subscription businesses</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Attribution Accuracy Decline</div>
                        <div className="text-gray-600">Third-party tracking limitations reduce subscription marketing attribution accuracy by 40%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">First-Party Data Advantages</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Privacy-First Customer Trust</div>
                        <div className="text-gray-600">Transparent data collection builds subscription customer trust with 95% consent rates</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Comprehensive Customer Intelligence</div>
                        <div className="text-gray-600">Direct data collection enables 360-degree subscription customer insights and behavioral analysis</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Accurate Attribution & Measurement</div>
                        <div className="text-gray-600">First-party tracking provides accurate subscription attribution with 40% better targeting precision</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Subscription Business Data Strategy Benefits
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Customer Experience Personalization</div>
                    <div className="text-gray-600">
                      First-party data enables personalized subscription experiences, tailored creative messaging, 
                      and optimized customer journey design for higher conversion rates.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Strategic Competitive Advantage</div>
                    <div className="text-gray-600">
                      Proprietary customer intelligence creates competitive moats through better understanding 
                      of subscription customer behavior and preference patterns.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Sustainable Growth Foundation</div>
                    <div className="text-gray-600">
                      Privacy-compliant data collection ensures sustainable subscription marketing capabilities 
                      independent of third-party platform changes and regulations.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Collection Frameworks */}
      <section id="data-frameworks" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              4-Framework First-Party Data Collection System
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Comprehensive first-party data collection system for subscription businesses. 
              Each framework addresses specific data collection requirements while ensuring privacy compliance.
            </p>
            
            <div className="space-y-8">
              {dataFrameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
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
                    <h4 className="font-semibold text-gray-900 mb-3">Framework Components:</h4>
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

      {/* Data Types & Collection Strategy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Strategic Data Collection Categories for Subscription Intelligence
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Comprehensive data collection strategy covering all essential subscription business intelligence needs 
              while maintaining privacy compliance and customer trust.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {dataTypes.map((type, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.category}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Key Data Points:</div>
                      <div className="space-y-1">
                        {type.data_points.map((point, pointIndex) => (
                          <div key={pointIndex} className="flex items-start">
                            <CheckCircle className="h-3 w-3 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-xs text-gray-600">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-blue-800 mb-1">Weekly Intelligence Application:</div>
                      <div className="text-xs text-blue-700">{type.weekly_intelligence_use}</div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800 mb-1">Privacy Considerations:</div>
                      <div className="text-xs text-green-700">{type.privacy_considerations}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Framework */}
      <section id="compliance-guide" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Privacy Compliance Framework for Subscription Businesses
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Comprehensive privacy regulation compliance for subscription business data collection. 
              Navigate GDPR, CCPA, and global privacy requirements while maintaining effective marketing capabilities.
            </p>
            
            <div className="space-y-6">
              {complianceFramework.map((regulation, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{regulation.regulation}</h3>
                      <p className="text-sm text-gray-600">{regulation.scope}</p>
                    </div>
                    <div className="bg-blue-50 px-3 py-1 rounded-full">
                      <span className="text-blue-700 font-semibold text-xs">{regulation.implementation_priority}</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Requirements:</h4>
                      <div className="space-y-2">
                        {regulation.key_requirements.map((requirement, reqIndex) => (
                          <div key={reqIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Subscription Business Impact:</h4>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-sm text-blue-800">{regulation.subscription_impact}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Compliance Implementation Checklist</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Technical Implementation</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Consent management platform deployment with granular permission controls</li>
                    <li>• Cookie policy implementation and third-party cookie audit for compliance</li>
                    <li>• Data encryption and secure storage infrastructure for subscription customer data</li>
                    <li>• Automated data retention and deletion workflows for privacy compliance</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Legal & Process Implementation</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Privacy policy updates reflecting subscription business data practices</li>
                    <li>• Customer data rights request workflows and response procedures</li>
                    <li>• Data processing agreements with third-party vendors and service providers</li>
                    <li>• Privacy impact assessments for subscription marketing data collection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Build Privacy-First Data Intelligence for Subscription Growth
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform customer data into competitive advantage with privacy-compliant collection. 
              Access comprehensive data frameworks, compliance guides, and intelligence integration strategies.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Shield className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">95% Consent</div>
                <div className="text-blue-200 text-sm">Privacy compliance</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Database className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">360° Intelligence</div>
                <div className="text-blue-200 text-sm">Customer insights</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">40% Better</div>
                <div className="text-blue-200 text-sm">Targeting accuracy</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Data Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <Link
                href="/#service-tiers"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Data Intelligence Plans
                <Database className="h-5 w-5 ml-2" />
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
              Related Data & Analytics Intelligence Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/marketing-automation-weekly-creative-intelligence-setup"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Marketing Automation Setup</h3>
                <p className="text-sm text-gray-600">
                  Marketing automation integration with first-party data for intelligence optimization
                </p>
              </Link>
              
              <Link 
                href="/analytics-setup-weekly-creative-intelligence-tracking"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Analytics Setup Framework</h3>
                <p className="text-sm text-gray-600">
                  Analytics platform configuration for subscription business data tracking
                </p>
              </Link>
              
              <Link 
                href="/multi-touch-attribution-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Multi-Touch Attribution Framework</h3>
                <p className="text-sm text-gray-600">
                  Advanced attribution modeling with first-party data for subscription businesses
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}