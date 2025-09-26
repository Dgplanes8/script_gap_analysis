#!/bin/bash

# Stripe Testing Script
# Make sure you've run: ~/bin/stripe login
# Make sure you've started webhook forwarding

echo "🧪 Stripe Integration Testing Script"
echo "===================================="

# Test webhook-only scenarios
echo ""
echo "1. Testing webhook events directly..."
echo ""

echo "📝 Testing Essentials tier (150 credits)..."
~/bin/stripe trigger checkout.session.completed --add checkout_session:metadata:credit_amount=150

echo ""
echo "📝 Testing Studio tier (800 credits + research mode)..."
~/bin/stripe trigger checkout.session.completed --add checkout_session:metadata:credit_amount=800 --add checkout_session:metadata:unlock_research_mode=true

echo ""
echo "📝 Testing Concierge tier (2000 credits)..."
~/bin/stripe trigger checkout.session.completed --add checkout_session:metadata:credit_amount=2000

echo ""
echo "📝 Testing subscription cancellation..."
~/bin/stripe trigger customer.subscription.updated --add subscription:status=canceled

echo ""
echo "📝 Testing expired checkout..."
~/bin/stripe trigger checkout.session.expired

echo ""
echo "📝 Testing failed payment..."
~/bin/stripe trigger checkout.session.async_payment_failed

echo ""
echo "✅ Webhook tests completed!"
echo ""
echo "Next steps:"
echo "1. Check your Stripe CLI terminal for webhook events"
echo "2. Check Supabase profiles table for credit updates"
echo "3. Test full checkout flow at http://localhost:3001"
echo "4. Use test card: 4242 4242 4242 4242"