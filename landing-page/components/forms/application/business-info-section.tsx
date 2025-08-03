'use client';

import { Building2 } from 'lucide-react';
import { FormSectionProps } from './form-types';

export function BusinessInfoSection({ formData, handleInputChange }: FormSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Building2 className="h-5 w-5 mr-2 text-green-600" />
        Business Information
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business/Company Name *
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product/Service Name *
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Briefly describe your subscription product/service *
          </label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Fitness app with workout plans and nutrition tracking for busy professionals..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Recurring Revenue (MRR) *
          </label>
          <select
            name="monthlyRevenue"
            value={formData.monthlyRevenue}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select range...</option>
            <option value="$0-$10k">$0 - $10,000</option>
            <option value="$10k-$50k">$10,000 - $50,000</option>
            <option value="$50k-$100k">$50,000 - $100,000</option>
            <option value="$100k-$500k">$100,000 - $500,000</option>
            <option value="$500k-$1M">$500,000 - $1,000,000</option>
            <option value="$1M+">$1,000,000+</option>
          </select>
        </div>
      </div>
    </div>
  );
}