#!/usr/bin/env python3
"""
Apify Facebook Ads Library Scraper
Dynamic script for scraping competitor ads for any brand workflow
"""

import os
import json
import requests
import time
import argparse
from datetime import datetime
from typing import List, Dict, Optional

class ApifyFacebookAdsScraper:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.apify.com/v2"
        self.actor_id = "JJghSZmShuco4j9gJ"  # Facebook Ads Library scraper
        
    def get_facebook_page_urls(self, brand_config: Dict) -> List[str]:
        """Get Facebook Ad Library URLs using configuration"""
        
        # Use the specific Ramp URL from config if available
        if 'ramp_ads_library_url' in brand_config:
            return [brand_config['ramp_ads_library_url']]
        
        # Fallback to page ID construction
        brands = brand_config.get("brands_to_scrape", [])
        page_ids = {
            "Ramp": "103437121012366",  # Ramp's actual Facebook page ID
        }
        
        urls = []
        for brand in brands:
            page_id = page_ids.get(brand)
            if page_id:
                urls.append(f"https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=page&view_all_page_id={page_id}")
        
        return urls

    def create_run_input(self, brand_config: Dict) -> Dict:
        """Create input configuration for Apify actor run"""
        
        # Extract configuration
        total_limit = brand_config.get("total_ad_limit", 25)
        
        # Get Facebook Ad Library URLs
        urls = self.get_facebook_page_urls(brand_config)
        
        # Create start URLs list
        start_urls = []
        for url in urls:
            start_urls.append({
                "url": url,
                "method": "GET"
            })
        
        return {
            "isDetailsPerAd": True,
            "onlyTotal": False,
            "resultsLimit": total_limit,
            "startUrls": start_urls
        }
    
    def start_actor_run(self, run_input: Dict) -> str:
        """Start Apify actor run and return run ID"""
        
        url = f"{self.base_url}/acts/{self.actor_id}/runs"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        print(f"🚀 Starting actor run with input: {json.dumps(run_input, indent=2)}")
        
        response = requests.post(url, json=run_input, headers=headers)
        
        if response.status_code != 201:
            print(f"❌ API Error ({response.status_code}): {response.text}")
            raise Exception(f"Failed to start actor run: {response.status_code} {response.text}")
        
        run_data = response.json()
        run_id = run_data["data"]["id"]
        
        print(f"✅ Started Apify run: {run_id}")
        return run_id
    
    def wait_for_completion(self, run_id: str, timeout: int = 1800) -> Dict:
        """Wait for actor run to complete and return results"""
        
        url = f"{self.base_url}/actor-runs/{run_id}"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            run_data = response.json()
            status = run_data["data"]["status"]
            
            print(f"⏳ Run status: {status}")
            
            if status == "SUCCEEDED":
                print("✅ Run completed successfully!")
                return run_data
            elif status == "FAILED":
                raise Exception(f"Actor run failed: {run_data}")
            elif status in ["ABORTED", "TIMED-OUT"]:
                raise Exception(f"Actor run {status.lower()}")
            
            time.sleep(30)  # Check every 30 seconds
        
        raise Exception(f"Run timed out after {timeout} seconds")
    
    def get_run_results(self, run_id: str) -> List[Dict]:
        """Get results from completed actor run"""
        
        url = f"{self.base_url}/actor-runs/{run_id}/dataset/items"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        return response.json()
    
    def analyze_results(self, ads_data: List[Dict], brands: List[str]) -> Dict:
        """Analyze scraped ads data for competitive insights"""
        
        analysis = {
            "scraping_date": datetime.now().isoformat(),
            "total_ads_found": len(ads_data),
            "brands_analyzed": brands,
            "creative_analysis": {
                "formats": {},
                "messaging_themes": [],
                "cta_patterns": {},
                "visual_themes": []
            },
            "brand_breakdown": {},
            "competitive_insights": {}
        }
        
        # Analyze by brand
        for brand in brands:
            brand_ads = [ad for ad in ads_data if brand.lower() in str(ad.get("pageInfo", {}).get("pageName", "")).lower()]
            
            analysis["brand_breakdown"][brand] = {
                "ad_count": len(brand_ads),
                "headlines": [ad.get("adHeadline", "") for ad in brand_ads[:10]],
                "ctas": [ad.get("callToAction", {}).get("type", "") for ad in brand_ads],
                "messaging_samples": [ad.get("adText", "")[:200] for ad in brand_ads[:5]]
            }
        
        # Analyze creative formats
        format_counts = {}
        for ad in ads_data:
            if ad.get("adImages"):
                format_counts["image"] = format_counts.get("image", 0) + 1
            if ad.get("adVideos"):
                format_counts["video"] = format_counts.get("video", 0) + 1
                
        analysis["creative_analysis"]["formats"] = format_counts
        
        # Analyze CTAs
        cta_counts = {}
        for ad in ads_data:
            cta_type = ad.get("callToAction", {}).get("type", "unknown")
            cta_counts[cta_type] = cta_counts.get(cta_type, 0) + 1
            
        analysis["creative_analysis"]["cta_patterns"] = cta_counts
        
        # Extract common messaging themes
        all_headlines = [ad.get("adHeadline", "") for ad in ads_data if ad.get("adHeadline")]
        all_text = [ad.get("adText", "") for ad in ads_data if ad.get("adText")]
        
        # Simple keyword analysis for themes
        theme_keywords = {
            "automation": ["automate", "automatic", "automated"],
            "savings": ["save", "savings", "reduce", "cut costs"],
            "control": ["control", "manage", "oversight", "visibility"],
            "efficiency": ["efficient", "streamline", "simplify", "faster"],
            "security": ["secure", "safe", "protect", "compliance"]
        }
        
        theme_counts = {}
        for theme, keywords in theme_keywords.items():
            count = 0
            for text in all_headlines + all_text:
                if any(keyword.lower() in text.lower() for keyword in keywords):
                    count += 1
            theme_counts[theme] = count
            
        analysis["creative_analysis"]["messaging_themes"] = theme_counts
        
        return analysis
    
    def save_results(self, results: Dict, analysis: Dict, output_file: str):
        """Save results and analysis to JSON file"""
        
        output_data = {
            "raw_ads_data": results,
            "competitive_analysis": analysis,
            "metadata": {
                "scraping_date": datetime.now().isoformat(),
                "total_ads": len(results),
                "scraper_version": "1.0"
            }
        }
        
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Results saved to: {output_file}")

