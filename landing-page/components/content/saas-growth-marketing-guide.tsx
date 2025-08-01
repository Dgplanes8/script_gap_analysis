'use client';

import { useState } from 'react';
import { TrendingUp, Calculator, Download, CheckCircle, Target, BarChart3, Users, DollarSign, ArrowRight, Zap, Shield, Rocket, Mail, Calendar } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { ContentNavigation } from '@/components/layout/content-navigation';

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
    icon: Rocket
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

const assessmentQuestions = [
  {
    category: 'Business Model',
    questions: [
      'What is your current monthly recurring revenue (MRR)?',
      'What is your average customer lifetime value (LTV)?',
      'What is your current customer acquisition cost (CAC)?',
      'What percentage of revenue comes from expansion/upsells?'
    ]
  },
  {
    category: 'Current Marketing',
    questions: [
      'Which channels are you currently using?',
      'What is your monthly marketing budget?',
      'What is your current trial-to-paid conversion rate?',
      'How do you currently track marketing attribution?'
    ]
  },
  {
    category: 'Growth Objectives',
    questions: [
      'What is your target growth rate for the next 12 months?',
      'What are your biggest growth challenges?',
      'Which customer segments drive the most value?',
      'What is your ideal customer acquisition cost?'
    ]
  }
];

const caseStudyResults = [
  {
    company: 'B2B Analytics Platform',
    challenge: 'Over-reliance on paid search with increasing costs',
    solution: 'Diversified into content marketing and product-led growth',
    results: {
      cacReduction: '35%',
      channelDiversification: '5 channels',
      growthRate: '+127% MRR'
    }
  },
  {
    company: 'Marketing Automation SaaS',
    challenge: 'Low trial-to-paid conversion and poor attribution',
    solution: 'Implemented funnel optimization and attribution system',
    results: {
      conversionImprovement: '+89%',
      attributionAccuracy: '92%',
      roiImprovement: '+156%'
    }
  },
  {
    company: 'Enterprise CRM Platform', 
    challenge: 'Long sales cycles and complex buying committees',
    solution: 'Built account-based marketing system with multi-touch nurturing',
    results: {
      salesCycleReduction: '28%',
      dealSizeIncrease: '+67%',
      winRateImprovement: '+43%'
    }
  }
];

export function SaaSGrowthMarketingGuide() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});

  const handleAssessmentStart = () => {
    setShowAssessment(true);
    // Track assessment start
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'channel_assessment_start', {
        event_category: 'engagement',
        event_label: 'saas_growth_marketing'
      });
    }
  };

  const handleDownloadRequest = () => {
    setShowDownload(true);
    // Track download intent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'playbook_download_intent', {
        event_category: 'lead_generation',
        event_label: 'saas_growth_marketing_guide'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-emerald-600">Strategic Ad Intelligence</span>
            </div>
            <ConsultationBookingCTA variant="header" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="h-4 w-4 mr-2" />
              SaaS Growth Marketing Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-emerald-600">SaaS Growth Marketing</span>
              <br />Channel Optimization Guide
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              Complete guide to optimizing your SaaS growth marketing channels. Includes interactive assessment tool, 
              optimization playbook, and strategic frameworks for scaling your SaaS business efficiently.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleAssessmentStart}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Start Channel Assessment
              </button>
              
              <button
                onClick={handleDownloadRequest}
                className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Optimization Guide
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Interactive channel assessment
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Optimization frameworks
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Implementation roadmaps
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Growth strategy audit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Channels Overview */}
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

      {/* Optimization Frameworks */}
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

      {/* Case Study Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Channel Optimization Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from SaaS companies that optimized their growth channels
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudyResults.map((study, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{study.company}</h3>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-700 text-sm">{study.challenge}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-700 text-sm">{study.solution}</p>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(study.results).map(([key, value], resultIndex) => (
                    <div key={resultIndex} className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      <span className="text-lg font-bold text-emerald-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Optimize Your Growth Channels?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Get personalized channel performance assessment and strategic growth audit. 
            We'll help you identify the highest-impact optimization opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowConsultation(true)}
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors inline-flex items-center"
            >
              <Calendar className="h-6 w-6 mr-3" />
              Book Growth Strategy Audit
            </button>
            
            <button
              onClick={handleAssessmentStart}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors inline-flex items-center"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Start Free Assessment
            </button>
          </div>
        </div>
      </section>

      {/* Channel Assessment Modal */}
      {showAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  SaaS Growth Channel Assessment
                </h2>
                <button
                  onClick={() => setShowAssessment(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    Step {assessmentStep + 1} of {assessmentQuestions.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {assessmentQuestions[assessmentStep]?.category}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((assessmentStep + 1) / assessmentQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {assessmentStep < assessmentQuestions.length ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {assessmentQuestions[assessmentStep]?.category} Assessment
                  </h3>
                  
                  <div className="space-y-4">
                    {assessmentQuestions[assessmentStep]?.questions.map((question, qIndex) => (
                      <div key={qIndex} className="p-4 border border-gray-200 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {question}
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Your answer..."
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setAssessmentStep(Math.max(0, assessmentStep - 1))}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      disabled={assessmentStep === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setAssessmentStep(assessmentStep + 1)}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      {assessmentStep === assessmentQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Assessment Complete!
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Get your personalized channel optimization report and strategic growth recommendations.
                  </p>
                  
                  <EmailCaptureForm
                    placeholder="Enter your work email for results"
                    buttonText="Get My Assessment Results"
                    variant="cta"
                    showFirstName={true}
                    source="saas-growth-channel-assessment"
                    onSubmit={async () => setShowAssessment(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Download Optimization Guide
                </h2>
                <button
                  onClick={() => setShowDownload(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <EmailCaptureForm
                placeholder="Enter your work email"
                buttonText="Download Guide"
                variant="cta"
                showFirstName={true}
                source="saas-growth-marketing-guide-download"
                onSubmit={async () => setShowDownload(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {showConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Growth Strategy Audit
                </h2>
                <button
                  onClick={() => setShowConsultation(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <StrategicConsultationForm onClose={() => setShowConsultation(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Content Navigation */}
      <ContentNavigation 
        currentPath="/saas-growth-marketing-guide" 
        variant="horizontal"
      />
    </div>
  );
}