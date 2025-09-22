# APSICS Media Landing Page

A Next.js 14 application for APSICS Media's creative intelligence service with AI ad script generator, Supabase integration, and subscription billing.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Resend** for email marketing
- **Calendly** integration for booking
- **Stripe** for payments
- **Analytics** ready (Google Analytics)
- **Mobile-responsive** design
- **SEO optimized**

## Pages

- `/` - Main landing page for creative intelligence service
- `/ai-ad-script-generator` - AI-powered script generation tool
- Service tiers with $5/week founding member pricing

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local .env
```

3. Update environment variables in `.env`:
```
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI Configuration
DEEPSEEK_API_KEY=your_deepseek_api_key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_google_analytics_id_here
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── ai-ad-script-generator/
│   └── client-page.tsx     # AI script generator interface
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Main landing page

components/
├── alytics/
│   ├── alytics-hero.tsx           # Hero section
│   ├── alytics-landing.tsx        # Main landing component
│   ├── simple-pricing-section.tsx # Pricing tiers
│   ├── social-proof-section.tsx   # Testimonials and stats
│   ├── four-box-process-section.tsx # Process explanation
│   ├── performance-guarantee-section.tsx # Guarantee section
│   └── founder-section.tsx        # Founder credibility
├── forms/
│   └── email-capture-form.tsx     # Email capture
└── ui/
    └── button.tsx                 # UI components

supabase/
└── functions/
    └── generate-script/
        └── index.ts               # AI script generation function
```

## Key Components

### AI Script Generator
DeepSeek-powered ad script generation with user authentication and credit system.

### Hero Section
Outcome-focused messaging emphasizing revenue doubling potential.

### Pricing Section
Affordable $5/week service vs $5,000+ agency fees positioning.

### Social Proof
12+ years experience and $250MM+ managed media spend credibility.

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm run start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `DEEPSEEK_API_KEY` | DeepSeek AI API key | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | Optional |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format with Prettier
- `npm run type-check` - TypeScript type checking

## Service Description

APSICS Media provides weekly creative intelligence for performance marketers:
- Research-backed creative concepts (static + video)
- Platform-optimized scripts for Facebook, Instagram, TikTok, LinkedIn, X, YouTube
- $5/week founding member pricing vs $5,000+ agency fees
- Performance improvement guarantee

## License

Private - APSICS Media