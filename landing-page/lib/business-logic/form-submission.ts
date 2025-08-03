interface FormSubmissionData {
  [key: string]: any;
  submissionDate?: string;
}

interface SubmissionResponse {
  success: boolean;
  message: string;
  error?: any;
}

export async function submitToAirtable(
  formData: FormSubmissionData,
  additionalData: Partial<FormSubmissionData> = {}
): Promise<SubmissionResponse> {
  try {
    const response = await fetch('/api/airtable-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        ...additionalData,
        submissionDate: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Form submitted successfully! We\'ll be in touch within 24 hours.'
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
        error: `HTTP ${response.status}`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
      error
    };
  }
}

export function trackFormSubmission(
  eventName: string,
  formType: string,
  additionalData: Record<string, any> = {}
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'lead_generation',
      event_label: formType,
      ...additionalData
    });
  }
}