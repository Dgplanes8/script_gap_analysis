"""
Configuration settings for Apsics Media Outreach Automation
Centralized configuration management for all platforms and safety settings
"""
import os
from dotenv import load_dotenv
from typing import Dict, List, Any

# Load environment variables
load_dotenv()

# Airtable Configuration
AIRTABLE_CONFIG = {
    'api_key': os.getenv('AIRTABLE_API_KEY'),
    'base_id': os.getenv('AIRTABLE_BASE_ID'),
    'tables': {
        'prospects': 'Prospects',
        'campaigns': 'Outreach Campaigns', 
        'interactions': 'Interactions',
        'analytics': 'Analytics',
        'pending_posts': 'Pending Posts'
    }
}

# Twitter/X Configuration
TWITTER_CONFIG = {
    'username': os.getenv('TWITTER_USERNAME', ''),
    'password': os.getenv('TWITTER_PASSWORD', ''),
    'email': os.getenv('TWITTER_EMAIL', ''),
    'search_limits': {
        'max_pages_per_keyword': 3,
        'max_tweets_per_search': 100,
        'max_keywords_per_session': 5
    },
    'browser_config': {
        'headless': True,
        'user_agent_rotation': True,
        'window_size': [1920, 1080],
        'page_load_timeout': 30
    }
}

# Reddit Configuration
REDDIT_CONFIG = {
    'client_id': os.getenv('REDDIT_CLIENT_ID'),
    'client_secret': os.getenv('REDDIT_CLIENT_SECRET'),
    'username': os.getenv('REDDIT_USERNAME'),
    'password': os.getenv('REDDIT_PASSWORD'),
    'user_agent': 'ApsicsMedia Outreach Bot v1.0',
    'target_subreddits': [
        'marketing',
        'growth_hacking', 
        'entrepreneur',
        'startups',
        'SaaS',
        'digital_marketing',
        'performance_marketing',
        'ecommerce',
        'growthteam'
    ],
    'content_keywords': [
        'creative fatigue',
        'ad performance',
        'CAC rising',
        'conversion rate',
        'marketing attribution',
        'growth marketing',
        'performance marketing',
        'subscription marketing'
    ]
}

# Enhanced Rate Limits and Safety Configuration
SAFETY_CONFIG = {
    'max_daily_outreach': {
        'twitter': 25,
        'reddit': 15,
        'total': 35
    },
    'max_weekly_outreach': {
        'twitter': 150,
        'reddit': 75,
        'total': 200
    },
    'rate_limits': {
        'twitter': {
            'search': {'max_per_hour': 10, 'cooldown_seconds': 360},
            'dm': {'max_per_hour': 15, 'cooldown_seconds': 240},
            'like': {'max_per_hour': 30, 'cooldown_seconds': 120},
            'comment': {'max_per_hour': 10, 'cooldown_seconds': 360}
        },
        'reddit': {
            'comment': {'max_per_hour': 8, 'cooldown_seconds': 450},
            'post': {'max_per_hour': 3, 'cooldown_seconds': 1200},
            'search': {'max_per_hour': 20, 'cooldown_seconds': 180}
        }
    },
    'delays': {
        'min_action_delay': 30,
        'max_action_delay': 300,
        'between_prospects': [60, 180],
        'between_platforms': [300, 600]
    },
    'compliance_checks': {
        'validate_email_format': True,
        'check_duplicate_contacts': True,
        'verify_business_profiles': True,
        'respect_opt_outs': True,
        'log_all_interactions': True
    }
}

# Target Prospect Criteria
PROSPECT_CRITERIA = {
    'company_size': {
        'min_employees': 5,
        'max_employees': 75
    },
    'titles': [
        'Head of Growth',
        'Growth Marketing Manager', 
        'Performance Marketing Manager',
        'Marketing Director',
        'CMO',
        'VP Marketing',
        'Founder',
        'CEO'
    ],
    'industries': [
        'SaaS',
        'Software',
        'Subscription',
        'Streaming',
        'Newsletter',
        'EdTech',
        'FinTech',
        'HealthTech'
    ],
    'keywords': [
        'CAC',
        'customer acquisition cost',
        'creative fatigue',
        'ad performance',
        'conversion rate',
        'performance marketing',
        'growth marketing',
        'subscription growth'
    ]
}

# Browser Automation Configuration
BROWSER_CONFIG = {
    'webdriver_path': None,  # Auto-detect
    'browser_type': 'chrome',  # chrome, firefox
    'headless_mode': True,
    'implicit_wait': 10,
    'page_load_timeout': 30,
    'script_timeout': 30,
    'window_size': [1920, 1080],
    'user_agents': [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ]
}

# Message Template Configuration
MESSAGE_CONFIG = {
    'personalization_fields': [
        'first_name',
        'company_name',
        'pain_point',
        'industry',
        'title'
    ],
    'template_rotation': True,
    'a_b_testing': True,
    'response_tracking': True,
    'follow_up_sequences': {
        'initial_contact': 0,
        'follow_up_1': 3,  # days
        'follow_up_2': 7,  # days
        'final_follow_up': 14  # days
    }
}

# Apsics Media Value Propositions
VALUE_PROPS = {
    'main_offer': '10 free high-converting ad hooks',
    'credentials': '$250MM in managed ad spend over 10+ years',
    'free_consultation': 'Free 15-minute creative strategy session',
    'pain_points': [
        'Creative fatigue killing ad performance',
        'Rising CAC costs',
        'Saturated audiences', 
        'Slow agency turnaround times',
        'Need for fresh creative concepts'
    ]
}

