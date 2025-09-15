# APSICS Media Brand Consistency Guide

## Overview

This guide establishes comprehensive brand standards for APSICS Media's digital presence based on the proven Alytics homepage design. All development, design, and content decisions should align with these standards for consistent, professional, and high-converting user experiences.

**Updated**: January 2025 - Based on Alytics Landing Page Implementation

---

## 🎨 Visual Identity System

### Color Palette

#### Primary Brand Colors (Alytics Standard)
```css
/* Primary Brand Blue - Direct Usage */
--brand-blue: #126DFB;           /* Primary CTA buttons, links, icons */
--brand-blue-dark: #0F5AD6;      /* Hover states, active elements */
--brand-blue-light: #3B82F6;     /* Light accents, backgrounds */

/* Neutral Color System */
--gray-50: #F8F8F8;              /* Page backgrounds, cards */
--gray-200: #E5E7EB;             /* Borders, dividers */
--gray-500: #6B7280;             /* Secondary text, captions */
--gray-600: #4B5563;             /* Body text */
--gray-700: #374151;             /* Emphasized text */
--gray-900: #111827;             /* Headlines, primary text */
--white: #FFFFFF;                /* Card backgrounds, buttons */
```

#### Accent Colors
```css
/* Success & Growth */
--success-green: #10B981;        /* Checkmarks, success states */
--success-light: #D1FAE5;        /* Success background tints */

/* Warning & Attention */  
--warning-orange: #F59E0B;        /* Warning states, badges */
--warning-light: #FEF3C7;        /* Warning backgrounds */

/* Special Use Colors */
--yellow-400: #FCD34D;           /* Star ratings, highlights */
--orange-500: #F97316;           /* Popular badges, special CTAs */
--red-500: #EF4444;              /* Gradient accents, urgency */
```

#### Brand Color Usage Standards
```css
/* Utility Classes for Consistent Usage */
.text-brand-blue { color: #126DFB; }
.text-brand-blue-dark { color: #0F5AD6; }
.bg-brand-blue { background-color: #126DFB; }
.bg-brand-blue-dark { background-color: #0F5AD6; }
.border-brand-blue { border-color: #126DFB; }

/* Gradient Applications */
.gradient-brand-blue { background: linear-gradient(to-r, #126DFB, #126DFB); }
.gradient-popular { background: linear-gradient(to-r, #F97316, #EF4444); }
.gradient-hero-bg { background: linear-gradient(to-br, #EFF6FF, #DBEAFE); }
```

### Typography System

#### Font Hierarchy (Alytics Standard)
```css
/* Primary Font Stack - Geist for premium feel */
font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Responsive Heading Scales */
.heading-1 { 
  font-size: clamp(2.5rem, 4vw, 4rem);        /* text-4xl to text-6xl responsive */
  font-weight: 700; 
  line-height: 1.1; 
  letter-spacing: -0.02em;
  color: #111827; /* gray-900 */
}

.heading-2 { 
  font-size: clamp(2rem, 3vw, 3rem);          /* text-3xl to text-4xl responsive */
  font-weight: 700; 
  line-height: 1.2; 
  letter-spacing: -0.015em;
  color: #111827; /* gray-900 */
}

.heading-3 { 
  font-size: clamp(1.5rem, 2.5vw, 2rem);      /* text-2xl responsive */
  font-weight: 600; 
  line-height: 1.3; 
  color: #111827; /* gray-900 */
}

.heading-4 { 
  font-size: clamp(1.25rem, 2vw, 1.5rem);     /* text-xl to text-2xl */
  font-weight: 600; 
  line-height: 1.4; 
  color: #111827; /* gray-900 */
}

/* Body Text Scales */
.body-large { 
  font-size: clamp(1.125rem, 1.5vw, 1.25rem); /* text-lg to text-xl responsive */
  font-weight: 400; 
  line-height: 1.6; 
  color: #4B5563; /* gray-600 */
}

.body-regular { 
  font-size: 1rem;                            /* text-base */
  font-weight: 400; 
  line-height: 1.6; 
  color: #4B5563; /* gray-600 */
}

.body-small { 
  font-size: 0.875rem;                        /* text-sm */
  font-weight: 400; 
  line-height: 1.5; 
  color: #6B7280; /* gray-500 */
}
```

