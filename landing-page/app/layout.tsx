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
        url: '/images/og-image.png',
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
    images: ['/images/og-image.png'],
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
        {/* Critical CSS inlined for immediate render and Core Web Vitals optimization */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-inter: 'Inter', system-ui, -apple-system, sans-serif;
              --color-primary-blue: rgb(18 109 251);
              --color-primary-blue-dark: rgb(15 90 214);
              --color-primary-blue-light: rgb(59 130 246);
              --color-white: rgb(255 255 255);
              --color-gray-200: rgb(229 231 235);
              --color-gray-900: rgb(17 24 39);
              --color-gray-700: rgb(55 65 81);
              --color-gray-600: rgb(75 85 99);
            }
            
            body {
              font-family: var(--font-inter);
              margin: 0;
              padding: 0;
              line-height: 1.6;
              color: var(--color-gray-900);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              font-display: swap;
            }
            
            /* Prevent layout shift with fixed header height */
            .header {
              position: sticky;
              top: 0;
              z-index: 50;
              background: var(--color-white);
              border-bottom: 1px solid var(--color-gray-200);
              min-height: 4rem;
              contain: layout style;
            }
            
            /* Optimized hero section for LCP */
            .hero-section {
              background: linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-primary-blue-dark) 100%);
              color: var(--color-white);
              padding: 6rem 1rem 4rem;
              text-align: center;
              min-height: 60vh;
              display: flex;
              align-items: center;
              justify-content: center;
              contain: layout style;
            }
            
            .hero-title {
              font-size: 3.5rem;
              font-weight: 800;
              line-height: 1.1;
              margin-bottom: 1.5rem;
              contain: layout;
            }
            
            .hero-subtitle {
              font-size: 1.25rem;
              opacity: 0.9;
              max-width: 48rem;
              margin: 0 auto 2rem;
              contain: layout;
            }
            
            /* Optimized button styles */
            .btn-primary {
              background: var(--color-white);
              color: var(--color-primary-blue);
              font-weight: 600;
              padding: 1rem 2rem;
              border-radius: 0.75rem;
              border: none;
              font-size: 1.125rem;
              cursor: pointer;
              transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              display: inline-flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
              min-height: 3.5rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              will-change: transform;
            }
            
            .btn-primary:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            
            /* Layout helpers with contain optimization */
            .container { 
              max-width: 80rem; 
              margin: 0 auto; 
              padding: 0 1rem;
              contain: layout;
            }
            
            /* Prevent font loading shift */
            @font-face {
              font-family: 'Inter';
              font-display: swap;
              src: url('/fonts/inter-var.woff2') format('woff2-variations');
              font-weight: 100 900;
              font-style: normal;
            }
            
            /* Layout helpers */
            .text-center { text-align: center; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .text-lg { font-size: 1.125rem; }
            .text-xl { font-size: 1.25rem; }
            .text-2xl { font-size: 1.5rem; }
            .text-3xl { font-size: 1.875rem; }
            
            /* Smooth scrolling */
            html { 
              scroll-behavior: smooth;
              scroll-padding-top: 4rem;
            }
            
            /* Responsive optimizations */
            @media (max-width: 768px) {
              .hero-section { 
                padding: 4rem 1rem 3rem; 
                min-height: 50vh; 
              }
              .hero-title { 
                font-size: 2.5rem; 
              }
              .hero-subtitle { 
                font-size: 1.125rem; 
              }
              .container { 
                padding: 0 1rem; 
              }
            }
            
            /* Loading states to prevent CLS */
            .loading-skeleton {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
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
        <link rel="preload" href="/images/og-image.png" as="image" type="image/png" />
        
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
