import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, Target, Play, BarChart3, Users, Zap, Download, Calculator, BookOpen, PlayCircle, Video, Music, Hash, Sparkles, Clock, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TikTok Creative Intelligence Framework: Weekly Trend Analysis for Subscription Business Growth | Apsics Media',
  description: 'Weekly TikTok trend analysis and creative intelligence for subscription business growth. TikTok algorithm intelligence, viral content creation, and subscription-specific TikTok marketing strategy.',
  keywords: 'TikTok marketing subscription business, TikTok creative intelligence, weekly TikTok strategy, subscription TikTok marketing, TikTok algorithm intelligence, viral TikTok content creation, TikTok trend analysis subscription',
  openGraph: {
    title: 'TikTok Creative Intelligence Framework: Weekly Trend Analysis for Subscription Business Growth',
    description: 'Master TikTok creative intelligence with weekly trend analysis and subscription-specific marketing strategies.',
    type: 'article',
  },
  alternates: {
    canonical: '/tiktok-creative-intelligence-framework',
  },
};

// TikTok intelligence components
const tiktokFrameworks = [
  {
    framework: 'Algorithm Intelligence System',
    description: 'Deep understanding of TikTok algorithm patterns and ranking factors for subscription content',
    icon: Target,
    components: [
      'For You Page algorithm analysis and content optimization for maximum subscription business reach',
      'Engagement pattern recognition and timing optimization for subscription audience targeting',
      'Hashtag performance intelligence and strategic tag selection for subscription business growth',
      'Content virality prediction using algorithm signals and performance pattern analysis',
      'Creator collaboration strategies leveraging algorithm preferences and subscription business alignment'
    ],
    outcome: 'Systematic algorithm optimization with 3x higher reach and engagement rates'
  },
  {
    framework: 'Trend Intelligence & Prediction',
    description: 'Weekly trend monitoring and prediction system for proactive subscription marketing',
    icon: TrendingUp,
    components: [
      'Real-time trend detection and viral content pattern analysis for subscription business opportunities',
      'Trend lifecycle tracking and optimal entry timing for maximum subscription conversion impact',
      'Micro-trend identification and early adoption strategies for competitive subscription advantage',
      'Cross-platform trend correlation analysis connecting TikTok trends to subscription business growth',
      'Trend-to-subscription conversion optimization and strategic trend integration methodologies'
    ],
    outcome: 'Predictive trend intelligence with 5x faster trend adoption and conversion'
  },
  {
    framework: 'Native Content Creation System',
    description: 'Subscription business content creation that feels authentic and native to TikTok',
    icon: Video,
    components: [
      'Native TikTok storytelling frameworks adapted for subscription business value proposition communication',
      'Visual creative optimization using TikTok-native aesthetics and subscription business branding integration',
      'Audio strategy development leveraging trending sounds for subscription business audience engagement',
      'Creator persona development and authentic voice creation for subscription business thought leadership',
      'Content series planning and episodic storytelling for subscription business customer journey optimization'
    ],
    outcome: 'Native content creation with 4x higher engagement and subscription conversion rates'
  },
  {
    framework: 'Subscription-Specific TikTok Strategy',
    description: 'TikTok marketing strategies designed specifically for subscription business models',
    icon: Users,
    components: [
      'Subscription value demonstration through TikTok-native formats and engaging visual storytelling techniques',
      'Free trial promotion optimization using TikTok creative formats and conversion-focused call-to-action strategies',
      'Community building and subscriber retention through TikTok engagement and long-term relationship strategies',
      'User-generated content campaigns encouraging subscriber advocacy and organic subscription business promotion',
      'Customer success story amplification using TikTok formats for social proof and subscription credibility'
    ],
    outcome: 'Subscription-optimized TikTok strategy with 25% higher trial conversion rates'
  }
];

