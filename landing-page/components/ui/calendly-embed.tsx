'use client';

import { useEffect } from 'react';

interface CalendlyEmbedProps {
  url: string;
  height?: number;
}

export function CalendlyEmbed({ url, height = 700 }: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly embed script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="calendly-embed-container">
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: '320px', height: `${height}px` }}
      ></div>
    </div>
  );
}