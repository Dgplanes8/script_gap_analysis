import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c787600a224359f21a373f806ee95525@o4510094750121985.ingest.us.sentry.io/4510094753333248",

  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of traces

  // Edge runtime specific configuration
  beforeSend(event) {
    // Add edge context
    if (event.tags) {
      event.tags.runtime = 'nextjs-edge';
    } else {
      event.tags = { runtime: 'nextjs-edge' };
    }
    return event;
  },

  // Release tracking
  environment: process.env.NODE_ENV || 'production',
});