# Strategic Ad Intelligence System - Issues Tracker

This file tracks all outstanding issues, bug fixes, and improvements needed across the Apsics Media landing page and strategic ad intelligence system.

## Status Legend
- 🔴 **High Priority** - Critical issues affecting user experience or conversions
- 🟡 **Medium Priority** - Important improvements for consistency and quality
- 🟢 **Low Priority** - Nice-to-have improvements and optimizations
- ✅ **Completed** - Resolved issues
- 🔄 **In Progress** - Currently being worked on
- ⏸️ **Blocked** - Waiting for external dependencies

---

## Outstanding Issues from plan.md

### Content & Terminology Issues

#### Issue #1: Template Terminology Consistency
- **Priority**: 🟡 Medium
- **Status**: ⏸️ Blocked  
- **Description**: Check all pages to make sure "hooks" is referred to as "templates"
- **Impact**: Brand consistency and user understanding
- **Files Affected**: All pages, components, and content
- **Assignee**: Content Team
- **Notes**: Requires comprehensive audit across entire site

#### Issue #2: Grammar and Spacing Accuracy
- **Priority**: 🟡 Medium
- **Status**: ⏸️ Blocked
- **Description**: Check for all grammar to be accurate including periods and spaces
- **Impact**: Professional appearance and credibility
- **Files Affected**: All content files
- **Assignee**: Content Team
- **Notes**: Need systematic review of all copy

### Visual & Design Issues

#### Issue #3: Hero Header Color Coordination
- **Priority**: 🟢 Low
- **Status**: ⏸️ Blocked
- **Description**: Change color of "campaign" in hero header to match "10+"
- **Impact**: Visual consistency
- **Files Affected**: `components/layout/hero.tsx`
- **Assignee**: Design Team
- **Notes**: Specific color matching needed

#### Issue #4: Social Media Button Removal
- **Priority**: 🟡 Medium  
- **Status**: ⏸️ Blocked
- **Description**: Remove X and LinkedIn buttons on all pages
- **Impact**: Simplified UI focused on core conversion actions
- **Files Affected**: All page components with social buttons
- **Assignee**: Frontend Team
- **Notes**: May affect footer, sharing components

#### Issue #5: Footer ICP Alignment
- **Priority**: 🟡 Medium
- **Status**: ⏸️ Blocked
- **Description**: Footer has not been updated to match new ICP and target audiences
- **Impact**: Brand consistency with startup focus
- **Files Affected**: `components/layout/footer.tsx`
- **Assignee**: Content + Frontend Team
- **Notes**: Update messaging for startup audience

### Content Section Removals

#### Issue #6: ✅ Proven Methodology Section Removal
- **Priority**: 🟡 Medium
- **Status**: ✅ Completed (2025-01-27)
- **Description**: Remove "Proven Methodology" section from homepage
- **Resolution**: Section removed in commit 3176121

#### Issue #7: ✅ Corporate Excellence Section Removal  
- **Priority**: 🟡 Medium
- **Status**: ✅ Completed (2025-01-27)
- **Description**: Remove "Corporate Excellence" section from homepage
- **Resolution**: Strategic resource library section removed

#### Issue #8: Free Video Reference Removal
- **Priority**: 🟡 Medium
- **Status**: ⏸️ Blocked
- **Description**: Remove "start with free video" since this is not offered
- **Impact**: Prevents user confusion about unavailable offerings
- **Files Affected**: Various CTA and promotional sections
- **Assignee**: Content Team

### Layout & User Experience Issues

#### Issue #9: ✅ Success Page Content After Service Tiers
- **Priority**: 🔴 High
- **Status**: ✅ Completed (2025-01-27)  
- **Description**: Remove 10 Free Hooks and Weekly plan mentions across the entire success page after the service tiers modal
- **Resolution**: Form flow optimized and success page streamlined

#### Issue #10: ✅ Free-Hooks Page Layout Fix
- **Priority**: 🔴 High
- **Status**: ✅ Completed (2025-01-27)
- **Description**: Fix copy above the hero - "copy paste template" and "downloaded by" badges were overlapping
- **Resolution**: Promotional badges now display vertically on separate rows

#### Issue #11: Content Section Repositioning
- **Priority**: 🟡 Medium
- **Status**: ⏸️ Blocked
- **Description**: Move "why creative is your campaigns make or break factor" to right below service tiers on homepage
- **Impact**: Better content hierarchy and flow
- **Files Affected**: `app/page.tsx`
- **Assignee**: Frontend Team

### Form & Technical Issues

#### Issue #12: ✅ Form API Standardization
- **Priority**: 🔴 High
- **Status**: ✅ Completed (2025-01-27)
- **Description**: Make sure any form API sending to Airtable uses the same form as the service tiers
- **Resolution**: All forms now use standardized 4-field structure

#### Issue #13: ✅ Service Tier Form Flow
- **Priority**: 🔴 High  
- **Status**: ✅ Completed (2025-01-27)
- **Description**: Remove "Start my free week" popup between clicking Claim Free Week and the actual form
- **Resolution**: Eliminated intermediate step, form shows immediately

---

## Newly Identified Issues

### Issue #14: Cross-Browser Testing
- **Priority**: 🟡 Medium
- **Status**: ⏸️ Blocked
- **Description**: Comprehensive testing needed across all major browsers
- **Impact**: Consistent user experience
- **Assignee**: QA Team
- **Notes**: Use Playwright MCP for automated testing

### Issue #15: Mobile Responsiveness Audit
- **Priority**: 🟡 Medium
- **Status**: ⏸️ Blocked
- **Description**: Full mobile responsiveness review needed
- **Impact**: Mobile user experience optimization
- **Assignee**: Frontend Team
- **Notes**: Focus on form flows and CTA buttons

### Issue #16: Performance Optimization
- **Priority**: 🟢 Low
- **Status**: ⏸️ Blocked
- **Description**: Core Web Vitals optimization needed
- **Impact**: SEO and user experience
- **Assignee**: Technical Team
- **Notes**: Image optimization, code splitting

---

## Completed Issues Log

### Recent Fixes (2025-01-27)
- ✅ **Issue #6**: Proven Methodology section removed
- ✅ **Issue #7**: Corporate Excellence section removed  
- ✅ **Issue #9**: Success page content cleaned up
- ✅ **Issue #10**: Free-hooks page layout fixed
- ✅ **Issue #12**: Form API standardized
- ✅ **Issue #13**: Service tier form flow optimized

### Previous Fixes (2025-01-26)
- ✅ Hero spacing improvements
- ✅ Mobile badge layout fixes
- ✅ Visual hierarchy enhancements

---

## Next Sprint Priorities

1. **Content Audit** (Issues #1, #2, #8)
2. **Social Button Removal** (Issue #4)
3. **Footer Updates** (Issue #5) 
4. **Content Repositioning** (Issue #11)
5. **Cross-Browser Testing** (Issue #14)

---

*Last Updated: 2025-01-27*
*Next Review: Weekly during sprint planning*