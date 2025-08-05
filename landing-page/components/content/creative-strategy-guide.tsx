'use client';

import { useState } from 'react';
import { Lightbulb, Target, Zap, TrendingUp, Users, Brain, Video, BarChart3 } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

const creativeFrameworks = [
  {
    title: 'Customer Language Intelligence',
    icon: Brain,
    description: 'Extract and analyze customer language patterns from reviews, support tickets, and social media',
    benefits: [
      'Authentic messaging that resonates',
      'Higher click-through rates',
      'Improved ad relevance scores',
      'Reduced creative fatigue'
    ],
    implementation: [
      'Analyze 1000+ customer touchpoints',
      'Extract high-frequency pain points',
      'Map language to customer journey stages',
      'Create hook variations using authentic language'
    ]
  },
  {
    title: 'Behavioral Trigger Optimization',
    icon: Zap,
    description: 'Design creatives that trigger specific psychological responses and decision-making patterns',
    benefits: [
      'Increased conversion rates',
      'Shorter sales cycles',
      'Higher-quality leads',
      'Better audience engagement'
    ],
    implementation: [
      'Identify target audience behavioral patterns',
      'Map triggers to customer personas',
      'Design creative elements for each trigger',
      'Test and optimize trigger effectiveness'
    ]
  },
  {
    title: 'Multi-Variant Creative Testing',
    icon: BarChart3,
    description: 'Systematic testing methodology for creative elements, messaging, and visual components',
    benefits: [
      'Data-driven creative decisions',
      'Continuous performance improvement',
      'Reduced guesswork',
      'Scalable optimization process'
    ],
    implementation: [
      'Set up proper testing framework',
      'Create variation matrices',
      'Implement statistical significance tracking',
      'Automate winning creative deployment'
    ]
  },
  {
    title: 'Audience-Creative Alignment',
    icon: Target,
    description: 'Match creative messaging and visual elements to specific audience segments and intent levels',
    benefits: [
      'Higher relevance scores',
      'Improved audience retention',
      'Better cost efficiency',
      'Increased lifetime value'
    ],
    implementation: [
      'Segment audiences by intent and behavior',
      'Create segment-specific creative variants',
      'Map creative to funnel stages',
      'Monitor segment performance metrics'
    ]
  }
];

const performanceMetrics = [
  {
    metric: 'Average CTR Improvement',
    before: '2.4%',
    after: '4.8%',
    improvement: '+100%',
    timeframe: '60 days'
  },
  {
    metric: 'Conversion Rate Boost',
    before: '3.2%',
    after: '5.8%',
    improvement: '+81%',
    timeframe: '90 days'
  },
  {
    metric: 'Cost Per Acquisition',
    before: '$420',
    after: '$240',
    improvement: '-43%',
    timeframe: '120 days'
  },
  {
    metric: 'Return on Ad Spend',
    before: '2.8x',
    after: '5.2x',
    improvement: '+86%',
    timeframe: '90 days'
  }
];

export function CreativeStrategyGuide() {
  const [activeFramework, setActiveFramework] = useState(0);
  const [showDownload, setShowDownload] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          The Strategic Creative Intelligence Framework
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our proprietary methodology for developing high-converting SaaS creative strategies 
          based on behavioral psychology and customer intelligence.
        </p>
      </div>

      {/* Framework Overview */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Framework Navigation */}
        <div className="space-y-4">
          {creativeFrameworks.map((framework, index) => {
            const IconComponent = framework.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  activeFramework === index
                    ? 'bg-emerald-50 border-2 border-emerald-500'
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-emerald-300'
                }`}
                onClick={() => setActiveFramework(index)}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg mr-4 ${
                    activeFramework === index ? 'bg-emerald-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      activeFramework === index ? 'text-emerald-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {framework.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {framework.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Framework Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {creativeFrameworks[activeFramework].title}
            </h3>
            <p className="text-gray-700">
              {creativeFrameworks[activeFramework].description}
            </p>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h4>
            <ul className="space-y-2">
              {creativeFrameworks[activeFramework].benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-emerald-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Implementation Steps:</h4>
            <ol className="space-y-3">
              {creativeFrameworks[activeFramework].implementation.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-semibold text-emerald-600">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-3">
            Proven Performance Results
          </h3>
          <p className="text-emerald-100">
            Average improvements across 200+ SaaS campaigns using our framework
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">{metric.improvement}</div>
                <div className="text-emerald-100 font-semibold mb-2">{metric.metric}</div>
                <div className="text-sm text-emerald-200">
                  {metric.before} → {metric.after}
                </div>
                <div className="text-xs text-emerald-300 mt-2">
                  in {metric.timeframe}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Methodology */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Our 4-Phase Implementation Methodology
          </h3>
          <p className="text-gray-600">
            How we implement creative strategy optimizations for maximum ROI
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Analysis</h4>
            <p className="text-gray-600 text-sm">
              Deep-dive customer intelligence gathering and current performance audit
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Strategy</h4>
            <p className="text-gray-600 text-sm">
              Creative strategy development with behavioral triggers and messaging architecture
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="h-8 w-8 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Execution</h4>
            <p className="text-gray-600 text-sm">
              Creative production and deployment with systematic A/B testing protocols
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Optimization</h4>
            <p className="text-gray-600 text-sm">
              Continuous performance monitoring and iterative improvement cycles
            </p>
          </div>
        </div>
      </div>

      {/* Download CTA */}
      <div className="text-center">
        <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Get the Complete Creative Strategy Framework
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get weekly creative strategy insights with templates, 
            checklists, and proven examples.
          </p>
          
          {showDownload ? (
            <EmailCaptureForm
              placeholder="Enter your work email"
              buttonText="Get Creative Insights"
              variant="cta"
              source="creative-strategy-guide"
            />
          ) : (
            <button
              onClick={() => setShowDownload(true)}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center"
            >
              <Lightbulb className="h-5 w-5 mr-2" />
              Get Free Framework Guide
            </button>
          )}
        </div>
      </div>
    </div>
  );
}