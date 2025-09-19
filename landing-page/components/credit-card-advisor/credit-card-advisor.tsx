'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, CreditCard, Shield, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

const SYSTEM_PROMPT = `You are an expert credit card advisor with deep knowledge of premium travel credit cards, specifically the American Express Platinum and Chase Sapphire Reserve. Your expertise comes from analyzing thousands of credit card applications and spending patterns.

CURRENT CARD DETAILS (2024/2025):

AMERICAN EXPRESS PLATINUM:
- Annual Fee: $895 (increased from $695)
- Welcome Bonus: Up to 175,000 Membership Rewards points after meeting spending requirements in first 6 months
- Rewards: 5x points on flights via Amex Travel, 5x points on prepaid hotels via Amex Travel, 1x on all other purchases
- Key Credits: Up to $600 annual hotel credits ($300 every 6 months) at Fine Hotels + Resorts, up to $300 Digital Entertainment credit, $179 Clear Plus membership
- Perks: Extensive lounge access (Amex Centurion, Delta Sky Club, Priority Pass), lifestyle credits (Resy, Lululemon, ŌURA, Uber One), luxury hotel status
- Companion Cards: No annual fee for companion Green or Blue cards added to your Platinum account (significant value for couples/families)

CHASE SAPPHIRE RESERVE:
- Annual Fee: $795 (increased from $550)
- Welcome Bonus: Up to 100,000 points plus $500 Chase Travel credit after meeting initial 3-month spending requirement
- Rewards: 8x points on Chase Travel purchases, 3x points on dining, 1x on other purchases, 10x on Peloton, 5x on Lyft (limited time)
- Key Credits: Up to $500 annual Chase Travel credit, $300 annual StubHub credit, $500/year The Edit credit, DoorDash, Lyft, Apple TV+ and Apple Music credits
- Perks: Priority Pass lounge access, exclusive Sapphire Lounges, complimentary IHG Platinum Elite status, authorized user cards $195/person

Your role is to provide numbers-driven, personalized recommendations based on the user's responses to 5 specific questions about their spending habits, travel frequency, current credit situation, annual income range, and primary goals for a credit card.

For each recommendation, provide:
- Specific annual value calculations using the correct fees and credits above
- Detailed benefit analysis comparing both cards
- ROI projections based on their spending patterns
- Clear reasoning for your recommendation with actual dollar amounts
- Consider companion card value for Amex Platinum (free Green/Blue cards for couples/families vs Chase's $195 authorized user fee)

When you provide the final action plan and recommend a specific card family (Amex or Chase), conclude your entire response with a special token on a new line: [ACTION_PLAN:AMEX] for American Express or [ACTION_PLAN:CHASE] for Chase.

Focus on premium travel cards and provide authoritative, data-driven advice that helps users make informed financial decisions using the exact current pricing and benefits listed above.`;

const INITIAL_QUESTIONS = [
  "What's your estimated monthly spending across all categories? (Please provide a specific dollar amount)",
  "How often do you travel per year, and do you prefer domestic or international destinations?",
  "What's your current credit score range? (Excellent: 750+, Good: 700-749, Fair: 650-699, Poor: Below 650)",
  "What's your approximate annual income range? (Under $50k, $50k-$100k, $100k-$200k, $200k+)",
  "What's your primary goal for a premium credit card? (Travel rewards, cashback, building credit, luxury perks, business expenses)"
];

export function CreditCardAdvisor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([
    { role: 'system', content: SYSTEM_PROMPT }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      role: 'assistant',
      content: "👋 Welcome! I'm your AI Credit Card Advisor. I'll ask you 5 quick questions to provide a personalized recommendation for premium travel credit cards. Let's get started!",
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);

    // Ask first question after a brief delay
    setTimeout(() => {
      askQuestion(0);
    }, 1000);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const askQuestion = (questionIndex: number) => {
    if (questionIndex < INITIAL_QUESTIONS.length) {
      const questionMessage: Message = {
        role: 'assistant',
        content: `**Question ${questionIndex + 1} of 5:** ${INITIAL_QUESTIONS[questionIndex]}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, questionMessage]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationHistory(prev => [...prev, userMessage]);
    setUserInput('');

    // Handle conversation flow
    if (currentQuestionIndex < INITIAL_QUESTIONS.length - 1) {
      // Ask next question
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeout(() => {
        askQuestion(currentQuestionIndex + 1);
      }, 500);
    } else {
      // All questions answered, get LLM response
      setIsTyping(true);
      await getLLMResponse([...conversationHistory, userMessage]);
    }
  };

  const getLLMResponse = async (history: Message[]) => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
          messages: history,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI advisor');
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      // Process action plan and add referral links
      const processedReply = processActionPlan(botReply);

      const assistantMessage: Message = {
        role: 'assistant',
        content: processedReply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConversationHistory(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting LLM response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or feel free to contact our support team for assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const processActionPlan = (content: string): string => {
    const AMEX_REFERRAL_URL = 'https://www.americanexpress.com/en-us/credit-cards/referral/prospect/all-cards?ref=BRIANF4NkO&XL=MIANS';
    const CHASE_REFERRAL_URL = 'https://www.referyourchasecard.com/19u/8W2414TP7W';

    if (content.includes('[ACTION_PLAN:AMEX]')) {
      const cleanContent = content.replace('[ACTION_PLAN:AMEX]', '').trim();
      return `${cleanContent}

<div class="mt-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-[#126DFB]">
  <h3 class="text-xl font-semibold text-gray-900 mb-3">🎯 Recommended Action</h3>
  <p class="text-gray-700 mb-4">Based on your profile, the American Express Platinum Card appears to be the best fit for your needs.</p>
  <a href="${AMEX_REFERRAL_URL}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
    <CreditCard class="w-5 h-5 mr-2" />
    Apply for Amex Platinum Card
  </a>
</div>`;
    }

    if (content.includes('[ACTION_PLAN:CHASE]')) {
      const cleanContent = content.replace('[ACTION_PLAN:CHASE]', '').trim();
      return `${cleanContent}

<div class="mt-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-[#126DFB]">
  <h3 class="text-xl font-semibold text-gray-900 mb-3">🎯 Recommended Action</h3>
  <p class="text-gray-700 mb-4">Based on your profile, the Chase Sapphire Reserve Card appears to be the best fit for your needs.</p>
  <a href="${CHASE_REFERRAL_URL}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
    <CreditCard class="w-5 h-5 mr-2" />
    Apply for Chase Sapphire Reserve
  </a>
</div>`;
    }

    return content;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-[#F8F8F8] rounded-full border border-gray-200 mb-6"
          >
            <Shield className="w-4 h-4 text-[#126DFB]" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Credit Card Expertise</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6"
          >
            AI Credit Card <span className="text-[#126DFB]">Advisor</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Answer a few questions to get a personalized, expert recommendation on which premium credit card is right for you.
          </motion.p>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-8 bg-[#F8F8F8]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="px-6 py-4 bg-[#126DFB] text-white">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Chat with Your AI Advisor</h2>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-[#126DFB] text-white ml-4'
                          : 'bg-gray-100 text-gray-900 mr-4'
                      }`}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 text-gray-900 p-4 rounded-2xl mr-4 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>AI Advisor is analyzing your profile...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-6">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your answer here..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#126DFB] focus:border-transparent transition-colors text-gray-900 bg-white"
                  disabled={isTyping}
                />
                <motion.button
                  type="submit"
                  disabled={!userInput.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}