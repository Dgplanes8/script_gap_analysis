import { motion } from 'framer-motion';
import Link from 'next/link';
import { PenSquare, RefreshCw, FileText } from 'lucide-react';

const tools = [
  {
    name: 'AI Script Generator',
    description: 'Spin up platform-ready scripts in under three minutes using $250M+ creative intelligence.',
    benefits: ['1 instant script without logging in', '10 monthly credits on the free plan', 'Weekly delivery with Studio tier'],
    href: '/ai-ad-script-generator',
    icon: PenSquare,
    cta: 'Generate a Free Script',
  },
  {
    name: 'AI Ad Iteration Tool',
    description: 'Diagnose losing ads and ship high-performing remixes tuned for Meta, TikTok, and YouTube.',
    benefits: ['Full creative teardown', 'Instant remix recommendations', 'Works with existing assets or URLs'],
    href: '/ai-ad-iteration-tool',
    icon: RefreshCw,
    cta: 'Fix a Losing Ad',
  },
  {
    name: 'Creative Brief Generator',
    description: 'Deliver production-ready briefs with positioning, hooks, and deliverables your creators can execute.',
    benefits: ['Zero-friction kickoff docs', 'Audience and offer insights built-in', 'Downloadable briefs in seconds'],
    href: '/creative-brief-generator',
    icon: FileText,
    cta: 'Build a Brief Free',
  },
];

export function ToolsOverviewSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#F8FBFF] to-white" id="tools">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2rem] text-brand-600">APSICS Tool Suite</p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need to ship winning creative</h2>
          <p className="mt-4 text-base text-gray-600">
            Each generator is trained on battle-tested creative intelligence. Start free with 10 monthly credits and unlock
            studio-level delivery when you upgrade.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="flex flex-col h-full rounded-3xl border border-brand-100 bg-white/80 p-6 shadow-sm shadow-brand-50/50 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <tool.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{tool.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-700 flex-grow">
                {tool.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-500"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tool.href}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
              >
                {tool.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
