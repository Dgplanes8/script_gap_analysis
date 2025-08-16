# Social Media Outreach Automation

## Overview
Automated lead generation system for Apsics Media using free tools and APIs to prospect and engage with potential clients across Twitter/X, LinkedIn, and Reddit.

## Features
- **Multi-platform prospecting**: Twitter, LinkedIn, Reddit
- **Airtable integration**: Centralized prospect database
- **Free tool stack**: No recurring API costs
- **Compliance-first**: Respects platform terms and rate limits
- **Template automation**: Personalized outreach using existing Apsics content

## Tool Stack (100% Free)
- **pyairtable**: Airtable API integration for prospect database
- **socialreaper**: Multi-platform social media scraping
- **twitter-scraper**: Free Twitter data extraction
- **PRAW**: Reddit API wrapper
- **selenium**: Browser automation for LinkedIn
- **requests + BeautifulSoup**: Web scraping utilities

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables in `.env`:
```
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_base_id
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password
```

## Project Structure
```
outreach_automation/
├── airtable_manager.py          # Central Airtable database operations
├── config/
│   ├── settings.py              # Configuration management
│   └── templates.json           # Outreach message templates
├── twitter_automation/
│   ├── prospect_finder.py       # Twitter prospect identification
│   ├── dm_sender.py            # Automated Twitter DM sending
│   └── engagement_tracker.py   # Track Twitter interactions
├── linkedin_automation/
│   ├── prospect_finder.py       # LinkedIn prospect search
│   ├── connection_manager.py    # Connection request automation
│   └── message_sender.py        # LinkedIn message automation
├── reddit_automation/
│   ├── community_monitor.py     # Monitor relevant subreddits
│   ├── comment_responder.py     # Automated value-driven comments
│   └── content_scheduler.py     # Schedule Reddit posts
└── utils/
    ├── rate_limiter.py          # Platform-specific rate limiting
    ├── compliance_checker.py    # Safety and compliance monitoring
    └── analytics.py             # Performance tracking and reporting
```

## Target Audience
- **Primary**: Digital subscription businesses (SaaS, streaming, newsletters)
- **Company Size**: 5-75 employees
- **Ad Spend**: $10K-$50K monthly
- **Titles**: Head of Growth, Performance Marketing Manager, CMO

## Compliance & Safety
- Respects all platform rate limits and terms of service
- Human-like delays between actions
- Manual review checkpoints for sensitive outreach
- Opt-out mechanisms and response tracking
- Conservative automation limits to avoid restrictions

## Getting Started
1. Set up Airtable base with provided schema
2. Configure environment variables
3. Run individual modules or full automation pipeline
4. Monitor performance via Airtable dashboard

## License
For internal use by Apsics Media only.