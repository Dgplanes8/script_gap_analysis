'use client';

import { useState } from 'react';
import { TrendingUp, Target, BarChart, Calculator, AlertCircle } from 'lucide-react';

interface ROIAnalysis {
  overallROI: number;
  channelROI: {
    channel: string;
    investment: number;
    revenue: number;
    roi: number;
    ltv: number;
    customers: number;
  }[];
  projectedROI: {
    month: number;
    cumulativeROI: number;
    monthlyRevenue: number;
    monthlySpend: number;
  }[];
  recommendations: string[];
  riskFactors: string[];
  keyInsights: {
    bestChannel: string;
    worstChannel: string;
    totalCustomerLTV: number;
    paybackPeriod: number;
    growthTrajectory: string;
  };
}

export function MarketingROICalculator() {
  const [inputs, setInputs] = useState({
    // Channel investments
    paidSocialSpend: '',
    searchSpend: '',
    contentSpend: '',
    emailSpend: '',
    
    // Channel customers acquired
    paidSocialCustomers: '',
    searchCustomers: '',
    contentCustomers: '',
    emailCustomers: '',
    
    // Business metrics
    avgOrderValue: '',
    customerLifetime: '',
    monthlyChurn: '',
    upsellRate: '',
    
    // Company details
    businessModel: 'saas',
    marketingTeamCost: '',
    toolsCost: ''
  });

  const [results, setResults] = useState<ROIAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const paidSocialSpend = parseFloat(inputs.paidSocialSpend) || 0;
    const searchSpend = parseFloat(inputs.searchSpend) || 0;
    const contentSpend = parseFloat(inputs.contentSpend) || 0;
    const emailSpend = parseFloat(inputs.emailSpend) || 0;
    const teamCost = parseFloat(inputs.marketingTeamCost) || 0;
    const toolsCost = parseFloat(inputs.toolsCost) || 0;

    const paidSocialCustomers = parseFloat(inputs.paidSocialCustomers) || 0;
    const searchCustomers = parseFloat(inputs.searchCustomers) || 0;
    const contentCustomers = parseFloat(inputs.contentCustomers) || 0;
    const emailCustomers = parseFloat(inputs.emailCustomers) || 0;

    const aov = parseFloat(inputs.avgOrderValue) || 0;
    const lifetime = parseFloat(inputs.customerLifetime) || 12;
    const churn = parseFloat(inputs.monthlyChurn) || 5;
    const upsell = parseFloat(inputs.upsellRate) || 0;

    if (aov === 0) return;

    // Calculate LTV with churn and upsell
    const monthlyRetention = (100 - churn) / 100;
    const baseLTV = aov * (lifetime / (inputs.businessModel === 'saas' ? 1 : 12));
    const upsellValue = baseLTV * (upsell / 100);
    const adjustedLTV = baseLTV + upsellValue;

    // Allocate team and tools costs proportionally
    const totalSpend = paidSocialSpend + searchSpend + contentSpend + emailSpend;
    const totalOverhead = teamCost + toolsCost;
    
    const channels = [
      {
        channel: 'Paid Social',
        spend: paidSocialSpend,
        customers: paidSocialCustomers,
        overhead: totalSpend > 0 ? totalOverhead * (paidSocialSpend / totalSpend) : 0
      },
      {
        channel: 'Search Marketing',
        spend: searchSpend,
        customers: searchCustomers,
        overhead: totalSpend > 0 ? totalOverhead * (searchSpend / totalSpend) : 0
      },
      {
        channel: 'Content & SEO',
        spend: contentSpend,
        customers: contentCustomers,
        overhead: totalSpend > 0 ? totalOverhead * (contentSpend / totalSpend) : 0
      },
      {
        channel: 'Email Marketing',
        spend: emailSpend,
        customers: emailCustomers,
        overhead: totalSpend > 0 ? totalOverhead * (emailSpend / totalSpend) : 0
      }
    ];

    // Calculate channel ROI
    const channelROI = channels.map(channel => {
      const totalInvestment = channel.spend + channel.overhead;
      const revenue = channel.customers * adjustedLTV;
      const roi = totalInvestment > 0 ? ((revenue - totalInvestment) / totalInvestment) * 100 : 0;
      
      return {
        channel: channel.channel,
        investment: totalInvestment,
        revenue,
        roi,
        ltv: adjustedLTV,
        customers: channel.customers
      };
    }).filter(channel => channel.investment > 0 || channel.customers > 0);

    // Overall ROI
    const totalInvestment = totalSpend + totalOverhead;
    const totalRevenue = channelROI.reduce((sum, channel) => sum + channel.revenue, 0);
    const overallROI = totalInvestment > 0 ? ((totalRevenue - totalInvestment) / totalInvestment) * 100 : 0;

    // Projected 12-month ROI
    const projectedROI = [];
    for (let month = 1; month <= 12; month++) {
      const retentionFactor = Math.pow(monthlyRetention, month - 1);
      const cumulativeSpend = totalInvestment * month;
      const cumulativeRevenue = totalRevenue * month * retentionFactor;
      const cumulativeROI = cumulativeSpend > 0 ? ((cumulativeRevenue - cumulativeSpend) / cumulativeSpend) * 100 : 0;
      
      projectedROI.push({
        month,
        cumulativeROI,
        monthlyRevenue: cumulativeRevenue / month,
        monthlySpend: cumulativeSpend / month
      });
    }

    // Find best and worst channels
    const validChannels = channelROI.filter(channel => channel.investment > 0);
    const bestChannel = validChannels.reduce((best, channel) => 
      channel.roi > best.roi ? channel : best, validChannels[0] || { channel: 'None', roi: 0 });
    const worstChannel = validChannels.reduce((worst, channel) => 
      channel.roi < worst.roi ? channel : worst, validChannels[0] || { channel: 'None', roi: 0 });

    // Calculate total customer LTV and payback
    const totalCustomers = channelROI.reduce((sum, channel) => sum + channel.customers, 0);
    const avgCAC = totalCustomers > 0 ? totalInvestment / totalCustomers : 0;
    const paybackPeriod = avgCAC > 0 ? avgCAC / (aov * (inputs.businessModel === 'saas' ? 1 : 0.25)) : 0;

    // Growth trajectory
    let growthTrajectory = 'Stable';
    if (overallROI > 400) growthTrajectory = 'High Growth';
    else if (overallROI > 200) growthTrajectory = 'Growth';
    else if (overallROI < 100) growthTrajectory = 'Optimization Needed';

    // Generate recommendations
    const recommendations = [];
    if (bestChannel.roi > 300) {
      recommendations.push(`Scale investment in ${bestChannel.channel} (${bestChannel.roi.toFixed(0)}% ROI)`);
    }
    if (worstChannel.roi < 100 && worstChannel.investment > 0) {
      recommendations.push(`Optimize or reduce ${worstChannel.channel} spend (${worstChannel.roi.toFixed(0)}% ROI)`);
    }
    if (paybackPeriod > 12) {
      recommendations.push('Focus on reducing customer acquisition cost or increasing AOV');
    }
    if (churn > 10) {
      recommendations.push('Implement retention campaigns to reduce churn rate');
    }
    recommendations.push('Implement multi-touch attribution for more accurate ROI measurement');

    // Risk factors
    const riskFactors = [];
    if (overallROI < 200) riskFactors.push('Overall ROI below sustainable threshold');
    if (paybackPeriod > 18) riskFactors.push('Customer payback period exceeds recommended 18 months');
    if (validChannels.length < 2) riskFactors.push('Over-dependence on single marketing channel');
    if (churn > 15) riskFactors.push('High customer churn rate impacting LTV');

    const analysis: ROIAnalysis = {
      overallROI,
      channelROI,
      projectedROI,
      recommendations,
      riskFactors,
      keyInsights: {
        bestChannel: bestChannel.channel,
        worstChannel: worstChannel.channel,
        totalCustomerLTV: adjustedLTV,
        paybackPeriod,
        growthTrajectory
      }
    };

    setResults(analysis);
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

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getROIColor = (roi: number) => {
    if (roi >= 400) return 'text-brand-600';
    if (roi >= 200) return 'text-blue-600';
    if (roi >= 100) return 'text-brand-600';
    return 'text-brand-600';
  };

  const getTrajectoryColor = (trajectory: string) => {
    switch (trajectory) {
      case 'High Growth': return 'bg-brand-100 text-brand-800';
      case 'Growth': return 'bg-blue-100 text-blue-800';
      case 'Stable': return 'bg-brand-100 text-brand-800';
      default: return 'bg-brand-100 text-brand-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Input Form */}
      <div className="bg-white rounded-lg border-2 border-brand-200 p-6 mb-8">
        <div className="flex items-center mb-6">
          <Calculator className="h-6 w-6 text-brand-600 mr-3" />
          <h3 className="text-xl font-semibold text-gray-800">Marketing ROI Analysis Inputs</h3>
        </div>

        <div className="space-y-8">
          {/* Channel Investment Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Monthly Marketing Investment by Channel</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Paid Social Spend
                </label>
                <input
                  type="number"
                  value={inputs.paidSocialSpend}
                  onChange={(e) => setInputs({ ...inputs, paidSocialSpend: e.target.value })}
                  placeholder="5000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Facebook, Instagram, LinkedIn ads</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Marketing Spend
                </label>
                <input
                  type="number"
                  value={inputs.searchSpend}
                  onChange={(e) => setInputs({ ...inputs, searchSpend: e.target.value })}
                  placeholder="3000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Google Ads, Bing, other search</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content & SEO Spend
                </label>
                <input
                  type="number"
                  value={inputs.contentSpend}
                  onChange={(e) => setInputs({ ...inputs, contentSpend: e.target.value })}
                  placeholder="2000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Content creation, SEO tools, PR</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Marketing Spend
                </label>
                <input
                  type="number"
                  value={inputs.emailSpend}
                  onChange={(e) => setInputs({ ...inputs, emailSpend: e.target.value })}
                  placeholder="500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Email platform, automation, design</p>
              </div>
            </div>
          </div>

          {/* Customer Acquisition Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Monthly Customers Acquired by Channel</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Paid Social Customers
                </label>
                <input
                  type="number"
                  value={inputs.paidSocialCustomers}
                  onChange={(e) => setInputs({ ...inputs, paidSocialCustomers: e.target.value })}
                  placeholder="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Marketing Customers
                </label>
                <input
                  type="number"
                  value={inputs.searchCustomers}
                  onChange={(e) => setInputs({ ...inputs, searchCustomers: e.target.value })}
                  placeholder="40"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content & SEO Customers
                </label>
                <input
                  type="number"
                  value={inputs.contentCustomers}
                  onChange={(e) => setInputs({ ...inputs, contentCustomers: e.target.value })}
                  placeholder="30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Marketing Customers
                </label>
                <input
                  type="number"
                  value={inputs.emailCustomers}
                  onChange={(e) => setInputs({ ...inputs, emailCustomers: e.target.value })}
                  placeholder="20"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Business Metrics Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Customer Value Metrics</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Average Order Value
                </label>
                <input
                  type="number"
                  value={inputs.avgOrderValue}
                  onChange={(e) => setInputs({ ...inputs, avgOrderValue: e.target.value })}
                  placeholder="99"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Monthly subscription or purchase value</p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Average customer retention period</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Churn Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.monthlyChurn}
                  onChange={(e) => setInputs({ ...inputs, monthlyChurn: e.target.value })}
                  placeholder="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Percentage of customers lost monthly</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upsell Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.upsellRate}
                  onChange={(e) => setInputs({ ...inputs, upsellRate: e.target.value })}
                  placeholder="15"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Additional revenue from existing customers</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Model
                </label>
                <select
                  value={inputs.businessModel}
                  onChange={(e) => setInputs({ ...inputs, businessModel: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="saas">SaaS/Subscription</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="service">Service Business</option>
                </select>
              </div>
            </div>
          </div>

          {/* Overhead Costs */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Marketing Overhead Costs</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Marketing Team Cost (Monthly)
                </label>
                <input
                  type="number"
                  value={inputs.marketingTeamCost}
                  onChange={(e) => setInputs({ ...inputs, marketingTeamCost: e.target.value })}
                  placeholder="15000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Salaries, benefits, contractors</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Marketing Tools Cost (Monthly)
                </label>
                <input
                  type="number"
                  value={inputs.toolsCost}
                  onChange={(e) => setInputs({ ...inputs, toolsCost: e.target.value })}
                  placeholder="2000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Software, analytics, automation</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={calculateROI}
          className="w-full mt-8 bg-brand-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-brand-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          Calculate Marketing ROI Analysis
        </button>
      </div>

      {/* Results */}
      {showResults && results && (
        <div className="space-y-8">
          {/* Key Metrics Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 text-center">
              <TrendingUp className="h-8 w-8 text-brand-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-800">{formatPercent(results.overallROI)}</div>
              <div className="text-sm text-brand-600">Overall ROI</div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-800">{formatCurrency(results.keyInsights.totalCustomerLTV)}</div>
              <div className="text-sm text-blue-600">Customer LTV</div>
            </div>
            
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 text-center">
              <BarChart className="h-8 w-8 text-brand-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-800">{results.keyInsights.paybackPeriod.toFixed(1)}mo</div>
              <div className="text-sm text-brand-600">Payback Period</div>
            </div>
            
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 text-center">
              <AlertCircle className="h-8 w-8 text-brand-600 mx-auto mb-3" />
              <div className={`text-sm font-semibold px-3 py-1 rounded-full ${getTrajectoryColor(results.keyInsights.growthTrajectory)}`}>
                {results.keyInsights.growthTrajectory}
              </div>
              <div className="text-sm text-brand-600 mt-2">Growth Trajectory</div>
            </div>
          </div>

          {/* Channel Performance */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-6">Channel ROI Performance</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Channel</th>
                    <th className="text-left py-3 px-4">Investment</th>
                    <th className="text-left py-3 px-4">Revenue</th>
                    <th className="text-left py-3 px-4">ROI</th>
                    <th className="text-left py-3 px-4">Customers</th>
                    <th className="text-left py-3 px-4">CAC</th>
                  </tr>
                </thead>
                <tbody>
                  {results.channelROI.map((channel) => (
                    <tr key={channel.channel} className="border-b">
                      <td className="py-3 px-4 font-semibold">{channel.channel}</td>
                      <td className="py-3 px-4">{formatCurrency(channel.investment)}</td>
                      <td className="py-3 px-4">{formatCurrency(channel.revenue)}</td>
                      <td className={`py-3 px-4 font-bold ${getROIColor(channel.roi)}`}>
                        {formatPercent(channel.roi)}
                      </td>
                      <td className="py-3 px-4">{Math.round(channel.customers)}</td>
                      <td className="py-3 px-4">
                        {channel.customers > 0 ? formatCurrency(channel.investment / channel.customers) : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 12-Month Projection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-6">12-Month ROI Projection</h4>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{formatPercent(results.projectedROI[2]?.cumulativeROI || 0)}</div>
                <div className="text-sm text-gray-600">3-Month ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{formatPercent(results.projectedROI[5]?.cumulativeROI || 0)}</div>
                <div className="text-sm text-gray-600">6-Month ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{formatPercent(results.projectedROI[8]?.cumulativeROI || 0)}</div>
                <div className="text-sm text-gray-600">9-Month ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{formatPercent(results.projectedROI[11]?.cumulativeROI || 0)}</div>
                <div className="text-sm text-gray-600">12-Month ROI</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="text-left py-2 px-2">Month</th>
                    <th className="text-left py-2 px-2">Cumulative ROI</th>
                    <th className="text-left py-2 px-2">Monthly Revenue</th>
                    <th className="text-left py-2 px-2">Monthly Spend</th>
                  </tr>
                </thead>
                <tbody>
                  {results.projectedROI.slice(0, 6).map((month) => (
                    <tr key={month.month} className="border-b">
                      <td className="py-2 px-2">Month {month.month}</td>
                      <td className={`py-2 px-2 font-semibold ${getROIColor(month.cumulativeROI)}`}>
                        {formatPercent(month.cumulativeROI)}
                      </td>
                      <td className="py-2 px-2">{formatCurrency(month.monthlyRevenue)}</td>
                      <td className="py-2 px-2">{formatCurrency(month.monthlySpend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights and Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-brand-800 mb-4">Strategic Recommendations</h4>
              <ul className="space-y-2">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-brand-700">
                    <span className="text-brand-500 mr-3 font-bold">{index + 1}.</span>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-brand-800 mb-4">Risk Factors</h4>
              {results.riskFactors.length > 0 ? (
                <ul className="space-y-2">
                  {results.riskFactors.map((risk, index) => (
                    <li key={index} className="flex items-start text-brand-700">
                      <span className="text-brand-500 mr-3">⚠</span>
                      <span className="text-sm">{risk}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-brand-700 text-sm">No significant risk factors detected. Strong ROI performance across channels.</p>
              )}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-brand-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">ROI Performance Summary</h4>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-600">Best Performing Channel</div>
                <div className="text-lg font-bold text-brand-600">{results.keyInsights.bestChannel}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Optimization Opportunity</div>
                <div className="text-lg font-bold text-brand-600">{results.keyInsights.worstChannel}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Growth Stage</div>
                <div className="text-lg font-bold text-blue-600">{results.keyInsights.growthTrajectory}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}