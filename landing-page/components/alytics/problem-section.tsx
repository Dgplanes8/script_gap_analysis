'use client';

import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Clock, Zap } from 'lucide-react';

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
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ProblemCard({ icon, title, description }: ProblemCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)" }}
      className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300"
    >
      <motion.div
        className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <div className="text-red-500">
          {icon}
        </div>
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function ProblemSection() {
  const problems = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Campaigns Launch Weeks Late",
      description: "Your team can't keep up with creative demands. While you're still brainstorming, competitors are already testing winning concepts."
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "Ad Fatigue Kills Performance",
      description: "Your best-performing ads stop working within weeks. Without fresh creative, your CAC climbs while conversion rates plummet."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Creative Bottleneck Costs Revenue",
      description: "You're burning budget on guesswork. Every failed ad concept is money lost and growth delayed."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full border border-red-100 mb-6"
          >
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">The Creative Bottleneck Problem</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your Creative Team Can't Keep Up with{' '}
            <span className="text-transparent bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text">
              Performance Demands
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every week you delay is revenue left on the table. While you struggle to create fresh ad concepts, your competitors are launching winning campaigns.
          </motion.p>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problems.map((problem) => (
            <ProblemCard
              key={problem.title}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
            />
          ))}
        </motion.div>

        {/* Agitation - Make the pain urgent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            The solution isn't hiring more designers or expensive agencies.{' '}
            <span className="font-semibold text-gray-900">
              You need a systematic way to generate proven ad concepts—fast.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
