import { type ReactNode } from 'react';
import { Clipboard, Download, Loader2, Mail } from 'lucide-react';

export type DownloadAction = {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
};

export type ResultEmailConfig = {
  heading?: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  statusMessage?: string;
  statusType?: 'success' | 'error' | null;
  buttonLabel?: string;
  placeholder?: string;
};

interface ResultActionsPanelProps {
  title: string;
  children: ReactNode;
  onCopy?: () => void;
  copyDisabled?: boolean;
  copyLabel?: string;
  downloads?: DownloadAction[];
  emailConfig?: ResultEmailConfig | null;
}

export function ResultActionsPanel({
  title,
  children,
  onCopy,
  copyDisabled,
  copyLabel = 'Copy to clipboard',
  downloads = [],
  emailConfig,
}: ResultActionsPanelProps) {
  const hasActions = Boolean(onCopy || downloads.length > 0);

  return (
    <div className="space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {hasActions ? (
          <div className="flex flex-wrap items-center gap-2">
            {onCopy ? (
              <button
                type="button"
                onClick={onCopy}
                disabled={copyDisabled}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Clipboard className="h-4 w-4" />
                {copyLabel}
              </button>
            ) : null}
            {downloads.map(({ id, label, onClick: handleClick, disabled, loading, icon }) => (
              <button
                key={id}
                type="button"
                onClick={handleClick}
                disabled={disabled || loading}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon ?? <Download className="h-4 w-4" />}
                {loading ? 'Preparing…' : label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-3">{children}</div>

      {emailConfig ? (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h4 className="text-sm font-semibold text-gray-900">{emailConfig.heading ?? 'Send this to your inbox'}</h4>
          <p className="mt-1 text-xs text-gray-600">{emailConfig.description}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Email address
              <input
                type="email"
                value={emailConfig.value}
                onChange={(event) => emailConfig.onChange(event.target.value)}
                placeholder={emailConfig.placeholder ?? 'you@company.com'}
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <button
              type="button"
              onClick={emailConfig.onSubmit}
              disabled={emailConfig.submitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {emailConfig.submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  {emailConfig.buttonLabel ?? 'Send email'}
                </>
              )}
            </button>
          </div>
          {emailConfig.statusMessage ? (
            <p
              className={`mt-2 text-xs font-medium ${
                emailConfig.statusType === 'success' ? 'text-success-600' : 'text-red-600'
              }`}
            >
              {emailConfig.statusMessage}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default ResultActionsPanel;
