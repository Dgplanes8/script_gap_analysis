# Strategic Ad Intelligence System - Operations Manual

## Core Operating Principles

### Communication Guidelines
- **Token Efficiency**: Limit responses to essential information, avoid verbose explanations
- **Clarification First**: Ask specific questions when requirements are unclear  
- **No Assumptions**: Confirm understanding before proceeding with complex tasks
- **Direct Response Focus**: Apply proven DR principles (AIDA, PAS, Problem-Agitate-Solution) in all copy work

---

## Business Context & Service Architecture

### Current Service Tiers

**Creative Starter** - $5/week ($20/month)
- 1 high-converting creative concept weekly
- 2 ready-to-test scripts per concept  
- Target: Solo founders and early-stage startups
- Ideal for: First-time advertisers with $500-$2K monthly ad spend

**Trend Tracker** - $15/week ($60/month) (MOST POPULAR)
- 1 strategic creative concept every Monday
- 2 ready-to-develop scripts per concept
- Target: Bootstrap and early-stage startups with initial traction
- Ideal for: Growing startups with $2K-$10K monthly ad spend

**Competitive Edge** - $35/week ($140/month)  
- 2 creative concepts weekly (1 trend-based + 1 competitor-inspired)
- 4 weekly scripts - 2 per concept
- Target: Small marketing teams needing competitive intelligence
- Ideal for: Growing startups with $10K-$50K monthly ad spend

**Market Intelligence** - $99/week ($396/month)
- 3 creative concepts delivered weekly
- 6 ready-to-test scripts - 2 per concept
- Direct team access for strategic support
- Target: Scaling startups with comprehensive needs
- Ideal for: Scaling startups with $50K+ monthly ad spend

**Enterprise** - Custom Pricing
- Custom creative concepts delivered weekly
- Full-service media buying management
- Dedicated account manager and creative team
- Target: Large companies with $500K+ monthly ad spend
- Ideal for: Large subscription companies requiring comprehensive solutions

### Target Audience (ICP)

**Primary Target**: Early-Stage Startups (Bootstrap to Series A)
- Title: Solo Founder, CEO, Co-founder, Head of Growth (wearing marketing hat)
- Team Size: 1-10 employees (founder + small team)
- Revenue Stage: $500K-$2M ARR (early traction)
- Marketing Budget: $500-$5K/month ad spend
- Budget Authority: Direct decision making, no procurement process

**Key Pain Points**:
- First-time advertising overwhelm and platform complexity
- Budget constraints vs. need for professional creative
- Creative development challenges without internal design skills
- Time constraints from managing multiple business functions
- Knowledge gaps in creative best practices and testing

**Value Delivered**:
- Strategic creative intelligence from $250MM+ in managed media spend
- Campaign launch expertise with implementation guidance
- Performance-focused creative methodology for startups
- Budget-friendly weekly service designed for startup constraints

---

## Strategic Ad Intelligence System Workflow

### **Phase 1: Foundation** (Strategic Intelligence Gathering)
1. **Brand_Setup** - Strategic brand profile and competitive positioning
2. **Research_Perplexity** - Market intelligence and trend analysis using Perplexity MCP
3. **Research_Reddit** - Authentic audience voice capture and social listening
4. **Research_Apify** - Facebook Ads Library competitive scraping

### **Phase 2: Analysis** (Competitive Intelligence)
5. **Transcription_Analysis** - AssemblyAI video/audio analysis with sentiment
6. **Script_Analysis** - Best practices guide creation from transcripts
7. **Competitive_Analysis** - Deep dive into competitor strategies and positioning
8. **Gap_Analysis** - Strategic opportunity identification

### **Phase 3: Creative Development** (Strategic Concept Creation)
9. **Concept_Generation** - Strategic concept ideation (3 concepts × 3-5 formats)
10. **Copy_Development** - Hook/headline creation with performance scoring
11. **Script_Generation** - Full script variations using validated concepts and copy
12. **Creative_Validation** - Final concept and script validation framework

### **Phase 4: Finalization** (Strategic Implementation)
13. **Creative_Brief** - Production-ready creative brief for team handoff
14. **Final_Analysis** - Comprehensive strategic analysis and implementation roadmap

### Expected Deliverables
- 3 validated strategic concepts (43-46/50 performance scores)
- 15 performance-scored ad scripts (average 21.7/25)
- 439-line comprehensive strategic analysis
- Competitive positioning matrix
- Implementation roadmap with success metrics

