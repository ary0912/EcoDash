
# EcoDash

# Environmental Impact Analyzer

A production-grade, UI-driven web application that empowers users to make informed, sustainable product choices through transparent environmental impact assessment.

## 🌍 Problem Statement

Consumer products have complex environmental footprints across carbon, water, energy, and materials. Current sustainability information is fragmented—scattered across certifications, datasheets, and marketing claims. Users lack a unified, accessible way to compare products and understand their environmental trade-offs.

## 🎯 Solution

**Environmental Impact Analyzer** provides:
- **Unified Assessment**: Analyze any product in seconds with a single description
- **Multi-dimensional Scoring**: Comprehensive breakdown across four sustainability factors
- **Transparency**: All scoring logic is explainable and rule-based (no "black box" AI)
- **Side-by-side Comparison**: Compare alternative products to make informed decisions
- **Accessible UI**: Clean, professional interface designed for rapid decision-making

## 👥 Target Users

1. **Conscious Consumers**: Individuals making purchasing decisions aligned with their values
2. **Procurement Teams**: Corporate buyers evaluating supplier sustainability
3. **Product Managers**: Teams assessing environmental impact of their offerings
4. **Sustainability Consultants**: Professionals advising on product improvements
5. **Educators**: Teaching sustainability principles and trade-offs

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React + TypeScript)         │
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │ ProductForm    │  │ ScoreCard    │  │  Charts     │  │
│  └────────────────┘  └──────────────┘  └─────────────┘  │
│         │                    │                    │       │
│         └────────┬───────────┴────────────────────┘       │
│                  │ Axios HTTP                             │
└──────────────────┼──────────────────────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
┌───▼─────────────────────────────────────┐
│  API Gateway & CORS                     │
│  http://localhost:3000                  │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│     Backend (Node.js + Express)         │
│  ┌─────────┐  ┌──────────────────────┐ │
│  │  NLP    │  │   Scoring Service    │ │
│  │ Service │  │  (Transparent Logic) │ │
│  └─────────┘  └──────────────────────┘ │
│         │                    │          │
│         └────────┬───────────┘          │
│                  │                      │
│         ImpactScore Result              │
└─────────────────────────────────────────┘
```

### Key Layers

#### Frontend (React + TypeScript)
- **ProductForm**: Collects user input with validation
- **Home**: Entry point with methodology explanation
- **Results**: Visualizes impact scores and explanations
- **Components**: Reusable UI elements (charts, cards)
- **Services**: API communication layer
- **Types**: Strong TypeScript definitions

#### Backend (Express + TypeScript)
- **API Routes** (`/assess`): Request handling and validation
- **NLP Service**: Keyword extraction and entity recognition
- **Scoring Service**: Transparent, explainable impact calculation
- **Types**: Shared data structures

## 🤖 AI / NLP Layer

### Current Implementation

The NLP service uses **rule-based keyword extraction**:

1. **Material Detection**: Identifies materials (plastic, aluminum, cotton, etc.)
2. **Certification Recognition**: Extracts certifications (FSC, GOTS, B Corp, etc.)
3. **Sustainability Signals**: Detects keywords like "recycled," "renewable," "energy efficient"
4. **Feature Extraction**: Assesses boolean features:
   - `isRecycled`: Contains recycled content
   - `isRenewable`: Made from renewable resources
   - `isLocalManufactured`: Local production (lower transport emissions)
   - `hasEnergyEfficiency`: Energy-efficient design

### Explainability

All AI signals are **transparent and auditable**:
- Keyword lists are defined and visible in code
- Each score adjustment is traceable to specific signals
- Users see explanations grounded in their product description

### Future Enhancements

Integration with **Hugging Face Transformers**:

```typescript
// Placeholder for future implementation
import { pipeline } from '@huggingface/transformers';

