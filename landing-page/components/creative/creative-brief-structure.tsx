'use client';

import { useState } from 'react';
import { FileText, Target, Users, Heart, Eye, Zap, CheckCircle, ArrowRight, Download } from 'lucide-react';

interface BriefSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  fields: string[];
  example: string;
}

const briefSections: BriefSection[] = [
  {
    id: 'overview',
    title: 'Campaign Overview',
    description: 'Strategic foundation and core objectives',
    icon: <Target className="h-5 w-5" />,
    fields: ['Campaign Name', 'Primary Objective', 'Target Audience', 'Key Message', 'Unique Value Proposition'],
    example: 'Premium Makeup Brand Q4 Campaign - Transform morning routines into professional confidence through expert-designed efficiency'
  },
  {
    id: 'concepts',
    title: 'Concept Summary',
    description: 'Strategic approach for each of 3 concepts',
    icon: <Users className="h-5 w-5" />,
    fields: ['Concept Name', 'Target Persona', 'Core Emotion', 'Life Force 8', 'Awareness Level', 'Performance Score'],
    example: 'The 5-Minute Professional - Target: Working women 28-40, time-pressured professionals - Emotion: Time relief + Professional confidence - Score: 21.6/25'
  },
  {
    id: 'executions',
    title: 'Format Executions',
    description: 'Detailed execution for each of 15 ad variations',
    icon: <Zap className="h-5 w-5" />,
    fields: ['Format Type', 'Primary Hook/Headline', 'Complete Copy', 'Key Visuals', 'Talent Notes', 'Platform Optimization'],
    example: 'Time-Lapse Tutorial - Hook: "POV: You have 5 minutes to look professional for your 9am meeting" - Visual: Split-screen clock vs application progress'
  },
  {
    id: 'guidelines',
    title: 'Brand Guidelines',
    description: 'Voice, language, and compliance requirements',
    icon: <FileText className="h-5 w-5" />,
    fields: ['Voice Positioning', 'Power Words', 'Forbidden Language', 'Required Disclaimers', 'Platform Compliance'],
    example: 'Voice: Expert authority with authentic relatability - Power Words: Professional, Expert, Simplified - Avoid: Perfect, Flawless, Anti-aging'
  }
];

const exampleBriefData = {
  campaignName: 'Premium Makeup Brand Q4 Campaign',
  objective: 'Drive conversions for time-efficient professional beauty solutions',
  audience: 'Working women 28-50, time-pressured professionals and beauty enthusiasts',
  keyMessage: 'Professional confidence in 5 minutes or less through expert-designed makeup',
  concepts: [
    {
      name: 'The 5-Minute Professional',
      persona: 'Working women 28-40, time-pressured professionals',
      emotion: 'Time relief + Professional confidence',
      awareness: 'Solution-Aware',
      score: '21.6/25'
    },
    {
      name: 'Expert Authority Simplified', 
      persona: 'Beauty enthusiasts 30-45, quality-conscious',
      emotion: 'Expert validation + Mastery confidence',
      awareness: 'Problem-Aware',
      score: '22.2/25'
    },
    {
      name: 'Real Women, Real Results',
      persona: 'Women 35-50, authentic beauty seekers',
      emotion: 'Age validation + Authentic confidence',
      awareness: 'Product-Aware', 
      score: '22.0/25'
    }
  ]
};

export function CreativeBriefStructure() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isExpanded, setIsExpanded] = useState(false);

  const currentSection = briefSections.find(section => section.id === activeSection);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-full text-sm font-semibold mb-6">
              <FileText className="h-4 w-4 mr-2" />
              Creative Brief Framework
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Production-Ready Creative Briefs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every weekly delivery includes comprehensive creative briefs that ensure flawless execution by your production team.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Section Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Brief Structure</h3>
                <div className="space-y-3">
                  {briefSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'border-gray-500 bg-gray-100 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`p-2 rounded-lg mr-3 ${
                          activeSection === section.id 
                            ? 'bg-gray-200 text-gray-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {section.icon}
                        </div>
                        <span className="font-semibold text-gray-900">{section.title}</span>
                      </div>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Complete Package</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-2" />3 Strategic concepts</li>
                    <li className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-2" />15 Format variations</li>
                    <li className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-2" />Production guidelines</li>
                    <li className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-2" />Platform optimization</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section Details */}
            <div className="lg:col-span-2 space-y-6">
              {currentSection && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gray-100 text-gray-700 rounded-lg mr-4">
                      {currentSection.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentSection.title}</h3>
                      <p className="text-gray-600">{currentSection.description}</p>
                    </div>
                  </div>

                  {/* Fields Included */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Fields Included:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {currentSection.fields.map((field, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xs font-bold text-gray-700">{index + 1}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{field}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Example */}
                  <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg text-white">
                    <h4 className="font-semibold text-white mb-2">Example Content:</h4>
                    <p className="text-gray-100 text-sm italic">"{currentSection.example}"</p>
                  </div>
                </div>
              )}

              {/* Example Brief Preview */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Live Brief Preview</h3>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isExpanded ? 'Collapse' : 'Expand Full Brief'}
                  </button>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 font-mono text-sm">
                  <div className="space-y-3">
                    <div>
                      <span className="font-bold text-gray-900">Campaign:</span>
                      <span className="text-gray-700 ml-2">{exampleBriefData.campaignName}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Objective:</span>
                      <span className="text-gray-700 ml-2">{exampleBriefData.objective}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Audience:</span>
                      <span className="text-gray-700 ml-2">{exampleBriefData.audience}</span>
                    </div>

                    {isExpanded && (
                      <>
                        <div className="border-t border-gray-200 pt-3 mt-4">
                          <span className="font-bold text-gray-900">Key Message:</span>
                          <span className="text-gray-700 ml-2">{exampleBriefData.keyMessage}</span>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-3 mt-4">
                          <div className="font-bold text-gray-900 mb-2">Strategic Concepts:</div>
                          {exampleBriefData.concepts.map((concept, index) => (
                            <div key={index} className="ml-4 mb-2 text-sm">
                              <div className="font-semibold text-gray-800">{index + 1}. {concept.name}</div>
                              <div className="text-gray-600 ml-4">
                                • Target: {concept.persona}<br />
                                • Emotion: {concept.emotion}<br />
                                • Awareness: {concept.awareness}<br />
                                • Score: {concept.score}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
                <h4 className="text-lg font-bold mb-2">Get Production-Ready Briefs</h4>
                <p className="text-gray-300 mb-4">
                  Every Monday: Complete creative briefs for 15 ad variations, ready for immediate production and testing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      const serviceTiersElement = document.getElementById('service-tiers');
                      if (serviceTiersElement) {
                        serviceTiersElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    See Weekly Plans
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}