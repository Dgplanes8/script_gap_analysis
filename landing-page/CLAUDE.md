# CLAUDE Development Guidelines

## Project Context
Landing page for APSICS Media's credit-based creative intelligence platform – deliver weekly research-backed creative concepts, scripts, and ad iterations through a unified credit wallet.

## Key Business Updates (v3.2)

### Core Value Proposition
- **Primary**: "$5,000+ agency strategy at a fraction of the cost via credits"
- **Outcome Focus**: "You're One Creative Breakthrough Away From Doubling Your Revenue"
- **Problem**: Companies burning ad budget on creative guesswork
- **Solution**: Weekly creative intelligence powered by a shared credit wallet (scripts, briefs, iteration)

### Service Clarity
- **Content Types**: Both static and video content
- **Platforms**: Facebook, Instagram, TikTok, LinkedIn, X, YouTube
- **Delivery**: Mix of on-demand generator runs + Studio expert-crafted concept (month one)
- **Performance**: 25-point scoring system (not 50-point)

### Language Guidelines
- **Avoid**: "Household brand" (except in founder bio) - intimidates smaller companies
- **Use**: "Proven strategic frameworks"
- **Emphasize**: Credits, plan tiers (Explore/Essentials/Studio/Concierge), cross-platform capabilities
- **Minimize**: Overuse of hyphens and repetitive stats

### Pricing Structure
- **Explore**: $0 / 10 credits refreshed monthly (no card)
- **Essentials**: $19 / 150 credits per month
- **Studio**: $29/mo for first 6 months (800 credits + expert concept), renews at $49
- **Concierge**: $249 / 2,000 credits per month with strategist collaboration
- **Comparison**: vs $5,000+ agency retainers

## Technical Standards

### Brand Consistency
- **Primary Color**: #126DFB (APSICS blue)
- **Animation**: 0.4s duration with custom easing [0.25, 0.25, 0, 1]
- **Typography**: Responsive hierarchy (text-4xl → text-6xl)
- **CTA**: Consistent "Claim 10 Free Credits" messaging

### Development Patterns
- **React/Next.js**: TypeScript with strict type checking
- **Animations**: Framer Motion with consistent variants
- **Error Handling**: Async/await pattern preferred over Promise chains
- **Mobile**: Touch-friendly targets (44px minimum)
- **Security**:
  - Use `lib/security/request-guard` for CORS + rate limiting on new API routes
  - Redact or hash PII in server logs; never persist raw emails or budgets
  - Secrets live in ignored `.env.local`; never commit `.env`
  - Sanitize any AI or user-generated HTML before rendering client-side

### Performance Optimization
- **Loading**: Progressive enhancement with motion.div
- **SEO**: Updated metadata reflecting new value prop
- **Accessibility**: Clear hierarchy and sufficient color contrast

## Conversion Optimization

### Landing Page Structure
1. Hero with outcome-focused headline
2. Social proof section (moved higher)
3. Problem/solution framework
4. Before/after examples
5. Service tiers with clear pricing
6. Performance guarantee
7. Founder credibility

### Direct Response Principles
- **Outcome over features**: Focus on revenue doubling vs feature lists
- **Urgency**: "Every month you delay is revenue left on the table"
- **Social proof**: $250MM+ managed, 12+ years experience
- **Risk reversal**: 10 free monthly credits, Studio founding offer guarantee
- **Clear value**: Agency-level strategy at fraction of cost

## Recent Problem Solving

### Zero Conversion Issue (500 visits, 0 conversions)
- **Problem**: Visitors didn't understand value proposition
- **Solution**: Outcome-focused copy + clearer service description
- **Implementation**: Platform-specific messaging throughout

### TypeScript Compilation
- **Error**: Promise chain type issues in client-page.tsx
- **Fix**: Converted to async/await with proper error handling
- **Pattern**: Always use async/await for Supabase queries

## Development Commands
```bash
npm run dev        # Development server
npm run build      # Production build
npm run type-check # TypeScript validation
npm run lint       # ESLint check
```

## File Structure Priority
- Hero: `/components/alytics/alytics-hero.tsx`
- Pricing: `/components/alytics/simple-pricing-section.tsx`
- Examples: `/components/alytics/before-after-examples-section.tsx`
- Social Proof: `/components/alytics/social-proof-section.tsx`
- Main App: `/app/ai-ad-script-generator/client-page.tsx`

Last Updated: February 2025 (v3.2)
