import type { Metadata } from 'next';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { AttributionModelingTool } from '@/components/calculators/attribution-modeling-tool';
import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Advanced Marketing Attribution Framework for SaaS Companies | Strategic Ad Intelligence',
  description: 'Master multi-touch attribution modeling for SaaS companies. Implement advanced CAC measurement, optimize marketing spend, and drive revenue growth with Fortune 100 attribution methodologies.',
  keywords: 'SaaS marketing attribution, multi-touch attribution framework, B2B attribution modeling, CAC optimization, marketing attribution software, revenue attribution tracking, SaaS marketing analytics',
  openGraph: {
    title: 'Advanced Marketing Attribution Framework for SaaS Companies',
    description: 'Complete guide to multi-touch attribution modeling for subscription businesses. Accurate CAC measurement and revenue attribution.',
    type: 'article',
  },
  alternates: {
    canonical: '/marketing-attribution-framework',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Advanced Marketing Attribution Framework for SaaS Companies',
  description: 'Technical framework guide for implementing multi-touch attribution modeling in subscription businesses',
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

export default function MarketingAttributionFrameworkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className="pt-24 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-6">
              🔍 Advanced Analytics Framework
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Advanced Marketing Attribution Framework
              <br />
              <span className="text-purple-600">for SaaS Companies</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Implement sophisticated multi-touch attribution modeling to accurately measure CAC, 
              optimize marketing spend, and drive revenue growth. Based on Fortune 100 attribution 
              methodologies adapted for subscription businesses.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Multi-touch attribution models
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Revenue attribution tracking
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Implementation templates
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationBookingCTA 
                text="Get Free Attribution Audit"
                variant="primary"
              />
              <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50">
                Get Weekly Attribution Insights
              </button>
            </div>
          </div>
        </section>

        {/* Attribution Models Overview */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Attribution Model Comparison
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
                    <span className="text-gray-800">Awareness focus</span>
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
                    <span className="text-gray-800">Revenue focus</span>
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
                    <span className="text-gray-800">Enterprise scale</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-gray-800 text-sm">
                  <strong>The right attribution model depends on your business stage and data maturity.</strong> 
                  Start with what you can implement effectively, then evolve as your organization grows.
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
                Attribution Model Calculator & Setup Tool
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Configure your attribution model parameters and see the impact on CAC calculation 
                and budget allocation decisions.
              </p>
            </div>
            <AttributionModelingTool />
          </div>
        </section>

        {/* Implementation Framework */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Multi-Touch Attribution Implementation Framework
            </h2>
            
            {/* Phase 1 */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Data Foundation & Tracking Setup</h3>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h4 className="text-lg font-semibold mb-4">Customer Journey Mapping</h4>
                <p className="text-gray-700 mb-6">
                  Before implementing attribution, map all customer touchpoints from awareness 
                  to conversion and beyond. This foundation ensures no critical interactions are missed.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-semibold mb-3">Essential Touchpoints to Track:</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Organic search visits and keyword analysis
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Paid advertising clicks (Google, LinkedIn, Facebook)
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Email marketing engagement and clicks
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Content downloads and resource interactions
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Webinar attendance and demo requests
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Social media engagement and referrals
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3">Technical Implementation:</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        UTM parameter standardization across channels
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Cross-domain tracking implementation
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Customer ID linking and deduplication
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Event tracking for micro-conversions
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Revenue and LTV data integration
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        Data warehouse setup for attribution modeling
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
                <h3 className="text-2xl font-bold text-gray-900">Attribution Model Selection & Configuration</h3>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h4 className="text-lg font-semibold mb-4">Choosing the Right Attribution Model</h4>
                <p className="text-gray-700 mb-6">
                  Different business models and customer journeys require different attribution approaches. 
                  Select and configure the model that best reflects your customer acquisition reality.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3 text-purple-800">Time-Decay Model</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      More credit to touchpoints closer to conversion
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Best for:</strong> Long sales cycles, complex B2B purchases
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3 text-purple-800">Position-Based Model</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      40% first touch, 40% last touch, 20% middle
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Best for:</strong> Balanced awareness and conversion focus
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3 text-purple-800">Data-Driven Model</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      ML-based credit assignment using conversion data
                    </p>
                    <div className="text-xs text-gray-500">
                      <strong>Best for:</strong> High-volume, mature attribution programs
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
                <h3 className="text-2xl font-bold text-gray-900">Revenue Attribution & CAC Optimization</h3>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h4 className="text-lg font-semibold mb-4">Connecting Attribution to Business Outcomes</h4>
                <p className="text-gray-700 mb-6">
                  Transform attribution data into actionable insights for budget allocation, 
                  channel optimization, and revenue forecasting.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3">CAC Calculation with Attribution</h5>
                    <div className="bg-purple-50 p-4 rounded font-mono text-sm mb-4">
                      Channel CAC = (Channel Spend × Attribution Weight) / Attributed Conversions
                    </div>
                    <p className="text-gray-600 text-sm">
                      Instead of simple last-click CAC, calculate the true cost based on each channel's 
                      attributed contribution to conversions.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3">Budget Optimization Framework</h5>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Reallocate budget to channels with lowest attributed CAC</li>
                      <li>• Identify high-assist channels that support conversion</li>
                      <li>• Optimize creative and messaging for multi-touch journey</li>
                      <li>• Scale channels with best LTV:CAC ratios</li>
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
              Attribution Implementation Checklist
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-purple-600">Technical Setup</h3>
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Implement comprehensive UTM parameter strategy</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Set up cross-domain tracking for all touchpoints</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Configure customer ID linking and deduplication</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Implement event tracking for all micro-conversions</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Set up data warehouse for attribution processing</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Create automated attribution calculation scripts</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6 text-purple-600">Business Process</h3>
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Map complete customer journey and touchpoints</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Select appropriate attribution model for business</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Integrate revenue and LTV data with attribution</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Build attribution-based CAC calculation framework</span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">Create channel performance dashboards</span>
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
              Get Your Complete Attribution Implementation Toolkit
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Download our comprehensive toolkit including technical specifications, SQL queries, 
              data schema templates, and step-by-step implementation guides.
            </p>
            
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto mb-8">
              <EmailCaptureForm
                placeholder="Enter your business email"
                buttonText="Get Attribution Toolkit"
                variant="cta"
                source="marketing-attribution-framework"
              />
              <div className="text-sm text-gray-600 mt-4">
                ✓ Technical implementation guide<br />
                ✓ SQL queries and data schema<br />
                ✓ Attribution model templates<br />
                ✓ Free attribution strategy consultation
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationBookingCTA 
                variant="secondary" 
                text="Book Free Attribution Strategy Session"
              />
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Related Strategic Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">CAC Reduction Implementation Guide</h3>
                <p className="text-gray-600 mb-4">
                  Use attribution insights to systematically reduce customer acquisition costs.
                </p>
                <a href="/cac-optimization-calculator" className="text-purple-600 font-semibold hover:underline">
                  Read Guide →
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Revenue Growth Benchmarking</h3>
                <p className="text-gray-600 mb-4">
                  Compare your attribution sophistication against industry leaders.
                </p>
                <a href="/revenue-growth-benchmarking" className="text-purple-600 font-semibold hover:underline">
                  Take Assessment →
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Consumer Attribution Framework</h3>
                <p className="text-gray-600 mb-4">
                  Multi-touch attribution specialized for D2C and consumer subscription brands.
                </p>
                <a href="/consumer-attribution-framework" className="text-purple-600 font-semibold hover:underline">
                  View D2C Framework →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content Navigation */}
        <ContentNavigation 
          currentPath="/marketing-attribution-framework" 
          variant="horizontal"
        />
      </div>
    </>
  );
}