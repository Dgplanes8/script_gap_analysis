#!/usr/bin/env python3
"""
Enhanced Reddit Response Generator
Creates personalized, valuable responses based on specific post analysis
"""

import re
import logging
import subprocess
import json
from typing import Dict, List, Optional, Tuple
from datetime import datetime

class EnhancedResponseGenerator:
    """
    Advanced response generator that analyzes post content and creates
    tailored, valuable responses with specific insights
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        
        # Specific insight frameworks by topic
        self.insight_frameworks = {
            'creative_fatigue': {
                'pain_points': ['creative fatigue', 'ad performance declining', 'creative block', 'running out of ideas'],
                'insights': [
                    "Honestly, most brands I've worked with only test like 5-10 creatives and wonder why performance drops. I've gotten into the habit of scraping 200+ competitor ads to find what everyone's missing.",
                    "After burning through way too much budget, I built this scoring system that's pretty good at predicting which creative will flop before you spend money on it.",
                    "The dirty secret? It's not that you need more creative - you need to find the angles your competitors aren't touching.",
                    "I've learned the hard way that throwing 15 'good enough' concepts out there beats perfecting 3 for weeks while your current ads burn money."
                ],
                'tactical_advice': [
                    "Go scrape your competitors' FB Ad Library right now - I bet you'll find 2-3 angles nobody's using",
                    "Try the curiosity gap thing - basically tease a specific outcome without saying how you do it",
                    "UGC-style stuff is crushing it right now, way better than polished creative",
                    "Focus on that first 0.3 seconds - if your hook doesn't stop the scroll, everything else is worthless"
                ]
            },
            'cac_rising': {
                'pain_points': ['cac rising', 'acquisition costs', 'customer acquisition cost', 'expensive traffic'],
                'insights': [
                    "Tbh, like 73% of CAC problems I've seen are creative issues, not some targeting or iOS14 conspiracy.",
                    "Everyone goes straight to optimizing landing pages when their CAC spikes. Wrong move - creative has 4x more impact in my experience.",
                    "After 10+ years managing ad spend, I can tell you creative quality is the biggest lever you're probably not pulling.",
                    "The real CAC crisis isn't iOS14 - it's that everyone's creative looks the same now and users are blind to it."
                ],
                'tactical_advice': [
                    "Check how often people are seeing your ads - anything over 3x per week and you're burning money",
                    "Map out what your competitors are doing creative-wise, then find the gaps",
                    "Try some pattern interrupts - stuff that breaks the format people expect",
                    "Test hooks first, then worry about audiences and landing pages"
                ]
            },
            'agency_issues': {
                'pain_points': ['agency slow', 'agency problems', 'agency turnaround', 'agency expensive'],
                'insights': [
                    "The agency thing drives me crazy - they want 2-3 weeks for creative while your current ads are dying in 48 hours.",
                    "Most agencies literally use the same 5 frameworks for everyone. That's why all the creative looks identical.",
                    "I ended up building my own hybrid approach because agencies are either too slow or you lose the strategic thinking.",
                    "The agency model just doesn't work when you're scaling - too many clients, cookie-cutter strategies."
                ],
                'tactical_advice': [
                    "If you stick with agencies, set hard KPIs - like 5 concepts per week minimum",
                    "Make them do actual competitor analysis for every brief (most skip this)",
                    "Don't let them just resize assets - demand platform-native variations",
                    "Consider going hybrid: agency strategy but in-house execution for speed"
                ]
            },
            'conversion_optimization': {
                'pain_points': ['conversion rate', 'low conversions', 'conversion optimization', 'landing page'],
                'insights': [
                    "Honestly, conversion optimization is like 80% getting the message right and 20% page tweaks.",
                    "Most conversion problems I see aren't page design - it's that your ad promises one thing and the page says something else.",
                    "I've looked at way too many funnels over the years and the pattern is always the same for what works.",
                    "Everyone obsesses over conversion rate but ignores whether they're getting quality traffic in the first place."
                ],
                'tactical_advice': [
                    "Make your landing page headline match your best-performing ad hook exactly",
                    "Use that confirmation bias thing - remind them why they clicked in the first place",
                    "Try removing navigation and footer links - fewer ways for people to leave",
                    "Start with email capture before asking for the sale"
                ]
            },
            'growth_strategy': {
                'pain_points': ['growth stalled', 'plateau', 'scaling challenges', 'growth strategy'],
                'insights': [
                    "Growth plateaus usually happen when you've tapped out your obvious audience and need new messaging angles.",
                    "Most brands think scaling means adding more channels. The smart ones expand their messaging first.",
                    "I've worked with a bunch of brands on growth stuff and it's always the same pattern - messaging expansion unlocks scale.",
                    "The bottleneck isn't usually budget or team size - it's running out of creative concepts that work."
                ],
                'tactical_advice': [
                    "Work backwards from your customer journey to find the 'almost customers' you're missing",
                    "Look at adjacent pain points your product solves but you're not advertising",
                    "Test outcome-focused messaging vs feature-focused across everything",
                    "Talk to customers monthly and turn those insights into new messaging angles"
                ]
            },
            'attribution_tracking': {
                'pain_points': ['attribution', 'tracking', 'measurement', 'analytics', 'ios14'],
                'insights': [
                    "The attribution mess is actually hiding the real insights about what creative is working.",
                    "I've built custom tracking for way too much ad spend and most tools are missing like 30-40% of what's happening.",
                    "iOS14 isn't really the problem - most brands never had proper attribution to begin with.",
                    "Stop chasing perfect attribution and focus on directional data that actually helps you make decisions."
                ],
                'tactical_advice': [
                    "Use UTM parameters and landing page surveys to fill in the gaps",
                    "Test incrementality with geo holdouts or brand lift studies",
                    "Look at blended CAC and LTV trends instead of getting lost in platform data",
                    "Build creative performance scores that don't depend on platform attribution"
                ]
            }
        }
        
        # Common business contexts and specific responses
        self.business_contexts = {
            'saas': {
                'specific_insights': [
                    "For SaaS, the creative hierarchy that actually works is: Problem awareness → Solution differentiation → Social proof → Urgency",
                    "Most SaaS ads just list features. The ones that convert focus on workflow transformation.",
                    "SaaS sales cycles are like 3-6 months, so your creative needs to nurture people, not just go for the hard sell.",
                    "Btw, demo requests usually convert better than free trials for SaaS lead gen"
                ]
            },
            'ecommerce': {
                'specific_insights': [
                    "The advantage with e-commerce is you can use real customer UGC that agencies just can't replicate",
                    "Product photography is table stakes now. Behind-the-scenes content is what actually differentiates.",
                    "E-commerce creative should feel like discovery, not like you're being sold to.",
                    "Try seasonal hooks year-round - Q4 messaging actually works in Q2 for planning ahead"
                ]
            },
            'subscription': {
                'specific_insights': [
                    "Subscription models change everything - the LTV justifies spending way more on creative",
                    "Churn prevention actually starts with your acquisition creative - set expectations upfront",
                    "Focus on habit formation in your creative, not just product benefits",
                    "Test different 'value realization' timelines - when do customers actually see results?"
                ]
            },
            'b2b': {
                'specific_insights': [
                    "B2B decision makers are scrolling on mobile just like everyone else - stop making corporate stuff",
                    "B2B creative wins with specific outcomes and social proof, not generic corporate messaging",
                    "LinkedIn creative performs totally different than Facebook - test platform-native stuff",
                    "Remember B2B buying committees - your creative needs to speak to multiple people"
                ]
            }
        }
    
    def generate_personalized_response(self, opportunity: Dict) -> Optional[str]:
        """
        Generate a personalized response based on specific post analysis
        
        Args:
            opportunity: Dict containing post details
            
        Returns:
            Personalized response text or None
        """
        try:
            # Analyze the post content
            post_analysis = self._analyze_post_content(opportunity)
            
            # Generate response using Claude Code integration
            response = self._generate_with_claude_code(post_analysis, opportunity)
            
            return response
            
        except Exception as e:
            self.logger.error(f"Error generating personalized response: {e}")
            return None
    
    def _analyze_post_content(self, opportunity: Dict) -> Dict:
        """Analyze post content to identify specific themes and context"""
        
        title = opportunity.get('title', '').lower()
        # In a real implementation, we'd also analyze the post body content
        
        analysis = {
            'primary_topic': None,
            'business_context': None,
            'specific_pain_points': [],
            'urgency_level': 'medium',
            'experience_level': 'intermediate',
            'company_stage': 'unknown'
        }
        
        # Identify primary topic
        for topic, framework in self.insight_frameworks.items():
            if any(pain_point in title for pain_point in framework['pain_points']):
                analysis['primary_topic'] = topic
                analysis['specific_pain_points'] = [pp for pp in framework['pain_points'] if pp in title]
                break
        
        # Identify business context
        if any(word in title for word in ['saas', 'software', 'subscription']):
            analysis['business_context'] = 'saas'
        elif any(word in title for word in ['ecommerce', 'd2c', 'shopify', 'store']):
            analysis['business_context'] = 'ecommerce'
        elif any(word in title for word in ['b2b', 'enterprise', 'sales']):
            analysis['business_context'] = 'b2b'
        elif any(word in title for word in ['subscription', 'recurring', 'monthly']):
            analysis['business_context'] = 'subscription'
        
        # Assess urgency level
        urgency_indicators = ['urgent', 'quickly', 'asap', 'immediately', 'crisis', 'emergency']
        if any(indicator in title for indicator in urgency_indicators):
            analysis['urgency_level'] = 'high'
        elif any(indicator in title for indicator in ['planning', 'future', 'strategy']):
            analysis['urgency_level'] = 'low'
        
        # Assess experience level
        beginner_indicators = ['new to', 'beginner', 'getting started', 'first time', 'how to start']
        expert_indicators = ['advanced', 'scaling', 'optimizing', 'sophisticated']
        
        if any(indicator in title for indicator in beginner_indicators):
            analysis['experience_level'] = 'beginner'
        elif any(indicator in title for indicator in expert_indicators):
            analysis['experience_level'] = 'advanced'
        
        # Assess company stage
        if any(word in title for word in ['startup', 'early stage', 'pre-seed']):
            analysis['company_stage'] = 'startup'
        elif any(word in title for word in ['scaling', 'growth', 'expanding']):
            analysis['company_stage'] = 'growth'
        elif any(word in title for word in ['enterprise', 'large company']):
            analysis['company_stage'] = 'enterprise'
        
        return analysis
    
    def _generate_with_claude_code(self, post_analysis: Dict, opportunity: Dict) -> Optional[str]:
        """
        Generate response using Claude Code Task integration for dynamic content
        
        Args:
            post_analysis: Analysis of the post content
            opportunity: Original opportunity data
            
        Returns:
            Generated response text or None if failed
        """
        try:
            # Build context for Claude Code
            title = opportunity.get('title', '')
            subreddit = opportunity.get('subreddit', '')
            pain_points = ', '.join(post_analysis.get('specific_pain_points', []))
            business_context = post_analysis.get('business_context', 'general')
            urgency_level = post_analysis.get('urgency_level', 'medium')
            experience_level = post_analysis.get('experience_level', 'intermediate')
            
            # Create detailed prompt for natural, conversational response
            prompt = f"""Generate a conversational Reddit comment responding to this post:

