'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, TrendingUp, Target, Zap, Play, FileText, BarChart3 } from 'lucide-react';

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

const templatePreviewCards = [
  {
    id: 'tiktok-template',
    platform: 'TikTok',
    title: 'Viral Hook Templates',
    description: 'Ready-to-use TikTok scripts with trending hooks and performance scores',
    icon: Play,
    color: 'bg-pink-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    example: 'You\'ve been creating content wrong... Hook Score: 24/25',
    placeholder: '[TikTok Video Template Preview]'
  },
  {
    id: 'facebook-template',
    platform: 'Facebook',
    title: 'Ad Copy Templates',
    description: 'High-converting Facebook ad scripts with proven frameworks',
    icon: Target,
    color: 'bg-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    example: 'Problem-Agitate-Solution with social proof integration',
    placeholder: '[Facebook Ad Template Preview]'
  },
  {
    id: 'instagram-template',
    platform: 'Instagram',
    title: 'Story Templates',
    description: 'Engaging Instagram content with swipe-up optimization',
    icon: Zap,
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    example: 'Visual storytelling with trend-based hooks',
    placeholder: '[Instagram Story Template Preview]'
  },
  {
    id: 'linkedin-template',
    platform: 'LinkedIn',
    title: 'Professional Posts',
    description: 'B2B focused content with authority-building elements',
    icon: FileText,
    color: 'bg-indigo-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    example: 'Thought leadership with data-driven insights',
    placeholder: '[LinkedIn Post Template Preview]'
  }
];