const tiktokTactics = [
  {
    tactic: 'Hook Optimization for TikTok',
    description: 'First 3-second optimization for TikTok algorithm and subscription audience retention',
    elements: ['Pattern interrupt visuals', 'Curiosity gap creation', 'Value promise delivery', 'Native TikTok aesthetic'],
    subscriptionFocus: 'Immediate value demonstration and subscription benefit clarity',
    performance: '85% retention rate through first 3 seconds'
  },
  {
    tactic: 'Trending Audio Integration',
    description: 'Strategic use of trending audio for subscription business content amplification',
    elements: ['Sound trend monitoring', 'Business message integration', 'Native adaptation', 'Engagement optimization'],
    subscriptionFocus: 'Subscription messaging integrated with viral audio trends',
    performance: '3x higher reach through trending audio leverage'
  },
  {
    tactic: 'Educational Content Series',
    description: 'Value-driven educational content establishing subscription business expertise',
    elements: ['Expert positioning', 'Value demonstration', 'Series continuity', 'Subscriber conversion'],
    subscriptionFocus: 'Educational journey leading to subscription trial and conversion',
    performance: '40% higher follower-to-subscriber conversion rates'
  },
  {
    tactic: 'Behind-the-Scenes Content',
    description: 'Authentic behind-the-scenes content building subscription business trust',
    elements: ['Authenticity demonstration', 'Company culture', 'Product development', 'Team personality'],
    subscriptionFocus: 'Trust building and subscription business humanization',
    performance: '60% increase in brand trust and subscription consideration'
  },
  {
    tactic: 'Challenge & UGC Campaigns',
    description: 'User-generated content campaigns driving subscription business community engagement',
    elements: ['Challenge creation', 'Community participation', 'Subscriber advocacy', 'Viral mechanics'],
    subscriptionFocus: 'Subscriber community building and organic subscription promotion',
    performance: '250% increase in user-generated subscription business content'
  }
];

