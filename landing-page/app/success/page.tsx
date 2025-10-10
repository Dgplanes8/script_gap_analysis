import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle, Mail, Rocket, Sparkles } from 'lucide-react';
import { SuccessPageClient } from './success-client';

export const metadata: Metadata = {
  title: 'Thank You - Apsics Media',
  description:
    'Confirmation page for APSICS Media customers. Access every AI tool, onboarding steps, and support contact details.',
  alternates: {
    canonical: '/success',
  },
};

const tools = [
  {
    name: 'AI Ad Script Generator',
    description: 'Spin up scroll-stopping video scripts with platform-native pacing in minutes.',
    href: '/ai-ad-script-generator',
  },
  {
    name: 'AI Ad Iteration Tool',
    description: 'Upload ads for structured analysis and get two conversion-focused variations ready for testing.',
    href: '/ai-ad-iteration-tool',
  },
  {
    name: 'Creative Brief Generator',
    description: 'Turn campaign inputs into a production-ready creative brief and research summary.',
    href: '/creative-brief-generator',
  },
];

const startupSteps = [
  {
    title: 'Confirm your access',
    detail: 'Sign in with the email you used during checkout and make sure your credits are available.',
  },
  {
    title: 'Choose your first tool',
    detail: 'Launch the generator that matches your next deliverable—scripts, iterations, or full briefs.',
  },
  {
    title: 'Ship creative fast',
    detail: 'Download or copy the AI output, share it with your team, and start testing in your ad accounts.',
  },
];

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { source?: string; lead?: string };
}) {
  const leadId = searchParams?.lead;

  return (
    <SuccessPageClient leadId={leadId}>
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm font-medium uppercase tracking-wide text-white/80 rounded-full px-4 py-1 mb-6">
            <Sparkles className="h-4 w-4" />
            Confirmation
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">You&apos;re in and ready to create.</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Your APSICS Media account is active. Jump straight into any tool, share the outputs with your team, and let us know how we can support your next campaign.
          </p>

          {leadId && (
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/80 bg-white/10 rounded-full px-4 py-2">
              <CheckCircle className="h-4 w-4" />
              <span>Reference ID: {leadId}</span>
            </div>
          )}

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-white/30 hover:bg-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-white/80">Launch</span>
                  <ArrowRight className="h-4 w-4 text-white/70 transition group-hover:translate-x-1" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">{tool.name}</h2>
                <p className="text-sm text-white/80 leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1 text-sm font-medium text-brand-600">
              <Rocket className="h-4 w-4" />
              How to get started
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">Move from checkout to creative output</h2>
            <p className="mt-4 text-lg text-gray-600">
              Follow these quick steps and you will have new ads ready to test today.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {startupSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600 font-semibold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-3xl border border-brand-100 bg-white p-10 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Questions or feature requests?</h2>
              <p className="text-base text-gray-600 max-w-2xl">
                Brian and the APSICS Media team are on standby to help you launch faster. Share feedback, request new capabilities, or ask for strategic guidance any time.
              </p>
              <a
                href="mailto:brian@apsicsmedia.com"
                className="inline-flex items-center gap-2 rounded-full border border-brand-500 px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
              >
                brian@apsicsmedia.com
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    </SuccessPageClient>
  );
}
