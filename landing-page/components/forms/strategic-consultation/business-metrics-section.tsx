'use client';

import { TrendingUp } from 'lucide-react';
import { FormSectionProps } from './form-types';

export function BusinessMetricsSection({ formData, handleInputChange }: FormSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
        Business Metrics <span className="text-sm font-normal text-gray-500">(Optional)</span>
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current ARR
          </label>
          <select
            name="currentARR"
            value={formData.currentARR}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select current ARR</option>
            <option value="$100K-$500K">$100K - $500K</option>
            <option value="$500K-$1M">$500K - $1M</option>
            <option value="$1M-$2M">$1M - $2M</option>
            <option value="$2M-$5M">$2M - $5M</option>
            <option value="$5M+">$5M+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target ARR Goal
          </label>
          <select
            name="targetARR"
            value={formData.targetARR}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select target ARR</option>
            <option value="$500K">$500K</option>
            <option value="$1M">$1M</option>
            <option value="$2M">$2M</option>
            <option value="$5M">$5M</option>
            <option value="$10M+">$10M+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current CAC (if known)
          </label>
          <input
            type="number"
            name="currentCAC"
            value={formData.currentCAC}
            onChange={handleInputChange}
            placeholder="e.g., 200"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Ad Spend
          </label>
          <select
            name="monthlyAdSpend"
            value={formData.monthlyAdSpend}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select ad spend range</option>
            <option value="$0-$5K">$0 - $5K</option>
            <option value="$5K-$15K">$5K - $15K</option>
            <option value="$15K-$30K">$15K - $30K</option>
            <option value="$30K-$50K">$30K - $50K</option>
            <option value="$50K+">$50K+</option>
          </select>
        </div>
      </div>
    </div>
  );
}