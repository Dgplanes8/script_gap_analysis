#!/bin/bash

# API Testing Script for Monday Morning Marketer
# Run this after starting the dev server (npm run dev)

echo "🧪 Testing Monday Morning Marketer APIs"
echo "======================================"

# Check if server is running
SERVER_URL="http://localhost:3000"
echo ""
echo "🔍 Checking if dev server is running..."

if ! curl -s $SERVER_URL > /dev/null; then
    echo "❌ Dev server is not running. Please start it with 'npm run dev'"
    exit 1
fi

echo "✅ Dev server is running"

echo ""
echo "📧 Testing email subscription API..."
curl -X POST $SERVER_URL/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test User"}' \
  -w "\nStatus: %{http_code}\n"

echo ""
echo ""
echo "📋 Testing Airtable submission API..."
curl -X POST $SERVER_URL/api/airtable-submit \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "company":"Test Company",
    "appType":"Fitness",
    "currentCTR":"2.5%",
    "currentTSR":"12%",
    "painPoints":"Low conversion rates on Facebook ads",
    "goals":"Improve CTR and reduce customer acquisition cost",
    "budget":"$5,000-$10,000",
    "timeline":"Next 30 days"
  }' \
  -w "\nStatus: %{http_code}\n"

echo ""
echo ""
echo "🏁 API testing complete!"
echo ""
echo "Expected results:"
echo "- Email API: Should return 200 status and success message"
echo "- Airtable API: Should return 200 status and success message"
echo ""
echo "If you see 500 errors, check that your environment variables are set correctly in .env.local"