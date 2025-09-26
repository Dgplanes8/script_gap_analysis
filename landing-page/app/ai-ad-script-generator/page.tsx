export const dynamic = 'force-dynamic';
export const revalidate = 0;

import nextDynamic from 'next/dynamic';
import { AlyticsNavbar } from '@/components/alytics/alytics-navbar';

// Dynamic import of the heavy client component for better performance
const AdScriptGeneratorClient = nextDynamic(() => import('./client-page'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
  ssr: false
});

export default function AdScriptGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50">
      <AlyticsNavbar />
      <div className="pt-20 md:pt-24">
        <AdScriptGeneratorClient />
      </div>
    </div>
  );
}
