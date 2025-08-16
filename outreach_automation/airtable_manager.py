"""
Airtable Manager for Apsics Media Outreach Automation
Handles all database operations for prospect management and campaign tracking
"""

import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import logging
from pyairtable import Api
from config.settings import AIRTABLE_CONFIG, SAFETY_CONFIG

class AirtableManager:
    def __init__(self):
        """Initialize Airtable connection"""
        self.api = Api(AIRTABLE_CONFIG['api_key'])
        self.base = self.api.base(AIRTABLE_CONFIG['base_id'])
        
        # Table references
        self.prospects_table = self.base.table(AIRTABLE_CONFIG['tables']['prospects'])
        self.campaigns_table = self.base.table(AIRTABLE_CONFIG['tables']['campaigns'])
        self.interactions_table = self.base.table(AIRTABLE_CONFIG['tables']['interactions'])
        self.pending_posts_table = self.base.table(AIRTABLE_CONFIG['tables'].get('pending_posts', 'Pending Posts'))
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def create_prospect(self, prospect_data: Dict) -> str:
        """
        Create a new prospect record
        
        Args:
            prospect_data: Dictionary containing prospect information
            
        Returns:
            str: Record ID of created prospect
        """
        try:
            # Validate required fields
            required_fields = ['Name', 'Company', 'Lead Source']
            for field in required_fields:
                if field not in prospect_data:
                    raise ValueError(f"Missing required field: {field}")
            
            # Add default values
            prospect_data.update({
                'Status': 'New',
                'First Contact Date': datetime.now().isoformat(),
                'Lead Quality Score': self._calculate_lead_score(prospect_data),
                'Priority': self._determine_priority(prospect_data)
            })
            
            record = self.prospects_table.create(prospect_data)
            self.logger.info(f"Created prospect: {prospect_data['Name']} at {prospect_data['Company']}")
            return record['id']
            
        except Exception as e:
            self.logger.error(f"Error creating prospect: {e}")
            raise
    
    def get_prospect_by_email(self, email: str) -> Optional[Dict]:
        """Get prospect by email address"""
        try:
            records = self.prospects_table.all(formula=f"{{Email}} = '{email}'")
            return records[0] if records else None
        except Exception as e:
            self.logger.error(f"Error fetching prospect by email: {e}")
            return None
    
    def get_prospects_for_outreach(self, platform: str, limit: int = 50) -> List[Dict]:
        """
        Get prospects ready for outreach on specific platform
        
        Args:
            platform: Platform to filter by (Twitter, LinkedIn, Reddit)
            limit: Maximum number of prospects to return
            
        Returns:
            List of prospect records ready for outreach
        """
        try:
            # Filter criteria
            filter_formula = f"AND({{Lead Source}} = '{platform}', {{Status}} = 'New', {{Next Follow-up Date}} <= TODAY())"
            
            records = self.prospects_table.all(
                formula=filter_formula,
                sort=['-Lead Quality Score', '-First Contact Date'],
                max_records=limit
            )
            
            self.logger.info(f"Found {len(records)} prospects ready for {platform} outreach")
            return records
            
        except Exception as e:
            self.logger.error(f"Error fetching prospects for outreach: {e}")
            return []
    
    def update_prospect_status(self, prospect_id: str, status: str, notes: str = None) -> bool:
        """Update prospect status and add notes"""
        try:
            update_data = {
                'Status': status,
                'Last Contact Date': datetime.now().isoformat()
            }
            
            if notes:
                update_data['Notes'] = notes
            
            self.prospects_table.update(prospect_id, update_data)
            self.logger.info(f"Updated prospect {prospect_id} status to {status}")
            return True
            
        except Exception as e:
            self.logger.error(f"Error updating prospect status: {e}")
            return False
    
    def log_interaction(self, interaction_data: Dict) -> str:
        """
        Log an interaction with a prospect
        
        Args:
            interaction_data: Dictionary containing interaction details
            
        Returns:
            str: Record ID of logged interaction
        """
        try:
            # Add timestamp if not provided
            if 'Date' not in interaction_data:
                interaction_data['Date'] = datetime.now().isoformat()
            
            # Set default values
            interaction_data.setdefault('Delivered', True)
            interaction_data.setdefault('Automated', True)
            interaction_data.setdefault('Compliance Check', True)
            
            record = self.interactions_table.create(interaction_data)
            
            # Update prospect's total interactions count
            if 'Prospect' in interaction_data:
                self._update_prospect_interaction_count(interaction_data['Prospect'])
            
            self.logger.info(f"Logged interaction: {interaction_data.get('Interaction Type', 'Unknown')}")
            return record['id']
            
        except Exception as e:
            self.logger.error(f"Error logging interaction: {e}")
            raise
    
    def create_campaign(self, campaign_data: Dict) -> str:
        """Create a new outreach campaign"""
        try:
            # Add default values
            campaign_data.update({
                'Status': 'Planning',
                'Start Date': datetime.now().isoformat(),
                'Total Sent': 0,
                'Responses Received': 0
            })
            
            record = self.campaigns_table.create(campaign_data)
            self.logger.info(f"Created campaign: {campaign_data['Campaign Name']}")
            return record['id']
            
        except Exception as e:
            self.logger.error(f"Error creating campaign: {e}")
            raise
    
    def update_campaign_metrics(self, campaign_id: str, metrics: Dict) -> bool:
        """Update campaign performance metrics"""
        try:
            self.campaigns_table.update(campaign_id, metrics)
            self.logger.info(f"Updated campaign {campaign_id} metrics")
            return True
            
        except Exception as e:
            self.logger.error(f"Error updating campaign metrics: {e}")
            return False
    
    def get_daily_outreach_count(self, platform: str, date: str = None) -> int:
        """Get number of outreach attempts for specific platform and date"""
        try:
            if not date:
                date = datetime.now().strftime('%Y-%m-%d')
            
            # Count interactions for the date
            filter_formula = f"AND({{Platform}} = '{platform}', DATETIME_FORMAT({{Date}}, 'YYYY-MM-DD') = '{date}')"
            
            records = self.interactions_table.all(formula=filter_formula)
            return len(records)
            
        except Exception as e:
            self.logger.error(f"Error getting daily outreach count: {e}")
            return 0
    
    def check_outreach_limits(self, platform: str) -> bool:
        """Check if daily outreach limits have been reached"""
        try:
            daily_count = self.get_daily_outreach_count(platform)
            max_daily = SAFETY_CONFIG['max_daily_outreach'].get(platform.lower(), 10)
            
            if daily_count >= max_daily:
                self.logger.warning(f"Daily limit reached for {platform}: {daily_count}/{max_daily}")
                return False
            
            return True
            
        except Exception as e:
            self.logger.error(f"Error checking outreach limits: {e}")
            return False
    
    def get_prospects_needing_followup(self, platform: str = None) -> List[Dict]:
        """Get prospects that need follow-up"""
        try:
            today = datetime.now().strftime('%Y-%m-%d')
            
            filter_formula = f"AND({{Next Follow-up Date}} <= '{today}', {{Status}} = 'Contacted')"
            
            if platform:
                filter_formula = f"AND({filter_formula}, {{Lead Source}} = '{platform}')"
            
            records = self.prospects_table.all(
                formula=filter_formula,
                sort=['-Priority', 'Next Follow-up Date']
            )
            
            self.logger.info(f"Found {len(records)} prospects needing follow-up")
            return records
            
        except Exception as e:
            self.logger.error(f"Error getting follow-up prospects: {e}")
            return []
    
    def schedule_followup(self, prospect_id: str, days_ahead: int = 3) -> bool:
        """Schedule next follow-up for a prospect"""
        try:
            next_date = (datetime.now() + timedelta(days=days_ahead)).strftime('%Y-%m-%d')
            
            self.prospects_table.update(prospect_id, {
                'Next Follow-up Date': next_date
            })
            
            self.logger.info(f"Scheduled follow-up for prospect {prospect_id} on {next_date}")
            return True
            
        except Exception as e:
            self.logger.error(f"Error scheduling follow-up: {e}")
            return False
    
    def get_campaign_performance(self, campaign_id: str) -> Dict:
        """Get detailed performance metrics for a campaign"""
        try:
            campaign = self.campaigns_table.get(campaign_id)
            
            # Get all interactions for this campaign
            interactions = self.interactions_table.all(
                formula=f"{{Campaign}} = '{campaign_id}'"
            )
            
            # Calculate metrics
            total_sent = len(interactions)
            responses = len([i for i in interactions if i['fields'].get('Responded', False)])
            response_rate = (responses / total_sent * 100) if total_sent > 0 else 0
            
            return {
                'campaign_name': campaign['fields'].get('Campaign Name'),
                'total_sent': total_sent,
                'responses': responses,
                'response_rate': round(response_rate, 2),
                'interactions': interactions
            }
            
        except Exception as e:
            self.logger.error(f"Error getting campaign performance: {e}")
            return {}
    
    def _calculate_lead_score(self, prospect_data: Dict) -> int:
        """Calculate lead quality score based on prospect attributes"""
        score = 5  # Base score
        
        # Industry bonus
        high_value_industries = ['SaaS', 'D2C', 'Subscription', 'Streaming']
        if prospect_data.get('Industry') in high_value_industries:
            score += 2
        
        # Title bonus  
        high_value_titles = ['Head of Growth', 'Marketing Director', 'CMO', 'VP Marketing']
        title = prospect_data.get('Title', '')
        if any(t in title for t in high_value_titles):
            score += 2
        
        # Company size bonus
        if prospect_data.get('Company Size') in ['25-75 employees', '75+ employees']:
            score += 1
        
        # Contact completeness bonus
        if prospect_data.get('Email'):
            score += 1
        if prospect_data.get('LinkedIn URL'):
            score += 1
            
        return min(score, 10)  # Cap at 10
    
    def _determine_priority(self, prospect_data: Dict) -> str:
        """Determine prospect priority based on lead score and other factors"""
        score = self._calculate_lead_score(prospect_data)
        
        if score >= 8:
            return 'High'
        elif score >= 6:
            return 'Medium'
        else:
            return 'Low'
    
    def _update_prospect_interaction_count(self, prospect_id: str):
        """Update the total interaction count for a prospect"""
        try:
            # Get current interaction count
            interactions = self.interactions_table.all(
                formula=f"{{Prospect}} = '{prospect_id}'"
            )
            
            count = len(interactions)
            
            self.prospects_table.update(prospect_id, {
                'Total Interactions': count
            })
            
        except Exception as e:
            self.logger.error(f"Error updating interaction count: {e}")
    
    def get_analytics_summary(self, days: int = 7) -> Dict:
        """Get analytics summary for the last N days"""
        try:
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days)
            
            # Get interactions in date range
            date_filter = f"AND({{Date}} >= '{start_date.isoformat()}', {{Date}} <= '{end_date.isoformat()}')"
            interactions = self.interactions_table.all(formula=date_filter)
            
            # Calculate summary metrics
            total_outreach = len(interactions)
            responses = len([i for i in interactions if i['fields'].get('Responded', False)])
            response_rate = (responses / total_outreach * 100) if total_outreach > 0 else 0
            
            # Platform breakdown
            platform_stats = {}
            for interaction in interactions:
                platform = interaction['fields'].get('Platform', 'Unknown')
                if platform not in platform_stats:
                    platform_stats[platform] = {'sent': 0, 'responses': 0}
                
                platform_stats[platform]['sent'] += 1
                if interaction['fields'].get('Responded', False):
                    platform_stats[platform]['responses'] += 1
            
            return {
                'period_days': days,
                'total_outreach': total_outreach,
                'total_responses': responses,
                'overall_response_rate': round(response_rate, 2),
                'platform_breakdown': platform_stats,
                'generated_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            self.logger.error(f"Error generating analytics summary: {e}")
            return {}
    
    # Pending Posts Management Methods
    def create_pending_post(self, post_data: Dict) -> str:
        """
        Create a new pending post for approval using exact Airtable field names
        
        Args:
            post_data: Dictionary containing post information with correct field names
            
        Returns:
            str: Record ID of created pending post
        """
        try:
            # Validate that we have the required fields for Airtable
            required_fields = ['Name', 'Post Title', 'Generated Response', 'Platform']
            for field in required_fields:
                if field not in post_data:
                    self.logger.error(f"Missing required field: {field}")
                    raise ValueError(f"Missing required field: {field}")
            
            # Log what we're attempting to create
            self.logger.info(f"Creating pending post: {post_data.get('Name', 'Unknown')}")
            self.logger.info(f"Fields included: {list(post_data.keys())}")
            
            # Create the record with exact field names
            record = self.pending_posts_table.create(post_data)
            
            self.logger.info(f"Successfully created pending post: {record['id']}")
            self.logger.info(f"Post title: {post_data.get('Post Title', 'Unknown')[:50]}...")
            
            return record['id']
            
        except Exception as e:
            self.logger.error(f"Error creating pending post: {e}")
            self.logger.error(f"Post data attempted: {post_data}")
            raise
    
    def get_approved_posts(self) -> List[Dict]:
        """Get all approved posts ready for posting"""
        try:
            filter_formula = "AND({Approval Status} = 'Approved', {Posted Date} = BLANK())"
            
            records = self.pending_posts_table.all(
                formula=filter_formula,
                sort=['Created Date']
            )
            
            self.logger.info(f"Found {len(records)} approved posts ready for posting")
            return records
            
        except Exception as e:
            self.logger.error(f"Error fetching approved posts: {e}")
            return []
    
    def mark_post_as_posted(self, post_id: str, reddit_post_url: str = None) -> bool:
        """Mark a pending post as successfully posted"""
        try:
            update_data = {
                'Posted Date': datetime.now().strftime('%Y-%m-%d'),
                'Approval Status': 'Posted'
            }
            
            if reddit_post_url:
                update_data['Reddit URL'] = reddit_post_url
            
            self.pending_posts_table.update(post_id, update_data)
            self.logger.info(f"Marked post {post_id} as posted")
            return True
            
        except Exception as e:
            self.logger.error(f"Error marking post as posted: {e}")
            return False
    
    def mark_post_as_failed(self, post_id: str, error_message: str) -> bool:
        """Mark a pending post as failed with error details"""
        try:
            update_data = {
                'Approval Status': 'Failed',
                'Error Message': error_message,
                'Failed Date': datetime.now().strftime('%Y-%m-%d')
            }
            
            self.pending_posts_table.update(post_id, update_data)
            self.logger.info(f"Marked post {post_id} as failed: {error_message}")
            return True
            
        except Exception as e:
            self.logger.error(f"Error marking post as failed: {e}")
            return False
    
    def get_pending_posts_count(self) -> int:
        """Get count of posts pending approval"""
        try:
            records = self.pending_posts_table.all(
                formula="{Approval Status} = 'Pending'"
            )
            return len(records)
            
        except Exception as e:
            self.logger.error(f"Error getting pending posts count: {e}")
            return 0
    
    def get_posts_by_status(self, status: str, limit: int = 50) -> List[Dict]:
        """Get posts by approval status"""
        try:
            filter_formula = f"{{Approval Status}} = '{status}'"
            
            records = self.pending_posts_table.all(
                formula=filter_formula,
                sort=['-Created Date'],
                max_records=limit
            )
            
            return records
            
        except Exception as e:
            self.logger.error(f"Error fetching posts by status: {e}")
            return []
    
    def update_post_response(self, post_id: str, new_response: str) -> bool:
        """Update the response text for a pending post"""
        try:
            update_data = {
                'Generated Response': new_response,
                'Modified Date': datetime.now().strftime('%Y-%m-%d')
            }
            
            self.pending_posts_table.update(post_id, update_data)
            self.logger.info(f"Updated response for post {post_id}")
            return True
            
        except Exception as e:
            self.logger.error(f"Error updating post response: {e}")
            return False
    
    def get_daily_post_count(self, date: str = None) -> int:
        """Get number of posts made on a specific date"""
        try:
            if not date:
                date = datetime.now().strftime('%Y-%m-%d')
            
            filter_formula = f"AND({{Approval Status}} = 'Posted', DATETIME_FORMAT({{Posted Date}}, 'YYYY-MM-DD') = '{date}')"
            
            records = self.pending_posts_table.all(formula=filter_formula)
            return len(records)
            
        except Exception as e:
            self.logger.error(f"Error getting daily post count: {e}")
            return 0
    
    def check_posting_limits(self) -> Dict[str, Any]:
        """Check current posting status against daily limits"""
        try:
            today_count = self.get_daily_post_count()
            pending_count = self.get_pending_posts_count()
            approved_count = len(self.get_approved_posts())
            
            max_daily = 8  # Maximum posts per day
            
            return {
                'posts_today': today_count,
                'pending_approval': pending_count,
                'approved_ready': approved_count,
                'can_post_more': today_count < max_daily,
                'remaining_today': max(0, max_daily - today_count)
            }
            
        except Exception as e:
            self.logger.error(f"Error checking posting limits: {e}")
            return {}

# Utility functions for easy import
def get_airtable_manager():
    """Get configured Airtable manager instance"""
    return AirtableManager()

def quick_add_prospect(name: str, company: str, email: str, source: str, **kwargs):
    """Quick way to add a prospect"""
    manager = get_airtable_manager()
    
    prospect_data = {
        'Name': name,
        'Company': company,
        'Email': email,
        'Lead Source': source,
        **kwargs
    }
    
    return manager.create_prospect(prospect_data)

if __name__ == "__main__":
    # Test the Airtable connection
    try:
        manager = AirtableManager()
        print("✅ Airtable connection successful")
        
        # Test basic operations
        summary = manager.get_analytics_summary(7)
        print(f"📊 Analytics summary: {summary}")
        
    except Exception as e:
        print(f"❌ Airtable connection failed: {e}")
        print("Please check your environment variables and Airtable configuration")