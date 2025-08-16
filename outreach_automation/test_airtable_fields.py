#!/usr/bin/env python3
"""
Test Airtable Fields
Check what fields are available in the Pending Posts table
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_airtable_fields():
    """Check available fields in Pending Posts table"""
    
    print("🔍 Checking Airtable Pending Posts Fields")
    print("=" * 45)
    
    try:
        from airtable_manager import AirtableManager
        airtable = AirtableManager()
        
        # Try to get one record to see field structure
        try:
            records = airtable.pending_posts_table.all(max_records=1)
            
            if records:
                print("✅ Found existing record, analyzing fields:")
                fields = records[0]['fields']
                print("\\nAvailable fields:")
                for field_name in sorted(fields.keys()):
                    print(f"   • {field_name}")
            else:
                print("No existing records found")
                
                # Try to create a minimal test record to see what's required
                print("\\n🔄 Testing minimal record creation...")
                test_data = {
                    'Post Title': 'Test Field Mapping',
                    'Status': 'Test'
                }
                
                try:
                    record = airtable.pending_posts_table.create(test_data)
                    print(f"✅ Created test record: {record['id']}")
                    
                    # Get the record back to see all fields
                    full_record = airtable.pending_posts_table.get(record['id'])
                    print("\\nRecord fields:")
                    for field_name in sorted(full_record['fields'].keys()):
                        print(f"   • {field_name}: {full_record['fields'][field_name]}")
                    
                    # Clean up test record
                    airtable.pending_posts_table.delete(record['id'])
                    print("\\n🧹 Cleaned up test record")
                    
                except Exception as e:
                    print(f"❌ Test record creation failed: {e}")
                    print("\\nThis tells us about required fields and field names")
                
        except Exception as e:
            print(f"❌ Error accessing table: {e}")
            
            # Let's try to inspect the table schema
            print("\\n🔄 Trying alternative approach...")
            try:
                # Just try basic operations to understand the table
                print("Table exists, but may be empty or have different field names")
                print("\\nSuggested field mapping based on error:")
                print("   ❌ 'Response Length' - not found")
                print("   ✅ Try: 'Length', 'Characters', or 'Response_Length'")
                
            except Exception as e2:
                print(f"❌ Alternative approach failed: {e2}")
        
    except Exception as e:
        print(f"❌ Could not connect to Airtable: {e}")
        
    print("\\n📋 Recommended Actions:")
    print("   1. Check Airtable base manually for actual field names")
    print("   2. Update field mapping in comment_responder.py")
    print("   3. Ensure Pending Posts table has correct schema")

if __name__ == "__main__":
    test_airtable_fields()