---

## Technical Environment & Commands

### Tech Stack
- **Ad Workflow**: Python 3.7+, Perplexity MCP, Reddit API, Apify, AssemblyAI
- **Landing Page**: Next.js 14, TypeScript, Tailwind CSS, Vercel deployment
- **TikTok Tools**: yt-dlp, dynamic video downloading
- **Analytics**: Google Analytics, Vercel Analytics, conversion tracking
- **Testing**: Playwright MCP for browser automation and UI validation
- **Forms**: Airtable API integration, standardized 4-field structure

### Most Used Commands

**Ad Workflow Execution:**
```bash
# Execute complete workflow
python phased_workflow_orchestrator.py --brand "Brand Name" --full

# Execute specific phase
python phased_workflow_orchestrator.py --brand "Brand Name" --phase 1

# Execute individual step
python phased_workflow_orchestrator.py --brand "Brand Name" --step Brand_Setup

# Check workflow status
python phased_workflow_orchestrator.py --brand "Brand Name" --status
```

**Landing Page Development:**
```bash
# Development server
cd landing-page && npm run dev

# Build and test
npm run build && npm run type-check

# Run tests
npm test && npm run coverage

# Lint and format
npm run lint && npm run format
```

**TikTok Video Tools:**
```bash
# Download videos from JSON
python3 download_tiktok_videos.py

# Make script executable
chmod +x download_tiktok_videos.py
```

**Git Operations (GitHub CLI):**
```bash
# View repository
gh repo view

# Create pull request
gh pr create --title "Title" --body "Description"

# View PR status
gh pr status
```

**Playwright MCP Testing:**
```bash
# Navigate to live site for testing
mcp__playwright__browser_navigate https://apsicsmedia.com

# Take screenshots for validation
mcp__playwright__browser_take_screenshot

# Test form flows and UI interactions
mcp__playwright__browser_click [element]
mcp__playwright__browser_fill_form [form_data]
```

### API Configurations Required
- **Perplexity MCP**: Market research and trend analysis
- **Reddit API**: Social listening and audience research
- **Apify MCP**: Facebook Ads Library competitive scraping
- **AssemblyAI API**: Video/audio transcription and analysis
- **Airtable**: Lead capture and form submissions
- **ConvertKit**: Email marketing automation

---

## Content Authenticity & Ethics Guidelines

### Testimonials & Social Proof Rules
- **NO FABRICATED TESTIMONIALS**: Never create fake client testimonials or case studies
- **SOURCE VERIFICATION**: All data, statistics, and claims must have verifiable sources
- **PLACEHOLDER POLICY**: Use clear placeholders like "[CLIENT TESTIMONIAL NEEDED]" instead of fake content
- **Real Results Only**: Only reference actual client results with permission and documentation

### Data & Statistics Standards
- **Source Attribution**: All statistics must include source (e.g., "According to HubSpot 2024 study...")
- **No Speculation**: Avoid phrases like "clients typically see" without documented proof
- **Industry Benchmarks**: Use only verified industry reports for comparative data
- **Honest Projections**: Mark estimates clearly as projections, not guaranteed outcomes

### Content Creation Guidelines
- **Authentic Voice**: Focus on methodology and approach rather than unverified results
- **Process Over Promises**: Emphasize strategic process rather than specific outcome claims
- **Transparent Communication**: Be honest about service limitations and realistic timelines
- **Documentation Required**: Keep records of all sources for claims and statistics used

### Approved Data Sources
- **Industry Reports**: HubSpot, Salesforce, Google, Facebook Business studies
- **Academic Research**: Peer-reviewed marketing and psychology journals
- **Platform Data**: Official platform statistics (TikTok, Instagram, LinkedIn analytics)
- **Third-Party Research**: Verified studies from reputable marketing research firms

---

## Direct Response Marketing Guidelines

### Copy Development Principles
1. **Hook Framework**: Problem/Agitate/Solution structure
2. **AIDA Application**: Attention → Interest → Desire → Action
3. **Emotional Triggers**: Fear of missing out, social proof, urgency
4. **Benefit-Driven**: Focus on outcomes, not features

### Performance Scoring Framework (25-Point Scale)
1. **Attention Capture** (1-5): Will it stop the scroll?
2. **Emotional Resonance** (1-5): Triggers specific emotions?
3. **Benefit Clarity** (1-5): Core promise immediately clear?
4. **Call-to-Action Strength** (1-5): Creates urgency?
5. **Memorability** (1-5): Contains "sticky" elements?

