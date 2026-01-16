# 🚀 EcoDash - Free Deployment Guide

Deploy your environmental impact analyzer for **$0/month** using **Vercel** (frontend) and **Render** (backend).

## ⚡ Quick Start (10 minutes)

### Step 1: Deploy Backend to Render (Free)

1. **Create Account & Connect GitHub**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Select your `EcoDash` repository
   - Click "Connect"

3. **Configure**
   - **Name:** `ecodash-server`
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build --workspace=server`
   - **Start Command:** `node server/dist/index.js`
   - **Plan:** Free

4. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=3000
   CORS_ORIGIN=https://ecodash.vercel.app
   ```

5. **Deploy** → Copy your URL (e.g., `https://ecodash-server.onrender.com`)

### Step 2: Deploy Frontend to Vercel (Free)

1. **Create Account & Connect GitHub**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select `EcoDash` repository
   - Click "Import"

3. **Configure**
   - **Framework:** Vite
   - **Root Directory:** `./client`
   - **Build Command:** `npm run build`

4. **Environment Variables**
   ```
   VITE_API_URL=https://ecodash-server.onrender.com
   ```

5. **Deploy** → Your site is live! 🎉

### Step 3: Update Backend CORS

1. Go to Render dashboard
2. Select `ecodash-server`
3. Update `CORS_ORIGIN` to your Vercel URL
4. Save and redeploy

## 📊 Free Tier Limits

| Feature | Vercel | Render |
|---------|--------|--------|
| **Cost** | $0 | $0 |
| **Hosting** | Global CDN | US/EU Servers |
| **SSL** | ✅ Included | ✅ Included |
| **Auto-deploy** | ✅ GitHub push | ✅ GitHub push |
| **Performance** | ⚡ Fast | ⚡ Fast (after warmup) |
| **Uptime** | 99.95% | 99.95% |
| **Cold Starts** | None | 30s first call |

## 🔄 Automatic Updates

Every `git push` to `main`:
1. Vercel rebuilds & deploys frontend
2. Render rebuilds & deploys backend
3. Site auto-updates within 2 min

## ⚠️ Known Limitations

**Render Free Tier:**
- Spins down after 15 min inactivity
- First request after spin-down takes ~30 seconds
- Limited to 500 hours/month (covers 24/7 operation)

**Solution:** Use UptimeRobot (free) to ping every 10 min:
- Add monitor for `https://ecodash-server.onrender.com/health`
- Keeps server always awake

## 💡 Next Steps

**To Upgrade Later:**
- Vercel Pro: $20/month (more functions)
- Render Paid: $7/month (always-on, 2GB RAM)
- Custom Domain: $12/year

**Monitor Performance:**
- Render: Dashboard → Metrics
- Vercel: Dashboard → Analytics
- Set alerts for errors

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Update `CORS_ORIGIN` on Render |
| Blank Page | Check console (F12) for errors |
| Slow First Request | Normal on Render free tier (~30s) |
| Cannot connect to API | Verify Render URL in `VITE_API_URL` |

## 📋 Pre-Deployment Checklist

- [ ] All tests pass: `npm test`
- [ ] Production build succeeds: `npm run build`
- [ ] Environment variables configured
- [ ] CORS policy reviewed
- [ ] Error monitoring enabled
- [ ] Performance monitoring enabled

## Environment Variables

### Backend (.env)

```bash
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourdomain.com

# Optional: External services
# HUGGINGFACE_API_KEY=your_key
# DATABASE_URL=your_db_url
# SENTRY_DSN=your_sentry_dsn
```

### Frontend

Configure API URL for production:
```typescript
// client/src/services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.yourdomain.com';
```

## Deployment Options

### Option 1: Vercel + Railway (Recommended for Startups)

#### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set build command: `npm run build --workspace=client`
3. Set output directory: `client/dist`
4. Deploy

#### Backend (Railway)
1. Connect GitHub to Railway
2. Set start command: `npm start --workspace=server`
3. Add environment variables
4. Deploy

### Option 2: Docker (Recommended for Enterprise)

#### Dockerfile (Root)
```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Frontend image
FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY --from=builder /app/client/dist ./dist
EXPOSE 3001
CMD ["npx", "serve", "-s", "dist", "-l", "3001"]

# Backend image
FROM node:20-alpine AS backend
WORKDIR /app/backend
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

#### docker-compose.yml
```yaml
version: '3.9'

services:
  frontend:
    build:
      context: .
      target: frontend
    ports:
      - "3001:3001"
    environment:
      - REACT_APP_API_URL=http://backend:3000

  backend:
    build:
      context: .
      target: backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - CORS_ORIGIN=http://localhost:3001

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=analyzer
      - POSTGRES_PASSWORD=secure_password
      - POSTGRES_DB=impact
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

#### Deploy with Docker
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Option 3: AWS ECS + CloudFront

#### EC2 Instance
1. Launch t3.small instance (Ubuntu 22.04)
2. Install Node.js 20, npm, git
3. Clone repository
4. Configure environment variables
5. Run: `npm install && npm run build && npm start`
6. Use systemd service file for auto-restart

