# 🔑 Vercel Environment Variables for EcoDash

## What to Add in Vercel

Go to your **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

---

## 📝 Required Environment Variables

### 1. **VITE_API_URL** (REQUIRED)

This tells your frontend where the backend API is located.

**Variable Name:** `VITE_API_URL`

**Variable Value:** Your Railway backend URL

```
https://your-railway-backend.up.railway.app
```

**Example:**
```
https://ecodash-api.up.railway.app
```

**How to get your Railway URL:**
1. Go to Railway Dashboard
2. Select your service
3. Click "View Logs" or "Settings"
4. Look for the URL at the top (or under "Domains")
5. Copy the full URL (should start with `https://`)

---

## ⚙️ Optional Environment Variables

These are usually not needed for Vercel (frontend only), but might be useful:

### 2. **NODE_ENV** (Optional)
- **Variable Name:** `NODE_ENV`
- **Variable Value:** `production`
- Only needed if you want to force production mode

### 3. **VITE_APP_NAME** (Optional, if you want)
- **Variable Name:** `VITE_APP_NAME`
- **Variable Value:** `EcoDash`
- Used for branding/titles

---

## 🎯 Step-by-Step in Vercel

### Step 1: Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### Step 2: Select Your Project
Click on your **EcoDash** project

### Step 3: Go to Settings
Click "Settings" tab at the top

### Step 4: Find Environment Variables
Left sidebar → Click "Environment Variables"

### Step 5: Add New Variable
Click "Add New"

### Step 6: Fill In
- **Name:** `VITE_API_URL`
- **Value:** `https://your-railway-backend.up.railway.app`
- **Environments:** Select all (Development, Preview, Production)

### Step 7: Click Save

### Step 8: Redeploy
Go to "Deployments" tab → Click "Redeploy" on latest deployment

---

## 📋 Copy-Paste Format

```
VITE_API_URL=https://ecodash-api.up.railway.app
```

Replace `ecodash-api.up.railway.app` with your actual Railway URL.

---

## 🔗 How to Find Your Railway Backend URL

### Method 1: Railway Dashboard
1. Go to https://railway.app
2. Select your project
3. Click on your service
4. URL is displayed at the top or in "Settings"
5. Format: `https://your-service-name.up.railway.app`

### Method 2: Railway Deployment
1. Go to "Deployments" tab
2. Click on latest deployment
3. URL shown in deployment details

### Method 3: From Logs
1. In Railway service, click "View Logs"
2. Look for message like: "Server running on https://..."

---

## ✅ How to Verify It's Working

After setting env var and redeploying:

1. Visit your Vercel URL
2. Open browser Developer Tools (F12)
3. Go to "Network" tab
4. Try to assess a product
5. Look for API calls to your Railway URL
6. Should see requests like: `https://ecodash-api.up.railway.app/assess`

---

## ❌ Common Mistakes

❌ **Wrong:** Forgetting to add `https://` at the start
```
ecodash-api.up.railway.app  ❌ WRONG
https://ecodash-api.up.railway.app  ✅ CORRECT
```

❌ **Wrong:** Missing trailing slash (shouldn't matter, but be consistent)
```
https://ecodash-api.up.railway.app/  (extra slash)
https://ecodash-api.up.railway.app   (no slash - PREFERRED)
```

❌ **Wrong:** Using localhost instead of actual URL
```
http://localhost:3000  ❌ WRONG (won't work from Vercel)
```

❌ **Wrong:** Using Railway public URL without `https://`
```
ecodash-api  ❌ INCOMPLETE
https://ecodash-api.up.railway.app  ✅ CORRECT
```

---

## 🔄 After Setting Env Var

1. **Vercel automatically redeploys** after saving env var
2. Or manually click "Redeploy" on your latest deployment
3. Wait 2-3 minutes for new build
4. Visit your Vercel URL and test

---

## 📞 If It's Not Working

**API calls failing?** Check:
1. ✅ `VITE_API_URL` is set correctly
2. ✅ Rails backend is running (check Railway dashboard)
3. ✅ Backend URL is reachable: `curl https://your-railway-url/health`
4. ✅ Vercel deployment finished (check Deployments)
5. ✅ Browser console shows correct API URL

---

## 🎯 Final Checklist

- [ ] Railway backend deployed and running
- [ ] Railway URL copied
- [ ] Vercel project selected
- [ ] Environment variable `VITE_API_URL` added
- [ ] Value is your Railway URL
- [ ] Applied to all environments
- [ ] Project redeployed
- [ ] Tested in browser

---

**That's it! Your frontend now knows where to find the backend! 🚀**
