import axios from 'axios';
import type { ImpactScore, AssessmentRequest } from '@/types/ImpactScore';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Assess environmental impact of a product
 * 
 * @param request - Product assessment data
 * @returns Impact score breakdown
 */
export async function assessProduct(request: AssessmentRequest): Promise<ImpactScore> {
  try {
    const response = await client.post<ImpactScore>('/assess', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`Assessment failed: ${message}`);
    }
    throw error;
  }
}

/**
 * Health check endpoint
 */
export async function healthCheck(): Promise<boolean> {
  try {
    await client.get('/health');
    return true;
  } catch {
    return false;
  }
}

export default client;
