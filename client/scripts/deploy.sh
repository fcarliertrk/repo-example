#!/bin/bash

# Deploy script for the application
set -e

ENVIRONMENT=${1:-staging}
echo "🚀 Deploying to $ENVIRONMENT environment..."

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
    echo "📋 Loading environment variables for $ENVIRONMENT..."
    source ".env.$ENVIRONMENT"
fi

# Build the application
echo "🏗️  Building application for $ENVIRONMENT..."
npm run build:prod

# Run pre-deployment checks
echo "🔍 Running pre-deployment checks..."
npm run test:smoke

# Deploy based on environment
case $ENVIRONMENT in
    "staging")
        echo "📤 Deploying to staging..."
        # Add staging deployment commands here
        # Example: rsync -av dist/ user@staging-server:/var/www/html/
        echo "✅ Deployed to staging successfully!"
        ;;
    "production")
        echo "📤 Deploying to production..."
        # Add production deployment commands here
        # Example: rsync -av dist/ user@prod-server:/var/www/html/
        echo "✅ Deployed to production successfully!"
        ;;
    *)
        echo "❌ Unknown environment: $ENVIRONMENT"
        echo "Usage: ./deploy.sh [staging|production]"
        exit 1
        ;;
esac

# Post-deployment checks
echo "🔍 Running post-deployment checks..."
# Add health check commands here
echo "✅ Deployment completed successfully!"

# Notify team (optional)
echo "📧 Notifying team about deployment..."
# Add notification commands here (Slack, email, etc.)
echo "🎉 Deployment notification sent!"