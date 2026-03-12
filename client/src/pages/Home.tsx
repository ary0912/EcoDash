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

    <div className="min-h-screen relative bg-[#f5f5f7] text-slate-900 font-[Inter] overflow-hidden">

      {/* Animated Background */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute w-[900px] h-[900px] bg-green-300 opacity-25 rounded-full blur-[160px] float1 left-[-300px] top-[-200px]" />

        <div className="absolute w-[800px] h-[800px] bg-blue-300 opacity-20 rounded-full blur-[160px] float2 right-[-250px] top-[120px]" />

        <div className="absolute w-[700px] h-[700px] bg-emerald-300 opacity-20 rounded-full blur-[160px] float3 bottom-[-200px] left-[300px]" />

      </div>


      {/* NAVBAR */}

      <header className="fixed top-0 w-full h-16 bg-white/70 backdrop-blur-md border-b border-slate-200 z-50">

        <div className="max-w-[1600px] mx-auto px-10 h-full flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <Leaf className="text-white w-5 h-5" />
            </div>

            <span className="font-semibold text-lg tracking-tight">
              EcoDash
            </span>

          </div>

          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
            Transparent AI
          </span>

        </div>

      </header>


      {/* HERO */}

      <section className="pt-24 pb-16 px-10">

        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[1fr_720px] gap-20 items-center">

          {/* LEFT SIDE */}

          <div className="max-w-xl">

            <h1 className="text-[56px] leading-[1.05] font-semibold tracking-tight mb-6">

              Understand the
              <span className="text-green-600"> environmental impact </span>
              of your products

            </h1>

            <p className="text-lg text-slate-600 mb-12 leading-relaxed">

              EcoDash evaluates sustainability through transparent
              AI-powered environmental scoring so teams can design
              better products with clear environmental insights.

            </p>

            {/* FEATURES */}

            <div className="space-y-8">

              {[
                {
                  icon: CheckCircle,
                  title: "Transparent AI Analysis",
                  desc: "Understand exactly how each environmental score is calculated.",
                  color: "bg-green-100 text-green-600",
                },
                {
                  icon: TrendingUp,
                  title: "Instant Environmental Insights",
                  desc: "Analyze sustainability metrics in seconds.",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: Shield,
                  title: "Science-Based Methodology",
                  desc: "Built on lifecycle analysis and environmental research.",
                  color: "bg-emerald-100 text-emerald-600",
                },
              ].map((item, i) => {

                const Icon = item.icon;

                return (

                  <div key={i} className="flex gap-4 items-start">

                    <div className={`p-3 rounded-xl ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>

                      <h4 className="font-semibold text-[16px] mb-1">
                        {item.title}
                      </h4>

                      <p className="text-[14px] text-slate-600">
                        {item.desc}
                      </p>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>


          {/* PRODUCT PANEL */}

          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl blur-2xl opacity-70" />

            <div className="relative bg-white rounded-3xl shadow-[0_60px_140px_rgba(0,0,0,0.15)] border border-slate-200 p-10">

              {/* Helper */}

              <div className="grid grid-cols-2 gap-3 mb-6 text-sm">

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">

                  <h4 className="font-semibold mb-1 text-xs">
                    How to Describe Your Product
                  </h4>

                  <p className="text-slate-500 text-xs leading-relaxed">
                    Product name, category, materials,
                    manufacturing, lifecycle.
                  </p>

                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">

                  <h4 className="font-semibold mb-1 text-xs">
                    Example Product
                  </h4>

                  <p className="text-green-800 text-xs">
                    Eco Water Bottle
                    Kitchen & Dining
                    100% recycled aluminum
                  </p>

                </div>

              </div>

              {error && (

                <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
                  {error}
                </div>

              )}

              <ProductForm
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />

              <p className="text-xs text-slate-500 mt-6">
                💡 Detailed descriptions lead to more accurate environmental assessments.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* FRAMEWORK */}

      <section className="py-20 bg-white border-t border-slate-200">

        <div className="max-w-[1200px] mx-auto px-10">

          <h2 className="text-3xl font-semibold text-center tracking-tight mb-14">
            Environmental Impact Framework
          </h2>

          <div className="grid md:grid-cols-4 gap-14">

            {[
              { label: "Carbon Impact", weight: "40%", icon: Leaf, color: "text-green-600" },
              { label: "Water Usage", weight: "25%", icon: Droplet, color: "text-blue-600" },
              { label: "Energy Consumption", weight: "20%", icon: Zap, color: "text-yellow-500" },
              { label: "Materials", weight: "15%", icon: Sprout, color: "text-emerald-600" },
            ].map((item, i) => {

              const Icon = item.icon;

              return (

                <div
                  key={i}
                  className="bg-slate-50 rounded-xl p-7 text-center hover:shadow-md transition"
                >

                  <Icon className={`mx-auto mb-3 w-7 h-7 ${item.color}`} />

                  <h4 className="font-semibold">
                    {item.label}
                  </h4>

                  <p className="text-sm text-slate-500">
                    Weight: {item.weight}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">

        © 2026 EcoDash — Sustainability insights powered by transparent AI.

      </footer>


      {/* Animation Styles */}

      <style>{`

      @keyframes float1 {
        0% { transform: translateY(0px); }
        50% { transform: translateY(40px); }
        100% { transform: translateY(0px); }
      }

      @keyframes float2 {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-50px); }
        100% { transform: translateY(0px); }
      }

      @keyframes float3 {
        0% { transform: translateY(0px); }
        50% { transform: translateY(60px); }
        100% { transform: translateY(0px); }
      }

      .float1 { animation: float1 18s ease-in-out infinite; }
      .float2 { animation: float2 22s ease-in-out infinite; }
      .float3 { animation: float3 20s ease-in-out infinite; }

      `}</style>

    </div>

  );

};