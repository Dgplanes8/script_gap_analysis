# Authentication & Password Reset Setup Guide

## Overview
This guide walks through configuring Supabase Authentication to enable password reset functionality for APSICS Media customers.

## Problem Solved
Previously, when customers needed to reset their password, the reset email links went to non-existent pages (404 errors), leaving them unable to access their accounts.

## Solution Implemented

### 1. Created Complete Password Reset Flow

**New Pages:**
- `/auth/callback` - Handles auth callbacks from Supabase emails
- `/auth/reset-password` - Password reset form
- `/auth/error` - Error page for invalid/expired links

**New Components:**
- `components/auth/password-reset-form.tsx` - Reusable password reset form

**Updated Pages:**
- `app/success/success-client.tsx` - Added "Forgot password?" link
- `components/shared/auth-modal.tsx` - Added password recovery option

### 2. Required Supabase Dashboard Configuration

**⚠️ IMPORTANT: You must configure these settings in Supabase Dashboard**

#### Step 1: Set Site URL
Go to: **Authentication → URL Configuration**

Set the following:
```
Site URL: https://apsicsmedia.com
```

#### Step 2: Configure Redirect URLs
In the same **URL Configuration** section, add these redirect URLs:

```
Redirect URLs (one per line):
https://apsicsmedia.com/auth/callback
https://apsicsmedia.com/auth/reset-password
https://apsicsmedia.com/auth/error
http://localhost:3000/auth/callback
http://localhost:3000/auth/reset-password
```

The localhost URLs allow testing locally.

#### Step 3: Verify Email Templates
Go to: **Authentication → Email Templates**

**For "Reset Password" template:**
- Ensure the "Confirm your mail" link uses: `{{ .ConfirmationURL }}`
- The template should redirect to your Site URL + `/auth/callback`

**Default template should work, but if customized, ensure it includes:**
```html
<a href="{{ .ConfirmationURL }}">Reset Password</a>
```

### 3. How the Flow Works

#### User Requests Password Reset:
1. User clicks "Forgot password?" on sign-in form
2. Enters email address
3. Clicks "Send Reset Link"
4. Receives confirmation: "Check your email"

#### User Receives Email:
1. Email sent from Supabase with reset link
2. Link format: `https://apsicsmedia.com/auth/callback?token=xxx&type=recovery`
3. Link expires in 1 hour

#### User Clicks Reset Link:
1. Lands on `/auth/callback` route
2. Code exchanges token for session
3. Redirects to `/auth/reset-password`
4. User enters new password twice
5. Password updated successfully
6. Redirects to dashboard after 3 seconds

#### Error Handling:
- Invalid/expired links → `/auth/error` page
- Failed password update → Error shown on form
- All errors include support contact info

### 4. Testing the Flow

#### Test Password Reset:
1. Go to https://apsicsmedia.com/success (or any page with sign-in)
2. Click "Forgot your password?"
3. Enter a test email (must be existing user)
4. Check inbox for reset email
5. Click link in email
6. Should land on password reset page
7. Enter new password (min 8 characters)
8. Confirm it works by signing in

#### Test Error Handling:
1. Try an expired link → Should show error page
2. Try mismatched passwords → Should show validation error
3. Try password < 8 chars → Should show validation error

### 5. Customer Support Instructions

**When a customer can't access their account:**

**Option 1: Self-Service (Recommended)**
Tell them to:
1. Go to https://apsicsmedia.com/success
2. Click "Forgot your password?"
3. Enter their email
4. Check email for reset link
5. Click link and set new password

**Option 2: Manual Reset (Supabase Dashboard)**
1. Go to https://supabase.com/dashboard/project/pwtxocetgpctnjtesynk/auth/users
2. Find user by email
3. Click on the user
4. Click "Send password recovery email"
5. Customer receives email with reset link

**Option 3: Manual Password Override (Last Resort)**
1. Go to Supabase Dashboard → Auth → Users
2. Find the user
3. Click "Reset password"
4. Set temporary password
5. Send to customer securely (not via email!)
6. Have them change it on first login

### 6. Environment Variables

No new environment variables needed. The flow uses existing:
```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 7. Files Modified/Created

**New Files:**
```
app/auth/callback/route.ts
app/auth/reset-password/page.tsx
app/auth/error/page.tsx
components/auth/password-reset-form.tsx
AUTH_SETUP_GUIDE.md (this file)
```

**Modified Files:**
```
app/success/success-client.tsx
components/shared/auth-modal.tsx
```

### 8. Common Issues & Solutions

**Issue: Reset email not received**
- Check spam folder
- Verify email exists in Supabase Auth users
- Check Supabase email logs (Dashboard → Authentication → Logs)

**Issue: Link goes to 404**
- Verify Site URL set in Supabase Dashboard
- Verify redirect URLs include `/auth/callback`
- Check email template uses `{{ .ConfirmationURL }}`

**Issue: "Invalid session" on reset page**
- Link may be expired (1 hour limit)
- Send new reset email
- Check if user already used the link (one-time use)

**Issue: Password reset works but credits not showing**
- This is a separate webhook issue (see SIGNUP_FLOW_CHANGES.md)
- User credentials work, but Stripe webhook failed to grant credits
- Need to manually link stripe_customer_id to profile

### 9. Rollback Plan

If issues arise, you can disable the forgot password links:

1. Comment out in `app/success/success-client.tsx`:
```tsx
// <button onClick={() => setShowPasswordReset(true)}>
//   Forgot your password?
// </button>
```

2. Comment out in `components/shared/auth-modal.tsx`:
```tsx
// {mode === 'sign-in' && (
//   <button onClick={() => setShowPasswordReset(true)}>
//     Forgot password?
//   </button>
// )}
```

The callback and reset pages will still work if customers have direct links.

### 10. Next Steps

1. ✅ Configure Supabase Dashboard settings (see Step 2 above)
2. ✅ Test complete flow with a real customer email
3. ✅ Update customer support documentation
4. ✅ Monitor error logs for any issues
5. ✅ Consider adding password strength indicator (future enhancement)
6. ✅ Consider adding "remember me" functionality (future enhancement)

## Support Contact

For issues with authentication:
- Email: brian@apsicsmedia.com
- Include: Customer email, error message, time of occurrence
