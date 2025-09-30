import Link from 'next/link';

type StudioFoundingOfferCardProps = {
  className?: string;
};

export function StudioFoundingOfferCard({ className }: StudioFoundingOfferCardProps) {
  const containerClass = [
    'rounded-3xl border border-brand-200 bg-white p-6 shadow-lg shadow-brand-50/40',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <div className="flex flex-col gap-4 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">Studio Founding Offer</p>
          <h3 className="mt-1 text-xl font-semibold text-gray-900">Lock $29/mo Studio pricing for six months</h3>
          <p className="mt-2 text-sm text-gray-600">
            Founding members receive 500 credits every month plus an expert-crafted concept in the first month. Pricing
            renews at $49/mo after the introductory period.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <Link
            href="/#service-tiers"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
          >
            Explore Plans &amp; Pricing
          </Link>
          <p className="text-xs text-brand-700">Includes 800 monthly credits and expert concept delivery.</p>
        </div>
      </div>
    </div>
  );
}
