'use client';

import { useState } from 'react';
import { Zap, Target, Users, TrendingUp, ArrowRight, Shuffle, Star } from 'lucide-react';

interface HookExample {
  platform: 'tiktok' | 'facebook' | 'instagram';
  awareness: 'unaware' | 'problem-aware' | 'solution-aware' | 'product-aware' | 'most-aware';
  hook: string;
  reasoning: string;
  score: number;
}

const hookExamples: HookExample[] = [
  // TikTok Examples
  {
    platform: 'tiktok',
    awareness: 'problem-aware',
    hook: "POV: You're spending $5K/month on ads but your creative team is giving you the same 3 concepts...",
    reasoning: "Native TikTok POV format + specific pain point + relatable frustration",
    score: 23
  },
  {
    platform: 'tiktok', 
    awareness: 'solution-aware',
    hook: "Growth teams are using this weekly creative intelligence system to cut their CPA by 40%",
    reasoning: "Social proof + specific benefit + authority positioning",
    score: 21
  },
  
  // Facebook Examples
  {
    platform: 'facebook',
    awareness: 'problem-aware',
    hook: "The Hidden Reason Your Ad Creative Stops Working After 7 Days (And How Growth Teams Fix It)",
    reasoning: "Curiosity + specificity + benefit-driven promise for aware audience",
    score: 24
  },
  {
    platform: 'facebook',
    awareness: 'most-aware',
    hook: "Weekly Creative Intelligence: Fresh Scripts Delivered Every Monday - Starting at $67/Month",
    reasoning: "Direct offer + clear value prop + pricing transparency for hot audience",
    score: 20
  },

  // Instagram Examples  
  {
    platform: 'instagram',
    awareness: 'solution-aware',
    hook: "Finally. Creative concepts that don't require waiting 2 weeks for your agency.",
    reasoning: "Emotional relief + specific pain point + implied speed benefit",
    score: 22
  },
  {
    platform: 'instagram',
    awareness: 'product-aware', 
    hook: "Weekly delivery vs monthly creative reviews. Which growth team are you?",
    reasoning: "Comparison + identity positioning + urgency through choice",
    score: 19
  }
];

const platformStyles = {
  tiktok: {
    bg: 'bg-black text-white',
    accent: 'text-pink-400',
    border: 'border-pink-500'
  },
  facebook: {
    bg: 'bg-blue-600 text-white', 
    accent: 'text-blue-200',
    border: 'border-blue-400'
  },
  instagram: {
    bg: 'bg-gradient-to-br from-purple-600 to-pink-600 text-white',
    accent: 'text-purple-200', 
    border: 'border-purple-400'
  }
};

const awarenessLevels = [
  { key: 'unaware', label: 'Unaware', description: 'Doesn\'t know problem exists' },
  { key: 'problem-aware', label: 'Problem-Aware', description: 'Knows the problem, seeking solutions' },
  { key: 'solution-aware', label: 'Solution-Aware', description: 'Knows solutions exist, comparing options' },
  { key: 'product-aware', label: 'Product-Aware', description: 'Knows your product, deciding to buy' },
  { key: 'most-aware', label: 'Most-Aware', description: 'Ready to buy, needs final push' }
];

export function HookGeneratorDemo() {
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'facebook' | 'instagram'>('tiktok');
  const [selectedAwareness, setSelectedAwareness] = useState<string>('problem-aware');
  const [currentHook, setCurrentHook] = useState(hookExamples[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHook = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const filteredHooks = hookExamples.filter(
        hook => hook.platform === selectedPlatform && hook.awareness === selectedAwareness
      );
      
      if (filteredHooks.length > 0) {
        const randomHook = filteredHooks[Math.floor(Math.random() * filteredHooks.length)];
        setCurrentHook(randomHook);
      }
      setIsGenerating(false);
    }, 1000);
  };

  const platformStyle = platformStyles[currentHook.platform];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Hook Generation System
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Platform-Native Hooks That Stop The Scroll
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we craft hooks using curiosity + big promise formula, optimized for each platform's unique behavior and audience awareness level.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hook Generator Controls</h3>
                
                {/* Platform Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Platform</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['tiktok', 'facebook', 'instagram'] as const).map((platform) => (
                      <button
                        key={platform}
                        onClick={() => setSelectedPlatform(platform)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedPlatform === platform
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-sm capitalize">{platform}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Awareness Level Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Awareness Level</label>
                  <select
                    value={selectedAwareness}
                    onChange={(e) => setSelectedAwareness(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {awarenessLevels.map((level) => (
                      <option key={level.key} value={level.key}>
                        {level.label} - {level.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateHook}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Shuffle className="h-5 w-5 mr-2" />
                      Generate Hook
                    </>
                  )}
                </button>
              </div>

              {/* Hook Analysis Framework */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Our Hook Formula</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Target className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Curiosity + Big Promise</div>
                      <div className="text-sm text-gray-600">Creates immediate interest + clear benefit</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Platform Native</div>
                      <div className="text-sm text-gray-600">Matches each platform's unique behavior</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Awareness Optimized</div>
                      <div className="text-sm text-gray-600">Adapted for audience's knowledge level</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Hook Display */}
            <div className="space-y-6">
              <div className={`rounded-xl p-6 border-2 ${platformStyle.bg} ${platformStyle.border}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-current rounded-full mr-2"></div>
                    <span className="font-semibold capitalize">{currentHook.platform}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="font-semibold">{currentHook.score}/25</span>
                  </div>
                </div>
                
                <div className="text-lg font-medium mb-4 leading-relaxed">
                  "{currentHook.hook}"
                </div>
                
                <div className={`text-sm ${platformStyle.accent} bg-black/20 rounded-lg p-3`}>
                  <strong>Why it works:</strong> {currentHook.reasoning}
                </div>
              </div>

              {/* Performance Prediction */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Performance Prediction</h4>
                <div className="grid grid-cols-5 gap-4 text-center">
                  {[
                    { label: 'Attention', score: Math.floor(currentHook.score / 5) },
                    { label: 'Emotion', score: Math.floor(currentHook.score / 5) },
                    { label: 'Clarity', score: Math.floor(currentHook.score / 5) },
                    { label: 'CTA Power', score: Math.floor(currentHook.score / 5) },
                    { label: 'Memory', score: Math.floor(currentHook.score / 5) }
                  ].map((metric, index) => (
                    <div key={index}>
                      <div className="text-2xl font-bold text-gray-900">{metric.score}</div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
                <h4 className="text-lg font-bold mb-2">Get Weekly Hook Variations</h4>
                <p className="text-gray-300 mb-4">
                  Every Monday: 6+ platform-optimized hooks for your latest creative concepts.
                </p>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center">
                  See Hook Library
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