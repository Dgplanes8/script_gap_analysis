# Social Media Outreach Automation - Setup Guide

## Overview

This automated outreach system helps Apsics Media generate qualified leads through strategic engagement on Twitter and Reddit. The system includes prospect finding, engagement automation, and content scheduling with built-in safety and compliance features.

## Quick Start

### 1. Install Dependencies

```bash
cd outreach_automation
pip install -r requirements.txt
```

### 2. Set Up Environment Variables

Create a `.env` file in the `outreach_automation` directory:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here

# Twitter/X Configuration
TWITTER_USERNAME=your_twitter_username
TWITTER_PASSWORD=your_twitter_password
TWITTER_EMAIL=your_twitter_email

# Reddit Configuration  
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password

# Optional: Environment Settings
ENVIRONMENT=development  # or 'production'
DEBUG_MODE=true
DRY_RUN=true  # Set to false for live outreach
```

### 3. Set Up Airtable Base

Create an Airtable base with these tables:

**Prospects Table:**
- Name (Single line text)
- Company (Single line text)
- Title (Single line text)
- Email (Email)
- Twitter Handle (Single line text)
- LinkedIn URL (URL)
- Lead Source (Single select: Twitter, Reddit)
- Industry (Single select: SaaS, D2C, Subscription, etc.)
- Pain Points (Multiple select: Creative Fatigue, Rising CAC, etc.)
- Status (Single select: New, Contacted, Responded, Qualified)
- Lead Quality Score (Number: 1-10)
- Priority (Single select: High, Medium, Low)
- First Contact Date (Date)
- Last Contact Date (Date)
- Next Follow-up Date (Date)
- Notes (Long text)

**Interactions Table:**
- Prospect (Link to Prospects)
- Platform (Single select: Twitter, Reddit)
- Interaction Type (Single select: Direct Message, Comment, etc.)
- Date (Date & time)
- Message Content (Long text)
- Delivered (Checkbox)
- Responded (Checkbox)
- Response Status (Single select: Sent, Failed, Responded)
- Campaign (Single line text)
- Notes (Long text)

**Outreach Campaigns Table:**
- Campaign Name (Single line text)
- Platform (Single select: Twitter, Reddit, Multi-platform)
- Status (Single select: Planning, Active, Paused, Completed)
- Start Date (Date)
- End Date (Date)
- Target Audience (Long text)
- Total Sent (Number)
- Responses Received (Number)
- Response Rate (Percent)

### 4. Configure Reddit API

1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App" or "Create Another App"
3. Choose "script" as the app type
4. Use `http://localhost:8080` as redirect URI
5. Copy the client ID and secret to your `.env` file

### 5. Set Up Chrome WebDriver

For Twitter automation (Selenium):

```bash
# Install Chrome if not already installed
# macOS:
brew install --cask google-chrome

# Install ChromeDriver automatically (handled by webdriver-manager)
# No manual setup required
```

### 6. Test Configuration

```bash
python -c "from config.settings import validate_config; print(validate_config())"
```

## Usage

### Run Full Automation (Dry Run)

```bash
python main_orchestrator.py --mode full --dry-run --max-prospects 10
```

### Run Twitter Only

```bash
python main_orchestrator.py --mode twitter --max-prospects 15
```

### Run Reddit Only

```bash
python main_orchestrator.py --mode reddit
```

### Check System Status

```bash
python main_orchestrator.py --mode dashboard
```

### Run Safety Checks

```bash
python main_orchestrator.py --mode safety
```

## Safety Features

### Built-in Rate Limiting

- **Twitter**: Max 25 DMs/day, 30 likes/hour, 10 comments/hour
- **Reddit**: Max 15 responses/day, 8 comments/hour, 3 posts/hour
- Intelligent delays between actions (30-300 seconds)
- Progressive delays to avoid detection

### Compliance Checks

- Message content validation
- Spam pattern detection
- Professional tone verification
- Value-first content requirements
- Platform-specific guidelines enforcement

### Monitoring & Alerts

- Daily usage tracking
- Rate limit monitoring
- Performance analytics
- Error logging and reporting

## Directory Structure

