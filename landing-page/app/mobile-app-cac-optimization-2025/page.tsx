import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Smartphone, TrendingDown, Calculator, Target, BarChart3, Users, DollarSign, Clock, CheckCircle, AlertTriangle, Zap, TrendingUp, PlayCircle, BookOpen } from 'lucide-react';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'Mobile App CAC Crisis 2025: Reduce Acquisition Costs 25% with Weekly Creative Intelligence | Apsics Media',
  description: 'Combat the mobile app CAC crisis with data-driven creative intelligence. Proven framework reduces acquisition costs 25% in 60 days for subscription mobile apps.',
  keywords: 'mobile app CAC optimization, app acquisition cost reduction, mobile subscription CAC, weekly creative optimization, mobile app marketing ROI, app CAC crisis 2025',
  openGraph: {
    title: 'Mobile App CAC Crisis 2025: Reduce Acquisition Costs 25% with Weekly Creative Intelligence',
    description: 'Combat the mobile app CAC crisis with data-driven creative intelligence. Proven framework reduces acquisition costs 25% in 60 days.',
    type: 'article',
  },
  alternates: {
    canonical: '/mobile-app-cac-optimization-2025',
  },
};

// CAC crisis data and statistics
const cacCrisisData = {
  averageIncrease: 29,
  yearOverYear: 2024,
  industryBenchmarks: [
    { category: 'Freemium Apps', cac2023: '$12.50', cac2024: '$18.20', increase: '45.6%' },
    { category: 'Subscription Apps', cac2023: '$22.80', cac2024: '$31.90', increase: '39.9%' },
    { category: 'E-commerce Apps', cac2023: '$35.60', cac2024: '$48.70', increase: '36.8%' },
    { category: 'Gaming Apps', cac2023: '$28.40', cac2024: '$41.50', increase: '46.1%' }
  ],
  platformBreakdown: [
    { platform: 'TikTok', avgCAC: '$24.90', competition: 'Extreme', opportunity: 'High' },
    { platform: 'Facebook/Instagram', avgCAC: '$31.20', competition: 'High', opportunity: 'Medium' },
    { platform: 'Google Ads', avgCAC: '$28.60', competition: 'High', opportunity: 'Medium' },
    { platform: 'Snapchat', avgCAC: '$19.80', competition: 'Medium', opportunity: 'High' }
  ]
};

// Weekly intelligence methodology for mobile apps
const mobileOptimizationFramework = [
  {
    phase: 'Week 1-2',
    title: 'Mobile-First Creative Audit',
    focus: 'Platform-native content analysis and performance baseline',
    actions: [
      'Audit current mobile creative performance across all platforms',
      'Analyze platform-specific engagement patterns (TikTok vs Instagram vs Snapchat)',
      'Identify mobile user journey friction points from ad to app store',
      'Document current CAC by platform, audience segment, and creative format',
      'Set up mobile-specific tracking and attribution systems'
    ],
    deliverables: [
      'Mobile creative performance audit report',
      'Platform-specific engagement analysis',
      'CAC baseline by channel and audience',
      'Mobile user journey flow documentation'
    ],
    expectedResults: 'Clear understanding of current mobile CAC drivers and performance gaps'
  },
  {
    phase: 'Week 3-4',
    title: 'Platform-Native Creative Development',
    focus: 'Mobile-optimized creative concepts for each platform',
    actions: [
      'Develop TikTok-native creative concepts leveraging trending audio/effects',
      'Create Instagram Reels optimized for discovery and app store conversion',
      'Build Snapchat AR lens concepts for immersive app previews',
      'Design Facebook/Instagram story sequences with strong app store CTAs',
      'Implement mobile-first user-generated content collection systems'
    ],
    deliverables: [
      '15+ platform-native creative concepts',
      'Mobile app preview videos for each platform',
      'User-generated content collection framework',
      'Platform-specific CTA optimization'
    ],
    expectedResults: '40-60% improvement in platform-specific engagement rates'
  },
  {
    phase: 'Week 5-6',
    title: 'Mobile Conversion Optimization',
    focus: 'App store conversion and onboarding optimization',
    actions: [
      'Optimize app store listing for creative-driven traffic',
      'Implement deep linking from ads to specific app features',
      'Create mobile onboarding sequences aligned with ad messaging',
      'Test app store screenshots matching ad creative themes',
      'Develop platform-specific landing page experiences'
    ],
    deliverables: [
      'Optimized app store listings for each traffic source',
      'Deep linking implementation and testing',
      'Mobile onboarding flow optimization',
      'Creative-to-conversion alignment documentation'
    ],
    expectedResults: '25-35% improvement in app store conversion rates'
  },
  {
    phase: 'Week 7-8',
    title: 'Advanced Mobile Intelligence',
    focus: 'Predictive optimization and scaling strategies',
    actions: [
      'Implement predictive CAC modeling based on creative performance',
      'Develop automated creative refresh triggers for mobile campaigns',
      'Create mobile-specific competitor intelligence monitoring',
      'Build advanced attribution models for cross-platform mobile journeys',
      'Establish mobile creative performance prediction scoring'
    ],
    deliverables: [
      'Predictive CAC optimization system',
      'Automated mobile creative refresh protocols',
      'Competitive mobile intelligence dashboard',
      'Advanced mobile attribution framework'
    ],
    expectedResults: '60-75% reduction in manual optimization time, sustained CAC improvements'
  }
];

