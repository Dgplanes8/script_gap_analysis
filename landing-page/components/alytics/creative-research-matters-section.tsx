'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Zap, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export function CreativeResearchMattersSection() {
  const approaches = [
    {
      type: "fail",
      icon: <Target className="w-6 h-6" />,
      title: "Most Businesses",
      method: "Post random content",
      result: "Burn budget hoping something works",
      color: "text-[#EF4444]",
      bgColor: "bg-[#FEF2F2]",
      borderColor: "border-[#E5E7EB]"
    },
    {
      type: "fail",
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Traditional Agencies",
      method: "Use the same generic templates",
      result: "Identical ads as your competitors",
      color: "text-[#F97316]",
      bgColor: "bg-[#FFF7ED]",
      borderColor: "border-[#E5E7EB]"
    },
    {
      type: "success",
      icon: <Zap className="w-6 h-6" />,
      title: "APSICS Teams",
      method: "Launch research backed campaigns",
      result: "Scale predictable revenue growth",
      color: "text-[#126DFB]",
      bgColor: "bg-[#EFF6FF]",
      borderColor: "border-[#126DFB]"
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#111827] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Why Smart Growth Teams Choose{' '}
            <span className="text-transparent bg-gradient-to-r from-[#126DFB] to-[#126DFB] bg-clip-text">
              Research-Backed Creative Intelligence
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-[#4B5563] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            While competitors burn budget on creative guesswork, smart growth teams use research backed frameworks to turn every ad dollar into predictable revenue growth.
          </motion.p>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              variants={itemVariants}
              className={`rounded-2xl p-6 border-2 ${approach.bgColor} ${approach.borderColor} relative`}
            >
              {approach.type === "fail" && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#EF4444] rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">✗</span>
                </div>
              )}
              {approach.type === "success" && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
              )}

              <div className={`w-12 h-12 ${approach.bgColor} rounded-lg flex items-center justify-center mb-4 ${approach.color}`}>
                {approach.icon}
              </div>

              <h3 className={`text-lg font-bold mb-3 ${approach.color}`}>
                {approach.title}
              </h3>

              <div className="space-y-2">
                <p className="text-[#374151] font-medium">{approach.method}</p>
                <ArrowRight className="w-5 h-5 text-[#6B7280] mx-auto" />
                <p className={`font-semibold ${approach.color}`}>{approach.result}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Meta Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] rounded-2xl p-8 border border-[#126DFB] text-center shadow-lg"
        >
          <h3 className="text-2xl font-bold text-[#111827] mb-4">
            The Data Behind Why Creative Research Wins
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-[#126DFB] mb-2">56%</div>
              <p className="text-[#374151]">of ad performance determined by creative quality</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-[#126DFB] mb-2">1000+</div>
              <p className="text-[#374151]">high converting assets analyzed monthly for patterns</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-[#126DFB] mb-2">10x</div>
              <p className="text-[#374151]">faster campaign optimization vs trial and error</p>
            </div>
          </div>

          <p className="text-[#4B5563] mt-6 leading-relaxed">
            <strong>The reality:</strong> While competitors guess and burn budget, you'll know exactly what resonates with your customers before launching.
          </p>
        </motion.div>

      </div>
    </section>
  );
}