export default function TikTokCreativeIntelligenceFramework() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "TikTok Creative Intelligence Framework: Weekly Trend Analysis for Subscription Business Growth",
            "description": "Master TikTok creative intelligence with weekly trend analysis and subscription-specific marketing strategies.",
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
              "@id": "https://apsicsmedia.com/tiktok-creative-intelligence-framework"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Play className="h-4 w-4 mr-2" />
              TIKTOK CREATIVE INTELLIGENCE
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              TikTok Creative Intelligence Framework
            </h1>
            
            <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto">
              Master TikTok algorithm intelligence and viral content creation for subscription business growth. 
              Weekly trend analysis, native content strategies, and subscription-optimized TikTok marketing.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-pink-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">5x Faster</div>
                <div className="text-pink-200 text-sm">Trend adoption speed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Video className="h-8 w-8 text-pink-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">4x Higher</div>
                <div className="text-pink-200 text-sm">Engagement rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-8 w-8 text-pink-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">25% Increase</div>
                <div className="text-pink-200 text-sm">Trial conversion rates</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#tiktok-framework"
                className="bg-white text-pink-600 hover:bg-pink-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore TikTok Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="#implementation"
                className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Start Implementation
                <PlayCircle className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TikTok Opportunity Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why TikTok is Critical for Subscription Business Growth
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                TikTok's algorithm democratizes content discovery, allowing subscription businesses 
                to reach massive audiences without traditional advertising budgets. With 1 billion+ 
                monthly active users and the highest engagement rates of any platform, TikTok represents 
                unprecedented opportunity for subscription customer acquisition.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Algorithm Advantage</h3>
                  <p className="text-gray-600 text-sm">
                    TikTok's For You Page algorithm amplifies high-engagement content regardless 
                    of follower count, enabling subscription businesses to achieve viral reach organically.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Audience Engagement</h3>
                  <p className="text-gray-600 text-sm">
                    TikTok users spend 95 minutes daily on the platform with engagement rates 
                    3x higher than Instagram, creating optimal conditions for subscription conversion.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Conversion Velocity</h3>
                  <p className="text-gray-600 text-sm">
                    TikTok's short-form format enables rapid value demonstration and immediate 
                    conversion opportunities ideal for subscription business trial-to-paid optimization.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  TikTok's Subscription Business Advantages
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Organic Reach Potential</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Algorithm-driven content discovery independent of follower count</li>
                      <li>• Viral content amplification with exponential subscription business reach</li>
                      <li>• Cross-demographic audience expansion beyond traditional subscription targets</li>
                      <li>• Cost-effective customer acquisition through organic viral mechanics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Engagement & Conversion Benefits</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• High-intent audience engagement with subscription-focused content</li>
                      <li>• Native format integration enabling authentic subscription value demonstration</li>
                      <li>• Community building and subscriber retention through platform engagement</li>
                      <li>• User-generated content amplification for subscription business social proof</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TikTok Intelligence Framework */}
      <section id="tiktok-framework" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              4-Framework TikTok Creative Intelligence System
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Comprehensive TikTok intelligence system designed specifically for subscription businesses. 
              Each framework provides systematic approach to TikTok success and subscription growth.
            </p>
            
            <div className="space-y-8">
              {tiktokFrameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                      <framework.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{framework.framework}</h3>
                      <p className="text-gray-700 mb-4">{framework.description}</p>
                      <div className="bg-green-50 px-3 py-2 rounded-full inline-block">
                        <span className="text-green-700 font-semibold text-sm">{framework.outcome}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-22">
                    <h4 className="font-semibold text-gray-900 mb-3">Framework Components:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {framework.components.map((component, componentIndex) => (
                        <div key={componentIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
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

      {/* TikTok Tactics & Strategies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              5 High-Performance TikTok Tactics for Subscription Businesses
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Proven TikTok tactics specifically optimized for subscription business growth and conversion. 
              Each tactic integrates subscription messaging with native TikTok engagement strategies.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {tiktokTactics.map((tactic, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
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
                          <span key={elementIndex} className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Subscription Focus:</div>
                      <div className="text-xs text-gray-700">{tactic.subscriptionFocus}</div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-green-800">Performance Impact:</div>
                      <div className="text-xs text-green-700">{tactic.performance}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Implementation */}
      <section id="implementation" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Weekly TikTok Intelligence Implementation
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 text-center">
                Systematic weekly workflow for TikTok creative intelligence and subscription business optimization. 
                Each week builds comprehensive TikTok understanding and subscription conversion capability.
              </p>
              
              <div className="timeline-container mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      MON
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Trend Intelligence & Algorithm Analysis</h4>
                      <p className="text-gray-600 text-sm">
                        Weekly trend monitoring, viral content analysis, and algorithm pattern recognition 
                        for subscription business opportunity identification and strategic planning.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      TUE
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Content Strategy Development & Creative Planning</h4>
                      <p className="text-gray-600 text-sm">
                        Strategic content planning based on trend intelligence with subscription business 
                        messaging integration and native TikTok format optimization.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      WED
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Content Creation & Production Optimization</h4>
                      <p className="text-gray-600 text-sm">
                        Native TikTok content creation with subscription business value integration, 
                        trending audio utilization, and algorithm optimization techniques.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      THU
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Performance Analysis & Optimization</h4>
                      <p className="text-gray-600 text-sm">
                        TikTok performance analysis with subscription conversion tracking, 
                        engagement optimization, and algorithm feedback integration.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      FRI
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Strategic Intelligence Synthesis & Planning</h4>
                      <p className="text-gray-600 text-sm">
                        Weekly intelligence report compilation with strategic recommendations, 
                        subscription business growth insights, and next week's TikTok strategy development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly TikTok Intelligence Deliverables</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Creative Intelligence Report</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Trending content analysis with subscription business application</li>
                      <li>• Algorithm pattern insights and optimization recommendations</li>
                      <li>• Viral mechanics identification and strategic integration guidance</li>
                      <li>• Competitive TikTok analysis and positioning opportunities</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Subscription Optimization Strategy</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• TikTok-to-subscription conversion optimization strategies</li>
                      <li>• Community building and subscriber engagement tactics</li>
                      <li>• User-generated content campaign recommendations</li>
                      <li>• Cross-platform integration and omnichannel optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              TikTok Success Metrics for Subscription Businesses
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Reach & Discovery</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• For You Page impressions</li>
                  <li>• Hashtag challenge participation</li>
                  <li>• Viral content amplification</li>
                  <li>• Cross-demographic reach</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Engagement & Community</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Engagement rate optimization</li>
                  <li>• Comment quality and response</li>
                  <li>• Share and save metrics</li>
                  <li>• Follower growth velocity</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Subscription Conversion</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• TikTok-to-trial conversion</li>
                  <li>• Link-in-bio click rates</li>
                  <li>• Subscription attribution</li>
                  <li>• Customer lifetime value</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Master TikTok Creative Intelligence
            </h2>
            
            <p className="text-xl text-pink-100 mb-8 max-w-3xl mx-auto">
              Transform TikTok into your subscription business growth engine. 
              Access algorithm intelligence, trend prediction, and conversion optimization strategies.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-pink-200 mx-auto mb-2" />
                <div className="font-semibold">5x Faster</div>
                <div className="text-pink-200 text-sm">Trend adoption</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Video className="h-8 w-8 text-pink-200 mx-auto mb-2" />
                <div className="font-semibold">4x Higher</div>
                <div className="text-pink-200 text-sm">Engagement rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-8 w-8 text-pink-200 mx-auto mb-2" />
                <div className="font-semibold">25% Increase</div>
                <div className="text-pink-200 text-sm">Trial conversions</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-pink-600 hover:bg-pink-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get TikTok Framework
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <Link
                href="/#service-tiers"
                className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Intelligence Plans
                <Play className="h-5 w-5 ml-2" />
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
              Related Platform Intelligence Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/facebook-ad-creative-intelligence-system"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Facebook Ad Creative Intelligence</h3>
                <p className="text-sm text-gray-600">
                  Weekly optimization framework for subscription business Facebook advertising
                </p>
              </Link>
              
              <Link 
                href="/linkedin-creative-intelligence-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">LinkedIn Creative Intelligence</h3>
                <p className="text-sm text-gray-600">
                  B2B subscription marketing weekly framework for LinkedIn professional targeting
                </p>
              </Link>
              
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-pink-600" />
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