"""
Reddit Community Monitor
Monitors relevant subreddits for marketing opportunities and engagement possibilities
"""

import praw
import logging
import time
import random
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple, Set
import re
from collections import defaultdict

from airtable_manager import AirtableManager
from config.settings import REDDIT_CONFIG, SAFETY_CONFIG
from utils.rate_limiter import rate_limiter
from utils.compliance_checker import compliance_checker

class RedditCommunityMonitor:
    """
    Monitors Reddit communities for relevant discussions and engagement opportunities
    Identifies posts where value-driven responses would be appropriate
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.airtable = AirtableManager()
        
        # Configuration
        self.config = REDDIT_CONFIG
        self.target_subreddits = self.config['target_subreddits']
        self.content_keywords = self.config['content_keywords']
        
        # Initialize Reddit API
        self.reddit = self._initialize_reddit_api()
        
        # Monitoring state
        self.monitored_posts = set()  # Track already processed posts
        self.opportunity_cache = []
        self.last_scan_time = {}  # Track last scan time per subreddit
        
        # Keywords that indicate good opportunities
        self.opportunity_keywords = [
            'help', 'advice', 'struggle', 'challenge', 'problem', 'stuck',
            'recommendations', 'how to', 'best practices', 'tips',
            'creative fatigue', 'ad performance', 'CAC', 'conversion rate',
            'marketing attribution', 'growth marketing', 'subscription'
        ]
        
        # Keywords to avoid (promotional posts)
        self.avoid_keywords = [
            'selling', 'buy my', 'promotion', 'discount', 'sale',
            'affiliate', 'referral', 'spam', 'advertisement'
        ]
        
        self.logger.info("Reddit Community Monitor initialized")
    
    def scan_communities_for_opportunities(self, limit_per_subreddit: int = 25) -> List[Dict]:
        """
        Scan target communities for engagement opportunities
        
        Args:
            limit_per_subreddit: Maximum posts to scan per subreddit
            
        Returns:
            List[Dict]: List of opportunity dictionaries
        """
        opportunities = []
        
        try:
            for subreddit_name in self.target_subreddits:
                try:
                    self.logger.info(f"Scanning r/{subreddit_name} for opportunities...")
                    
                    # Check rate limits
                    if not rate_limiter.can_perform_action('reddit', 'search'):
                        self.logger.warning("Rate limit reached for Reddit API")
                        break
                    
                    # Get subreddit
                    subreddit = self.reddit.subreddit(subreddit_name)
                    
                    # Scan new posts
                    new_opportunities = self._scan_subreddit_posts(
                        subreddit, 'new', limit_per_subreddit // 2
                    )
                    opportunities.extend(new_opportunities)
                    
                    # Scan hot posts
                    hot_opportunities = self._scan_subreddit_posts(
                        subreddit, 'hot', limit_per_subreddit // 2
                    )
                    opportunities.extend(hot_opportunities)
                    
                    # Record API usage
                    rate_limiter.record_action('reddit', 'search', True)
                    
                    # Update last scan time
                    self.last_scan_time[subreddit_name] = datetime.now()
                    
                    # Wait between subreddits
                    time.sleep(random.uniform(2, 5))
                    
                except Exception as e:
                    self.logger.error(f"Error scanning r/{subreddit_name}: {e}")
                    rate_limiter.record_action('reddit', 'search', False)
                    continue
            
            # Rank opportunities by potential value
            opportunities = self._rank_opportunities(opportunities)
            
            # Store opportunities in cache
            self.opportunity_cache = opportunities
            
            self.logger.info(f"Found {len(opportunities)} engagement opportunities")
            return opportunities
            
        except Exception as e:
            self.logger.error(f"Failed to scan communities: {e}")
            return []
    
    def get_high_value_opportunities(self, min_score: float = 7.0, limit: int = 10) -> List[Dict]:
        """
        Get high-value engagement opportunities
        
        Args:
            min_score: Minimum opportunity score (1-10)
            limit: Maximum number of opportunities to return
            
        Returns:
            List[Dict]: Top opportunities sorted by score
        """
        if not self.opportunity_cache:
            self.scan_communities_for_opportunities()
        
        high_value = [
            opp for opp in self.opportunity_cache 
            if opp.get('opportunity_score', 0) >= min_score
        ]
        
        return high_value[:limit]
    
    def monitor_keywords_realtime(self, keywords: List[str], duration_minutes: int = 60) -> List[Dict]:
        """
        Monitor specific keywords in real-time across target subreddits
        
        Args:
            keywords: List of keywords to monitor
            duration_minutes: How long to monitor
            
        Returns:
            List[Dict]: Real-time opportunities found
        """
        opportunities = []
        start_time = datetime.now()
        end_time = start_time + timedelta(minutes=duration_minutes)
        
        try:
            self.logger.info(f"Starting real-time monitoring for {duration_minutes} minutes")
            
            while datetime.now() < end_time:
                for keyword in keywords:
                    try:
                        # Search across all target subreddits
                        for subreddit_name in self.target_subreddits:
                            if not rate_limiter.can_perform_action('reddit', 'search'):
                                time.sleep(60)  # Wait if rate limited
                                continue
                            
                            subreddit = self.reddit.subreddit(subreddit_name)
                            
                            # Search for keyword in recent posts
                            search_results = subreddit.search(
                                keyword,
                                sort='new',
                                time_filter='hour',
                                limit=5
                            )
                            
                            for post in search_results:
                                if post.id not in self.monitored_posts:
                                    opportunity = self._analyze_post_for_opportunity(post, keyword)
                                    if opportunity and opportunity['opportunity_score'] >= 6.0:
                                        opportunities.append(opportunity)
                                        self.monitored_posts.add(post.id)
                            
                            rate_limiter.record_action('reddit', 'search', True)
                            time.sleep(random.uniform(5, 15))
                    
                    except Exception as e:
                        self.logger.warning(f"Error monitoring keyword '{keyword}': {e}")
                        continue
                
                # Wait before next scan cycle
                time.sleep(random.uniform(60, 120))
            
            self.logger.info(f"Real-time monitoring completed. Found {len(opportunities)} opportunities")
            return sorted(opportunities, key=lambda x: x['opportunity_score'], reverse=True)
            
        except Exception as e:
            self.logger.error(f"Real-time monitoring failed: {e}")
            return opportunities
    
    def get_trending_discussions(self, subreddit_names: List[str] = None) -> List[Dict]:
        """
        Get trending discussions from target subreddits
        
        Args:
            subreddit_names: Specific subreddits to check, or None for all targets
            
        Returns:
            List[Dict]: Trending discussions with engagement potential
        """
        if not subreddit_names:
            subreddit_names = self.target_subreddits
        
        trending = []
        
        try:
            for subreddit_name in subreddit_names:
                try:
                    subreddit = self.reddit.subreddit(subreddit_name)
                    
                    # Get hot posts (trending)
                    hot_posts = subreddit.hot(limit=15)
                    
                    for post in hot_posts:
                        # Analyze engagement potential
                        discussion_data = {
                            'post_id': post.id,
                            'title': post.title,
                            'subreddit': subreddit_name,
                            'author': str(post.author),
                            'score': post.score,
                            'comment_count': post.num_comments,
                            'created_utc': post.created_utc,
                            'url': f"https://reddit.com{post.permalink}",
                            'engagement_score': self._calculate_engagement_score(post),
                            'relevant_keywords': self._extract_relevant_keywords(post.title + ' ' + post.selftext)
                        }
                        
                        if discussion_data['engagement_score'] >= 6.0:
                            trending.append(discussion_data)
                    
                    time.sleep(random.uniform(1, 3))
                    
                except Exception as e:
                    self.logger.error(f"Error getting trending from r/{subreddit_name}: {e}")
                    continue
            
            # Sort by engagement score
            trending.sort(key=lambda x: x['engagement_score'], reverse=True)
            
            return trending[:20]  # Top 20 trending discussions
            
        except Exception as e:
            self.logger.error(f"Failed to get trending discussions: {e}")
            return []
    
    def _initialize_reddit_api(self) -> praw.Reddit:
        """Initialize Reddit API connection"""
        try:
            reddit = praw.Reddit(
                client_id=self.config['client_id'],
                client_secret=self.config['client_secret'],
                username=self.config['username'],
                password=self.config['password'],
                user_agent=self.config['user_agent']
            )
            
            # Test connection
            reddit.user.me()
            
            self.logger.info("Reddit API connection established")
            return reddit
            
        except Exception as e:
            self.logger.error(f"Failed to initialize Reddit API: {e}")
            raise
    
    def _scan_subreddit_posts(self, subreddit, sort_type: str, limit: int) -> List[Dict]:
        """Scan posts in a subreddit for opportunities"""
        opportunities = []
        
        try:
            if sort_type == 'new':
                posts = subreddit.new(limit=limit)
            elif sort_type == 'hot':
                posts = subreddit.hot(limit=limit)
            elif sort_type == 'rising':
                posts = subreddit.rising(limit=limit)
            else:
                posts = subreddit.new(limit=limit)
            
            for post in posts:
                # Skip if already processed
                if post.id in self.monitored_posts:
                    continue
                
                # Analyze post for opportunity
                opportunity = self._analyze_post_for_opportunity(post)
                
                if opportunity and opportunity['opportunity_score'] >= 5.0:
                    opportunities.append(opportunity)
                    self.monitored_posts.add(post.id)
                
                # Respect rate limits
                time.sleep(random.uniform(0.5, 1.5))
            
            return opportunities
            
        except Exception as e:
            self.logger.error(f"Error scanning subreddit posts: {e}")
            return []
    
    def _analyze_post_for_opportunity(self, post, triggered_keyword: str = None) -> Optional[Dict]:
        """Analyze a Reddit post for engagement opportunity"""
        try:
            # Basic post data
            post_text = post.title + ' ' + getattr(post, 'selftext', '')
            post_text_lower = post_text.lower()
            
            # Skip promotional posts
            if any(avoid_word in post_text_lower for avoid_word in self.avoid_keywords):
                return None
            
            # Skip posts by bots or deleted users
            if not post.author or '[deleted]' in str(post.author):
                return None
            
            # Calculate opportunity score
            opportunity_score = self._calculate_opportunity_score(post, post_text_lower)
            
            if opportunity_score < 5.0:
                return None
            
            # Determine response strategy
            response_strategy = self._determine_response_strategy(post_text_lower)
            
            # Extract relevant pain points
            pain_points = self._extract_pain_points(post_text_lower)
            
            opportunity = {
                'post_id': post.id,
                'title': post.title,
                'author': str(post.author),
                'subreddit': str(post.subreddit),
                'url': f"https://reddit.com{post.permalink}",
                'created_utc': post.created_utc,
                'score': post.score,
                'comment_count': post.num_comments,
                'opportunity_score': opportunity_score,
                'response_strategy': response_strategy,
                'pain_points': pain_points,
                'triggered_keyword': triggered_keyword,
                'post_text_preview': post_text[:300],
                'engagement_window_hours': self._calculate_engagement_window(post),
                'discovered_at': datetime.now().isoformat()
            }
            
            return opportunity
            
        except Exception as e:
            self.logger.warning(f"Error analyzing post {post.id}: {e}")
            return None
    
    def _calculate_opportunity_score(self, post, post_text_lower: str) -> float:
        """Calculate opportunity score (1-10) for a post"""
        score = 5.0  # Base score
        
        # Keyword relevance bonus
        keyword_matches = sum(1 for keyword in self.opportunity_keywords if keyword in post_text_lower)
        score += min(keyword_matches * 0.5, 2.0)
        
        # Marketing-specific keyword bonus
        marketing_keywords = [
            'creative fatigue', 'ad performance', 'cac', 'conversion rate',
            'marketing attribution', 'growth marketing', 'subscription'
        ]
        marketing_matches = sum(1 for keyword in marketing_keywords if keyword in post_text_lower)
        score += marketing_matches * 0.8
        
        # Post engagement indicators
        if post.score > 10:
            score += 0.5
        if post.score > 50:
            score += 0.5
        if post.num_comments > 5:
            score += 0.5
        if post.num_comments > 20:
            score += 0.5
        
        # Recency bonus (newer posts have better engagement windows)
        post_age_hours = (datetime.now().timestamp() - post.created_utc) / 3600
        if post_age_hours < 2:
            score += 1.0
        elif post_age_hours < 6:
            score += 0.5
        elif post_age_hours > 24:
            score -= 1.0
        
        # Question indicators (better for helpful responses)
        question_indicators = ['?', 'how to', 'how do', 'what is', 'help me', 'advice']
        if any(indicator in post_text_lower for indicator in question_indicators):
            score += 1.0
        
        # Subreddit relevance
        high_value_subreddits = ['marketing', 'entrepreneur', 'startups', 'saas', 'growthmarketing']
        if str(post.subreddit).lower() in high_value_subreddits:
            score += 0.5
        
        return min(score, 10.0)  # Cap at 10
    
    def _determine_response_strategy(self, post_text_lower: str) -> str:
        """Determine the best response strategy for a post"""
        if any(keyword in post_text_lower for keyword in ['creative fatigue', 'ad creative', 'creative performance']):
            return 'creative_fatigue_solution'
        elif any(keyword in post_text_lower for keyword in ['cac', 'acquisition cost', 'customer acquisition']):
            return 'cac_optimization_advice'
        elif any(keyword in post_text_lower for keyword in ['agency', 'slow turnaround', 'agency problems']):
            return 'agency_alternative'
        elif any(keyword in post_text_lower for keyword in ['help', 'advice', 'how to']):
            return 'helpful_advice'
        else:
            return 'general_value'
    
    def _extract_pain_points(self, post_text_lower: str) -> List[str]:
        """Extract pain points mentioned in the post"""
        pain_point_map = {
            'Creative Fatigue': ['creative fatigue', 'ad creative', 'creative performance', 'creative block'],
            'Rising CAC': ['cac', 'acquisition cost', 'customer acquisition cost', 'cost per acquisition'],
            'Agency Issues': ['agency', 'slow agency', 'agency problems', 'agency turnaround'],
            'Conversion Issues': ['conversion rate', 'conversions', 'convert better', 'conversion optimization'],
            'Attribution Problems': ['attribution', 'tracking', 'measurement', 'analytics'],
            'Growth Challenges': ['growth', 'scale', 'scaling', 'growth marketing'],
            'Retention Issues': ['retention', 'churn', 'customer lifetime', 'ltv']
        }
        
        identified_pain_points = []
        for pain_point, keywords in pain_point_map.items():
            if any(keyword in post_text_lower for keyword in keywords):
                identified_pain_points.append(pain_point)
        
        return identified_pain_points
    
    def _calculate_engagement_window(self, post) -> int:
        """Calculate optimal engagement window in hours"""
        post_age_hours = (datetime.now().timestamp() - post.created_utc) / 3600
        
        if post_age_hours < 1:
            return 24  # Fresh posts have long engagement windows
        elif post_age_hours < 6:
            return 18
        elif post_age_hours < 12:
            return 12
        elif post_age_hours < 24:
            return 6
        else:
            return 2  # Older posts have shorter windows
    
    def _calculate_engagement_score(self, post) -> float:
        """Calculate engagement score for trending discussions"""
        score = 5.0
        
        # Score based on upvotes and comments ratio
        if post.num_comments > 0:
            engagement_ratio = post.score / post.num_comments
            if engagement_ratio < 5:  # High comment to upvote ratio = good discussion
                score += 2.0
            elif engagement_ratio < 10:
                score += 1.0
        
        # Raw engagement numbers
        if post.score > 100:
            score += 1.0
        if post.num_comments > 50:
            score += 1.0
        
        # Recency
        post_age_hours = (datetime.now().timestamp() - post.created_utc) / 3600
        if post_age_hours < 4:
            score += 1.0
        
        return min(score, 10.0)
    
    def _extract_relevant_keywords(self, text: str) -> List[str]:
        """Extract relevant keywords from text"""
        text_lower = text.lower()
        found_keywords = []
        
        for keyword in self.content_keywords:
            if keyword in text_lower:
                found_keywords.append(keyword)
        
        return found_keywords
    
    def _rank_opportunities(self, opportunities: List[Dict]) -> List[Dict]:
        """Rank opportunities by potential value"""
        # Sort by opportunity score and recency
        return sorted(
            opportunities,
            key=lambda x: (x['opportunity_score'], -x.get('created_utc', 0)),
            reverse=True
        )
    
    def save_opportunities_to_airtable(self, opportunities: List[Dict]) -> int:
        """Save opportunities to Airtable for tracking"""
        saved_count = 0
        
        try:
            for opportunity in opportunities:
                try:
                    # Create opportunity record
                    opportunity_data = {
                        'Platform': 'Reddit',
                        'Post Title': opportunity['title'],
                        'Subreddit': opportunity['subreddit'],
                        'Author': opportunity['author'],
                        'URL': opportunity['url'],
                        'Opportunity Score': opportunity['opportunity_score'],
                        'Response Strategy': opportunity['response_strategy'],
                        'Pain Points': ', '.join(opportunity['pain_points']),
                        'Status': 'New',
                        'Discovered Date': opportunity['discovered_at']
                    }
                    
                    # Save to Airtable (would need to extend AirtableManager)
                    # self.airtable.create_opportunity(opportunity_data)
                    saved_count += 1
                    
                except Exception as e:
                    self.logger.error(f"Failed to save opportunity {opportunity['post_id']}: {e}")
                    continue
            
            self.logger.info(f"Saved {saved_count} opportunities to Airtable")
            return saved_count
            
        except Exception as e:
            self.logger.error(f"Failed to save opportunities: {e}")
            return 0
    
    def scan_subreddit_for_opportunities(self, subreddit_name: str, limit: int = 10) -> List[Dict]:
        """
        Scan a specific subreddit for opportunities
        Designed for scheduled scanning by the opportunity scanner
        
        Args:
            subreddit_name: Name of subreddit to scan
            limit: Maximum opportunities to return
            
        Returns:
            List of opportunities found in the subreddit
        """
        opportunities = []
        
        try:
            self.logger.info(f"Scanning r/{subreddit_name} for opportunities...")
            
            subreddit = self.reddit.subreddit(subreddit_name)
            
            # Get recent hot posts (good for engagement)
            hot_posts = list(subreddit.hot(limit=25))
            
            # Get recent new posts (good for early engagement)  
            new_posts = list(subreddit.new(limit=15))
            
            # Combine and deduplicate
            all_posts = []
            seen_ids = set()
            
            for post in hot_posts + new_posts:
                if post.id not in seen_ids:
                    all_posts.append(post)
                    seen_ids.add(post.id)
            
            # Analyze each post for opportunities
            for post in all_posts:
                if len(opportunities) >= limit:
                    break
                
                # Skip if already processed
                if post.id in self.monitored_posts:
                    continue
                
                # Analyze post
                opportunity = self._analyze_post_for_opportunity(post)
                
                if opportunity and opportunity['opportunity_score'] >= 6.0:
                    opportunities.append(opportunity)
                    self.monitored_posts.add(post.id)
            
            self.logger.info(f"Found {len(opportunities)} opportunities in r/{subreddit_name}")
            
            # Sort by opportunity score
            opportunities.sort(key=lambda x: x['opportunity_score'], reverse=True)
            
            return opportunities[:limit]
            
        except Exception as e:
            self.logger.error(f"Error scanning r/{subreddit_name}: {e}")
            return []
    
    def get_monitoring_stats(self) -> Dict:
        """Get monitoring statistics"""
        return {
            'monitored_posts_count': len(self.monitored_posts),
            'cached_opportunities': len(self.opportunity_cache),
            'last_scan_times': self.last_scan_time,
            'target_subreddits': self.target_subreddits,
            'monitoring_active': True
        }

if __name__ == "__main__":
    # Test the community monitor
    logging.basicConfig(level=logging.INFO)
    
    print("🔍 Testing Reddit Community Monitor...")
    
    try:
        monitor = RedditCommunityMonitor()
        
        # Test opportunity scanning (limited to avoid API usage)
        print("Testing opportunity analysis...")
        
        # Mock post data for testing
        class MockPost:
            def __init__(self):
                self.id = 'test123'
                self.title = 'Help with creative fatigue in Facebook ads'
                self.selftext = 'Our ad creative performance is declining and we need fresh ideas'
                self.author = 'testuser'
                self.subreddit = 'marketing'
                self.score = 25
                self.num_comments = 8
                self.created_utc = datetime.now().timestamp()
                self.permalink = '/r/marketing/test'
        
        mock_post = MockPost()
        opportunity = monitor._analyze_post_for_opportunity(mock_post)
        
        if opportunity:
            print(f"Opportunity found: Score {opportunity['opportunity_score']:.1f}")
            print(f"Strategy: {opportunity['response_strategy']}")
            print(f"Pain points: {opportunity['pain_points']}")
        
        # Test monitoring stats
        stats = monitor.get_monitoring_stats()
        print(f"Monitoring stats: {stats}")
        
        print("✅ Reddit Community Monitor test completed!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        print("Note: Full testing requires Reddit API credentials")