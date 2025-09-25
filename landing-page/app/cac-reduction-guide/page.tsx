import type { Metadata } from 'next';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { CACReductionCalculator } from '@/components/calculators/cac-reduction-calculator';
import { Header } from '@/components/layout/secondary-header';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'Customer Acquisition Cost Reduction: Step-by-Step Implementation Guide | Strategic Ad Intelligence',
  description: 'Complete guide to reduce customer acquisition cost for subscription businesses. Proven enterprise methodology, implementation checklist, and strategic framework.',
  keywords: 'reduce customer acquisition cost subscription business, CAC reduction strategy, customer acquisition cost optimization, subscription marketing efficiency',
  openGraph: {
    title: 'Customer Acquisition Cost Reduction: Step-by-Step Implementation Guide',
    description: 'Complete guide to reduce customer acquisition cost for subscription businesses. Proven enterprise methodology and implementation framework.',
    type: 'article',
  },
  alternates: {
    canonical: '/cac-reduction-guide',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Customer Acquisition Cost Reduction: Step-by-Step Implementation Guide',
  description: 'Complete guide to reduce customer acquisition cost for subscription businesses using proven enterprise methodology',
  author: {
    '@type': 'Organization',
    name: 'Strategic Ad Intelligence System',
    url: 'https://apsicsmedia.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Strategic Ad Intelligence System',
    logo: {
      '@type': 'ImageObject',
      url: 'https://apsicsmedia.com/logo.png'
    }
  },
  datePublished: '2024-01-15',
  dateModified: '2024-01-15',
};

