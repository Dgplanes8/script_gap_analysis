import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Play, Target, Zap, BarChart3 } from 'lucide-react';
import { FormatShowcase } from '@/components/creative/format-showcase';
import { Header } from '@/components/layout/secondary-header';
import { Footer } from '@/components/layout/footer';
import { ServiceTiers } from '@/components/layout/service-tiers';

export const metadata: Metadata = {
  title: '13 High-Converting Ad Formats - Social Media Templates & Creative Scripts | Ad Formats Guide',
  description: 'Master 13 proven ad formats that reduce CAC by 25% across TikTok, Facebook, and Instagram. Complete guide with copywriting examples, creative scripts, and performance data for subscription marketing.',
  keywords: 'ad formats guide, social media templates, copywriting examples, facebook ad formats, tiktok ad templates, creative scripts, video ad templates, high converting ads, subscription marketing, viral content formats, conversion copywriting, creative strategy',
  openGraph: {
    title: '13 High-Converting Ad Formats - Social Media Templates & Creative Scripts',
    description: 'Master 13 proven ad formats that reduce CAC by 25% across TikTok, Facebook, and Instagram. Complete with copywriting examples and creative scripts for subscription marketing.',
    images: [
      {
        url: '/og-images/ad-formats-guide.jpg',
        width: 1200,
        height: 630,
        alt: '13 High-Converting Ad Formats Guide',
      },
    ],
  },
};

export default function AdFormatsGuidePage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-brand-50 to-brand-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/"
                className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-100 to-brand-100 text-brand-800 rounded-full text-sm font-semibold mb-6">
                  <Play className="h-4 w-4 mr-2" />
                  High-Converting Ad Formats
                </div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  13 High-Converting Ad Formats - Social Media Templates & Creative Scripts
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Master proven ad formats and copywriting templates that top subscription companies use to reduce CAC by 25%. Each format includes strategic guidance, creative scripts, and viral content examples for performance optimization.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <Target className="h-8 w-8 text-brand-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Audience-Specific</h3>
                  <p className="text-gray-600 text-sm">Each format targets different awareness levels, from cold audiences to warm prospects ready to convert.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <Zap className="h-8 w-8 text-brand-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Platform-Optimized</h3>
                  <p className="text-gray-600 text-sm">Formats adapted for each platform's unique behavior patterns and algorithm preferences.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                  <BarChart3 className="h-8 w-8 text-brand-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Performance-Tested</h3>
                  <p className="text-gray-600 text-sm">Every format backed by real campaign data and conversion optimization best practices.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Format Showcase */}
        <FormatShowcase />

        {/* Strategic Implementation Guide */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Strategic Implementation Framework
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Format Selection Strategy</h3>
                  <p className="text-gray-600 mb-6">
                    Choosing the right format depends on your audience's awareness level and your campaign objective. Here's our strategic decision framework:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Cold Audiences (Unaware)</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Problem-Solution with Authority</li>
                        <li>• Expert Authority</li>
                        <li>• Native Trend Leverager</li>
                        <li>• Comprehensive Benefits</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Warm Audiences (Product-Aware)</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Quick Product Highlight</li>
                        <li>• Concise Conversion</li>
                        <li>• Strong Offer</li>
                        <li>• Claim-Based</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Performance Optimization Tips</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-brand-50 rounded-lg">
                      <h4 className="font-semibold text-brand-900 mb-2">First 3 Seconds</h4>
                      <p className="text-sm text-brand-800">
                        Hook must create pattern interrupt and promise clear value within the first 3 seconds to stop the scroll.
                      </p>
                    </div>
                    <div className="p-4 bg-brand-50 rounded-lg">
                      <h4 className="font-semibold text-brand-900 mb-2">Value Proposition</h4>
                      <p className="text-sm text-brand-800">
                        Focus on transformation outcomes, not features. Show the end result your audience wants to achieve.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Clear CTA</h4>
                      <p className="text-sm text-blue-800">
                        Single, specific action with urgency or scarcity elements to drive immediate response.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Testing & Iteration Strategy</h3>
                  <p className="text-gray-600 mb-6">
                    Maximize performance by systematically testing format variations and optimizing based on data:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Start with 3-4 formats</h4>
                        <p className="text-sm text-gray-600">Test different awareness levels and angles to identify your best-performing format category.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Optimize winning formats</h4>
                        <p className="text-sm text-gray-600">Create 3-5 variations of your top-performing format with different hooks and CTAs.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Scale and iterate</h4>
                        <p className="text-sm text-gray-600">Once you find winners, create new formats targeting different segments or platforms.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Tiers CTA */}
        <section id="service-tiers">
          <ServiceTiers />
        </section>
      </main>

      <Footer />
    </>
  );
}