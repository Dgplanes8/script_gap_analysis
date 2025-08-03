'use client';

import { useState } from 'react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { BenchmarkTools } from './benchmark-tools';
import { GrowthMetrics } from './growth-metrics';
import { ChannelStrategies } from './channel-strategies';
import { SuccessFrameworks } from './success-frameworks';
import { ImplementationTimeline } from './implementation-timeline';

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
      <BenchmarkTools 
        handleAssessmentStart={handleAssessmentStart}
        handleDownloadRequest={handleDownloadRequest}
      />

      {/* Growth Channels Overview */}
      <GrowthMetrics />

      {/* Optimization Frameworks */}
      <ChannelStrategies />

      {/* Case Study Results */}
      <SuccessFrameworks />

      {/* CTA Section and Modals */}
      <ImplementationTimeline
        showAssessment={showAssessment}
        setShowAssessment={setShowAssessment}
        showConsultation={showConsultation}
        setShowConsultation={setShowConsultation}
        showDownload={showDownload}
        setShowDownload={setShowDownload}
        assessmentStep={assessmentStep}
        setAssessmentStep={setAssessmentStep}
        assessmentAnswers={assessmentAnswers}
        setAssessmentAnswers={setAssessmentAnswers}
        handleAssessmentStart={handleAssessmentStart}
        handleDownloadRequest={handleDownloadRequest}
      />

      {/* Content Navigation */}
      <ContentNavigation 
        currentPath="/saas-growth-marketing-guide" 
        variant="horizontal"
      />
    </div>
  );
}