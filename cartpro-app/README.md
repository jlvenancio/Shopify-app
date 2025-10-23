# 🛒 CartPro - Advanced Shopify Cart Drawer

A powerful Shopify app that replaces the default cart with a beautiful sliding drawer featuring upsells, countdown timers, and free shipping progress bars.

## 🌟 Features

- ✅ **Slide Cart Drawer** - Beautiful animated cart that slides in from left or right
- 🎨 **Fully Customizable** - Colors, position, width, and more
- 💰 **Smart Upsells** - Recommend products to increase Average Order Value
- 📊 **Free Shipping Bar** - Visual progress bar to encourage higher cart values
- ⏱️ **Countdown Timer** - Create urgency with customizable countdown
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- ⚡ **Lightning Fast** - Optimized for performance
- 📈 **Analytics Dashboard** - Track conversions and revenue
- 🎯 **Easy Installation** - No coding required for merchants

## 🏗️ Tech Stack

- **Frontend (Admin)**: React + Remix + Shopify Polaris
- **Backend**: Node.js + Shopify API
- **Database**: Prisma + SQLite (dev) / PostgreSQL (prod)
- **Storefront**: Theme App Extension (Liquid + Vanilla JS)

## 📋 Prerequisites

Before you begin, ensure you have:

- [Node.js](https://nodejs.org/) v18+ installed
- A [Shopify Partners](https://partners.shopify.com/) account
- A Shopify development store
- Basic knowledge of JavaScript and React

## 🚀 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd cartpro-app
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` and add your credentials:

\`\`\`env
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SHOPIFY_APP_URL=https://your-ngrok-url.ngrok.io
SHOPIFY_SCOPES=write_products,read_orders,write_cart_transforms,read_customers,write_discounts
DATABASE_URL="file:./dev.db"
SESSION_SECRET=your_random_secret_here
\`\`\`

### 4. Generate Session Secret

\`\`\`bash
openssl rand -base64 32
\`\`\`

Copy the output and use it as your \`SESSION_SECRET\`.

### 5. Set Up Database

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 6. Create App in Shopify Partners

1. Go to [Shopify Partners Dashboard](https://partners.shopify.com/)
2. Click "Apps" → "Create app"
3. Choose "Custom app" or "Public app"
4. Fill in app details:
   - **App name**: CartPro
   - **App URL**: Your ngrok URL (e.g., \`https://abc123.ngrok.io\`)
   - **Allowed redirection URL(s)**:
     - \`https://abc123.ngrok.io/auth/callback\`
     - \`https://abc123.ngrok.io/auth/shopify/callback\`
     - \`https://abc123.ngrok.io/api/auth/callback\`

5. Copy your API key and API secret key
6. Update your \`.env\` file with these credentials

### 7. Update Configuration Files

Edit \`shopify.app.toml\`:

\`\`\`toml
client_id = "your-api-key"
application_url = "https://your-ngrok-url.ngrok.io"
\`\`\`

### 8. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

This will start the Remix development server on port 3000.

### 9. Install App on Development Store

1. In your Partners dashboard, go to your app
2. Click "Select store" and choose your development store
3. Click "Install app"
4. The app will open in your store's admin

## 📱 Theme App Extension Setup

The cart drawer is installed as a Theme App Extension, which means it can be easily enabled/disabled by merchants.

### Enable the Extension

1. In your development store admin, go to **Online Store** → **Themes**
2. Click **Customize** on your active theme
3. In the theme editor, click **App embeds** (bottom left)
4. Enable **CartPro Drawer**
5. Configure settings (colors, position, etc.)
6. Click **Save**

### Testing the Cart Drawer

1. Visit your storefront
2. Add a product to cart
3. The cart drawer should automatically open
4. Test all features:
   - Adding/removing items
   - Quantity changes
   - Upsell products
   - Free shipping bar
   - Countdown timer

## 🎨 Customization

Merchants can customize the cart drawer from two places:

### 1. Theme Editor (Storefront)

- Go to **Online Store** → **Themes** → **Customize**
- Click on the CartPro block in the theme editor
- Adjust colors, position, messages, etc.

### 2. App Dashboard (Admin)

- Open the CartPro app in Shopify admin
- Go to **Settings**
- Configure advanced features:
  - Drawer design
  - Free shipping threshold
  - Upsell rules
  - Countdown timer
  - Analytics tracking

## 📊 Features Breakdown

### Slide Cart Drawer

- Smooth animations
- Configurable position (left/right)
- Adjustable width (300-600px)
- Responsive design

### Upsell System

- Smart product recommendations
- Based on cart contents
- Configurable max products
- Custom title and styling

### Free Shipping Bar

- Visual progress indicator
- Customizable threshold
- Dynamic messaging
- Motivates higher cart values

### Countdown Timer

- Creates urgency
- Configurable duration
- Custom message
- Auto-resets

### Analytics

- Cart views
- Add to cart events
- Upsell clicks
- Conversion tracking
- Revenue attribution

## 🗄️ Database Schema

The app uses Prisma with the following main models:

- **Session** - OAuth session storage
- **ShopSettings** - Per-shop configuration
- **UpsellRule** - Upsell logic and rules
- **Analytics** - Performance metrics
- **DiscountCode** - Future feature

## 🔌 API Routes

### Admin Routes

- \`/app\` - Dashboard (analytics overview)
- \`/app/settings\` - Configuration panel
- \`/app/upsells\` - Upsell rule management
- \`/app/analytics\` - Detailed analytics

### Auth Routes

- \`/auth/*\` - OAuth flow handling

### Webhook Routes

- \`/webhooks\` - Shopify webhook handler
  - APP_UNINSTALLED
  - SHOP_UPDATE

## 🚢 Deployment

### Option 1: Railway

1. Create account at [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables from \`.env\`
5. Deploy!

### Option 2: Render

1. Create account at [Render.com](https://render.com)
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: \`npm install && npm run build\`
   - **Start Command**: \`npm start\`
5. Add environment variables
6. Deploy!

### Option 3: Heroku

\`\`\`bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set SHOPIFY_API_KEY=your_key
heroku config:set SHOPIFY_API_SECRET=your_secret
# ... (set all env vars)

# Deploy
git push heroku main

# Run migrations
heroku run npx prisma db push
\`\`\`

### Post-Deployment

1. Update \`shopify.app.toml\` with production URL
2. Update app URLs in Partners dashboard
3. Update redirect URLs
4. Test installation on a live store

## 🧪 Testing

### Manual Testing Checklist

- [ ] Install app on dev store
- [ ] Enable theme extension
- [ ] Add product to cart
- [ ] Cart drawer opens automatically
- [ ] Add/remove items works
- [ ] Quantity changes work
- [ ] Upsell products display
- [ ] Click upsell adds to cart
- [ ] Free shipping bar updates
- [ ] Countdown timer counts down
- [ ] Checkout button redirects
- [ ] Settings page saves changes
- [ ] Changes reflect on storefront

### Future: Automated Tests

\`\`\`bash
npm test
\`\`\`

## 📈 Roadmap

### Phase 1: MVP (Current)
- ✅ Basic cart drawer
- ✅ Customization options
- ✅ Upsells
- ✅ Free shipping bar
- ✅ Countdown timer

### Phase 2: Enhancement
- [ ] A/B testing
- [ ] Advanced analytics
- [ ] Discount code integration
- [ ] Gift wrapping option
- [ ] Product notes

### Phase 3: Scale
- [ ] Multi-language support
- [ ] Advanced upsell algorithms
- [ ] Integration with marketing apps
- [ ] API for developers
- [ ] Mobile app preview

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For issues or questions:

- Create an issue in this repository
- Email: support@cartpro.app (placeholder)
- Documentation: [Link to docs]

## 📚 Resources

- [Shopify App Development](https://shopify.dev/docs/apps)
- [Remix Documentation](https://remix.run/docs)
- [Shopify Polaris](https://polaris.shopify.com/)
- [Theme App Extensions](https://shopify.dev/docs/apps/online-store/theme-app-extensions)
- [Prisma Documentation](https://www.prisma.io/docs)

## 🎯 Next Steps

1. ✅ Complete MVP development
2. Test thoroughly on multiple themes
3. Create demo video for App Store
4. Prepare marketing materials
5. Submit to Shopify App Store
6. Launch marketing campaign

---

**Built with ❤️ for Shopify merchants**
