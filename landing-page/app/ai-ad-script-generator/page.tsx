export const dynamic = 'force-dynamic';
export const revalidate = 0;

import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { AlyticsNavbar } from '@/components/alytics/alytics-navbar';
import { ToolHeader } from '@/components/shared/tool-header';

export const metadata: Metadata = {
  title: 'Script Generator - Free Creative Intelligence Tool | APSICS Media',
  description: 'Generate revenue-ready ad scripts from $250M+ creative intelligence. Platform-native copy for TikTok, Meta, YouTube, LinkedIn. Try free with 10 monthly credits.',
  keywords: 'ad script generator, video ad scripts, tiktok script generator, facebook ad copy, ugc script writer, copywriting tool, ad creative intelligence',
  openGraph: {
    title: 'Script Generator - Free Creative Intelligence Tool',
    description: 'Generate revenue-ready ad scripts from $250M+ creative intelligence. Free trial with 10 monthly credits.',
    type: 'website',
    url: 'https://apsicsmedia.com/ai-ad-script-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Script Generator - Free Tool',
    description: 'Generate revenue-ready ad scripts from $250M+ creative intelligence.',
  },
};

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
      <ToolHeader fallback={<AlyticsNavbar />} />
      <div className="pt-4 md:pt-8">
        <AdScriptGeneratorClient />
      </div>
    </div>
  );
}
