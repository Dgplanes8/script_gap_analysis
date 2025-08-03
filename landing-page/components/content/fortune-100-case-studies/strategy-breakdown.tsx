'use client';

import { CheckCircle, Download } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

type CaseStudy = {
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
};

interface StrategyBreakdownProps {
  selectedStudy: CaseStudy;
  onClose: () => void;
  onDownloadRequest: (type: string, studyId: number) => void;
}

export function StrategyBreakdown({ selectedStudy, onClose, onDownloadRequest }: StrategyBreakdownProps) {
  return (
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
              onClick={onClose}
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
              onClick={() => onDownloadRequest('case_study', selectedStudy.id)}
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
  );
}