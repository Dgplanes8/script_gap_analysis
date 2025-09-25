import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, Target, Linkedin, BarChart3, Users, Zap, Download, Calculator, BookOpen, PlayCircle, Building, UserCheck, MessageCircle, Award, Briefcase, Network } from 'lucide-react';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'LinkedIn Creative Intelligence Framework: B2B Subscription Marketing Weekly Framework | Apsics Media',
  description: 'LinkedIn creative intelligence and weekly optimization framework for B2B subscription businesses. Professional audience targeting, LinkedIn creative strategy, and subscription-focused LinkedIn marketing.',
  keywords: 'LinkedIn B2B subscription marketing, LinkedIn creative intelligence, weekly LinkedIn strategy, B2B LinkedIn marketing, LinkedIn subscription strategy, professional audience targeting, LinkedIn content strategy',
  openGraph: {
    title: 'LinkedIn Creative Intelligence Framework: B2B Subscription Marketing Weekly Framework',
    description: 'Master LinkedIn creative intelligence with B2B subscription marketing weekly framework and professional audience targeting.',
    type: 'article',
  },
  alternates: {
    canonical: '/linkedin-creative-intelligence-framework',
  },
};

// LinkedIn intelligence frameworks
const linkedinFrameworks = [
  {
    framework: 'Professional Audience Intelligence',
    description: 'Advanced targeting and audience analysis for B2B subscription marketing on LinkedIn',
    icon: Users,
    components: [
      'Professional demographic analysis and B2B subscription customer profiling for precise LinkedIn audience targeting',
      'Industry-specific targeting optimization including SaaS, technology, and subscription business verticals',
      'Job title and company size intelligence for subscription business decision-maker identification and engagement',
      'Engagement pattern analysis across professional networks and subscription business communities on LinkedIn',
      'Content preference mapping for different professional audiences and subscription business stakeholder groups'
    ],
    outcome: 'Precision professional targeting with 60% higher B2B subscription conversion rates'
  },
  {
    framework: 'B2B Content Strategy Intelligence',
    description: 'Strategic content development for LinkedIn professional engagement and subscription conversion',
    icon: MessageCircle,
    components: [
      'Professional content format optimization including LinkedIn native formats and subscription business storytelling',
      'Thought leadership content development establishing subscription business expertise and industry authority',
      'Employee advocacy strategy leveraging team expertise for subscription business credibility and reach',
      'Industry trend integration and professional insight sharing for subscription business positioning',
      'Educational content series development connecting professional challenges to subscription solutions'
    ],
    outcome: 'Professional content strategy with 45% higher engagement and subscription lead generation'
  },
  {
    framework: 'LinkedIn Campaign Intelligence',
    description: 'Advanced LinkedIn advertising strategy and creative optimization for subscription businesses',
    icon: Target,
    components: [
      'Sponsored content optimization including LinkedIn feed advertising and subscription-focused messaging strategies',
      'LinkedIn Lead Generation Forms optimization for subscription business trial conversion and lead capture',
      'InMail campaign development with personalized subscription business outreach and conversion optimization',
      'Video content strategy leveraging LinkedIn native video for subscription business demonstration and engagement',
      'Event promotion and webinar marketing integration for subscription business authority building'
    ],
    outcome: 'LinkedIn campaign optimization with 35% lower cost-per-lead and higher subscription conversion'
  },
  {
    framework: 'Professional Network Analysis',
    description: 'Competitive intelligence and network analysis for B2B subscription market positioning',
    icon: Network,
    components: [
      'Competitor LinkedIn strategy analysis including content performance and professional engagement tactics',
      'Industry influencer identification and relationship building for subscription business thought leadership',
      'Professional community engagement strategies for subscription business network expansion',
      'LinkedIn Company Page optimization for subscription business authority and professional credibility',
      'Partnership opportunity identification through professional network analysis and strategic connection building'
    ],
    outcome: 'Professional network intelligence with strategic positioning advantages and partnership opportunities'
  }
];

