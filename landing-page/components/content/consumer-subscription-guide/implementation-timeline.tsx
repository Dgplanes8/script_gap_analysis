'use client';

import { useState } from 'react';
import { Download, CheckCircle, Calendar } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';

interface ImplementationTimelineProps {
  showAssessment: boolean;
  setShowAssessment: (show: boolean) => void;
  showConsultation: boolean;
  setShowConsultation: (show: boolean) => void;
  showDownload: boolean;
  setShowDownload: (show: boolean) => void;
  assessmentStep: number;
  setAssessmentStep: (step: number) => void;
  assessmentAnswers: any;
  setAssessmentAnswers: (answers: any) => void;
  handleAssessmentStart: () => void;
  handleDownloadRequest: () => void;
}

export function ImplementationTimeline({
  showDownload,
  setShowDownload,
  showConsultation,
  setShowConsultation,
  handleDownloadRequest
}: ImplementationTimelineProps) {
  const implementationPhases = [
    {
      phase: 'Week 1-2',
      title: 'Consumer Research & Channel Audit',
      description: 'Deep dive into consumer behavior and current channel performance',
      tasks: [
        'Consumer journey mapping and pain point analysis',
        'Channel performance audit and ROI assessment',
        'Competitive analysis and market positioning review',
        'Customer feedback analysis and retention drivers'
      ]
    },
    {
      phase: 'Week 3-4',
      title: 'Strategic Framework Development',
      description: 'Design comprehensive D2C growth strategy',
      tasks: [
        'Consumer acquisition strategy development',
        'Retention and loyalty program design',
        'Creative strategy and content framework',
        'Attribution and analytics system planning'
      ]
    },
    {
      phase: 'Week 5-8',
      title: 'Channel Optimization & Launch',
      description: 'Implement optimized channels and tracking systems',
      tasks: [
        'Social media advertising optimization',
        'Email and SMS marketing automation setup',
        'Influencer partnership strategy execution',
        'Performance tracking and dashboard creation'
      ]
    },
    {
      phase: 'Week 9-12',
      title: 'Performance Optimization & Scale',
      description: 'Continuous optimization based on performance data',
      tasks: [
        'A/B testing and creative optimization',
        'Customer lifecycle optimization',
        'Channel mix rebalancing and scaling',
        'Monthly performance reviews and strategy adjustments'
      ]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            12-Week Consumer Subscription Optimization Timeline
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Systematic approach to optimizing your consumer subscription marketing 
            with measurable milestones and clear deliverables.
          </p>
        </div>
        
        <div className="space-y-8 mb-16">
          {implementationPhases.map((phase, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold mr-4">
                  {phase.phase}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                  <p className="text-gray-600">{phase.description}</p>
                </div>
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
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Optimize Your Consumer Subscription Marketing?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Get strategic insights and proven frameworks for scaling your D2C subscription business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowConsultation(true)}
              className="bg-white text-purple-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book D2C Strategy Consultation
            </button>
            <button
              onClick={handleDownloadRequest}
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200 flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Get D2C Growth Newsletter
            </button>
          </div>
        </div>
      </div>
      
      {/* Download Modal */}
      {showDownload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Subscribe for D2C Growth Insights
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
                placeholder="Enter your business email"
                buttonText="Get D2C Insights"
                variant="cta"
                source="consumer-subscription-marketing-guide"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Consultation Modal */}
      <StrategicConsultationForm
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
      />
    </section>
  );
}