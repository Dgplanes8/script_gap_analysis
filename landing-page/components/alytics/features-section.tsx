'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Zap, BarChart3, Lightbulb } from 'lucide-react';

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
      }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group cursor-pointer"
    >
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
        <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
        {description}
      </p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Target className="w-7 h-7" />,
      title: "Content Intelligence",
      description: "AI-powered analysis of trending content across all platforms to identify what's converting right now in your industry."
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Performance Tracking", 
      description: "Real-time performance metrics for all your content with detailed analytics on engagement, reach, and conversion rates."
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Audience Insights",
      description: "Deep dive into your audience behavior patterns, preferences, and optimal posting times for maximum engagement."
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Automated Scripts",
      description: "Generate custom UGC and paid ad scripts based on your top-performing content and current trending patterns."
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Competitive Analysis",
      description: "Monitor your competitors' content strategies and identify opportunities to differentiate and outperform."
    },
    {
      icon: <Lightbulb className="w-7 h-7" />,
      title: "Creative Inspiration",
      description: "Weekly creative concepts and content ideas tailored to your brand, audience, and business goals."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
              scale content
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Powerful tools and insights to transform your content strategy from guesswork into a systematic intelligence operation.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}