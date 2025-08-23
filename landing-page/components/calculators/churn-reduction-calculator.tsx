'use client';

import React, { useState } from 'react';
import { TrendingDown, DollarSign, Users, Target, Calculator, AlertCircle, ArrowRight } from 'lucide-react';

interface ChurnInputs {
  monthlyRecurringRevenue: number;
  currentChurnRate: number;
  averageSubscriptionValue: number;
  totalSubscribers: number;
  industry: string;
}

interface ChurnResults {
  currentMonthlyLoss: number;
  annualRevenueLoss: number;
  optimizedChurnRate: number;
  potentialSavings: number;
  annualSavings: number;
  retainedCustomers: number;
  ltvImpact: number;
  paybackPeriod: number;
}

const industryBenchmarks: Record<string, { goodChurnRate: number; avgChurnRate: number }> = {
  'b2b-saas': { goodChurnRate: 3, avgChurnRate: 7 },
  'consumer-saas': { goodChurnRate: 5, avgChurnRate: 10 },
  'enterprise': { goodChurnRate: 2, avgChurnRate: 5 },
  'smb': { goodChurnRate: 8, avgChurnRate: 15 },
  'freemium': { goodChurnRate: 12, avgChurnRate: 20 },
  'other': { goodChurnRate: 6, avgChurnRate: 12 }
};

