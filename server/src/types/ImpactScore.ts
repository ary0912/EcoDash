/**
 * Environmental Impact Score (Backend)
 * 
 * Shared type definitions for server-side impact assessment.
 */
export interface ImpactScore {
  overallScore: number;
  breakdown: {
    carbon: number;
    water: number;
    energy: number;
    materials: number;
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
 */
export interface AssessmentRequest {
  name: string;
  description: string;
  category: string;
  quantity?: number;
  location?: string;
}

/**
 * NLP Extraction Result
 * 
 * Output of keyword and entity extraction from product description
 */
export interface NLPResult {
  keywords: string[];
  materials: string[];
  certifications: string[];
  features: {
    isRecycled: boolean;
    isRenewable: boolean;
    isLocalManufactured: boolean;
    hasEnergyEfficiency: boolean;
  };
}

/**
 * Scoring Context
 * 
 * Intermediate data structure for impact calculation
 */
export interface ScoringContext {
  category: string;
  description: string;
  nlpResult: NLPResult;
  location?: string;
}
