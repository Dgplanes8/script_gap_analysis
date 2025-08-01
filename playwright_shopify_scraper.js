const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function scrapeShopifyApp(appSlug) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    const url = `https://apps.shopify.com/${appSlug}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Extract app data
    const appData = await page.evaluate(() => {
      const data = {};
      
      // App title
      data.title = document.querySelector('h1')?.textContent?.trim() || '';
      
      // App description
      data.description = document.querySelector('[data-testid="app-description"]')?.textContent?.trim() || 
                        document.querySelector('meta[name="description"]')?.content || '';
      
      // Developer name
      data.developer = document.querySelector('[data-testid="developer-name"]')?.textContent?.trim() || '';
      
      // Rating
      const ratingElement = document.querySelector('[data-testid="rating"]');
      data.rating = ratingElement?.textContent?.trim() || '';
      
      // Review count
      const reviewElement = document.querySelector('[data-testid="review-count"]');
      data.reviewCount = reviewElement?.textContent?.trim() || '';
      
      // Pricing
      const pricingElements = document.querySelectorAll('[data-testid*="pricing"], .pricing, [class*="price"]');
      data.pricing = Array.from(pricingElements).map(el => el.textContent?.trim()).filter(Boolean);
      
      // Features - look for bullet points or feature lists
      const featureElements = document.querySelectorAll('li, [data-testid*="feature"], [class*="feature"]');
      data.features = Array.from(featureElements)
        .map(el => el.textContent?.trim())
        .filter(text => text && text.length > 10 && text.length < 200)
        .slice(0, 20); // Limit to top 20 features
      
      // Key benefits (often in hero section)
      const benefitElements = document.querySelectorAll('[class*="benefit"], [class*="highlight"], h2, h3');
      data.benefits = Array.from(benefitElements)
        .map(el => el.textContent?.trim())
        .filter(text => text && text.length > 5 && text.length < 150)
        .slice(0, 10);
      
      return data;
    });
    
    // Get recent reviews if available
    try {
      const reviewsLink = await page.locator('a[href*="reviews"]').first();
      if (await reviewsLink.isVisible()) {
        await reviewsLink.click();
        await page.waitForLoadState('networkidle');
        
        const reviews = await page.evaluate(() => {
          const reviewElements = document.querySelectorAll('[data-testid*="review"], [class*="review"]');
          return Array.from(reviewElements).slice(0, 10).map(el => {
            const rating = el.querySelector('[data-testid*="rating"], [class*="rating"]')?.textContent?.trim();
            const text = el.querySelector('[data-testid*="text"], [class*="text"], p')?.textContent?.trim();
            const author = el.querySelector('[data-testid*="author"], [class*="author"]')?.textContent?.trim();
            return { rating, text, author };
          }).filter(review => review.text);
        });
        
        appData.reviews = reviews;
      }
    } catch (reviewError) {
      console.log(`Could not scrape reviews for ${appSlug}:`, reviewError.message);
      appData.reviews = [];
    }
    
    await browser.close();
    return appData;
    
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function scrapeMultipleApps(appSlugs, outputDir) {
  const results = {};
  
  for (const appSlug of appSlugs) {
    console.log(`Scraping ${appSlug}...`);
    try {
      results[appSlug] = await scrapeShopifyApp(appSlug);
      console.log(`✅ Successfully scraped ${appSlug}`);
      
      // Add delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Failed to scrape ${appSlug}:`, error.message);
      results[appSlug] = { error: error.message };
    }
  }
  
  // Save results
  const outputFile = path.join(outputDir, 'app_data.json');
  await fs.writeFile(outputFile, JSON.stringify(results, null, 2));
  console.log(`📄 Results saved to: ${outputFile}`);
  
  return results;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const appsArg = args.find(arg => arg.startsWith('--apps='));
  const outputArg = args.find(arg => arg.startsWith('--output='));
  
  if (!appsArg || !outputArg) {
    console.log('Usage: node playwright_shopify_scraper.js --apps=app1,app2,app3 --output=/path/to/output/dir');
    process.exit(1);
  }
  
  const appSlugs = appsArg.split('=')[1].split(',');
  const outputDir = outputArg.split('=')[1];
  
  console.log(`🚀 Starting Shopify app scraping for: ${appSlugs.join(', ')}`);
  
  try {
    await scrapeMultipleApps(appSlugs, outputDir);
    console.log('✅ Scraping completed successfully!');
  } catch (error) {
    console.error('❌ Scraping failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { scrapeShopifyApp, scrapeMultipleApps };