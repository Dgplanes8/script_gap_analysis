import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { ConsultationProvider } from '@/components/contexts/consultation-context';
import { FreeWeekProvider } from '@/components/contexts/free-week-context';

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

const FreeWeekModalWrapper = dynamic(() => import('@/components/forms/free-week-modal-wrapper').then(mod => ({ default: mod.FreeWeekModalWrapper })), {
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
  title: 'Revenue Growth Through Creative Intelligence | APSICS Media',
  description:
    'Transform your creative strategy into measurable revenue growth. Weekly intelligence, conversion-focused scripts, and performance optimization from $250MM+ in managed ad spend.',
  keywords:
    'creative intelligence, revenue growth, conversion optimization, performance marketing, creative strategy, ROI optimization, marketing intelligence, ad performance, creative ROI, conversion rate optimization, performance advertising, marketing automation, creative analytics, revenue optimization, growth marketing',
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
    title: 'Revenue Growth Through Creative Intelligence | APSICS Media',
    description:
      'Transform your creative strategy into measurable revenue growth. Weekly intelligence, conversion-focused scripts, and performance optimization from $250MM+ in managed ad spend.',

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
    title: 'Revenue Growth Through Creative Intelligence | APSICS Media',
    description:
      'Transform your creative strategy into measurable revenue growth. Weekly intelligence and conversion-focused scripts from $250MM+ in managed ad spend.',
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
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Critical CSS inlined for immediate render */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-inter: 'Inter', system-ui, -apple-system, sans-serif;
              --color-primary-blue: 18 109 251;
              --color-primary-blue-dark: 15 90 214;
              --color-primary-blue-light: 59 130 246;
              --color-white: rgb(255 255 255);
              --color-gray-200: rgb(229 231 235);
              --color-text-primary: rgb(17 24 39);
              --color-text-secondary: rgb(107 114 128);
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
              background: linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-primary-blue-dark) 50%, var(--color-primary-blue-light) 100%);
              color: var(--color-white);
              padding: 6rem 1rem;
              text-align: center;
              min-height: 70vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .btn-primary {
              background: var(--color-primary-blue);
              color: var(--color-white);
              font-weight: 600;
              padding: 0.875rem 1.5rem;
              border-radius: 0.75rem;
              border: none;
              font-size: 1rem;
              cursor: pointer;
              transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              display: inline-flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
              min-height: 3rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .btn-primary:hover {
              background: var(--color-primary-blue-dark);
              transform: translateY(-2px);
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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
        <FreeWeekProvider>
          <ConsultationProvider>
            {children}
            <ConsultationModal />
            <FreeWeekModalWrapper />
            <Analytics />
            <StructuredData pageType="homepage" />
            <SpeedInsights />
            {/* <PerformanceDashboard /> */}
          </ConsultationProvider>
        </FreeWeekProvider>
      </body>
    </html>
  );
}