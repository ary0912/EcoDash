# Architecture Documentation

## System Overview

The Environmental Impact Analyzer is a **production-grade, full-stack TypeScript application** designed for assessing and visualizing environmental sustainability of products.

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                  React SPA (Vite)                          │  │
│  │  Home → ProductForm → Results → ComparisonView            │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                             │
                    Axios HTTP Requests
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│              Express.js Server (Node.js)                          │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  CORS Middleware  │  JSON Parser  │  Request Logger       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                   API Routes Layer                          │ │
│  │  GET /health       │  POST /assess                          │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                          │                                        │
│                    Route Handlers                                │
│                          │                                        │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │            Service Layer                                 │  │
│  │  ┌─────────────────────┐  ┌──────────────────────────┐  │  │
│  │  │  NLP Service        │  │  Scoring Service         │  │  │
│  │  │                     │  │                          │  │  │
│  │  │ • Keyword Extraction│  │ • Category Baselines     │  │  │
│  │  │ • Entity Recognition│  │ • Scoring Logic (4 dims) │  │  │
│  │  │ • Feature Detection │  │ • Explanation Generator  │  │  │
│  │  │ • Certification Check│ │ • Weight Calculation     │  │  │
│  │  └─────────────────────┘  └──────────────────────────┘  │  │
│  │             │                        │                     │  │
│  │             └────────────┬───────────┘                     │  │
│  │                          ▼                                 │  │
│  │              ImpactScore (JSON Response)                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                             ▲
                        JSON Response
                             │
                    Back to Frontend
```

## Architectural Layers

### 1. **Presentation Layer (Frontend)**

**Technology**: React 18 + TypeScript + Vite + Tailwind CSS

**Components**:
- `ProductForm`: Input capture with validation
- `ScoreCard`: Overall score display
- `ImpactBreakdownChart`: Recharts visualizations
- `ComparisonView`: Side-by-side product analysis
- `Home`: Landing page
- `Results`: Assessment results display

**State Management**: React hooks (useState, useCallback)
**API Communication**: Axios client with error handling
**Build**: Vite for fast development and production builds

### 2. **API Layer (Express.js)**

**Technology**: Express.js + TypeScript + Node.js 18+

**Endpoints**:
```
GET  /health       → Health check
POST /assess       → Product assessment
```

**Middleware Stack**:
1. CORS (cross-origin requests from frontend)
2. JSON body parser (request parsing)
3. Request logging (debugging)
4. Error handler (graceful error responses)

### 3. **Service Layer (Business Logic)**

#### A. NLP Service (`nlpService.ts`)

**Purpose**: Extract sustainability signals from product descriptions

**Process**:
1. **Keyword Extraction**: Matches against dictionaries
   - Materials (plastic, aluminum, cotton, bamboo, etc.)
   - Certifications (FSC, GOTS, B Corp, etc.)
   - Features (recycled, renewable, energy-efficient, etc.)

2. **Entity Recognition**: Identifies keywords in text
   - Carbon impact indicators (renewable, fossil fuel, etc.)
   - Water usage signals (water intensive, efficient, etc.)
   - Energy signals (LED, high-power, etc.)
   - Material quality indicators

3. **Feature Assessment**: Boolean feature detection
   - `isRecycled`: Contains recycled content
   - `isRenewable`: Made from renewable materials
   - `isLocalManufactured`: Produced nearby (lower transport)
   - `hasEnergyEfficiency`: Energy-efficient design

**Output**: `NLPResult`
```typescript
{
  keywords: string[],
  materials: string[],
  certifications: string[],
  features: {
    isRecycled: boolean,
    isRenewable: boolean,
    isLocalManufactured: boolean,
    hasEnergyEfficiency: boolean
  }
}
```

#### B. Scoring Service (`scoringService.ts`)

**Purpose**: Calculate transparent environmental impact scores

**Methodology**:

1. **Category Baselines**: Default scores per product category
   ```
   Electronics: { carbon: 45, water: 60, energy: 50, materials: 40 }
   Clothing:    { carbon: 50, water: 30, energy: 60, materials: 45 }
   ... etc
   ```

2. **Keyword Adjustments**: Modifies baseline scores
   - Positive signals: +5 to +20 points
   - Negative signals: -5 to -15 points
   - Capped at 0-100 range

3. **Weighted Calculation**:
   ```
   Overall = (Carbon × 0.40) + (Water × 0.25) + (Energy × 0.20) + (Materials × 0.15)
   ```

4. **Explanation Generation**: Human-readable text
   - Grounds explanations in detected features
   - Provides actionable insights

**Output**: `ImpactScore`
```typescript
{
  overallScore: 0-100,
  breakdown: {
    carbon: 0-100,
    water: 0-100,
    energy: 0-100,
    materials: 0-100
  },
  explanations: {
    carbon: string,
    water?: string,
    energy?: string,
    materials: string
  }
}
```

### 4. **Data Layer**

**Current**: In-memory (stateless scoring)

**Future Enhancements**:
- PostgreSQL for historical assessments
- Redis for caching
- Elasticsearch for product indexing

## Request Flow

### Example: Product Assessment

```
1. USER INPUT (Frontend)
   │
   ├─ Name: "Recycled Aluminum Bottle"
   ├─ Category: "Electronics"
   └─ Description: "Made from 100% recycled aluminum..."
   
