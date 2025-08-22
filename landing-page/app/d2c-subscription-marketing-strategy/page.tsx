import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Users, Heart, Brain, ShoppingCart, TrendingUp, Target, Zap, CheckCircle, AlertTriangle, Clock, Award, Eye, ArrowUpRight, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'D2C Subscription Marketing Strategy: Consumer Psychology & Weekly Intelligence Framework | Apsics Media',
  description: 'Master D2C subscription marketing with consumer psychology insights and weekly creative intelligence. Strategic framework for direct-to-consumer subscription businesses.',
  keywords: 'D2C subscription marketing, consumer subscription strategy, weekly creative development, D2C growth marketing, consumer psychology marketing, direct-to-consumer subscription',
  openGraph: {
    title: 'D2C Subscription Marketing Strategy: Consumer Psychology & Weekly Intelligence Framework',
    description: 'Master D2C subscription marketing with consumer psychology insights and weekly creative intelligence. Strategic framework for direct-to-consumer subscription businesses.',
    type: 'article',
  },
  alternates: {
    canonical: '/d2c-subscription-marketing-strategy',
  },
};

// D2C vs B2B comparison data
const d2cVsB2bComparison = [
  {
    dimension: 'Purchase Decision Cycle',
    d2c: 'Impulse to 48 hours',
    b2b: '3-12 months',
    implication: 'D2C requires immediate emotional connection and instant value demonstration'
  },
  {
    dimension: 'Decision Maker',
    d2c: 'Individual consumer',
    b2b: 'Committee/stakeholders',
    implication: 'Personal benefits and emotional triggers drive D2C conversion'
  },
  {
    dimension: 'Value Communication',
    d2c: 'Lifestyle improvement',
    b2b: 'Business ROI metrics',
    implication: 'D2C messaging focuses on personal transformation and status'
  },
  {
    dimension: 'Pricing Psychology',
    d2c: 'Price anchoring & perceived value',
    b2b: 'Cost justification & ROI',
    implication: 'D2C pricing strategy emphasizes value perception over cost analysis'
  },
  {
    dimension: 'Content Marketing',
    d2c: 'Entertainment & inspiration',
    b2b: 'Education & expertise',
    implication: 'D2C content must be immediately engaging and shareable'
  },
  {
    dimension: 'Customer Acquisition',
    d2c: 'Social proof & FOMO',
    b2b: 'Authority & credibility',
    implication: 'D2C growth relies heavily on virality and social validation'
  }
];

// Consumer psychology frameworks
const consumerPsychologyFrameworks = [
  {
    framework: 'Hierarchy of Needs Application',
    description: 'Mapping subscription value to Maslow\'s hierarchy for consumer positioning',
    levels: [
      { need: 'Self-Actualization', example: 'Creative platforms, skill development apps', message: 'Become your best self' },
      { need: 'Esteem', example: 'Premium lifestyle subscriptions', message: 'Join an exclusive community' },
      { need: 'Love/Belonging', example: 'Social fitness apps, dating platforms', message: 'Connect with like-minded people' },
      { need: 'Safety', example: 'Security software, health monitoring', message: 'Protect what matters most' },
      { need: 'Physiological', example: 'Meal delivery, wellness apps', message: 'Essential for your daily life' }
    ]
  },
  {
    framework: 'Consumer Decision Journey',
    description: 'Weekly intelligence optimization for each stage of consumer decision-making',
    stages: [
      { stage: 'Trigger', focus: 'Problem awareness creation', tactics: 'Social listening, trending topics', intelligence: 'Weekly cultural moment analysis' },
      { stage: 'Initial Consideration', focus: 'Brand discovery optimization', tactics: 'SEO, social presence', intelligence: 'Search and social trend monitoring' },
      { stage: 'Active Evaluation', focus: 'Comparison and social proof', tactics: 'Reviews, testimonials, trials', intelligence: 'Competitor analysis and positioning' },
      { stage: 'Moment of Purchase', focus: 'Conversion optimization', tactics: 'Urgency, scarcity, incentives', intelligence: 'Weekly offer performance analysis' },
      { stage: 'Post-Purchase', focus: 'Experience and loyalty', tactics: 'Onboarding, engagement, community', intelligence: 'Retention and satisfaction tracking' }
    ]
  }
];

