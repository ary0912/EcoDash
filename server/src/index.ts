/**
 * Main Server Entry Point
 *
 * Initializes Express server with:
 * - CORS middleware for frontend communication
 * - JSON body parsing
 * - Assessment API routes
 * - Health check endpoint
 */

import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import assessRoutes from "./routes/assess.js";

dotenv.config();

const app = express();

/**
 * Fix for __dirname in ES modules
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Environment Variables
 */
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

/**
 * Client build directory
 */
const clientDistPath = path.resolve(__dirname, "../../client/dist");

/**
 * Allowed CORS origins
 */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  ...(process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
    : []),
];

/**
 * Middleware
 */
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests without origin (Postman, curl)
      if (!origin) return callback(null, true);

      // allow Vercel domains automatically
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("Blocked CORS request from:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

/**
 * Health Check Endpoint
 */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 */
app.use("/", assessRoutes);

/**
 * Serve Frontend in Production
 */
if (NODE_ENV === "production") {
  console.log("📦 Running in production mode");

  const distExists = fs.existsSync(clientDistPath);

  if (!distExists) {
    console.warn("⚠️ Client build not found at:", clientDistPath);
  } else {
    console.log("📁 Serving frontend from:", clientDistPath);

    app.use(
      express.static(clientDistPath, {
        maxAge: "1h",
      })
    );

    /**
     * SPA Fallback
     */
    app.get("*", (req, res) => {
      res.sendFile(path.join(clientDistPath, "index.html"));
    });
  }
}

/**
 * 404 Handler (development)
 */
if (NODE_ENV !== "production") {
  app.use((req, res) => {
    res.status(404).json({
      error: "Not found",
      path: req.path,
      method: req.method,
    });
  });
}

/**
 * Global Error Handler
 */
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("❌ Unhandled Error:", err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
      error: "Internal Server Error",
      message:
        NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
      ...(NODE_ENV === "development" && { stack: err.stack }),
    });
  }
);

/**
 * Start Server
 */
app.listen(PORT, () => {
  console.log("🌱 Environmental Impact Analyzer API Running");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🏥 Health Check: /health`);
  console.log(`🔍 Assessment API: POST /assess`);
});