# Calculator Specifications - Apsics Media Interactive Tools

## Calculator #1: Startup CAC Payback Period Calculator

### SEO Configuration
- **Primary Keyword**: "CAC payback calculator startup" (KD: 23, Volume: 420/month)
- **Secondary Keywords**: "customer acquisition cost payback period", "startup CAC recovery time", "marketing payback calculator"
- **Target URL Slug**: `/tools/startup-cac-payback-calculator`
- **Meta Title**: "Startup CAC Payback Period Calculator: When Will Your Ad Spend Break Even?"
- **Meta Description**: "Calculate your customer acquisition cost recovery timeline. Free CAC payback calculator with industry benchmarks. Optimize marketing spend for profitability."

### Functional Requirements

#### Input Fields
1. **Customer Acquisition Cost (CAC)** 
   - Type: Number input
   - Range: $1 - $10,000
   - Default: $150
   - Help Text: "Total cost to acquire one paying customer (marketing spend ÷ new customers)"

2. **Average Monthly Revenue Per Customer**
   - Type: Number input
   - Range: $1 - $5,000
   - Default: $49
   - Help Text: "Monthly recurring revenue or average monthly purchase value per customer"

3. **Gross Margin (%)**
   - Type: Range slider
   - Range: 10% - 95%
   - Default: 70%
   - Display: Real-time percentage with visual indicator
   - Help Text: "Percentage of revenue after direct costs (typically 60-80% for SaaS)"

4. **Customer Churn Rate (% monthly)**
   - Type: Range slider  
   - Range: 1% - 25%
   - Default: 5%
   - Display: Real-time percentage
   - Help Text: "Percentage of customers who cancel each month"

5. **Business Model**
   - Type: Select dropdown
   - Options: "B2B SaaS", "B2C SaaS", "E-commerce", "Professional Services", "Other"
   - Default: "B2B SaaS"
   - Help Text: "Affects benchmark comparisons and recommendations"

#### Preset Scenarios
1. **Early-Stage B2B SaaS**: CAC $200, MRR $79, Margin 75%, Churn 3%
2. **Bootstrap E-commerce**: CAC $45, MRR $35, Margin 40%, Churn 8%
3. **Professional Services**: CAC $500, MRR $300, Margin 80%, Churn 5%
4. **Consumer App**: CAC $25, MRR $9.99, Margin 90%, Churn 12%

#### Calculation Logic
```javascript
// Core Calculations
const monthlyProfit = (monthlyRevenue * (grossMargin / 100));
const basicPaybackPeriod = cac / monthlyProfit;

// Churn-Adjusted Payback Period
const churnRate = churnPercent / 100;
const retentionRate = 1 - churnRate;
const adjustedPaybackPeriod = cac / (monthlyProfit * retentionRate);

// Customer Lifetime Value
const averageLifespan = 1 / churnRate;
const customerLTV = monthlyProfit * averageLifespan;

// LTV:CAC Ratio
const ltvCacRatio = customerLTV / cac;

// Break-Even Analysis
const breakEvenMonths = Math.ceil(adjustedPaybackPeriod);
const totalRevenueAtBreakEven = monthlyRevenue * breakEvenMonths;
const totalProfitAtBreakEven = monthlyProfit * breakEvenMonths;
```

#### Results Display
**Primary Result**: Payback period in months (large, prominent display)
**Secondary Results**:
- Customer Lifetime Value (LTV)
- LTV:CAC Ratio with health indicator (Red <2:1, Yellow 2-3:1, Green >3:1)
- Break-even point in calendar date
- Total profit after 12 months
- Industry benchmark comparison

#### Visualization Elements
- Progress bar showing payback timeline
- Monthly cash flow chart (12-month view)
- Health score gauge for LTV:CAC ratio
- Industry comparison bar chart

### User Experience Features

#### Interactive Elements
- Real-time calculation updates as user adjusts inputs
- Hover tooltips with detailed explanations
- "Reset to Defaults" button
- "Save Results" functionality (email capture)
- Social sharing buttons for results

