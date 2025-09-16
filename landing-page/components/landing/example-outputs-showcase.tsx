'use client';

import { useState } from 'react';
import { FileText, Target, TrendingUp, BarChart3, ArrowRight, Play, Eye } from 'lucide-react';

interface OutputExample {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  preview: {
    title: string;
    content: string[];
    score?: string;
  };
}

const outputExamples: OutputExample[] = [
  {
    id: 'concepts',
    title: '3 Strategic Concepts',
    description: 'Validated customer profiles with specific messaging angles',
    icon: <Target className="h-6 w-6" />,
    preview: {
      title: 'Concept: Time-Strapped Entrepreneur',
      content: [
        '• Target: Solo founders spending 3+ hours weekly on social media',
        '• Core Emotion: Relief from overwhelm and time anxiety',
        '• Hook Angle: "Get your evenings back" positioning',
        '• Format Strategy: Before/after transformation content',
        '• Implementation: 30-minute Sunday batch scheduling'
      ],
      score: '24/25'
    }
  },
  {
    id: 'scripts',
    title: 'Ready-to-Use Scripts',
    description: 'Complete ad scripts with platform-specific optimizations',
    icon: <FileText className="h-6 w-6" />,
    preview: {
      title: '30-Minute Sunday Ritual Script (TikTok/Reels)',
      content: [
        '[0-3s] Hook: "POV: You discovered the 30-minute Sunday ritual..."',
        '[3-8s] Product: "Meet [Your App] - built by entrepreneurs, for entrepreneurs"',
        '[8-15s] Mechanism: "Schedule 10+ platforms in one place"',
        '[15-25s] Benefits: "3 hours → 30 minutes, get your evenings back"',
        '[25-30s] CTA: "Try free for 7 days, no credit card required"'
      ],
      score: '23/25'
    }
  },
  {
    id: 'analysis',
    title: 'Strategic Analysis',
    description: 'Market gaps, competitive positioning, and launch roadmap',
    icon: <BarChart3 className="h-6 w-6" />,
    preview: {
      title: 'Market Opportunity Analysis',
      content: [
        '• Market Size: 2.3M solo entrepreneurs in English-speaking markets',
        '• Revenue Potential: $67M annually at 5% market penetration',
        '• Key Gap: Human connection in automated tools ($50M opportunity)',
        '• Competitive Advantage: Founder-to-founder authenticity',
        '• Launch Strategy: Target "Sunday night planning dread" moment'
      ]
    }
  }
];

export function ExampleOutputsShowcase() {
  const [activeTab, setActiveTab] = useState('concepts');

  const activeExample = outputExamples.find(example => example.id === activeTab);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Eye className="h-4 w-4 mr-2" />
              EXAMPLE DELIVERABLES
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What You Actually Get Every Monday
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Strategic creative intelligence delivered weekly - not just ideas, but complete implementation packages ready for your campaigns.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {outputExamples.map((example) => (
              <button
                key={example.id}
                onClick={() => setActiveTab(example.id)}
                className={`flex-1 p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  activeTab === example.id
                    ? 'border-brand-500 bg-brand-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    activeTab === example.id ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {example.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{example.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{example.description}</p>
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {activeExample && (
            <div className="bg-gradient-to-br from-gray-50 to-brand-50 rounded-2xl p-8 shadow-xl border border-brand-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{activeExample.preview.title}</h3>
                {activeExample.preview.score && (
                  <div className="bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Performance Score: {activeExample.preview.score}
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <ul className="space-y-3">
                  {activeExample.preview.content.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <ArrowRight className="h-3 w-3 text-brand-600" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Bottom Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-brand-600 to-brand-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                This Level of Strategy Takes Agencies Weeks
              </h3>
              <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
                What you see above represents 40+ hours of strategic work: market research, competitor analysis, 
                concept development, script writing, and performance optimization. Delivered to you every Monday.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold">40+ Hours</div>
                  <div className="text-sm opacity-80">Strategic Work Weekly</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold">$5-35</div>
                  <div className="text-sm opacity-80">Per Week (Not $5K/month)</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold">Monday</div>
                  <div className="text-sm opacity-80">Guaranteed Delivery</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/free-hooks'}
                  className="bg-white text-brand-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Get Free Sample Templates
                </button>
                <button
                  onClick={() => {
                    const serviceSection = document.getElementById('service-tiers');
                    if (serviceSection) {
                      serviceSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Start Your Free Week
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}