interface SendEmailParams {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

interface SendEmailResult {
  success: boolean;
  error?: string;
  status?: number;
}

function parseRecipients(raw: string | undefined): string[] {
  if (!raw) {
    return [];
  }

  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function sendInternalEmail({ subject, text, html, replyTo }: SendEmailParams): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'Brian at APSICS Media <brian@apsicsmedia.com>';
  const alertRecipients = parseRecipients(process.env.LEAD_ALERT_EMAIL || process.env.NOTIFICATION_EMAIL);

  if (!apiKey) {
    return { success: false, error: 'RESEND_API_KEY is not configured.' };
  }

  if (alertRecipients.length === 0) {
    return { success: false, error: 'LEAD_ALERT_EMAIL is not configured.' };
  }

  const payload: Record<string, unknown> = {
    from: fromAddress,
    to: alertRecipients,
    subject,
    text,
  };

  if (html) {
    payload.html = html;
  }

  if (replyTo) {
    payload.reply_to = replyTo;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: errorText || 'Resend API returned an error.',
        status: response.status,
      };
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error sending email via Resend.';
    return { success: false, error: message };
  }
}
