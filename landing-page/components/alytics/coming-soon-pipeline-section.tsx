import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight, Sparkles, Target, BarChart3, User, Zap } from 'lucide-react';

const currentTools = [
  {
    name: 'Creative Brief Generator',
    status: 'live',
    icon: CheckCircle,
  },
  {
    name: 'Ad Script Generator',
    status: 'live',
    icon: CheckCircle,
  },
  {
    name: 'Ad Iteration Tool',
    status: 'live',
    icon: CheckCircle,
  },
];

const upcomingTools = [
  {
    name: 'Direct Facebook/Instagram Iterations',
    status: 'development',
    icon: ArrowRight,
    description: 'Instant ad variations directly from your Facebook and Instagram apps'
  },
  {
    name: 'Creative Performance Audit',
    status: 'development',
    icon: BarChart3,
    description: 'Comprehensive analysis of your existing creative performance'
  },
  {
    name: 'Multi-Platform Expansion',
    status: 'development',
    icon: Target,
    description: 'TikTok, YouTube, and LinkedIn creative intelligence'
  },
  {
    name: 'Predictive Audience Scoring',
    status: 'planned',
    icon: Sparkles,
    description: 'AI-powered audience match predictions for your creative'
  },
  {
    name: 'Brand Voice Profiles',
    status: 'planned',
    icon: User,
    description: 'Custom brand voice training for consistent messaging'
  },
  {
    name: 'Custom Requests - Whatever You Need',
    status: 'planned',
    icon: Sparkles,
    description: 'Need something specific? Our team builds custom creative intelligence for your unique challenges'
  },
];

export function ComingSoonPipelineSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F8FBFF] via-white to-[#F8FBFF]">
      <div className="mx-auto max-w-4xl px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2rem] text-[#126DFB] mb-4">
            Platform Evolution
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            What's Coming Next
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            You're getting in early. This isn't just three tools—it's a comprehensive creative intelligence platform.
            Here's what we're building next to keep you ahead of the competition.
          </p>
        </motion.div>

        {/* Current Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Available Now</h3>
          <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
            {currentTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex items-center gap-3 bg-white rounded-lg p-4 border border-green-200 shadow-sm"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="font-medium text-gray-900 text-sm">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">In Development & Planned</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    tool.status === 'development'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-gray-50 text-gray-600'
                  }`}>
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{tool.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className={`text-xs font-medium uppercase tracking-wide ${
                        tool.status === 'development'
                          ? 'text-blue-600'
                          : 'text-gray-500'
                      }`}>
                        {tool.status === 'development' ? 'In Development' : 'Planned'}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] rounded-2xl p-8 text-white"
        >
          <Zap className="w-12 h-12 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-4">Try the Generator for Free</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Experience how industry research transforms into revenue-driving campaigns. No signup required for your first script.
          </p>
          <motion.a
            href="/ai-ad-script-generator"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-white text-[#126DFB] font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Try Generator Free
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}