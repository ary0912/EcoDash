/**
 * Main Server Entry Point
 * 
 * Initializes Express server with:
 * - CORS middleware for frontend communication
 * - JSON body parsing
 * - Assessment API routes
 * - Health check endpoint
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import assessRoutes from './routes/assess.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Environment
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const clientDistPath = path.resolve(__dirname, '../../client/dist');
const CORS_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:5176',
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()) : []),
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl requests)
    if (!origin) return callback(null, true);
    // In production, allow same-origin (frontend served from same domain)
    if (NODE_ENV === 'production' && !origin.startsWith('http://localhost')) {
      return callback(null, true);
    }
    // Check against allowed origins
    if (CORS_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Serve static files from client build in production
if (NODE_ENV === 'production') {
  console.log(`📁 Serving static files from: ${clientDistPath}`);
  console.log(`📁 Client dist exists: ${fs.existsSync(clientDistPath)}`);
  app.use(express.static(clientDistPath, {
    maxAge: '1h',
    etag: false
  }));
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Assessment API
app.use('/', assessRoutes);

// Serve frontend for all other routes (SPA fallback in production)
if (NODE_ENV === 'production') {
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/assess') || req.path.startsWith('/compare')) {
      return next();
    }
    const indexPath = path.join(clientDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({
        error: 'Not found',
        path: req.path,
        details: `Client dist not found at ${clientDistPath}`
      });
    }
  });
}

// 404 handler (dev only)
if (NODE_ENV !== 'production') {
  app.use((req, res) => {
    res.status(404).json({
      error: 'Not found',
      path: req.path,
      method: req.method,
    });
  });
}

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: 'Internal server error',
    message: NODE_ENV === 'development' ? err.message : 'An error occurred',
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Environmental Impact Analyzer Server running on port ${PORT}`);
  console.log(`📊 CORS enabled for: ${CORS_ORIGINS.join(', ')}`);
  console.log(`🏥 Health check: GET http://localhost:${PORT}/health`);
  console.log(`🔍 Assessment: POST http://localhost:${PORT}/assess`);
});
