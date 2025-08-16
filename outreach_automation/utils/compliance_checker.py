"""
Compliance checking utilities for social media automation
Ensures all outreach meets safety standards and platform guidelines
"""

import re
import logging
from typing import Dict, List, Tuple, Optional
from datetime import datetime
from config.settings import SAFETY_CONFIG, VALUE_PROPS

class ComplianceChecker:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        
        # Prohibited content patterns
        self.spam_patterns = [
            r'act\s+now',
            r'limited\s+time',
            r'urgent',
            r'buy\s+now',
            r'click\s+here',
            r'make\s+money',
            r'guaranteed',
            r'free\s+money',
            r'earn\s+\$\d+',
        ]
        
        # Required elements for compliant messages
        self.required_elements = {
            'value_proposition': True,
            'professional_tone': True,
            'opt_out_mechanism': False,  # Not required for initial contact
            'personalization': True
        }
        
        # Platform-specific guidelines
        self.platform_guidelines = {
            'twitter': {
                'max_dm_length': 10000,
                'max_daily_dms': 25,
                'requires_following': False,
                'link_shortening_allowed': True
            },
            'linkedin': {
                'max_message_length': 8000,
                'max_daily_messages': 20,
                'requires_connection': True,
                'professional_tone_required': True
            },
            'reddit': {
                'max_comment_length': 10000,
                'value_first_required': True,
                'self_promotion_ratio': 0.1,  # Max 10% self-promotional
                'community_participation_required': True
            }
        }
    
    def validate_message(self, message: str, platform: str, context: Dict = None) -> Tuple[bool, List[str]]:
        """
        Validate a message for compliance with platform guidelines
        
        Args:
            message: The message content to validate
            platform: Platform where message will be sent
            context: Additional context about the message/recipient
            
        Returns:
            Tuple of (is_compliant, list_of_issues)
        """
        issues = []
        
        # Check message length
        length_issue = self._check_message_length(message, platform)
        if length_issue:
            issues.append(length_issue)
        
        # Check for spam patterns
        spam_issues = self._check_spam_patterns(message)
        issues.extend(spam_issues)
        
        # Check professional tone (especially for LinkedIn)
        if platform == 'linkedin':
            tone_issue = self._check_professional_tone(message)
            if tone_issue:
                issues.append(tone_issue)
        
        # Check for value proposition
        value_issue = self._check_value_proposition(message)
        if value_issue:
            issues.append(value_issue)
        
        # Check personalization
        personalization_issue = self._check_personalization(message, context)
        if personalization_issue:
            issues.append(personalization_issue)
        
        # Platform-specific checks
        platform_issues = self._check_platform_specific(message, platform, context)
        issues.extend(platform_issues)
        
        is_compliant = len(issues) == 0
        
        if not is_compliant:
            self.logger.warning(f"Message failed compliance check: {issues}")
        
        return is_compliant, issues
    
    def validate_prospect_data(self, prospect_data: Dict) -> Tuple[bool, List[str]]:
        """
        Validate prospect data for completeness and quality
        
        Args:
            prospect_data: Dictionary containing prospect information
            
        Returns:
            Tuple of (is_valid, list_of_issues)
        """
        issues = []
        
        # Required fields check
        required_fields = ['Name', 'Company', 'Lead Source']
        for field in required_fields:
            if not prospect_data.get(field):
                issues.append(f"Missing required field: {field}")
        
        # Email validation
        email = prospect_data.get('Email')
        if email and not self._is_valid_email(email):
            issues.append(f"Invalid email format: {email}")
        
        # LinkedIn URL validation
        linkedin_url = prospect_data.get('LinkedIn URL')
        if linkedin_url and not self._is_valid_linkedin_url(linkedin_url):
            issues.append(f"Invalid LinkedIn URL format: {linkedin_url}")
        
        # Company size validation
        company_size = prospect_data.get('Company Size')
        if company_size and company_size not in ['5-25 employees', '25-75 employees', '75+ employees']:
            issues.append(f"Invalid company size: {company_size}")
        
        is_valid = len(issues) == 0
        return is_valid, issues
    
    def check_daily_limits(self, platform: str, action_type: str, current_count: int) -> Tuple[bool, Optional[str]]:
        """
        Check if daily limits are being respected
        
        Args:
            platform: Platform name
            action_type: Type of action (message, like, comment)
            current_count: Current daily count
            
        Returns:
            Tuple of (within_limits, warning_message)
        """
        max_daily = SAFETY_CONFIG['max_daily_outreach'].get(platform.lower(), 10)
        
        if current_count >= max_daily:
            return False, f"Daily limit exceeded for {platform} {action_type}: {current_count}/{max_daily}"
        
        # Warning at 80% of limit
        if current_count >= max_daily * 0.8:
            remaining = max_daily - current_count
            return True, f"Approaching daily limit for {platform} {action_type}: {remaining} remaining"
        
        return True, None
    
    def generate_compliance_report(self, messages: List[Dict]) -> Dict:
        """
        Generate a compliance report for a batch of messages
        
        Args:
            messages: List of message dictionaries with content and metadata
            
        Returns:
            Dictionary containing compliance statistics and issues
        """
        total_messages = len(messages)
        compliant_messages = 0
        all_issues = []
        
        platform_stats = {}
        
        for message_data in messages:
            message = message_data.get('content', '')
            platform = message_data.get('platform', 'unknown')
            context = message_data.get('context', {})
            
            is_compliant, issues = self.validate_message(message, platform, context)
            
            if is_compliant:
                compliant_messages += 1
            else:
                all_issues.extend(issues)
            
            # Platform statistics
            if platform not in platform_stats:
                platform_stats[platform] = {'total': 0, 'compliant': 0}
            
            platform_stats[platform]['total'] += 1
            if is_compliant:
                platform_stats[platform]['compliant'] += 1
        
        compliance_rate = (compliant_messages / total_messages * 100) if total_messages > 0 else 0
        
        return {
            'total_messages': total_messages,
            'compliant_messages': compliant_messages,
            'compliance_rate': round(compliance_rate, 2),
            'common_issues': self._get_common_issues(all_issues),
            'platform_stats': platform_stats,
            'generated_at': datetime.now().isoformat()
        }
    
    def _check_message_length(self, message: str, platform: str) -> Optional[str]:
        """Check if message length is within platform limits"""
        guidelines = self.platform_guidelines.get(platform, {})
        max_length = guidelines.get('max_message_length', 1000)
        
        if len(message) > max_length:
            return f"Message too long for {platform}: {len(message)}/{max_length} characters"
        
        return None
    
    def _check_spam_patterns(self, message: str) -> List[str]:
        """Check message for spam-like patterns"""
        issues = []
        message_lower = message.lower()
        
        for pattern in self.spam_patterns:
            if re.search(pattern, message_lower):
                issues.append(f"Contains spam pattern: {pattern}")
        
        # Check for excessive capitalization
        caps_ratio = sum(1 for c in message if c.isupper()) / len(message)
        if caps_ratio > 0.3:
            issues.append(f"Excessive capitalization: {caps_ratio:.1%}")
        
        # Check for excessive punctuation
        punct_count = sum(1 for c in message if c in '!?')
        if punct_count > 3:
            issues.append(f"Excessive punctuation: {punct_count} exclamation/question marks")
        
        return issues
    
    def _check_professional_tone(self, message: str) -> Optional[str]:
        """Check if message maintains professional tone"""
        unprofessional_words = [
            'bro', 'dude', 'guys', 'omg', 'lol', 'wtf', 'sick', 'lit', 'fire'
        ]
        
        message_lower = message.lower()
        for word in unprofessional_words:
            if word in message_lower:
                return f"Unprofessional language detected: '{word}'"
        
        return None
    
    def _check_value_proposition(self, message: str) -> Optional[str]:
        """Check if message contains clear value proposition"""
        value_indicators = [
            'free', 'help', 'share', 'insight', 'experience', 'analysis',
            'framework', 'guide', 'strategy', 'optimize', 'improve'
        ]
        
        message_lower = message.lower()
        has_value = any(indicator in message_lower for indicator in value_indicators)
        
        if not has_value:
            return "No clear value proposition detected"
        
        return None
    
    def _check_personalization(self, message: str, context: Dict) -> Optional[str]:
        """Check if message is properly personalized"""
        if not context:
            return None
        
        # Check for name personalization
        name = context.get('name', '')
        if name and name.lower() not in message.lower():
            return "Message not personalized with recipient name"
        
        # Check for generic template usage
        if '{' in message and '}' in message:
            return "Message contains unreplaced template variables"
        
        return None
    
    def _check_platform_specific(self, message: str, platform: str, context: Dict) -> List[str]:
        """Check platform-specific compliance requirements"""
        issues = []
        
        if platform == 'reddit':
            # Reddit requires value-first approach
            if self._is_promotional(message):
                issues.append("Reddit message appears promotional without sufficient value")
        
        elif platform == 'linkedin':
            # LinkedIn requires professional networking approach
            if not self._has_professional_context(message):
                issues.append("LinkedIn message lacks professional context")
        
        elif platform == 'twitter':
            # Twitter specific checks
            if len(message) > 280 and 'DM' not in context.get('message_type', ''):
                issues.append("Twitter message too long for public tweet")
        
        return issues
    
    def _is_promotional(self, message: str) -> bool:
        """Check if message is primarily promotional"""
        promotional_words = [
            'buy', 'purchase', 'sale', 'discount', 'offer', 'deal',
            'price', 'cost', 'cheap', 'affordable', 'hire', 'contact us'
        ]
        
        message_lower = message.lower()
        promo_count = sum(1 for word in promotional_words if word in message_lower)
        
        # If more than 2 promotional words, likely promotional
        return promo_count > 2
    
    def _has_professional_context(self, message: str) -> bool:
        """Check if message has professional context"""
        professional_words = [
            'experience', 'industry', 'business', 'strategy', 'growth',
            'marketing', 'professional', 'expertise', 'insights', 'analysis'
        ]
        
        message_lower = message.lower()
        return any(word in message_lower for word in professional_words)
    
    def _is_valid_email(self, email: str) -> bool:
        """Validate email format"""
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(email_pattern, email) is not None
    
    def _is_valid_linkedin_url(self, url: str) -> bool:
        """Validate LinkedIn URL format"""
        linkedin_pattern = r'^https?://(?:www\.)?linkedin\.com/in/[a-zA-Z0-9-]+/?$'
        return re.match(linkedin_pattern, url) is not None
    
    def _get_common_issues(self, all_issues: List[str]) -> Dict[str, int]:
        """Get frequency count of common issues"""
        issue_counts = {}
        for issue in all_issues:
            issue_counts[issue] = issue_counts.get(issue, 0) + 1
        
        # Sort by frequency
        return dict(sorted(issue_counts.items(), key=lambda x: x[1], reverse=True))

