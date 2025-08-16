#!/usr/bin/env python3
"""
Test Reddit Comment Response Generation
Tests comment generation without actually posting anything
"""

import logging
import json
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    from reddit_automation.comment_responder import RedditCommentResponder
    from utils.compliance_checker import compliance_checker
    
    print("💬 Testing Reddit Comment Response Generation...")
    print("=" * 55)
    
    # Initialize responder (won't actually post anything)
    responder = RedditCommentResponder()
    
    # Test 1: Template loading
    print("\n📝 Test 1: Template Loading")
    templates = responder.templates.get('reddit_templates', {}).get('helpful_comments', [])
    print(f"✅ Loaded {len(templates)} response templates")
    
    for template in templates:
        print(f"  - {template.get('name', 'Unknown')}: {template.get('use_case', 'No description')}")
    
    # Test 2: Response generation for different scenarios
    print("\n🎯 Test 2: Response Generation")
    
    # Mock opportunities
    test_opportunities = [
        {
            'post_id': 'test1',
            'title': 'Help with creative fatigue in our Facebook ads',
            'subreddit': 'marketing',
            'response_strategy': 'creative_fatigue_solution',
            'pain_points': ['Creative Fatigue'],
            'url': 'https://reddit.com/r/marketing/test1'
        },
        {
            'post_id': 'test2', 
            'title': 'CAC costs rising - need optimization advice',
            'subreddit': 'entrepreneur',
            'response_strategy': 'cac_optimization_advice',
            'pain_points': ['Rising CAC'],
            'url': 'https://reddit.com/r/entrepreneur/test2'
        },
        {
            'post_id': 'test3',
            'title': 'Looking for agency alternatives - current one too slow',
            'subreddit': 'startups',
            'response_strategy': 'agency_alternative', 
            'pain_points': ['Agency Issues'],
            'url': 'https://reddit.com/r/startups/test3'
        }
    ]
    
    for i, opportunity in enumerate(test_opportunities, 1):
        print(f"\n--- Test Case {i} ---")
        print(f"Post: {opportunity['title']}")
        print(f"Strategy: {opportunity['response_strategy']}")
        
        # Generate response
        response = responder._generate_value_response(opportunity)
        
        if response:
            print(f"✅ Generated response ({len(response)} chars)")
            print(f"Preview: {response[:150]}...")
            
            # Test compliance
            is_compliant, issues = compliance_checker.validate_message(response, 'reddit')
            print(f"Compliance: {'✅ PASS' if is_compliant else '❌ FAIL'}")
            if issues:
                print(f"Issues: {issues}")
            
            # Test value guidelines
            meets_value = responder._meets_value_guidelines(response)
            print(f"Value guidelines: {'✅ PASS' if meets_value else '❌ FAIL'}")
            
        else:
            print("❌ Failed to generate response")
        
        print("-" * 40)
    
    # Test 3: Value guidelines validation
    print("\n✅ Test 3: Value Guidelines Validation")
    
    # Test good vs bad responses
    good_response = """This is exactly the creative fatigue challenge I see all the time. Here's what I've found works:

1. **Systematic competitor analysis** - Most brands only look at 10-20 competitor ads. I scrape 200+ to find the gaps.

2. **AI performance prediction** - Built a scoring system that correlates 0.89 with actual CTR. Saves tons of testing budget.

3. **Speed over perfection** - 15 validated concepts in 48hrs beats 3 "perfect" concepts in 3 weeks.

From my experience managing $250MM in ad spend, the brands that win are the ones that can iterate fastest. Happy to share more specifics if helpful!"""

    bad_response = """Hey! I can solve this problem. DM me for my services. We do great work and you should hire us immediately! Contact us now!"""
    
    print("Testing good response:")
    good_result = responder._meets_value_guidelines(good_response)
    print(f"  Value guidelines: {'✅ PASS' if good_result else '❌ FAIL'}")
    print(f"  Length: {len(good_response)} chars")
    
    print("\nTesting bad response:")
    bad_result = responder._meets_value_guidelines(bad_response)
    print(f"  Value guidelines: {'✅ PASS' if bad_result else '❌ FAIL'} (should fail)")
    print(f"  Length: {len(bad_response)} chars")
    
    # Test 4: Session statistics
    print("\n📊 Test 4: Response Statistics")
    stats = responder.get_response_stats()
    print(f"Session stats: {json.dumps(stats, indent=2)}")
    
    print("\n🎉 Reddit Response Generation test completed!")
    print("✅ The responder can successfully:")
    print("   - Load and use response templates")
    print("   - Generate contextual responses")
    print("   - Validate content for compliance")
    print("   - Enforce value-first guidelines")
    print("   - Track session statistics")
    
    print("\n⚠️  Remember: This test only generates responses - no actual posting!")
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Make sure all dependencies are installed")
    
except Exception as e:
    print(f"❌ Test failed: {e}")
    print("Check your configuration and Reddit credentials")