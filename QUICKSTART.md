# Quick Start Guide

## ✅ Project Setup Complete

Your Environmental Impact Analyzer project is fully scaffolded and ready for development!

## 🚀 Start Development

### Option 1: Run Everything (Recommended)

```bash
npm run dev
```

This starts both frontend and backend concurrently:
- **Frontend**: http://localhost:5173 (Vite React dev server)
- **Backend**: http://localhost:3000 (Express with auto-reload)

### Option 2: Run Components Separately

**Frontend only:**
```bash
npm run dev --workspace=client
# or
cd client && npm run dev
```

**Backend only:**
```bash
npm run dev --workspace=server
# or
cd server && npm run dev
```

## 📦 Build for Production

```bash
npm run build
```

Generates:
- `client/dist/` - Optimized React SPA
- `server/dist/` - Compiled Node.js backend

## 🏃 Run Production Build

```bash
npm start
```

Starts the Express backend on port 3000.

## 🧪 Test the Application

1. Navigate to http://localhost:5173
2. Enter a product description (e.g., "Recycled aluminum water bottle made locally with 50% recycled content")
3. Click "Analyze Environmental Impact"
4. View results with score breakdown and visualizations

### Example Products to Test

**High Sustainability Score:**
```
Name: Recycled Aluminum Bottle
Category: Electronics
Description: 100% recycled aluminum water bottle. Manufactured locally in USA using renewable energy. BPA-free. Fully recyclable. Certified B Corp. Reusable design eliminates single-use plastic.
```

**Mixed Score:**
```
Name: Cotton T-Shirt
Category: Clothing
Description: 100% organic cotton t-shirt from fair-trade supplier. Grown without pesticides but requires significant water for production. Manufactured in India. Can be worn 100+ times before disposal.
```

## 📁 Project Structure

```
.
├── client/               # React + TypeScript frontend
│   └── src/
│       ├── components/   # UI components
│       ├── pages/        # Page components
│       ├── services/     # API client
│       └── types/        # TypeScript interfaces
├── server/               # Node.js + Express backend
│   └── src/
│       ├── routes/       # API endpoints
│       ├── services/     # Business logic
│       └── types/        # TypeScript interfaces
└── README.md             # Full documentation
```

## 🔌 API Endpoints

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Assessment:**
```bash
curl -X POST http://localhost:3000/assess \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Recycled Bottle",
    "description": "Made from 100% recycled aluminum with renewable energy manufacturing",
    "category": "Electronics",
    "location": "USA"
  }'
```

## 🛠️ Development Tips

### Hot Reload
- **Frontend**: Changes to React components auto-refresh (Vite)
- **Backend**: Changes to TypeScript auto-compile and restart (tsx watch)

### TypeScript
- Strict mode enabled for type safety
- All components and services are fully typed
- IDE autocomplete and error checking included

### Debugging Backend
Edit `server/src/index.ts` to add console logs or use VS Code debugger.

### Styling
- Tailwind CSS configured in `client/tailwind.config.js`
- Custom colors: excellent, good, fair, poor, critical
- CSS utilities available in components

## 📚 Next Steps

1. **Understand the Scoring Logic**
   - Read `server/src/services/scoringService.ts`
   - Learn how weights (40%, 25%, 20%, 15%) apply

2. **Customize Scoring**
   - Adjust category baselines in `scoringService.ts`
   - Add/modify keywords in `nlpService.ts`
   - Update explanations as needed

3. **Enhance UI**
   - Add new components in `client/src/components/`
   - Create additional pages in `client/src/pages/`
   - Customize colors in `tailwind.config.js`

4. **Integrate External Services**
   - Add Hugging Face Transformers for advanced NLP
   - Implement database for historical assessments
   - Add user authentication and profiles

5. **Deploy**
   - Build: `npm run build`
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Heroku/Railway/AWS

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change port in server/.env
PORT=3001

# Or kill existing process
lsof -ti:3000 | xargs kill -9
```

**Frontend can't reach backend?**
- Check backend is running: `curl http://localhost:3000/health`
- Verify CORS_ORIGIN in `server/.env`: `CORS_ORIGIN=http://localhost:5173`

**Build errors?**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

## 📖 Full Documentation

See `README.md` for comprehensive documentation including:
- System architecture
- API reference
- Scoring methodology
- Extension guide
- Deployment instructions

---

**Ready to go! 🌱**

