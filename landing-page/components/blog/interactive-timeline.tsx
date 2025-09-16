'use client'

import React, { useState } from 'react'
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp, Clock, TrendingUp, Target } from 'lucide-react'

interface TimelineMilestone {
  day: number;
  title: string;
  description: string;
  deliverables: string[];
  provider: 'all' | 'agency' | 'consultant' | 'freelancer';
  priority: 'high' | 'medium' | 'low';
}

interface ProviderComparison {
  provider: string;
  setupTime: string;
  firstResults: string;
  fullImplementation: string;
  strengths: string[];
  considerations: string[];
}

function TimelineCard({ milestone, isExpanded, onToggle }: { milestone: TimelineMilestone; isExpanded: boolean; onToggle: () => void }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-brand-100 text-brand-800 border-brand-200';
      case 'medium': return 'bg-brand-100 text-brand-800 border-brand-200';
      case 'low': return 'bg-brand-100 text-brand-800 border-brand-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'agency': return 'bg-blue-100 text-blue-800';
      case 'consultant': return 'bg-brand-100 text-brand-800';
      case 'freelancer': return 'bg-brand-100 text-brand-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-bold">{milestone.day}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
            <p className="text-sm text-gray-600">Day {milestone.day}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(milestone.priority)}`}>
            {milestone.priority.toUpperCase()}
          </span>
          {milestone.provider !== 'all' && (
            <span className={`px-2 py-1 text-xs font-medium rounded ${getProviderColor(milestone.provider)}`}>
              {milestone.provider.toUpperCase()}
            </span>
          )}
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{milestone.description}</p>

      {isExpanded && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Expected Deliverables:</h4>
          <ul className="space-y-2">
            {milestone.deliverables.map((deliverable, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-brand-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ProviderComparisonCard({ provider }: { provider: ProviderComparison }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{provider.provider}</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
          <div className="text-sm font-medium text-blue-900">Setup Time</div>
          <div className="text-xs text-blue-700">{provider.setupTime}</div>
        </div>
        <div className="bg-brand-50 p-3 rounded-lg">
          <TrendingUp className="h-5 w-5 text-brand-600 mx-auto mb-1" />
          <div className="text-sm font-medium text-brand-900">First Results</div>
          <div className="text-xs text-brand-700">{provider.firstResults}</div>
        </div>
        <div className="bg-brand-50 p-3 rounded-lg">
          <Target className="h-5 w-5 text-brand-600 mx-auto mb-1" />
          <div className="text-sm font-medium text-brand-900">Full Implementation</div>
          <div className="text-xs text-brand-700">{provider.fullImplementation}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-brand-900 mb-2 flex items-center">
            <CheckCircle className="h-4 w-4 text-brand-600 mr-1" />
            Key Strengths
          </h4>
          <ul className="space-y-1">
            {provider.strengths.map((strength, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-brand-900 mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 text-brand-600 mr-1" />
            Considerations
          </h4>
          <ul className="space-y-1">
            {provider.considerations.map((consideration, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                {consideration}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface InteractiveTimelineProps {
  timelineMilestones: TimelineMilestone[];
  providerComparisons: ProviderComparison[];
}

export function InteractiveTimeline({ timelineMilestones, providerComparisons }: InteractiveTimelineProps) {
  const [expandedMilestones, setExpandedMilestones] = useState<Set<number>>(new Set());
  const [selectedProvider, setSelectedProvider] = useState<'all' | 'agency' | 'consultant' | 'freelancer'>('all');

  const toggleMilestone = (day: number) => {
    const newExpanded = new Set(expandedMilestones);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedMilestones(newExpanded);
  };

  const filteredMilestones = timelineMilestones.filter(
    milestone => selectedProvider === 'all' || milestone.provider === 'all' || milestone.provider === selectedProvider
  );

  return (
    <div className="space-y-12">
      {/* Provider Comparison */}
      <section id="provider-comparison" className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Provider Comparison: Timeline Expectations</h2>
        
        <p className="text-lg text-gray-700 mb-8">
          Different provider types deliver results at different paces. Here's what to expect from agencies, consultants, and freelancers in terms of timeline and deliverable quality.
        </p>

        <div className="space-y-6">
          {providerComparisons.map((provider, index) => (
            <ProviderComparisonCard key={index} provider={provider} />
          ))}
        </div>
      </section>

      {/* Detailed Timeline */}
      <section id="detailed-timeline" className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed 90-Day Timeline</h2>
        
        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-4">
            Filter timeline by provider type to see specific expectations:
          </p>
          
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Providers', color: 'bg-gray-100 text-gray-800' },
              { value: 'agency', label: 'Agencies', color: 'bg-blue-100 text-blue-800' },
              { value: 'consultant', label: 'Consultants', color: 'bg-brand-100 text-brand-800' },
              { value: 'freelancer', label: 'Freelancers', color: 'bg-brand-100 text-brand-800' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedProvider(option.value as any)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedProvider === option.value
                    ? 'bg-indigo-600 text-white'
                    : `${option.color} hover:bg-opacity-75`
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredMilestones.map((milestone) => (
            <TimelineCard
              key={milestone.day}
              milestone={milestone}
              isExpanded={expandedMilestones.has(milestone.day)}
              onToggle={() => toggleMilestone(milestone.day)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}