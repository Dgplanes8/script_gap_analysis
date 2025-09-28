'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Capture the error in Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          fontFamily: 'system-ui, sans-serif',
          backgroundColor: '#f9fafb',
          color: '#374151'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '600px',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#dc2626'
            }}>
              Something went wrong
            </h1>
            <p style={{
              fontSize: '16px',
              marginBottom: '24px',
              lineHeight: '1.5',
              color: '#6b7280'
            }}>
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#126DFB',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0F5AD6'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#126DFB'}
            >
              Try again
            </button>
            <p style={{
              fontSize: '14px',
              marginTop: '16px',
              color: '#9ca3af'
            }}>
              If the problem persists, please contact{' '}
              <a
                href="mailto:brian@apsicsmedia.com"
                style={{ color: '#126DFB', textDecoration: 'none' }}
              >
                brian@apsicsmedia.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}