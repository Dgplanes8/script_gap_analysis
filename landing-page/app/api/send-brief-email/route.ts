import { NextResponse } from 'next/server';

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
    companyName?: string;
    subject?: string;
  };

  try {
    payload = await request.json();
  } catch (parseError) {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const { email, content, companyName, subject } = payload;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
  }

  if (!content || typeof content !== 'string') {
    return NextResponse.json({ error: 'Creative brief content is missing.' }, { status: 400 });
  }

  const displayCompany = companyName?.trim() || 'your company';
  const derivedSubject = subject?.trim() || `Your creative brief for ${displayCompany}`;

  const escapedContent = escapeHtml(content);

  const htmlBody = `
    <table style="width:100%;max-width:640px;margin:0 auto;font-family:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;border-collapse:collapse;">
      <tr>
        <td style="padding:24px;background:#ffffff;border:1px solid #E5E7EB;border-radius:16px;">
          <p style="margin:0 0 16px;color:#111827;font-size:18px;font-weight:600;">Here's your creative brief for ${displayCompany}.</p>
          <p style="margin:0 0 16px;color:#4B5563;font-size:14px;">Generated with APSICS Creative Intelligence frameworks</p>
          <pre style="margin:0;padding:16px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;font-size:13px;line-height:1.6;color:#111827;white-space:pre-wrap;">${escapedContent}</pre>
          <p style="margin:24px 0 0;color:#6B7280;font-size:13px;">Sent with the APSICS Media creative intelligence toolkit.</p>
        </td>
      </tr>
    </table>
  `;

  const textBody = `Here's your creative brief for ${displayCompany}.\n\n${content}`;

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