import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c787600a224359f21a373f806ee95525@o4510094750121985.ingest.us.sentry.io/4510094753333248",

  integrations: [
    Sentry.browserTracingIntegration(),
    // Send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of traces in development

  // Set up automatic error boundary
  beforeSend(event) {
    // Filter out non-critical errors in development
    if (process.env.NODE_ENV === 'development') {
      // You can filter out certain errors here if needed
      return event;
    }
    return event;
  },

  // Configure tracing
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/.*\.vercel\.app/,
    /^https:\/\/.*\.supabase\.co/,
    /^https:\/\/pwtxocetgpctnjtesynk\.supabase\.co/,
  ],

  // Release tracking
  environment: process.env.NODE_ENV,
});