'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ImplementationGuideProps {
  expandedSection: string | null;
  setExpandedSection: (section: string | null) => void;
}

export function ImplementationGuide({ expandedSection, setExpandedSection }: ImplementationGuideProps) {
  return (
    <>
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
    </>
  );
}