#### Typography Usage Rules (Updated)
- **Hero Headlines**: Use heading-1 with brand color accents via `<span className="text-brand-blue">`
- **Section Headlines**: Use heading-2, maximum 2-3 levels per page
- **Card Titles**: Use heading-3 or heading-4 depending on hierarchy
- **Body Text**: Maintain 1.6 line-height for optimal readability
- **CTAs**: Use semibold (600) weight minimum with text-lg size
- **Captions**: Use body-small for form labels and metadata
- **Color Hierarchy**: Gray-900 for headlines, gray-600 for body, gray-500 for captions

#### Brand Text Color Classes
```css
.text-brand-primary { color: #111827; }      /* Headlines, important text */
.text-brand-secondary { color: #4B5563; }    /* Body text, descriptions */
.text-brand-muted { color: #6B7280; }        /* Captions, metadata */
.text-brand-blue { color: #126DFB; }         /* Brand accents, links */
.text-brand-blue-dark { color: #0F5AD6; }    /* Hover states */
```

### Logo & Brand Mark Standards

#### Logo Variations
1. **Primary Logo**: Full horizontal logo with text
2. **Icon Mark**: Symbol-only version for favicons and small applications
3. **Monogram**: "AM" lettermark for ultra-compact uses
4. **Inverted Versions**: White/light versions for dark backgrounds

#### Logo Usage Rules
- **Minimum Size**: 120px width for full logo, 40px for icon
- **Clear Space**: Minimum 2x logo height on all sides
- **Backgrounds**: Ensure sufficient contrast (4.5:1 minimum)
- **Prohibited**: No stretching, rotating, or color modifications

### Iconography Standards

#### Icon System (Lucide React)
```jsx
// Consistent icon sizing
const iconSizes = {
  xs: "h-3 w-3",    // 12px
  sm: "h-4 w-4",    // 16px  
  md: "h-5 w-5",    // 20px
  lg: "h-6 w-6",    // 24px
  xl: "h-8 w-8",    // 32px
}

// Standard stroke width: 2px
// Icon color: Inherit from parent or --primary-blue
```

#### Icon Categories & Usage
- **Navigation**: Menu, X, ChevronDown, ArrowRight
- **Features**: Target, TrendingUp, Zap, Building2
- **Social Proof**: Star, CheckCircle, Users, Award
- **Communication**: Mail, Phone, MessageSquare
- **Actions**: Download, Upload, Share, Copy

---

## 🏗️ Component Architecture Standards

### Design System Principles (Alytics Based)

#### Layout & Spacing Standards
1. **Section Spacing**: `py-20` (standard sections), `py-16` (condensed)
2. **Container Width**: `max-w-4xl mx-auto` for content areas
3. **Content Padding**: `px-6` for mobile-first responsive design
4. **Internal Spacing**: `space-y-8` (sections), `space-y-6` (content blocks)
5. **Card Styling**: `rounded-2xl p-8 shadow-lg` for elevated content

#### Animation System (Framer Motion Standards)
```jsx
// Standard container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,       // 100ms stagger between children
      delayChildren: 0.1          // 100ms delay before children start
    }
  }
};

// Standard item animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },   // Start 20px below with 0 opacity
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,              // 400ms animation duration
      ease: [0.25, 0.25, 0, 1]    // Custom cubic-bezier easing
    }
  }
};

// Card hover effects
const cardHoverVariants = {
  whileHover: { 
    y: -8,                        // Lift 8px on hover
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
};

// Button hover effects
const buttonHoverVariants = {
  whileHover: { 
    scale: 1.02,                  // Slight scale increase
    boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)"
  },
  whileTap: { scale: 0.98 }       // Slight scale decrease when pressed
};
```

#### Component Hierarchy Standards
1. **Hero Sections**: Full-width with `bg-white`, centered content
2. **Content Sections**: Alternating `bg-white` and `bg-[#F8F8F8]` backgrounds
3. **Cards**: White background with `shadow-lg` and `border border-gray-200`
4. **Buttons**: Primary blue with hover states and shadow effects
5. **Icons**: Consistent sizing with `w-4 h-4`, `w-5 h-5` scale

### Button Standards (Alytics Pattern)

#### Primary CTA Button
```jsx
// Main conversion buttons - trial signups, tier selection
<motion.button
  whileHover={{ 
    scale: 1.02, 
    boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)" 
  }}
  whileTap={{ scale: 0.98 }}
  className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg"
>
  Start Free Week Trial
</motion.button>
```

#### Secondary Button
```jsx
// Alternative actions, less emphasis
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="bg-gray-900 hover:bg-gray-800 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg"
>
  Secondary Action
</motion.button>
```

