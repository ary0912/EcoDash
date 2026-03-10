/**
 * API Client
 *
 * Handles communication between the React frontend and the backend API.
 * Provides:
 * - Axios instance configuration
 * - Error handling
 * - Request/response interceptors
 * - Typed API calls
 */

import axios, { AxiosError } from "axios";
import type { ImpactScore, AssessmentRequest } from "@/types/ImpactScore";

/**
 * Base API URL
 *
 * Uses environment variable in production.
 * Falls back to localhost during development.
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

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
 * Logs requests in development
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
 * Logs responses and handles global errors
 */
client.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(
        `📥 API Response ← ${response.config.url}`,
        response.data
      );
    }
    return response;
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error("❌ API Error:", error);
    }

    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      "Unknown error occurred";

    return Promise.reject(new Error(message));
  }
);

/**
 * Assess environmental impact of a product
 *
 * Sends product data to backend scoring engine.
 *
 * @param request - Product assessment payload
 * @returns ImpactScore result
 */
export async function assessProduct(
  request: AssessmentRequest
): Promise<ImpactScore> {
  const response = await client.post<ImpactScore>("/assess", request);
  return response.data;
}

/**
 * Compare two products
 * (Optional future feature if backend supports it)
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
 *
 * Used to verify backend availability.
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await client.get("/health");
    return response.status === 200;
  } catch (error) {
    console.warn("⚠️ Backend health check failed");
    return false;
  }
}

/**
 * Export Axios instance for advanced usage
 */
export default client;