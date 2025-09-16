'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Target, Lightbulb, BarChart3, FileText, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface FrameworkSection {
  id: string;
  title: string;
  items: string[];
}

interface Framework {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image: string;
  sections: FrameworkSection[];
}

const frameworks: Framework[] = [
  {
    id: 'customer-research',
    step: 1,
    title: 'Customer Research',
    subtitle: 'Pain & Dream Outcomes',
    description: 'Deep dive into your target audience\'s pain points and dream outcomes.',
    icon: <Target className="w-6 h-6" />,
    color: 'from-brand-500 to-brand-600',
    image: '/images/Gemini_Generated_Image_lic7h2lic7h2lic7.webp',
    sections: [
      {
        id: 'pain-bank',
        title: 'Golden Pain Bank',
        items: [
          'The absolute dread of seeing my calendar with 6 back-to-back calls',
          'My boss asked for an update and I had a mini-panic attack',
          'We had this amazing brainstorm, and I distinctly remember someone coming up with a million-dollar idea. It\'s gone.',
          'I spent an hour re-watching a client call recording at 2x speed'
        ]
      },
      {
        id: 'dream-vault',
        title: 'Dream Outcome Vault',
        items: [
          'Walking away from a 60-minute strategy session with a perfectly organized project board in Asana',
          'Being able to fully focus on the client and build rapport during a call',
          'Skipping optional meetings and getting 3-minute summaries with action items',
          'My team finally stops asking "what are the next steps?" at the end of every call'
        ]
      }
    ]
  },
  {
    id: 'concept-ideation',
    step: 2,
    title: 'Concept Ideation',
    subtitle: 'Three Big Ideas',
    description: 'Generate three powerful creative concepts with proven emotional triggers.',
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    image: '/images/Gemini_Generated_Image_5h69xr5h69xr5h69.webp',
    sections: [
      {
        id: 'accountability-engine',
        title: 'The Accountability Engine',
        items: [
          'Target Persona: Stressed-Out Project Manager',
          'Core Emotion: Relief & Security',
          'Trigger: Project delay blamed on meeting miscommunication',
          'Positioning: SyncUp isn\'t a note-taker, it\'s a safety net for your projects',
          'Formats: UGC (screen-recording style), Us vs Them (comparison), Before & After'
        ]
      },
      {
        id: 'meeting-haters-ally',
        title: 'The Meeting Hater\'s Ally',
        items: [
          'Target Persona: Over-booked Senior Developer/Creative',
          'Core Emotion: Liberation & Empowerment',
          'Trigger: Dread at a calendar full of meetings',
          'Positioning: Make meetings so efficient you\'ll need fewer of them',
          'Formats: Meme Ad, Statistics Ad, Reels (quick cuts)'
        ]
      },
      {
        id: 'second-brain',
        title: 'The Second Brain',
        items: [
          'Target Persona: Visionary Founder or Consultant',
          'Core Emotion: Competence & Power',
          'Trigger: Forgetting a brilliant insight from a call',
          'Positioning: SyncUp is the infallible second brain for you and your business',
          'Formats: Founder Video, Press-style Ad, Testimonial Ad'
        ]
      }
    ]
  },
  {
    id: 'performance-prediction',
    step: 3,
    title: 'Performance Prediction',
    subtitle: 'Messaging Analysis',
    description: 'Score and validate concepts using proven frameworks.',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'from-brand-500 to-brand-600',
    image: '/images/Gemini_Generated_Image_av63zqav63zqav63.webp',
    sections: [
      {
        id: 'performance-scores',
        title: 'Performance Scores & Analysis',
        items: [
          'Accountability Engine: 92% (Score: 23/25) - High emotional resonance & benefit clarity',
          'Meeting Hater\'s Ally: 84% (Score: 21/25) - High attention capture & memorability',
          'Second Brain: 76% (Score: 19/25) - Strong for specific persona, but less broad appeal',
          'Top Concept: The Accountability Engine - Relief & Security positioning'
        ]
      },
      {
        id: 'script-breakdown',
        title: 'Script Format Breakdown',
        items: [
          'UGC Format (Screen Recording): "Stop manually updating Asana after meetings. I\'m going to show you an AI that does it for you, instantly."',
          'Us vs Them Format (Static): "Other AIs give you transcripts. SyncUp gives your team tasks."',
          'Target Persona: Stressed-Out Project Manager (30-45), manages teams in Asana/Jira',
          'Core Emotion: Relief & Security, Trigger: A task was dropped from a meeting'
        ]
      }
    ]
  },
  {
    id: 'scripts-headlines',
    step: 4,
    title: 'Scripts & Headlines',
    subtitle: 'Bringing Concepts to Life',
    description: 'Complete, tested scripts across multiple ad formats.',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-brand-500 to-brand-600',
    image: '/images/Gemini_Generated_Image_8iqfh58iqfh58iqf.webp',
    sections: [
      {
        id: 'hook-variations',
        title: 'Hook Variations',
        items: [
          'Hook: "My team used to drop tasks all the time. Then I found this tool, and now it\'s basically impossible to miss one."',
          'Hook: "Stop scrolling if you\'re tired of manually updating Asana after every meeting"',
          'Social Proof/Authority: "I was trying everything—manual notes, other AI transcribers—but I was still the bottleneck"',
          'Problem: "You know how it is. You have a great call, everyone agrees on next steps..."'
        ]
      },
      {
        id: 'complete-framework',
        title: 'Complete Script Framework',
        items: [
          'HOOK → PROBLEM → SOCIAL PROOF/AUTHORITY → FAILED SOLUTION → DEMO → DESIRED OUTCOME → CTA',
          'Demo: "Okay, check this out. SyncUp joins my Zoom call, and not only does it transcribe everything perfectly..."',
          'Desired Outcome: "Two minutes after the call ends, this entire project board in Asana was built for me"',
          'CTA: "My team is more aligned than ever, and I get like, 5 hours back a week. Seriously, go try it. It\'s a game-changer."',
          'Urgency: "Start Your Free Trial & Save 5 Hours This Week"'
        ]
      }
    ]
  }
];

