# Creative Intelligence Pricing Strategy
*Credit-based plans for scripts, briefs, and iteration campaigns*

---

## Why the Pricing Model Changed

The previous weekly billing + free week trial model created operational drag:

- Trial abuse meant most prospects never upgraded.
- Messaging was inconsistent: some pages promoted $5/week, others sold monthly retainers.
- Stripe plans did not align with the internal credit ledger, creating manual fulfilment.

The new structure fixes those problems by introducing a single credit wallet that spans every generator and scales with usage.

---

## Core Principles

1. **Credits First** – Users think in outcomes (scripts, briefs, remixes). Credits convert abstract AI runs into predictable units. One script/brief/iteration generally consumes 1 credit.
2. **Free On-Ramp** – Every registered account receives 10 credits every month. This replaces the free-week messaging and encourages immediate, recurring engagement.
3. **Simplified Plans** – Four tiers ladder from free testing to white-glove support. Essentials and Studio cover the majority of demand; Concierge remains the premium option.
4. **Founding Offer = Urgency** – Studio launches with a six-month $29/mo discount that pairs with the “expert crafted concept” bonus. After six billing cycles Stripe shifts customers to $49/mo.

---

## Plan Overview

| Plan | Monthly Price | Credits / Month | Ideal For |
| --- | --- | --- | --- |
| **Explore** | $0 | 10 | Prospects validating the tools |
| **Essentials** | $19 | 150 | Lean growth teams running steady creative tests |
| **Studio** *(founding offer)* | $29 for 6 months → $49 | 800 | Teams replacing agency retainers and wanting expert guidance |
| **Concierge** | $249 | 2,000 | Revenue teams with aggressive testing roadmaps |

> **Note:** Stripe stores Studio as two prices: the founding price for the first six cycles and the standard price that kicks in afterwards. Metadata on each price keeps the credit grant consistent.

---

## What Each Plan Unlocks

### Explore – $0 / 10 credits
- Email-only signup, no payment method required
- Access to all three generators (scripts, briefs, iteration)
- Saved history and ability to upgrade instantly
- Earned credits reset to 10 every monthly cycle

### Essentials – $19 / 150 credits
- Enough volume for weekly script + brief requests plus occasional iteration runs
- Priority processing in edge functions and email follow-up
- Shared brand workspace for teams
- Best entry point for in-house marketers

### Studio – $29 founding offer (renews at $49)
- 800 credits every month
- Unlocks advanced research mode and premium email delivery
- Includes the **expert crafted concept** delivered during the first month:
  - 2 target personas with positioning notes
  - 3 asset recommendations (video/static) with full copy & production direction
  - Comprehensive audience research, competitive teardown, and trend analysis
  - Framework application tailored to the account
- Founding offer messaging: “Lock $29/mo for six months, then $49/mo afterwards.”

### Concierge – $249 / 2,000 credits
- Everything in Studio plus:
  - Direct strategist collaboration + Slack access
  - Unlimited expert concept reviews
  - Quarterly performance planning with leadership
  - Perfect for teams managing multiple product lines or heavy testing calendars

---

## Messaging Frameworks

### Key Lines
- “Claim 10 free credits each month—no card required.”
- “Credits travel across every generator: scripts, briefs, and ad remixing.”
- “Upgrade to Essentials or Studio the moment you need more volume.”
- “Studio founding members lock $29/mo for six months and receive an expert-crafted concept in month one.”

### Objection Handling
| Objection | Response |
| --- | --- |
| "We just need a quick test." | Highlight Explore’s 10 credits and instant upgrade path. |
| "Too many plans." | Emphasize credit wallet simplicity and show calculator: credits × average usage. |
| "We already have an agency." | Focus on Studio’s expert concept bonus + ongoing credits at a fraction of the retainer. |
| "Will data lock-in happen?" | Credit-based system is cancel-anytime; unused credits persist until used. |

---

## Stripe / Billing Requirements

1. **Price Metadata** – `plan_tier`, `credit_amount`, and (for Studio) `studio_rate` must be present so the webhook knows how many credits to refill.
2. **Checkout Inputs** – Frontend calls `create-checkout-session` with the tier name. The Edge function maps tiers to Stripe price IDs and injects metadata.
3. **Webhook Logic** – `stripe-webhook` reads the metadata on both checkout sessions and subscription updates to add credits. Environment variables now include:
   - `STRIPE_ESSENTIALS_PRICE_ID`
   - `STRIPE_STUDIO_FOUNDING_PRICE_ID`
   - `STRIPE_STUDIO_STANDARD_PRICE_ID`
   - `STRIPE_CONCIERGE_PRICE_ID`
4. **Migration** – New profiles default to **10 credits**. Existing profiles were backfilled via `20250925120000_update_profile_credit_defaults.sql`.

---

## Landing Page & CTA Updates

- Replace every “Start Free Week Trial” button with “Claim 10 Free Credits”.
- Pricing grid copy now references Explore/Essentials/Studio/Concierge.
- Add the expert concept highlight card below the grid (already implemented in code).
- Secondary messaging (“Founding member pricing”, etc.) should align with Studio’s six-month discount.

---

## Success Metrics to Track Post-Launch

1. **Explore → Paid conversion rate** – target ≥ 25% within first month.
2. **Average credits consumed per user** – ensures allocations (150/800/2000) feel right.
3. **Stripe churn at month 7** – watch Studio customers as they graduate from $29 to $49.
4. **Support tickets about credits** – gauge clarity of the new system.

---

## FAQ Snippets

- **Is the free plan unlimited?** No—it refreshes 10 credits every month so prospects always have a reason to log back in.
- **Do credits roll over?** Yes, unused credits accumulate (we do not expire them at this time).
- **Can we buy extra credits without upgrading?** Not yet; prompt users to Essentials or Studio instead.
- **What happens after the Studio founding offer ends?** Stripe automatically transitions those subscriptions to the standard $49 price while retaining metadata.

---

## Next Iterations

- Offer add-on credit packs once Stripe usage stabilizes.
- Introduce metered billing for API partners built on the same credit ledger.
- Automate downgrade paths (Studio → Essentials) within the customer portal.

This document replaces all legacy references to weekly billing and free-week trials. Update any remaining docs with the language templates above.