export default function CACReductionGuidePage() {
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
        <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-white">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 mb-6">
              <span className="text-sm font-medium text-gray-700">🎯 Enterprise-Proven Methodology</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Customer Acquisition Cost Reduction:
              <br />
              <span className="text-[#126DFB]">Step-by-Step Implementation Guide</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              The complete strategic framework to reduce customer acquisition costs by 30-50% 
              for subscription businesses. Based on methodologies proven at enterprise scale, 
              adapted for $500K-$2M ARR companies.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-500 rounded-full mr-2"></div>
                11-Phase systematic approach
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-500 rounded-full mr-2"></div>
                $100M+ ad spend managed
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-500 rounded-full mr-2"></div>
                Implementation templates included
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FreeWeekButton source="cac_reduction_guide-cta" className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg">Claim 10 Free Credits</FreeWeekButton>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-20 bg-[#F8F8F8] relative">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Implementation Guide Contents</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-[#126DFB]">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Strategic Foundation Assessment</h3>
                    <p className="text-sm text-gray-600">Current state analysis and baseline establishment</p>
                  </div>
                </div>
                <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-[#126DFB]">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Audience Intelligence Framework</h3>
                    <p className="text-sm text-gray-600">High-value segment identification and targeting</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-indigo-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Channel Optimization Strategy</h3>
                    <p className="text-sm text-gray-600">Budget allocation and channel performance optimization</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-indigo-600">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Creative Intelligence System</h3>
                    <p className="text-sm text-gray-600">Data-driven creative development and testing</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-indigo-600">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Attribution Modeling</h3>
                    <p className="text-sm text-gray-600">Accurate CAC measurement and optimization</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-indigo-600">6</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Conversion Rate Optimization</h3>
                    <p className="text-sm text-gray-600">Landing page and funnel optimization framework</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-indigo-600">7</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Performance Measurement</h3>
                    <p className="text-sm text-gray-600">KPIs, dashboards, and continuous optimization</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-indigo-600">8</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Implementation Roadmap</h3>
                    <p className="text-sm text-gray-600">90-day execution plan with milestones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20 bg-white relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Calculate Your CAC Reduction Potential
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Use our strategic calculator to estimate potential savings and get personalized 
                recommendations based on your current acquisition metrics.
              </p>
            </div>
            <CACReductionCalculator />
          </div>
        </section>

        {/* Detailed Framework Section */}
        <section className="py-20 bg-[#F8F8F8] relative">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              The Strategic CAC Reduction Framework
            </h2>
            
            {/* Phase 1 */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#126DFB] rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Strategic Foundation Assessment</h3>
              </div>
              
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
                <h4 className="text-xl font-semibold mb-4">Current State Analysis</h4>
                <p className="text-gray-700 mb-4">
                  Before optimizing CAC, establish a comprehensive baseline of your current 
                  acquisition performance across all channels and customer segments.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-3">Key Metrics to Audit:</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        Blended CAC across all channels
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        Channel-specific CAC performance
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        Customer lifetime value (LTV) by segment
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        LTV:CAC ratios and payback periods
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        Conversion rates through funnel stages
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3">Data Collection Framework:</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        Historical performance data (12+ months)
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        Attribution model configuration
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        Customer journey mapping
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        Competitive intelligence gathering
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        Market benchmark analysis
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#126DFB] rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Audience Intelligence Framework</h3>
              </div>
              
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
                <h4 className="text-xl font-semibold mb-4">High-Value Segment Identification</h4>
                <p className="text-gray-700 mb-6">
                  The most impactful CAC reductions come from focusing acquisition efforts on 
                  customers with the highest lifetime value and lowest acquisition costs.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <h5 className="font-semibold mb-3">Behavioral Segmentation</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Usage pattern analysis</li>
                      <li>• Feature adoption rates</li>
                      <li>• Engagement depth scoring</li>
                      <li>• Churn risk indicators</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3">Firmographic Analysis</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Company size optimization</li>
                      <li>• Industry vertical focus</li>
                      <li>• Geographic concentration</li>
                      <li>• Technology stack alignment</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-semibold mb-3">Psychographic Profiling</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Decision-making triggers</li>
                      <li>• Pain point prioritization</li>
                      <li>• Communication preferences</li>
                      <li>• Value perception drivers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Section */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-12 border border-blue-200">
              <h3 className="text-2xl font-semibold mb-6">Case Study: B2B SaaS CAC Reduction Implementation</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Challenge:</h4>
                  <p className="text-gray-700 mb-4">
                    A $2M ARR project management SaaS was experiencing unsustainable CAC growth. 
                    Their blended CAC had increased from $180 to $340 over 18 months while LTV 
                    remained flat at $1,200.
                  </p>
                  <h4 className="font-semibold mb-4">Strategic Approach:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-brand-500 mr-2">✓</span>
                      Identified 3 high-LTV customer micro-segments
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-500 mr-2">✓</span>
                      Optimized channel mix based on segment preferences
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-500 mr-2">✓</span>
                      Developed segment-specific creative strategies
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-500 mr-2">✓</span>
                      Implemented attribution modeling for accurate measurement
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Results After 90 Days:</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Blended CAC</span>
                        <div className="text-right">
                          <div className="text-brand-600 line-through">$340</div>
                          <div className="text-brand-600 font-bold">$195</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">LTV:CAC Ratio</span>
                        <div className="text-right">
                          <div className="text-brand-600 line-through">3.5:1</div>
                          <div className="text-brand-600 font-bold">6.2:1</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monthly Savings</span>
                        <div className="text-brand-600 font-bold">$87,000</div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">CAC Reduction</span>
                        <div className="text-brand-600 font-bold">42.6%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Checklist */}
        <section className="py-20 bg-white relative">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              90-Day Implementation Checklist
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-6 text-[#126DFB]">Days 1-30: Foundation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Complete baseline CAC audit</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Implement attribution tracking</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Analyze customer segments</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Map customer journey touchpoints</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Conduct competitive analysis</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">Days 31-60: Optimization</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Reallocate budget to high-ROI channels</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Launch segment-specific campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Optimize landing pages for conversion</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Implement creative testing framework</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Set up automated reporting dashboards</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">Days 61-90: Scale</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Scale winning campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Implement predictive modeling</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Optimize customer onboarding flow</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Build advanced attribution models</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm">Document and systematize processes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation Section */}
        <section className="py-20 bg-[#F8F8F8] relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get Your Complete CAC Reduction Implementation Kit
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Download our comprehensive toolkit including templates, checklists, and strategic 
              frameworks. Plus, get a free CAC audit consultation to identify your biggest opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FreeWeekButton source="cac_reduction_guide-cta" className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg">Claim 10 Free Credits</FreeWeekButton>
            </div>
            
            <div className="text-gray-600 mt-8 max-w-md mx-auto">
              <div className="text-sm bg-white p-4 rounded-xl shadow-lg">
                ✓ 10 proven CAC-reducing hooks<br />
                ✓ Strategic implementation guide<br />
                ✓ Weekly trend intelligence newsletter<br />
                ✓ Platform adaptation frameworks
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-20 bg-white relative">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Related Strategic Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col min-h-[200px]">
                <h3 className="text-lg font-semibold mb-3">CAC Optimization Calculator</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Interactive calculator to estimate your CAC reduction potential and ROI.
                </p>
                <FreeWeekButton source="cac_reduction_guide-cta" className="text-[#126DFB] font-semibold hover:underline mt-auto">Claim 10 Free Credits</FreeWeekButton>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col min-h-[200px]">
                <h3 className="text-lg font-semibold mb-3">Expert Creative Intelligence Suite</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Advanced tools for automated creative analysis and strategic optimization.
                </p>
                <FreeWeekButton source="cac_reduction_guide-cta" className="text-indigo-600 font-semibold hover:underline mt-auto">Claim 10 Free Credits</FreeWeekButton>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col min-h-[200px]">
                <h3 className="text-lg font-semibold mb-3">Marketing Attribution Framework</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Advanced attribution modeling for accurate CAC measurement and optimization.
                </p>
                <FreeWeekButton source="cac_reduction_guide-cta" className="text-indigo-600 font-semibold hover:underline mt-auto">Claim 10 Free Credits</FreeWeekButton>
              </div>
            </div>
          </div>
        </section>

        {/* Content Navigation */}
        <ContentNavigation 
          currentPath="/cac-reduction-guide" 
          variant="horizontal"
        />
      </div>
    </>
  );
}
