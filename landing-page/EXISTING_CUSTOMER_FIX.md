# How to Fix Existing Customer Accounts

## Quick Summary
For customers who already paid but don't have login credentials, you have two options:

1. **Automated Script** (Recommended) - Runs everything automatically
2. **Manual Process** - Step-by-step through Supabase dashboard

---

## Option 1: Automated Script (Recommended)

### What You Need
1. Customer's email address
2. Stripe Customer ID (from Stripe dashboard)
3. Customer's name (optional)

### Steps

1. **Install dependencies (if not already done):**
   ```bash
   npm install tsx resend
   ```

2. **Get the Stripe Customer ID:**
   - Go to Stripe Dashboard → Customers
   - Search for the customer's email
   - Copy their Customer ID (starts with `cus_`)

3. **Run the script:**
   ```bash
   cd landing-page
   npx tsx scripts/fix-existing-customer.ts <email> <stripe_customer_id> "<name>"
   ```

   **Example:**
   ```bash
   npx tsx scripts/fix-existing-customer.ts john@example.com cus_ABC123XYZ "John Smith"
   ```

### What the Script Does
1. ✅ Creates Supabase auth account (if doesn't exist)
2. ✅ Links profile to Stripe customer ID
3. ✅ Verifies credits are in the account
4. ✅ Sends password setup email to customer
5. ✅ Provides summary of changes

### What the Customer Receives
- Email with "Set My Password" button
- Magic link to create their password
- Account details (email, credits)
- Links to all tools
- Support contact info

---

## Option 2: Manual Process

### Step 1: Create Auth User in Supabase

1. **Go to Supabase Dashboard:**
   - Navigate to Authentication → Users
   - Click "Add User"

2. **Fill in details:**
   - Email: `customer@email.com`
   - Password: Generate random password (they'll reset it)
   - Auto Confirm: ✅ ON (important!)
   - Click "Create User"

3. **Copy the User ID:**
   - Click on the newly created user
   - Copy their UUID (something like `a1b2c3d4-...`)

### Step 2: Link Profile to Stripe

1. **Go to Table Editor → profiles:**
   - Find or create a row with the user's ID

2. **Update the profile:**
   ```sql
   UPDATE profiles
   SET stripe_customer_id = 'cus_YOUR_STRIPE_CUSTOMER_ID'
   WHERE id = 'USER_UUID_FROM_STEP_1';
   ```

3. **Verify credits:**
   ```sql
   SELECT id, credits_remaining, stripe_customer_id
   FROM profiles
   WHERE stripe_customer_id = 'cus_YOUR_STRIPE_CUSTOMER_ID';
   ```

### Step 3: Send Password Reset Email

1. **In Supabase Dashboard:**
   - Go to Authentication → Users
   - Find the user
   - Click "..." menu → "Send Password Recovery"

2. **Or generate magic link:**
   ```sql
   SELECT auth.admin.generate_link(
     'magiclink',
     'customer@email.com'
   );
   ```

3. **Email the customer:**
   - Use the password reset link
   - Include login instructions
   - Provide support contact

### Step 4: Verify Everything

1. **Check the profile is linked:**
   ```sql
   SELECT
     p.id,
     u.email,
     p.stripe_customer_id,
     p.credits_remaining
   FROM profiles p
   JOIN auth.users u ON u.id = p.id
   WHERE p.stripe_customer_id = 'cus_YOUR_STRIPE_CUSTOMER_ID';
   ```

2. **Expected result:**
   - User exists in auth.users
   - Profile exists with stripe_customer_id
   - Credits are present (usually 500 for Studio)

---

## Email Template for Customer

If you need to manually email the customer, use this template:

```
Subject: Your APSICS Media Account is Ready - Set Your Password

Hi [Name],

Thanks for your Studio founding offer purchase! Your account has been set up and your credits are ready to use.

**Set Your Password:**
Click here to set your password: [PASSWORD_RESET_LINK]

**Your Account Details:**
- Email: [customer@email.com]
- Credits: 500
- Package: Studio Founding Offer

**Access Your Tools:**
Once you've set your password, you can access:
- AI Ad Script Generator: https://apsicsmedia.com/ai-ad-script-generator
- AI Ad Iteration Tool: https://apsicsmedia.com/ai-ad-iteration-tool
- Creative Brief Generator: https://apsicsmedia.com/creative-brief-generator

Need help? Reply to this email or contact brian@apsicsmedia.com

Best,
Brian & the APSICS Media Team
```

---

## Troubleshooting

### "User already exists"
- The customer may have created an account separately
- Check if they can sign in with their email
- Reset their password using Supabase dashboard

### "Profile not found"
- The handle_new_user trigger should create it automatically
- Manually create it:
  ```sql
  INSERT INTO profiles (id, credits_remaining, stripe_customer_id)
  VALUES (
    'USER_UUID',
    500,
    'cus_STRIPE_CUSTOMER_ID'
  );
  ```

### "Credits not showing"
- Check if webhook ran successfully:
  ```sql
  SELECT metadata
  FROM package_leads
  WHERE email = 'customer@email.com'
  ORDER BY created_at DESC
  LIMIT 1;
  ```
- Manually add credits:
  ```sql
  UPDATE profiles
  SET credits_remaining = 500
  WHERE id = 'USER_UUID';
  ```

### "Email not sending"
- Check RESEND_API_KEY is set
- Verify email in Resend dashboard
- Use manual email as backup

---

## Quick Reference: Finding Info

### Get Stripe Customer ID
```bash
# In Stripe Dashboard
Customers → Search by email → Copy Customer ID
```

### Get User ID from Email
```sql
SELECT id, email, created_at
FROM auth.users
WHERE email = 'customer@email.com';
```

### Get Profile Status
```sql
SELECT
  p.*,
  u.email
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'customer@email.com';
```

### Get Package Lead Info
```sql
SELECT *
FROM package_leads
WHERE email = 'customer@email.com'
ORDER BY created_at DESC;
```

---

## Prevention for Future

To prevent this issue for future customers, make sure:

1. ✅ Database migration is deployed
2. ✅ New checkout form with password field is live
3. ✅ Webhook is configured correctly
4. ✅ Email sending is working

All customers who sign up after deployment will get:
- Account created automatically
- Password set during checkout
- Confirmation email sent
- Profile linked to Stripe
