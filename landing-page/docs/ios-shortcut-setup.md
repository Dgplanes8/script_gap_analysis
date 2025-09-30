# iOS Shortcut Setup Guide
## APSICS Ad Saver - Custom Ad Iteration Tool

This guide will walk you through setting up the iOS Shortcut to save ads directly from Facebook/Instagram to your APSICS account.

---

## Prerequisites

1. **APSICS Account**: Sign up at [apsicsmedia.com](https://apsicsmedia.com)
2. **iOS Device**: iPhone or iPad running iOS 15 or later
3. **Shortcuts App**: Pre-installed on iOS (if deleted, re-download from App Store)

---

## Setup Steps

### Step 1: Generate Your Secure Token

1. Sign in to your APSICS account
2. Navigate to **Custom Ad Iteration Tool** at `/custom-ad-iteration-tool`
3. Click **"Generate Token"** in the iOS Shortcut Setup section
4. Click **"Create New Token"**
5. **IMPORTANT**: Copy the token immediately - it won't be shown again
6. Store the token securely (you'll need it in Step 3)

---

### Step 2: Install the APSICS Shortcut

**Option A: Download Pre-built Shortcut (Recommended)**

1. Open this link on your iPhone: [Download APSICS Ad Saver](https://www.icloud.com/shortcuts/apsics-ad-saver)
2. Tap **"Get Shortcut"**
3. Review permissions (needs network access to send data to APSICS)
4. Tap **"Add Shortcut"**

**Option B: Build Your Own Shortcut**

If you prefer to create the Shortcut manually:

1. Open **Shortcuts** app on your iPhone
2. Tap **"+"** to create a new shortcut
3. Name it **"APSICS Ad Saver"**
4. Add the following actions:

#### Shortcut Actions Configuration

```
1. [Receive] what [Anything] from [Share Sheet]

2. [Text] Set Variable to [shareToken]
   Value: YOUR_TOKEN_HERE  (paste your token from Step 1)

3. [Text] Set Variable to [webhookUrl]
   Value: https://YOUR_PROJECT_ID.supabase.co/functions/v1/capture-shared-ad

4. [Text] Set Variable to [anonKey]
   Value: YOUR_SUPABASE_ANON_KEY

5. [Get URLs from] [Shortcut Input]

6. [Set Variable] url to [URLs]

7. [Dictionary] Set Variable to [requestBody]
   {
     "adUrl": [url],
     "source": "ios_shortcut"
   }

8. [Get Contents of] [webhookUrl]
   Method: POST
   Headers:
     X-APSICS-Share-Token: [shareToken]
     apikey: [anonKey]
     Content-Type: application/json
   Request Body: JSON [requestBody]

9. [Get Dictionary Value] "message" from [Contents of URL]

10. [Show Notification]
    Title: "Ad Saved!"
    Body: [Dictionary Value]
```

---

### Step 3: Configure Shortcut Variables

1. Open **Shortcuts** app
2. Find **APSICS Ad Saver** in your shortcuts list
3. Tap **"..."** (more options) to edit the shortcut
4. Locate the **"Set Variable"** action for `shareToken`
5. **Paste your token** from Step 1 (replace `YOUR_TOKEN_HERE`)
6. For `webhookUrl`, replace `YOUR_PROJECT_ID` with your actual Supabase project ID
   - Find this in your APSICS dashboard or contact support
7. For `anonKey`, replace with your Supabase anonymous key
   - This should be pre-filled if using the downloaded shortcut
8. Tap **"Done"** to save changes

---

### Step 4: Test the Shortcut

1. Open **Facebook** or **Instagram** app
2. Navigate to any ad (look for "Sponsored" label)
3. Tap the **Share** button (usually three dots or share icon)
4. Scroll down and select **"APSICS Ad Saver"**
5. Wait for confirmation notification: **"Ad Saved!"**

**Troubleshooting if it doesn't work:**
- Ensure your token is pasted correctly (no extra spaces)
- Check that webhook URL and anon key are correct
- Try generating a new token
- Contact support at brian@apsicsmedia.com

---

### Step 5: View Your Saved Ads

1. Return to [APSICS Custom Ad Iteration Tool](https://apsicsmedia.com/custom-ad-iteration-tool)
2. Your saved ad should appear in the **"Your Saved Ads"** table
3. Select one or more ads and click **"Generate Custom Remix"**
4. Fill in your brand details and generate APSICS-crafted variations

---

## Security & Privacy

### Token Security
- **Never share your token** - it provides access to your APSICS account
- Store it securely in the iOS Shortcut only
- If compromised, revoke the token immediately and generate a new one
- Tokens can be revoked anytime from the APSICS dashboard

### What Data is Collected?
- **Ad URL**: The link to the Meta/Instagram ad you share
- **Platform**: Detected from the URL (Facebook/Instagram)
- **Company Name**: If detectable from the ad
- **Timestamp**: When you saved the ad

**We never collect:**
- Your Facebook/Instagram credentials
- Private messages or personal data
- Ad performance metrics (unless public)
- Information about ads you don't explicitly share

---

## Supported Platforms

Currently supported:
- ✅ Facebook Ads (via Ads Library URL)
- ✅ Instagram Ads (in-app share links)
- 🚧 TikTok Ads (coming soon)
- 🚧 YouTube Ads (coming soon)

---

## Frequently Asked Questions

### Q: Do I need to keep the Shortcuts app open?
**A:** No. Once configured, the shortcut runs instantly when you share an ad.

### Q: How many ads can I save?
**A:** Unlimited. Saving ads is always free. Credits are only used when generating remixes.

### Q: Can I use this on iPad?
**A:** Yes, if the iOS app supports sharing (Facebook/Instagram for iPad).

### Q: Will this work on Android?
**A:** Not yet. Android support is planned for a future release.

### Q: What if my token expires?
**A:** Tokens don't expire unless you revoke them. If needed, generate a new one anytime.

### Q: Can I share multiple ads at once?
**A:** Currently, you need to share ads one at a time. Batch import is planned.

---

## Need Help?

- **Email Support**: brian@apsicsmedia.com
- **Documentation**: [APSICS Help Center](https://apsicsmedia.com/help)
- **Status Page**: [status.apsicsmedia.com](https://status.apsicsmedia.com)

---

## Advanced: Shortcut Customization

### Add Company Name Auto-Detection

```
After "Get URLs from Input":

1. [Get Text from] [URLs] (extracts page content)
2. [Match Text] using pattern: "(?<=company_name|advertiser):\s*([^,}]+)"
3. [Add to Dictionary] [requestBody]
   Key: "companyName"
   Value: [Matches]
```

### Add Platform Auto-Detection

```
Before "Set Variable requestBody":

1. [If] [url] [contains] "facebook"
2.   [Set Variable] platform to "facebook"
3. [Otherwise] [If] [url] [contains] "instagram"
4.   [Set Variable] platform to "instagram"
5. [End If]

6. [Add to Dictionary] [requestBody]
   Key: "platform"
   Value: [platform]
```

---

## Changelog

**v1.0.0** (2025-09-29)
- Initial release
- Facebook & Instagram support
- Secure token authentication
- Email confirmation on save

---

Made with ❤️ by APSICS Media