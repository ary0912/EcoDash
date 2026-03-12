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

    <div className="min-h-screen relative bg-[#f5f5f7] overflow-hidden font-[Inter] text-slate-900">


      {/* Animated Background */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute w-[700px] h-[700px] bg-green-300 opacity-20 rounded-full blur-[120px] animate-[float1_12s_ease-in-out_infinite] left-[-200px] top-[-150px]" />

        <div className="absolute w-[600px] h-[600px] bg-blue-300 opacity-20 rounded-full blur-[120px] animate-[float2_16s_ease-in-out_infinite] right-[-200px] top-[100px]" />

        <div className="absolute w-[500px] h-[500px] bg-emerald-300 opacity-20 rounded-full blur-[120px] animate-[float3_18s_ease-in-out_infinite] bottom-[-150px] left-[200px]" />

      </div>


      {/* NAVBAR */}

      <header className="fixed top-0 w-full h-16 bg-white/70 backdrop-blur-md border-b border-slate-200 z-50">

        <div className="max-w-[1500px] mx-auto px-10 h-full flex items-center justify-between">

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

      <section className="pt-32 pb-24 px-10">

        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-[1fr_620px] gap-24 items-center">


          {/* LEFT CONTENT */}

          <div className="max-w-xl">

            <h1 className="text-[56px] leading-[1.05] font-semibold tracking-tight mb-6">

              Understand the
              <br />

              <span className="text-green-600">
                environmental impact
              </span>

              <br />

              of your products

            </h1>


            <p className="text-lg text-slate-600 mb-12 leading-relaxed">

              EcoDash evaluates sustainability using transparent
              AI-powered environmental scoring so teams can design
              better products with clear environmental insights.

            </p>


            {/* FEATURES */}

            <div className="space-y-8">

              {[
                {
                  icon: CheckCircle,
                  title: "Transparent AI Analysis",
                  desc: "See exactly how environmental scores are calculated.",
                  color: "bg-green-100 text-green-600",
                },
                {
                  icon: TrendingUp,
                  title: "Instant Environmental Insights",
                  desc: "Analyze sustainability metrics instantly.",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: Shield,
                  title: "Science-Based Methodology",
                  desc: "Built on lifecycle and environmental research.",
                  color: "bg-emerald-100 text-emerald-600",
                },
              ].map((item, i) => {

                const Icon = item.icon;

                return (

                  <div key={i} className="flex gap-4 items-start">

                    <div className={`p-3 rounded-xl ${item.color}`}>
                      <Icon className="w-5 h-5" />
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

          <div className="bg-white rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.12)] border border-slate-200 p-10">


            {/* Helper Section */}

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 text-sm">

              <h4 className="font-semibold mb-2">
                Example Product
              </h4>

              <p className="text-slate-600 text-xs leading-relaxed">
                Eco Water Bottle
                <br />
                Category: Kitchen & Dining
                <br />
                100% recycled aluminium, sustainable manufacturing
              </p>

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

              💡 More detailed descriptions lead to more accurate environmental assessments.

            </p>

          </div>

        </div>

      </section>



      {/* SCORING FRAMEWORK */}

      <section className="py-24 bg-white border-t border-slate-200">

        <div className="max-w-[1200px] mx-auto px-10">

          <h2 className="text-3xl font-semibold text-center tracking-tight mb-14">
            Environmental Impact Framework
          </h2>

          <div className="grid md:grid-cols-4 gap-10">

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
                  className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-md transition"
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

      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">

        © 2026 EcoDash — Sustainability insights powered by transparent AI.

      </footer>


      {/* Custom Animations */}

      <style>
        {`
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
        `}
      </style>

    </div>
  );
};