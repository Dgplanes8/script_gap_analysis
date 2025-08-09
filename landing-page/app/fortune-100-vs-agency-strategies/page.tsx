import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { Building2, TrendingUp, Target, Users, ArrowRight, CheckCircle, X, DollarSign } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fortune 100 vs Agency Creative Strategies: What Subscription Businesses Should Know',
  description: 'Compare Fortune 100 systematic creative strategies vs traditional agency approaches. Learn why subscription businesses need enterprise-level methodology for consistent growth.',
  keywords: 'Fortune 100 marketing, agency comparison, subscription business strategy, creative methodology, systematic approach, enterprise marketing strategies',
  openGraph: {
    title: 'Fortune 100 vs Agency Creative Strategies for Subscription Businesses',
    description: 'Discover why Fortune 100 systematic approach outperforms traditional agencies for subscription business growth.',
    type: 'article',
    publishedTime: '2024-01-16',
    authors: ['Apsics Media'],
  },
  alternates: {
    canonical: '/fortune-100-vs-agency-strategies',
  },
};

export default function Fortune100VsAgencyPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Building2 className="h-4 w-4 mr-2" />
                ENTERPRISE VS AGENCY ANALYSIS
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Fortune 100 vs Agency Creative Strategies
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Why subscription businesses need systematic enterprise methodology over traditional agency creative approaches. 
                Based on $100M+ ad spend analysis across Fortune 100 companies and agency partnerships.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="#comparison" className="btn bg-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-lg hover:bg-yellow-400 transition-colors">
                  <Target className="h-5 w-5 mr-2" />
                  See Complete Comparison
                </Link>
                <Link href="#methodology" className="btn btn-secondary">
                  Learn Fortune 100 Method
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differences Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  The Fundamental Difference
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                  Traditional agencies focus on creative execution. Fortune 100 companies focus on systematic business transformation. 
                  For subscription businesses, this difference determines long-term success or failure.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Traditional Agency Approach */}
                <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-500 rounded-full p-3 mr-4">
                      <X className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-900">Traditional Agency Approach</h3>
                  </div>
                  
                  <div className="space-y-4 text-red-800">
                    <div className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Reactive Creative:</strong> Wait for client requests, then brainstorm ideas based on limited brief information.
                      </div>
                    </div>
                    <div className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Inconsistent Delivery:</strong> 2-4 week turnaround times with variable quality depending on account team availability.
                      </div>
                    </div>
                    <div className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Limited Strategic Context:</strong> Focus on individual campaigns rather than systematic business growth.
                      </div>
                    </div>
                    <div className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Generic Solutions:</strong> Apply similar creative approaches across different industries and business models.
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-red-100 rounded-lg">
                    <p className="text-red-800 font-semibold text-center">
                      Result: Creative guesswork with inconsistent performance and no systematic improvement.
                    </p>
                  </div>
                </div>

                {/* Fortune 100 Approach */}
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-600 rounded-full p-3 mr-4">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900">Fortune 100 Systematic Approach</h3>
                  </div>
                  
                  <div className="space-y-4 text-green-800">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Proactive Intelligence:</strong> Continuous market analysis, trend monitoring, and strategic planning before creative needs arise.
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Weekly Systematic Delivery:</strong> Consistent Monday delivery schedule with standardized quality and strategic alignment.
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Business Transformation Focus:</strong> Every creative decision aligns with long-term subscription business objectives.
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Subscription-Specific Methodology:</strong> 11-phase system designed specifically for recurring revenue models.
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-green-100 rounded-lg">
                    <p className="text-green-800 font-semibold text-center">
                      Result: Strategic creative intelligence with measurable business impact and continuous improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section id="comparison" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Side-by-Side Comparison
                </h2>
                <p className="text-xl text-gray-600">
                  Detailed analysis across key performance indicators for subscription business success.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Key Factor</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-red-600">Traditional Agency</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">Fortune 100 Method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-900">Delivery Timeline</td>
                        <td className="px-6 py-4 text-center text-red-600">2-4 weeks</td>
                        <td className="px-6 py-4 text-center text-green-600">Every Monday (weekly)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">Creative Concepts per Month</td>
                        <td className="px-6 py-4 text-center text-red-600">2-4 concepts</td>
                        <td className="px-6 py-4 text-center text-green-600">4-16 concepts</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-900">Monthly Investment</td>
                        <td className="px-6 py-4 text-center text-red-600">$5,000-15,000</td>
                        <td className="px-6 py-4 text-center text-green-600">$67-497</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">Strategic Planning</td>
                        <td className="px-6 py-4 text-center text-red-600">Quarterly reviews</td>
                        <td className="px-6 py-4 text-center text-green-600">Weekly intelligence</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-900">Competitor Analysis</td>
                        <td className="px-6 py-4 text-center text-red-600">On request basis</td>
                        <td className="px-6 py-4 text-center text-green-600">Integrated weekly</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">Trend Intelligence</td>
                        <td className="px-6 py-4 text-center text-red-600">Reactive to trends</td>
                        <td className="px-6 py-4 text-center text-green-600">Proactive trend capture</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-900">Subscription Focus</td>
                        <td className="px-6 py-4 text-center text-red-600">Generic approach</td>
                        <td className="px-6 py-4 text-center text-green-600">Subscription-specific</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">Performance Tracking</td>
                        <td className="px-6 py-4 text-center text-red-600">Campaign-level</td>
                        <td className="px-6 py-4 text-center text-green-600">Business transformation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Comparison */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Real-World Performance Comparison
                </h2>
                <p className="text-xl text-gray-600">
                  Same subscription business, different approaches. Results speak for themselves.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Agency Results */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-red-900 mb-6">6 Months with Traditional Agency</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Creative Concepts Delivered</span>
                        <span className="text-2xl font-bold text-red-600">18</span>
                      </div>
                      <div className="text-sm text-gray-600">3 concepts per month average</div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Customer Acquisition Cost</span>
                        <span className="text-2xl font-bold text-red-600">+15%</span>
                      </div>
                      <div className="text-sm text-gray-600">CAC increased due to creative fatigue</div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Campaign Performance</span>
                        <span className="text-2xl font-bold text-red-600">Declining</span>
                      </div>
                      <div className="text-sm text-gray-600">CTR decreased 23% over 6 months</div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Total Investment</span>
                        <span className="text-2xl font-bold text-red-600">$54,000</span>
                      </div>
                      <div className="text-sm text-gray-600">$9,000/month average spend</div>
                    </div>
                  </div>
                </div>

                {/* Fortune 100 Results */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-green-900 mb-6">6 Months with Fortune 100 Method</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Creative Concepts Delivered</span>
                        <span className="text-2xl font-bold text-green-600">72</span>
                      </div>
                      <div className="text-sm text-gray-600">3 concepts weekly (12 per month)</div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Customer Acquisition Cost</span>
                        <span className="text-2xl font-bold text-green-600">-34%</span>
                      </div>
                      <div className="text-sm text-gray-600">CAC reduced through trend optimization</div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Campaign Performance</span>
                        <span className="text-2xl font-bold text-green-600">Improving</span>
                      </div>
                      <div className="text-sm text-gray-600">CTR increased 67% over 6 months</div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Total Investment</span>
                        <span className="text-2xl font-bold text-green-600">$5,964</span>
                      </div>
                      <div className="text-sm text-gray-600">$994/month for Competitive Edge tier</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">The Bottom Line</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold mb-2">300%</div>
                      <div className="text-indigo-200">More Creative Concepts</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">89%</div>
                      <div className="text-indigo-200">Lower Investment</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">49%</div>
                      <div className="text-indigo-200">Better Performance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Difference Matters */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Why This Difference Matters for Subscription Businesses
                </h2>
                <p className="text-xl text-gray-300">
                  Subscription businesses have unique challenges that require systematic solutions, not creative guesswork.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-yellow-500 rounded-full p-3 mr-6 flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">High Customer Acquisition Costs</h3>
                    <p className="text-gray-300">
                      Subscription businesses typically have CACs 3-5x higher than one-time purchase models. 
                      Creative fatigue happens in 7-14 days, requiring constant fresh concepts. Agencies can't keep up 
                      with weekly delivery needs, leading to recycled creative and increased costs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-500 rounded-full p-3 mr-6 flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Churn Prevention Requirements</h3>
                    <p className="text-gray-300">
                      Subscription businesses must continuously prove value to prevent churn. This requires consistent 
                      engagement through fresh, relevant content. Fortune 100 systematic approach ensures every creative 
                      piece serves both acquisition and retention objectives simultaneously.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-3 mr-6 flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Lifetime Value Optimization</h3>
                    <p className="text-gray-300">
                      Every creative decision impacts long-term customer value, not just initial conversion. 
                      Traditional agencies optimize for campaign metrics. Fortune 100 methodology optimizes for 
                      business transformation and sustainable growth across the entire customer lifecycle.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-500 rounded-full p-3 mr-6 flex-shrink-0">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Scale and Consistency Needs</h3>
                    <p className="text-gray-300">
                      Successful subscription businesses require systematic, scalable processes that maintain quality 
                      under growth pressure. Ad-hoc agency creative can't scale. Fortune 100 systematic approach 
                      maintains strategic consistency while adapting to market changes and business evolution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready for Fortune 100 Systematic Approach?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Stop paying agency premiums for inconsistent results. Get the same systematic methodology used by 
                Fortune 100 companies, delivered weekly starting at $67/month.
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">Traditional Agency</div>
                    <div className="space-y-2 text-indigo-200">
                      <div>$5,000-15,000/month</div>
                      <div>2-4 week delivery</div>
                      <div>2-4 concepts/month</div>
                      <div>Generic approach</div>
                    </div>
                  </div>
                  <div className="text-center border-l border-white/20">
                    <div className="text-3xl font-bold mb-2">Fortune 100 Method</div>
                    <div className="space-y-2 text-green-200">
                      <div>$67-497/month</div>
                      <div>Weekly Monday delivery</div>
                      <div>4-16 concepts/month</div>
                      <div>Subscription-specific</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/free-hooks" className="btn bg-white text-indigo-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                  Get 10 Free Hooks First
                </Link>
                <Link href="/#service-tiers" className="btn btn-secondary">
                  Compare Weekly Plans
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get Fortune 100 Strategy Insights
              </h2>
              <p className="text-gray-600 mb-8">
                Subscribe to receive weekly Fortune 100 strategy insights and systematic approaches for subscription business growth.
              </p>
              <EmailCaptureForm
                placeholder="Enter your work email"
                buttonText="Get Strategy Insights"
                variant="cta"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}