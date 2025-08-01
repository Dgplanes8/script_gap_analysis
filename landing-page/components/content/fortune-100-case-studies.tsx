'use client';

import { useState } from 'react';
import { FileText, Download, Eye, CheckCircle, TrendingUp, Users, DollarSign, ArrowRight, Lock, Unlock, BarChart3, Target, Zap, Shield } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { ContentNavigation } from '@/components/layout/content-navigation';

const caseStudies = [
  {
    id: 1,
    title: 'B2B SaaS Platform: 58% CAC Reduction Through Customer Language Analysis',
    company: 'Enterprise Project Management Software',
    industry: 'B2B SaaS',
    timeline: '6 months',
    teamSize: '15-person marketing team',
    challenge: 'High customer acquisition cost ($450 CAC) with low trial-to-paid conversion rates (1.2%). Traditional messaging focused on features rather than customer outcomes.',
    approach: [
      'Conducted 50+ customer interviews to extract authentic language patterns',
      'Analyzed support tickets and sales calls for pain point identification', 
      'Built messaging hierarchy based on customer language frequency',
      'Implemented systematic A/B testing across all channels'
    ],
    implementation: [
      'Phase 1: Customer research and language analysis (4 weeks)',
      'Phase 2: Message testing and optimization (8 weeks)',
      'Phase 3: Channel rollout and scale (12 weeks)',
      'Phase 4: Performance monitoring and iteration (ongoing)'
    ],
    results: {
      cacReduction: '58%',
      conversionImprovement: '190%',
      revenueGrowth: '240%',
      roasImprovement: '340%'
    },
    methodology: 'Customer Language Analysis + Multi-Channel Testing',
    downloadable: true,
    preview: 'This case study reveals how systematic customer language analysis transformed a struggling SaaS company into a growth leader...'
  },
  {
    id: 2,
    title: 'FinTech Platform: 340% Revenue Growth via Multi-Channel Attribution',
    company: 'Financial Services SaaS',
    industry: 'FinTech',
    timeline: '8 months',
    teamSize: '12-person growth team',
    challenge: 'Complex customer journey with multiple touchpoints making attribution impossible. Marketing budget allocated based on last-click, missing 70% of true conversion drivers.',
    approach: [
      'Implemented first-party data tracking across all touchpoints',
      'Built custom attribution modeling with machine learning',
      'Created channel interaction maps and influence scoring',
      'Developed budget allocation algorithm based on true contribution'
    ],
    implementation: [
      'Phase 1: Data infrastructure and tracking setup (6 weeks)',
      'Phase 2: Attribution model development (8 weeks)',
      'Phase 3: Budget reallocation and optimization (12 weeks)',
      'Phase 4: Advanced modeling and prediction (16 weeks)'
    ],
    results: {
      revenueGrowth: '340%',
      attributionAccuracy: '89%',
      budgetEfficiency: '67% improvement',
      roiImprovement: '280%'
    },
    methodology: 'Multi-Touch Attribution + Machine Learning Optimization',
    downloadable: true,
    preview: 'See how advanced attribution modeling uncovered hidden growth levers and transformed budget allocation strategy...'
  },
  {
    id: 3,
    title: 'Marketing Automation: 290% ROAS Improvement via Creative Optimization',
    company: 'Marketing Technology Platform',
    industry: 'MarTech',
    timeline: '5 months',
    teamSize: '8-person creative team',
    challenge: 'Creative fatigue across all channels with declining ROAS. Traditional creative development process took 6+ weeks with inconsistent performance.',
    approach: [
      'Built systematic creative testing framework',
      'Implemented dynamic creative optimization (DCO)',
      'Created customer journey-specific creative variants',
      'Developed creative scoring and prediction models'
    ],
    implementation: [
      'Phase 1: Creative audit and framework development (3 weeks)',
      'Phase 2: Testing infrastructure and DCO setup (6 weeks)',
      'Phase 3: Creative production and testing scale (8 weeks)',
      'Phase 4: Optimization and advanced modeling (8 weeks)'
    ],
    results: {
      roasImprovement: '290%',
      creativeEfficiency: '400% faster production',
      testingVelocity: '10x more tests per month',
      conversionLift: '185%'
    },
    methodology: 'Dynamic Creative Optimization + Performance Prediction',
    downloadable: true,
    preview: 'Discover the systematic approach to creative optimization that eliminated guesswork and maximized performance...'
  },
  {
    id: 4,
    title: 'Enterprise Software: Complex B2B Sales Cycle Optimization',
    company: 'Enterprise Analytics Platform',
    industry: 'Enterprise Software',
    timeline: '12 months',
    teamSize: '25-person revenue team',
    challenge: '18-month average sales cycle with multiple stakeholders. Marketing struggled to influence deals beyond initial lead generation.',
    approach: [
      'Mapped complete stakeholder journey and influence patterns',
      'Built account-based marketing (ABM) framework',
      'Implemented multi-stakeholder nurturing sequences',
      'Created closed-loop reporting between marketing and sales'
    ],
    implementation: [
      'Phase 1: Stakeholder mapping and journey analysis (8 weeks)',
      'Phase 2: ABM platform and process setup (12 weeks)',
      'Phase 3: Content and sequence development (16 weeks)',
      'Phase 4: Scale and optimization (20 weeks)'
    ],
    results: {
      salesCycleReduction: '35%',
      dealSizeIncrease: '128%',
      winRateImprovement: '67%',
      pipelineVelocity: '200% faster'
    },
    methodology: 'Account-Based Marketing + Multi-Stakeholder Nurturing',
    downloadable: true,
    preview: 'Learn how to compress complex B2B sales cycles and influence multiple stakeholders throughout the buying journey...'
  }
];

