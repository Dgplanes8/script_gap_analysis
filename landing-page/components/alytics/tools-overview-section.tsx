import { motion } from 'framer-motion';
import Link from 'next/link';
import { PenSquare, RefreshCw, FileText } from 'lucide-react';

const tools = [
  {
    name: 'AI Script Generator',
    description: 'Generate scripts using patterns from campaigns that already proved themselves with real money.',
    benefits: ['One instant script without logging in', '10 monthly credits on the free plan', 'Expert concepts with Studio tier'],
    href: '/ai-ad-script-generator',
    icon: PenSquare,
    cta: 'Generate a Free Script',
  },
  {
    name: 'AI Ad Iteration Tool',
    description: 'Stop launching the same 3 creatives while competitors test 30.',
    benefits: ['Full creative teardown', 'Instant remix recommendations', 'Works with existing assets or URLs'],
    href: '/ai-ad-iteration-tool',
    icon: RefreshCw,
    cta: 'Fix a Losing Ad',
  },
  {
    name: 'Creative Brief Generator',
    description: 'Professional-grade briefs without professional-grade costs.',
    benefits: ['Zero-friction kickoff docs', 'Audience and offer insights built-in', 'Downloadable briefs in seconds'],
    href: '/creative-brief-generator',
    icon: FileText,
    cta: 'Build a Brief Free',
  },
];

export function ToolsOverviewSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#F8FBFF] to-white" id="tools">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2rem] text-[#126DFB]">APSICS Tool Suite</p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">Skip Creative Guesswork. Use Proven Patterns.</h2>
          <p className="mt-4 text-base text-gray-600">
            Each tool uses intelligence from high converting campaigns. No more hoping your creative works—know it will.
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
              className="flex flex-col h-full min-h-[420px] rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#126DFB]">
                  <tool.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed min-h-[3rem]">{tool.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-700 flex-grow">
                {tool.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#126DFB] flex-shrink-0"></span>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tool.href}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#126DFB] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#0F5AD6]"
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
