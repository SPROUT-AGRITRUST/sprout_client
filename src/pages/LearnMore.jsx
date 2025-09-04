import React from "react";
import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LearnMore() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center p-8">
      <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8 max-w-4xl w-full mb-12">
        {/* ...existing informational content... */}
       
        {/* ...existing content... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="flex flex-col items-center">
            <img
              src="https://agronicfood.com/wp-content/uploads/2020/02/0-4.png"
              alt="Sprout Poster"
              className="rounded-xl shadow-lg mb-4 w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShjXlEoBpuH3JuJN_tz92Iq0j_fz05mQtmvDjBGdL6kz9wLRifGmaQZQEKloKij3ET9iU&usqp=CAU"
              alt="Sprout Poster"
              className="rounded-xl shadow-lg mb-4 w-full max-w-xs"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center gap-8 mt-8">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 w-40"
            onClick={() => navigate("/login")}
          >
            Login Now
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 w-40"
            onClick={() => navigate("/signup")}
          >
            Sign Up Now
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Learn More About Sprout
        </h1>
        <p className="text-gray-700 text-lg mb-6 text-center">
          Sprout is your gateway to precision agriculture, smart farming, and
          sustainable growth. Discover how our platform empowers farmers with
          data-driven insights, soil analysis, crop management, and a vibrant
          marketplace.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>
            Upload and analyze your soil reports for tailored recommendations.
          </li>
          <li>Manage your crops and farm profile with ease.</li>
          <li>
            Connect with other farmers and agri-vendors in the marketplace.
          </li>
          <li>Get notified about important activities and updates.</li>
        </ul>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-1">Soil Analysis</h3>
              <p className="text-gray-600 mb-4">
                Easily upload your soil reports and receive AI-powered
                recommendations for crop selection, fertilizer usage, and
                irrigation planning. Our platform helps you make data-driven
                decisions for better yields.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Crop Management</h3>
              <p className="text-gray-600 mb-4">
                Track your crop cycles, monitor growth stages, and record farm
                activities. Sprout makes it simple to manage your farm and
                optimize productivity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Marketplace</h3>
              <p className="text-gray-600 mb-4">
                Buy and sell seeds, fertilizers, equipment, and more. Connect
                with trusted vendors and other farmers to grow your business.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">
                Notifications & Reminders
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with timely notifications about upcoming
                activities, weather alerts, and important deadlines.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            How Sprout Works
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Sign up and create your farm profile.</li>
            <li>Upload your soil report and get instant analysis.</li>
            <li>Manage your crops and activities from your dashboard.</li>
            <li>Explore the marketplace for products and services.</li>
            <li>
              Receive notifications and stay connected with the community.
            </li>
          </ol>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Why Choose Sprout?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Easy-to-use interface designed for farmers.</li>
            <li>AI-powered insights for smarter farming.</li>
            <li>Secure and private data management.</li>
            <li>Active support and growing community.</li>
          </ul>
        </div>
        <div className="text-center mt-12">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
