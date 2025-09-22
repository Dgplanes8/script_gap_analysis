# AI Tool Template System

This template system allows you to quickly create new AI tool pages with consistent design and configurable content sections like Founders Club, process sections, and more.

## Quick Start

### 1. Add Configuration

Add your new tool configuration to `lib/template-configs.ts`:

```typescript
export const toolConfigs: Record<string, ToolPageConfig> = {
  'your-new-tool': {
    template: {
      header: {
        title: 'Your Tool Title',
        subtitle: 'Description of what your tool does',
        badgeText: 'Your Badge Text',
      },
      sections: {
        showFoundersClub: true,
        showProcessSection: true,
        showPricingSection: true,
      },
      exitIntent: {
        title: 'Exit Intent Title',
        subtitle: 'Exit intent subtitle',
      },
    },
    form: {
      title: 'Form section title',
      description: 'Form description',
      submitButtonText: 'Generate Content',
      highlights: [
        {
          title: 'Feature 1',
          description: 'Description of feature 1',
          variant: 'primary',
        },
        {
          title: 'Feature 2',
          description: 'Description of feature 2',
          variant: 'success',
        },
      ],
      freePlan: {
        title: 'Free plan title',
        features: [
          'Feature 1',
          'Feature 2',
          'Feature 3',
        ],
        note: 'Optional note about premium features',
      },
    },
    fields: [
      {
        key: 'companyName',
        label: 'Company Name',
        type: 'text',
        placeholder: 'e.g. Your Company',
        required: true,
      },
      // Add more fields as needed
    ],
    foundersClub: {
      badge: 'Special Offer',
      title: 'Your founders club title',
      description: 'Description of the offer',
      ctaText: 'Call to Action',
      ctaHref: '/#pricing',
      footerText: 'Additional info',
    },
    process: {
      title: 'How it works',
      description: 'Process description',
      highlights: [
        {
          title: 'Step 1',
          description: 'Step 1 description',
        },
        // Add more steps
      ],
      showAccordion: true, // Set to false to hide accordion
    },
    secondaryHeader: {
      links: [
        { label: 'Overview', href: '#overview' },
        { label: 'Process', href: '#process' },
        { label: 'Pricing', href: '#pricing' },
      ],
      ctaHref: '#pricing',
      ctaLabel: 'Get Started',
    },
  },
};
```

### 2. Create Page Component

Create a new page at `app/your-new-tool/page.tsx`:

```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { AIToolTemplate } from '@/components/templates/ai-tool-template';
import { AIFormTemplate } from '@/components/templates/ai-form-template';
import { FoundersClubSection } from '@/components/templates/founders-club-section';
import { ProcessSection } from '@/components/templates/process-section';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import { getToolConfig } from '@/lib/template-configs';

export default function YourNewToolPage() {
  const config = getToolConfig('your-new-tool');

  if (!config) {
    return <div>Configuration not found</div>;
  }

  const handleSubmit = async (formData: Record<string, any>) => {
    // Implement your tool's logic here
    console.log('Form data:', formData);

    // Make API call, process data, etc.
    // Return result or handle in component state
  };

  return (
    <AIToolTemplate
      config={config.template}
      secondaryHeaderProps={config.secondaryHeader}
      foundersClubContent={<FoundersClubSection config={config.foundersClub} />}
      processContent={<ProcessSection config={config.process} />}
      pricingContent={<SimplePricingSection />}
    >
      <AIFormTemplate
        config={config.form}
        fields={config.fields}
        onSubmit={handleSubmit}
      />
    </AIToolTemplate>
  );
}
```

## Components

### AIToolTemplate
Main wrapper component that provides the overall page structure, header, and configurable sections.

**Props:**
- `config`: Main template configuration
- `secondaryHeaderProps`: Navigation header configuration
- `children`: Main content area (usually the form)
- `foundersClubContent`: Optional founders club section
- `processContent`: Optional process/how-it-works section
- `pricingContent`: Optional pricing section

### AIFormTemplate
Reusable form component with built-in validation, error handling, and result display.

**Props:**
- `config`: Form configuration (title, description, etc.)
- `fields`: Array of form field definitions
- `onSubmit`: Function to handle form submission
- `submitting`: Loading state
- `error`: Error message to display
- `result`: Generated result text
- `resultComponent`: Custom result component
- `userSection`: Custom user authentication section

### FoundersClubSection
Configurable founders club/special offer section.

### ProcessSection
Configurable process/how-it-works section with highlights and optional accordion.

## Field Types

Supported form field types:
- `text`: Single line text input
- `textarea`: Multi-line text input
- `select`: Dropdown selection
- `email`: Email input with validation
- `url`: URL input with validation

## Customization

### Styling
All components use Tailwind CSS classes and follow the existing design system. Colors and spacing are consistent with the brand palette.

### Adding New Field Types
To add new field types, extend the `FormField` type in `components/templates/ai-form-template.tsx` and add rendering logic in the `renderField` function.

### Custom Result Components
Pass a custom `resultComponent` to `AIFormTemplate` for specialized result display (like the email sending functionality in the ad script generator).

## Examples

See these examples:
- `app/ai-ad-script-generator/templated-page.tsx` - Full implementation with custom result handling
- `app/ai-email-generator/page.tsx` - Simple implementation using just the form template

## Benefits

1. **Consistency**: All tools follow the same design patterns
2. **Speed**: New tools can be created in minutes, not hours
3. **Maintainability**: Changes to common sections (like Founders Club) update everywhere
4. **Flexibility**: Each tool can be customized while maintaining the overall structure
5. **Reusability**: Components can be mixed and matched as needed

## Migration

To migrate existing tool pages to use this system:
1. Extract the configuration into `template-configs.ts`
2. Replace the existing page component with the template system
3. Move any custom logic into the `handleSubmit` function
4. Test that all functionality works as expected