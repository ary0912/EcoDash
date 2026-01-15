import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import type { ImpactScore } from '@/types/ImpactScore';

interface ImpactBreakdownChartProps {
  score: ImpactScore;
  variant?: 'bar' | 'radar';
}

/**
 * ImpactBreakdownChart Component
 * 
 * Visualizes environmental impact across four dimensions:
 * - Carbon (40% weight): CO2 equivalent emissions
 * - Water (25% weight): Freshwater consumption
 * - Energy (20% weight): Energy efficiency and renewable usage
 * - Materials (15% weight): Recycled content and biodegradability
 * 
 * Supports both bar and radar chart visualizations.
 */
export const ImpactBreakdownChart: React.FC<ImpactBreakdownChartProps> = ({
  score,
  variant = 'bar',
}) => {
  const data = [
    {
      name: 'Carbon',
      score: score.breakdown.carbon,
      weight: '40%',
      fill: '#10b981',
    },
    {
      name: 'Water',
      score: score.breakdown.water,
      weight: '25%',
      fill: '#3b82f6',
    },
    {
      name: 'Energy',
      score: score.breakdown.energy,
      weight: '20%',
      fill: '#f59e0b',
    },
    {
      name: 'Materials',
      score: score.breakdown.materials,
      weight: '15%',
      fill: '#8b5cf6',
    },
  ];

  const CustomTooltip = ({
    active,
    payload,
  }: any) => {
    if (active && payload && payload.length) {
      const { name, score: value, weight } = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-700">Score: {value}/100</p>
          <p className="text-xs text-gray-500">Weight: {weight}</p>
        </div>
      );
    }
    return null;
  };

  if (variant === 'radar') {
    return (
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Impact Score"
              dataKey="score"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
