'use client';

import { useState } from 'react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { CaseStudyCard } from './case-study-card';
import { MethodologyExplanation } from './methodology-explanation';
import { ResultsVisualization } from './results-visualization';
import { StrategyBreakdown } from './strategy-breakdown';
import { MetricsDisplay } from './metrics-display';

interface CaseStudy {
  id: number;
  title: string;
  company: string;
  industry: string;
  timeline: string;
  teamSize: string;
  challenge: string;
  approach: string[];
  implementation: string[];
  results: Record<string, string>;
  methodology: string;
  downloadable: boolean;
  preview: string;
}

const caseStudies: CaseStudy[] = [
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

      {/* Hero Section and CTA */}
      <ResultsVisualization onDownloadRequest={handleDownloadRequest} />

      {/* Case Studies Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                onViewDetails={setSelectedStudy}
                onDownload={(studyId) => handleDownloadRequest('case_study', studyId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Breakdowns */}
      <MethodologyExplanation onDownloadRequest={handleDownloadRequest} />

      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <StrategyBreakdown
          selectedStudy={selectedStudy}
          onClose={() => setSelectedStudy(null)}
          onDownloadRequest={handleDownloadRequest}
        />
      )}

      {/* Modals */}
      <MetricsDisplay
        showDownloadForm={showDownloadForm}
        setShowDownloadForm={setShowDownloadForm}
        showConsultationForm={showConsultationForm}
        setShowConsultationForm={setShowConsultationForm}
        downloadType={downloadType}
      />

      {/* Content Navigation */}
      <ContentNavigation 
        currentPath="/fortune-100-case-studies" 
        variant="horizontal"
      />
    </div>
  );
}