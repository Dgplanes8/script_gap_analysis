#!/usr/bin/env python3
import base64
from PIL import Image, ImageDraw, ImageFont
import io
import os

def create_favicon_png(size, filename):
    # Create a new image with orange background
    img = Image.new('RGBA', (size, size), color=(234, 88, 12, 255))  # Orange color #EA580C
    draw = ImageDraw.Draw(img)
    
    # Add rounded corners
    corner_radius = max(1, size // 5)
    
    # Create a mask for rounded corners
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (size, size)], corner_radius, fill=255)
    
    # Apply the mask
    img.putalpha(mask)
    
    # Add white "A" text
    try:
        # Try to use a system font
        font_size = max(int(size * 0.6), 8)
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), "A", font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center the text
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - 2  # Slight adjustment for better centering
    
    draw.text((x, y), "A", fill=(255, 255, 255, 255), font=font)
    
    # Save the image
    img.save(f'public/{filename}', 'PNG')
    print(f"✅ Created {filename} ({size}x{size})")

# Create all required favicon sizes
os.makedirs('public', exist_ok=True)

create_favicon_png(16, 'favicon-16x16.png')
create_favicon_png(32, 'favicon-32x32.png')
create_favicon_png(180, 'apple-touch-icon.png')
create_favicon_png(192, 'android-chrome-192x192.png') 
create_favicon_png(512, 'android-chrome-512x512.png')

print("\n🎉 All PNG favicon files created successfully!")