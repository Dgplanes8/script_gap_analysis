'use client';

import { useState } from 'react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { BenchmarkTools } from './benchmark-tools';
import { GrowthMetrics } from './growth-metrics';
import { ChannelStrategies } from './channel-strategies';
import { ImplementationTimeline } from './implementation-timeline';
import { Header } from '@/components/layout/header';

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
    <>
      {/* Header Navigation */}
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 pt-16 lg:pt-20">

      {/* Hero Section */}
      <BenchmarkTools 
        handleDownloadRequest={handleDownloadRequest}
      />

      {/* Growth Channels Overview */}
      <GrowthMetrics />

      {/* Optimization Frameworks */}
      <ChannelStrategies />

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
    </>
  );
}