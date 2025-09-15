'use client';

import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, BarChart3 } from 'lucide-react';

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

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  description: string;
}

function StatCard({ icon, number, label, description }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)" 
      }}
      className="bg-white rounded-xl p-6 border border-gray-200 text-center group"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
        <div className="text-blue-600">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{number}</div>
      <div className="text-sm font-medium text-blue-600 mb-2">{label}</div>
      <div className="text-sm text-gray-600 leading-relaxed">{description}</div>
    </motion.div>
  );
}

export function SocialProofSection() {
  const stats = [
    {
      icon: <Award className="w-6 h-6" />,
      number: "12+",
      label: "Years Experience",
      description: "Helping companies scale from $10K to $1M+ monthly ad spend"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      number: "$250MM+",
      label: "Media Spend Managed",
      description: "Proven frameworks tested across hundreds of campaigns"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      number: "1000s",
      label: "Creatives Produced",
      description: "Revenue-driving content tested across multiple verticals"
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
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Proven frameworks from{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
              real experience
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            These aren't theoretical frameworks—they're the exact methods I've used to help companies scale from $10K to $1M+ monthly ad spend while consistently driving revenue growth.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              number={stat.number}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </motion.div>

        {/* Founder Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            
            <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
              "I watched the brand I was scaling fall behind competitors who seemed to always know what content would work. 
              We were losing market share because our creative was always one trend behind. That's when I developed this systematic method to stay ahead of trends and create content templates that consistently drive sales.
              Now, after 12 years and $250MM+ in managed spend, I use these exact frameworks to help others avoid the struggle I went through."
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                AM
              </div>
              <div className="font-semibold text-gray-900 text-lg">APSICS Media Founder</div>
              <div className="text-gray-600">12+ Years Scaling Media | $250MM+ Managed</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to access these proven frameworks for your startup?
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)" 
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg"
          >
            Start Free Week Trial
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}