def load_brand_config(config_file: str) -> Dict:
    """Load brand configuration from JSON file"""
    with open(config_file, 'r') as f:
        return json.load(f)

def main():
    parser = argparse.ArgumentParser(description="Scrape Facebook Ads Library for competitive analysis")
    parser.add_argument("--config", required=True, help="Path to brand configuration JSON file")
    parser.add_argument("--api-key", required=True, help="Apify API key")
    parser.add_argument("--output", help="Output file path (defaults to config file setting)")
    
    args = parser.parse_args()
    
    # Load configuration
    try:
        config = load_brand_config(args.config)
        print(f"📋 Loaded config for brands: {config.get('brands_to_scrape', [])}")
    except Exception as e:
        print(f"❌ Error loading config: {e}")
        return
    
    # Initialize scraper
    scraper = ApifyFacebookAdsScraper(args.api_key)
    
    try:
        # Create run input
        run_input = scraper.create_run_input(config)
        print(f"🎯 Searching for ads from {len(run_input['startUrls'])} brand URLs")
        
        # Start scraping
        run_id = scraper.start_actor_run(run_input)
        
        # Wait for completion
        run_data = scraper.wait_for_completion(run_id)
        
        # Get results
        results = scraper.get_run_results(run_id)
        print(f"📊 Found {len(results)} ads")
        
        # Analyze results
        analysis = scraper.analyze_results(results, config.get("brands_to_scrape", []))
        
        # Save results
        output_file = args.output or config.get("output_file", "apify_results.json")
        scraper.save_results(results, analysis, output_file)
        
        print("🎉 Scraping completed successfully!")
        
        # Print summary
        print("\n📈 Summary:")
        print(f"  Total ads: {len(results)}")
        print(f"  Brands analyzed: {', '.join(config.get('brands_to_scrape', []))}")
        print(f"  Top formats: {analysis['creative_analysis']['formats']}")
        print(f"  Top CTAs: {list(analysis['creative_analysis']['cta_patterns'].keys())[:3]}")
        
    except Exception as e:
        print(f"❌ Error during scraping: {e}")
        return

if __name__ == "__main__":
    main()