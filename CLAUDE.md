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

**Trend Tracker** - $67/month
- 1 creative concept delivered every Monday
- 2 ready-to-develop scripts per concept  
- Target: Growth teams testing new angles
- Ideal for: Growth teams at growing subscription companies

**Competitive Edge** - $197/month (MOST POPULAR)
- 2 creative concepts weekly (1 trend-based + 1 competitor-inspired)
- 4 weekly scripts - 2 per concept
- Target: Performance marketers with saturated audiences
- Ideal for: Performance marketers who've saturated core audiences

**Market Intelligence** - $497/month  
- 3 creative concepts delivered every Monday
- 6 weekly scripts - 2 per concept
- Direct team access for strategic support
- Target: $200K+ monthly ad spend companies
- Ideal for: Heads of Growth at subscription companies scaling beyond $200K/month

**Enterprise** - Custom Pricing
- Creative concepts delivered weekly
- Full-service media buying management
- Dedicated account manager and creative team
- Target: $500K+ monthly ad spend companies
- Ideal for: Large subscription companies requiring comprehensive solutions

### Target Audience (ICP)

**Primary Target**: Growth-stage SaaS Companies ($500K-$2M ARR)
- Title: CMO, Head of Growth, Head of Marketing
- Team Size: 10-50 employees
- Marketing Budget: $50K-$200K/month
- Budget Authority: $5K-$25K/month decisions

**Key Pain Points**:
- Rising CAC (up 50% since 2016)
- Creative fatigue and performance plateau
- Need for strategic differentiation
- Time constraints for creative development

**Value Delivered**:
- 25-40% improvement in conversion rates
- 3x faster creative concept iteration
- Strategic positioning vs commodity copywriting
- Fortune 100 methodology at startup speed

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
├── phased_workflow_orchestrator.py    # Main workflow orchestrator
├── download_tiktok_videos.py          # TikTok video downloader
├── workflow_steps/                    # Individual step scripts
├── landing-page/                      # Next.js landing page
│   ├── components/                    # React components
│   ├── app/                          # App router pages
│   └── package.json                  # Dependencies
├── Projects/{brand_name}/             # Brand-specific project folders
│   ├── Brand/                        # Brand profile and guidelines
│   ├── Perplexity/                   # Market research results
│   ├── Reddit/                       # Social listening insights
│   ├── Apify/                        # Competitive ad analysis
│   ├── Copy/                         # Hook/headline development
│   ├── Script/                       # Complete script variations
│   └── Completed_Analysis/           # Final strategic analysis
└── TikTok Videos/                    # Video research and downloads
    ├── recent_trending_videos.json   # Source video data
    └── downloaded_tiktok_videos/      # Downloaded video files
```

---

*Strategic Ad Intelligence System: Where Fortune 100 methodology meets systematic creative excellence.*