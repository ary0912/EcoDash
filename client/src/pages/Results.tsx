import React from "react";
import { ScoreCard } from "@/components/ScoreCard";
import { ImpactBreakdownChart } from "@/components/ImpactBreakdownChart";
import type { ImpactScore } from "@/types/ImpactScore";
import {
  ArrowLeft,
  TrendingUp,
  Lightbulb,
  Leaf,
  Droplet,
  Zap,
  Recycle
} from "lucide-react";

interface ResultsProps {
  productName: string;
  score: ImpactScore;
  onBackToHome: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  productName,
  score,
  onBackToHome,
}) => {

  const getDimensionStatus = (value: number) => {
    if (value >= 80)
      return { label: "Excellent", color: "text-green-600", bg: "bg-green-100" };

    if (value >= 60)
      return { label: "Good", color: "text-blue-600", bg: "bg-blue-100" };

    if (value >= 40)
      return { label: "Moderate", color: "text-amber-600", bg: "bg-amber-100" };

    return { label: "High Impact", color: "text-red-600", bg: "bg-red-100" };
  };

  const dimensions = [
    { key: "carbon", label: "Carbon", weight: "40%", icon: Leaf },
    { key: "water", label: "Water", weight: "25%", icon: Droplet },
    { key: "energy", label: "Energy", weight: "20%", icon: Zap },
    { key: "materials", label: "Materials", weight: "15%", icon: Recycle },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">

      {/* HEADER */}

      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <h1 className="text-lg font-semibold text-gray-900">
            Results for <span className="text-blue-600">{productName}</span>
          </h1>

          <div className="w-20" />
        </div>
      </header>

      {/* MAIN */}

      <main className="pt-28 pb-16 px-6">

        <div className="max-w-7xl mx-auto space-y-12">

          {/* TOP GRID */}

          <div className="grid lg:grid-cols-3 gap-8">

            {/* SCORE */}

            <ScoreCard score={score} />

            {/* DIMENSION BREAKDOWN */}

            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">

              {dimensions.map(({ key, label, weight, icon }) => {

                const value =
                  score.breakdown[key as keyof typeof score.breakdown];

                const status = getDimensionStatus(value);

                const Icon = icon;

                return (
                  <div
                    key={key}
                    className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                  >

                    <div className="flex justify-between items-center mb-4">

                      <div className="flex items-center gap-3">

                        <Icon className="w-6 h-6 text-blue-600" />

                        <h3 className="font-semibold text-gray-900">
                          {label}
                        </h3>

                      </div>

                      <span className="text-xs text-gray-500">
                        {weight}
                      </span>
                    </div>

                    <div className="flex items-end gap-2 mb-3">

                      <span className="text-3xl font-bold text-gray-900">
                        {value}
                      </span>

                      <span className="text-sm text-gray-500 mb-1">
                        /100
                      </span>

                    </div>

                    {/* STATUS */}

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${status.bg} ${status.color}`}
                    >
                      {status.label}
                    </span>

                    {/* PROGRESS */}

                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">

                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                        style={{ width: `${value}%` }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* CHART */}

          <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">

              <TrendingUp className="text-blue-600 w-6 h-6" />

              Impact Breakdown

            </h2>

            <ImpactBreakdownChart score={score} variant="bar" />

          </section>

          {/* DETAILED ANALYSIS */}

          <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Detailed Analysis
            </h2>

            <div className="space-y-6">

              {dimensions.map(({ key, label, weight, icon }) => {

                const value =
                  score.breakdown[key as keyof typeof score.breakdown];

                const status = getDimensionStatus(value);

                const explanation = score.explanations[key];

                const Icon = icon;

                return (

                  <div
                    key={key}
                    className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition"
                  >

                    <div className="flex justify-between items-start mb-4">

                      <div className="flex items-center gap-3">

                        <Icon className="w-6 h-6 text-blue-600" />

                        <div>

                          <h3 className="font-semibold text-gray-900">
                            {label}
                          </h3>

                          <p className="text-xs text-gray-500">
                            Weight {weight}
                          </p>

                        </div>

                      </div>

                      <div className="text-right">

                        <span className="text-2xl font-bold text-gray-900">
                          {value}
                        </span>

                        <div
                          className={`text-xs px-2 py-1 rounded mt-1 ${status.bg} ${status.color}`}
                        >
                          {status.label}
                        </div>

                      </div>

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">

                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                        style={{ width: `${value}%` }}
                      />

                    </div>

                    {explanation && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {explanation}
                      </p>
                    )}

                  </div>
                );
              })}

            </div>

          </section>

          {/* INSIGHTS */}

          <section className="bg-blue-50 border border-blue-200 rounded-xl p-8">

            <div className="flex items-center gap-3 mb-4">

              <Lightbulb className="text-blue-600 w-6 h-6" />

              <h3 className="text-xl font-semibold text-blue-900">
                Key Insights
              </h3>

            </div>

            <p className="text-sm text-blue-800 leading-relaxed">

              This product has been analyzed across four key environmental
              dimensions. Review the breakdown above to understand the areas
              with the greatest environmental impact and opportunities for
              improvement.

            </p>

          </section>

          {/* CTA */}

          <section className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-12 text-white shadow-lg">

            <h3 className="text-2xl font-bold mb-4">
              Compare Another Product
            </h3>

            <p className="opacity-90 mb-6">
              Run another assessment to compare environmental impact and make
              better sustainability decisions.
            </p>

            <button
              onClick={onBackToHome}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Analyze Another Product
            </button>

          </section>

        </div>

      </main>

      {/* FOOTER */}

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        EcoDash • Transparent AI sustainability analysis
      </footer>

    </div>
  );
};