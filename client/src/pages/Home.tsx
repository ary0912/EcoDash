import React, { useState } from "react";
import { ProductForm } from "@/components/ProductForm";
import { assessProduct } from "@/services/api";
import type { AssessmentRequest } from "@/types/ImpactScore";
import {
  Leaf,
  Droplet,
  Zap,
  Sprout,
  TrendingUp,
  Shield,
  CheckCircle,
} from "lucide-react";

export const Home: React.FC<{ onAssessmentComplete: (data: any) => void }> = ({
  onAssessmentComplete,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: AssessmentRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await assessProduct(formData);
      onAssessmentComplete({
        productName: formData.name,
        score: result,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to assess product";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">

      {/* HEADER */}

      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
              <Leaf className="text-white w-5 h-5" />
            </div>

            <span className="font-bold text-lg text-gray-900">
              EcoDash
            </span>
          </div>

          <div className="hidden sm:flex">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
              Transparent AI
            </span>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="pt-36 pb-20 px-6">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}

          <div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Understand the Environmental Impact of Your Products
            </h1>

            <p className="text-lg text-gray-600 mb-10 max-w-xl">
              EcoDash helps you evaluate sustainability through transparent,
              AI-powered environmental scoring. Make informed decisions with
              clear, data-driven insights.
            </p>

            {/* FEATURES */}

            <div className="space-y-5">

              {[
                {
                  icon: CheckCircle,
                  title: "Transparent AI Analysis",
                  desc: "Understand exactly how each sustainability score is calculated.",
                },
                {
                  icon: TrendingUp,
                  title: "Instant Environmental Insights",
                  desc: "Analyze product sustainability metrics within seconds.",
                },
                {
                  icon: Shield,
                  title: "Science-Based Methodology",
                  desc: "Built on environmental research and lifecycle analysis.",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div key={i} className="flex gap-4 items-start">

                    <div className="p-2 rounded-lg bg-green-100">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-600">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT FORM */}

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

            {error && (
              <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}

            <ProductForm onSubmit={handleFormSubmit} isLoading={isLoading} />

          </div>

        </div>
      </section>

      {/* SCORING SECTION */}

      <section className="py-20 bg-white border-t border-gray-100">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-gray-900 text-center mb-14">
            Transparent Environmental Scoring
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Carbon",
                weight: "40%",
                icon: Leaf,
                color: "text-amber-600",
              },
              {
                label: "Water",
                weight: "25%",
                icon: Droplet,
                color: "text-blue-600",
              },
              {
                label: "Energy",
                weight: "20%",
                icon: Zap,
                color: "text-yellow-600",
              },
              {
                label: "Materials",
                weight: "15%",
                icon: Sprout,
                color: "text-green-600",
              },
            ].map((dim, i) => {
              const Icon = dim.icon;

              return (
                <div
                  key={i}
                  className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-md transition"
                >
                  <Icon className={`mx-auto mb-3 w-7 h-7 ${dim.color}`} />

                  <h4 className="font-semibold text-gray-900">
                    {dim.label}
                  </h4>

                  <p className="text-sm text-gray-500">
                    Weight: {dim.weight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24 px-6">

        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-4">
            Start Assessing Your Product Impact
          </h2>

          <p className="opacity-90 mb-8">
            Discover the environmental footprint of your products and make
            sustainable decisions backed by transparent data.
          </p>

          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Try EcoDash
          </button>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-gray-200 py-10 text-center text-sm text-gray-500">
        © 2026 EcoDash — Sustainability insights powered by transparent AI.
      </footer>

    </div>
  );
};