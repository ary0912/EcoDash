/**
 * Assessment Route
 * 
 * POST /assess
 * 
 * Processes product assessment requests:
 * 1. Accept product description and metadata
 * 2. Extract sustainability signals via NLP
 * 3. Calculate impact scores using transparent logic
 * 4. Return structured JSON response
 */

import { Router, Request, Response } from 'express';
import type { AssessmentRequest, ImpactScore } from '../types/ImpactScore.js';
import { extractNLPFeatures } from '../services/nlpService.js';
import { calculateImpactScore } from '../services/scoringService.js';

const router = Router();

/**
 * POST /assess
 * 
 * Request body:
 * {
 *   "name": "Product name",
 *   "description": "Detailed product description",
 *   "category": "Category name",
 *   "quantity": 1,
 *   "location": "Manufacturing location"
 * }
 */
router.post('/assess', (req: Request<{}, {}, AssessmentRequest>, res: Response<ImpactScore>) => {
  try {
    const { name, description = '', category, quantity = 1, location } = req.body;

    // Validation - name and category required
    if (!name || !category) {
      return res.status(400).json({
        overallScore: 0,
        breakdown: { carbon: 0, water: 0, energy: 0, materials: 0 },
        explanations: {
          carbon: 'Invalid request',
          materials: 'Please provide product name and category',
        },
      } as any);
    }

    // Use name as description if description is empty
    const descriptionToUse = description.trim() || `Product: ${name}`;

    // Extract NLP features from description
    const nlpResult = extractNLPFeatures(descriptionToUse);

    // Calculate impact score
    const score = calculateImpactScore({
      category,
      description: descriptionToUse,
      nlpResult,
      location,
    });

    // Log assessment (for analytics/debugging)
    console.log(`[ASSESS] ${name} (${category}): Overall Score = ${score.overallScore}`);

    return res.json(score);
  } catch (error) {
    console.error('[ASSESS ERROR]', error);
    return res.status(500).json({
      overallScore: 0,
      breakdown: { carbon: 0, water: 0, energy: 0, materials: 0 },
      explanations: {
        carbon: 'Server error',
        materials: 'An error occurred during assessment. Please try again.',
      },
    } as any);
  }
});

export default router;
