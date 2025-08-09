import type { Metadata } from 'next';
import { CACOptimizationCalculator } from '@/components/calculators/cac-optimization-calculator';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { StructuredData } from '@/components/structured-data';
import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'CAC Optimization Calculator - Fortune 100 Weekly Trend Intelligence',
  description: 'Free CAC calculator + weekly trend intelligence from $100M+ ad spend experience. Get competitor analysis and viral scripts delivered every Monday starting at $67/month.',
  keywords: 'CAC optimization, weekly trend intelligence, competitor analysis, viral scripts, Fortune 100 marketing, subscription business growth',
  openGraph: {
    title: 'CAC Optimization Calculator - Fortune 100 Weekly Trend Intelligence',
    description: 'Free CAC calculator + weekly trend intelligence from $100M+ ad spend experience. Viral scripts delivered every Monday.',
    type: 'website',
  },
  alternates: {
    canonical: '/cac-optimization-calculator',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CAC Optimization Calculator',
  applicationCategory: 'BusinessApplication',
  description: 'Calculate and optimize your customer acquisition costs with our strategic framework',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free CAC optimization calculator and strategic guide'
  },
  provider: {
    '@type': 'Organization',
    name: 'Apsics Media',
    url: 'https://apsicsmedia.com'
  }
};

export default function CACOptimizationCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16 lg:pt-20">

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Reduce Your CAC by <span className="text-indigo-600">40%</span> with Our
              <br />Fortune 100 Optimization Framework
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Get instant CAC optimization recommendations based on the same methodology 
              we use for Fortune 100 companies. Calculate your potential savings and 
              get a personalized strategic roadmap.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Used by Fortune 100 companies
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Average 40% CAC reduction
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Free strategic consultation
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <CACOptimizationCalculator />
          </div>
        </section>

        {/* Strategic Framework Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              The Strategic Ad Intelligence CAC Optimization Framework
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Audience Intelligence</h3>
                <p className="text-gray-600">
                  Deep-dive analysis of your highest-value customer segments using 
                  behavioral data and predictive modeling.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Channel Optimization</h3>
                <p className="text-gray-600">
                  Identify the most cost-effective acquisition channels and optimize 
                  budget allocation using multi-touch attribution.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Creative Strategy</h3>
                <p className="text-gray-600">
                  Develop high-converting ad creatives using customer language 
                  and behavioral triggers that reduce CAC.
                </p>
              </div>
            </div>

            {/* Framework Methodology */}
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-semibold mb-4">Our Systematic CAC Optimization Approach</h3>
              <p className="text-gray-700 mb-4">
                Our proven 3-phase methodology systematically identifies and eliminates 
                inefficiencies in your customer acquisition process:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">1.</span>
                  <strong>Audience Intelligence:</strong> Deep analysis of your highest-value customer segments
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">2.</span>
                  <strong>Channel Optimization:</strong> Multi-touch attribution for accurate budget allocation
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">3.</span>
                  <strong>Creative Strategy:</strong> Customer language analysis driving message optimization
                </li>
              </ul>
              <div className="text-center bg-indigo-50 rounded-lg p-6">
                <div className="text-lg font-semibold text-indigo-800 mb-2">
                  Typical Results: 30-50% CAC Reduction
                </div>
                <div className="text-sm text-indigo-600">
                  Based on systematic optimization of audience targeting, channel allocation, and creative messaging
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Get Your Personalized CAC Optimization Strategy
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Subscribe to get weekly CAC optimization insights and a 
              free strategic consultation to implement proven frameworks in your business.
            </p>
            
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
              <EmailCaptureForm
                placeholder="Enter your work email"
                buttonText="Get Free Playbook"
                variant="cta"
                source="cac-calculator-page"
              />
            </div>
            
            <div className="mt-8">
              <ConsultationBookingCTA 
                variant="secondary" 
                text="Book Free CAC Strategy Call"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">How accurate is the CAC calculator?</h3>
                <p className="text-gray-700">
                  Our calculator provides directional insights based on industry benchmarks 
                  and proven optimization strategies. For precise recommendations tailored 
                  to your business, we recommend a strategic consultation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">What industries do you work with?</h3>
                <p className="text-gray-700">
                  We specialize in B2B SaaS, subscription services, and high-value 
                  service businesses with CACs above $200. Our frameworks are most 
                  effective for companies with $1M+ in annual revenue.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">How long does CAC optimization take?</h3>
                <p className="text-gray-700">
                  Initial optimizations can show results within 30-60 days. Complete 
                  framework implementation typically takes 90-120 days, with ongoing 
                  optimization for maximum ROI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Navigation */}
        <ContentNavigation 
          currentPath="/cac-optimization-calculator" 
          variant="horizontal"
        />
      </div>
    </>
  );
}