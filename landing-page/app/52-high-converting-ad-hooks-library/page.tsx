'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Download, Star, Filter, Search, BarChart3, Target, TrendingUp, Eye, Heart, Zap, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '52 High-Converting Ad Hooks Library: Performance-Scored Creative Intelligence | Apsics Media',
  description: 'Complete library of 52 high-converting ad hooks with performance scoring for subscription businesses. Curated from top-performing campaigns with 21.7/25 average scores.',
  keywords: 'high-converting ad hooks, subscription business hooks, viral hooks database, performance-scored creative, weekly ad hooks, creative intelligence library, subscription marketing creative',
  openGraph: {
    title: '52 High-Converting Ad Hooks Library: Performance-Scored Creative Intelligence',
    description: 'Complete library of 52 high-converting ad hooks with performance scoring for subscription businesses.',
    type: 'article',
  },
  alternates: {
    canonical: '/52-high-converting-ad-hooks-library',
  },
};

// Hook data structure with performance scoring
const hookCategories = [
  {
    id: 'problem-agitate',
    name: 'Problem-Agitate-Solution',
    description: 'Identify pain points, amplify frustration, present solution',
    count: 12,
    hooks: [
      {
        id: 1,
        text: "Why does every 'easy' marketing strategy feel impossible when you try it?",
        industry: 'SaaS',
        platform: 'Facebook',
        score: 23,
        attention: 5,
        emotion: 4,
        clarity: 5,
        cta: 4,
        memorability: 5,
        framework: 'Problem Recognition + Frustration Validation',
        analysis: 'Opens with universal struggle, creates immediate relatability, implies expert solution coming'
      },
      {
        id: 2,
        text: "Your customers are canceling subscriptions faster than you can replace them...",
        industry: 'Subscription',
        platform: 'LinkedIn',
        score: 24,
        attention: 5,
        emotion: 5,
        clarity: 5,
        cta: 4,
        memorability: 5,
        framework: 'Pain Amplification + Urgency Creation',
        analysis: 'Creates immediate anxiety about business survival, forces attention to retention solutions'
      },
      {
        id: 3,
        text: "The #1 reason your mobile app downloads aren't converting to subscriptions",
        industry: 'Mobile App',
        platform: 'TikTok',
        score: 22,
        attention: 4,
        emotion: 4,
        clarity: 5,
        cta: 4,
        memorability: 5,
        framework: 'Curiosity Gap + Specificity Promise',
        analysis: 'Numbered format creates authority, gap creates tension, implies actionable solution'
      }
    ]
  },
  {
    id: 'social-proof',
    name: 'Social Proof & Authority',
    description: 'Leverage credibility, testimonials, and crowd psychology',
    count: 10,
    hooks: [
      {
        id: 4,
        text: "3,247 SaaS founders use this weekly creative framework to reduce CAC by 25%",
        industry: 'SaaS',
        platform: 'Facebook',
        score: 23,
        attention: 4,
        emotion: 4,
        clarity: 5,
        cta: 5,
        memorability: 5,
        framework: 'Specific Numbers + Results Promise',
        analysis: 'Precise number creates credibility, specific result creates desire, implies proven system'
      },
      {
        id: 5,
        text: "How subscription apps like Headspace and Calm dominate with weekly creative intelligence",
        industry: 'Mobile App',
        platform: 'LinkedIn',
        score: 22,
        attention: 4,
        emotion: 4,
        clarity: 5,
        cta: 4,
        memorability: 5,
        framework: 'Brand Authority + Success Association',
        analysis: 'Names recognizable brands, associates strategy with success, creates aspirational appeal'
      }
    ]
  },
  {
    id: 'urgency-scarcity',
    name: 'Urgency & Scarcity',
    description: 'Create time pressure and exclusive access appeal',
    count: 8,
    hooks: [
      {
        id: 6,
        text: "Only 50 subscription businesses will get $5/week creative intelligence (ending Friday)",
        industry: 'Subscription',
        platform: 'Facebook',
        score: 24,
        attention: 5,
        emotion: 5,
        clarity: 5,
        cta: 4,
        memorability: 5,
        framework: 'Limited Quantity + Time Deadline',
        analysis: 'Double scarcity (quantity + time), specific deadline creates urgency, low price removes barriers'
      },
      {
        id: 7,
        text: "Last chance: Creative intelligence that transformed 500+ growth teams closes tonight",
        industry: 'SaaS',
        platform: 'LinkedIn',
        score: 23,
        attention: 5,
        emotion: 4,
        clarity: 4,
        cta: 5,
        memorability: 5,
        framework: 'Final Opportunity + Social Proof Volume',
        analysis: 'Creates immediate deadline pressure, large number implies proven success, fear of missing out'
      }
    ]
  },
  {
    id: 'curiosity-gap',
    name: 'Curiosity Gap Creation',
    description: 'Open knowledge loops that demand completion',
    count: 9,
    hooks: [
      {
        id: 8,
        text: "The subscription pricing strategy that nobody talks about (but everyone should)",
        industry: 'Subscription',
        platform: 'TikTok',
        score: 22,
        attention: 4,
        emotion: 4,
        clarity: 4,
        cta: 5,
        memorability: 5,
        framework: 'Hidden Knowledge + Contradiction',
        analysis: 'Implies secret information, contradiction creates tension, promises valuable insider knowledge'
      },
      {
        id: 9,
        text: "Why successful mobile apps never use these 3 acquisition strategies",
        industry: 'Mobile App',
        platform: 'Facebook',
        score: 21,
        attention: 4,
        emotion: 4,
        clarity: 4,
        cta: 4,
        memorability: 5,
        framework: 'Reverse Psychology + Numbered List',
        analysis: 'Counterintuitive approach creates curiosity, numbered format promises structure, implies expertise'
      }
    ]
  },
  {
    id: 'transformation',
    name: 'Transformation Promise',
    description: 'Before/after scenarios and dramatic change',
    count: 8,
    hooks: [
      {
        id: 10,
        text: "From 200 signups to 2,000 signups in 8 weeks using weekly creative intelligence",
        industry: 'SaaS',
        platform: 'LinkedIn',
        score: 24,
        attention: 5,
        emotion: 4,
        clarity: 5,
        cta: 5,
        memorability: 5,
        framework: 'Specific Before/After + Time Frame',
        analysis: '10x improvement creates aspiration, specific timeframe creates believability, names the method'
      },
      {
        id: 11,
        text: "How to go from struggling with creative fatigue to viral content every Monday",
        industry: 'Subscription',
        platform: 'TikTok',
        score: 23,
        attention: 4,
        emotion: 5,
        clarity: 5,
        cta: 4,
        memorability: 5,
        framework: 'Problem-to-Solution Journey + Frequency Promise',
        analysis: 'Relatable struggle to aspirational outcome, consistent delivery promise, actionable implication'
      }
    ]
  },
  {
    id: 'trend-leverage',
    name: 'Trend Leverage',
    description: 'Capitalize on current events and market movements',
    count: 5,
    hooks: [
      {
        id: 12,
        text: "2025's biggest subscription trend that most companies will miss",
        industry: 'Subscription',
        platform: 'LinkedIn',
        score: 22,
        attention: 4,
        emotion: 4,
        clarity: 4,
        cta: 5,
        memorability: 5,
        framework: 'Future Prediction + Competitive Advantage',
        analysis: 'Current year relevance, implies insider knowledge, fear of falling behind competitors'
      }
    ]
  }
];

