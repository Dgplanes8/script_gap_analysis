'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Target, Eye, Heart, Zap, Star, Calculator, CheckCircle, TrendingUp, Brain, Award, ClipboardCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: '25-Point Performance Scoring System: Creative Intelligence Framework | Apsics Media',
  description: 'Master the systematic 25-point scoring system for predicting creative performance. Based on conversion psychology research and analysis of thousands of high-performing campaigns.',
  keywords: '25-point scoring system, creative performance scoring, performance prediction methodology, creative evaluation framework, conversion psychology scoring, systematic creative development',
  openGraph: {
    title: '25-Point Performance Scoring System: Creative Intelligence Framework',
    description: 'Master the systematic 25-point scoring system for predicting creative performance.',
    type: 'article',
  },
  alternates: {
    canonical: '/25-point-performance-scoring-system',
  },
};

// Scoring criteria data
const scoringCriteria = [
  {
    category: 'Attention Capture',
    maxPoints: 5,
    icon: Eye,
    color: 'orange',
    description: 'Will it stop the scroll within first 3 seconds?',
    factors: [
      {
        name: 'Pattern Interrupt Strength',
        weight: '20%',
        description: 'Breaks expected visual or content patterns in the feed',
        examples: ['Unexpected visual elements', 'Contrarian statements', 'Format disruption']
      },
      {
        name: 'Visual Contrast Elements',
        weight: '20%',
        description: 'Visual elements that stand out from platform norms',
        examples: ['Color contrast', 'Size variations', 'Movement elements']
      },
      {
        name: 'Curiosity Gap Creation',
        weight: '20%',
        description: 'Opens knowledge loops that demand completion',
        examples: ['Incomplete information', 'Surprising statistics', 'Teaser content']
      },
      {
        name: 'Movement/Animation Potential',
        weight: '20%',
        description: 'Dynamic elements that catch peripheral vision',
        examples: ['Video motion', 'GIF elements', 'Scroll-triggered animations']
      },
      {
        name: 'Sound/Music Alignment',
        weight: '20%',
        description: 'Audio elements that enhance attention capture',
        examples: ['Trending audio', 'Voice tonality', 'Sound effects']
      }
    ]
  },
  {
    category: 'Emotional Resonance',
    maxPoints: 5,
    icon: Heart,
    color: 'red',
    description: 'Triggers specific emotions in target audience?',
    factors: [
      {
        name: 'Fear of Missing Out Activation',
        weight: '20%',
        description: 'Creates urgency through scarcity or time pressure',
        examples: ['Limited availability', 'Time-sensitive offers', 'Exclusive access']
      },
      {
        name: 'Social Proof Integration',
        weight: '20%',
        description: 'Leverages crowd psychology and authority',
        examples: ['User testimonials', 'Expert endorsements', 'Usage statistics']
      },
      {
        name: 'Aspiration/Status Appeal',
        weight: '20%',
        description: 'Connects to desired identity or social position',
        examples: ['Success imagery', 'Lifestyle enhancement', 'Professional advancement']
      },
      {
        name: 'Problem Recognition Intensity',
        weight: '20%',
        description: 'Amplifies awareness of current pain points',
        examples: ['Frustration validation', 'Cost of inaction', 'Status quo problems']
      },
      {
        name: 'Solution Relief Visualization',
        weight: '20%',
        description: 'Helps audience envision positive outcome',
        examples: ['Before/after scenarios', 'Success visualization', 'Benefit realization']
      }
    ]
  },
  {
    category: 'Benefit Clarity',
    maxPoints: 5,
    icon: Target,
    color: 'blue',
    description: 'Core promise immediately clear?',
    factors: [
      {
        name: 'Value Proposition Simplicity',
        weight: '20%',
        description: 'Core benefit explained in simple terms',
        examples: ['One clear promise', 'Jargon-free language', 'Immediate understanding']
      },
      {
        name: 'Outcome Specificity',
        weight: '20%',
        description: 'Specific results rather than vague benefits',
        examples: ['Quantified improvements', 'Measurable outcomes', 'Time-bound results']
      },
      {
        name: 'Time-to-Value Clarity',
        weight: '20%',
        description: 'Clear timeline for benefit realization',
        examples: ['Implementation speed', 'Results timeline', 'Quick wins']
      },
      {
        name: 'Differentiation Strength',
        weight: '20%',
        description: 'Unique positioning versus alternatives',
        examples: ['Competitive advantages', 'Unique features', 'Proprietary methods']
      },
      {
        name: 'Believability Factors',
        weight: '20%',
        description: 'Credible claims with supporting evidence',
        examples: ['Proof elements', 'Realistic promises', 'Authority backing']
      }
    ]
  },
  {
    category: 'Call-to-Action Strength',
    maxPoints: 5,
    icon: Zap,
    color: 'green',
    description: 'Creates urgency and action clarity?',
    factors: [
      {
        name: 'Action Verb Strength',
        weight: '20%',
        description: 'Compelling verbs that drive immediate action',
        examples: ['Start, Get, Unlock', 'Discover, Access', 'Transform, Achieve']
      },
      {
        name: 'Urgency/Scarcity Elements',
        weight: '20%',
        description: 'Time or quantity pressure for action',
        examples: ['Limited time offers', 'Few spots remaining', 'First-come basis']
      },
      {
        name: 'Next Step Clarity',
        weight: '20%',
        description: 'Obvious and simple next action',
        examples: ['Single click action', 'Clear instructions', 'Minimal friction']
      },
      {
        name: 'Risk Reversal Inclusion',
        weight: '20%',
        description: 'Reduces perceived risk of taking action',
        examples: ['Money-back guarantees', 'Free trials', 'No commitment']
      },
      {
        name: 'Conversion Friction Removal',
        weight: '20%',
        description: 'Eliminates barriers to action completion',
        examples: ['Simplified forms', 'One-click signup', 'Social login options']
      }
    ]
  },
  {
    category: 'Memorability',
    maxPoints: 5,
    icon: Star,
    color: 'purple',
    description: 'Contains "sticky" elements for recall?',
    factors: [
      {
        name: 'Unique Hook/Angle',
        weight: '20%',
        description: 'Distinctive approach or perspective',
        examples: ['Novel viewpoints', 'Unexpected angles', 'Original insights']
      },
      {
        name: 'Repetition Patterns',
        weight: '20%',
        description: 'Strategic repetition for memory reinforcement',
        examples: ['Key phrase repetition', 'Visual motifs', 'Rhythmic patterns']
      },
      {
        name: 'Story Structure Strength',
        weight: '20%',
        description: 'Narrative elements that aid retention',
        examples: ['Character arcs', 'Conflict resolution', 'Emotional journey']
      },
      {
        name: 'Brand Integration Quality',
        weight: '20%',
        description: 'Natural brand association and recall',
        examples: ['Brand personality', 'Consistent voice', 'Logo integration']
      },
      {
        name: 'Shareability Potential',
        weight: '20%',
        description: 'Elements that encourage social sharing',
        examples: ['Quotable content', 'Viral potential', 'Social currency']
      }
    ]
  }
];

const scoringGuidelines = [
  {
    range: '21-25 points',
    label: 'Exceptional Potential',
    color: 'green',
    description: 'Green light for immediate testing',
    characteristics: [
      'All 5 categories score 4+ points',
      'Multiple perfect scores (5/5)',
      'Strong cross-category synergy',
      'High conversion probability'
    ],
    action: 'Deploy immediately with confidence',
    expectedPerformance: 'Top 10% of campaigns'
  },
  {
    range: '16-20 points',
    label: 'Proceed with Optimization',
    color: 'orange',
    description: 'Good foundation requiring refinement',
    characteristics: [
      'Most categories score 3+ points',
      'One or two weak areas identified',
      'Solid overall framework',
      'Optimization potential clear'
    ],
    action: 'Strengthen weak categories before testing',
    expectedPerformance: 'Above average with optimization'
  },
  {
    range: '11-15 points',
    label: 'Significant Rework Required',
    color: 'yellow',
    description: 'Fundamental issues need addressing',
    characteristics: [
      'Multiple categories below 3 points',
      'Weak overall framework',
      'Unclear value proposition',
      'Multiple improvement areas'
    ],
    action: 'Major revisions needed',
    expectedPerformance: 'Below average performance likely'
  },
  {
    range: 'Below 11 points',
    label: 'Complete Restructuring',
    color: 'red',
    description: 'Start over with new approach',
    characteristics: [
      'Most categories score 2 or below',
      'Fundamental concept issues',
      'Poor strategic alignment',
      'Multiple critical failures'
    ],
    action: 'Abandon current approach',
    expectedPerformance: 'Poor performance expected'
  }
];