const linkedinTactics = [
  {
    tactic: 'Professional Thought Leadership',
    description: 'Establishing subscription business expertise through strategic thought leadership content',
    elements: ['Industry insights', 'Expert positioning', 'Professional storytelling', 'Authority building'],
    b2bFocus: 'Subscription business expertise demonstration and professional credibility establishment',
    performance: '70% increase in professional engagement, 40% higher lead quality'
  },
  {
    tactic: 'Employee Advocacy Amplification',
    description: 'Leveraging team expertise for authentic subscription business promotion and reach',
    elements: ['Team storytelling', 'Authentic advocacy', 'Professional networks', 'Credibility building'],
    b2bFocus: 'Authentic subscription business promotion through employee professional networks',
    performance: '3x organic reach expansion, 50% higher engagement authenticity'
  },
  {
    tactic: 'Professional Community Engagement',
    description: 'Strategic participation in LinkedIn professional groups and industry communities',
    elements: ['Community leadership', 'Value contribution', 'Network building', 'Industry authority'],
    b2bFocus: 'Subscription business positioning within professional communities and industry networks',
    performance: '250% increase in professional network connections and industry recognition'
  },
  {
    tactic: 'LinkedIn Native Video Strategy',
    description: 'Professional video content leveraging LinkedIn native video capabilities',
    elements: ['Professional storytelling', 'Educational content', 'Behind-the-scenes', 'Expert interviews'],
    b2bFocus: 'Subscription business value demonstration through professional video storytelling',
    performance: '80% higher engagement rates, 60% better subscription trial conversion'
  },
  {
    tactic: 'Strategic LinkedIn Advertising',
    description: 'Advanced LinkedIn advertising strategy for B2B subscription customer acquisition',
    elements: ['Precision targeting', 'Professional messaging', 'Lead generation', 'Conversion optimization'],
    b2bFocus: 'B2B subscription customer acquisition through professional advertising and targeting',
    performance: '35% lower cost-per-lead, 45% higher subscription conversion rates'
  }
];

const weeklyOptimization = [
  {
    day: 'Monday',
    focus: 'Professional Audience Analysis & LinkedIn Intelligence',
    activities: [
      'Weekly LinkedIn audience performance analysis with B2B subscription customer behavior insights',
      'Professional engagement pattern analysis and subscription business content performance review',
      'Competitor LinkedIn activity monitoring and professional positioning analysis for strategic intelligence',
      'Industry trend identification and professional insight gathering for thought leadership content development'
    ]
  },
  {
    day: 'Tuesday',
    focus: 'Content Strategy Development & Professional Messaging',
    activities: [
      'Professional content calendar planning with subscription business messaging and industry trend integration',
      'Thought leadership content development based on professional audience insights and market intelligence',
      'Employee advocacy content creation and team storytelling for authentic subscription business promotion',
      'LinkedIn video content planning with professional storytelling and subscription value demonstration'
    ]
  },
  {
    day: 'Wednesday',
    focus: 'Campaign Implementation & Professional Advertising',
    activities: [
      'LinkedIn advertising campaign optimization with professional targeting and subscription business messaging',
      'Sponsored content implementation including LinkedIn native formats and subscription-focused creative',
      'Lead generation form optimization for subscription business trial conversion and professional lead capture',
      'Professional community engagement and strategic networking for subscription business positioning'
    ]
  },
  {
    day: 'Thursday',
    focus: 'Performance Analysis & Professional Engagement Optimization',
    activities: [
      'LinkedIn campaign performance analysis with professional engagement and subscription conversion tracking',
      'Content performance evaluation including professional audience engagement and thought leadership impact',
      'Employee advocacy performance measurement and team contribution analysis for subscription business reach',
      'Professional network analysis and connection quality assessment for strategic relationship building'
    ]
  },
  {
    day: 'Friday',
    focus: 'Strategic Intelligence & Professional Network Expansion',
    activities: [
      'Weekly LinkedIn intelligence report compilation with professional audience insights and strategic recommendations',
      'Competitive analysis synthesis and professional positioning optimization for subscription business advantage',
      'Partnership opportunity identification and professional relationship building for strategic network expansion',
      'Next week strategic planning with professional audience targeting and subscription business objectives'
    ]
  }
];

