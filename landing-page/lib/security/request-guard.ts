import { NextResponse } from 'next/server';

const DEFAULT_ORIGINS = [
  'https://apsicsmedia.com',
  'https://www.apsicsmedia.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];

const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .concat(
      process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []
    )
    .concat(DEFAULT_ORIGINS)
);

function normaliseOrigin(origin: string | null): string | null {
  if (!origin) {
    return null;
  }
  try {
    const url = new URL(origin);
    return `${url.protocol}//${url.host}`;
  } catch (_error) {
    return null;
  }
}

export function resolveAllowedOrigin(request: Request): string | null {
  const headers = request.headers;
  const origin = normaliseOrigin(headers.get('origin'));
  if (origin && allowedOrigins.has(origin)) {
    return origin;
  }

  const referer = headers.get('referer');
  if (referer) {
    try {
      const url = new URL(referer);
      const formatted = `${url.protocol}//${url.host}`;
      if (allowedOrigins.has(formatted)) {
        return formatted;
      }
    } catch (_error) {
      // ignore parsing error
    }
  }

  return null;
}

const rateLimitStore = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(identifier: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = rateLimitStore.get(identifier);

  if (!existing || existing.expiresAt <= now) {
    rateLimitStore.set(identifier, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((existing.expiresAt - now) / 1000) };
  }

  existing.count += 1;
  rateLimitStore.set(identifier, existing);
  return { allowed: true, remaining: limit - existing.count, retryAfter: 0 };
}

export function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const [first] = forwardedFor.split(',');
    if (first) {
      return first.trim();
    }
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return request.headers.get('cf-connecting-ip')?.trim() || 'unknown';
}

export function buildCorsHeaders(origin: string | null): Record<string, string> {
  return origin
    ? {
        'Access-Control-Allow-Origin': origin,
        'Vary': 'Origin',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      }
    : {};
}

export function handlePreflight(request: Request) {
  const allowedOrigin = resolveAllowedOrigin(request);
  if (!allowedOrigin) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: buildCorsHeaders(allowedOrigin),
  });
}

export function forbiddenResponse(message: string) {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function rateLimitResponse(retryAfterSeconds: number, origin: string | null) {
  return new NextResponse(
    JSON.stringify({ error: 'Too many requests. Please slow down.' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': retryAfterSeconds.toString(),
        ...buildCorsHeaders(origin),
      },
    }
  );
}

export function withCors<T extends NextResponse>(response: T, origin: string | null): T {
  if (!origin) {
    return response;
  }

  const corsHeaders = buildCorsHeaders(origin);

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
