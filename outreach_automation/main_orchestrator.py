#!/usr/bin/env python3
"""
Main Orchestrator for Social Media Outreach Automation
Coordinates Twitter and Reddit automation systems with safety and compliance
"""

import os
import sys
import logging
import time
import argparse
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import json

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config.settings import validate_config, is_production_mode, SAFETY_CONFIG
from utils.rate_limiter import rate_limiter
from utils.compliance_checker import compliance_checker
from airtable_manager import AirtableManager

# Platform modules
from twitter_automation.prospect_finder import TwitterProspectFinder
from twitter_automation.dm_sender import TwitterDMSender
from twitter_automation.engagement_tracker import TwitterEngagementTracker

from reddit_automation.community_monitor import RedditCommunityMonitor
from reddit_automation.comment_responder import RedditCommentResponder
from reddit_automation.content_scheduler import RedditContentScheduler

class OutreachOrchestrator:
    """
    Main orchestrator for coordinating outreach across Twitter and Reddit
    Manages workflows, safety limits, and performance tracking
    """
    
    def __init__(self, dry_run: bool = True):
        self.logger = logging.getLogger(__name__)
        self.dry_run = dry_run
        self.airtable = AirtableManager()
        
        # Initialize platform modules
        self.twitter_finder = TwitterProspectFinder()
        self.twitter_dm_sender = TwitterDMSender()
        self.twitter_engagement = TwitterEngagementTracker()
        
        self.reddit_monitor = RedditCommunityMonitor()
        self.reddit_responder = RedditCommentResponder()
        self.reddit_scheduler = RedditContentScheduler()
        
        # Session tracking
        self.session_stats = {
            'session_start': datetime.now(),
            'prospects_found': 0,
            'outreach_sent': 0,
            'reddit_responses': 0,
            'engagement_actions': 0,
            'errors': []
        }
        
        self.logger.info(f"Outreach Orchestrator initialized (dry_run: {dry_run})")
    
    def run_full_outreach_workflow(self, max_prospects: int = 25) -> Dict:
        """
        Run the complete outreach workflow across both platforms
        
        Args:
            max_prospects: Maximum prospects to contact in this session
            
        Returns:
            Dict: Workflow results summary
        """
        results = {
            'workflow_start': datetime.now().isoformat(),
            'twitter_results': {},
            'reddit_results': {},
            'total_outreach': 0,
            'safety_violations': [],
            'workflow_complete': False
        }
        
        try:
            self.logger.info("🚀 Starting full outreach workflow...")
            
            # Phase 1: Twitter Prospect Finding and Engagement
            self.logger.info("📱 Phase 1: Twitter prospect finding and engagement")
            results['twitter_results'] = self._run_twitter_workflow(max_prospects)
            
            # Phase 2: Reddit Community Engagement
            self.logger.info("🔴 Phase 2: Reddit community engagement")
            results['reddit_results'] = self._run_reddit_workflow()
            
            # Phase 3: Analytics and Reporting
            self.logger.info("📊 Phase 3: Analytics and reporting")
            self._generate_session_report(results)
            
            results['total_outreach'] = (
                results['twitter_results'].get('dm_results', {}).get('messages_sent', 0) +
                results['reddit_results'].get('response_results', {}).get('responses_posted', 0)
            )
            
            results['workflow_complete'] = True
            self.logger.info("✅ Full outreach workflow completed successfully")
            
        except Exception as e:
            self.logger.error(f"Workflow failed: {e}")
            results['errors'] = [str(e)]
        
        return results
    
    def run_twitter_only_workflow(self, max_prospects: int = 25) -> Dict:
        """Run Twitter-only outreach workflow"""
        return self._run_twitter_workflow(max_prospects)
    
    def run_reddit_only_workflow(self) -> Dict:
        """Run Reddit-only engagement workflow"""
        return self._run_reddit_workflow()
    
    def _run_twitter_workflow(self, max_prospects: int) -> Dict:
        """Execute Twitter outreach workflow"""
        twitter_results = {
            'prospect_results': {},
            'engagement_results': {},
            'dm_results': {},
            'errors': []
        }
        
        try:
            # Step 1: Find prospects
            self.logger.info("🔍 Finding Twitter prospects...")
            prospect_summary = self.twitter_finder.run_prospect_search(
                categories=['creative_fatigue', 'cac_rising', 'agency_issues'],
                save_to_airtable=not self.dry_run
            )
            twitter_results['prospect_results'] = prospect_summary
            self.session_stats['prospects_found'] += prospect_summary['total_prospects_found']
            
            if prospect_summary['total_prospects_found'] == 0:
                self.logger.warning("No prospects found, skipping Twitter DMs")
                return twitter_results
            
            # Step 2: Get prospects for outreach
            prospects = self.airtable.get_prospects_for_outreach('Twitter', limit=max_prospects)
            
            if not prospects:
                self.logger.warning("No prospects ready for outreach")
                return twitter_results
            
            # Step 3: Pre-outreach engagement
            if not self.dry_run:
                self.logger.info("🎯 Performing pre-outreach engagement...")
                engagement_results = self.twitter_engagement.perform_pre_outreach_engagement(
                    prospects[:min(10, len(prospects))]  # Limit engagement to top 10
                )
                twitter_results['engagement_results'] = engagement_results
                self.session_stats['engagement_actions'] += engagement_results['total_likes'] + engagement_results['total_comments']
            
            # Step 4: Send DMs
            if not self.dry_run:
                self.logger.info("💬 Sending Twitter DMs...")
                dm_results = self.twitter_dm_sender.send_bulk_dms(
                    prospects[:max_prospects],
                    template_name=None  # Auto-select templates
                )
                twitter_results['dm_results'] = dm_results
                self.session_stats['outreach_sent'] += dm_results['messages_sent']
            else:
                self.logger.info("💬 DRY RUN: Would send DMs to prospects")
                twitter_results['dm_results'] = {'dry_run': True, 'prospects_ready': len(prospects)}
            
        except Exception as e:
            self.logger.error(f"Twitter workflow error: {e}")
            twitter_results['errors'].append(str(e))
            self.session_stats['errors'].append(f"Twitter: {e}")
        
        return twitter_results
    
    def _run_reddit_workflow(self) -> Dict:
        """Execute Reddit engagement workflow"""
        reddit_results = {
            'monitoring_results': {},
            'response_results': {},
            'content_results': {},
            'errors': []
        }
        
        try:
            # Step 1: Monitor communities for opportunities
            self.logger.info("🔍 Monitoring Reddit communities...")
            opportunities = self.reddit_monitor.scan_communities_for_opportunities(limit_per_subreddit=20)
            reddit_results['monitoring_results'] = {
                'opportunities_found': len(opportunities),
                'high_value_opportunities': len([o for o in opportunities if o['opportunity_score'] >= 8.0])
            }
            
            # Step 2: Respond to high-value opportunities
            if opportunities and not self.dry_run:
                self.logger.info("💬 Responding to Reddit opportunities...")
                response_results = self.reddit_responder.respond_to_opportunities(
                    opportunities=opportunities[:5],  # Top 5 opportunities
                    max_responses=3  # Conservative limit
                )
                reddit_results['response_results'] = response_results
                self.session_stats['reddit_responses'] += response_results['responses_posted']
            else:
                if self.dry_run:
                    self.logger.info("💬 DRY RUN: Would respond to Reddit opportunities")
                    reddit_results['response_results'] = {'dry_run': True, 'opportunities_available': len(opportunities)}
            
            # Step 3: Post scheduled content
            self.logger.info("📅 Checking for scheduled Reddit content...")
            content_results = self.reddit_scheduler.post_scheduled_content()
            reddit_results['content_results'] = content_results
            
        except Exception as e:
            self.logger.error(f"Reddit workflow error: {e}")
            reddit_results['errors'].append(str(e))
            self.session_stats['errors'].append(f"Reddit: {e}")
        
        return reddit_results
    
    def setup_monitoring_dashboard(self) -> Dict:
        """Set up monitoring dashboard with current status"""
        dashboard = {
            'timestamp': datetime.now().isoformat(),
            'platform_status': {},
            'rate_limits': {},
            'daily_usage': {},
            'system_health': {}
        }
        
        try:
            # Platform status
            dashboard['platform_status'] = {
                'twitter': {
                    'api_connected': hasattr(self.twitter_finder, 'reddit') or True,  # Mock for Twitter
                    'last_prospect_scan': 'Available',
                    'dm_sender_ready': True
                },
                'reddit': {
                    'api_connected': hasattr(self.reddit_monitor, 'reddit'),
                    'communities_monitored': len(self.reddit_monitor.target_subreddits),
                    'content_scheduler_active': True
                }
            }
            
            # Rate limit status
            for platform in ['twitter', 'reddit']:
                dashboard['rate_limits'][platform] = rate_limiter.get_platform_status(platform)
            
            # Daily usage
            dashboard['daily_usage'] = {
                'twitter_outreach': self.airtable.get_daily_outreach_count('Twitter'),
                'reddit_responses': self.airtable.get_daily_outreach_count('Reddit')
            }
            
            # System health
            config_issues = validate_config()
            dashboard['system_health'] = {
                'config_valid': not any(config_issues.values()),
                'config_issues': config_issues,
                'airtable_connected': True,  # Assume connected if no exception
                'environment': 'production' if is_production_mode() else 'development'
            }
            
        except Exception as e:
            self.logger.error(f"Error setting up dashboard: {e}")
            dashboard['error'] = str(e)
        
        return dashboard
    
    def run_safety_checks(self) -> Dict:
        """Run comprehensive safety and compliance checks"""
        safety_report = {
            'timestamp': datetime.now().isoformat(),
            'compliance_status': 'PASS',
            'safety_violations': [],
            'recommendations': [],
            'rate_limit_status': {},
            'daily_limits_status': {}
        }
        
        try:
            # Check rate limits
            for platform in ['twitter', 'reddit']:
                status = rate_limiter.get_platform_status(platform)
                safety_report['rate_limit_status'][platform] = status
                
                # Check for approaching limits
                for action, action_status in status.get('actions', {}).items():
                    if action_status.get('hourly_used', 0) / max(1, action_status.get('hourly_limit', 1)) > 0.8:
                        safety_report['safety_violations'].append(
                            f"{platform.title()} {action} approaching hourly limit"
                        )
            
            # Check daily limits
            for platform in ['twitter', 'reddit']:
                daily_count = self.airtable.get_daily_outreach_count(platform.title())
                daily_limit = SAFETY_CONFIG['max_daily_outreach'].get(platform, 10)
                
                safety_report['daily_limits_status'][platform] = {
                    'used': daily_count,
                    'limit': daily_limit,
                    'percentage': (daily_count / daily_limit * 100) if daily_limit > 0 else 0
                }
                
                if daily_count >= daily_limit:
                    safety_report['safety_violations'].append(
                        f"{platform.title()} daily limit exceeded: {daily_count}/{daily_limit}"
                    )
                elif daily_count / daily_limit > 0.8:
                    safety_report['recommendations'].append(
                        f"Approaching {platform} daily limit: {daily_count}/{daily_limit}"
                    )
            
            # Overall compliance status
            if safety_report['safety_violations']:
                safety_report['compliance_status'] = 'VIOLATION'
            elif safety_report['recommendations']:
                safety_report['compliance_status'] = 'WARNING'
            
        except Exception as e:
            self.logger.error(f"Error running safety checks: {e}")
            safety_report['error'] = str(e)
            safety_report['compliance_status'] = 'ERROR'
        
        return safety_report
    
    def _generate_session_report(self, workflow_results: Dict):
        """Generate and log session report"""
        try:
            session_duration = (datetime.now() - self.session_stats['session_start']).total_seconds()
            
            report = {
                'session_id': f"session_{int(self.session_stats['session_start'].timestamp())}",
                'duration_seconds': session_duration,
                'dry_run': self.dry_run,
                'stats': self.session_stats,
                'workflow_results': workflow_results,
                'generated_at': datetime.now().isoformat()
            }
            
            # Save report to file
            report_filename = f"reports/session_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            os.makedirs('reports', exist_ok=True)
            
            with open(report_filename, 'w') as f:
                json.dump(report, f, indent=2)
            
            self.logger.info(f"Session report saved: {report_filename}")
            
            # Log summary
            self.logger.info(f"📊 Session Summary:")
            self.logger.info(f"   Duration: {session_duration:.1f}s")
            self.logger.info(f"   Prospects found: {self.session_stats['prospects_found']}")
            self.logger.info(f"   Outreach sent: {self.session_stats['outreach_sent']}")
            self.logger.info(f"   Reddit responses: {self.session_stats['reddit_responses']}")
            self.logger.info(f"   Engagement actions: {self.session_stats['engagement_actions']}")
            
        except Exception as e:
            self.logger.error(f"Error generating session report: {e}")
    
    def cleanup_session(self):
        """Clean up session resources"""
        try:
            # Close browser sessions
            if hasattr(self.twitter_dm_sender, 'close_session'):
                self.twitter_dm_sender.close_session()
            
            if hasattr(self.twitter_engagement, 'close_session'):
                self.twitter_engagement.close_session()
            
            self.logger.info("Session cleanup completed")
            
        except Exception as e:
            self.logger.error(f"Error during cleanup: {e}")

