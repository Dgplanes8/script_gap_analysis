import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Target, TrendingUp, Brain, Users, BarChart3, CheckCircle, Eye, Heart, Star, Settings, Lightbulb, Beaker } from 'lucide-react';
import { StructuredData, WebApplicationSchema } from '@/components/schema';
import { Header } from '@/components/layout/secondary-header';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'Free Hook Generator: The $10M Framework Fortune 100s Use (Copy It Now)',
  description: 'Get the exact hook generation system that created $250M+ in revenue. 25-point scoring framework + proven templates. Skip months of guessing—start converting today.',
  keywords: 'hook generator methodology, creative development framework, systematic hook creation, performance-scored hooks, conversion psychology framework, creative intelligence methodology',
  openGraph: {
    title: 'Free Hook Generator: The $10M Framework Fortune 100s Use (Copy It Now)',
    description: 'Get the exact hook generation system that created $250M+ in revenue. 25-point scoring framework + proven templates.',
    type: 'article',
  },
  alternates: {
    canonical: '/hook-generator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Hook generation methodology components
const hookFrameworks = [
  {
    name: 'Problem-Agitate-Solution',
    description: 'Identify pain point, amplify emotional impact, present solution',
    structure: 'Problem Recognition → Emotional Amplification → Solution Promise',
    example: '"Tired of ads that stop working after 3 days? Here\'s the $10K/month secret..."',
    bestFor: 'Problem-aware audiences seeking solutions',
    score: 23
  },
  {
    name: 'Curiosity Gap Creation',
    description: 'Open knowledge loops that demand cognitive completion',
    structure: 'Hidden Information → Contradiction → Revelation Promise',
    example: '"The subscription pricing strategy nobody talks about (but everyone should)"',
    bestFor: 'Solution-aware audiences comparing options',
    score: 22
  },
  {
    name: 'Social Proof Authority',
    description: 'Leverage crowd psychology and credibility markers',
    structure: 'Specific Numbers → Success Association → Method Reveal',
    example: '"3,247 SaaS companies use this creative framework to reduce CAC by 25%"',
    bestFor: 'Product-aware audiences evaluating credibility',
    score: 24
  },
  {
    name: 'Transformation Promise',
    description: 'Paint before/after scenario with specific outcomes',
    structure: 'Current State → Transformation Process → Desired Outcome',
    example: '"From 200 signups to 2,000 signups in 8 weeks using weekly creative intelligence"',
    bestFor: 'Most-aware audiences ready for change',
    score: 25
  },
  {
    name: 'Urgency & Scarcity',
    description: 'Create time pressure and exclusive access appeal',
    structure: 'Limited Availability → Time Constraint → Action Trigger',
    example: '"Only 50 subscription businesses will get $5/week creative intelligence (ending Friday)"',
    bestFor: 'Solution-aware audiences ready to purchase',
    score: 24
  }
];

const generationProcess = [
  {
    step: '1. Audience Analysis',
    title: 'Define Awareness Level',
    description: 'Identify where your audience sits on the awareness spectrum',
    details: ['Unaware: Don\'t know they have the problem', 'Problem-aware: Know the problem, seeking solutions', 'Solution-aware: Evaluating different approaches', 'Product-aware: Comparing specific options', 'Most-aware: Ready to purchase, need final push'],
    icon: Users
  },
  {
    step: '2. Framework Selection',
    title: 'Choose Strategic Framework',
    description: 'Select hook framework based on audience awareness and campaign goals',
    details: ['Match framework to awareness level', 'Consider platform context and format', 'Align with campaign objectives', 'Factor in competitive landscape'],
    icon: Target
  },
  {
    step: '3. Component Assembly',
    title: 'Build Hook Structure',
    description: 'Systematically construct hook using framework components',
    details: ['Opening attention grabber', 'Emotional trigger or curiosity gap', 'Value proposition or promise', 'Social proof or credibility marker', 'Call-to-action implication'],
    icon: Settings
  },
  {
    step: '4. Performance Scoring',
    title: 'Evaluate Hook Potential',
    description: 'Score hook using 25-point performance evaluation system',
    details: ['Attention capture (1-5 points)', 'Emotional resonance (1-5 points)', 'Benefit clarity (1-5 points)', 'CTA strength (1-5 points)', 'Memorability factor (1-5 points)'],
    icon: BarChart3
  },
  {
    step: '5. Platform Optimization',
    title: 'Adapt for Platform Context',
    description: 'Customize hook for specific platform characteristics and audience behavior',
    details: ['TikTok: Casual, trend-integrated, native feel', 'Facebook: Problem-focused, benefit-driven', 'Instagram: Visual storytelling integration', 'LinkedIn: Professional pain points, ROI focus'],
    icon: Zap
  }
];

export default function HookGeneratorMethodology() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hook Generator Methodology: Strategic Framework for High-Converting Creative Development",
            "description": "Master the systematic hook generation methodology used by Fortune 100 companies. Create performance-scored hooks with strategic frameworks.",
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
      <section className="bg-gradient-to-r from-brand-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Brain className="h-4 w-4 mr-2" />
              SYSTEMATIC HOOK GENERATION
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hook Generator Methodology
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Master the systematic approach to creating high-converting hooks. 
              Strategic frameworks, performance scoring, and platform optimization for consistent results.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">5 Frameworks</div>
                <div className="text-brand-200 text-sm">Strategic structures</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">5-Step Process</div>
                <div className="text-brand-200 text-sm">Systematic generation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">25-Point Scale</div>
                <div className="text-brand-200 text-sm">Performance scoring</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#hook-methodology"
                className="bg-white text-brand-600 hover:bg-brand-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore Methodology
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="/weekly-creative-intelligence-playbook"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Learn Full Framework
                <BarChart3 className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Frameworks */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Hook Generation Psychology
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Effective hook generation isn't about creativity alone—it's about understanding the psychological 
                triggers that drive attention, engagement, and action across different audience awareness levels.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">The Attention Economics Problem</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">3-Second Decision Window</div>
                        <div className="text-gray-600">Users decide to engage or scroll within 3 seconds of seeing content</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Pattern Recognition Fatigue</div>
                        <div className="text-gray-600">Audiences become blind to repetitive hooks and messaging patterns</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Platform Context Switching</div>
                        <div className="text-gray-600">Same hook performs differently across TikTok, Facebook, and LinkedIn</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Systematic Framework Benefits</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Predictable Performance</div>
                        <div className="text-gray-600">Framework-generated hooks score 21.7/25 average vs 14.3/25 for ad-hoc creation</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Scalable Production</div>
                        <div className="text-gray-600">Generate 15-20 hook variations per framework in systematic rotation</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">Team Consistency</div>
                        <div className="text-gray-600">Any team member can produce high-quality hooks using systematic approach</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Random Hook Generation Fails Subscription Businesses
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Inconsistent Quality</div>
                    <div className="text-gray-600">
                      Creative brainstorming produces highly variable results, making it impossible 
                      to predict campaign performance or scale successful approaches.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Audience Mismatch</div>
                    <div className="text-gray-600">
                      Generic hooks don't account for audience awareness levels, leading to 
                      messaging that's either too basic or too advanced for the target market.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">Platform Misalignment</div>
                    <div className="text-gray-600">
                      Cross-posting identical hooks across platforms ignores unique platform 
                      behaviors and cultural norms, reducing engagement and conversion rates.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hook Frameworks */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              5 Strategic Hook Frameworks
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Each framework targets specific audience psychology and platform contexts. 
              Choose based on awareness level, campaign goals, and competitive positioning.
            </p>
            
            <div className="space-y-8">
              {hookFrameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                          {framework.score}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{framework.name}</h3>
                          <p className="text-sm text-gray-600">{framework.description}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="text-sm font-semibold text-gray-900 mb-2">Structure:</div>
                        <div className="text-xs text-gray-700">{framework.structure}</div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900 mb-1">Best For:</div>
                        <div className="text-gray-600">{framework.bestFor}</div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="bg-gradient-to-r from-brand-50 to-indigo-50 rounded-lg p-6 border border-brand-200">
                        <div className="text-sm font-semibold text-gray-900 mb-3">Example Hook:</div>
                        <div className="text-lg font-semibold text-gray-900 mb-4">{framework.example}</div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-semibold text-gray-900 mb-2">Psychological Triggers:</div>
                            <div className="space-y-1 text-xs">
                              {framework.name === 'Problem-Agitate-Solution' && (
                                <>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Pain point identification</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Emotional amplification</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Solution positioning</div>
                                </>
                              )}
                              {framework.name === 'Curiosity Gap Creation' && (
                                <>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Knowledge gap opening</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Cognitive tension</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Completion drive</div>
                                </>
                              )}
                              {framework.name === 'Social Proof Authority' && (
                                <>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Crowd psychology</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Authority positioning</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Success association</div>
                                </>
                              )}
                              {framework.name === 'Transformation Promise' && (
                                <>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Aspirational outcome</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Specific timeframe</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Measurable results</div>
                                </>
                              )}
                              {framework.name === 'Urgency & Scarcity' && (
                                <>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Loss aversion</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Time pressure</div>
                                  <div className="flex items-center"><CheckCircle className="h-3 w-3 text-brand-500 mr-2" />Exclusive access</div>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-semibold text-gray-900 mb-2">Platform Optimization:</div>
                            <div className="space-y-1 text-xs text-gray-600">
                              <div>• TikTok: Add trend integration, casual tone</div>
                              <div>• Facebook: Emphasize problem/benefit clarity</div>
                              <div>• LinkedIn: Professional pain points, ROI focus</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Generation Process */}
      <section id="hook-methodology" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              5-Step Hook Generation Process
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Systematic approach to creating high-converting hooks that combines audience psychology, 
              strategic frameworks, and performance optimization for consistent results.
            </p>
            
            <div className="space-y-8">
              {generationProcess.map((process, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-brand-600 mb-1">{process.step}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h3>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                    <div className="ml-4">
                      <process.icon className="h-8 w-8 text-brand-600" />
                    </div>
                  </div>
                  
                  <div className="ml-16">
                    <div className="grid md:grid-cols-2 gap-4">
                      {process.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Tools */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Implementation Tools & Templates
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Beaker className="h-6 w-6 text-brand-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Testing & Optimization</h3>
                </div>
                
                <div className="space-y-3">
                  <Link 
                    href="/25-point-performance-scoring-system"
                    className="block p-3 bg-brand-50 rounded-lg border hover:border-brand-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm">Performance Scoring Framework</h4>
                    <p className="text-xs text-gray-600">25-point evaluation system for predicting hook performance</p>
                  </Link>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">A/B Testing Templates</h4>
                    <p className="text-xs text-gray-600">Systematic testing protocols for hook optimization</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">Performance Analytics Dashboard</h4>
                    <p className="text-xs text-gray-600">Track hook performance across platforms and campaigns</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="h-6 w-6 text-brand-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Creative Resources</h3>
                </div>
                
                <div className="space-y-3">
                  <Link 
                    href="/52-high-converting-ad-hooks-library"
                    className="block p-3 bg-brand-50 rounded-lg border hover:border-brand-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm">52 High-Converting Hooks</h4>
                    <p className="text-xs text-gray-600">Curated library of performance-scored hook examples</p>
                  </Link>
                  
                  <Link 
                    href="/creative-brief-framework"
                    className="block p-3 bg-brand-50 rounded-lg border hover:border-brand-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm">Creative Brief Templates</h4>
                    <p className="text-xs text-gray-600">Strategic frameworks for briefing hook development</p>
                  </Link>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm">Hook Variation Generator</h4>
                    <p className="text-xs text-gray-600">Systematic approach to creating hook variations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Master Systematic Hook Generation
            </h2>
            
            <p className="text-xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Access complete hook generation methodology with weekly intelligence delivery. 
              Transform creative development with systematic frameworks and performance optimization.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="font-semibold">Strategic Frameworks</div>
                <div className="text-brand-200 text-sm">5 proven hook structures</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="font-semibold">Systematic Process</div>
                <div className="text-brand-200 text-sm">5-step generation methodology</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-brand-200 mx-auto mb-2" />
                <div className="font-semibold">Performance Scoring</div>
                <div className="text-brand-200 text-sm">25-point evaluation system</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-brand-600 hover:bg-brand-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Complete Methodology
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <FreeWeekButton source="hook_generator-cta" className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center">Start Free Week Trial</FreeWeekButton>
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
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete strategic methodology for systematic creative development and performance optimization
                </p>
              </Link>
              
              <Link 
                href="/creative-fatigue-prevention-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Creative Fatigue Prevention</h3>
                <p className="text-sm text-gray-600">
                  Systematic approach to preventing audience saturation and maintaining campaign performance
                </p>
              </Link>
              
              <Link 
                href="/creative-brief-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <Lightbulb className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Creative Brief Framework</h3>
                <p className="text-sm text-gray-600">
                  Strategic template system for briefing creative teams and ensuring consistent performance
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* WebApplication Schema for Tool Recognition */}
      <WebApplicationSchema
        name="Hook Generator Methodology Framework"
        description="Strategic framework for generating high-converting ad hooks and creative concepts"
        slug="/hook-generator"
        applicationCategory="BusinessApplication"
        features={[
          '25-point hook scoring system',
          'Performance psychology framework',
          'Platform-specific optimization',
          'Audience awareness level targeting'
        ]}
        category="BusinessApplication"
      />
    </div>
  );
}
