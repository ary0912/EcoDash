/**
 * Scoring Service
 * 
 * Implements transparent, explainable environmental impact scoring.
 * 
 * Methodology:
 * - Carbon: 40% weight
 * - Water: 25% weight
 * - Energy: 20% weight
 * - Materials: 15% weight
 * 
 * Each dimension scores 0-100 based on keyword signals and category defaults.
 */

import type { ImpactScore, ScoringContext } from '../types/ImpactScore.js';

// Category baseline scores (0-100)
// These serve as defaults; adjusted by keyword signals
const CATEGORY_BASELINES: Record<string, ImpactScore['breakdown']> = {
  Electronics: {
    carbon: 45,
    water: 60,
    energy: 50,
    materials: 40,
  },
  'Clothing': {
    carbon: 50,
    water: 30,
    energy: 60,
    materials: 45,
  },
  'Food & Beverage': {
    carbon: 40,
    water: 35,
    energy: 55,
    materials: 50,
  },
  Packaging: {
    carbon: 35,
    water: 70,
    energy: 65,
    materials: 35,
  },
  Furniture: {
    carbon: 50,
    water: 65,
    energy: 60,
    materials: 50,
  },
  Transportation: {
    carbon: 30,
    water: 75,
    energy: 40,
    materials: 55,
  },
  Energy: {
    carbon: 50,
    water: 60,
    energy: 55,
    materials: 60,
  },
  Other: {
    carbon: 50,
    water: 50,
    energy: 50,
    materials: 50,
  },
};

/**
 * Calculate comprehensive environmental impact score
 */
export function calculateImpactScore(context: ScoringContext): ImpactScore {
  // Get category baseline
  const category = context.category || 'Other';
  const baseline = CATEGORY_BASELINES[category] || CATEGORY_BASELINES.Other;

  // Adjust scores based on NLP signals
  const breakdown = {
    carbon: adjustCarbonScore(baseline.carbon, context),
    water: adjustWaterScore(baseline.water, context),
    energy: adjustEnergyScore(baseline.energy, context),
    materials: adjustMaterialsScore(baseline.materials, context),
  };

  // Calculate weighted overall score
  const overallScore = Math.round(
    breakdown.carbon * 0.4 +
    breakdown.water * 0.25 +
    breakdown.energy * 0.2 +
    breakdown.materials * 0.15
  );

  // Generate explanations
  const explanations = generateExplanations(breakdown, context);

  return {
    overallScore,
    breakdown,
    explanations,
  };
}

/**
 * Adjust carbon score based on keywords and context
 * 
 * Positive signals: renewable, carbon neutral, low emissions
 * Negative signals: coal, fossil fuel, high emissions
 */
function adjustCarbonScore(baseline: number, context: ScoringContext): number {
  let score = baseline;
  const { nlpResult, location } = context;

  // Positive signals
  if (nlpResult.keywords.includes('renewable')) score += 15;
  if (nlpResult.keywords.includes('carbon neutral')) score += 20;
  if (nlpResult.keywords.includes('net zero')) score += 20;
  if (nlpResult.features.isLocalManufactured) score += 10;

  // Negative signals
  if (nlpResult.keywords.includes('coal')) score -= 15;
  if (nlpResult.keywords.includes('fossil fuel')) score -= 15;
  if (nlpResult.keywords.includes('petroleum')) score -= 10;

  // Location adjustment (rough estimation)
  if (location && isHighEmissionRegion(location)) score -= 10;

  return Math.max(0, Math.min(100, score));
}

/**
 * Adjust water score
 * 
 * Positive signals: water efficient, recycled water
 * Negative signals: water intensive, cotton (high water use)
 */
function adjustWaterScore(baseline: number, context: ScoringContext): number {
  let score = baseline;
  const { nlpResult } = context;

  // Positive signals
  if (nlpResult.keywords.includes('water efficient')) score += 15;
  if (nlpResult.keywords.includes('drip irrigation')) score += 10;

  // Negative signals
  if (nlpResult.keywords.includes('water intensive')) score -= 15;
  if (nlpResult.keywords.includes('dyeing')) score -= 10;
  if (nlpResult.materials.includes('cotton')) score -= 5;

  return Math.max(0, Math.min(100, score));
}

/**
 * Adjust energy score
 * 
 * Positive signals: energy efficient, LED, low power
 * Negative signals: energy intensive, high power consumption
 */
