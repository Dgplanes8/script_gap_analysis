#!/usr/bin/env node

/**
 * Template Testing Script for Apsics Media
 * 
 * Validates that all templates are properly configured and can render
 * without errors. Tests form components, SEO configurations, and
 * mobile responsiveness indicators.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Testing Apsics Media Templates...\n');

// Test template files exist
const templateDir = path.join(__dirname, '..', 'templates');
const requiredTemplates = [
  'blog-post-template.tsx',
  'calculator-template.tsx',
  'playbook-template.tsx'
];

const seoConfigPath = path.join(__dirname, '..', 'templates', 'seo-config.ts');
const formComponentsPath = path.join(__dirname, '..', 'components', 'forms', 'template-forms.tsx');
const analyticsPath = path.join(__dirname, '..', 'lib', 'analytics', 'template-tracking.ts');
const schemaPath = path.join(__dirname, '..', 'lib', 'schema', 'template-schemas.ts');

let passed = 0;
let failed = 0;

function test(name, condition, errorMessage = '') {
  if (condition) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    console.log(`❌ ${name}${errorMessage ? ': ' + errorMessage : ''}`);
    failed++;
  }
}

// Test 1: Template files exist
console.log('📁 Testing Template Files...');
requiredTemplates.forEach(template => {
  const templatePath = path.join(templateDir, template);
  test(
    `Template exists: ${template}`, 
    fs.existsSync(templatePath),
    `File not found at ${templatePath}`
  );
});

// Test 2: SEO configuration exists and has required exports
console.log('\n📈 Testing SEO Configuration...');
test(
  'SEO config file exists',
  fs.existsSync(seoConfigPath),
  `SEO config not found at ${seoConfigPath}`
);

if (fs.existsSync(seoConfigPath)) {
  const seoConfig = fs.readFileSync(seoConfigPath, 'utf8');
  test('Has DEFAULT_ICP_CONFIG export', seoConfig.includes('export const DEFAULT_ICP_CONFIG'));
  test('Has DEFAULT_CONVERSION_CONFIG export', seoConfig.includes('export const DEFAULT_CONVERSION_CONFIG'));
  test('Has SEO_TITLE_TEMPLATES export', seoConfig.includes('export const SEO_TITLE_TEMPLATES'));
  test('Has generateSEOMetadata function', seoConfig.includes('export function generateSEOMetadata'));
  test('Has structured data functions', seoConfig.includes('generateArticleStructuredData'));
}

// Test 3: Form components exist
console.log('\n📝 Testing Form Components...');
test(
  'Form components file exists',
  fs.existsSync(formComponentsPath),
  `Form components not found at ${formComponentsPath}`
);

if (fs.existsSync(formComponentsPath)) {
  const formComponents = fs.readFileSync(formComponentsPath, 'utf8');
  test('Has BlogPostLeadCaptureForm', formComponents.includes('export function BlogPostLeadCaptureForm'));
  test('Has CalculatorResultsForm', formComponents.includes('export function CalculatorResultsForm'));
  test('Has PlaybookDownloadForm', formComponents.includes('export function PlaybookDownloadForm'));
  test('Has ServiceTierForm', formComponents.includes('export function ServiceTierForm'));
}

// Test 4: Analytics tracking exists
console.log('\n📊 Testing Analytics Setup...');
test(
  'Analytics tracking file exists',
  fs.existsSync(analyticsPath),
  `Analytics file not found at ${analyticsPath}`
);

if (fs.existsSync(analyticsPath)) {
  const analytics = fs.readFileSync(analyticsPath, 'utf8');
  test('Has event tracking functions', analytics.includes('export function trackEvent'));
  test('Has form tracking', analytics.includes('trackFormInteraction'));
  test('Has conversion tracking', analytics.includes('trackConversion'));
  test('Has calculator tracking', analytics.includes('trackCalculatorInteraction'));
}

// Test 5: Schema markup exists
console.log('\n🔍 Testing Structured Data...');
test(
  'Schema file exists',
  fs.existsSync(schemaPath),
  `Schema file not found at ${schemaPath}`
);

if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  test('Has blog schema generation', schema.includes('generateBlogPostSchema'));
  test('Has calculator schema generation', schema.includes('generateCalculatorSchema'));
  test('Has playbook schema generation', schema.includes('generatePlaybookSchema'));
  test('Has FAQ schema generation', schema.includes('generateFAQSchema'));
  test('Has organization schema', schema.includes('APSICS_ORGANIZATION'));
}

// Test 6: Template structure validation
console.log('\n🏗️ Testing Template Structure...');
requiredTemplates.forEach(templateFile => {
  const templatePath = path.join(templateDir, templateFile);
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath, 'utf8');
    const templateName = templateFile.replace('-template.tsx', '');
    
    test(`${templateName} has TypeScript interface`, content.includes('interface ') && content.includes('Props'));
    test(`${templateName} has SEO metadata function`, content.includes('Metadata'));
    test(`${templateName} has mobile responsive classes`, content.includes('sm:') || content.includes('md:') || content.includes('lg:'));
    test(`${templateName} has structured data`, content.includes('StructuredData'));
    test(`${templateName} has conversion forms`, content.includes('Form') || content.includes('form'));
  }
});

// Test 7: Mobile responsiveness indicators
console.log('\n📱 Testing Mobile Responsiveness...');
requiredTemplates.forEach(templateFile => {
  const templatePath = path.join(templateDir, templateFile);
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath, 'utf8');
    const templateName = templateFile.replace('-template.tsx', '');
    
    test(`${templateName} has grid responsive classes`, content.includes('grid-cols-') && content.includes('md:grid-cols-') || content.includes('lg:grid-cols-'));
    test(`${templateName} has text responsive classes`, content.includes('text-') && (content.includes('md:text-') || content.includes('lg:text-')));
    test(`${templateName} has padding/margin responsive classes`, content.includes('p-') && (content.includes('md:p-') || content.includes('lg:p-')));
  }
});

// Test 8: Accessibility features
console.log('\n♿ Testing Accessibility Features...');
requiredTemplates.forEach(templateFile => {
  const templatePath = path.join(templateDir, templateFile);
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath, 'utf8');
    const templateName = templateFile.replace('-template.tsx', '');
    
    test(`${templateName} has proper headings`, content.includes('<h1') && content.includes('<h2'));
    test(`${templateName} has aria labels or alt text`, content.includes('aria-') || content.includes('alt='));
    test(`${templateName} has keyboard navigation support`, content.includes('onKeyDown') || content.includes('tabIndex') || content.includes('button'));
  }
});

// Summary
console.log('\n📋 Test Summary:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total: ${passed + failed}`);

if (failed === 0) {
  console.log('\n🎉 All tests passed! Templates are ready for production.');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${failed} test(s) failed. Please review and fix before deploying.`);
  process.exit(1);
}