# Global compliance checker instance
compliance_checker = ComplianceChecker()

def validate_outreach_message(message: str, platform: str, context: Dict = None) -> Tuple[bool, List[str]]:
    """Convenience function to validate outreach messages"""
    return compliance_checker.validate_message(message, platform, context)

def check_prospect_quality(prospect_data: Dict) -> Tuple[bool, List[str]]:
    """Convenience function to validate prospect data"""
    return compliance_checker.validate_prospect_data(prospect_data)

if __name__ == "__main__":
    # Test compliance checker
    checker = ComplianceChecker()
    
    print("Testing compliance checker...")
    
    # Test compliant message
    good_message = "Hi John, saw your insights on growth marketing at TechCorp. I help D2C brands optimize creative performance using AI analysis. Would love to share my free hooks framework that's helped similar SaaS companies."
    
    is_compliant, issues = checker.validate_message(good_message, 'linkedin', {'name': 'John'})
    print(f"Good message compliant: {is_compliant}, Issues: {issues}")
    
    # Test non-compliant message
    bad_message = "BUY NOW!!! GUARANTEED RESULTS!!! ACT FAST!!!"
    
    is_compliant, issues = checker.validate_message(bad_message, 'linkedin')
    print(f"Bad message compliant: {is_compliant}, Issues: {issues}")
    
    # Test prospect data
    prospect_data = {
        'Name': 'John Doe',
        'Company': 'TechCorp',
        'Email': 'john@techcorp.com',
        'Lead Source': 'LinkedIn'
    }
    
    is_valid, issues = checker.validate_prospect_data(prospect_data)
    print(f"Prospect data valid: {is_valid}, Issues: {issues}")
    
    print("Compliance checker test completed")