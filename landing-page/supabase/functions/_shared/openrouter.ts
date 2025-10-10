export function normalizeOpenRouterContent(content: unknown): string {
  if (!content) {
    return '';
  }

  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (!item) {
          return '';
        }

        if (typeof item === 'string') {
          return item;
        }

        if (typeof item === 'object' && 'text' in item) {
          const text = (item as { text?: unknown }).text;
          return typeof text === 'string' ? text : '';
        }

        return '';
      })
      .filter((segment) => segment.length > 0)
      .join('\n');
  }

  if (typeof content === 'object' && 'text' in (content as Record<string, unknown>)) {
    const text = (content as { text?: unknown }).text;
    return typeof text === 'string' ? text : '';
  }

  return '';
}

export function stripMarkdownFence(value: string): string {
  if (!value) {
    return '';
  }

  let trimmed = value.trim();
  if (!trimmed.startsWith('```')) {
    return trimmed;
  }

  trimmed = trimmed.replace(/^```(?:json)?\s*/i, '');
  trimmed = trimmed.replace(/```\s*$/, '');
  return trimmed.trim();
}

export function parseJsonWithRecovery<T = unknown>(raw: string): T {
  const trimmed = raw.trim();
  const attempts = new Set<string>();

  if (trimmed.length > 0) {
    attempts.add(trimmed);
  }

  const withoutSmartQuotes = replaceSmartQuotes(trimmed);
  if (withoutSmartQuotes !== trimmed) {
    attempts.add(withoutSmartQuotes);
  }

  const withoutTrailingCommas = stripTrailingCommas(trimmed);
  if (withoutTrailingCommas !== trimmed) {
    attempts.add(withoutTrailingCommas);
  }

  const combined = stripTrailingCommas(withoutSmartQuotes);
  if (combined !== trimmed && combined !== withoutSmartQuotes && combined !== withoutTrailingCommas) {
    attempts.add(combined);
  }

  for (const candidate of attempts) {
    try {
      return JSON.parse(candidate) as T;
    } catch (_error) {
      // try next candidate
    }
  }

  return JSON.parse(trimmed) as T;
}

function replaceSmartQuotes(value: string): string {
  return value
    .replace(/[\u201C\u201D]/g, '\"')
    .replace(/[\u2018\u2019]/g, "'");
}

function stripTrailingCommas(value: string): string {
  return value.replace(/,\s*(?=[}\]])/g, '');
}

export function sliceBalanced(text: string, startIndex: number, openChar: string, closeChar: string): string | null {
  let depth = 0;
  let inString = false;
  let escape = false;
  let start = -1;

  for (let i = startIndex; i < text.length; i++) {
    const char = text[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (char === '\\') {
      escape = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (char === openChar) {
      depth += 1;
      if (depth === 1) {
        start = i;
      }
      continue;
    }

    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
      continue;
    }
  }

  return null;
}
