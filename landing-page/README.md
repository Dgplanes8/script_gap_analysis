# Monday Morning Marketer Landing Pages

A Next.js 14 application for Monday Morning Marketer landing pages with optimized email capture, Calendly integration, and Stripe payment processing.

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

- `/` - Main landing page with program overview
- `/pilot` - Strategic Marketing Pilot Program ($997/month)
- `/990` - Done-For-You Marketing Program ($9,900/month)
- `/success` - Success stories and testimonials

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

# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_FROM_EMAIL=hello@mondaymorningmarketer.com

# Stripe Configuration  
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Calendly Configuration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username

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
├── api/
│   └── subscribe/
│       └── route.ts         # Email subscription API
├── pilot/
│   └── page.tsx            # Pilot program page ($997)
├── 990/
│   └── page.tsx            # Done-for-you page ($9,900)
├── success/
│   └── page.tsx            # Success stories
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Home page

components/
├── forms/
│   └── email-capture-form.tsx  # Email capture with validation
├── layout/
│   ├── hero.tsx               # Hero section component
│   ├── features.tsx           # Features section
│   ├── cta-section.tsx        # Call-to-action sections
│   └── testimonial-section.tsx # Testimonials
├── ui/
│   ├── testimonial-card.tsx   # Individual testimonial
│   ├── pricing-card.tsx       # Pricing display
│   └── calendly-embed.tsx     # Calendly booking widget
└── analytics.tsx              # Google Analytics

lib/
└── utils.ts                   # Utility functions
```

## Key Components

### EmailCaptureForm
Optimized email capture with validation, multiple variants, and Resend integration.

### Hero Section
Conversion-optimized hero with social proof and clear CTAs.

### Pricing Cards
Professional pricing display with feature lists and conversion tracking.

### Calendly Integration
Seamless booking widget integration for strategy calls.

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
| `RESEND_API_KEY` | Resend API key for emails | Yes |
| `NEXT_PUBLIC_FROM_EMAIL` | From email address | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | Optional |
| `STRIPE_SECRET_KEY` | Stripe secret key | Optional |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly booking URL | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | Optional |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format with Prettier
- `npm run type-check` - TypeScript type checking

## License

Private - Monday Morning Marketer