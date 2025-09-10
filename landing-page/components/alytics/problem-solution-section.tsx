'use client';

import { motion } from 'framer-motion';
import { Target, Building2, TrendingUp } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
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

export function ProblemSolutionSection() {
  const problemSolutionCards = [
    {
      icon: Target,
      title: "You're Creating Content Blindly",
      description: "Creating content without knowing what's trending or converting. Every post is a guess instead of strategic intelligence.",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      icon: Building2,
      title: "You Don't Have Content Intelligence",
      description: "Running your startup while trying to track trending content? You need custom scripts that work immediately.",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      icon: TrendingUp,
      title: "You Get Trending Intelligence",
      description: "Our custom content ideas + scripts are based on real trending data. Launch with confidence, scale what converts.",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto">
            Stop Creating Content in the Dark
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Most founders create content without knowing what's trending or converting. We deliver fresh content ideas + custom scripts based on real trending data and performance intelligence.
          </p>
        </motion.div>

        {/* Problem-Solution Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {problemSolutionCards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
              }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group cursor-pointer"
            >
              <div className={`w-16 h-16 ${card.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className={`h-8 w-8 ${card.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                {card.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}