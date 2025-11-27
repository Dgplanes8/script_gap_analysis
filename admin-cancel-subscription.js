#!/usr/bin/env node
/**
 * Admin Script: Cancel Stripe Subscription
 *
 * Usage: node admin-cancel-subscription.js <email>
 * Example: node admin-cancel-subscription.js Mike@americafirst
 *
 * Required: STRIPE_SECRET_KEY environment variable
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function cancelSubscription(email) {
  try {
    console.log(`🔍 Searching for customer: ${email}`);

    // Find customer by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1
    });

    if (customers.data.length === 0) {
      console.log(`❌ No customer found with email: ${email}`);
      return;
    }

    const customer = customers.data[0];
    console.log(`✅ Found customer: ${customer.id} - ${customer.name || 'No name'}`);

    // Get all active subscriptions for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 100
    });

    if (subscriptions.data.length === 0) {
      console.log(`ℹ️  No active subscriptions found for ${email}`);
      return;
    }

    console.log(`\n📋 Found ${subscriptions.data.length} active subscription(s):\n`);

    // Display and cancel each subscription
    for (const subscription of subscriptions.data) {
      console.log(`Subscription ID: ${subscription.id}`);
      console.log(`Status: ${subscription.status}`);
      console.log(`Created: ${new Date(subscription.created * 1000).toLocaleDateString()}`);
      console.log(`Current period end: ${new Date(subscription.current_period_end * 1000).toLocaleDateString()}`);

      if (subscription.items.data.length > 0) {
        console.log(`Plan: ${subscription.items.data[0].price.id}`);
      }

      // Cancel the subscription immediately
      console.log(`\n🚫 Canceling subscription ${subscription.id}...`);
      const canceledSubscription = await stripe.subscriptions.cancel(subscription.id);

      console.log(`✅ Subscription canceled successfully!`);
      console.log(`Status: ${canceledSubscription.status}`);
      console.log(`Canceled at: ${new Date(canceledSubscription.canceled_at * 1000).toLocaleString()}\n`);
    }

    console.log(`\n✅ All subscriptions for ${email} have been canceled.`);
    console.log(`💡 The customer will not be charged again.`);

  } catch (error) {
    console.error(`\n❌ Error canceling subscription:`, error.message);
    process.exit(1);
  }
}

// Main execution
const email = process.argv[2];

if (!email) {
  console.error('❌ Error: Email address required');
  console.log('\nUsage: node admin-cancel-subscription.js <email>');
  console.log('Example: node admin-cancel-subscription.js Mike@americafirst\n');
  process.exit(1);
}

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ Error: STRIPE_SECRET_KEY environment variable not set');
  console.log('\nPlease set your Stripe secret key:');
  console.log('export STRIPE_SECRET_KEY=sk_live_...\n');
  process.exit(1);
}

cancelSubscription(email);