function adjustEnergyScore(baseline: number, context: ScoringContext): number {
  let score = baseline;
  const { nlpResult } = context;

  // Positive signals
  if (nlpResult.features.hasEnergyEfficiency) score += 15;
  if (nlpResult.keywords.includes('led')) score += 10;
  if (nlpResult.keywords.includes('renewable energy')) score += 12;

  // Negative signals
  if (nlpResult.keywords.includes('energy intensive')) score -= 15;
  if (nlpResult.keywords.includes('high power consumption')) score -= 10;

  return Math.max(0, Math.min(100, score));
}

/**
 * Adjust materials score
 * 
 * Positive signals: recycled, biodegradable, certifications
 * Negative signals: virgin plastic, non-degradable
 */
function adjustMaterialsScore(baseline: number, context: ScoringContext): number {
  let score = baseline;
  const { nlpResult } = context;

  // Positive signals
  if (nlpResult.features.isRecycled) score += 15;
  if (nlpResult.features.isRenewable) score += 10;
  if (nlpResult.keywords.includes('biodegradable')) score += 12;
  if (nlpResult.certifications.length > 0) score += 10 * nlpResult.certifications.length;

  // Negative signals
  if (nlpResult.materials.includes('plastic')) score -= 8;
  if (nlpResult.keywords.includes('virgin')) score -= 10;

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate human-readable explanations
 */
function generateExplanations(
  breakdown: ImpactScore['breakdown'],
  context: ScoringContext
): ImpactScore['explanations'] {
  const { nlpResult } = context;

  const carbonExpl = generateCarbonExplanation(breakdown.carbon, nlpResult.keywords);
  const materialsExpl = generateMaterialsExplanation(breakdown.materials, nlpResult);

  return {
    carbon: carbonExpl,
    water: generateWaterExplanation(breakdown.water, nlpResult.keywords),
    energy: generateEnergyExplanation(breakdown.energy, nlpResult.keywords),
    materials: materialsExpl,
  };
}

function generateCarbonExplanation(score: number, keywords: string[]): string {
  if (keywords.includes('renewable')) {
    return 'Uses renewable energy sources, reducing carbon footprint.';
  }
  if (keywords.includes('carbon neutral')) {
    return 'Manufactured with carbon-neutral processes.';
  }
  if (score >= 70) {
    return 'Low carbon manufacturing process with minimal transportation impact.';
  }
  if (score >= 50) {
    return 'Moderate carbon footprint. Consider sourcing with lower-carbon methods.';
  }
  return 'High carbon footprint due to manufacturing process and/or transportation.';
}

function generateWaterExplanation(score: number, keywords: string[]): string {
  if (keywords.includes('water efficient')) {
    return 'Designed with water conservation in mind.';
  }
  if (score >= 70) {
    return 'Minimal water consumption in production and use.';
  }
  if (score >= 50) {
    return 'Moderate water usage. Could be reduced with efficient alternatives.';
  }
  return 'High water consumption, especially relevant for textile and agricultural products.';
}

function generateEnergyExplanation(score: number, keywords: string[]): string {
  if (keywords.includes('energy efficient')) {
    return 'Designed for optimal energy performance and minimal consumption.';
  }
  if (score >= 70) {
    return 'Excellent energy efficiency over product lifetime.';
  }
  if (score >= 50) {
    return 'Average energy profile. Modern efficient alternatives may be available.';
  }
  return 'High energy consumption. Consider energy-efficient alternatives.';
}

function generateMaterialsExplanation(score: number, nlpResult: any): string {
  const signals: string[] = [];

  if (nlpResult.features.isRecycled) {
    signals.push('contains recycled content');
  }
  if (nlpResult.features.isRenewable) {
    signals.push('uses renewable materials');
  }
  if (nlpResult.certifications.length > 0) {
    signals.push(`certified (${nlpResult.certifications.join(', ')})`);
  }

  if (signals.length > 0) {
    return `${signals[0].charAt(0).toUpperCase() + signals[0].slice(1)}. ${signals.slice(1).join('. ')}`;
  }

  if (score >= 70) {
    return 'Materials are sustainably sourced and managed.';
  }
  if (score >= 50) {
    return 'Materials have moderate sustainability profile. Look for certifications.';
  }
  return 'Materials raise sustainability concerns. Consider alternatives.';
}

/**
 * Helper: Determine if location is high-emission region
 * (This is a simplified heuristic; real implementation would use actual data)
 */
function isHighEmissionRegion(location: string): boolean {
  const highEmissionRegions = ['china', 'india', 'bangladesh', 'vietnam'];
  return highEmissionRegions.some((region) => location.toLowerCase().includes(region));
}
