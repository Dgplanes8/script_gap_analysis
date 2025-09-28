'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Zap, Clock } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Target className="h-5 w-5" />,
    title: 'Strategic Creative Concepts',
    description: 'Proven frameworks from $250MM+ spend experience, customized for your audience'
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: 'Performance-Scored Scripts',
    description: 'Ready-to-launch scripts rated with our 25-point framework for maximum conversion'
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Real-Time Trend Intelligence',
    description: 'Continuous monitoring of converting creatives to keep your content ahead of trends'
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Weekly Strategic Delivery',
    description: 'Fresh concepts + scripts delivered every Monday, tailored to your startup goals'
  }
];

export function KeyBenefitsClean() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.25, 0, 1] }
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="mb-3">
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              Benefits
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Strategic Creative Intelligence That Drives{' '}
            <span className="text-blue-600">Revenue Growth</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your content strategy with proven frameworks and custom scripts
          </p>
        </div>
        
        {/* Benefits Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              variants={itemVariants}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-base">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}