#!/bin/bash
# School Hub Vercel Setup Script
# Run this once to configure the project for Vercel deployment

set -e

echo "🔧 School Hub Vercel Setup"
echo "==========================="
echo ""

cd /workspace/a8186708-4d6a-4d64-a12a-b24be328cc8f/sessions/agent_72ad5ae9-4e37-4006-ae21-06ae49a77f5b

# Install Vercel CLI
echo "📦 Installing Vercel CLI..."
npm install -g vercel

# Link project
echo "🔗 Linking project to Vercel..."
vercel link

# Pull environment variables
echo "🔐 Setting up environment variables..."
echo "Please add your Supabase credentials when prompted."
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Copy environment variables to .env.example
echo "📝 Creating .env.local for local development..."
cp .env.example .env.local

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update .env.local with your Supabase credentials"
echo "  2. Test build: bun run build"
echo "  3. Deploy: ./deploy.sh"
echo ""
