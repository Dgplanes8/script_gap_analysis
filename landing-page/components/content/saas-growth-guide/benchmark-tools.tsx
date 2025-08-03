'use client';

import { TrendingUp, Calculator, Download, CheckCircle } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

interface BenchmarkToolsProps {
  handleAssessmentStart: () => void;
  handleDownloadRequest: () => void;
}

export function BenchmarkTools({ handleAssessmentStart, handleDownloadRequest }: BenchmarkToolsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            SaaS Growth Marketing Guide
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-emerald-600">SaaS Growth Marketing</span>
            <br />Channel Optimization Guide
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Complete guide to optimizing your SaaS growth marketing channels. Includes interactive assessment tool, 
            optimization playbook, and strategic frameworks for scaling your SaaS business efficiently.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handleAssessmentStart}
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Start Channel Assessment
            </button>
            
            <button
              onClick={handleDownloadRequest}
              className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Optimization Guide
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Interactive channel assessment
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Optimization frameworks
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Implementation roadmaps
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Growth strategy audit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}