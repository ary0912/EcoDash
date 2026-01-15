import React from 'react';
import type { ImpactScore } from '@/types/ImpactScore';

interface ScoreCardProps {
  score: ImpactScore;
  productName?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, productName }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-50', ring: 'ring-2 ring-green-300', emoji: '✨', text: 'text-green-700' };
    if (score >= 60) return { bg: 'bg-blue-50', ring: 'ring-2 ring-blue-300', emoji: '👍', text: 'text-blue-700' };
    if (score >= 40) return { bg: 'bg-amber-50', ring: 'ring-2 ring-amber-300', emoji: '⚠️', text: 'text-amber-700' };
    return { bg: 'bg-red-50', ring: 'ring-2 ring-red-300', emoji: '❌', text: 'text-red-700' };
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const scoreLabel = getScoreLabel(score.overallScore);
  const colors = getScoreColor(score.overallScore);

  return (
    <div className={`card ${colors.bg} border-2 ${colors.ring} p-8 max-w-md mx-auto shadow-xl`}>
      {productName && (
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{productName}</h2>
      )}

      {/* Overall Score Display */}
      <div className="mb-8">
        <p className="text-gray-600 text-sm uppercase tracking-widest font-semibold mb-6 text-center">
          Environmental Impact Score
        </p>
        <div className="flex justify-center">
          <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br from-white/80 to-white/40 flex items-center justify-center border-8 ${colors.ring} shadow-lg animate-scaleIn`}>
            <div className="text-center">
              <div className="text-6xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {score.overallScore}
              </div>
              <div className="text-sm text-gray-600 mt-1 font-semibold">/ 100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Badge */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r ${colors.text === 'text-green-700' ? 'from-green-500 to-emerald-600' : colors.text === 'text-blue-700' ? 'from-blue-500 to-cyan-600' : colors.text === 'text-amber-700' ? 'from-amber-500 to-orange-600' : 'from-red-500 to-rose-600'} shadow-lg`}>
          <span className="text-2xl">{colors.emoji}</span>
          {scoreLabel}
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-4 gap-3 mb-8 bg-white/50 rounded-xl p-4 backdrop-blur">
        {[
          { label: 'Carbon', score: score.breakdown.carbon, emoji: '🔥' },
          { label: 'Water', score: score.breakdown.water, emoji: '💧' },
          { label: 'Energy', score: score.breakdown.energy, emoji: '⚡' },
          { label: 'Materials', score: score.breakdown.materials, emoji: '♻️' },
        ].map((dim) => (
          <div key={dim.label} className="text-center">
            <div className="text-2xl mb-1">{dim.emoji}</div>
            <div className="text-2xl font-bold text-gray-900">{dim.score}</div>
            <div className="text-xs text-gray-600 font-semibold mt-1">{dim.label}</div>
          </div>
        ))}
      </div>

      {/* Key Explanations */}
      <div className="border-t-2 border-white/40 pt-6 space-y-4">
        <div className="bg-white/40 rounded-lg p-4 backdrop-blur">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span>🔥</span> Carbon Impact
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">{score.explanations.carbon}</p>
        </div>

        {score.explanations.materials && (
          <div className="bg-white/40 rounded-lg p-4 backdrop-blur">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>♻️</span> Materials
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{score.explanations.materials}</p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-gray-500 text-xs mt-6 pt-4 border-t border-white/40 text-center leading-relaxed">
        📊 Scores based on transparent, explainable AI. View source code for full methodology.
      </p>
    </div>
  );
};
