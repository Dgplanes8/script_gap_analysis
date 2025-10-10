/**
 * Script to create account for existing paying customer
 *
 * Run with: npx tsx scripts/fix-existing-customer.ts <email> <stripe_customer_id>
 */

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://apsicsmedia.com';

async function fixCustomerAccount(email: string, stripeCustomerId: string, customerName?: string) {
  console.log(`\n🔧 Fixing account for: ${email}`);
  console.log(`   Stripe Customer: ${stripeCustomerId}\n`);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });

  const resend = new Resend(RESEND_API_KEY);

  try {
    // Step 1: Check if user already exists
    console.log('1️⃣  Checking for existing user...');
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users.find(u => u.email === email);

    let userId: string;

    if (existingUser) {
      console.log(`   ✅ User exists: ${existingUser.id}`);
      userId = existingUser.id;
    } else {
      // Step 2: Create auth user with temporary password
      console.log('2️⃣  Creating new auth user...');
      const tempPassword = `Temp${Math.random().toString(36).slice(2)}!`;

      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          name: customerName || '',
          created_by: 'admin_script',
          is_paying_customer: true,
        },
      });

      if (authError) {
        throw new Error(`Failed to create user: ${authError.message}`);
      }

      userId = authData.user.id;
      console.log(`   ✅ User created: ${userId}`);
      console.log(`   🔑 Temporary password: ${tempPassword}`);
    }

    // Step 3: Link profile to Stripe
    console.log('3️⃣  Linking profile to Stripe...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      throw new Error(`Failed to fetch profile: ${profileError.message}`);
    }

    if (profile?.stripe_customer_id && profile.stripe_customer_id !== stripeCustomerId) {
      console.log(`   ⚠️  Warning: Profile already linked to different Stripe customer`);
      console.log(`      Current: ${profile.stripe_customer_id}`);
      console.log(`      New: ${stripeCustomerId}`);
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        stripe_customer_id: stripeCustomerId,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'id'
      });

    if (updateError) {
      throw new Error(`Failed to link profile: ${updateError.message}`);
    }

    console.log(`   ✅ Profile linked to Stripe customer`);

    // Step 4: Check credits
    console.log('4️⃣  Checking credit balance...');
    const { data: updatedProfile } = await supabase
      .from('profiles')
      .select('credits_remaining')
      .eq('id', userId)
      .single();

    console.log(`   💰 Current credits: ${updatedProfile?.credits_remaining || 0}`);

    // Step 5: Send password reset email
    console.log('5️⃣  Sending password setup email...');

    const { data: resetData, error: resetError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
    });

    if (resetError) {
      console.log(`   ⚠️  Failed to generate magic link: ${resetError.message}`);
    }

    // Send custom email with password reset instructions
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #126DFB 0%, #0F5AD6 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px 20px; border: 1px solid #e0e0e0; border-top: none; }
    .button { display: inline-block; background: #126DFB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
    .code-box { background: #f8f8f8; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 14px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;">Your APSICS Media Account is Ready! 🎉</h1>
    </div>
    <div class="content">
      <p>Hi${customerName ? ` ${customerName}` : ''},</p>

      <p>Thanks for your Studio founding offer purchase! Your account has been set up and your credits are ready to use.</p>

      <h2>Set Your Password:</h2>
      <p>Click the button below to set your password and access your account:</p>

      ${resetData?.properties?.action_link ? `
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetData.properties.action_link}" class="button">Set My Password →</a>
      </div>
      ` : ''}

      <h2>Your Account Details:</h2>
      <div class="code-box">
        Email: ${email}<br>
        Credits: ${updatedProfile?.credits_remaining || 500}
      </div>

      <h2>Access Your Tools:</h2>
      <ul>
        <li><a href="${SITE_URL}/ai-ad-script-generator">AI Ad Script Generator</a></li>
        <li><a href="${SITE_URL}/ai-ad-iteration-tool">AI Ad Iteration Tool</a></li>
        <li><a href="${SITE_URL}/creative-brief-generator">Creative Brief Generator</a></li>
      </ul>

      <p>Need help? Reply to this email or contact <a href="mailto:brian@apsicsmedia.com">brian@apsicsmedia.com</a></p>

      <p>Best,<br>Brian & the APSICS Media Team</p>
    </div>
  </div>
</body>
</html>
`;

    try {
      await resend.emails.send({
        from: 'Brian at APSICS Media <brian@apsicsmedia.com>',
        to: [email],
        subject: 'Welcome to APSICS Media - Set Your Password',
        html: emailHtml,
      });
      console.log(`   ✅ Email sent to ${email}`);
    } catch (emailError) {
      console.log(`   ⚠️  Failed to send email: ${emailError}`);
    }

    // Summary
    console.log('\n✨ Account Fixed Successfully!\n');
    console.log('Summary:');
    console.log(`  User ID: ${userId}`);
    console.log(`  Email: ${email}`);
    console.log(`  Stripe Customer: ${stripeCustomerId}`);
    console.log(`  Credits: ${updatedProfile?.credits_remaining || 0}`);
    console.log(`  Password Reset: Email sent\n`);

    if (!existingUser) {
      console.log('⚠️  IMPORTANT: Customer should check their email and set a password.\n');
    }

  } catch (error) {
    console.error('\n❌ Error fixing account:', error);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`
Usage: npx tsx scripts/fix-existing-customer.ts <email> <stripe_customer_id> [name]

Example:
  npx tsx scripts/fix-existing-customer.ts customer@example.com cus_123456789 "John Doe"

This will:
1. Create auth user account (if doesn't exist)
2. Link profile to Stripe customer ID
3. Send password setup email
`);
  process.exit(1);
}

const [email, stripeCustomerId, customerName] = args;

fixCustomerAccount(email, stripeCustomerId, customerName);
