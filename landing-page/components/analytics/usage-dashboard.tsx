/**
 * Usage Analytics Dashboard for APSICS AI Tools
 * Displays usage metrics, performance data, and user insights
 */

'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Clock, Target, AlertCircle } from 'lucide-react';
import type { BrowserClient } from '@/lib/supabase/browser-client';

interface DashboardProps {
  supabase: BrowserClient;
  className?: string;
}

interface UsageSummary {
  usage_date: string;
  tool_type: string;
  total_generations: number;
  unique_authenticated_users: number;
  unique_anonymous_users: number;
  total_credits_spent: number;
  avg_processing_ms: number;
  success_rate_pct: number;
}

interface ToolPerformance {
  tool_type: string;
  total_usage: number;
  unique_users: number;
  avg_processing_ms: number;
  success_rate_pct: number;
  total_credits_consumed: number;
  usage_last_7_days: number;
  usage_last_30_days: number;
}

export function UsageDashboard({ supabase, className }: DashboardProps) {
  const [dailySummary, setDailySummary] = useState<UsageSummary[]>([]);
  const [toolPerformance, setToolPerformance] = useState<ToolPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [supabase]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch daily summary for last 30 days
      const { data: summaryData, error: summaryError } = await supabase
        .from('daily_usage_summary')
        .select('*')
        .gte('usage_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('usage_date', { ascending: false });

      if (summaryError) throw summaryError;

      // Fetch tool performance metrics
      const { data: performanceData, error: performanceError } = await supabase
        .from('tool_performance_summary')
        .select('*');

      if (performanceError) throw performanceError;

      setDailySummary(summaryData || []);
      setToolPerformance(performanceData || []);

    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatToolName = (toolType: string) => {
    switch (toolType) {
      case 'script-generator': return 'Script Generator';
      case 'brief-generator': return 'Brief Generator';
      case 'iteration-tool': return 'Iteration Tool';
      default: return toolType;
    }
  };

  const getTotalStats = () => {
    const today = dailySummary.filter(item =>
      item.usage_date === new Date().toISOString().split('T')[0]
    );

    const last7Days = dailySummary.filter(item =>
      new Date(item.usage_date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    return {
      todayGenerations: today.reduce((sum, item) => sum + item.total_generations, 0),
      todayUsers: today.reduce((sum, item) => sum + item.unique_authenticated_users + item.unique_anonymous_users, 0),
      last7DaysGenerations: last7Days.reduce((sum, item) => sum + item.total_generations, 0),
      last7DaysCredits: last7Days.reduce((sum, item) => sum + item.total_credits_spent, 0),
      avgSuccessRate: last7Days.length > 0
        ? Math.round(last7Days.reduce((sum, item) => sum + item.success_rate_pct, 0) / last7Days.length)
        : 0,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#126DFB] border-t-transparent"></div>
          <span className="text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <div className="flex items-center gap-3 text-red-800">
          <AlertCircle className="h-5 w-5" />
          <span className="font-semibold">Analytics Error</span>
        </div>
        <p className="mt-2 text-sm text-red-700">{error}</p>
        <button
          onClick={fetchAnalytics}
          className="mt-3 rounded-md bg-red-100 px-3 py-1 text-sm font-semibold text-red-800 hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  const stats = getTotalStats();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Usage Analytics</h2>
          <p className="text-gray-600">APSICS AI Tools performance metrics</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="inline-flex items-center gap-2 rounded-lg bg-[#126DFB] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0F5AD6]"
        >
          <BarChart3 className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-xl font-bold text-gray-900">{stats.todayGenerations}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <Users className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Users Today</p>
              <p className="text-xl font-bold text-gray-900">{stats.todayUsers}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-purple-100 p-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Last 7 Days</p>
              <p className="text-xl font-bold text-gray-900">{stats.last7DaysGenerations}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-orange-100 p-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Credits (7d)</p>
              <p className="text-xl font-bold text-gray-900">{stats.last7DaysCredits}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-2">
              <Clock className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-xl font-bold text-gray-900">{stats.avgSuccessRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Performance Table */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900">Tool Performance</h3>
          <p className="text-sm text-gray-600">Usage and performance metrics by tool</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">Tool</th>
                <th className="px-4 py-3 text-right">Total Usage</th>
                <th className="px-4 py-3 text-right">Unique Users</th>
                <th className="px-4 py-3 text-right">Avg Speed (ms)</th>
                <th className="px-4 py-3 text-right">Success Rate</th>
                <th className="px-4 py-3 text-right">Last 7 Days</th>
                <th className="px-4 py-3 text-right">Credits Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {toolPerformance.map((tool) => (
                <tr key={tool.tool_type} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {formatToolName(tool.tool_type)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {tool.total_usage.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {tool.unique_users.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {Math.round(tool.avg_processing_ms).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      tool.success_rate_pct >= 95
                        ? 'bg-green-100 text-green-800'
                        : tool.success_rate_pct >= 90
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tool.success_rate_pct.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {tool.usage_last_7_days.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {tool.total_credits_consumed.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-600">Last 7 days usage by tool and date</p>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {dailySummary.slice(0, 7).map((day) => (
              <div key={`${day.usage_date}-${day.tool_type}`} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-gray-900">
                    {formatToolName(day.tool_type)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(day.usage_date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">
                    {day.total_generations} generations
                  </span>
                  <span className="text-gray-600">
                    {day.unique_authenticated_users + day.unique_anonymous_users} users
                  </span>
                  <span className={`font-medium ${
                    day.success_rate_pct >= 95 ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {day.success_rate_pct.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}