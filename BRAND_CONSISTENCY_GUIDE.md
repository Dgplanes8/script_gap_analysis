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

### Color Palette - Conversion Optimized

**Strategic Color Psychology for B2B Marketing Platform:**

Our color system is designed to maximize trust and conversions for our B2B target audience (founders, marketers, growth teams making purchasing decisions for their companies).

**Primary Color - Trust & Professionalism**:
```css
/* Primary Blue - Main brand, headers, navigation, trust-building elements */
--primary-blue: #126DFB;          /* Brand blue - core identity */
--primary-blue-dark: #0F5AD6;     /* Hover states, depth */
--primary-blue-darker: #0D4AB8;   /* Active states */
--primary-blue-light: #3B82F6;    /* Subtle accents */
--primary-blue-lighter: #60A5FA;  /* Very subtle backgrounds */

/* Psychology: Trust, professionalism, stability, reduces risk perception */
/* Use: Headers, primary brand elements, professional CTAs, navigation */
/* Conversion role: Build credibility & reduce purchase anxiety */
```

**Success Color - Growth & Free Actions**:
```css
/* Success Green - Free trials, guarantees, positive metrics, ROI signals */
--success-green: #10B981;         /* Primary success color */
--success-green-dark: #059669;    /* Hover states */
--success-green-light: #34D399;   /* Subtle success indicators */
--success-green-bg: #D1FAE5;      /* Success backgrounds */

/* Psychology: Growth, money, positive ROI, "go ahead" signal */
/* Use: "Claim Free Credits" CTAs, guarantee badges, success metrics */
/* Conversion role: Reduce friction on free trials and sign-ups */
```

**Urgency Color - Action & Limited Offers**:
```css
/* Urgency Orange - Time-sensitive offers, "Most Popular" badges, FOMO triggers */
--urgency-orange: #F59E0B;        /* Primary urgency color */
--urgency-orange-dark: #D97706;   /* Hover states */
--urgency-orange-light: #FCD34D;  /* Subtle urgency */
--urgency-orange-bg: #FEF3C7;     /* Urgency backgrounds */

/* Psychology: Energy, action, creates FOMO, affordable innovation */
/* Use: "Limited spots" badges, countdown timers, "Most Popular" tags */
/* Conversion role: Drive immediate action on time-sensitive offers */
```

**Neutral Colors - Professional Foundation**:
```css
/* Grays - Text, backgrounds, borders (don't distract from CTAs) */
--text-primary: #111827;     /* gray-900 - Primary text */
--text-secondary: #6B7280;   /* gray-500 - Secondary text */
--text-muted: #9CA3AF;       /* gray-400 - Muted text */
--background-gray: #F8F8F8;  /* Primary background */
--background-white: #FFFFFF; /* White backgrounds */
--border: #E5E7EB;          /* gray-200 - Borders */
--border-light: #F3F4F6;    /* gray-100 - Subtle borders */
```

**Tier-Specific Colors** (Updated for current offerings):
```css
/* Service tier color coding for pricing cards */
--tier-explore: #10B981;     /* green-600 - Explore (Free tier) */
--tier-essentials: #126DFB;  /* blue-600 - Essentials */
--tier-studio: #126DFB;      /* blue-600 - Studio (hero tier, gets gradient) */
--tier-concierge: #7C3AED;   /* purple-600 - Concierge (premium) */
```

### Color Usage Guidelines - Conversion Hierarchy

**Primary CTAs (Highest conversion priority):**
- **Background**: Blue gradient (`#126DFB` → `#0F5AD6`)
- **Text**: White
- **Use for**: Main signup buttons, pricing CTAs, primary conversion paths
- **Shadow**: Blue glow for emphasis (`rgba(18, 109, 251, 0.3)`)

**Free/Trial CTAs (Reduce friction):**
- **Background**: Solid green (`#10B981`)
- **Text**: White
- **Use for**: "Claim 10 Free Credits", trial starts, guarantee badges
- **Shadow**: Green glow (`rgba(16, 185, 129, 0.2)`)

**Secondary CTAs (Alternative paths):**
- **Background**: White
- **Border**: Blue (`#126DFB`)
- **Text**: Blue
- **Use for**: "Learn more", "See examples", secondary navigation

**Urgency Indicators:**
- **Background**: Orange (`#F59E0B`) or orange gradient
- **Text**: White or dark gray depending on contrast
- **Use for**: "Only 25 spots left", "Most Popular", countdown timers
- **Animation**: Optional subtle pulse for high-urgency elements

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

**Conversion Framework: Problem-Agitate-Solution (PAS)**

All homepage messaging should follow the PAS framework for maximum conversion impact:

**1. Problem** (Identify the pain):
- "Creative bottlenecks killing your growth?"
- "Wasting ad budget on guesswork?"
- "Campaigns launching weeks late while competitors outpace you?"

**2. Agitate** (Make the pain real and urgent):
- "Every week you delay is revenue left on the table"
- "Your team can't keep up with performance demands"
- "Ad fatigue is destroying your ROI while you struggle to create fresh content"

**3. Solution** (Present the easy fix with outcome):
- "Generate winning ad scripts in 60 seconds"
- "Turn creative bottlenecks into revenue multipliers"
- "Get $250MM+ in proven frameworks - starting free"

