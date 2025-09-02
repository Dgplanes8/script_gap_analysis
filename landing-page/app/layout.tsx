import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { ConsultationProvider } from '@/components/contexts/consultation-context';
import { GTM, GTMNoscript } from '@/components/analytics/gtm';

// Dynamically import non-critical components
const Analytics = dynamic(() => import('@/components/analytics').then(mod => ({ default: mod.Analytics })), {
  ssr: false
});

const StructuredData = dynamic(() => import('@/components/schema').then(mod => ({ default: mod.StructuredData })), {
  ssr: false
});

const SpeedInsights = dynamic(() => import('@vercel/speed-insights/next').then(mod => ({ default: mod.SpeedInsights })), {
  ssr: false
});

const ConsultationModal = dynamic(() => import('@/components/modals/consultation-modal').then(mod => ({ default: mod.ConsultationModal })), {
  ssr: false,
  loading: () => null
});

const PerformanceDashboard = dynamic(() => import('@/components/performance/performance-dashboard').then(mod => ({ default: mod.PerformanceDashboard })), {
  ssr: false,
  loading: () => null
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Weekly Creative Intelligence for Early-Stage Startups | Apsics Media',
  description:
    'Strategic ad hooks and creative scripts designed for early-stage startups launching their first campaigns. Starting at $5/week with first week FREE. From someone who managed $250MM+ in media spend.',
  keywords:
    'startup marketing, first-time advertisers, early-stage startup ads, solo founder marketing, bootstrap startup ads, creative hooks for startups, startup ad templates, launch first campaign, creative scripts for founders, startup creative intelligence, early-stage marketing, founder ad help, startup ad guidance, creative concepts for startups, small business ad creative, campaign launch support, startup advertising strategy',
  authors: [{ name: 'Apsics Media' }],
  creator: 'Apsics Media',
  publisher: 'Apsics Media',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Weekly Creative Intelligence for Early-Stage Startups | Apsics Media',
    description:
      'Strategic ad hooks and creative scripts for startup founders launching their first campaigns. Starting at $5/week with first week FREE. From someone who managed $250MM+ in media spend.',

    url: '/',
    siteName: 'Apsics Media',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apsics Media',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekly Creative Intelligence for Early-Stage Startups | Apsics Media',
    description:
      'Strategic ad hooks and creative scripts for startup founders launching their first campaigns. Starting at $5/week with first week FREE. From someone who managed $250MM+ in media spend.',
    images: ['/images/og-image.jpg'],
    creator: '@apsicsmedia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';
  
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <GTM gtmId={gtmId} />
        {/* Critical CSS inlined for immediate render */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-inter: 'Inter', system-ui, -apple-system, sans-serif;
              --color-orange-600: rgb(234 88 12);
              --color-orange-700: rgb(194 65 12);
              --color-red-600: rgb(220 38 38);
              --color-red-700: rgb(185 28 28);
              --color-white: rgb(255 255 255);
              --color-gray-200: rgb(229 231 235);
              --color-gray-900: rgb(17 24 39);
            }
            body {
              font-family: var(--font-inter);
              margin: 0;
              padding: 0;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .hero-section {
              background: linear-gradient(135deg, var(--color-orange-600) 0%, var(--color-red-700) 50%, var(--color-red-600) 100%);
              color: var(--color-white);
              padding: 6rem 1rem;
              text-align: center;
              min-height: 70vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .btn-primary {
              background: linear-gradient(135deg, var(--color-orange-600), var(--color-red-600));
              color: var(--color-white);
              font-weight: 600;
              padding: 0.875rem 1.5rem;
              border-radius: 0.75rem;
              border: none;
              font-size: 1rem;
              cursor: pointer;
              transition: all 0.2s ease;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
              min-height: 3rem;
            }
            .container { max-width: 80rem; margin: 0 auto; padding: 0 1rem; }
            .text-center { text-align: center; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            html { scroll-behavior: smooth; }
            @media (max-width: 768px) {
              .hero-section { padding: 3rem 1rem; min-height: 60vh; }
              .container { padding: 0 1rem; }
            }
          `
        }} />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//vercel.live" />
        <link rel="dns-prefetch" href="//va.vercel-scripts.com" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical resource hints */}
        <link rel="preload" href="/images/og-image.jpg" as="image" type="image/jpeg" />
        
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <GTMNoscript gtmId={gtmId} />
        <ConsultationProvider>
          {children}
          <ConsultationModal />
          <Analytics />
          <StructuredData pageType="homepage" />
          <SpeedInsights />
          <PerformanceDashboard />
        </ConsultationProvider>
      </body>
    </html>
  );
}