#### Educational Content
**Context Panel**: "Understanding CAC Payback"
- Why payback period matters for startups
- Industry benchmarks by business model
- Red flags and optimization opportunities
- When to worry vs celebrate your numbers

**Actionable Recommendations**:
- Payback > 12 months: "Focus on retention and churn reduction"
- LTV:CAC < 2:1: "Optimize acquisition costs or increase pricing"
- Healthy metrics: "Ready to scale - consider increasing marketing spend"

### Lead Capture Integration
**Trigger**: When user clicks "Get Detailed Analysis" or "Save Results"
**Form Fields**: Email, Company, Monthly Marketing Budget
**Lead Magnet**: "Complete CAC Optimization Playbook + Industry Benchmarks Sheet"
**Follow-up**: Personalized email with detailed analysis and next steps

---

## Calculator #2: Bootstrap Marketing Budget Allocator

### SEO Configuration
- **Primary Keyword**: "marketing budget calculator early stage startup" (KD: 27, Volume: 350/month)
- **Secondary Keywords**: "startup marketing budget allocation", "bootstrap marketing spend", "early stage marketing budget planner"
- **Target URL Slug**: `/tools/bootstrap-marketing-budget-allocator`
- **Meta Title**: "Bootstrap Marketing Budget Allocator: $500-$5K Monthly Spend Optimizer"
- **Meta Description**: "Optimize your startup's marketing budget allocation across channels. Free calculator with data-driven recommendations. Maximize ROI on limited spend."

### Functional Requirements

#### Input Fields
1. **Total Monthly Marketing Budget**
   - Type: Number input with slider
   - Range: $100 - $10,000
   - Default: $2,000
   - Help Text: "Total amount available for marketing and advertising each month"

2. **Current Monthly Revenue**
   - Type: Number input
   - Range: $0 - $500,000
   - Default: $15,000
   - Help Text: "Current monthly recurring revenue or sales"

3. **Business Model**
   - Type: Select dropdown
   - Options: "B2B SaaS", "B2C SaaS", "E-commerce", "Professional Services", "Local Business"
   - Default: "B2B SaaS"

4. **Target Customer Type**
   - Type: Radio buttons
   - Options: "Consumers (B2C)", "Small Businesses (SMB)", "Enterprise (B2B)", "Mixed"
   - Default: "Small Businesses (SMB)"

5. **Primary Business Goal**
   - Type: Select dropdown
   - Options: "Lead Generation", "Direct Sales", "App Downloads", "Brand Awareness", "User Acquisition"
   - Default: "Lead Generation"

6. **Team Marketing Experience**
   - Type: Range slider (visual: Beginner → Expert)
   - Range: 1-10
   - Default: 4
   - Help Text: "1 = Complete beginner, 10 = Marketing expert"

7. **Content Creation Capacity**
   - Type: Radio buttons
   - Options: "None (need everything done)", "Limited (basic posts)", "Good (regular content)", "Excellent (daily content)"
   - Default: "Limited"

#### Preset Scenarios
1. **Solo Founder ($1K budget)**: Limited experience, B2B SaaS, lead generation focus
2. **Bootstrap E-commerce ($2.5K budget)**: Mixed experience, consumer focus, direct sales
3. **Growing SaaS ($5K budget)**: Good experience, SMB focus, user acquisition
4. **Service Business ($500 budget)**: Beginner experience, local market, brand awareness

