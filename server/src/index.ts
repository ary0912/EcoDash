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
import 'dotenv/config';
import assessRoutes from './routes/assess.js';

const app = express();

// Environment
const PORT = process.env.PORT || 3000;
const CORS_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:5176',
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl requests)
    if (!origin) return callback(null, true);
    if (CORS_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Assessment API
app.use('/', assessRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
    method: req.method,
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Environmental Impact Analyzer Server running on port ${PORT}`);
  console.log(`📊 CORS enabled for: ${CORS_ORIGINS.join(', ')}`);
  console.log(`🏥 Health check: GET http://localhost:${PORT}/health`);
  console.log(`🔍 Assessment: POST http://localhost:${PORT}/assess`);
});
