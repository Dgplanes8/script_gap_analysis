"""
Schedule Configuration and Timezone Utilities
Handles timezone conversions and schedule calculations for automated workflows
"""

from datetime import datetime, timedelta
import pytz
from typing import Dict, List, Tuple, Optional

# Timezone configurations
EST = pytz.timezone('America/New_York')
UTC = pytz.UTC

class ScheduleManager:
    """
    Manages scheduling and timezone operations for automated workflows
    """
    
    def __init__(self, timezone: str = 'America/New_York'):
        self.timezone = pytz.timezone(timezone)
        self.utc = pytz.UTC
    
    def convert_est_to_utc(self, hour: int, minute: int = 0) -> Tuple[int, int]:
        """
        Convert EST time to UTC time
        
        Args:
            hour: Hour in EST (0-23)
            minute: Minute (0-59)
            
        Returns:
            Tuple of (utc_hour, utc_minute)
        """
        try:
            # Create EST datetime
            today = datetime.now(self.timezone).date()
            est_time = self.timezone.localize(
                datetime.combine(today, datetime.min.time().replace(hour=hour, minute=minute))
            )
            
            # Convert to UTC
            utc_time = est_time.astimezone(self.utc)
            
            return utc_time.hour, utc_time.minute
            
        except Exception as e:
            # Fallback: EST is typically UTC-5 (or UTC-4 during DST)
            # Using UTC-5 as default offset
            utc_hour = (hour + 5) % 24
            return utc_hour, minute
    
    def get_current_est_time(self) -> datetime:
        """Get current time in EST"""
        return datetime.now(self.timezone)
    
    def is_within_scan_window(self, scan_times: List[Dict]) -> bool:
        """
        Check if current time is within 5 minutes of any scheduled scan time
        
        Args:
            scan_times: List of scan time dictionaries with 'hour' and 'minute'
            
        Returns:
            bool: True if within scan window
        """
        current_time = self.get_current_est_time()
        current_hour = current_time.hour
        current_minute = current_time.minute
        
        for scan_time in scan_times:
            target_hour = scan_time['hour']
            target_minute = scan_time['minute']
            
            # Calculate time difference in minutes
            target_total_minutes = target_hour * 60 + target_minute
            current_total_minutes = current_hour * 60 + current_minute
            
            time_diff = abs(current_total_minutes - target_total_minutes)
            
            # Account for day boundary (e.g., 11:58 PM vs 12:02 AM)
            if time_diff > 12 * 60:  # More than 12 hours apart
                time_diff = min(time_diff, 24 * 60 - time_diff)
            
            # Within 5 minutes of scan time
            if time_diff <= 5:
                return True
        
        return False
    
    def get_next_scan_time(self, scan_times: List[Dict]) -> Optional[datetime]:
        """
        Get the next scheduled scan time
        
        Args:
            scan_times: List of scan time dictionaries with 'hour' and 'minute'
            
        Returns:
            datetime: Next scan time in EST, or None if error
        """
        try:
            current_time = self.get_current_est_time()
            today = current_time.date()
            
            # Convert scan times to today's datetimes
            scan_datetimes = []
            for scan_time in scan_times:
                scan_dt = self.timezone.localize(
                    datetime.combine(
                        today, 
                        datetime.min.time().replace(
                            hour=scan_time['hour'], 
                            minute=scan_time['minute']
                        )
                    )
                )
                scan_datetimes.append(scan_dt)
            
            # Find next scan time today
            future_scans_today = [dt for dt in scan_datetimes if dt > current_time]
            
            if future_scans_today:
                return min(future_scans_today)
            else:
                # No more scans today, get first scan tomorrow
                tomorrow = today + timedelta(days=1)
                first_scan_tomorrow = self.timezone.localize(
                    datetime.combine(
                        tomorrow,
                        datetime.min.time().replace(
                            hour=scan_times[0]['hour'],
                            minute=scan_times[0]['minute']
                        )
                    )
                )
                return first_scan_tomorrow
                
        except Exception as e:
            return None
    
    def get_cron_schedule(self, hour_est: int, minute_est: int = 0) -> str:
        """
        Generate cron schedule string for EST time
        
        Args:
            hour_est: Hour in EST (0-23)
            minute_est: Minute (0-59)
            
        Returns:
            str: Cron schedule string
        """
        utc_hour, utc_minute = self.convert_est_to_utc(hour_est, minute_est)
        return f"{utc_minute} {utc_hour} * * *"
    
    def get_all_cron_schedules(self, scan_times: List[Dict]) -> List[str]:
        """
        Get cron schedule strings for all scan times
        
        Args:
            scan_times: List of scan time dictionaries
            
        Returns:
            List of cron schedule strings
        """
        schedules = []
        for scan_time in scan_times:
            cron_schedule = self.get_cron_schedule(
                scan_time['hour'], 
                scan_time.get('minute', 0)
            )
            schedules.append(cron_schedule)
        
        return schedules
    
    def format_time_est(self, hour: int, minute: int = 0) -> str:
        """
        Format time for display in EST
        
        Args:
            hour: Hour (0-23)
            minute: Minute (0-59)
            
        Returns:
            str: Formatted time string (e.g., "8:00 AM EST")
        """
        period = 'AM' if hour < 12 else 'PM'
        display_hour = hour if hour <= 12 else hour - 12
        if display_hour == 0:
            display_hour = 12
        
        return f"{display_hour}:{minute:02d} {period} EST"
    
    def is_business_hours(self) -> bool:
        """
        Check if current time is within business hours (9 AM - 6 PM EST)
        
        Returns:
            bool: True if within business hours
        """
        current_time = self.get_current_est_time()
        hour = current_time.hour
        
        # Business hours: 9 AM to 6 PM EST
        return 9 <= hour < 18
    
    def time_until_next_scan(self, scan_times: List[Dict]) -> Optional[timedelta]:
        """
        Calculate time until next scan
        
        Args:
            scan_times: List of scan time dictionaries
            
        Returns:
            timedelta: Time until next scan, or None if error
        """
        next_scan = self.get_next_scan_time(scan_times)
        if next_scan:
            current_time = self.get_current_est_time()
            return next_scan - current_time
        
        return None

