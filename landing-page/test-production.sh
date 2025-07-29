#!/bin/bash

# Production Testing Script for Monday Morning Marketer
# Usage: ./test-production.sh https://your-vercel-url.vercel.app

if [ -z "$1" ]; then
    echo "❌ Please provide your production URL"
    echo "Usage: ./test-production.sh https://your-vercel-url.vercel.app"
    exit 1
fi

PROD_URL="$1"
echo "🧪 Testing Monday Morning Marketer Production Deployment"
echo "======================================================"
echo "URL: $PROD_URL"
echo ""

# Test homepage
echo "🏠 Testing homepage..."
HOMEPAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL")
if [ "$HOMEPAGE_STATUS" -eq 200 ]; then
    echo "✅ Homepage loads successfully (Status: $HOMEPAGE_STATUS)"
else
    echo "❌ Homepage failed (Status: $HOMEPAGE_STATUS)"
fi

# Test all pages
PAGES=("/get-featured" "/pilot" "/990" "/success")
echo ""
echo "📄 Testing all pages..."

for page in "${PAGES[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL$page")
    if [ "$STATUS" -eq 200 ]; then
        echo "✅ $page loads successfully (Status: $STATUS)"
    else
        echo "❌ $page failed (Status: $STATUS)"
    fi
done

# Test API endpoints with OPTIONS first (CORS)
echo ""
echo "🔧 Testing API endpoints..."

echo "📧 Testing email subscription API..."
EMAIL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "$PROD_URL/api/subscribe" \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","firstName":"Test User"}')

if [ "$EMAIL_STATUS" -eq 200 ]; then
    echo "✅ Email API working (Status: $EMAIL_STATUS)"
else
    echo "⚠️  Email API returned status: $EMAIL_STATUS (check environment variables)"
fi

echo "📋 Testing Airtable submission API..."
AIRTABLE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "$PROD_URL/api/airtable-submit" \
    -H "Content-Type: application/json" \
    -d '{
        "name":"Test User",
        "email":"test@example.com", 
        "company":"Test Company",
        "appType":"Fitness",
        "currentCTR":"2.5%",
        "currentTSR":"12%",
        "painPoints":"Testing deployment",
        "goals":"Verify API functionality",
        "budget":"$5,000-$10,000",
        "timeline":"Next 30 days"
    }')

if [ "$AIRTABLE_STATUS" -eq 200 ]; then
    echo "✅ Airtable API working (Status: $AIRTABLE_STATUS)"
else
    echo "⚠️  Airtable API returned status: $AIRTABLE_STATUS (check environment variables)"
fi

# Test static files
echo ""
echo "📁 Testing static files..."

SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/sitemap.xml")
if [ "$SITEMAP_STATUS" -eq 200 ]; then
    echo "✅ Sitemap accessible (Status: $SITEMAP_STATUS)"
else
    echo "❌ Sitemap not found (Status: $SITEMAP_STATUS)"
fi

ROBOTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/robots.txt")
if [ "$ROBOTS_STATUS" -eq 200 ]; then
    echo "✅ Robots.txt accessible (Status: $ROBOTS_STATUS)"
else
    echo "❌ Robots.txt not found (Status: $ROBOTS_STATUS)"
fi

# Test 404 handling
echo ""
echo "🔍 Testing 404 handling..."
NOT_FOUND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/non-existent-page")
if [ "$NOT_FOUND_STATUS" -eq 404 ]; then
    echo "✅ 404 handling works correctly (Status: $NOT_FOUND_STATUS)"
else
    echo "⚠️  404 handling returned: $NOT_FOUND_STATUS"
fi

# Check SSL
echo ""
echo "🔒 Testing SSL certificate..."
SSL_CHECK=$(curl -s -I "$PROD_URL" | head -n 1)
if [[ $SSL_CHECK == *"200"* ]]; then
    echo "✅ SSL certificate working"
else
    echo "⚠️  SSL check: $SSL_CHECK"
fi

echo ""
echo "🏁 Production testing complete!"
echo ""
echo "📊 Summary:"
echo "- Homepage: $HOMEPAGE_STATUS"
echo "- Email API: $EMAIL_STATUS"  
echo "- Airtable API: $AIRTABLE_STATUS"
echo "- Sitemap: $SITEMAP_STATUS"
echo "- Robots.txt: $ROBOTS_STATUS"
echo "- 404 handling: $NOT_FOUND_STATUS"
echo ""
echo "🔍 Next steps:"
echo "1. Test forms manually in browser"
echo "2. Check email delivery"
echo "3. Verify Airtable submissions"
echo "4. Test mobile responsiveness"
echo "5. Run PageSpeed Insights: https://pagespeed.web.dev/"
echo "6. Test social media previews"
echo ""
echo "🎯 Performance check: https://pagespeed.web.dev/analysis?url=$PROD_URL"