'use client';

import { Download, Target } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

interface ResultsVisualizationProps {
  onDownloadRequest: (type: string) => void;
}

export function ResultsVisualization({ onDownloadRequest }: ResultsVisualizationProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-slate-100 text-slate-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
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
              onClick={() => onDownloadRequest('all_case_studies')}
              className="bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download All Case Studies
            </button>
            
            <ConsultationBookingCTA 
              variant="secondary" 
              text="Get Methodology Consultation"
            />
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              4 detailed case studies
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Methodology breakdowns
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Implementation templates
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Fortune 100 insights
            </div>
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
              onClick={() => onDownloadRequest('complete_package')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-600 transition-colors inline-flex items-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Complete Package
            </button>
          </div>
        </div>
      </section>
    </>
  );
}