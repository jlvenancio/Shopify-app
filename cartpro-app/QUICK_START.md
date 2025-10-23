# 🚀 Quick Start Guide - CartPro

Get up and running with CartPro in 10 minutes!

## ⚡ Super Quick Setup

### 1. Install Dependencies (2 min)

\`\`\`bash
cd cartpro-app
npm install
\`\`\`

### 2. Create .env File (1 min)

\`\`\`bash
cp .env.example .env
\`\`\`

Generate a session secret:

\`\`\`bash
openssl rand -base64 32
\`\`\`

Edit \`.env\` and add:

\`\`\`env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=https://your-url.ngrok.io
SESSION_SECRET=paste_generated_secret_here
DATABASE_URL="file:./dev.db"
\`\`\`

### 3. Setup Database (1 min)

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 4. Start Dev Server (1 min)

\`\`\`bash
npm run dev
\`\`\`

Server will start on http://localhost:3000

### 5. Create Shopify App (3 min)

1. Go to [Shopify Partners](https://partners.shopify.com/)
2. Click **Apps** → **Create app**
3. Fill in:
   - Name: CartPro
   - App URL: https://your-ngrok-url.ngrok.io
   - Redirects:
     - https://your-ngrok-url.ngrok.io/auth/callback
     - https://your-ngrok-url.ngrok.io/auth/shopify/callback
4. Copy API Key and Secret to \`.env\`

### 6. Install on Dev Store (2 min)

1. In Partners dashboard, click **Select store**
2. Choose your development store
3. Click **Install app**

### 7. Enable Theme Extension (30 sec)

1. Go to **Online Store** → **Themes** → **Customize**
2. Click **App embeds** (bottom left)
3. Enable **CartPro Drawer**
4. Click **Save**

## ✅ Test It!

Visit your storefront and add a product to cart. The cart drawer should slide in!

## 🎨 Customize

### In Theme Editor:
- Online Store → Themes → Customize
- Click on CartPro block
- Change colors, position, messages

### In App Dashboard:
- Open CartPro app
- Go to Settings
- Configure advanced options

## 🆘 Troubleshooting

### Cart drawer doesn't open?
- Check that App Embed is enabled in theme editor
- Check browser console for errors
- Ensure app is installed correctly

### Can't install app?
- Verify API Key and Secret in .env
- Check redirect URLs match exactly
- Ensure ngrok is running

### Database errors?
- Run \`npx prisma db push\` again
- Delete dev.db and recreate

### Changes not showing?
- Hard refresh browser (Ctrl+Shift+R)
- Check that you saved in theme editor
- Verify settings are correct

## 📚 Next Steps

- Read full [README.md](./README.md)
- Check [PROJECT_PLAN.md](./PROJECT_PLAN.md) for features
- Customize colors and branding
- Set up upsell rules
- Configure free shipping threshold
- Monitor analytics

## 🔗 Important Links

- [Shopify Partners](https://partners.shopify.com/)
- [App Development Docs](https://shopify.dev/docs/apps)
- [Theme Extensions](https://shopify.dev/docs/apps/online-store/theme-app-extensions)
- [Polaris Design System](https://polaris.shopify.com/)

---

Need help? Create an issue or check the full documentation!
