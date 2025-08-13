'use client';

import { useState } from 'react';
import { Eye, Heart, Target, Zap, Brain, Star, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

interface ScoreExample {
  name: string;
  hook: string;
  scores: {
    attention: number;
    emotion: number;
    clarity: number;
    cta: number;
    memory: number;
  };
  total: number;
  verdict: 'green' | 'yellow' | 'red';
  reasoning: string;
}

const scoreExamples: ScoreExample[] = [
  {
    name: "Professional Authority Hook",
    hook: "Growth teams managing $200K+ ad spend are using this weekly creative intelligence system to cut CPA by 40%",
    scores: { attention: 5, emotion: 4, clarity: 5, cta: 4, memory: 5 },
    total: 23,
    verdict: 'green',
    reasoning: "High specificity ($200K), clear benefit (40% CPA reduction), professional authority positioning creates strong credibility"
  },
  {
    name: "Problem-Solution Hook", 
    hook: "Finally. Creative concepts that don't require waiting 2 weeks for your agency to deliver",
    scores: { attention: 4, emotion: 4, clarity: 4, cta: 3, memory: 3 },
    total: 18,
    verdict: 'yellow',
    reasoning: "Strong emotional relief ('Finally'), clear pain point, but CTA could be stronger and memory element needs work"
  },
  {
    name: "Generic Creative Hook",
    hook: "Get better ad creative for your business with our new service",
    scores: { attention: 2, emotion: 1, clarity: 2, cta: 2, memory: 1 },
    total: 8,
    verdict: 'red',
    reasoning: "Too generic, no emotional trigger, vague benefits, no memorable elements - needs complete rework"
  }
];

const scoringCriteria = [
  {
    icon: <Eye className="h-5 w-5" />,
    name: "Attention Capture",
    color: "text-blue-500",
    description: "Will it stop the scroll?",
    details: ["Visual/auditory interest", "Stands out vs competitors", "Immediate impact"]
  },
  {
    icon: <Heart className="h-5 w-5" />,
    name: "Emotional Resonance", 
    color: "text-red-500",
    description: "Triggers specific emotions?",
    details: ["Life Force 8 connection", "Emotional identification", "Powerful feeling"]
  },
  {
    icon: <Target className="h-5 w-5" />,
    name: "Benefit Clarity",
    color: "text-green-500", 
    description: "Core promise clear?",
    details: ["Immediate understanding", "Unique mechanisms", "What's in it for me"]
  },
  {
    icon: <Zap className="h-5 w-5" />,
    name: "Call-to-Action",
    color: "text-orange-500",
    description: "Creates urgency to act?",
    details: ["Clear next step", "Urgency/desire", "Overcomes objections"]
  },
  {
    icon: <Brain className="h-5 w-5" />,
    name: "Memorability",
    color: "text-purple-500",
    description: "Contains sticky elements?",
    details: ["Conversation worthy", "Shareable component", "Brand association"]
  }
];

const verdictConfig = {
  green: {
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    icon: <CheckCircle className="h-5 w-5" />,
    label: "Green Light",
    description: "Exceptional potential - proceed immediately"
  },
  yellow: {
    color: "text-yellow-600", 
    bg: "bg-yellow-50 border-yellow-200",
    icon: <AlertCircle className="h-5 w-5" />,
    label: "Optimize",
    description: "Good foundation - improve weaker areas"
  },
  red: {
    color: "text-red-600",
    bg: "bg-red-50 border-red-200", 
    icon: <AlertCircle className="h-5 w-5" />,
    label: "Rework",
    description: "Unlikely to perform - needs major changes"
  }
};

export function PerformanceScoringSystem() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [animateScores, setAnimateScores] = useState(false);

  const example = scoreExamples[selectedExample];
  const verdict = verdictConfig[example.verdict];

  const handleExampleChange = (index: number) => {
    setSelectedExample(index);
    setAnimateScores(true);
    setTimeout(() => setAnimateScores(false), 1000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 rounded-full text-sm font-semibold mb-6">
              <Star className="h-4 w-4 mr-2" />
              Performance Prediction Framework
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              5-Dimension Scoring System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every hook and concept gets scored on our proven 25-point framework before deployment. See how we predict performance and optimize for maximum conversion.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Scoring Interface */}
            <div className="space-y-6">
              {/* Example Selection */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hook Examples</h3>
                <div className="space-y-3">
                  {scoreExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleChange(index)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        selectedExample === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{example.name}</span>
                        <span className="text-lg font-bold text-gray-900">{example.total}/25</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">"{example.hook}"</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verdict */}
              <div className={`rounded-xl p-6 border-2 ${verdict.bg}`}>
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg mr-3 ${verdict.color}`}>
                    {verdict.icon}
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold ${verdict.color}`}>{verdict.label}</h4>
                    <p className="text-sm text-gray-600">{verdict.description}</p>
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Analysis:</h5>
                  <p className="text-sm text-gray-700">{example.reasoning}</p>
                </div>
              </div>
            </div>

            {/* Scoring Breakdown */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Score Breakdown</h3>
                
                <div className="space-y-6">
                  {scoringCriteria.map((criterion, index) => {
                    const score = Object.values(example.scores)[index];
                    return (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg mr-3 bg-gray-100 ${criterion.color}`}>
                              {criterion.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{criterion.name}</h4>
                              <p className="text-sm text-gray-600">{criterion.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${criterion.color} ${animateScores ? 'animate-pulse' : ''}`}>
                              {score}
                            </div>
                            <div className="text-xs text-gray-500">/5</div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              score >= 4 ? 'bg-green-500' : 
                              score >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(score / 5) * 100}%` }}
                          ></div>
                        </div>

                        {/* Criteria Details */}
                        <div className="ml-14">
                          <div className="flex flex-wrap gap-2">
                            {criterion.details.map((detail, detailIndex) => (
                              <span 
                                key={detailIndex}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                {detail}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total Score */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-gray-900">Total Score</h4>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${
                        example.total >= 21 ? 'text-green-600' :
                        example.total >= 16 ? 'text-yellow-600' : 'text-red-600'
                      } ${animateScores ? 'animate-pulse' : ''}`}>
                        {example.total}
                      </div>
                      <div className="text-sm text-gray-500">/25</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision Guide */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
                <h4 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Decision Guide
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-green-400 font-semibold mr-2">21-25:</span>
                    <span className="text-gray-300">Green light - exceptional potential</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-yellow-400 font-semibold mr-2">16-20:</span>
                    <span className="text-gray-300">Proceed with optimizations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-red-400 font-semibold mr-2">Below 16:</span>
                    <span className="text-gray-300">Rework - unlikely to perform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}