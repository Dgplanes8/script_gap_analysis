# Stripe Setup Guide

This walkthrough assumes you have a Stripe account and access to the APSICS project environment variables. Follow each step in order—you do not need prior Stripe experience.

---

## 1. Prepare Your Stripe Dashboard

1. Log in to [stripe.com](https://dashboard.stripe.com/) and switch to the correct project (test vs. production).
2. In the left sidebar, open **Products → Prices**.

We will create or confirm four subscription prices that correspond to the app’s tiers.

---

## 2. Create the Product & Prices

1. Click **Add product** (or edit an existing “APSICS Plan” product if you already have one).
2. Enter a product name such as “APSICS Media Plans” and save.
3. Under the product, add the following **recurring** prices (monthly billing):

   | Tier | Amount | Notes |
   | --- | --- | --- |
   | Essentials | **$19/month** | 150 credits per month |
   | Studio – Founding | **$29/month** | Runs for the first 6 billing cycles, then subscribers should move to the standard Studio price |
   | Studio – Standard | **$49/month** | Used after the founding offer expires |
   | Concierge | **$249/month** | 2,000 credits per month |

> **Tip:** If you already have some of these prices, just copy their price IDs—you do not need duplicates.

### Required metadata for each price

While editing a price, scroll to **Metadata** and add:

| Key | Value |
| --- | --- |
| `plan_tier` | `essentials`, `studio`, or `concierge` |
| `credit_amount` | `150`, `800`, or `2000` (Studio uses `800`) |
| `studio_rate` *(Studio prices only)* | `founding` for the $29 price, `standard` for the $49 price |

Click **Save price** after adding metadata.

---

## 3. Capture Price IDs for the App

For each price, copy the Stripe **Price ID** (`price_xxx`). You will plug these into environment variables shortly:

- `STRIPE_ESSENTIALS_PRICE_ID` = price_1SB3vwFWfDCOgxGUYSArJDQ2
- `STRIPE_STUDIO_FOUNDING_PRICE_ID` = price_1SB42NFWfDCOgxGUm0qy6vJw
- `STRIPE_STUDIO_STANDARD_PRICE_ID` = price_1SB3zIFWfDCOgxGUBkJYKFUJ
- `STRIPE_CONCIERGE_PRICE_ID` = price_1SB3xbFWfDCOgxGUaSUxXPCD

Keep these handy—you will add them to Supabase/hosting env vars in Step 5.

---

## 4. Webhook & API Credentials

1. In the Stripe dashboard, go to **Developers → API keys** and copy your **Secret key** (used as `STRIPE_SECRET_KEY`).
2. Under **Developers → Webhooks**, either reuse the existing endpoint or create a new one pointing to your deployed `/stripe-webhook` function. Copy the **Signing secret** (used as `STRIPE_WEBHOOK_SECRET`).

> Stay in test mode while you validate. You can switch to live credentials once everything works.

---

## 5. Update Environment Variables

Set the following variables wherever the app is deployed (Supabase Edge, Vercel, etc.). Values marked ✅ are mandatory.

```
STRIPE_SECRET_KEY=...           ✅
STRIPE_WEBHOOK_SECRET=...       ✅
STRIPE_PRICE_ID=...             (fallback price; keep if already in use)
- `STRIPE_ESSENTIALS_PRICE_ID` = price_1SB3vwFWfDCOgxGUYSArJDQ2
- `STRIPE_STUDIO_FOUNDING_PRICE_ID` = price_1SB42NFWfDCOgxGUm0qy6vJw
- `STRIPE_STUDIO_STANDARD_PRICE_ID` = price_1SB3zIFWfDCOgxGUBkJYKFUJ
- `STRIPE_CONCIERGE_PRICE_ID` = price_1SB3xbFWfDCOgxGUaSUxXPCD
STRIPE_SUCCESS_URL=...
STRIPE_CANCEL_URL=...
```

The success/cancel URLs should point to live pages, for example `https://yourdomain.com/ai-ad-script-generator?checkout=success`.

After saving, redeploy the Supabase functions or restart your environment so the new variables are available.

---

## 6. Run the Database Migration

From the project root, apply the new migration to set the default profile credits:

```bash
supabase migration up
```

(Or run the SQL manually if you manage migrations differently.)

---

## 7. Deploy Updated Functions

Redeploy these Supabase Edge functions so the new pricing logic is active:

- `generate-script`
- `generate-brief`
- `analyze-and-iterate-ad`
- `create-checkout-session`
- `stripe-webhook`

If you are using the Supabase CLI:

```bash
supabase functions deploy generate-script generate-brief analyze-and-iterate-ad create-checkout-session stripe-webhook
```

---

## 8. Verify End-to-End

1. Create a new test user via the app; confirm the profile shows **10 credits** by default.
2. Consume credits until you hit 0 and click the Studio/Essentials upgrade buttons—Stripe Checkout should open with the correct plan name and amount.
3. Complete a test checkout. In the Supabase dashboard, check the user’s `credits_remaining` increased by the correct amount (150/800/2000).
4. Let Stripe send a `checkout.session.completed` webhook. Confirm the logs show credits applied. You can also trigger a test `customer.subscription.updated` event to simulate monthly renewals.

> Everything works in test mode first. Once you’re satisfied, repeat the setup using live Stripe credentials and price IDs.

---

## 9. Troubleshooting Tips

- **Missing credits after purchase:** Check the Checkout metadata in Stripe. `plan_tier` and `credit_amount` must be present so the webhook knows how many credits to add.
- **Webhook signature errors:** Ensure the signing secret matches the environment variable and that the endpoint is reachable from Stripe.
- **Still seeing “free week” copy:** Redeploy the frontend bundle; the latest UI expects the new credit model.

---

You’re done! The app now sells the Essentials, Studio, and Concierge plans with the correct credit grants and founding offer.
