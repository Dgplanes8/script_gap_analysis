"""
Reddit Content Scheduler
Schedules and posts strategic content to Reddit for lead generation and brand building
"""

import praw
import logging
import time
import random
import schedule
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import json
import threading

from airtable_manager import AirtableManager
from config.settings import REDDIT_CONFIG, SAFETY_CONFIG
from utils.rate_limiter import rate_limiter
from utils.compliance_checker import compliance_checker

class RedditContentScheduler:
    """
    Strategic content scheduler for Reddit with value-first posting
    Manages timing, subreddit selection, and content optimization
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.airtable = AirtableManager()
        
        # Initialize Reddit API
        self.reddit = self._initialize_reddit_api()
        
        # Configuration
        self.config = REDDIT_CONFIG
        
        # Load content templates
        self.content_templates = self._load_content_templates()
        
        # Scheduling state
        self.scheduled_posts = []
        self.posted_content = set()  # Track posted content to avoid duplicates
        self.posting_history = []
        
        # Content strategy
        self.content_strategies = {
            'value_posts': {
                'frequency_days': 7,  # Once per week
                'optimal_times': [(9, 0), (14, 0), (19, 0)],  # 9 AM, 2 PM, 7 PM
                'subreddit_rotation': True
            },
            'helpful_guides': {
                'frequency_days': 14,  # Bi-weekly
                'optimal_times': [(10, 0), (15, 0)],
                'subreddit_rotation': True
            },
            'data_insights': {
                'frequency_days': 10,  # Every 10 days
                'optimal_times': [(11, 0), (16, 0)],
                'subreddit_rotation': False  # Best subreddits only
            }
        }
        
        # Subreddit strategy mapping
        self.subreddit_strategies = {
            'marketing': ['value_posts', 'data_insights', 'helpful_guides'],
            'entrepreneur': ['value_posts', 'helpful_guides'],
            'startups': ['value_posts', 'data_insights'],
            'SaaS': ['data_insights', 'value_posts'],
            'digital_marketing': ['value_posts', 'helpful_guides'],
            'performance_marketing': ['data_insights', 'value_posts'],
            'growthmarketing': ['data_insights', 'value_posts']
        }
        
        self.logger.info("Reddit Content Scheduler initialized")
    
    def schedule_content_campaign(self, duration_days: int = 30) -> Dict:
        """
        Schedule a content campaign for the specified duration
        
        Args:
            duration_days: Duration of the campaign in days
            
        Returns:
            Dict: Campaign schedule summary
        """
        campaign_summary = {
            'total_posts_scheduled': 0,
            'posts_by_type': {},
            'posts_by_subreddit': {},
            'campaign_start': datetime.now().isoformat(),
            'campaign_end': (datetime.now() + timedelta(days=duration_days)).isoformat(),
            'schedule_details': []
        }
        
        try:
            start_date = datetime.now()
            end_date = start_date + timedelta(days=duration_days)
            
            # Generate optimal posting schedule
            current_date = start_date
            
            while current_date <= end_date:
                daily_posts = self._generate_daily_content_schedule(current_date)
                
                for post_schedule in daily_posts:
                    self.scheduled_posts.append(post_schedule)
                    campaign_summary['total_posts_scheduled'] += 1
                    
                    # Track by type and subreddit
                    content_type = post_schedule['content_type']
                    subreddit = post_schedule['subreddit']
                    
                    campaign_summary['posts_by_type'][content_type] = \
                        campaign_summary['posts_by_type'].get(content_type, 0) + 1
                    
                    campaign_summary['posts_by_subreddit'][subreddit] = \
                        campaign_summary['posts_by_subreddit'].get(subreddit, 0) + 1
                    
                    campaign_summary['schedule_details'].append({
                        'date': post_schedule['scheduled_time'],
                        'type': content_type,
                        'subreddit': subreddit,
                        'title': post_schedule['title'][:50] + '...'
                    })
                
                current_date += timedelta(days=1)
            
            self.logger.info(f"Scheduled {campaign_summary['total_posts_scheduled']} posts over {duration_days} days")
            return campaign_summary
            
        except Exception as e:
            self.logger.error(f"Failed to schedule content campaign: {e}")
            return campaign_summary
    
    def post_scheduled_content(self) -> Dict:
        """
        Post any content that's scheduled for the current time
        
        Returns:
            Dict: Posting results
        """
        results = {
            'posts_attempted': 0,
            'posts_successful': 0,
            'posts_failed': 0,
            'rate_limited': False,
            'posted_details': []
        }
        
        try:
            current_time = datetime.now()
            
            # Find posts scheduled for now (within 1 hour window)
            due_posts = [
                post for post in self.scheduled_posts 
                if abs((datetime.fromisoformat(post['scheduled_time']) - current_time).total_seconds()) <= 3600
                and post['status'] == 'scheduled'
            ]
            
            if not due_posts:
                self.logger.info("No posts scheduled for current time")
                return results
            
            self.logger.info(f"Found {len(due_posts)} posts due for posting")
            
            for post_data in due_posts:
                try:
                    results['posts_attempted'] += 1
                    
                    # Check rate limits
                    if not rate_limiter.can_perform_action('reddit', 'post'):
                        self.logger.warning("Rate limit reached for Reddit posts")
                        results['rate_limited'] = True
                        break
                    
                    # Check daily limits
                    if not self._check_daily_posting_limits():
                        self.logger.warning("Daily posting limit reached")
                        break
                    
                    # Post the content
                    success = self._post_content_to_reddit(post_data)
                    
                    if success:
                        results['posts_successful'] += 1
                        post_data['status'] = 'posted'
                        post_data['posted_time'] = datetime.now().isoformat()
                        
                        results['posted_details'].append({
                            'title': post_data['title'],
                            'subreddit': post_data['subreddit'],
                            'content_type': post_data['content_type'],
                            'posted_time': post_data['posted_time']
                        })
                        
                        # Add to posting history
                        self.posting_history.append(post_data.copy())
                        
                        # Wait between posts
                        wait_time = rate_limiter.wait_if_needed('reddit', 'post')
                        if len(due_posts) > 1:  # Only wait if more posts to go
                            additional_delay = random.uniform(300, 900)  # 5-15 minutes
                            time.sleep(additional_delay)
                    
                    else:
                        results['posts_failed'] += 1
                        post_data['status'] = 'failed'
                
                except Exception as e:
                    self.logger.error(f"Error posting scheduled content: {e}")
                    results['posts_failed'] += 1
                    post_data['status'] = 'failed'
                    continue
            
            return results
            
        except Exception as e:
            self.logger.error(f"Failed to post scheduled content: {e}")
            return results
    
    def create_strategic_post(self, content_type: str, target_subreddit: str, custom_data: Dict = None) -> bool:
        """
        Create and post strategic content immediately
        
        Args:
            content_type: Type of content to create
            target_subreddit: Subreddit to post to
            custom_data: Custom data for content generation
            
        Returns:
            bool: True if posted successfully
        """
        try:
            # Generate content
            content_data = self._generate_content(content_type, target_subreddit, custom_data)
            
            if not content_data:
                return False
            
            # Create post object
            post_data = {
                'content_type': content_type,
                'subreddit': target_subreddit,
                'title': content_data['title'],
                'content': content_data['content'],
                'scheduled_time': datetime.now().isoformat(),
                'status': 'ready'
            }
            
            # Post immediately
            return self._post_content_to_reddit(post_data)
            
        except Exception as e:
            self.logger.error(f"Failed to create strategic post: {e}")
            return False
    
    def _generate_daily_content_schedule(self, date: datetime) -> List[Dict]:
        """Generate content schedule for a specific day"""
        daily_schedule = []
        
        try:
            # Determine what content types should be posted on this day
            day_of_week = date.weekday()  # 0 = Monday
            
            # Value posts (weekly)
            if day_of_week in [1, 3]:  # Tuesday, Thursday
                content_type = 'value_posts'
                optimal_times = self.content_strategies[content_type]['optimal_times']
                selected_time = random.choice(optimal_times)
                
                post_time = date.replace(hour=selected_time[0], minute=selected_time[1])
                
                # Select appropriate subreddit
                suitable_subreddits = [
                    sr for sr, strategies in self.subreddit_strategies.items()
                    if content_type in strategies
                ]
                selected_subreddit = random.choice(suitable_subreddits)
                
                # Generate content
                content_data = self._generate_content(content_type, selected_subreddit)
                
                if content_data:
                    daily_schedule.append({
                        'content_type': content_type,
                        'subreddit': selected_subreddit,
                        'title': content_data['title'],
                        'content': content_data['content'],
                        'scheduled_time': post_time.isoformat(),
                        'status': 'scheduled'
                    })
            
            # Data insights (bi-weekly)
            if day_of_week == 1 and date.day <= 14:  # First two weeks, Tuesdays
                content_type = 'data_insights'
                optimal_times = self.content_strategies[content_type]['optimal_times']
                selected_time = random.choice(optimal_times)
                
                post_time = date.replace(hour=selected_time[0], minute=selected_time[1])
                
                # High-value subreddits only for data insights
                high_value_subreddits = ['marketing', 'entrepreneur', 'SaaS', 'growthmarketing']
                selected_subreddit = random.choice(high_value_subreddits)
                
                content_data = self._generate_content(content_type, selected_subreddit)
                
                if content_data:
                    daily_schedule.append({
                        'content_type': content_type,
                        'subreddit': selected_subreddit,
                        'title': content_data['title'],
                        'content': content_data['content'],
                        'scheduled_time': post_time.isoformat(),
                        'status': 'scheduled'
                    })
            
            return daily_schedule
            
        except Exception as e:
            self.logger.error(f"Error generating daily schedule for {date}: {e}")
            return []
    
    def _generate_content(self, content_type: str, subreddit: str, custom_data: Dict = None) -> Optional[Dict]:
        """Generate content based on type and target subreddit"""
        try:
            templates = self.content_templates.get('reddit_templates', {}).get('value_posts', [])
            
            # Find template for content type
            template = None
            for t in templates:
                if t.get('name') == content_type or content_type in t.get('subreddits', []):
                    template = t
                    break
            
            if not template:
                # Use first available template
                template = templates[0] if templates else None
            
            if not template:
                return None
            
            # Customize content for subreddit
            title = template['title']
            content = template['content']
            
            # Add subreddit-specific customizations
            if subreddit in ['SaaS', 'startups']:
                # Add SaaS-specific context
                title = title.replace('D2C', 'SaaS').replace('brands', 'companies')
                content = content.replace('D2C', 'SaaS').replace('brands', 'companies')
            
            elif subreddit == 'entrepreneur':
                # Add entrepreneur-specific context
                title = title.replace('marketing teams', 'founders')
                content = content.replace('marketing teams', 'founders and teams')
            
            # Add current timestamp context
            current_date = datetime.now().strftime('%B %Y')
            title = title.replace('2025', current_date.split()[1])
            content = content.replace('2025', current_date.split()[1])
            
            return {
                'title': title,
                'content': content,
                'template_used': template.get('name', 'unknown')
            }
            
        except Exception as e:
            self.logger.error(f"Error generating content: {e}")
            return None
    
    def _post_content_to_reddit(self, post_data: Dict) -> bool:
        """Post content to Reddit"""
        try:
            # Validate content compliance
            content_to_validate = post_data['title'] + '\\n\\n' + post_data['content']
            is_compliant, issues = compliance_checker.validate_message(
                content_to_validate, 'reddit'
            )
            
            if not is_compliant:
                self.logger.error(f"Content failed compliance check: {issues}")
                return False
            
            # Get subreddit
            subreddit = self.reddit.subreddit(post_data['subreddit'])
            
            # Submit post
            submission = subreddit.submit(
                title=post_data['title'],
                selftext=post_data['content']
            )
            
            # Record success
            rate_limiter.record_action('reddit', 'post', True)
            
            # Log to Airtable
            self._log_content_post(post_data, True, submission.id)
            
            self.logger.info(f"Successfully posted to r/{post_data['subreddit']}: {submission.id}")
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to post content: {e}")
            rate_limiter.record_action('reddit', 'post', False)
            
            # Log failure
            self._log_content_post(post_data, False, error=str(e))
            
            return False
    
    def _check_daily_posting_limits(self) -> bool:
        """Check if daily posting limits are exceeded"""
        today = datetime.now().date()
        today_posts = [
            post for post in self.posting_history
            if datetime.fromisoformat(post.get('posted_time', '')).date() == today
        ]
        
        daily_limit = 3  # Conservative limit for Reddit posts
        return len(today_posts) < daily_limit
    
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
    
    def _load_content_templates(self) -> Dict:
        """Load content templates from JSON file"""
        try:
            with open('/Users/nataliebasque/Ad Workflow/outreach_automation/config/templates.json', 'r') as f:
                templates = json.load(f)
            return templates
        except Exception as e:
            self.logger.error(f"Failed to load content templates: {e}")
            return {}
    
    def _log_content_post(self, post_data: Dict, success: bool, post_id: str = None, error: str = None):
        """Log content post to Airtable"""
        try:
            interaction_data = {
                'Platform': 'Reddit',
                'Interaction Type': 'Strategic Content Post',
                'Post Title': post_data['title'],
                'Subreddit': post_data['subreddit'],
                'Content Type': post_data['content_type'],
                'Date': datetime.now().isoformat(),
                'Delivered': success,
                'Response Status': 'Posted' if success else 'Failed',
                'Post ID': post_id,
                'Notes': error if error else 'Strategic content posted successfully'
            }
            
            self.airtable.log_interaction(interaction_data)
            
        except Exception as e:
            self.logger.error(f"Failed to log content post: {e}")
    
    def start_scheduler_daemon(self):
        """Start the background scheduler daemon"""
        def run_scheduler():
            # Schedule daily content posting check
            schedule.every().hour.do(self.post_scheduled_content)
            
            while True:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
        
        # Start scheduler in background thread
        scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
        scheduler_thread.start()
        
        self.logger.info("Content scheduler daemon started")
    
    def get_scheduler_stats(self) -> Dict:
        """Get scheduler statistics"""
        scheduled_count = len([p for p in self.scheduled_posts if p['status'] == 'scheduled'])
        posted_count = len([p for p in self.scheduled_posts if p['status'] == 'posted'])
        failed_count = len([p for p in self.scheduled_posts if p['status'] == 'failed'])
        
        return {
            'total_scheduled': len(self.scheduled_posts),
            'scheduled_pending': scheduled_count,
            'posted_successful': posted_count,
            'posted_failed': failed_count,
            'posting_history_count': len(self.posting_history),
            'next_scheduled_post': self._get_next_scheduled_post_time()
        }
    
    def _get_next_scheduled_post_time(self) -> Optional[str]:
        """Get the time of the next scheduled post"""
        pending_posts = [
            p for p in self.scheduled_posts 
            if p['status'] == 'scheduled'
        ]
        
        if not pending_posts:
            return None
        
        next_post = min(pending_posts, key=lambda x: x['scheduled_time'])
        return next_post['scheduled_time']

if __name__ == "__main__":
    # Test the content scheduler
    logging.basicConfig(level=logging.INFO)
    
    print("📅 Testing Reddit Content Scheduler...")
    
    try:
        scheduler = RedditContentScheduler()
        
        # Test content generation
        test_content = scheduler._generate_content('value_posts', 'marketing')
        if test_content:
            print(f"Generated content title: {test_content['title'][:50]}...")
            print(f"Content length: {len(test_content['content'])} characters")
        
        # Test schedule generation
        test_date = datetime.now() + timedelta(days=1)
        daily_schedule = scheduler._generate_daily_content_schedule(test_date)
        print(f"Generated {len(daily_schedule)} posts for {test_date.date()}")
        
        # Test campaign scheduling
        campaign = scheduler.schedule_content_campaign(duration_days=7)
        print(f"Campaign scheduled: {campaign['total_posts_scheduled']} posts")
        print(f"Posts by type: {campaign['posts_by_type']}")
        
        # Test scheduler stats
        stats = scheduler.get_scheduler_stats()
        print(f"Scheduler stats: {stats}")
        
        print("✅ Reddit Content Scheduler test completed!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        print("Note: Full testing requires Reddit API credentials")