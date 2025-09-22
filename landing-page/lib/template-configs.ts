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
        title: 'Generate revenue-ready ads from our $250M+ creative intelligence engine',
        subtitle: 'Turn your brief into platform-native scripts and static copy trained on what actually moves CAC. TikTok, Meta, YouTube, LinkedIn, X - handled in a single pass.',
        badgeText: 'APSICS Creative Intelligence',
      },
      sections: {
        showFoundersClub: true,
        showProcessSection: true,
        showPricingSection: true,
      },
      exitIntent: {
        title: 'Grab 10 More Free Ad Templates',
        subtitle: 'Join 100+ teams getting Monday creative intelligence drops plus instant access to our 10-template swipe file.',
      },
    },
    form: {
      title: 'Start with a complimentary script',
      description: 'Drop in your company name, URL, and the campaign goal. We\'ll return a production-ready concept engineered from competitor intel, audience psychology, and APSICS testing frameworks.',
      submitButtonText: 'Generate Script',
      highlights: [
        {
          title: 'Platform-native copy',
          description: 'Hooks, overlays, and CTAs tuned to each channel\'s pacing and auction behavior.',
          variant: 'primary',
        },
        {
          title: 'Psychology-backed messaging',
          description: 'Language sourced from real customer voice, competitor gaps, and emotional triggers.',
          variant: 'success',
        },
      ],
      freePlan: {
        title: 'Free forever plan',
        features: [
          '1 instant script without logging in',
          '+3 additional scripts after free account signup',
          'Upgrade to unlock weekly delivery & advanced formats',
        ],
        note: 'Need more credits? Paid plans add Stripe-powered top ups without leaving this page.',
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
          { value: '', label: 'Let the AI choose the best fit' },
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
          { value: '', label: 'Select campaign goal' },
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
      ctaText: 'Start Free Week Trial',
      ctaHref: '/#service-tiers',
      footerText: 'Founder Club offer: $20 one-time add-on after your trial.',
    },
    process: {
      title: 'How we craft scripts',
      description: 'We blend your product inputs with proven creative frameworks, audience psychology, and platform-specific pacing so every script hits performance benchmarks.',
      highlights: [
        {
          title: 'Audience-first positioning',
          description: 'Align the narrative with awareness level, pain points, and desired transformation.',
        },
        {
          title: 'Platform formatting',
          description: 'Optimize pacing, structure, and CTA style for the placement you choose.',
          variant: 'gradient',
        },
        {
          title: 'Performance heuristics',
          description: 'Trained on $250M+ in ad spend, focusing on retention, resonance, and conversion.',
        },
        {
          title: 'Brand consistency',
          description: 'Adapts to your voice guidelines without sacrificing clarity or urgency.',
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
      ctaLabel: 'Start Free Week Trial',
    },
  },

  'ai-ad-iteration-tool': {
    template: {
      header: {
        title: 'Transform your existing ads into APSICS-grade top performers',
        subtitle:
          'Upload your creative or drop a social link to get scene-by-scene diagnostics, format shifts, and ready-to-launch remixes tuned to Meta, TikTok, and beyond.',
        badgeText: 'APSICS Creative Intelligence',
      },
      sections: {
        showFoundersClub: true,
        showProcessSection: true,
        showPricingSection: true,
      },
      exitIntent: {
        title: 'Grab 5 more iteration formulas before you go',
        subtitle:
          'Join 100+ growth teams receiving weekly APSICS teardown drops, bonus credits, and private breakdowns.',
      },
    },
    form: {
      title: 'Run your first boosted iteration',
      description:
        'Drop in your brand context and the asset you want to improve. In under three minutes you will receive a full diagnostic, prioritized fixes, and APSICS-crafted remixes across the formats you pick.',
      submitButtonText: 'Analyze and Generate Iterations',
      highlights: [
        {
          title: 'Full scene intelligence',
          description: 'Maps hooks, CTAs, pacing, and visual sequencing against APSICS benchmarks.',
          variant: 'primary',
        },
        {
          title: 'Platform-tuned remixes',
          description: 'Delivers Meta, Instagram, and TikTok-ready outputs with channel-native pacing.',
          variant: 'success',
        },
      ],
      freePlan: {
        title: 'Included in the free tier',
        features: [
          '1 instant iteration with no login required',
          '+3 additional iterations after free account signup',
          'Upgrade for unlimited credits and weekly auto-delivery',
        ],
        note: 'Paid tiers unlock bulk uploads, CSV history export, and concierge reviews.',
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
        key: 'brandVoice',
        label: 'Preferred brand voice',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select voice' },
          { value: 'authoritative', label: 'Authoritative and direct' },
          { value: 'playful', label: 'Playful and conversational' },
          { value: 'premium', label: 'Premium and sophisticated' },
          { value: 'urgent', label: 'Performance-driven urgency' },
          { value: 'custom', label: 'Custom (specify in additional context)' },
        ],
      },
      {
        key: 'primaryPlatform',
        label: 'Primary platform focus',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Auto-detect from asset' },
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
          { value: '', label: 'Select a goal' },
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
      badge: 'Founder Club Insider',
      title: 'Lock lifetime creative intelligence access at $20/mo',
      description:
        'Secure the Founder Club seat before it reverts to $97/mo and get priority iteration reviews, weekly teardown drops, and 50 bonus credits.',
      ctaText: 'Claim Founder Club Seat',
      ctaHref: '/#service-tiers',
      footerText: 'Includes private Slack office hours and quarterly creative audits.',
    },
    process: {
      title: 'How APSICS remixes your creative in 180 seconds',
      description:
        'Every analysis layers our $250M+ performance dataset with your brand voice to deliver usable landable creative - not generic AI fluff.',
      highlights: [
        {
          title: 'Diagnose weak spots',
          description: 'Scene-by-scene hook pacing, CTA placement, and offer clarity scoring.',
        },
        {
          title: 'Distill brand signals',
          description: 'Extract voice, proof points, and must-keep assets before iterating.',
          variant: 'gradient',
        },
        {
          title: 'Remix intelligently',
          description: 'Generate multi-format, platform-native improvements prioritized by impact.',
        },
        {
          title: 'Package for launch',
          description: 'Deliver scripts, overlays, asset lists, and testing angles ready for production.',
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
          { value: '', label: 'Select primary goal' },
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
};

export function getToolConfig(toolId: string): ToolPageConfig | null {
  return toolConfigs[toolId] || null;
}