```
outreach_automation/
├── main_orchestrator.py          # Main entry point
├── airtable_manager.py           # Database operations
├── requirements.txt              # Python dependencies
├── SETUP.md                     # This file
├── README.md                    # Project overview
├── config/
│   ├── settings.py              # Configuration management
│   └── templates.json           # Message templates
├── utils/
│   ├── rate_limiter.py          # Rate limiting system
│   └── compliance_checker.py    # Safety validation
├── twitter_automation/
│   ├── prospect_finder.py       # Find Twitter prospects
│   ├── dm_sender.py            # Send direct messages
│   └── engagement_tracker.py   # Track engagement
├── reddit_automation/
│   ├── community_monitor.py    # Monitor subreddits
│   ├── comment_responder.py    # Post value comments
│   └── content_scheduler.py    # Schedule strategic posts
├── logs/                       # Application logs
└── reports/                    # Session reports
```

## Advanced Configuration

### Customizing Target Criteria

Edit `config/settings.py`:

```python
PROSPECT_CRITERIA = {
    'minimum_quality_score': 6,
    'industry_targets': ['SaaS', 'D2C', 'Subscription'],
    'title_keywords': ['Head of Growth', 'Marketing Director'],
    'company_size_targets': ['25-75 employees']
}
```

### Adjusting Safety Limits

```python
SAFETY_CONFIG = {
    'max_daily_outreach': {
        'twitter': 25,  # Conservative limit
        'reddit': 15
    },
    'rate_limits': {
        'twitter': {
            'dm': {'max_per_hour': 15, 'cooldown_seconds': 240}
        }
    }
}
```

### Custom Message Templates

Edit `config/templates.json` to add your own templates:

```json
{
  "twitter_templates": {
    "initial_dm": [
      {
        "name": "custom_template",
        "template": "Hi {name}! Custom message...",
        "variables": ["name", "company"],
        "use_case": "Custom use case"
      }
    ]
  }
}
```

## Troubleshooting

### Common Issues

**1. "Missing environment variables" error**
- Check your `.env` file exists and has all required variables
- Verify API credentials are correct

**2. "Reddit API connection failed"**
- Verify Reddit app credentials
- Check if Reddit account has sufficient karma/age
- Ensure app type is set to "script"

**3. "Chrome driver not found"**
- Install Chrome browser
- Run `pip install webdriver-manager` if not already installed

**4. "Airtable connection failed"**
- Verify API key and base ID
- Check table names match exactly
- Ensure API key has read/write permissions

**5. Rate limiting too aggressive**
- Adjust limits in `config/settings.py`
- Check if running in production mode
- Review recent activity in logs

### Debug Mode

Enable debug logging:

```bash
python main_orchestrator.py --log-level DEBUG --dry-run
```

### Log Files

Check logs in the `logs/` directory:
- `outreach_YYYYMMDD.log` - Daily log files
- Recent errors and performance metrics

## Production Deployment

### 1. Environment Setup

```bash
# Set production environment
echo "ENVIRONMENT=production" >> .env
echo "DRY_RUN=false" >> .env
echo "DEBUG_MODE=false" >> .env
```

### 2. Automated Scheduling

Set up cron jobs for regular execution:

```bash
# Run full workflow daily at 9 AM
0 9 * * * cd /path/to/outreach_automation && python main_orchestrator.py --mode full

# Safety checks every 4 hours  
0 */4 * * * cd /path/to/outreach_automation && python main_orchestrator.py --mode safety

# Reddit content posting check hourly
0 * * * * cd /path/to/outreach_automation && python main_orchestrator.py --mode reddit
```

### 3. Monitoring Setup

- Set up log rotation for `logs/` directory
- Monitor `reports/` for session analytics
- Set up alerts for safety violations
- Regular backup of Airtable data

### 4. Security Considerations

- Rotate API credentials regularly
- Use secure server with firewall
- Monitor for unusual activity patterns
- Keep dependencies updated

## Support

For technical issues:
1. Check the logs in `logs/` directory
2. Run safety checks: `python main_orchestrator.py --mode safety`
3. Test individual components in dry-run mode
4. Review configuration with `validate_config()`

## Best Practices

### Content Quality
- Always provide value before any promotion
- Personalize messages based on prospect data
- Follow platform-specific community guidelines
- Monitor response rates and adjust approach

### Safety & Compliance
- Start with conservative limits
- Monitor platform restrictions
- Use dry-run mode for testing
- Regular safety audits

### Performance Optimization
- Track response rates by template
- A/B test different approaches
- Analyze timing for optimal engagement
- Regular prospect quality review

---

**Note**: This system is designed for legitimate business outreach only. Always respect platform terms of service and community guidelines. Use responsibly and maintain the highest standards of professional communication.