#### Tertiary Button (Ghost/Text)
```jsx
// Subtle actions, navigation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-white text-[#126DFB] font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200"
>
  Tertiary Action
</motion.button>
```

#### Button Usage Hierarchy
1. **Primary Blue**: Main conversion actions (trial signup, tier selection)
2. **Secondary Gray**: Alternative actions, less emphasis
3. **Tertiary White**: Special contexts, inverted buttons
4. **Text Links**: Navigation, subtle actions

#### Button Size Standards
- **Large CTA**: `text-lg px-12 py-4` (hero sections, main actions)
- **Medium**: `text-base px-8 py-3` (cards, forms)
- **Small**: `text-sm px-6 py-2` (compact spaces, secondary actions)

### Form Standards

#### Input Fields
```jsx
<input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white" />
```

#### Form Validation
- **Error States**: Red border + error message
- **Success States**: Green border + success icon
- **Loading States**: Disabled state + loading spinner
- **Focus States**: Blue ring + increased border weight

### Card Standards (Alytics Pattern)

#### Standard Content Card
```jsx
<motion.div
  variants={cardVariants}
  whileHover={{ 
    y: -8, 
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
  }}
  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
>
  {/* Card content */}
</motion.div>
```

#### Pricing Card (Popular Variant)
```jsx
<motion.div
  variants={cardVariants}
  whileHover={{ 
    y: 0,  // Popular cards don't lift as much
    boxShadow: "0 25px 50px rgba(18, 109, 251, 0.2)" 
  }}
  className="rounded-2xl p-8 border relative bg-gradient-to-b from-blue-50 to-white border-[#126DFB] shadow-xl"
>
  {/* Popular card content */}
</motion.div>
```

#### Card Variants
- **Feature Cards**: Icon + title + description, white background
- **Pricing Cards**: Popular cards use blue gradient background
- **Content Cards**: Standard white with shadow-lg
- **Special Offers**: Gradient backgrounds with enhanced shadows

### Page Layout Patterns

#### Hero Section Template
```jsx
<section className="relative pt-24 pb-20 px-6 overflow-hidden bg-white">
  <div className="max-w-4xl mx-auto text-center relative z-10">
    {/* Trust badge */}
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200">
      <Icon className="w-4 h-4 text-[#126DFB]" />
      <span className="text-sm font-medium text-gray-700">Trust indicator</span>
    </div>
    
    {/* Main headline */}
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
      Main headline with <span className="text-[#126DFB]">brand accent</span>
    </h1>
    
    {/* Subtitle */}
    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
      Supporting description that expands on the value proposition
    </p>
    
    {/* Primary CTA */}
    <motion.button className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg">
      Primary Action
    </motion.button>
  </div>
</section>
```

#### Content Section Template
```jsx
<section className="py-20 bg-[#F8F8F8] relative">
  <div className="max-w-4xl mx-auto px-6">
    {/* Section header */}
    <motion.div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Section Title
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Section description
      </p>
    </motion.div>
    
    {/* Section content */}
    <motion.div className="space-y-8">
      {/* Content blocks */}
    </motion.div>
  </div>
</section>
```

---

## ⚡ Animation & Interaction Guidelines

### Animation Principles

#### Performance Standards
- **60fps Target**: All animations must maintain smooth framerates
- **Reduced Motion**: Respect `prefers-reduced-motion` settings
- **Progressive Enhancement**: Fallbacks for slower devices
- **Battery Awareness**: Minimize resource-intensive animations on mobile

#### Timing & Easing
```css
/* Standard Easing Functions */
--ease-out-quart: cubic-bezier(0.25, 0.25, 0, 1);
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Duration Standards */
--duration-fast: 200ms;
--duration-normal: 400ms;  
--duration-slow: 600ms;
--duration-page: 800ms;
```

#### Interaction States
1. **Idle**: Default resting state
2. **Hover**: Subtle lift and shadow increase
3. **Active**: Slight scale down (0.98)
4. **Focus**: Ring outline for accessibility
5. **Disabled**: Reduced opacity (0.5) and no interactions

### Framer Motion Standards

