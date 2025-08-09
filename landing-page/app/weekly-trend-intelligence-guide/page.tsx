import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { TrendingUp, Target, Users, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Weekly Trend Intelligence Guide for Subscription Businesses | Apsics Media',
  description: 'Complete guide to weekly trend intelligence for subscription businesses. Learn Fortune 100 strategies for viral content creation, competitor analysis, and weekly creative delivery systems.',
  keywords: 'weekly trend intelligence, subscription business marketing, Fortune 100 marketing, viral content strategy, competitor analysis, weekly creative delivery',
  openGraph: {
    title: 'Weekly Trend Intelligence Guide for Subscription Businesses',
    description: 'Complete guide to Fortune 100 weekly trend intelligence strategies for subscription business growth.',
    type: 'article',
    publishedTime: '2024-01-15',
    authors: ['Apsics Media'],
  },
  alternates: {
    canonical: '/weekly-trend-intelligence-guide',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Weekly Trend Intelligence Guide for Subscription Businesses',
  description: 'Complete guide to weekly trend intelligence for subscription businesses using Fortune 100 strategies.',
  author: {
    '@type': 'Organization',
    name: 'Apsics Media',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Apsics Media',
    logo: {
      '@type': 'ImageObject',
      url: 'https://apsicsmedia.com/images/logo.png'
    }
  },
  datePublished: '2024-01-15',
  dateModified: '2024-01-15',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://apsicsmedia.com/weekly-trend-intelligence-guide'
  }
};

export default function WeeklyTrendIntelligenceGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <TrendingUp className="h-4 w-4 mr-2" />
                FORTUNE 100 STRATEGY GUIDE
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Weekly Trend Intelligence Guide for Subscription Businesses
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn the systematic approach used by Fortune 100 companies to deliver trending creative concepts every week. 
                Transform your subscription business with data-driven trend intelligence and competitor analysis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="#guide" className="btn btn-primary">
                  <Target className="h-5 w-5 mr-2" />
                  Read Complete Guide
                </Link>
                <Link href="#service-tiers" className="btn btn-secondary">
                  Get Weekly Intelligence
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <a href="#what-is-trend-intelligence" className="text-indigo-600 hover:underline">What is Weekly Trend Intelligence?</a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <a href="#fortune-100-approach" className="text-indigo-600 hover:underline">Fortune 100 Systematic Approach</a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <a href="#subscription-business-benefits" className="text-indigo-600 hover:underline">Subscription Business Benefits</a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <a href="#weekly-workflow" className="text-indigo-600 hover:underline">Weekly Intelligence Workflow</a>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <a href="#competitor-analysis" className="text-indigo-600 hover:underline">Competitor Analysis Framework</a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <a href="#implementation-guide" className="text-indigo-600 hover:underline">Implementation Roadmap</a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <a href="#success-metrics" className="text-indigo-600 hover:underline">Success Metrics & KPIs</a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <a href="#common-mistakes" className="text-indigo-600 hover:underline">Common Implementation Mistakes</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article id="guide" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              
              <section id="what-is-trend-intelligence" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">What is Weekly Trend Intelligence?</h2>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Weekly trend intelligence is a systematic approach to identifying, analyzing, and adapting trending content formats 
                  for your subscription business every single week. Unlike traditional quarterly or monthly creative planning, 
                  this methodology ensures your content stays relevant to what's working RIGHT NOW on social media platforms.
                </p>

                <div className="bg-indigo-50 rounded-xl p-8 mb-8">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-4">Why Weekly? The Science Behind Trend Cycles</h3>
                  <p className="text-indigo-800 mb-4">
                    Social media trends have an average lifespan of 5-14 days before they peak and decline. Traditional monthly 
                    creative cycles miss 75% of trending opportunities. Weekly intelligence ensures you capture trends during 
                    their growth phase, not after they've peaked.
                  </p>
                  <ul className="list-disc list-inside text-indigo-800 space-y-2">
                    <li>TikTok trend peak: 7-10 days average</li>
                    <li>Instagram Reel trend cycle: 5-12 days</li>
                    <li>Twitter trend lifespan: 2-7 days</li>
                    <li>LinkedIn content trend: 10-14 days</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Three Pillars of Trend Intelligence</h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <TrendingUp className="h-8 w-8 text-indigo-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-3">1. Trend Identification</h4>
                    <p className="text-gray-600 text-sm">
                      Real-time monitoring of platform algorithms, hashtag performance, and viral content patterns 
                      across TikTok, Instagram, Twitter, and LinkedIn.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <Target className="h-8 w-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-3">2. Strategic Adaptation</h4>
                    <p className="text-gray-600 text-sm">
                      Converting trending formats into subscription business-specific concepts that align with 
                      your brand voice, customer journey, and conversion goals.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <Users className="h-8 w-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-3">3. Performance Analysis</h4>
                    <p className="text-gray-600 text-sm">
                      Weekly performance tracking, A/B testing results, and trend longevity analysis to 
                      refine future trend selection and adaptation strategies.
                    </p>
                  </div>
                </div>
              </section>

              <section id="fortune-100-approach" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Fortune 100 Systematic Approach</h2>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  After managing $100M+ in ad spend for Fortune 100 subscription businesses, we identified the systematic 
                  methodology that separates market leaders from followers. This isn't creative guesswork—it's strategic intelligence.
                </p>

                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white mb-8">
                  <h3 className="text-2xl font-bold mb-6">The 11-Phase Weekly Intelligence System</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-3">Phase 1-3: Intelligence Gathering</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Platform algorithm monitoring</li>
                        <li>• Competitor content analysis</li>
                        <li>• Trend velocity measurement</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-3">Phase 4-6: Strategic Analysis</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Brand alignment assessment</li>
                        <li>• Customer journey mapping</li>
                        <li>• Conversion potential evaluation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-3">Phase 7-9: Creative Development</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Concept ideation & scripting</li>
                        <li>• Platform optimization</li>
                        <li>• A/B variant creation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-3">Phase 10-11: Execution & Analysis</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Performance monitoring</li>
                        <li>• Data-driven optimization</li>
                        <li>• Next week planning</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Fortune 100 Companies Use Weekly Intelligence</h3>
                <p className="text-gray-600 mb-6">
                  Large corporations can't afford to guess. Every creative decision must be strategic, data-driven, and aligned 
                  with business objectives. Weekly trend intelligence provides the systematic framework that transforms reactive 
                  creative into proactive strategic advantage.
                </p>
              </section>

              <section id="subscription-business-benefits" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Subscription Business Benefits</h2>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Subscription businesses face unique challenges: high customer acquisition costs, churn prevention, 
                  lifetime value optimization, and the need for consistent creative testing fuel. Weekly trend intelligence 
                  addresses each of these challenges systematically.
                </p>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Subscription-Specific Advantages</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-green-600 rounded-full p-2 mr-4 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Combat Creative Fatigue</h4>
                        <p className="text-gray-600">
                          Subscription businesses need 8-12 new creative variants monthly to prevent ad fatigue. 
                          Weekly intelligence provides 48+ concepts annually vs traditional quarterly planning (12 concepts).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-600 rounded-full p-2 mr-4 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Reduce Customer Acquisition Cost (CAC)</h4>
                        <p className="text-gray-600">
                          Trending content achieves 3.2x higher engagement rates, directly reducing CPM and improving 
                          conversion rates. Weekly intelligence clients see average 23% CAC reduction within 90 days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-purple-600 rounded-full p-2 mr-4 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Accelerate Testing Velocity</h4>
                        <p className="text-gray-600">
                          Traditional agencies deliver creative concepts every 2-4 weeks. Weekly delivery accelerates 
                          your testing cycles by 200-400%, improving statistical significance and optimization speed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="weekly-workflow" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Weekly Intelligence Workflow</h2>
                
                <div className="bg-indigo-50 rounded-xl p-8 mb-8">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-4">Monday Delivery Schedule</h3>
                  <p className="text-indigo-800">
                    Every Monday at 8am ET, you receive your weekly trend intelligence package. This timing ensures 
                    you can plan creative production for mid-week launch, capturing maximum trend momentum.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Weekly Delivery Components</h3>
                
                <div className="space-y-8">
                  <div className="border-l-4 border-indigo-600 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">1. Trending Concept Analysis</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Platform-specific trend identification (TikTok, Instagram, Twitter, LinkedIn)</li>
                      <li>• Trend velocity analysis and longevity prediction</li>
                      <li>• Subscription business adaptation opportunities</li>
                      <li>• Competitor usage analysis</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">2. Ready-to-Develop Scripts</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Platform-optimized scripts (15-60 second formats)</li>
                      <li>• Hook variations for A/B testing</li>
                      <li>• CTA optimization for subscription conversion</li>
                      <li>• Visual direction and styling notes</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-600 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">3. Competitor Intelligence</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Weekly competitor content analysis</li>
                      <li>• Performance benchmarking data</li>
                      <li>• Strategic positioning insights</li>
                      <li>• Opportunity gap identification</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-600 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">4. Implementation Guide</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Production timeline and resource requirements</li>
                      <li>• Testing framework and success metrics</li>
                      <li>• Platform-specific optimization tips</li>
                      <li>• Next week preview and preparation</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="competitor-analysis" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Competitor Analysis Framework</h2>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Effective competitor analysis goes beyond monitoring what your direct competitors post. Our Fortune 100 
                  framework analyzes the entire subscription business ecosystem to identify winning strategies before 
                  your competitors adopt them.
                </p>

                <div className="bg-gray-50 rounded-xl p-8 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Four-Tier Competitor Monitoring</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-red-100 rounded-lg p-3 mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">Tier 1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Direct Competitors</h4>
                        <p className="text-gray-600 text-sm">
                          Companies offering similar subscription products to your target audience. 
                          Weekly content analysis, engagement tracking, and strategy evolution monitoring.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-lg p-3 mr-4 flex-shrink-0">
                        <span className="text-orange-600 font-bold">Tier 2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Category Leaders</h4>
                        <p className="text-gray-600 text-sm">
                          Top-performing subscription businesses in adjacent categories. These companies often 
                          pioneer strategies that eventually spread to your sector.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-lg p-3 mr-4 flex-shrink-0">
                        <span className="text-blue-600 font-bold">Tier 3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Trend Innovators</h4>
                        <p className="text-gray-600 text-sm">
                          Brands consistently early to trending formats across all industries. 
                          Source of emerging creative strategies and platform optimization techniques.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-purple-100 rounded-lg p-3 mr-4 flex-shrink-0">
                        <span className="text-purple-600 font-bold">Tier 4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Platform Natives</h4>
                        <p className="text-gray-600 text-sm">
                          Individual creators and micro-brands that excel on specific platforms. 
                          Often the original source of trends before they reach corporate adoption.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="implementation-guide" className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Implementation Roadmap</h2>
                
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                  <h3 className="text-2xl font-bold mb-4">30-60-90 Day Implementation Plan</h3>
                  <p className="text-indigo-100">
                    Systematic rollout ensures successful adoption without overwhelming your team or disrupting 
                    existing creative workflows. Each phase builds strategic capability for the next level.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                    <h4 className="text-xl font-semibold text-green-900 mb-4">Days 1-30: Foundation Phase</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-green-800 mb-2">Week 1-2: Baseline Assessment</h5>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Current creative performance audit</li>
                          <li>• Competitor landscape mapping</li>
                          <li>• Team workflow evaluation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-800 mb-2">Week 3-4: System Setup</h5>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Weekly delivery integration</li>
                          <li>• Testing framework implementation</li>
                          <li>• First trend concepts deployment</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                    <h4 className="text-xl font-semibold text-blue-900 mb-4">Days 31-60: Optimization Phase</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-blue-800 mb-2">Week 5-6: Performance Analysis</h5>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• First month results evaluation</li>
                          <li>• Creative performance benchmarking</li>
                          <li>• Workflow optimization</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-800 mb-2">Week 7-8: Scale Preparation</h5>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• Advanced testing implementation</li>
                          <li>• Cross-platform optimization</li>
                          <li>• Team training completion</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-600">
                    <h4 className="text-xl font-semibold text-purple-900 mb-4">Days 61-90: Mastery Phase</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-purple-800 mb-2">Week 9-10: Advanced Strategy</h5>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Custom trend development</li>
                          <li>• Predictive trend analysis</li>
                          <li>• Competitive differentiation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-800 mb-2">Week 11-12: Strategic Excellence</h5>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Full system optimization</li>
                          <li>• ROI measurement & reporting</li>
                          <li>• Long-term strategic planning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Implement Weekly Trend Intelligence?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get the same systematic approach used by Fortune 100 companies, delivered every Monday starting at $67/month.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <Calendar className="h-8 w-8 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">Weekly</div>
                  <div className="text-sm opacity-80">Monday Delivery</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <TrendingUp className="h-8 w-8 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">Fortune 100</div>
                  <div className="text-sm opacity-80">Proven Methodology</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <Target className="h-8 w-8 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">$67/Month</div>
                  <div className="text-sm opacity-80">Starting Price</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/free-hooks" className="btn bg-white text-indigo-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                  Get 10 Free Hooks First
                </Link>
                <Link href="/#service-tiers" className="btn btn-secondary">
                  View Weekly Plans
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
                Get Weekly Trend Intelligence Insights
              </h2>
              <p className="text-gray-600 mb-8">
                Subscribe to receive weekly trend analysis, competitor insights, and Fortune 100 strategies for subscription business growth.
              </p>
              <EmailCaptureForm
                placeholder="Enter your work email"
                buttonText="Get Weekly Intelligence"
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