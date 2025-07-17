#!/bin/bash

# Build script for the application
echo "🏗️  Building the application..."

# Set environment variables
export NODE_ENV=production

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Run type checking
echo "🔧 Running type checks..."
npm run type-check

# Run tests
echo "🧪 Running tests..."
npm run test

# Build the application
echo "🚀 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📊 Build statistics:"
    du -sh dist/
    echo "🌐 Built files:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi