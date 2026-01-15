import React, { useState } from 'react';
import { ProductForm } from '@/components/ProductForm';
import { assessProduct } from '@/services/api';
import type { AssessmentRequest } from '@/types/ImpactScore';
import { Leaf, Droplet, Zap, Sprout, TrendingUp, Shield } from 'lucide-react';

/**
 * Home Page - Premium Experience
 * 
 * Entry point featuring:
 * 1. Stunning hero section with animated visuals
 * 2. Product assessment form integration
 * 3. Interactive methodology showcase
 * 4. Trust indicators and features highlight
 */
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
      const message = err instanceof Error ? err.message : 'Failed to assess product';
      setError(message);
      console.error('Assessment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              EcoDash
            </h1>
          </div>
          <div className="hidden sm:flex gap-1 text-sm text-gray-600">
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">Transparent AI</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-slideUp">
            <h2 className="section-title mb-6">Know the Real Impact of Your Products</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Make sustainable choices with transparent, AI-powered environmental impact assessments. No black boxes. Just facts.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Features & How It Works */}
            <div className="space-y-8">
              {/* How It Works */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
                
                <div className="space-y-4">
                  {[
                    { icon: '✍️', title: 'Describe', desc: 'Tell us about materials, manufacturing, and lifecycle' },
                    { icon: '🤖', title: 'AI Analyzes', desc: 'NLP extracts sustainability signals from text' },
                    { icon: '📊', title: 'Get Score', desc: 'Transparent breakdown across 4 impact dimensions' },
                    { icon: '🎯', title: 'Compare', desc: 'Side-by-side comparison for informed decisions' },
                  ].map((step, idx) => (
                    <div key={idx} className="card p-4 flex gap-4 hover:shadow-xl transform hover:scale-105 transition-all">
                      <div className="text-3xl">{step.icon}</div>
                      <div>
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scoring Breakdown */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Transparent Scoring
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Carbon', weight: '40%', icon: Leaf, color: 'text-amber-600' },
                    { label: 'Water', weight: '25%', icon: Droplet, color: 'text-blue-600' },
                    { label: 'Energy', weight: '20%', icon: Zap, color: 'text-yellow-600' },
                    { label: 'Materials', weight: '15%', icon: Sprout, color: 'text-green-600' },
                  ].map((dim, idx) => {
                    const IconComp = dim.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComp className={`w-5 h-5 ${dim.color}`} />
                          <span className="font-semibold text-gray-800">{dim.label}</span>
                        </div>
                        <span className="font-bold text-blue-600">{dim.weight}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Form Card */}
            <div className="relative">
              <div className="card p-8 shadow-2xl animate-scaleIn">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-xl flex gap-3">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <p className="text-red-800 font-semibold text-sm">{error}</p>
                    </div>
                  </div>
                )}
                <ProductForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'No Black Boxes',
                desc: 'Every score explained with transparent, rule-based logic',
              },
              {
                icon: '⚡',
                title: 'Instant Results',
                desc: 'Get comprehensive assessments in seconds, not hours',
              },
              {
                icon: '📈',
                title: 'Actionable Insights',
                desc: 'Learn specific improvements to reduce environmental impact',
              },
              {
                icon: '🌍',
                title: 'Science-Based',
                desc: 'Scoring based on real environmental impact research',
              },
              {
                icon: '🔄',
                title: 'Compare Easily',
                desc: 'Side-by-side analysis of multiple products',
              },
              {
                icon: '🚀',
                title: 'Always Improving',
                desc: 'AI-powered analysis ready for advanced integrations',
              },
            ].map((feature, idx) => (
              <div key={idx} className="card p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center card p-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Make Better Choices?</h3>
          <p className="text-lg opacity-90 mb-8">
            Assess your first product and discover its true environmental impact in seconds.
          </p>
          <button className="btn-primary bg-white text-blue-600 hover:bg-blue-50">
            Get Started Above
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">About</h4>
              <p className="text-sm text-gray-600">
                Transparent environmental impact analysis powered by AI and science.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Features</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Product Assessment</li>
                <li>• Impact Comparison</li>
                <li>• Transparent Scoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Mission</h4>
              <p className="text-sm text-gray-600">
                Making environmental data accessible to everyone.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2026 EcoDash. Built with transparency and sustainability in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
