# Airtable Database Schema for Apsics Media Outreach Automation

## Base Structure: "Apsics Lead Generation"

### Table 1: Prospects

**Primary Fields:**
- **Record ID** (Auto-generated)
- **Name** (Single line text) - Full name of prospect
- **Company** (Single line text) - Company name
- **Title** (Single line text) - Job title/role
- **Industry** (Single select) - Options: SaaS, D2C, Subscription, Streaming, EdTech, FinTech, HealthTech, Other
- **Company Size** (Single select) - Options: 5-25 employees, 25-75 employees, 75+ employees
- **Estimated Ad Spend** (Single select) - Options: $5K-$25K, $25K-$50K, $50K-$100K, $100K+

**Contact Information:**
- **Email** (Email field)
- **LinkedIn URL** (URL field)
- **Twitter Handle** (Single line text)
- **Phone** (Phone number field)

**Lead Management:**
- **Lead Source** (Single select) - Options: Twitter, LinkedIn, Reddit, Referral, Website
- **Lead Quality Score** (Number 1-10) - Automated scoring based on criteria match
- **Status** (Single select) - Options: New, Contacted, Responded, Qualified, Converted, Not Interested, Unresponsive
- **Priority** (Single select) - Options: High, Medium, Low
- **Tags** (Multiple select) - Custom tags for segmentation

**Interaction Tracking:**
- **First Contact Date** (Date)
- **Last Contact Date** (Date) 
- **Next Follow-up Date** (Date)
- **Total Interactions** (Rollup from Interactions table)
- **Response Rate** (Formula) - Responses / Total Outreach Attempts

**Qualification Data:**
- **Pain Points** (Multiple select) - Options: Creative Fatigue, Rising CAC, Agency Issues, Scaling Challenges, Attribution Problems
- **Current Solutions** (Long text) - What they're currently using
- **Budget Authority** (Single select) - Options: Yes, Influence, No
- **Decision Timeline** (Single select) - Options: Immediate, 1-3 months, 3-6 months, 6+ months
- **Notes** (Long text) - General notes and observations

**Social Media Data:**
- **Twitter Followers** (Number)
- **LinkedIn Connections** (Number)
- **Recent Activity** (Long text) - Recent posts/activities that triggered outreach
- **Engagement History** (Long text) - Previous interactions on social platforms

### Table 2: Outreach Campaigns

**Campaign Details:**
- **Campaign Name** (Single line text)
- **Platform** (Single select) - Options: Twitter, LinkedIn, Reddit, Email
- **Campaign Type** (Single select) - Options: Cold Outreach, Nurture, Follow-up, Event-based
- **Template Used** (Single select) - Links to template names from config
- **Start Date** (Date)
- **End Date** (Date)
- **Status** (Single select) - Options: Planning, Active, Paused, Completed

**Performance Metrics:**
- **Total Sent** (Number)
- **Responses Received** (Number)
- **Response Rate** (Formula) - Responses / Total Sent
- **Meetings Booked** (Number)
- **Qualified Leads** (Number)
- **Conversion Rate** (Formula) - Qualified Leads / Total Sent

**A/B Testing:**
- **Test Variable** (Single line text) - What's being tested
- **Variant A Performance** (Number)
- **Variant B Performance** (Number)
- **Winner** (Single select) - Options: A, B, Inconclusive

**Campaign Notes:**
- **Objective** (Long text)
- **Target Audience** (Long text)
- **Key Insights** (Long text)
- **Next Actions** (Long text)

### Table 3: Interactions

**Interaction Details:**
- **Interaction ID** (Auto-generated)
- **Prospect** (Link to Prospects table)
- **Campaign** (Link to Outreach Campaigns table)
- **Date** (Date with time)
- **Platform** (Single select) - Options: Twitter, LinkedIn, Reddit, Email, Phone
- **Interaction Type** (Single select) - Options: Initial Contact, Follow-up, Response, Meeting, Call

**Message Details:**
- **Template Used** (Single line text)
- **Message Content** (Long text) - Full message sent
- **Personalization Variables** (Long text) - Variables used for personalization
- **Response Content** (Long text) - Their response if any
- **Response Sentiment** (Single select) - Options: Positive, Neutral, Negative, Interested, Not Interested

