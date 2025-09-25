'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Clock, DollarSign, AlertCircle } from 'lucide-react';

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

interface PainPointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
}

function PainPointCard({ icon, title, description, stat }: PainPointProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl p-6 border border-red-100 hover:border-red-200 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="text-red-600">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">{description}</p>
          <div className="text-red-600 font-bold text-lg">{stat}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function CreativeGuessworkProblemSection() {
  const painPoints = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Wasted Ad Spend",
      description: "Testing random creative concepts without proven frameworks",
      stat: "73% of ad spend wasted"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Drain",
      description: "Teams spending hours researching trends that may not convert",
      stat: "15+ hours per week lost"
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "Always Behind",
      description: "Missing viral trends while competitors capitalize first",
      stat: "Trends peak in 7-14 days"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 relative">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            THE CREATIVE GUESSWORK PROBLEM
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Growth Teams Are Burning Budget on{' '}
            <span className="text-transparent bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text">
              Creative Guesswork
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            While your competitors use data-driven creative frameworks, your team is stuck guessing what will work—wasting time and budget on untested concepts.
          </motion.p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 mb-16 md:grid-cols-3"
        >
          {painPoints.map((point) => (
            <PainPointCard
              key={point.title}
              icon={point.icon}
              title={point.title}
              description={point.description}
              stat={point.stat}
            />
          ))}
        </motion.div>

        {/* Before/After Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg"
        >
          <div className="grid gap-8 md:grid-cols-2 items-center">

            {/* Before */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                Your Current Reality
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Creative Chaos</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Randomly testing ad concepts without proven frameworks</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Missing trends while competitors capitalize first</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Burning budget on creative that doesn't convert</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center bg-[#126DFB] text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                With APSICS Media
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conversion Machine</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#126DFB] rounded-full mt-2"></div>
                  <span>Research-backed creative from $250M+ proven spend</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#126DFB] rounded-full mt-2"></div>
                  <span>Weekly trend intelligence delivered to your inbox</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#126DFB] rounded-full mt-2"></div>
                  <span>25% CAC reduction across 500+ growth teams</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Urgency Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg font-medium text-gray-700 mb-4">
            Every week you delay is revenue left on the table.
          </p>
          <p className="text-gray-600">
            While you're guessing, your competitors are using proven frameworks to capture market share.
          </p>
        </motion.div>

      </div>
    </section>
  );
}