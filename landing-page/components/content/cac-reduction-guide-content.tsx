'use client';

import { useState } from 'react';
import { Calculator, Target, TrendingDown, Users, DollarSign, CheckCircle, ArrowRight, BookOpen, Download } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

interface CACCalculatorData {
  monthlyRevenue: number;
  currentCAC: number;
  monthlyAcquisitions: number;
  customerLTV: number;
  adSpend: number;
  conversionRate: number;
}

export function CACReductionGuideContent() {
  const [calculatorData, setCalculatorData] = useState<CACCalculatorData>({
    monthlyRevenue: 0,
    currentCAC: 0,
    monthlyAcquisitions: 0,
    customerLTV: 0,
    adSpend: 0,
    conversionRate: 0
  });
  
  const [showCalculatorResults, setShowCalculatorResults] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const calculateCACReduction = () => {
    setShowCalculatorResults(true);
  };

  const potentialSavings = calculatorData.currentCAC > 0 && calculatorData.monthlyAcquisitions > 0 
    ? (calculatorData.currentCAC * 0.35 * calculatorData.monthlyAcquisitions * 12)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Table of Contents */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Guide Overview</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Phase 1: Foundation & Analysis</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />CAC Measurement Framework</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Attribution Model Setup</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Baseline Performance Audit</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Competitor Benchmarking</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Phase 2: Optimization & Implementation</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Audience Segmentation Strategy</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Creative Performance Optimization</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Channel Mix Optimization</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Conversion Rate Enhancement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive CAC Calculator */}
      <section className="mb-16">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              CAC Reduction Potential Calculator
            </h2>
            <p className="text-gray-600">
              Calculate your potential savings using our Fortune 100 optimization framework
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current CAC ($)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.currentCAC || ''}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, currentCAC: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Acquisitions
                  </label>
                  <input
                    type="number"
                    value={calculatorData.monthlyAcquisitions || ''}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, monthlyAcquisitions: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 150"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer LTV ($)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.customerLTV || ''}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, customerLTV: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 1800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Ad Spend ($)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.adSpend || ''}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, adSpend: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 45000"
                  />
                </div>
              </div>

              <button
                onClick={calculateCACReduction}
                className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Calculate Reduction Potential
              </button>
            </div>

            <div className="space-y-6">
              {showCalculatorResults ? (
                <>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">Optimization Potential</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">35%</div>
                        <div className="text-sm text-green-700">Average CAC Reduction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">${potentialSavings.toLocaleString()}</div>
                        <div className="text-sm text-green-700">Annual Savings Potential</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-indigo-900 mb-3">Get Your Custom Implementation Plan</h4>
                    <EmailCaptureForm
                      placeholder="Enter your work email"
                      buttonText="Get Custom Plan"
                      variant="cta"
                      source="cac-calculator-results"
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-48 text-gray-500">
                  <div className="text-center">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter your metrics to see optimization potential</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <article className="prose prose-lg max-w-none">
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Customer Acquisition Cost Reduction Matters for Subscription Businesses</h2>
          <p className="text-lg text-gray-700 mb-6">
            Customer Acquisition Cost (CAC) is the most critical metric for subscription business growth. With the average B2B SaaS CAC increasing by 60% over the past five years, systematic CAC reduction has become essential for sustainable growth and profitability.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">Industry Benchmark Alert</h3>
                <p className="text-yellow-700">
                  Fortune 100 companies achieve CAC reduction of 25-45% through systematic optimization. 
                  Companies that don't optimize CAC see 15-20% annual increases due to increased competition and rising ad costs.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Fortune 100 CAC Reduction Framework</h3>
          <p className="text-gray-700 mb-6">
            This implementation guide is based on methodologies used by Fortune 100 companies to manage over $100M in annual ad spend. The framework focuses on four core pillars:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Precision Targeting</h4>
              <p className="text-gray-600 text-sm">Advanced audience segmentation using behavioral data and predictive modeling to eliminate wasted ad spend.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Attribution Accuracy</h4>
              <p className="text-gray-600 text-sm">Multi-touch attribution modeling to accurately measure and optimize CAC across all touchpoints.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Creative Intelligence</h4>
              <p className="text-gray-600 text-sm">Data-driven creative optimization using customer language analysis and performance scoring.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Channel Optimization</h4>
              <p className="text-gray-600 text-sm">Systematic budget allocation and channel mix optimization based on true CAC performance.</p>
            </div>
          </div>
        </section>

        {/* Phase 1: Foundation & Analysis */}
        <section className="mb-16">
          <div className="bg-indigo-50 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Phase 1: Foundation & Analysis</h2>
            <p className="text-lg text-gray-700">
              Establish accurate measurement and baseline performance before optimization begins.
            </p>
          </div>

          <div className="space-y-8">
            {/* CAC Measurement Framework */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedSection(expandedSection === 'cac-measurement' ? null : 'cac-measurement')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-gray-900">1. CAC Measurement Framework Setup</h3>
                <ArrowRight className={`h-5 w-5 text-gray-500 transition-transform ${expandedSection === 'cac-measurement' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'cac-measurement' && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 mb-4">
                    Accurate CAC measurement is the foundation of optimization. Most companies underestimate their true CAC by 20-40% due to incomplete cost attribution.
                  </p>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Complete CAC Calculation Formula:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <code className="text-sm">
                      True CAC = (Ad Spend + Sales Team Costs + Marketing Tools + Content Creation + Attribution Platform Costs) / New Customers Acquired
                    </code>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Implementation Checklist:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />Set up comprehensive cost tracking across all marketing activities</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />Implement customer journey tracking from first touch to conversion</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />Configure cohort-based CAC analysis for time-delayed conversions</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />Create automated CAC reporting dashboard with 7-day and 30-day windows</li>
                  </ul>
                  
                  <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Fortune 100 Best Practice:</h5>
                    <p className="text-blue-800 text-sm">
                      Track "blended CAC" (all marketing costs) and "paid CAC" (paid advertising only) separately. 
                      This reveals the true cost of organic channel support and enables more accurate optimization decisions.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Attribution Model Setup */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedSection(expandedSection === 'attribution-setup' ? null : 'attribution-setup')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-gray-900">2. Multi-Touch Attribution Model Setup</h3>
                <ArrowRight className={`h-5 w-5 text-gray-500 transition-transform ${expandedSection === 'attribution-setup' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'attribution-setup' && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 mb-4">
                    Single-touch attribution models (first-click or last-click) can misrepresent CAC by up to 60%. 
                    Multi-touch attribution provides accurate cost allocation across the entire customer journey.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">❌ Last-Click Attribution Problems</h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>• Over-credits bottom-funnel channels</li>
                        <li>• Under-values awareness-stage touchpoints</li>
                        <li>• Leads to budget misallocation</li>
                        <li>• Can increase true CAC by 25%+</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">✅ Multi-Touch Attribution Benefits</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Accurate cost allocation across touchpoints</li>
                        <li>• Reveals true channel performance</li>
                        <li>• Enables optimal budget allocation</li>
                        <li>• Reduces CAC through better optimization</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Recommended Attribution Models by Business Type:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Cycle</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Model</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">B2B SaaS (SMB)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7-30 days</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Time-decay (40-20-20-20)</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">B2B SaaS (Enterprise)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">90-180 days</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Position-based (40-20-40)</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">E-commerce</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1-7 days</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Linear attribution</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Baseline Performance Audit */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedSection(expandedSection === 'baseline-audit' ? null : 'baseline-audit')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-gray-900">3. Baseline Performance Audit</h3>
                <ArrowRight className={`h-5 w-5 text-gray-500 transition-transform ${expandedSection === 'baseline-audit' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'baseline-audit' && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 mb-6">
                    Establish current performance baselines across all marketing channels and customer segments. 
                    This audit identifies the highest-impact optimization opportunities.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-indigo-900 mb-3">Channel Performance</h4>
                      <ul className="text-sm text-indigo-800 space-y-1">
                        <li>• CAC by channel</li>
                        <li>• LTV:CAC ratios</li>
                        <li>• Conversion rates</li>
                        <li>• Customer quality scores</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-3">Audience Segments</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Demographic performance</li>
                        <li>• Behavioral segments</li>
                        <li>• Geographic performance</li>
                        <li>• Device/platform analysis</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-3">Creative Performance</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Ad creative CAC performance</li>
                        <li>• Landing page conversion rates</li>
                        <li>• Message-market fit scores</li>
                        <li>• Creative fatigue analysis</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h5 className="font-medium text-yellow-800 mb-2">Audit Discovery Example:</h5>
                    <p className="text-yellow-700 text-sm">
                      A $50M ARR SaaS company discovered that 30% of their ad spend was targeting audiences with CACs 2.5x higher than their best-performing segments. 
                      Reallocating this budget reduced overall CAC by 28% within 60 days.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Phase 2: Optimization & Implementation */}
        <section className="mb-16">
          <div className="bg-green-50 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Phase 2: Optimization & Implementation</h2>
            <p className="text-lg text-gray-700">
              Systematic implementation of CAC reduction strategies based on audit findings and industry best practices.
            </p>
          </div>

          <div className="space-y-8">
            {/* Audience Segmentation Strategy */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedSection(expandedSection === 'audience-segmentation' ? null : 'audience-segmentation')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-gray-900">4. Advanced Audience Segmentation Strategy</h3>
                <ArrowRight className={`h-5 w-5 text-gray-500 transition-transform ${expandedSection === 'audience-segmentation' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'audience-segmentation' && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 mb-6">
                    Advanced audience segmentation can reduce CAC by 35-50% by eliminating low-value audiences and 
                    concentrating spend on high-converting segments. This approach requires behavioral data analysis 
                    and predictive modeling.
                  </p>
                  
                  <h4 className="font-semibold text-gray-900 mb-4">The Fortune 100 Segmentation Framework:</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">High-Value Segment Identification</h5>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li className="flex items-start"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 mt-2"></span>Analyze customer behavior patterns for top 20% of customers</li>
                          <li className="flex items-start"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 mt-2"></span>Identify common characteristics (demographics, interests, behaviors)</li>
                          <li className="flex items-start"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 mt-2"></span>Create lookalike audiences based on highest-LTV customers</li>
                          <li className="flex items-start"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 mt-2"></span>Use predictive modeling to score prospect quality</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Low-Value Segment Elimination</h5>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></span>Identify segments with CAC &gt; 60% of LTV</li>
                          <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></span>Exclude low-converting demographic segments</li>
                          <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></span>Remove geographic regions with poor performance</li>
                          <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></span>Filter out devices/platforms with high CAC</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 p-6 rounded-lg mb-6">
                    <h5 className="font-semibold text-indigo-900 mb-3">Implementation Roadmap (90-Day Timeline):</h5>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-medium text-indigo-800 mb-2">Days 1-30: Analysis</h6>
                        <ul className="text-sm text-indigo-700 space-y-1">
                          <li>• Customer cohort analysis</li>
                          <li>• Segment performance mapping</li>
                          <li>• Lookalike audience creation</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium text-indigo-800 mb-2">Days 31-60: Testing</h6>
                        <ul className="text-sm text-indigo-700 space-y-1">
                          <li>• A/B test new segments</li>
                          <li>• Budget reallocation testing</li>
                          <li>• Performance monitoring</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium text-indigo-800 mb-2">Days 61-90: Scaling</h6>
                        <ul className="text-sm text-indigo-700 space-y-1">
                          <li>• Scale winning segments</li>
                          <li>• Eliminate poor performers</li>
                          <li>• Optimize budget allocation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Creative Performance Optimization */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedSection(expandedSection === 'creative-optimization' ? null : 'creative-optimization')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-gray-900">5. Creative Performance Optimization</h3>
                <ArrowRight className={`h-5 w-5 text-gray-500 transition-transform ${expandedSection === 'creative-optimization' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'creative-optimization' && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 mb-6">
                    Creative optimization can reduce CAC by 20-35% through systematic testing and customer language analysis. 
                    Most companies focus on design elements while ignoring the psychological triggers that drive conversions.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Customer Language Analysis Process</h4>
                      <div className="space-y-4">
                        <div className="border-l-4 border-indigo-400 pl-4">
                          <h5 className="font-medium text-gray-900 mb-2">Step 1: Data Collection</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Customer interview transcripts</li>
                            <li>• Support ticket analysis</li>
                            <li>• Sales call recordings</li>
                            <li>• Review and testimonial mining</li>
                          </ul>
                        </div>
                        
                        <div className="border-l-4 border-green-400 pl-4">
                          <h5 className="font-medium text-gray-900 mb-2">Step 2: Language Extraction</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Pain point identification</li>
                            <li>• Benefit articulation patterns</li>
                            <li>• Emotional trigger mapping</li>
                            <li>• Objection and concern themes</li>
                          </ul>
                        </div>
                        
                        <div className="border-l-4 border-purple-400 pl-4">
                          <h5 className="font-medium text-gray-900 mb-2">Step 3: Creative Development</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Hook creation using exact language</li>
                            <li>• Benefit-focused messaging</li>
                            <li>• Objection-handling copy</li>
                            <li>• Social proof integration</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">High-Impact Creative Elements</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Headlines That Convert</h5>
                            <div className="text-sm text-gray-700">
                              <div className="bg-red-50 p-3 rounded mb-2">
                                <strong className="text-red-800">❌ Generic:</strong> "Best Project Management Software"
                              </div>
                              <div className="bg-green-50 p-3 rounded">
                                <strong className="text-green-800">✅ Customer Language:</strong> "Finally, Stop Chasing Team Members for Project Updates"
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Social Proof Elements</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Specific customer outcomes ("Reduced CAC by 34%")</li>
                              <li>• Industry-specific testimonials</li>
                              <li>• Usage statistics ("10,000+ companies trust us")</li>
                              <li>• Recognizable brand logos</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                    <h5 className="font-medium text-yellow-800 mb-2">Creative Testing Success Story:</h5>
                    <p className="text-yellow-700 text-sm mb-3">
                      A B2B SaaS company reduced CAC by 42% by replacing feature-focused ad copy with customer language. 
                      Instead of "Advanced Analytics Dashboard," they used "See Exactly Why Customers Cancel (Before They Do)" 
                      — language extracted directly from customer interviews.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white p-3 rounded">
                        <div className="text-lg font-bold text-red-600">$380</div>
                        <div className="text-xs text-gray-600">Original CAC</div>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <div className="text-lg font-bold text-green-600">$220</div>
                        <div className="text-xs text-gray-600">Optimized CAC</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Implementation Templates & Resources */}
        <section className="mb-16">
          <div className="bg-purple-50 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Implementation Templates & Resources</h2>
            <p className="text-lg text-gray-700">
              Download the complete toolkit used by Fortune 100 companies to systematically reduce CAC.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">CAC Optimization Toolkit</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Excel CAC Calculator with Attribution Models</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Audience Segmentation Analysis Template</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Creative Performance Tracking Spreadsheet</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />90-Day Implementation Checklist</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Customer Language Analysis Framework</li>
              </ul>
              <EmailCaptureForm
                placeholder="Enter your work email"
                buttonText="Download Toolkit"
                variant="cta"
                source="cac-guide-toolkit"
              />
            </div>
            
            <div className="bg-indigo-600 text-white rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Free Strategic CAC Audit</h3>
              <p className="text-indigo-100 mb-6">
                Get a personalized CAC reduction strategy session with our senior strategists. 
                We'll analyze your current performance and create a custom 90-day optimization roadmap.
              </p>
              <ul className="space-y-2 text-indigo-100 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />30-minute strategic assessment</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Custom CAC reduction projection</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Personalized implementation roadmap</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />No-obligation strategic guidance</li>
              </ul>
              <ConsultationBookingCTA 
                variant="secondary" 
                text="Book Free CAC Audit"
              />
            </div>
          </div>
        </section>

        {/* Conclusion & Next Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: Your CAC Reduction Implementation Plan</h2>
          <p className="text-lg text-gray-700 mb-8">
            Customer acquisition cost reduction is not a one-time optimization — it's a systematic, ongoing process. 
            The companies that consistently outperform their competitors are those that treat CAC optimization as a core competency, 
            not a side project.
          </p>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Next Steps (Start Today):</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Week 1: Foundation</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Implement true CAC tracking</li>
                  <li>• Set up attribution modeling</li>
                  <li>• Complete baseline audit</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Weeks 2-4: Analysis</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Audience segmentation analysis</li>
                  <li>• Creative performance review</li>
                  <li>• Channel optimization planning</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Weeks 5-12: Implementation</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Launch optimized campaigns</li>
                  <li>• Continuous testing and iteration</li>
                  <li>• Scale winning strategies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}