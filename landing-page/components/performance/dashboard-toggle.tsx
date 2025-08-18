'use client';

import { useState } from 'react';
import { PerformanceDashboard } from './performance-dashboard';

export function PerformanceDashboardToggle() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {/* Toggle Button - Fixed position */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg transition-colors"
        title="Toggle Performance Dashboard"
      >
        📊 Perf
      </button>

      {/* Dashboard */}
      {isVisible && (
        <PerformanceDashboard 
          showInProduction={true}
        />
      )}
    </>
  );
}

// Keyboard shortcut version
export function PerformanceDashboardWithShortcut() {
  const [isVisible, setIsVisible] = useState(false);

  // Keyboard shortcut: Ctrl+Shift+P
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <PerformanceDashboard 
          showInProduction={true}
        />
      )}
    </>
  );
}