import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Headset, LifeBuoy, ListChecks, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Need Help? | APSICS Media',
  description:
    'Your checkout was cancelled. Explore next steps, get answers, or restart your APSICS Media plan when you are ready.',
  alternates: {
    canonical: '/cancel',
  },
};

const supportOptions = [
  {
    title: 'Talk with Brian',
    description: 'Book a quick call to confirm fit, pricing, or get an onboarding walkthrough tailored to your team.',
    href: 'mailto:brian@apsicsmedia.com?subject=Checkout%20Question',
    cta: 'Email Brian',
    icon: Headset,
  },
  {
    title: 'Review the plans',
    description: 'Compare Essentials, Studio, and Concierge access so you can choose the right credit level when you restart.',
    href: '/#service-tiers',
    cta: 'See Pricing',
    icon: ListChecks,
  },
  {
    title: 'Test the tools first',
    description: 'Generate a script, ad iteration, or creative brief with free credits—no commitment required.',
    href: '/#ai-tools',
    cta: 'Explore Tools',
    icon: Sparkles,
  },
];

export default function CancelPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-brand-800 to-brand-600 text-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm font-medium uppercase tracking-wide text-white/80 rounded-full px-4 py-1 mb-6">
            <LifeBuoy className="h-4 w-4" />
            Checkout cancelled
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Let&apos;s keep your campaign moving.</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Whether you paused to double-check scope, budget, or team access, we&apos;re here to help you restart when the timing is right.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#service-tiers"
              className="inline-flex items-center gap-2 rounded-full bg-white text-brand-700 font-semibold px-6 py-3 text-sm shadow-lg transition hover:bg-brand-50"
            >
              <ArrowRight className="h-4 w-4" />
              Return to Pricing
            </Link>
            <Link
              href="mailto:brian@apsicsmedia.com?subject=Need%20Help%20Restarting%20Checkout"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Brian
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">Still on the fence? Choose the path that fits.</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {supportOptions.map(({ title, description, href, cta, icon: Icon }) => (
              <div key={title} className="flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 flex-1 leading-relaxed">{description}</p>
                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  {cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F8F8F8]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Need fast answers?</h2>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Share the blockers that made you cancel. We&apos;ll send a quick Loom or schedule a call to close the gaps so you can launch with confidence.
          </p>
          <a
            href="mailto:brian@apsicsmedia.com?subject=Questions%20about%20APSICS%20Media"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-600"
          >
            Email brian@apsicsmedia.com
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-6 text-xs text-gray-500">
            Prefer to restart later? Use the link in your inbox titled “APSICS Media checkout” to pick up where you left off.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ArrowLeft className="h-4 w-4 text-brand-500" />
              <span>Ready to jump back in? Restart your checkout from any device—it only takes a minute.</span>
            </div>
            <Link
              href="/#service-tiers"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-brand-600"
            >
              Resume checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