async function extractWithSemanticNLP(text: string) {
  // Named Entity Recognition (NER) for materials, certifications
  // Sentiment analysis for environmental claims
  // Zero-shot classification for sustainability categories
}
```

**Responsible AI Guidelines**:
- ✅ AI supports decision-making, not replaces human judgment
- ✅ All model predictions are explainable
- ✅ No personal data collection or processing
- ✅ Results include confidence indicators and disclaimers
- ✅ Model bias testing and fairness evaluation

## 📊 Scoring Methodology

### Dimensions & Weights

| Dimension | Weight | Measured By |
|-----------|--------|-------------|
| **Carbon** | 40% | Manufacturing emissions, transport, supply chain |
| **Water** | 25% | Water consumption in production & use |
| **Energy** | 20% | Energy efficiency over product lifetime |
| **Materials** | 15% | Recycled content, renewability, biodegradability |

### Scoring Logic

1. **Category Baseline**: Each product category has default scores
2. **Keyword Adjustment**: Scores adjust based on detected signals
3. **Weighted Calculation**: Overall score = (C×0.4) + (W×0.25) + (E×0.2) + (M×0.15)
4. **Explanation Generation**: Human-readable summaries for each dimension

### Example Scoring

**Product**: Recycled Aluminum Water Bottle

```
Category Baseline (Electronics): Carbon=45, Water=60, Energy=50, Materials=40

Keyword Adjustments:
+ "recycled" → Materials +15 (60)
+ "aluminum" → no penalty (still 45)
+ "reusable" → Energy +10 (60)

Final Breakdown:
- Carbon: 45/100 (Average)
- Water: 60/100 (Good)
- Energy: 60/100 (Good)
- Materials: 60/100 (Good)

Overall: (45×0.4) + (60×0.25) + (60×0.2) + (60×0.15) = 54.5 → 55/100
```

## 🎨 UI Design Principles

### Visual Hierarchy

1. **Dominant**: Overall sustainability score (large, color-coded)
2. **Secondary**: Dimension breakdown (bar/radar charts)
3. **Tertiary**: Detailed explanations and improvements

### Color Coding

- 🟢 **80-100** (Excellent): Solid green (`#10b981`)
- 🔵 **60-79** (Good): Blue (`#3b82f6`)
- 🟡 **40-59** (Fair): Amber (`#f59e0b`)
- 🔴 **20-39** (Poor): Red (`#ef4444`)
- 🟥 **0-19** (Critical): Dark red (`#dc2626`)

### Decision Support

The UI enables informed decisions through:
- Clear, comparable metrics
- Visual trend indicators
- Actionable improvement suggestions
- Side-by-side product comparison

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0

### Installation

1. **Clone or download the repository**

```bash
cd environmental-impact-analyzer
```

2. **Install dependencies**

```bash
npm install
```

This installs dependencies for both `client/` and `server/` workspaces.

### Development

1. **Start both frontend and backend in development mode**

```bash
npm run dev
```

This runs:
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:3000

2. **Frontend only**

```bash
npm run dev --workspace=client
# or
cd client && npm run dev
```

3. **Backend only**

```bash
npm run dev --workspace=server
# or
cd server && npm run dev
```

### Production Build

```bash
npm run build
```

Generates optimized builds in:
- `client/dist/` (React SPA)
- `server/dist/` (Node.js executable)

### Production Run

```bash
npm start
```

Starts the backend server on port 3000 (frontend must be built separately and served).

## 📁 Project Structure

