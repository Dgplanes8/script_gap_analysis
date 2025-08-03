'use client';

import { CheckCircle } from 'lucide-react';

export function GuideNavigation() {
  return (
    <div className="bg-gray-50 rounded-xl p-8 mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Guide Overview</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Phase 1: Foundation & Analysis</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />CAC Measurement Framework</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Attribution Model Setup</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Baseline Performance Audit</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Competitor Benchmarking</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Phase 2: Optimization & Implementation</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Audience Segmentation Strategy</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Creative Performance Optimization</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Channel Mix Optimization</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Conversion Rate Enhancement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}