import type { Metadata } from 'next';
import { SaaSCreativeROICalculator } from '@/components/calculators/saas-creative-roi-calculator';
import { CreativeStrategyGuide } from '@/components/content/creative-strategy-guide';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';

export const metadata: Metadata = {
  title: 'SaaS Creative Strategy ROI Calculator - Measure Creative Performance Impact',
  description: 'Calculate the ROI of your SaaS creative strategy. Free calculator with scenario modeling and strategic recommendations for optimizing creative performance.'
  keywords: 'SaaS creative strategy, creative strategy ROI calculator, SaaS ad creative performance, creative strategy consultant, SaaS marketing creative optimization',
  openGraph: {
    title: 'SaaS Creative Strategy ROI Calculator - Optimize Your Creative Performance',
    description: 'Calculate the ROI of your SaaS creative strategy with our free calculator and get strategic recommendations.',
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
    name: 'Strategic Ad Intelligence System',
    url: 'https://mondaymorningmarketer.com'
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
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-emerald-600">Strategic Ad Intelligence</span>
              </div>
              <ConsultationBookingCTA variant="header" />
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Calculate Your <span className="text-emerald-600">Creative Strategy ROI</span>
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
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Fortune 100 methodology
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Real performance data
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
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

        {/* Creative Strategy Guide */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <CreativeStrategyGuide />
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