import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StructuredData } from '@/components/schema';
import { StrategyProcess } from '@/components/layout/strategic-process';
import { Calendar, Target, TrendingUp, Building2, ArrowRight, CheckCircle, Clock, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Weekly Ad Templates Work | Monday Delivery Process | APSICS Media',
  description: 'Discover our proven weekly process. Get ad templates every Monday, launch campaigns by Friday. See exactly how weekly creative intelligence works for startups.',
  keywords: 'how weekly ad templates work, monday delivery marketing, startup ad process, weekly creative intelligence, campaign launch process',
  openGraph: {
    title: 'How Weekly Ad Templates Work | Monday Delivery Process',
    description: 'Discover our proven weekly process. Get ad templates every Monday, launch campaigns by Friday. See exactly how it works.',
    type: 'website',
    images: [
      {
        url: '/images/how-it-works-og.jpg',
        width: 1200,
        height: 630,
        alt: 'How Weekly Ad Templates Work - Process Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Weekly Ad Templates Work | Monday Delivery Process',
    description: 'Get ad templates every Monday, launch campaigns by Friday. See our proven process.',
    images: ['/images/how-it-works-og.jpg'],
  },
  alternates: {
    canonical: '/how-it-works',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        pageType="service"
        title="How Weekly Ad Templates Work"
        description="Discover our proven weekly process. Get ad templates every Monday, launch campaigns by Friday. See exactly how weekly creative intelligence works for startups."
        slug="/how-it-works"
        additionalSchemas={[
          {
            '@type': 'HowTo',
            name: 'How to Launch Campaigns with Weekly Ad Templates',
            description: 'Step-by-step process for using weekly ad templates to launch startup marketing campaigns',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Receive Templates Monday',
                text: 'Get fresh creative concepts delivered every Monday morning'
              },
              {
                '@type': 'HowToStep',
                name: 'Customize for Your Brand',
                text: 'Adapt templates with your brand voice and value proposition'
              },
              {
                '@type': 'HowToStep',
                name: 'Create Visuals',
                text: 'Follow production guides to create campaign assets'
              },
              {
                '@type': 'HowToStep',
                name: 'Launch and Test',
                text: 'Upload campaigns and start testing by Friday'
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
                <Calendar className="h-4 w-4 mr-2" />
                MONDAY DELIVERY GUARANTEE
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                From Template to Launched Campaign in One Week
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Our proven weekly process gets you from creative concept to live campaign in 5 days. Fresh templates every Monday, launched campaigns every Friday.
              </p>
              
              {/* Weekly Timeline */}
              <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Weekly Schedule</h3>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">M</div>
                    <div className="font-semibold text-sm">Templates Arrive</div>
                    <div className="text-xs text-gray-500">Fresh concepts delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">T</div>
                    <div className="font-semibold text-sm">Customize</div>
                    <div className="text-xs text-gray-500">Adapt to your brand</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">W</div>
                    <div className="font-semibold text-sm">Create Assets</div>
                    <div className="text-xs text-gray-500">Produce visuals</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">T</div>
                    <div className="font-semibold text-sm">Set Up Campaigns</div>
                    <div className="text-xs text-gray-500">Upload to platforms</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">F</div>
                    <div className="font-semibold text-sm">Launch & Test</div>
                    <div className="text-xs text-gray-500">Go live and measure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Delivery Guarantee */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Monday Delivery, Friday Launch
                </h2>
                <p className="text-xl text-gray-600">
                  Consistent weekly delivery designed for startup velocity and testing speed
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-100">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Launch Winning Campaigns</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Proven ad templates perfect for startup teams launching their first campaigns. Stop guessing what works - get winning concepts every Monday.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      Strategic concept development
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      Platform-specific optimization
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      Performance scoring included
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8 border border-teal-100">
                  <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Step-by-Step Setup</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Not just concepts - get practical launch instructions from a proven strategist who's helped founders launch successful campaigns from $0.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      Campaign setup walkthrough
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      Budget allocation guidance
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      Performance tracking tips
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Startup-Budget Friendly</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Built specifically for founders with $500-$5K monthly ad budgets who can't afford expensive agencies. Professional strategy at startup pricing.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      No long-term contracts
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      Weekly billing flexibility
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      Cancel or restart anytime
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Process - Strategic Process Component */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Strategic Intelligence Behind Every Template
              </h2>
              <p className="text-xl text-gray-600">
                Each template is created using our proven 14-phase strategic process - the same methodology used for Fortune 100 campaigns, adapted for startup speed.
              </p>
            </div>
          </div>
        </section>

        {/* Strategic Process Component */}
        <StrategyProcess />

        {/* What You Receive */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  What Arrives in Your Inbox Every Monday
                </h2>
                <p className="text-xl text-gray-600">
                  Everything you need to launch successful campaigns, delivered weekly
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Creative Assets</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Strategic Concepts</div>
                        <div className="text-gray-600 text-sm">1-3 validated creative concepts with strategic reasoning</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Ready-to-Use Scripts</div>
                        <div className="text-gray-600 text-sm">2-6 complete ad scripts optimized for each platform</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Performance Scores</div>
                        <div className="text-gray-600 text-sm">25-point scoring framework with expected performance</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Implementation Guide</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Platform Setup</div>
                        <div className="text-gray-600 text-sm">Step-by-step campaign creation for TikTok, Facebook, Instagram</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Budget Allocation</div>
                        <div className="text-gray-600 text-sm">Recommended spend distribution and testing strategy</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Success Metrics</div>
                        <div className="text-gray-600 text-sm">KPIs to track and optimization recommendations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Breakdown */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Your 5-Day Launch Timeline
                </h2>
                <p className="text-xl text-gray-600">
                  From template delivery to live campaign in just 5 business days
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-600">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Monday: Templates Delivered</div>
                      <div className="text-gray-500 text-sm">Time investment: 30 minutes</div>
                    </div>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 ml-11">
                    Review your weekly templates, choose the best concepts for your brand, and understand the strategic reasoning behind each approach.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-teal-600">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Tuesday: Customize Content</div>
                      <div className="text-gray-500 text-sm">Time investment: 1-2 hours</div>
                    </div>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 ml-11">
                    Adapt the template scripts with your brand voice, value proposition, and specific offers. Follow our customization guidelines.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Wednesday: Create Visuals</div>
                      <div className="text-gray-500 text-sm">Time investment: 2-4 hours</div>
                    </div>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 ml-11">
                    Produce video content, graphics, or other creative assets using our production guides and recommended tools.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Thursday: Set Up Campaigns</div>
                      <div className="text-gray-500 text-sm">Time investment: 1-2 hours</div>
                    </div>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 ml-11">
                    Upload assets to ad platforms, configure targeting, set budgets, and prepare campaigns for launch using our setup guides.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">
                      5
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Friday: Launch & Monitor</div>
                      <div className="text-gray-500 text-sm">Time investment: 30 minutes</div>
                    </div>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 ml-11">
                    Go live with your campaigns, monitor initial performance, and set up tracking to measure results over the weekend.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mt-8 border border-green-200">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Total Time Investment: 5-9 Hours Per Week</h3>
                  <p className="text-gray-600">
                    Compare to 15-25 hours spent creating campaigns from scratch, plus the cost of failed experiments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-orange-600 to-red-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Weekly Campaigns?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get your first templates this Monday. Launch your first campaign by Friday. See results by next Monday.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  href="/#service-tiers"
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Start Free Week
                </Link>
                <Link
                  href="/examples"
                  className="bg-orange-800 hover:bg-orange-900 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  See Examples
                </Link>
              </div>

              <div className="border-t border-white/20 pt-8">
                <p className="text-lg opacity-90 mb-2">Questions about the process?</p>
                <a 
                  href="mailto:brian@apsicsmedia.com" 
                  className="text-orange-300 hover:text-orange-200 font-semibold text-xl inline-flex items-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  brian@apsicsmedia.com
                </a>
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