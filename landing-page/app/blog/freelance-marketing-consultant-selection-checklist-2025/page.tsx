import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calculator, DollarSign, TrendingUp, Users, Clock, Target, BarChart3, CheckCircle, UserPlus } from 'lucide-react'
import { BlogCTASection } from '@/components/blog/blog-cta-section'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { SocialSharing } from '@/components/blog/social-sharing'
import { ArticleStructuredData } from '@/components/blog/article-structured-data'
import { BreadcrumbNavigation } from '@/components/blog/breadcrumb-navigation'
import { RelatedArticles } from '@/components/blog/related-articles'
import { Header } from '@/components/layout/header'

export const metadata: Metadata = {
  title: 'Freelance Marketing Consultant Selection Checklist: 15 Essential Questions for Small Businesses 2025',
  description: 'Complete checklist for selecting freelance marketing consultants. 15 essential questions, evaluation criteria, and decision framework for small businesses hiring marketing experts.',
  keywords: 'freelance marketing consultant selection, how to hire freelance marketing consultant, marketing consultant checklist, freelance marketing evaluation, small business marketing hiring 2025',
  openGraph: {
    title: 'Freelance Marketing Consultant Selection Checklist 2025',
    description: 'Essential checklist and evaluation framework for selecting the right freelance marketing consultant for your small business.',
    type: 'article',
    publishedTime: '2025-01-29T00:00:00.000Z',
    authors: ['Apsics Media'],
    tags: ['Freelance Marketing', 'Consultant Selection', 'Small Business', 'Marketing Hiring', 'Evaluation Checklist'],
  },
}

const tableOfContentsItems = [
  { id: 'essential-questions', title: '15 Essential Selection Questions', level: 2 },
  { id: 'evaluation-framework', title: 'Evaluation Framework', level: 2 },
  { id: 'portfolio-assessment', title: 'Portfolio Assessment Guide', level: 2 },
  { id: 'pricing-negotiation', title: 'Pricing & Contract Negotiation', level: 2 },
  { id: 'reference-verification', title: 'Reference Verification Process', level: 2 },
  { id: 'red-flags', title: 'Red Flags & Warning Signs', level: 2 },
  { id: 'onboarding-checklist', title: 'Consultant Onboarding Checklist', level: 2 },
  { id: 'performance-tracking', title: 'Performance Tracking Setup', level: 2 }
]

// Related articles will be handled by RelatedArticles component

