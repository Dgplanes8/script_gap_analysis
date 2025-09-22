'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function BeforeAfterExamplesSection() {
  const examples = [
    {
      industry: "SaaS App (MoonBundle)",
      before: {
        headline: "\"Get More Sales With Product Bundles\"",
        problems: [
          "Generic bundling promise",
          "No emotional connection",
          "Focuses on features not outcomes",
          "Same as every competitor"
        ]
      },
      after: {
        headline: "\"I literally doubled my revenue thanks to Moon Bundle!\"",
        improvements: [
          "Real customer testimonial",
          "Specific revenue outcome",
          "Emotional transformation story",
          "Gift psychology differentiator"
        ],
        result: "23/25 Performance Score"
      }
    },
    {
      industry: "Beauty Brand (Jones Road)",
      before: {
        headline: "\"Natural Beauty Products That Work\"",
        problems: [
          "Vague benefit claim",
          "No proof or authority",
          "Generic beauty positioning",
          "Doesn't address specific pain"
        ]
      },
      after: {
        headline: "\"The makeup artist secret that celebrities don't want you to know\"",
        improvements: [
          "Authority positioning (makeup artist)",
          "Curiosity gap creates urgency",
          "Celebrity social proof implied",
          "Secret/insider knowledge appeal"
        ],
        result: "22/25 Performance Score"
      }
    },
    {
      industry: "Local Services (Rodriguez Law Firm)",
      before: {
        headline: "\"Personal Injury Lawyers - Call Us Today\"",
        problems: [
          "Generic legal service promise",
          "No differentiation from competitors",
          "Doesn't address victim's real fears",
          "No proof of success or value"
        ]
      },
      after: {
        headline: "\"Injured in an Accident? Insurance Companies Are Counting on You NOT Calling Us.\"",
        improvements: [
          "Emotional trigger (insurance vs. victims)",
          "Frames law firm as victim's advocate",
          "Creates urgency around timing",
          "Implies insider knowledge of insurance tactics"
        ],
        result: "21/25 Performance Score"
      }
    }
  ];

  return (
    <section className="py-20 bg-[#F8F8F8] relative">
      <div className="max-w-6xl mx-auto px-6">

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
            From Guesswork To{' '}
            <span className="text-transparent bg-gradient-to-r from-[#126DFB] to-[#126DFB] bg-clip-text">
              Guaranteed Results
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-[#4B5563] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            See how research based creative strategy transforms weak ads into revenue driving campaigns across different industries.
          </motion.p>
        </motion.div>

        {/* Examples Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {examples.map((example, index) => (
            <motion.div
              key={example.industry}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB]"
            >
              {/* Industry Header */}
              <div className="text-center mb-8">
                <span className="inline-block bg-[#126DFB] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {example.industry}
                </span>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-center">

                {/* Before */}
                <div className="bg-[#FEF2F2] rounded-xl p-6 border border-[#E5E7EB]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#EF4444] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✗</span>
                    </div>
                    <span className="font-bold text-[#991B1B]">BEFORE: Generic Approach</span>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-[#DC2626] font-medium mb-2">Weak Headline:</div>
                    <div className="italic text-[#374151] border-l-4 border-[#FCA5A5] pl-4">
                      {example.before.headline}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-[#DC2626] font-medium mb-3">Problems:</div>
                    <ul className="space-y-2">
                      {example.before.problems.map((problem, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                          <div className="w-1.5 h-1.5 bg-[#F87171] rounded-full mt-2 flex-shrink-0"></div>
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="bg-[#126DFB] rounded-full p-4">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* After */}
                <div className="bg-[#F0FDF4] rounded-xl p-6 border border-[#E5E7EB]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="font-bold text-[#047857]">AFTER: Research Backed</span>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-[#059669] font-medium mb-2">Winning Headline:</div>
                    <div className="italic text-[#374151] border-l-4 border-[#86EFAC] pl-4">
                      {example.after.headline}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-[#059669] font-medium mb-3">Strategic Improvements:</div>
                    <ul className="space-y-2">
                      {example.after.improvements.map((improvement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                          <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#DCFCE7] rounded-lg p-3 border border-[#BBF7D0]">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#059669]" />
                      <span className="font-bold text-[#047857]">{example.after.result}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-[#126DFB] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready To Transform Your Ad Performance?
            </h3>
            <p className="text-[#DBEAFE] mb-6 max-w-2xl mx-auto">
              Get the same research based creative strategy that turns weak campaigns into revenue drivers.
            </p>
            <motion.a
              href="#service-tiers"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-[#126DFB] font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-[#F8F8F8] transition-all duration-200 inline-block"
            >
              Get My Custom Strategy
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}