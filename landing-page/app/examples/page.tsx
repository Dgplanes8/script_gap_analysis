import type { Metadata } from 'next';
import { Header } from '@/components/layout/secondary-header';
import { Footer } from '@/components/layout/footer';
import { StructuredData } from '@/components/schema';
import { ExampleOutputsShowcase } from '@/components/landing/example-outputs-showcase';
import { Target, FileText, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'High-Converting Ad Templates & Examples | Revenue-Driven Campaign Library | APSICS Media',
  description: 'Browse 100+ proven ad templates from $250MM+ managed spend. See real examples, performance scores, and ready-to-use scripts that convert customers faster.',
  keywords: 'high-converting ad templates, revenue-driven ad examples, template gallery, performance marketing campaigns, conversion scripts, marketing templates',
  openGraph: {
    title: 'High-Converting Ad Templates & Examples | Revenue-Driven Campaign Library',
    description: 'Browse 100+ proven ad templates from $250MM+ managed spend. See real examples, performance scores, and revenue-driving scripts.',
    type: 'website',
    images: [
      {
        url: '/images/examples-og.jpg',
        width: 1200,
        height: 630,
        alt: 'High-Converting Ad Templates and Examples Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High-Converting Ad Templates & Examples | Revenue-Driven Campaign Library',
    description: 'Browse 100+ proven ad templates from $250MM+ managed spend. See real examples and performance scores.',
    images: ['/images/examples-og.jpg'],
  },
  alternates: {
    canonical: '/examples',
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

export default function ExamplesPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        pageType="service"
        title="High-Converting Ad Templates & Examples"
        description="Browse 100+ proven ad templates from $250MM+ managed spend. See real examples, performance scores, and ready-to-use scripts that convert customers faster."
        slug="/examples"
        additionalSchemas={[
          {
            '@type': 'ItemList',
            name: 'High-Converting Ad Template Examples',
            description: 'Collection of proven ad templates for revenue-driving marketing campaigns',
            itemListElement: [
              {
                '@type': 'CreativeWork',
                name: 'TikTok Ad Templates',
                description: 'Viral TikTok ad templates optimized for business growth'
              },
              {
                '@type': 'CreativeWork', 
                name: 'Facebook Ad Scripts',
                description: 'High-converting Facebook ad scripts for revenue growth'
              },
              {
                '@type': 'CreativeWork',
                name: 'Instagram Campaign Templates',
                description: 'Instagram ad templates designed for conversion optimization'
              }
            ]
          }
        ]}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-brand-50 to-brand-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-brand-600 to-brand-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Target className="h-4 w-4 mr-2" />
                TEMPLATE GALLERY - REAL EXAMPLES
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                See What You'll Get: Real Template Examples That Convert
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Browse proven ad templates from $250MM+ managed spend. Every template includes performance scores, platform optimization, and ready-to-use scripts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <FreeWeekButton source="examples-cta" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center">Start Free Week Trial</FreeWeekButton>
                <FreeWeekButton source="examples-cta" className="bg-white border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center">Start Free Week Trial</FreeWeekButton>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6 bg-white rounded-xl shadow-lg p-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-2">100+</div>
                  <div className="text-gray-600">Proven Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-2">3</div>
                  <div className="text-gray-600">Platform Optimizations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">25-Point</div>
                  <div className="text-gray-600">Performance Scoring</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Template Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Templates by Platform & Use Case
                </h2>
                <p className="text-xl text-gray-600">
                  Each template is optimized for specific platforms and business scenarios
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-gradient-to-br from-brand-50 to-brand-50 rounded-xl p-6 border border-brand-100">
                  <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">TikTok Templates</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Viral trend integration frameworks</li>
                    <li>• 15-30 second script structures</li>
                    <li>• Hook optimization for scroll-stopping</li>
                    <li>• Hashtag and sound strategies</li>
                    <li>• Mobile-first creative guidelines</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-brand-50 rounded-xl p-6 border border-blue-100">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Facebook Templates</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Problem-solution storytelling</li>
                    <li>• Social proof integration</li>
                    <li>• Benefit-focused headlines</li>
                    <li>• CTA optimization strategies</li>
                    <li>• Audience targeting angles</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-brand-50 to-brand-50 rounded-xl p-6 border border-brand-100">
                  <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Instagram Templates</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Visual storytelling frameworks</li>
                    <li>• Story vs feed optimization</li>
                    <li>• Lifestyle integration approaches</li>
                    <li>• Influencer collaboration scripts</li>
                    <li>• User-generated content prompts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Showcase Component */}
        <ExampleOutputsShowcase />

        {/* Template Quality Assurance */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why These Templates Work
                </h2>
                <p className="text-xl text-gray-600">
                  Every template is validated using our 25-point performance scoring system
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Performance Validation</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span><strong>Attention Capture (1-5):</strong> Will it stop the scroll?</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span><strong>Emotional Resonance (1-5):</strong> Triggers specific emotions?</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span><strong>Benefit Clarity (1-5):</strong> Core promise immediately clear?</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span><strong>Call-to-Action (1-5):</strong> Creates urgency?</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span><strong>Memorability (1-5):</strong> Contains "sticky" elements?</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Real-World Testing</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span>Validated across $250MM+ in managed ad spend</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span>Tested by growing businesses across all budgets</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span>Platform-specific optimization for each template</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span>Regular updates based on performance data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3"></div>
                      <span>Industry-specific variations available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Guide Preview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                From Template to Launched Campaign in 30 Minutes
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Each template comes with step-by-step implementation guides
              </p>
              
              <div className="bg-gradient-to-r from-brand-50 to-brand-50 rounded-xl p-8 border border-brand-200">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                    <div className="font-semibold text-gray-900">Choose Template</div>
                    <div className="text-sm text-gray-600 mt-2">Select from 100+ proven options</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                    <div className="font-semibold text-gray-900">Customize Content</div>
                    <div className="text-sm text-gray-600 mt-2">Add your brand and value prop</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                    <div className="font-semibold text-gray-900">Create Visual</div>
                    <div className="text-sm text-gray-600 mt-2">Follow our production guide</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">4</div>
                    <div className="font-semibold text-gray-900">Launch Campaign</div>
                    <div className="text-sm text-gray-600 mt-2">Upload and start testing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-brand-600 to-brand-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Start with Free Templates Today
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get 10 copy-paste templates immediately, then upgrade to weekly delivery for fresh concepts every Monday.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <FreeWeekButton source="examples-cta" className="bg-white text-brand-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg">Start Free Week Trial</FreeWeekButton>
                <FreeWeekButton source="examples-cta" className="bg-brand-800 hover:bg-brand-900 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg">Start Free Week Trial</FreeWeekButton>
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
