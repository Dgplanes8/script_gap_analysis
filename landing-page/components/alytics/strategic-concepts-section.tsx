'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Lightbulb, Shield, Users, Brain, Target } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

const conceptCards = [
  {
    icon: Shield,
    title: "The Accountability Engine",
    persona: "Stressed-Out Project Manager",
    emotion: "Relief & Security",
    trigger: "Project delay blamed on meeting miscommunication",
    positioning: "SyncUp isn't a note-taker, it's a safety net for your projects",
    formats: ["UGC (screen-recording style)", "Us vs Them (comparison)", "Before & After"],
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    icon: Users,
    title: "The Meeting Hater's Ally",
    persona: "Over-booked Senior Developer/Creative",
    emotion: "Liberation & Empowerment",
    trigger: "Dread at a calendar full of meetings",
    positioning: "Make meetings so efficient you'll need fewer of them",
    formats: ["Meme Ad", "Statistics Ad", "Reels (quick cuts)"],
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    icon: Brain,
    title: "The Second Brain",
    persona: "Visionary Founder or Consultant",
    emotion: "Competence & Power",
    trigger: "Forgetting a brilliant insight from a call",
    positioning: "SyncUp is the infallible second brain for you and your business",
    formats: ["Founder Video", "Press-style Ad", "Testimonial Ad"],
    color: "bg-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  }
];

export function StrategicConceptsSection() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-[1200px] mx-auto">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-20"
        >
          
          {/* Section Header */}
          <div className="text-center">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Lightbulb className="w-4 h-4 mr-2" />
                Strategic Concept Development
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight"
            >
              From Research to Strategic Concepts
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              We transform customer research into strategic concepts. Each concept targets a specific persona, emotion, and positioning strategy.
            </motion.p>
          </div>

          {/* Three Big Ideas Image */}
          <motion.div
            variants={itemVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-100 mb-12">
              <div className="relative">
                <Image
                  src="/images/2_Concept-Ideation-Three-Big-Ideas.png"
                  alt="Concept Ideation: Three Big Ideas - Strategic concepts including Accountability Engine, Meeting Hater's Ally, and Second Brain with target personas, core emotions, triggers, and positioning strategies"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-xl pointer-events-none"></div>
              </div>
            </div>
          </motion.div>

          {/* Strategic Concepts Breakdown */}
          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-3 gap-8"
          >
            {conceptCards.map((concept, index) => (
              <motion.div
                key={concept.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                }}
                className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${concept.borderColor} group cursor-pointer relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className={`absolute top-0 right-0 w-24 h-24 ${concept.bgColor} rounded-full -translate-y-6 translate-x-6 opacity-50`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 ${concept.color} rounded-xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <concept.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {concept.title}
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Target Persona:</span>
                      <p className="text-gray-600 mt-1">{concept.persona}</p>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Core Emotion:</span>
                      <p className="text-gray-600 mt-1">{concept.emotion}</p>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Trigger:</span>
                      <p className="text-gray-600 mt-1">{concept.trigger}</p>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Positioning:</span>
                      <p className="text-gray-600 mt-1 italic">"{concept.positioning}"</p>
                    </div>
                  </div>
                  
                  {/* Format Tags */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">FORMAT OPTIONS</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {concept.formats.map((format, formatIndex) => (
                        <span
                          key={formatIndex}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Strategic Benefits */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Why Strategic Concepts Work
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Precise Targeting</h4>
                <p className="text-blue-100 text-sm">
                  Each concept speaks to a specific persona's deepest motivations
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Emotional Connection</h4>
                <p className="text-blue-100 text-sm">
                  Triggers core emotions that drive purchasing decisions
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Multiple Executions</h4>
                <p className="text-blue-100 text-sm">
                  One concept becomes multiple ad formats and campaigns
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-lg font-medium mb-2">
                "This strategic approach is why our clients see 3-5x better performance than industry averages"
              </p>
              <p className="text-blue-200 text-sm">
                Based on analysis of $250MM+ in managed media spend
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}