'use client';

import { Eye, Download } from 'lucide-react';

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

interface CaseStudyCardProps {
  study: CaseStudy;
  onViewDetails: (study: CaseStudy) => void;
  onDownload: (studyId: number) => void;
}

export function CaseStudyCard({ study, onViewDetails, onDownload }: CaseStudyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
            onClick={() => onViewDetails(study)}
            className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </button>
          <button
            onClick={() => onDownload(study.id)}
            className="border border-slate-600 text-slate-600 px-4 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}