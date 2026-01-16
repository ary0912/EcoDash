# 🚂 Deploy to Railway (Free Alternative)

Railway is a modern cloud platform that offers a simpler deployment experience than Render + Vercel separately. Deploy your full stack (frontend + backend) on one platform for **$0/month** with $5 monthly credits.

## ⚡ Quick Start (5 minutes)

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub (or email)
3. Authorize Railway to access your repositories

### Step 2: Create New Project

1. Click "Create New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `EcoDash` repository
4. Click "Deploy Now"

Railway will automatically detect it's a monorepo and set up services.

### Step 3: Configure Services

Railway detects your `package.json` and creates services automatically. You'll see:
- **server** service (Node.js backend)
- **client** service (frontend build)

#### Configure Server Service

1. Click on the **server** service
2. Go to "Settings" tab
3. Set **Build Command:**
   ```
   npm install && npm run build --workspace=server
   ```
4. Set **Start Command:**
   ```
   node server/dist/index.js
   ```
5. Add environment variables under "Variables":
   ```
   NODE_ENV=production
   PORT=3000
   CORS_ORIGIN=[YOUR_RAILWAY_FRONTEND_URL]
   ```
6. Click "Deploy"

#### Configure Client Service

1. Click on the **client** service
2. Go to "Settings" tab
3. Set **Build Command:**
   ```
   npm run build --workspace=client
   ```
4. Add environment variables:
   ```
   VITE_API_URL=[YOUR_RAILWAY_BACKEND_URL]
   ```
5. Select **"Static Site"** as the deployment type
6. Set **Publish Directory:** `client/dist`
7. Click "Deploy"

### Step 4: Link Services

The frontend needs to know the backend URL:

1. In the client service environment, set:
   ```
   VITE_API_URL=https://ecodash-api-production.up.railway.app
   ```
   (Replace with your actual backend URL from Railway dashboard)

2. In the server service environment, set:
   ```
   CORS_ORIGIN=https://ecodash.up.railway.app
   ```
   (Replace with your actual frontend URL from Railway dashboard)

3. Both services will redeploy automatically

### Step 5: Verify Deployment

1. Click on your frontend service to get the public URL
2. Open it in your browser
3. Test the product assessment feature
4. Check that it connects to your backend

## 📊 Railway Free Tier Benefits

| Feature | Details |
|---------|---------|
| **Monthly Credits** | $5/month (usually enough for hobby projects) |
| **After Credits** | $0.50 per hour overages |
| **Deployment** | Auto-deploy on GitHub push |
| **SSL/HTTPS** | ✅ Included |
| **Cold Starts** | ⚡ Minimal (better than Render) |
| **Uptime** | 99.9% |
| **Support** | Community Discord |

## 🔄 Automatic Updates

Every `git push` to your repository:
1. Railway detects changes
2. Rebuilds and deploys backend
3. Rebuilds and deploys frontend
4. Both services update within 1-2 minutes

## ⚙️ Custom Domain (Optional)

1. In Railway dashboard, go to your frontend service
2. Click "Settings"
3. Add custom domain (e.g., `ecodash.com`)
4. Update DNS records as instructed
5. Update `CORS_ORIGIN` in backend with new domain

## 🛠️ Scaling & Upgrades

**Start Free:**
- $5/month credits covers most hobby projects
- Monitor usage in Railway dashboard

**When You Need More:**
- Click "Add Usage" to increase credits
- Pay as you go ($0.50/hour for each service)

## 🆚 Railway vs Render+Vercel

| Aspect | Railway | Render+Vercel |
|--------|---------|---------------|
| **Setup Time** | 5 min | 15 min |
| **Platforms** | 1 | 2 |
| **Cold Starts** | Better ⚡ | Slower (~30s) |
| **Free Tier** | $5 credits/month | $0 |
| **After Free** | $0.50/hr | Subscription |
| **Monitoring** | Built-in | Need separate tools |

## 📈 Monitor Your Deployment

1. Go to Railway dashboard
2. Select your project
3. Check **Metrics** tab for:
   - CPU & Memory usage
   - Network traffic
   - Deployment history

## 🆘 Troubleshooting

**Frontend shows 404 for API calls:**
- Check frontend `VITE_API_URL` matches backend URL
- Verify backend `CORS_ORIGIN` includes frontend URL
- Redeploy both services

**Backend crashes on startup:**
- Check build command output for errors
- Verify `NODE_ENV=production` is set
- Check logs under "Deployments" tab

**Deployments keep failing:**
- Check Railway logs for build errors
- Ensure `package.json` scripts are correct
- Try manual redeploy from dashboard

## ✅ Next Steps

1. **Deployed?** Share your Railway URL! 🎉
2. **Add custom domain** for professional branding
3. **Enable notifications** in Railway settings
4. **Monitor costs** to stay within free tier

---

**Railway is the easiest free hosting for full-stack apps. Deploy in minutes!**
