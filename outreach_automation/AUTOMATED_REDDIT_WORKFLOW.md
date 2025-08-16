# Automated Reddit Approval Workflow

## Overview

The automated Reddit workflow scans Reddit communities 4 times daily, generates value-driven responses, and saves them to Airtable for manual approval before posting. This ensures human oversight while maintaining consistent engagement.

## Architecture

### 1. **Opportunity Scanner** 
- **Schedule**: 8 AM, 12 PM, 6 PM, 10 PM EST
- **Function**: Scans target subreddits for engagement opportunities
- **Output**: Saves proposed responses to Airtable "Pending Posts" table

### 2. **Manual Approval Process**
- **Location**: Airtable "Pending Posts" table
- **Workflow**: You review and set status to "Approved" or "Rejected"
- **Features**: Edit responses, add notes, customize timing

### 3. **Posting Executor**
- **Schedule**: Every 15 minutes
- **Function**: Posts approved responses with smart timing
- **Safety**: 3-7 minute gaps between posts, max 2/hour, 8/day

## Quick Start

### 1. **Setup Airtable**
Create a "Pending Posts" table with these fields:
- Post Title (Single line text)
- Subreddit (Single line text) 
- Generated Response (Long text)
- Opportunity Score (Number)
- Approval Status (Single select: Pending, Approved, Rejected, Posted, Failed)
- Created Date (Date)
- Posted Date (Date)
- Post ID (Single line text)
- Post URL (URL)
- Reddit URL (URL)

### 2. **Configure Environment**
```bash
cd outreach_automation

# Update .env with your Airtable credentials
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id

# Reddit credentials already configured
```

### 3. **Test the System**
```bash
# Test opportunity scanning
python3 reddit_automation/opportunity_scanner.py --test --dry-run

# Test posting execution  
python3 reddit_automation/posting_executor.py --test --dry-run

# View automation schedule
python3 scripts/setup_cron.py schedule
```

### 4. **Setup Automation**
```bash
# Setup cron jobs (dry-run first)
python3 scripts/setup_cron.py setup --dry-run

# Actually setup cron jobs
python3 scripts/setup_cron.py setup

# Check status
python3 scripts/setup_cron.py status
```

## Daily Workflow

### Morning (8 AM EST)
1. **Automatic Scan**: System scans Reddit for opportunities
2. **Airtable Review**: Check "Pending Posts" table for new opportunities
3. **Approval Process**: 
   - Review generated responses
   - Edit if needed in "Custom Response" field
   - Set status to "Approved" for good responses
   - Set to "Rejected" for poor ones

### Throughout Day
- **12 PM, 6 PM, 10 PM**: Additional automatic scans
- **Every 15 minutes**: System checks for approved posts and publishes them
- **Manual Review**: Check Airtable periodically for new opportunities

## Safety Features

### Rate Limiting
- Max 2 posts per hour
- Max 8 posts per day
- 3-7 minute gaps between posts
- Respects Reddit API limits

### Content Quality
- Opportunity scoring (6.0+ threshold)
- Compliance checking
- Value-first guidelines enforcement
- Manual approval required

### Monitoring
- All activities logged to `/tmp/reddit_*.log`
- Status tracking in Airtable
- Error handling and recovery

## Airtable Workflow

### Approval Statuses
- **Pending**: New opportunity, needs review
- **Approved**: Ready for posting
- **Rejected**: Don't post
- **Posted**: Successfully published
- **Failed**: Error occurred during posting

### Review Process
1. **Check "Post Title"** - Is this relevant to our expertise?
2. **Review "Generated Response"** - Is it helpful and value-driven?
3. **Edit if needed** - Use "Custom Response" field for modifications
4. **Set Status** - Change "Approval Status" to "Approved"

### Best Practices
- Approve 2-3 high-quality responses per scan
- Focus on posts asking for specific marketing help
- Ensure responses provide genuine value
- Avoid overly promotional content

## Configuration Options

### Scan Times (config/settings.py)
```python
'scan_times': [
    {'hour': 8, 'minute': 0},   # 8:00 AM EST
    {'hour': 12, 'minute': 0},  # 12:00 PM EST  
    {'hour': 18, 'minute': 0},  # 6:00 PM EST
    {'hour': 22, 'minute': 0}   # 10:00 PM EST
]
```

### Posting Limits
```python
'posting_limits': {
    'max_per_hour': 2,
    'max_per_day': 8,
    'min_gap_minutes': 3,
    'max_gap_minutes': 7
}
```

### Target Subreddits
```python
'target_subreddits': [
    'marketing', 'growth_hacking', 'entrepreneur',
    'startups', 'SaaS', 'digital_marketing',
    'performance_marketing', 'ecommerce', 'growthteam'
]
```

## Manual Commands

### Scanning
```bash
# Run single scan manually
python3 reddit_automation/opportunity_scanner.py

# Test scan (limited scope)
python3 reddit_automation/opportunity_scanner.py --test --dry-run

# Verbose output
python3 reddit_automation/opportunity_scanner.py --verbose
```

### Posting
```bash
# Check for approved posts manually
python3 reddit_automation/posting_executor.py

# Test posting (no actual posts)
python3 reddit_automation/posting_executor.py --test --dry-run

# Verbose output  
python3 reddit_automation/posting_executor.py --verbose
```

### Cron Management
```bash
# Show schedule
python3 scripts/setup_cron.py schedule

# Setup automation
python3 scripts/setup_cron.py setup

# Remove automation
python3 scripts/setup_cron.py remove

# Check status
python3 scripts/setup_cron.py status

# Test scripts
python3 scripts/setup_cron.py test
```

## Troubleshooting

### Common Issues

**No opportunities found**
- Check target subreddits are active
- Verify Reddit API credentials
- Lower opportunity score threshold in settings

**Airtable errors**
- Verify API key and base ID
- Check "Pending Posts" table exists
- Ensure field names match exactly

**Cron jobs not running**
- Check cron is enabled: `launchctl list | grep cron`
- Verify file permissions: `ls -la reddit_automation/`
- Check logs: `tail -f /tmp/reddit_scanner.log`

**Posts not being approved**
- Review opportunity scoring logic
- Check compliance validation
- Verify response quality guidelines

### Log Locations
- Scanner: `/tmp/reddit_scanner.log`
- Executor: `/tmp/reddit_executor.log`
- Cron: Check with `grep CRON /var/log/system.log`

### Debug Mode
Add `--verbose` flag to any command for detailed logging:
```bash
python3 reddit_automation/opportunity_scanner.py --test --dry-run --verbose
```

## Security Considerations

### API Keys
- Store in `.env` files (not committed to git)
- Use read-only Airtable permissions where possible
- Rotate Reddit credentials periodically

### Rate Limiting
- Conservative posting limits to avoid bans
- Respects Reddit's API guidelines
- Built-in backoff for rate limit hits

### Content Safety
- All responses validated for compliance
- Value-first approach enforced
- Manual approval prevents spam

## Performance Metrics

### Daily Targets
- 10-15 opportunities scanned per day
- 3-5 approved responses per day
- 2-4 actual posts per day

### Quality Metrics
- Opportunity score > 7.0 preferred
- Response length 200-800 characters
- Compliance score 100%

### Success Indicators
- Positive community response
- No subreddit warnings/bans
- Consistent engagement generation

## Support

For issues or questions:
1. Check logs in `/tmp/reddit_*.log`
2. Test individual components with `--test --dry-run`
3. Verify configuration in `config/settings.py`
4. Review Airtable field mappings

The system is designed to be conservative and safe. When in doubt, it errs on the side of not posting rather than risking compliance issues.