'use client';

import { useState } from 'react';
import { BookOpen, Download, CheckCircle, Target, TrendingUp, Users, DollarSign, ArrowRight, Mail, Calendar, BarChart3, Zap, Shield, Rocket } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { StrategyAssessmentForm } from '@/components/forms/strategy-assessment-form';
import { ContentNavigation } from '@/components/layout/content-navigation';

const strategicFrameworks = [
  {
    title: 'Customer Lifecycle Value Framework',
    description: 'Map every touchpoint from acquisition to expansion',
    components: [
      'Acquisition cost modeling',
      'Onboarding optimization',
      'Feature adoption tracking',
      'Expansion revenue triggers'
    ],
    icon: Target
  },
  {
    title: 'Multi-Channel Attribution System',
    description: 'Track true ROI across all marketing channels',
    components: [
      'First-touch attribution',
      'Multi-touch modeling',
      'Channel interaction mapping',
      'Revenue attribution scoring'
    ],
    icon: BarChart3
  },
  {
    title: 'Cohort-Based Retention Strategy',
    description: 'Reduce churn and maximize customer lifetime value',
    components: [
      'Cohort analysis framework',
      'Churn prediction modeling',
      'Retention campaign triggers',
      'Win-back sequences'
    ],
    icon: Shield
  },
  {
    title: 'Growth Loop Optimization',
    description: 'Create self-reinforcing growth mechanisms',
    components: [
      'Viral coefficient tracking',
      'Referral program design',
      'User-generated content loops',
      'Network effect amplification'
    ],
    icon: Rocket
  }
];

const implementationChecklist = [
  {
    phase: 'Foundation (Weeks 1-2)',
    tasks: [
      'Complete customer research and ICP definition',
      'Set up analytics and attribution tracking',
      'Audit existing marketing channels and performance',
      'Define key metrics and success criteria'
    ]
  },
  {
    phase: 'Channel Optimization (Weeks 3-6)',
    tasks: [
      'Implement customer language analysis',
      'Launch A/B tests across all channels',
      'Optimize conversion funnels and landing pages',
      'Deploy retention and onboarding sequences'
    ]
  },
  {
    phase: 'Scale & Automate (Weeks 7-8)', 
    tasks: [
      'Scale high-performing channels',
      'Implement marketing automation workflows',
      'Launch expansion revenue campaigns',
      'Set up performance monitoring dashboards'
    ]
  }
];

const caseStudyHighlights = [
  {
    company: 'B2B Project Management SaaS',
    challenge: 'High CAC ($450) and low trial-to-paid conversion (1.2%)',
    solution: 'Implemented customer language-driven messaging and funnel optimization',
    results: {
      cacReduction: '42%',
      conversionImprovement: '158%',
      timeToResult: '90 days'
    }
  },
  {
    company: 'FinTech Subscription Platform',
    challenge: 'Struggled to scale beyond $500K ARR with high churn',
    solution: 'Built cohort-based retention system and multi-channel attribution',
    results: {
      arrGrowth: '140%',
      churnReduction: '35%',
      timeToResult: '120 days'
    }
  },
  {
    company: 'Marketing Automation SaaS',
    challenge: 'Low customer lifetime value and poor expansion revenue',
    solution: 'Developed growth loop optimization and expansion campaigns',
    results: {
      ltvIncrease: '85%',
      expansionRevenue: '65% of new revenue',
      timeToResult: '6 months'
    }
  }
];

const emailCourseModules = [
  {
    day: 1,
    title: 'Subscription Marketing Fundamentals',
    description: 'Core principles and metrics that drive subscription growth'
  },
  {
    day: 2, 
    title: 'Customer Lifecycle Optimization',
    description: 'Map and optimize every stage of the customer journey'
  },
  {
    day: 3,
    title: 'Multi-Channel Attribution Mastery',
    description: 'Track true ROI and optimize channel performance'
  },
  {
    day: 4,
    title: 'Retention & Expansion Strategies',
    description: 'Reduce churn and maximize customer lifetime value'
  },
  {
    day: 5,
    title: 'Growth Loop Implementation',
    description: 'Create self-reinforcing growth mechanisms'
  },
  {
    day: 6,
    title: 'Advanced Analytics & Optimization',
    description: 'Cohort analysis, predictive modeling, and growth forecasting'
  },
  {
    day: 7,
    title: 'Scaling & Automation Blueprint',
    description: 'Systems and processes for sustainable growth'
  }
];

export function SubscriptionMarketingGuide() {
  const [showEmailCourse, setShowEmailCourse] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const handleEmailCourseRequest = () => {
    setShowEmailCourse(true);
    // Track email course request
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'email_course_request', {
        event_category: 'lead_generation',
        event_label: 'subscription_marketing_course'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Strategic Ad Intelligence</span>
            </div>
            <ConsultationBookingCTA variant="header" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <BookOpen className="h-4 w-4 mr-2" />
              Complete Strategy Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete Guide to <span className="text-blue-600">Subscription Marketing Strategy</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              The definitive 8,000-word guide to building, optimizing, and scaling subscription marketing systems. 
              Includes strategic frameworks, implementation templates, and proven case studies from Fortune 100 companies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleEmailCourseRequest}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Get 7-Part Email Course
              </button>
              
              <button
                onClick={() => setShowAssessment(true)}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Strategy Consultation
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                8,000+ word comprehensive guide
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Strategic framework templates
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Implementation checklist
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Strategic implementation guides
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Frameworks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              4 Core Strategic Frameworks
            </h2>
            <p className="text-xl text-gray-600">
              Proven methodologies used by Fortune 100 subscription businesses
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {strategicFrameworks.map((framework, index) => {
              const IconComponent = framework.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-blue-600" />
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

      {/* Implementation Checklist */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              8-Week Implementation Checklist
            </h2>
            <p className="text-xl text-gray-600">
              Step-by-step roadmap to transform your subscription marketing
            </p>
          </div>
          
          <div className="space-y-8">
            {implementationChecklist.map((phase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {phase.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Implementation Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how companies transformed their subscription marketing
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudyHighlights.map((study, index) => (
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
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Results:</span>
                    <span className="text-lg font-bold text-green-600">{Object.values(study.results)[0]}</span>
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    Achieved in {study.results.timeToResult}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Course CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Master Subscription Marketing in 7 Days
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the complete strategic framework delivered to your inbox. 
              Each lesson includes templates, checklists, and real implementation examples.
            </p>
            
            {showEmailCourse ? (
              <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
                <EmailCaptureForm
                  placeholder="Enter your work email"
                  buttonText="Start Email Course"
                  variant="cta"
                  source="subscription-marketing-email-course"
                />
              </div>
            ) : (
              <button
                onClick={handleEmailCourseRequest}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors inline-flex items-center"
              >
                <Mail className="h-6 w-6 mr-3" />
                Get Free 7-Part Email Course
              </button>
            )}
            
            <div className="mt-8">
              <ConsultationBookingCTA 
                variant="secondary" 
                text="Book Strategic Consultation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Email Course Curriculum */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              7-Part Email Course Curriculum
            </h2>
            <p className="text-xl text-gray-600">
              Each lesson delivered daily with actionable frameworks and templates
            </p>
          </div>
          
          <div className="space-y-4">
            {emailCourseModules.map((module, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm">{module.day}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-700">{module.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Assessment Modal */}
      {showAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Free Strategic Assessment
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
              
              <StrategyAssessmentForm onClose={() => setShowAssessment(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Content Navigation */}
      <ContentNavigation 
        currentPath="/subscription-marketing-strategy-guide" 
        variant="horizontal"
      />
    </div>
  );
}