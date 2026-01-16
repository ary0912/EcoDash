#!/bin/bash

# EcoDash - Free Deployment Setup Script
# This script helps you prepare for deployment to Vercel + Render

echo "🚀 EcoDash Free Deployment Setup"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git add .
    git commit -m "Initial commit - EcoDash ready for deployment"
else
    echo "✅ Git repository found"
fi

echo ""
echo "📋 Deployment Checklist:"
echo ""

# Check if build succeeds
echo "🔨 Building project..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - fix errors before deploying"
    exit 1
fi

echo ""
echo "📦 Build artifacts:"
echo "  - Frontend: client/dist (ready for Vercel)"
echo "  - Backend: server/dist (ready for Render)"
echo ""

echo "🔐 Environment Variables Needed:"
echo ""
echo "For Render (Backend):"
echo "  - NODE_ENV=production"
echo "  - PORT=3000"
echo "  - CORS_ORIGIN=https://your-vercel-app.vercel.app"
echo ""
echo "For Vercel (Frontend):"
echo "  - VITE_API_URL=https://your-render-app.onrender.com"
echo ""

echo "📚 Next Steps:"
echo "  1. Push to GitHub: git push origin main"
echo "  2. Deploy backend: https://render.com (free tier)"
echo "  3. Deploy frontend: https://vercel.com (free tier)"
echo "  4. Read DEPLOYMENT.md for detailed steps"
echo ""

echo "📊 Free Tier Features:"
echo "  ✅ Unlimited deployments"
echo "  ✅ Global CDN (Vercel)"
echo "  ✅ Automatic HTTPS"
echo "  ✅ Auto-deploy on git push"
echo "  ⚠️  Render cold starts (~30s first call)"
echo ""

echo "Total Cost: $0/month 🎉"
echo ""
echo "Happy deploying! 🚀"
