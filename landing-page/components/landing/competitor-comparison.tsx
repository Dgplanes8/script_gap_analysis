'use client';

import { useState } from 'react';
import { Check, X, Clock, DollarSign, Calendar, Zap, Users, MessageSquare, Building2 } from 'lucide-react';

interface ComparisonFeature {
  category: string;
  traditional: {
    status: 'good' | 'bad' | 'neutral';
    value: string;
  };
  freelancer: {
    status: 'good' | 'bad' | 'neutral';
    value: string;
  };
  aiTool: {
    status: 'good' | 'bad' | 'neutral';
    value: string;
  };
  inHouse: {
    status: 'good' | 'bad' | 'neutral';
    value: string;
  };
  apsics: {
    status: 'good' | 'bad' | 'neutral';
    value: string;
  };
}

const comparisonData: ComparisonFeature[] = [
  {
    category: 'Delivery Speed',
    traditional: { status: 'bad', value: '2-3 weeks' },
    freelancer: { status: 'neutral', value: '1-2 weeks' },
    aiTool: { status: 'good', value: 'Instant' },
    inHouse: { status: 'bad', value: '2-4 weeks' },
    apsics: { status: 'good', value: 'Every Monday' }
  },
  {
    category: 'Cost Structure',
    traditional: { status: 'bad', value: '$5K-15K/month' },
    freelancer: { status: 'neutral', value: '$500-2K/project' },
    aiTool: { status: 'good', value: '$20-100/month' },
    inHouse: { status: 'bad', value: '$8K-20K/month' },
    apsics: { status: 'good', value: '$5-99/week' }
  },
  {
    category: 'Contract Terms',
    traditional: { status: 'bad', value: '6-12 months' },
    freelancer: { status: 'neutral', value: 'Project basis' },
    aiTool: { status: 'good', value: 'Monthly' },
    inHouse: { status: 'bad', value: 'Full-time hire' },
    apsics: { status: 'good', value: 'Cancel anytime' }
  },
  {
    category: 'Strategic Insights',
    traditional: { status: 'good', value: 'High-level strategy' },
    freelancer: { status: 'bad', value: 'Limited scope' },
    aiTool: { status: 'bad', value: 'No strategic thinking' },
    inHouse: { status: 'neutral', value: 'Internal perspective' },
    apsics: { status: 'good', value: 'Competitive intelligence' }
  },
  {
    category: 'Trend Intelligence',
    traditional: { status: 'neutral', value: 'Industry reports' },
    freelancer: { status: 'bad', value: 'Outdated research' },
    aiTool: { status: 'bad', value: 'Training data lag' },
    inHouse: { status: 'bad', value: 'Time-consuming' },
    apsics: { status: 'good', value: 'Real-time analysis' }
  },
  {
    category: 'Performance Scoring',
    traditional: { status: 'neutral', value: 'Subjective review' },
    freelancer: { status: 'bad', value: 'No framework' },
    aiTool: { status: 'bad', value: 'No validation' },
    inHouse: { status: 'bad', value: 'Inconsistent' },
    apsics: { status: 'good', value: '25-point system' }
  },
  {
    category: 'Quality Consistency',
    traditional: { status: 'good', value: 'Agency standards' },
    freelancer: { status: 'bad', value: 'Highly variable' },
    aiTool: { status: 'bad', value: 'Generic output' },
    inHouse: { status: 'neutral', value: 'Depends on team' },
    apsics: { status: 'good', value: 'Proven frameworks' }
  }
];

const alternatives = [
  {
    key: 'traditional',
    name: 'Traditional Agencies',
    icon: Building2,
    description: '$5K+ monthly with long contracts'
  },
  {
    key: 'freelancer',
    name: 'Freelance Copywriters',
    icon: Users,
    description: 'Project-based with variable quality'
  },
  {
    key: 'aiTool',
    name: 'AI Tools (ChatGPT)',
    icon: MessageSquare,
    description: 'Cheap but generic output'
  },
  {
    key: 'inHouse',
    name: 'In-House Teams',
    icon: Calendar,
    description: 'Time-consuming research needed'
  }
];

function StatusIcon({ status }: { status: 'good' | 'bad' | 'neutral' }) {
  if (status === 'good') {
    return <Check className="h-5 w-5 text-brand-600" aria-label="Good" />;
  }
  if (status === 'bad') {
    return <X className="h-5 w-5 text-brand-600" aria-label="Poor" />;
  }
  return <div className="h-5 w-5 rounded-full bg-brand-400" aria-label="Neutral" />;
}

