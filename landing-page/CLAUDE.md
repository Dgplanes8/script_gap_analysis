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
- **Essentials**: $19 / 100 credits per month
- **Studio**: $29/mo for first 6 months (500 credits + expert concept), renews at $49
- **Concierge**: $249 / 1,500 credits per month with strategist collaboration
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


These examples should be used as guidance when configuring Sentry functionality within a project.

# Exception Catching

Use `Sentry.captureException(error)` to capture an exception and log the error in Sentry.
Use this in try catch blocks or areas where exceptions are expected

# Tracing Examples

Spans should be created for meaningful actions within an applications like button clicks, API calls, and function calls
Use the `Sentry.startSpan` function to create a span
Child spans can exist within a parent span

## Custom Span instrumentation in component actions

The `name` and `op` properties should be meaninful for the activities in the call.
Attach attributes based on relevant information and metrics from the request

```javascript
function TestComponent() {
  const handleTestButtonClick = () => {
    // Create a transaction/span to measure performance
    Sentry.startSpan(
      {
        op: "ui.click",
        name: "Test Button Click",
      },
      (span) => {
        const value = "some config";
        const metric = "some metric";

        // Metrics can be added to the span
        span.setAttribute("config", value);
        span.setAttribute("metric", metric);

        doSomething();
      },
    );
  };

  return (
    <button type="button" onClick={handleTestButtonClick}>
      Test Sentry
    </button>
  );
}
```

## Custom span instrumentation in API calls

The `name` and `op` properties should be meaninful for the activities in the call.
Attach attributes based on relevant information and metrics from the request

```javascript
async function fetchUserData(userId) {
  return Sentry.startSpan(
    {
      op: "http.client",
      name: `GET /api/users/${userId}`,
    },
    async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      return data;
    },
  );
}
```

# Logs

Where logs are used, ensure Sentry is imported using `import * as Sentry from "@sentry/nextjs"`
Enable logging in Sentry using `Sentry.init({ _experiments: { enableLogs: true } })`
Reference the logger using `const { logger } = Sentry`
Sentry offers a consoleLoggingIntegration that can be used to log specific console error types automatically without instrumenting the individual logger calls

## Configuration

In NextJS the client side Sentry initialization is in `instrumentation-client.ts`, the server initialization is in `sentry.server.config.ts` and the edge initialization is in `sentry.edge.config.ts`
Initialization does not need to be repeated in other files, it only needs to happen the files mentioned above. You should use `import * as Sentry from "@sentry/nextjs"` to reference Sentry functionality

### Baseline

```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c787600a224359f21a373f806ee95525@o4510094750121985.ingest.us.sentry.io/4510094753333248",

  _experiments: {
    enableLogs: true,
  },
});
```

### Logger Integration

```javascript
Sentry.init({
  dsn: "https://c787600a224359f21a373f806ee95525@o4510094750121985.ingest.us.sentry.io/4510094753333248",
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
});
```

## Logger Examples

`logger.fmt` is a template literal function that should be used to bring variables into the structured logs.

```javascript
logger.trace("Starting database connection", { database: "users" });
logger.debug(logger.fmt`Cache miss for user: ${userId}`);
logger.info("Updated profile", { profileId: 345 });
logger.warn("Rate limit reached for endpoint", {
  endpoint: "/api/results/",
  isEnterprise: false,
});
logger.error("Failed to process payment", {
  orderId: "order_123",
  amount: 99.99,
});
logger.fatal("Database connection pool exhausted", {
  database: "users",
  activeConnections: 100,
});
```