**Decision Guide:**
- 21-25: Green light - exceptional potential
- 16-20: Proceed with optimizations
- Below 16: Rework - unlikely to perform

### Script Frameworks Available
1. **Quick Product Highlight** - Product-aware audiences, quick conversion
2. **Problem-Solution with Authority** - Unaware audiences, complex products
3. **Ingredient-Focused** - Solution-aware, unique formulation emphasis
4. **Concise Conversion** - Solution-aware, clear transformation focus
5. **Native Trend Leverager** - Problem-aware, trending content integration
6. **Expert Authority** - Unaware audiences, complex problem solving
7. **Comprehensive Benefits** - Problem-aware, multiple benefit highlighting
8. **Strong Offer** - Solution-aware, transformation-focused offers
9. **Soft Sell** - Product-aware, trust and relationship building
10. **Claim-Based** - Most-aware audiences, direct claims and proof

### Platform Optimization
- **TikTok**: Native content integration, trend-based hooks
- **Facebook**: Problem-solution focused, detailed benefits
- **Instagram**: Visual-first storytelling, lifestyle integration
- **LinkedIn**: Professional pain points, ROI-focused messaging

---

## Recent Technical Updates & Fixes

### Latest UI/UX Improvements (2025-01-27)
**Homepage Layout Optimization:**
- ✅ Removed strategic resource library section for cleaner layout
- ✅ Fixed service tier form flow - eliminated unnecessary intermediate step
- ✅ Standardized all forms to use 4-field Airtable structure (Name, Email, Company, Package Interest)

**Free-Hooks Page Enhancements:**
- ✅ Fixed promotional badges layout - now display vertically on separate rows instead of overlapping
- ✅ Improved visual hierarchy and spacing for better mobile experience
- ✅ Enhanced badge design with proper spacing and contrast

**Form Flow Improvements:**
- ✅ SimpleAirtableForm component now shows form immediately (no intermediate button)
- ✅ Service tier buttons properly pass tier name for form pre-population
- ✅ Eliminated confusing "Start Free Week" intermediate popup
- ✅ Streamlined user journey from tier selection to form completion

### Component Architecture Updates
- **SimpleAirtableForm**: Updated to start with `showForm: true` by default
- **ServiceTiers**: Enhanced to pass `tier.name` instead of `tier.id` for better form context
- **Modal System**: Streamlined to reduce friction in signup flow

### Outstanding Issues (from plan.md)
- [ ] Grammar and spacing consistency across all pages
- [ ] Color coordination in hero header
- [ ] Footer updates for startup ICP alignment
- [ ] Form standardization across all pages
- [ ] Social media button removal (X and LinkedIn)
- [ ] Template terminology consistency (hooks → templates)

---

## Quality Standards & Performance Metrics

### Client Success Metrics
- **Primary KPIs**: 25-40% increase in conversion rates
- **Creative Testing Velocity**: 3x faster concept iteration
- **Strategic Differentiation**: Competitive positioning strength
- **Campaign ROI**: Cost per acquisition reduction

### Technical Standards
- **Test Coverage**: Minimum 80% for landing page components
- **Performance**: Core Web Vitals compliance
- **TypeScript**: Strict mode enabled, no type errors
- **Linting**: ESLint + Prettier configuration

### Build Requirements
```bash
# Required checks before deployment
npm run type-check  # Must pass
npm run lint       # Must pass  
npm run test       # Must pass
npm run build      # Must succeed
```

---

## SEO Best Practices & Quality Standards

### SEO Workflow Integration

**Content Creation Standards:**
- **Metadata Validation**: All new pages must have optimized titles (<60 chars) and descriptions (150-160 chars)
- **Internal Linking**: Every new page must receive 2-3 contextual internal links within 48 hours
- **Sitemap Management**: Sitemap updated within 24 hours of publishing new content
- **Quality Assurance**: Pre-launch SEO checklist completion required

**Performance Requirements:**
- **SEO Health Score**: Maintain 80+ score in audit tools (target: 90+)
- **Broken Links**: <5 site-wide at any time
- **Orphan Pages**: <3% of total pages without adequate internal links
- **Index Coverage**: >95% of important pages successfully indexed

### SEO Maintenance Workflow

**Weekly Responsibilities:**
```bash
# SEO health monitoring
- Review Google Search Console for new issues
- Check for broken internal links (spot check 10-20 random links)
- Validate recent content has received internal links
- Monitor site performance metrics
```

