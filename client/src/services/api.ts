/**
 * API Client
 *
 * Handles communication between the React frontend and backend API.
 * Includes:
 * - Axios configuration
 * - Logging interceptors
 * - Typed API calls
 */

import axios, { AxiosError } from "axios";
import type { ImpactScore, AssessmentRequest } from "@/types/ImpactScore";

/**
 * Base API URL
 *
 * Priority:
 * 1. VITE_API_URL (production – Vercel → Render API)
 * 2. /api (development – proxied via Vite dev server)
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

/**
 * Axios Client Instance
 */
const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 */
client.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(
        `📤 API Request → ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */
client.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`📥 API Response ← ${response.config.url}`, response.data);
    }

    return response;
  },
  (error: AxiosError<{ message?: string }>) => {
    if (import.meta.env.DEV) {
      console.error("❌ API Error:", error);
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      "Unknown API error";

    return Promise.reject(new Error(message));
  }
);

/**
 * Assess environmental impact of a product
 */
export async function assessProduct(
  request: AssessmentRequest
): Promise<ImpactScore> {
  const response = await client.post<ImpactScore>("/assess", request);
  return response.data;
}

/**
 * Compare two products (future feature)
 */
export async function compareProducts(
  products: AssessmentRequest[]
): Promise<ImpactScore[]> {
  const response = await client.post<ImpactScore[]>("/compare", {
    products,
  });
  return response.data;
}

/**
 * Health Check
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await client.get("/health");
    return response.status === 200;
  } catch {
    console.warn("⚠️ Backend health check failed");
    return false;
  }
}

/**
 * Export Axios instance
 */
export default client;