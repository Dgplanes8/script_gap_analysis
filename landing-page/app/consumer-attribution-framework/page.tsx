import type { Metadata } from 'next';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { ConsumerAttributionModelingTool } from '@/components/calculators/consumer-attribution-modeling-tool';
import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Consumer Subscription Attribution Framework | D2C Marketing Attribution Guide',
  description: 'Master D2C attribution modeling for consumer subscription brands. Implement multi-touch attribution, optimize marketing spend, and drive subscriber growth with consumer-focused frameworks.',
  keywords: 'D2C attribution modeling, consumer subscription marketing, multi-touch attribution D2C, D2C marketing analytics, consumer brand attribution, subscription marketing attribution, D2C CAC optimization',
  openGraph: {
    title: 'Consumer Subscription Attribution Framework | D2C Marketing Attribution',
    description: 'Complete guide to multi-touch attribution modeling for consumer subscription businesses. Accurate CAC measurement for D2C brands.',
    type: 'article',
  },
  alternates: {
    canonical: '/consumer-attribution-framework',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Consumer Subscription Attribution Framework for D2C Brands',
  description: 'Technical framework guide for implementing multi-touch attribution modeling in consumer subscription businesses',
  author: {
    '@type': 'Organization',
    name: 'Apsics Media',
    url: 'https://apsicsmedia.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Apsics Media',
    logo: {
      '@type': 'ImageObject',
      url: 'https://mondaymorningmarketer.com/logo.png'
    }
  },
  datePublished: '2024-01-15',
  dateModified: '2024-01-15',
};

export default function ConsumerAttributionFrameworkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className="pt-24 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold mb-6">
              🎯 D2C Attribution Framework
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Consumer Subscription Attribution Framework
              <br />
              <span className="text-purple-600">for D2C Brands</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Implement sophisticated multi-touch attribution modeling to accurately measure CAC, 
              optimize marketing spend, and drive subscriber growth. Designed specifically for 
              consumer subscription businesses and D2C brands.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Cross-platform attribution models
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Customer lifetime value tracking
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                D2C implementation templates
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationBookingCTA 
                text="Get Free D2C Attribution Audit"
                variant="primary"
              />
              <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50">
                Get Weekly D2C Insights
              </button>
            </div>
          </div>
        </section>

        {/* Attribution Models Overview */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              D2C Attribution Model Comparison
            </h2>
            
            <div className="grid md:grid-cols-5 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-red-600 font-bold">LC</span>
                  </div>
                  <h3 className="font-semibold text-red-800">Last Click</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="text-red-600">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Complexity:</span>
                    <span className="text-green-600">Simple</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Use Case:</span>
                    <span className="text-gray-800">Basic tracking</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-yellow-600 font-bold">FC</span>
                  </div>
                  <h3 className="font-semibold text-yellow-800">First Click</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="text-yellow-600">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Complexity:</span>
                    <span className="text-green-600">Simple</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Use Case:</span>
                    <span className="text-gray-800">Brand awareness</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">LN</span>
                  </div>
                  <h3 className="font-semibold text-blue-800">Linear</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="text-blue-600">Medium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Complexity:</span>
                    <span className="text-yellow-600">Moderate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Use Case:</span>
                    <span className="text-gray-800">Equal weight</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold">MT</span>
                  </div>
                  <h3 className="font-semibold text-purple-800">Multi-Touch</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="text-green-600">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Complexity:</span>
                    <span className="text-red-600">Advanced</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Use Case:</span>
                    <span className="text-gray-800">Customer journey</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">MM</span>
                  </div>
                  <h3 className="font-semibold text-green-800">Mixed Media Model</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="text-green-600">Very High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Complexity:</span>
                    <span className="text-red-600">Expert</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Use Case:</span>
                    <span className="text-gray-800">Omnichannel brands</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-gray-800 text-sm">
                  <strong>For D2C brands, multi-touch attribution is essential</strong> due to complex customer 
                  journeys across multiple touchpoints including social media, influencers, email, and paid ads.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Attribution Modeling Tool */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                D2C Attribution Model Calculator & Setup Tool
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Configure your attribution model parameters for consumer subscription channels and see the impact 
                on CAC calculation and budget allocation decisions.
              </p>
            </div>
            <ConsumerAttributionModelingTool />
          </div>
        </section>

        {/* Implementation Framework */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              D2C Multi-Touch Attribution Implementation Framework
            </h2>
            
            {/* Phase 1 */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Cross-Platform Tracking Setup</h3>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h4 className="text-lg font-semibold mb-4">Consumer Journey Mapping</h4>
                <p className="text-gray-700 mb-6">
                  Consumer subscription journeys are complex, spanning multiple touchpoints from social discovery 
                  to subscription conversion. Map all critical interactions across the customer lifecycle.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-semibold mb-3">Essential D2C Touchpoints:</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Social media discovery (Instagram, TikTok, Facebook)
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Influencer content and recommendations
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Paid social advertising clicks and engagement
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Email marketing and SMS campaigns
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Referral program interactions
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Content consumption and reviews
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3">Technical Implementation:</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Cross-platform pixel implementation
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        UTM parameter standardization
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Customer ID linking across touchpoints
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Subscription lifecycle event tracking
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        LTV and retention data integration
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        First-party data collection setup
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Consumer-Focused Attribution Model Selection</h3>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h4 className="text-lg font-semibold mb-4">Choosing the Right Model for D2C</h4>
                <p className="text-gray-700 mb-6">
                  Consumer subscription businesses need attribution models that account for social influence, 
                  word-of-mouth, and the emotional decision-making process typical in D2C purchases.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3 text-purple-800">Time-Decay Model</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      More credit to touchpoints closer to subscription
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Best for:</strong> Impulse-driven consumer purchases
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3 text-purple-800">Position-Based Model</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      40% discovery, 40% conversion, 20% consideration
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Best for:</strong> Discovery-driven subscription brands
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3 text-purple-800">Data-Driven Model</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      ML-based credit using consumer behavior data
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Best for:</strong> High-volume D2C subscription brands
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">LTV Attribution & Retention Optimization</h3>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h4 className="text-lg font-semibold mb-4">Connecting Attribution to Subscriber Value</h4>
                <p className="text-gray-700 mb-6">
                  For subscription businesses, attribution must connect to lifetime value and retention, 
                  not just initial conversion. Optimize for subscriber quality, not just quantity.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3">LTV-Based CAC Calculation</h5>
                    <div className="bg-purple-50 p-4 rounded font-mono text-sm mb-4">
                      Channel LTV CAC = (Channel Spend × Attribution Weight) / (Attributed Subscribers × Avg LTV)
                    </div>
                    <p className="text-gray-600 text-sm">
                      Calculate the true cost per dollar of lifetime value, accounting for retention differences 
                      across acquisition channels.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3">Channel Quality Optimization</h5>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Analyze retention rates by acquisition channel</li>
                      <li>• Track subscription upgrade/downgrade patterns</li>
                      <li>• Optimize for high-LTV customer segments</li>
                      <li>• Balance acquisition volume with subscriber quality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Checklist */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              D2C Attribution Implementation Checklist
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-purple-600">Technical Setup</h3>
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Implement cross-platform tracking pixels</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Set up UTM parameter strategy for all channels</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Configure customer ID linking across platforms</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Implement subscription lifecycle event tracking</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Set up first-party data collection system</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Create attribution calculation automation</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6 text-purple-600">Business Process</h3>
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Map complete consumer subscription journey</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Select appropriate attribution model for D2C</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Integrate LTV and retention data with attribution</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Build LTV-based CAC calculation framework</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Create subscriber quality performance dashboards</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Establish monthly attribution review process</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Get Your D2C Attribution Implementation Toolkit
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Download our comprehensive toolkit including platform setup guides, tracking templates, 
              and consumer-focused attribution strategies.
            </p>
            
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto mb-8">
              <EmailCaptureForm
                placeholder="Enter your business email"
                buttonText="Get D2C Attribution Toolkit"
                variant="cta"
                source="consumer-attribution-framework"
              />
              <div className="text-sm text-gray-600 mt-4">
                ✓ D2C implementation guide<br />
                ✓ Cross-platform tracking setup<br />
                ✓ Consumer attribution templates<br />
                ✓ Free D2C attribution consultation
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationBookingCTA 
                variant="secondary" 
                text="Book Free D2C Attribution Strategy Session"
              />
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Related D2C Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Consumer Subscription Marketing Guide</h3>
                <p className="text-gray-600 mb-4">
                  Complete channel optimization guide for D2C subscription businesses.
                </p>
                <a href="/consumer-subscription-marketing-guide" className="text-purple-600 font-semibold hover:underline">
                  Read Guide →
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Revenue Growth Benchmarking</h3>
                <p className="text-gray-600 mb-4">
                  Compare your D2C attribution sophistication against industry leaders.
                </p>
                <a href="/revenue-growth-benchmarking" className="text-purple-600 font-semibold hover:underline">
                  Take Assessment →
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">SaaS Attribution Framework</h3>
                <p className="text-gray-600 mb-4">
                  Multi-touch attribution framework designed for B2B SaaS companies.
                </p>
                <a href="/marketing-attribution-framework" className="text-purple-600 font-semibold hover:underline">
                  View SaaS Framework →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content Navigation */}
        <ContentNavigation 
          currentPath="/consumer-attribution-framework" 
          variant="horizontal"
        />
      </div>
    </>
  );
}