import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { Zap, TrendingUp, Target, Users, ArrowRight, CheckCircle, Calendar, Bot } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI-Enhanced Creative Intelligence System: Weekly Workflow for Subscription Brands',
  description: 'Learn how Fortune 100 companies use AI to enhance creative intelligence systems for weekly trend analysis and competitor monitoring. Complete workflow guide for subscription businesses.',
  keywords: 'AI creative intelligence, automated trend analysis, AI content creation, subscription business automation, weekly creative workflow, AI marketing tools 2024',
  openGraph: {
    title: 'AI-Enhanced Creative Intelligence System for Subscription Brands',
    description: 'Complete guide to AI-enhanced weekly creative intelligence workflows used by Fortune 100 companies.',
    type: 'article',
    publishedTime: '2024-01-17',
    authors: ['Apsics Media'],
  },
  alternates: {
    canonical: '/ai-enhanced-creative-intelligence',
  },
};

export default function AIEnhancedCreativeIntelligencePage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Bot className="h-4 w-4 mr-2" />
                AI-ENHANCED INTELLIGENCE SYSTEM
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                AI-Enhanced Creative Intelligence System
              </h1>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                How Fortune 100 companies use AI to generate 15 scripts in 15 minutes while maintaining strategic quality. 
                Complete weekly workflow system for subscription businesses seeking systematic creative intelligence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="#workflow" className="btn bg-purple-500 text-white font-semibold py-4 px-8 rounded-lg hover:bg-purple-400 transition-colors">
                  <Zap className="h-5 w-5 mr-2" />
                  See AI Workflow
                </Link>
                <Link href="#implementation" className="btn btn-secondary border-white text-white hover:bg-white/10">
                  Get Implementation Guide
                </Link>
              </div>

              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">15 Scripts</div>
                  <div className="text-purple-200">In 15 Minutes</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">Fortune 100</div>
                  <div className="text-purple-200">Proven Method</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">Weekly</div>
                  <div className="text-purple-200">Automated Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Revolution Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  The AI Creative Intelligence Revolution
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                  Traditional creative agencies produce 2-4 concepts monthly. AI-enhanced systems generate 15+ strategic 
                  concepts weekly while maintaining human strategic oversight. This isn't automation replacing creativity—it's 
                  intelligence amplifying strategy.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      How AI Enhances Creative Intelligence
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Pattern Recognition:</strong> AI identifies successful creative patterns across millions of data points that humans would miss.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Speed at Scale:</strong> Generate multiple concept variations in minutes, allowing more strategic time for optimization and testing.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Consistency:</strong> Maintain brand voice and strategic alignment across all creative outputs without human fatigue or variation.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Traditional vs AI-Enhanced Output</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Scripts per week:</span>
                        <div className="flex items-center gap-4">
                          <span className="text-red-600">2-3</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-green-600 font-bold">15+</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Strategic analysis time:</span>
                        <div className="flex items-center gap-4">
                          <span className="text-red-600">20%</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-green-600 font-bold">80%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Quality consistency:</span>
                        <div className="flex items-center gap-4">
                          <span className="text-red-600">Variable</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-green-600 font-bold">Systematic</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The 15-Script Workflow */}
        <section id="workflow" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  The 15-Script, 15-Minute Weekly Workflow
                </h2>
                <p className="text-xl text-gray-600">
                  Step-by-step breakdown of how Fortune 100 companies generate strategic creative concepts using AI-enhanced intelligence.
                </p>
              </div>

              <div className="space-y-8">
                {/* Phase 1 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Trend Intelligence Gathering (3 minutes)</h3>
                      <p className="text-gray-600">AI-powered platform monitoring and trend velocity analysis</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Automated Data Collection</h4>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li>• TikTok trending hashtag velocity analysis</li>
                        <li>• Instagram Reel format pattern recognition</li>
                        <li>• Twitter conversation sentiment monitoring</li>
                        <li>• LinkedIn content engagement metrics</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Strategic Filtering</h4>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li>• Subscription business relevance scoring</li>
                        <li>• Brand alignment assessment</li>
                        <li>• Trend longevity prediction</li>
                        <li>• Competitor adoption tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Competitor Analysis Integration (2 minutes)</h3>
                      <p className="text-gray-600">Real-time competitive landscape evaluation</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">Performance Tracking</div>
                        <div className="text-xs text-gray-600">Competitor engagement metrics</div>
                      </div>
                      <div className="text-center">
                        <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">Gap Analysis</div>
                        <div className="text-xs text-gray-600">Unused trend opportunities</div>
                      </div>
                      <div className="text-center">
                        <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">Audience Overlap</div>
                        <div className="text-xs text-gray-600">Target market analysis</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">AI-Assisted Concept Generation (5 minutes)</h3>
                      <p className="text-gray-600">Strategic concept creation with human oversight</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Concept Ideation Process</h4>
                      <p className="text-purple-800 text-sm mb-3">
                        AI generates multiple concept variations based on trending patterns, brand guidelines, 
                        and subscription business optimization principles.
                      </p>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-white rounded p-3">
                          <div className="font-semibold text-xs">Hook Variations</div>
                          <div className="text-xs text-gray-600">5 different opening approaches</div>
                        </div>
                        <div className="bg-white rounded p-3">
                          <div className="font-semibold text-xs">Value Props</div>
                          <div className="text-xs text-gray-600">3 benefit-focused angles</div>
                        </div>
                        <div className="bg-white rounded p-3">
                          <div className="font-semibold text-xs">CTA Options</div>
                          <div className="text-xs text-gray-600">4 conversion-optimized endings</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 4 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Strategic Optimization & Output (5 minutes)</h3>
                      <p className="text-gray-600">Human strategic refinement and final quality assurance</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-orange-50 rounded-xl p-6">
                      <h4 className="font-semibold text-orange-900 mb-3">Strategic Refinement</h4>
                      <ul className="space-y-2 text-orange-800 text-sm">
                        <li>• Brand voice alignment check</li>
                        <li>• Customer journey optimization</li>
                        <li>• A/B testing variant creation</li>
                        <li>• Platform-specific adaptation</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Quality Assurance</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• Conversion potential scoring</li>
                        <li>• Compliance and risk assessment</li>
                        <li>• Performance prediction modeling</li>
                        <li>• Implementation timeline planning</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-2">Final Output: 15 Strategic Scripts</div>
                      <div className="text-gray-600">Ready for production, testing, and optimization</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tools & Technology Stack */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  AI Technology Stack
                </h2>
                <p className="text-xl text-gray-600">
                  The specific AI tools and integrations that power Fortune 100 creative intelligence systems.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                  <Bot className="h-12 w-12 text-blue-600 mb-6" />
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Content Intelligence AI</h3>
                  <ul className="space-y-3 text-blue-800">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">GPT-4 for strategic concept generation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Claude for brand voice consistency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Custom fine-tuning for subscription focus</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                  <TrendingUp className="h-12 w-12 text-green-600 mb-6" />
                  <h3 className="text-xl font-bold text-green-900 mb-4">Trend Analysis Systems</h3>
                  <ul className="space-y-3 text-green-800">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Real-time social media API monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Machine learning trend prediction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automated competitive intelligence</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
                  <Target className="h-12 w-12 text-purple-600 mb-6" />
                  <h3 className="text-xl font-bold text-purple-900 mb-4">Performance Optimization</h3>
                  <ul className="space-y-3 text-purple-800">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Predictive performance modeling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">A/B testing variant generation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">ROI optimization algorithms</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Human + AI Strategic Framework</h3>
                  <p className="text-gray-300">
                    AI handles pattern recognition and content generation. Humans focus on strategic oversight, 
                    brand alignment, and business optimization. This combination delivers both scale and quality.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-4">AI Responsibilities</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Trend pattern identification</li>
                      <li>• Content variation generation</li>
                      <li>• Performance data analysis</li>
                      <li>• Competitive landscape monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-4">Human Strategic Oversight</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Brand voice and alignment</li>
                      <li>• Business strategy integration</li>
                      <li>• Quality assurance and refinement</li>
                      <li>• Long-term planning and optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Guide */}
        <section id="implementation" className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Implementation Roadmap
                </h2>
                <p className="text-xl text-gray-600">
                  How to integrate AI-enhanced creative intelligence into your subscription business workflow.
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <Calendar className="h-8 w-8 text-indigo-600 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-900">Week 1-2: Foundation Setup</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-indigo-50 rounded-lg p-6">
                      <h4 className="font-semibold text-indigo-900 mb-3">AI Tool Configuration</h4>
                      <ul className="space-y-2 text-indigo-800 text-sm">
                        <li>• API integrations setup</li>
                        <li>• Brand voice training</li>
                        <li>• Custom prompt engineering</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Data Integration</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• Social platform connections</li>
                        <li>• Competitor monitoring setup</li>
                        <li>• Performance tracking alignment</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6">
                      <h4 className="font-semibold text-purple-900 mb-3">Team Training</h4>
                      <ul className="space-y-2 text-purple-800 text-sm">
                        <li>• Workflow process training</li>
                        <li>• Quality assurance protocols</li>
                        <li>• Strategic oversight methods</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <TrendingUp className="h-8 w-8 text-green-600 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-900">Week 3-4: System Optimization</h3>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-900 mb-3">Performance Tuning</h4>
                        <p className="text-green-800 text-sm mb-3">
                          Fine-tune AI outputs based on initial results and brand feedback. Optimize for your 
                          specific subscription business model and target audience preferences.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-3">Quality Benchmarking</h4>
                        <p className="text-green-800 text-sm mb-3">
                          Establish quality standards and measurement criteria. Create feedback loops for 
                          continuous improvement and strategic alignment optimization.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Scale Creative Intelligence?</h3>
                    <p className="text-purple-100 mb-6">
                      Get the same AI-enhanced system used by Fortune 100 companies, delivered weekly with human strategic oversight.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link href="/free-hooks" className="btn bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                        Start with 10 Free Hooks
                      </Link>
                      <Link href="/#service-tiers" className="btn border-white text-white hover:bg-white/10">
                        See AI-Enhanced Plans
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get AI-Enhanced Creative Intelligence Updates
              </h2>
              <p className="text-gray-600 mb-8">
                Subscribe to receive weekly AI strategy insights and creative intelligence updates for subscription businesses.
              </p>
              <EmailCaptureForm
                placeholder="Enter your work email"
                buttonText="Get AI Intelligence Updates"
                variant="cta"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}