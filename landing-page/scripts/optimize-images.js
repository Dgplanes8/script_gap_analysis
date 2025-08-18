#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP/AVIF and generates responsive sizes
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Responsive breakpoints
const SIZES = [
  { width: 640, suffix: '-sm' },
  { width: 828, suffix: '-md' },
  { width: 1200, suffix: '-lg' },
  { width: 1920, suffix: '-xl' },
];

// Supported input formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

async function optimizeImage(inputPath, filename) {
  const name = path.parse(filename).name;
  const outputPath = path.join(OUTPUT_DIR, name);
  
  console.log(`Optimizing: ${filename}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate WebP versions at different sizes
    for (const size of SIZES) {
      if (size.width <= metadata.width) {
        // WebP version
        await image
          .resize(size.width, null, { withoutEnlargement: true })
          .webp({ quality: 85, effort: 6 })
          .toFile(`${outputPath}${size.suffix}.webp`);
        
        // AVIF version (smaller but slower to encode)
        await image
          .resize(size.width, null, { withoutEnlargement: true })
          .avif({ quality: 70, effort: 9 })
          .toFile(`${outputPath}${size.suffix}.avif`);
          
        console.log(`  ✓ Generated ${name}${size.suffix}.webp and .avif`);
      }
    }
    
    // Generate original size WebP/AVIF
    await image
      .webp({ quality: 85, effort: 6 })
      .toFile(`${outputPath}.webp`);
      
    await image
      .avif({ quality: 70, effort: 9 })
      .toFile(`${outputPath}.avif`);
      
    console.log(`  ✓ Generated original size WebP and AVIF`);
    
    // Optimize original format
    if (path.extname(filename).toLowerCase() === '.jpg' || path.extname(filename).toLowerCase() === '.jpeg') {
      await image
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(OUTPUT_DIR, `${name}.jpg`));
    } else if (path.extname(filename).toLowerCase() === '.png') {
      await image
        .png({ quality: 85, progressive: true, compressionLevel: 9 })
        .toFile(path.join(OUTPUT_DIR, `${name}.png`));
    }
    
  } catch (error) {
    console.error(`  ✗ Error optimizing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}\n`);
  }
  
  // Read input directory
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Input directory does not exist: ${INPUT_DIR}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
  );
  
  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }
  
  console.log(`Found ${imageFiles.length} images to optimize:\n`);
  
  // Process each image
  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    await optimizeImage(inputPath, file);
    console.log('');
  }
  
  console.log('✅ Image optimization complete!\n');
  
  // Generate srcset helper
  generateSrcSetHelper(imageFiles);
}

function generateSrcSetHelper(imageFiles) {
  const helperContent = `// Auto-generated image optimization helper
// Run 'npm run optimize-images' to regenerate

export interface OptimizedImage {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
}

export function getOptimizedImage(imageName: string, alt: string): OptimizedImage {
  const basePath = '/images/optimized';
  const name = imageName.replace(/\\.[^/.]+$/, ''); // Remove extension
  
  const srcSet = [
    \`\${basePath}/\${name}-sm.webp 640w\`,
    \`\${basePath}/\${name}-md.webp 828w\`,
    \`\${basePath}/\${name}-lg.webp 1200w\`,
    \`\${basePath}/\${name}-xl.webp 1920w\`
  ].join(', ');
  
  return {
    src: \`\${basePath}/\${name}-lg.webp\`,
    srcSet,
    sizes: '(max-width: 640px) 640px, (max-width: 828px) 828px, (max-width: 1200px) 1200px, 1920px',
    width: 1200,
    height: 600, // Adjust based on your images
  };
}

// Available optimized images
export const OPTIMIZED_IMAGES = [
${imageFiles.map(file => `  '${path.parse(file).name}'`).join(',\n')}
];
`;

  const helperPath = path.join(__dirname, '../lib/image-optimization.ts');
  fs.writeFileSync(helperPath, helperContent);
  console.log(`📝 Generated image helper: ${helperPath}`);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, main };