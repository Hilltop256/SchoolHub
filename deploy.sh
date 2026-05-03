#!/bin/bash
# School Hub Vercel Deployment Script

set -e

echo "🚀 School Hub - Vercel Deployment Script"
echo "========================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Navigate to project directory
cd /workspace/a8186708-4d6a-4d64-a12a-b24be328cc8f/sessions/agent_72ad5ae9-4e37-4006-ae21-06ae49a77f5b

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Not logged in to Vercel"
    echo "To login, run: vercel login"
    echo "Then re-run this script"
    exit 1
fi

echo "✅ Logged in to Vercel"

# Build the project locally
echo "📦 Building project..."
bun run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod --confirm

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "📍 View your deployment:"
    vercel ls --prod
else
    echo "❌ Deployment failed"
    exit 1
fi