```
environmental-impact-analyzer/
├── client/                          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.tsx      # Product input form
│   │   │   ├── ScoreCard.tsx        # Overall score display
│   │   │   ├── ImpactBreakdownChart.tsx  # Recharts visualization
│   │   │   └── ComparisonView.tsx   # Side-by-side comparison
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Landing page
│   │   │   └── Results.tsx          # Results visualization
│   │   ├── services/
│   │   │   └── api.ts               # Axios API client
│   │   ├── types/
│   │   │   └── ImpactScore.ts       # TypeScript interfaces
│   │   ├── App.tsx                  # Root component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Tailwind styles
│   ├── package.json                 # Frontend dependencies
│   ├── tsconfig.json                # TypeScript config
│   ├── vite.config.ts               # Vite config with API proxy
│   ├── tailwind.config.js           # Tailwind customization
│   ├── postcss.config.js            # PostCSS config
│   └── index.html                   # HTML template
│
├── server/                          # Node.js + Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   └── assess.ts            # POST /assess endpoint
│   │   ├── services/
│   │   │   ├── nlpService.ts        # Keyword extraction
│   │   │   └── scoringService.ts    # Impact calculation
│   │   ├── types/
│   │   │   └── ImpactScore.ts       # TypeScript interfaces
│   │   └── index.ts                 # Express app & server
│   ├── package.json                 # Server dependencies
│   ├── tsconfig.json                # TypeScript config
│   └── .env.example                 # Environment template
│
├── package.json                     # Root monorepo config
├── tsconfig.json                    # Root TypeScript config
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## 🔌 API Reference

### POST /assess

Assess environmental impact of a product.

**Request:**
```json
{
  "name": "Recycled Aluminum Water Bottle",
  "description": "12oz water bottle made from 100% recycled aluminum. Manufactured locally in Oregon. BPA-free coating. Designed for durability and reusability.",
  "category": "Electronics",
  "quantity": 1,
  "location": "USA"
}
```

**Response:**
```json
{
  "overallScore": 72,
  "breakdown": {
    "carbon": 65,
    "water": 80,
    "energy": 70,
    "materials": 75
  },
  "explanations": {
    "carbon": "Aluminium production increases carbon footprint, but local manufacturing reduces transport emissions.",
    "water": "Minimal water use in manufacturing and recycled process.",
    "energy": "Reusable design reduces per-use energy impact over product lifetime.",
    "materials": "Contains recycled materials and is fully recyclable."
  }
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid request (missing fields, too short description)
- `500`: Server error

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

## 🔧 Configuration

### Environment Variables (Server)

Create `server/.env`:

```bash
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173

# Future: External service integrations
# HUGGINGFACE_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here
```

### Frontend API URL

Set via environment variable or hardcoded in `client/src/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

## 📈 Extending the System

### Adding a New Impact Dimension

1. **Update Types** (`server/src/types/ImpactScore.ts`):
```typescript
breakdown: {
  carbon: number;
  water: number;
  energy: number;
  materials: number;
  waste: number;  // New dimension
}
```

2. **Add Keywords** (`server/src/services/nlpService.ts`):
```typescript
const WASTE_KEYWORDS = {
  high: ['packaging', 'single-use', 'disposable'],
  low: ['minimal packaging', 'reusable', 'bulk'],
};
```

3. **Implement Scoring** (`server/src/services/scoringService.ts`):
```typescript
function adjustWasteScore(baseline: number, context: ScoringContext): number {
  // Score logic
}
```

4. **Update UI** (frontend components)

### Integrating Hugging Face Transformers

```bash
npm install --save-dev @huggingface/transformers
```

Then update `nlpService.ts` to use semantic NLP instead of keyword matching.

### Adding Authentication

```bash
npm install jsonwebtoken bcryptjs
```

Implement JWT middleware in `server/src/index.ts`.

## 🧪 Testing

Run tests (placeholder):

```bash
npm test
```

## 🛠️ Development Tools

- **Frontend**: Vite, React, TypeScript, Tailwind CSS
- **Backend**: Express, TypeScript
- **Visualization**: Recharts
- **HTTP Client**: Axios
- **Runtime**: Node.js ≥18

## 📝 License

Proprietary. Built for consulting delivery.

## 🤝 Support & Feedback

For questions or improvements, contact the development team.

---

**Built with transparency, scalability, and user-centric design in mind.**

