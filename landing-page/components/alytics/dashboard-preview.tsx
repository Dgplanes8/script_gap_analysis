'use client';

import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.2,
      ease: [0.25, 0.25, 0, 1]
    }
  })
};

interface DashboardCardProps {
  title: string;
  metric: string;
  trend: 'up' | 'down';
  trendValue: string;
  index: number;
}

function DashboardCard({ title, metric, trend, trendValue, index }: DashboardCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
      }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer group"
    >
      <div className="space-y-4">
        
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <div className={`w-2 h-2 rounded-full ${trend === 'up' ? 'bg-brand-400' : 'bg-brand-400'} animate-pulse`} />
        </div>

        {/* Main Metric */}
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">{metric}</div>
          <div className={`flex items-center gap-1 text-xs ${
            trend === 'up' ? 'text-brand-600' : 'text-brand-600'
          }`}>
            <svg 
              className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {trendValue}
          </div>
        </div>

        {/* Mini Chart Placeholder */}
        <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-between px-2 py-2 group-hover:bg-blue-50 transition-colors">
          {[40, 60, 45, 80, 65, 90, 75].map((height, i) => (
            <motion.div
              key={i}
              className="bg-blue-200 rounded-sm group-hover:bg-blue-300 transition-colors"
              style={{ width: '8px', height: `${height}%` }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ delay: index * 0.2 + i * 0.05, duration: 0.3 }}
            />
          ))}
        </div>

      </div>
    </motion.div>
  );
}

export function DashboardPreview() {
  const dashboardCards = [
    {
      title: "Creative Performance",
      metric: "23.4%",
      trend: "up" as const,
      trendValue: "+12.5%"
    },
    {
      title: "Script Conversion Rate",
      metric: "4.8%",
      trend: "up" as const,
      trendValue: "+0.8%"
    },
    {
      title: "Content Intelligence Score",
      metric: "87/100",
      trend: "up" as const,
      trendValue: "+5 pts"
    }
  ];

  return (
    <section className="relative -mt-20 pb-20 px-4 z-10">
      <div className="max-w-[1200px] mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {dashboardCards.map((card, index) => (
            <DashboardCard
              key={card.title}
              {...card}
              index={index}
            />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}