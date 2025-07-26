#!/bin/bash

set -e

echo "🚀 Setting up NexusPlay Enterprise Platform..."

# Check Node.js version
NODE_VERSION=$(node --version)
echo "📋 Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v20" ]]; then
  echo "❌ Node.js 20+ is required. Please upgrade your Node.js version."
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build packages in order
echo "🏗️  Building core packages..."
npm run build --workspace=@nexusplay/core
npm run build --workspace=@nexusplay/ui

# Setup environment
if [ ! -f .env.local ]; then
  echo "⚙️  Creating environment file..."
  cp .env.example .env.local || echo "DATABASE_URL=postgresql://localhost:5432/nexusplay
NEXUS_LICENSE_SECRET=dev-secret-key
NODE_ENV=development" > .env.local
fi

# Setup Git hooks (if available)
if command -v git &> /dev/null; then
  echo "🔧 Setting up Git hooks..."
  git config core.hooksPath .githooks || true
fi

# Create necessary directories
echo "📁 Creating build directories..."
mkdir -p apps/web/.next
mkdir -p apps/desktop/dist
mkdir -p apps/mobile/android
mkdir -p apps/mobile/ios

# Install platform-specific dependencies
echo "📱 Setting up platform dependencies..."

# Electron (Desktop)
if [ ! -d "apps/desktop/node_modules" ]; then
  echo "🖥️  Installing Electron dependencies..."
  npm install --workspace=@nexusplay/desktop
fi

# Capacitor (Mobile)
if [ ! -d "apps/mobile/node_modules" ]; then
  echo "📱 Installing Capacitor dependencies..."
  npm install --workspace=@nexusplay/mobile
fi

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "  1. Run 'npm run dev' to start development"
echo "  2. Visit http://localhost:3000 for the web app"
echo "  3. Check the README.md for more commands"
echo ""
echo "🔐 Test license keys:"
echo "  - NEXUS-PRO-DEMO (Tier 1)"
echo "  - NEXUS-PRO-T2-DEMO (Tier 2)"
echo ""
echo "Happy coding! 🎮"