**Monthly Requirements:**
```bash
# Comprehensive SEO audit
- Run full site audit using Ahrefs/SEMrush
- Review and update sitemap for completeness
- Audit metadata across all pages for optimization
- Check for orphan pages and create linking strategy
- Validate all external links still function
```

**Pre-Deployment SEO Checklist:**
```bash
# Required before any content goes live
□ Title optimized and under 60 characters
□ Meta description compelling and 150-160 characters
□ URL structure follows site conventions
□ Internal links planned and implemented
□ Sitemap updated
□ No broken links introduced
□ Mobile responsiveness verified
□ Page load speed <3 seconds
```

### Quality Standards & Compliance

**Mandatory SEO Standards:**
- **Zero Tolerance**: Broken internal links on production site
- **Metadata Excellence**: Every page must have unique, optimized title and description
- **Link Equity**: No pages should remain orphaned (without internal links) for >48 hours
- **Performance**: SEO health score must not drop below 75 without immediate action

**Escalation Procedures:**
- **Health Score <70**: Immediate investigation and remediation required
- **>10 Broken Links**: Emergency fix within 4 hours
- **Critical Page Issues**: Fix within 2 hours for high-traffic/conversion pages

**Reference Documentation:**
- Complete SEO procedures: `SEO_BEST_PRACTICES_GUIDE.md`
- Troubleshooting workflows: Prevention-first approach with systematic resolution
- Team training materials: Available in SEO guide for onboarding

---

## Troubleshooting Guide

### Common Issues & Solutions

**Build Failures:**
- TypeScript errors: Check `tsconfig.json` and component types
- Dependency conflicts: Delete `node_modules`, run `npm install`
- Environment variables: Verify `.env.local` configuration

**API Rate Limits:**
- Perplexity: Wait for rate limit reset, implement backoff
- Reddit: Check API key permissions and usage limits
- Apify: Verify subscription limits and usage quotas

**Deployment Issues:**
- Vercel build failures: Check build logs, environment variables
- Domain configuration: Verify DNS settings and SSL certificates
- Database connections: Check connection strings and permissions

**Git Authentication:**
- GitHub CLI setup: `gh auth login --web`
- Token permissions: Verify repo access in GitHub settings
- SSH keys: Check `~/.ssh/config` and key permissions

### Emergency Contacts & Resources
- **Technical Issues**: Check GitHub issues, Stack Overflow
- **API Support**: Refer to respective API documentation
- **Business Continuity**: Backup workflows and client communication templates

---

## File Organization Reference

```
Ad Workflow/
├── CLAUDE.md                          # This operations manual
├── CHANGELOG.md                       # Project update tracking
├── SEO_BEST_PRACTICES_GUIDE.md       # SEO maintenance & prevention guide
├── ISSUES_TRACKER.md                  # Outstanding issues from plan.md
├── UI_COMPONENT_GUIDE.md             # Component documentation
├── phased_workflow_orchestrator.py    # Main workflow orchestrator
├── download_tiktok_videos.py          # TikTok video downloader
├── workflow_steps/                    # Individual step scripts
├── landing-page/                      # Next.js landing page
│   ├── components/                    # React components
│   │   ├── forms/                    # Form components (SimpleAirtableForm, etc.)
│   │   ├── modals/                   # Modal components
│   │   ├── calculators/              # Calculator components
│   │   ├── layout/                   # Layout components (Header, Footer, ServiceTiers)
│   │   └── ui/                      # UI components
│   ├── app/                          # App router pages
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utility functions
│   ├── __tests__/                    # Jest test files
│   └── package.json                  # Dependencies
├── Projects/{brand_name}/             # Brand-specific project folders
│   ├── Brand/                        # Brand profile and guidelines
│   ├── Perplexity/                   # Market research results
│   ├── Reddit/                       # Social listening insights
│   ├── Apify/                        # Competitive ad analysis
│   ├── Copy/                         # Hook/headline development
│   ├── Script/                       # Complete script variations
│   └── Completed_Analysis/           # Final strategic analysis
├── .playwright-mcp/                   # Playwright test screenshots
└── TikTok Videos/                    # Video research and downloads
    ├── recent_trending_videos.json   # Source video data
    └── downloaded_tiktok_videos/      # Downloaded video files
```

---

*Strategic Ad Intelligence System: Where $250MM+ in media spend experience meets systematic creative excellence for startup success.*