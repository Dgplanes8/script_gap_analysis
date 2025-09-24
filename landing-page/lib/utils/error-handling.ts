/**
 * Shared error handling utilities for APSICS AI Tools
 * Extracts consistent error information from Supabase edge function responses
 */

export interface ExtractedError {
  statusCode?: number;
  message?: string;
}

/**
 * Extracts standardized error information from edge function errors
 * Used across all AI tools for consistent error handling
 */
export async function extractEdgeFunctionError(error: unknown): Promise<ExtractedError> {
  if (!error || typeof error !== 'object') {
    return {};
  }

  const normalizeStatus = (value: unknown) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const parsed = Number.parseInt(value, 10);
      return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
  };

  const maybeError = error as {
    status?: unknown;
    code?: unknown;
    message?: unknown;
    context?: unknown;
  };

  const statusCandidates: Array<unknown> = [maybeError.status, maybeError.code];
  let contextMessage = '';

  const context = maybeError.context as
    | undefined
    | null
    | (Response & {
        error?: unknown;
        status?: unknown;
        statusCode?: unknown;
      })
    | {
        error?: unknown;
        status?: unknown;
        statusCode?: unknown;
        response?: { status?: unknown };
      };

  if (context && typeof context === 'object') {
    statusCandidates.push((context as { status?: unknown }).status);
    statusCandidates.push((context as { statusCode?: unknown }).statusCode);
    statusCandidates.push((context as { response?: { status?: unknown } }).response?.status);

    const rawContextError = (context as { error?: unknown }).error;
    if (typeof rawContextError === 'string') {
      contextMessage = rawContextError;
    } else if (rawContextError && typeof rawContextError === 'object') {
      const nested = rawContextError as { message?: unknown; error?: unknown };
      if (typeof nested.message === 'string') {
        contextMessage = nested.message;
      } else if (typeof nested.error === 'string') {
        contextMessage = nested.error;
      }
    }
  }

  let statusCode: number | undefined;
  for (const candidate of statusCandidates) {
    const normalized = normalizeStatus(candidate);
    if (typeof normalized === 'number') {
      statusCode = normalized;
      break;
    }
  }

  let message: string | undefined = typeof maybeError.message === 'string' ? maybeError.message : undefined;
  if (!message && contextMessage) {
    message = contextMessage;
  }

  if (!message && context && typeof Response !== 'undefined' && context instanceof Response) {
    try {
      const cloned = context.clone();
      const contentType = cloned.headers.get('content-type') ?? '';

      if (contentType.includes('application/json')) {
        const json = await cloned.json();
        if (json) {
          if (typeof (json as { error?: unknown }).error === 'string') {
            message = (json as { error: string }).error;
          } else if (typeof (json as { message?: unknown }).message === 'string') {
            message = (json as { message: string }).message;
          }
        }
      } else {
        const text = await cloned.text();
        if (text) {
          message = text;
        }
      }
    } catch {
      // ignore parsing failures, fall back to existing message
    }
  }

  return { statusCode, message };
}

/**
 * Standard error messages for common status codes
 * Following APSICS brand voice: apologetic, helpful, solution-focused
 */
export const getStandardErrorMessage = (statusCode: number, hasUser: boolean, toolType: 'script' | 'brief' | 'iteration' = 'script'): string => {
  const toolNames = {
    script: 'scripts',
    brief: 'briefs',
    iteration: 'iterations'
  };

  const toolName = toolNames[toolType];

  switch (statusCode) {
    case 400:
      return 'Double-check the company name and website URL, then try again.';
    case 401:
      return `Please sign in again to continue generating ${toolName}.`;
    case 402:
      if (hasUser) {
        return `You're out of credits. Upgrade to unlock more ${toolName} instantly.`;
      } else {
        return `Create a free APSICS Media account to unlock three additional ${toolName}.`;
      }
    case 403:
      return 'We can only analyze content your brand owns.';
    case 502:
      return 'The AI model is busy. Wait a few seconds and try again.';
    case 504:
      return toolType === 'iteration'
        ? 'The analysis timed out. Try again in a minute or use a smaller asset.'
        : 'Request timed out. Please try again in a minute.';
    default:
      return `Something went wrong. Try again or contact brian@apsicsmedia.com.`;
  }
};