import Link from 'next/link';

export interface FoundersClubConfig {
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  footerText: string;
}

interface FoundersClubSectionProps {
  config: FoundersClubConfig;
}

export function FoundersClubSection({ config }: FoundersClubSectionProps) {
  return (
    <div className="flex flex-col gap-4 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">{config.badge}</p>
        <h3 className="mt-1 text-xl font-semibold text-gray-900">{config.title}</h3>
        <p className="mt-2 text-sm text-gray-600">
          {config.description}
        </p>
      </div>
      <div className="flex flex-col items-start gap-3 sm:items-end">
        <Link
          href={config.ctaHref}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
        >
          {config.ctaText}
        </Link>
        <p className="text-xs text-brand-700">{config.footerText}</p>
      </div>
    </div>
  );
}