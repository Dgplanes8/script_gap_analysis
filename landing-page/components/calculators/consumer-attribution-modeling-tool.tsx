'use client';

import { useState } from 'react';
import { BarChart, Settings, TrendingUp, Calculator } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

interface ConsumerAttributionInputs {
  attributionModel: string;
  touchpointWeights: {
    firstTouch: number;
    middleTouch: number;
    lastTouch: number;
  };
  channelData: {
    socialMedia: { spend: number; clicks: number; assists: number; conversions: number };
    influencer: { spend: number; clicks: number; assists: number; conversions: number };
    email: { spend: number; clicks: number; assists: number; conversions: number };
    referral: { spend: number; clicks: number; assists: number; conversions: number };
  };
}

export function ConsumerAttributionModelingTool() {
  const [inputs, setInputs] = useState<ConsumerAttributionInputs>({
    attributionModel: 'position-based',
    touchpointWeights: {
      firstTouch: 40,
      middleTouch: 20,
      lastTouch: 40
    },
    channelData: {
      socialMedia: { spend: 25000, clicks: 5000, assists: 1500, conversions: 85 },
      influencer: { spend: 15000, clicks: 2000, assists: 800, conversions: 45 },
      email: { spend: 3000, clicks: 2500, assists: 600, conversions: 65 },
      referral: { spend: 1000, clicks: 800, assists: 300, conversions: 25 }
    }
  });

  const [results, setResults] = useState<{
    lastClickCAC: { [key: string]: number };
    attributedCAC: { [key: string]: number };
    budgetRecommendations: { [key: string]: number };
    totalAttributedConversions: number;
    improvementMetrics: {
      totalCACImprovement: number;
      budgetEfficiencyGain: number;
      reallocationSavings: number;
    };
  } | null>(null);

  const channelNames = {
    socialMedia: 'Social Media Ads',
    influencer: 'Influencer Marketing',
    email: 'Email Marketing',
    referral: 'Referral Program'
  };

  const calculateAttribution = () => {
    const channels = Object.keys(inputs.channelData);
    const lastClickCAC: { [key: string]: number } = {};
    const attributedCAC: { [key: string]: number } = {};
    const budgetRecommendations: { [key: string]: number } = {};

    // Calculate last-click CAC (baseline)
    let totalSpend = 0;
    let totalConversions = 0;
    
    channels.forEach(channel => {
      const data = inputs.channelData[channel as keyof typeof inputs.channelData];
      lastClickCAC[channel] = data.conversions > 0 ? data.spend / data.conversions : 0;
      totalSpend += data.spend;
      totalConversions += data.conversions;
    });

    // Calculate attributed conversions based on model
    const attributedConversions: { [key: string]: number } = {};
    let totalAttributedConversions = 0;

    channels.forEach(channel => {
      const data = inputs.channelData[channel as keyof typeof inputs.channelData];
      
      if (inputs.attributionModel === 'position-based') {
        // Position-based: 40% first touch, 20% middle, 40% last touch
        const firstTouchCredit = data.assists * (inputs.touchpointWeights.firstTouch / 100);
        const middleTouchCredit = data.assists * (inputs.touchpointWeights.middleTouch / 100);
        const lastTouchCredit = data.conversions * (inputs.touchpointWeights.lastTouch / 100);
        
        attributedConversions[channel] = firstTouchCredit + middleTouchCredit + lastTouchCredit;
      } else if (inputs.attributionModel === 'time-decay') {
        // Time-decay: More weight to recent touchpoints (good for impulse purchases)
        const decayFactor = 0.8; // 80% weight to last touch for consumer behavior
        attributedConversions[channel] = (data.conversions * 0.7) + (data.assists * 0.3 * decayFactor);
      } else if (inputs.attributionModel === 'linear') {
        // Linear: Equal weight to all touchpoints
        attributedConversions[channel] = (data.conversions + data.assists) / 2;
      } else {
        // Data-driven (simplified for consumer behavior)
        const totalInteractions = data.clicks + data.assists + data.conversions;
        const conversionRate = totalInteractions > 0 ? data.conversions / totalInteractions : 0;
        attributedConversions[channel] = data.conversions + (data.assists * conversionRate * 0.6);
      }
      
      totalAttributedConversions += attributedConversions[channel];
    });

    // Calculate attributed CAC
    channels.forEach(channel => {
      const data = inputs.channelData[channel as keyof typeof inputs.channelData];
      attributedCAC[channel] = attributedConversions[channel] > 0 ? 
        data.spend / attributedConversions[channel] : 0;
    });

    // Calculate optimal budget allocation based on attributed CAC
    const totalBudget = totalSpend;
    const cacValues = channels.map(channel => attributedCAC[channel]).filter(cac => cac > 0);
    const minCAC = Math.min(...cacValues);
    
    let budgetSum = 0;
    channels.forEach(channel => {
      if (attributedCAC[channel] > 0) {
        // Allocate more budget to lower CAC channels
        const efficiency = minCAC / attributedCAC[channel];
        budgetRecommendations[channel] = (totalBudget * efficiency) / channels.length;
        budgetSum += budgetRecommendations[channel];
      }
    });

    // Normalize budget recommendations to total budget
    channels.forEach(channel => {
      if (budgetRecommendations[channel] > 0) {
        budgetRecommendations[channel] = (budgetRecommendations[channel] / budgetSum) * totalBudget;
      }
    });

    // Calculate improvement metrics
    const currentBlendedCAC = totalSpend / totalConversions;
    const newBlendedCAC = totalSpend / totalAttributedConversions;
    const totalCACImprovement = ((currentBlendedCAC - newBlendedCAC) / currentBlendedCAC) * 100;
    
    const budgetEfficiencyGain = channels.reduce((sum, channel) => {
      const currentBudget = inputs.channelData[channel as keyof typeof inputs.channelData].spend;
      const recommendedBudget = budgetRecommendations[channel];
      const efficiency = recommendedBudget / currentBudget;
      return sum + (efficiency - 1);
    }, 0) * 25; // Approximate efficiency percentage

    // Calculate actual potential savings based on budget reallocation efficiency
    const currentEfficiency = channels.reduce((sum, channel) => {
      const data = inputs.channelData[channel as keyof typeof inputs.channelData];
      return sum + (data.spend / (lastClickCAC[channel] || 1));
    }, 0);
    
    const optimizedEfficiency = channels.reduce((sum, channel) => {
      return sum + (budgetRecommendations[channel] || 0) / (attributedCAC[channel] || 1);
    }, 0);
    
    const efficiencyGain = (optimizedEfficiency - currentEfficiency) / currentEfficiency;
    const reallocationSavings = totalSpend * Math.max(0, Math.min(0.35, efficiencyGain)); // Cap at 35% max savings for D2C

    setResults({
      lastClickCAC,
      attributedCAC,
      budgetRecommendations,
      totalAttributedConversions,
      improvementMetrics: {
        totalCACImprovement,
        budgetEfficiencyGain,
        reallocationSavings
      }
    });
  };

  const handleChannelDataChange = (channel: string, field: string, value: number) => {
    setInputs(prev => ({
      ...prev,
      channelData: {
        ...prev.channelData,
        [channel]: {
          ...prev.channelData[channel as keyof typeof prev.channelData],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold mb-4">
          <Calculator className="h-4 w-4 mr-2" />
          D2C Attribution Calculator
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Compare D2C Attribution Models & Calculate Impact
        </h3>
        <p className="text-gray-600">
          See how different attribution models affect CAC calculation for consumer subscription channels
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Configuration Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Attribution Model
            </label>
            <select
              value={inputs.attributionModel}
              onChange={(e) => setInputs(prev => ({ ...prev, attributionModel: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="position-based">Position-Based (40/20/40)</option>
              <option value="time-decay">Time-Decay</option>
              <option value="linear">Linear</option>
              <option value="data-driven">Data-Driven</option>
            </select>
          </div>

          {inputs.attributionModel === 'position-based' && (
            <div className="bg-pink-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Position Weights (%)</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-600">Discovery</label>
                  <input
                    type="number"
                    value={inputs.touchpointWeights.firstTouch}
                    onChange={(e) => setInputs(prev => ({
                      ...prev,
                      touchpointWeights: { ...prev.touchpointWeights, firstTouch: Number(e.target.value) }
                    }))}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Consideration</label>
                  <input
                    type="number"
                    value={inputs.touchpointWeights.middleTouch}
                    onChange={(e) => setInputs(prev => ({
                      ...prev,
                      touchpointWeights: { ...prev.touchpointWeights, middleTouch: Number(e.target.value) }
                    }))}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Conversion</label>
                  <input
                    type="number"
                    value={inputs.touchpointWeights.lastTouch}
                    onChange={(e) => setInputs(prev => ({
                      ...prev,
                      touchpointWeights: { ...prev.touchpointWeights, lastTouch: Number(e.target.value) }
                    }))}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-4">D2C Channel Performance Data</h4>
            <div className="space-y-4">
              {Object.entries(inputs.channelData).map(([channel, data]) => (
                <div key={channel} className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">{channelNames[channel as keyof typeof channelNames]}</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-600">Monthly Spend ($)</label>
                      <input
                        type="number"
                        value={data.spend}
                        onChange={(e) => handleChannelDataChange(channel, 'spend', Number(e.target.value))}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Clicks</label>
                      <input
                        type="number"
                        value={data.clicks}
                        onChange={(e) => handleChannelDataChange(channel, 'clicks', Number(e.target.value))}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Assists</label>
                      <input
                        type="number"
                        value={data.assists}
                        onChange={(e) => handleChannelDataChange(channel, 'assists', Number(e.target.value))}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Subscriptions</label>
                      <input
                        type="number"
                        value={data.conversions}
                        onChange={(e) => handleChannelDataChange(channel, 'conversions', Number(e.target.value))}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={calculateAttribution}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <BarChart className="h-5 w-5 mr-2" />
            Calculate D2C Attribution Impact
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <>
              {/* CAC Comparison */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  CAC Comparison: Last-Click vs Multi-Touch
                </h4>
                <div className="space-y-4">
                  {Object.entries(results.lastClickCAC).map(([channel, lastClickCAC]) => (
                    <div key={channel} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>{channelNames[channel as keyof typeof channelNames]}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 p-3 rounded text-center">
                          <div className="text-lg font-bold text-red-600">
                            ${lastClickCAC.toFixed(0)}
                          </div>
                          <div className="text-xs text-red-700">Last-Click CAC</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded text-center">
                          <div className="text-lg font-bold text-green-600">
                            ${results.attributedCAC[channel].toFixed(0)}
                          </div>
                          <div className="text-xs text-green-700">Attributed CAC</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className={`text-sm font-medium ${
                          results.attributedCAC[channel] < lastClickCAC ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {results.attributedCAC[channel] < lastClickCAC ? '↓' : '↑'} 
                          {Math.abs(((results.attributedCAC[channel] - lastClickCAC) / lastClickCAC) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement Metrics */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4 text-purple-800">Attribution Impact Summary</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {results.improvementMetrics.totalCACImprovement.toFixed(1)}%
                    </div>
                    <div className="text-sm text-purple-700">CAC Accuracy Improvement</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${results.improvementMetrics.reallocationSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">Potential Monthly Savings</div>
                  </div>
                </div>
              </div>

              {/* Budget Recommendations */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4 text-blue-800">Optimized Budget Allocation</h4>
                <div className="space-y-3">
                  {Object.entries(results.budgetRecommendations).map(([channel, recommended]) => {
                    const current = inputs.channelData[channel as keyof typeof inputs.channelData].spend;
                    const change = ((recommended - current) / current) * 100;
                    
                    return (
                      <div key={channel} className="flex justify-between items-center bg-white p-3 rounded">
                        <span className="text-sm font-medium">
                          {channelNames[channel as keyof typeof channelNames]}
                        </span>
                        <div className="text-right">
                          <div className="text-sm font-bold">
                            ${current.toLocaleString()} → ${recommended.toFixed(0).toLocaleString()}
                          </div>
                          <div className={`text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change > 0 ? '+' : ''}{change.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Implementation CTA */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-center">
                <h4 className="font-semibold mb-2 text-white">Ready to Improve Your Attribution?</h4>
                <p className="text-purple-100 text-sm mb-4">
                  Get expert guidance on implementing D2C attribution for your subscription business
                </p>
                <ConsultationBookingCTA 
                  variant="secondary"
                  text="Book D2C Attribution Strategy Session"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center text-gray-500">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Configure your D2C channel data and click calculate to see attribution impact</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Methodology Note */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          <strong>Note:</strong> This calculator provides directional insights for D2C subscription attribution. 
          Actual implementation requires detailed consumer journey mapping and may vary based on brand specifics.
        </p>
      </div>
    </div>
  );
}