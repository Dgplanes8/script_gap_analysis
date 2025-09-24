'use client';

import { ReactNode, useState, useCallback } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'email' | 'url';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  optional?: boolean;
}

export interface AIFormConfig {
  title: string;
  description: string;
  submitButtonText: string;
  highlights: Array<{
    title: string;
    description: string;
    variant?: 'primary' | 'success';
  }>;
  freePlan: {
    title: string;
    features: string[];
    note?: string;
  };
}

interface AIFormTemplateProps {
  config: AIFormConfig;
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => Promise<unknown>;
  submitting?: boolean;
  error?: string | null;
  result?: string;
  resultComponent?: ReactNode;
  userSection?: ReactNode;
}

export function AIFormTemplate({
  config,
  fields,
  onSubmit,
  submitting = false,
  error,
  result,
  resultComponent,
  userSection,
}: AIFormTemplateProps) {
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {})
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleFieldChange = useCallback((key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => {
      if (!prev[key]) {
        return prev;
      }

      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.key]?.trim()) {
        errors[field.key] = `${field.label} is required.`;
      }

      if (field.type === 'url' && formData[field.key]) {
        try {
          const url = formData[field.key].trim();
          // Accept www., https://, or bare domain
          const normalizedUrl = url.startsWith('http://') || url.startsWith('https://')
            ? url
            : `https://${url}`;

          const parsedUrl = new URL(normalizedUrl);
          if (!parsedUrl.host) {
            throw new Error('Invalid host');
          }
        } catch {
          errors[field.key] = 'Enter a valid website URL (e.g., example.com or https://example.com).';
        }
      }

      if (field.type === 'email' && formData[field.key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.key])) {
        errors[field.key] = 'Enter a valid email address.';
      }
    });

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    await onSubmit(formData);
  };

  const renderField = (field: FormField) => {
    const hasError = Boolean(formErrors[field.key]);
    const fieldClasses = `rounded-lg border px-4 py-3 text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-200 ${
      hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-brand-500'
    }`;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            rows={field.rows || 4}
            name={field.key}
            value={formData[field.key]}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className={fieldClasses}
            placeholder={field.placeholder}
            required={field.required}
            aria-invalid={hasError}
          />
        );

      case 'select':
        return (
          <select
            name={field.key}
            value={formData[field.key]}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className={`${fieldClasses} bg-white`}
            required={field.required}
            aria-invalid={hasError}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type={field.type}
            name={field.key}
            value={formData[field.key]}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className={fieldClasses}
            placeholder={field.placeholder}
            required={field.required}
            aria-invalid={hasError}
          />
        );
    }
  };

  const getHighlightClasses = (variant: string = 'primary') => {
    switch (variant) {
      case 'success':
        return 'rounded-2xl border border-success-200 bg-success-50/70 p-4';
      default:
        return 'rounded-2xl border border-brand-100 bg-brand-50/60 p-4';
    }
  };

  const getHighlightTextClasses = (variant: string = 'primary') => {
    switch (variant) {
      case 'success':
        return { title: 'text-success-700', description: 'text-success-600' };
      default:
        return { title: 'text-brand-800', description: 'text-brand-700' };
    }
  };

  return (
    <section className="rounded-3xl border border-brand-100 bg-white p-8 shadow-xl shadow-brand-50/40">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">{config.title}</h2>
          <p className="text-sm text-gray-600">
            {config.description}
          </p>
          <ul className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
            {config.highlights.map((highlight, index) => {
              const textClasses = getHighlightTextClasses(highlight.variant);
              return (
                <li key={index} className={getHighlightClasses(highlight.variant)}>
                  <p className={`font-semibold ${textClasses.title}`}>{highlight.title}</p>
                  <p className={`mt-1 ${textClasses.description}`}>{highlight.description}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/70 p-5 text-sm text-brand-900">
          <p className="font-semibold uppercase tracking-wide text-brand-700">{config.freePlan.title}</p>
          <ul className="mt-3 space-y-2">
            {config.freePlan.features.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
          {config.freePlan.note && (
            <p className="mt-4 text-xs text-brand-700/80">{config.freePlan.note}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        {userSection}

        <div className="grid gap-6 md:grid-cols-2">
          {fields.slice(0, 2).map((field) => (
            <label key={field.key} className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              <span className="flex items-center justify-between">
                <span>
                  {field.label}
                  {field.optional && <span className="text-xs font-normal text-gray-400"> (optional)</span>}
                </span>
                {formErrors[field.key] && (
                  <span className="text-xs font-semibold text-red-600">{formErrors[field.key]}</span>
                )}
              </span>
              {renderField(field)}
            </label>
          ))}
        </div>

        {fields.slice(2).map((field) => (
          <label key={field.key} className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            <span className="flex items-center justify-between">
              <span>
                {field.label}
                {field.optional && <span className="text-xs font-normal text-gray-400"> (optional)</span>}
              </span>
              {formErrors[field.key] && (
                <span className="text-xs font-semibold text-red-600">{formErrors[field.key]}</span>
              )}
            </span>
            {renderField(field)}
          </label>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing…
            </>
          ) : (
            config.submitButtonText
          )}
        </button>
      </form>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {result && !resultComponent && (
        <div className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Generated Output</h3>
            <button
              onClick={() => {
                if (typeof navigator !== 'undefined') {
                  navigator.clipboard.writeText(result);
                }
              }}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              type="button"
            >
              Copy to clipboard
            </button>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-white p-6 text-sm leading-relaxed text-gray-800 shadow-inner">
            {result}
          </pre>
        </div>
      )}

      {resultComponent}
    </section>
  );
}
