'use client';

import { FreeWeekButton } from '@/components/ui/free-week-button';

interface BlogCTASectionProps {
  title?: string;
  description?: string;
}

export function BlogCTASection({
  title = 'Claim Your Free Credits Trial',
  description = 'Get trending creative concepts, competitor insights, and ready-to-develop scripts delivered every Monday.',
}: BlogCTASectionProps) {
  return (
    <div className="rounded-2xl bg-white/80 p-10 text-center shadow-lg ring-1 ring-brand-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
        <p className="text-lg text-gray-600">{description}</p>
        <FreeWeekButton source="blog-cta" className="px-8 py-4 text-base" />
      </div>
    </div>
  );
}
