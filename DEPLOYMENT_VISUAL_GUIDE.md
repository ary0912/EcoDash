# 🎥 Free Deployment - Step-by-Step

Follow these visual guides to deploy EcoDash for free in 15 minutes.

## 🎬 Video Tutorials (YouTube)

**Deploy React App to Vercel (5 min)**
- Search: "How to deploy React app to Vercel"
- Key steps: Sign in → Import → Configure → Deploy
- Link: https://www.youtube.com/results?search_query=deploy+react+vercel

**Deploy Node.js to Render (5 min)**
- Search: "How to deploy Node.js to Render"
- Key steps: Sign in → New service → Connect GitHub → Deploy
- Link: https://www.youtube.com/results?search_query=deploy+nodejs+render

**Connect GitHub to Vercel/Render (auto-deploy)**
- Automatic deployments on every git push
- Much easier than manual deployment

## 📋 Exact Steps

### A. Prepare Your Code

```bash
# 1. Verify build works locally
cd /Users/aryanlodha/Desktop/Project
npm run build

# 2. Create GitHub repo (if not already)
# Go to https://github.com/new
# Create repo "ecodash"

# 3. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/ecodash.git
git branch -M main
git push -u origin main
```

### B. Deploy Backend (Render) - 5 minutes

```
1. Go to https://render.com
2. Click "Sign up with GitHub"
3. Click "New" → "Web Service"
4. Select your "ecodash" repository
5. Click "Connect"

Configuration:
├─ Name: ecodash-server
├─ Environment: Node
├─ Build Command:
│  npm install && npm run build --workspace=server
├─ Start Command:
│  node server/dist/index.js
├─ Plan: Free ← IMPORTANT!
└─ Click "Create Web Service"

Wait for deployment... (~2 min)
Copy the URL: https://ecodash-server-xxxx.onrender.com
```

### C. Deploy Frontend (Vercel) - 5 minutes

```
1. Go to https://vercel.com
2. Click "Sign up with GitHub"
3. Click "Add New" → "Project"
4. Select "ecodash" repository
5. Click "Import"

Framework Settings:
├─ Framework Preset: Vite
├─ Root Directory: ./client
├─ Build Command: npm run build
└─ Output Directory: dist (auto-filled)

Environment Variables:
├─ Add variable
├─ Name: VITE_API_URL
├─ Value: https://ecodash-server-xxxx.onrender.com
└─ Click "Add"

Click "Deploy"
Wait for deployment... (~3 min)
Your URL: https://ecodash.vercel.app
```

### D. Update Backend CORS - 2 minutes

```
1. Go to Render dashboard
2. Click "ecodash-server"
3. Click "Environment"
4. Find "CORS_ORIGIN"
5. Change value to: https://ecodash.vercel.app
6. Click "Save"
7. Service auto-redeploys (~1 min)
```

### Done! 🎉

Your app is now live at: **https://ecodash.vercel.app**

---

## 🧪 Test Your Deployment

```
1. Open browser: https://ecodash.vercel.app
2. Fill in form:
   - Product Name: "Water Bottle"
   - Category: "Kitchen & Dining"
   - Description (optional): "Eco-friendly reusable bottle"
3. Click "Assess Impact"
4. See results!

If you see an error:
- Open DevTools (F12)
- Check Console for error messages
- Most common: CORS error → check backend URL
- See DEPLOYMENT.md for troubleshooting
```

---

## 🔄 Enable Auto-Deploys

Now, every time you push to GitHub, your app updates automatically!

```bash
# Make a change
echo "# Updated" >> README.md

# Push to GitHub
git add .
git commit -m "Update readme"
git push origin main

# Within 2 minutes:
# - Vercel rebuilds frontend
# - Render rebuilds backend
# - App is updated!
```

---

## 💡 Tips

### Tip 1: Monitor Your App
- **Vercel Dashboard:** See build logs, errors, analytics
- **Render Dashboard:** See server status, logs, restarts
- Check email for deployment alerts

### Tip 2: Avoid Cold Starts
Render spins down after 15 minutes. First request takes ~30 seconds.

**Free solution:** Use UptimeRobot
```
1. Go to https://uptimerobot.com
2. Click "Sign up"
3. Click "Add New Monitor"
4. Type: HTTP(s)
5. URL: https://ecodash-server-xxxx.onrender.com/health
6. Check Interval: Every 10 minutes
7. Save
```

### Tip 3: Custom Domain (Optional)
- Vercel: Add domain in settings (DNS config needed)
- Cost: Usually $10-15/year
- Can do later if you want

---

## 🆘 Common Issues

### Issue: "Cannot connect to API"
```
Solution: 
- Check VITE_API_URL in Vercel environment
- Verify it matches your Render URL
- Wait 2 minutes for changes to take effect
- Check Render service is running (green dot on dashboard)
```

### Issue: "First request is slow"
```
This is normal! Render free tier spins down after 15 min.
Solution: Use UptimeRobot (see Tip 2 above)
```

### Issue: "Blank white page"
```
Check browser console (F12):
- If API errors: CORS issue or wrong URL
- If JS errors: Check Vercel build logs
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

### Issue: "500 Error on backend"
```
Check Render logs:
- Go to Render dashboard
- Click ecodash-server
- Click Logs tab
- Look for error messages
- Common: Wrong environment variables
```

---

## 📊 Monitoring

### Vercel Dashboard
- Log in at https://vercel.com
- Click "ecodash"
- See: Deployments, Errors, Analytics, Logs

### Render Dashboard
- Log in at https://render.com
- Click "ecodash-server"
- See: Status, Logs, Metrics, Events

### GitHub Actions (Optional)
- Go to GitHub repo → Actions tab
- See deployment history
- Check if builds passed/failed

---

## 🚀 You're Done!

Your app is now:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Auto-deploying on every push
- ✅ Using free hosting forever
- ✅ Professional and production-ready

**Congratulations! 🎉**

Next steps:
1. Share link with friends: https://ecodash.vercel.app
2. Collect feedback
3. Make improvements
4. Push changes (auto-deploys)
5. Upgrade to paid if needed

---

## 📞 Get Help

**Vercel Support:**
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/community

**Render Support:**
- Docs: https://render.com/docs
- Discord: https://render.com/community

**Your Repository:**
- See DEPLOYMENT.md for more details
- Check README.md for project info
- Review code in client/ and server/

---

**Happy Deploying! 🚀**
