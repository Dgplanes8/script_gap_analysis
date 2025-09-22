import { NextResponse } from 'next/server';

const PLATFORM_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  x: 'X (Twitter)',
  youtube: 'YouTube',
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  let payload: {
    email?: string;
    content?: string;
    format?: 'video' | 'static' | 'iteration';
    companyName?: string;
    platform?: string;
    subject?: string;
  };

  try {
    payload = await request.json();
  } catch (parseError) {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const { email, content, format = 'static', companyName, platform, subject } = payload;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
  }

  if (!content || typeof content !== 'string') {
    return NextResponse.json({ error: 'Generated output is missing.' }, { status: 400 });
  }

  if (!['video', 'static', 'iteration'].includes(format)) {
    return NextResponse.json({ error: 'Ad format must be provided.' }, { status: 400 });
  }

  const displayCompany = companyName?.trim() || 'your campaign';
  const platformLabel = platform ? PLATFORM_LABELS[platform] ?? platform : 'All Platforms';
  const derivedSubject =
    subject?.trim() ||
    (format === 'iteration'
      ? `Your creative intelligence report for ${displayCompany}`
      : `Your ${format === 'video' ? 'video ad script' : 'static ad copy'} for ${displayCompany}`);

  const escapedContent = escapeHtml(content);

  const htmlBody = `
    <table style="width:100%;max-width:640px;margin:0 auto;font-family:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;border-collapse:collapse;">
      <tr>
        <td style="padding:24px;background:#ffffff;border:1px solid #E5E7EB;border-radius:16px;">
          <p style="margin:0 0 16px;color:#111827;font-size:18px;font-weight:600;">Here's your ${format === 'iteration' ? 'creative intelligence report' : format === 'video' ? 'video ad script' : 'static ad copy'} for ${displayCompany}.</p>
          <p style="margin:0 0 16px;color:#4B5563;font-size:14px;">Channel focus: ${platformLabel}</p>
          <pre style="margin:0;padding:16px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;font-size:13px;line-height:1.6;color:#111827;white-space:pre-wrap;">${escapedContent}</pre>
          <p style="margin:24px 0 0;color:#6B7280;font-size:13px;">Sent with the APSICS Media creative intelligence toolkit.</p>
        </td>
      </tr>
    </table>
  `;

  const textDescriptor =
    format === 'iteration' ? 'creative intelligence report' : format === 'video' ? 'video ad script' : 'static ad copy';
  const textBody = `Here's your ${textDescriptor} for ${displayCompany} (channel: ${platformLabel}).\n\n${content}`;

  const emailPayload = {
    from: 'Brian at APSICS Media <brian@apsicsmedia.com>',
    to: [email],
    subject: derivedSubject,
    html: htmlBody,
    text: textBody,
  };

 const response = await fetch('https://api.resend.com/emails', {
   method: 'POST',
   headers: {
     Authorization: `Bearer ${resendApiKey}`,
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(emailPayload),
 });

 if (!response.ok) {
   const errorText = await response.text();
    const friendlyMessage = response.status === 401
      ? 'Email service credentials are invalid or expired.'
      : response.status === 403
        ? 'Email service rejected the sender address.'
        : response.status === 429
          ? 'Email service rate limit reached.'
          : 'Email service returned an error.';

    return NextResponse.json({ error: friendlyMessage, details: errorText }, { status: 502 });
 }

 return NextResponse.json({ success: true });
}
