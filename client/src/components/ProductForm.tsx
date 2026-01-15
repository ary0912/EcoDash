import React, { useState } from 'react';
import type { AssessmentRequest } from '@/types/ImpactScore';

const CATEGORIES = [
  'Technology',
  'Fashion',
  'Food/Beverage',
  'Furniture',
  'Cosmetics',
  'Household Items',
  'Electronics',
  'Other',
];

interface ProductFormProps {
  onSubmit: (data: AssessmentRequest) => Promise<void>;
  isLoading?: boolean;
}

/**
 * ProductForm Component - Premium Design
 *
 * Features:
 * - Styled input fields with validation
 * - Real-time feedback and character counters
 * - Category selection dropdown
 * - Optional fields for advanced details
 * - Loading state with spinner animation
 */
export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<AssessmentRequest>({
    name: '',
    description: '',
    category: 'Technology',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (
    name: string,
    value: string,
  ): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (name === 'name' && !value.trim()) {
      newErrors.name = 'Product name is required';
    }
    // Description is optional, but if provided must meet requirements
    if (name === 'description' && value.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const newErrors = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        ...newErrors,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const newErrors = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));
  };

  const isValid = (): boolean => {
    const nameErrors = validateField('name', formData.name);
    const descErrors = validateField('description', formData.description);

    // Only name is required, description is optional
    return Object.keys(nameErrors).length === 0 && Object.keys(descErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Example Info Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Guidance Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2">📋 How to Describe Your Product</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ <strong>Product Name:</strong> What is it?</li>
            <li>✓ <strong>Category:</strong> Type of product</li>
            <li>✓ <strong>Description:</strong> Materials, manufacturing, lifecycle</li>
          </ul>
        </div>

        {/* Example Box */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-bold text-green-900 mb-2">✨ Example Product</h3>
          <div className="text-sm text-green-800 space-y-1">
            <p><strong>Name:</strong> Eco Water Bottle</p>
            <p><strong>Category:</strong> Kitchen & Dining</p>
            <p><strong>Desc:</strong> 100% recycled aluminum, sustainable manufacturing</p>
          </div>
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2">
          📦 Product Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., Organic Cotton T-Shirt, Recycled Aluminum Water Bottle"
          className={`input-field w-full px-4 py-3 border-2 rounded-lg bg-white/50 backdrop-blur transition-all focus:ring-4 focus:ring-blue-300 focus:border-blue-500 ${
            errors.name && touched.name ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        {errors.name && touched.name && (
          <p className="mt-2 text-xs text-red-600 font-semibold">⚠️ {errors.name}</p>
        )}
        {!errors.name && touched.name && (
          <p className="mt-2 text-xs text-green-600 font-semibold">✓ Valid</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2">
          🏷️ Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          onBlur={handleBlur}
          className="input-field w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white/50 backdrop-blur transition-all focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2">
          📝 Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="(Optional) e.g., Made from 100% organic cotton, sustainable manufacturing in Vietnam, designed to last 5+ years, biodegradable..."
          rows={5}
          className={`input-field w-full px-4 py-3 border-2 rounded-lg bg-white/50 backdrop-blur transition-all focus:ring-4 focus:ring-blue-300 focus:border-blue-500 resize-none ${
            errors.description && touched.description ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        <div className="flex justify-between items-start mt-2">
          <div>
            {errors.description && touched.description && (
              <p className="text-xs text-red-600 font-semibold">⚠️ {errors.description}</p>
            )}
            {!errors.description && touched.description && (
              <p className="text-xs text-green-600 font-semibold">✓ Valid</p>
            )}
          </div>
          <p className="text-xs text-gray-600">{formData.description.length}/500</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !isValid()}
        className="w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
            <span>Assessing...</span>
          </>
        ) : (
          <>
            <span>✨</span>
            <span>Assess Impact</span>
          </>
        )}
      </button>

      {/* Hint */}
      <p className="text-xs text-center text-gray-600">
        💡 More detailed descriptions lead to more accurate environmental assessments
      </p>
    </form>
  );
};
