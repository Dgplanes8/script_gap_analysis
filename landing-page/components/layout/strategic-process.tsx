'use client';

import { useState } from 'react';
import { 
  Search, 
  Target, 
  Lightbulb, 
  PenTool, 
  Play, 
  BarChart3, 
  FileText, 
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useConsultation } from '@/components/contexts/consultation-context';

export function StrategyProcess() {
  const { openModal: openConsultation } = useConsultation();
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const phases = [
    {
      phase: 1,
      title: 'Brand Setup',
      icon: Target,
      description: 'Brand profile creation and strategic foundation',
      details: 'Comprehensive brand analysis, market positioning, and strategic framework establishment',
      category: 'Foundation'
    },
    {
      phase: 2,
      title: 'Market Research',
      icon: Search,
      description: 'Deep market and audience intelligence gathering',
      details: 'Advanced market research using multiple data sources and competitive intelligence',
      category: 'Foundation'
    },
    {
      phase: 3,
      title: 'Social Listening',
      icon: Users,
      description: 'Authentic voice capture and sentiment analysis',
      details: 'Reddit mining, review analysis, and customer language extraction',
      category: 'Foundation'
    },
    {
      phase: 4,
      title: 'Competitive Analysis',
      icon: BarChart3,
      description: 'Strategic competitor positioning and gap identification',
      details: 'Deep dive into competitor strategies, messaging, and market positioning',
      category: 'Analysis'
    },
    {
      phase: 5,
      title: 'Gap Analysis',
      icon: Zap,
      description: 'Strategic opportunity identification and prioritization',
      details: 'Market gap analysis, opportunity sizing, and strategic positioning recommendations',
      category: 'Analysis'
    },
    {
      phase: 6,
      title: 'Concept Generation',
      icon: Lightbulb,
      description: 'Strategic concept ideation and validation',
      details: 'Multiple concept development with format variations and strategic positioning',
      category: 'Creative Development'
    },
    {
      phase: 7,
      title: 'Copy Development',
      icon: PenTool,
      description: 'High-performance copy creation and optimization',
      details: 'Hook and headline creation with predictive performance scoring',
      category: 'Creative Development'
    },
    {
      phase: 8,
      title: 'Script Generation',
      icon: Play,
      description: 'Full script variations using validated concepts',
      details: 'Complete script development with multiple variations and testing frameworks',
      category: 'Creative Development'
    },
    {
      phase: 9,
      title: 'Creative Validation',
      icon: CheckCircle,
      description: 'Comprehensive concept and script validation',
      details: 'Final validation framework ensuring strategic alignment and performance potential',
      category: 'Creative Development'
    },
    {
      phase: 10,
      title: 'Creative Brief',
      icon: FileText,
      description: 'Production-ready creative briefing',
      details: 'Detailed creative brief for seamless team handoff and execution',
      category: 'Finalization'
    },
    {
      phase: 11,
      title: 'Final Analysis',
      icon: TrendingUp,
      description: 'Strategic implementation roadmap',
      details: 'Comprehensive strategic analysis with implementation timeline and success metrics',
      category: 'Finalization'
    }
  ];

  const categories = [
    { name: 'Foundation', color: 'bg-blue-100 text-blue-800', phases: [1, 2, 3] },
    { name: 'Analysis', color: 'bg-green-100 text-green-800', phases: [4, 5] },
    { name: 'Creative Development', color: 'bg-purple-100 text-purple-800', phases: [6, 7, 8, 9] },
    { name: 'Finalization', color: 'bg-orange-100 text-orange-800', phases: [10, 11] }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-6">
            <Target className="h-4 w-4 mr-2" />
            Fortune 100 Systematic Methodology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The 11-Phase Strategic Process
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The same systematic methodology used to manage $100M+ in ad spend for Fortune 100 companies, 
            now available for subscription businesses ready to scale strategically.
          </p>
        </div>

        {/* Category Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <div key={category.name} className="text-center">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-3 ${category.color}`}>
                Phase {category.phases[0]}-{category.phases[category.phases.length - 1]}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600">
                {category.phases.length} phases focused on {category.name.toLowerCase()}
              </p>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const category = categories.find(cat => cat.phases.includes(phase.phase));
              const isActive = activePhase === phase.phase;
              
              return (
                <div
                  key={phase.phase}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'border-indigo-500 shadow-xl transform -translate-y-2' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                  }`}
                  onMouseEnter={() => setActivePhase(phase.phase)}
                  onMouseLeave={() => setActivePhase(null)}
                >
                  {/* Phase Number */}
                  <div className="absolute -top-4 left-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {phase.phase}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-4 ${category?.color}`}>
                    {category?.name}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    isActive ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-6 w-6 ${isActive ? 'text-indigo-600' : 'text-gray-600'}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {phase.description}
                  </p>
                  
                  {/* Expanded Details */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 italic">
                        {phase.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why This Systematic Approach Works
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlike agencies that jump straight to creative execution, our systematic approach 
              ensures every decision is strategic, data-driven, and aligned with your business goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Strategic Foundation</h4>
              <p className="text-gray-600">
                Every creative decision is grounded in strategic research and market intelligence
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Data-Driven Validation</h4>
              <p className="text-gray-600">
                Multiple validation checkpoints ensure optimal performance before launch
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Systematic Scaling</h4>
              <p className="text-gray-600">
                Proven methodology that scales with your business as you grow
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Implement This Systematic Approach?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Book a free strategic consultation to see how this 11-phase methodology 
              can transform your subscription business performance.
            </p>
            <button
              onClick={openConsultation}
              className="bg-indigo-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-200 inline-flex items-center"
            >
              Book Strategic Consultation
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Free consultation • Custom strategic assessment • No obligation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}