# Automated Scheduling Configuration
SCHEDULE_CONFIG = {
    'timezone': 'America/New_York',  # EST timezone
    'scan_times': [
        {'hour': 8, 'minute': 0},   # 8:00 AM EST
        {'hour': 12, 'minute': 0},  # 12:00 PM EST
        {'hour': 18, 'minute': 0},  # 6:00 PM EST
        {'hour': 22, 'minute': 0}   # 10:00 PM EST
    ],
    'posting_check_interval': 15,  # Check for approved posts every 15 minutes
    'posting_limits': {
        'max_per_hour': 2,
        'max_per_day': 8,
        'min_gap_minutes': 3,
        'max_gap_minutes': 7
    },
    'safety_settings': {
        'dry_run_mode': False,  # Set to True for testing
        'require_approval': True,
        'max_pending_posts': 50,
        'auto_reject_after_hours': 72  # Auto-reject posts older than 72 hours
    }
}

# Approval Workflow Configuration
APPROVAL_CONFIG = {
    'default_status': 'Pending',
    'valid_statuses': ['Pending', 'Approved', 'Rejected', 'Posted', 'Failed'],
    'notification_settings': {
        'send_notifications': False,  # Enable when email is configured
        'notify_on_approval': True,
        'notify_on_posting': True,
        'notify_on_errors': True
    },
    'approval_fields': {
        'required': ['Post Title', 'Subreddit', 'Generated Response', 'Opportunity Score'],
        'optional': ['Manual Notes', 'Custom Response', 'Scheduled Time'],
        'readonly': ['Created Date', 'Posted Date', 'Scan Time', 'Platform']
    }
}

# Validation Functions
def validate_config() -> Dict[str, List[str]]:
    """Validate all configuration settings and return any issues"""
    issues = {
        'missing_env_vars': [],
        'invalid_settings': [],
        'warnings': []
    }
    
    # Check required environment variables
    required_env_vars = [
        'AIRTABLE_API_KEY',
        'AIRTABLE_BASE_ID',
        'TWITTER_USERNAME',
        'TWITTER_PASSWORD',
        'REDDIT_CLIENT_ID',
        'REDDIT_CLIENT_SECRET',
        'REDDIT_USERNAME',
        'REDDIT_PASSWORD'
    ]
    
    for var in required_env_vars:
        if not os.getenv(var):
            issues['missing_env_vars'].append(var)
    
    # Validate rate limits
    for platform, limits in SAFETY_CONFIG['rate_limits'].items():
        for action, config in limits.items():
            if config['max_per_hour'] <= 0:
                issues['invalid_settings'].append(f"{platform}.{action}.max_per_hour must be > 0")
            if config['cooldown_seconds'] <= 0:
                issues['invalid_settings'].append(f"{platform}.{action}.cooldown_seconds must be > 0")
    
    # Validate daily limits
    if SAFETY_CONFIG['max_daily_outreach']['twitter'] > 50:
        issues['warnings'].append("Twitter daily limit > 50 may trigger restrictions")
    
    if SAFETY_CONFIG['max_daily_outreach']['reddit'] > 25:
        issues['warnings'].append("Reddit daily limit > 25 may trigger restrictions")
    
    return issues

def get_platform_config(platform: str) -> Dict[str, Any]:
    """Get configuration for specific platform"""
    platform_configs = {
        'twitter': TWITTER_CONFIG,
        'reddit': REDDIT_CONFIG,
        'airtable': AIRTABLE_CONFIG
    }
    
    return platform_configs.get(platform.lower(), {})

def get_safety_limits(platform: str, action: str) -> Dict[str, int]:
    """Get safety limits for specific platform and action"""
    try:
        return SAFETY_CONFIG['rate_limits'][platform.lower()][action.lower()]
    except KeyError:
        return {'max_per_hour': 5, 'cooldown_seconds': 720}  # Conservative defaults

def is_production_mode() -> bool:
    """Check if running in production mode"""
    return os.getenv('ENVIRONMENT', 'development').lower() == 'production'

# Export all configs for easy import
__all__ = [
    'AIRTABLE_CONFIG',
    'TWITTER_CONFIG', 
    'REDDIT_CONFIG',
    'SAFETY_CONFIG',
    'PROSPECT_CRITERIA',
    'MESSAGE_CONFIG',
    'BROWSER_CONFIG',
    'VALUE_PROPS',
    'validate_config',
    'get_platform_config',
    'get_safety_limits',
    'is_production_mode'
]

if __name__ == "__main__":
    # Test configuration validation
    print("🔧 Validating configuration...")
    issues = validate_config()
    
    if issues['missing_env_vars']:
        print(f"❌ Missing environment variables: {', '.join(issues['missing_env_vars'])}")
    
    if issues['invalid_settings']:
        print(f"❌ Invalid settings: {', '.join(issues['invalid_settings'])}")
    
    if issues['warnings']:
        print(f"⚠️  Warnings: {', '.join(issues['warnings'])}")
    
    if not any(issues.values()):
        print("✅ Configuration validation passed!")
    
    print(f"🌍 Environment: {'Production' if is_production_mode() else 'Development'}")