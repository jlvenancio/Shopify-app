# Changelog

All notable changes to CartPro will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- A/B testing for upsell strategies
- Advanced analytics dashboard
- Multi-language support
- Integration with email marketing platforms
- Product variant selector in cart
- Gift wrapping options
- Order notes

## [1.0.0] - 2024-10-23

### Added - Initial Release

#### Core Features
- Sliding cart drawer (left/right position)
- Fully customizable design (colors, width, styling)
- Real-time cart updates
- Add/remove items directly in drawer
- Quantity adjustment
- Empty cart state

#### Upsell System
- Smart product recommendations
- Configurable max products to show
- One-click add to cart from upsells
- Custom section title
- Grid layout for upsell products

#### Free Shipping Bar
- Visual progress bar
- Configurable threshold
- Dynamic messaging
- Motivational copy
- Animated progress updates

#### Countdown Timer
- Creates urgency for purchases
- Configurable duration
- Custom message
- Auto-reset functionality
- Visual countdown display

#### Admin Dashboard
- Analytics overview
- Cart views tracking
- Conversion metrics
- Revenue attribution
- Settings management

#### Settings Page
- Design customization
  - Drawer position (left/right)
  - Drawer width (300-600px)
  - Color picker for all elements
  - Text color configuration
- Free shipping configuration
  - Enable/disable toggle
  - Threshold amount
  - Custom messaging
- Upsell settings
  - Enable/disable toggle
  - Custom title
  - Max products slider
- Timer settings
  - Enable/disable toggle
  - Duration in seconds
  - Custom message

#### Theme App Extension
- Liquid block for cart drawer
- Vanilla JavaScript implementation
- CSS with smooth animations
- No jQuery dependency
- Lightweight and fast
- Mobile responsive

#### Technical
- Remix + React framework
- Shopify Polaris UI components
- Prisma ORM with SQLite (dev)
- Session-based authentication
- Webhook handlers
  - APP_UNINSTALLED
  - SHOP_UPDATE
- RESTful API architecture
- TypeScript support
- ESLint configuration

#### Developer Experience
- Comprehensive README
- Quick start guide
- Project planning documentation
- Environment variable examples
- Database schema with migrations
- Git ignore configuration
- NPM scripts for common tasks

### Security
- OAuth 2.0 authentication
- Secure session storage
- Environment variable protection
- HTTPS enforcement ready

### Performance
- Optimized cart API calls
- Debounced quantity updates
- Lazy loading for upsells
- Minimal bundle size
- Efficient database queries

## Version History

### [1.0.0] - 2024-10-23
- Initial MVP release
- Core cart drawer functionality
- Upsells and free shipping bar
- Admin dashboard and settings
- Theme app extension

---

## Release Notes Format

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements
