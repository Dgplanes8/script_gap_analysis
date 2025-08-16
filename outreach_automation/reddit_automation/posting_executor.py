#!/usr/bin/env python3
"""
Reddit Posting Executor
Checks for approved posts in Airtable and publishes them to Reddit
Runs every 15 minutes to maintain natural posting cadence
"""

import sys
import os
import logging
import time
import random
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import argparse

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import praw
from airtable_manager import AirtableManager
from config.settings import SCHEDULE_CONFIG, APPROVAL_CONFIG, REDDIT_CONFIG
from utils.rate_limiter import rate_limiter
from utils.compliance_checker import compliance_checker

class RedditPostingExecutor:
    """
    Automated executor that posts approved Reddit responses
    Designed to run every 15 minutes checking for approved posts
    """
    
    def __init__(self, dry_run: bool = False):
        self.logger = logging.getLogger(__name__)
        self.dry_run = dry_run
        
        # Initialize components
        self.airtable = AirtableManager()
        self.reddit = self._initialize_reddit_api()
        
        # Configuration
        self.schedule_config = SCHEDULE_CONFIG
        self.approval_config = APPROVAL_CONFIG
        
        # Session tracking
        self.session_stats = {
            'execution_start': datetime.now(),
            'approved_posts_found': 0,
            'posts_published': 0,
            'posts_failed': 0,
            'errors': 0
        }
        
        # Posting state
        self.last_post_time = None
        
    def _initialize_reddit_api(self):
        """Initialize Reddit API connection"""
        try:
            reddit = praw.Reddit(
                client_id=REDDIT_CONFIG['client_id'],
                client_secret=REDDIT_CONFIG['client_secret'],
                username=REDDIT_CONFIG['username'],
                password=REDDIT_CONFIG['password'],
                user_agent=REDDIT_CONFIG['user_agent']
            )
            
            # Test connection
            user = reddit.user.me()
            self.logger.info(f"Reddit API connection established for u/{user.name}")
            return reddit
            
        except Exception as e:
            self.logger.error(f"Failed to initialize Reddit API: {e}")
            raise
    
    def run_posting_check(self) -> Dict:
        """
        Main method to check for approved posts and publish them
        
        Returns:
            Dict: Summary of execution results
        """
        try:
            self.logger.info("🚀 Starting posting executor check...")
            
            # Check if we should continue (safety limits)
            if not self._should_run_execution():
                return self._create_summary("Skipped - limits reached")
            
            # Get approved posts from Airtable
            approved_posts = self.airtable.get_approved_posts()
            
            if not approved_posts:
                self.logger.info("No approved posts found")
                return self._create_summary("No approved posts")
            
            self.session_stats['approved_posts_found'] = len(approved_posts)
            self.logger.info(f"Found {len(approved_posts)} approved posts to publish")
            
            # Process approved posts
            results = self._process_approved_posts(approved_posts)
            
            # Log execution results
            self._log_execution_results(results)
            
            return self._create_summary("Execution completed successfully")
            
        except Exception as e:
            self.logger.error(f"Error in posting execution: {e}")
            self.session_stats['errors'] += 1
            return self._create_summary(f"Error: {e}")
    
    def _should_run_execution(self) -> bool:
        """Check if execution should proceed based on current limits"""
        try:
            # Check daily posting limits
            limits = self.airtable.check_posting_limits()
            
            if not limits.get('can_post_more', True):
                self.logger.warning("Daily posting limit reached")
                return False
            
            # Check hourly rate limits
            posting_limits = self.schedule_config['posting_limits']
            if not self._can_post_within_hourly_limit():
                self.logger.warning("Hourly posting limit reached")
                return False
            
            return True
            
        except Exception as e:
            self.logger.error(f"Error checking execution limits: {e}")
            return False
    
    def _can_post_within_hourly_limit(self) -> bool:
        """Check if we can post within hourly limit"""
        try:
            # Count posts in last hour
            one_hour_ago = datetime.now() - timedelta(hours=1)
            
            recent_posts = self.airtable.pending_posts_table.all(
                formula=f"AND({{Approval Status}} = 'Posted', {{Posted Date}} >= '{one_hour_ago.isoformat()}')"
            )
            
            max_per_hour = self.schedule_config['posting_limits']['max_per_hour']
            current_count = len(recent_posts)
            
            self.logger.debug(f"Posts in last hour: {current_count}/{max_per_hour}")
            return current_count < max_per_hour
            
        except Exception as e:
            self.logger.error(f"Error checking hourly limit: {e}")
            return False
    
    def _process_approved_posts(self, approved_posts: List[Dict]) -> List[Dict]:
        """Process and publish approved posts"""
        results = []
        
        for post_record in approved_posts:
            try:
                post_fields = post_record['fields']
                
                # Check if enough time has passed since last post
                if not self._can_post_now():
                    self.logger.info("Waiting for minimum gap between posts...")
                    break
                
                # Extract post information
                post_data = self._extract_post_data(post_fields)
                
                # Validate post before publishing
                if not self._validate_post_data(post_data):
                    self.logger.warning(f"Post validation failed for {post_record['id']}")
                    self.airtable.mark_post_as_failed(
                        post_record['id'], 
                        "Post validation failed"
                    )
                    continue
                
                # Publish the post
                success, result_data = self._publish_reddit_comment(post_data)
                
                if success:
                    # Mark as posted in Airtable
                    reddit_url = result_data.get('reddit_url')
                    self.airtable.mark_post_as_posted(post_record['id'], reddit_url)
                    
                    self.session_stats['posts_published'] += 1
                    self.last_post_time = datetime.now()
                    
                    results.append({
                        'airtable_id': post_record['id'],
                        'status': 'posted',
                        'reddit_url': reddit_url,
                        'post_title': post_data['post_title'][:50]
                    })
                    
                    self.logger.info(f"✅ Posted comment: {post_data['post_title'][:50]}...")
                    
                    # Wait minimum gap before next post
                    self._wait_between_posts()
                    
                else:
                    # Mark as failed in Airtable
                    error_message = result_data.get('error', 'Unknown error')
                    self.airtable.mark_post_as_failed(post_record['id'], error_message)
                    
                    self.session_stats['posts_failed'] += 1
                    
                    results.append({
                        'airtable_id': post_record['id'],
                        'status': 'failed',
                        'error': error_message,
                        'post_title': post_data['post_title'][:50]
                    })
                    
                    self.logger.error(f"❌ Failed to post: {error_message}")
                
            except Exception as e:
                self.logger.error(f"Error processing post {post_record.get('id', 'unknown')}: {e}")
                self.session_stats['errors'] += 1
                
                # Mark as failed
                if 'id' in post_record:
                    self.airtable.mark_post_as_failed(post_record['id'], str(e))
                
                continue
        
        return results
    
    def _can_post_now(self) -> bool:
        """Check if enough time has passed since last post"""
        if not self.last_post_time:
            return True
        
        min_gap = self.schedule_config['posting_limits']['min_gap_minutes']
        time_since_last = (datetime.now() - self.last_post_time).total_seconds() / 60
        
        return time_since_last >= min_gap
    
    def _wait_between_posts(self):
        """Wait appropriate time between posts"""
        min_gap = self.schedule_config['posting_limits']['min_gap_minutes']
        max_gap = self.schedule_config['posting_limits']['max_gap_minutes']
        
        wait_minutes = random.uniform(min_gap, max_gap)
        wait_seconds = wait_minutes * 60
        
        self.logger.info(f"Waiting {wait_minutes:.1f} minutes before next post...")
        
        if not self.dry_run:
            time.sleep(wait_seconds)
    
    def _extract_post_data(self, post_fields: Dict) -> Dict:
        """Extract post data from Airtable record"""
        return {
            'post_id': post_fields.get('Post ID', ''),
            'post_url': post_fields.get('Post URL', ''),
            'post_title': post_fields.get('Post Title', ''),
            'subreddit': post_fields.get('Subreddit', ''),
            'response_text': post_fields.get('Custom Response') or post_fields.get('Generated Response', ''),
            'strategy': post_fields.get('Response Strategy', ''),
            'manual_notes': post_fields.get('Manual Notes', '')
        }
    
    def _validate_post_data(self, post_data: Dict) -> bool:
        """Validate post data before publishing"""
        try:
            # Check required fields
            required_fields = ['post_id', 'post_url', 'response_text', 'subreddit']
            for field in required_fields:
                if not post_data.get(field):
                    self.logger.warning(f"Missing required field: {field}")
                    return False
            
            # Validate response text
            response_text = post_data['response_text']
            
            # Check length
            if len(response_text) < 50:
                self.logger.warning("Response text too short")
                return False
            
            if len(response_text) > 10000:  # Reddit limit
                self.logger.warning("Response text too long")
                return False
            
            # Check compliance
            is_compliant, issues = compliance_checker.validate_message(response_text, 'reddit')
            if not is_compliant:
                self.logger.warning(f"Response failed compliance: {issues}")
                return False
            
            return True
            
        except Exception as e:
            self.logger.error(f"Error validating post data: {e}")
            return False
    
    def _publish_reddit_comment(self, post_data: Dict) -> Tuple[bool, Dict]:
        """Publish comment to Reddit"""
        try:
            if self.dry_run:
                self.logger.info(f"DRY RUN: Would post comment to {post_data['post_url']}")
                return True, {'reddit_url': 'dry_run_url'}
            
            # Extract post ID from URL or use direct ID
            post_id = post_data['post_id']
            
            # Get the Reddit submission
            submission = self.reddit.submission(id=post_id)
            
            # Post the comment
            comment = submission.reply(post_data['response_text'])
            
            # Get comment URL
            reddit_url = f"https://reddit.com{comment.permalink}"
            
            self.logger.info(f"Successfully posted comment: {reddit_url}")
            
            return True, {
                'reddit_url': reddit_url,
                'comment_id': comment.id
            }
            
        except Exception as e:
            self.logger.error(f"Error posting Reddit comment: {e}")
            return False, {'error': str(e)}
    
    def _log_execution_results(self, results: List[Dict]):
        """Log the results of the execution session"""
        try:
            execution_duration = (datetime.now() - self.session_stats['execution_start']).seconds
            
            self.logger.info("🎯 Execution Results Summary:")
            self.logger.info(f"   Duration: {execution_duration} seconds")
            self.logger.info(f"   Approved posts found: {self.session_stats['approved_posts_found']}")
            self.logger.info(f"   Posts published: {self.session_stats['posts_published']}")
            self.logger.info(f"   Posts failed: {self.session_stats['posts_failed']}")
            self.logger.info(f"   Errors: {self.session_stats['errors']}")
            
            if results:
                self.logger.info("📝 Processed posts:")
                for result in results[:3]:  # Show first 3
                    status = result['status']
                    title = result['post_title']
                    self.logger.info(f"   - {status.upper()}: {title}...")
                
                if len(results) > 3:
                    self.logger.info(f"   ... and {len(results) - 3} more")
            
        except Exception as e:
            self.logger.error(f"Error logging execution results: {e}")
    
    def _create_summary(self, status: str) -> Dict:
        """Create execution summary for return"""
        return {
            'status': status,
            'execution_time': self.session_stats['execution_start'].isoformat(),
            'approved_posts_found': self.session_stats['approved_posts_found'],
            'posts_published': self.session_stats['posts_published'],
            'posts_failed': self.session_stats['posts_failed'],
            'errors': self.session_stats['errors'],
            'dry_run': self.dry_run
        }
    
    def test_execution(self) -> Dict:
        """Run a test execution with dry run mode"""
        self.logger.info("🧪 Running test execution...")
        
        # Force dry run mode
        self.dry_run = True
        
        # Run execution
        result = self.run_posting_check()
        
        return result

def main():
    """Main entry point for posting execution"""
    parser = argparse.ArgumentParser(description='Reddit Posting Executor')
    parser.add_argument('--dry-run', action='store_true', help='Run without posting to Reddit')
    parser.add_argument('--test', action='store_true', help='Run test execution')
    parser.add_argument('--verbose', '-v', action='store_true', help='Enable verbose logging')
    
    args = parser.parse_args()
    
    # Setup logging
    log_level = logging.DEBUG if args.verbose else logging.INFO
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Create executor
    executor = RedditPostingExecutor(dry_run=args.dry_run)
    
    try:
        if args.test:
            result = executor.test_execution()
        else:
            result = executor.run_posting_check()
        
        print("\n🎉 Execution Results:")
        for key, value in result.items():
            print(f"   {key}: {value}")
        
        # Exit with appropriate code
        exit_code = 0 if result.get('errors', 0) == 0 else 1
        sys.exit(exit_code)
        
    except KeyboardInterrupt:
        print("\n⏹️  Execution interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Execution failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()