# Global schedule manager instance
schedule_manager = ScheduleManager()

def get_schedule_manager() -> ScheduleManager:
    """Get the global schedule manager instance"""
    return schedule_manager

def format_scan_times_for_display(scan_times: List[Dict]) -> List[str]:
    """
    Format scan times for user-friendly display
    
    Args:
        scan_times: List of scan time dictionaries
        
    Returns:
        List of formatted time strings
    """
    return [
        schedule_manager.format_time_est(time_info['hour'], time_info.get('minute', 0))
        for time_info in scan_times
    ]

# Example usage and constants
REDDIT_SCAN_TIMES = [
    {'hour': 8, 'minute': 0},   # 8:00 AM EST
    {'hour': 12, 'minute': 0},  # 12:00 PM EST
    {'hour': 18, 'minute': 0},  # 6:00 PM EST
    {'hour': 22, 'minute': 0}   # 10:00 PM EST
]

if __name__ == "__main__":
    # Test the schedule manager
    manager = ScheduleManager()
    
    print("🕐 Schedule Manager Test")
    print("=" * 30)
    
    # Test timezone conversion
    print("\\nTimezone Conversions:")
    for scan_time in REDDIT_SCAN_TIMES:
        hour = scan_time['hour']
        minute = scan_time['minute']
        utc_hour, utc_minute = manager.convert_est_to_utc(hour, minute)
        
        est_formatted = manager.format_time_est(hour, minute)
        print(f"  {est_formatted} = {utc_hour:02d}:{utc_minute:02d} UTC")
    
    # Test current time
    current_est = manager.get_current_est_time()
    print(f"\\nCurrent EST time: {current_est.strftime('%Y-%m-%d %H:%M:%S %Z')}")
    
    # Test next scan time
    next_scan = manager.get_next_scan_time(REDDIT_SCAN_TIMES)
    if next_scan:
        print(f"Next scan time: {next_scan.strftime('%Y-%m-%d %H:%M:%S %Z')}")
        
        time_until = manager.time_until_next_scan(REDDIT_SCAN_TIMES)
        if time_until:
            hours = int(time_until.total_seconds() // 3600)
            minutes = int((time_until.total_seconds() % 3600) // 60)
            print(f"Time until next scan: {hours}h {minutes}m")
    
    # Test cron schedules
    print("\\nCron Schedules:")
    cron_schedules = manager.get_all_cron_schedules(REDDIT_SCAN_TIMES)
    for i, schedule in enumerate(cron_schedules):
        scan_time = REDDIT_SCAN_TIMES[i]
        est_time = manager.format_time_est(scan_time['hour'], scan_time['minute'])
        print(f"  {est_time}: {schedule}")
    
    print("\\n✅ Schedule Manager test completed!")