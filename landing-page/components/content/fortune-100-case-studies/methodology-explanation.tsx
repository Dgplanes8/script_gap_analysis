'use client';

import { CheckCircle, Download, Target, BarChart3, Zap, Shield } from 'lucide-react';

const methodologyBreakdowns = [
  {
    title: 'Customer Language Analysis Framework',
    description: 'Systematic approach to extracting and implementing authentic customer language',
    components: [
      'Interview methodology and question frameworks',
      'Language pattern analysis and categorization',
      'Message hierarchy development process',
      'Implementation and testing protocols'
    ],
    icon: Target
  },
  {
    title: 'Multi-Touch Attribution Modeling',
    description: 'Advanced attribution system for complex customer journeys',
    components: [
      'Data collection and integration strategy',
      'Attribution model development methodology',
      'Channel interaction mapping process',
      'Budget optimization algorithms'
    ],
    icon: BarChart3
  },
  {
    title: 'Dynamic Creative Optimization System',
    description: 'Scalable framework for creative testing and optimization',
    components: [
      'Creative testing framework design',
      'Dynamic optimization implementation',
      'Performance prediction modeling',
      'Creative production workflow'
    ],
    icon: Zap
  },
  {
    title: 'Account-Based Marketing Blueprint',
    description: 'Complete ABM system for complex B2B sales cycles',
    components: [
      'Stakeholder mapping methodology',
      'Multi-touch nurturing sequences',
      'Content strategy for buying committees',
      'Sales and marketing alignment process'
    ],
    icon: Shield
  }
];

interface MethodologyExplanationProps {
  onDownloadRequest: (type: string) => void;
}

export function MethodologyExplanation({ onDownloadRequest }: MethodologyExplanationProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Methodology Breakdowns
          </h2>
          <p className="text-xl text-gray-600">
            Get the complete frameworks and processes behind each case study
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {methodologyBreakdowns.map((methodology, index) => {
            const IconComponent = methodology.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{methodology.title}</h3>
                    <p className="text-gray-700">{methodology.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {methodology.components.map((component, componentIndex) => (
                    <div key={componentIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{component}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={() => onDownloadRequest('methodology_templates')}
            className="bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors inline-flex items-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Download All Methodology Templates
          </button>
        </div>
      </div>
    </section>
  );
}