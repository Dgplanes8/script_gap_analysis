'use client';

import { useState } from 'react';
import { Users, Video, Image, TrendingUp, Star, MessageSquare, ArrowRight, Play, Zap } from 'lucide-react';

interface FormatExample {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'video' | 'static' | 'interactive';
  platforms: string[];
  hookExample: string;
  visualDescription: string;
  conversionStrength: number;
  whenToUse: string;
  avgPerformance: string;
}

const formatExamples: FormatExample[] = [
  {
    id: 'ugc',
    name: 'UGC Testimonial',
    description: 'Authentic user-generated content style testimonials',
    icon: <Users className="h-6 w-6" />,
    category: 'video',
    platforms: ['TikTok', 'Instagram', 'Facebook'],
    hookExample: '"I\'m seriously obsessed with this clean beauty routine and here\'s why..."',
    visualDescription: 'Authentic user speaking directly to camera, casual setting, genuine enthusiasm',
    conversionStrength: 9,
    whenToUse: 'High-trust situations, social proof needed, authentic brand positioning',
    avgPerformance: '2.3x higher CTR than brand content'
  },
  {
    id: 'founder',
    name: 'Founder Authority Video',
    description: 'Expert positioning through founder credibility',
    icon: <Video className="h-6 w-6" />,
    category: 'video',
    platforms: ['LinkedIn', 'Facebook', 'Instagram'],
    hookExample: '"After 15 years as a makeup artist, here\'s what I learned about effortless beauty..."',
    visualDescription: 'Professional setting, direct camera address, confident delivery, authority positioning',
    conversionStrength: 8,
    whenToUse: 'B2B audiences, professional services, expertise-based products',
    avgPerformance: '40% higher conversion on premium tiers'
  },
  {
    id: 'us-vs-them',
    name: 'Us vs Them Comparison',
    description: 'Direct competitive positioning and differentiation',
    icon: <TrendingUp className="h-6 w-6" />,
    category: 'video',
    platforms: ['TikTok', 'Instagram', 'Facebook'],
    hookExample: '"Traditional makeup requires 20+ products. This routine uses just 3..."',
    visualDescription: 'Split screen or quick cuts showing competitor flaws vs our advantages',
    conversionStrength: 7,
    whenToUse: 'Crowded markets, clear differentiators, competitive displacement',
    avgPerformance: '60% better at driving consideration vs generic content'
  },
  {
    id: 'before-after',
    name: 'Before & After Results',
    description: 'Transformation storytelling with proof',
    icon: <Star className="h-6 w-6" />,
    category: 'video',
    platforms: ['Instagram', 'Facebook', 'TikTok'],
    hookExample: '"My morning routine went from 45 minutes to 10 minutes with this simple change..."',
    visualDescription: 'Clear before/after visuals, metrics comparison, transformation narrative',
    conversionStrength: 9,
    whenToUse: 'Clear transformation outcomes, measurable results, proof-heavy markets',
    avgPerformance: '3.1x conversion rate vs awareness content'
  },
  {
    id: 'three-reasons',
    name: '3 Reasons Why',
    description: 'Educational format with structured benefits',
    icon: <MessageSquare className="h-6 w-6" />,
    category: 'video',
    platforms: ['TikTok', 'Instagram', 'LinkedIn'],
    hookExample: '"3 reasons makeup artists are switching to this clean beauty approach..."',
    visualDescription: 'Numbered list format, quick transitions, benefit-focused content',
    conversionStrength: 6,
    whenToUse: 'Complex products, educational audience, benefit-heavy positioning',
    avgPerformance: 'High engagement, moderate conversion'
  },
  {
    id: 'regret',
    name: 'Why I Regret (Negative)',
    description: 'Reverse psychology through negative positioning',
    icon: <Zap className="h-6 w-6" />,
    category: 'video',
    platforms: ['TikTok', 'Instagram'],
    hookExample: '"3 reasons I regret switching to clean beauty..." (reveals benefits)',
    visualDescription: 'Hook with negative angle, reveal positive outcomes, curiosity-driven',
    conversionStrength: 8,
    whenToUse: 'Skeptical audiences, saturated markets, attention-grabbing needed',
    avgPerformance: '85% completion rate, high virality'
  },
  {
    id: 'headline-callout',
    name: 'Headline & Feature Callout',
    description: 'Direct response static with clear benefits',
    icon: <Image className="h-6 w-6" />,
    category: 'static',
    platforms: ['Facebook', 'Instagram', 'LinkedIn'],
    hookExample: '"Clean Beauty Made Simple: Natural Glow Without the Fuss"',
    visualDescription: 'Bold headline, feature bullets, clear CTA, professional design',
    conversionStrength: 7,
    whenToUse: 'Retargeting campaigns, clear offer, feature-focused positioning',
    avgPerformance: 'Lower CPM, steady conversion'
  },
  {
    id: 'statistics',
    name: 'Statistics Ad',
    description: 'Data-driven credibility and proof',
    icon: <TrendingUp className="h-6 w-6" />,
    category: 'static',
    platforms: ['LinkedIn', 'Facebook'],
    hookExample: '"73% of women spend 30+ minutes on makeup daily..."',
    visualDescription: 'Large stat display, source credibility, problem-solution narrative',
    conversionStrength: 6,
    whenToUse: 'B2B audiences, credibility needed, data-driven decision makers',
    avgPerformance: 'High trust signals, professional conversion'
  },
  {
    id: 'meme',
    name: 'Meme Format',
    description: 'Cultural relevance through meme adaptation',
    icon: <MessageSquare className="h-6 w-6" />,
    category: 'static',
    platforms: ['TikTok', 'Instagram', 'Facebook'],
    hookExample: '"Drake pointing: ❌ 20-step beauty routine ✅ 3-product natural glow"',
    visualDescription: 'Popular meme template adapted for brand message, cultural relevance',
    conversionStrength: 5,
    whenToUse: 'Younger audiences, viral potential, brand personality showcase',
    avgPerformance: 'High engagement, variable conversion'
  }
];

