// Shared Sentry configuration for Supabase Edge Functions
import 'https://deno.land/x/xhr@0.3.0/mod.ts';

// Sentry for Deno
import * as Sentry from 'https://deno.land/x/sentry@7.77.0/index.js';

// Initialize Sentry (you'll get this DSN from your Sentry dashboard)
const SENTRY_DSN = Deno.env.get('SENTRY_DSN') || '';

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: Deno.env.get('ENVIRONMENT') || 'production',
    // Add your project info
    beforeSend(event) {
      // Add edge function context
      if (event.tags) {
        event.tags.runtime = 'supabase-edge-function';
      } else {
        event.tags = { runtime: 'supabase-edge-function' };
      }
      return event;
    },
  });
}

export function captureEdgeFunctionError(
  error: Error | unknown,
  context: {
    functionName: string;
    userId?: string;
    requestData?: any;
    additionalTags?: Record<string, string>;
  }
) {
  if (!SENTRY_DSN) {
    console.error('Sentry DSN not configured, logging error instead:', error);
    return;
  }

  const errorToCapture = error instanceof Error ? error : new Error(String(error));

  Sentry.withScope((scope) => {
    // Set function context
    scope.setTag('function', context.functionName);
    scope.setTag('platform', 'supabase');

    // Add user context if available
    if (context.userId) {
      scope.setUser({ id: context.userId });
    }

    // Add additional tags
    if (context.additionalTags) {
      Object.entries(context.additionalTags).forEach(([key, value]) => {
        scope.setTag(key, value);
      });
    }

    // Add request data as extra context
    if (context.requestData) {
      scope.setExtra('requestData', context.requestData);
    }

    // Set function name as fingerprint for better grouping
    scope.setFingerprint([context.functionName, errorToCapture.message]);

    Sentry.captureException(errorToCapture);
  });
}

export { Sentry };