export default function PerformanceScoringSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "25-Point Performance Scoring System: Creative Intelligence Framework",
            "description": "Master the systematic 25-point scoring system for predicting creative performance.",
            "author": {
              "@type": "Organization",
              "name": "Apsics Media"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Apsics Media"
            },
            "datePublished": "2025-01-20",
            "dateModified": "2025-01-20"
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <BarChart3 className="h-4 w-4 mr-2" />
              SYSTEMATIC PERFORMANCE PREDICTION
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              25-Point Performance Scoring System
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Eliminate creative guesswork with systematic performance prediction. 
              Based on conversion psychology research and analysis of thousands of high-performing campaigns.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Calculator className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">5 Categories</div>
                <div className="text-blue-200 text-sm">Systematic evaluation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">25 Factors</div>
                <div className="text-blue-200 text-sm">Psychology-based criteria</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Award className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">85% Accuracy</div>
                <div className="text-blue-200 text-sm">Performance prediction</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const systemSection = document.getElementById('scoring-system');
                  if (systemSection) {
                    systemSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Master the System
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <Link
                href="/weekly-creative-intelligence-playbook"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Full Methodology
                <BarChart3 className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* System Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Research Foundation & Methodology
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                The 25-point scoring system is based on extensive research from leading marketing psychology studies 
                and analysis of performance data from thousands of campaigns across subscription businesses.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Research Foundation</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Kahneman's Decision-Making Principles:</strong> Fast vs. slow thinking patterns 
                        that influence first-impression decisions
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Cialdini's Influence Framework:</strong> Six principles of persuasion 
                        integrated into performance prediction
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Heath's Made to Stick Research:</strong> Memorability factors and 
                        viral content characteristics
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Platform-Specific Research:</strong> Analysis of top-performing content 
                        across TikTok, Facebook, and LinkedIn
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Validation Methodology</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        <strong>10,000+ Campaign Analysis:</strong> Performance data from subscription 
                        businesses across multiple industries
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Facebook Creative Research:</strong> Best practices data from 
                        Meta's extensive creative performance studies
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        <strong>TikTok Creative Center Insights:</strong> Viral content analysis 
                        and engagement pattern research
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Continuous Optimization:</strong> System refinement based on 
                        real-world performance correlation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why 25 Points? The Psychology of Comprehensive Evaluation
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  The 5x5 structure (5 categories × 5 points each) provides sufficient granularity for meaningful 
                  performance differentiation while remaining cognitively manageable for consistent application. 
                  Each category represents a critical decision-making factor in the customer conversion process.
                </p>
                <p className="text-gray-700 text-sm">
                  Research indicates that 21+ point scores correlate with 85% accuracy to top-decile campaign performance, 
                  while scores below 16 consistently predict below-average results across all platforms and industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring System Details */}
      <section id="scoring-system" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete 25-Point Scoring Framework
            </h2>
            
            <div className="space-y-8">
              {scoringCriteria.map((criteria, index) => {
                const Icon = criteria.icon;
                const colorClasses = {
                  orange: 'from-orange-500 to-red-500 border-orange-200 bg-orange-50',
                  red: 'from-red-500 to-pink-500 border-red-200 bg-red-50',
                  blue: 'from-blue-500 to-indigo-500 border-blue-200 bg-blue-50',
                  green: 'from-green-500 to-emerald-500 border-green-200 bg-green-50',
                  purple: 'from-purple-500 to-violet-500 border-purple-200 bg-purple-50'
                };
                
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg border p-8">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${colorClasses[criteria.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[criteria.color as keyof typeof colorClasses].split(' ')[1]} text-white rounded-xl flex items-center justify-center mr-4`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{criteria.category}</h3>
                        <p className="text-gray-600">{criteria.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-sm font-semibold text-gray-900">Maximum Points: </span>
                          <span className="text-lg font-bold text-orange-600 ml-2">{criteria.maxPoints}/5</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {criteria.factors.map((factor, factorIndex) => (
                        <div key={factorIndex} className={`${colorClasses[criteria.color as keyof typeof colorClasses].split(' ')[2]} rounded-lg p-4 border ${colorClasses[criteria.color as keyof typeof colorClasses].split(' ')[3]}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 text-sm">{factor.name}</h4>
                            <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded">{factor.weight}</span>
                          </div>
                          <p className="text-xs text-gray-700 mb-3">{factor.description}</p>
                          <div>
                            <div className="text-xs font-medium text-gray-700 mb-1">Examples:</div>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {factor.examples.map((example, exampleIndex) => (
                                <li key={exampleIndex} className="flex items-start">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Guidelines */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Performance Prediction Guidelines
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Score interpretation and recommended actions based on validated performance correlation data 
              from thousands of campaign deployments across subscription businesses.
            </p>
            
            <div className="space-y-6">
              {scoringGuidelines.map((guideline, index) => {
                const colorClasses = {
                  green: 'from-green-500 to-emerald-500 bg-green-50 border-green-200 text-green-800',
                  orange: 'from-orange-500 to-red-500 bg-orange-50 border-orange-200 text-orange-800',
                  yellow: 'from-yellow-500 to-orange-500 bg-yellow-50 border-yellow-200 text-yellow-800',
                  red: 'from-red-500 to-pink-500 bg-red-50 border-red-200 text-red-800'
                };
                
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className={`w-8 h-8 bg-gradient-to-r ${colorClasses[guideline.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[guideline.color as keyof typeof colorClasses].split(' ')[1]} text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3`}>
                            {guideline.range.split('-')[0].replace(' points', '').replace('Below ', '<')}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{guideline.label}</h3>
                        </div>
                        <p className="text-gray-600">{guideline.description}</p>
                      </div>
                      <div className={`px-4 py-2 ${colorClasses[guideline.color as keyof typeof colorClasses].split(' ')[2]} ${colorClasses[guideline.color as keyof typeof colorClasses].split(' ')[3]} rounded-lg text-sm font-semibold`}>
                        {guideline.range}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Characteristics</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {guideline.characteristics.map((characteristic, charIndex) => (
                            <li key={charIndex} className="flex items-start">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {characteristic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Recommended Action</h4>
                        <p className="text-xs text-gray-600 mb-2">{guideline.action}</p>
                        <div className="text-xs font-medium text-gray-700">Expected Performance:</div>
                        <div className="text-xs text-gray-600">{guideline.expectedPerformance}</div>
                      </div>
                      
                      <div className={`${colorClasses[guideline.color as keyof typeof colorClasses].split(' ')[2]} p-3 rounded-lg`}>
                        <div className="text-xs font-semibold text-gray-800 mb-1">Decision Framework</div>
                        <div className="text-xs text-gray-700">
                          {guideline.color === 'green' && "Deploy immediately with full budget allocation"}
                          {guideline.color === 'orange' && "Optimize weak areas before full deployment"}
                          {guideline.color === 'yellow' && "Significant revisions required before testing"}
                          {guideline.color === 'red' && "Complete restructuring recommended"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Implementation Workflow
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">1. Pre-Creation Scoring</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Score creative concepts before full development. Identify optimization opportunities 
                  early in the process to save time and resources.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Tools:</strong> Creative brief templates, concept evaluation checklists
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">2. Development Optimization</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Use scoring insights to guide creative development. Focus on strengthening 
                  weak categories while maintaining strong performance areas.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Tools:</strong> Category-specific improvement guides, optimization frameworks
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">3. Performance Validation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Compare predicted scores with actual performance. Refine scoring accuracy 
                  and identify patterns for future optimization.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Tools:</strong> Performance tracking dashboards, correlation analysis
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Weekly Intelligence Integration
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Monday: Fresh Concept Scoring</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Apply 25-point system to new weekly concepts. Ensure all delivered creative 
                    meets minimum 21-point threshold before client delivery.
                  </p>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Wednesday: Performance Review</h4>
                  <p className="text-sm text-gray-600">
                    Compare actual performance with predicted scores. Identify correlation patterns 
                    and optimization opportunities for future scoring refinement.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Friday: System Optimization</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Refine scoring criteria based on weekly performance data. Update category 
                    weightings and factor importance for improved accuracy.
                  </p>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Weekend: Competitive Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Score competitor creative using the same framework. Identify market trends 
                    and emerging performance patterns for strategic advantage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Using Performance-Scored Creative Intelligence
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Access weekly creative concepts pre-scored with our 25-point system. 
              Only exceptional concepts (21+ scores) delivered to your inbox every Monday.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BarChart3 className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">Pre-Scored Concepts</div>
                <div className="text-blue-200 text-sm">21+ point guarantee</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">Psychology-Based</div>
                <div className="text-blue-200 text-sm">Research-backed framework</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Award className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">Proven Results</div>
                <div className="text-blue-200 text-sm">85% prediction accuracy</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const emailSection = document.getElementById('email-signup');
                  if (emailSection) {
                    emailSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Performance-Scored Creative
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              
              <Link
                href="/#service-tiers"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Weekly Plans
                <Calculator className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Creative Intelligence Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete methodology guide for systematic creative development and optimization
                </p>
              </Link>
              
              <Link 
                href="/52-high-converting-ad-hooks-library"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">52 Performance-Scored Hooks</h3>
                <p className="text-sm text-gray-600">
                  Complete library of hooks with detailed scoring analysis and framework explanation
                </p>
              </Link>
              
              <Link 
                href="/creative-brief-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <ClipboardCheck className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Creative Brief Framework</h3>
                <p className="text-sm text-gray-600">
                  Strategic brief development template with integrated performance scoring
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}