import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c787600a224359f21a373f806ee95525@o4510094750121985.ingest.us.sentry.io/4510094753333248",

  integrations: [
    // Send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of traces

  // Enable experimental logs
  _experiments: {
    enableLogs: true,
  },

  // Server-side error filtering
  beforeSend(event) {
    // Add server context
    if (event.tags) {
      event.tags.runtime = 'nextjs-server';
    } else {
      event.tags = { runtime: 'nextjs-server' };
    }
    return event;
  },

  // Release tracking
  environment: process.env.NODE_ENV || 'production',
});