export default function LinkedInCreativeIntelligenceFramework() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "LinkedIn Creative Intelligence Framework: B2B Subscription Marketing Weekly Framework",
            "description": "Master LinkedIn creative intelligence with B2B subscription marketing weekly framework and professional audience targeting.",
            "author": {
              "@type": "Organization",
              "name": "Apsics Media"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Apsics Media",
              "logo": {
                "@type": "ImageObject",
                "url": "https://apsicsmedia.com/images/logo.png"
              }
            },
            "datePublished": "2025-01-20",
            "dateModified": "2025-01-20",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://apsicsmedia.com/linkedin-creative-intelligence-framework"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Linkedin className="h-4 w-4 mr-2" />
              LINKEDIN B2B INTELLIGENCE
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              LinkedIn Creative Intelligence Framework
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              B2B subscription marketing weekly framework for LinkedIn professional targeting. 
              Professional audience intelligence, thought leadership development, and subscription-focused LinkedIn strategy.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">60% Higher</div>
                <div className="text-blue-200 text-sm">B2B conversion rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">35% Lower</div>
                <div className="text-blue-200 text-sm">Cost-per-lead</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <MessageCircle className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">45% Higher</div>
                <div className="text-blue-200 text-sm">Professional engagement</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#linkedin-framework"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore LinkedIn Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="#weekly-optimization"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Weekly Process
                <PlayCircle className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* B2B LinkedIn Opportunity */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why LinkedIn Dominates B2B Subscription Marketing
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                LinkedIn remains the definitive platform for B2B subscription marketing with 900+ million 
                professionals and the highest intent audiences for business solutions. With advanced targeting 
                capabilities and professional context, LinkedIn drives superior conversion rates for subscription businesses.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Professional Context</h3>
                  <p className="text-gray-600 text-sm">
                    LinkedIn provides professional context essential for B2B subscription marketing, 
                    enabling precise targeting of decision-makers and subscription budget holders.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">High-Intent Audience</h3>
                  <p className="text-gray-600 text-sm">
                    Professional LinkedIn users demonstrate high purchase intent for business solutions, 
                    making it ideal for subscription business customer acquisition and conversion.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Authority Building</h3>
                  <p className="text-gray-600 text-sm">
                    LinkedIn enables subscription businesses to establish thought leadership and 
                    professional authority essential for B2B trust and conversion optimization.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  LinkedIn's B2B Subscription Advantages
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional Targeting Precision</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Job title and seniority targeting for subscription decision-maker identification</li>
                      <li>• Company size and industry filtering for precise B2B subscription audience segmentation</li>
                      <li>• Skills and interest targeting enabling subscription solution alignment with professional needs</li>
                      <li>• Account-based marketing capabilities for enterprise subscription customer targeting</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional Content & Engagement</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Thought leadership content positioning for subscription business authority building</li>
                      <li>• Professional networking and relationship building for subscription business growth</li>
                      <li>• Employee advocacy amplification through professional networks and industry connections</li>
                      <li>• Industry-specific content distribution for subscription business market penetration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Intelligence Framework */}
      <section id="linkedin-framework" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              4-Framework LinkedIn B2B Intelligence System
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Comprehensive LinkedIn intelligence system designed specifically for B2B subscription marketing. 
              Each framework provides systematic approach to LinkedIn success and professional audience engagement.
            </p>
            
            <div className="space-y-8">
              {linkedinFrameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                      <framework.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{framework.framework}</h3>
                      <p className="text-gray-700 mb-4">{framework.description}</p>
                      <div className="bg-brand-50 px-3 py-2 rounded-full inline-block">
                        <span className="text-brand-700 font-semibold text-sm">{framework.outcome}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-22">
                    <h4 className="font-semibold text-gray-900 mb-3">Framework Components:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {framework.components.map((component, componentIndex) => (
                        <div key={componentIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{component}</span>
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

      {/* LinkedIn B2B Tactics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              5 High-Performance LinkedIn Tactics for B2B Subscription Businesses
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Proven LinkedIn tactics specifically optimized for B2B subscription business growth and professional engagement. 
              Each tactic integrates subscription messaging with LinkedIn's professional capabilities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {linkedinTactics.slice(0, 4).map((tactic, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{tactic.tactic}</h3>
                      <p className="text-sm text-gray-600">{tactic.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Key Elements:</div>
                      <div className="flex flex-wrap gap-1">
                        {tactic.elements.map((element, elementIndex) => (
                          <span key={elementIndex} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-gray-900 mb-1">B2B Subscription Focus:</div>
                      <div className="text-xs text-gray-700">{tactic.b2bFocus}</div>
                    </div>
                    
                    <div className="bg-brand-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-brand-800">Performance Impact:</div>
                      <div className="text-xs text-brand-700">{tactic.performance}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Fifth tactic spans full width */}
            <div className="mt-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{linkedinTactics[4].tactic}</h3>
                    <p className="text-sm text-gray-600">{linkedinTactics[4].description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">Key Elements:</div>
                    <div className="flex flex-wrap gap-1">
                      {linkedinTactics[4].elements.map((element, elementIndex) => (
                        <span key={elementIndex} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-semibold text-gray-900 mb-1">B2B Subscription Focus:</div>
                    <div className="text-xs text-gray-700">{linkedinTactics[4].b2bFocus}</div>
                  </div>
                  
                  <div className="bg-brand-50 rounded-lg p-3">
                    <div className="text-sm font-semibold text-brand-800">Performance Impact:</div>
                    <div className="text-xs text-brand-700">{linkedinTactics[4].performance}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly LinkedIn Optimization */}
      <section id="weekly-optimization" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Weekly LinkedIn Intelligence Optimization Cycle
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Systematic weekly optimization process for LinkedIn B2B marketing and subscription business growth. 
                Each day focuses on specific LinkedIn optimization activities for continuous professional engagement improvement.
              </p>
              
              <div className="space-y-6">
                {weeklyOptimization.map((day, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                        {day.day.slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{day.focus}</h3>
                        <p className="text-sm text-gray-600">Strategic focus for {day.day} LinkedIn optimization activities</p>
                      </div>
                    </div>
                    
                    <div className="ml-16">
                      <div className="grid md:grid-cols-2 gap-3">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly LinkedIn Intelligence Deliverables</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Professional Performance Intelligence</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• LinkedIn audience performance analysis with B2B subscription customer behavior tracking</li>
                      <li>• Professional content engagement analysis and thought leadership impact measurement</li>
                      <li>• Competitor LinkedIn activity analysis and professional positioning intelligence</li>
                      <li>• Employee advocacy performance assessment and team contribution optimization</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Strategic B2B Recommendations</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Professional audience targeting optimization for B2B subscription customer acquisition</li>
                      <li>• Content strategy adjustments based on LinkedIn performance and professional engagement</li>
                      <li>• LinkedIn advertising optimization recommendations for cost-per-lead reduction</li>
                      <li>• Professional network expansion strategies and partnership opportunity identification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Professional Ecosystem */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              LinkedIn Professional Ecosystem Strategy
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Personal Branding</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Executive Thought Leadership</h4>
                    <p className="text-xs text-gray-600">CEO and leadership team positioning for subscription business authority</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Employee Advocacy</h4>
                    <p className="text-xs text-gray-600">Team member advocacy amplifying subscription business reach</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Industry Expert Positioning</h4>
                    <p className="text-xs text-gray-600">Professional expertise demonstration for subscription business credibility</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Building className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Company Page Strategy</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Professional Content Distribution</h4>
                    <p className="text-xs text-gray-600">Company-wide content strategy for subscription business visibility</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Employer Branding</h4>
                    <p className="text-xs text-gray-600">Talent attraction and company culture showcase for subscription business growth</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Customer Success Stories</h4>
                    <p className="text-xs text-gray-600">B2B subscription success case studies and professional testimonials</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Master LinkedIn B2B Creative Intelligence
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform LinkedIn into your B2B subscription growth engine. 
              Access professional audience intelligence, thought leadership strategies, and conversion optimization.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">60% Higher</div>
                <div className="text-blue-200 text-sm">B2B conversions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">35% Lower</div>
                <div className="text-blue-200 text-sm">Cost-per-lead</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <MessageCircle className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">45% Higher</div>
                <div className="text-blue-200 text-sm">Professional engagement</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get LinkedIn Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <FreeWeekButton source="linkedin_creative_intelligence_framework-cta" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center">Claim 10 Free Credits</FreeWeekButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Professional Intelligence Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/tiktok-creative-intelligence-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">TikTok Creative Intelligence Framework</h3>
                <p className="text-sm text-gray-600">
                  Weekly trend analysis and creative intelligence for subscription business growth
                </p>
              </Link>
              
              <Link 
                href="/facebook-ad-creative-intelligence-system"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Facebook Ad Creative Intelligence</h3>
                <p className="text-sm text-gray-600">
                  Weekly optimization framework for subscription business Facebook advertising
                </p>
              </Link>
              
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Creative Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Complete methodology for systematic creative development across all platforms
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
