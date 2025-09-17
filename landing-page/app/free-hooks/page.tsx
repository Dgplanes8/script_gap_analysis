import type { Metadata } from 'next';
import { Header } from '@/components/layout/secondary-header';
import { StructuredData, WebApplicationSchema } from '@/components/schema';
import { Footer } from '@/components/layout/footer';
import { Download, BookOpen, Zap, Users } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

export const metadata: Metadata = {
  title: 'Free Download: 10 Ad Templates That Generated $47M+ (Copy & Paste Ready)',
  description: 'Get 10 battle-tested ad templates from $250M+ spend that averaged 3.2x ROAS. Download instantly. Skip 6 months of testing—start converting in 24 hours.',
  keywords: 'free ad templates, high-converting ad templates, revenue optimization templates, performance marketing templates, conversion-focused ad templates, creative intelligence templates',
  openGraph: {
    title: 'Free Download: 10 Ad Templates That Generated $47M+ (Copy & Paste Ready)',
    description: 'Get 10 battle-tested ad templates from $250M+ spend that averaged 3.2x ROAS. Download instantly and start converting.',
    type: 'website',
    images: [
      {
        url: '/images/free-hooks-og.jpg',
        width: 1200,
        height: 630,
        alt: '10 Free High-Converting Ad Templates - Revenue-Driven Creative Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Download: 10 Ad Templates That Generated $47M+ (Copy & Paste Ready)',
    description: 'Get 10 battle-tested ad templates from $250M+ spend that averaged 3.2x ROAS. Download instantly.',
    images: ['/images/free-hooks-og.jpg'],
  },
  alternates: {
    canonical: '/free-hooks',
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

export default function FreeHooksPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        pageType="service"
        title="10 Free High-Converting Ad Templates | Revenue-Driven Creative Intelligence"
        description="Download 10 battle-tested ad templates from $250MM+ managed spend. Skip months of trial-and-error testing. Copy, customize, and launch revenue-driving campaigns in minutes."
        slug="/free-hooks"
        additionalSchemas={[
          {
            '@type': 'Offer',
            name: '10 Free High-Converting Ad Templates',
            description: 'Battle-tested ad templates from $250MM+ managed spend to drive revenue growth for any business',
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
              name: '10 High-Converting Ad Templates',
              description: 'Ready-to-use ad templates for revenue-driving marketing campaigns'
            }
          }
        ]}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section for Free Hooks */}
        <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-white">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 mb-6">
              <Download className="w-4 h-4 text-[#126DFB]" />
              <span className="text-sm font-medium text-gray-700">STRATEGIC CREATIVE TEMPLATES - FREE</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              10 High-Converting Ad Templates From <span className="text-[#126DFB]">$250MM+ Revenue Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Skip months of trial-and-error testing. These proven revenue-driving frameworks from $250MM+ managed spend help you launch converting campaigns this week - download, customize, and scale.
            </p>
              
            {/* Email Capture Form */}
            <div className="max-w-lg mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your Revenue-Driving Creative Templates</h3>
                <p className="text-gray-600 mb-4">Enter your email to download 10 proven ad templates from $250MM+ revenue intelligence experience</p>
                  
                  <EmailCaptureForm
                    placeholder="Enter your work email"
                    buttonText="Download Free Templates"
                    variant="cta"
                    source="free-hooks-main"
                  />
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Instant download • No spam • Proven templates from $250MM+ managed spend
                  </p>
                </div>
              </div>
              
            {/* Trust indicators and benefits below */}
            <div className="text-center mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue-Driven Creative Intelligence</h3>
                  <p className="text-sm text-gray-600">
                    Proven frameworks from $250MM+ managed spend. Copy, customize for your business, and launch revenue-driving campaigns.
                  </p>
                </div>
                  
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance-Validated</h3>
                  <p className="text-sm text-gray-600">
                    Strategic creative frameworks validated across $250MM+ managed spend experience with documented conversion results.
                  </p>
                </div>
                  
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Growth-Optimized</h3>
                  <p className="text-sm text-gray-600">
                    Revenue-focused creative concepts designed for growing businesses seeking measurable marketing ROI and customer acquisition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F8F8F8] relative">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Strategic Creative Intelligence Package</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">10 Strategic Creative Frameworks</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Problem-Agitate-Solution frameworks</li>
                  <li>• Social proof and authority templates</li>
                  <li>• Curiosity-gap strategic hooks</li>
                  <li>• Transformation-promise frameworks</li>
                  <li>• Expert positioning templates</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Strategic Implementation Guide</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Strategic customization methodology</li>
                  <li>• Platform-specific optimization tactics</li>
                  <li>• Performance intelligence tracking</li>
                  <li>• Strategic pitfalls to avoid</li>
                  <li>• Proven scaling frameworks</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* WebApplication Schema for Download Tool */}
      <WebApplicationSchema
        name="Free High-Converting Ad Templates"
        description="Battle-tested ad templates from $250M+ managed spend for instant download"
        url="/free-hooks"
        applicationCategory="BusinessApplication"
        features={[
          '10 proven ad templates',
          'Copy & paste ready format',
          'Generated $47M+ in revenue',
          'Instant download access'
        ]}
        category="DownloadableResource"
      />
    </>
  );
}