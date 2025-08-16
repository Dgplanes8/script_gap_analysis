#!/usr/bin/env python3
"""
Reddit Opportunity Scanner
Scheduled service to scan Reddit communities for engagement opportunities
Saves potential responses to Airtable for manual approval
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

from airtable_manager import AirtableManager
from reddit_automation.community_monitor import RedditCommunityMonitor
from reddit_automation.comment_responder import RedditCommentResponder
from config.settings import SCHEDULE_CONFIG, APPROVAL_CONFIG, REDDIT_CONFIG
from utils.compliance_checker import compliance_checker

class RedditOpportunityScanner:
    """
    Automated scanner that finds Reddit opportunities and saves them for approval
    Designed to run on scheduled intervals (8 AM, 12 PM, 6 PM, 10 PM EST)
    """
    
    def __init__(self, dry_run: bool = False):
        self.logger = logging.getLogger(__name__)
        self.dry_run = dry_run
        
        # Initialize components
        self.airtable = AirtableManager()
        self.monitor = RedditCommunityMonitor()
        self.responder = RedditCommentResponder()
        
        # Configuration
        self.schedule_config = SCHEDULE_CONFIG
        self.approval_config = APPROVAL_CONFIG
        
        # Session tracking
        self.session_stats = {
            'scan_start': datetime.now(),
            'opportunities_found': 0,
            'responses_generated': 0,
            'posts_created': 0,
            'errors': 0
        }
    
    def run_scheduled_scan(self) -> Dict:
        """
        Main method to run the scheduled opportunity scan
        
        Returns:
            Dict: Summary of scan results
        """
        try:
            self.logger.info("🔍 Starting scheduled Reddit opportunity scan...")
            
            # Check if we should continue (safety limits)
            if not self._should_run_scan():
                return self._create_summary("Skipped - limits reached")
            
            # Scan for opportunities
            opportunities = self._scan_for_opportunities()
            
            if not opportunities:
                self.logger.info("No opportunities found in this scan")
                return self._create_summary("No opportunities found")
            
            # Generate responses and save to Airtable
            pending_posts = self._process_opportunities(opportunities)
            
            # Log session results
            self._log_scan_results(pending_posts)
            
            return self._create_summary("Scan completed successfully")
            
        except Exception as e:
            self.logger.error(f"Error in scheduled scan: {e}")
            self.session_stats['errors'] += 1
            return self._create_summary(f"Error: {e}")
    
    def _should_run_scan(self) -> bool:
        """Check if scan should proceed based on current limits"""
        try:
            # Check Airtable posting limits
            limits = self.airtable.check_posting_limits()
            
            # Don't scan if we have too many pending posts
            max_pending = self.schedule_config['safety_settings']['max_pending_posts']
            if limits.get('pending_approval', 0) >= max_pending:
                self.logger.warning(f"Too many pending posts: {limits['pending_approval']}/{max_pending}")
                return False
            
            # Don't scan if daily posting limit reached
            if not limits.get('can_post_more', True):
                self.logger.warning("Daily posting limit reached")
                return False
            
            return True
            
        except Exception as e:
            self.logger.error(f"Error checking scan limits: {e}")
            return False
    
    def _scan_for_opportunities(self) -> List[Dict]:
        """Scan Reddit communities for engagement opportunities"""
        try:
            # Use the community monitor to find opportunities
            opportunities = []
            
            # Scan each target subreddit
            for subreddit in REDDIT_CONFIG['target_subreddits'][:5]:  # Limit to 5 per scan
                try:
                    self.logger.info(f"Scanning r/{subreddit}...")
                    
                    # Get opportunities from this subreddit
                    subreddit_opportunities = self.monitor.scan_subreddit_for_opportunities(
                        subreddit, 
                        limit=3  # Max 3 opportunities per subreddit per scan
                    )
                    
                    opportunities.extend(subreddit_opportunities)
                    self.session_stats['opportunities_found'] += len(subreddit_opportunities)
                    
                    # Small delay between subreddits
                    time.sleep(random.uniform(2, 5))
                    
                except Exception as e:
                    self.logger.error(f"Error scanning r/{subreddit}: {e}")
                    continue
            
            # Filter and score opportunities
            filtered_opportunities = self._filter_opportunities(opportunities)
            
            self.logger.info(f"Found {len(filtered_opportunities)} high-quality opportunities")
            return filtered_opportunities
            
        except Exception as e:
            self.logger.error(f"Error scanning for opportunities: {e}")
            return []
    
    def _filter_opportunities(self, opportunities: List[Dict]) -> List[Dict]:
        """Filter opportunities based on quality criteria"""
        try:
            filtered = []
            
            for opportunity in opportunities:
                # Skip if already processed
                post_id = opportunity.get('post_id')
                if self._already_processed(post_id):
                    continue
                
                # Check opportunity score threshold
                score = opportunity.get('opportunity_score', 0)
                if score < 7.0:  # Minimum quality threshold
                    continue
                
                # Check if post is too old (>24 hours)
                post_age = opportunity.get('post_age_hours', 0)
                if post_age > 24:
                    continue
                
                # Check if subreddit is in our target list
                subreddit = opportunity.get('subreddit', '')
                if subreddit not in REDDIT_CONFIG['target_subreddits']:
                    continue
                
                filtered.append(opportunity)
            
            # Sort by opportunity score (highest first)
            filtered.sort(key=lambda x: x.get('opportunity_score', 0), reverse=True)
            
            # Limit to top 10 opportunities per scan
            return filtered[:10]
            
        except Exception as e:
            self.logger.error(f"Error filtering opportunities: {e}")
            return opportunities
    
    def _already_processed(self, post_id: str) -> bool:
        """Check if we've already processed this post"""
        try:
            # Check pending posts table for this post_id
            existing_posts = self.airtable.pending_posts_table.all(
                formula=f"{{Post ID}} = '{post_id}'"
            )
            return len(existing_posts) > 0
            
        except Exception as e:
            self.logger.error(f"Error checking if post already processed: {e}")
            return False
    
    def _process_opportunities(self, opportunities: List[Dict]) -> List[Dict]:
        """Generate responses for opportunities and save to Airtable"""
        pending_posts = []
        
        for opportunity in opportunities:
            try:
                # Generate response using the responder
                response_text = self.responder._generate_value_response(opportunity)
                
                if not response_text:
                    self.logger.warning(f"Failed to generate response for {opportunity['post_id']}")
                    continue
                
                # Validate response compliance
                is_compliant, issues = compliance_checker.validate_message(response_text, 'reddit')
                
                if not is_compliant:
                    self.logger.warning(f"Response failed compliance: {issues}")
                    continue
                
                # Check value guidelines
                if not self.responder._meets_value_guidelines(response_text):
                    self.logger.warning("Response failed value guidelines")
                    continue
                
                # Create pending post data
                post_data = self._create_post_data(opportunity, response_text)
                
                # Save to Airtable (unless dry run)
                if not self.dry_run:
                    post_id = self.airtable.create_pending_post(post_data)
                    post_data['airtable_id'] = post_id
                
                pending_posts.append(post_data)
                self.session_stats['responses_generated'] += 1
                self.session_stats['posts_created'] += 1
                
                self.logger.info(f"✅ Created pending post: {opportunity['title'][:50]}...")
                
            except Exception as e:
                self.logger.error(f"Error processing opportunity {opportunity.get('post_id', 'unknown')}: {e}")
                self.session_stats['errors'] += 1
                continue
        
        return pending_posts
    
    def _create_post_data(self, opportunity: Dict, response_text: str) -> Dict:
        """Create Airtable post data from opportunity and response"""
        return {
            'Post Title': opportunity.get('title', '')[:255],  # Airtable field limit
            'Subreddit': opportunity.get('subreddit', ''),
            'Generated Response': response_text,
            'Opportunity Score': opportunity.get('opportunity_score', 0),
            'Post ID': opportunity.get('post_id', ''),
            'Post URL': opportunity.get('url', ''),
            'Response Strategy': opportunity.get('response_strategy', ''),
            'Pain Points': ', '.join(opportunity.get('pain_points', [])),
            'Post Age Hours': opportunity.get('post_age_hours', 0),
            'Comment Count': opportunity.get('comment_count', 0),
            'Upvotes': opportunity.get('score', 0),
            'Scan Session': datetime.now().strftime('%Y-%m-%d %H:%M EST')
        }
    
    def _log_scan_results(self, pending_posts: List[Dict]):
        """Log the results of the scan session"""
        try:
            scan_duration = (datetime.now() - self.session_stats['scan_start']).seconds
            
            self.logger.info("🎯 Scan Results Summary:")
            self.logger.info(f"   Duration: {scan_duration} seconds")
            self.logger.info(f"   Opportunities found: {self.session_stats['opportunities_found']}")
            self.logger.info(f"   Responses generated: {self.session_stats['responses_generated']}")
            self.logger.info(f"   Posts created: {self.session_stats['posts_created']}")
            self.logger.info(f"   Errors: {self.session_stats['errors']}")
            
            if pending_posts:
                self.logger.info("📝 Created pending posts:")
                for post in pending_posts[:3]:  # Show first 3
                    self.logger.info(f"   - r/{post['Subreddit']}: {post['Post Title'][:40]}...")
                
                if len(pending_posts) > 3:
                    self.logger.info(f"   ... and {len(pending_posts) - 3} more")
            
        except Exception as e:
            self.logger.error(f"Error logging scan results: {e}")
    
    def _create_summary(self, status: str) -> Dict:
        """Create scan summary for return"""
        return {
            'status': status,
            'scan_time': self.session_stats['scan_start'].isoformat(),
            'opportunities_found': self.session_stats['opportunities_found'],
            'responses_generated': self.session_stats['responses_generated'],
            'posts_created': self.session_stats['posts_created'],
            'errors': self.session_stats['errors'],
            'dry_run': self.dry_run
        }
    
    def test_scan(self, limit: int = 5) -> Dict:
        """Run a test scan with limited scope"""
        self.logger.info(f"🧪 Running test scan (limit: {limit})...")
        
        # Override target subreddits for testing
        original_subreddits = REDDIT_CONFIG['target_subreddits']
        REDDIT_CONFIG['target_subreddits'] = ['marketing', 'entrepreneur']  # Test with 2 subreddits
        
        try:
            # Set dry run mode
            self.dry_run = True
            
            # Run scan with limits
            result = self.run_scheduled_scan()
            
            return result
            
        finally:
            # Restore original configuration
            REDDIT_CONFIG['target_subreddits'] = original_subreddits

def main():
    """Main entry point for scheduled scanning"""
    parser = argparse.ArgumentParser(description='Reddit Opportunity Scanner')
    parser.add_argument('--dry-run', action='store_true', help='Run without saving to Airtable')
    parser.add_argument('--test', action='store_true', help='Run test scan with limited scope')
    parser.add_argument('--verbose', '-v', action='store_true', help='Enable verbose logging')
    
    args = parser.parse_args()
    
    # Setup logging
    log_level = logging.DEBUG if args.verbose else logging.INFO
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Create scanner
    scanner = RedditOpportunityScanner(dry_run=args.dry_run)
    
    try:
        if args.test:
            result = scanner.test_scan()
        else:
            result = scanner.run_scheduled_scan()
        
        print("\n🎉 Scan Results:")
        for key, value in result.items():
            print(f"   {key}: {value}")
        
        # Exit with appropriate code
        exit_code = 0 if result.get('errors', 0) == 0 else 1
        sys.exit(exit_code)
        
    except KeyboardInterrupt:
        print("\n⏹️  Scan interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Scan failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()