#### Calculation Logic
```javascript
// Base allocation percentages by business model and experience level
const allocationMatrix = {
  'B2B SaaS': {
    beginner: { content: 40, paid: 35, tools: 15, testing: 10 },
    intermediate: { content: 35, paid: 40, tools: 15, testing: 10 },
    advanced: { content: 30, paid: 45, tools: 15, testing: 10 }
  },
  'E-commerce': {
    beginner: { content: 30, paid: 50, tools: 10, testing: 10 },
    intermediate: { content: 25, paid: 55, tools: 10, testing: 10 },
    advanced: { content: 20, paid: 60, tools: 10, testing: 10 }
  }
  // Additional models...
};

// Adjustments based on budget size
const budgetMultipliers = {
  tools: budget < 1000 ? 0.5 : budget < 3000 ? 0.8 : 1.0,
  testing: budget < 500 ? 0.3 : budget < 2000 ? 0.7 : 1.0
};

// Channel-specific recommendations
const channelRecommendations = {
  'Google Ads': { minBudget: 500, roi: 'High', difficulty: 'Medium' },
  'Facebook Ads': { minBudget: 300, roi: 'Medium', difficulty: 'Easy' },
  'LinkedIn Ads': { minBudget: 800, roi: 'High', difficulty: 'Hard' },
  'Content Marketing': { minBudget: 200, roi: 'Very High', difficulty: 'Medium' },
  'SEO Tools': { minBudget: 100, roi: 'Very High', difficulty: 'Hard' }
};
```

#### Results Display
**Budget Allocation Breakdown**:
- Visual pie chart with percentages and dollar amounts
- Channel-by-channel recommendations with rationale
- Monthly timeline for implementation
- Expected ROI timeframes by channel

**Detailed Channel Strategy**:
- Recommended platforms and tactics
- Budget allocation within each channel
- Timeline for testing and scaling
- Success metrics to track

#### Advanced Features
**Seasonal Adjustments**: 
- Holiday/peak season budget modifications
- Industry-specific timing considerations
- Economic downturn/cash flow crisis modes

**Scenario Modeling**:
- "What if" budget changes
- Performance improvement projections
- Scaling recommendations

### Lead Capture Integration
**Trigger**: Download detailed budget plan
**Form Fields**: Email, Company Name, Current Marketing Challenges
**Lead Magnet**: "Complete Marketing Budget Spreadsheet + 90-Day Implementation Plan"

---

## Calculator #3: Startup LTV:CAC Ratio Calculator

### SEO Configuration
- **Primary Keyword**: "LTV CAC ratio calculator startup" (KD: 21, Volume: 310/month)
- **Secondary Keywords**: "customer lifetime value CAC ratio", "startup profitability calculator", "LTV to CAC calculator"
- **Target URL Slug**: `/tools/startup-ltv-cac-ratio-calculator`
- **Meta Title**: "Startup LTV:CAC Ratio Calculator: Is Your Customer Acquisition Profitable?"
- **Meta Description**: "Calculate your customer lifetime value to acquisition cost ratio. Free LTV:CAC calculator with profitability analysis and optimization recommendations."

### Functional Requirements

#### Input Fields
1. **Average Customer Acquisition Cost (CAC)**
   - Type: Number input
   - Range: $1 - $5,000
   - Default: $120
   - Help Text: "Total sales and marketing costs ÷ number of new customers acquired"

2. **Average Revenue Per Customer (Monthly)**
   - Type: Number input  
   - Range: $1 - $2,000
   - Default: $49
   - Help Text: "Average monthly payment per customer"

3. **Customer Churn Rate**
   - Type: Range slider + input
   - Range: 1% - 30%
   - Default: 5%
   - Display: Monthly and annual rates
   - Help Text: "Percentage of customers who cancel each month"

4. **Gross Margin**
   - Type: Range slider
   - Range: 10% - 95%
   - Default: 70%
   - Help Text: "Revenue percentage after direct costs (COGS)"

5. **Business Type**
   - Type: Select dropdown
   - Options: "B2B SaaS", "B2C SaaS", "E-commerce", "Subscription Service", "Professional Services"
   - Default: "B2B SaaS"

#### Advanced Inputs (Collapsible)
6. **Customer Success/Support Costs**
   - Type: Number input
   - Default: $5/month per customer
   - Help Text: "Monthly cost of customer success and support per customer"

7. **Upsell/Cross-sell Revenue**
   - Type: Number input
   - Default: $0
   - Help Text: "Average monthly additional revenue from existing customers"

