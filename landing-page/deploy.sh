#!/bin/bash

# Monday Morning Marketer - Deployment Script
# Run this script to prepare for deployment

echo "🚀 Monday Morning Marketer - Deployment Preparation"
echo "=================================================="

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔍 Running linting and type checks..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix the issues before deploying."
    exit 1
fi

npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Type checking failed. Please fix the issues before deploying."
    exit 1
fi

echo ""
echo "🏗️ Testing build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the issues before deploying."
    exit 1
fi

echo ""
echo "✅ All checks passed! Ready for deployment."
echo ""
echo "Next steps:"
echo "1. Push your changes to GitHub"
echo "2. Connect your repository to Vercel"
echo "3. Set up environment variables in Vercel dashboard"
echo "4. Deploy!"
echo ""
echo "Environment variables needed:"
echo "- NEXT_PUBLIC_APP_URL"
echo "- ALLOWED_ORIGINS"
echo "- RESEND_API_KEY"
echo "- RESEND_AUDIENCE_ID (optional)"
echo "- NEXT_PUBLIC_FROM_EMAIL"
echo "- AIRTABLE_API_KEY"
echo "- AIRTABLE_BASE_ID"
echo "- AIRTABLE_TABLE_ID"
echo "- AIRTABLE_TABLE_NAME"
echo "- NEXT_PUBLIC_CALENDLY_URL (optional)"
echo "- NEXT_PUBLIC_GA_MEASUREMENT_ID (optional)"
echo ""
echo "📋 See deploy-checklist.md for complete setup guide"
