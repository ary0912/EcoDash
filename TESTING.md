# Testing Guide - Environmental Impact Analyzer

## Overview

This guide provides comprehensive testing examples and procedures for the Environmental Impact Analyzer application. It covers unit testing, integration testing, API testing, and manual testing with real-world product examples.

---

## Table of Contents

1. [Quick Testing](#quick-testing)
2. [Manual Testing Examples](#manual-testing-examples)
3. [API Testing](#api-testing)
4. [Unit Testing](#unit-testing)
5. [Integration Testing](#integration-testing)
6. [Performance Testing](#performance-testing)
7. [Troubleshooting](#troubleshooting)

---

## Quick Testing

### Start Development Environment

```bash
# From project root
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173 (hot reload enabled)
- **Backend**: http://localhost:3000 (auto-restart on file changes)

### Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-15T10:30:45.123Z"
}
```

---

## Manual Testing Examples

### Test Product 1: Eco-Friendly Cotton T-Shirt

**Form Input:**
```
Product Name: Organic Cotton T-Shirt
Category: Apparel
Quantity: 10
Location: India
Description: 
This t-shirt is made from 100% certified organic cotton grown in India using sustainable farming practices. 
It features FSC-certified button closures and is produced by a GOTS-certified manufacturer. 
The manufacturing process uses renewable energy sources and has achieved B Corp certification. 
No synthetic dyes or chemicals are used in production. 
Water consumption is 30% below industry standards through recycled water usage.
```

**Expected Results:**
- **Overall Score**: 75-85 (Good)
- **Carbon**: ~75 (Good) - local manufacturing, renewable energy
- **Water**: ~80 (Good) - recycled water usage, 30% reduction
- **Energy**: ~70 (Good) - renewable energy sources
- **Materials**: ~85 (Excellent) - organic, certified materials

**Key Explanations:**
- ✓ Organic certification detected
- ✓ FSC-certified materials
- ✓ B Corp certified manufacturer
- ✓ Renewable energy used
- ✓ Water-efficient processes

---

### Test Product 2: Plastic Disposable Bottle

**Form Input:**
```
Product Name: Plastic Water Bottle
Category: Packaging
Quantity: 1000
Location: China
Description:
Single-use plastic water bottle manufactured in China using petroleum-based materials. 
Standard manufacturing process with high energy consumption. 
No recycled content. 
Long supply chain with significant transportation emissions. 
Will end up in landfill or ocean. 
No sustainability certifications. 
Minimal water efficiency measures.
```

**Expected Results:**
- **Overall Score**: 25-35 (Poor)
- **Carbon**: ~30 (Poor) - long transport, petroleum-based
- **Water**: ~25 (Poor) - no water efficiency measures
- **Energy**: ~20 (Critical) - high energy manufacturing
- **Materials**: ~15 (Critical) - virgin plastic, non-recyclable

**Key Explanations:**
- ✗ Virgin plastic material
- ✗ No recycled content
- ✗ Single-use design
- ✗ Long international supply chain
- ✗ No sustainability certifications

---

### Test Product 3: Recycled Aluminum Can

**Form Input:**
```
Product Name: Recycled Aluminum Beverage Can
Category: Packaging
Quantity: 500
Location: USA
Description:
Beverage can made from 50% recycled aluminum content. 
Manufactured in USA using modern energy-efficient processes. 
Aluminum is infinitely recyclable without quality degradation. 
Efficient local supply chain. 
100% recyclable at end of life. 
ISO 14001 certified manufacturing facility. 
Lightweight design reduces transportation emissions.
```

**Expected Results:**
- **Overall Score**: 65-75 (Good)
- **Carbon**: ~70 (Good) - recycled content, local manufacturing
- **Water**: ~65 (Good) - aluminum recycling uses less water
- **Energy**: ~75 (Good) - energy-efficient processes
- **Materials**: ~80 (Excellent) - recyclable, recycled content

**Key Explanations:**
- ✓ Recycled content (50%)
- ✓ Fully recyclable
- ✓ Local manufacturing
- ✓ ISO 14001 certified
- ✓ Lightweight design

---

### Test Product 4: Bamboo Food Container

**Form Input:**
```
Product Name: Bamboo Lunch Box Container
Category: Kitchen & Dining
Quantity: 100
Location: Vietnam
Description:
Food container made from sustainable bamboo harvested from rapidly renewable forests. 
Bamboo grows faster than trees and requires minimal pesticides. 
Manufactured in Vietnam using traditional methods with low energy consumption. 
Non-toxic plant-based finish applied. 
Compostable at end of life - biodegradable within 6 months. 
No harmful chemicals used in production. 
Reduces reliance on plastic containers. 
Certified sustainable forestry practices.
```

**Expected Results:**
- **Overall Score**: 78-88 (Good/Excellent)
- **Carbon**: ~75 (Good) - renewable resource, low energy manufacturing
- **Water**: ~75 (Good) - minimal water in bamboo farming
- **Energy**: ~80 (Good) - low-energy traditional methods
- **Materials**: ~90 (Excellent) - renewable, compostable, non-toxic

**Key Explanations:**
- ✓ Renewable material (bamboo)
- ✓ Compostable/biodegradable
- ✓ Low pesticide use
- ✓ Non-toxic finish
- ✓ Certified sustainable

---

## API Testing

### Using curl

#### Test 1: Basic Assessment

```bash
curl -X POST http://localhost:3000/assess \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Eco-Friendly Bag",
    "category": "Fashion",
    "description": "Bag made from recycled plastic bottles with organic cotton straps. FSC-certified cotton, recycled materials, renewable energy manufacturing."
  }'
```

**Expected Response:**
```json
{
  "productName": "Eco-Friendly Bag",
  "category": "Fashion",
  "overallScore": 72,
  "dimensions": {
    "carbon": 70,
    "water": 75,
    "energy": 68,
    "materials": 80
  },
  "weights": {
    "carbon": 0.4,
    "water": 0.25,
    "energy": 0.2,
    "materials": 0.15
  },
  "explanations": {
    "strengths": [
      "Recycled materials used",
      "Organic certification detected"
    ],
    "improvements": [
      "Consider renewable energy manufacturing"
    ]
  },
  "nlpFeatures": {
    "materials": ["plastic", "cotton"],
    "certifications": ["FSC"],
    "features": {
      "isRecycled": true,
      "isRenewable": true
    }
  }
}
```

---

#### Test 2: Edge Case - Minimal Description

```bash
curl -X POST http://localhost:3000/assess \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Basic Widget",
    "category": "Electronics",
    "description": "A simple electronic widget"
  }'
```

**Expected Response:**
- Score closer to category baseline
- Fewer detected features
- Generic explanations

---

#### Test 3: Error Case - Missing Required Field

```bash
curl -X POST http://localhost:3000/assess \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "category": "Fashion"
  }'
```

**Expected Response (400):**
```json
{
  "error": "Description is required and must be at least 10 characters long"
}
```

---

#### Test 4: Error Case - Invalid Category

```bash
curl -X POST http://localhost:3000/assess \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "category": "InvalidCategory",
    "description": "This is a test product with a longer description"
  }'
```

**Expected Response:**
- Fallback to default baseline (50 points)
- Valid assessment with generic scoring

---

### Using Postman

1. **Create new POST request**
2. **URL**: `http://localhost:3000/assess`
3. **Headers**: 
   - `Content-Type: application/json`
4. **Body** (raw JSON):
```json
{
  "name": "Recycled Plastic Bottle",
  "category": "Packaging",
  "quantity": 100,
  "location": "USA",
  "description": "Bottle made from 100% recycled plastic. Lightweight design reduces transportation emissions. Recyclable at end of life. Manufactured in USA using solar-powered facility with water recycling system."
}
```
5. **Send** and verify response

---

### Using JavaScript/Node.js

```javascript
// test-api.js
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

async function testAssessProduct() {
  try {
    const response = await axios.post(`${API_BASE_URL}/assess`, {
      name: 'Sustainable Sneaker',
      category: 'Fashion',
      description: 'Sneaker made from organic cotton and recycled rubber sole. FSC-certified laces. Manufactured in fair-trade facility with renewable energy. Water-based dyes only. Compostable packaging.',
      quantity: 50,
      location: 'Portugal'
    });

    console.log('✓ Assessment successful');
    console.log('Overall Score:', response.data.overallScore);
    console.log('Dimensions:', response.data.dimensions);
    console.log('Explanations:', response.data.explanations);
  } catch (error) {
    console.error('✗ Assessment failed:', error.response?.data || error.message);
  }
}

async function testHealthCheck() {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    console.log('✓ Backend is healthy:', response.data);
  } catch (error) {
    console.error('✗ Backend health check failed');
  }
}

// Run tests
(async () => {
  await testHealthCheck();
  await testAssessProduct();
})();
```

**Run:**
```bash
node test-api.js
```

---

## Unit Testing

### Testing NLP Service

Create `server/src/services/__tests__/nlpService.test.ts`:

```typescript
import { extractNLPFeatures } from '../nlpService';

describe('NLP Service', () => {
  describe('extractNLPFeatures', () => {
    it('should detect organic materials', () => {
      const description = 'Made from organic cotton with certified organic bamboo';
      const result = extractNLPFeatures(description);
      
      expect(result.materials).toContain('cotton');
      expect(result.materials).toContain('bamboo');
    });

    it('should detect certifications', () => {
      const description = 'FSC-certified wood with GOTS-certified organic cotton';
      const result = extractNLPFeatures(description);
      
      expect(result.certifications).toContain('FSC');
      expect(result.certifications).toContain('GOTS');
    });

    it('should detect recycled content', () => {
      const description = 'Made from 100% recycled plastic bottles and recycled aluminum';
      const result = extractNLPFeatures(description);
      
      expect(result.features.isRecycled).toBe(true);
    });

    it('should detect renewable materials', () => {
      const description = 'Produced from renewable bamboo and sustainably harvested timber';
      const result = extractNLPFeatures(description);
      
      expect(result.features.isRenewable).toBe(true);
    });

    it('should handle empty description', () => {
      const description = '';
      const result = extractNLPFeatures(description);
      
      expect(result.materials).toEqual([]);
      expect(result.certifications).toEqual([]);
    });
  });
});
```

**Run:**
```bash
npm test -- nlpService.test.ts
```

---

### Testing Scoring Service

Create `server/src/services/__tests__/scoringService.test.ts`:

```typescript
import { calculateImpactScore } from '../scoringService';

describe('Scoring Service', () => {
  describe('calculateImpactScore', () => {
    it('should calculate score for excellent eco-product', () => {
      const result = calculateImpactScore({
        category: 'Apparel',
        nlpFeatures: {
          materials: ['cotton', 'bamboo'],
          certifications: ['FSC', 'GOTS', 'B Corp'],
          features: {
            isRecycled: true,
            isRenewable: true,
            isLocalManufactured: true,
            hasEnergyEfficiency: true
          }
        }
      });

      expect(result.overallScore).toBeGreaterThan(75);
      expect(result.dimensions.carbon).toBeGreaterThan(70);
      expect(result.dimensions.materials).toBeGreaterThan(80);
    });

    it('should calculate score for poor quality product', () => {
      const result = calculateImpactScore({
        category: 'Packaging',
        nlpFeatures: {
          materials: ['plastic'],
          certifications: [],
          features: {
            isRecycled: false,
            isRenewable: false,
            isLocalManufactured: false,
            hasEnergyEfficiency: false
          }
        }
      });

      expect(result.overallScore).toBeLessThan(40);
      expect(result.dimensions.materials).toBeLessThan(30);
    });

    it('should weight dimensions correctly', () => {
      const result = calculateImpactScore({
        category: 'Electronics',
        nlpFeatures: {
          materials: [],
          certifications: [],
          features: {
            isRecycled: false,
            isRenewable: false,
            isLocalManufactured: false,
            hasEnergyEfficiency: false
          }
        }
      });

      // Overall = (C*0.4) + (W*0.25) + (E*0.2) + (M*0.15)
      const calculated = 
        (result.dimensions.carbon * 0.4) +
        (result.dimensions.water * 0.25) +
        (result.dimensions.energy * 0.2) +
        (result.dimensions.materials * 0.15);

      expect(result.overallScore).toBe(Math.round(calculated));
    });

    it('should generate valid explanations', () => {
      const result = calculateImpactScore({
        category: 'Fashion',
        nlpFeatures: {
          materials: ['cotton'],
          certifications: ['FSC'],
          features: {
            isRecycled: false,
            isRenewable: true,
            isLocalManufactured: true,
            hasEnergyEfficiency: false
          }
        }
      });

      expect(result.explanations.strengths.length).toBeGreaterThan(0);
      expect(Array.isArray(result.explanations.strengths)).toBe(true);
    });
  });
});
```

**Run:**
```bash
npm test -- scoringService.test.ts
```

---

## Integration Testing

### End-to-End Product Assessment

Create `server/src/__tests__/integration.test.ts`:

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:3000';

describe('Product Assessment Integration Tests', () => {
  describe('POST /assess', () => {
    it('should complete full assessment workflow', async () => {
      const payload = {
        name: 'Test Product',
        category: 'Fashion',
        description: 'Premium organic cotton shirt made with FSC-certified materials'
      };

      const response = await axios.post(`${API_URL}/assess`, payload);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('overallScore');
      expect(response.data).toHaveProperty('dimensions');
      expect(response.data).toHaveProperty('explanations');
      expect(response.data.overallScore).toBeGreaterThanOrEqual(0);
      expect(response.data.overallScore).toBeLessThanOrEqual(100);
    });

    it('should validate required fields', async () => {
      const payload = {
        name: 'Test Product',
        category: 'Fashion'
        // missing description
      };

      try {
        await axios.post(`${API_URL}/assess`, payload);
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('error');
      }
    });

    it('should handle multiple products sequentially', async () => {
      const products = [
        {
          name: 'Eco Product 1',
          category: 'Fashion',
          description: 'Organic cotton with FSC certification'
        },
        {
          name: 'Eco Product 2',
          category: 'Packaging',
          description: 'Recycled plastic bottle with sustainable manufacturing'
        }
      ];

      const results = await Promise.all(
        products.map(p => axios.post(`${API_URL}/assess`, p))
      );

      expect(results).toHaveLength(2);
      expect(results.every(r => r.status === 200)).toBe(true);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await axios.get(`${API_URL}/health`);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('ok');
    });
  });
});
```

**Run:**
```bash
npm test -- integration.test.ts
```

---

## Performance Testing

### Load Testing with Apache Bench

```bash
# Install Apache Bench (if not installed)
# macOS: brew install httpd
# Linux: sudo apt-get install apache2-utils

# Test 100 requests, 10 concurrent
ab -n 100 -c 10 -p payload.json -T application/json http://localhost:3000/assess
```

Create `payload.json`:
```json
{
  "name": "Test Product",
  "category": "Fashion",
  "description": "A sustainable product made from organic materials with fair-trade certification and renewable energy manufacturing processes"
}
```

**Expected Results:**
- Requests per second: >50
- Response time: <100ms average
- No connection errors

---

### Load Testing with autocannon

```bash
npm install -g autocannon

autocannon -c 10 -d 10 http://localhost:3000/health
```

---

## Browser Testing

### Manual Testing Steps

1. **Start Application**
   ```bash
   npm run dev
   ```

2. **Navigate to Frontend**
   ```
   http://localhost:5173
   ```

3. **Test Home Page**
   - [ ] Header displays correctly
   - [ ] 4-step methodology visible
   - [ ] Scoring weights shown (40/25/20/15)
   - [ ] ProductForm displayed

4. **Test ProductForm**
   - [ ] Name field required
   - [ ] Category dropdown works
   - [ ] Description validation (min 10 chars)
   - [ ] Submit button enabled only when valid

5. **Test Results Page**
   - [ ] ScoreCard displays overall score
   - [ ] Color coding correct (80+ green, 60-79 blue, etc.)
   - [ ] ImpactBreakdownChart renders
   - [ ] Dimensions shown with progress bars
   - [ ] Explanations displayed

6. **Test Comparison View** (if implemented)
   - [ ] Can add multiple products
   - [ ] Comparison chart displays
   - [ ] Side-by-side comparison works

---

## Real-World Testing Scenarios

### Scenario 1: Consumer Shopping Decision

**User Flow:**
1. Customer shopping for reusable water bottle
2. Enters product: "Stainless Steel Water Bottle"
3. Description: "Food-grade stainless steel, keeps drinks hot/cold 24 hours, made in USA, 100% recyclable, lifetime warranty, minimal packaging"
4. Reviews score: Should be 70+
5. Compares with plastic alternative
6. Makes sustainable choice

---

### Scenario 2: Corporate Procurement

**User Flow:**
1. Procurement officer evaluating 3 office supply options
2. Tests each product individually
3. Reviews sustainability breakdown
4. Makes bulk purchase decision based on data
5. Documents decision with scores

**Test Products:**
- Option A: Recycled paper (good score expected)
- Option B: Bamboo fiber (excellent score expected)
- Option C: Virgin plastic (poor score expected)

---

### Scenario 3: Product Labeling Verification

**User Flow:**
1. Manufacturer claims product is "eco-friendly"
2. User tests with actual product description
3. Compares claimed benefits with calculated score
4. Validates claims through transparent methodology

---

## Troubleshooting Test Issues

### Backend Not Responding

```bash
# Check if backend is running
curl http://localhost:3000/health

# If not, restart
npm run dev
```

### CORS Errors

```bash
# Verify CORS headers
curl -i http://localhost:3000/health

# Should include:
# Access-Control-Allow-Origin: http://localhost:5173
```

### Build Errors

```bash
# Clean and rebuild
rm -rf client/dist server/dist
npm run build
```

### API Response Empty

```bash
# Verify request format
curl -X POST http://localhost:3000/assess \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","category":"Fashion","description":"This is a test description with more than 10 characters to pass validation"}'
```

---

## Testing Checklist

- [ ] Backend health check returns 200
- [ ] Frontend loads without errors
- [ ] ProductForm validation works
- [ ] API accepts valid requests
- [ ] API rejects invalid requests with 400
- [ ] Scores are between 0-100
- [ ] Weights sum to 1.0 (0.4+0.25+0.2+0.15)
- [ ] Color coding matches score ranges
- [ ] Explanations are generated
- [ ] NLP features detected correctly
- [ ] All 8 categories have baselines
- [ ] Database integration (if added) works
- [ ] Build completes with 0 errors
- [ ] Production build is optimized

---

## Next Steps

1. **Unit Tests**: Implement tests for services
2. **Integration Tests**: Test full workflows
3. **E2E Tests**: Add Cypress or Playwright tests
4. **Performance Tests**: Run load testing suite
5. **Accessibility Tests**: Verify WCAG compliance
6. **Security Tests**: Test input validation, SQL injection prevention

---

## Resources

- **Jest Testing**: https://jestjs.io
- **Cypress E2E**: https://cypress.io
- **Load Testing**: https://autocannon.com
- **Postman Collections**: Export/share API tests
- **API Documentation**: See README.md