#### Calculation Logic
```javascript
// Customer Lifetime Value Calculation
const monthlyChurn = churnRate / 100;
const averageLifespan = 1 / monthlyChurn; // in months
const grossMonthlyRevenue = monthlyRevenue * (grossMargin / 100);
const netMonthlyRevenue = grossMonthlyRevenue - supportCosts + upsellRevenue;
const customerLTV = netMonthlyRevenue * averageLifespan;

// LTV:CAC Ratio
const ltvCacRatio = customerLTV / cac;

// Payback Period
const paybackPeriod = cac / netMonthlyRevenue;

// Unit Economics Health Score
const healthScore = calculateHealthScore(ltvCacRatio, paybackPeriod, churnRate);

// Profitability Timeline
const monthlyProfitAfterCAC = netMonthlyRevenue;
const cumulativeProfit = [];
for (let month = 1; month <= 24; month++) {
  const survivingCustomers = Math.pow(1 - monthlyChurn, month - 1);
  const profit = (monthlyProfitAfterCAC * month - cac) * survivingCustomers;
  cumulativeProfit.push(profit);
}
```

#### Results Display
**Primary Metrics Dashboard**:
- LTV:CAC Ratio with health indicator and industry benchmark
- Customer Lifetime Value in dollars
- Payback period in months
- Overall unit economics health score (0-100)

**Visual Analytics**:
- 24-month profitability curve
- Health score gauge with zones (Red: <2, Yellow: 2-3, Green: >3)
- Benchmark comparison by industry
- Sensitivity analysis charts

**Actionable Insights**:
- Specific recommendations based on ratio health
- Optimization priorities (reduce CAC vs increase LTV vs reduce churn)
- Scaling readiness assessment
- Red flags and warning indicators

### Lead Capture Integration
**Trigger**: "Get LTV Optimization Strategy"
**Form Fields**: Email, Company, Current Monthly Revenue, Biggest Challenge
**Lead Magnet**: "Complete LTV Optimization Playbook + Churn Reduction Strategies"

---

## Calculator #4: Creative Testing ROI Calculator

### SEO Configuration
- **Primary Keyword**: "creative testing calculator startup ads" (KD: 18, Volume: 180/month)
- **Secondary Keywords**: "ad creative testing ROI", "marketing creative optimization calculator", "startup creative testing budget"
- **Target URL Slug**: `/tools/creative-testing-roi-calculator`
- **Meta Title**: "Creative Testing ROI Calculator: How Many Ad Variants Should Your Startup Test?"
- **Meta Description**: "Optimize your creative testing budget and variant count. Free calculator determines optimal testing strategy for maximum ROI. Stop wasting ad spend."

### Functional Requirements

#### Input Fields
1. **Monthly Ad Budget**
   - Type: Number input with slider
   - Range: $100 - $20,000
   - Default: $2,000
   - Help Text: "Total monthly advertising spend across all platforms"

2. **Current Conversion Rate**
   - Type: Range slider
   - Range: 0.1% - 15%
   - Default: 2.5%
   - Help Text: "Current percentage of visitors who convert"

3. **Target Improvement Goal**
   - Type: Range slider
   - Range: 5% - 100%
   - Default: 25%
   - Display: "Improve conversion rate by X%"
   - Help Text: "How much you want to improve your current performance"

4. **Creative Development Cost**
   - Type: Select dropdown
   - Options: "DIY (Time Only)", "Freelancer ($50-150)", "Agency ($200-500)", "In-house Team ($100-300)"
   - Default: "Freelancer ($50-150)"

5. **Platform Focus**
   - Type: Checkbox group
   - Options: "Facebook/Instagram", "Google Ads", "LinkedIn", "TikTok", "Other"
   - Default: ["Facebook/Instagram", "Google Ads"]

6. **Testing Duration**
   - Type: Range slider
   - Range: 3 - 30 days
   - Default: 14
   - Help Text: "How long to run each creative test"

#### Advanced Settings
7. **Statistical Significance Level**
   - Type: Select dropdown
   - Options: "90%", "95%", "99%"
   - Default: "95%"

