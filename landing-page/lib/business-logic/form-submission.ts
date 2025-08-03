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
    const payload = {
      ...formData,
      ...additionalData,
      submissionDate: new Date().toISOString(),
    };

    console.log('Submitting to Airtable:', payload);

    const response = await fetch('/api/airtable-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Airtable API response status:', response.status);

    if (response.ok) {
      const responseData = await response.json();
      console.log('Airtable submission successful:', responseData);
      return {
        success: true,
        message: 'Form submitted successfully! We\'ll be in touch within 24 hours.'
      };
    } else {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Airtable submission failed:', response.status, errorData);
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
        error: `HTTP ${response.status}: ${errorData.error || 'Unknown error'}`
      };
    }
  } catch (error) {
    console.error('Form submission error:', error);
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