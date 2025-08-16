#!/usr/bin/env python3
"""
Test conversational Reddit responses
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from reddit_automation.enhanced_response_generator import EnhancedResponseGenerator
from reddit_automation.comment_responder import RedditCommentResponder

def test_conversational_responses():
    """Test the new conversational response system"""
    
    print("🧪 Testing Conversational Reddit Response System")
    print("=" * 60)
    
    # Test opportunities with different contexts
    test_opportunities = [
        {
            'title': 'Creative fatigue is killing our Facebook ads - what do you do?',
            'subreddit': 'marketing',
            'post_id': 'test1',
            'response_strategy': 'creative_fatigue_solution'
        },
        {
            'title': 'SaaS CAC rising - anyone else seeing this?',
            'subreddit': 'SaaS',
            'post_id': 'test2',
            'response_strategy': 'cac_optimization_advice'
        },
        {
            'title': 'Agency taking 3 weeks for creative concepts - is this normal?',
            'subreddit': 'entrepreneur',
            'post_id': 'test3',
            'response_strategy': 'agency_alternative'
        }
    ]
    
    try:
        # Initialize components
        generator = EnhancedResponseGenerator()
        
        # Test response generation
        for i, opportunity in enumerate(test_opportunities, 1):
            print(f"\\n--- Test {i}: {opportunity['title']} ---")
            print(f"Subreddit: r/{opportunity['subreddit']}")
            
            # Generate response
            response = generator.generate_personalized_response(opportunity)
            
            if response:
                print(f"✅ Generated response ({len(response)} chars):")
                print(f"Response: {response}")
                
                # Test value guidelines manually
                print(f"\\n📋 Value Guidelines Check:")
                print(f"   Length > 50 chars: {'✅' if len(response) > 50 else '❌'}")
                print(f"   No emojis: {'✅' if not any(emoji in response for emoji in ['🎯', '💡', '📊', '✅', '❌', '🚀', '💰']) else '❌'}")
                print(f"   No bullet points: {'✅' if not any(pattern in response for pattern in ['• ', '- ', '1. ', '2. ', '* ']) else '❌'}")
                print(f"   No direct sales: {'✅' if not any(phrase in response.lower() for phrase in ['dm me', 'contact me', 'hire me']) else '❌'}")
                print(f"   Conversational tone: {'✅' if any(word in response.lower() for word in ['honestly', 'actually', 'and ', 'but ']) else '⚠️'}")
                
            else:
                print("❌ Failed to generate response")
            
            print("-" * 60)
        
        print("\\n✅ Conversational response testing completed!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_conversational_responses()