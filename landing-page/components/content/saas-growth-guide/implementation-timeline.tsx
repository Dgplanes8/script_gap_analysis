'use client';

import { useState } from 'react';
import { Calculator, Download, CheckCircle, Calendar } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';

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
  showAssessment,
  setShowAssessment,
  showConsultation,
  setShowConsultation,
  showDownload,
  setShowDownload,
  assessmentStep,
  setAssessmentStep,
  assessmentAnswers,
  setAssessmentAnswers,
  handleAssessmentStart,
  handleDownloadRequest
}: ImplementationTimelineProps) {
  return (
    <>
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
                  Subscribe for Growth Insights
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
                buttonText="Get Growth Insights"
                variant="cta"
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
    </>
  );
}