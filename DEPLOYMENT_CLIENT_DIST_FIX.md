# 🔧 Fix: Client Dist Not Found Error on Deployment

## The Problem

You're seeing this error on Railway/Render/Vercel:
```json
{
  "error": "Not found",
  "path": "/",
  "details": "Client dist not found at /app/client/dist"
}
```

**Root Cause:** The deployment platform is **not building the frontend**. It's only building the backend server.

## The Solution

Your deployment platform's **Build Command** must build BOTH frontend AND backend.

### For Railway

1. **Go to Railway Dashboard** → Select Your Project
2. **Click on the `server` service** (or whatever it's named)
3. **Go to "Settings" tab**
4. **Find "Build Command"** and set it to:

```bash
npm install && npm run build
```

**NOT just:**
```bash
npm run build --workspace=server  # ❌ WRONG - only builds backend
```

5. **Make sure "Start Command" is:**

```bash
npm start
```

6. **Ensure Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `3000`

7. **Click "Deploy"** or redeploy

### For Render

1. **Go to your Web Service** in Render Dashboard
2. **Go to "Settings"**
3. **Update Build Command:**

```bash
npm install && npm run build
```

4. **Update Start Command:**

```bash
npm start
```

5. **Save and redeploy**

### For Vercel (Alternative)

**Note:** Vercel doesn't support Node.js backend well. Use Railway or Render instead for full-stack deployment.

## Why This Matters

Your monorepo has two workspaces:
- `client/` - React frontend
- `server/` - Node.js backend

The root `npm run build` command does:
```json
"build": "npm run build --workspace=client && npm run build --workspace=server"
```

This builds **BOTH**. The server then serves the built frontend from `client/dist/`.

If you only run `npm run build --workspace=server`, the frontend never gets built!

## Deployment Architecture

```
Your GitHub Repo
    ↓
Railway/Render detects package.json
    ↓
Runs: npm install && npm run build
    ↓
    ├─ Builds client/ → client/dist/
    └─ Builds server/ → server/dist/
    ↓
Runs: npm start
    ↓
Backend starts and serves frontend from client/dist/
    ↓
One URL serves everything ✨
```

## Verify It's Working

After redeploying, check:

```bash
# Should return HTML (frontend)
curl https://your-railway-app.up.railway.app/

# Should return JSON (health check)
curl https://your-railway-app.up.railway.app/health

# Should return assessment (API)
curl -X POST https://your-railway-app.up.railway.app/assess \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"A test product","category":"Consumer Goods","quantity":1,"location":"USA"}'
```

## Common Mistakes

❌ **WRONG Build Commands:**
- `npm run build --workspace=server` (only builds backend)
- `tsc` (only compiles TypeScript, doesn't bundle React)
- `vite build` (only builds frontend, forgets backend)

✅ **CORRECT Build Commands:**
- `npm install && npm run build` (builds both)
- `npm run build` (also works, assumes npm install already ran)

## Checklist Before Redeploying

- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Environment: `NODE_ENV=production`
- [ ] No separate frontend/backend services (they should be one)
- [ ] Redeploy after changes

## Still Not Working?

1. **Check deployment logs** for build errors
2. **Verify git push** - latest code is on GitHub
3. **Check if client/dist exists locally:** `ls client/dist/`
4. **Run locally:** `npm run build && NODE_ENV=production npm start`
5. **Test locally:** Visit `http://localhost:3000`

---

**After fixing the build command, your app will work perfectly! 🚀**
