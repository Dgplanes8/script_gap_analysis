'use client';

import { CheckCircle, BarChart3, Target, Zap, Shield } from 'lucide-react';

const optimizationFrameworks = [
  {
    title: 'Channel Performance Matrix',
    description: 'Evaluate and prioritize channels based on performance potential',
    components: [
      'ROI potential scoring',
      'Implementation complexity assessment',
      'Time to value analysis',
      'Resource requirement mapping'
    ],
    icon: BarChart3
  },
  {
    title: 'Growth Loop Design',
    description: 'Create self-reinforcing growth mechanisms',
    components: [
      'User acquisition triggers',
      'Activation and retention loops', 
      'Referral and viral mechanics',
      'Revenue expansion drivers'
    ],
    icon: Zap
  },
  {
    title: 'Funnel Optimization System',
    description: 'Systematic approach to conversion optimization',
    components: [
      'Conversion bottleneck identification',
      'A/B testing prioritization',
      'User experience optimization',
      'Performance monitoring dashboards'
    ],
    icon: Target
  },
  {
    title: 'Attribution & Analytics',
    description: 'Track true channel performance and ROI',
    components: [
      'Multi-touch attribution setup',
      'Customer journey mapping',
      'Cohort analysis implementation',
      'Predictive analytics modeling'
    ],
    icon: Shield
  }
];

export function ChannelStrategies() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Strategic Optimization Frameworks
          </h2>
          <p className="text-xl text-gray-600">
            Proven methodologies for optimizing and scaling growth channels
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {optimizationFrameworks.map((framework, index) => {
            const IconComponent = framework.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{framework.title}</h3>
                    <p className="text-gray-700">{framework.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {framework.components.map((component, componentIndex) => (
                    <div key={componentIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{component}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}