import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { ConsultationProvider } from '@/components/contexts/consultation-context';

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
  title: 'Weekly Creative Intelligence - Revolutionary Weekly Pricing | Apsics Media',
  description:
    'Revolutionary weekly pricing for weekly delivery. Get viral ad hooks and creative scripts every Monday starting at $5/week. First week FREE trial. Reduce CAC by 25%, increase conversion rates 3x faster. Growth marketing teams at subscription companies.',
  keywords:
    'ad hooks, creative hooks, facebook ad templates, viral content, subscription marketing, creative scripts, reduce CAC, increase conversions, creative strategy, growth marketing, weekly trend intelligence, copywriting templates, social media hooks, tiktok hooks, subscription business creative, saas creative, conversion copywriting',
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
    title: 'Weekly Creative Intelligence - Revolutionary Weekly Pricing | Apsics Media',
    description:
      'Revolutionary weekly pricing for weekly delivery. Get viral ad hooks and creative scripts every Monday starting at $5/week. First week FREE trial. Reduce CAC by 25% for growth marketing teams.',

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
    title: 'Weekly Creative Intelligence - Revolutionary Weekly Pricing | Apsics Media',
    description:
      'Revolutionary weekly pricing for weekly delivery. Get viral ad hooks and creative scripts every Monday starting at $5/week. First week FREE trial. Reduce CAC by 25% for growth marketing teams.',
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