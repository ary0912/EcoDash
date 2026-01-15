/**
 * Environmental Impact Score
 * 
 * Represents the comprehensive environmental impact assessment of a product
 * across multiple dimensions: carbon, water, energy, and materials.
 */
export interface ImpactScore {
  overallScore: number; // 0-100
  breakdown: {
    carbon: number;      // 0-100, weight: 40%
    water: number;       // 0-100, weight: 25%
    energy: number;      // 0-100, weight: 20%
    materials: number;   // 0-100, weight: 15%
  };
  explanations: {
    carbon: string;
    water?: string;
    energy?: string;
    materials: string;
  };
}

/**
 * Product Assessment Request
 * 
 * Captured from user input form
 */
export interface AssessmentRequest {
  name: string;
  description: string;
  category: string;
  quantity?: number;
  location?: string;
}

/**
 * Comparison Result
 * 
 * Used for side-by-side product comparison
 */
export interface ComparisonResult {
  products: Array<{
    id: string;
    name: string;
    score: ImpactScore;
  }>;
}
