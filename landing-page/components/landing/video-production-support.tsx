'use client';

import { Camera, Users, Video, Smartphone, Edit, Play, CheckCircle, ArrowRight, Star } from 'lucide-react';

interface SupportTier {
  name: string;
  description: string;
  features: string[];
  icon: any;
  audience: string;
  tier: 'diy' | 'partner' | 'fullservice';
}

const supportTiers: SupportTier[] = [
  {
    name: 'DIY Support',
    description: 'Everything you need to create videos yourself',
    features: [
      'Hook-to-visual matching framework',
      'Mobile shooting best practices guide', 
      'Video editing workflow templates',
      'Platform-specific optimization tips',
      'Equipment recommendations by budget',
      'Troubleshooting and Q&A support'
    ],
    icon: Smartphone,
    audience: 'Solo founders, small teams, budget-conscious businesses',
    tier: 'diy'
  },
  {
    name: 'Partner Network',
    description: 'Vetted video creators who understand our frameworks',
    features: [
      'Pre-qualified video production partners',
      'Negotiated rates for subscribers',
      'Quality-assured creative execution',
      'Project management coordination',
      'Multiple style and budget options',
      'Direct communication channels'
    ],
    icon: Users,
    audience: 'Growing businesses ready to outsource video creation',
    tier: 'partner'
  },
  {
    name: 'Full Service',
    description: 'Complete video production management',
    features: [
      'Professional video team coordination',
      'Multi-format content creation',
      'End-to-end project management',
      'Advanced editing and post-production',
      'Platform optimization and delivery',
      'Performance tracking and optimization'
    ],
    icon: Video,
    audience: 'Established companies wanting hands-off video production',
    tier: 'fullservice'
  }
];

const videoTypes = [
  {
    name: 'UGC-Style Content',
    description: 'Authentic, user-generated style videos',
    tools: ['Smartphone', 'Ring light', 'Basic editing app'],
    difficulty: 'Beginner',
    timeRequired: '30 minutes'
  },
  {
    name: 'Product Demos',
    description: 'Professional product showcases',
    tools: ['DSLR/Phone', 'Tripod', 'Editing software'],
    difficulty: 'Intermediate', 
    timeRequired: '2-3 hours'
  },
  {
    name: 'Animated Explainers',
    description: 'Motion graphics and animations',
    tools: ['Animation software', 'Voice recording'],
    difficulty: 'Advanced',
    timeRequired: '1-2 days'
  }
];

export function VideoProductionSupport() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Video className="h-4 w-4 mr-2" />
              VIDEO PRODUCTION SUPPORT
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              From Script to Screen - Video Support for Every Business Size
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              "Great hooks are worthless if I can't make the videos." We hear this all the time. 
              That's why we provide video production support for ANY company size - from solo founders with iPhones 
              to growing companies with video teams.
            </p>
          </div>

          {/* Support Tiers */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {supportTiers.map((tier, index) => {
              const Icon = tier.icon;
              const borderColor = tier.tier === 'diy' ? 'border-green-200' : 
                                 tier.tier === 'partner' ? 'border-blue-200' : 'border-purple-200';
              const iconColor = tier.tier === 'diy' ? 'text-green-600 bg-green-100' : 
                               tier.tier === 'partner' ? 'text-blue-600 bg-blue-100' : 'text-purple-600 bg-purple-100';
              const badgeColor = tier.tier === 'diy' ? 'bg-green-600' : 
                                 tier.tier === 'partner' ? 'bg-blue-600' : 'bg-purple-600';

              return (
                <div key={tier.name} className={`bg-white rounded-2xl shadow-lg border-2 ${borderColor} p-6 hover:shadow-xl transition-shadow relative`}>
                  {/* Tier Badge */}
                  <div className={`absolute -top-3 left-6 ${badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {tier.tier === 'diy' ? 'All Plans' : tier.tier === 'partner' ? 'Competitive Edge+' : 'Enterprise'}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${iconColor} rounded-xl flex items-center justify-center mx-auto mb-4 mt-2`}>
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>
                    <p className="text-sm text-gray-500 italic">{tier.audience}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Video Types Guide */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What Type of Videos Can You Create?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {videoTypes.map((type, index) => (
                <div key={type.name} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{type.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      type.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      type.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {type.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-gray-500">TOOLS NEEDED:</span>
                      <p className="text-xs text-gray-600">{type.tools.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">TIME REQUIRED:</span>
                      <p className="text-xs text-gray-600">{type.timeRequired}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                "But I've Never Made Videos Before..."
              </h3>
              <p className="text-lg text-gray-600">
                Neither had most of our clients. Here's what they discovered:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-semibold text-gray-900">Solo Founder Journey</span>
                </div>
                <blockquote className="text-gray-600 italic mb-4">
                  "Started with just my iPhone and our DIY guides. First video took 2 hours, now I can shoot 3 videos in 30 minutes. 
                  Our conversion rate improved 40% in the first month."
                </blockquote>
                <div className="text-sm text-gray-500">E-commerce founder, $5K monthly ad spend</div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-semibold text-gray-900">Growing Team Success</span>
                </div>
                <blockquote className="text-gray-600 italic mb-4">
                  "Used our Partner Network to find a video creator who 'gets' our brand. Now we have 12 new videos every month 
                  and our CAC dropped 35%."
                </blockquote>
                <div className="text-sm text-gray-500">SaaS marketing team, $25K monthly ad spend</div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">90%</div>
                  <div className="text-sm text-gray-600">Success rate with DIY support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">2.5x</div>
                  <div className="text-sm text-gray-600">Faster video creation after month 1</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">Zero</div>
                  <div className="text-sm text-gray-600">Video experience required to start</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                The hardest part isn't making videos - it's knowing what to say. 
                We give you the scripts, you choose how to bring them to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    const emailSection = document.getElementById('email-signup');
                    if (emailSection) {
                      emailSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
                >
                  Start With Free Video Support
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
                
                <button
                  onClick={() => {
                    const serviceSection = document.getElementById('service-tiers');
                    if (serviceSection) {
                      serviceSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-orange-600 hover:text-orange-700 font-semibold underline transition-colors"
                >
                  See Which Plan Includes Video Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}