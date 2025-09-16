'use client';

import { useState } from 'react';
import { Calculator, DollarSign, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface BudgetBreakdown {
  total: number;
  channels: {
    paidSocial: number;
    contentSEO: number;
    emailCRM: number;
    partnerships: number;
    experimentation: number;
  };
  targetCAC: number;
  expectedCustomers: number;
  ltv: number;
  roiPrediction: string;
}

export function MarketingBudgetCalculator() {
  const [inputs, setInputs] = useState({
    monthlyRevenue: '',
    businessModel: 'saas',
    avgOrderValue: '',
    customerLifetime: '',
    currentCAC: '',
    growthStage: 'early-traction'
  });

  const [results, setResults] = useState<BudgetBreakdown | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateBudget = () => {
    const revenue = parseFloat(inputs.monthlyRevenue) || 0;
    const aov = parseFloat(inputs.avgOrderValue) || 0;
    const lifetime = parseFloat(inputs.customerLifetime) || 12;
    const currentCAC = parseFloat(inputs.currentCAC) || 0;

    if (revenue === 0 || aov === 0) return;

    // Budget percentage based on growth stage
    const budgetPercentages = {
      'bootstrap': 0.20,
      'early-traction': 0.25,
      'growth-stage': 0.35
    };

    const budgetPercent = budgetPercentages[inputs.growthStage as keyof typeof budgetPercentages];
    const totalBudget = revenue * budgetPercent;

    // Channel allocation based on stage and business model
    const channelMix = {
      'bootstrap': { paidSocial: 0.15, contentSEO: 0.40, emailCRM: 0.15, partnerships: 0.20, experimentation: 0.10 },
      'early-traction': { paidSocial: 0.50, contentSEO: 0.25, emailCRM: 0.15, partnerships: 0.10, experimentation: 0.10 },
      'growth-stage': { paidSocial: 0.60, contentSEO: 0.20, emailCRM: 0.10, partnerships: 0.05, experimentation: 0.05 }
    };

    const mix = channelMix[inputs.growthStage as keyof typeof channelMix];

    // Calculate LTV and target CAC
    const ltv = aov * (lifetime / (inputs.businessModel === 'saas' ? 1 : 12));
    const targetCACRatio = inputs.businessModel === 'saas' ? 3 : 4;
    const targetCAC = ltv / targetCACRatio;

    // Estimate customers from budget
    const effectiveCAC = Math.min(targetCAC, currentCAC || targetCAC);
    const expectedCustomers = totalBudget / effectiveCAC;

    // ROI prediction
    const revenueGenerated = expectedCustomers * ltv;
    const roi = (revenueGenerated - totalBudget) / totalBudget;
    
    let roiPrediction = '';
    if (roi > 2) roiPrediction = 'Excellent ROI potential (>200%)';
    else if (roi > 1) roiPrediction = 'Strong ROI potential (100-200%)';
    else if (roi > 0.5) roiPrediction = 'Moderate ROI potential (50-100%)';
    else roiPrediction = 'Conservative ROI potential (<50%)';

    const breakdown: BudgetBreakdown = {
      total: totalBudget,
      channels: {
        paidSocial: totalBudget * mix.paidSocial,
        contentSEO: totalBudget * mix.contentSEO,
        emailCRM: totalBudget * mix.emailCRM,
        partnerships: totalBudget * mix.partnerships,
        experimentation: totalBudget * mix.experimentation
      },
      targetCAC,
      expectedCustomers,
      ltv,
      roiPrediction
    };

    setResults(breakdown);
    setShowResults(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageDescription = (stage: string) => {
    const descriptions = {
      'bootstrap': 'Pre-revenue or <$10K MRR - Focus on organic channels and lean experimentation',
      'early-traction': '$10K-$50K MRR - Proven product-market fit, scaling channels',
      'growth-stage': '>$50K MRR - Aggressive growth mode, optimizing channel mix'
    };
    return descriptions[stage as keyof typeof descriptions];
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Input Form */}
      <div className="bg-white rounded-lg border-2 border-brand-200 p-6 mb-8">
        <div className="flex items-center mb-6">
          <Calculator className="h-6 w-6 text-brand-600 mr-3" />
          <h3 className="text-xl font-semibold text-gray-800">Budget Calculator Inputs</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monthly Revenue (MRR)
            </label>
            <input
              type="number"
              value={inputs.monthlyRevenue}
              onChange={(e) => setInputs({ ...inputs, monthlyRevenue: e.target.value })}
              placeholder="25000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Your current monthly recurring revenue</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Model
            </label>
            <select
              value={inputs.businessModel}
              onChange={(e) => setInputs({ ...inputs, businessModel: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="saas">SaaS/Subscription</option>
              <option value="ecommerce">E-commerce</option>
              <option value="marketplace">Marketplace</option>
              <option value="service">Service Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Average Order Value (AOV)
            </label>
            <input
              type="number"
              value={inputs.avgOrderValue}
              onChange={(e) => setInputs({ ...inputs, avgOrderValue: e.target.value })}
              placeholder="99"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Average transaction or monthly subscription value</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Customer Lifetime (Months)
            </label>
            <input
              type="number"
              value={inputs.customerLifetime}
              onChange={(e) => setInputs({ ...inputs, customerLifetime: e.target.value })}
              placeholder="24"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">How long customers stay on average</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Growth Stage
            </label>
            <select
              value={inputs.growthStage}
              onChange={(e) => setInputs({ ...inputs, growthStage: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="bootstrap">Bootstrap/Pre-Revenue</option>
              <option value="early-traction">Early Traction</option>
              <option value="growth-stage">Growth Stage</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {getStageDescription(inputs.growthStage)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current CAC (Optional)
            </label>
            <input
              type="number"
              value={inputs.currentCAC}
              onChange={(e) => setInputs({ ...inputs, currentCAC: e.target.value })}
              placeholder="50"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">What you currently pay to acquire customers</p>
          </div>
        </div>

        <button
          onClick={calculateBudget}
          className="w-full mt-6 bg-brand-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-brand-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <Calculator className="h-5 w-5 mr-2" />
          Calculate My Marketing Budget
        </button>
      </div>

      {/* Results */}
      {showResults && results && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 text-center">
              <DollarSign className="h-8 w-8 text-brand-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-800">{formatCurrency(results.total)}</div>
              <div className="text-sm text-brand-600">Monthly Budget</div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-800">{formatCurrency(results.targetCAC)}</div>
              <div className="text-sm text-blue-600">Target CAC</div>
            </div>
            
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 text-center">
              <TrendingUp className="h-8 w-8 text-brand-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-800">{Math.round(results.expectedCustomers)}</div>
              <div className="text-sm text-brand-600">Expected Customers</div>
            </div>
            
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 text-center">
              <AlertCircle className="h-8 w-8 text-brand-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-800">{formatCurrency(results.ltv)}</div>
              <div className="text-sm text-brand-600">Customer LTV</div>
            </div>
          </div>

          {/* Channel Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-6">Recommended Channel Allocation</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-semibold text-gray-800">Paid Social & Search</span>
                <span className="text-xl font-bold text-blue-600">{formatCurrency(results.channels.paidSocial)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-brand-50 rounded-lg">
                <span className="font-semibold text-gray-800">Content & SEO</span>
                <span className="text-xl font-bold text-brand-600">{formatCurrency(results.channels.contentSEO)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-brand-50 rounded-lg">
                <span className="font-semibold text-gray-800">Email & CRM</span>
                <span className="text-xl font-bold text-brand-600">{formatCurrency(results.channels.emailCRM)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-brand-50 rounded-lg">
                <span className="font-semibold text-gray-800">Partnerships</span>
                <span className="text-xl font-bold text-brand-600">{formatCurrency(results.channels.partnerships)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-800">Experimentation</span>
                <span className="text-xl font-bold text-gray-600">{formatCurrency(results.channels.experimentation)}</span>
              </div>
            </div>
          </div>

          {/* ROI Prediction */}
          <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">ROI Prediction</h4>
            <p className="text-lg text-gray-700 mb-4">{results.roiPrediction}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Expected Revenue Impact:</strong> {formatCurrency(results.expectedCustomers * results.ltv)}
              </div>
              <div>
                <strong>LTV:CAC Ratio:</strong> {(results.ltv / results.targetCAC).toFixed(1)}:1
              </div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Strategic Recommendations</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">✓</span>
                Start with 70% of calculated budget to test channel performance
              </li>
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">✓</span>
                Track weekly CAC and ROAS to optimize channel allocation
              </li>
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">✓</span>
                Reserve 10% for seasonal opportunities and competitive responses
              </li>
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">✓</span>
                Maintain 3-month budget runway for sustainable growth
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}