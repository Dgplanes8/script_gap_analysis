import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { Header } from '@/components/layout/secondary-header';

const SaaSCreativeROICalculator = dynamic(
  () => import('@/components/calculators/saas-creative-roi-calculator').then((mod) => ({ default: mod.SaaSCreativeROICalculator })),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
);

export const metadata: Metadata = {
  title: 'SaaS Creative ROI Calculator - Weekly Trend Intelligence Plans',
  description: 'Free ROI calculator + weekly viral scripts for SaaS businesses. Get trending concepts and competitor analysis every Monday from Fortune 100 methodology.',
  keywords: 'SaaS creative ROI, weekly trend intelligence, viral scripts, SaaS marketing, competitor analysis, subscription business growth',
  openGraph: {
    title: 'SaaS Creative ROI Calculator - Weekly Trend Intelligence Plans',
    description: 'Free ROI calculator + weekly viral scripts for SaaS. Trending concepts every Monday from Fortune 100 experience.',
    type: 'website',
  },
  alternates: {
    canonical: '/saas-creative-strategy-roi-calculator',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SaaS Creative Strategy ROI Calculator',
  applicationCategory: 'BusinessApplication',
  description: 'Calculate and optimize the ROI of your SaaS creative strategy with scenario modeling',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free SaaS creative strategy ROI calculator with strategic recommendations'
  },
  provider: {
    '@type': 'Organization',
    name: 'Apsics Media',
    url: 'https://apsicsmedia.com'
  },
  featureList: [
    'Creative performance ROI calculation',
    'Scenario modeling and optimization',
    'Industry benchmark comparisons',
    'Strategic recommendations'
  ]
};

export default function SaaSCreativeStrategyROIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 pt-16 lg:pt-20">

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Calculate Your <span className="text-brand-600">Creative Strategy ROI</span>
              <br />with Precision Modeling
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Model different creative strategy scenarios and calculate exact ROI impact. 
              Get strategic recommendations based on Fortune 100 creative frameworks 
              and real performance data.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-500 rounded-full mr-2"></div>
                Fortune 100 methodology
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-500 rounded-full mr-2"></div>
                Real performance data
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-500 rounded-full mr-2"></div>
                Scenario modeling included
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SaaSCreativeROICalculator />
          </div>
        </section>

        {/* Consultation CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Optimize Your SaaS Creative Strategy?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get personalized recommendations and strategic implementation roadmap based on your calculator results.
            </p>
            <div className="space-y-4">
              <ConsultationBookingCTA 
                text="Book Strategy Call"
                variant="primary"
              />
              <p className="text-sm text-gray-600">
                Free strategic consultation • Custom implementation roadmap • ROI optimization plan
              </p>
            </div>
          </div>
        </section>

        {/* Content Navigation */}
        <ContentNavigation 
          currentPath="/saas-creative-strategy-roi-calculator" 
          variant="horizontal"
        />
      </div>
    </>
  );
}