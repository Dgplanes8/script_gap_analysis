# Testing Procedures - Strategic Ad Intelligence System

This document outlines comprehensive testing procedures for the Apsics Media landing page, including Playwright MCP workflows, manual testing checklists, and quality assurance protocols.

## Table of Contents

- [Playwright MCP Testing Workflows](#playwright-mcp-testing-workflows)
- [Manual Testing Checklists](#manual-testing-checklists)
- [Form Testing Procedures](#form-testing-procedures)
- [Cross-Browser Compatibility](#cross-browser-compatibility)
- [Performance Testing](#performance-testing)
- [Accessibility Testing](#accessibility-testing)

---

## Playwright MCP Testing Workflows

### Setup and Navigation

**Initialize Browser Session**:
```bash
# Navigate to live site
mcp__playwright__browser_navigate https://apsicsmedia.com

# Resize browser for responsive testing
mcp__playwright__browser_resize 1920 1080  # Desktop
mcp__playwright__browser_resize 768 1024   # Tablet  
mcp__playwright__browser_resize 375 667    # Mobile
```

**Take Reference Screenshots**:
```bash
# Full page screenshot
mcp__playwright__browser_take_screenshot --filename="homepage-full.png" --fullPage=true

# Viewport screenshot
mcp__playwright__browser_take_screenshot --filename="homepage-viewport.png"

# Element-specific screenshot
mcp__playwright__browser_take_screenshot --element="Service Tier Cards" --ref="[service-tiers-grid]"
```

### Service Tier Form Flow Testing

**Test Complete Service Tier Flow**:

1. **Navigate to Service Tiers**:
   ```javascript
   // Scroll to service tiers section
   mcp__playwright__browser_evaluate "() => {
     document.getElementById('service-tiers').scrollIntoView({ behavior: 'smooth' });
   }"
   ```

2. **Test Tier Selection**:
   ```bash
   # Click on "Claim Free Week" button for Trend Tracker tier
   mcp__playwright__browser_click --element="Trend Tracker Claim Free Week button" --ref="[tier-button-trend-tracker]"
   ```

3. **Verify Form Display**:
   ```bash
   # Take screenshot of modal with form
   mcp__playwright__browser_take_screenshot --filename="service-tier-form-modal.png"
   ```

4. **Test Form Submission**:
   ```bash
   # Fill out the 4-field form
   mcp__playwright__browser_fill_form --fields='[
     {"name": "Full Name", "type": "textbox", "ref": "[name-input]", "value": "John Doe"},
     {"name": "Email", "type": "textbox", "ref": "[email-input]", "value": "john@test.com"},
     {"name": "Company", "type": "textbox", "ref": "[company-input]", "value": "Test Corp"},
     {"name": "Package Interest", "type": "combobox", "ref": "[package-select]", "value": "Trend Tracker"}
   ]'
   ```

5. **Verify Form Pre-population**:
   ```javascript
   // Check that Package Interest is pre-populated correctly
   mcp__playwright__browser_evaluate "() => {
     const select = document.querySelector('[name=\"packageInterest\"]');
     return select ? select.value : 'Not found';
   }"
   ```

### Free-Hooks Page Testing

**Test Free-Hooks Page Layout**:

1. **Navigate to Free-Hooks**:
   ```bash
   mcp__playwright__browser_navigate https://apsicsmedia.com/free-hooks
   ```

2. **Verify Badge Layout**:
   ```bash
   # Take screenshot of hero section
   mcp__playwright__browser_take_screenshot --element="Free Hooks Hero" --filename="free-hooks-hero.png"
   ```

3. **Check Badge Separation**:
   ```javascript
   // Verify badges are displayed vertically
   mcp__playwright__browser_evaluate "() => {
     const badges = document.querySelectorAll('.flex.flex-col .inline-flex');
     return badges.length > 0 ? 'Badges properly separated' : 'Badge layout issue';
   }"
   ```

### Email Capture Form Testing

**Test Email Capture Flow**:

1. **Fill Email Form**:
   ```bash
   mcp__playwright__browser_type --element="Email input field" --ref="[email-capture-input]" --text="test@example.com"
   ```

2. **Submit Form**:
   ```bash
   mcp__playwright__browser_click --element="Download Templates button" --ref="[download-button]"
   ```

3. **Verify Success State**:
   ```bash
   # Wait for success message or redirect
   mcp__playwright__browser_wait_for --text="Thank you"
   ```

---

## Manual Testing Checklists

### Pre-Deployment Checklist

**Technical Validation**:
- [ ] `npm run type-check` passes without errors
- [ ] `npm run lint` passes without warnings
- [ ] `npm run test` passes all test suites
- [ ] `npm run build` completes successfully
- [ ] No console errors in development mode

**Functional Testing**:
- [ ] Homepage loads within 3 seconds
- [ ] All navigation links work correctly
- [ ] Service tier cards display properly
- [ ] Form submissions work end-to-end
- [ ] Modal open/close functionality works
- [ ] Mobile menu toggles correctly

### Post-Deployment Checklist

**Live Site Validation**:
- [ ] Homepage loads correctly at apsicsmedia.com
- [ ] All forms submit successfully to Airtable
- [ ] No JavaScript console errors
- [ ] Images load and display properly
- [ ] External links open correctly
- [ ] Analytics tracking fires correctly

**User Experience Testing**:
- [ ] Service tier selection → form flow works seamlessly
- [ ] Form pre-population works for all tiers
- [ ] Success page displays after form submission
- [ ] Mobile experience is smooth and functional
- [ ] Page load times meet performance targets

### Cross-Page Testing

**Navigation Testing**:
- [ ] Header navigation works from all pages
- [ ] Footer links function correctly
- [ ] Breadcrumb navigation (where applicable)
- [ ] Back button functionality preserved
- [ ] Deep linking works for all pages

**Content Consistency**:
- [ ] Service tier information matches across pages
- [ ] Pricing consistency maintained
- [ ] Contact information is accurate
- [ ] Brand messaging is consistent
- [ ] Call-to-action buttons use consistent text

---

## Form Testing Procedures

### Service Tier Form Validation

**Required Field Testing**:
```bash
# Test empty form submission
1. Open service tier modal
2. Click "Start FREE Week Trial" without filling fields
3. Verify error messages appear
4. Ensure form doesn't submit
```

**Field Validation Testing**:
```bash
# Test email format validation
1. Enter invalid email format (e.g., "notanemail")
2. Attempt to submit form
3. Verify email validation error appears
4. Enter valid email and verify error clears
```

**Pre-population Testing**:
```bash
# Test tier pre-population
1. Click "Claim Free Week" on Creative Starter tier
2. Verify "Package Interest" dropdown shows "Creative Starter"
3. Repeat for each tier
4. Ensure correct tier name appears in dropdown
```

### Airtable Integration Testing

**Data Submission Verification**:
1. Submit test form with unique identifier
2. Check Airtable base for new record
3. Verify all 4 fields populate correctly:
   - Name
   - Email  
   - Company
   - Package Interest
4. Confirm source tracking is recorded
5. Check timestamp accuracy

**Error Handling Testing**:
1. Simulate Airtable API failure
2. Verify error message displays to user
3. Ensure form doesn't appear to submit successfully
4. Test retry functionality if available

---

## Cross-Browser Compatibility

### Browser Testing Matrix

**Desktop Browsers**:
- [ ] Chrome (latest + previous version)
- [ ] Firefox (latest + previous version)
- [ ] Safari (latest + previous version)  
- [ ] Edge (latest version)

**Mobile Browsers**:
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)
- [ ] Samsung Internet
- [ ] Firefox Mobile

**Testing Focus Areas**:
- [ ] CSS Grid layout compatibility
- [ ] Flexbox behavior consistency
- [ ] Form input styling and functionality
- [ ] Modal display and interaction
- [ ] Touch interactions on mobile
- [ ] Scroll behavior and smoothness

### Playwright Cross-Browser Testing

```bash
# Test in different browsers using Playwright
# Chrome (default)
mcp__playwright__browser_navigate https://apsicsmedia.com

# Firefox
mcp__playwright__browser_install firefox
mcp__playwright__browser_navigate https://apsicsmedia.com

# Safari (macOS only)
mcp__playwright__browser_install webkit
mcp__playwright__browser_navigate https://apsicsmedia.com
```

---

## Performance Testing

### Core Web Vitals Testing

**Lighthouse Audit**:
```bash
# Run Lighthouse performance audit
lighthouse https://apsicsmedia.com --chrome-flags="--headless" --output=json --output-path=./lighthouse-report.json

# Target metrics:
# LCP: < 2.5s
# FID: < 100ms
# CLS: < 0.1
# Performance Score: > 90
```

**Load Testing Scenarios**:
1. **Cold Start Performance**:
   - Clear browser cache
   - Navigate to homepage
   - Measure time to first contentful paint

2. **Form Interaction Performance**:
   - Measure time from button click to modal open
   - Test form submission response time
   - Monitor API response times

3. **Mobile Performance**:
   - Test on slower 3G connections
   - Verify touch response times
   - Check scroll performance

### Performance Monitoring

**Real User Monitoring**:
- Vercel Analytics integration
- Core Web Vitals tracking
- User interaction monitoring
- Form completion rate tracking

**Automated Performance Testing**:
```bash
# Regular performance checks
npm run performance-audit  # Custom script if available
npm run lighthouse-ci      # Lighthouse CI integration
```

---

## Accessibility Testing

### Keyboard Navigation Testing

**Navigation Flow**:
1. Use only keyboard (no mouse)
2. Tab through all interactive elements
3. Verify focus indicators are visible
4. Test escape key functionality for modals
5. Ensure all content is reachable

**Screen Reader Testing**:
1. Test with NVDA (Windows) or VoiceOver (macOS)
2. Verify all content is announced correctly
3. Check form labels and error messages
4. Test heading structure and navigation
5. Verify alt text for images

### WCAG Compliance Checklist

**Level A Requirements**:
- [ ] Images have alt text
- [ ] Form fields have labels
- [ ] Headings are properly structured
- [ ] Color contrast meets minimum requirements
- [ ] Content is keyboard accessible

**Level AA Requirements**:
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] Text can be resized up to 200% without loss of functionality
- [ ] Focus indicators are clearly visible
- [ ] Error messages are descriptive and helpful

### Automated Accessibility Testing

```javascript
// Use axe-core for accessibility testing
mcp__playwright__browser_evaluate "() => {
  return new Promise((resolve) => {
    axe.run(document, (err, results) => {
      resolve(results.violations.length === 0 ? 'No violations found' : results.violations);
    });
  });
}"
```

---

## Testing Automation

### Playwright Test Scripts

**Create Reusable Test Functions**:
```javascript
// Service tier form test
async function testServiceTierForm(tierName) {
  await browser.click(`[data-tier="${tierName}"] button`);
  await browser.waitForSelector('[data-testid="tier-form-modal"]');
  await browser.fill('[name="name"]', 'Test User');
  await browser.fill('[name="email"]', 'test@example.com');
  await browser.fill('[name="company"]', 'Test Company');
  await browser.selectOption('[name="packageInterest"]', tierName);
  await browser.click('[type="submit"]');
  await browser.waitForURL('**/success**');
}
```

**Scheduled Testing**:
- Daily smoke tests on production
- Weekly full regression testing
- Performance monitoring alerts
- Form submission monitoring

---

## Quality Assurance Protocols

### Bug Report Template

**Issue Description**:
- Summary of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Screenshots or screen recordings

**Priority Classification**:
- **P1**: Site down, forms broken, major functionality failure
- **P2**: Important features not working, poor user experience
- **P3**: Minor issues, cosmetic problems, edge cases
- **P4**: Nice-to-have improvements, low-impact issues

### Test Result Documentation

**Test Execution Report**:
- Test date and environment
- Test cases executed
- Pass/fail status
- Issues discovered
- Performance metrics
- Recommendations for next sprint

---

*Last Updated: 2025-01-27*
*Next Review: When new features are added or testing procedures need updates*