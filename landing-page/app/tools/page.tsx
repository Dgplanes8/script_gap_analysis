import type { Metadata } from 'next';
import { Header } from '@/components/layout/secondary-header';
import { Footer } from '@/components/layout/footer';
import { StructuredData } from '@/components/schema';
import { ROICalculator } from '@/components/calculators/roi-calculator';
import { CreativeStrategyBenchmarkTool } from '@/components/calculators/creative-strategy-benchmark-tool';
import { HookGeneratorDemo } from '@/components/creative/hook-generator-demo';
import { Calculator, Target, Zap, BarChart3, ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Revenue Optimization Tools | ROI Calculator, Creative Assessment & Hook Generator | APSICS Media',
  description: 'Free tools for business growth: ad ROI calculator, creative benchmark assessment, hook generator. Optimize your marketing budget and boost revenue performance.',
  keywords: 'ad ROI calculator, creative benchmark tool, revenue optimization tools, hook generator, marketing budget calculator, creative assessment, performance marketing tools',
  openGraph: {
    title: 'Free Revenue Optimization Tools | ROI Calculator & Creative Assessment',
    description: 'Free tools for business growth: ad ROI calculator, creative benchmark assessment, hook generator. Optimize your marketing budget and boost revenue.',
    type: 'website',
    images: [
      {
        url: '/images/tools-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Startup Marketing Tools - ROI Calculator and Creative Assessment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Startup Marketing Tools | ROI Calculator & Creative Assessment',
    description: 'Free tools for startup founders: ROI calculator, creative assessment, hook generator.',
    images: ['/images/tools-og.jpg'],
  },
  alternates: {
    canonical: '/tools',
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

export default function ToolsPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        pageType="service"
        title="Free Startup Marketing Tools"
        description="Free tools for startup founders: ad ROI calculator, creative benchmark assessment, hook generator. Optimize your marketing budget and improve campaign performance."
        slug="/tools"
        additionalSchemas={[
          {
            '@type': 'SoftwareApplication',
            name: 'Startup Marketing ROI Calculator',
            description: 'Calculate potential return on investment for startup marketing campaigns',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            }
          },
          {
            '@type': 'SoftwareApplication',
            name: 'Creative Strategy Benchmark Tool',
            description: 'Assess your creative strategy performance against industry benchmarks',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            }
          },
          {
            '@type': 'SoftwareApplication',
            name: 'Hook Generator Demo',
            description: 'Generate platform-native ad hooks optimized for audience awareness levels',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            }
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
                <Calculator className="h-4 w-4 mr-2" />
                FREE MARKETING TOOLS
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Free Tools to Optimize Your Startup Marketing
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Professional marketing calculators and assessment tools designed for startup founders. Optimize your budget and benchmark your creative strategy.
              </p>
              
              {/* Tool Categories */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">ROI Calculator</h3>
                  <p className="text-gray-600 text-sm">Calculate potential returns and optimize budget allocation</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Creative Benchmark</h3>
                  <p className="text-gray-600 text-sm">Assess your creative strategy against industry standards</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hook Generator</h3>
                  <p className="text-gray-600 text-sm">Generate platform-native hooks that stop the scroll</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Calculator className="h-4 w-4 mr-2" />
                TOOL #1
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Startup Marketing ROI Calculator
              </h2>
              <p className="text-xl text-gray-600">
                Calculate potential returns on your marketing investment and optimize budget allocation across channels
              </p>
            </div>
          </div>
          
          {/* ROI Calculator Component */}
          <ROICalculator />
        </section>

        {/* Creative Benchmark Tool Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <BarChart3 className="h-4 w-4 mr-2" />
                TOOL #2
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Creative Strategy Benchmark Assessment
              </h2>
              <p className="text-xl text-gray-600">
                Evaluate your creative strategy performance using our 25-point scoring framework from $250MM+ in managed ad spend
              </p>
            </div>
          </div>
          
          {/* Creative Benchmark Tool Component */}
          <CreativeStrategyBenchmarkTool />
        </section>

        {/* Hook Generator Demo Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Zap className="h-4 w-4 mr-2" />
                TOOL #3
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hook Generator Demo
              </h2>
              <p className="text-xl text-gray-600">
                Generate platform-native hooks optimized for each audience awareness level using our proven formula
              </p>
            </div>
          </div>
          
          {/* Hook Generator Demo Component */}
          <HookGeneratorDemo />
        </section>


        {/* Tool Benefits */}
        <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why These Tools Work for Startups
                </h2>
                <p className="text-xl text-gray-600">
                  Built specifically for startup founders who need professional results without agency overhead
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Data-Driven Insights</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Based on $250MM+ in real ad spend data</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Validated frameworks from Fortune 100 campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Industry benchmarks from 500+ launched campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Performance scoring system used by top agencies</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Startup-Focused</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <Zap className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Designed for limited budgets ($500-$5K/month)</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Quick results for fast-moving startup teams</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>No complex setup or onboarding required</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Practical recommendations you can implement today</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Usage Guide */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How to Use These Tools Effectively
                </h2>
                <p className="text-xl text-gray-600">
                  Get maximum value from each tool with these proven workflows
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Start with ROI Planning</h3>
                  <p className="text-gray-600 mb-4">
                    Before launching any campaigns, use the ROI Calculator to understand your expected returns and optimal budget allocation. This helps you set realistic expectations and avoid overspending.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Input Your Metrics</div>
                      <div className="text-gray-600">Customer LTV, conversion rates, current CAC</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Get Recommendations</div>
                      <div className="text-gray-600">Optimal spend per channel and expected returns</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Plan Your Budget</div>
                      <div className="text-gray-600">Allocate budget based on projected ROI</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Benchmark Your Creative Strategy</h3>
                  <p className="text-gray-600 mb-4">
                    Use the Creative Benchmark Tool to evaluate your current ad creative against proven performance standards. Identify gaps and improvement opportunities.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Assess Current Ads</div>
                      <div className="text-gray-600">Score your existing creative using 25-point framework</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Identify Gaps</div>
                      <div className="text-gray-600">See where your creative underperforms vs benchmarks</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Get Improvement Plan</div>
                      <div className="text-gray-600">Specific recommendations for better performance</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Generate High-Converting Hooks</h3>
                  <p className="text-gray-600 mb-4">
                    Use the Hook Generator to create attention-grabbing ad hooks and headlines. Test multiple variations to find what resonates with your audience.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Input Product Info</div>
                      <div className="text-gray-600">Describe your product and target audience</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Generate Variations</div>
                      <div className="text-gray-600">Get multiple hook options using different frameworks</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Test and Optimize</div>
                      <div className="text-gray-600">A/B test hooks to find top performers</div>
                    </div>
                  </div>
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
                Ready for Professional Creative Strategy?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                These tools give you a taste of our strategic approach. Get the full experience with weekly templates and dedicated creative intelligence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  href="/free-hooks"
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Get Free Templates
                </Link>
                <Link
                  href="/#service-tiers"
                  className="bg-orange-800 hover:bg-orange-900 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  See Weekly Plans
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <p className="text-lg opacity-90 mb-2">
                  <strong>Like these tools?</strong> Get fresh templates every Monday with the same strategic depth.
                </p>
                <p className="text-sm opacity-75">
                  Professional creative intelligence at startup pricing - starting at $15/week.
                </p>
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