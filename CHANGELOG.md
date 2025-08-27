# Strategic Ad Intelligence System - Changelog

All notable changes to the Apsics Media landing page and strategic ad intelligence system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Todo
- Grammar and spacing consistency across all pages
- Color coordination in hero header ("campaign" to match "10+")
- Footer updates for startup ICP alignment
- Form standardization across all remaining pages
- Social media button removal (X and LinkedIn)
- Template terminology consistency (hooks → templates)

## [1.4.0] - 2025-01-27

### Fixed
- **Homepage Layout**: Removed strategic resource library section for cleaner homepage layout
- **Service Tier Forms**: Eliminated unnecessary intermediate step in form flow
- **Free-Hooks Page**: Fixed promotional badges layout to display vertically on separate rows instead of overlapping
- **Form Components**: SimpleAirtableForm now shows form immediately instead of requiring button click first
- **Service Tier Integration**: Service tier buttons now properly pass tier name for form pre-population

### Changed
- **SimpleAirtableForm Component**: Updated initial state to `showForm: true` by default
- **ServiceTiers Component**: Enhanced to pass `tier.name` instead of `tier.id` for better form context
- **Modal System**: Streamlined signup flow to reduce user friction

### Technical
- Improved form validation and error handling
- Enhanced mobile responsiveness for badge layouts
- Optimized component state management for better UX

## [1.3.0] - 2025-01-26

### Added
- Free-hooks page hero spacing and layout improvements
- Enhanced promotional badge design with better contrast

### Fixed
- Mobile responsiveness issues on free-hooks page
- Visual hierarchy improvements for better user experience

## [1.2.0] - 2025-01-25

### Added
- Complete website improvements per strategic plan
- Startup ICP alignment across all pages
- Standardized Airtable forms to 4-field structure

### Changed
- Updated service tier descriptions for startup audience
- Enhanced form validation and user experience
- Improved conversion tracking and analytics

## [1.1.0] - 2025-01-24

### Added
- Landing page optimization for startup teams
- Conversion psychology improvements
- Free-hooks page optimization for startup audience

### Changed
- Updated messaging to focus on early-stage startups
- Enhanced call-to-action buttons and forms
- Improved visual design for startup appeal

## [1.0.0] - 2025-01-23

### Added
- Initial comprehensive landing page optimization
- Service tier structure implementation
- Strategic ad intelligence system foundation
- Next.js 14 with TypeScript implementation
- Tailwind CSS styling system
- Airtable API integration for lead capture
- Analytics and conversion tracking setup

### Technical
- Next.js 14 App Router implementation
- TypeScript strict mode configuration
- ESLint and Prettier code formatting
- Jest testing framework setup
- Playwright MCP integration for UI testing
- Vercel deployment pipeline

---

## Legend

### Types of Changes
- **Added** for new features
- **Changed** for changes in existing functionality  
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes
- **Technical** for technical improvements and optimizations

### Commit Reference Format
Each entry includes the relevant commit hash for detailed change tracking.

### Priority Levels
- 🔴 **Critical**: Security fixes, major bugs affecting user experience
- 🟡 **High**: Feature additions, significant improvements
- 🟢 **Medium**: Minor fixes, optimizations
- ⚪ **Low**: Documentation, code cleanup

---

*For detailed commit history, see the Git log or GitHub repository.*