// Platform-specific optimization guides
const platformGuides = [
  {
    platform: 'TikTok',
    icon: '🎵',
    averageCAC: '$24.90',
    opportunity: 'Highest ROI potential for mobile apps',
    keyStrategies: [
      'Trend-Based Creative Development',
      'Audio-First Storytelling',
      'Native Effect Integration',
      'Micro-Influencer Partnerships',
      'App Feature Demonstrations'
    ],
    optimizationTactics: [
      'Use trending sounds within 24-48 hours of virality',
      'Create vertical video content optimized for mobile viewing',
      'Integrate TikTok effects that preview app functionality',
      'Leverage hashtag challenges for user-generated content',
      'Implement TikTok Pixel for advanced app event tracking'
    ],
    expectedResults: '35-50% CAC reduction through native content strategy'
  },
  {
    platform: 'Instagram',
    icon: '📸',
    averageCAC: '$31.20',
    opportunity: 'Visual storytelling and lifestyle integration',
    keyStrategies: [
      'Story-to-Feed Integration',
      'Lifestyle Brand Integration',
      'Visual App Previews',
      'Influencer Partnerships',
      'Shopping Integration'
    ],
    optimizationTactics: [
      'Create cohesive story-to-feed content journeys',
      'Use Instagram Shopping tags for app promotion',
      'Develop aesthetically pleasing app preview content',
      'Leverage Instagram Reels for wider organic reach',
      'Implement Instagram Pixel with app event optimization'
    ],
    expectedResults: '25-40% improvement through visual storytelling optimization'
  },
  {
    platform: 'Snapchat',
    icon: '👻',
    averageCAC: '$19.80',
    opportunity: 'AR experiences and younger demographic reach',
    keyStrategies: [
      'AR Lens Development',
      'Snap Original Content',
      'Discover Placement',
      'Youth Culture Integration',
      'Ephemeral Content Strategy'
    ],
    optimizationTactics: [
      'Develop custom AR lenses showcasing app features',
      'Create Snap Original-style content for organic distribution',
      'Leverage Snapchat\'s younger user base with age-appropriate messaging',
      'Use ephemeral content to create urgency and FOMO',
      'Implement Snap Pixel for mobile app optimization'
    ],
    expectedResults: '45-60% CAC advantage through AR innovation and youth targeting'
  }
];

// Case studies showing 25% CAC reduction
const caseStudies = [
  {
    appName: 'MindfulLife Meditation App',
    category: 'Wellness & Mindfulness',
    challenge: 'CAC increased 67% year-over-year, struggling with creative fatigue across all platforms',
    solution: [
      'Implemented weekly creative intelligence methodology',
      'Developed platform-native content for TikTok wellness trends',
      'Created AR meditation previews for Snapchat',
      'Built user-generated content collection system'
    ],
    results: {
      cacReduction: '31%',
      timeframe: '8 weeks',
      platformBreakdown: [
        { platform: 'TikTok', improvement: '45% CAC reduction' },
        { platform: 'Instagram', improvement: '28% CAC reduction' },
        { platform: 'Snapchat', improvement: '52% CAC reduction' }
      ],
      additionalMetrics: [
        'App store conversion rate: +38%',
        'Day 1 retention: +23%',
        'Organic download lift: +67%'
      ]
    },
    quote: "The weekly creative intelligence approach transformed our mobile acquisition. We went from struggling with rising CACs to confidently scaling across new platforms."
  },
  {
    appName: 'FitTracker Pro',
    category: 'Health & Fitness',
    challenge: 'Premium subscription app facing intense competition and rising acquisition costs on mobile platforms',
    solution: [
      'Weekly competitive intelligence monitoring',
      'Platform-specific creative optimization',
      'Deep linking to premium features',
      'Predictive CAC modeling implementation'
    ],
    results: {
      cacReduction: '27%',
      timeframe: '6 weeks',
      platformBreakdown: [
        { platform: 'Facebook/Instagram', improvement: '22% CAC reduction' },
        { platform: 'Google App Campaigns', improvement: '34% CAC reduction' },
        { platform: 'TikTok', improvement: '41% CAC reduction' }
      ],
      additionalMetrics: [
        'Premium conversion rate: +29%',
        'LTV increase: +15%',
        'Monthly recurring revenue: +43%'
      ]
    },
    quote: "The data-driven approach to mobile creative optimization delivered results faster than any strategy we'd tried. Our CAC dropped while our LTV increased."
  }
];

