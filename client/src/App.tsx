import React, { useState } from 'react';
import { Home } from '@/pages/Home';
import { Results } from '@/pages/Results';
import type { ImpactScore } from '@/types/ImpactScore';

type AppPage = 'home' | 'results';

interface AssessmentResult {
  productName: string;
  score: ImpactScore;
}

/**
 * App Root Component
 * 
 * Manages navigation between:
 * - Home: Product assessment input
 * - Results: Impact score visualization
 * 
 * Maintains global assessment state for comparison workflows.
 */
export function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setCurrentPage('results');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setAssessmentResult(null);
  };

  return (
    <>
      {currentPage === 'home' ? (
        <Home onAssessmentComplete={handleAssessmentComplete} />
      ) : assessmentResult ? (
        <Results
          productName={assessmentResult.productName}
          score={assessmentResult.score}
          onBackToHome={handleBackToHome}
        />
      ) : null}
    </>
  );
}
