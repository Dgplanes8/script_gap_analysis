'use client';

import { TrendingUp, Download, CheckCircle } from 'lucide-react';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

interface BenchmarkToolsProps {
  handleDownloadRequest: () => void;
}

export function BenchmarkTools({ handleDownloadRequest }: BenchmarkToolsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            Consumer Subscription Marketing Guide
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-purple-600">Consumer Subscription</span>
            <br />Marketing Channel Optimization
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Complete guide to optimizing your consumer subscription marketing channels. Includes interactive assessment tool, 
            optimization playbook, and strategic frameworks for scaling your D2C subscription business efficiently.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <ConsultationBookingCTA 
              text="Get D2C Growth Strategy Audit"
              variant="primary"
            />
            
            <button
              onClick={handleDownloadRequest}
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Get Weekly D2C Insights
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Interactive channel assessment
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Consumer behavior frameworks
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Retention optimization
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              D2C growth strategy audit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}