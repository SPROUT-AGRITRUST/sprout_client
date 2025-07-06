'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Leaf } from 'lucide-react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    farmName: '',
    email: '',
    password: '',
    primaryRole: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual signup logic here
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect or show success message
      alert('Account created successfully!');
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create your GrowField account
          </h1>
          <p className="text-gray-600">
            Get started with precision agriculture.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
              placeholder="Enter your full name"
            />
          </div>

          {/* Farm/Organization Name */}
          <div>
            <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-2">
              Farm/Organization Name *
            </label>
            <input
              type="text"
              id="farmName"
              name="farmName"
              value={formData.farmName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
              placeholder="Enter your farm or organization name"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Primary Role */}
          <div>
            <label htmlFor="primaryRole" className="block text-sm font-medium text-gray-700 mb-2">
              Primary Role *
            </label>
            <select
              id="primaryRole"
              name="primaryRole"
              value={formData.primaryRole}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white"
            >
              <option value="">Select your primary role</option>
              <option value="farm-owner">Farm Owner</option>
              <option value="agronomist">Agronomist</option>
              <option value="researcher">Researcher</option>
              <option value="consultant">Consultant</option>
            </select>
          </div>

          {/* Terms of Service */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="/terms" className="text-green-600 hover:text-green-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-green-600 hover:text-green-700 underline">
                Privacy Policy
              </a>
              . *
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !agreeToTerms}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-green-600 hover:text-green-700 font-medium underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 