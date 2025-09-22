'use client';

import { motion } from 'framer-motion';
import { Clock, Award, Zap } from 'lucide-react';
import { useFreeWeek } from '@/components/contexts/free-week-context';

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

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bulletPoints: string[];
}

function BenefitCard({ icon, title, description, bulletPoints }: BenefitCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
      }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group cursor-pointer h-full"
    >
      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
        <div className="text-[#126DFB] group-hover:text-[#0F5AD6] transition-colors">
          {icon}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors">
        {title}
      </h3>
      
      <p className="text-lg text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
        {description}
      </p>

      <ul className="space-y-3">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#126DFB] rounded-full mt-2.5 flex-shrink-0"></div>
            <span className="text-gray-600 leading-relaxed text-sm">{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function KeyBenefitsSection() {
  const { openModal } = useFreeWeek();
  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Consistent Revenue Growth (Every Monday)",
      description: "Get campaigns that consistently drive sales, not just engagement or likes.",
      bulletPoints: [
        "Revenue-driving static and video campaigns based on current market trends",
        "Competitor analysis that reveals what actually converts",
        "Proven campaign formats optimized for each platform",
        "New profit opportunities delivered every Monday"
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Predictable Revenue Results",
      description: "Transform any business into a conversion machine - from SaaS to supplements to local services.",
      bulletPoints: [
        "Subscription businesses: Increase sign-up rates and reduce churn",
        "B2B companies: Generate leads that actually close into deals",
        "Creator economy: Content that lands profitable brand partnerships",
        "Local services: Campaigns that fill appointment books"
      ]
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white relative">
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
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get Results That{' '}
            <span className="text-transparent bg-gradient-to-r from-[#126DFB] to-[#126DFB] bg-clip-text">
              Drive Revenue Growth
            </span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Stop hoping your ads will work. Get static and video campaigns proven to convert across Facebook, Instagram, TikTok, LinkedIn, X, and YouTube.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              bulletPoints={benefit.bulletPoints}
            />
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
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your ad budget into predictable revenue?
          </p>
          <motion.button
            onClick={() => openModal({
              source: 'benefits-cta',
              title: 'Start Your FREE Week Trial',
              subtitle: 'Get trending creative concepts and custom scripts delivered every Monday'
            })}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)" 
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg"
          >
            Start Free Week Trial
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