**Primary Value Proposition Options** (Problem + Ease + Outcome):
1. "Stop Wasting Ad Budget on Guesswork. Get Winning Scripts in 60 Seconds."
2. "Creative Bottleneck Killing Your Growth? Generate Proven Ad Scripts Instantly."
3. "Turn Hours of Creative Struggle Into 60 Seconds of Winning Ad Scripts"

**Supporting Messages**:
- Research-backed creative intelligence (not just templates)
- 60-second generation time (emphasize speed)
- $250MM+ proven frameworks (authority)
- 10 free credits, no card required (remove friction)

**Proof Points** (Build credibility early):
- $250MM+ in managed ad spend
- 12+ years helping companies scale from $10K to $1M+ monthly spend
- 25% average CAC reduction across verticals
- 150+ monthly concept generations available

---

## Component Standards

### Button Styling Standards - Conversion Optimized

**Button Hierarchy by Conversion Priority:**

**1. Primary CTA (Main signup/purchase actions)**:
```css
/* Use: Pricing CTAs, main signup buttons, primary conversion paths */
.btn-primary {
  background: linear-gradient(135deg, #126DFB, #0F5AD6);
  color: white;
  font-weight: 600; /* font-semibold */
  padding: 12px 24px; /* py-3 px-6 */
  border-radius: 12px; /* rounded-xl for modern feel */
  box-shadow: 0 8px 16px rgba(18, 109, 251, 0.3); /* Blue glow */
  transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1);
  font-size: 16px; /* text-base or larger */
}

.btn-primary:hover {
  background: linear-gradient(135deg, #0F5AD6, #0D4AB8);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(18, 109, 251, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(18, 109, 251, 0.3);
}
```

**2. Success/Free CTA (Free trials, zero-friction actions)**:
```css
/* Use: "Claim 10 Free Credits", trial starts, guarantee acceptance */
.btn-success {
  background: #10B981; /* Solid green, no gradient for clarity */
  color: white;
  font-weight: 600; /* font-semibold */
  padding: 12px 24px; /* py-3 px-6 */
  border-radius: 12px; /* rounded-xl */
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.25); /* Green glow */
  transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1);
}

.btn-success:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(16, 185, 129, 0.35);
}
```

**3. Secondary CTA (Alternative paths, lower friction)**:
```css
/* Use: "Learn More", "See Examples", secondary navigation */
.btn-secondary {
  background: white;
  border: 2px solid #126DFB;
  color: #126DFB;
  font-weight: 600;
  padding: 10px 22px; /* Slightly less to account for border */
  border-radius: 12px;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #126DFB;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(18, 109, 251, 0.2);
}
```

**4. Urgency CTA (Limited offers, scarcity-driven)**:
```css
/* Use: "Only 25 Spots Left", countdown CTAs, limited-time offers */
.btn-urgent {
  background: #F59E0B; /* Orange for urgency */
  color: white;
  font-weight: 700; /* font-bold for emphasis */
  padding: 12px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(245, 158, 11, 0.3);
  transition: all 0.3s;
  /* Optional: subtle pulse animation */
}

.btn-urgent:hover {
  background: #D97706;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(245, 158, 11, 0.4);
}
```

**5. Link-style CTA (Minimal emphasis)**:
```css
/* Use: Tertiary actions, inline links within content */
.btn-link {
  background: transparent;
  color: #126DFB;
  font-weight: 600;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s;
}

.btn-link:hover {
  color: #0F5AD6;
}
```

**CTA Text Guidelines:**
- **Action verbs**: "Claim", "Get", "Start", "Unlock", "Join"
- **Urgency modifiers**: "Now", "Today", "Limited"
- **Value indicators**: "Free", "10 Credits", "Founding Offer"
- **Social proof**: "Join 150+ Teams"

**Example CTA Copy:**
- ✅ "Claim 10 Free Credits Now"
- ✅ "Unlock Studio Founding Offer"
- ✅ "Get Winning Scripts in 60 Seconds"
- ✅ "Join 150+ Growing Teams"
- ❌ "Click Here"
- ❌ "Submit"
- ❌ "Sign Up"

### Form Styling Standards

**Input Fields**:
```css
.form-input {
  width: 100%;
  padding: 12px 16px; /* py-3 px-4 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 12px; /* rounded-xl for consistency */
  font-size: 14px; /* text-sm */
  transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1);
  background: white;
}

.form-input:focus {
  outline: none;
  ring: 2px solid #126DFB; /* focus:ring-2 focus:ring-blue-600 */
  border-color: #126DFB; /* focus:border-blue-600 */
  box-shadow: 0 0 0 3px rgba(18, 109, 251, 0.1); /* Subtle blue glow */
}

.form-input:hover:not(:focus) {
  border-color: #9CA3AF; /* Subtle hover state */
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

**Color Psychology for B2B Decision-Makers**:
- **Blue (#126DFB)**: Trust, professionalism, reduces risk perception - critical for B2B purchases where buyers justify ROI to stakeholders
- **Green (#10B981)**: Growth, ROI signals, "safe to proceed" - removes friction from free trials and money-back guarantees
- **Orange (#F59E0B)**: Urgency, FOMO, action triggers - creates scarcity and drives immediate decisions on limited offers
- **Gray (Neutrals)**: Professional foundation - doesn't compete with conversion-critical CTAs

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