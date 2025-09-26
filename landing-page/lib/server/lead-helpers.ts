import { NextRequest } from 'next/server';
import type { LeadType } from './supabase-admin';

export const RESERVED_LEAD_KEYS = new Set([
  'email',
  'name',
  'company',
  'website',
  'packageInterest',
  'package_interest',
  'type',
  'leadType',
  'source',
  'metadata',
]);

export function normaliseLeadType(rawType: string | undefined): LeadType {
  if (!rawType) {
    return 'marketing';
  }

  const value = rawType.toLowerCase();

  if (['free_trial', 'free_week_trial', 'free_week', 'trial'].includes(value)) {
    return 'free_trial';
  }

  if (['paid_package', 'package', 'subscription', 'checkout'].includes(value)) {
    return 'paid_package';
  }

  if (['assessment', 'strategy_assessment', 'consultation_booking', 'strategic_consultation'].includes(value)) {
    return 'assessment';
  }

  if (['content_download', 'playbook_download', 'template_download', 'blog_lead_capture'].includes(value)) {
    return 'content_download';
  }

  return 'marketing';
}

export function buildLeadMetadata(
  payload: Record<string, unknown>,
  request: NextRequest,
  source: string | undefined
) {
  const metadata: Record<string, unknown> = { ...((payload.metadata as Record<string, unknown> | undefined) ?? {}) };

  for (const [key, value] of Object.entries(payload)) {
    if (!RESERVED_LEAD_KEYS.has(key)) {
      metadata[key] = value;
    }
  }

  if (source) {
    metadata.source = source;
  }

  const userAgent = request.headers.get('user-agent');
  if (userAgent) {
    metadata.userAgent = userAgent;
  }

  const referer = request.headers.get('referer');
  if (referer) {
    metadata.referer = referer;
  }

  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (clientIp) {
    metadata.clientIp = clientIp;
  }

  return Object.keys(metadata).length > 0 ? metadata : null;
}