2. FRONTEND API CALL (Axios)
   │
   └─ POST /assess with AssessmentRequest
   
3. BACKEND PROCESSING
   ├─ Validate request fields
   ├─ Call NLP Service
   │  ├─ Extract keywords from description
   │  ├─ Detect materials (aluminum, recycled, etc.)
   │  └─ Assess features (isRecycled: true, etc.)
   │
   ├─ Call Scoring Service
   │  ├─ Get category baseline (Electronics)
   │  ├─ Adjust scores based on NLP signals
   │  ├─ Calculate weighted overall score
   │  └─ Generate explanations
   │
   └─ Return ImpactScore JSON

4. FRONTEND VISUALIZATION
   ├─ Render ScoreCard (overall score)
   ├─ Render ImpactBreakdownChart (dimensions)
   ├─ Display explanations
   └─ Show improvement suggestions
```

## Type System

All layers use **TypeScript strict mode** for type safety:

**Shared Types** (`server/src/types/` + `client/src/types/`):
- `ImpactScore`: Assessment results
- `AssessmentRequest`: User input
- `NLPResult`: Extracted features
- `ScoringContext`: Intermediate scoring data

**Benefits**:
- Catch errors at compile time
- IDE autocomplete and intellisense
- Self-documenting code
- Type-safe API contracts

## Scoring Logic Transparency

### Decision: Why Transparent Scoring?

**Advantages**:
1. ✅ **Explainability**: Users understand how scores are calculated
2. ✅ **Debuggability**: Issues can be traced to specific keywords
3. ✅ **Auditability**: Stakeholders can verify fairness
4. ✅ **Trustworthiness**: No hidden algorithms

**Trade-offs**:
- Less sophisticated than ML models (initially)
- Requires manual keyword curation
- Easier to game (users can adjust descriptions)

**Mitigation**:
- Clear disclaimers in UI
- Feedback mechanism to improve keywords
- Future ML integration with explainability constraints

## Error Handling

**Frontend**:
- Form validation before submission
- Axios error interceptors
- User-friendly error messages
- Toast notifications (placeholder)

**Backend**:
- Request validation (missing fields, length checks)
- Try-catch error handling
- Structured error responses
- Logging for debugging

## Performance Considerations

**Frontend**:
- Vite for fast builds (<7s)
- Code splitting via Recharts lazy loading
- Tailwind CSS purging unused styles
- Optimized React renders

**Backend**:
- Stateless design (horizontal scaling ready)
- No database queries (fast responses)
- In-memory keyword matching (milliseconds)
- CORS pre-flight optimization

**Typical Response Time**: <100ms per assessment

## Deployment Architecture

```
┌─────────────┐
│   Vercel    │ ← Frontend (React SPA)
│  (client)   │    • Auto-deploy from git
│             │    • CDN edge distribution
└─────────────┘
       │
       │ HTTPS/CORS
       ▼
┌──────────────┐
│   Railway    │ ← Backend (Express.js)
│   (server)   │    • Docker containerized
│              │    • Environment variables
└──────────────┘
```

## Security Considerations

**Current**:
- CORS configured for specific origin
- No sensitive data processing
- Stateless (no session hijacking)

**Future Enhancements**:
- Rate limiting
- Input sanitization
- JWT authentication
- HTTPS enforcement
- OWASP compliance

## Monitoring & Observability

**Planned**:
- Structured logging (Winston)
- Error tracking (Sentry)
- Performance monitoring (Datadog)
- User analytics (Segment)

## Testing Strategy

**Frontend**:
- Unit tests (React Testing Library)
- Component tests (Vitest)
- E2E tests (Playwright)

**Backend**:
- Unit tests (Jest)
- Integration tests (Supertest)
- NLP/Scoring logic tests

## Future Enhancements

### Phase 1: Core Improvements
- User accounts & history
- Product database integration
- Advanced comparison features

### Phase 2: AI Integration
- Hugging Face Transformers for NER
- Sentiment analysis
- Zero-shot classification

### Phase 3: Enterprise
- API tier system
- Bulk assessment
- Custom scoring models
- Integration with procurement systems

---

**This architecture balances transparency, performance, and extensibility for a production-grade sustainability assessment platform.**

