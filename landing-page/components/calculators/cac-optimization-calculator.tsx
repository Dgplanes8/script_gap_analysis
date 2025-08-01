'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingDown, Target, Users, DollarSign } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

interface CACData {
  monthlyRevenue: number;
  currentCAC: number;
  monthlyAcquisitions: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  adSpend: number;
  conversionRate: number;
  industry: string;
}

interface OptimizationResults {
  currentCACEfficiency: string;
  potentialCACReduction: number;
  monthlySavings: number;
  annualSavings: number;
  recommendations: string[];
  industryBenchmark: number;
  optimizationScore: number;
}

const industryBenchmarks: Record<string, { averageCAC: number; topQuartileCAC: number }> = {
  'b2b-saas': { averageCAC: 395, topQuartileCAC: 180 },
  'ecommerce': { averageCAC: 87, topQuartileCAC: 45 },
  'fintech': { averageCAC: 536, topQuartileCAC: 280 },
  'healthcare': { averageCAC: 412, topQuartileCAC: 220 },
  'education': { averageCAC: 286, topQuartileCAC: 150 },
  'other': { averageCAC: 315, topQuartileCAC: 165 }
};

export function CACOptimizationCalculator() {
  const [formData, setFormData] = useState<CACData>({
    monthlyRevenue: 0,
    currentCAC: 0,
    monthlyAcquisitions: 0,
    averageOrderValue: 0,
    customerLifetimeValue: 0,
    adSpend: 0,
    conversionRate: 0,
    industry: 'b2b-saas'
  });

  const [results, setResults] = useState<OptimizationResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const calculateOptimization = () => {
    const { currentCAC, monthlyAcquisitions, customerLifetimeValue, industry } = formData;
    const benchmark = industryBenchmarks[industry];
    
    // Calculate CAC efficiency
    const ltvcacRatio = customerLifetimeValue / currentCAC;
    let efficiency = 'Poor';
    if (ltvcacRatio >= 3) efficiency = 'Good';
    if (ltvcacRatio >= 5) efficiency = 'Excellent';
    
    // Calculate potential reduction based on industry benchmarks
    const potentialCAC = Math.max(benchmark.topQuartileCAC, currentCAC * 0.6);
    const potentialReduction = ((currentCAC - potentialCAC) / currentCAC) * 100;
    
    // Calculate savings
    const monthlySavings = (currentCAC - potentialCAC) * monthlyAcquisitions;
    const annualSavings = monthlySavings * 12;
    
    // Generate recommendations
    const recommendations = [];
    
    if (currentCAC > benchmark.averageCAC * 1.2) {
      recommendations.push('Implement audience segmentation to reduce wasted ad spend');
    }
    if (ltvcacRatio < 3) {
      recommendations.push('Focus on higher-value customer segments to improve LTV:CAC ratio');
    }
    if (formData.conversionRate < 2) {
      recommendations.push('Optimize landing pages and ad creative for higher conversion rates');
    }
    recommendations.push('Implement multi-touch attribution for accurate CAC measurement');
    recommendations.push('A/B test customer-language-driven ad creative');
    
    // Calculate optimization score
    let score = 0;
    if (ltvcacRatio >= 3) score += 30;
    if (currentCAC <= benchmark.averageCAC) score += 25;
    if (formData.conversionRate >= 2) score += 20;
    if (potentialReduction >= 20) score += 25;
    
    setResults({
      currentCACEfficiency: efficiency,
      potentialCACReduction: Math.round(potentialReduction),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      recommendations,
      industryBenchmark: benchmark.averageCAC,
      optimizationScore: score
    });
    
    setShowResults(true);
    
    // Show lead capture after viewing results
    setTimeout(() => setShowLeadCapture(true), 3000);
  };

  const handleInputChange = (field: keyof CACData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    }));
  };

  const isFormValid = formData.currentCAC > 0 && formData.monthlyAcquisitions > 0 && formData.customerLifetimeValue > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="h-8 w-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          CAC Optimization Calculator
        </h2>
        <p className="text-gray-600">
          Enter your current metrics to get personalized optimization recommendations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Metrics</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="b2b-saas">B2B SaaS</option>
              <option value="ecommerce">E-commerce</option>
              <option value="fintech">Fintech</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current CAC ($)
              </label>
              <input
                type="number"
                value={formData.currentCAC || ''}
                onChange={(e) => handleInputChange('currentCAC', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 250"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Acquisitions
              </label>
              <input
                type="number"
                value={formData.monthlyAcquisitions || ''}
                onChange={(e) => handleInputChange('monthlyAcquisitions', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 100"
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
                value={formData.customerLifetimeValue || ''}
                onChange={(e) => handleInputChange('customerLifetimeValue', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 1200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Ad Spend ($)
              </label>
              <input
                type="number"
                value={formData.adSpend || ''}
                onChange={(e) => handleInputChange('adSpend', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 25000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.conversionRate || ''}
              onChange={(e) => handleInputChange('conversionRate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. 2.5"
            />
          </div>

          <button
            onClick={calculateOptimization}
            disabled={!isFormValid}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
              isFormValid
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Calculate Optimization Potential
          </button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {showResults && results ? (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Analysis</h3>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-sm font-medium text-red-800">Current CAC</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    ${formData.currentCAC.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Target className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Potential CAC</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${Math.round(formData.currentCAC * (1 - results.potentialCACReduction / 100)).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Savings Potential */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">Savings Potential</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-indigo-600 mb-1">
                      {results.potentialCACReduction}%
                    </div>
                    <div className="text-sm text-indigo-700">CAC Reduction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-indigo-600 mb-1">
                      ${results.annualSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-indigo-700">Annual Savings</div>
                  </div>
                </div>
              </div>

              {/* Optimization Score */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Optimization Score</span>
                  <span className="text-lg font-bold text-gray-900">{results.optimizationScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${results.optimizationScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Top Recommendations</h4>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {showLeadCapture && (
                <div className="bg-indigo-600 p-6 rounded-lg text-white">
                  <h4 className="text-lg font-semibold mb-3">Get Your Detailed Action Plan</h4>
                  <p className="text-indigo-100 mb-4 text-sm">
                    Download our complete CAC Optimization Playbook with step-by-step implementation guides.
                  </p>
                  <EmailCaptureForm
                    placeholder="Enter your work email"
                    buttonText="Get Free Playbook"
                    variant="cta"
                    source="cac-calculator-results"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Fill out the form to see your optimization potential</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Consultation CTA */}
      {showResults && (
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to Implement These Optimizations?
          </h3>
          <p className="text-gray-600 mb-6">
            Get a free strategic consultation to create your personalized CAC optimization roadmap.
          </p>
          <ConsultationBookingCTA variant="primary" text="Book Free Strategy Call" />
        </div>
      )}
    </div>
  );
}