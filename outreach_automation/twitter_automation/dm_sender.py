"""
Twitter DM Sender Module
Automated direct message sending using browser automation with safety and compliance features
"""

import time
import random
import logging
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException, NoSuchElementException

from airtable_manager import AirtableManager
from config.settings import TWITTER_CONFIG, BROWSER_CONFIG, get_platform_config
from utils.rate_limiter import rate_limiter
from utils.compliance_checker import compliance_checker

class TwitterDMSender:
    """
    Automated Twitter DM sender with browser automation
    Includes safety features, rate limiting, and compliance checking
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.airtable = AirtableManager()
        self.driver = None
        self.is_logged_in = False
        
        # Twitter configuration
        self.config = TWITTER_CONFIG
        self.browser_config = BROWSER_CONFIG
        
        # Message templates
        self.templates = self._load_templates()
        
        # Tracking
        self.session_stats = {
            'messages_sent': 0,
            'messages_failed': 0,
            'session_start': datetime.now(),
            'errors': []
        }
        
        self.logger.info("Twitter DM Sender initialized")
    
    def start_session(self) -> bool:
        """
        Start a new Twitter DM session by logging in
        
        Returns:
            bool: True if session started successfully
        """
        try:
            self.logger.info("Starting Twitter DM session...")
            
            # Initialize browser
            if not self._setup_browser():
                return False
            
            # Login to Twitter
            if not self._login_to_twitter():
                return False
            
            self.is_logged_in = True
            self.session_stats['session_start'] = datetime.now()
            
            self.logger.info("Twitter DM session started successfully")
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to start Twitter session: {e}")
            return False
    
    def send_dm(self, recipient_handle: str, message: str, prospect_data: Dict = None) -> bool:
        """
        Send a direct message to a Twitter user
        
        Args:
            recipient_handle: Twitter handle (without @)
            message: Message content to send
            prospect_data: Additional prospect information for tracking
            
        Returns:
            bool: True if message sent successfully
        """
        try:
            # Check rate limits first
            if not rate_limiter.can_perform_action('twitter', 'dm'):
                next_time = rate_limiter.get_next_available_time('twitter', 'dm')
                self.logger.warning(f"Rate limit reached. Next DM available at {next_time}")
                return False
            
            # Validate message content
            is_compliant, issues = compliance_checker.validate_message(
                message, 'twitter', {'name': prospect_data.get('Name', '') if prospect_data else ''}
            )
            
            if not is_compliant:
                self.logger.error(f"Message failed compliance check: {issues}")
                return False
            
            # Ensure we're logged in
            if not self.is_logged_in:
                if not self.start_session():
                    return False
            
            self.logger.info(f"Sending DM to @{recipient_handle}")
            
            # Navigate to user's profile
            if not self._navigate_to_user_profile(recipient_handle):
                return False
            
            # Open DM interface
            if not self._open_dm_interface():
                return False
            
            # Send the message
            if not self._send_message_text(message):
                return False
            
            # Record successful action
            rate_limiter.record_action('twitter', 'dm', True)
            self.session_stats['messages_sent'] += 1
            
            # Log interaction in Airtable
            if prospect_data:
                self._log_interaction(prospect_data, message, True)
            
            # Wait between actions
            wait_time = rate_limiter.wait_if_needed('twitter', 'dm')
            self.logger.info(f"DM sent successfully. Waiting {wait_time:.1f}s before next action")
            
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to send DM to @{recipient_handle}: {e}")
            self.session_stats['messages_failed'] += 1
            self.session_stats['errors'].append(str(e))
            
            # Record failed action
            rate_limiter.record_action('twitter', 'dm', False)
            
            # Log failed interaction
            if prospect_data:
                self._log_interaction(prospect_data, message, False, str(e))
            
            return False
    
    def send_bulk_dms(self, prospects: List[Dict], template_name: str = None) -> Dict:
        """
        Send DMs to multiple prospects
        
        Args:
            prospects: List of prospect dictionaries
            template_name: Name of template to use, or None for auto-selection
            
        Returns:
            Dict: Results summary
        """
        results = {
            'total_prospects': len(prospects),
            'messages_sent': 0,
            'messages_failed': 0,
            'rate_limited': 0,
            'compliance_failures': 0,
            'errors': []
        }
        
        try:
            # Start session if needed
            if not self.is_logged_in:
                if not self.start_session():
                    results['errors'].append("Failed to start Twitter session")
                    return results
            
            for i, prospect in enumerate(prospects, 1):
                try:
                    self.logger.info(f"Processing prospect {i}/{len(prospects)}: {prospect.get('Name', 'Unknown')}")
                    
                    # Get Twitter handle
                    twitter_handle = prospect.get('Twitter Handle', '').replace('@', '')
                    if not twitter_handle:
                        self.logger.warning(f"No Twitter handle for {prospect.get('Name', 'Unknown')}")
                        results['messages_failed'] += 1
                        continue
                    
                    # Select and personalize message
                    message = self._prepare_personalized_message(prospect, template_name)
                    if not message:
                        results['compliance_failures'] += 1
                        continue
                    
                    # Check rate limits
                    if not rate_limiter.can_perform_action('twitter', 'dm'):
                        self.logger.warning("Rate limit reached, stopping bulk send")
                        results['rate_limited'] += 1
                        break
                    
                    # Send the DM
                    success = self.send_dm(twitter_handle, message, prospect)
                    
                    if success:
                        results['messages_sent'] += 1
                    else:
                        results['messages_failed'] += 1
                    
                    # Progressive delay to avoid detection
                    if i < len(prospects):
                        delay = self._calculate_progressive_delay(i)
                        self.logger.info(f"Waiting {delay:.1f}s before next prospect")
                        time.sleep(delay)
                
                except Exception as e:
                    self.logger.error(f"Error processing prospect {prospect.get('Name', 'Unknown')}: {e}")
                    results['messages_failed'] += 1
                    results['errors'].append(str(e))
            
            self.logger.info(f"Bulk DM send completed: {results['messages_sent']} sent, {results['messages_failed']} failed")
            return results
            
        except Exception as e:
            self.logger.error(f"Bulk DM send failed: {e}")
            results['errors'].append(str(e))
            return results
    
    def close_session(self):
        """Close the Twitter session and browser"""
        try:
            if self.driver:
                self.driver.quit()
                self.driver = None
            
            self.is_logged_in = False
            
            # Log session statistics
            session_duration = (datetime.now() - self.session_stats['session_start']).total_seconds()
            self.logger.info(f"Session closed. Duration: {session_duration:.1f}s, Messages sent: {self.session_stats['messages_sent']}")
            
        except Exception as e:
            self.logger.error(f"Error closing session: {e}")
    
    def _setup_browser(self) -> bool:
        """Setup and configure the browser"""
        try:
            chrome_options = Options()
            
            if self.browser_config['headless_mode']:
                chrome_options.add_argument("--headless")
            
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--disable-blink-features=AutomationControlled")
            chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
            chrome_options.add_experimental_option('useAutomationExtension', False)
            
            # Random user agent
            user_agent = random.choice(self.browser_config['user_agents'])
            chrome_options.add_argument(f"--user-agent={user_agent}")
            
            # Window size
            width, height = self.browser_config['window_size']
            chrome_options.add_argument(f"--window-size={width},{height}")
            
            self.driver = webdriver.Chrome(options=chrome_options)
            
            # Remove automation indicators
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            # Set timeouts
            self.driver.implicitly_wait(self.browser_config['implicit_wait'])
            self.driver.set_page_load_timeout(self.browser_config['page_load_timeout'])
            
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to setup browser: {e}")
            return False
    
    def _login_to_twitter(self) -> bool:
        """Login to Twitter"""
        try:
            self.logger.info("Logging into Twitter...")
            
            # Navigate to Twitter login
            self.driver.get("https://twitter.com/login")
            
            # Wait for login form
            wait = WebDriverWait(self.driver, 10)
            
            # Enter username
            username_input = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'input[autocomplete="username"]'))
            )
            username_input.clear()
            username_input.send_keys(self.config['username'])
            
            # Click next
            next_button = self.driver.find_element(By.XPATH, '//span[text()="Next"]/..')
            next_button.click()
            
            # Wait and enter password
            time.sleep(2)
            password_input = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'input[type="password"]'))
            )
            password_input.clear()
            password_input.send_keys(self.config['password'])
            
            # Click login
            login_button = self.driver.find_element(By.XPATH, '//span[text()="Log in"]/..')
            login_button.click()
            
            # Wait for home page to load
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="SideNav_AccountSwitcher_Button"]')))
            
            self.logger.info("Successfully logged into Twitter")
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to login to Twitter: {e}")
            return False
    
    def _navigate_to_user_profile(self, username: str) -> bool:
        """Navigate to a user's Twitter profile"""
        try:
            profile_url = f"https://twitter.com/{username}"
            self.driver.get(profile_url)
            
            # Wait for profile to load
            wait = WebDriverWait(self.driver, 10)
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="UserName"]')))
            
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to navigate to @{username}: {e}")
            return False
    
    def _open_dm_interface(self) -> bool:
        """Open the direct message interface"""
        try:
            wait = WebDriverWait(self.driver, 10)
            
            # Look for message button
            message_button = wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="sendDMFromProfile"]'))
            )
            message_button.click()
            
            # Wait for DM compose window
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="dmComposerTextInput"]')))
            
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to open DM interface: {e}")
            return False
    
    def _send_message_text(self, message: str) -> bool:
        """Send the actual message text"""
        try:
            wait = WebDriverWait(self.driver, 10)
            
            # Find message input
            message_input = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="dmComposerTextInput"]'))
            )
            
            # Type message with human-like delays
            for char in message:
                message_input.send_keys(char)
                time.sleep(random.uniform(0.02, 0.08))
            
            # Wait a moment
            time.sleep(random.uniform(1, 3))
            
            # Send message
            send_button = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="dmComposerSendButton"]')
            send_button.click()
            
            # Wait for message to be sent
            time.sleep(2)
            
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to send message text: {e}")
            return False
    
    def _load_templates(self) -> Dict:
        """Load message templates from JSON file"""
        try:
            import json
            with open('/Users/nataliebasque/Ad Workflow/outreach_automation/config/templates.json', 'r') as f:
                templates = json.load(f)
            return templates.get('twitter_templates', {})
        except Exception as e:
            self.logger.error(f"Failed to load templates: {e}")
            return {}
    
    def _prepare_personalized_message(self, prospect: Dict, template_name: str = None) -> Optional[str]:
        """Prepare a personalized message for the prospect"""
        try:
            # Select template based on prospect's pain points or use specified template
            if template_name:
                template_data = self._get_template_by_name(template_name)
            else:
                template_data = self._select_template_for_prospect(prospect)
            
            if not template_data:
                self.logger.error("No suitable template found")
                return None
            
            # Personalize the message
            message = template_data['template']
            
            # Replace variables
            replacements = {
                'name': prospect.get('Name', '').split(' ')[0],  # First name
                'company': prospect.get('Company', ''),
                'industry': prospect.get('Industry', ''),
                'pain_point': ', '.join(prospect.get('Pain Points', [])) if prospect.get('Pain Points') else 'marketing challenges'
            }
            
            for var, value in replacements.items():
                message = message.replace(f'{{{var}}}', str(value))
            
            # Final compliance check
            is_compliant, issues = compliance_checker.validate_message(message, 'twitter', {'name': replacements['name']})
            
            if not is_compliant:
                self.logger.error(f"Personalized message failed compliance: {issues}")
                return None
            
            return message
            
        except Exception as e:
            self.logger.error(f"Failed to prepare personalized message: {e}")
            return None
    
    def _select_template_for_prospect(self, prospect: Dict) -> Optional[Dict]:
        """Select the most appropriate template for a prospect"""
        pain_points = prospect.get('Pain Points', [])
        
        # Map pain points to templates
        if 'Creative Fatigue' in pain_points:
            return self._get_template_by_name('creative_fatigue_hook')
        elif 'Rising CAC' in pain_points:
            return self._get_template_by_name('cac_optimization')
        elif 'Agency Issues' in pain_points:
            return self._get_template_by_name('agency_frustration')
        else:
            # Default to creative fatigue template
            return self._get_template_by_name('creative_fatigue_hook')
    
    def _get_template_by_name(self, template_name: str) -> Optional[Dict]:
        """Get template by name"""
        initial_dms = self.templates.get('initial_dm', [])
        for template in initial_dms:
            if template.get('name') == template_name:
                return template
        return None
    
    def _calculate_progressive_delay(self, message_count: int) -> float:
        """Calculate progressive delay to reduce detection risk"""
        base_delay = random.uniform(30, 90)
        
        # Increase delay with more messages sent
        multiplier = 1 + (message_count * 0.1)
        
        # Add randomization
        jitter = random.uniform(0.8, 1.4)
        
        return base_delay * multiplier * jitter
    
    def _log_interaction(self, prospect_data: Dict, message: str, success: bool, error: str = None):
        """Log interaction to Airtable"""
        try:
            interaction_data = {
                'Prospect': prospect_data.get('Name', ''),
                'Platform': 'Twitter',
                'Interaction Type': 'Direct Message',
                'Message Content': message[:500],  # Truncate for storage
                'Date': datetime.now().isoformat(),
                'Delivered': success,
                'Response Status': 'Sent' if success else 'Failed',
                'Notes': error if error else 'Message sent successfully'
            }
            
            self.airtable.log_interaction(interaction_data)
            
        except Exception as e:
            self.logger.error(f"Failed to log interaction: {e}")
    
    def get_session_stats(self) -> Dict:
        """Get current session statistics"""
        duration = (datetime.now() - self.session_stats['session_start']).total_seconds()
        
        return {
            **self.session_stats,
            'session_duration_seconds': duration,
            'success_rate': (self.session_stats['messages_sent'] / 
                           (self.session_stats['messages_sent'] + self.session_stats['messages_failed']) * 100) 
                           if (self.session_stats['messages_sent'] + self.session_stats['messages_failed']) > 0 else 0
        }

if __name__ == "__main__":
    # Test the DM sender
    logging.basicConfig(level=logging.INFO)
    
    print("🐦 Testing Twitter DM Sender...")
    
    dm_sender = TwitterDMSender()
    
    # Test session start (won't actually work without credentials)
    print("Testing session initialization...")
    
    # Test message personalization
    test_prospect = {
        'Name': 'John Smith',
        'Company': 'TechCorp',
        'Industry': 'SaaS',
        'Pain Points': ['Creative Fatigue'],
        'Twitter Handle': '@johnsmith'
    }
    
    message = dm_sender._prepare_personalized_message(test_prospect)
    print(f"Personalized message: {message}")
    
    print("✅ Twitter DM Sender test completed!")