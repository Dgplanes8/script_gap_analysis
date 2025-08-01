'use client';

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Target, ArrowRight, Info } from 'lucide-react';

interface StrategyROICalculatorProps {
  onOpenConsultation: () => void;
}

export function StrategyROICalculator({ onOpenConsultation }: StrategyROICalculatorProps) {
  const [inputs, setInputs] = useState({
    currentARR: 500000,
    currentCAC: 200,
    currentLTV: 1000,
    monthlyAdSpend: 25000,
    currentCTR: 1.2,
    targetGrowth: 50
  });

  const [results, setResults] = useState({
    currentLTVCAC: 0,
    projectedCACReduction: 0,
    projectedCTRImprovement: 0,
    projectedARRIncrease: 0,
    monthlyROI: 0,
    annualROI: 0,
    paybackPeriod: 0,
    recommendedTier: 'Foundation'
  });

  const calculateROI = (inputData: {currentARR: number; currentCAC: number; currentLTV: number; monthlyAdSpend: number; currentCTR: number; targetGrowth: number}) => {
    // Current metrics
    const currentLTVCAC = inputData.currentLTV / inputData.currentCAC;
    
    // Strategic improvements based on Fortune 100 methodology
    const ctuImprovementFactor = 2.2; // Average 120% CTR improvement
    const cacReductionFactor = 0.65; // Average 35% CAC reduction
    const conversionImprovementFactor = 1.4; // Average 40% conversion improvement
    
    // Projected improvements
    const projectedCTR = inputData.currentCTR * ctuImprovementFactor;
    const projectedCAC = inputData.currentCAC * cacReductionFactor;
    const projectedCACReduction = ((inputData.currentCAC - projectedCAC) / inputData.currentCAC) * 100;
    const projectedCTRImprovement = ((projectedCTR - inputData.currentCTR) / inputData.currentCTR) * 100;
    
    // Revenue impact calculations
    const currentMonthlyCustomers = inputData.monthlyAdSpend / inputData.currentCAC;
    const projectedMonthlyCustomers = inputData.monthlyAdSpend / projectedCAC;
    const additionalCustomers = projectedMonthlyCustomers - currentMonthlyCustomers;
    
    // ARR impact
    const averageMonthlyRevenue = inputData.currentLTV / 12; // Assuming 12-month average lifecycle
    const additionalMonthlyRevenue = additionalCustomers * averageMonthlyRevenue;
    const projectedARRIncrease = additionalMonthlyRevenue * 12;
    
    // Service tier recommendation
    let recommendedTier = 'Foundation';
    let monthlyInvestment = 3000;
    
    if (inputData.currentARR >= 2000000) {
      recommendedTier = 'Enterprise';
      monthlyInvestment = 15000;
    } else if (inputData.currentARR >= 1000000) {
      recommendedTier = 'Growth';
      monthlyInvestment = 8500;
    }
    
    // ROI calculations
    const monthlyROI = (additionalMonthlyRevenue - monthlyInvestment) / monthlyInvestment * 100;
    const annualROI = (projectedARRIncrease - (monthlyInvestment * 12)) / (monthlyInvestment * 12) * 100;
    const paybackPeriod = monthlyInvestment / Math.max(additionalMonthlyRevenue, 1);
    
    return {
      currentLTVCAC,
      projectedCACReduction,
      projectedCTRImprovement,
      projectedARRIncrease,
      monthlyROI,
      annualROI,
      paybackPeriod,
      recommendedTier
    };
  };

  useEffect(() => {
    const newResults = calculateROI(inputs);
    setResults(newResults);
  }, [inputs]);

  const handleInputChange = (field: keyof typeof inputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-6">
            <Calculator className="h-4 w-4 mr-2" />
            Strategic ROI Calculator
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculate Your Strategic Investment ROI
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See the potential impact of implementing our Fortune 100 systematic methodology 
            on your subscription business performance and growth.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 text-indigo-600 mr-2" />
                Your Current Metrics
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current ARR
                  </label>
                  <input
                    type="number"
                    value={inputs.currentARR}
                    onChange={(e) => handleInputChange('currentARR', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="500000"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current CAC ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.currentCAC}
                      onChange={(e) => handleInputChange('currentCAC', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer LTV ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.currentLTV}
                      onChange={(e) => handleInputChange('currentLTV', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="1000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Ad Spend ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.monthlyAdSpend}
                    onChange={(e) => handleInputChange('monthlyAdSpend', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="25000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Average CTR (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.currentCTR}
                    onChange={(e) => handleInputChange('currentCTR', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="1.2"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                Projected Strategic Impact
              </h3>

              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPercentage(results.projectedCTRImprovement)}
                    </div>
                    <div className="text-sm text-blue-800">CTR Improvement</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPercentage(results.projectedCACReduction)}
                    </div>
                    <div className="text-sm text-green-800">CAC Reduction</div>
                  </div>
                </div>

                {/* Revenue Impact */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Revenue Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Projected ARR Increase:</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(results.projectedARRIncrease)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly ROI:</span>
                      <span className="text-lg font-semibold text-indigo-600">
                        {formatPercentage(results.monthlyROI)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Annual ROI:</span>
                      <span className="text-lg font-semibold text-purple-600">
                        {formatPercentage(results.annualROI)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Recommended Tier</h4>
                  <div className="text-2xl font-bold text-indigo-600 mb-2">
                    {results.recommendedTier}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Based on your current ARR and growth potential
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Info className="h-4 w-4 mr-1" />
                    Payback period: {results.paybackPeriod.toFixed(1)} months
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology Note */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-start">
              <Info className="h-6 w-6 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Projections Based on Fortune 100 Methodology
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  These projections are based on average performance improvements achieved through our 
                  systematic 11-phase methodology, validated across $100M+ in managed ad spend. Individual 
                  results may vary based on market conditions, execution quality, and business-specific factors.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Achieve These Results?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Book a free strategic consultation to get a personalized implementation roadmap 
                and validate these projections for your specific business.
              </p>
              <button
                onClick={onOpenConsultation}
                className="bg-white text-indigo-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-flex items-center"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Get My Custom Strategic Assessment
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <p className="text-sm mt-4 opacity-80">
                Free consultation • Custom ROI validation • Implementation roadmap
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}