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

- `STRIPE_ESSENTIALS_PRICE_ID`
- `STRIPE_STUDIO_FOUNDING_PRICE_ID`
- `STRIPE_STUDIO_STANDARD_PRICE_ID`
- `STRIPE_CONCIERGE_PRICE_ID`

Keep these handy—you will add them to Supabase/hosting env vars in Step 5.

---

## 4. Webhook & API Credentials (Detailed)

### 4.1 Create API Keys
1. In the Stripe dashboard, open **Developers → API keys**.
2. Copy the **Secret key** (begins with `sk_test_` in test mode) and keep it safe—this becomes `STRIPE_SECRET_KEY`.

### 4.2 Configure the Webhook Endpoint
1. Navigate to **Developers → Webhooks**.
2. Click **Add endpoint**.
3. Enter the full URL to your Supabase function (for local testing you can use the Stripe CLI):
   - Production example: `https://yourdomain.com/.netlify/functions/stripe-webhook`
   - Supabase Edge example: `https://<project-ref>.functions.supabase.co/stripe-webhook`
4. Under **Select events**, choose:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `invoice.payment_succeeded` *(optional but helpful for future add-ons)*
5. Save the endpoint. Stripe will generate a **Signing secret** (looks like `whsec_...`). Copy it into `STRIPE_WEBHOOK_SECRET`.

> **Tip:** Create separate endpoints for test and live mode. Stripe only delivers events to the mode in which the endpoint was created.

### 4.3 Local Testing with the Stripe CLI
If you want to test the webhook before deploying:

```bash
# Install the CLI first: https://stripe.com/docs/stripe-cli
stripe login

# Forward test events to your local server (adjust port/path)
stripe listen --events checkout.session.completed,customer.subscription.updated \
  --forward-to localhost:54321/functions/v1/stripe-webhook

# Trigger a sample event
stripe trigger checkout.session.completed
```

You should see the event arrive in your local logs and the CLI confirms delivery.

### 4.4 Verify Delivery
- In the Stripe dashboard, open the webhook endpoint details.
- Check the **Recent events** list—each should return HTTP **200**.
- If you see `400`/`500` errors, expand the event to view the request/response and adjust your handler accordingly.

Stay in **test mode** while you validate. Once everything works, repeat the steps in live mode using the production domain.

---

## 5. Update Environment Variables

Set the following variables wherever the app is deployed (Supabase Edge, Vercel, etc.). Values marked ✅ are mandatory.

```
STRIPE_SECRET_KEY=...           ✅
STRIPE_WEBHOOK_SECRET=...       ✅
STRIPE_PRICE_ID=...             (fallback price; keep if already in use)
STRIPE_ESSENTIALS_PRICE_ID=...
STRIPE_STUDIO_FOUNDING_PRICE_ID=...
STRIPE_STUDIO_STANDARD_PRICE_ID=...
STRIPE_CONCIERGE_PRICE_ID=...
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
