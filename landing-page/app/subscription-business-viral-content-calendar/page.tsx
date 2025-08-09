import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { Calendar, TrendingUp, Target, CheckCircle, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Subscription Business Viral Content Calendar: 52 Week Strategy Template',
  description: 'Download the complete 52-week viral content calendar designed for subscription businesses. Includes trending formats, seasonal opportunities, and strategic campaign planning.',
  keywords: 'viral content calendar, subscription business content, 52 week content strategy, content planning template, subscription marketing calendar, viral content planning',
  openGraph: {
    title: 'Subscription Business Viral Content Calendar: 52 Week Strategy Template',
    description: 'Complete 52-week viral content calendar template designed specifically for subscription businesses.',
    type: 'article',
    publishedTime: '2024-01-18',
    authors: ['Apsics Media'],
  },
  alternates: {
    canonical: '/subscription-business-viral-content-calendar',
  },
};

export default function ViralContentCalendarPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                52-WEEK STRATEGIC CALENDAR
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Subscription Business Viral Content Calendar
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                The complete 52-week strategic content calendar designed specifically for subscription businesses. 
                Includes trending formats, seasonal opportunities, and Fortune 100 proven campaign strategies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="#download" className="btn bg-green-500 text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-400 transition-colors">
                  <Download className="h-5 w-5 mr-2" />
                  Download Calendar Template
                </Link>
                <Link href="#strategy" className="btn btn-secondary border-white text-white hover:bg-white/10">
                  See Strategic Framework
                </Link>
              </div>

              <div className="mt-12 grid md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">52</div>
                  <div className="text-green-200">Weeks Planned</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">200+</div>
                  <div className="text-green-200">Content Ideas</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">12</div>
                  <div className="text-green-200">Seasonal Campaigns</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">4</div>
                  <div className="text-green-200">Quarterly Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Strategic Content Calendar Overview
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                  Unlike generic content calendars, this system is built specifically for subscription businesses 
                  with focus on customer lifecycle, churn prevention, and recurring revenue optimization.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                  <Calendar className="h-12 w-12 text-blue-600 mb-6" />
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Weekly Intelligence Integration</h3>
                  <p className="text-blue-800 mb-4">
                    Every week includes trending format opportunities, competitor analysis insights, 
                    and platform-specific optimization recommendations.
                  </p>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Monday trend intelligence delivery</li>
                    <li>• Wednesday implementation guidelines</li>
                    <li>• Friday performance review framework</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                  <TrendingUp className="h-12 w-12 text-green-600 mb-6" />
                  <h3 className="text-xl font-bold text-green-900 mb-4">Subscription-Specific Campaigns</h3>
                  <p className="text-green-800 mb-4">
                    Strategic campaigns designed for key subscription business moments: onboarding, 
                    retention, upgrade opportunities, and churn prevention.
                  </p>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• New subscriber welcome sequences</li>
                    <li>• Retention milestone celebrations</li>
                    <li>• Upgrade opportunity campaigns</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
                  <Target className="h-12 w-12 text-purple-600 mb-6" />
                  <h3 className="text-xl font-bold text-purple-900 mb-4">Seasonal Viral Opportunities</h3>
                  <p className="text-purple-800 mb-4">
                    Pre-planned seasonal campaigns that capitalize on trending topics, holidays, 
                    and cultural moments with subscription business adaptation strategies.
                  </p>
                  <ul className="space-y-2 text-purple-700 text-sm">
                    <li>• Q1: New Year resolution campaigns</li>
                    <li>• Q2: Spring growth and renewal</li>
                    <li>• Q3: Back-to-school productivity</li>
                    <li>• Q4: Year-end optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Breakdown */}
        <section id="strategy" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Monthly Strategic Themes
                </h2>
                <p className="text-xl text-gray-600">
                  Each month focuses on specific subscription business objectives while maintaining viral content opportunities.
                </p>
              </div>

              <div className="grid lg:grid-cols-4 gap-6">
                {/* Q1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">
                      Q1
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">New Beginnings</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">January</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• New Year transformation content</li>
                        <li>• Goal-setting viral formats</li>
                        <li>• Fresh start campaign strategies</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">February</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Love/self-care themed content</li>
                        <li>• Relationship building (customer)</li>
                        <li>• Valentine's engagement boosts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">March</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Spring renewal campaigns</li>
                        <li>• Growth and progress themes</li>
                        <li>• Q1 success celebration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Q2 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">
                      Q2
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Growth & Expansion</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">April</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Easter/renewal viral content</li>
                        <li>• Spring cleaning metaphors</li>
                        <li>• Fresh perspective campaigns</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">May</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Mother's Day appreciation</li>
                        <li>• Gratitude and loyalty themes</li>
                        <li>• Spring growth momentum</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">June</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Summer readiness campaigns</li>
                        <li>• Father's Day content</li>
                        <li>• Mid-year optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Q3 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">
                      Q3
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Peak Performance</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">July</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Summer productivity themes</li>
                        <li>• Hot trending format adaptation</li>
                        <li>• Mid-year results celebration</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">August</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Back-to-school preparation</li>
                        <li>• Productivity and organization</li>
                        <li>• Late summer viral moments</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">September</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Fall preparation campaigns</li>
                        <li>• New season, new goals</li>
                        <li>• Q4 momentum building</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Q4 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">
                      Q4
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Optimization & Planning</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">October</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Halloween creative campaigns</li>
                        <li>• Transformation themes</li>
                        <li>• Autumn optimization</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">November</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Thanksgiving gratitude content</li>
                        <li>• Black Friday viral strategies</li>
                        <li>• Year-end preparation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">December</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Holiday season campaigns</li>
                        <li>• Year-end reflection content</li>
                        <li>• New year preparation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Structure */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Weekly Content Structure
                </h2>
                <p className="text-xl text-gray-600">
                  Systematic weekly framework ensuring consistent viral opportunities while maintaining strategic business objectives.
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
                <div className="grid lg:grid-cols-7 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="font-bold text-indigo-600 mb-2">MON</div>
                    <div className="text-sm text-gray-600">Trend Intelligence</div>
                    <div className="text-xs text-gray-500 mt-2">New concepts delivered</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="font-bold text-blue-600 mb-2">TUE</div>
                    <div className="text-sm text-gray-600">Educational Content</div>
                    <div className="text-xs text-gray-500 mt-2">Value-first approach</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="font-bold text-green-600 mb-2">WED</div>
                    <div className="text-sm text-gray-600">Viral Trend Adaptation</div>
                    <div className="text-xs text-gray-500 mt-2">Weekly trend execution</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="font-bold text-yellow-600 mb-2">THU</div>
                    <div className="text-sm text-gray-600">Behind the Scenes</div>
                    <div className="text-xs text-gray-500 mt-2">Authenticity building</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="font-bold text-orange-600 mb-2">FRI</div>
                    <div className="text-sm text-gray-600">Community Focus</div>
                    <div className="text-xs text-gray-500 mt-2">User-generated content</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="font-bold text-red-600 mb-2">SAT</div>
                    <div className="text-sm text-gray-600">Entertainment</div>
                    <div className="text-xs text-gray-500 mt-2">Weekend engagement</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="font-bold text-purple-600 mb-2">SUN</div>
                    <div className="text-sm text-gray-600">Inspiration</div>
                    <div className="text-xs text-gray-500 mt-2">Week ahead motivation</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Content Mix Optimization</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Trending formats:</span>
                      <span className="font-semibold text-green-600">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Educational value:</span>
                      <span className="font-semibold text-blue-600">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Brand storytelling:</span>
                      <span className="font-semibold text-purple-600">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Community engagement:</span>
                      <span className="font-semibold text-orange-600">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Entertainment:</span>
                      <span className="font-semibold text-red-600">10%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Success Metrics Tracking</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Engagement Rate</div>
                        <div className="text-sm text-gray-600">Weekly trend vs baseline content</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Conversion Impact</div>
                        <div className="text-sm text-gray-600">Lead generation and subscription signups</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Brand Awareness</div>
                        <div className="text-sm text-gray-600">Reach, impressions, and mention growth</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section id="download" className="py-16 bg-gradient-to-br from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Download Your Complete 52-Week Calendar
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Get the complete calendar template plus strategic implementation guide, trending format database, 
                and quarterly review frameworks. Everything you need for systematic viral content success.
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">What's Included</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <h4 className="font-semibold mb-3">Strategic Framework</h4>
                    <ul className="space-y-2 text-green-100 text-sm">
                      <li>• Complete 52-week calendar template</li>
                      <li>• Monthly strategic theme breakdowns</li>
                      <li>• Weekly content structure guidelines</li>
                      <li>• Seasonal campaign strategies</li>
                    </ul>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold mb-3">Implementation Tools</h4>
                    <ul className="space-y-2 text-green-100 text-sm">
                      <li>• Trending format database (200+ formats)</li>
                      <li>• Content optimization checklists</li>
                      <li>• Performance tracking templates</li>
                      <li>• Quarterly review frameworks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/free-hooks" className="btn bg-white text-green-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                  <Download className="h-5 w-5 mr-2" />
                  Download Free Calendar Template
                </Link>
                <Link href="/#service-tiers" className="btn border-white text-white hover:bg-white/10">
                  Get Weekly Intelligence Too
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>

              <p className="text-sm text-green-200 mt-6">
                Plus get weekly trend intelligence updates to keep your calendar fresh with the latest opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get Weekly Calendar Updates
              </h2>
              <p className="text-gray-600 mb-8">
                Subscribe to receive weekly content calendar updates and new trending opportunities for subscription businesses.
              </p>
              <EmailCaptureForm
                placeholder="Enter your work email"
                buttonText="Get Calendar Updates"
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