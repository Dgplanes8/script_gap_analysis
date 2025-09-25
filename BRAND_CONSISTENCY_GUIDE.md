# Brand Consistency Guide - Apsics Media

This guide establishes visual guidelines, messaging standards, and component styling rules to ensure consistent brand presentation across all touchpoints, specifically aligned with our early-stage startup ICP.

## Table of Contents

- [Brand Identity](#brand-identity)
- [Visual Design System](#visual-design-system)
- [Typography Guidelines](#typography-guidelines)
- [Messaging & Voice](#messaging--voice)
- [Component Standards](#component-standards)
- [Startup ICP Alignment](#startup-icp-alignment)

---

## Brand Identity

### Core Brand Promise

**"Strategic Creative Intelligence for Startup Success"**

Transforming $250MM+ in ad spend experience into accessible, weekly strategic intelligence designed specifically for early-stage startup teams with limited budgets but unlimited growth potential.

### Brand Values

1. **Startup-First**: Everything designed for bootstrap to Series A companies
2. **Transparent Pricing**: Revolutionary weekly pricing with no contracts
3. **Proven Results**: $250MM+ experience distilled into actionable insights
4. **Time-Conscious**: Monday delivery system respects startup urgency
5. **Budget-Friendly**: Professional strategy at startup-accessible pricing

### Brand Personality

- **Expert but Approachable**: Authoritative without being intimidating
- **Startup-Savvy**: Understanding of resource constraints and growth pressure  
- **Results-Oriented**: Focus on ROI and practical implementation
- **Innovative**: Revolutionary pricing model and delivery system
- **Supportive**: Fellow founder helping other founders succeed

---

## Visual Design System

### Color Palette

**Primary Colors**:
```css
/* Primary Orange - Main CTA and highlights */
--primary-orange: #ea580c;      /* orange-600 */
--primary-orange-hover: #c2410c; /* orange-700 */
--primary-orange-light: #fb923c;  /* orange-400 */

/* Secondary Red - Urgency and important actions */
--secondary-red: #dc2626;        /* red-600 */
--secondary-red-hover: #b91c1c;  /* red-700 */

/* Success Green - Free trials and positive actions */
--success-green: #16a34a;        /* green-600 */
--success-green-hover: #15803d;  /* green-700 */
```

**Neutral Colors**:
```css
/* Text and backgrounds */
--text-primary: #111827;     /* gray-900 */
--text-secondary: #6b7280;   /* gray-500 */
--text-light: #9ca3af;       /* gray-400 */
--background: #f9fafb;       /* gray-50 */
--background-white: #ffffff; /* white */
--border: #e5e7eb;          /* gray-200 */
```

**Tier-Specific Colors**:
```css
/* Service tier color coding */
--tier-starter: #16a34a;     /* green-600 - Creative Starter */
--tier-tracker: #ea580c;     /* orange-600 - Trend Tracker */
--tier-edge: #0d9488;        /* teal-600 - Competitive Edge */
--tier-intelligence: #1e40af; /* navy-600 - Market Intelligence */
--tier-enterprise: #7c3aed;   /* purple-600 - Enterprise */
```

### Logo and Brand Marks

**Primary Logo**: "AM" in gradient box + "Apsics Media" text
- Use on white backgrounds
- Maintain clear space equal to the height of the logo
- Never stretch or distort the proportions

**Logo Variations**:
- Full logo (desktop header)
- Compact logo (mobile header)
- Icon only (favicon, social profiles)

**Usage Rules**:
- ✅ Use on white or very light backgrounds
- ✅ Maintain minimum size of 32px height for icon
- ❌ Don't use on busy backgrounds without proper contrast
- ❌ Don't change colors or add effects

---

## Typography Guidelines

### Font Hierarchy

**Primary Font**: Inter (Google Fonts)
- Modern, readable, excellent for startup/tech context
- Good character spacing for both headings and body text
- Strong performance across all screen sizes

**Font Scale**:
```css
/* Headings */
h1: text-4xl md:text-5xl (2.25rem/3rem desktop) - Hero headlines
h2: text-3xl md:text-4xl (1.875rem/2.25rem desktop) - Section headers  
h3: text-2xl md:text-3xl (1.5rem/1.875rem desktop) - Subsection headers
h4: text-xl (1.25rem) - Card titles, feature headers

/* Body Text */
Large: text-lg (1.125rem) - Hero subtitles, important descriptions
Normal: text-base (1rem) - Standard body copy
Small: text-sm (0.875rem) - Form labels, fine print
Extra Small: text-xs (0.75rem) - Disclaimers, metadata
```

**Font Weights**:
- **font-bold (700)**: Headlines, important CTAs
- **font-semibold (600)**: Subheadings, form labels, button text
- **font-medium (500)**: Navigation, card content
- **font-normal (400)**: Body text, descriptions

### Typography Best Practices

**Headings**:
- Use sentence case for all headings (not TITLE CASE)
- Keep headlines under 8 words when possible
- Focus on benefits and outcomes, not features
- Include power words: "winning," "proven," "strategic," "intelligence"

**Body Text**:
- Line height: 1.5 for readability
- Paragraph spacing: mb-4 or mb-6
- Maximum line length: ~75 characters
- Use bullet points for easy scanning

**CTAs and Buttons**:
- Action-oriented language: "Get," "Start," "Download," "Claim"
- Create urgency: "Claim Your Credits," "Limited Time Founding Offer," "Join 1,200+ Founders"
- Avoid generic text like "Click Here" or "Submit"

---

## Messaging & Voice

### Tone of Voice

**Professional but Personal**:
- Speak founder-to-founder
- Use "we" and "our experience" to build credibility
- Acknowledge startup challenges without dwelling on problems
- Focus on solutions and positive outcomes

**Example Phrases**:
- ✅ "From a founder who's been in your shoes"
- ✅ "Built specifically for early-stage startup teams"
- ✅ "Professional ad strategy at startup pricing"
- ✅ "Cancel anytime, restart anytime"
- ❌ "Enterprise-grade solutions" (too intimidating)
- ❌ "Industry-leading platform" (generic)

### Key Messaging Pillars

**1. Startup-Specific Expertise**:
- "Designed for bootstrap to Series A companies"
- "Perfect for startup teams with $500-$5K monthly ad spend"
- "No expensive agency minimums or long contracts"

**2. Proven Authority**:
- "$250MM+ in managed media spend experience"
- "500+ successful campaigns launched"
- "Proven methodologies from Fortune 500 campaigns"

**3. Revolutionary Delivery**:
- "Weekly creative intelligence delivered every Monday"
- "Pay weekly, cancel anytime, restart anytime"
- "First week completely FREE"

**4. Practical Implementation**:
- "Ready-to-use scripts and templates"
- "Step-by-step launch instructions"
- "Copy, paste, and launch winning campaigns"

### Messaging Hierarchy

**Primary Value Proposition**:
"Turn Your Ad Budget Into 3x More Customers in 30 Days"

**Supporting Messages**:
- Weekly ad templates designed for startup teams
- No marketing experience needed
- Professional strategy at startup pricing
- Revolutionary weekly billing with no contracts

**Proof Points**:
- $250MM+ in managed ad spend
- 1,200+ startup founders already using templates
- First week FREE trial
- Cancel or restart anytime

---

## Component Standards

### Button Styling Standards

**Primary CTA (High-conversion actions)**:
```css
.btn-primary {
  background: linear-gradient(135deg, #ea580c, #dc2626);
  color: white;
  font-weight: 600; /* font-semibold */
  padding: 12px 24px; /* py-3 px-6 */
  border-radius: 8px; /* rounded-lg */
  transition: all 0.2s;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #c2410c, #b91c1c);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.25);
}
```

**Secondary CTA (Alternative actions)**:
```css
.btn-secondary {
  border: 2px solid #ea580c;
  color: #ea580c;
  background: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #ea580c;
  color: white;
}
```

**Success/Free Actions**:
```css
.btn-success {
  background: #16a34a;
  color: white;
  font-weight: 700; /* font-bold */
  padding: 12px 24px;
  border-radius: 8px;
}
```

### Form Styling Standards

**Input Fields**:
```css
.form-input {
  width: 100%;
  padding: 12px 16px; /* py-3 px-4 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 8px; /* rounded-lg */
  font-size: 14px; /* text-sm */
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  ring: 2px solid #ea580c; /* focus:ring-2 focus:ring-orange-500 */
  border-color: #ea580c; /* focus:border-orange-500 */
}
```

**Form Labels**:
```css
.form-label {
  font-size: 14px; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
  margin-bottom: 8px; /* mb-2 */
}
```

### Card Component Standards

**Standard Card**:
```css
.card {
  background: white;
  border-radius: 16px; /* rounded-xl */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb; /* border-gray-200 */
  padding: 24px; /* p-6 */
  transition: all 0.3s;
}

.card:hover {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
```

**Service Tier Cards**:
- Use tier-specific color accents
- Include "Most Popular" badge for Trend Tracker
- Maintain consistent feature list formatting
- Clear pricing and CTA hierarchy

### Badge Component Standards

**Promotional Badges**:
```css
.badge-promo {
  background: linear-gradient(135deg, #dc2626, #ea580c);
  color: white;
  font-size: 12px; /* text-xs */
  font-weight: 700; /* font-bold */
  padding: 4px 12px; /* py-1 px-3 */
  border-radius: 9999px; /* rounded-full */
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
```

**Status Badges**:
```css
.badge-tier {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
  /* Color varies by tier */
}
```

---

## Startup ICP Alignment

### Visual Alignment with Startup Audience

**Design Principles**:
1. **Clean and Professional**: Not overly corporate or stuffy
2. **Modern but Accessible**: Contemporary design without being trendy
3. **Budget-Conscious Aesthetic**: Quality without luxury pricing implications
4. **Growth-Oriented**: Visual emphasis on scaling and improvement
5. **Founder-Friendly**: Approachable and understanding of startup constraints

**Color Psychology for Startups**:
- **Orange**: Energy, enthusiasm, affordable innovation
- **Green**: Growth, success, go-ahead signal for budget-conscious decisions
- **Red**: Urgency appropriate for fast-moving startup environment
- **Gray**: Professional stability without corporate stiffness

### Content Alignment

**Avoid Language That Alienates Startups**:
- ❌ "Enterprise solutions"
- ❌ "Corporate packages"
- ❌ "Premium pricing"
- ❌ "Executive consultations"
- ❌ "Fortune 500 approach"

**Use Startup-Friendly Language**:
- ✅ "Startup-friendly pricing"
- ✅ "Bootstrap to Series A"
- ✅ "Founder-to-founder"
- ✅ "Early-stage teams"
- ✅ "Growth-focused"

### Visual Hierarchy for Startup Priorities

**Most Important Elements** (Highest visual priority):
1. Free trial offers
2. Weekly pricing (no long contracts)
3. Cancel anytime flexibility
4. Proven results from $250MM+ experience
5. Ready-to-use templates (immediate value)

**Secondary Elements**:
1. Service tier comparisons
2. Implementation guidance
3. Startup success stories
4. Monday delivery promise

**Supporting Elements**:
1. Company background
2. Detailed methodology
3. Additional resources
4. Contact information

---

## Brand Asset Library

### Required Assets

**Logos**:
- Logo SVG (scalable vector)
- Logo PNG (high resolution)
- Logo PNG (web optimized)
- Favicon ICO
- Apple touch icon

**Images**:
- Hero section backgrounds
- Service tier icons
- Feature illustrations
- Success story images (when available)
- Team photos (when appropriate)

**Templates**:
- Email signatures
- Social media templates
- Presentation templates
- Document headers

### Asset Specifications

**Logo Specifications**:
- Minimum size: 32px height for icon
- File formats: SVG, PNG (transparent background)
- Color variations: Full color, white, black

**Image Specifications**:
- Format: WebP preferred, JPEG fallback
- Optimization: Under 100KB for web images
- Resolution: 2x for retina displays
- Alt text: Descriptive for accessibility

---

## Quality Checklist

### Brand Consistency Review

**Visual Elements**:
- [ ] Correct color palette used throughout
- [ ] Typography hierarchy maintained
- [ ] Logo usage follows guidelines
- [ ] Button styles match standards
- [ ] Card components use consistent styling

**Content Review**:
- [ ] Tone of voice appropriate for startup audience
- [ ] Messaging aligns with startup ICP
- [ ] No alienating corporate language
- [ ] Value propositions clearly communicated
- [ ] Proof points prominently featured

**User Experience**:
- [ ] Information hierarchy supports startup priorities
- [ ] Free trial prominently featured
- [ ] Pricing transparency maintained
- [ ] No-commitment messaging clear
- [ ] Implementation support emphasized

---

*Last Updated: 2025-01-27*
*Next Review: Quarterly or when brand guidelines need updates*