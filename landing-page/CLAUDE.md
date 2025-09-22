# CLAUDE Development Guidelines

## Project Context
Landing page for APSICS Media's creative intelligence service - weekly research-backed creative concepts and scripts for performance marketing.

## Key Business Updates (v3.1)

### Core Value Proposition
- **Primary**: "$5,000+ agency strategy starting at just $5/week"
- **Outcome Focus**: "You're One Creative Breakthrough Away From Doubling Your Revenue"
- **Problem**: Companies burning ad budget on creative guesswork
- **Solution**: Weekly creative intelligence that turns ad spend into predictable revenue

### Service Clarity
- **Content Types**: Both static and video content
- **Platforms**: Facebook, Instagram, TikTok, LinkedIn, X, YouTube
- **Delivery**: Weekly Monday delivery (1 concept + 2 scripts)
- **Performance**: 25-point scoring system (not 50-point)

### Language Guidelines
- **Avoid**: "Household brand" (except in founder bio) - intimidates smaller companies
- **Use**: "Proven strategic frameworks"
- **Emphasize**: Cross-platform capabilities in all service descriptions
- **Minimize**: Overuse of hyphens and repetitive "56%" statistic

### Pricing Structure
- **Founding Member**: $5/week (was $20/week founding member in pricing section)
- **Regular**: $39/week after trial
- **Comparison**: vs $5,000+ agency fees

## Technical Standards

### Brand Consistency
- **Primary Color**: #126DFB (APSICS blue)
- **Animation**: 0.4s duration with custom easing [0.25, 0.25, 0, 1]
- **Typography**: Responsive hierarchy (text-4xl → text-6xl)
- **CTA**: Consistent "Start Free Week Trial" messaging

### Development Patterns
- **React/Next.js**: TypeScript with strict type checking
- **Animations**: Framer Motion with consistent variants
- **Error Handling**: Async/await pattern preferred over Promise chains
- **Mobile**: Touch-friendly targets (44px minimum)

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
- **Risk reversal**: Free week trial, performance guarantee
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

Last Updated: September 2025 (v3.1)