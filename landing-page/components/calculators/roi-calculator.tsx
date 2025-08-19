'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, Target, ArrowRight } from 'lucide-react';

interface ROIInputs {
  monthlyAdSpend: number;
  currentConversionRate: number;
  expectedImprovement: number;
}

interface ROIResults {
  currentCPA: number;
  improvedCPA: number;
  monthlySavings: number;
  annualSavings: number;
  serviceCost: number;
  roi: number;
  paybackWeeks: number;
}

function calculateROI(inputs: ROIInputs): ROIResults {
  const { monthlyAdSpend, currentConversionRate, expectedImprovement } = inputs;
  
  // Calculate conversions based on typical conversion values
  const currentConversions = (monthlyAdSpend * currentConversionRate) / 100;
  const improvedConversions = currentConversions * (1 + expectedImprovement / 100);
  
  // Calculate CPA (Cost Per Acquisition)
  const currentCPA = currentConversions > 0 ? monthlyAdSpend / currentConversions : 0;
  const improvedCPA = improvedConversions > 0 ? monthlyAdSpend / improvedConversions : 0;
  
  // Calculate savings
  const monthlySavings = (currentCPA - improvedCPA) * improvedConversions;
  const annualSavings = monthlySavings * 12;
  
  // Service cost calculations (Competitive Edge tier at $67/week)
  const serviceCost = 67 * 52; // Annual cost
  
  // ROI calculation
  const roi = serviceCost > 0 ? ((annualSavings - serviceCost) / serviceCost) * 100 : 0;
  
  // Payback period in weeks
  const weeklySavings = monthlySavings / 4.33; // Average weeks per month
  const paybackWeeks = weeklySavings > 0 ? serviceCost / 52 / weeklySavings * 52 : 0;
  
  return {
    currentCPA,
    improvedCPA,
    monthlySavings,
    annualSavings,
    serviceCost,
    roi,
    paybackWeeks
  };
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    monthlyAdSpend: 10000,
    currentConversionRate: 2.5,
    expectedImprovement: 25
  });
  
  const [results, setResults] = useState<ROIResults>({
    currentCPA: 0,
    improvedCPA: 0,
    monthlySavings: 0,
    annualSavings: 0,
    serviceCost: 0,
    roi: 0,
    paybackWeeks: 0
  });

  useEffect(() => {
    const newResults = calculateROI(inputs);
    setResults(newResults);
  }, [inputs]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Calculator className="h-4 w-4 mr-2" />
              ROI CALCULATOR
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              One Winning Hook Pays for 6+ Months of Service
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Calculate how much you'll save when our creative intelligence improves your conversion rates. 
              Even modest improvements typically cover service costs for months.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your Current Situation</h3>
              
              <div className="space-y-6">
                {/* Monthly Ad Spend */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Ad Spend
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={inputs.monthlyAdSpend}
                      onChange={(e) => setInputs(prev => ({ ...prev, monthlyAdSpend: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>$1K</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(inputs.monthlyAdSpend)}</span>
                      <span>$100K</span>
                    </div>
                  </div>
                </div>

                {/* Current Conversion Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Conversion Rate
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="range"
                      min="0.5"
                      max="10"
                      step="0.1"
                      value={inputs.currentConversionRate}
                      onChange={(e) => setInputs(prev => ({ ...prev, currentConversionRate: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>0.5%</span>
                      <span className="font-semibold text-gray-900">{formatPercentage(inputs.currentConversionRate)}</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                {/* Expected Improvement */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Improvement (Our Average: 25%)
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="range"
                      min="5"
                      max="75"
                      step="5"
                      value={inputs.expectedImprovement}
                      onChange={(e) => setInputs(prev => ({ ...prev, expectedImprovement: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>5%</span>
                      <span className="font-semibold text-green-600">+{formatPercentage(inputs.expectedImprovement)}</span>
                      <span>75%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preset Scenarios */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Quick Scenarios:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setInputs({ monthlyAdSpend: 5000, currentConversionRate: 2.0, expectedImprovement: 20 })}
                    className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Small Business
                  </button>
                  <button
                    onClick={() => setInputs({ monthlyAdSpend: 15000, currentConversionRate: 3.0, expectedImprovement: 25 })}
                    className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Growing Startup
                  </button>
                  <button
                    onClick={() => setInputs({ monthlyAdSpend: 50000, currentConversionRate: 2.5, expectedImprovement: 30 })}
                    className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Scale-up
                  </button>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 lg:p-8 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your ROI Projection</h3>
              
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(results.monthlySavings)}</div>
                    <div className="text-sm text-gray-600">Monthly Savings</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(results.annualSavings)}</div>
                    <div className="text-sm text-gray-600">Annual Savings</div>
                  </div>
                </div>

                {/* ROI Highlight */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white text-center">
                  <div className="text-4xl font-bold mb-2">{formatPercentage(results.roi)}</div>
                  <div className="text-green-100">Annual ROI</div>
                  <div className="mt-4 pt-4 border-t border-green-400 text-sm">
                    <strong>Payback Period: {results.paybackWeeks.toFixed(1)} weeks</strong>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-gray-600">Current CPA:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(results.currentCPA)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-gray-600">Improved CPA:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(results.improvedCPA)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-gray-600">Service Cost (Annual):</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(results.serviceCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-900">Net Profit:</span>
                    <span className="font-bold text-green-600">{formatCurrency(results.annualSavings - results.serviceCost)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real Growth Teams See These Results
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">15-40%</div>
                  <div className="text-sm text-gray-600">Typical conversion improvement range</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">3.2 weeks</div>
                  <div className="text-sm text-gray-600">Average payback period</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">580%</div>
                  <div className="text-sm text-gray-600">Average annual ROI</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                These calculations are based on conservative estimates. Many teams see even better results 
                when they implement our performance-scored creative concepts and competitive intelligence insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    const emailSection = document.getElementById('email-signup');
                    if (emailSection) {
                      emailSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
                >
                  Start My Free Week Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
                
                <button
                  onClick={() => {
                    const serviceSection = document.getElementById('service-tiers');
                    if (serviceSection) {
                      serviceSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-orange-600 hover:text-orange-700 font-semibold underline transition-colors"
                >
                  View Weekly Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}