// D2C-specific optimization strategies
const d2cOptimizationStrategies = [
  {
    category: 'Emotional Positioning',
    focus: 'Building emotional brand connection',
    strategies: [
      'Identity-Based Messaging: Position subscription as part of customer\'s identity',
      'Aspiration Ladder: Show progression from current state to desired identity',
      'Community Belonging: Create sense of exclusive membership and belonging',
      'Lifestyle Integration: Demonstrate seamless fit into customer\'s daily routine'
    ],
    weeklyIntelligence: [
      'Monitor social sentiment and cultural conversations',
      'Track lifestyle trend adoption and abandonment cycles',
      'Analyze competitor emotional positioning shifts',
      'Identify emerging identity markers in target demographics'
    ],
    expectedImpact: '35-50% improvement in brand affinity and consideration'
  },
  {
    category: 'Social Proof Amplification',
    focus: 'Leveraging social validation for conversion',
    strategies: [
      'User-Generated Content Strategy: Systematic collection and curation',
      'Micro-Influencer Network: Authentic endorsements from relevant creators',
      'Social Commerce Integration: Direct social media to subscription conversion',
      'Review and Rating Optimization: Strategic collection and display'
    ],
    weeklyIntelligence: [
      'UGC performance analysis and trending content identification',
      'Influencer performance tracking and new talent scouting',
      'Social platform algorithm changes and optimization opportunities',
      'Review sentiment analysis and improvement area identification'
    ],
    expectedImpact: '25-40% increase in conversion rates through social validation'
  },
  {
    category: 'Mobile-First Experience',
    focus: 'Optimizing for mobile-centric consumer behavior',
    strategies: [
      'Mobile Conversion Funnel: Streamlined mobile subscription process',
      'App Store Optimization: Discovery and conversion in app ecosystems',
      'Social Media Integration: Seamless flow from social to subscription',
      'Mobile Payment Optimization: Frictionless payment experiences'
    ],
    weeklyIntelligence: [
      'Mobile user behavior analysis and friction point identification',
      'App store ranking and conversion optimization',
      'Social platform mobile performance tracking',
      'Payment method performance and abandonment analysis'
    ],
    expectedImpact: '30-45% improvement in mobile conversion rates'
  }
];

// Platform-specific D2C strategies
const platformStrategies = [
  {
    platform: 'TikTok',
    audience: 'Gen Z & Younger Millennials',
    strengths: 'Viral potential, authentic content, trend creation',
    d2cApproach: {
      contentStrategy: 'Behind-the-scenes, user transformations, trending challenges',
      creativeFormats: 'Native transitions, before/after reveals, lifestyle integration',
      communityBuilding: 'Hashtag challenges, duet chains, creator partnerships',
      conversionTactics: 'Link in bio optimization, TikTok Shop integration, exclusive offers'
    },
    weeklyIntelligence: 'Trending audio, viral formats, algorithm changes, competitor content analysis',
    expectedResults: '60-85% engagement rates, 40%+ conversion improvement'
  },
  {
    platform: 'Instagram',
    audience: 'Millennials & Gen X',
    strengths: 'Visual storytelling, lifestyle aspiration, shopping integration',
    d2cApproach: {
      contentStrategy: 'Aesthetic lifestyle content, Stories progression, IGTV deep-dives',
      creativeFormats: 'Carousel testimonials, Reels transformations, Stories sequences',
      communityBuilding: 'Instagram Shopping, close friends content, live Q&As',
      conversionTactics: 'Shopping tags, swipe-up links, exclusive Story offers'
    },
    weeklyIntelligence: 'Aesthetic trends, hashtag performance, shopping feature updates, influencer partnerships',
    expectedResults: '25-40% engagement improvement, 35%+ shopping conversion lift'
  },
  {
    platform: 'Pinterest',
    audience: 'Female millennials planning purchases',
    strengths: 'Purchase intent, long-term discovery, lifestyle planning',
    d2cApproach: {
      contentStrategy: 'Solution-focused pins, lifestyle boards, seasonal planning',
      creativeFormats: 'Before/after pins, infographic benefits, lifestyle mood boards',
      communityBuilding: 'Community boards, seasonal collections, trend forecasting',
      conversionTactics: 'Shopping pins, try-on features, seasonal campaigns'
    },
    weeklyIntelligence: 'Seasonal trends, search query analysis, shopping behavior shifts, competitor pin performance',
    expectedResults: '200%+ organic reach improvement, 50%+ click-through rates'
  }
];

// Consumer subscription lifecycle optimization
const lifecycleOptimization = [
  {
    stage: 'Awareness',
    duration: '0-7 days',
    objective: 'Problem recognition and brand discovery',
    d2cTactics: [
      'Cultural moment marketing and trending topic integration',
      'Influencer seeding for authentic product discovery',
      'Social listening and community engagement',
      'Educational content addressing lifestyle pain points'
    ],
    weeklyIntelligence: 'Trending topics, cultural conversations, competitor campaigns, audience sentiment shifts',
    kpis: ['Brand awareness lift', 'Social mention increase', 'Organic traffic growth'],
    optimizationTarget: '40-60% awareness increase through cultural relevance'
  },
  {
    stage: 'Consideration',
    duration: '1-14 days',
    objective: 'Brand evaluation and social proof validation',
    d2cTactics: [
      'User-generated content showcasing and amplification',
      'Micro-influencer authentic endorsements and reviews',
      'Social proof optimization across all touchpoints',
      'Comparison content addressing alternative solutions'
    ],
    weeklyIntelligence: 'UGC performance analysis, influencer partnership results, competitor positioning shifts',
    kpis: ['Engagement rates', 'UGC volume', 'Social proof interactions'],
    optimizationTarget: '50-75% engagement improvement through social validation'
  },
  {
    stage: 'Trial/Purchase',
    duration: '1-3 days',
    objective: 'Conversion optimization and friction reduction',
    d2cTactics: [
      'Mobile-optimized subscription flow with social login',
      'Limited-time offers creating urgency and FOMO',
      'Social payment options and one-click subscriptions',
      'Trust signals and security reassurance'
    ],
    weeklyIntelligence: 'Conversion funnel analysis, checkout abandonment insights, payment method performance',
    kpis: ['Conversion rates', 'Checkout completion', 'Payment success rates'],
    optimizationTarget: '30-50% conversion rate improvement through friction reduction'
  },
  {
    stage: 'Onboarding',
    duration: '1-30 days',
    objective: 'Value realization and habit formation',
    d2cTactics: [
      'Progressive value revelation and feature discovery',
      'Personalization based on consumer preferences and behavior',
      'Community integration and social connection facilitation',
      'Gamification elements for engagement and retention'
    ],
    weeklyIntelligence: 'Onboarding completion rates, feature adoption analysis, engagement pattern tracking',
    kpis: ['Onboarding completion', 'Feature adoption', 'Early retention rates'],
    optimizationTarget: '60-80% improvement in onboarding completion and value realization'
  }
];

// Case studies
const caseStudies = [
  {
    brand: 'Wellness Subscription Box',
    category: 'Health & Wellness D2C',
    challenge: 'Competing with established wellness brands, high CAC on traditional channels, low brand awareness',
    d2cStrategy: [
      'TikTok wellness transformation content with authentic user stories',
      'Micro-influencer partnerships with certified wellness coaches',
      'Pinterest lifestyle board integration showing subscription integration',
      'Instagram Stories progressive value revelation campaigns'
    ],
    results: {
      timeframe: '6 months',
      metrics: [
        '147% increase in organic social reach',
        '68% reduction in customer acquisition cost',
        '89% improvement in brand awareness among target demographic',
        '234% increase in user-generated content volume'
      ],
      businessImpact: [
        'Monthly recurring revenue: +156%',
        'Customer lifetime value: +43%',
        'Organic growth rate: +278%',
        'Social commerce conversion: +91%'
      ]
    },
    quote: "Shifting from traditional advertising to authentic social storytelling transformed our business. We built a community, not just a customer base."
  },
  {
    brand: 'Productivity App Subscription',
    category: 'Digital Lifestyle D2C',
    challenge: 'Freemium conversion plateau, high churn rates, difficulty differentiating from free alternatives',
    d2cStrategy: [
      'Identity-based messaging positioning app as productivity lifestyle choice',
      'User success story amplification across social platforms',
      'Community-driven feature development and social proof',
      'Progressive value ladder from free to premium features'
    ],
    results: {
      timeframe: '4 months',
      metrics: [
        '92% improvement in free-to-paid conversion',
        '56% reduction in churn rate within first 30 days',
        '73% increase in average revenue per user',
        '134% growth in active community engagement'
      ],
      businessImpact: [
        'Annual recurring revenue: +189%',
        'Net promoter score: +67 points',
        'Organic user acquisition: +245%',
        'Premium feature adoption: +156%'
      ]
    },
    quote: "Understanding our users as people with aspirations, not just productivity needs, revolutionized our marketing approach and business results."
  }
];

