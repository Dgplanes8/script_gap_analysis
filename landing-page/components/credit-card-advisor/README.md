# AI Credit Card Advisor

A conversational AI-powered credit card recommendation system that helps users find the best premium travel credit cards based on their spending habits and financial profile.

## Features

- **Interactive Chat Interface**: Clean, modern chat UI following APSICS Media brand guidelines
- **AI-Powered Recommendations**: Uses OpenRouter API with GPT-4 to analyze user responses
- **Personalized Questions**: 5 targeted questions about spending, travel, credit, income, and goals
- **Smart Referral Links**: Automatically inserts appropriate referral links based on AI recommendations
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Brand Consistent**: Follows the established design system with proper colors, typography, and animations

## Setup

### Environment Variables

Add the following to your `.env.local` file:

```bash
# OpenRouter API Configuration (Required for AI Credit Card Advisor)
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### Getting an OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to the API Keys section
4. Create a new API key
5. Add the key to your environment variables

## Usage

The credit card advisor is available at `/credit-card-advisor` and features:

### Conversation Flow

1. **Welcome Message**: Introduces the AI advisor
2. **5 Questions**: Sequential questions about:
   - Monthly spending amount
   - Travel frequency and preferences
   - Credit score range
   - Annual income range
   - Primary credit card goals
3. **AI Analysis**: Processes responses using GPT-4
4. **Recommendation**: Provides detailed card recommendation with referral link

### Supported Credit Cards

- **American Express Platinum Card**
- **Chase Sapphire Reserve Card**

The AI determines which card is best based on the user's profile and spending patterns.

## Technical Implementation

### Components

- `credit-card-advisor.tsx`: Main component with chat interface
- Fully self-contained with state management and API integration
- Uses Framer Motion for smooth animations
- Implements proper accessibility features

### API Integration

- **Service**: OpenRouter API
- **Model**: GPT-4 (openai/gpt-4o)
- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Authentication**: Bearer token via environment variable

### Styling

- **Framework**: Tailwind CSS
- **Brand Colors**: #126DFB (primary blue), #0F5AD6 (hover states)
- **Typography**: Responsive scaling with clamp() functions
- **Animation**: Framer Motion with consistent easing and timing

## Brand Compliance

The implementation follows the APSICS Media Brand Consistency Guide:

- ✅ Uses exact brand colors (#126DFB primary blue)
- ✅ Implements responsive typography scales
- ✅ Follows proper spacing standards (py-20, max-w-4xl)
- ✅ Uses consistent card styling (rounded-2xl p-8 shadow-lg)
- ✅ Includes proper hover animations and micro-interactions
- ✅ Mobile-first responsive design

## Security & Privacy

- Client-side only (no server-side data storage)
- API key properly secured via environment variables
- No personal information stored or logged
- Secure HTTPS API endpoints only

## Accessibility

- Proper ARIA labels for chat interface
- Keyboard navigation support
- Screen reader compatibility
- Focus management for dynamic content
- Sufficient color contrast ratios

## Performance

- Optimized bundle size with tree shaking
- Efficient re-renders with proper React patterns
- Smooth animations at 60fps
- Fast loading with Next.js optimization

## Customization

### Adding New Questions

Modify the `INITIAL_QUESTIONS` array in the component:

```typescript
const INITIAL_QUESTIONS = [
  "Your new question here...",
  // ... existing questions
];
```

### Updating System Prompt

Modify the `SYSTEM_PROMPT` constant to adjust AI behavior:

```typescript
const SYSTEM_PROMPT = `Your updated system prompt...`;
```

### Adding New Credit Cards

Update the `processActionPlan` function to handle new action plan tokens and referral URLs.

## Support

For technical support or questions about the credit card advisor implementation, contact the development team.

## License

This component is part of the APSICS Media landing page project and follows the same licensing terms.