Title: "{title}"
Subreddit: r/{subreddit}
Detected pain points: {pain_points}
Business context: {business_context}
User experience level: {experience_level}
Urgency: {urgency_level}

Requirements for the response:
- Write in a conversational, natural tone like a real person sharing experience
- No emojis, no bullet points, no dashes, no formatting
- Can start sentences with "and" or use run-on sentences naturally
- Share genuine insights or helpful perspective without being promotional
- Sound authentic and personal, not corporate or templated  
- Provide substantial value (50+ words minimum)
- Zero promotional content about services or products
- Focus on being genuinely helpful to the person asking

The response should feel like someone with relevant experience naturally chiming in to help, not like marketing copy or a sales pitch."""

            # Use Claude Code Task tool through subprocess
            # This simulates calling the Task tool - in actual implementation, 
            # this would integrate with Claude Code's agent system
            result = self._call_claude_code_task(prompt)
            
            if result and len(result.strip()) > 50:
                return result.strip()
            else:
                self.logger.warning("Claude Code generated insufficient response")
                return None
                
        except Exception as e:
            self.logger.error(f"Error in Claude Code integration: {e}")
            return None
    
    def _call_claude_code_task(self, prompt: str) -> Optional[str]:
        """
        Call Claude Code Task tool for response generation
        This is a simplified implementation - in production this would
        integrate with the actual Claude Code agent system
        """
        try:
            # For now, return a fallback response that follows the conversational guidelines
            # In production, this would call the actual Claude Code Task API
            
            # This is a placeholder implementation that follows the conversational tone requirements
            fallback_responses = [
                "I've been dealing with this exact same issue and honestly it's such a pain point. The thing that finally worked for me was taking a step back and looking at what everyone else in the space was doing wrong instead of trying to copy what they were doing right. Most people get stuck in this cycle where they keep iterating on the same basic approach when the real problem is they're solving the wrong thing entirely. And once you realize that the creative isn't the issue but rather the message market fit, everything starts to click differently.",
                
                "This hits so close to home because I went through something super similar about six months ago. What I learned the hard way is that most of the conventional wisdom around this stuff is actually backwards and the people giving advice haven't actually done it at scale. The approach that ended up working was way simpler than I thought it would be but took forever to figure out because everyone makes it sound more complicated than it needs to be. Sometimes the best solutions are the ones that feel almost too obvious to try.",
                
                "Been lurking here for a while and this type of question always gets me thinking because it's something I struggled with for months before finding something that actually worked. The breakthrough for me was realizing that the problem wasn't technical at all but more about understanding what actually drives the decision versus what people say drives the decision. And once you start looking at it from that angle everything becomes way more clear about what needs to change and what's just noise."
            ]
            
            # Return a random fallback for now
            import random
            return random.choice(fallback_responses)
            
        except Exception as e:
            self.logger.error(f"Claude Code task call failed: {e}")
            return None
    
    def _build_contextual_response(self, analysis: Dict, opportunity: Dict) -> str:
        """Build a contextual response based on analysis"""
        
        # Start with a specific hook that shows you understand the exact situation
        response_parts = []
        
        # 1. Specific acknowledgment
        hook = self._create_specific_hook(analysis, opportunity)
        response_parts.append(hook)
        
        # 2. Credible insight
        insight = self._select_relevant_insight(analysis)
        response_parts.append(insight)
        
        # 3. Tactical advice
        tactical = self._provide_tactical_advice(analysis)
        response_parts.append(tactical)
        
        # 4. Business context specific addition
        if analysis['business_context']:
            context_advice = self._add_business_context(analysis['business_context'])
            response_parts.append(context_advice)
        
        # 5. Soft offer of more help (not promotional)
        closer = self._create_helpful_closer(analysis)
        response_parts.append(closer)
        
        return "\\n\\n".join(response_parts)
    
    def _create_specific_hook(self, analysis: Dict, opportunity: Dict) -> str:
        """Create a specific hook that shows understanding of their exact situation"""
        
        title = opportunity.get('title', '').lower()
        subreddit = opportunity.get('subreddit', '')
        
        # Create more natural, Reddit-style hooks based on actual content
        if analysis['primary_topic'] == 'creative_fatigue':
            if 'facebook' in title or 'fb' in title:
                return "Oof, Facebook creative fatigue is the worst. Been there."
            elif 'tiktok' in title:
                return "TikTok creative burnout hits different. I feel your pain."
            elif 'running out' in title or 'out of ideas' in title:
                return "The dreaded creative block - happens to the best of us."
            else:
                return "Creative fatigue is so real. Literally dealt with this last week."
        
        elif analysis['primary_topic'] == 'cac_rising':
            if any(word in title for word in ['50%', '40%', '30%', 'doubled', 'tripled']):
                return "Those CAC numbers are brutal. I've been there and it sucks."
            elif 'quarter' in title:
                return "Quarterly CAC spikes are the absolute worst."
            else:
                return "CAC creep is killing everyone right now, you're not alone."
        
        elif analysis['primary_topic'] == 'agency_issues':
            if 'weeks' in title or 'slow' in title:
                return "Agency speed issues drive me absolutely crazy."
            elif 'expensive' in title or 'cost' in title:
                return "Agency pricing vs results is such a frustrating equation."
            else:
                return "The agency struggle is real - been through this nightmare."
        
        # More casual, Reddit-native fallbacks
        reddit_hooks = [
            f"This hits home. Dealt with something similar in {analysis.get('business_context', 'my')} space.",
            f"Been lurking here a while and this type of post always gets me thinking.",
            f"Same boat here. This is such a common pain point.",
            "Ugh, this resonates. Had a similar situation recently."
        ]
        
        # Return a contextual hook based on business context or random
        if analysis.get('business_context'):
            return reddit_hooks[0]
        else:
            import random
            return random.choice(reddit_hooks[1:])
    
    def _select_relevant_insight(self, analysis: Dict) -> str:
        """Select the most relevant insight based on analysis"""
        
        topic = analysis['primary_topic']
        if topic and topic in self.insight_frameworks:
            insights = self.insight_frameworks[topic]['insights']
            
            # Select insight based on experience level
            if analysis['experience_level'] == 'beginner':
                return insights[0]  # More foundational insight
            elif analysis['experience_level'] == 'advanced':
                return insights[-1]  # More sophisticated insight
            else:
                return insights[1]  # Middle-level insight
        
        # Fallback insight
        return "After 10+ years in this space, I've learned that most marketing problems are actually creative problems in disguise."
    
    def _provide_tactical_advice(self, analysis: Dict) -> str:
        """Provide specific tactical advice"""
        
        topic = analysis['primary_topic']
        if topic and topic in self.insight_frameworks:
            tactical_options = self.insight_frameworks[topic]['tactical_advice']
            
            # Select 2-3 tactical pieces based on urgency and experience
            if analysis['urgency_level'] == 'high':
                advice = tactical_options[:2]  # Quick wins
            else:
                advice = tactical_options[1:3]  # More strategic
            
            if analysis['urgency_level'] == 'high':
                formatted_advice = "If I were you, I'd try:\\n\\n"
            else:
                formatted_advice = "A couple things that might help:\\n\\n"
                
            for item in advice:
                formatted_advice += f"• {item}\\n"
            
            return formatted_advice.rstrip()
        
        # Fallback tactical advice
        return "A couple things that might help:\\n\\n• Go check out what your competitors are doing creative-wise\\n• Focus on your hooks - that's usually where the biggest wins are"
    
    def _add_business_context(self, business_type: str) -> str:
        """Add business-specific context"""
        
        if business_type in self.business_contexts:
            insights = self.business_contexts[business_type]['specific_insights']
            return f"For {business_type.upper()} specifically: {insights[0]}"
        
        return ""
    
    def _create_helpful_closer(self, analysis: Dict) -> str:
        """Create a helpful closer that's not promotional"""
        
        reddit_closers = [
            "Hope this helps! Feel free to ask if you want me to elaborate on anything.",
            "Let me know if any of this resonates with your situation.",
            "Happy to go deeper on any of this stuff if it's useful.",
            "FWIW, this approach has worked well for me. Your mileage may vary obviously.",
            "Anyway, that's my 2 cents. Good luck with it!",
            "These are just some ideas based on what I've seen work. Hope it helps."
        ]
        
        if analysis['experience_level'] == 'beginner':
            return reddit_closers[0]  # More helpful/supportive
        elif analysis['urgency_level'] == 'high':
            return reddit_closers[4]  # Quick and encouraging
        else:
            import random
            return random.choice(reddit_closers[1:4])
    
    def _extract_specific_details(self, title: str) -> List[str]:
        """Extract specific details from title to reference"""
        
        details = []
        
        # Extract numbers/percentages
        numbers = re.findall(r'\\d+%?', title)
        details.extend(numbers)
        
        # Extract specific platforms mentioned
        platforms = ['facebook', 'google', 'tiktok', 'instagram', 'linkedin', 'youtube']
        mentioned_platforms = [p for p in platforms if p in title.lower()]
        details.extend(mentioned_platforms)
        
        # Extract specific metrics mentioned
        metrics = ['ctr', 'cpm', 'cpc', 'roas', 'ltv', 'cac']
        mentioned_metrics = [m.upper() for m in metrics if m in title.lower()]
        details.extend(mentioned_metrics)
        
        return details

# Example usage and testing
if __name__ == "__main__":
    generator = EnhancedResponseGenerator()
    
    # Test with various post types
    test_opportunities = [
        {
            'title': 'Facebook creative fatigue killing our SaaS performance - need fresh angles',
            'subreddit': 'marketing',
            'post_id': 'test1'
        },
        {
            'title': 'CAC increased 40% this quarter, need agency alternatives',
            'subreddit': 'entrepreneur', 
            'post_id': 'test2'
        },
        {
            'title': 'New to growth marketing - how to get started with creative testing?',
            'subreddit': 'startups',
            'post_id': 'test3'
        }
    ]
    
    print("🧪 Testing Enhanced Response Generator")
    print("=" * 50)
    
    for i, opportunity in enumerate(test_opportunities, 1):
        print(f"\\n--- Test {i}: {opportunity['title'][:50]}... ---")
        response = generator.generate_personalized_response(opportunity)
        if response:
            print(f"✅ Generated {len(response)} character response:")
            print(response[:200] + "..." if len(response) > 200 else response)
        else:
            print("❌ Failed to generate response")
        print("-" * 50)