# UI Component Guide - Apsics Media Landing Page

This guide documents all reusable UI components, their usage patterns, props, and styling guidelines for the Strategic Ad Intelligence System landing page.

## Table of Contents

- [Form Components](#form-components)
- [Layout Components](#layout-components)
- [Modal Components](#modal-components)
- [Calculator Components](#calculator-components)
- [UI Components](#ui-components)
- [Styling Guidelines](#styling-guidelines)

---

## Form Components

### SimpleAirtableForm

**Location**: `components/forms/simple-airtable-form.tsx`

**Purpose**: Standardized 4-field form for lead capture with Airtable integration

**Props**:
```typescript
interface SimpleAirtableFormProps {
  buttonText?: string;           // Default: "Claim My Free Credits"
  buttonClassName?: string;      // Default: "btn btn-primary text-lg px-8 py-4"
  source?: string;               // Default: "service-tiers"
  tier?: string;                 // Pre-populate package interest
  onSuccess?: () => void;        // Success callback
  onError?: () => void;          // Error callback
}
```

**Usage**:
```tsx
<SimpleAirtableForm
  buttonText="Claim Free Credits"
  source="service-tiers-modal"
  tier="Essentials"
  onSuccess={() => window.location.href = '/success?source=order'}
/>
```

**Key Features**:
- ✅ 4-field structure: Name, Email, Company, Package Interest
- ✅ Immediate form display (no intermediate button)
- ✅ Pre-population support for tier selection
- ✅ Error handling and validation
- ✅ Responsive design with grid layout

### EmailCaptureForm

**Location**: `components/forms/email-capture-form.tsx`

**Purpose**: Simple email capture for lead magnets and newsletters

**Props**:
```typescript
interface EmailCaptureFormProps {
  placeholder?: string;         // Email input placeholder
  buttonText?: string;          // Submit button text
  variant?: 'hero' | 'sidebar'; // Styling variant
}
```

**Usage**:
```tsx
<EmailCaptureForm
  placeholder="Enter your work email"
  buttonText="Download MY Templates Now"
  variant="hero"
/>
```

---

## Layout Components

### ServiceTiers

**Location**: `components/layout/service-tiers.tsx`

**Purpose**: Display service tier pricing cards with modal integration

**Key Features**:
- ✅ 5 tier structure with responsive grid layout
- ✅ Modal integration for SimpleAirtableForm
- ✅ Tier name passing for form pre-population
- ✅ Enterprise tier consultation booking
- ✅ Visual hierarchy with "Most Popular" badges

**Usage**:
```tsx
<ServiceTiers />
```

**Tier Structure**:
1. **Explore** – $0 / 10 credits monthly
2. **Essentials** – $19 / 150 credits monthly (Most Popular)
3. **Studio** – $29/mo for six months (800 credits + expert concept) → $49 standard
4. **Concierge** – $249 / 2,000 credits monthly

### Header

**Location**: `components/layout/header.tsx`

**Purpose**: Site navigation with responsive menu and CTA buttons

**Key Features**:
- ✅ Responsive mobile menu
- ✅ Smooth scroll navigation
- ✅ Consultation modal integration
- ✅ Service tier scroll targeting

**Navigation Items**:
- About
- Blog & Guides
- Free Templates
- Services (dropdown)
- Claim Free Credits (CTA)
- Download Templates (Secondary CTA)

### Footer

**Location**: `components/layout/footer.tsx`

**Purpose**: Site footer with links and company information

**Status**: ⚠️ Needs update for startup ICP alignment

---

## Modal Components

### ConsultationModal

**Location**: `components/modals/consultation-modal.tsx`

**Purpose**: Strategic consultation form wrapper

**Integration**: Uses `StrategicConsultationForm` component internally

**Key Features**:
- ✅ Context-driven modal state management
- ✅ Package pre-selection support
- ✅ Overlay click handling

---

## Calculator Components

### ROICalculator

**Location**: `components/calculators/roi-calculator.tsx`

**Purpose**: Interactive ROI calculation for ad spend optimization

**Features**:
- Multi-step calculator flow
- Real-time calculations
- Results visualization
- Lead capture integration

### CreativeStrategyBenchmarkTool

**Location**: `components/calculators/creative-strategy-benchmark-tool.tsx`

**Purpose**: Benchmark analysis for creative strategy performance

**Features**:
- Industry comparison metrics
- Performance scoring
- Strategic recommendations

---

## UI Components

### ExitIntentPopup

**Location**: `components/ui/exit-intent-popup.tsx`

**Purpose**: Exit-intent lead capture popup

**Props**:
```typescript
interface ExitIntentPopupProps {
  title: string;
  subtitle: string;
}
```

**Usage**:
```tsx
<ExitIntentPopup 
  title="Wait! Get Your Free Templates Before You Go"
  subtitle="Join startup founders getting winning ad templates every Monday"
/>
```

### ConsultationBookingCTA

**Location**: `components/ui/consultation-booking-cta.tsx`

**Purpose**: Call-to-action button for consultation booking

**Integration**: Connects to consultation context for modal triggering

---

## Styling Guidelines

### Design System

**Colors**:
- **Primary Orange**: `orange-600` (#ea580c)
- **Secondary Red**: `red-600` (#dc2626)
- **Success Green**: `green-600` (#16a34a)
- **Neutral Gray**: `gray-900` (#111827)
- **Background**: `gray-50` (#f9fafb)

**Typography**:
- **Headings**: Inter font, font-bold
- **Body**: Inter font, font-medium/font-normal
- **CTAs**: font-semibold or font-bold

**Spacing**:
- **Container**: `container mx-auto px-4`
- **Sections**: `py-16` or `py-24`
- **Cards**: `p-6` or `p-8`
- **Gaps**: `gap-4`, `gap-6`, `gap-8`

### Component Patterns

**Card Structure**:
```tsx
<div className="bg-white rounded-xl shadow-lg border p-6">
  {/* Card content */}
</div>
```

**Button Variants**:
```tsx
// Primary CTA
className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg"

// Secondary CTA  
className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-6 py-3 rounded-lg"

// Success CTA
className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg"
```

**Form Input Style**:
```tsx
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
```

### Responsive Breakpoints

- **Mobile**: Default (up to 640px)
- **Tablet**: `md:` (768px+)  
- **Desktop**: `lg:` (1024px+)
- **Large**: `xl:` (1280px+)

### Grid Patterns

**Service Tiers**: `grid lg:grid-cols-2 xl:grid-cols-5 gap-8`
**Features**: `grid md:grid-cols-3 gap-6`
**Form Fields**: `grid grid-cols-2 gap-3`

---

## Component Testing

### Key Testing Areas

1. **Form Validation**: All form fields validate correctly
2. **Modal Interactions**: Modals open/close properly
3. **Responsive Design**: Components work across all breakpoints
4. **Accessibility**: Components meet WCAG guidelines
5. **Performance**: Components load efficiently

### Playwright MCP Testing

Use Playwright MCP for automated UI testing:

```bash
# Test form submission
mcp__playwright__browser_fill_form [form_data]

# Test modal interactions  
mcp__playwright__browser_click [modal_trigger]

# Test responsive behavior
mcp__playwright__browser_resize [width] [height]
```

---

## Best Practices

### Component Development

1. **TypeScript First**: Always define proper interfaces
2. **Responsive by Default**: Mobile-first design approach
3. **Accessibility**: Include ARIA labels and keyboard navigation
4. **Performance**: Use React.memo for expensive components
5. **Consistency**: Follow established patterns and naming

### Styling Guidelines

1. **Tailwind Classes**: Use utility classes over custom CSS
2. **Semantic Naming**: Clear component and prop names
3. **Consistent Spacing**: Use design system spacing scale
4. **Color Harmony**: Stick to defined color palette
5. **Typography**: Maintain consistent text hierarchy

### Form Guidelines

1. **4-Field Standard**: Name, Email, Company, Package Interest
2. **Immediate Display**: No intermediate steps or extra buttons
3. **Validation**: Client-side and server-side validation
4. **Error Handling**: Clear error messages and recovery
5. **Success Flow**: Smooth transition to success states

---

*Last Updated: 2025-01-27*
*Next Review: When new components are added or existing ones are modified*
