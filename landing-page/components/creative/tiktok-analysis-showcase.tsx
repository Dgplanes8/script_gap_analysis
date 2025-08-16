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
    example: "Virtual courtroom with judge reading defendant's shocking criminal record list",
    insights: [
      "Core emotion: Raw, unfiltered reality + dark humor + schadenfreude",
      "Visual formula: Split screen (judge/defendant), focus on facial expressions",
      "Psychology: Voyeuristic glimpse into high-stakes drama, relatability validation"
    ]
  },
  {
    id: 2,
    title: "Strategic Application",
    description: "Map trend potential to brand archetypes and identify authenticity requirements.",
    icon: <Target className="h-6 w-6" />,
    example: "Perfect for: The Jester (humor brands), The Sage (educational), The Everyman (relatable)",
    insights: [
      "Best fit: Brands that can handle edgy humor without being tone-deaf",
      "Authenticity test: Is the 'crime' a genuine relatable pain point?",
      "Strategic angle: Problems = charges, product = verdict/solution"
    ]
  },
  {
    id: 3,
    title: "Paid Media Templates",
    description: "Create adaptable hook formulas and narrative structures for immediate implementation.",
    icon: <Zap className="h-6 w-6" />,
    example: "Hook: 'You've been charged with [Number] counts of [Relatable Problem]'",
    insights: [
      "Universal formula: Direct accusation + relatable 'crimes'",
      "15-30s narrative: Hook → List charges → Product as solution",
      "CTA variations: 'Plead not guilty' / 'Avoid repeat offense' / 'Get defense'"
    ]
  },
  {
    id: 4,
    title: "Strategic Foresight",
    description: "Predict trend longevity, evolution paths, and common execution mistakes.",
    icon: <BarChart3 className="h-6 w-6" />,
    example: "Longevity score: 3/5 - Core 'list reaction' format is durable",
    insights: [
      "Evolution: Will adapt to therapist lists, teacher reports, friend interventions",
      "Avoid: Making light of serious crimes, low-quality audio mimicking",
      "Future-proof: Focus on 'reveal and react' dynamic, not courtroom aesthetic"
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

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Current Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <h4 className="font-semibold text-gray-900 mb-3">Current Analysis: Virtual Courtroom Trend</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Target: Audiences who relate to 'life choice consequences'</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  <span>Trend Score: 3/5 - Durable 'list reaction' format</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Conversion Potential: Problem-solution brands with humor</span>
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
                <button 
                  onClick={() => {
                    const serviceTiersElement = document.getElementById('service-tiers');
                    if (serviceTiersElement) {
                      serviceTiersElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 flex items-center"
                >
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