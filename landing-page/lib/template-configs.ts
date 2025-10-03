import type { AIToolTemplateConfig } from '@/components/templates/ai-tool-template';
import type { AIFormConfig, FormField } from '@/components/templates/ai-form-template';
import type { FoundersClubConfig } from '@/components/templates/founders-club-section';
import type { ProcessConfig } from '@/components/templates/process-section';

export interface ToolPageConfig {
  template: AIToolTemplateConfig;
  form: AIFormConfig;
  fields: FormField[];
  foundersClub: FoundersClubConfig;
  process: ProcessConfig;
  secondaryHeader: {
    links: Array<{ label: string; href: string }>;
    ctaHref: string;
    ctaLabel: string;
  };
}

export const toolConfigs: Record<string, ToolPageConfig> = {
  'ai-ad-script-generator': {
    template: {
      header: {
        title: 'Turn your idea into a scroll-stopping ad in 60 seconds',
        subtitle: 'Drop in your URL and campaign goal. Get platform-ready scripts backed by $250M in testing. TikTok, Meta, YouTube, LinkedIn, X - all covered.',
        badgeText: 'Script Generator',
      },
      sections: {
        showFoundersClub: true,
        showProcessSection: true,
        showPricingSection: true,
      },
      exitIntent: {
        title: 'Get Weekly Creative Intelligence Before You Go',
        subtitle: 'Join 150+ growth teams getting Monday creative intelligence drops, bonus credits, and exclusive frameworks.',
      },
    },
    form: {
      title: 'Get your first ad script free',
      description: 'Drop in your company name, URL, and campaign goal. We\'ll return a production-ready script built from what actually converts.',
      submitButtonText: 'Generate Script',
      highlights: [
        {
          title: 'Ready for TikTok, Meta, or YouTube',
          description: 'Hooks, overlays, and CTAs matched to each platform\'s style.',
          variant: 'primary',
        },
        {
          title: 'Written using what actually converts',
          description: 'Every line tested across thousands of campaigns.',
          variant: 'success',
        },
      ],
      freePlan: {
        title: 'FREE FOREVER PLAN',
        features: [
          '1 instant script without logging in',
          '10 credits every month with a free account',
          'Upgrade to unlock weekly delivery & advanced formats',
        ],
        note: 'Need more credits? Paid plans add instant top ups without leaving this page.',
      },
    },
    fields: [
      {
        key: 'companyName',
        label: 'Company Name',
        type: 'text',
        placeholder: 'e.g. BrightWave Labs',
        required: true,
      },
      {
        key: 'websiteUrl',
        label: 'Website URL',
        type: 'url',
        placeholder: 'https://yourbrand.com',
        required: true,
      },
      {
        key: 'adFormat',
        label: 'Ad Output Format',
        type: 'select',
        required: true,
        options: [
          { value: 'video', label: 'Video ad (scripted output)' },
          { value: 'static', label: 'Static ad (headline + supporting copy)' },
        ],
      },
      {
        key: 'productDescription',
        label: 'Product Description',
        type: 'textarea',
        placeholder: 'Share positioning, differentiators, or customer pain points for richer scripts',
        rows: 4,
        optional: true,
      },
      {
        key: 'platform',
        label: 'Platform',
        type: 'select',
        optional: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'facebook', label: 'Facebook' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'tiktok', label: 'TikTok' },
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'x', label: 'X (Twitter)' },
          { value: 'youtube', label: 'YouTube' },
        ],
      },
      {
        key: 'objective',
        label: 'Objective',
        type: 'select',
        optional: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'awareness', label: 'Awareness' },
          { value: 'leads', label: 'Leads' },
          { value: 'sales', label: 'Sales' },
          { value: 'engagement', label: 'Engagement' },
          { value: 'downloads', label: 'Downloads' },
          { value: 'installs', label: 'Installs' },
        ],
      },
    ],
    foundersClub: {
      badge: 'Founder Club Special',
      title: 'Get the APSICS Media Founder Club for $20 this week',
      description: 'Start a free week trial, keep your favourite frameworks, and lock in lifetime Founder Club pricing before it returns to $97.',
      ctaText: 'Claim 10 Free Credits',
      ctaHref: '/#service-tiers',
      footerText: 'Founder Club offer: $20 one-time add-on after your trial.',
    },
    process: {
      title: 'How we write your scripts',
      description: 'We combine your product details with proven formulas and platform-specific pacing so every script is ready to launch.',
      highlights: [
        {
          title: 'Match your audience',
          description: 'Speaks to where they are and what they need to hear.',
        },
        {
          title: 'Format for each platform',
          description: 'Pacing, structure, and CTAs tailored to where you\'re running.',
          variant: 'gradient',
        },
        {
          title: 'Built from what works',
          description: 'Trained on $250M+ in ad spend to maximize conversions.',
        },
        {
          title: 'Stays on brand',
          description: 'Keeps your voice while staying clear and urgent.',
        },
      ],
      showAccordion: true,
    },
    secondaryHeader: {
      links: [
        { label: 'Overview', href: '#overview' },
        { label: 'How it works', href: '#workflow' },
        { label: 'Plans & Pricing', href: '#service-tiers' },
      ],
      ctaHref: '#service-tiers',
      ctaLabel: 'Claim 10 Free Credits',
    },
  },

  'ai-ad-iteration-tool': {
    template: {
      header: {
        title: 'Turn your current ad into 3 better versions',
        subtitle:
          'Upload your ad or paste a link. Get instant feedback and ready-to-test improvements for Meta, TikTok, and more.',
        badgeText: 'Ad Iterator',
      },
      sections: {
        showFoundersClub: true,
        showProcessSection: true,
        showPricingSection: true,
      },
      exitIntent: {
        title: 'Get Weekly Creative Intelligence Before You Go',
        subtitle: 'Join 150+ growth teams getting Monday creative intelligence drops, bonus credits, and exclusive frameworks.',
      },
    },
    form: {
      title: 'Analyze your first ad free',
      description:
        'Drop in your brand context and the ad you want to improve. In 60 seconds get instant feedback, priority fixes, and ready-to-test versions.',
      submitButtonText: 'Analyze and Generate Iterations',
      highlights: [
        {
          title: 'See what\'s working and what\'s not',
          description: 'Get scores on hooks, CTAs, pacing, and visuals.',
          variant: 'primary',
        },
        {
          title: 'Versions optimized for each platform',
          description: 'Meta, Instagram, and TikTok-ready with platform-specific pacing.',
          variant: 'success',
        },
      ],
      freePlan: {
        title: 'FREE FOREVER PLAN',
        features: [
          '1 instant script without logging in',
          '10 credits every month with a free account',
          'Upgrade to unlock weekly delivery & advanced formats',
        ],
        note: 'Need more credits? Paid plans add instant top ups without leaving this page.',
      },
    },
    fields: [
      {
        key: 'companyName',
        label: 'Brand or company name',
        type: 'text',
        placeholder: 'e.g. APSICS Media',
        required: true,
      },
      {
        key: 'primaryPlatform',
        label: 'Primary platform focus',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'facebook', label: 'Facebook / Meta' },
          { value: 'instagram', label: 'Instagram (Reels/Stories)' },
          { value: 'tiktok', label: 'TikTok' },
          { value: 'youtube', label: 'YouTube / Shorts' },
          { value: 'linkedin', label: 'LinkedIn' },
        ],
      },
      {
        key: 'iterationGoal',
        label: 'Iteration goal',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'performance', label: 'Reduce CAC / boost ROAS' },
          { value: 'engagement', label: 'Increase engagement and watch time' },
          { value: 'conversion', label: 'Drive direct response conversions' },
          { value: 'awareness', label: 'Improve awareness and recall' },
          { value: 'retention', label: 'Re-engage existing customers' },
        ],
      },
      {
        key: 'referenceUrl',
        label: 'Reference landing page or product URL',
        type: 'url',
        placeholder: 'https://yourbrand.com/product',
        optional: true,
      },
      {
        key: 'additionalContext',
        label: 'What else should we know?',
        type: 'textarea',
        placeholder: 'Share offer constraints, audience nuances, promo calendar, etc.',
        rows: 4,
        optional: true,
      },
    ],
    foundersClub: {
      badge: 'Founder Club Special',
      title: 'Get the APSICS Media Founder Club for $20 this week',
      description: 'Start a free week trial, keep your favourite frameworks, and lock in lifetime Founder Club pricing before it returns to $97.',
      ctaText: 'Claim 10 Free Credits',
      ctaHref: '/#service-tiers',
      footerText: 'Founder Club offer: $20 one-time add-on after your trial.',
    },
    process: {
      title: 'How we make your ads better',
      description:
        'Every analysis uses our $250M+ performance data with your brand voice to deliver real improvements - not generic suggestions.',
      highlights: [
        {
          title: 'Find the weak spots',
          description: 'Score your hooks, CTAs, pacing, and offer clarity.',
        },
        {
          title: 'Keep what works',
          description: 'Extract your voice and proof points before improving.',
          variant: 'gradient',
        },
        {
          title: 'Create better versions',
          description: 'Generate platform-ready improvements ranked by impact.',
        },
        {
          title: 'Ready to launch',
          description: 'Scripts, overlays, and testing angles ready for production.',
        },
      ],
      showAccordion: true,
    },
    secondaryHeader: {
      links: [
        { label: 'Overview', href: '#overview' },
        { label: 'Workflow', href: '#process' },
        { label: 'Pricing', href: '#pricing' },
      ],
      ctaHref: '#pricing',
      ctaLabel: 'Start Free Analysis',
    },
  },

  'creative-brief-generator': {
    template: {
      header: {
        title: 'Turn your campaign idea into creator-ready direction',
        subtitle: 'Give us your goals. Get a complete brief creators can execute immediately. UGC, static, video, or hybrid formats delivered in minutes.',
        badgeText: 'Brief Generator',
      },
      sections: {
        showFoundersClub: true,
        showProcessSection: true,
        showPricingSection: true,
      },
      exitIntent: {
        title: 'Get Weekly Creative Intelligence Before You Go',
        subtitle: 'Join 150+ growth teams getting Monday creative intelligence drops, bonus credits, and exclusive frameworks.',
      },
    },
    form: {
      title: 'Get your first brief free',
      description: 'Provide your company details and campaign goals. We\'ll generate a complete brief with clear direction creators can execute immediately.',
      submitButtonText: 'Generate Brief',
      highlights: [
        {
          title: 'Clear direction, no guesswork',
          description: 'Positioning, audience insights, and goals that actually guide creation.',
          variant: 'primary',
        },
        {
          title: 'Hooks and angles ready to shoot',
          description: 'Specific concepts creators can start filming today.',
          variant: 'success',
        },
      ],
      freePlan: {
        title: 'FREE FOREVER PLAN',
        features: [
          '1 instant script without logging in',
          '10 credits every month with a free account',
          'Upgrade to unlock weekly delivery & advanced formats',
        ],
        note: 'Need more credits? Paid plans add instant top ups without leaving this page.',
      },
    },
    fields: [
      {
        key: 'companyName',
        label: 'Company Name',
        type: 'text',
        placeholder: 'e.g. BrightWave Labs',
        required: true,
      },
      {
        key: 'websiteUrl',
        label: 'Website URL',
        type: 'url',
        placeholder: 'https://yourbrand.com',
        required: true,
      },
      {
        key: 'briefFormat',
        label: 'Brief Format',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'ugc', label: 'UGC / Influencer' },
          { value: 'static', label: 'Static / Display' },
          { value: 'video', label: 'Video' },
          { value: 'hybrid', label: 'Hybrid (Static + Video)' },
        ],
      },
      {
        key: 'productDescription',
        label: 'Product / Service Description',
        type: 'textarea',
        placeholder: 'Describe what you sell, key benefits, differentiators',
        rows: 3,
        required: true,
      },
      {
        key: 'campaignObjective',
        label: 'Campaign Objective',
        type: 'textarea',
        placeholder: 'Launch, evergreen scaling, specific KPI targets, etc.',
        rows: 3,
        required: true,
      },
      {
        key: 'audienceProfile',
        label: 'Audience Profile',
        type: 'textarea',
        placeholder: 'Demographics, psychographics, pain points, purchase triggers',
        rows: 3,
        required: true,
      },
      {
        key: 'keyMessages',
        label: 'Key Messages',
        type: 'textarea',
        placeholder: 'List 3-5 must-have messages or proof points',
        rows: 3,
        optional: true,
      },
      {
        key: 'primaryPlatform',
        label: 'Primary Platform',
        type: 'select',
        optional: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'facebook', label: 'Facebook' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'tiktok', label: 'TikTok' },
          { value: 'youtube', label: 'YouTube' },
          { value: 'linkedin', label: 'LinkedIn' },
        ],
      },
      {
        key: 'budgetRange',
        label: 'Budget Range',
        type: 'select',
        optional: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'under-5k', label: 'Under $5,000' },
          { value: '5k-15k', label: '$5,000 - $15,000' },
          { value: '15k-50k', label: '$15,000 - $50,000' },
          { value: 'over-50k', label: 'Over $50,000' },
        ],
      },
      {
        key: 'creativeConstraints',
        label: 'Creative Constraints',
        type: 'textarea',
        placeholder: 'Brand guidelines, compliance notes, technical requirements',
        rows: 3,
        optional: true,
      },
    ],
    foundersClub: {
      badge: 'Founder Club Special',
      title: 'Get the APSICS Media Founder Club for $20 this week',
      description: 'Start a free week trial, keep your favourite frameworks, and lock in lifetime Founder Club pricing before it returns to $97.',
      ctaText: 'Claim 10 Free Credits',
      ctaHref: '/#service-tiers',
      footerText: 'Founder Club offer: $20 one-time add-on after your trial.',
    },
    process: {
      title: 'How we craft strategic briefs',
      description: 'Every brief combines your brand inputs with proven creative frameworks, audience psychology, and performance best practices from $250M+ in managed ad spend.',
      highlights: [
        {
          title: 'Strategic foundation',
          description: 'Clear positioning aligned with campaign objectives and audience psychology.',
        },
        {
          title: 'Creative direction',
          description: 'Specific hooks, angles, and visual concepts that creators can execute immediately.',
          variant: 'gradient',
        },
        {
          title: 'Format optimization',
          description: 'Tailored deliverables and success metrics for UGC, static, video, or hybrid campaigns.',
        },
        {
          title: 'Performance focus',
          description: 'Direction informed by what actually drives conversions and reduces CAC.',
        },
      ],
      showAccordion: true,
    },
    secondaryHeader: {
      links: [
        { label: 'Overview', href: '#overview' },
        { label: 'Workflow', href: '#workflow' },
        { label: 'Plans', href: '#plans' },
      ],
      ctaHref: '#plans',
      ctaLabel: 'Unlock Advanced Mode',
    },
  },

  // Example of another tool configuration
  'ai-email-generator': {
    template: {
      header: {
        title: 'Generate high-converting email campaigns with AI',
        subtitle: 'Transform your marketing briefs into compelling email sequences that drive opens, clicks, and conversions.',
        badgeText: 'APSICS Email Intelligence',
      },
      sections: {
        showFoundersClub: true,
        showProcessSection: true,
        showPricingSection: true,
      },
      exitIntent: {
        title: 'Get Your Free Email Templates',
        subtitle: 'Download our proven email sequences that drive 40%+ open rates.',
      },
    },
    form: {
      title: 'Create your email campaign',
      description: 'Input your product details and target audience. We\'ll generate a complete email sequence optimized for engagement and conversion.',
      submitButtonText: 'Generate Email Campaign',
      highlights: [
        {
          title: 'Subject line optimization',
          description: 'AI-crafted subject lines tested for maximum open rates across industries.',
          variant: 'primary',
        },
        {
          title: 'Conversion-focused copy',
          description: 'Email body content designed to drive specific actions and boost CTR.',
          variant: 'success',
        },
      ],
      freePlan: {
        title: 'Free email plan',
        features: [
          '1 complete email sequence without signup',
          '+3 additional campaigns with free account',
          'Upgrade for A/B testing and analytics',
        ],
        note: 'Premium plans include advanced personalization and automation.',
      },
    },
    fields: [
      {
        key: 'companyName',
        label: 'Company Name',
        type: 'text',
        placeholder: 'e.g. TechCorp Solutions',
        required: true,
      },
      {
        key: 'websiteUrl',
        label: 'Website URL',
        type: 'url',
        placeholder: 'https://yoursite.com',
        required: true,
      },
      {
        key: 'emailType',
        label: 'Email Campaign Type',
        type: 'select',
        required: true,
        options: [
          { value: 'welcome', label: 'Welcome sequence' },
          { value: 'product-launch', label: 'Product launch' },
          { value: 'promotional', label: 'Promotional campaign' },
          { value: 'nurture', label: 'Lead nurture sequence' },
          { value: 'retention', label: 'Customer retention' },
        ],
      },
      {
        key: 'targetAudience',
        label: 'Target Audience',
        type: 'textarea',
        placeholder: 'Describe your ideal customer, their pain points, and demographics',
        rows: 3,
        required: true,
      },
      {
        key: 'campaignGoal',
        label: 'Campaign Goal',
        type: 'select',
        optional: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'awareness', label: 'Brand awareness' },
          { value: 'sales', label: 'Drive sales' },
          { value: 'signups', label: 'Increase signups' },
          { value: 'engagement', label: 'Boost engagement' },
          { value: 'retention', label: 'Improve retention' },
        ],
      },
    ],
    foundersClub: {
      badge: 'Email Mastery Special',
      title: 'Join the Email Marketing Accelerator for $20',
      description: 'Access our complete email marketing framework, templates, and automation strategies used by 7-figure brands.',
      ctaText: 'Get Email Accelerator',
      ctaHref: '/#email-plans',
      footerText: 'Limited time: $20 (normally $97) for early adopters.',
    },
    process: {
      title: 'Our email generation process',
      description: 'We combine behavioral psychology, copywriting best practices, and data-driven insights to create emails that actually convert.',
      highlights: [
        {
          title: 'Psychology-driven hooks',
          description: 'Subject lines and openings designed to trigger curiosity and urgency.',
        },
        {
          title: 'Conversion optimization',
          description: 'Email structure and CTAs optimized for specific campaign goals.',
          variant: 'gradient',
        },
        {
          title: 'A/B testing insights',
          description: 'Copy variations based on thousands of email performance tests.',
        },
        {
          title: 'Mobile-first design',
          description: 'Content formatted for optimal mobile reading experience.',
        },
      ],
      showAccordion: false,
    },
    secondaryHeader: {
      links: [
        { label: 'Overview', href: '#overview' },
        { label: 'Process', href: '#workflow' },
        { label: 'Pricing', href: '#email-plans' },
      ],
      ctaHref: '#email-plans',
      ctaLabel: 'Start Free Trial',
    },
  },

  'custom-ad-iteration-tool': {
    template: {
      header: {
        title: 'Save competitor ads and generate APSICS remixes',
        subtitle:
          'Share Meta/Instagram ads via iOS Shortcut, view them in your personalized library, then generate new variations using proven APSICS frameworks and your saved ads as strategic inspiration.',
        badgeText: 'Custom Ad Intelligence',
      },
      sections: {
        showFoundersClub: true,
        showProcessSection: true,
        showPricingSection: true,
      },
      exitIntent: {
        title: 'Get Weekly Creative Intelligence Before You Go',
        subtitle: 'Join 150+ growth teams getting Monday creative intelligence drops, bonus credits, and exclusive frameworks.',
      },
    },
    form: {
      title: 'Generate your first custom remix',
      description:
        'Select one or more saved ads from your library below, provide your brand context, and we will generate APSICS-crafted variations that combine your saved ad inspiration with performance-proven creative frameworks.',
      submitButtonText: 'Generate Custom Remix',
      highlights: [
        {
          title: 'Competitor-informed intelligence',
          description: 'Analyze saved ads to extract winning patterns, then remix with your brand voice.',
          variant: 'primary',
        },
        {
          title: 'Multi-format remixes',
          description: 'Generate video scripts, static layouts, and carousel packages from any saved ad.',
          variant: 'success',
        },
      ],
      freePlan: {
        title: 'FREE FOREVER PLAN',
        features: [
          'Save unlimited ads via iOS Shortcut',
          '10 credits every month for generation',
          'Upgrade for higher volume and expert concepts',
        ],
        note: 'Saving ads is always free. Credits are only used for generation.',
      },
    },
    fields: [
      {
        key: 'companyName',
        label: 'Your brand or company name',
        type: 'text',
        placeholder: 'e.g. APSICS Media',
        required: true,
      },
      {
        key: 'primaryPlatform',
        label: 'Primary platform focus',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'facebook', label: 'Facebook / Meta' },
          { value: 'instagram', label: 'Instagram (Reels/Stories)' },
          { value: 'tiktok', label: 'TikTok' },
          { value: 'youtube', label: 'YouTube / Shorts' },
          { value: 'linkedin', label: 'LinkedIn' },
        ],
      },
      {
        key: 'adGoal',
        label: 'Campaign goal',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select One' },
          { value: 'performance', label: 'Reduce CAC / boost ROAS' },
          { value: 'engagement', label: 'Increase engagement and watch time' },
          { value: 'conversion', label: 'Drive direct response conversions' },
          { value: 'awareness', label: 'Improve awareness and recall' },
          { value: 'retention', label: 'Re-engage existing customers' },
        ],
      },
      {
        key: 'voiceGuidance',
        label: 'Brand voice guidance (optional)',
        type: 'textarea',
        placeholder: 'Professional, casual, technical, storytelling, etc.',
        rows: 2,
        optional: true,
      },
      {
        key: 'callToAction',
        label: 'Preferred call-to-action (optional)',
        type: 'text',
        placeholder: 'e.g. Start Free Trial, Learn More, Get Started',
        optional: true,
      },
    ],
    foundersClub: {
      badge: 'Founder Club Special',
      title: 'Get the APSICS Media Founder Club for $20 this week',
      description: 'Start a free week trial, keep your favourite frameworks, and lock in lifetime Founder Club pricing before it returns to $97.',
      ctaText: 'Claim 10 Free Credits',
      ctaHref: '/#service-tiers',
      footerText: 'Founder Club offer: $20 one-time add-on after your trial.',
    },
    process: {
      title: 'How custom ad remixing works',
      description:
        'We analyze your saved competitor ads, extract winning creative patterns, then blend them with your brand context and APSICS performance intelligence to generate ready-to-launch variations.',
      highlights: [
        {
          title: 'Save ads effortlessly',
          description: 'Share any Meta/Instagram ad via iOS Shortcut - appears instantly in your library.',
        },
        {
          title: 'Extract winning patterns',
          description: 'Analyze creative elements, hooks, and messaging frameworks from saved ads.',
          variant: 'gradient',
        },
        {
          title: 'Generate custom remixes',
          description: 'Combine saved ad inspiration with your brand voice and APSICS proven frameworks.',
        },
        {
          title: 'Launch with confidence',
          description: 'Get platform-native scripts, static layouts, and carousel packages ready for production.',
        },
      ],
      showAccordion: true,
    },
    secondaryHeader: {
      links: [
        { label: 'Overview', href: '#overview' },
        { label: 'Workflow', href: '#process' },
        { label: 'Pricing', href: '#pricing' },
      ],
      ctaHref: '#pricing',
      ctaLabel: 'Start Free',
    },
  },
};

export function getToolConfig(toolId: string): ToolPageConfig | null {
  return toolConfigs[toolId] || null;
}
