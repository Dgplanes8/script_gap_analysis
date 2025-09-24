/**
 * Shared contact information components for APSICS AI Tools
 * Provides consistent contact messaging following brand guidelines
 */

import clsx from 'clsx';

interface ContactInfoProps {
  variant?: 'footer' | 'error' | 'help' | 'inline';
  className?: string;
}

/**
 * Standard contact message component with consistent styling
 * Follows brand voice guidelines: helpful, supportive, accessible
 */
export function ContactInfo({ variant = 'footer', className }: ContactInfoProps) {
  const baseMessage = 'Contact brian@apsicsmedia.com with any questions or feature requests';

  const getVariantStyles = () => {
    switch (variant) {
      case 'footer':
        return 'text-sm text-gray-500';
      case 'error':
        return 'text-sm text-red-600';
      case 'help':
        return 'text-xs text-gray-400';
      case 'inline':
        return 'text-sm text-gray-600';
      default:
        return 'text-sm text-gray-500';
    }
  };

  const getMessage = () => {
    switch (variant) {
      case 'error':
        return `Try again or ${baseMessage.toLowerCase()}`;
      case 'help':
        return baseMessage;
      case 'footer':
      case 'inline':
      default:
        return baseMessage;
    }
  };

  return (
    <p className={clsx(getVariantStyles(), className)}>
      {getMessage()}
    </p>
  );
}

/**
 * Contact link component for interactive contexts
 */
export function ContactLink({ className }: { className?: string }) {
  return (
    <a
      href="mailto:brian@apsicsmedia.com"
      className={clsx(
        'text-sm text-[#126DFB] hover:text-[#0F5AD6] transition-colors duration-200',
        'hover:underline focus:outline-none focus:ring-2 focus:ring-[#126DFB] focus:ring-opacity-50 rounded',
        className
      )}
    >
      brian@apsicsmedia.com
    </a>
  );
}

/**
 * Full contact section for placement in tool footers
 * Uses brand-consistent styling from Brand Consistency Guide
 */
export function ContactSection({ className }: { className?: string }) {
  return (
    <div className={clsx('rounded-2xl border border-gray-200 bg-gray-50 p-4', className)}>
      <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold text-gray-900">Need help?</p>
          <ContactInfo variant="inline" />
        </div>
        <ContactLink />
      </div>
    </div>
  );
}

/**
 * Minimal contact footer for page bottoms
 */
export function ContactFooter({ className }: { className?: string }) {
  return (
    <div className={clsx('border-t border-gray-200 pt-6 text-center', className)}>
      <ContactInfo variant="footer" />
    </div>
  );
}

/**
 * Error state with contact information
 * For use in error boundaries and failed states
 */
export function ErrorWithContact({
  title = "Something went wrong",
  message,
  className
}: {
  title?: string;
  message?: string;
  className?: string;
}) {
  return (
    <div className={clsx('rounded-lg bg-red-50 border border-red-200 p-4', className)}>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-red-800 mb-2">{title}</h3>
        {message && (
          <p className="text-sm text-red-700 mb-3">{message}</p>
        )}
        <ContactInfo variant="error" />
      </div>
    </div>
  );
}