'use client';

import { useState } from 'react';
import { BookOpen, Download, Play, CheckCircle, Target, TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { StrategyAssessmentForm } from '@/components/forms/strategy-assessment-form';
import { ContentNavigation } from '@/components/layout/content-navigation';

const playbookModules = [
  {
    title: 'Foundation Setup',
    duration: 'Week 1-2',
    description: 'Market positioning, ICP definition, and strategic foundation',
    topics: [
      'Ideal Customer Profile (ICP) framework',
      'Competitive positioning strategy', 
      'Value proposition optimization',
      'Brand messaging architecture'
    ]
  },
  {
    title: 'Customer Acquisition Engine',
    duration: 'Week 3-6',
    description: 'Build scalable acquisition systems across all channels',
    topics: [
      'Channel selection and prioritization',
      'Funnel optimization framework',
      'Lead scoring and qualification',
      'Attribution modeling setup'
    ]
  },
  {
    title: 'Content & Creative Strategy', 
    duration: 'Week 7-10',
    description: 'High-converting content and creative systems',
    topics: [
      'Customer language analysis',
      'Hook development methodology',
      'Video creative frameworks',
      'A/B testing protocols'
    ]
  },
  {
    title: 'Retention & Expansion',
    duration: 'Week 11-14',
    description: 'Maximize customer lifetime value and reduce churn',
    topics: [
      'Onboarding optimization',
      'Feature adoption tracking',
      'Expansion revenue strategies',
      'Churn prediction models'
    ]
  },
  {
    title: 'Scaling Operations',
    duration: 'Week 15-16',
    description: 'Systems and processes for sustainable growth',
    topics: [
      'Marketing automation setup',
      'Team structure and hiring',
      'KPI dashboards and reporting',
      'Growth planning frameworks'
    ]
  }
];

const successMetrics = [
  { metric: 'Average CAC Reduction', value: '42%', description: 'Compared to industry benchmarks' },
  { metric: 'LTV:CAC Improvement', value: '3.2x', description: 'Average ratio improvement' },
  { metric: 'Time to $1M ARR', value: '18 months', description: 'Average implementation timeline' },
  { metric: 'Revenue Growth Rate', value: '23% MoM', description: 'Sustained monthly growth' }
];

const caseStudies = [
  {
    company: 'B2B SaaS Platform',
    industry: 'Project Management',
    challenge: 'High CAC ($450) and low conversion rates (1.2%)',
    solution: 'Implemented customer language-driven creative strategy and funnel optimization',
    results: [
      'Reduced CAC from $450 to $260 (42% reduction)',
      'Increased conversion rate to 3.1%',
      'Achieved $1M ARR in 16 months'
    ]
  },
  {
    company: 'FinTech Subscription Service',
    industry: 'Financial Services',
    challenge: 'Struggled to scale beyond $500K ARR plateau',
    solution: 'Rebuilt acquisition engine with multi-channel attribution and retention focus',
    results: [
      'Broke through $500K plateau in 3 months',
      'Scaled to $1.2M ARR in 14 months',
      'Improved customer LTV by 85%'
    ]
  }
];

export function MarketingPlaybookLanding() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [downloadRequested, setDownloadRequested] = useState(false);

  const handleDownloadRequest = () => {
    setDownloadRequested(true);
    // Track download intent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'playbook_download_intent', {
        event_category: 'lead_generation',
        event_label: '1m_arr_playbook'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Strategic Ad Intelligence</span>
            </div>
            <ConsultationBookingCTA variant="header" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <BookOpen className="h-4 w-4 mr-2" />
                Complete Marketing Playbook
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The <span className="text-purple-600">$1M ARR</span>
                <br />Marketing Playbook
              </h1>
              
              <p className="text-xl text-gray-700 mb-8">
                The complete 16-week implementation guide used by Fortune 100 companies 
                to scale subscription businesses from $0 to $1M ARR. Includes strategic 
                frameworks, templates, and video training series.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleDownloadRequest}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Free Playbook
                </button>
                
                <button
                  onClick={() => setShowAssessment(true)}
                  className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Get Strategy Assessment
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  120+ page guide
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  Video training series
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  Implementation templates
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="w-full h-64 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg mb-6 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Complete Marketing System
                </h3>
                <p className="text-gray-600 mb-4">
                  Everything you need to scale from startup to $1M ARR, 
                  including Fortune 100 frameworks and proven strategies.
                </p>
                <div className="flex items-center text-sm text-purple-600 font-semibold">
                  <Play className="h-4 w-4 mr-2" />
                  Includes 8-hour video series
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proven Results from Real Implementations
            </h2>
            <p className="text-xl text-gray-600">
              Companies using this playbook consistently outperform industry benchmarks
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {metric.metric}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Playbook Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              16-Week Implementation Roadmap
            </h2>
            <p className="text-xl text-gray-600">
              Step-by-step guide from foundation to $1M ARR scale
            </p>
          </div>
          
          <div className="space-y-6">
            {playbookModules.map((module, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-purple-600">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                      <p className="text-purple-600 font-semibold">{module.duration}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{module.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {module.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how companies used this playbook to achieve $1M ARR
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{study.company}</h3>
                  <p className="text-purple-600 font-semibold">{study.industry}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-700">{study.challenge}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-700">{study.solution}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Results:</h4>
                  <ul className="space-y-2">
                    {study.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Scale to $1M ARR?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Download the complete playbook and get instant access to all frameworks, 
            templates, and the 8-hour video training series.
          </p>
          
          {downloadRequested ? (
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
              <EmailCaptureForm
                placeholder="Enter your work email"
                buttonText="Download Playbook"
                variant="cta"
                showFirstName={true}
                source="1m-arr-playbook-download"
              />
            </div>
          ) : (
            <button
              onClick={handleDownloadRequest}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors inline-flex items-center"
            >
              <Download className="h-6 w-6 mr-3" />
              Get Free Playbook + Video Series
            </button>
          )}
          
          <div className="mt-8">
            <ConsultationBookingCTA 
              variant="secondary" 
              text="Book Strategy Assessment Call"
            />
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
        currentPath="/1m-arr-marketing-playbook" 
        variant="horizontal"
      />
    </div>
  );
}