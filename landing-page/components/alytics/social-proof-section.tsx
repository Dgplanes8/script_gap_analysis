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
      label: "Years Scaling Campaigns",
      description: "Battle-tested across hundreds of industries and ad platforms"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      number: "$250MM+",
      label: "Ad Spend Managed",
      description: "Your scripts are built from what actually worked at scale"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      number: "1000+",
      label: "Winning Ads Analyzed",
      description: "We track what converts so you don't waste money testing"
    },
    {
      icon: <Users className="w-6 h-6" />,
      number: "150+",
      label: "Scripts Per Month",
      description: "Fresh concepts delivered weekly, ready to launch"
    }
  ];

  return (
    <section id="social-proof" className="py-20 bg-gray-50 relative">
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
            The exact playbook I used to manage{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text">
              $250M+ in ad spend
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            12+ years scaling campaigns from first dollar to 8-figures. Now available as instant ad scripts.
          </motion.p>

          <motion.p
            className="text-lg text-[#126DFB] font-medium max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Trusted by marketers managing $10K to $100K+ monthly budgets
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
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
              "I've burned enough ad spend for both of us. After 12+ years managing campaigns, I know the difference between ads that convert and ads that crash.
              This platform gives you what actually works—not the guesswork that wastes budgets."
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                AM
              </div>
              <div className="font-semibold text-gray-900 text-lg">APSICS Media Founder</div>
              <div className="text-gray-600">12+ Years Scaling Media | Proven Framework Developer</div>
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
            Start using these battle-tested scripts for free
          </p>
          <motion.a
            href="#service-tiers"
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)" 
            }}
            whileTap={{ scale: 0.98 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg"
        >
          Claim 10 Free Credits
        </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
