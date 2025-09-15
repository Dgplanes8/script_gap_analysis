'use client';

import { useState } from 'react';
import { ChevronDown, Target, Lightbulb, TrendingUp, FileText, BarChart3, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoModal } from './demo-modal';

interface AccordionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}

const processSteps: AccordionItem[] = [
  {
    id: 'customer-research',
    title: 'Customer Research',
    icon: <Target className="h-5 w-5" />,
    description: 'Pain & Dream Outcomes - Deep dive into your target audience\'s pain points and dream outcomes',
    details: [
      'Golden Pain Bank: Identify absolute dread moments and frustrations your audience faces',
      'Dream Outcome Vault: Map the perfect scenarios your customers want to achieve',
      'Emotional trigger identification for authentic connection',
      'Target persona development with specific pain point analysis'
    ]
  },
  {
    id: 'concept-ideation',
    title: 'Concept Ideation',
    icon: <Lightbulb className="h-5 w-5" />,
    description: 'Strategic concept development with proven emotional triggers and positioning',
    details: [
      'Target Persona Development: Detailed profiles including demographics, pain points, and behavioral triggers',
      'Core Emotion Identification: Relief & Security, Liberation & Empowerment, Competence & Power positioning strategies',
      'Trigger Analysis: Specific moments of frustration, desire, or urgency that drive action',
      'Strategic Positioning: How your solution uniquely addresses the core emotion vs. competitors',
      'Format Optimization: UGC, Us vs Them, Before & After, Meme Ads tailored to your personas'
    ]
  },
  {
    id: 'performance-prediction',
    title: 'Performance Prediction',
    icon: <BarChart3 className="h-5 w-5" />,
    description: 'Messaging Analysis - Score and validate concepts using proven frameworks',
    details: [
      'Performance scoring system (0-25 points) for each concept',
      'Emotional resonance and benefit clarity analysis',
      'Attention capture and memorability assessment',
      'Script format breakdown with target persona validation'
    ]
  },
  {
    id: 'scripts-headlines',
    title: 'Scripts & Headlines',
    icon: <FileText className="h-5 w-5" />,
    description: 'Bringing Concepts to Life - Complete, tested scripts across multiple ad formats',
    details: [
      'Hook variations: Problem-focused and solution-focused openings',
      'Complete script framework: HOOK → PROBLEM → AUTHORITY → DEMO → OUTCOME → CTA',
      'Social proof and authority positioning strategies',
      'Platform-specific optimization for TikTok, Instagram, Facebook, and LinkedIn'
    ]
  }
];

export function ProcessAccordion() {
  const [openItem, setOpenItem] = useState<string>('customer-research');
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? '' : itemId);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="mb-3">
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              Our Process
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Strategic Creative Intelligence in 4 Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From audience research to ready-to-launch scripts, delivered every Monday
          </p>
        </div>

        {/* Demo Link */}
        <div className="text-center mb-8">
          <button
            onClick={() => setDemoModalOpen(true)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            See a demo of our weekly delivery
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {processSteps.map((step, index) => {
            const isOpen = openItem === step.id;
            
            return (
              <div
                key={step.id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleItem(step.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${step.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {step.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`panel-${step.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 border-t border-gray-100">
                        <div className="pt-4">
                          <h4 className="font-medium text-gray-900 mb-3">What you get:</h4>
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-sm text-gray-600 leading-relaxed">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Demo Modal */}
        <DemoModal 
          isOpen={demoModalOpen} 
          onClose={() => setDemoModalOpen(false)} 
        />

      </div>
    </section>
  );
}