'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Target, PieChart, BarChart3, Zap } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

interface CreativeData {
  monthlyAdSpend: number;
  currentCTR: number;
  currentCVR: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  creativeRefreshFrequency: string;
  adAccountAge: string;
  primaryObjective: string;
  industry: string;
}

interface ROIScenario {
  name: string;
  ctrImprovement: number;
  cvrImprovement: number;
  description: string;
  timeframe: string;
}

interface ROIResults {
  currentPerformance: {
    monthlyConversions: number;
    monthlyRevenue: number;
    costPerAcquisition: number;
    returnOnAdSpend: number;
  };
  optimizedPerformance: {
    monthlyConversions: number;
    monthlyRevenue: number;
    costPerAcquisition: number;
    returnOnAdSpend: number;
  };
  improvements: {
    additionalConversions: number;
    additionalRevenue: number;
    cacReduction: number;
    roasImprovement: number;
    annualRevenueIncrease: number;
  };
  recommendedScenario: ROIScenario;
}

const roiScenarios: ROIScenario[] = [
  {
    name: 'Conservative Optimization',
    ctrImprovement: 35,
    cvrImprovement: 25,
    description: 'Customer language hooks + basic creative testing',
    timeframe: '30-60 days'
  },
  {
    name: 'Strategic Overhaul',
    ctrImprovement: 85,
    cvrImprovement: 60,
    description: 'Complete creative strategy + audience intelligence',
    timeframe: '60-90 days'
  },
  {
    name: 'Advanced Optimization',
    ctrImprovement: 150,
    cvrImprovement: 120,
    description: 'AI-driven personalization + dynamic creative optimization',
    timeframe: '90-120 days'
  }
];

const industryBenchmarks: Record<string, { avgCTR: number; avgCVR: number; topQuartileCTR: number; topQuartileCVR: number }> = {
  'b2b-saas': { avgCTR: 2.4, avgCVR: 3.2, topQuartileCTR: 4.8, topQuartileCVR: 6.1 },
  'fintech': { avgCTR: 1.8, avgCVR: 2.7, topQuartileCTR: 3.9, topQuartileCVR: 5.2 },
  'ecommerce': { avgCTR: 3.1, avgCVR: 4.6, topQuartileCTR: 5.8, topQuartileCVR: 8.3 },
  'healthcare': { avgCTR: 2.1, avgCVR: 3.8, topQuartileCTR: 4.2, topQuartileCVR: 6.9 },
  'education': { avgCTR: 2.8, avgCVR: 4.1, topQuartileCTR: 5.1, topQuartileCVR: 7.2 },
  'other': { avgCTR: 2.5, avgCVR: 3.5, topQuartileCTR: 4.5, topQuartileCVR: 6.0 }
};