export function ChurnReductionCalculator() {
  const [inputs, setInputs] = useState<ChurnInputs>({
    monthlyRecurringRevenue: 50000,
    currentChurnRate: 8.5,
    averageSubscriptionValue: 97,
    totalSubscribers: 515,
    industry: 'b2b-saas'
  });

  const [results, setResults] = useState<ChurnResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateChurnReduction = () => {
    const {
      monthlyRecurringRevenue,
      currentChurnRate,
      averageSubscriptionValue,
      totalSubscribers,
      industry
    } = inputs;

    // Current state calculations
    const currentMonthlyLoss = (monthlyRecurringRevenue * currentChurnRate) / 100;
    const annualRevenueLoss = currentMonthlyLoss * 12;
    
    // Determine optimization potential based on current vs benchmark
    const benchmark = industryBenchmarks[industry];
    let reductionPotential = 0.35; // Default 35% reduction
    
    if (currentChurnRate > benchmark.avgChurnRate * 1.5) {
      reductionPotential = 0.45; // High reduction potential
    } else if (currentChurnRate <= benchmark.goodChurnRate) {
      reductionPotential = 0.15; // Limited reduction potential
    }
    
    // Optimized calculations
    const optimizedChurnRate = currentChurnRate * (1 - reductionPotential);
    const optimizedMonthlyLoss = (monthlyRecurringRevenue * optimizedChurnRate) / 100;
    const potentialSavings = currentMonthlyLoss - optimizedMonthlyLoss;
    const annualSavings = potentialSavings * 12;
    
    // Additional metrics
    const currentChurningCustomers = Math.round(totalSubscribers * (currentChurnRate / 100));
    const optimizedChurningCustomers = Math.round(totalSubscribers * (optimizedChurnRate / 100));
    const retainedCustomers = currentChurningCustomers - optimizedChurningCustomers;
    
    // LTV impact (assuming 18-month average lifetime)
    const ltvImpact = retainedCustomers * averageSubscriptionValue * 18;
    
    // Service payback calculation (assuming $497/month service cost)
    const serviceCost = 497;
    const paybackPeriod = serviceCost / potentialSavings;

    setResults({
      currentMonthlyLoss: Math.round(currentMonthlyLoss),
      annualRevenueLoss: Math.round(annualRevenueLoss),
      optimizedChurnRate: Number(optimizedChurnRate.toFixed(1)),
      potentialSavings: Math.round(potentialSavings),
      annualSavings: Math.round(annualSavings),
      retainedCustomers,
      ltvImpact: Math.round(ltvImpact),
      paybackPeriod: Number(paybackPeriod.toFixed(1))
    });

    setShowResults(true);
  };

  const handleInputChange = (field: keyof ChurnInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? (isNaN(parseFloat(value)) ? value : parseFloat(value)) : value
    }));
  };

  const getChurnAssessment = () => {
    const benchmark = industryBenchmarks[inputs.industry];
    if (inputs.currentChurnRate <= benchmark.goodChurnRate) {
      return { status: 'good', message: 'Your churn rate is excellent for your industry' };
    } else if (inputs.currentChurnRate <= benchmark.avgChurnRate) {
      return { status: 'average', message: 'Your churn rate is average - there\'s room for improvement' };
    } else {
      return { status: 'high', message: 'Your churn rate is above industry average - significant opportunity' };
    }
  };

  const assessment = getChurnAssessment();
  const isFormValid = inputs.monthlyRecurringRevenue > 0 && inputs.currentChurnRate > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingDown className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Subscription Churn Reduction Calculator
          </h2>
          <p className="text-purple-100">
            Calculate the revenue impact of reducing your subscription churn rate
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Subscription Metrics</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry / Business Type
              </label>
              <select
                value={inputs.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="b2b-saas">B2B SaaS</option>
                <option value="consumer-saas">Consumer SaaS</option>
                <option value="enterprise">Enterprise</option>
                <option value="smb">SMB</option>
                <option value="freemium">Freemium Model</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Recurring Revenue ($)
                </label>
                <input
                  type="number"
                  value={inputs.monthlyRecurringRevenue || ''}
                  onChange={(e) => handleInputChange('monthlyRecurringRevenue', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g. 50000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Monthly Churn Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.currentChurnRate || ''}
                  onChange={(e) => handleInputChange('currentChurnRate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g. 8.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Subscription Value ($)
                </label>
                <input
                  type="number"
                  value={inputs.averageSubscriptionValue || ''}
                  onChange={(e) => handleInputChange('averageSubscriptionValue', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g. 97"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Active Subscribers
                </label>
                <input
                  type="number"
                  value={inputs.totalSubscribers || ''}
                  onChange={(e) => handleInputChange('totalSubscribers', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g. 515"
                />
              </div>
            </div>

            {/* Churn Assessment */}
            <div className={`p-4 rounded-lg flex items-center ${
              assessment.status === 'good' ? 'bg-green-50 text-green-800' :
              assessment.status === 'average' ? 'bg-yellow-50 text-yellow-800' :
              'bg-red-50 text-red-800'
            }`}>
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{assessment.message}</span>
            </div>

            <button
              onClick={calculateChurnReduction}
              disabled={!isFormValid}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                isFormValid
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Churn Reduction Impact
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {showResults && results ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Churn Reduction Impact</h3>
                
                {/* Current Loss */}
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2" />
                    Current Revenue Loss
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-red-800">Monthly Loss:</span>
                      <span className="font-semibold text-red-900">${results.currentMonthlyLoss.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-800">Annual Loss:</span>
                      <span className="font-semibold text-red-900">${results.annualRevenueLoss.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Optimization Results */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg text-white">
                  <h4 className="font-semibold mb-4 text-center">35% Churn Reduction Impact</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold mb-1">{results.optimizedChurnRate}%</div>
                      <div className="text-purple-100 text-sm">New Churn Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">{results.retainedCustomers}</div>
                      <div className="text-purple-100 text-sm">Customers Saved</div>
                    </div>
                  </div>
                </div>

                {/* Revenue Impact */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Revenue Recovery
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-800">Monthly Savings:</span>
                      <span className="font-semibold text-green-900">${results.potentialSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-800">Annual Savings:</span>
                      <span className="font-semibold text-green-900">${results.annualSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-800">LTV Impact:</span>
                      <span className="font-semibold text-green-900">${results.ltvImpact.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Service ROI */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Service Investment ROI
                  </h4>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {results.paybackPeriod} months
                    </div>
                    <div className="text-blue-800 text-sm">Payback Period</div>
                  </div>
                  <div className="mt-4 text-sm text-blue-800">
                    Monthly service investment of $497 pays for itself in {results.paybackPeriod} months
                  </div>
                </div>

                {/* Key Strategies */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Proven Churn Reduction Strategies</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Early warning system for at-risk customers (14-day prediction)
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Behavioral trigger-based retention campaigns
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Value reinforcement through creative intelligence
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Proactive engagement loops and habit formation
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Ready to Reduce Your Churn Rate?
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    Claim your free week to get a custom churn reduction strategy
                  </p>
                  <button
                    onClick={() => {
                      const serviceSection = document.getElementById('service-tiers');
                      if (serviceSection) {
                        serviceSection.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/#service-tiers';
                      }
                    }}
                    className="bg-green-600 text-white hover:bg-green-700 font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center mx-auto"
                  >
                    Claim Free Week
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
                <Calculator className="h-16 w-16 mb-4" />
                <p className="text-center">Enter your subscription metrics to calculate churn reduction impact</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}