export default function D2CSubscriptionMarketingStrategy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "D2C Subscription Marketing Strategy: Consumer Psychology & Weekly Intelligence Framework",
            "description": "Master D2C subscription marketing with consumer psychology insights and weekly creative intelligence. Strategic framework for direct-to-consumer subscription businesses.",
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
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Heart className="h-4 w-4 mr-2" />
              D2C SUBSCRIPTION MARKETING STRATEGY
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              D2C Subscription Marketing Strategy
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Master direct-to-consumer subscription marketing with consumer psychology insights 
              and weekly creative intelligence. Strategic framework for lifestyle-driven growth.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 text-purple-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">Psychology-Driven</div>
                <div className="text-purple-200 text-sm">Consumer behavior focus</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-8 w-8 text-purple-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">Community-Centric</div>
                <div className="text-purple-200 text-sm">Social validation strategy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Smartphone className="h-8 w-8 text-purple-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">Mobile-First</div>
                <div className="text-purple-200 text-sm">Social commerce optimization</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#d2c-framework"
                className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Explore D2C Strategy
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="/subscription-business-cac-reduction-framework"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                CAC Optimization
                <Target className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* D2C vs B2B Analysis */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              D2C vs B2B Subscription Marketing: Strategic Differences
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Understanding the fundamental differences between D2C and B2B subscription marketing 
              is critical for developing effective consumer-focused strategies and messaging.
            </p>
            
            <div className="space-y-6">
              {d2cVsB2bComparison.map((comparison, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div>
                      <h3 className="font-bold text-gray-900">{comparison.dimension}</h3>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <div className="font-semibold text-purple-800 text-sm mb-1">D2C Approach</div>
                      <div className="text-purple-700 text-xs">{comparison.d2c}</div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="font-semibold text-blue-800 text-sm mb-1">B2B Approach</div>
                      <div className="text-blue-700 text-xs">{comparison.b2b}</div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="font-semibold text-green-800 text-sm mb-1">Strategic Implication</div>
                      <div className="text-green-700 text-xs">{comparison.implication}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Key Takeaway: Emotional vs Rational Decision Making
              </h3>
              <p className="text-gray-700">
                D2C subscription marketing succeeds by triggering emotional responses and creating identity connections, 
                while B2B focuses on logical justification and ROI demonstration. This fundamental difference drives 
                every aspect of messaging, creative strategy, and conversion optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consumer Psychology Frameworks */}
      <section id="d2c-framework" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Consumer Psychology Frameworks for Subscription Marketing
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Psychology-based frameworks for understanding consumer behavior and optimizing 
              subscription marketing strategies through weekly intelligence application.
            </p>
            
            <div className="space-y-12">
              {consumerPsychologyFrameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{framework.framework}</h3>
                    <p className="text-gray-600">{framework.description}</p>
                  </div>
                  
                  {framework.levels && (
                    <div className="space-y-4">
                      {framework.levels.map((level, levelIndex) => (
                        <div key={levelIndex} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold text-purple-800">{level.need}</h4>
                            </div>
                            <div>
                              <span className="text-sm text-gray-700">{level.example}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-purple-700">"{level.message}"</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {framework.stages && (
                    <div className="space-y-4">
                      {framework.stages.map((stage, stageIndex) => (
                        <div key={stageIndex} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <div className="grid md:grid-cols-4 gap-3">
                            <div>
                              <h4 className="font-semibold text-blue-800">{stage.stage}</h4>
                              <p className="text-xs text-blue-600">{stage.focus}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-700">{stage.tactics}</span>
                            </div>
                            <div>
                              <span className="text-xs text-blue-700 font-medium">{stage.intelligence}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* D2C Optimization Strategies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              D2C-Specific Optimization Strategies
            </h2>
            
            <div className="space-y-8">
              {d2cOptimizationStrategies.map((strategy, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{strategy.category}</h3>
                      <p className="text-purple-600 font-medium">{strategy.focus}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{strategy.expectedImpact.split(' ')[0]}</div>
                      <div className="text-sm text-gray-500">Expected Impact</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Core Strategies</h4>
                      <ul className="space-y-2">
                        {strategy.strategies.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Weekly Intelligence Focus</h4>
                      <ul className="space-y-2">
                        {strategy.weeklyIntelligence.map((intel, intelIndex) => (
                          <li key={intelIndex} className="flex items-start">
                            <Eye className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{intel}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="font-semibold text-purple-800">Expected Impact: {strategy.expectedImpact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform-Specific D2C Strategies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Platform-Specific D2C Strategies
            </h2>
            
            <div className="space-y-8">
              {platformStrategies.map((platform, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{platform.platform}</h3>
                      <p className="text-gray-600">Target: {platform.audience}</p>
                      <p className="text-purple-600 font-medium">Strengths: {platform.strengths}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{platform.expectedResults.split(',')[0]}</div>
                      <div className="text-sm text-gray-500">Key Results</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">D2C Approach</h4>
                      <div className="space-y-4">
                        {Object.entries(platform.d2cApproach).map(([key, value], approachIndex) => (
                          <div key={approachIndex} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <h5 className="font-semibold text-purple-800 text-sm mb-1 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h5>
                            <p className="text-purple-700 text-xs">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Weekly Intelligence</h4>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                        <p className="text-blue-700 text-sm">{platform.weeklyIntelligence}</p>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-4">Expected Results</h4>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <p className="text-green-700 text-sm font-medium">{platform.expectedResults}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consumer Lifecycle Optimization */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Consumer Subscription Lifecycle Optimization
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Stage-specific optimization strategies for the consumer subscription journey, 
              with weekly intelligence integration for continuous improvement.
            </p>
            
            <div className="space-y-8">
              {lifecycleOptimization.map((stage, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{stage.stage}</h3>
                      <p className="text-gray-600">{stage.duration} • {stage.objective}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">D2C Tactics</h4>
                      <ul className="space-y-2">
                        {stage.d2cTactics.map((tactic, tacticIndex) => (
                          <li key={tacticIndex} className="flex items-start">
                            <Zap className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{tactic}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800 text-sm mb-1">Weekly Intelligence</h5>
                        <p className="text-blue-700 text-xs">{stage.weeklyIntelligence}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Success Metrics</h4>
                      <div className="space-y-2 mb-4">
                        {stage.kpis.map((kpi, kpiIndex) => (
                          <div key={kpiIndex} className="flex items-center">
                            <Target className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm text-gray-700">{kpi}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-800 text-sm mb-1">Optimization Target</h5>
                        <p className="text-green-700 text-xs font-medium">{stage.optimizationTarget}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              D2C Subscription Success Stories
            </h2>
            
            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{study.brand}</h3>
                      <span className="text-purple-600 font-medium">{study.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Results in {study.results.timeframe}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">D2C Strategy Implementation</h4>
                    <ul className="space-y-1">
                      {study.d2cStrategy.map((strategy, stratIndex) => (
                        <li key={stratIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Marketing Metrics</h4>
                      <div className="space-y-2">
                        {study.results.metrics.map((metric, metIndex) => (
                          <div key={metIndex} className="p-2 bg-purple-50 rounded border border-purple-200">
                            <span className="text-sm text-purple-800 font-medium">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Business Impact</h4>
                      <div className="space-y-2">
                        {study.results.businessImpact.map((impact, impactIndex) => (
                          <div key={impactIndex} className="p-2 bg-green-50 rounded border border-green-200">
                            <span className="text-sm text-green-800 font-medium">{impact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-purple-500">
                    <p className="text-gray-700 italic">"{study.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Master D2C Subscription Marketing with Consumer Psychology
            </h2>
            
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Transform your direct-to-consumer subscription business with psychology-driven strategies 
              and weekly creative intelligence for sustainable growth.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Heart className="h-8 w-8 text-purple-200 mx-auto mb-2" />
                <div className="font-semibold">Emotional Connection</div>
                <div className="text-purple-200 text-sm">Identity-based positioning</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-8 w-8 text-purple-200 mx-auto mb-2" />
                <div className="font-semibold">Social Validation</div>
                <div className="text-purple-200 text-sm">Community-driven growth</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-purple-200 mx-auto mb-2" />
                <div className="font-semibold">Proven Results</div>
                <div className="text-purple-200 text-sm">Psychology-driven optimization</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Get D2C Strategy Consultation
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <Link
                href="/#service-tiers"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View D2C Plans
                <ShoppingCart className="h-5 w-5 ml-2" />
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
              Related D2C Marketing Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/freemium-to-premium-conversion-optimization"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <ArrowUpRight className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Freemium Conversion</h3>
                <p className="text-sm text-gray-600">
                  Optimize free-to-paid conversion rates with psychology-driven strategies
                </p>
              </Link>
              
              <Link 
                href="/mobile-app-cac-optimization-2025"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mobile App CAC</h3>
                <p className="text-sm text-gray-600">
                  Reduce mobile acquisition costs with platform-native D2C strategies
                </p>
              </Link>
              
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Master weekly creative intelligence methodology for D2C optimization
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}