export function CompetitorComparison() {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="h-4 w-4 mr-2" />
              COMPETITIVE ADVANTAGE
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Smart Growth Teams Choose Us Over Traditional Alternatives
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stop waiting 2+ weeks for creative concepts. Skip $5K+ monthly agency fees. 
              Get performance-scored ad hooks and scripts delivered every Monday.
            </p>
          </div>

          {/* Mobile View - Cards */}
          <div className="block lg:hidden space-y-6">
            <div className="bg-gradient-to-r from-brand-600 to-brand-600 rounded-xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-bold">Weekly Creative Intelligence</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Delivery:</div>
                  <div>Every Monday</div>
                </div>
                <div>
                  <div className="font-semibold">Cost:</div>
                  <div>$5-99/week</div>
                </div>
                <div>
                  <div className="font-semibold">Contract:</div>
                  <div>Cancel anytime</div>
                </div>
                <div>
                  <div className="font-semibold">Quality:</div>
                  <div>25-point scoring</div>
                </div>
              </div>
            </div>

            {alternatives.map((alt) => {
              const Icon = alt.icon;
              return (
                <div 
                  key={alt.key}
                  className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedAlternative(selectedAlternative === alt.key ? null : alt.key)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 text-gray-600 mr-3" />
                      <h3 className="font-semibold text-gray-900">{alt.name}</h3>
                    </div>
                    <div className="text-gray-400">
                      {selectedAlternative === alt.key ? '−' : '+'}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{alt.description}</p>
                  
                  {selectedAlternative === alt.key && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      {comparisonData.map((feature) => {
                        const altData = feature[alt.key as keyof ComparisonFeature] as { status: string; value: string };
                        return (
                          <div key={feature.category} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{feature.category}:</span>
                            <div className="flex items-center">
                              <StatusIcon status={altData.status as 'good' | 'bad' | 'neutral'} />
                              <span className="text-sm ml-2">{altData.value}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-6 gap-4">
                  <div className="font-semibold text-gray-900">Feature</div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">Traditional</div>
                    <div className="text-sm text-gray-500">Agencies</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">Freelance</div>
                    <div className="text-sm text-gray-500">Copywriters</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">AI Tools</div>
                    <div className="text-sm text-gray-500">(ChatGPT)</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">In-House</div>
                    <div className="text-sm text-gray-500">Teams</div>
                  </div>
                  <div className="text-center bg-gradient-to-r from-brand-100 to-brand-100 rounded-lg p-2 -m-2">
                    <div className="font-bold text-brand-900">Weekly Creative</div>
                    <div className="text-sm text-brand-700">Intelligence</div>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {comparisonData.map((feature, index) => (
                  <div key={feature.category} className={`px-6 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div className="font-medium text-gray-900">{feature.category}</div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <StatusIcon status={feature.traditional.status} />
                        </div>
                        <div className="text-sm text-gray-600">{feature.traditional.value}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <StatusIcon status={feature.freelancer.status} />
                        </div>
                        <div className="text-sm text-gray-600">{feature.freelancer.value}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <StatusIcon status={feature.aiTool.status} />
                        </div>
                        <div className="text-sm text-gray-600">{feature.aiTool.value}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <StatusIcon status={feature.inHouse.status} />
                        </div>
                        <div className="text-sm text-gray-600">{feature.inHouse.value}</div>
                      </div>
                      
                      <div className="text-center bg-gradient-to-r from-brand-50 to-brand-50 rounded-lg p-2 -m-2">
                        <div className="flex items-center justify-center mb-1">
                          <StatusIcon status={feature.apsics.status} />
                        </div>
                        <div className="text-sm font-medium text-brand-900">{feature.apsics.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-brand-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                The Clear Choice for Growth Marketing Teams
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Why pay agency fees or struggle with inconsistent freelancers? Get proven creative frameworks 
                delivered weekly at a fraction of traditional costs.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-8 w-8 text-brand-600" />
                  </div>
                  <div className="font-semibold text-brand-600">8x Faster</div>
                  <div className="text-sm text-gray-600">Monday delivery vs 2+ weeks</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="font-semibold text-blue-600">50x Cheaper</div>
                  <div className="text-sm text-gray-600">$5-99/week vs $5K+ monthly</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-8 w-8 text-brand-600" />
                  </div>
                  <div className="font-semibold text-brand-600">Zero Risk</div>
                  <div className="text-sm text-gray-600">Cancel anytime vs long contracts</div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  const emailSection = document.getElementById('email-signup');
                  if (emailSection) {
                    emailSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-brand-600 to-brand-600 hover:from-brand-700 hover:to-brand-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start My Free Week Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}