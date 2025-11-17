'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Award, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useEffect, useRef } from 'react';

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
  animatedValue?: number;
  suffix?: string;
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function StatCard({ icon, number, label, description, animatedValue, suffix }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -6,
        boxShadow: "0 16px 32px rgba(18, 109, 251, 0.12)"
      }}
      className="bg-white rounded-xl p-6 border border-gray-200 text-center group transition-all duration-300"
    >
      <motion.div
        className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <div className="text-blue-600">
          {icon}
        </div>
      </motion.div>
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {animatedValue !== undefined ? (
          <AnimatedNumber value={animatedValue} suffix={suffix || ''} />
        ) : (
          number
        )}
      </div>
      <div className="text-sm font-semibold text-blue-600 mb-2">{label}</div>
      <div className="text-sm text-gray-600 leading-relaxed">{description}</div>
    </motion.div>
  );
}

export function SocialProofSection() {
  const stats = [
    {
      icon: <Award className="w-6 h-6" />,
      number: "12+",
      animatedValue: 12,
      suffix: "+",
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
      number: "25%",
      animatedValue: 25,
      suffix: "%",
      label: "Average CAC Reduction",
      description: "Consistent improvement across verticals using research-backed creative frameworks"
    },
    {
      icon: <Users className="w-6 h-6" />,
      number: "150+",
      animatedValue: 150,
      suffix: "+",
      label: "Monthly Concepts",
      description: "Fully-developed ad concepts with scripts, insights, and strategic direction built on demand"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              number={stat.number}
              animatedValue={stat.animatedValue}
              suffix={stat.suffix}
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
          className="bg-gradient-to-br from-white via-blue-50/20 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full animate-pulse" />
              <Award className="w-8 h-8 text-blue-600 relative z-10" />
            </motion.div>

            <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 italic font-medium">
              "I watched the brand I was scaling fall behind competitors who seemed to always know what content would work.
              We were losing market share because our creative was always one trend behind. That's when I developed this systematic method to stay ahead of trends and create content templates that consistently drive sales.
              After years of refining these frameworks, I built this platform to help others avoid the struggle I went through."
            </blockquote>

            <div className="flex flex-col items-center">
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-blue-500/30"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                AM
              </motion.div>
              <div className="font-bold text-gray-900 text-lg">APSICS Media Founder</div>
              <div className="text-gray-600 font-medium">12+ Years Scaling Media | Proven Framework Developer</div>
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
