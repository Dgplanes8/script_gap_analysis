"""
Rate limiting utilities for social media automation
Ensures compliance with platform rate limits and terms of service
"""

import time
import random
from datetime import datetime, timedelta
from typing import Dict, Optional
import logging
from config.settings import SAFETY_CONFIG, get_safety_limits

class RateLimiter:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.daily_counts = {}
        self.last_action_times = {}
        self.hourly_counts = {}
        
    def can_perform_action(self, platform: str, action_type: str = 'general') -> bool:
        """
        Check if an action can be performed based on rate limits
        
        Args:
            platform: Platform name (twitter, linkedin, reddit)
            action_type: Type of action (message, like, comment, etc.)
            
        Returns:
            bool: True if action is allowed, False if rate limited
        """
        platform_key = f"{platform}_{action_type}"
        current_time = datetime.now()
        
        # Check daily limits
        if not self._check_daily_limit(platform, action_type):
            self.logger.warning(f"Daily limit reached for {platform_key}")
            return False
        
        # Check hourly limits
        if not self._check_hourly_limit(platform, action_type):
            self.logger.warning(f"Hourly limit reached for {platform_key}")
            return False
        
        # Check minimum time between actions
        if not self._check_minimum_interval(platform_key):
            self.logger.info(f"Minimum interval not met for {platform_key}")
            return False
        
        return True
    
    def record_action(self, platform: str, action_type: str = 'general') -> None:
        """Record that an action was performed"""
        platform_key = f"{platform}_{action_type}"
        current_time = datetime.now()
        
        # Update daily count
        daily_key = f"{platform_key}_{current_time.strftime('%Y-%m-%d')}"
        self.daily_counts[daily_key] = self.daily_counts.get(daily_key, 0) + 1
        
        # Update hourly count
        hourly_key = f"{platform_key}_{current_time.strftime('%Y-%m-%d-%H')}"
        self.hourly_counts[hourly_key] = self.hourly_counts.get(hourly_key, 0) + 1
        
        # Update last action time
        self.last_action_times[platform_key] = current_time
        
        self.logger.info(f"Recorded action: {platform_key}")
    
    def wait_if_needed(self, platform: str, action_type: str = 'general') -> float:
        """
        Wait if necessary to respect rate limits
        
        Returns:
            float: Seconds waited
        """
        if not self.can_perform_action(platform, action_type):
            wait_time = self._calculate_wait_time(platform, action_type)
            if wait_time > 0:
                self.logger.info(f"Waiting {wait_time:.1f} seconds for rate limit compliance")
                time.sleep(wait_time)
                return wait_time
        
        # Add human-like delay even if not rate limited
        human_delay = self._get_human_delay()
        time.sleep(human_delay)
        return human_delay
    
    def get_remaining_quota(self, platform: str, action_type: str = 'general') -> Dict:
        """Get remaining quota for the day and hour"""
        platform_key = f"{platform}_{action_type}"
        current_time = datetime.now()
        
        # Daily remaining
        daily_key = f"{platform_key}_{current_time.strftime('%Y-%m-%d')}"
        daily_used = self.daily_counts.get(daily_key, 0)
        daily_limit = self._get_daily_limit(platform, action_type)
        daily_remaining = max(0, daily_limit - daily_used)
        
        # Hourly remaining
        hourly_key = f"{platform_key}_{current_time.strftime('%Y-%m-%d-%H')}"
        hourly_used = self.hourly_counts.get(hourly_key, 0)
        hourly_limit = self._get_hourly_limit(platform, action_type)
        hourly_remaining = max(0, hourly_limit - hourly_used)
        
        return {
            'daily_remaining': daily_remaining,
            'daily_used': daily_used,
            'daily_limit': daily_limit,
            'hourly_remaining': hourly_remaining,
            'hourly_used': hourly_used,
            'hourly_limit': hourly_limit
        }
    
    def _check_daily_limit(self, platform: str, action_type: str) -> bool:
        """Check if daily limit has been reached"""
        platform_key = f"{platform}_{action_type}"
        current_time = datetime.now()
        daily_key = f"{platform_key}_{current_time.strftime('%Y-%m-%d')}"
        
        daily_count = self.daily_counts.get(daily_key, 0)
        daily_limit = self._get_daily_limit(platform, action_type)
        
        return daily_count < daily_limit
    
    def _check_hourly_limit(self, platform: str, action_type: str) -> bool:
        """Check if hourly limit has been reached"""
        platform_key = f"{platform}_{action_type}"
        current_time = datetime.now()
        hourly_key = f"{platform_key}_{current_time.strftime('%Y-%m-%d-%H')}"
        
        hourly_count = self.hourly_counts.get(hourly_key, 0)
        hourly_limit = self._get_hourly_limit(platform, action_type)
        
        return hourly_count < hourly_limit
    
    def _check_minimum_interval(self, platform_key: str) -> bool:
        """Check if minimum interval between actions has passed"""
        if platform_key not in self.last_action_times:
            return True
        
        current_time = datetime.now()
        last_time = self.last_action_times[platform_key]
        time_diff = (current_time - last_time).total_seconds()
        
        min_interval = SAFETY_CONFIG['delays']['min_action_delay']
        return time_diff >= min_interval
    
    def _calculate_wait_time(self, platform: str, action_type: str) -> float:
        """Calculate how long to wait before next action"""
        platform_key = f"{platform}_{action_type}"
        
        # Check if we need to wait for minimum interval
        if platform_key in self.last_action_times:
            current_time = datetime.now()
            last_time = self.last_action_times[platform_key]
            time_diff = (current_time - last_time).total_seconds()
            min_interval = SAFETY_CONFIG['delays']['min_action_delay']
            
            if time_diff < min_interval:
                return min_interval - time_diff
        
        # If hourly limit reached, wait until next hour
        if not self._check_hourly_limit(platform, action_type):
            current_time = datetime.now()
            next_hour = current_time.replace(minute=0, second=0, microsecond=0) + timedelta(hours=1)
            return (next_hour - current_time).total_seconds()
        
        return 0
    
    def _get_daily_limit(self, platform: str, action_type: str) -> int:
        """Get daily limit for platform and action type"""
        return SAFETY_CONFIG['max_daily_outreach'].get(platform.lower(), 10)
    
    def _get_hourly_limit(self, platform: str, action_type: str) -> int:
        """Get hourly limit for platform and action type"""
        try:
            limits = get_safety_limits(platform, action_type)
            return limits['max_per_hour']
        except KeyError:
            # Fallback to daily limit distributed across 8 hours
            daily_limit = self._get_daily_limit(platform, action_type)
            return max(1, daily_limit // 8)
    
    def _get_human_delay(self) -> float:
        """Get random human-like delay between actions"""
        min_seconds = SAFETY_CONFIG['delays']['min_action_delay']
        max_seconds = SAFETY_CONFIG['delays']['max_action_delay']
        
        # Use normal distribution to simulate human behavior
        mean_delay = (min_seconds + max_seconds) / 2
        std_dev = (max_seconds - min_seconds) / 6  # 99.7% within range
        
        delay = random.normalvariate(mean_delay, std_dev)
        return max(min_seconds, min(max_seconds, delay))
    
    def cleanup_old_records(self, days_to_keep: int = 7) -> None:
        """Clean up old rate limiting records"""
        cutoff_date = datetime.now() - timedelta(days=days_to_keep)
        cutoff_str = cutoff_date.strftime('%Y-%m-%d')
        
        # Clean daily counts
        keys_to_remove = []
        for key in self.daily_counts.keys():
            if key.split('_')[-1] < cutoff_str:
                keys_to_remove.append(key)
        
        for key in keys_to_remove:
            del self.daily_counts[key]
        
        # Clean hourly counts
        cutoff_hour_str = cutoff_date.strftime('%Y-%m-%d-%H')
        keys_to_remove = []
        for key in self.hourly_counts.keys():
            if key.split('_')[-1] < cutoff_hour_str:
                keys_to_remove.append(key)
        
        for key in keys_to_remove:
            del self.hourly_counts[key]
        
        self.logger.info(f"Cleaned up rate limiting records older than {days_to_keep} days")

# Global rate limiter instance
rate_limiter = RateLimiter()

def check_rate_limit(platform: str, action_type: str = 'general') -> bool:
    """Convenience function to check rate limits"""
    return rate_limiter.can_perform_action(platform, action_type)

def wait_for_rate_limit(platform: str, action_type: str = 'general') -> float:
    """Convenience function to wait for rate limits"""
    return rate_limiter.wait_if_needed(platform, action_type)

def record_platform_action(platform: str, action_type: str = 'general') -> None:
    """Convenience function to record an action"""
    rate_limiter.record_action(platform, action_type)

if __name__ == "__main__":
    # Test rate limiter
    limiter = RateLimiter()
    
    print("Testing rate limiter...")
    
    # Test Twitter actions
    for i in range(5):
        if limiter.can_perform_action('twitter', 'message'):
            print(f"Twitter message {i+1}: Allowed")
            limiter.record_action('twitter', 'message')
            limiter.wait_if_needed('twitter', 'message')
        else:
            print(f"Twitter message {i+1}: Rate limited")
    
    # Show remaining quota
    quota = limiter.get_remaining_quota('twitter', 'message')
    print(f"Twitter message quota: {quota}")
    
    print("Rate limiter test completed")