const methodologyBreakdowns = [
  {
    title: 'Customer Language Analysis Framework',
    description: 'Systematic approach to extracting and implementing authentic customer language',
    components: [
      'Interview methodology and question frameworks',
      'Language pattern analysis and categorization',
      'Message hierarchy development process',
      'Implementation and testing protocols'
    ],
    icon: Target
  },
  {
    title: 'Multi-Touch Attribution Modeling',
    description: 'Advanced attribution system for complex customer journeys',
    components: [
      'Data collection and integration strategy',
      'Attribution model development methodology',
      'Channel interaction mapping process',
      'Budget optimization algorithms'
    ],
    icon: BarChart3
  },
  {
    title: 'Dynamic Creative Optimization System',
    description: 'Scalable framework for creative testing and optimization',
    components: [
      'Creative testing framework design',
      'Dynamic optimization implementation',
      'Performance prediction modeling',
      'Creative production workflow'
    ],
    icon: Zap
  },
  {
    title: 'Account-Based Marketing Blueprint',
    description: 'Complete ABM system for complex B2B sales cycles',
    components: [
      'Stakeholder mapping methodology',
      'Multi-touch nurturing sequences',
      'Content strategy for buying committees',
      'Sales and marketing alignment process'
    ],
    icon: Shield
  }
];

type CaseStudy = typeof caseStudies[0];

export function Fortune100CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [downloadType, setDownloadType] = useState('');

  const handleDownloadRequest = (type: string, studyId: number | null = null) => {
    setDownloadType(type);
    setShowDownloadForm(true);
    
    // Track download intent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'case_study_download_intent', {
        event_category: 'lead_generation',
        event_label: studyId ? `case_study_${studyId}` : 'methodology_download'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-slate-700">Strategic Ad Intelligence</span>
            </div>
            <ConsultationBookingCTA variant="header" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-slate-100 text-slate-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <FileText className="h-4 w-4 mr-2" />
            Fortune 100 Case Studies
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-slate-600">Fortune 100</span> Ad Intelligence
            <br />Case Studies
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Detailed breakdowns of successful subscription marketing campaigns from Fortune 100 companies. 
            Each case study includes methodology, implementation timeline, and downloadable templates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => handleDownloadRequest('all_case_studies')}
              className="bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download All Case Studies
            </button>
            
            <button
              onClick={() => setShowConsultationForm(true)}
              className="border-2 border-slate-600 text-slate-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              <Target className="h-5 w-5 mr-2" />
              Get Methodology Consultation
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              4 detailed case studies
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Methodology breakdowns
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Implementation templates
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Fortune 100 insights
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={study.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {study.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <span className="bg-slate-100 px-2 py-1 rounded">{study.industry}</span>
                        <span className="mx-2">•</span>
                        <span>{study.timeline}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 line-clamp-3">{study.preview}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(study.results).slice(0, 2).map(([key, value], resultIndex) => (
                      <div key={resultIndex} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-600">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedStudy(study)}
                      className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleDownloadRequest('case_study', study.id)}
                      className="border border-slate-600 text-slate-600 px-4 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Breakdowns */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Methodology Breakdowns
            </h2>
            <p className="text-xl text-gray-600">
              Get the complete frameworks and processes behind each case study
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {methodologyBreakdowns.map((methodology, index) => {
              const IconComponent = methodology.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{methodology.title}</h3>
                      <p className="text-gray-700">{methodology.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {methodology.components.map((component, componentIndex) => (
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
          
          <div className="text-center mt-12">
            <button
              onClick={() => handleDownloadRequest('methodology_templates')}
              className="bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors inline-flex items-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download All Methodology Templates
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Implement These Strategies?
          </h2>
          <p className="text-xl text-slate-100 mb-8">
            Get personalized strategic consultation and implementation support. 
            We'll help you adapt these Fortune 100 methodologies to your specific business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ConsultationBookingCTA 
              variant="secondary" 
              text="Book Strategy Implementation Call"
            />
            <button
              onClick={() => handleDownloadRequest('complete_package')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-600 transition-colors inline-flex items-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Complete Package
            </button>
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedStudy.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="bg-slate-100 px-2 py-1 rounded">{selectedStudy.industry}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedStudy.timeline}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedStudy.teamSize}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudy(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Challenge</h3>
                  <p className="text-gray-700">{selectedStudy.challenge}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Strategic Approach</h3>
                  <ul className="space-y-2">
                    {selectedStudy.approach.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Implementation Timeline</h3>
                  <div className="space-y-3">
                    {selectedStudy.implementation.map((phase, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{phase}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Results</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedStudy.results).map(([key, value], index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-600">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 pt-6 border-t">
                <button
                  onClick={() => handleDownloadRequest('case_study', selectedStudy.id)}
                  className="bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Full Case Study
                </button>
                <ConsultationBookingCTA 
                  variant="secondary" 
                  text="Discuss Implementation"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Form Modal */}
      {showDownloadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Download Case Studies
                </h2>
                <button
                  onClick={() => setShowDownloadForm(false)}
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
                buttonText="Download Case Studies"
                variant="cta"
                showFirstName={true}
                source={`fortune100-case-studies-${downloadType}`}
onSubmit={async () => setShowDownloadForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Strategic Methodology Consultation
                </h2>
                <button
                  onClick={() => setShowConsultationForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <StrategicConsultationForm onClose={() => setShowConsultationForm(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Content Navigation */}
      <ContentNavigation 
        currentPath="/fortune-100-case-studies" 
        variant="horizontal"
      />
    </div>
  );
}