export default function FreelanceMarketingConsultantSelectionChecklist() {
  const breadcrumbItems = [
    { name: 'Blog', href: '/blog' },
    { name: 'Freelance Marketing Consultant Selection Checklist', href: '/blog/freelance-marketing-consultant-selection-checklist-2025' }
  ]

  return (
    <>
      <Header />
      <article className="min-h-screen bg-white pt-16 lg:pt-20">
      <ArticleStructuredData
        title="Freelance Marketing Consultant Selection Checklist: 15 Essential Questions for Small Businesses 2025"
        description="Complete checklist for selecting freelance marketing consultants. 15 essential questions, evaluation criteria, and decision framework for small businesses hiring marketing experts."
        slug="/blog/freelance-marketing-consultant-selection-checklist-2025"
        category="Freelance Marketing"
        keywords={['freelance marketing consultant selection', 'how to hire freelance marketing consultant', 'marketing consultant checklist', 'freelance marketing evaluation', 'small business marketing hiring 2025']}
        readingTime={13}
        publishedDate="2025-01-29T00:00:00.000Z"
        modifiedDate="2025-01-29T00:00:00.000Z"
        image="/images/blog/freelance-marketing-consultant-selection-checklist.jpg"
        url="/blog/freelance-marketing-consultant-selection-checklist-2025"
      />
      
      {/* Header Navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <BreadcrumbNavigation items={breadcrumbItems} />
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Clock className="w-4 h-4" />
            <span>18 min read</span>
            <span>•</span>
            <span>Published January 29, 2025</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Freelance Marketing Consultant Selection Checklist: 15 Essential Questions for Small Businesses 2025
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            Complete evaluation framework for selecting freelance marketing consultants. Essential questions, portfolio assessment criteria, and decision-making tools to help small businesses choose the right marketing expert for their growth objectives and budget.
          </p>
          
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Hiring Guide</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Selection Checklist</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Small Business Focus</span>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="lg:flex-1">
            {/* 15 Essential Selection Questions */}
            <section id="essential-questions" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">15 Essential Selection Questions</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">Strategic Interview Framework</h3>
                <p className="text-blue-800 mb-6">
                  Use these 15 essential questions to systematically evaluate freelance marketing consultants. Each question is designed to reveal critical insights about their capabilities, approach, and fit for your business needs.
                </p>

                <div className="bg-blue-100 rounded-lg p-4 border border-blue-300">
                  <h4 className="font-semibold text-blue-900 mb-2">Interview Structure Recommendation</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Initial screening call: Questions 1-5 (15 minutes)</li>
                    <li>• Detailed interview: Questions 6-12 (45 minutes)</li>
                    <li>• Final assessment: Questions 13-15 (30 minutes)</li>
                    <li>• Portfolio review and references: Additional 30 minutes</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-6">Category 1: Experience & Expertise (Questions 1-5)</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-green-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">1</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-green-900 mb-2">What specific experience do you have with businesses similar to mine?</h4>
                          <p className="text-green-800 mb-3">
                            <strong>Why this matters:</strong> Relevant industry experience significantly impacts campaign effectiveness and reduces learning curve time.
                          </p>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <h5 className="font-medium text-green-900 mb-2">Look for in their response:</h5>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• Specific examples from your industry or similar business models</li>
                              <li>• Understanding of your target audience and market dynamics</li>
                              <li>• Familiarity with industry-specific challenges and regulations</li>
                              <li>• Results achieved for similar-sized businesses</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-green-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">2</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-green-900 mb-2">Can you show me 3 case studies with measurable results?</h4>
                          <p className="text-green-800 mb-3">
                            <strong>Why this matters:</strong> Case studies demonstrate their ability to deliver measurable outcomes and track performance effectively.
                          </p>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <h5 className="font-medium text-green-900 mb-2">What to evaluate:</h5>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• Specific metrics and percentage improvements</li>
                              <li>• Timeline from start to results achievement</li>
                              <li>• Budget size and ROI calculations</li>
                              <li>• Challenges faced and how they were overcome</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-green-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">3</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-green-900 mb-2">What marketing channels and strategies are you most experienced with?</h4>
                          <p className="text-green-800 mb-3">
                            <strong>Why this matters:</strong> Ensures their expertise aligns with your marketing needs and preferred channels.
                          </p>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <h5 className="font-medium text-green-900 mb-2">Channel expertise to assess:</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
                              <div>
                                <strong>Digital Channels:</strong>
                                <ul className="mt-1 space-y-0.5">
                                  <li>• SEO and content marketing</li>
                                  <li>• Paid advertising (Google, Facebook)</li>
                                  <li>• Email marketing</li>
                                  <li>• Social media marketing</li>
                                </ul>
                              </div>
                              <div>
                                <strong>Traditional Channels:</strong>
                                <ul className="mt-1 space-y-0.5">
                                  <li>• Local advertising</li>
                                  <li>• Print and radio marketing</li>
                                  <li>• Event marketing</li>
                                  <li>• Direct mail campaigns</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-green-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">4</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-green-900 mb-2">How do you stay current with marketing trends and best practices?</h4>
                          <p className="text-green-800 mb-3">
                            <strong>Why this matters:</strong> Marketing evolves rapidly; ongoing learning ensures they bring current strategies to your business.
                          </p>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <h5 className="font-medium text-green-900 mb-2">Signs of commitment to learning:</h5>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• Active participation in industry conferences and webinars</li>
                              <li>• Continuous education through courses and certifications</li>
                              <li>• Following thought leaders and industry publications</li>
                              <li>• Testing new strategies and sharing insights</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-green-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">5</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-green-900 mb-2">What certifications or credentials do you hold in marketing?</h4>
                          <p className="text-green-800 mb-3">
                            <strong>Why this matters:</strong> Professional certifications indicate commitment to expertise and staying current with platform changes.
                          </p>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <h5 className="font-medium text-green-900 mb-2">Valuable certifications to look for:</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
                              <div>
                                <strong>Platform Certifications:</strong>
                                <ul className="mt-1 space-y-0.5">
                                  <li>• Google Ads certified</li>
                                  <li>• Facebook Blueprint certified</li>
                                  <li>• HubSpot certified</li>
                                  <li>• Google Analytics certified</li>
                                </ul>
                              </div>
                              <div>
                                <strong>Professional Credentials:</strong>
                                <ul className="mt-1 space-y-0.5">
                                  <li>• Marketing degree or MBA</li>
                                  <li>• Industry association memberships</li>
                                  <li>• Specialized training programs</li>
                                  <li>• Ongoing education commitments</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-6">Category 2: Approach & Methodology (Questions 6-10)</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-blue-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">6</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-blue-900 mb-2">Walk me through your typical strategy development process.</h4>
                          <p className="text-blue-800 mb-3">
                            <strong>Why this matters:</strong> A structured approach indicates professionalism and increases likelihood of successful outcomes.
                          </p>
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <h5 className="font-medium text-blue-900 mb-2">Look for systematic approach including:</h5>
                            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                              <li>Discovery and business analysis phase</li>
                              <li>Competitive research and market analysis</li>
                              <li>Goal setting and KPI definition</li>
                              <li>Strategy development and prioritization</li>
                              <li>Implementation planning and timelines</li>
                              <li>Performance tracking and optimization</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-blue-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">7</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-blue-900 mb-2">How do you measure and report on campaign performance?</h4>
                          <p className="text-blue-800 mb-3">
                            <strong>Why this matters:</strong> Clear measurement and reporting ensure accountability and help track ROI effectively.
                          </p>
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <h5 className="font-medium text-blue-900 mb-2">Essential reporting elements:</h5>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• Key performance indicators (KPIs) aligned with business goals</li>
                              <li>• Regular reporting schedule and format</li>
                              <li>• Attribution modeling and ROI calculations</li>
                              <li>• Insights and optimization recommendations</li>
                              <li>• Dashboard access and data transparency</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-blue-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">8</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-blue-900 mb-2">What tools and software do you use for marketing management?</h4>
                          <p className="text-blue-800 mb-3">
                            <strong>Why this matters:</strong> Modern tools improve efficiency and results; outdated approaches may limit effectiveness.
                          </p>
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <h5 className="font-medium text-blue-900 mb-2">Professional tools to expect:</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                              <div>
                                <strong>Analytics & Reporting:</strong>
                                <ul className="mt-1 space-y-0.5">
                                  <li>• Google Analytics & Search Console</li>
                                  <li>• Facebook Analytics & Insights</li>
                                  <li>• Custom dashboard tools</li>
                                  <li>• Heat mapping and user behavior</li>
                                </ul>
                              </div>
                              <div>
                                <strong>Campaign Management:</strong>
                                <ul className="mt-1 space-y-0.5">
                                  <li>• Project management platforms</li>
                                  <li>• Email marketing automation</li>
                                  <li>• Social media scheduling</li>
                                  <li>• CRM and lead management</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-blue-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">9</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-blue-900 mb-2">How do you handle campaign optimization and testing?</h4>
                          <p className="text-blue-800 mb-3">
                            <strong>Why this matters:</strong> Continuous optimization separates good consultants from great ones; testing drives better results.
                          </p>
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <h5 className="font-medium text-blue-900 mb-2">Testing and optimization approach:</h5>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• A/B testing methodology and frequency</li>
                              <li>• Statistical significance requirements</li>
                              <li>• Performance monitoring and alerting</li>
                              <li>• Optimization cycles and improvement timelines</li>
                              <li>• Documentation of learnings and best practices</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-blue-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">10</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-blue-900 mb-2">What's your approach to budget allocation and management?</h4>
                          <p className="text-blue-800 mb-3">
                            <strong>Why this matters:</strong> Strategic budget management maximizes ROI and ensures efficient spending across channels.
                          </p>
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <h5 className="font-medium text-blue-900 mb-2">Budget management principles:</h5>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• Initial allocation strategy based on goals and historical data</li>
                              <li>• Performance-based reallocation methodology</li>
                              <li>• Spending controls and approval processes</li>
                              <li>• ROI thresholds and decision criteria</li>
                              <li>• Regular budget reviews and optimization</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-6">Category 3: Communication & Project Management (Questions 11-15)</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-purple-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">11</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-purple-900 mb-2">How do you typically communicate with clients and how often?</h4>
                          <p className="text-purple-800 mb-3">
                            <strong>Why this matters:</strong> Clear communication prevents misunderstandings and ensures projects stay on track.
                          </p>
                          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <h5 className="font-medium text-purple-900 mb-2">Communication standards to expect:</h5>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• Regular check-in schedule (weekly/bi-weekly)</li>
                              <li>• Preferred communication channels and response times</li>
                              <li>• Project updates and milestone reporting</li>
                              <li>• Issue escalation and problem-solving approach</li>
                              <li>• Documentation and knowledge sharing methods</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-purple-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">12</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-purple-900 mb-2">What is your availability and how do you manage multiple clients?</h4>
                          <p className="text-purple-800 mb-3">
                            <strong>Why this matters:</strong> Understanding capacity ensures your projects receive adequate attention and resources.
                          </p>
                          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <h5 className="font-medium text-purple-900 mb-2">Capacity management factors:</h5>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• Current client load and time allocation</li>
                              <li>• Working hours and time zone considerations</li>
                              <li>• Project prioritization methodology</li>
                              <li>• Peak capacity periods and scheduling constraints</li>
                              <li>• Backup support and resource scaling options</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-purple-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">13</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-purple-900 mb-2">What are your rates and how do you structure pricing?</h4>
                          <p className="text-purple-800 mb-3">
                            <strong>Why this matters:</strong> Understanding pricing structure helps budget planning and prevents scope creep issues.
                          </p>
                          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <h5 className="font-medium text-purple-900 mb-2">Pricing structure options:</h5>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• Hourly rates for ongoing consulting work</li>
                              <li>• Project-based pricing for defined deliverables</li>
                              <li>• Monthly retainer for ongoing services</li>
                              <li>• Performance-based compensation models</li>
                              <li>• Additional costs for tools, software, and media spend</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-purple-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">14</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-purple-900 mb-2">Can you provide references from recent clients in my industry?</h4>
                          <p className="text-purple-800 mb-3">
                            <strong>Why this matters:</strong> Direct client feedback provides insights into working style, results delivery, and potential challenges.
                          </p>
                          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <h5 className="font-medium text-purple-900 mb-2">Reference check questions to ask:</h5>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• What specific results did they achieve for you?</li>
                              <li>• How was their communication and project management?</li>
                              <li>• What challenges did you encounter together?</li>
                              <li>• Would you hire them again for future projects?</li>
                              <li>• How did they compare to other consultants you've worked with?</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-purple-200">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">15</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-purple-900 mb-2">What would success look like for our partnership after 6 months?</h4>
                          <p className="text-purple-800 mb-3">
                            <strong>Why this matters:</strong> Their response reveals strategic thinking and alignment with your business objectives.
                          </p>
                          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <h5 className="font-medium text-purple-900 mb-2">Success indicators to discuss:</h5>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• Specific, measurable business outcomes</li>
                              <li>• Marketing performance improvements</li>
                              <li>• Process improvements and efficiency gains</li>
                              <li>• Knowledge transfer and capability building</li>
                              <li>• Long-term strategic positioning</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Evaluation Framework */}
            <section id="evaluation-framework" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Evaluation Framework</h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Use this systematic scoring framework to objectively compare freelance marketing consultants and make data-driven hiring decisions.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mb-8">
                <h3 className="text-xl font-semibold text-yellow-900 mb-6">Comprehensive Scoring Matrix</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border border-yellow-300">
                    <thead className="bg-yellow-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-yellow-900">Evaluation Criteria</th>
                        <th className="px-4 py-3 text-center font-semibold text-yellow-900">Weight (%)</th>
                        <th className="px-4 py-3 text-center font-semibold text-yellow-900">Consultant A</th>
                        <th className="px-4 py-3 text-center font-semibold text-yellow-900">Consultant B</th>
                        <th className="px-4 py-3 text-center font-semibold text-yellow-900">Consultant C</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-200">
                      <tr>
                        <td className="px-4 py-3 font-medium text-yellow-900">Industry Experience & Relevance</td>
                        <td className="px-4 py-3 text-center text-yellow-800">20%</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-yellow-900">Portfolio Quality & Results</td>
                        <td className="px-4 py-3 text-center text-yellow-800">20%</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-yellow-900">Strategic Approach & Methodology</td>
                        <td className="px-4 py-3 text-center text-yellow-800">15%</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-yellow-900">Communication & Project Management</td>
                        <td className="px-4 py-3 text-center text-yellow-800">15%</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-yellow-900">Technical Skills & Tools</td>
                        <td className="px-4 py-3 text-center text-yellow-800">10%</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-yellow-900">Pricing & Value Proposition</td>
                        <td className="px-4 py-3 text-center text-yellow-800">10%</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-yellow-900">References & Client Feedback</td>
                        <td className="px-4 py-3 text-center text-yellow-800">10%</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                        <td className="px-4 py-3 text-center text-gray-600">__/10</td>
                      </tr>
                      <tr className="bg-yellow-100 font-semibold">
                        <td className="px-4 py-3 text-yellow-900">Total Weighted Score</td>
                        <td className="px-4 py-3 text-center text-yellow-900">100%</td>
                        <td className="px-4 py-3 text-center text-yellow-900">__/10</td>
                        <td className="px-4 py-3 text-center text-yellow-900">__/10</td>
                        <td className="px-4 py-3 text-center text-yellow-900">__/10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Scoring Guide:</h4>
                    <ul className="text-yellow-800 space-y-1">
                      <li>• 9-10: Exceptional - Exceeds expectations</li>
                      <li>• 7-8: Strong - Meets requirements well</li>
                      <li>• 5-6: Adequate - Meets basic requirements</li>
                      <li>• 3-4: Below Average - Concerns present</li>
                      <li>• 1-2: Poor - Does not meet requirements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Decision Thresholds:</h4>
                    <ul className="text-yellow-800 space-y-1">
                      <li>• 8.5-10: Strong hire - Proceed with contract</li>
                      <li>• 7.0-8.4: Good candidate - Consider hiring</li>
                      <li>• 6.0-6.9: Marginal - Additional evaluation needed</li>
                      <li>• Below 6.0: Not recommended - Continue search</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional sections would continue... */}

            <BlogCTASection
              title="Need Help Selecting the Right Marketing Consultant?"
              description="Get personalized guidance on evaluating and selecting freelance marketing consultants. Our free consultation includes evaluation framework, interview questions, and decision support."
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-8 space-y-6">
              <TableOfContents items={tableOfContentsItems} />
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Free Selection Tools</h3>
                <div className="space-y-3">
                  <Link 
                    href="/consultant-evaluation-scorecard" 
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Evaluation Scorecard Template
                  </Link>
                  <Link 
                    href="/consultant-interview-guide" 
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Interview Question Guide
                  </Link>
                  <Link 
                    href="/consultant-contract-template" 
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Contract Template
                  </Link>
                  <Link 
                    href="/free-hooks" 
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    52 Free Ad Hooks
                  </Link>
                </div>
              </div>

              <SocialSharing
                title="Freelance Marketing Consultant Selection Checklist 2025"
                url="https://apsicsmedia.com/blog/freelance-marketing-consultant-selection-checklist-2025"
                description="15 essential questions and evaluation framework for selecting freelance marketing consultants"
              />
            </div>
          </aside>
        </div>

        <RelatedArticles 
          currentSlug="/blog/freelance-marketing-consultant-selection-checklist-2025"
          category="Freelance Marketing"
        />
      </div>
      </article>
    </>
  )
}