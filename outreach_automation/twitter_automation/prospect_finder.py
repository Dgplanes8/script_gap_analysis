"""
Twitter Prospect Finder
Identifies potential leads on Twitter using search keywords and qualification criteria
"""

import time
import random
import logging
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import json
import re

# Try to import twitter_scraper, fall back to mock if not available
try:
    from twitter_scraper import get_tweets, Profile
    TWITTER_SCRAPER_AVAILABLE = True
except ImportError:
    TWITTER_SCRAPER_AVAILABLE = False
    logging.warning("twitter_scraper not available, using mock data")

from airtable_manager import AirtableManager
from config.settings import PROSPECT_CRITERIA, SAFETY_CONFIG
from utils.rate_limiter import rate_limiter
from utils.compliance_checker import compliance_checker

class TwitterProspectFinder:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.airtable = AirtableManager()
        
        # Search keywords for different pain points
        self.search_keywords = {
            'creative_fatigue': [
                'creative fatigue',
                'ad creative not working',
                'need new ad ideas',
                'ad performance declining',
                'creative running out'
            ],
            'cac_rising': [
                'CAC increasing',
                'customer acquisition cost rising',
                'ad costs too high',
                'conversion rate dropping',
                'CPA going up'
            ],
            'agency_issues': [
                'agency too slow',
                'looking for new agency',
                'agency not delivering',
                'need better creative team',
                'agency recommendations'
            ],
            'performance_marketing': [
                'performance marketing',
                'growth marketing',
                'facebook ads',
                'google ads',
                'paid acquisition'
            ]
        }
        
        # Industry and title indicators
        self.industry_keywords = [
            'SaaS', 'D2C', 'subscription', 'streaming', 'EdTech',
            'FinTech', 'ecommerce', 'direct to consumer'
        ]
        
        self.title_keywords = [
            'Head of Growth', 'Growth Marketing', 'Performance Marketing',
            'Marketing Director', 'CMO', 'VP Marketing', 'Growth Manager'
        ]
    
    def find_prospects(self, search_category: str = 'all', limit: int = 50) -> List[Dict]:
        """
        Find prospects based on search criteria
        
        Args:
            search_category: Category of search ('creative_fatigue', 'cac_rising', 'agency_issues', 'all')
            limit: Maximum number of prospects to find
            
        Returns:
            List of qualified prospect dictionaries
        """
        prospects = []
        
        try:
            # Determine search keywords
            if search_category == 'all':
                all_keywords = []
                for category_keywords in self.search_keywords.values():
                    all_keywords.extend(category_keywords)
                keywords = all_keywords
            else:
                keywords = self.search_keywords.get(search_category, [])
            
            if not keywords:
                self.logger.error(f"No keywords found for category: {search_category}")
                return prospects
            
            # Search for each keyword
            for keyword in keywords[:5]:  # Limit to 5 keywords to respect rate limits
                if len(prospects) >= limit:
                    break
                
                self.logger.info(f"Searching Twitter for: {keyword}")
                
                # Rate limiting check
                if not rate_limiter.can_perform_action('twitter', 'search'):
                    self.logger.warning("Twitter search rate limit reached")
                    break
                
                # Perform search
                keyword_prospects = self._search_keyword(keyword, limit - len(prospects))
                prospects.extend(keyword_prospects)
                
                # Record the search action
                rate_limiter.record_action('twitter', 'search')
                
                # Wait between searches
                wait_time = rate_limiter.wait_if_needed('twitter', 'search')
                self.logger.info(f"Waited {wait_time:.1f} seconds between searches")
            
            # Remove duplicates and sort by quality score
            prospects = self._deduplicate_prospects(prospects)
            prospects = sorted(prospects, key=lambda p: p.get('quality_score', 0), reverse=True)
            
            self.logger.info(f"Found {len(prospects)} qualified prospects")
            return prospects[:limit]
            
        except Exception as e:
            self.logger.error(f"Error finding prospects: {e}")
            return prospects
    
    def _search_keyword(self, keyword: str, limit: int) -> List[Dict]:
        """Search for a specific keyword and extract prospect data"""
        prospects = []
        
        try:
            if not TWITTER_SCRAPER_AVAILABLE:
                # Return mock data for testing
                return self._get_mock_prospects(keyword, limit)
            
            # Use twitter_scraper to get tweets
            tweets = get_tweets(keyword, pages=3)  # Limit pages to respect rate limits
            
            for tweet in tweets[:limit * 2]:  # Get more tweets to filter from
                try:
                    # Extract prospect data from tweet
                    prospect_data = self._extract_prospect_from_tweet(tweet, keyword)
                    
                    if prospect_data:
                        # Qualify the prospect
                        quality_score = self._calculate_quality_score(prospect_data)
                        prospect_data['quality_score'] = quality_score
                        
                        # Only keep high-quality prospects
                        if quality_score >= 6:
                            prospects.append(prospect_data)
                        
                        if len(prospects) >= limit:
                            break
                
                except Exception as e:
                    self.logger.warning(f"Error processing tweet: {e}")
                    continue
            
        except Exception as e:
            self.logger.error(f"Error searching keyword '{keyword}': {e}")
        
        return prospects
    
    def _extract_prospect_from_tweet(self, tweet: Dict, search_keyword: str) -> Optional[Dict]:
        """Extract prospect information from a tweet"""
        try:
            # Get user profile information
            username = tweet.get('username', '')
            display_name = tweet.get('name', '')
            bio = tweet.get('bio', '')
            tweet_text = tweet.get('text', '')
            
            if not username or not display_name:
                return None
            
            # Check if this looks like a business account
            if not self._is_business_account(bio, tweet_text):
                return None
            
            # Extract company and title from bio
            company, title = self._extract_company_title(bio)
            
            if not company:
                return None
            
            # Determine pain point category
            pain_point = self._identify_pain_point(tweet_text, search_keyword)
            
            # Build prospect data
            prospect_data = {
                'Name': display_name,
                'Company': company,
                'Title': title or 'Unknown',
                'Twitter Handle': f"@{username}",
                'Lead Source': 'Twitter',
                'Pain Points': [pain_point] if pain_point else [],
                'Recent Activity': tweet_text[:200] + '...' if len(tweet_text) > 200 else tweet_text,
                'First Contact Date': datetime.now().isoformat(),
                'Status': 'New'
            }
            
            # Try to determine industry
            industry = self._identify_industry(bio, company)
            if industry:
                prospect_data['Industry'] = industry
            
            return prospect_data
            
        except Exception as e:
            self.logger.warning(f"Error extracting prospect from tweet: {e}")
            return None
    
    def _is_business_account(self, bio: str, tweet_text: str) -> bool:
        """Check if this appears to be a business account"""
        business_indicators = [
            'CEO', 'CTO', 'CMO', 'founder', 'head of', 'director', 'manager',
            'marketing', 'growth', 'startup', 'company', 'business'
        ]
        
        combined_text = (bio + ' ' + tweet_text).lower()
        return any(indicator in combined_text for indicator in business_indicators)
    
    def _extract_company_title(self, bio: str) -> tuple:
        """Extract company name and title from bio"""
        company = None
        title = None
        
        # Common patterns for company extraction
        company_patterns = [
            r'(?:@|at)\s+([A-Z][A-Za-z0-9\s&]+)(?:\s|$)',
            r'(?:CEO|CTO|CMO|Founder)\s+(?:@|at)\s+([A-Z][A-Za-z0-9\s&]+)',
            r'([A-Z][A-Za-z0-9\s&]+)\s+(?:CEO|CTO|CMO|Founder)'
        ]
        
        for pattern in company_patterns:
            match = re.search(pattern, bio)
            if match:
                company = match.group(1).strip()
                break
        
        # Title extraction
        title_patterns = [
            r'(CEO|CTO|CMO|Head of [A-Za-z\s]+|Director of [A-Za-z\s]+|VP [A-Za-z\s]+)',
            r'(Growth Manager|Marketing Manager|Performance Marketing)'
        ]
        
        for pattern in title_patterns:
            match = re.search(pattern, bio, re.IGNORECASE)
            if match:
                title = match.group(1)
                break
        
        return company, title
    
    def _identify_pain_point(self, tweet_text: str, search_keyword: str) -> Optional[str]:
        """Identify the main pain point from the tweet"""
        pain_point_map = {
            'creative': 'Creative Fatigue',
            'CAC': 'Rising CAC',
            'agency': 'Agency Issues',
            'performance': 'Performance Marketing',
            'conversion': 'Conversion Optimization'
        }
        
        tweet_lower = tweet_text.lower()
        
        for keyword, pain_point in pain_point_map.items():
            if keyword.lower() in tweet_lower or keyword.lower() in search_keyword.lower():
                return pain_point
        
        return None
    
    def _identify_industry(self, bio: str, company: str) -> Optional[str]:
        """Identify industry from bio and company name"""
        industry_indicators = {
            'SaaS': ['saas', 'software', 'platform', 'app', 'api'],
            'D2C': ['d2c', 'direct to consumer', 'ecommerce', 'retail'],
            'Subscription': ['subscription', 'recurring', 'monthly'],
            'Streaming': ['streaming', 'video', 'content', 'media'],
            'EdTech': ['education', 'learning', 'edtech', 'training'],
            'FinTech': ['fintech', 'finance', 'payment', 'banking']
        }
        
        combined_text = (bio + ' ' + company).lower()
        
        for industry, indicators in industry_indicators.items():
            if any(indicator in combined_text for indicator in indicators):
                return industry
        
        return None
    
    def _calculate_quality_score(self, prospect_data: Dict) -> int:
        """Calculate quality score for a prospect (1-10)"""
        score = 5  # Base score
        
        # Industry bonus
        if prospect_data.get('Industry') in ['SaaS', 'D2C', 'Subscription', 'Streaming']:
            score += 2
        
        # Title bonus
        title = prospect_data.get('Title', '').lower()
        if any(keyword in title for keyword in ['head', 'director', 'cmo', 'vp']):
            score += 2
        elif any(keyword in title for keyword in ['manager', 'founder', 'ceo']):
            score += 1
        
        # Pain point bonus
        if prospect_data.get('Pain Points'):
            score += 1
        
        # Company name quality (not generic)
        company = prospect_data.get('Company', '').lower()
        if company and len(company.split()) <= 3 and company not in ['company', 'inc', 'llc']:
            score += 1
        
        return min(score, 10)  # Cap at 10
    
    def _deduplicate_prospects(self, prospects: List[Dict]) -> List[Dict]:
        """Remove duplicate prospects based on Twitter handle"""
        seen_handles = set()
        unique_prospects = []
        
        for prospect in prospects:
            handle = prospect.get('Twitter Handle', '')
            if handle and handle not in seen_handles:
                seen_handles.add(handle)
                unique_prospects.append(prospect)
        
        return unique_prospects
    
    def _get_mock_prospects(self, keyword: str, limit: int) -> List[Dict]:
        """Generate mock prospect data for testing"""
        mock_prospects = [
            {
                'Name': 'Sarah Chen',
                'Company': 'GrowthTech',
                'Title': 'Head of Growth',
                'Twitter Handle': '@sarahgrowth',
                'Lead Source': 'Twitter',
                'Industry': 'SaaS',
                'Pain Points': ['Creative Fatigue'],
                'Recent Activity': f'Our ad creative is getting stale, seeing declining performance. Need fresh ideas for Q1 campaigns. #{keyword}',
                'quality_score': 8
            },
            {
                'Name': 'Mike Rodriguez',
                'Company': 'StreamCorp',
                'Title': 'Marketing Director',
                'Twitter Handle': '@mikemarkets',
                'Lead Source': 'Twitter',
                'Industry': 'Streaming',
                'Pain Points': ['Rising CAC'],
                'Recent Activity': f'CAC has increased 40% this quarter. Time to optimize our acquisition strategy. #{keyword}',
                'quality_score': 7
            },
            {
                'Name': 'Emma Johnson',
                'Company': 'SubscriptionPlus',
                'Title': 'Performance Marketing Manager',
                'Twitter Handle': '@emmaperf',
                'Lead Source': 'Twitter',
                'Industry': 'Subscription',
                'Pain Points': ['Agency Issues'],
                'Recent Activity': f'Current agency taking 3+ weeks for new creative concepts. Need faster turnaround. #{keyword}',
                'quality_score': 9
            }
        ]
        
        # Return limited number of mock prospects
        return mock_prospects[:limit]
    
    def save_prospects_to_airtable(self, prospects: List[Dict]) -> List[str]:
        """Save prospects to Airtable and return list of record IDs"""
        saved_record_ids = []
        
        for prospect in prospects:
            try:
                # Check if prospect already exists
                existing = self.airtable.get_prospect_by_email(prospect.get('Email', ''))
                if existing:
                    self.logger.info(f"Prospect already exists: {prospect['Name']}")
                    continue
                
                # Validate prospect data
                is_valid, issues = compliance_checker.validate_prospect_data(prospect)
                if not is_valid:
                    self.logger.warning(f"Invalid prospect data: {issues}")
                    continue
                
                # Create prospect record
                record_id = self.airtable.create_prospect(prospect)
                saved_record_ids.append(record_id)
                
                self.logger.info(f"Saved prospect: {prospect['Name']} at {prospect['Company']}")
                
            except Exception as e:
                self.logger.error(f"Error saving prospect {prospect.get('Name', 'Unknown')}: {e}")
        
        return saved_record_ids
    
    def run_prospect_search(self, categories: List[str] = ['all'], save_to_airtable: bool = True) -> Dict:
        """
        Run complete prospect search process
        
        Args:
            categories: List of search categories to use
            save_to_airtable: Whether to save results to Airtable
            
        Returns:
            Dictionary with search results and statistics
        """
        all_prospects = []
        
        for category in categories:
            self.logger.info(f"Searching for prospects in category: {category}")
            
            prospects = self.find_prospects(category, limit=20)
            all_prospects.extend(prospects)
            
            # Wait between categories
            if len(categories) > 1:
                time.sleep(random.uniform(30, 60))
        
        # Remove duplicates
        all_prospects = self._deduplicate_prospects(all_prospects)
        
        # Save to Airtable if requested
        saved_record_ids = []
        if save_to_airtable:
            saved_record_ids = self.save_prospects_to_airtable(all_prospects)
        
        # Generate summary
        summary = {
            'total_prospects_found': len(all_prospects),
            'prospects_saved': len(saved_record_ids),
            'average_quality_score': sum(p.get('quality_score', 0) for p in all_prospects) / len(all_prospects) if all_prospects else 0,
            'industry_breakdown': self._get_industry_breakdown(all_prospects),
            'pain_point_breakdown': self._get_pain_point_breakdown(all_prospects),
            'search_timestamp': datetime.now().isoformat()
        }
        
        self.logger.info(f"Prospect search completed: {summary}")
        return summary
    
    def _get_industry_breakdown(self, prospects: List[Dict]) -> Dict[str, int]:
        """Get breakdown of prospects by industry"""
        breakdown = {}
        for prospect in prospects:
            industry = prospect.get('Industry', 'Unknown')
            breakdown[industry] = breakdown.get(industry, 0) + 1
        return breakdown
    
    def _get_pain_point_breakdown(self, prospects: List[Dict]) -> Dict[str, int]:
        """Get breakdown of prospects by pain point"""
        breakdown = {}
        for prospect in prospects:
            pain_points = prospect.get('Pain Points', [])
            for pain_point in pain_points:
                breakdown[pain_point] = breakdown.get(pain_point, 0) + 1
        return breakdown

if __name__ == "__main__":
    # Test the prospect finder
    logging.basicConfig(level=logging.INFO)
    
    finder = TwitterProspectFinder()
    
    print("Testing Twitter Prospect Finder...")
    
    # Run a test search
    summary = finder.run_prospect_search(
        categories=['creative_fatigue'],
        save_to_airtable=False  # Don't save during testing
    )
    
    print(f"Search Summary: {json.dumps(summary, indent=2)}")
    
    print("Twitter Prospect Finder test completed")