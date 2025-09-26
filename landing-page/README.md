# APSICS Media Landing Page

A Next.js 14 application for APSICS Media's creative intelligence service with AI ad script generator, Supabase integration, and subscription billing.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Resend / ConvertKit** for email flows
- **Calendly** integration for booking
- **Stripe** for payments
- **Analytics** ready (Google Analytics)
- **Mobile-responsive** design
- **SEO optimized**
- **Hardened forms** with CORS allowlists and per-IP rate limiting

## Pages

- `/` - Main landing page for creative intelligence service
- `/ai-ad-script-generator` - AI-powered script generation tool
- Service tiers with $5/week founding member pricing

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Copy the example environment file and fill in secrets (never commit the result):
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your keys (all other `.env*` files are gitignored):
```
# Core URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email + Forms
CONVERTKIT_API_KEY=your_convertkit_api_key
CONVERTKIT_FORM_ID=your_convertkit_form_id
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL="APSICS Media <notifications@yourdomain.com>"
LEAD_ALERT_EMAIL=you@yourdomain.com

# Stripe Pricing (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PRICE_ID=default_subscription_price_id
STRIPE_SUCCESS_URL=https://yourdomain.com/success
STRIPE_CANCEL_URL=https://yourdomain.com/cancelled
STRIPE_FOUNDERS_SPECIAL_PRICE_ID=price_xxx
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_GROWTH_PRICE_ID=price_xxx
STRIPE_SCALE_PRICE_ID=price_xxx

# Analytics (optional)
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
| `CONVERTKIT_API_KEY` | ConvertKit API key (fallback to logging if absent) | Optional |
| `CONVERTKIT_FORM_ID` | ConvertKit form id (or override per request) | Optional |
| `RESEND_API_KEY` | Resend API key for transactional emails | Optional |
| `RESEND_FROM_EMAIL` | Default `from` address for Resend emails | Optional |
| `LEAD_ALERT_EMAIL` | Comma separated emails for internal lead alerts | Optional |
| `STRIPE_SECRET_KEY` | Stripe secret key for checkout sessions | Optional |
| `STRIPE_PRICE_ID` | Default Stripe price ID fallback | Optional |
| `STRIPE_SUCCESS_URL` | Default Stripe success redirect URL | Optional |
| `STRIPE_CANCEL_URL` | Default Stripe cancel redirect URL | Optional |
| `STRIPE_FOUNDERS_SPECIAL_PRICE_ID` | Stripe price ID for Founders Special package | Optional |
| `STRIPE_STARTER_PRICE_ID` | Stripe price ID for Starter plan | Optional |
| `STRIPE_GROWTH_PRICE_ID` | Stripe price ID for Growth plan | Optional |
| `STRIPE_SCALE_PRICE_ID` | Stripe price ID for Scale plan | Optional |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins for API access | Yes (prod) |
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

## Security Practices

- Never commit real secrets – keep them in `.env.local`, which is gitignored.
- Update `ALLOWED_ORIGINS` to the exact domains permitted to hit form APIs.
- All new API routes should reuse the helpers in `lib/security/request-guard.ts` for CORS + rate limiting.
- Avoid logging raw user inputs; mask emails or remove PII before writing to logs.

## License

Private - APSICS Media
