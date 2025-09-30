# iOS Shortcut Build Guide for APSICS Ad Saver
## Creating the Shareable iOS Shortcut

This guide shows you how to build the APSICS Ad Saver shortcut from scratch that users can install to save Meta/Instagram ads.

---

## Part 1: Building the Shortcut on Your iPhone

### Step 1: Open Shortcuts App
1. Open the **Shortcuts** app on your iPhone
2. Tap the **"+"** button in the top right to create a new shortcut
3. Tap the shortcut name at the top and rename it to **"APSICS Ad Saver"**

### Step 2: Add Share Sheet Input
1. Tap **"Add Action"**
2. Search for **"Receive"** and select **"Receive [input] input from Share Sheet"**
3. Tap **"input"** and change it to **"Any"** or **"URLs"**
4. This allows the shortcut to receive content when sharing from other apps

### Step 3: Configure Variables (User Token)
This creates a placeholder for users to paste their token:

1. Tap **"Add Action"**
2. Search for **"Text"** and select the **"Text"** action
3. In the text field, type: `YOUR_TOKEN_HERE`
4. Tap and hold the text action, then select **"Rename"**
5. Name this variable: **"APSICS_TOKEN"**

### Step 4: Set Webhook URL
1. Tap **"Add Action"**
2. Search for **"Text"** and select **"Text"** action again
3. In the text field, type: `https://pwtxocetgpctnjtesynk.supabase.co/functions/v1/capture-shared-ad`
4. Tap and hold, then **"Rename"** to: **"webhookUrl"**