export function SaaSCreativeROICalculator() {
  const [formData, setFormData] = useState<CreativeData>({
    monthlyAdSpend: 0,
    currentCTR: 0,
    currentCVR: 0,
    averageOrderValue: 0,
    customerLifetimeValue: 0,
    creativeRefreshFrequency: 'monthly',
    adAccountAge: '1-2-years',
    primaryObjective: 'lead-generation',
    industry: 'b2b-saas'
  });

  const [selectedScenario, setSelectedScenario] = useState<ROIScenario>(roiScenarios[1]);
  const [results, setResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const calculateROI = () => {
    const { monthlyAdSpend, currentCTR, currentCVR, averageOrderValue } = formData;
    
    // Current performance calculations
    const monthlyClicks = (monthlyAdSpend / 0.85) * (currentCTR / 100); // Assuming $0.85 avg CPC
    const currentConversions = monthlyClicks * (currentCVR / 100);
    const currentRevenue = currentConversions * averageOrderValue;
    const currentCAC = monthlyAdSpend / currentConversions;
    const currentROAS = currentRevenue / monthlyAdSpend;
    
    // Optimized performance with selected scenario
    const optimizedCTR = currentCTR * (1 + selectedScenario.ctrImprovement / 100);
    const optimizedCVR = currentCVR * (1 + selectedScenario.cvrImprovement / 100);
    
    const optimizedClicks = (monthlyAdSpend / 0.85) * (optimizedCTR / 100);
    const optimizedConversions = optimizedClicks * (optimizedCVR / 100);
    const optimizedRevenue = optimizedConversions * averageOrderValue;
    const optimizedCAC = monthlyAdSpend / optimizedConversions;
    const optimizedROAS = optimizedRevenue / monthlyAdSpend;
    
    // Calculate improvements
    const additionalConversions = optimizedConversions - currentConversions;
    const additionalRevenue = optimizedRevenue - currentRevenue;
    const cacReduction = ((currentCAC - optimizedCAC) / currentCAC) * 100;
    const roasImprovement = ((optimizedROAS - currentROAS) / currentROAS) * 100;
    const annualRevenueIncrease = additionalRevenue * 12;
    
    setResults({
      currentPerformance: {
        monthlyConversions: Math.round(currentConversions),
        monthlyRevenue: Math.round(currentRevenue),
        costPerAcquisition: Math.round(currentCAC),
        returnOnAdSpend: Number(currentROAS.toFixed(2))
      },
      optimizedPerformance: {
        monthlyConversions: Math.round(optimizedConversions),
        monthlyRevenue: Math.round(optimizedRevenue),
        costPerAcquisition: Math.round(optimizedCAC),
        returnOnAdSpend: Number(optimizedROAS.toFixed(2))
      },
      improvements: {
        additionalConversions: Math.round(additionalConversions),
        additionalRevenue: Math.round(additionalRevenue),
        cacReduction: Math.round(cacReduction),
        roasImprovement: Math.round(roasImprovement),
        annualRevenueIncrease: Math.round(annualRevenueIncrease)
      },
      recommendedScenario: selectedScenario
    });
    
    setShowResults(true);
    
    // Show lead capture after viewing results
    setTimeout(() => setShowLeadCapture(true), 4000);
  };

  const handleInputChange = (field: keyof CreativeData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? (isNaN(parseFloat(value)) ? value : parseFloat(value)) : value
    }));
  };

  const isFormValid = formData.monthlyAdSpend > 0 && formData.currentCTR > 0 && formData.currentCVR > 0 && formData.averageOrderValue > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            SaaS Creative Strategy ROI Calculator
          </h2>
          <p className="text-emerald-100">
            Model different creative optimization scenarios and calculate precise ROI impact
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Performance Metrics</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="b2b-saas">B2B SaaS</option>
                <option value="fintech">FinTech</option>
                <option value="ecommerce">E-commerce</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Ad Spend ($)
                </label>
                <input
                  type="number"
                  value={formData.monthlyAdSpend || ''}
                  onChange={(e) => handleInputChange('monthlyAdSpend', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. 15000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current CTR (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.currentCTR || ''}
                  onChange={(e) => handleInputChange('currentCTR', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. 2.4"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current CVR (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.currentCVR || ''}
                  onChange={(e) => handleInputChange('currentCVR', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. 3.2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Order Value ($)
                </label>
                <input
                  type="number"
                  value={formData.averageOrderValue || ''}
                  onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. 97"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Lifetime Value ($)
              </label>
              <input
                type="number"
                value={formData.customerLifetimeValue || ''}
                onChange={(e) => handleInputChange('customerLifetimeValue', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g. 1200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Creative Refresh Frequency
                </label>
                <select
                  value={formData.creativeRefreshFrequency}
                  onChange={(e) => handleInputChange('creativeRefreshFrequency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="rarely">Rarely/Never</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Account Age
                </label>
                <select
                  value={formData.adAccountAge}
                  onChange={(e) => handleInputChange('adAccountAge', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="under-6-months">Under 6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="1-2-years">1-2 years</option>
                  <option value="2-years-plus">2+ years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scenario Selection & Results */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Scenario</h3>
            
            <div className="space-y-4">
              {roiScenarios.map((scenario) => (
                <div
                  key={scenario.name}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedScenario.name === scenario.name
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
                    <span className="text-sm text-emerald-600 font-medium">{scenario.timeframe}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600">CTR: +{scenario.ctrImprovement}%</span>
                    <span className="text-emerald-600">CVR: +{scenario.cvrImprovement}%</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={calculateROI}
              disabled={!isFormValid}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                isFormValid
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Calculate ROI Impact
            </button>
          </div>
        </div>

        {/* Results Display */}
        {showResults && results && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              ROI Analysis Results
            </h3>
            
            {/* Performance Comparison */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 text-gray-600 mr-2" />
                  Current Performance
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Conversions:</span>
                    <span className="font-semibold">{results.currentPerformance.monthlyConversions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-semibold">${results.currentPerformance.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost Per Acquisition:</span>
                    <span className="font-semibold">${results.currentPerformance.costPerAcquisition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Return on Ad Spend:</span>
                    <span className="font-semibold">{results.currentPerformance.returnOnAdSpend}x</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
                  Optimized Performance
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Conversions:</span>
                    <span className="font-semibold text-emerald-600">{results.optimizedPerformance.monthlyConversions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-semibold text-emerald-600">${results.optimizedPerformance.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost Per Acquisition:</span>
                    <span className="font-semibold text-emerald-600">${results.optimizedPerformance.costPerAcquisition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Return on Ad Spend:</span>
                    <span className="font-semibold text-emerald-600">{results.optimizedPerformance.returnOnAdSpend}x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Improvements */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-lg text-white mb-8">
              <h4 className="text-xl font-bold mb-6 text-center">
                {selectedScenario.name} Impact
              </h4>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">+{results.improvements.additionalConversions}</div>
                  <div className="text-emerald-100">Additional Conversions/Month</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">${results.improvements.additionalRevenue.toLocaleString()}</div>
                  <div className="text-emerald-100">Additional Revenue/Month</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{results.improvements.cacReduction}%</div>
                  <div className="text-emerald-100">CAC Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">${results.improvements.annualRevenueIncrease.toLocaleString()}</div>
                  <div className="text-emerald-100">Annual Revenue Increase</div>
                </div>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Immediate Actions (Week 1-2):</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Audit current creative performance by segment</li>
                    <li>• Implement customer language analysis</li>
                    <li>• Set up proper creative testing framework</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Implementation Phase (Week 3-8):</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Deploy new creative variations</li>
                    <li>• Optimize audience targeting</li>
                    <li>• Monitor and iterate based on performance</li>
                  </ul>
                </div>
              </div>
            </div>

            {showLeadCapture && (
              <div className="bg-emerald-600 p-8 rounded-lg text-white text-center">
                <h4 className="text-xl font-bold mb-4">Get Your Implementation Roadmap</h4>
                <p className="text-emerald-100 mb-6">
                  Download our Creative Strategy Optimization Guide with step-by-step 
                  implementation instructions and case study examples.
                </p>
                <div className="max-w-md mx-auto">
                  <EmailCaptureForm
                    placeholder="Enter your work email"
                    buttonText="Get Implementation Guide"
                    variant="cta"
                    source="creative-roi-calculator-results"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Consultation CTA */}
        {showResults && (
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Implement Your Creative Strategy?
            </h3>
            <p className="text-gray-600 mb-6">
              Get a free creative strategy audit and personalized implementation plan.
            </p>
            <ConsultationBookingCTA 
              variant="primary" 
              text="Book Creative Strategy Audit" 
            />
          </div>
        )}
      </div>
    </div>
  );
}