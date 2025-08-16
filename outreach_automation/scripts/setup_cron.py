#!/usr/bin/env python3
"""
Cron Job Setup Script
Automatically configures cron jobs for Reddit automation workflow
Sets up scheduled scanning and posting execution
"""

import os
import sys
import subprocess
import logging
from datetime import datetime
from pathlib import Path

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config.settings import SCHEDULE_CONFIG

class CronJobSetup:
    """
    Manages cron job setup for automated Reddit workflow
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        
        # Get absolute paths
        self.project_root = Path(__file__).parent.parent.absolute()
        self.python_path = sys.executable
        
        # Verify paths
        self.scanner_script = self.project_root / "reddit_automation" / "opportunity_scanner.py"
        self.executor_script = self.project_root / "reddit_automation" / "posting_executor.py"
        
        self.logger.info(f"Project root: {self.project_root}")
        self.logger.info(f"Python path: {self.python_path}")
    
    def setup_cron_jobs(self, dry_run: bool = False) -> bool:
        """
        Set up all cron jobs for the Reddit automation workflow
        
        Args:
            dry_run: If True, show what would be added without actually adding
            
        Returns:
            bool: Success status
        """
        try:
            self.logger.info("🕐 Setting up cron jobs for Reddit automation...")
            
            # Verify scripts exist
            if not self._verify_scripts():
                return False
            
            # Generate cron entries
            cron_entries = self._generate_cron_entries()
            
            if dry_run:
                self.logger.info("DRY RUN: Would add the following cron entries:")
                for entry in cron_entries:
                    print(f"   {entry}")
                return True
            
            # Add cron jobs
            success = self._add_cron_jobs(cron_entries)
            
            if success:
                self.logger.info("✅ Cron jobs setup completed successfully!")
                self._show_cron_status()
            else:
                self.logger.error("❌ Failed to setup cron jobs")
            
            return success
            
        except Exception as e:
            self.logger.error(f"Error setting up cron jobs: {e}")
            return False
    
    def _verify_scripts(self) -> bool:
        """Verify that all required scripts exist and are executable"""
        try:
            scripts = [self.scanner_script, self.executor_script]
            
            for script in scripts:
                if not script.exists():
                    self.logger.error(f"Script not found: {script}")
                    return False
                
                # Make script executable
                os.chmod(script, 0o755)
                self.logger.debug(f"Made executable: {script}")
            
            return True
            
        except Exception as e:
            self.logger.error(f"Error verifying scripts: {e}")
            return False
    
    def _generate_cron_entries(self) -> list:
        """Generate cron entries based on schedule configuration"""
        entries = []
        
        # Get timezone (EST = UTC-5, EDT = UTC-4)
        # For simplicity, using EST (UTC-5) - adjust based on your needs
        
        # Opportunity scanning jobs (8 AM, 12 PM, 6 PM, 10 PM EST)
        scan_times_utc = [
            (13, 0),  # 8 AM EST = 1 PM UTC
            (17, 0),  # 12 PM EST = 5 PM UTC  
            (23, 0),  # 6 PM EST = 11 PM UTC
            (3, 0)    # 10 PM EST = 3 AM UTC (next day)
        ]
        
        for hour, minute in scan_times_utc:
            cron_entry = f"{minute} {hour} * * * cd {self.project_root} && {self.python_path} reddit_automation/opportunity_scanner.py >> /tmp/reddit_scanner.log 2>&1"
            entries.append(cron_entry)
        
        # Posting execution job (every 15 minutes)
        posting_entry = f"*/15 * * * * cd {self.project_root} && {self.python_path} reddit_automation/posting_executor.py >> /tmp/reddit_executor.log 2>&1"
        entries.append(posting_entry)
        
        # Daily cleanup job (remove old logs, etc.) at 2 AM UTC
        cleanup_entry = f"0 2 * * * find /tmp -name 'reddit_*.log' -mtime +7 -delete"
        entries.append(cleanup_entry)
        
        return entries
    
    def _add_cron_jobs(self, cron_entries: list) -> bool:
        """Add cron jobs to the user's crontab"""
        try:
            # Get current crontab
            try:
                current_crontab = subprocess.check_output(['crontab', '-l'], 
                                                        stderr=subprocess.DEVNULL).decode('utf-8')
            except subprocess.CalledProcessError:
                # No crontab exists yet
                current_crontab = ""
            
            # Add header comment if not present
            header = "# Reddit Automation Workflow - Generated by setup_cron.py\\n"
            if header not in current_crontab:
                current_crontab += f"\\n{header}"
            
            # Add new entries (avoid duplicates)
            new_crontab = current_crontab
            for entry in cron_entries:
                # Check if similar entry already exists
                entry_command = entry.split('/')[-1].split()[0]  # Extract script name
                
                if entry_command not in current_crontab:
                    new_crontab += f"{entry}\\n"
                    self.logger.info(f"Added: {entry}")
                else:
                    self.logger.info(f"Already exists: {entry_command}")
            
            # Install new crontab
            process = subprocess.Popen(['crontab', '-'], stdin=subprocess.PIPE)
            process.communicate(input=new_crontab.encode('utf-8'))
            
            if process.returncode == 0:
                self.logger.info("Crontab updated successfully")
                return True
            else:
                self.logger.error("Failed to update crontab")
                return False
            
        except Exception as e:
            self.logger.error(f"Error adding cron jobs: {e}")
            return False
    
    def _show_cron_status(self):
        """Show current cron jobs related to Reddit automation"""
        try:
            self.logger.info("📋 Current Reddit automation cron jobs:")
            
            # Get current crontab
            current_crontab = subprocess.check_output(['crontab', '-l']).decode('utf-8')
            
            # Filter for Reddit-related jobs
            reddit_jobs = []
            for line in current_crontab.split('\\n'):
                if 'reddit' in line.lower() and not line.strip().startswith('#'):
                    reddit_jobs.append(line.strip())
            
            if reddit_jobs:
                for job in reddit_jobs:
                    print(f"   {job}")
            else:
                print("   No Reddit automation jobs found")
            
        except subprocess.CalledProcessError:
            self.logger.warning("No crontab found")
        except Exception as e:
            self.logger.error(f"Error showing cron status: {e}")
    
    def remove_cron_jobs(self) -> bool:
        """Remove Reddit automation cron jobs"""
        try:
            self.logger.info("🗑️  Removing Reddit automation cron jobs...")
            
            # Get current crontab
            current_crontab = subprocess.check_output(['crontab', '-l']).decode('utf-8')
            
            # Filter out Reddit-related jobs
            new_lines = []
            removed_count = 0
            
            for line in current_crontab.split('\\n'):
                if 'reddit' not in line.lower() or line.strip().startswith('#'):
                    new_lines.append(line)
                else:
                    removed_count += 1
                    self.logger.info(f"Removing: {line.strip()}")
            
            # Update crontab
            new_crontab = '\\n'.join(new_lines)
            process = subprocess.Popen(['crontab', '-'], stdin=subprocess.PIPE)
            process.communicate(input=new_crontab.encode('utf-8'))
            
            if process.returncode == 0:
                self.logger.info(f"✅ Removed {removed_count} Reddit automation cron jobs")
                return True
            else:
                self.logger.error("Failed to update crontab")
                return False
            
        except subprocess.CalledProcessError:
            self.logger.warning("No crontab found")
            return True
        except Exception as e:
            self.logger.error(f"Error removing cron jobs: {e}")
            return False
    
    def test_scripts(self) -> bool:
        """Test that scripts can run successfully"""
        try:
            self.logger.info("🧪 Testing scripts...")
            
            # Test scanner script
            self.logger.info("Testing opportunity scanner...")
            scanner_result = subprocess.run([
                self.python_path, str(self.scanner_script), '--test', '--dry-run'
            ], capture_output=True, text=True, cwd=self.project_root)
            
            if scanner_result.returncode == 0:
                self.logger.info("✅ Scanner test passed")
            else:
                self.logger.error(f"❌ Scanner test failed: {scanner_result.stderr}")
                return False
            
            # Test executor script
            self.logger.info("Testing posting executor...")
            executor_result = subprocess.run([
                self.python_path, str(self.executor_script), '--test', '--dry-run'
            ], capture_output=True, text=True, cwd=self.project_root)
            
            if executor_result.returncode == 0:
                self.logger.info("✅ Executor test passed")
            else:
                self.logger.error(f"❌ Executor test failed: {executor_result.stderr}")
                return False
            
            return True
            
        except Exception as e:
            self.logger.error(f"Error testing scripts: {e}")
            return False
    
    def show_schedule_info(self):
        """Show information about the automation schedule"""
        print("\\n📅 Reddit Automation Schedule:")
        print("=" * 50)
        
        scan_times = SCHEDULE_CONFIG['scan_times']
        for i, time_info in enumerate(scan_times, 1):
            hour = time_info['hour']
            minute = time_info['minute']
            period = 'AM' if hour < 12 else 'PM'
            display_hour = hour if hour <= 12 else hour - 12
            if display_hour == 0:
                display_hour = 12
            
            print(f"Scan {i}: {display_hour}:{minute:02d} {period} EST")
        
        print(f"\\nPosting Check: Every {SCHEDULE_CONFIG['posting_check_interval']} minutes")
        print(f"Max Posts/Hour: {SCHEDULE_CONFIG['posting_limits']['max_per_hour']}")
        print(f"Max Posts/Day: {SCHEDULE_CONFIG['posting_limits']['max_per_day']}")
        print(f"Min Gap: {SCHEDULE_CONFIG['posting_limits']['min_gap_minutes']} minutes")
        print(f"Max Gap: {SCHEDULE_CONFIG['posting_limits']['max_gap_minutes']} minutes")

def main():
    """Main entry point for cron setup"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Reddit Automation Cron Setup')
    parser.add_argument('action', choices=['setup', 'remove', 'test', 'status', 'schedule'], 
                       help='Action to perform')
    parser.add_argument('--dry-run', action='store_true', 
                       help='Show what would be done without doing it')
    parser.add_argument('--verbose', '-v', action='store_true', 
                       help='Enable verbose logging')
    
    args = parser.parse_args()
    
    # Setup logging
    log_level = logging.DEBUG if args.verbose else logging.INFO
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Create setup manager
    cron_setup = CronJobSetup()
    
    try:
        if args.action == 'setup':
            success = cron_setup.setup_cron_jobs(dry_run=args.dry_run)
            sys.exit(0 if success else 1)
            
        elif args.action == 'remove':
            success = cron_setup.remove_cron_jobs()
            sys.exit(0 if success else 1)
            
        elif args.action == 'test':
            success = cron_setup.test_scripts()
            sys.exit(0 if success else 1)
            
        elif args.action == 'status':
            cron_setup._show_cron_status()
            
        elif args.action == 'schedule':
            cron_setup.show_schedule_info()
        
    except KeyboardInterrupt:
        print("\\n⏹️  Operation interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\\n❌ Operation failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()