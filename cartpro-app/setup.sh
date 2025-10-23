#!/bin/bash

# CartPro Setup Script
# This script automates the setup process

set -e  # Exit on error

echo "🚀 CartPro Setup Script"
echo "======================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    echo "Creating .env from .env.example..."
    cp .env.example .env

    # Generate session secret
    SESSION_SECRET=$(openssl rand -base64 32)

    # Update .env with generated secret
    sed -i "s/SESSION_SECRET=.*/SESSION_SECRET=${SESSION_SECRET}/" .env

    echo -e "${GREEN}✅ .env file created with generated SESSION_SECRET${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: Edit .env and add your Shopify credentials:${NC}"
    echo "   - SHOPIFY_API_KEY"
    echo "   - SHOPIFY_API_SECRET"
    echo "   - SHOPIFY_APP_URL (if using ngrok)"
    echo ""
    read -p "Press Enter when you've updated the .env file..."
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing dependencies..."
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi

# Prisma setup
echo ""
echo "🗄️  Setting up database..."

# Check if Prisma Client is generated
if [ ! -d "node_modules/.prisma" ]; then
    echo "Generating Prisma Client..."
    npx prisma generate || {
        echo -e "${RED}❌ Prisma generate failed${NC}"
        echo "This might be due to network restrictions."
        echo "Please run this script on your local machine."
        exit 1
    }
    echo -e "${GREEN}✅ Prisma Client generated${NC}"
else
    echo -e "${GREEN}✅ Prisma Client already generated${NC}"
fi

# Push database schema
if [ ! -f "prisma/dev.db" ]; then
    echo "Creating database..."
    npx prisma db push --skip-generate || {
        echo -e "${RED}❌ Database creation failed${NC}"
        exit 1
    }
    echo -e "${GREEN}✅ Database created${NC}"
else
    echo -e "${GREEN}✅ Database already exists${NC}"
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Make sure your .env has valid Shopify credentials"
echo "2. Update shopify.app.toml with your app's client_id"
echo "3. Run: npm run dev"
echo "4. Install the app on your dev store"
echo "5. Enable the theme extension in theme editor"
echo ""
echo "For detailed instructions, see SETUP_GUIDE.md"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
