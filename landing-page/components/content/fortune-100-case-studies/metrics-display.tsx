'use client';

import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';

interface MetricsDisplayProps {
  showDownloadForm: boolean;
  setShowDownloadForm: (show: boolean) => void;
  showConsultationForm: boolean;
  setShowConsultationForm: (show: boolean) => void;
  downloadType: string;
}

export function MetricsDisplay({
  showDownloadForm,
  setShowDownloadForm,
  showConsultationForm,
  setShowConsultationForm,
  downloadType
}: MetricsDisplayProps) {
  return (
    <>
      {/* Download Form Modal */}
      {showDownloadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Download Case Studies
                </h2>
                <button
                  onClick={() => setShowDownloadForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <EmailCaptureForm
                placeholder="Enter your work email"
                buttonText="Download Case Studies"
                variant="cta"
                showFirstName={true}
                source={`fortune100-case-studies-${downloadType}`}
                onSubmit={async () => setShowDownloadForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Strategic Methodology Consultation
                </h2>
                <button
                  onClick={() => setShowConsultationForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <StrategicConsultationForm onClose={() => setShowConsultationForm(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}