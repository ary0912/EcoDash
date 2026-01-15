import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ComparisonResult } from '@/types/ImpactScore';

interface ComparisonViewProps {
  results: ComparisonResult;
}

/**
 * ComparisonView Component
 * 
 * Enables side-by-side comparison of multiple products:
 * - Overlaid bar charts for overall scores
 * - Dimension-by-dimension comparison
 * - Relative performance indicators
 * 
 * Helps users make informed decisions between alternatives.
 */
export const ComparisonView: React.FC<ComparisonViewProps> = ({ results }) => {
  // Prepare data for comparison chart
  const comparisonData = results.products.map((product) => ({
    name: product.name,
    overall: product.score.overallScore,
    carbon: product.score.breakdown.carbon,
    water: product.score.breakdown.water,
    energy: product.score.breakdown.energy,
    materials: product.score.breakdown.materials,
  }));

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].payload.name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-8">
      {/* Overall Score Comparison */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Overall Sustainability Score</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="overall" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dimension Breakdown Comparison */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Impact Dimension Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="carbon" fill={colors[0]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="water" fill={colors[1]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="energy" fill={colors[2]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="materials" fill={colors[3]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-white rounded-xl shadow-lg p-8 overflow-x-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Breakdown</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Overall</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Carbon</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Water</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Energy</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Materials</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">{row.name}</td>
                <td className="py-3 px-4 text-center font-bold text-blue-600">{row.overall}</td>
                <td className="py-3 px-4 text-center">{row.carbon}</td>
                <td className="py-3 px-4 text-center">{row.water}</td>
                <td className="py-3 px-4 text-center">{row.energy}</td>
                <td className="py-3 px-4 text-center">{row.materials}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
