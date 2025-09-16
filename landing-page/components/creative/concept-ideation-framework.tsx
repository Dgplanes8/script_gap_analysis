'use client';

import { useState } from 'react';
import { Brain, Users, Heart, Target, Eye, Lightbulb, ArrowRight, Play } from 'lucide-react';

interface ConceptExample {
  id: number;
  name: string;
  target: string;
  emotion: string;
  lifeForce: string;
  awareness: string;
  moment: string;
  format: string;
  positioning: string;
  formats: string[];
}

const conceptExamples: ConceptExample[] = [
  {
    id: 1,
    name: "The 5-Minute Professional",
    target: "Working women 28-40, middle to upper-middle income, urban/suburban",
    emotion: "Relief from time stress → Professional confidence",
    lifeForce: "Survival (time efficiency) + Social Approval (professional appearance)",
    awareness: "Solution-Aware",
    moment: "When morning routine feels rushed and overwhelming but professional appearance is non-negotiable",
    format: "Time-lapse tutorial with timer",
    positioning: "Professional confidence in 5 minutes or less",
    formats: ["Time-lapse tutorial", "Morning routine comparison", "Real-life scenario UGC", "Professional testimonial", "Challenge format"]
  },
  {
    id: 2, 
    name: "Expert Authority Simplified",
    target: "Premium makeup brand customers 30-45, beauty enthusiasts, higher income",
    emotion: "Frustration with DIY attempts → Expert mastery confidence",
    lifeForce: "To be superior (expertise/mastery)",
    awareness: "Problem-Aware", 
    moment: "When overwhelmed by product choices and seeking expert guidance vs trial and error",
    format: "Makeup artist secrets reveal",
    positioning: "30 years of makeup artistry, simplified for real life",
    formats: ["Makeup artist secrets", "Celebrity technique breakdown", "Expert vs amateur", "Professional transformation", "Industry insider story"]
  },
  {
    id: 3,
    name: "Real Women, Real Results",
    target: "Women 35-50, diverse backgrounds, working mothers and professionals", 
    emotion: "Feeling excluded by youth-focused marketing → Age-appropriate confidence",
    lifeForce: "Social Approval (age-appropriate confidence)",
    awareness: "Product-Aware",
    moment: "When tired of unrealistic beauty standards and seeking makeup for real life scenarios",
    format: "Age-diverse testimonials",
    positioning: "Makeup that works for your real life, not your Instagram",
    formats: ["Age-diverse testimonials", "Real life scenarios", "Honest before/after", "Mother-daughter comparison", "Professional confidence"]
  }
];

const awarenessLevels = [
  { key: 'unaware', label: 'Unaware', color: 'bg-gray-100 text-gray-700', description: 'Story lead (slow reveal)' },
  { key: 'problem-aware', label: 'Problem-Aware', color: 'bg-brand-100 text-brand-700', description: 'Proclamation lead' },
  { key: 'solution-aware', label: 'Solution-Aware', color: 'bg-brand-100 text-brand-700', description: 'Problem-solution lead' },
  { key: 'product-aware', label: 'Product-Aware', color: 'bg-blue-100 text-blue-700', description: 'Promise lead' },
  { key: 'most-aware', label: 'Most-Aware', color: 'bg-brand-100 text-brand-700', description: 'Offer lead' }
];

const formatTypes = [
  'UGC', 'Mash up', 'Founder video', 'Us vs them', 'Before and after', 
  '3 reasons why', 'Why I regret', 'Press ad', 'Testimonial ad', 'Meme ad',
  'Headline feature callout', 'Post it note ad', 'Statistics ads'
];