**Performance Tracking:**
- **Delivered** (Checkbox)
- **Opened** (Checkbox) - For trackable platforms
- **Clicked** (Checkbox) - If links included
- **Responded** (Checkbox)
- **Response Time** (Number) - Hours to response
- **Next Action Required** (Single select) - Options: Follow-up, Schedule Call, Send Resources, Close

**Automation Data:**
- **Automated** (Checkbox) - Was this sent automatically?
- **Manual Review** (Checkbox) - Did human review before sending?
- **Compliance Check** (Checkbox) - Passed compliance requirements
- **Rate Limit Status** (Single line text) - Any rate limiting issues

### Table 4: Analytics Dashboard

**Daily Metrics:**
- **Date** (Date)
- **Platform** (Single select)
- **Outreach Sent** (Number)
- **Responses Received** (Number) 
- **New Prospects Added** (Number)
- **Meetings Booked** (Number)

**Weekly Rollups:**
- **Week Starting** (Date)
- **Total Outreach** (Rollup from daily metrics)
- **Total Responses** (Rollup from daily metrics)
- **Weekly Response Rate** (Formula)
- **New Qualified Leads** (Number)
- **Pipeline Value** (Currency)

**Monthly Performance:**
- **Month** (Single line text)
- **Total Prospects Contacted** (Number)
- **Conversion to Qualified** (Number)
- **Revenue Generated** (Currency)
- **ROI** (Formula)

### Table 5: Content Performance

**Content Tracking:**
- **Content ID** (Auto-generated)
- **Content Type** (Single select) - Options: Template, Hook, Case Study, Value Post
- **Platform** (Single select)
- **Content Title** (Single line text)
- **Content** (Long text)
- **Performance Score** (Number 1-25) - Based on engagement/response

**Usage Metrics:**
- **Times Used** (Number)
- **Total Responses** (Number)
- **Avg Response Rate** (Formula)
- **Best Performing Audience** (Single line text)
- **Last Updated** (Date)

## Views and Filters

### Prospects Table Views:
1. **Active Pipeline** - Status = Contacted, Responded, Qualified
2. **High Priority** - Priority = High, sorted by Next Follow-up Date
3. **By Platform** - Grouped by Lead Source
4. **Response Tracking** - Filter: Last Contact Date > 3 days ago, Status ≠ Responded
5. **Qualification Pipeline** - Status = Qualified, sorted by Decision Timeline

### Campaigns Table Views:
1. **Active Campaigns** - Status = Active, sorted by Start Date
2. **Performance Dashboard** - Show Response Rate, Conversion Rate metrics
3. **A/B Test Results** - Campaigns with test variants
4. **Platform Comparison** - Grouped by Platform with performance metrics

### Interactions Table Views:
1. **Recent Activity** - Last 7 days, sorted by Date descending
2. **Pending Follow-ups** - Next Action Required ≠ blank
3. **Response Analysis** - Filter: Responded = true, grouped by Response Sentiment
4. **Platform Performance** - Grouped by Platform with response rates

## Automation Triggers

### Airtable Automations:
1. **New Prospect Follow-up Scheduler** - When Status = "Contacted", set Next Follow-up Date to +3 days
2. **Response Rate Calculator** - Update prospect response rate when new interaction added
3. **Priority Score Update** - Recalculate Lead Quality Score when prospect data changes
4. **Overdue Follow-up Alert** - Send notification when Next Follow-up Date < Today
5. **Campaign Performance Tracking** - Update campaign metrics when interactions change

### Integration Points:
- **Python Scripts** connect via pyairtable API
- **Webhook endpoints** for real-time updates
- **Data validation** rules prevent duplicate prospects
- **Rate limiting** tracking via automation status fields

## Security and Compliance

### Data Protection:
- **No sensitive passwords** stored in Airtable
- **LinkedIn/Twitter URLs only** - no private profile data
- **Opt-out tracking** via tags and status updates
- **GDPR compliance** with data retention policies

### Access Control:
- **Admin access** for full database management
- **Editor access** for campaign managers
- **Read-only access** for reporting and analysis
- **Audit trail** via Airtable's built-in revision history

This schema provides comprehensive tracking while maintaining simplicity and ensuring all automation needs are met through the free Airtable tier (1,200 records limit should accommodate initial testing and scaling).