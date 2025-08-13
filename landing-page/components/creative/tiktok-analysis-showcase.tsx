'use client';

import { useState } from 'react';
import { Play, TrendingUp, Target, Zap, BarChart3, Users, Brain, ArrowRight } from 'lucide-react';

interface AnalysisStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  example: string;
  insights: string[];
}

const analysisSteps: AnalysisStep[] = [
  {
    id: 1,
    title: "Trend Deconstruction",
    description: "Identify the core concept, audio-visual formula, and audience psychology behind viral content.",
    icon: <Brain className="h-6 w-6" />,
    example: "POV: Professional explaining complex concepts with quick cuts and trending audio",
    insights: [
      "Core emotion: Authority + Accessibility",
      "Visual formula: Quick transitions, text overlays, direct camera angles",
      "Psychology: Status achievement through knowledge simplification"
    ]
  },
  {
    id: 2,
    title: "Strategic Application",
    description: "Map trend potential to brand archetypes and identify authenticity requirements.",
    icon: <Target className="h-6 w-6" />,
    example: "Perfect for: The Sage archetype, B2B services, professional development brands",
    insights: [
      "Best fit: Expert/educator positioning",
      "Authenticity test: Does your brand have genuine expertise?",
      "Strategic angle: Problem/solution with authority positioning"
    ]
  },
  {
    id: 3,
    title: "Paid Media Templates",
    description: "Create adaptable hook formulas and narrative structures for immediate implementation.",
    icon: <Zap className="h-6 w-6" />,
    example: "Hook: '[Industry] pros don't want you to know this [time] secret...'",
    insights: [
      "Universal formula: Authority + Secret + Specificity",
      "15-30s narrative: Problem reveal → Expert solution → Quick demo",
      "CTA variations: Learn more / Get access / Try now"
    ]
  },
  {
    id: 4,
    title: "Strategic Foresight",
    description: "Predict trend longevity, evolution paths, and common execution mistakes.",
    icon: <BarChart3 className="h-6 w-6" />,
    example: "Longevity score: 4/5 - Professional content formats have lasting power",
    insights: [
      "Evolution: Will shift to more niche professional topics",
      "Avoid: Over-complicated explanations, poor audio quality",
      "Future-proof: Focus on the teaching format, not specific topics"
    ]
  }
];

export function TikTokAnalysisShowcase() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = analysisSteps.find(step => step.id === activeStep);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="h-4 w-4 mr-2" />
              TikTok Intelligence Framework
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Turn Viral Trends Into High-Converting Scripts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we deconstruct TikTok trends using our 4-phase analytical framework to create platform-native paid media that actually converts.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Video Demo Area */}
            <div className="space-y-6">
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-[9/16] max-w-sm mx-auto shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Interactive Demo</h3>
                    <p className="text-sm opacity-90">See our analysis in action</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h4 className="font-semibold text-gray-900 mb-3">Current Analysis: Professional Teaching Format</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Target: B2B professionals seeking expertise</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    <span>Trend Score: 4.2/5 - High longevity potential</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Conversion Potential: Premium education/consulting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Framework */}
            <div className="space-y-6">
              {/* Step Navigation */}
              <div className="grid grid-cols-2 gap-3">
                {analysisSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      activeStep === step.id
                        ? 'border-orange-500 bg-orange-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-lg mr-3 ${
                        activeStep === step.id ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step.icon}
                      </div>
                      <span className="font-semibold text-sm">{step.title}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-tight">{step.description}</p>
                  </button>
                ))}
              </div>

              {/* Active Step Details */}
              {currentStep && (
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg mr-4">
                      {currentStep.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentStep.title}</h3>
                      <p className="text-gray-600">{currentStep.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Example Application:</h4>
                      <p className="text-gray-700 italic">"{currentStep.example}"</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Insights:</h4>
                      <ul className="space-y-2">
                        {currentStep.insights.map((insight, index) => (
                          <li key={index} className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
                <h4 className="text-lg font-bold mb-2">Ready to Turn Trends Into Revenue?</h4>
                <p className="text-orange-100 mb-4">
                  Get weekly trend analyses with ready-to-use script templates delivered every Monday.
                </p>
                <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 flex items-center">
                  See Weekly Plans
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