import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { StructuredData } from '@/components/schema';
import { Footer } from '@/components/layout/footer';
import { Download, BookOpen, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: '10 Free Copy-Paste Ad Templates for Startup Founders | Launch Your First Campaign This Week',
  description: 'Download 10 battle-tested ad templates designed for startup founders. Skip months of trial-and-error testing. Copy, customize, and launch winning ads in minutes. Free download.',
  keywords: 'free ad templates, startup ad templates, copy-paste ad templates, launch first campaign, startup advertising templates, ad templates for founders, free marketing templates',
  openGraph: {
    title: '10 Free Copy-Paste Ad Templates for Startup Founders',
    description: 'Download battle-tested ad templates to launch your first campaign this week. Free copy-paste templates for startup founders.',
    type: 'website',
    images: [
      {
        url: '/images/free-hooks-og.jpg',
        width: 1200,
        height: 630,
        alt: '10 Free Ad Templates for Startup Founders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '10 Free Copy-Paste Ad Templates for Startup Founders',
    description: 'Download battle-tested ad templates to launch your first campaign this week.',
    images: ['/images/free-hooks-og.jpg'],
  },
  alternates: {
    canonical: '/free-hooks',
  },
};

export default function FreeHooksPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        pageType="service"
        title="10 Free Copy-Paste Ad Templates for Startup Founders"
        description="Download 10 battle-tested ad templates designed for startup founders. Skip months of trial-and-error testing. Copy, customize, and launch winning ads in minutes."
        slug="/free-hooks"
        additionalSchemas={[
          {
            '@type': 'Offer',
            name: '10 Free Copy-Paste Ad Templates',
            description: 'Battle-tested ad templates for startup founders to launch their first campaign this week',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            validFrom: '2025-01-29',
            url: 'https://apsicsmedia.com/free-hooks',
            seller: {
              '@type': 'Organization',
              name: 'APSICS Media'
            },
            itemOffered: {
              '@type': 'DigitalDocument',
              name: '10 Copy-Paste Ad Templates',
              description: 'Ready-to-use ad templates for startup marketing campaigns'
            }
          }
        ]}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section for Free Hooks */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Download className="h-4 w-4 mr-2" />
                COPY-PASTE TEMPLATES - FREE
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Get 10 Copy-Paste Ad Templates That Actually Work
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Skip months of trial-and-error testing. These proven frameworks help you launch your first campaign this week - download, customize with your details, and start getting customers.
              </p>
              
              {/* Simple CTA */}
              <div className="max-w-lg mx-auto mb-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your Free Templates</h3>
                  <p className="text-gray-600 mb-4">Enter your email to download 10 battle-tested ad templates</p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all">
                      Download Free Templates
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Instant download • No spam • Proven templates from $250MM+ managed spend
                  </p>
                </div>
              </div>
              
              {/* Trust indicators and benefits below */}
              <div className="text-center mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Copy-Paste Ready</h3>
                    <p className="text-gray-600 text-sm">
                      No design skills needed. Just copy, customize your details, and launch your first campaign.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Zap className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Battle-Tested</h3>
                    <p className="text-gray-600 text-sm">
                      These frameworks come from analyzing winning campaigns across $250MM+ in managed ad spend.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Founder-Focused</h3>
                    <p className="text-gray-600 text-sm">
                      Designed specifically for startup founders launching their first campaigns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What You'll Get</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">10 Ready-to-Use Templates</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Problem-Solution frameworks</li>
                  <li>• Social proof templates</li>
                  <li>• Curiosity-driven hooks</li>
                  <li>• Transformation promises</li>
                  <li>• Authority positioning</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Implementation Guide</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Step-by-step customization</li>
                  <li>• Platform-specific optimization</li>
                  <li>• Performance tracking tips</li>
                  <li>• Common mistakes to avoid</li>
                  <li>• Scaling strategies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}