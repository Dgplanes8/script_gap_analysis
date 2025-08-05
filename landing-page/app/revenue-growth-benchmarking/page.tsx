import type { Metadata } from 'next';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { RevenueGrowthBenchmarkTool } from '@/components/calculators/revenue-growth-benchmark-tool';

export const metadata: Metadata = {
  title: 'Subscription Revenue Growth: Creative Strategy Benchmarking Tool | Strategic Ad Intelligence',
  description: 'Benchmark your creative strategy performance against industry leaders. Get personalized recommendations to accelerate subscription revenue growth.',
  keywords: 'creative strategy subscription revenue growth, subscription marketing benchmarks, revenue growth optimization, creative performance analysis',
  openGraph: {
    title: 'Subscription Revenue Growth: Creative Strategy Benchmarking Tool',
    description: 'Benchmark your creative strategy performance and get personalized recommendations to accelerate subscription revenue growth.',
    type: 'article',
  },
  alternates: {
    canonical: '/revenue-growth-benchmarking',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Subscription Revenue Growth: Creative Strategy Benchmarking Tool',
  description: 'Interactive benchmarking tool to optimize creative strategy for subscription revenue growth',
  author: {
    '@type': 'Organization',
    name: 'Strategic Ad Intelligence System',
    url: 'https://mondaymorningmarketer.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Strategic Ad Intelligence System',
    logo: {
      '@type': 'ImageObject',
      url: 'https://mondaymorningmarketer.com/logo.png'
    }
  },
  datePublished: '2024-01-15',
  dateModified: '2024-01-15',
};

export default function RevenueGrowthBenchmarkingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-indigo-600">Strategic Ad Intelligence</span>
              </div>
              <ConsultationBookingCTA variant="header" />
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-6">
              📊 Industry Benchmark Analysis
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Subscription Revenue Growth:
              <br />
              <span className="text-emerald-600">Creative Strategy Benchmarking Tool</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Compare your creative strategy performance against industry leaders and high-growth 
              subscription businesses. Get personalized insights and recommendations to accelerate 
              your revenue growth using Fortune 100 creative intelligence methodologies.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                500+ companies benchmarked
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Fortune 100 creative frameworks
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Personalized growth recommendations
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationBookingCTA 
                text="Get Free Growth Strategy Audit"
                variant="primary"
              />
              <button className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50">
                Get Weekly Benchmark Insights
              </button>
            </div>
          </div>
        </section>

        {/* Benchmark Categories */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Creative Strategy Performance Categories
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Audience Targeting</h3>
                <p className="text-gray-600 text-sm">
                  Precision in reaching high-value prospects through behavioral and firmographic targeting
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Message Resonance</h3>
                <p className="text-gray-600 text-sm">
                  Effectiveness of value propositions and creative messaging in driving engagement
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Creative Velocity</h3>
                <p className="text-gray-600 text-sm">
                  Speed and sophistication of creative testing and iteration processes
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Performance Optimization</h3>
                <p className="text-gray-600 text-sm">
                  Systematic approach to measuring and improving creative ROI and revenue impact
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benchmarking Tool */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Interactive Creative Strategy Benchmark Analysis
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Answer strategic questions about your current creative approach to receive a comprehensive 
                benchmark analysis and personalized growth recommendations.
              </p>
            </div>
            <RevenueGrowthBenchmarkTool />
          </div>
        </section>

        {/* Industry Insights */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              High-Growth Subscription Creative Strategy Insights
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Top Performers vs. Average Companies</h3>
                <div className="space-y-6">
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-emerald-800">Creative Testing Velocity</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Top 20%:</span>
                      <span className="font-bold text-emerald-600">15+ variants/month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Average:</span>
                      <span className="text-gray-600">3-5 variants/month</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-800">Customer Language Integration</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Top 20%:</span>
                      <span className="font-bold text-blue-600">Voice-of-customer driven</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Average:</span>
                      <span className="text-gray-600">Internal assumptions</span>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-purple-800">Attribution Sophistication</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Top 20%:</span>
                      <span className="font-bold text-purple-600">Multi-touch modeling</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Average:</span>
                      <span className="text-gray-600">Last-click attribution</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6">Strategic Creative Approach Benefits</h3>
                <div className="space-y-6">
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4 text-emerald-800">Systematic Creative Strategy Advantages</h4>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-start">
                        <span className="text-emerald-500 mr-2 mt-1">✓</span>
                        <span>Consistent testing framework reduces guesswork and improves decision speed</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-emerald-500 mr-2 mt-1">✓</span>
                        <span>Customer language integration creates more resonant messaging</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-emerald-500 mr-2 mt-1">✓</span>
                        <span>Multi-touch attribution provides clearer ROI visibility</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-emerald-500 mr-2 mt-1">✓</span>
                        <span>Systematic optimization prevents ad fatigue and creative stagnation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4 text-blue-800">Our Expert Methodology</h4>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>Accelerated testing cycles through expert creative analysis with AI research</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>Automated competitor intelligence for strategic positioning</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>Trend analysis integration for timely creative adaptations</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>Speed-to-market advantage with 48-hour creative development</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Success Factors */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                5 Key Success Factors for High-Growth Creative Strategy
              </h3>
              <div className="grid md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Systematic Testing</h4>
                  <p className="text-sm text-gray-600">Structured A/B testing with statistical significance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Customer Language</h4>
                  <p className="text-sm text-gray-600">Voice-of-customer research driving creative development</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Creative Velocity</h4>
                  <p className="text-sm text-gray-600">Rapid iteration and optimization cycles</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    4
                  </div>
                  <h4 className="font-semibold mb-2">Attribution Modeling</h4>
                  <p className="text-sm text-gray-600">Accurate measurement of creative performance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    5
                  </div>
                  <h4 className="font-semibold mb-2">Strategic Integration</h4>
                  <p className="text-sm text-gray-600">Creative strategy aligned with business objectives</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Lead Generation Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Get Your Personalized Creative Strategy Benchmark Report
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Receive a comprehensive analysis of your creative strategy performance compared to industry 
              leaders, plus actionable recommendations for accelerating revenue growth.
            </p>
            
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto mb-8">
              <EmailCaptureForm
                placeholder="Enter your business email"
                buttonText="Get Benchmark Report"
                variant="cta"
                source="revenue-growth-benchmarking"
              />
              <div className="text-sm text-gray-600 mt-4">
                ✓ Industry benchmark comparison<br />
                ✓ Performance gap analysis<br />
                ✓ Strategic recommendations<br />
                ✓ Free growth strategy consultation
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationBookingCTA 
                variant="secondary" 
                text="Book Free Growth Strategy Session"
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
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col min-h-[200px]">
                <h3 className="text-lg font-semibold mb-3">CAC Reduction Implementation Guide</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Step-by-step framework to reduce customer acquisition costs by 30-50%.
                </p>
                <a href="/cac-reduction-guide" className="text-emerald-600 font-semibold hover:underline mt-auto">
                  Read Guide →
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col min-h-[200px]">
                <h3 className="text-lg font-semibold mb-3">Expert Creative Intelligence Tools</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Automated creative analysis and competitor intelligence for strategic advantage.
                </p>
                <a href="/saas-creative-strategy-roi-calculator" className="text-emerald-600 font-semibold hover:underline mt-auto">
                  Explore Tools →
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col min-h-[200px]">
                <h3 className="text-lg font-semibold mb-3">Creative Strategy ROI Calculator</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Calculate the potential ROI of implementing systematic creative strategy.
                </p>
                <a href="/saas-creative-strategy-roi-calculator" className="text-emerald-600 font-semibold hover:underline mt-auto">
                  Use Calculator →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content Navigation */}
        <ContentNavigation 
          currentPath="/revenue-growth-benchmarking" 
          variant="horizontal"
        />
      </div>
    </>
  );
}