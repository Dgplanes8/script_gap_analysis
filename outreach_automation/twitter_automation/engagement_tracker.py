"""
Twitter Engagement Tracker
Monitors and manages Twitter interactions including likes, comments, and engagement analytics
"""

import time
import random
import logging
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException, NoSuchElementException

from airtable_manager import AirtableManager
from config.settings import TWITTER_CONFIG, BROWSER_CONFIG
from utils.rate_limiter import rate_limiter
from utils.compliance_checker import compliance_checker

class TwitterEngagementTracker:
    """
    Twitter engagement automation with strategic interaction patterns
    Handles likes, comments, and relationship building activities
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.airtable = AirtableManager()
        self.driver = None
        self.is_logged_in = False
        
        # Configuration
        self.config = TWITTER_CONFIG
        self.browser_config = BROWSER_CONFIG
        
        # Engagement tracking
        self.session_stats = {
            'likes_performed': 0,
            'comments_posted': 0,
            'profiles_visited': 0,
            'engagement_errors': 0,
            'session_start': datetime.now()
        }
        
        # Strategic engagement patterns
        self.engagement_strategies = {
            'pre_outreach': {
                'likes_per_prospect': (2, 4),
                'comments_per_prospect': (0, 1),
                'engagement_timespan_hours': 24
            },
            'nurturing': {
                'likes_per_week': (3, 7),
                'comments_per_week': (1, 2),
                'consistency_required': True
            }
        }
        
        self.logger.info("Twitter Engagement Tracker initialized")
    
    def perform_pre_outreach_engagement(self, prospects: List[Dict]) -> Dict:
        """
        Perform strategic engagement before sending outreach messages
        
        Args:
            prospects: List of prospect dictionaries with Twitter handles
            
        Returns:
            Dict: Engagement results summary
        """
        results = {
            'prospects_processed': 0,
            'total_likes': 0,
            'total_comments': 0,
            'failed_engagements': 0,
            'rate_limited': False
        }
        
        try:
            # Start session if needed
            if not self.is_logged_in:
                if not self._start_session():
                    return results
            
            strategy = self.engagement_strategies['pre_outreach']
            
            for prospect in prospects:
                try:
                    twitter_handle = prospect.get('Twitter Handle', '').replace('@', '')
                    if not twitter_handle:
                        continue
                    
                    self.logger.info(f"Performing pre-outreach engagement for @{twitter_handle}")
                    
                    # Check rate limits
                    if not rate_limiter.can_perform_action('twitter', 'like'):
                        self.logger.warning("Rate limit reached for Twitter engagement")
                        results['rate_limited'] = True
                        break
                    
                    # Engage with their recent tweets
                    engagement_result = self._engage_with_user_content(
                        twitter_handle, 
                        strategy['likes_per_prospect'],
                        strategy['comments_per_prospect']
                    )
                    
                    results['prospects_processed'] += 1
                    results['total_likes'] += engagement_result['likes']
                    results['total_comments'] += engagement_result['comments']
                    results['failed_engagements'] += engagement_result['failures']
                    
                    # Log engagement activity
                    self._log_engagement_activity(prospect, engagement_result)
                    
                    # Wait between prospects
                    delay = random.uniform(120, 300)  # 2-5 minutes
                    self.logger.info(f"Waiting {delay:.1f}s before next prospect")
                    time.sleep(delay)
                
                except Exception as e:
                    self.logger.error(f"Error engaging with @{twitter_handle}: {e}")
                    results['failed_engagements'] += 1
            
            return results
            
        except Exception as e:
            self.logger.error(f"Pre-outreach engagement failed: {e}")
            return results
    
    def like_tweet(self, tweet_url: str) -> bool:
        """
        Like a specific tweet
        
        Args:
            tweet_url: URL of the tweet to like
            
        Returns:
            bool: True if like was successful
        """
        try:
            # Check rate limits
            if not rate_limiter.can_perform_action('twitter', 'like'):
                self.logger.warning("Rate limit reached for Twitter likes")
                return False
            
            # Navigate to tweet
            self.driver.get(tweet_url)
            time.sleep(random.uniform(2, 5))
            
            # Find and click like button
            wait = WebDriverWait(self.driver, 10)
            like_button = wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="like"]'))
            )
            
            # Check if already liked
            if 'liked' in like_button.get_attribute('aria-label').lower():
                self.logger.info("Tweet already liked")
                return True
            
            like_button.click()
            
            # Record action
            rate_limiter.record_action('twitter', 'like', True)
            self.session_stats['likes_performed'] += 1
            
            # Human-like delay
            time.sleep(random.uniform(1, 3))
            
            self.logger.info(f"Successfully liked tweet: {tweet_url}")
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to like tweet {tweet_url}: {e}")
            rate_limiter.record_action('twitter', 'like', False)
            return False
    
    def comment_on_tweet(self, tweet_url: str, comment_text: str) -> bool:
        """
        Comment on a specific tweet
        
        Args:
            tweet_url: URL of the tweet to comment on
            comment_text: Text of the comment
            
        Returns:
            bool: True if comment was successful
        """
        try:
            # Check rate limits
            if not rate_limiter.can_perform_action('twitter', 'comment'):
                self.logger.warning("Rate limit reached for Twitter comments")
                return False
            
            # Validate comment content
            is_compliant, issues = compliance_checker.validate_message(comment_text, 'twitter')
            if not is_compliant:
                self.logger.error(f"Comment failed compliance check: {issues}")
                return False
            
            # Navigate to tweet
            self.driver.get(tweet_url)
            time.sleep(random.uniform(3, 6))
            
            # Find reply button
            wait = WebDriverWait(self.driver, 10)
            reply_button = wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="reply"]'))
            )
            reply_button.click()
            
            # Wait for compose window
            time.sleep(2)
            
            # Find comment input
            comment_input = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="tweetTextarea_0"]'))
            )
            
            # Type comment with human-like delays
            for char in comment_text:
                comment_input.send_keys(char)
                time.sleep(random.uniform(0.05, 0.15))
            
            # Wait before posting
            time.sleep(random.uniform(2, 5))
            
            # Post comment
            post_button = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="tweetButtonInline"]')
            post_button.click()
            
            # Record action
            rate_limiter.record_action('twitter', 'comment', True)
            self.session_stats['comments_posted'] += 1
            
            self.logger.info(f"Successfully commented on tweet: {tweet_url}")
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to comment on tweet {tweet_url}: {e}")
            rate_limiter.record_action('twitter', 'comment', False)
            return False
    
    def monitor_mentions_and_responses(self) -> List[Dict]:
        """
        Monitor mentions and responses to track engagement
        
        Returns:
            List[Dict]: List of new mentions and responses
        """
        try:
            mentions = []
            
            # Navigate to notifications
            self.driver.get("https://twitter.com/notifications")
            time.sleep(3)
            
            # Find mention elements
            wait = WebDriverWait(self.driver, 10)
            notification_elements = self.driver.find_elements(
                By.CSS_SELECTOR, '[data-testid="cellInnerDiv"]'
            )
            
            for element in notification_elements[:10]:  # Check recent 10
                try:
                    # Extract mention data
                    mention_data = self._extract_mention_data(element)
                    if mention_data:
                        mentions.append(mention_data)
                        
                except Exception as e:
                    self.logger.warning(f"Error processing mention: {e}")
                    continue
            
            self.logger.info(f"Found {len(mentions)} new mentions/responses")
            return mentions
            
        except Exception as e:
            self.logger.error(f"Failed to monitor mentions: {e}")
            return []
    
    def _start_session(self) -> bool:
        """Start Twitter session with login"""
        try:
            from twitter_automation.dm_sender import TwitterDMSender
            
            # Use DM sender's session management
            dm_sender = TwitterDMSender()
            if dm_sender.start_session():
                self.driver = dm_sender.driver
                self.is_logged_in = True
                return True
            
            return False
            
        except Exception as e:
            self.logger.error(f"Failed to start session: {e}")
            return False
    
    def _engage_with_user_content(self, username: str, like_range: Tuple[int, int], comment_range: Tuple[int, int]) -> Dict:
        """
        Engage with a user's recent content
        
        Args:
            username: Twitter username (without @)
            like_range: Tuple of (min, max) likes to perform
            comment_range: Tuple of (min, max) comments to post
            
        Returns:
            Dict: Engagement results
        """
        results = {
            'likes': 0,
            'comments': 0,
            'failures': 0
        }
        
        try:
            # Navigate to user's profile
            profile_url = f"https://twitter.com/{username}"
            self.driver.get(profile_url)
            time.sleep(random.uniform(3, 6))
            
            # Scroll to load recent tweets
            self.driver.execute_script("window.scrollTo(0, 800);")
            time.sleep(2)
            
            # Find tweet elements
            tweet_elements = self.driver.find_elements(
                By.CSS_SELECTOR, '[data-testid="tweet"]'
            )[:10]  # Limit to recent 10 tweets
            
            if not tweet_elements:
                self.logger.warning(f"No tweets found for @{username}")
                return results
            
            # Select tweets to engage with
            num_likes = random.randint(*like_range)
            num_comments = random.randint(*comment_range)
            
            # Perform likes
            liked_tweets = 0
            for i, tweet_element in enumerate(tweet_elements):
                if liked_tweets >= num_likes:
                    break
                
                try:
                    if self._like_tweet_element(tweet_element):
                        results['likes'] += 1
                        liked_tweets += 1
                        
                        # Wait between likes
                        time.sleep(random.uniform(2, 8))
                    
                except Exception as e:
                    results['failures'] += 1
                    self.logger.warning(f"Failed to like tweet {i}: {e}")
            
            # Perform comments (on best tweets)
            if num_comments > 0:
                commented_tweets = 0
                for tweet_element in tweet_elements[:5]:  # Only top 5 tweets
                    if commented_tweets >= num_comments:
                        break
                    
                    try:
                        # Generate strategic comment
                        comment = self._generate_strategic_comment(tweet_element)
                        if comment and self._comment_on_tweet_element(tweet_element, comment):
                            results['comments'] += 1
                            commented_tweets += 1
                            
                            # Wait between comments
                            time.sleep(random.uniform(30, 90))
                        
                    except Exception as e:
                        results['failures'] += 1
                        self.logger.warning(f"Failed to comment on tweet: {e}")
            
            return results
            
        except Exception as e:
            self.logger.error(f"Failed to engage with @{username}: {e}")
            results['failures'] += 1
            return results
    
    def _like_tweet_element(self, tweet_element) -> bool:
        """Like a tweet element"""
        try:
            like_button = tweet_element.find_element(By.CSS_SELECTOR, '[data-testid="like"]')
            
            # Check if already liked
            if 'liked' in like_button.get_attribute('aria-label').lower():
                return False
            
            like_button.click()
            rate_limiter.record_action('twitter', 'like', True)
            return True
            
        except Exception as e:
            rate_limiter.record_action('twitter', 'like', False)
            return False
    
    def _comment_on_tweet_element(self, tweet_element, comment: str) -> bool:
        """Comment on a tweet element"""
        try:
            reply_button = tweet_element.find_element(By.CSS_SELECTOR, '[data-testid="reply"]')
            reply_button.click()
            
            time.sleep(2)
            
            # Find comment input
            comment_input = WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="tweetTextarea_0"]'))
            )
            
            # Type comment
            comment_input.send_keys(comment)
            time.sleep(1)
            
            # Post comment
            post_button = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="tweetButtonInline"]')
            post_button.click()
            
            rate_limiter.record_action('twitter', 'comment', True)
            return True
            
        except Exception as e:
            rate_limiter.record_action('twitter', 'comment', False)
            return False
    
    def _generate_strategic_comment(self, tweet_element) -> Optional[str]:
        """Generate a strategic comment for a tweet"""
        try:
            # Extract tweet text
            tweet_text_element = tweet_element.find_element(By.CSS_SELECTOR, '[data-testid="tweetText"]')
            tweet_text = tweet_text_element.text.lower()
            
            # Strategic comment templates based on content
            if any(keyword in tweet_text for keyword in ['growth', 'marketing', 'startup']):
                comments = [
                    "Great insights! The data definitely supports this approach.",
                    "This aligns with what we're seeing across D2C brands lately.",
                    "Totally agree - execution is everything in growth marketing.",
                    "Have you seen similar patterns in subscription businesses?",
                    "This is exactly what I've been telling clients about creative fatigue."
                ]
            elif any(keyword in tweet_text for keyword in ['challenge', 'problem', 'struggle']):
                comments = [
                    "This resonates. We've helped several brands tackle similar challenges.",
                    "The data supports your point - it's a common pattern we see.",
                    "Great perspective on this. Speed of iteration is key.",
                    "Have you tried approaching it from a creative intelligence angle?",
                    "This is why systematic testing matters so much."
                ]
            else:
                # Generic valuable comments
                comments = [
                    "Valuable perspective, thanks for sharing!",
                    "Great point! Data-driven approaches always win.",
                    "This aligns with trends we're seeing industry-wide.",
                    "Appreciate the insights from your experience.",
                    "Definitely worth exploring further."
                ]
            
            selected_comment = random.choice(comments)
            
            # Validate comment
            is_compliant, issues = compliance_checker.validate_message(selected_comment, 'twitter')
            if not is_compliant:
                return None
            
            return selected_comment
            
        except Exception as e:
            self.logger.warning(f"Failed to generate strategic comment: {e}")
            return None
    
    def _extract_mention_data(self, element) -> Optional[Dict]:
        """Extract mention data from notification element"""
        try:
            # This is a simplified extraction - would need more sophisticated parsing
            mention_data = {
                'type': 'mention',
                'timestamp': datetime.now().isoformat(),
                'content': element.text[:200],
                'processed': False
            }
            
            return mention_data
            
        except Exception as e:
            return None
    
    def _log_engagement_activity(self, prospect: Dict, engagement_result: Dict):
        """Log engagement activity to Airtable"""
        try:
            interaction_data = {
                'Prospect': prospect.get('Name', ''),
                'Platform': 'Twitter',
                'Interaction Type': 'Pre-Outreach Engagement',
                'Date': datetime.now().isoformat(),
                'Notes': f"Likes: {engagement_result['likes']}, Comments: {engagement_result['comments']}, Failures: {engagement_result['failures']}",
                'Delivered': True,
                'Response Status': 'Engagement Complete'
            }
            
            self.airtable.log_interaction(interaction_data)
            
        except Exception as e:
            self.logger.error(f"Failed to log engagement activity: {e}")
    
    def get_engagement_stats(self) -> Dict:
        """Get engagement statistics for current session"""
        duration = (datetime.now() - self.session_stats['session_start']).total_seconds()
        
        return {
            **self.session_stats,
            'session_duration_seconds': duration,
            'engagement_rate': (self.session_stats['likes_performed'] + self.session_stats['comments_posted']) / max(1, self.session_stats['profiles_visited'])
        }
    
    def close_session(self):
        """Close the engagement session"""
        try:
            if self.driver:
                self.driver.quit()
                self.driver = None
            
            self.is_logged_in = False
            
            # Log session statistics
            stats = self.get_engagement_stats()
            self.logger.info(f"Engagement session closed. Stats: {stats}")
            
        except Exception as e:
            self.logger.error(f"Error closing engagement session: {e}")

if __name__ == "__main__":
    # Test the engagement tracker
    logging.basicConfig(level=logging.INFO)
    
    print("🎯 Testing Twitter Engagement Tracker...")
    
    tracker = TwitterEngagementTracker()
    
    # Test strategic comment generation
    test_tweet_text = "Struggling with creative fatigue in our ad campaigns"
    print(f"Strategic comment for marketing tweet: {tracker._generate_strategic_comment(None)}")
    
    print("✅ Twitter Engagement Tracker test completed!")