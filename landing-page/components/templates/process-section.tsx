import { ProcessAccordion } from '@/components/alytics/process-accordion';

export interface ProcessConfig {
  title: string;
  description: string;
  highlights: Array<{
    title: string;
    description: string;
    variant?: 'primary' | 'success' | 'gradient';
  }>;
  showAccordion?: boolean;
}

interface ProcessSectionProps {
  config: ProcessConfig;
}

export function ProcessSection({ config }: ProcessSectionProps) {
  const getHighlightClasses = (variant: string = 'primary') => {
    switch (variant) {
      case 'success':
        return 'rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-4';
      case 'gradient':
        return 'rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-4';
      default:
        return 'rounded-2xl border border-brand-100 bg-brand-50/60 p-4';
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-900">{config.title}</h2>
      <p className="mt-4 text-base text-gray-600">
        {config.description}
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {config.highlights.map((highlight, index) => (
          <li key={index} className={getHighlightClasses(highlight.variant)}>
            <p className="text-sm font-semibold text-brand-800">{highlight.title}</p>
            <p className="mt-1 text-sm text-brand-700">{highlight.description}</p>
          </li>
        ))}
      </ul>
      {config.showAccordion && (
        <div className="mt-8">
          <ProcessAccordion />
        </div>
      )}
    </>
  );
}