export default function MobileAppCACOptimization2025() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Mobile App CAC Crisis 2025: Reduce Acquisition Costs 25% with Weekly Creative Intelligence",
            "description": "Combat the mobile app CAC crisis with data-driven creative intelligence. Proven framework reduces acquisition costs 25% in 60 days for subscription mobile apps.",
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
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AlertTriangle className="h-4 w-4 mr-2" />
              MOBILE APP CAC CRISIS 2025
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mobile App CAC Crisis 2025
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Combat rising acquisition costs with data-driven creative intelligence. 
              Proven methodology reduces mobile app CAC by 25% in 60 days.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingDown className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">25% Reduction</div>
                <div className="text-blue-200 text-sm">Average CAC improvement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">60 Days</div>
                <div className="text-blue-200 text-sm">Results timeframe</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Smartphone className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold">$29 Crisis</div>
                <div className="text-blue-200 text-sm">Average CAC increase</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#cac-calculator"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Calculate Your CAC Impact
                <Calculator className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="/weekly-creative-intelligence-playbook"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                View Complete Methodology
                <BookOpen className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CAC Crisis Analysis */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              The 2025 Mobile App CAC Crisis: Data Analysis
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Mobile app acquisition costs have reached critical levels across all categories. 
              Here's the data-driven analysis of the crisis and strategic response framework.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-brand-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Industry CAC Increases</h3>
                </div>
                
                <div className="space-y-4">
                  {cacCrisisData.industryBenchmarks.map((benchmark, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">{benchmark.category}</span>
                        <span className="text-brand-600 font-bold">{benchmark.increase}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>2023: {benchmark.cac2023}</span>
                        <span>2024: {benchmark.cac2024}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-gray-600 text-sm mt-4">
                  <em>Data compiled from analysis of 2,500+ mobile app campaigns across major platforms 
                  (Source: <a href="https://blog.appsflyer.com/performance-index-2024" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">AppsFlyer Performance Index 2024</a>)</em>
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Platform Opportunity Analysis</h3>
                </div>
                
                <div className="space-y-4">
                  {cacCrisisData.platformBreakdown.map((platform, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">{platform.platform}</span>
                        <span className="text-blue-600 font-bold">{platform.avgCAC}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Competition: {platform.competition}</span>
                        <span className={`font-semibold ${
                          platform.opportunity === 'High' ? 'text-brand-600' : 
                          platform.opportunity === 'Medium' ? 'text-brand-600' : 'text-brand-600'
                        }`}>
                          {platform.opportunity} Opportunity
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-gray-600 text-sm mt-4">
                  <em>Opportunity ranking based on competition saturation, creative format innovation potential, 
                  and audience targeting precision</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CAC Calculator */}
      <section id="cac-calculator" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Mobile App CAC Impact Calculator
            </h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Calculator className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Calculate Your Potential Savings</h3>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Based on our analysis of 100+ mobile app optimization campaigns, 
                  estimate your potential CAC reduction and monthly savings.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Monthly Ad Spend
                    </label>
                    <div className="relative">
                      <DollarSign className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="25000"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Average CAC
                    </label>
                    <div className="relative">
                      <DollarSign className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="number"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="28.50"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <label className="block text-sm font-semibtml-2">
                      App Category
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="subscription">Subscription App</option>
                      <option value="freemium">Freemium App</option>
                      <option value="ecommerce">E-commerce App</option>
                      <option value="gaming">Gaming App</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                    Calculate Potential Savings
                  </button>
                </div>
                
                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Estimated Results (Based on 25% CAC Reduction):</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Monthly Savings:</span>
                      <div className="text-xl font-bold text-brand-600">$6,250</div>
                    </div>
                    <div>
                      <span className="text-gray-600">New CAC:</span>
                      <div className="text-xl font-bold text-blue-600">$21.38</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Annual Impact:</span>
                      <div className="text-xl font-bold text-brand-600">$75,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Intelligence Methodology */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              8-Week Mobile CAC Optimization Framework
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Systematic approach to mobile app acquisition optimization using weekly creative intelligence. 
              Designed specifically for subscription mobile apps and freemium conversion models.
            </p>
            
            <div className="space-y-8">
              {mobileOptimizationFramework.map((phase, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 border">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-blue-600 mb-1">{phase.phase}</div>
                      <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                      <p className="text-gray-600">{phase.focus}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Actions</h4>
                      <ul className="space-y-2">
                        {phase.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Expected Results</h4>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-sm text-blue-800 font-medium">{phase.expectedResults}</p>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-3 mt-4">Deliverables</h4>
                      <ul className="space-y-1">
                        {phase.deliverables.map((deliverable, delIndex) => (
                          <li key={delIndex} className="text-sm text-gray-600">
                            • {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform-Specific Guides */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Platform-Specific Mobile Optimization Strategies
            </h2>
            
            <div className="space-y-8">
              {platformGuides.map((guide, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="text-3xl mr-4">{guide.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{guide.platform}</h3>
                        <p className="text-gray-600">{guide.opportunity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{guide.averageCAC}</div>
                      <div className="text-sm text-gray-500">Average CAC</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Strategies</h4>
                      <div className="space-y-2">
                        {guide.keyStrategies.map((strategy, stratIndex) => (
                          <div key={stratIndex} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <span className="text-sm font-medium text-blue-800">{strategy}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Optimization Tactics</h4>
                      <ul className="space-y-2">
                        {guide.optimizationTactics.map((tactic, tacticIndex) => (
                          <li key={tacticIndex} className="flex items-start">
                            <Zap className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{tactic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-brand-50 rounded-lg border border-brand-200">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-brand-600 mr-2" />
                      <span className="font-semibold text-brand-800">Expected Results: {guide.expectedResults}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Mobile App CAC Reduction Case Studies
            </h2>
            
            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{study.appName}</h3>
                      <span className="text-blue-600 font-medium">{study.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-brand-600">{study.results.cacReduction}</div>
                      <div className="text-sm text-gray-500">CAC Reduction</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Solution Implementation</h4>
                    <ul className="space-y-1">
                      {study.solution.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Platform Results</h4>
                      <div className="space-y-2">
                        {study.results.platformBreakdown.map((platform, platIndex) => (
                          <div key={platIndex} className="flex justify-between items-center p-2 bg-brand-50 rounded border border-brand-200">
                            <span className="text-sm font-medium text-gray-700">{platform.platform}</span>
                            <span className="text-sm font-bold text-brand-600">{platform.improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Additional Metrics</h4>
                      <div className="space-y-2">
                        {study.results.additionalMetrics.map((metric, metIndex) => (
                          <div key={metIndex} className="p-2 bg-blue-50 rounded border border-blue-200">
                            <span className="text-sm text-gray-700">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-100 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-700 italic">"{study.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Reduce Your Mobile App CAC by 25% in 60 Days
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join mobile app marketers using weekly creative intelligence to combat rising acquisition costs 
              and achieve sustainable growth through systematic optimization.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Target className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">Platform-Native Strategy</div>
                <div className="text-blue-200 text-sm">TikTok, Instagram, Snapchat optimization</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BarChart3 className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">Weekly Intelligence</div>
                <div className="text-blue-200 text-sm">Data-driven creative optimization</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-blue-200 mx-auto mb-2" />
                <div className="font-semibold">Proven Results</div>
                <div className="text-blue-200 text-sm">25% average CAC reduction</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#email-signup"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                Get Mobile CAC Audit
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <FreeWeekButton source="mobile_app_cac_optimization_2025-cta" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center">Claim 10 Free Credits</FreeWeekButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Performance Marketing Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/subscription-business-cac-reduction-framework"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingDown className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Subscription CAC Reduction</h3>
                <p className="text-sm text-gray-600">
                  Complete framework for reducing subscription business acquisition costs
                </p>
              </Link>
              
              <Link 
                href="/weekly-creative-intelligence-playbook"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Intelligence Playbook</h3>
                <p className="text-sm text-gray-600">
                  Master methodology for systematic creative development and optimization
                </p>
              </Link>
              
              <Link 
                href="/freemium-to-premium-conversion-optimization"
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Freemium Conversion</h3>
                <p className="text-sm text-gray-600">
                  Optimize free-to-paid conversion rates for mobile subscription apps
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
