#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes webpack bundles to identify unused dependencies and optimization opportunities
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Analyze package.json for potential optimizations
function analyzePackageJson() {
  const packagePath = path.join(__dirname, '../package.json');
  
  if (!fs.existsSync(packagePath)) {
    log('red', '❌ package.json not found');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};
  
  log('blue', '\n📦 Package Analysis');
  log('white', '==================');
  
  // Check for commonly unused dependencies
  const potentiallyUnused = [
    'lodash',
    'moment', // Suggest date-fns instead
    'rxjs',
    'axios', // Suggest native fetch
    'request',
    'express',
    'body-parser'
  ];
  
  const heavy = [
    '@babel/core',
    '@babel/preset-env',
    'webpack',
    'webpack-dev-server'
  ];
  
  // Find potentially unused dependencies
  const unused = [];
  Object.keys(dependencies).forEach(dep => {
    if (potentiallyUnused.includes(dep)) {
      unused.push(dep);
    }
  });
  
  // Find heavy dependencies that might be optimizable
  const heavyDeps = [];
  Object.keys({ ...dependencies, ...devDependencies }).forEach(dep => {
    if (heavy.includes(dep)) {
      heavyDeps.push(dep);
    }
  });
  
  if (unused.length > 0) {
    log('yellow', '\n⚠️  Potentially Unused Dependencies:');
    unused.forEach(dep => {
      log('yellow', `   • ${dep}`);
    });
  }
  
  // Suggest optimizations
  log('green', '\n✅ Optimization Suggestions:');
  
  if (dependencies.moment) {
    log('white', '   • Replace moment with date-fns (smaller bundle)');
  }
  
  if (dependencies.lodash) {
    log('white', '   • Use lodash-es or individual imports to enable tree-shaking');
  }
  
  if (dependencies.axios) {
    log('white', '   • Consider native fetch for simpler use cases');
  }
  
  // Check for Next.js optimizations
  if (dependencies.next) {
    log('green', '\n🚀 Next.js Optimizations:');
    log('white', '   • Enable experimental.optimizePackageImports in next.config.js');
    log('white', '   • Use dynamic imports for heavy components');
    log('white', '   • Optimize images with next/image');
    log('white', '   • Use next/font for font optimization');
  }
}

// Analyze file imports to find usage patterns
function analyzeImports() {
  log('blue', '\n📁 Import Analysis');
  log('white', '==================');
  
  const srcDir = path.join(__dirname, '../');
  const importMap = new Map();
  
  function scanDirectory(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(filePath, extensions);
      } else if (extensions.some(ext => file.endsWith(ext))) {
        analyzeFile(filePath);
      }
    });
  }
  
  function analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = content.match(/import\s+.*?\s+from\s+['"][^'"]+['"]/g) || [];
      
      imports.forEach(importStatement => {
        const match = importStatement.match(/from\s+['"]([^'"]+)['"]/);
        if (match) {
          const moduleName = match[1];
          if (!moduleName.startsWith('.') && !moduleName.startsWith('/')) {
            // External dependency
            const count = importMap.get(moduleName) || 0;
            importMap.set(moduleName, count + 1);
          }
        }
      });
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  scanDirectory(srcDir);
  
  // Sort by usage count
  const sortedImports = Array.from(importMap.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20);
  
  if (sortedImports.length > 0) {
    log('white', 'Top imported packages:');
    sortedImports.forEach(([pkg, count]) => {
      const color = count > 10 ? 'green' : count > 5 ? 'yellow' : 'white';
      log(color, `   • ${pkg}: ${count} imports`);
    });
  }
}

// Generate optimization recommendations
function generateRecommendations() {
  log('blue', '\n💡 Performance Recommendations');
  log('white', '==============================');
  
  const recommendations = [
    {
      category: 'Bundle Splitting',
      items: [
        'Use dynamic imports for routes: const Page = dynamic(() => import("./Page"))',
        'Split vendor chunks in next.config.js',
        'Lazy load below-fold components',
        'Use React.lazy() for heavy components'
      ]
    },
    {
      category: 'Tree Shaking',
      items: [
        'Use named imports instead of default imports where possible',
        'Enable sideEffects: false in package.json',
        'Avoid importing entire libraries (import { specific } from "lib")',
        'Use babel-plugin-import for automatic tree shaking'
      ]
    },
    {
      category: 'Dependencies',
      items: [
        'Replace moment.js with date-fns (90% smaller)',
        'Use lodash-es instead of lodash for better tree shaking',
        'Consider replacing axios with native fetch',
        'Remove unused devDependencies from production builds'
      ]
    },
    {
      category: 'Next.js Specific',
      items: [
        'Enable experimental.optimizePackageImports in next.config.js',
        'Use next/image for automatic image optimization',
        'Implement ISR (Incremental Static Regeneration) where appropriate',
        'Use Next.js font optimization with next/font'
      ]
    }
  ];
  
  recommendations.forEach(({ category, items }) => {
    log('green', `\n${category}:`);
    items.forEach(item => {
      log('white', `   • ${item}`);
    });
  });
}

// Main execution
function main() {
  log('cyan', '🔍 Bundle Analysis Tool');
  log('cyan', '======================');
  
  analyzePackageJson();
  analyzeImports();
  generateRecommendations();
  
  log('green', '\n✅ Analysis complete!');
  log('white', 'Run "npm run analyze" to generate detailed bundle analysis.');
  log('white', 'Run "npm run optimize-images" to optimize images.');
}

if (require.main === module) {
  main();
}

module.exports = { analyzePackageJson, analyzeImports, generateRecommendations, main };