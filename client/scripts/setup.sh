#!/bin/bash

# Setup script for new developers
echo "🛠️  Setting up the development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
MIN_VERSION="18.0.0"
if [ "$(printf '%s\n' "$MIN_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$MIN_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION is supported"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f ".env" ]; then
    echo "📋 Creating environment file..."
    cp .env.example .env
    echo "📝 Please edit .env file with your configuration"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs tmp

# Set up git hooks (if using git)
if [ -d ".git" ]; then
    echo "🔗 Setting up git hooks..."
    # Add git hooks setup here if needed
fi

# Run initial build to verify setup
echo "🔧 Running initial build to verify setup..."
npm run build

# Run tests to verify everything is working
echo "🧪 Running tests to verify setup..."
npm test

echo "✅ Setup completed successfully!"
echo ""
echo "🎉 You're ready to start developing!"
echo ""
echo "Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run test         - Run tests"
echo "  npm run lint         - Run linter"
echo "  npm run type-check   - Run TypeScript type checking"
echo ""
echo "📚 Documentation:"
echo "  docs/API.md          - API documentation"
echo "  docs/CONTRIBUTING.md - Contributing guidelines"
echo "  docs/DEPLOYMENT.md   - Deployment instructions"