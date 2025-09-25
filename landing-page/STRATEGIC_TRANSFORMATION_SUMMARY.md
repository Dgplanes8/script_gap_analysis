# APSICS Media Landing Page – Current State Summary

## Overview
The landing page now promotes APSICS Media’s credit-based creative intelligence platform. Messaging focuses on claiming 10 free credits, upgrading into Essentials/Studio/Concierge plans, and highlighting the Studio founding offer with the expert-crafted concept bonus.

## Key Transformations Implemented

### 1. Current Value Proposition ✅
- **Core Message**: "You're One Creative Breakthrough Away From Doubling Your Revenue"
- **Positioning**: $5,000+ agency strategy for a fraction of the cost via prepaid credits
- **Target**: Growth teams that need weekly creative intelligence across scripts, briefs, and ad iteration
- **Focus**: Outcome-driven copy tied to credits and platform-wide coverage

### 2. Current Service Model ✅
**Credit-Based Creative Intelligence**
- **Explore**: $0 / 10 credits every month
- **Essentials**: $19 / 150 credits monthly
- **Studio**: $29/mo for first 6 months (then $49) with 800 credits + expert-crafted concept
- **Concierge**: $249 / 2,000 credits monthly with strategist collaboration

**Deliverables per credit** (approximate):
- Script generator runs
- Creative brief generations
- Ad iteration analyses

Studio includes the month-one expert concept (2 personas, 3 assets + copy, full research).

### 3. Credibility Elements ✅
- **Experience**: 12+ years scaling media
- **Track Record**: $250MM+ managed spend
- **Cross-Platform Expertise**: Meta, TikTok, YouTube, LinkedIn, X
- **Guarantee**: Performance improvement messaging ties to premium plans

### 4. Current Features ✅
**Core Landing Page Elements**
- Hero with outcome promise + credit-based CTA (“Claim 10 Free Credits”)
- Updated social proof section
- Expert concept highlight card under pricing grid
- Revised pricing grid with Explore/Essentials/Studio/Concierge
- Performance guarantee & founder story
- Script generator demo remains primary proof

### 5. Conversion Journey ✅
- Hero → “Claim 10 Free Credits” CTA scrolls to pricing
- Pricing explains credits + plans + Studio bonus
- Generator demo encourages account creation when credits run out
- Purchase prompts inside each generator link to Essentials/Studio checkout flows

## Component Snapshot

| Component | Purpose |
| --- | --- |
| `AlyticsHero` | Outcome headline, free credit CTA |
| `SimplePricingSection` | Displays four tiers + expert concept highlight |
| `ProblemSolutionWorkflow` | Reinforces business pain & solution |
| `AI Script Generator` | Demo + credit-gated experience |
| `AI Ad Iteration` & `Creative Brief` | Same gating, shared messaging |

## Technical Notes

- Credit enforcement now happens in all edge functions (`generate-script`, `generate-brief`, `analyze-and-iterate-ad`).
- Checkout requests call `create-checkout-session` with a `tier` parameter; metadata drives credit grants and Studio founding pricing.
- Migration `20250925120000_update_profile_credit_defaults.sql` sets new-user defaults to 10 credits.

## Messaging Snapshot

### Primary CTA
- “Claim 10 Free Credits” (replaces “Start Free Week Trial” everywhere)

### Secondary CTA Examples
- “Upgrade to Essentials”
- “Unlock Studio Founding Offer”
- “Explore Plans & Pricing”

### Studio Highlight Copy
- “Lock $29/mo for six months, secure 800 credits each month, and receive an expert-crafted concept in month one.”

## Recommended Next Steps

1. **Analytics** – Track Explore-to-paid conversion and credit usage per plan using the new metadata.
2. **Lifecycle Emails** – Automatically notify Explore users when they drop below 3 credits.
3. **Support Docs** – Continue aligning FAQ/knowledge base with the credit terminology.
4. **Customer Portal** – Surface remaining credits and provide direct upgrade/downgrade controls.
5. **Future Pricing Experiments** – Consider add-on credit packs once baseline usage stabilises.

This summary replaces any references to $5/week pricing or free-week trials. Use it as the source of truth for ongoing documentation and marketing updates.
