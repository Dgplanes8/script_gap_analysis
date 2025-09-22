'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const processSteps = [
  {
    number: "01",
    title: "YOUR Customer Research",
    subtitle: "Pain & Dream Outcomes",
    description: "Deep dive into YOUR specific audience's pain points and aspirations to craft messages that truly resonate with your customers.",
    image: "/images/customer-research (5).webp",
    delay: 0.1,
    detailedContent: {
      overview: "We start by understanding YOUR specific audience at a psychological level - their frustrations, desires, and the outcomes they're really seeking. This extensive research most companies can't afford internally.",
      process: [
        "Pain Point Analysis: Identify the specific problems YOUR audience faces daily",
        "Dream Outcome Mapping: Understand what success looks like for YOUR customers",
        "Emotional Triggers: Discover the feelings that drive YOUR customers' purchasing decisions",
        "Messaging Foundation: Create the emotional blueprint specifically for YOUR brand"
      ],
      outcome: "A comprehensive audience psychology profile for YOUR business that ensures every piece of content speaks directly to what your customers actually want."
    }
  },
  {
    number: "02",
    title: "Custom Concept Ideation",
    subtitle: "Three Big Ideas For YOUR Brand",
    description: "Generate breakthrough creative concepts specifically for YOUR brand voice that cut through the noise and capture YOUR audience's attention.",
    image: "/images/concept-ideation (4).webp",
    delay: 0.2,
    detailedContent: {
      overview: "Using YOUR audience insights, we develop three distinct creative concepts that each approach YOUR message from a different angle. We work directly with you to refine concepts based on your learnings.",
      process: [
        "Angle Development: Create unique perspectives on YOUR core message",
        "Hook Creation: Develop attention-grabbing opening statements for YOUR brand",
        "Concept Testing: Validate ideas against YOUR audience psychology",
        "Collaborative Refinement: Work with you to polish concepts for maximum impact"
      ],
      outcome: "Three powerful creative directions specifically for YOUR brand that give you multiple ways to connect with your audience and stand out from competitors."
    }
  },
  {
    number: "03",
    title: "Performance Prediction",
    subtitle: "For YOUR Market & Goals",
    description: "Predict winning creatives for YOUR business before you spend a dollar using data-driven performance indicators tailored to your market.",
    image: "/images/performance-prediction (4).webp",
    delay: 0.3,
    detailedContent: {
      overview: "Before any content goes live, we analyze it against proven performance indicators to predict which concepts will drive the best results for YOUR specific market and goals.",
      process: [
        "Performance Scoring: Rate YOUR concepts against 15+ proven success factors",
        "Competitive Analysis: Benchmark against top-performing content in YOUR niche",
        "Risk Assessment: Identify potential performance blockers for YOUR business",
        "Custom Optimization: Suggest improvements specifically for YOUR launch strategy"
      ],
      outcome: "Confidence in YOUR content strategy with data-backed predictions of which concepts will generate the highest ROI for your business."
    }
  },
  {
    number: "04",
    title: "Scripts & Headlines",
    subtitle: "Ready-to-Launch For YOUR Business",
    description: "Transform concepts into conversion-optimized scripts and headlines written specifically for YOUR brand that drive measurable results.",
    image: "/images/scripts-headlines (4).webp",
    delay: 0.4,
    detailedContent: {
      overview: "We turn winning concepts into ready-to-use scripts and headlines optimized specifically for YOUR platforms and goals. Work directly with us to adapt content for your unique requirements.",
      process: [
        "Custom Script Development: Create compelling static and video narratives for YOUR brand that guide viewers to action",
        "Brand-Specific Headlines: Craft attention-grabbing titles in YOUR voice that stop the scroll",
        "CTA Optimization: Design calls-to-action that maximize YOUR conversion rates",
        "Platform Adaptation: Tailor content for Facebook, Instagram, TikTok, LinkedIn, X, and YouTube"
      ],
      outcome: "Battle-tested static and video scripts and headlines written specifically for YOUR brand, ready to deploy across Facebook, Instagram, TikTok, LinkedIn, X, and YouTube with confidence in their performance potential."
    }
  }
];

export function FourBoxProcessSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardNumber: string) => {
    setExpandedCard(expandedCard === cardNumber ? null : cardNumber);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F8F8F8]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6 tracking-tight">
            How We Create Custom Strategy For YOUR Brand
          </h2>
          <p className="text-lg text-[#4B5563] max-w-3xl mx-auto leading-relaxed">
            We work directly with you to deliver ready-to-launch concepts tailored specifically to your business
          </p>
        </motion.div>

        {/* 4-Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: step.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-[#E5E7EB]"
            >
              {/* Step Number */}
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-[#126DFB] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-[#111827] tracking-tight">{step.title}</h3>
                  <p className="text-[#126DFB] font-semibold">{step.subtitle}</p>
                </div>
              </div>

              {/* Process Image */}
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-white shadow-inner border border-[#E5E7EB]">
                <Image
                  src={step.image}
                  alt={`${step.title} - ${step.subtitle}`}
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#EFF6FF]/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Description */}
              <p className="text-[#4B5563] leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Learn More Button */}
              <button
                onClick={() => toggleCard(step.number)}
                className="flex items-center justify-center w-full mt-4 px-4 py-3 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#126DFB] font-semibold rounded-xl transition-colors duration-200"
              >
                <span>Learn More</span>
                {expandedCard === step.number ? (
                  <ChevronUpIcon className="ml-2 h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="ml-2 h-5 w-5" />
                )}
              </button>

              {/* Expanded Content */}
              {expandedCard === step.number && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-6 bg-[#EFF6FF] rounded-xl border border-[#E5E7EB]"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#111827] mb-2">Overview</h4>
                      <p className="text-[#374151] leading-relaxed">{step.detailedContent.overview}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#111827] mb-3">Our Process</h4>
                      <ul className="space-y-2">
                        {step.detailedContent.process.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-[#126DFB] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-[#374151]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#111827] mb-2">What You Get</h4>
                      <p className="text-[#374151] leading-relaxed">{step.detailedContent.outcome}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto leading-relaxed">
            Ready to see custom strategy created specifically for YOUR brand?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg"
          >
            Get Your Free Strategy Session
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}