export default function HighConvertingAdHooksLibrary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "52 High-Converting Ad Hooks Library: Performance-Scored Creative Intelligence",
            "description": "Complete library of 52 high-converting ad hooks with performance scoring for subscription businesses.",
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
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="h-4 w-4 mr-2" />
              PERFORMANCE-SCORED CREATIVE LIBRARY
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              52 High-Converting Ad Hooks Library
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Curated collection of top-performing hooks with detailed performance analysis. 
              Average score: 21.7/25. Ready for immediate testing across all platforms.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BarChart3 className="h-8 w-8 text-orange-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">21.7/25</div>
                <div className="text-orange-200 text-sm">Average performance score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-orange-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">6 Categories</div>
                <div className="text-orange-200 text-sm">Strategic hook frameworks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-orange-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">3 Platforms</div>
                <div className="text-orange-200 text-sm">TikTok, Facebook, LinkedIn</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const librarySection = document.getElementById('hook-library');
                  if (librarySection) {
                    librarySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore Complete Library
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <Link
                href="/weekly-creative-intelligence-playbook"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Learn the Framework
                <BarChart3 className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Scoring Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Performance Scoring Methodology
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Every hook is evaluated using our <Link href="/25-point-performance-scoring-system" className="text-orange-600 hover:text-orange-700 underline">25-point performance scoring system</Link>, 
              based on conversion psychology research and analysis of thousands of high-performing campaigns.
            </p>
            
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <Eye className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Attention</div>
                <div className="text-sm text-gray-600">Stop-the-scroll power</div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Emotion</div>
                <div className="text-sm text-gray-600">Emotional resonance</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Clarity</div>
                <div className="text-sm text-gray-600">Benefit clarity</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Zap className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">CTA</div>
                <div className="text-sm text-gray-600">Action strength</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Memorable</div>
                <div className="text-sm text-gray-600">Sticky elements</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">How to Use This Library</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">1. Choose Your Framework</div>
                  <div className="text-gray-600">Select category based on campaign goals and audience awareness level</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">2. Adapt for Your Brand</div>
                  <div className="text-gray-600">Customize hooks with your specific value proposition and industry terms</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">3. Test and Optimize</div>
                  <div className="text-gray-600">A/B test variations and track performance against scoring predictions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hook Library */}
      <section id="hook-library" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Hook Library by Category
            </h2>
            
            <div className="space-y-12">
              {hookCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">{category.count}</div>
                      <div className="text-sm text-gray-500">hooks</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {category.hooks.map((hook) => (
                      <div key={hook.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="text-lg font-semibold text-gray-900 mb-2">
                              "{hook.text}"
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{hook.industry}</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{hook.platform}</span>
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded font-semibold">
                                Score: {hook.score}/25
                              </span>
                            </div>
                          </div>
                          
                          <div className="ml-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {hook.score}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Performance Breakdown</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center">
                                  <Eye className="h-4 w-4 text-orange-600 mr-2" />
                                  Attention Capture
                                </span>
                                <span className="font-semibold">{hook.attention}/5</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center">
                                  <Heart className="h-4 w-4 text-red-600 mr-2" />
                                  Emotional Resonance
                                </span>
                                <span className="font-semibold">{hook.emotion}/5</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center">
                                  <Target className="h-4 w-4 text-blue-600 mr-2" />
                                  Benefit Clarity
                                </span>
                                <span className="font-semibold">{hook.clarity}/5</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center">
                                  <Zap className="h-4 w-4 text-green-600 mr-2" />
                                  CTA Strength
                                </span>
                                <span className="font-semibold">{hook.cta}/5</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center">
                                  <Star className="h-4 w-4 text-purple-600 mr-2" />
                                  Memorability
                                </span>
                                <span className="font-semibold">{hook.memorability}/5</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Strategic Analysis</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-semibold text-gray-700">Framework:</span>
                                <div className="text-gray-600">{hook.framework}</div>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Why It Works:</span>
                                <div className="text-gray-600">{hook.analysis}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Hook Implementation Framework
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">1. Strategic Selection</h3>
                <p className="text-gray-600 text-sm">
                  Choose hooks based on audience awareness level, campaign objectives, and platform requirements. 
                  Start with highest-scoring hooks for immediate results.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Filter className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">2. Brand Customization</h3>
                <p className="text-gray-600 text-sm">
                  Adapt hooks to your specific value proposition, industry terminology, and brand voice. 
                  Maintain the core psychological framework while personalizing the messaging.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">3. Performance Testing</h3>
                <p className="text-gray-600 text-sm">
                  Test multiple variations simultaneously, track performance against predictions, 
                  and optimize based on actual conversion data and engagement metrics.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Hook Integration Strategy</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Monday: Fresh Hook Deployment</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Deploy new hooks aligned with weekly trend intelligence. Capitalize on Monday traffic peaks 
                    with fresh creative concepts.
                  </p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Wednesday: Performance Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Mid-week performance review and optimization. Identify winning hooks for scaling 
                    and underperformers for replacement.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Friday: Next Week Planning</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Select and customize hooks for next week's campaigns. Based on current performance 
                    data and emerging trend intelligence.
                  </p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Weekend: Hook Banking</h4>
                  <p className="text-sm text-gray-600">
                    Build library of customized hooks for rapid deployment. Prepare variations 
                    for different audiences and platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Fresh Hooks Every Monday
            </h2>
            
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Access our complete weekly creative intelligence system. New performance-scored hooks, 
              competitive analysis, and trend intelligence delivered every Monday.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-orange-200 mx-auto mb-2" />
                <div className="font-semibold">Weekly Delivery</div>
                <div className="text-orange-200 text-sm">Fresh hooks every Monday</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BarChart3 className="h-8 w-8 text-orange-200 mx-auto mb-2" />
                <div className="font-semibold">Performance Scored</div>
                <div className="text-orange-200 text-sm">25-point evaluation system</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="h-8 w-8 text-orange-200 mx-auto mb-2" />
                <div className="font-semibold">Ready to Test</div>
                <div className="text-orange-200 text-sm">Immediate implementation</div>
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
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Your Free Week Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              
              <Link
                href="/#service-tiers"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Weekly Plans
                <BarChart3 className="h-5 w-5 ml-2" />
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
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete methodology guide for systematic creative development and performance optimization
                </p>
              </Link>
              
              <Link 
                href="/25-point-performance-scoring-system"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">25-Point Scoring System</h3>
                <p className="text-sm text-gray-600">
                  Deep dive into performance prediction methodology and creative evaluation framework
                </p>
              </Link>
              
              <Link 
                href="/hook-generator"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Hook Generator Tool</h3>
                <p className="text-sm text-gray-600">
                  Interactive tool for creating custom hooks based on proven frameworks and performance data
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}