const categoryFilters = [
  { key: 'all', label: 'All Formats', icon: <Star className="h-4 w-4" /> },
  { key: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
  { key: 'static', label: 'Static', icon: <Image className="h-4 w-4" /> },
  { key: 'interactive', label: 'Interactive', icon: <TrendingUp className="h-4 w-4" /> }
];

export function FormatShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('ugc');

  const filteredFormats = selectedCategory === 'all' 
    ? formatExamples 
    : formatExamples.filter(format => format.category === selectedCategory);

  const currentFormat = formatExamples.find(format => format.id === selectedFormat) || formatExamples[0];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              <Play className="h-4 w-4 mr-2" />
              Creative Format Library
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              13 High-Converting Ad Formats
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From UGC testimonials to founder authority videos - see the exact formats we use to create platform-native content that converts.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-200">
              <div className="flex gap-2">
                {categoryFilters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedCategory(filter.key)}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === filter.key
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {filter.icon}
                    <span className="ml-2">{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Format List */}
            <div className="lg:col-span-1 space-y-3">
              {filteredFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedFormat === format.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg mr-3 ${
                      selectedFormat === format.id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {format.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{format.name}</h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-xs text-gray-600">{format.conversionStrength}/10 conversion</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{format.description}</p>
                </button>
              ))}
            </div>

            {/* Format Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border-2 border-blue-100 p-6 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
                    {currentFormat.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentFormat.name}</h3>
                    <p className="text-gray-600">{currentFormat.description}</p>
                  </div>
                </div>

                {/* Hook Example */}
                <div className="mb-6 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg text-white">
                  <h4 className="font-semibold text-white mb-2">Example Hook:</h4>
                  <p className="text-gray-100 italic">"{currentFormat.hookExample}"</p>
                </div>

                {/* Visual Description */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Visual Execution:</h4>
                  <p className="text-gray-700">{currentFormat.visualDescription}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Performance Metrics */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Conversion Strength</span>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${(currentFormat.conversionStrength / 10) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold">{currentFormat.conversionStrength}/10</span>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium text-blue-900">{currentFormat.avgPerformance}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Best Platforms</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentFormat.platforms.map((platform, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Usage Guidelines */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">When to Use</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{currentFormat.whenToUse}</p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <h4 className="text-lg font-bold mb-2">Get Weekly Format Variations</h4>
                <p className="text-blue-100 mb-4">
                  Every Monday: 3 concepts × 5 formats = 15 ready-to-test ad variations using these proven formats.
                </p>
                <button 
                  onClick={() => {
                    const serviceSection = document.getElementById('service-tiers');
                    if (serviceSection) {
                      serviceSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#service-tiers';
                    }
                  }}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center"
                >
                  See Creative Plans
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}