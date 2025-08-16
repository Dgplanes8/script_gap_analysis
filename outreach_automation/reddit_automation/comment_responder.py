"""
Reddit Comment Responder
Automatically responds to relevant Reddit posts with value-driven comments
"""

import praw
import logging
import time
import random
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import json

from airtable_manager import AirtableManager
from config.settings import REDDIT_CONFIG, SAFETY_CONFIG
from utils.rate_limiter import rate_limiter
from utils.compliance_checker import compliance_checker
from reddit_automation.community_monitor import RedditCommunityMonitor
from reddit_automation.enhanced_response_generator import EnhancedResponseGenerator

class RedditCommentResponder:
    """
    Automated Reddit comment responder with value-first approach
    Ensures compliance with Reddit's community guidelines and platform rules
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.airtable = AirtableManager()
        
        # Configuration
        self.config = REDDIT_CONFIG
        
        # Initialize Reddit API
        self.reddit = self._initialize_reddit_api()
        
        # Initialize community monitor
        self.monitor = RedditCommunityMonitor()
        
        # Initialize enhanced response generator
        self.enhanced_generator = EnhancedResponseGenerator()
        
        # Load response templates (fallback)
        self.templates = self._load_response_templates()
        
        # Response tracking
        self.responded_posts = set()
        self.daily_responses = 0
        self.session_stats = {
            'responses_posted': 0,
            'opportunities_processed': 0,
            'responses_failed': 0,
            'session_start': datetime.now()
        }
        
        # Value-first guidelines
        self.value_guidelines = {
            'min_value_words': 50,  # Minimum helpful content before any mention
            'max_self_promotion_ratio': 0.1,  # Max 10% self-promotional content
            'required_insight_depth': 3,  # Must provide substantial insight
            'no_direct_sales': True  # Never direct sales in comments
        }
        
        self.logger.info("Reddit Comment Responder initialized")
    
    def respond_to_opportunities(self, opportunities: List[Dict] = None, max_responses: int = 5) -> Dict:
        """
        Respond to high-value opportunities with strategic comments
        
        Args:
            opportunities: List of opportunities, or None to get fresh ones
            max_responses: Maximum responses to post in this session
            
        Returns:
            Dict: Response results summary
        """
        results = {
            'opportunities_processed': 0,
            'responses_posted': 0,
            'responses_failed': 0,
            'skipped_rate_limit': 0,
            'skipped_compliance': 0,
            'response_details': []
        }
        
        try:
            # Get opportunities if not provided
            if not opportunities:
                opportunities = self.monitor.get_high_value_opportunities(min_score=7.0, limit=max_responses * 2)
            
            if not opportunities:
                self.logger.info("No high-value opportunities found")
                return results
            
            self.logger.info(f"Processing {len(opportunities)} opportunities")
            
            responses_posted = 0
            
            for opportunity in opportunities:
                if responses_posted >= max_responses:
                    break
                
                try:
                    results['opportunities_processed'] += 1
                    
                    # Check if we've already responded to this post
                    if opportunity['post_id'] in self.responded_posts:
                        continue
                    
                    # Check daily rate limits
                    if not self._check_daily_limits():
                        results['skipped_rate_limit'] += 1
                        self.logger.warning("Daily response limit reached")
                        break
                    
                    # Check Reddit API rate limits
                    if not rate_limiter.can_perform_action('reddit', 'comment'):
                        results['skipped_rate_limit'] += 1
                        self.logger.warning("Reddit API rate limit reached")
                        break
                    
                    # Generate appropriate response
                    response_text = self._generate_value_response(opportunity)
                    
                    if not response_text:
                        results['skipped_compliance'] += 1
                        continue
                    
                    # Validate response compliance
                    is_compliant, issues = compliance_checker.validate_message(
                        response_text, 'reddit'
                    )
                    
                    if not is_compliant:
                        self.logger.warning(f"Response failed compliance: {issues}")
                        results['skipped_compliance'] += 1
                        continue
                    
                    # Post the response
                    success = self._post_comment_response(opportunity, response_text)
                    
                    if success:
                        results['responses_posted'] += 1
                        responses_posted += 1
                        self.responded_posts.add(opportunity['post_id'])
                        
                        # Log successful response
                        response_detail = {
                            'post_id': opportunity['post_id'],
                            'subreddit': opportunity['subreddit'],
                            'strategy': opportunity['response_strategy'],
                            'response_length': len(response_text),
                            'timestamp': datetime.now().isoformat()
                        }
                        results['response_details'].append(response_detail)
                        
                        # Wait between responses
                        wait_time = rate_limiter.wait_if_needed('reddit', 'comment')
                        self.logger.info(f"Response posted. Waiting {wait_time:.1f}s before next")
                        
                    else:
                        results['responses_failed'] += 1
                    
                    # Progressive delay to avoid detection
                    if responses_posted < max_responses:
                        delay = self._calculate_response_delay(responses_posted)
                        time.sleep(delay)
                
                except Exception as e:
                    self.logger.error(f"Error processing opportunity {opportunity['post_id']}: {e}")
                    results['responses_failed'] += 1
                    continue
            
            self.logger.info(f"Response session completed: {results}")
            return results
            
        except Exception as e:
            self.logger.error(f"Failed to respond to opportunities: {e}")
            return results
    
    def post_strategic_comment(self, post_url: str, response_strategy: str, custom_context: Dict = None) -> bool:
        """
        Post a strategic comment to a specific Reddit post
        
        Args:
            post_url: URL of the Reddit post
            response_strategy: Strategy to use for response
            custom_context: Additional context for personalization
            
        Returns:
            bool: True if comment posted successfully
        """
        try:
            # Extract post ID from URL
            post_id = self._extract_post_id_from_url(post_url)
            if not post_id:
                return False
            
            # Get post object
            post = self.reddit.submission(id=post_id)
            
            # Create opportunity object for consistency
            opportunity = {
                'post_id': post_id,
                'title': post.title,
                'subreddit': str(post.subreddit),
                'response_strategy': response_strategy,
                'url': post_url,
                'custom_context': custom_context or {}
            }
            
            # Generate response
            response_text = self._generate_value_response(opportunity)
            
            if not response_text:
                return False
            
            # Post the comment
            return self._post_comment_response(opportunity, response_text)
            
        except Exception as e:
            self.logger.error(f"Failed to post strategic comment: {e}")
            return False
    
    def _generate_value_response(self, opportunity: Dict) -> Optional[str]:
        """
        Generate a value-driven response for an opportunity using Claude Code integration
        
        Args:
            opportunity: Opportunity dictionary with context
            
        Returns:
            Optional[str]: Generated response text or None if failed
        """
        try:
            # Generate personalized response using Claude Code integration
            enhanced_response = self.enhanced_generator.generate_personalized_response(opportunity)
            
            if enhanced_response and len(enhanced_response) > 50:
                # Ensure value-first compliance
                if self._meets_value_guidelines(enhanced_response):
                    self.logger.info("Generated Claude Code personalized response")
                    return enhanced_response
                else:
                    self.logger.warning("Claude Code response doesn't meet value guidelines")
                    return None
            else:
                self.logger.warning("Claude Code generated insufficient response")
                return None
            
        except Exception as e:
            self.logger.error(f"Failed to generate response: {e}")
            return None
    
    def _post_comment_response(self, opportunity: Dict, response_text: str) -> bool:
        """
        Post a comment response to Reddit (with approval workflow)
        
        Args:
            opportunity: Opportunity context
            response_text: Text to post
            
        Returns:
            bool: True if submitted for approval successfully
        """
        try:
            # Instead of posting directly, send to Pending Posts table for approval
            approval_success = self._submit_for_approval(opportunity, response_text)
            
            if approval_success:
                self.logger.info(f"Response submitted for approval: r/{opportunity['subreddit']}")
                self.session_stats['responses_posted'] += 1  # Count as processed
                return True
            else:
                self.logger.error("Failed to submit response for approval")
                self.session_stats['responses_failed'] += 1
                return False
            
        except Exception as e:
            self.logger.error(f"Failed to submit for approval: {e}")
            self.session_stats['responses_failed'] += 1
            
            # Log failed attempt
            self._log_response_activity(opportunity, response_text, False, error=str(e))
            
            return False
    
    def _submit_for_approval(self, opportunity: Dict, response_text: str) -> bool:
        """
        Submit response to Pending Posts Airtable for manual approval
        
        Args:
            opportunity: Opportunity context
            response_text: Generated response text
            
        Returns:
            bool: True if submitted successfully
        """
        try:
            # Prepare data for Pending Posts table (using working field names)
            pending_post_data = {
                'Name': f"Reddit Response - {opportunity.get('subreddit', 'Unknown')} - {datetime.now().strftime('%Y-%m-%d %H:%M')}",
                'Post Title': opportunity.get('title', '')[:100],  # Truncate for Airtable
                'Subreddit': f"r/{opportunity.get('subreddit', '')}",
                'Generated Response': response_text,
                'Opportunity Score': opportunity.get('score', 0),
                'Created Date': datetime.now().strftime('%Y-%m-%d'),
                'Platform': 'Reddit',
                'Scan Time': datetime.now().strftime('%Y-%m-%d %H:%M EST'),
                'Post ID': opportunity.get('post_id', ''),
                'Post URL': opportunity.get('url', f"https://reddit.com/r/{opportunity.get('subreddit', '')}/comments/{opportunity.get('post_id', '')}"),
                'Response Strategy': opportunity.get('response_strategy', 'general_value'),
                'Pain Points': ', '.join(opportunity.get('pain_points', [])),
                'Manual Notes': f"Auto-generated response using Claude Code integration. Length: {len(response_text)} chars. Business context: {opportunity.get('business_context', 'General')}. Status: Pending manual review and approval."
            }
            
            # Submit to Airtable Pending Posts table
            success = self.airtable.create_pending_post(pending_post_data)
            
            if success:
                self.logger.info(f"Submitted to Pending Posts: {opportunity.get('title', '')[:50]}...")
                
                # Also log to interactions table for tracking
                self._log_response_activity(
                    opportunity, 
                    response_text, 
                    True, 
                    status="Pending Approval"
                )
                
                return True
            else:
                self.logger.error("Failed to create pending post record")
                return False
            
        except Exception as e:
            self.logger.error(f"Error submitting for approval: {e}")
            return False
    
    def _get_template_for_strategy(self, strategy: str) -> Optional[Dict]:
        """Get response template for strategy"""
        helpful_comments = self.templates.get('reddit_templates', {}).get('helpful_comments', [])
        
        for template in helpful_comments:
            if template.get('name') == strategy:
                return template
        
        # Fallback to first available template
        return helpful_comments[0] if helpful_comments else None
    
    def _customize_for_pain_points(self, response_text: str, pain_points: List[str]) -> str:
        """Customize response based on specific pain points"""
        
        # Add specific insights based on pain points
        if 'Creative Fatigue' in pain_points:
            insight = "\\n\\nFrom analyzing 1000+ creative campaigns, the #1 factor is systematic competitor analysis - most brands only look at 10-20 ads when they should be analyzing 200+ to find the gaps."
        elif 'Rising CAC' in pain_points:
            insight = "\\n\\nIn my experience with $250MM in ad spend, creative is typically 60% of CAC optimization potential - much higher impact than targeting or attribution fixes."
        elif 'Agency Issues' in pain_points:
            insight = "\\n\\nThe agency model works for brand strategy but struggles with performance marketing speed. The winning brands I've worked with iterate 3x faster than traditional agency timelines."
        else:
            insight = "\\n\\nThe key insight from working with 100+ performance brands: speed of iteration beats perfection every time."
        
        return response_text + insight
    
    def _add_contextual_insights(self, response_text: str, opportunity: Dict) -> str:
        """Add contextual insights based on the specific post"""
        
        # Add industry-specific context if detected
        title_lower = opportunity.get('title', '').lower()
        
        if any(word in title_lower for word in ['saas', 'subscription', 'software']):
            context = "\\n\\nFor SaaS specifically, I've found the messaging hierarchy is: problem → solution → social proof → urgency. Most SaaS ads skip straight to features."
        elif any(word in title_lower for word in ['ecommerce', 'd2c', 'shopify']):
            context = "\\n\\nD2C brands have unique advantages in creative testing - you can leverage actual customer UGC and behind-the-scenes content that agencies can't replicate."
        else:
            context = "\\n\\nHappy to dive deeper into the methodology if this resonates with your situation!"
        
        return response_text + context
    
    def _meets_value_guidelines(self, response_text: str) -> bool:
        """Check if response meets value-first guidelines for conversational content"""
        
        # Check minimum content length (50 words for conversational responses)
        if len(response_text) < 50:
            return False
        
        # Check for direct sales language (very restrictive for authentic responses)
        direct_sales_phrases = [
            'dm me', 'contact me', 'hire me', 'my service', 'my company', 
            'my business', 'book a call', 'schedule', 'consultation',
            'check out my', 'follow me', 'visit my site', 'my website'
        ]
        if any(phrase in response_text.lower() for phrase in direct_sales_phrases):
            return False
        
        # Check for promotional formatting (should be conversational)
        promotional_formatting = ['🎯', '💡', '📊', '✅', '❌', '🚀', '💰']
        if any(emoji in response_text for emoji in promotional_formatting):
            return False
        
        # Check for bullet points or structured formatting (should be natural)
        if any(pattern in response_text for pattern in ['• ', '- ', '1. ', '2. ', '* ']):
            return False
        
        return True
    
    def _check_daily_limits(self) -> bool:
        """Check if daily response limits are exceeded"""
        daily_limit = SAFETY_CONFIG['max_daily_outreach']['reddit']
        return self.daily_responses < daily_limit
    
    def _calculate_response_delay(self, response_count: int) -> float:
        """Calculate delay between responses"""
        base_delay = random.uniform(300, 600)  # 5-10 minutes base
        
        # Progressive delay
        multiplier = 1 + (response_count * 0.2)
        
        # Add randomization
        jitter = random.uniform(0.8, 1.5)
        
        return base_delay * multiplier * jitter
    
    def _extract_post_id_from_url(self, url: str) -> Optional[str]:
        """Extract Reddit post ID from URL"""
        try:
            # Handle various Reddit URL formats
            if '/comments/' in url:
                parts = url.split('/comments/')
                if len(parts) > 1:
                    return parts[1].split('/')[0]
            return None
        except Exception:
            return None
    
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
            
            return reddit
            
        except Exception as e:
            self.logger.error(f"Failed to initialize Reddit API: {e}")
            raise
    
    def _load_response_templates(self) -> Dict:
        """Load response templates from JSON file"""
        try:
            with open('/Users/nataliebasque/Ad Workflow/outreach_automation/config/templates.json', 'r') as f:
                templates = json.load(f)
            return templates
        except Exception as e:
            self.logger.error(f"Failed to load response templates: {e}")
            return {}
    
    def _log_response_activity(self, opportunity: Dict, response_text: str, success: bool, comment_id: str = None, error: str = None, status: str = None):
        """Log response activity to Airtable"""
        try:
            interaction_data = {
                'Platform': 'Reddit',
                'Interaction Type': 'Value Comment',
                'Post Title': opportunity.get('title', ''),
                'Subreddit': opportunity.get('subreddit', ''),
                'Response Strategy': opportunity.get('response_strategy', ''),
                'Response Content': response_text[:500],  # Truncate for storage
                'Date': datetime.now().isoformat(),
                'Delivered': success,
                'Response Status': status if status else ('Posted' if success else 'Failed'),
                'Comment ID': comment_id,
                'Notes': error if error else (f'Response submitted for approval' if status == "Pending Approval" else 'Value-driven comment posted successfully')
            }
            
            self.airtable.log_interaction(interaction_data)
            
        except Exception as e:
            self.logger.error(f"Failed to log response activity: {e}")
    
    def get_response_stats(self) -> Dict:
        """Get response session statistics"""
        duration = (datetime.now() - self.session_stats['session_start']).total_seconds()
        
        return {
            **self.session_stats,
            'daily_responses': self.daily_responses,
            'session_duration_seconds': duration,
            'success_rate': (self.session_stats['responses_posted'] / 
                           max(1, self.session_stats['opportunities_processed']) * 100),
            'responded_posts_count': len(self.responded_posts)
        }
    
    def reset_daily_counters(self):
        """Reset daily response counters (call at start of new day)"""
        self.daily_responses = 0
        self.responded_posts.clear()
        self.logger.info("Daily response counters reset")

if __name__ == "__main__":
    # Test the comment responder
    logging.basicConfig(level=logging.INFO)
    
    print("💬 Testing Reddit Comment Responder...")
    
    try:
        responder = RedditCommentResponder()
        
        # Test value guidelines
        good_response = "This is exactly the creative fatigue challenge I see all the time. Here's what I've found works: 1. Systematic competitor analysis - Most brands only look at 10-20 competitor ads. I scrape 200+ to find the gaps. 2. AI performance prediction - Built a scoring system that correlates 0.89 with actual CTR. From my experience managing $250MM in ad spend, the brands that win are the ones that can iterate fastest."
        
        meets_guidelines = responder._meets_value_guidelines(good_response)
        print(f"Value guidelines test: {'✅ PASS' if meets_guidelines else '❌ FAIL'}")
        
        # Test response generation
        mock_opportunity = {
            'post_id': 'test123',
            'title': 'Help with creative fatigue',
            'subreddit': 'marketing',
            'response_strategy': 'creative_fatigue_solution',
            'pain_points': ['Creative Fatigue']
        }
        
        response = responder._generate_value_response(mock_opportunity)
        if response:
            print(f"Generated response (length: {len(response)} chars)")
            print(f"Response preview: {response[:200]}...")
        
        # Test stats
        stats = responder.get_response_stats()
        print(f"Response stats: {stats}")
        
        print("✅ Reddit Comment Responder test completed!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        print("Note: Full testing requires Reddit API credentials")