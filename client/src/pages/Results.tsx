import React from 'react';
import { ScoreCard } from '@/components/ScoreCard';
import { ImpactBreakdownChart } from '@/components/ImpactBreakdownChart';
import type { ImpactScore } from '@/types/ImpactScore';
import { ArrowLeft, TrendingUp, Lightbulb } from 'lucide-react';

interface ResultsProps {
  productName: string;
  score: ImpactScore;
  onBackToHome: () => void;
}

/**
 * Results Page - Premium Experience
 *
 * Comprehensive environmental impact visualization:
 * - Animated score card with detailed breakdown
 * - Interactive charts and comparisons
 * - Actionable insights with recommendations
 * - Comparison tools and next steps
 */
export const Results: React.FC<ResultsProps> = ({ productName, score, onBackToHome }) => {
  const getDimensionIcon = (key: string): string => {
    const icons: Record<string, string> = {
      carbon: '🔥',
      water: '💧',
      energy: '⚡',
      materials: '♻️',
    };
    return icons[key] || '📊';
  };

  const getDimensionStatus = (value: number): { label: string; bg: string; text: string } => {
    if (value >= 80) return { label: 'Excellent', bg: 'bg-green-100', text: 'text-green-700' };
    if (value >= 60) return { label: 'Good', bg: 'bg-blue-100', text: 'text-blue-700' };
    if (value >= 40) return { label: 'Fair', bg: 'bg-amber-100', text: 'text-amber-700' };
    if (value >= 20) return { label: 'Poor', bg: 'bg-red-100', text: 'text-red-700' };
    return { label: 'Critical', bg: 'bg-rose-100', text: 'text-rose-700' };
  };

  const dimensions = [
    { key: 'carbon', label: 'Carbon', weight: '40%' },
    { key: 'water', label: 'Water', weight: '25%' },
    { key: 'energy', label: 'Energy', weight: '20%' },
    { key: 'materials', label: 'Materials', weight: '15%' },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-gray-900">Results for {productName}</h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Score Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left: Main Score Card */}
            <div className="lg:col-span-1">
              <ScoreCard score={score} />
            </div>

            {/* Right: Impact Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dimension Cards */}
              <div className="grid grid-cols-2 gap-4">
                {dimensions.map(({ key, label, weight }) => {
                  const value = score.breakdown[key as keyof typeof score.breakdown];
                  const status = getDimensionStatus(value);
                  const icon = getDimensionIcon(key);

                  return (
                    <div
                      key={key}
                      className={`card ${status.bg} border-2 ${status.text} p-6 hover:shadow-lg transform hover:scale-105 transition-all`}
                    >
                      <div className="text-3xl mb-2">{icon}</div>
                      <h3 className="font-bold text-gray-900 mb-1">{label}</h3>
                      <p className="text-xs text-gray-600 mb-3">Weight: {weight}</p>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                          {value}
                        </span>
                        <span className="text-xs font-bold text-gray-600 mb-1">/100</span>
                      </div>
                      <div className="w-full bg-white/50 rounded-full h-2 mt-3">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${
                            value >= 80
                              ? 'from-green-400 to-emerald-500'
                              : value >= 60
                                ? 'from-blue-400 to-cyan-500'
                                : value >= 40
                                  ? 'from-amber-400 to-orange-500'
                                  : value >= 20
                                    ? 'from-red-400 to-rose-500'
                                    : 'from-rose-500 to-red-600'
                          }`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="card p-8 mb-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              Impact Breakdown
            </h2>
            <ImpactBreakdownChart score={score} variant="bar" />
          </div>

          {/* Detailed Analysis */}
          <div className="card p-8 mb-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Dimension Analysis</h2>
            <div className="space-y-4">
              {dimensions.map(({ key, label, weight }) => {
                const value = score.breakdown[key as keyof typeof score.breakdown];
                const status = getDimensionStatus(value);
                const explanation = score.explanations[key];
                const icon = getDimensionIcon(key);

                return (
                  <div
                    key={key}
                    className="bg-gradient-to-r from-white/50 to-white/30 border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <span className="text-2xl">{icon}</span>
                          {label}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">Weighted {weight} of overall score</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black text-gray-900">{value}</div>
                        <span
                          className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}
                        >
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-300/30 rounded-full h-3 mb-4">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 bg-gradient-to-r ${
                          value >= 80
                            ? 'from-green-400 to-emerald-500'
                            : value >= 60
                              ? 'from-blue-400 to-cyan-500'
                              : value >= 40
                                ? 'from-amber-400 to-orange-500'
                                : value >= 20
                                  ? 'from-red-400 to-rose-500'
                                  : 'from-rose-500 to-red-600'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>

                    {/* Explanation */}
                    {explanation && <p className="text-sm text-gray-700 leading-relaxed">{explanation}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insights Section */}
          <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-8 shadow-lg mb-12">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">💡</span> Key Insights
            </h3>
            <div className="space-y-3">
              <div className="text-blue-800 text-sm">
                <p className="mb-3">Based on the detailed analysis above, this product has been assessed across four critical environmental dimensions. Review each dimension card to understand the specific impact areas and recommendations for improvement.</p>
                <ul className="space-y-2 ml-4">
                  <li>✓ <strong>Carbon Impact:</strong> {score.explanations.carbon}</li>
                  <li>✓ <strong>Materials:</strong> {score.explanations.materials}</li>
                  {score.explanations.water && <li>✓ <strong>Water Usage:</strong> {score.explanations.water}</li>}
                  {score.explanations.energy && <li>✓ <strong>Energy Efficiency:</strong> {score.explanations.energy}</li>}
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison CTA */}
          <div className="card bg-gradient-to-r from-blue-600 to-blue-700 text-white p-12 text-center shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Want to Compare?</h3>
            </div>
            <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
              Analyze another product to compare side-by-side and make even more informed sustainability decisions.
            </p>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-xl transition-colors shadow-lg"
            >
              <span>+</span> Analyze Another Product
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <span>🔍</span>
            AI-powered NLP analysis with fully transparent and explainable scoring logic.
          </p>
        </div>
      </footer>
    </div>
  );
};
