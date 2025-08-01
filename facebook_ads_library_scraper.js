const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function findFacebookPageID(brandName, searchUrl) {
  const browser = await chromium.launch({ 
    headless: false, // Set to false so we can see what's happening
    slowMo: 1000 // Add delay between actions
  });
  
  const page = await browser.newPage();
  
  try {
    console.log(`🔍 Searching for ${brandName}...`);
    
    // Navigate to Facebook Ads Library
    await page.goto(searchUrl, { waitUntil: 'networkidle' });
    
    // Wait for the page to load
    await page.waitForTimeout(3000);
    
    // Take a screenshot of the initial page
    await page.screenshot({ 
      path: `facebook_ads_${brandName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_initial.png`,
      fullPage: true 
    });
    
    // Clear the search box and search for the brand
    const searchBox = page.locator('input[placeholder*="search"], input[type="search"], input[aria-label*="search"]');
    await searchBox.fill('');
    await searchBox.fill(brandName);
    await page.keyboard.press('Enter');
    
    // Wait for search results
    await page.waitForTimeout(5000);
    
    // Take a screenshot of search results
    await page.screenshot({ 
      path: `facebook_ads_${brandName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_search_results.png`,
      fullPage: true 
    });
    
    // Look for page results and extract page IDs
    const pageResults = await page.evaluate((brand) => {
      const results = [];
      
      // Look for different possible selectors for page results
      const possibleSelectors = [
        'a[href*="view_all_page_id"]',
        'a[href*="page_id"]',
        '[data-testid*="page"]',
        'a[href*="facebook.com"]',
        '.page-result',
        '[class*="page"]'
      ];
      
      possibleSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const href = element.href || element.getAttribute('href');
          const text = element.textContent?.trim();
          
          if (href && text) {
            // Check if this looks like a page result for our brand
            const lowerText = text.toLowerCase();
            const lowerBrand = brand.toLowerCase();
            
            if (lowerText.includes(lowerBrand) || 
                lowerText.includes('official') ||
                lowerText.includes('verified')) {
              
              // Extract page ID from URL
              const pageIdMatch = href.match(/view_all_page_id=(\d+)/);
              const pageId = pageIdMatch ? pageIdMatch[1] : null;
              
              results.push({
                text: text,
                href: href,
                pageId: pageId,
                element: element.outerHTML.substring(0, 200)
              });
            }
          }
        });
      });
      
      return results;
    }, brandName);
    
    console.log(`Found ${pageResults.length} potential page results for ${brandName}`);
    
    // Look for "See all ads from this Page" links
    let pageId = null;
    
    try {
      // Try to find and click "See all ads from this Page" link
      const seeAllAdsLink = page.locator('text=/See all ads from.*Page/i').first();
      
      if (await seeAllAdsLink.isVisible()) {
        await seeAllAdsLink.click();
        await page.waitForTimeout(3000);
        
        // Extract page ID from URL
        const currentUrl = page.url();
        const pageIdMatch = currentUrl.match(/view_all_page_id=(\d+)/);
        if (pageIdMatch) {
          pageId = pageIdMatch[1];
          console.log(`✅ Found page ID for ${brandName}: ${pageId}`);
        }
        
        // Take screenshot of the page with all ads
        await page.screenshot({ 
          path: `facebook_ads_${brandName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_page_ads.png`,
          fullPage: true 
        });
      }
    } catch (error) {
      console.log(`Could not find "See all ads" link for ${brandName}`);
    }
    
    await browser.close();
    
    return {
      brandName: brandName,
      pageId: pageId,
      pageResults: pageResults,
      screenshots: [
        `facebook_ads_${brandName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_initial.png`,
        `facebook_ads_${brandName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_search_results.png`,
        pageId ? `facebook_ads_${brandName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_page_ads.png` : null
      ].filter(Boolean)
    };
    
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function findAllPageIDs() {
  const brands = [
    { name: 'Brex', searchTerm: 'Brex corporate card' },
    { name: 'Divvy', searchTerm: 'Divvy BILL Spend Expense' },
    { name: 'Bill.com', searchTerm: 'Bill.com' },
    { name: 'Airbase', searchTerm: 'Airbase corporate spend management' }
  ];
  
  const baseUrl = 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=';
  
  const results = {};
  
  for (const brand of brands) {
    console.log(`\n🔍 Processing ${brand.name}...`);
    
    try {
      const searchUrl = baseUrl + encodeURIComponent(brand.searchTerm);
      const result = await findFacebookPageID(brand.name, searchUrl);
      results[brand.name] = result;
      
      // Add delay between brand searches
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error) {
      console.error(`❌ Failed to find page ID for ${brand.name}:`, error.message);
      results[brand.name] = { 
        brandName: brand.name, 
        error: error.message,
        pageId: null 
      };
    }
  }
  
  // Save results
  await fs.writeFile('facebook_page_ids_results.json', JSON.stringify(results, null, 2));
  
  // Print summary
  console.log('\n📋 SUMMARY OF FINDINGS:');
  console.log('- Ramp: 103437121012366 (already known)');
  
  for (const [brandName, result] of Object.entries(results)) {
    if (result.pageId) {
      console.log(`- ${brandName}: ${result.pageId}`);
    } else {
      console.log(`- ${brandName}: [NOT FOUND - check screenshots]`);
    }
  }
  
  return results;
}

// Main execution
async function main() {
  console.log('🚀 Starting Facebook Ads Library page ID search...');
  
  try {
    const results = await findAllPageIDs();
    console.log('\n✅ Search completed! Check the generated screenshots and facebook_page_ids_results.json for details.');
    return results;
  } catch (error) {
    console.error('❌ Search failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { findFacebookPageID, findAllPageIDs };