8. **Minimum Detectable Effect**
   - Type: Range slider
   - Range: 5% - 50%
   - Default: 20%

#### Calculation Logic
```javascript
// Sample size calculation for creative testing
const zScore = significance === '95%' ? 1.96 : significance === '90%' ? 1.65 : 2.58;
const baselineRate = currentConversionRate / 100;
const effectSize = minimumDetectableEffect / 100;
const pooledRate = (baselineRate + (baselineRate * (1 + effectSize))) / 2;

const requiredSampleSize = Math.ceil(
  (2 * Math.pow(zScore, 2) * pooledRate * (1 - pooledRate)) / 
  Math.pow(baselineRate * effectSize, 2)
);

// Budget allocation calculation
const costPerVisitor = monthlyBudget / (estimatedTraffic || 10000);
const testingBudget = requiredSampleSize * costPerVisitor;
const maxVariantsInBudget = Math.floor(monthlyBudget / testingBudget);

// ROI calculation
const currentRevenue = monthlyBudget * (currentConversionRate / 100) * averageOrderValue;
const projectedRevenue = currentRevenue * (1 + targetImprovement / 100);
const revenueIncrease = projectedRevenue - currentRevenue;
const testingInvestment = creativeCosts * recommendedVariants + testingBudget;
const roi = (revenueIncrease / testingInvestment) * 100;
```

#### Results Display
**Testing Strategy Recommendations**:
- Optimal number of variants to test
- Recommended budget allocation per variant
- Testing timeline and sequence
- Expected statistical power

**ROI Analysis**:
- Testing investment required
- Expected revenue increase
- ROI percentage and payback period
- Break-even analysis

**Implementation Guide**:
- Creative brief templates
- Testing schedule calendar
- Success metrics to track
- When to scale winning creatives

### Lead Capture Integration
**Trigger**: "Get Creative Testing Framework"
**Form Fields**: Email, Company, Primary Platform, Biggest Creative Challenge
**Lead Magnet**: "Complete Creative Testing Playbook + Template Library"

---

## Calculator #5: Startup Marketing Channel Mix Calculator

### SEO Configuration
- **Primary Keyword**: "marketing channel calculator early stage startup" (KD: 24, Volume: 290/month)
- **Secondary Keywords**: "startup marketing channel mix", "marketing channel allocation calculator", "startup channel strategy tool"
- **Target URL Slug**: `/tools/startup-marketing-channel-mix-calculator`
- **Meta Title**: "Startup Marketing Channel Mix Calculator: Find Your Optimal Channel Strategy"
- **Meta Description**: "Discover the best marketing channel mix for your startup. Free calculator with personalized recommendations based on your business model and goals."

### Functional Requirements

#### Input Fields
1. **Business Model**
   - Type: Select dropdown
   - Options: "B2B SaaS", "B2C SaaS", "E-commerce", "Marketplace", "Professional Services", "Mobile App"
   - Default: "B2B SaaS"

2. **Target Market**
   - Type: Radio buttons
   - Options: "Enterprise (1000+ employees)", "SMB (50-1000 employees)", "Small Business (<50 employees)", "Consumers", "Mixed"
   - Default: "Small Business (<50 employees)"

3. **Monthly Marketing Budget**
   - Type: Number input with slider
   - Range: $200 - $50,000
   - Default: $3,000

4. **Current Stage**
   - Type: Select dropdown
   - Options: "Pre-launch (MVP)", "Early traction (0-$10K MRR)", "Growing ($10K-$50K MRR)", "Scaling ($50K+ MRR)"
   - Default: "Early traction (0-$10K MRR)"

5. **Geographic Focus**
   - Type: Select dropdown
   - Options: "Local/Regional", "National", "Global", "US + English-speaking"
   - Default: "National"

6. **Product Complexity**
   - Type: Range slider (Simple → Complex)
   - Range: 1-10
   - Default: 5
   - Help Text: "1 = Very simple to understand, 10 = Requires education/demos"

