'use client';

import { CheckCircle, BarChart3, Target, Zap, Shield } from 'lucide-react';

const optimizationFrameworks = [
  {
    title: 'Channel Performance Matrix',
    description: 'Evaluate and prioritize D2C channels based on consumer behavior',
    components: [
      'Consumer journey mapping',
      'Channel attribution modeling',
      'Lifetime value optimization',
      'Seasonal performance analysis'
    ],
    icon: BarChart3
  },
  {
    title: 'Retention-First Growth',
    description: 'Build sustainable growth through customer retention',
    components: [
      'Churn prediction modeling',
      'Engagement optimization loops', 
      'Personalization frameworks',
      'Loyalty program design'
    ],
    icon: Zap
  },
  {
    title: 'Creative Testing System',
    description: 'Systematic approach to creative optimization for D2C',
    components: [
      'Creative performance benchmarking',
      'Audience-creative matching',
      'Video creative frameworks',
      'Social proof optimization'
    ],
    icon: Target
  },
  {
    title: 'Consumer Data Platform',
    description: 'Unified view of customer behavior and preferences',
    components: [
      'First-party data collection',
      'Consumer behavior tracking',
      'Subscription lifecycle analytics',
      'Predictive LTV modeling'
    ],
    icon: Shield
  }
];

const implementationSteps = [
  {
    phase: 'Discovery & Audit',
    duration: '2 weeks',
    description: 'Analyze current performance and identify optimization opportunities',
    deliverables: [
      'Channel performance audit',
      'Consumer behavior analysis',
      'Competitive landscape review',
      'Growth opportunity assessment'
    ]
  },
  {
    phase: 'Strategy Development',
    duration: '2 weeks', 
    description: 'Design comprehensive channel optimization strategy',
    deliverables: [
      'Channel mix optimization plan',
      'Creative strategy framework',
      'Retention optimization roadmap',
      'Attribution system design'
    ]
  },
  {
    phase: 'Implementation',
    duration: '4-6 weeks',
    description: 'Deploy optimization frameworks and tracking systems',
    deliverables: [
      'Channel setup and optimization',
      'Creative testing implementation',
      'Analytics and attribution setup',
      'Performance monitoring dashboards'
    ]
  },
  {
    phase: 'Optimization & Scale',
    duration: 'Ongoing',
    description: 'Continuous optimization based on performance data',
    deliverables: [
      'Weekly performance reviews',
      'Monthly strategy adjustments',
      'Quarterly growth planning',
      'Annual channel strategy refresh'
    ]
  }
];

export function ChannelStrategies() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Consumer Subscription Optimization Frameworks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proven frameworks for optimizing consumer subscription marketing across 
            the entire customer lifecycle, from awareness to retention.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {optimizationFrameworks.map((framework, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <framework.icon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{framework.title}</h3>
                  <p className="text-gray-600">{framework.description}</p>
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
          ))}
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            4-Phase Implementation Roadmap
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-purple-50 rounded-lg p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{step.phase}</h4>
                      <div className="text-sm text-purple-600 font-semibold">{step.duration}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  
                  <div className="space-y-2">
                    {step.deliverables.map((deliverable, deliverableIndex) => (
                      <div key={deliverableIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {index < implementationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-purple-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}