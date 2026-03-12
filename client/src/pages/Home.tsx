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
    <div className="min-h-screen bg-[#f5f5f7] text-slate-900 font-[Inter]">

      {/* NAVBAR */}

      <header className="fixed top-0 w-full h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">

        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

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


      {/* HERO SECTION */}

      <section className="pt-32 pb-24 px-6">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">


          {/* LEFT CONTENT */}

          <div className="max-w-xl">

            <h1 className="text-[56px] leading-[1.1] font-semibold tracking-tight text-slate-900 mb-6">

              Know the environmental impact
              <br />

              <span className="text-green-600">
                before your product reaches the world
              </span>

            </h1>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed">

              EcoDash evaluates sustainability using transparent
              AI-powered environmental scoring so teams can make
              better product decisions with clear data insights.

            </p>


            {/* VALUE PROPS */}

            <div className="space-y-6">

              {[
                {
                  icon: CheckCircle,
                  title: "Transparent AI Analysis",
                  desc: "Understand exactly how each sustainability score is calculated.",
                  color: "bg-green-100 text-green-600",
                },
                {
                  icon: TrendingUp,
                  title: "Instant Environmental Insights",
                  desc: "Analyze sustainability metrics within seconds.",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: Shield,
                  title: "Science-Based Methodology",
                  desc: "Built on environmental research and lifecycle analysis.",
                  color: "bg-emerald-100 text-emerald-600",
                },
              ].map((item, i) => {

                const Icon = item.icon;

                return (
                  <div key={i} className="flex gap-4 items-start">

                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>

                      <h4 className="font-semibold text-[16px]">
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


          {/* PRODUCT FORM PANEL */}

          <div
            className="
            bg-white
            rounded-3xl
            shadow-[0_30px_80px_rgba(0,0,0,0.12)]
            border border-slate-200
            p-10
            hover:shadow-[0_40px_100px_rgba(0,0,0,0.16)]
            transition
          "
          >

            <h3 className="text-lg font-semibold mb-6 tracking-tight">
              Assess Your Product
            </h3>

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
              💡 More detailed product descriptions lead to more accurate environmental assessments.
            </p>

          </div>

        </div>

      </section>


      {/* SCORING METHODOLOGY */}

      <section className="py-24 bg-white border-t border-slate-200">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center tracking-tight mb-14">

            Transparent Environmental Scoring

          </h2>


          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                label: "Carbon Impact",
                weight: "40%",
                icon: Leaf,
                color: "text-green-600",
              },
              {
                label: "Water Usage",
                weight: "25%",
                icon: Droplet,
                color: "text-blue-600",
              },
              {
                label: "Energy Consumption",
                weight: "20%",
                icon: Zap,
                color: "text-yellow-500",
              },
              {
                label: "Materials",
                weight: "15%",
                icon: Sprout,
                color: "text-emerald-600",
              },
            ].map((item, i) => {

              const Icon = item.icon;

              return (

                <div
                  key={i}
                  className="
                  bg-slate-50
                  rounded-xl
                  p-6
                  text-center
                  hover:shadow-md
                  transition
                "
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


      {/* CTA SECTION */}

      <section className="py-24 px-6">

        <div
          className="
          max-w-4xl
          mx-auto
          text-center
          bg-gradient-to-r
          from-green-600
          to-blue-600
          rounded-3xl
          p-14
          text-white
          shadow-xl
        "
        >

          <h2 className="text-3xl font-semibold mb-4">

            Start Assessing Product Sustainability

          </h2>

          <p className="opacity-90 mb-8 max-w-xl mx-auto">

            Discover the environmental footprint of your products
            and make sustainable decisions backed by transparent data.

          </p>

          <button
            className="
            bg-white
            text-blue-600
            px-7
            py-3
            rounded-lg
            font-semibold
            hover:bg-gray-100
            transition
          "
          >
            Try EcoDash
          </button>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">

        © 2026 EcoDash — Sustainability insights powered by transparent AI.

      </footer>

    </div>
  );
};