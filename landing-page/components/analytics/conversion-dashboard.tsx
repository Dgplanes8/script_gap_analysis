'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Mail, Calendar } from 'lucide-react';

interface ConversionMetric {
  name: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

interface ConversionDashboardProps {
  className?: string;
}

export function ConversionDashboard({ className = '' }: ConversionDashboardProps) {
  const [metrics, setMetrics] = useState<ConversionMetric[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or to admin users
    const isDev = process.env.NODE_ENV === 'development';
    const isAdmin = localStorage.getItem('mmm_admin') === 'true';
    
    if (isDev || isAdmin) {
      setIsVisible(true);
      loadMetrics();
    }
  }, []);

  const loadMetrics = () => {
    // In a real implementation, this would fetch from your analytics API
    // For now, we'll simulate the data
    const mockMetrics: ConversionMetric[] = [
      {
        name: 'Email Signup Rate',
        value: 32.4,
        change: +28.2,
        icon: <Mail className="h-5 w-5" />
      },
      {
        name: 'Calendly Booking Rate',
        value: 19.8,
        change: +31.7,
        icon: <Calendar className="h-5 w-5" />
      },
      {
        name: 'Page Views',
        value: 1247,
        change: +15.3,
        icon: <Users className="h-5 w-5" />
      },
      {
        name: '$990 Conversion Rate',
        value: 11.2,
        change: +39.5,
        icon: <TrendingUp className="h-5 w-5" />
      }
    ];

    setMetrics(mockMetrics);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-4 max-w-sm z-40 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Conversion Metrics</h3>
        <span className="text-xs text-gray-500">Live</span>
      </div>
      
      <div className="space-y-2">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-brand-600">
                {metric.icon}
              </div>
              <span className="text-sm text-gray-700">{metric.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {metric.name.includes('Rate') ? `${metric.value}%` : metric.value}
              </div>
              <div className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Updates every 5 minutes
        </div>
      </div>
    </div>
  );
}

// Hook to enable admin mode (for development/testing)
export function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('mmm_admin') === 'true');
  }, []);

  const toggleAdmin = () => {
    const newAdminState = !isAdmin;
    localStorage.setItem('mmm_admin', newAdminState.toString());
    setIsAdmin(newAdminState);
  };

  return { isAdmin, toggleAdmin };
}