export function ConceptIdeationFramework() {
  const [activeConcept, setActiveConcept] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const concept = conceptExamples[activeConcept];

  return (
    <section className="py-16 bg-gradient-to-br from-brand-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-100 to-blue-100 text-brand-800 rounded-full text-sm font-semibold mb-6">
              <Brain className="h-4 w-4 mr-2" />
              Concept Ideation System
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Strategic Concept Development Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we generate 3 strategic concepts using proven ideation models, then create 3-5 format variations for each concept (15 ads total).
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Concept Selection */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Concepts</h3>
              <div className="space-y-3">
                {conceptExamples.map((concept, index) => (
                  <button
                    key={concept.id}
                    onClick={() => setActiveConcept(index)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      activeConcept === index
                        ? 'border-brand-500 bg-brand-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">{concept.name}</div>
                    <div className="text-sm text-gray-600">{concept.target}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Concept Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border-2 border-brand-100 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{concept.name}</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Core Elements */}
                  <div className="space-y-4">
                    <div 
                      className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedElement('target')}
                    >
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="font-semibold text-gray-900">Target Avatar</span>
                      </div>
                      <p className="text-sm text-gray-700">{concept.target}</p>
                    </div>

                    <div 
                      className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedElement('emotion')}
                    >
                      <div className="flex items-center mb-2">
                        <Heart className="h-5 w-5 text-brand-500 mr-2" />
                        <span className="font-semibold text-gray-900">Core Emotion</span>
                      </div>
                      <p className="text-sm text-gray-700">{concept.emotion}</p>
                    </div>

                    <div 
                      className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedElement('lifeForce')}
                    >
                      <div className="flex items-center mb-2">
                        <Target className="h-5 w-5 text-brand-500 mr-2" />
                        <span className="font-semibold text-gray-900">Life Force 8</span>
                      </div>
                      <p className="text-sm text-gray-700">{concept.lifeForce}</p>
                    </div>
                  </div>

                  {/* Strategic Elements */}
                  <div className="space-y-4">
                    <div 
                      className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedElement('awareness')}
                    >
                      <div className="flex items-center mb-2">
                        <Eye className="h-5 w-5 text-brand-500 mr-2" />
                        <span className="font-semibold text-gray-900">Awareness Level</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          awarenessLevels.find(level => level.label === concept.awareness)?.color
                        }`}>
                          {concept.awareness}
                        </span>
                      </div>
                    </div>

                    <div 
                      className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedElement('moment')}
                    >
                      <div className="flex items-center mb-2">
                        <Lightbulb className="h-5 w-5 text-brand-500 mr-2" />
                        <span className="font-semibold text-gray-900">Target Moment</span>
                      </div>
                      <p className="text-sm text-gray-700">{concept.moment}</p>
                    </div>

                    <div 
                      className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedElement('positioning')}
                    >
                      <div className="flex items-center mb-2">
                        <Play className="h-5 w-5 text-brand-500 mr-2" />
                        <span className="font-semibold text-gray-900">Product Positioning</span>
                      </div>
                      <p className="text-sm text-gray-700 italic">"{concept.positioning}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Format Variations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Format Variations (5 per concept)</h3>
              <span className="text-sm text-gray-600">15 total ads from 3 concepts</span>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {concept.formats.map((format, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">{format}</h4>
                    <p className="text-xs text-gray-600">Platform-optimized execution</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ideation Models Used */}
          <div className="mt-8 bg-gradient-to-r from-brand-600 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Ideation Models Applied</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Core Advertising Models</h4>
                <ul className="text-sm text-brand-100 space-y-1">
                  <li>• Jobs-to-be-Done Framework</li>
                  <li>• Pain-Pleasure-Gain Model</li>
                  <li>• Competitive Disruption</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Social Media Specific</h4>
                <ul className="text-sm text-brand-100 space-y-1">
                  <li>• Hook Framework</li>
                  <li>• Platform-Native Content</li>
                  <li>• Trend Adaptation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Strategic Frameworks</h4>
                <ul className="text-sm text-brand-100 space-y-1">
                  <li>• Cultural Tension Resolution</li>
                  <li>• Emotional Journey Mapping</li>
                  <li>• Persona-Based Targeting</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-brand-400">
              <button 
                onClick={() => {
                  const serviceTiersElement = document.getElementById('service-tiers');
                  if (serviceTiersElement) {
                    serviceTiersElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-brand-600 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors duration-200 flex items-center"
              >
                Get Weekly Concept Development
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}