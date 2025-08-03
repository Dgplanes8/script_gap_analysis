'use client';

import { CheckCircle, Download, BookOpen } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';

export function CaseStudySection() {
  return (
    <>
      {/* Implementation Templates & Resources */}
      <section className="mb-16">
        <div className="bg-purple-50 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Implementation Templates & Resources</h2>
          <p className="text-lg text-gray-700">
            Download the complete toolkit used by Fortune 100 companies to systematically reduce CAC.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">CAC Optimization Toolkit</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Excel CAC Calculator with Attribution Models</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Audience Segmentation Analysis Template</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Creative Performance Tracking Spreadsheet</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />90-Day Implementation Checklist</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Customer Language Analysis Framework</li>
            </ul>
            <EmailCaptureForm
              placeholder="Enter your work email"
              buttonText="Download Toolkit"
              variant="cta"
              source="cac-guide-toolkit"
            />
          </div>
          
          <div className="bg-indigo-600 text-white rounded-lg p-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Free Strategic CAC Audit</h3>
            <p className="text-indigo-100 mb-6">
              Get a personalized CAC reduction strategy session with our senior strategists. 
              We'll analyze your current performance and create a custom 90-day optimization roadmap.
            </p>
            <ul className="space-y-2 text-indigo-100 mb-6">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />30-minute strategic assessment</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Custom CAC reduction projection</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Personalized implementation roadmap</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />No-obligation strategic guidance</li>
            </ul>
            <ConsultationBookingCTA 
              variant="secondary" 
              text="Book Free CAC Audit"
            />
          </div>
        </div>
      </section>

      {/* Conclusion & Next Steps */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: Your CAC Reduction Implementation Plan</h2>
        <p className="text-lg text-gray-700 mb-8">
          Customer acquisition cost reduction is not a one-time optimization — it's a systematic, ongoing process. 
          The companies that consistently outperform their competitors are those that treat CAC optimization as a core competency, 
          not a side project.
        </p>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Next Steps (Start Today):</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Week 1: Foundation</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Implement true CAC tracking</li>
                <li>• Set up attribution modeling</li>
                <li>• Complete baseline audit</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Weeks 2-4: Analysis</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Audience segmentation analysis</li>
                <li>• Creative performance review</li>
                <li>• Channel optimization planning</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Weeks 5-12: Implementation</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Launch optimized campaigns</li>
                <li>• Continuous testing and iteration</li>
                <li>• Scale winning strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}