7. **Team Marketing Experience**
   - Type: Select dropdown
   - Options: "No experience", "Some experience", "Experienced", "Expert level"
   - Default: "Some experience"

#### Calculation Logic
```javascript
// Channel effectiveness matrix by business model and target market
const channelMatrix = {
  'B2B SaaS': {
    'SMB': {
      'Google Ads': { effectiveness: 85, minBudget: 500, difficulty: 6 },
      'Facebook Ads': { effectiveness: 60, minBudget: 300, difficulty: 4 },
      'LinkedIn Ads': { effectiveness: 80, minBudget: 800, difficulty: 7 },
      'Content Marketing': { effectiveness: 90, minBudget: 200, difficulty: 8 },
      'SEO': { effectiveness: 95, minBudget: 100, difficulty: 9 },
      'Cold Email': { effectiveness: 70, minBudget: 100, difficulty: 5 },
      'Partnerships': { effectiveness: 85, minBudget: 0, difficulty: 8 }
    }
    // Other segments...
  }
  // Other business models...
};

// Budget allocation algorithm
function calculateOptimalMix(budget, experience, stage) {
  const availableChannels = getViableChannels(budget, businessModel, targetMarket);
  const experienceMultiplier = getExperienceMultiplier(experience);
  const stageMultiplier = getStageMultiplier(stage);
  
  return optimizeChannelMix(availableChannels, budget, experienceMultiplier, stageMultiplier);
}

// ROI prediction model
const expectedROI = channels.map(channel => {
  const baseROI = channelMatrix[businessModel][targetMarket][channel].effectiveness;
  const adjustedROI = baseROI * experienceMultiplier * stageMultiplier;
  return { channel, roi: adjustedROI, allocation: calculatedAllocation[channel] };
});
```

#### Results Display
**Recommended Channel Mix**:
- Pie chart with percentage allocations
- Dollar amounts per channel
- Priority ranking (Primary, Secondary, Experimental)
- Timeline for channel rollout

**Channel Analysis**:
- Expected ROI by channel
- Difficulty level and resource requirements
- Timeline to see results
- Success metrics for each channel

**Implementation Roadmap**:
- Month 1: Foundation channels
- Month 2-3: Primary channel optimization  
- Month 4-6: Secondary channel testing
- Scaling recommendations

#### Interactive Features
**Scenario Modeling**:
- Budget adjustment sliders
- "What if" analysis for different allocations
- Competitive pressure adjustments
- Seasonal modification options

### Lead Capture Integration
**Trigger**: "Get Complete Channel Strategy Guide"
**Form Fields**: Email, Company, Current Top Channel, Biggest Challenge
**Lead Magnet**: "Complete Marketing Channel Playbook + Implementation Templates"

## Technical Implementation Requirements

### Shared Features Across All Calculators
1. **Mobile Responsive Design**: All calculators work perfectly on mobile devices
2. **Real-time Calculations**: Results update instantly as users adjust inputs
3. **Social Sharing**: Share results on LinkedIn, Twitter, email
4. **Results Export**: PDF export of recommendations and analysis
5. **Bookmark/Save**: URL-based result sharing for easy reference
6. **Analytics Tracking**: Comprehensive usage and conversion tracking

### Performance Requirements
- **Load Time**: <2 seconds initial load
- **Calculation Speed**: <100ms for result updates
- **Accessibility**: WCAG 2.1 AA compliance
- **Browser Support**: Chrome, Safari, Firefox, Edge (last 2 versions)

### Integration Requirements
- **Email Integration**: Connect with ConvertKit/Airtable for lead capture
- **Analytics**: Google Analytics 4 events for all interactions
- **CRM Integration**: Automatic lead scoring and tagging
- **Template System**: Use existing template architecture for consistent styling

### Development Notes
- Use React hooks for state management
- Implement input validation and error handling
- Add loading states for calculations
- Include help tooltips and explanations
- Ensure all calculations are thoroughly tested
- Add unit tests for calculation logic