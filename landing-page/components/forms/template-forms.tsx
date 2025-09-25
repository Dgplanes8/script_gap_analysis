'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, Download, Play, Calculator, BookOpen, FileText, Mail, Star } from 'lucide-react';

/**
 * Specialized Form Integration Components for Apsics Media Templates
 * 
 * These components provide consistent form handling across all template types
 * while maintaining specific styling and conversion optimization for each use case.
 */

interface BaseFormData {
  email: string;
  name: string;
  company: string;
  monthlyBudget: string;
  goals: string;
}

interface TemplateFormProps {
  source: string;
  tier?: string;
  onSuccess?: () => void;
  className?: string;
}

/**
 * Blog Post Lead Capture Form
 * Optimized for content consumption and educational downloads
 */
export function BlogPostLeadCaptureForm({ 
  source = 'blog_lead_capture',
  className = ''
}: TemplateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BaseFormData>({
    email: '', name: '', company: '', monthlyBudget: '', goals: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/airtable-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source,
          type: 'blog_lead_capture',
          contentType: 'educational_download'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        window.location.href = '/free-hooks';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      window.location.href = '/free-hooks';
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`text-center p-6 bg-brand-50 rounded-lg border-2 border-brand-200 ${className}`}>
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Download className="h-8 w-8 text-brand-600" />
        </div>
        <h3 className="text-lg font-semibold text-brand-800 mb-2">
          Your Templates Are On The Way!
        </h3>
        <p className="text-brand-700">
          Check your email for instant access to your FREE templates and weekly strategic insights.
        </p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className={`text-center ${className}`}>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-600 text-white font-semibold rounded-lg hover:from-brand-700 hover:to-brand-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <FileText className="h-5 w-5 mr-2" />
          Get FREE Templates
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Instant access • Used by 100+ growing businesses
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg border-2 border-brand-200 ${className}`}>
      <div className="text-center mb-4">
        <div className="inline-flex items-center bg-gradient-to-r from-brand-600 to-brand-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Download className="h-3 w-3 mr-1" />
          FREE TEMPLATES
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Get Your Templates Now</h3>
        <p className="text-sm text-gray-600">Join 100+ growing businesses getting strategic guidance</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Work email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formData.monthlyBudget}
            onChange={(e) => setFormData({...formData, monthlyBudget: e.target.value})}
            required
          >
            <option value="">Marketing Budget</option>
            <option value="$100-$500">$100-$500</option>
            <option value="$500-$1k">$500-$1K</option>
            <option value="$1k-$2.5k">$1K-$2.5K</option>
            <option value="$2.5k-$5k">$2.5K-$5K</option>
            <option value="$5k+">$5K+</option>
          </select>
        </div>
        <textarea
          placeholder="What content topics interest you most? (e.g., ad creative, growth strategy, conversion optimization)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
          rows={2}
          value={formData.goals}
          onChange={(e) => setFormData({...formData, goals: e.target.value})}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-brand-600 to-brand-600 hover:from-brand-700 hover:to-brand-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Your Templates...
            </>
          ) : (
            <>
              Get FREE Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-sm text-gray-600 hover:text-gray-800 underline block mx-auto"
        >
          Back
        </button>
      </form>
    </div>
  );
}

/**
 * Calculator Results Form
 * Optimized for capturing leads after showing personalized results
 */
export function CalculatorResultsForm({ 
  source = 'calculator_results',
  className = ''
}: TemplateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          type: 'calculator_results'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`text-center p-6 bg-brand-50 rounded-lg border-2 border-brand-200 ${className}`}>
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-brand-600" />
        </div>
        <h3 className="text-lg font-semibold text-brand-800 mb-2">
          Detailed Analysis Coming Your Way!
        </h3>
        <p className="text-brand-700">
          Check your email for your personalized analysis and strategic recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg border-2 border-brand-300 ${className}`}>
      <div className="text-center mb-4">
        <Calculator className="h-8 w-8 text-brand-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-900">Get Detailed Analysis</h3>
        <p className="text-sm text-gray-600">
          Enter your email for personalized recommendations and next steps
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your work email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-brand-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Analysis...
            </>
          ) : (
            <>
              Get My Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

/**
 * Playbook Download Form
 * Optimized for educational content and strategic guides
 */
export function PlaybookDownloadForm({ 
  source = 'playbook_download',
  className = ''
}: TemplateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BaseFormData>({
    email: '', name: '', company: '', monthlyBudget: '', goals: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/airtable-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source,
          type: 'playbook_download',
          contentType: 'strategic_guide'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        window.location.href = '/free-hooks';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      window.location.href = '/free-hooks';
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`text-center p-6 bg-brand-50 rounded-lg border-2 border-brand-200 ${className}`}>
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="h-8 w-8 text-brand-600" />
        </div>
        <h3 className="text-lg font-semibold text-brand-800 mb-2">
          Your Complete Playbook Is Ready!
        </h3>
        <p className="text-brand-700">
          Check your email for full access to the playbook and weekly strategic insights.
        </p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className={`text-center ${className}`}>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-600 text-white font-semibold rounded-lg hover:from-brand-700 hover:to-brand-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <BookOpen className="h-5 w-5 mr-2" />
          Get Complete Playbook
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Free instant access • Comprehensive implementation guide
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg border-2 border-brand-200 ${className}`}>
      <div className="text-center mb-4">
        <div className="inline-flex items-center bg-gradient-to-r from-brand-600 to-brand-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <BookOpen className="h-3 w-3 mr-1" />
          FREE PLAYBOOK
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Download Complete Playbook</h3>
        <p className="text-sm text-gray-600">Step-by-step implementation guide for startup teams</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Work email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formData.monthlyBudget}
            onChange={(e) => setFormData({...formData, monthlyBudget: e.target.value})}
            required
          >
            <option value="">Team Size</option>
            <option value="Solo Founder">Solo Founder</option>
            <option value="2-5 employees">2-5 employees</option>
            <option value="6-15 employees">6-15 employees</option>
            <option value="15+ employees">15+ employees</option>
          </select>
        </div>
        <textarea
          placeholder="What's your biggest marketing challenge right now?"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
          rows={2}
          value={formData.goals}
          onChange={(e) => setFormData({...formData, goals: e.target.value})}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-brand-600 to-brand-600 hover:from-brand-700 hover:to-brand-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Preparing Your Playbook...
            </>
          ) : (
            <>
              Get Complete Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-sm text-gray-600 hover:text-gray-800 underline block mx-auto"
        >
          Back
        </button>
      </form>
    </div>
  );
}

/**
 * Service Tier Conversion Form
 * Optimized for service sign-ups and free week trials
 */
export function ServiceTierForm({ 
  source = 'service_tier',
  tier = 'trend_tracker',
  className = ''
}: TemplateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BaseFormData>({
    email: '', name: '', company: '', monthlyBudget: '', goals: ''
  });

  const tierInfo = {
    creative_starter: { name: 'Creative Starter', price: '$5/week', icon: Star },
    trend_tracker: { name: 'Trend Tracker', price: '$15/week', icon: Star },
    competitive_edge: { name: 'Competitive Edge', price: '$35/week', icon: Star },
    market_intelligence: { name: 'Market Intelligence', price: '$99/week', icon: Star }
  };

  const currentTier = tierInfo[tier as keyof typeof tierInfo] || tierInfo.trend_tracker;
  const TierIcon = currentTier.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/airtable-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source,
          type: 'free_week_trial',
          tier,
          selectedPlan: currentTier.name
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        window.location.href = '/success?source=' + source;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      window.location.href = '/success?source=' + source;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`text-center p-6 bg-brand-50 rounded-lg border-2 border-brand-200 ${className}`}>
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="h-8 w-8 text-brand-600" />
        </div>
        <h3 className="text-lg font-semibold text-brand-800 mb-2">
          Your Credits Are Active!
        </h3>
        <p className="text-brand-700 mb-2">
          <strong>{currentTier.name}</strong> plan activated successfully.
        </p>
        <p className="text-brand-600 text-sm">
          Check your email for your welcome guide and first set of templates.
        </p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className={`text-center ${className}`}>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-brand-600 to-brand-600 text-white font-bold rounded-lg hover:from-brand-700 hover:to-brand-700 transition-colors shadow-lg hover:shadow-xl text-lg"
        >
          <Play className="h-5 w-5 mr-2" />
          Claim Your Free Credits
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
        <p className="text-sm text-gray-600 mt-2">
          {currentTier.name} • 10 credits reload monthly • Upgrade anytime
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg border-2 border-brand-200 ${className}`}>
      <div className="text-center mb-4">
        <div className="inline-flex items-center bg-gradient-to-r from-brand-600 to-brand-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <TierIcon className="h-3 w-3 mr-1" />
          FREE CREDITS
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{currentTier.name}</h3>
        <p className="text-sm text-gray-600">Claim your free credits • {currentTier.price} when you upgrade</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-brand-500 text-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Work email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-brand-500 text-sm"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-brand-500 text-sm"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-brand-500 text-sm"
            value={formData.monthlyBudget}
            onChange={(e) => setFormData({...formData, monthlyBudget: e.target.value})}
            required
          >
            <option value="">Monthly Ad Spend</option>
            <option value="$100-$500">$100-$500</option>
            <option value="$500-$1k">$500-$1K</option>
            <option value="$1k-$2.5k">$1K-$2.5K</option>
            <option value="$2.5k-$5k">$2.5K-$5K</option>
            <option value="$5k-$10k">$5K-$10K</option>
            <option value="$10k+">$10K+</option>
          </select>
        </div>
        <textarea
          placeholder="What are your main marketing goals? (e.g., increase app downloads, grow subscriptions, improve conversion rates)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-brand-500 text-sm"
          rows={3}
          value={formData.goals}
          onChange={(e) => setFormData({...formData, goals: e.target.value})}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-brand-600 to-brand-600 hover:from-brand-700 hover:to-brand-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Unlocking Your Credits...
            </>
          ) : (
            <>
              Claim Free Credits
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 text-center">No payment required • Credits refresh monthly • Upgrade whenever you need more</p>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-sm text-gray-600 hover:text-gray-800 underline block mx-auto"
        >
          Back
        </button>
      </form>
    </div>
  );
}