#### CloudFront (CDN)
1. Create distribution pointing to frontend CloudFront
2. Create API CloudFront distribution for backend
3. Set cache policies
4. Enable compression

#### RDS Database (Optional)
1. Create PostgreSQL database
2. Update DATABASE_URL in .env
3. Run migrations

### Option 4: Heroku (Legacy)

#### Procfile
```
web: npm start --workspace=server
release: npm run build --workspace=client
```

#### Deploy
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set NODE_ENV=production
heroku logs -t
```

## Production Best Practices

### 1. Performance Optimization

**Frontend**:
```typescript
// Code splitting with React.lazy
const Results = lazy(() => import('@/pages/Results'));

// Image optimization
import { lazy, Suspense } from 'react';

// Bundle analysis
npm run build -- --stats
```

**Backend**:
- Enable caching headers
- Compress responses with gzip
- Use connection pooling for databases
- Implement rate limiting

### 2. Security

**CORS**:
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST'],
  maxAge: 86400,
}));
```

**Headers**:
```typescript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

**Input Validation**:
```typescript
// Implement request validation
if (description.length < 10 || description.length > 5000) {
  return res.status(400).json({ error: 'Invalid input' });
}
```

### 3. Monitoring & Logging

**Sentry (Error Tracking)**:
```bash
npm install @sentry/node
```

```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.errorHandler());
```

**CloudWatch Logs**:
```bash
# Install AWS SDK
npm install aws-sdk

# Configure logging
AWS_REGION=us-east-1
```

### 4. Database Setup

**PostgreSQL Migration**:
```sql
-- Create assessments table
CREATE TABLE assessments (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(255),
  overall_score INT,
  breakdown JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for fast queries
CREATE INDEX idx_created_at ON assessments(created_at);
```

**Update Server**:
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Store assessment
await pool.query(
  'INSERT INTO assessments (product_name, overall_score, breakdown) VALUES ($1, $2, $3)',
  [name, score.overallScore, JSON.stringify(score.breakdown)]
);
```

### 5. CI/CD Pipeline

#### GitHub Actions (.github/workflows/deploy.yml)

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run build
      - run: |
          # Deploy frontend to Vercel
          npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: |
          # Deploy backend to Railway
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.RAILWAY_TOKEN }}" \
            https://api.railway.app/graphql
```

## Post-Deployment

### 1. Verify Deployment
```bash
# Check health endpoint
curl https://api.yourdomain.com/health

# Test assessment
curl -X POST https://api.yourdomain.com/assess \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "This is a test product assessment",
    "category": "Electronics"
  }'
```

### 2. Monitor Performance
- Set up dashboard in DataDog/New Relic
- Monitor response times (target: <100ms)
- Monitor error rates (target: <0.1%)
- Monitor database query times

### 3. Set Up Alerts
- Response time > 500ms: Alert
- Error rate > 1%: Alert
- Database unavailable: Page on-call
- Daily backup verification: Email

### 4. Backup Strategy
```bash
# Daily PostgreSQL backups to S3
0 2 * * * pg_dump $DATABASE_URL | gzip | aws s3 cp - s3://backups/$(date +%Y-%m-%d).sql.gz
```

## Scaling Considerations

### Horizontal Scaling
- Frontend: Deploy to multiple CDN regions
- Backend: Deploy multiple instances behind load balancer (ALB/NLB)
- Database: Read replicas for analytics queries

### Vertical Scaling
- Increase instance sizes
- Add caching layer (Redis)
- Implement database connection pooling

### Auto-Scaling
```yaml
# AWS Auto Scaling Group
MinSize: 2
MaxSize: 10
DesiredCapacity: 2
TargetTrackingScalingPolicy:
  - TargetValue: 70.0
    PredefinedMetricSpecification:
      PredefinedMetricType: ASGAverageCPUUtilization
```

## Rollback Procedures

### Quick Rollback
```bash
# If deployment fails, revert to previous commit
git revert HEAD
git push origin main

# Docker: Use image tags
docker pull repo/backend:v1.0.0
docker-compose up -d backend
```

### Database Rollback
```sql
-- Create backup before migration
CREATE TABLE assessments_backup AS SELECT * FROM assessments;

-- Rollback if needed
TRUNCATE assessments;
INSERT INTO assessments SELECT * FROM assessments_backup;
```

## Cost Optimization

- **Vercel**: Serverless (pay per request)
- **Railway**: Compute-based ($5-100/month)
- **AWS**: Reserved instances (30% cheaper)
- **Database**: Use read replicas selectively
- **CDN**: CloudFront for static assets

---

## Support & Troubleshooting

**Deployment Issues?**
- Check application logs: `docker logs backend`
- Verify environment variables: `echo $CORS_ORIGIN`
- Test connectivity: `curl http://backend:3000/health`

**Performance Issues?**
- Profile with: `npm run build -- --stats`
- Check database query times
- Monitor memory usage

**Database Issues?**
- Verify connection string format
- Check firewall rules
- Verify credentials

---

Ready to deploy! 🚀

