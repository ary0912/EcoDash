# 🚀 Deploying EcoDash on Vercel (+ Railway Backend)

## ⚠️ Important: Vercel Limitation

**Vercel can only host the frontend (React).**

Vercel is a static site platform and doesn't support persistent Node.js servers. Your Express backend needs a separate home.

## ✅ Recommended: Vercel Frontend + Railway Backend

This is the professional approach used by many startups.

### Architecture
```
┌──────────────────┐         ┌──────────────────┐
│   Vercel         │         │   Railway        │
│  (Frontend)      │────────▶│   (Backend)      │
│  ecodash.vercel  │         │  ecodash-api.up  │
└──────────────────┘         └──────────────────┘
```

---

## 📋 Step-by-Step Setup

### Step 1: Deploy Backend to Railway First

Railway is free and perfect for your Node.js backend.

1. Go to **https://railway.app**
2. Click "Create New Project"
3. Select "Deploy from GitHub repo"
4. Choose **ary0912/EcoDash**
5. Configure settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** `NODE_ENV=production`, `PORT=3000`
6. Deploy ✓
7. **Copy your Railway URL** (e.g., `https://ecodash-api.up.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. Go to **https://vercel.com**
2. Click "Add New" → "Project"
3. Select **ary0912/EcoDash** repository
4. Configure:
   - **Framework:** Vite
   - **Root Directory:** `./client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://ecodash-api.up.railway.app` (your Railway URL)
6. Deploy ✓

### Step 3: Verify It Works

1. Visit your Vercel URL (something like `https://ecodash.vercel.app`)
2. Test the product assessment feature
3. Should connect to Railway backend automatically

---

## 🔄 Auto-Deployment

Both platforms auto-deploy on GitHub push:
- **Push to GitHub** → Vercel rebuilds frontend → Railway rebuilds backend
- Updates live in ~2 minutes

---

## 🔧 Alternative: Vercel Serverless Functions

If you want everything on Vercel, you'd need to:
1. Convert Express routes to Vercel serverless functions
2. Deploy backend as `/api` routes
3. More complex setup

**Not recommended** unless you want everything in one place.

---

## 📊 Vercel + Railway Setup

| Component | Platform | Cost | Notes |
|-----------|----------|------|-------|
| Frontend | Vercel | Free | Global CDN, fast |
| Backend | Railway | Free | $5 credits/month |
| Database | (Optional) | Free | Can add later |
| Custom Domain | Both | $12/yr each | Optional |

**Total Cost:** $0/month (or $5 Railway credits)

---

## 🚀 Quick Setup (If Already on Vercel)

If you already deployed to Vercel, follow **Step 1** above to set up the backend, then:

1. Go to Vercel dashboard
2. Select your EcoDash project
3. Go to "Settings" → "Environment Variables"
4. Add:
   - `VITE_API_URL` = `https://your-railway-backend-url.up.railway.app`
5. Redeploy

---

## ❌ What NOT To Do

❌ Don't try to run Express backend on Vercel alone
- Vercel kills processes after 60 seconds
- Your backend will stop working
- Backend needs a proper Node.js host

❌ Don't forget the `VITE_API_URL` environment variable
- Frontend won't know where backend is
- API calls will fail

---

## ✅ Checklist

- [ ] Backend deployed to Railway
- [ ] Railway URL copied
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` set to Railway URL on Vercel
- [ ] Frontend redeployed after setting env var
- [ ] Test the app works end-to-end

---

## 🎯 Final URLs

After deployment, you'll have:

1. **Frontend:** `https://ecodash.vercel.app` (Vercel)
2. **Backend:** `https://ecodash-api.up.railway.app` (Railway)
3. Both auto-sync on GitHub push

---

## 📖 Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Free Deployment Platforms Guide](FREE_DEPLOYMENT_PLATFORMS.md)

---

**Vercel + Railway is the professional, free way to deploy full-stack apps! 🚀**
