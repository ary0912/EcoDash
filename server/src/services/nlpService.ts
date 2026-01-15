/**
 * NLP Service
 * 
 * Extracts sustainability-related keywords, entities, and features
 * from product descriptions.
 * 
 * Current: Rule-based keyword matching
 * Future: Integration with Hugging Face Transformers for semantic analysis
 */

import type { NLPResult } from '../types/ImpactScore.js';

// Keyword dictionaries for sustainability signals
const MATERIAL_KEYWORDS: Record<string, string[]> = {
  sustainable: ['recycled', 'recycle', 'reused', 'upcycled', 'biodegradable', 'compostable'],
  harmful: ['plastic', 'petroleum', 'virgin', 'synthetic', 'styrofoam', 'non-degradable'],
  certified: ['fsc', 'gots', 'cradle-to-cradle', 'iso 14001', 'b corp'],
};

const CARBON_KEYWORDS: Record<string, string[]> = {
  high: ['coal', 'petroleum', 'fossil fuel', 'high emissions', 'carbon intensive'],
  low: ['renewable', 'carbon neutral', 'net zero', 'solar', 'wind', 'hydro'],
};

const WATER_KEYWORDS: Record<string, string[]> = {
  high: ['water intensive', 'dyeing', 'cotton', 'beef', 'irrigation'],
  low: ['water efficient', 'drought resistant', 'drip irrigation', 'recycled water'],
};

const ENERGY_KEYWORDS: Record<string, string[]> = {
  efficient: ['energy efficient', 'low power', 'led', 'optimized', 'renewable energy'],
  inefficient: ['energy intensive', 'high power consumption', 'incandescent'],
};

const CERTIFICATION_KEYWORDS = [
  'fsc',
  'gots',
  'cradle-to-cradle',
  'iso 14001',
  'b corp',
  'fair trade',
  'organic',
  'carbon trust',
];

const LOCATION_KEYWORDS: Record<string, string[]> = {
  regional: ['local', 'domestic', 'regional', 'made in'],
  shipping_intensive: ['imported', 'overseas', 'china', 'bangladesh', 'vietnam'],
};

/**
 * Extract sustainability features from product description
 */
export function extractNLPFeatures(description: string): NLPResult {
  const lowerDesc = description.toLowerCase();

  // Extract keywords
  const keywords = extractKeywords(lowerDesc);

  // Detect materials
  const materials = detectMaterials(lowerDesc);

  // Detect certifications
  const certifications = detectCertifications(lowerDesc);

  // Assess features
  const features = assessFeatures(lowerDesc, materials, certifications);

  return {
    keywords,
    materials,
    certifications,
    features,
  };
}

/**
 * Extract all sustainability-related keywords
 */
function extractKeywords(text: string): string[] {
  const keywords = new Set<string>();

  // Check all keyword categories
  const allKeywords = [
    ...MATERIAL_KEYWORDS.sustainable,
    ...MATERIAL_KEYWORDS.harmful,
    ...CARBON_KEYWORDS.high,
    ...CARBON_KEYWORDS.low,
    ...WATER_KEYWORDS.high,
    ...WATER_KEYWORDS.low,
    ...ENERGY_KEYWORDS.efficient,
    ...ENERGY_KEYWORDS.inefficient,
    ...CERTIFICATION_KEYWORDS,
  ];

  allKeywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      keywords.add(keyword);
    }
  });

  return Array.from(keywords);
}

/**
 * Detect material types mentioned in description
 */
function detectMaterials(text: string): string[] {
  const commonMaterials = [
    'aluminium',
    'steel',
    'plastic',
    'cotton',
    'wool',
    'silk',
    'polyester',
    'bamboo',
    'cork',
    'rubber',
    'glass',
    'ceramic',
    'leather',
    'recycled',
  ];

  return commonMaterials.filter((material) => text.includes(material));
}

/**
 * Detect sustainability certifications
 */
function detectCertifications(text: string): string[] {
  return CERTIFICATION_KEYWORDS.filter((cert) => text.includes(cert));
}

/**
 * Assess boolean features based on keywords
 */
function assessFeatures(
  text: string,
  materials: string[],
  certifications: string[]
): NLPResult['features'] {
  return {
    isRecycled:
      MATERIAL_KEYWORDS.sustainable.some((k) => text.includes(k)) ||
      materials.includes('recycled'),
    isRenewable:
      MATERIAL_KEYWORDS.sustainable.some((k) => text.includes(k)) ||
      materials.includes('bamboo') ||
      materials.includes('cotton'),
    isLocalManufactured: LOCATION_KEYWORDS.regional.some((k) => text.includes(k)),
    hasEnergyEfficiency: ENERGY_KEYWORDS.efficient.some((k) => text.includes(k)),
  };
}

/**
 * Future: Replace with Hugging Face Transformers
 * 
 * Example integration:
 * ```
 * import { pipeline } from '@huggingface/transformers';
 * 
 * async function extractWithTransformers(text: string): Promise<NLPResult> {
 *   const extractor = await pipeline('ner', 'dbmdz/bert-base-multilingual-cased');
 *   const entities = await extractor(text);
 *   // Process entities into materials, certifications, etc.
 * }
 * ```
 */
