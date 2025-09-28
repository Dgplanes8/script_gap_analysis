'use client';

import * as Sentry from "@sentry/nextjs";

export default function TestSentryPage() {
  const testClientError = () => {
    try {
      // @ts-ignore - Intentionally calling undefined function for testing
      nonExistentFunction();
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          test: 'client-side',
          component: 'test-sentry-page'
        }
      });
      alert('Test error sent to Sentry! Check your dashboard.');
    }
  };

  const testManualError = () => {
    Sentry.captureException(new Error("Manual test error from Next.js"), {
      tags: {
        test: 'manual',
        component: 'test-sentry-page'
      },
      extra: {
        testData: 'This is a test error to verify Sentry integration'
      }
    });
    alert('Manual test error sent to Sentry! Check your dashboard.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Test Sentry Integration</h1>

        <div className="space-y-4">
          <button
            onClick={testClientError}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Test Client-Side Error
          </button>

          <button
            onClick={testManualError}
            className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Test Manual Error
          </button>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Click the buttons above to test Sentry error tracking. Check your Sentry dashboard to see the errors appear.
            </p>
          </div>

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>Edge Function Test:</strong> Errors in your Supabase functions (payments, AI generation, etc.) will automatically be tracked and sent to Sentry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}