'use client';

import { CheckCircle } from 'lucide-react';

const growthChannels = [
  {
    name: 'Content Marketing',
    description: 'SEO-driven content strategy and thought leadership',
    effectiveness: 85,
    timeToValue: '3-6 months',
    avgCost: '$3,000-8,000/month',
    bestFor: 'Complex B2B SaaS with long sales cycles',
    keyMetrics: ['Organic traffic', 'Lead quality', 'Content engagement', 'Brand awareness']
  },
  {
    name: 'Paid Search (Google Ads)',
    description: 'High-intent keyword targeting and conversion optimization',
    effectiveness: 90,
    timeToValue: '2-4 weeks',
    avgCost: '$5,000-15,000/month',
    bestFor: 'SaaS with clear search demand and high LTV',
    keyMetrics: ['CPC', 'Conversion rate', 'Quality Score', 'ROAS']
  },
  {
    name: 'LinkedIn Advertising',
    description: 'B2B targeting with professional context',
    effectiveness: 75,
    timeToValue: '4-8 weeks',
    avgCost: '$4,000-12,000/month',
    bestFor: 'Enterprise B2B SaaS and professional tools',
    keyMetrics: ['CPL', 'CTR', 'Social engagement', 'Pipeline influence']
  },
  {
    name: 'Product-Led Growth',
    description: 'Free trial/freemium model with in-product conversion',
    effectiveness: 95,
    timeToValue: '6-12 months',
    avgCost: '$2,000-5,000/month',
    bestFor: 'Self-serve SaaS with low-touch onboarding',
    keyMetrics: ['Trial-to-paid rate', 'Feature adoption', 'Time to value', 'Viral coefficient']
  },
  {
    name: 'Account-Based Marketing',
    description: 'Targeted approach for high-value enterprise accounts',
    effectiveness: 80,
    timeToValue: '6-12 months',
    avgCost: '$8,000-20,000/month',
    bestFor: 'Enterprise SaaS with complex sales processes',
    keyMetrics: ['Account engagement', 'Deal velocity', 'Win rate', 'Deal size']
  },
  {
    name: 'Email Marketing',
    description: 'Nurturing sequences and lifecycle marketing',
    effectiveness: 70,
    timeToValue: '1-2 months',
    avgCost: '$1,000-3,000/month',
    bestFor: 'All SaaS types as supporting channel',
    keyMetrics: ['Open rate', 'Click rate', 'Conversion rate', 'Revenue attribution']
  }
];

export function GrowthMetrics() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            SaaS Growth Channel Analysis
          </h2>
          <p className="text-xl text-gray-600">
            Compare effectiveness, costs, and implementation requirements across channels
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {growthChannels.map((channel, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.name}</h3>
                  <p className="text-gray-700 mb-3">{channel.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-emerald-600">{channel.effectiveness}%</div>
                  <div className="text-xs text-gray-600">Effectiveness</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm font-semibold text-gray-900">Time to Value</div>
                  <div className="text-sm text-gray-600">{channel.timeToValue}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Average Cost</div>
                  <div className="text-sm text-gray-600">{channel.avgCost}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-900 mb-2">Best For:</div>
                <div className="text-sm text-gray-700">{channel.bestFor}</div>
              </div>
              
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-2">Key Metrics:</div>
                <div className="flex flex-wrap gap-2">
                  {channel.keyMetrics.map((metric, metricIndex) => (
                    <span key={metricIndex} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}