### Step 5: Set Supabase Anon Key
1. Tap **"Add Action"**
2. Search for **"Text"** and select **"Text"** action
3. In the text field, paste your Supabase anon key:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHhvY2V0Z3BjdG5qdGVzeW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNTYxNjEsImV4cCI6MjA3MzYzMjE2MX0.SL3ZDNbs90KdnHtGTABy4WqYOp8UxwhygKEhMCvt4Fs
   ```
4. Tap and hold, then **"Rename"** to: **"anonKey"**

### Step 6: Extract URL from Share Sheet
1. Tap **"Add Action"**
2. Search for **"Get URLs"** and select **"Get URLs from [Input]"**
3. Tap **"Input"** and change it to **"Shortcut Input"**
4. This extracts the URL from whatever was shared

### Step 7: Create Request Body
1. Tap **"Add Action"**
2. Search for **"Dictionary"** and select **"Dictionary"**
3. Configure the dictionary with these keys and values:
   - **Key**: `adUrl`
     - **Value**: Tap the field → Variables → Select **"URLs"**
   - Tap **"+"** to add another item
   - **Key**: `source`
     - **Value**: Type `ios_shortcut` as plain text

The dictionary should look like:
```
{
  "adUrl": [URLs variable],
  "source": "ios_shortcut"
}
```

### Step 8: Make API Request
1. Tap **"Add Action"**
2. Search for **"Get Contents of URL"** and select it
3. Configure the request:

   **URL Field:**
   - Tap the URL field
   - Tap **"Select Variable"**
   - Choose **"webhookUrl"**

   **Method:**
   - Tap **"Show More"** to expand options
   - Change **"Method"** to **"POST"**

   **Headers:**
   - Tap **"Add new field"** under Headers
   - **Header 1:**
     - Field: `X-APSICS-Share-Token`
     - Value: Tap and select variable **"APSICS_TOKEN"**
   - **Header 2:**
     - Field: `apikey`
     - Value: Tap and select variable **"anonKey"**
   - **Header 3:**
     - Field: `Content-Type`
     - Value: Type `application/json`

   **Request Body:**
   - Change **"Request Body"** to **"JSON"**
   - Tap the body field
   - Select variable: **"Dictionary"** (from Step 7)

### Step 9: Parse Response
1. Tap **"Add Action"**
2. Search for **"Get Dictionary Value"** and select it
3. Configure:
   - **Get**: `message`
   - **from**: Tap and select **"Contents of URL"**

### Step 10: Show Notification
1. Tap **"Add Action"**
2. Search for **"Show Notification"** and select it
3. Configure the notification:
   - **Title**: `Ad Saved!`
   - **Body**: Tap and select variable **"Dictionary Value"**

This will show "Ad Saved!" with the confirmation message from the server.

### Step 11: Add Error Handling (Optional but Recommended)
1. Long-press the **"Get Contents of URL"** action
2. Tap **"If There's No Result"**
3. This adds a conditional block
4. In the **"Otherwise"** section:
   - Add a **"Show Notification"** action
   - Title: `Error Saving Ad`
   - Body: `Please check your token and try again.`

---

## Part 2: Testing the Shortcut

### Test Locally First:
1. Open **Safari** on your iPhone
2. Go to any Facebook Ads Library URL (e.g., `https://www.facebook.com/ads/library/?id=123456`)
3. Tap the **Share** button
4. Scroll down and select **"APSICS Ad Saver"**
5. It should fail (expected - you haven't added your token yet)

### Add Your Token:
1. Go to `https://apsicsmedia.com/custom-ad-iteration-tool`
2. Sign in and generate a token
3. Copy the token
4. Open **Shortcuts** app
5. Tap **"APSICS Ad Saver"** → tap the **"..."** menu
6. Find the **"Text"** action with `YOUR_TOKEN_HERE`
7. Tap it and replace with your actual token
8. Tap **"Done"**

### Test Again:
1. Open **Facebook** or **Instagram** app
2. Find a sponsored ad
3. Tap **Share** → **"APSICS Ad Saver"**
4. You should see "Ad Saved!" notification
5. Check your email for confirmation
6. Visit the tool page to see the ad in your table

---

## Part 3: Sharing the Shortcut with Users

### Option A: Share via iCloud Link (Recommended)

1. **Open Shortcuts App**
2. **Long-press** the APSICS Ad Saver shortcut
3. Tap **"Share"**
4. Choose **"Copy iCloud Link"**
5. This creates a URL like: `https://www.icloud.com/shortcuts/xxxxxxxxxxxxx`

**IMPORTANT**: Before sharing:
- Make sure the **"APSICS_TOKEN"** variable is set to `YOUR_TOKEN_HERE` (placeholder text)
- Do NOT share your personal token in the shortcut
- Users will replace this with their own token after installing

6. **Share this link** in:
   - Email campaigns
   - Help documentation
   - Setup instructions page
   - Onboarding emails

### Option B: Share via AirDrop (For Local Testing)

1. Long-press the shortcut
2. Tap **"Share"**
3. Choose **"AirDrop"**
4. Send to another nearby iPhone

### Option C: Embed Link on Website

Add this to your setup instructions page:

```html
<a href="https://www.icloud.com/shortcuts/your-shortcut-id"
   class="btn btn-primary">
  📲 Download APSICS Ad Saver Shortcut
</a>
```

---

## Part 4: Creating User Setup Instructions

Once you've shared the iCloud link, users need these steps:

### User Instructions (What to Tell Your Users):

**1. Install the Shortcut**
- Tap this link on your iPhone: [Your iCloud Link]
- Tap **"Get Shortcut"**
- Review the actions (optional)
- Tap **"Add Shortcut"**

**2. Get Your Personal Token**
- Visit https://apsicsmedia.com/custom-ad-iteration-tool
- Sign in to your account
- Click **"Generate Token"** → **"Create New Token"**
- Copy the token (save it somewhere safe)

**3. Configure the Shortcut**
- Open the **Shortcuts** app
- Find **"APSICS Ad Saver"**
- Tap the **"..."** (three dots) to edit
- Find the text that says `YOUR_TOKEN_HERE`
- Tap it and paste your actual token
- Tap **"Done"**

**4. Start Saving Ads**
- Open Facebook or Instagram
- Find any sponsored ad
- Tap **Share** → **"APSICS Ad Saver"**
- You'll see "Ad Saved!" notification
- Check your email for confirmation
- Visit the tool to generate remixes

---

## Part 5: Troubleshooting Guide for Users

### "Shortcut Not Found" Error
- **Cause**: The shortcut was deleted or not installed
- **Fix**: Re-install from the iCloud link

### "Error Saving Ad" Notification
- **Cause 1**: Token not configured or incorrect
- **Fix**: Edit shortcut and verify token is correct
- **Cause 2**: Invalid ad URL
- **Fix**: Only share from Facebook/Instagram ads

### "Invalid Token" Error
- **Cause**: Token was revoked or incorrect
- **Fix**: Generate a new token from the website

### No Email Confirmation
- **Cause**: Email service delay or spam folder
- **Fix**: Check spam/junk folder, wait a few minutes

### Ad Not Appearing in Table
- **Cause**: Page not refreshed
- **Fix**: Refresh the tool page in your browser

---

## Advanced: Adding Platform Auto-Detection (Optional)

If you want the shortcut to automatically detect Facebook vs Instagram:

After **Step 6** (Get URLs), add:

1. **Add Action** → **"If"**
2. Configure: **If** [URLs] **contains** `facebook`
3. Inside the If block:
   - Add **"Text"** action with value: `facebook`
   - Rename to: `platform`
4. Tap **"Otherwise"**
5. Inside the Otherwise block:
   - Add another **"If"** → **If** [URLs] **contains** `instagram`
   - Add **"Text"** action with value: `instagram`
   - Rename to: `platform`
6. Update the **Dictionary** (Step 7) to include:
   - **Key**: `platform`
   - **Value**: [platform variable]

---

## Security Notes

**What Users Should Know:**
- ✅ Token is stored locally on their device only
- ✅ Token can be revoked anytime from the website
- ✅ No Facebook/Instagram credentials are collected
- ✅ Only ad URLs they explicitly share are saved
- ❌ Never share tokens with others
- ❌ Don't post tokens in public forums

**For You (Admin):**
- Tokens are hashed (SHA256) in the database
- Original tokens are never stored server-side
- Each user has unique tokens
- Tokens can be revoked via the dashboard
- Monitor failed auth attempts in Supabase logs

---

## Maintenance

### Updating the Shortcut:
If you need to update the webhook URL or logic:
1. Edit your master shortcut
2. Test thoroughly on your device
3. Re-share the updated iCloud link
4. Users will need to re-install (old link stays same if you update in place)

### Monitoring Usage:
- Check Supabase Edge Function logs
- Monitor `custom_ad_submissions` table growth
- Track token usage and revocations
- Watch for error patterns in logs

---

## Quick Reference: Complete Action List

1. **Receive** "URLs" from **Share Sheet**
2. **Text**: `YOUR_TOKEN_HERE` → Variable: `APSICS_TOKEN`
3. **Text**: `https://pwtxocetgpctnjtesynk.supabase.co/functions/v1/capture-shared-ad` → Variable: `webhookUrl`
4. **Text**: `[Your Anon Key]` → Variable: `anonKey`
5. **Get URLs** from **Shortcut Input**
6. **Dictionary**:
   - `adUrl`: [URLs]
   - `source`: `ios_shortcut`
7. **Get Contents of URL**: [webhookUrl]
   - Method: POST
   - Headers:
     - `X-APSICS-Share-Token`: [APSICS_TOKEN]
     - `apikey`: [anonKey]
     - `Content-Type`: `application/json`
   - Body: JSON [Dictionary]
8. **Get Dictionary Value**: `message` from [Contents of URL]
9. **Show Notification**:
   - Title: `Ad Saved!`
   - Body: [Dictionary Value]

---

## Support Resources

**For Users:**
- Setup Guide: `/docs/ios-shortcut-setup.md`
- Email Support: brian@apsicsmedia.com
- Tool Page: https://apsicsmedia.com/custom-ad-iteration-tool

**For Development:**
- Edge Function Logs: Supabase Dashboard → Functions → Logs
- Database: Supabase Dashboard → Table Editor
- Migration File: `supabase/migrations/20250929000000_create_custom_ad_workflow.sql`

---

**Last Updated**: 2025-09-29
**Version**: 1.0.0
**Compatibility**: iOS 15+ with Shortcuts app