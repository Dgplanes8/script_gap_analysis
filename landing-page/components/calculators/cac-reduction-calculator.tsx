'use client';

import { useState } from 'react';
import { Calculator, TrendingDown, Target, ArrowRight } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

export function CACReductionCalculator() {
  const [inputs, setInputs] = useState({
    currentCAC: '',
    monthlyNewCustomers: '',
    averageLTV: '',
    currentConversionRate: '',
    monthlyAdSpend: ''
  });

  const [results, setResults] = useState<{
    currentMetrics: {
      monthlyCACCost: number;
      ltvCacRatio: number;
      paybackPeriod: number;
    };
    optimizedMetrics: {
      reducedCAC: number;
      reductionPercentage: number;
      monthlySavings: number;
      annualSavings: number;
      improvedLTVCAC: number;
      improvedPayback: number;
    };
    recommendations: string[];
  } | null>(null);

  const calculateReduction = () => {
    const currentCAC = parseFloat(inputs.currentCAC);
    const monthlyCustomers = parseFloat(inputs.monthlyNewCustomers);
    const ltv = parseFloat(inputs.averageLTV);
    const conversionRate = parseFloat(inputs.currentConversionRate) / 100;
    const adSpend = parseFloat(inputs.monthlyAdSpend);

    if (!currentCAC || !monthlyCustomers || !ltv || !conversionRate || !adSpend) return;

    // Current metrics
    const monthlyCACCost = currentCAC * monthlyCustomers;
    const ltvCacRatio = ltv / currentCAC;
    const paybackPeriod = currentCAC / (ltv / 12); // Assuming monthly LTV is LTV/12

    // Optimization estimates based on industry benchmarks
    let reductionPercentage = 0.25; // Default 25% reduction
    
    // Adjust reduction percentage based on current inefficiencies
    if (ltvCacRatio < 3) reductionPercentage = 0.45; // High inefficiency
    else if (ltvCacRatio < 5) reductionPercentage = 0.35; // Medium inefficiency
    else if (conversionRate < 0.02) reductionPercentage = 0.40; // Low conversion rate
    else if (conversionRate < 0.05) reductionPercentage = 0.30;

    const reducedCAC = currentCAC * (1 - reductionPercentage);
    const monthlySavings = (currentCAC - reducedCAC) * monthlyCustomers;
    const annualSavings = monthlySavings * 12;
    const improvedLTVCAC = ltv / reducedCAC;
    const improvedPayback = reducedCAC / (ltv / 12);

    // Generate recommendations
    const recommendations = [];
    if (ltvCacRatio < 3) {
      recommendations.push("Critical: LTV:CAC ratio below 3:1 indicates unsustainable unit economics");
    }
    if (conversionRate < 0.02) {
      recommendations.push("Focus on conversion optimization - current rate is below industry benchmarks");
    }
    if (currentCAC > ltv * 0.33) {
      recommendations.push("Implement audience segmentation to focus on highest-value prospects");
    }
    recommendations.push("Deploy multi-touch attribution for accurate channel performance measurement");
    recommendations.push("Optimize creative strategy using customer language analysis");

    setResults({
      currentMetrics: {
        monthlyCACCost,
        ltvCacRatio,
        paybackPeriod
      },
      optimizedMetrics: {
        reducedCAC,
        reductionPercentage: reductionPercentage * 100,
        monthlySavings,
        annualSavings,
        improvedLTVCAC,
        improvedPayback
      },
      recommendations
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
          <Calculator className="h-4 w-4 mr-2" />
          CAC Reduction Calculator
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Calculate Your Potential Savings
        </h3>
        <p className="text-gray-600">
          Get personalized CAC reduction estimates based on your current metrics
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Metrics</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Customer Acquisition Cost (CAC)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={inputs.currentCAC}
                onChange={(e) => handleInputChange('currentCAC', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="250"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly New Customers
            </label>
            <input
              type="number"
              value={inputs.monthlyNewCustomers}
              onChange={(e) => handleInputChange('monthlyNewCustomers', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Customer Lifetime Value (LTV)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={inputs.averageLTV}
                onChange={(e) => handleInputChange('averageLTV', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="1200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Conversion Rate
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={inputs.currentConversionRate}
                onChange={(e) => handleInputChange('currentConversionRate', e.target.value)}
                className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="2.5"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Ad Spend
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={inputs.monthlyAdSpend}
                onChange={(e) => handleInputChange('monthlyAdSpend', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="25000"
              />
            </div>
          </div>

          <button
            onClick={calculateReduction}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Reduction Potential
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Optimization Results</h4>
              
              {/* Current vs Optimized Metrics */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h5 className="font-semibold mb-4">CAC Reduction Projection</h5>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current CAC</span>
                    <span className="text-red-600 font-semibold">${inputs.currentCAC}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Optimized CAC</span>
                    <span className="text-green-600 font-bold">${results.optimizedMetrics.reducedCAC.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="font-semibold">Reduction</span>
                    <div className="text-right">
                      <div className="text-green-600 font-bold">
                        {results.optimizedMetrics.reductionPercentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Projection */}
              <div className="bg-green-50 rounded-lg p-6">
                <h5 className="font-semibold mb-4 text-green-800">Projected Savings</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${results.optimizedMetrics.monthlySavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">Monthly Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${results.optimizedMetrics.annualSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">Annual Savings</div>
                  </div>
                </div>
              </div>

              {/* Improved Metrics */}
              <div className="bg-indigo-50 rounded-lg p-6">
                <h5 className="font-semibold mb-4 text-indigo-800">Improved Unit Economics</h5>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-indigo-700">LTV:CAC Ratio</span>
                    <span className="font-semibold text-indigo-800">
                      {results.currentMetrics.ltvCacRatio.toFixed(1)}:1 → {results.optimizedMetrics.improvedLTVCAC.toFixed(1)}:1
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-700">Payback Period</span>
                    <span className="font-semibold text-indigo-800">
                      {results.currentMetrics.paybackPeriod.toFixed(1)} → {results.optimizedMetrics.improvedPayback.toFixed(1)} months
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h5 className="font-semibold mb-4 text-yellow-800 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Strategic Recommendations
                </h5>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-sm text-yellow-800">
                      <TrendingDown className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-indigo-600 rounded-lg p-6 text-center">
                <h5 className="font-semibold mb-2 text-white">Ready to Implement These Optimizations?</h5>
                <p className="text-indigo-100 text-sm mb-4">
                  Get a free strategic consultation to create your custom CAC reduction roadmap
                </p>
                <ConsultationBookingCTA 
                  variant="secondary"
                  text="Book Free CAC Strategy Call"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter your metrics to see reduction potential</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Methodology Note */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          <strong>Methodology:</strong> Calculations based on industry benchmarks and optimization patterns 
          observed across 100+ B2B SaaS implementations. Individual results may vary based on specific 
          business factors and implementation quality.
        </p>
      </div>
    </div>
  );
}