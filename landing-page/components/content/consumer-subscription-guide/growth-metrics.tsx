'use client';

import { CheckCircle } from 'lucide-react';

const growthChannels = [
  {
    name: 'Social Media Advertising',
    description: 'Instagram, TikTok, and Facebook targeting for consumer brands',
    effectiveness: 90,
    timeToValue: '2-4 weeks',
    avgCost: '$8,000-25,000/month',
    bestFor: 'Visual consumer products with broad appeal',
    keyMetrics: ['CPM', 'Engagement rate', 'Click-through rate', 'ROAS']
  },
  {
    name: 'Influencer Marketing',
    description: 'Partnership with creators for authentic brand promotion',
    effectiveness: 85,
    timeToValue: '4-8 weeks',
    avgCost: '$5,000-20,000/month',
    bestFor: 'Lifestyle and wellness subscription brands',
    keyMetrics: ['Reach', 'Engagement rate', 'Brand mentions', 'Conversion rate']
  },
  {
    name: 'Content Marketing & SEO',
    description: 'Educational content and organic search optimization',
    effectiveness: 75,
    timeToValue: '6-12 months',
    avgCost: '$3,000-10,000/month',
    bestFor: 'Subscription boxes and educational products',
    keyMetrics: ['Organic traffic', 'Content engagement', 'Brand authority', 'Share of voice']
  },
  {
    name: 'Email & SMS Marketing',
    description: 'Direct communication for retention and re-engagement',
    effectiveness: 95,
    timeToValue: '2-6 weeks',
    avgCost: '$2,000-8,000/month',
    bestFor: 'All consumer subscription businesses',
    keyMetrics: ['Open rate', 'Click rate', 'Revenue per email', 'Churn reduction']
  },
  {
    name: 'Referral Programs',
    description: 'Customer-driven acquisition through incentivized sharing',
    effectiveness: 80,
    timeToValue: '8-12 weeks',
    avgCost: '$1,000-5,000/month',
    bestFor: 'High-satisfaction consumer subscriptions',
    keyMetrics: ['Referral rate', 'Viral coefficient', 'CAC reduction', 'LTV increase']
  },
  {
    name: 'Connected TV/OTT',
    description: 'Video advertising on streaming platforms',
    effectiveness: 70,
    timeToValue: '4-8 weeks',
    avgCost: '$10,000-40,000/month',
    bestFor: 'Mass market consumer subscription services',
    keyMetrics: ['View-through rate', 'Brand lift', 'Attribution lift', 'CPM efficiency']
  }
];

export function GrowthMetrics() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Consumer Subscription Marketing Channels
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Effectiveness analysis of key marketing channels for consumer subscription businesses, 
            based on performance data across different D2C categories and growth stages.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {growthChannels.map((channel, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.name}</h3>
                  <p className="text-gray-600">{channel.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{channel.effectiveness}%</div>
                  <div className="text-sm text-gray-500">Effectiveness</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-sm font-semibold text-gray-700">Time to Value</div>
                  <div className="text-purple-600 font-medium">{channel.timeToValue}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700">Average Cost</div>
                  <div className="text-purple-600 font-medium">{channel.avgCost}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700">Best For</div>
                  <div className="text-gray-600 text-sm">{channel.bestFor}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-3">Key Performance Metrics</div>
                <div className="grid grid-cols-2 gap-2">
                  {channel.keyMetrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Channel Mix Strategy for Consumer Subscriptions
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">3-4</div>
              <div className="text-sm font-semibold text-gray-700 mb-2">Primary Channels</div>
              <div className="text-xs text-gray-600">Focus on channels that align with your customer journey and brand positioning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">60/40</div>
              <div className="text-sm font-semibold text-gray-700 mb-2">Paid/Organic Split</div>
              <div className="text-xs text-gray-600">Optimal balance between paid acquisition and organic growth for D2C brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">30%</div>
              <div className="text-sm font-semibold text-gray-700 mb-2">Retention Focus</div>
              <div className="text-xs text-gray-600">Minimum budget allocation for retention and customer lifetime value optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}