const deliverySteps = [
  {
    step: '01',
    day: 'Monday Morning',
    title: 'Custom Scripts Delivered',
    description: 'Get 2-4 custom scripts based on trending data and your brand profile, delivered straight to your inbox with performance scores.',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    step: '02', 
    day: 'Copy & Customize',
    title: 'Quick Implementation',
    description: 'Copy the highest-scoring scripts and customize them for your brand voice. Each script includes hook variations and CTA options.',
    icon: FileText,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    step: '03',
    day: 'Launch & Scale',
    title: 'Track Performance',
    description: 'Launch your campaigns and track performance. Use our scoring methodology to optimize and scale winning content.',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

const sampleScriptPreview = {
  hook: "You've been creating content without knowing what's trending or converting...",
  hookScore: '23/25',
  framework: 'Problem-Agitate-Solution',
  platform: 'TikTok/Instagram Reels',
  estimatedCTR: '4.2%',
  conversionPotential: 'High'
};

export function WeeklyDeliveryShowcase() {
  return (
    <section className="py-20 px-6 bg-white">
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
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Calendar className="w-4 h-4 mr-2" />
                Weekly Delivery
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight"
            >
              What You Get Every Monday
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Custom scripts based on real trending data, performance-scored hooks, and ready-to-launch content templates delivered weekly to fuel your growth.
            </motion.p>
          </div>

          {/* Template Previews Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {templatePreviewCards.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
              >
                {/* Platform Badge */}
                <div className={`inline-flex items-center ${template.bgColor} ${template.textColor} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
                  <template.icon className="w-4 h-4 mr-2" />
                  {template.platform}
                </div>

                {/* Template Preview Placeholder */}
                <div className="bg-gray-50 rounded-xl h-32 flex items-center justify-center mb-4 border border-gray-100">
                  <span className="text-gray-500 text-sm text-center px-2">
                    {template.placeholder}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>
                
                {/* Example */}
                <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700">
                  <div className="font-medium">Example:</div>
                  <div className="mt-1 italic">"{template.example}"</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Performance Prediction & Messaging Showcase */}
          <motion.div
            variants={itemVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BarChart3 className="w-4 h-4 mr-2" />
                Performance Prediction
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                We Predict Performance Before You Launch
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Every concept gets scored using our proven methodology. Here's how we analyze and rank strategic ideas before development.
              </p>
            </div>

            {/* Performance Prediction Image */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-100 mb-12"
            >
              <div className="relative">
                <Image
                  src="/images/3_Performance-Prediction-and-Messaging.png"
                  alt="Performance Prediction & Messaging - Shows concept scoring methodology with Accountability Engine (92%), Meeting Hater's Ally (84%), and Second Brain (76%) performance predictions"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-xl pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Performance Analysis Explanation */}
            <motion.div
              variants={itemVariants}
              className="grid lg:grid-cols-3 gap-8"
            >
              
              {/* High Performance - 92% */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">92%</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">High Performance</h4>
                    <p className="text-sm text-gray-600">Score: 23/25</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Accountability Engine</strong> - High emotional resonance & benefit clarity
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Strong target persona match</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Clear problem-solution fit</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>UGC format ready</span>
                  </div>
                </div>
              </div>

              {/* Medium Performance - 84% */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">84%</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Strong Performance</h4>
                    <p className="text-sm text-gray-600">Score: 21/25</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Meeting Hater's Ally</strong> - High attention capture & memorability
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>Broad audience appeal</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>Multiple format options</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>Statistics & meme potential</span>
                  </div>
                </div>
              </div>

              {/* Lower Performance - 76% */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">76%</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Focused Performance</h4>
                    <p className="text-sm text-gray-600">Score: 19/25</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Second Brain</strong> - Strong for specific persona, less broad appeal
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span>Niche but powerful positioning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span>High-value audience</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span>Premium positioning ready</span>
                  </div>
                </div>
              </div>

            </motion.div>

          </motion.div>

          {/* 3-Step Process */}
          <motion.div
            variants={itemVariants}
            className="space-y-12"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Your Weekly Success Process
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From delivery to launch in under 10 minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {deliverySteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="text-center relative"
                >
                  {/* Connector Line */}
                  {index < deliverySteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200 -z-10" />
                  )}
                  
                  {/* Step Icon */}
                  <div className={`w-24 h-24 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 relative z-10`}>
                    <step.icon className={`w-10 h-10 ${step.color}`} />
                  </div>

                  {/* Step Number */}
                  <div className="text-sm font-bold text-gray-400 mb-2">
                    STEP {step.step}
                  </div>

                  {/* Day Label */}
                  <div className="text-sm font-medium text-blue-600 mb-2">
                    {step.day}
                  </div>

                  {/* Step Content */}
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scripts & Headlines: Bringing Concepts to Life */}
          <motion.div
            variants={itemVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FileText className="w-4 h-4 mr-2" />
                Scripts & Headlines
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                From Concepts to Complete Scripts
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See how we transform strategic concepts into ready-to-use scripts with hooks, social proof, demos, and compelling CTAs.
              </p>
            </div>

            {/* Scripts & Headlines Image */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-100 mb-12"
            >
              <div className="relative">
                <Image
                  src="/images/4_Scripts-and-Headlines-Bringing-Concepts-to-Life.png"
                  alt="Scripts & Headlines: Bringing Concepts to Life - Complete script breakdown showing Hook, Problem, Social Proof/Authority, Demo, Failed Solution, Desired Outcome, and CTA structure for Accountability Engine and Meeting Hater's Ally concepts"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-xl pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Script Components Explanation */}
            <motion.div
              variants={itemVariants}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              
              {/* Hook */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Hook</h4>
                <p className="text-sm text-gray-600">
                  Attention-grabbing opener that stops the scroll
                </p>
              </div>

              {/* Problem/Solution */}
              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Problem-Solution</h4>
                <p className="text-sm text-gray-600">
                  Clear pain point identification and solution positioning
                </p>
              </div>

              {/* Social Proof */}
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Social Proof</h4>
                <p className="text-sm text-gray-600">
                  Authority building and credibility establishment
                </p>
              </div>

              {/* CTA */}
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">CTA</h4>
                <p className="text-sm text-gray-600">
                  Compelling call-to-action that drives conversion
                </p>
              </div>

            </motion.div>

            {/* Script Quality Assurance */}
            <motion.div
              variants={itemVariants}
              className="mt-12 bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    Every Script Includes
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Multiple hook variations</p>
                        <p className="text-sm text-gray-600">3-5 different opening options tested for engagement</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Platform-specific formatting</p>
                        <p className="text-sm text-gray-600">Optimized for TikTok, Facebook, Instagram, LinkedIn</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Performance scoring</p>
                        <p className="text-sm text-gray-600">Each element rated for predicted conversion potential</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900">21-25</div>
                    <div className="text-sm text-gray-600">Average Script Score</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Hook Quality</span>
                      <span className="font-medium">24/25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Problem Clarity</span>
                      <span className="font-medium">23/25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">CTA Strength</span>
                      <span className="font-medium">22/25</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center font-semibold">
                        <span className="text-gray-900">Total Score</span>
                        <span className="text-green-600">23/25</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </motion.div>

          {/* Performance Dashboard Preview */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BarChart3 className="w-4 h-4 mr-2" />
                Performance Tracking
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Track Your Success With Our Methodology
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Monitor script performance, optimize winning content, and scale your most successful campaigns using our proven scoring system.
              </p>
            </div>

            {/* Dashboard Preview Placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-lg h-48 flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-500 text-sm">
                    [Performance Dashboard Screenshot]
                  </span>
                  <p className="text-xs text-gray-400 mt-2 max-w-xs">
                    Real-time script performance, trending analysis, and ROI tracking
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}