#### Section Entry Animations
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] }
  }
};
```

#### Micro-Interactions
- **Buttons**: Scale and shadow changes on hover/tap
- **Cards**: Lift effect with shadow depth increase
- **Forms**: Smooth focus transitions and validation states
- **Loading**: Skeleton screens and progress indicators

---

## 📝 Content & Messaging Standards

### Voice & Tone Guidelines

#### Brand Personality
- **Professional**: Industry expertise and authority
- **Approachable**: Startup-friendly and accessible
- **Results-Driven**: Focus on ROI and performance
- **Innovative**: Cutting-edge methods and intelligence
- **Supportive**: Partnership-focused, not vendor relationship

#### Tone Application by Context
- **Headlines**: Bold, confident, benefit-focused
- **Body Copy**: Clear, informative, value-driven
- **CTAs**: Action-oriented, urgent but not pushy
- **Forms**: Helpful, reassuring, low-friction
- **Error Messages**: Apologetic, helpful, solution-focused

### Messaging Framework

#### Core Value Proposition
"Strategic ad intelligence from $250MM+ managed spend experience, delivered weekly to fuel startup growth."

#### Key Benefits Hierarchy
1. **Speed**: Launch campaigns in 10 minutes
2. **Intelligence**: Data-driven creative decisions
3. **Cost**: Startup-friendly pricing vs agency costs
4. **Performance**: Proven methodologies and scoring
5. **Support**: Weekly delivery and ongoing optimization

#### Problem-Agitate-Solution Structure
```
PROBLEM: "You're creating content without knowing what's trending or converting"
AGITATE: "Every post is a guess instead of strategic intelligence"  
SOLUTION: "Get custom scripts based on real trending data and performance intelligence"
```

### Content Standards

#### Headlines & Subheadings
- **Character Limits**: H1 max 60 characters, H2 max 80 characters
- **Power Words**: Strategic, Custom, Trending, Intelligence, Proven
- **Benefit Focus**: Lead with outcomes, not features
- **Emotional Triggers**: FOMO, social proof, authority

#### Call-to-Action Standards
- **Primary CTAs**: "Start Free Week Trial", "Get Custom Scripts"
- **Secondary CTAs**: "See How It Works", "View Templates"  
- **Urgency Language**: "Limited Time", "First 100 Founders"
- **Risk Reversal**: "No Risk", "Cancel Anytime", "FREE Week"

---

## 🎯 User Experience Standards

### Conversion Optimization Principles

#### Landing Page Structure
1. **Hero Section**: Value proposition + primary CTA
2. **Problem-Solution**: Pain points + our solution
3. **Social Proof**: Testimonials + company logos
4. **Features/Benefits**: Core value delivery
5. **Pricing**: Clear tiers + trial offers
6. **Objection Handling**: Address common concerns
7. **FAQ**: Remove final barriers
8. **Final CTA**: Last chance conversion

#### Form Best Practices
- **Progressive Disclosure**: Start with minimal fields
- **Smart Defaults**: Pre-populate when possible
- **Inline Validation**: Real-time feedback
- **Error Recovery**: Clear instructions for correction
- **Success States**: Confirm completion with next steps

### Performance Standards

#### Technical Requirements
- **Page Load**: < 3 seconds on 3G
- **First Contentful Paint**: < 2 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

#### Accessibility Standards
- **WCAG 2.1 AA**: Minimum compliance level
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators

---

## 🔧 Implementation Standards

### Development Guidelines

#### Code Quality Standards
```jsx
// Component structure standards
export function ComponentName() {
  // 1. State and hooks
  const [state, setState] = useState();
  
  // 2. Effects and event handlers
  useEffect(() => {}, []);
  
  // 3. Render with proper TypeScript
  return (
    <motion.section
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.section>
  );
}
```

#### CSS Standards (Tailwind)
- **Responsive Design**: Mobile-first breakpoints
- **Consistent Spacing**: Use spacing scale (4, 6, 8, 12, 16, 20, 24)
- **Color Usage**: Only use defined color variables
- **Typography**: Follow defined text classes

#### Performance Optimization
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Dynamic imports for large components
- **Font Loading**: Optimize web font delivery
- **Bundle Analysis**: Regular bundle size monitoring

### Quality Assurance Checklist

#### Pre-Launch Validation
- [ ] **Design Review**: Matches approved designs exactly
- [ ] **Content Review**: All copy follows messaging guidelines
- [ ] **Functionality Testing**: All interactions work as expected
- [ ] **Performance Testing**: Meets performance standards
- [ ] **Accessibility Testing**: WCAG compliance verified
- [ ] **Cross-Browser Testing**: Major browsers + devices
- [ ] **SEO Validation**: Meta tags, structured data, performance

#### Ongoing Maintenance
- [ ] **Brand Compliance**: Regular brand guideline audits
- [ ] **Performance Monitoring**: Continuous performance tracking
- [ ] **Content Updates**: Keep messaging current and relevant
- [ ] **A/B Testing**: Data-driven optimization iterations
- [ ] **User Feedback**: Regular UX research and updates

---

## 📊 Measurement & Optimization

### Success Metrics

#### Brand Consistency KPIs
- **Visual Consistency Score**: Automated brand guideline compliance
- **Message Alignment**: Content audit scores
- **User Experience Metrics**: Task completion rates
- **Performance Consistency**: Technical standard compliance

#### Conversion Metrics
- **Primary CTA Click Rate**: Service tier engagement
- **Form Completion Rate**: Trial signup conversion
- **Page Engagement**: Time on page, scroll depth
- **Cross-Page Consistency**: Bounce rate analysis

### Continuous Improvement Process

#### Monthly Brand Review
1. **Audit Current Implementation**: Compare against guidelines
2. **Identify Inconsistencies**: Document deviations and gaps
3. **Update Guidelines**: Evolve standards based on learnings
4. **Team Training**: Ensure team alignment on standards
5. **Implementation Planning**: Roadmap for corrections and improvements

#### Quarterly Brand Evolution
- **Industry Benchmarking**: Compare against competitor standards
- **User Research**: Gather feedback on brand perception
- **Technology Updates**: Adapt to new capabilities and standards
- **Guideline Refinement**: Update based on real-world usage

---

## 📋 Implementation Checklist

### Alytics-Based Page Standards
- [ ] **Hero Section**: Uses `pt-24 pb-20 px-6` spacing with centered `max-w-4xl` container
- [ ] **Typography**: Implements responsive heading scales (text-4xl to text-6xl for H1)
- [ ] **Colors**: Uses direct brand colors (`text-[#126DFB]`, `bg-[#0F5AD6]`) consistently
- [ ] **Buttons**: Primary CTAs use blue with hover scale and shadow effects
- [ ] **Cards**: All cards use `rounded-2xl p-8 shadow-lg` styling
- [ ] **Animations**: Framer Motion with 0.4s duration and custom easing
- [ ] **Layout**: Alternating white/gray backgrounds between sections
- [ ] **Icons**: Consistent sizing with `w-4 h-4` or `w-5 h-5` scale

### Component Migration Standards
- [ ] Replace hardcoded sizes with responsive classes (clamp values)
- [ ] Convert Tailwind color classes to direct hex values
- [ ] Add Framer Motion animations with standard variants
- [ ] Implement consistent spacing (`py-20`, `space-y-8`)
- [ ] Update button styling to match Alytics pattern
- [ ] Ensure mobile-first responsive design

### Quality Assurance Checklist
- [ ] **Visual Consistency**: All pages match Alytics homepage styling
- [ ] **Animation Performance**: 60fps animations with proper easing
- [ ] **Typography Scale**: Responsive text sizing across all devices
- [ ] **Color Compliance**: Brand blue (#126DFB) used consistently
- [ ] **Button Standards**: All CTAs follow primary/secondary hierarchy
- [ ] **Card Design**: Consistent rounded corners and shadow depth
- [ ] **Layout Spacing**: Proper section padding and content spacing
- [ ] **Mobile Responsiveness**: All components work on mobile devices

### Page-Specific Implementation
```jsx
// Standard page wrapper
<main className="min-h-screen">
  {/* Hero section - always first */}
  <section className="relative pt-24 pb-20 px-6 bg-white">
    {/* Hero content */}
  </section>
  
  {/* Content sections - alternating backgrounds */}
  <section className="py-20 bg-[#F8F8F8]">
    {/* Content */}
  </section>
  
  <section className="py-20 bg-white">
    {/* Content */}
  </section>
</main>
```

---

## 🚀 Quick Start Implementation

### For New Pages
1. Copy hero section template from this guide
2. Use `max-w-4xl mx-auto px-6` for content containers
3. Apply `py-20` for section spacing
4. Use direct hex colors for brand blue elements
5. Add Framer Motion animations with provided variants

### For Existing Pages  
1. Update typography to use responsive scales
2. Replace color classes with direct hex values
3. Standardize spacing to `py-20` pattern
4. Add hover animations to interactive elements
5. Ensure cards use `rounded-2xl p-8 shadow-lg`

---

**Document Version**: 3.0 (Alytics Update)
**Last Updated**: January 2025  
**Based On**: Current Homepage Implementation
**Document Owner**: Design & Development Team

*This updated brand consistency guide reflects the proven patterns from the Alytics homepage implementation. All new pages and component updates should follow these standards for maximum consistency and conversion optimization.*