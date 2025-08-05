#!/bin/bash

# List of files to update (excluding already updated ones)
files=(
  "/Users/nataliebasque/Ad Workflow/landing-page/app/1m-arr-marketing-playbook/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/cac-optimization-calculator/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/consumer-attribution-framework/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/consumer-subscription-marketing-guide/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/facebook-ad-hooks-d2c-subscription-marketing/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/marketing-attribution-framework/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/reduce-customer-acquisition-cost-subscription-business/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/saas-creative-strategy-roi-calculator/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/saas-growth-marketing-guide/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/subscription-marketing-strategy-guide/page.tsx"
  "/Users/nataliebasque/Ad Workflow/landing-page/app/tiktok-hooks-subscription-business-marketing/page.tsx"
)

echo "Updating headers in strategic resource pages..."

for file in "${files[@]}"; do
  if [[ -f "$file" ]]; then
    echo "Updating: $file"
    
    # Add Header import if not already present
    if ! grep -q "import { Header }" "$file"; then
      # Find the last import line and add Header import after it
      sed -i '' '/^import.*from.*$/a\
import { Header } from '"'"'@/components/layout/header'"'"';
' "$file"
    fi
    
    # Replace the custom header section with Header component
    # This is a more complex replacement, so we'll do it with a more targeted approach
    
  else
    echo "File not found: $file"
  fi
done

echo "Header updates completed!"