def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(description='Social Media Outreach Automation')
    parser.add_argument('--mode', choices=['full', 'twitter', 'reddit', 'dashboard', 'safety'], 
                       default='full', help='Workflow mode to run')
    parser.add_argument('--max-prospects', type=int, default=25, 
                       help='Maximum prospects to contact')
    parser.add_argument('--dry-run', action='store_true', 
                       help='Run in dry-run mode (no actual outreach)')
    parser.add_argument('--log-level', choices=['DEBUG', 'INFO', 'WARNING', 'ERROR'], 
                       default='INFO', help='Logging level')
    
    args = parser.parse_args()
    
    # Setup logging
    logging.basicConfig(
        level=getattr(logging, args.log_level),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(f'logs/outreach_{datetime.now().strftime("%Y%m%d")}.log'),
            logging.StreamHandler()
        ]
    )
    
    logger = logging.getLogger(__name__)
    
    try:
        # Validate configuration
        logger.info("🔧 Validating configuration...")
        config_issues = validate_config()
        
        if config_issues['missing_env_vars']:
            logger.error(f"Missing environment variables: {config_issues['missing_env_vars']}")
            logger.error("Please set up your environment variables before running")
            return 1
        
        if config_issues['invalid_settings']:
            logger.error(f"Invalid settings: {config_issues['invalid_settings']}")
            return 1
        
        if config_issues['warnings']:
            logger.warning(f"Configuration warnings: {config_issues['warnings']}")
        
        # Initialize orchestrator
        logger.info(f"🚀 Initializing outreach orchestrator (mode: {args.mode}, dry_run: {args.dry_run})")
        orchestrator = OutreachOrchestrator(dry_run=args.dry_run)
        
        # Run selected mode
        if args.mode == 'full':
            results = orchestrator.run_full_outreach_workflow(args.max_prospects)
            logger.info(f"Workflow completed. Total outreach: {results['total_outreach']}")
            
        elif args.mode == 'twitter':
            results = orchestrator.run_twitter_only_workflow(args.max_prospects)
            logger.info(f"Twitter workflow completed: {results}")
            
        elif args.mode == 'reddit':
            results = orchestrator.run_reddit_only_workflow()
            logger.info(f"Reddit workflow completed: {results}")
            
        elif args.mode == 'dashboard':
            dashboard = orchestrator.setup_monitoring_dashboard()
            print(json.dumps(dashboard, indent=2))
            
        elif args.mode == 'safety':
            safety_report = orchestrator.run_safety_checks()
            print(json.dumps(safety_report, indent=2))
            logger.info(f"Safety status: {safety_report['compliance_status']}")
        
        # Cleanup
        orchestrator.cleanup_session()
        
        logger.info("✅ Outreach automation completed successfully")
        return 0
        
    except KeyboardInterrupt:
        logger.info("🛑 Process interrupted by user")
        return 1
        
    except Exception as e:
        logger.error(f"❌ Fatal error: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())