interface FrameworkDashboardProps {
  className?: string;
}

export function FrameworkDashboard({ className = '' }: FrameworkDashboardProps) {
  const [expandedFramework, setExpandedFramework] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleFramework = (frameworkId: string) => {
    setExpandedFramework(expandedFramework === frameworkId ? null : frameworkId);
    // Reset expanded sections when switching frameworks
    setExpandedSections(new Set());
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`${className}`}>
      {/* Premium 4-Card Grid - Framer MCP Inspired */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
      >
        {frameworks.map((framework) => (
          <motion.div
            key={framework.id}
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" 
            }}
            className={`group cursor-pointer transition-all duration-500 ${
              expandedFramework === framework.id 
                ? 'scale-[1.02]' 
                : ''
            }`}
            onClick={() => toggleFramework(framework.id)}
          >
            {/* Premium Framer-Style Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              
              {/* Prominent Image Container - Hero Style */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={framework.image}
                  alt={`${framework.title} Framework`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={framework.step <= 2}
                />
                
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                
                {/* Step number badge - Premium styling */}
                <div className="absolute top-8 left-8">
                  <div className="w-16 h-16 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20">
                    <span className="text-xl font-bold text-gray-800">0{framework.step}</span>
                  </div>
                </div>
              </div>
              
              {/* Premium Content Area */}
              <div className="p-10">
                {/* Icon and Title Section */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-14 h-14 bg-[#126DFB]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#126DFB]/15 transition-all duration-300 flex-shrink-0">
                    <div className="text-[#126DFB] group-hover:scale-110 transition-transform duration-300">
                      {framework.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#126DFB] transition-colors duration-300 leading-tight">
                      {framework.title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                      {framework.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {framework.description}
                </p>
                
                {/* Premium expand indicator */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-500 group-hover:text-[#126DFB] transition-colors duration-300">
                    View framework details
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFramework === framework.id ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.25, 0, 1] }}
                    className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-[#126DFB]/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#126DFB] transition-colors duration-300" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Spacer for visual breathing room */}
      <div className="h-16" />
      
      {/* Expanded Content Below Grid */}
      <AnimatePresence>
        {expandedFramework && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.25, 0, 1] }}
            className="overflow-hidden"
          >
            {(() => {
              const framework = frameworks.find(f => f.id === expandedFramework);
              if (!framework) return null;
              
              return (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-5xl mx-auto">
                  {/* Clean Header */}
                  <div className="px-8 py-6 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#126DFB]/10 rounded-xl flex items-center justify-center">
                        <div className="text-[#126DFB]">
                          {framework.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-1">{framework.title}</h3>
                        <p className="text-gray-500 text-sm uppercase tracking-wider">{framework.subtitle}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacious Content */}
                  <div className="p-8 space-y-6">
                    {framework.sections.map((section) => (
                      <div key={section.id} className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/30">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection(section.id);
                          }}
                          className="w-full px-6 py-5 text-left hover:bg-gray-50/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#126DFB]/20 focus:ring-inset"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-3 h-3 bg-[#126DFB]/60 rounded-full"></div>
                              <h4 className="font-medium text-gray-900 text-lg">{section.title}</h4>
                              <span className="text-sm text-gray-400">({section.items.length} items)</span>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedSections.has(section.id) ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
                            >
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            </motion.div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedSections.has(section.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.25, 0.25, 0, 1] }}
                              className="border-t border-gray-200/60 bg-white"
                            >
                              <div className="p-6 space-y-4">
                                {section.items.map((item, itemIndex) => (
                                  <motion.div
                                    key={itemIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: itemIndex * 0.08 }}
                                    className="flex items-start gap-4"
                                  >
                                    <div className="w-2 h-2 bg-[#126DFB]/40 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600 leading-relaxed">{item}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}