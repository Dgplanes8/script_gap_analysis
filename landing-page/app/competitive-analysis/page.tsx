import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StructuredData } from '@/components/schema';
import { CompetitorComparison } from '@/components/landing/competitor-comparison';
import { Building2, Users, Zap, Clock, DollarSign, ArrowRight, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Marketing Agency vs Freelancer vs In-House | Complete Cost Comparison | APSICS Media',
  description: 'Compare marketing options: agencies ($5K-15K/month), freelancers, AI tools, in-house teams. Find the best fit for your startup budget and needs.',
  keywords: 'agency vs freelancer marketing, marketing alternatives comparison, startup marketing options, marketing agency costs, freelancer vs in-house marketing',
  openGraph: {
    title: 'Marketing Agency vs Freelancer vs In-House | Complete Cost Comparison',
    description: 'Compare marketing options: agencies ($5K-15K/month), freelancers, AI tools, in-house teams. Find the best fit for your startup budget.',
    type: 'website',
    images: [
      {
        url: '/images/competitive-analysis-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Marketing Options Comparison - Agency vs Freelancer vs In-House',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Agency vs Freelancer vs In-House | Complete Cost Comparison',
    description: 'Compare all marketing options for startups. Find the best fit for your budget and needs.',
    images: ['/images/competitive-analysis-og.jpg'],
  },
  alternates: {
    canonical: '/competitive-analysis',
  },
};

export default function CompetitiveAnalysisPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        pageType="article"
        title="Marketing Agency vs Freelancer vs In-House Comparison"
        description="Compare marketing options: agencies ($5K-15K/month), freelancers, AI tools, in-house teams. Find the best fit for your startup budget and needs."
        slug="/competitive-analysis"
        additionalSchemas={[
          {
            '@type': 'ComparisonStudy',
            name: 'Startup Marketing Options Comparison',
            description: 'Comprehensive comparison of marketing alternatives for startup founders',
            itemsBeingCompared: [
              {
                '@type': 'Service',
                name: 'Traditional Marketing Agencies',
                description: 'Full-service marketing agencies with high minimums'
              },
              {
                '@type': 'Service', 
                name: 'Freelance Marketers',
                description: 'Individual contractors for marketing projects'
              },
              {
                '@type': 'Service',
                name: 'AI Marketing Tools',
                description: 'Automated marketing software and tools'
              },
              {
                '@type': 'Service',
                name: 'In-House Marketing',
                description: 'Building internal marketing team'
              },
              {
                '@type': 'Service',
                name: 'Weekly Template Service',
                description: 'Professional templates delivered weekly'
              }
            ]
          }
        ]}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Building2 className="h-4 w-4 mr-2" />
                MARKETING OPTIONS ANALYSIS
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Agency vs Freelancer vs In-House: What's Best for Your Startup?
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Complete cost and performance comparison of all marketing options available to startup founders. Find the approach that fits your budget, timeline, and growth goals.
              </p>
              
              {/* Quick Decision Matrix */}
              <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Decision Guide</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 mb-3">If You Have...</h4>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-start">
                        <DollarSign className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span><strong>$10K+/month budget:</strong> Traditional agency might work</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                        <span><strong>One-off project:</strong> Consider freelancer</span>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-orange-600 mt-1 mr-2 flex-shrink-0" />
                        <span><strong>6+ months to hire:</strong> Build in-house team</span>
                      </div>
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                        <span><strong>$500-5K/month:</strong> Weekly templates + DIY</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 mb-3">You Should Avoid...</h4>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-start">
                        <X className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Agencies if budget &lt; $5K/month</span>
                      </div>
                      <div className="flex items-start">
                        <X className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Freelancers for ongoing strategy</span>
                      </div>
                      <div className="flex items-start">
                        <X className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                        <span>AI tools as primary strategy</span>
                      </div>
                      <div className="flex items-start">
                        <X className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                        <span>In-house if budget &lt; $15K/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Reality for Startups */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  The Reality Every Startup Founder Faces
                </h2>
                <p className="text-xl text-gray-600">
                  Why traditional marketing options often don't work for early-stage startups
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border border-red-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Need</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Professional creative strategy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Fast turnaround times</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Budget flexibility ($500-5K/month)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>No long-term contracts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Strategic guidance from experience</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Available</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>$10K+/month agency minimums</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>6-month contract requirements</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Hit-or-miss freelancer quality</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Generic AI-generated content</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Weeks/months to hire in-house</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">The Gap in the Market</h3>
                <p className="text-lg opacity-90">
                  There's a massive gap between what startup founders need and what's available in the market. 
                  Professional creative strategy exists, but it's locked behind agency minimums that most startups can't afford.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Component */}
        <CompetitorComparison />

        {/* Decision Framework */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How to Choose the Right Option for Your Startup
                </h2>
                <p className="text-xl text-gray-600">
                  Use this framework to evaluate which approach fits your specific situation
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Assess Your Resources</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">Monthly Budget</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>&lt; $1K: DIY + templates</li>
                        <li>$1K-5K: Weekly templates</li>
                        <li>$5K-15K: Freelancer or templates</li>
                        <li>$15K+: Agency or in-house</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-600 mb-2">Time Availability</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>&lt; 5hrs/week: Full service needed</li>
                        <li>5-15hrs/week: Templates + DIY</li>
                        <li>15+ hrs/week: Can manage freelancers</li>
                        <li>40+ hrs/week: Consider in-house</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Marketing Experience</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>None: Need strategic guidance</li>
                        <li>Some: Templates work well</li>
                        <li>Experienced: Can manage team</li>
                        <li>Expert: Build in-house team</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Define Your Timeline</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-purple-600 mb-2">Need Results In...</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li><strong>1-2 weeks:</strong> Weekly templates or freelancer</li>
                        <li><strong>1 month:</strong> Agency onboarding or templates</li>
                        <li><strong>3+ months:</strong> All options viable</li>
                        <li><strong>6+ months:</strong> Can build in-house team</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Commitment Level</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li><strong>Week-to-week:</strong> Templates ideal</li>
                        <li><strong>Monthly:</strong> Freelancer projects</li>
                        <li><strong>Quarterly:</strong> Agency retainer</li>
                        <li><strong>Annual:</strong> In-house hiring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Consider Your Growth Stage</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Pre-Product Market Fit</h4>
                      <p className="text-gray-600 text-sm">Focus on learning and iteration. Templates + DIY gives you flexibility to test and pivot quickly.</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Early PMF</h4>
                      <p className="text-gray-600 text-sm">Scale what's working. Weekly templates provide consistent creative refresh without long commitments.</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Scaling Phase</h4>
                      <p className="text-gray-600 text-sm">Consider agency or in-house team. You need dedicated resources for complex multi-channel strategies.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Weekly Templates Win */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Weekly Templates Are Perfect for Most Startups
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                The sweet spot between professional strategy and startup constraints
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Get</h3>
                  <ul className="space-y-3 text-gray-600 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Professional strategic thinking from $250MM+ experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Weekly delivery keeps campaigns fresh</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Cancel/restart anytime based on cash flow</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Startup pricing: $5-99/week vs $5K-15K/month</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Ready-to-use scripts, not just concepts</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Avoid</h3>
                  <ul className="space-y-3 text-gray-600 text-left">
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>$10K+/month agency minimums and contracts</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Inconsistent freelancer quality and availability</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Months of hiring and onboarding in-house talent</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Generic AI-generated content that doesn't convert</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Spending 15+ hours/week creating campaigns from scratch</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">The Bottom Line</h3>
                <p className="text-lg opacity-90 mb-6">
                  Weekly templates bridge the gap between expensive agencies and DIY struggles. You get professional creative strategy at startup pricing with the flexibility to scale up or down based on your needs.
                </p>
                <Link
                  href="/#service-tiers"
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-flex items-center text-lg"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  See Our Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Still Not Sure Which Option Is Right?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Start with our free templates to experience our strategic approach, then decide if weekly delivery makes sense for your startup.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/free-hooks"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Try Free Templates First
                </Link>
                <Link
                  href="/#service-tiers"
                  className="bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Compare Our Plans
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}