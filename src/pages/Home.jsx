import React, { useState, useEffect } from "react";
import { Bell, Leaf, Bot, ShoppingCart, Search, ChevronLeft, ChevronRight } from "lucide-react";

const quickActions = [
  { label: "Check Soil Health", icon: <Search className="w-6 h-6" /> },
  { label: "Get Crop Suggestion", icon: <Leaf className="w-6 h-6" /> },
  { label: "Sell Produce", icon: <ShoppingCart className="w-6 h-6" /> },
  { label: "Smart Support Bot", icon: <Bot className="w-6 h-6" /> },
];

const carouselData = [
  {
    id: 1,
    title: "Smart Farming Solutions",
    subtitle: "AI-powered insights for better crop management",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bgColor: "from-emerald-500 to-green-600"
  },
  {
    id: 2,
    title: "Market Connect",
    subtitle: "Direct access to buyers and fair pricing",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bgColor: "from-green-500 to-emerald-600"
  },
  {
    id: 3,
    title: "Expert Guidance",
    subtitle: "24/7 support from agricultural experts",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bgColor: "from-teal-500 to-green-600"
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-green-100">
        <div className="flex justify-between items-center px-4 py-4 md:px-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Sprout
          </h1>
          <div className="flex items-center space-x-4">
            <a
              href="/login"
              className="px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Get Started
            </a>
            <button className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
              <Bell className="w-5 h-5 text-green-600" />
              <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            
            <input
              type="text"
              placeholder="Search for crops, farming tips, market prices..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
            />
            <button className="absolute inset-y-0 right-0 px-6 bg-green-600 text-white rounded-r-2xl hover:bg-green-700 transition-colors duration-200 font-medium">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Soil Report Banner */}
      <div className="px-4 py-6 md:px-8 mb-8">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-center">
            {/* Content */}
            <div className="flex-1 p-8 md:p-12 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Get Personalized Crop Suggestions
                </h2>
              </div>
              <p className="text-xl text-green-100 mb-6 leading-relaxed">
                Upload your soil report and receive AI-powered recommendations for the best crops to plant, optimal planting times, and yield optimization strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors duration-200 shadow-lg">
                  Upload Soil Report
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Image */}
            <div className="flex-1 p-8 md:p-12">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Soil Analysis"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">AI Analysis</p>
                      <p className="text-xs text-gray-600">Instant Results</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 md:px-8">
        {/* Hero Carousel */}
        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-64 md:h-80">
            {carouselData.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90`} />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-6">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl opacity-90 drop-shadow-md">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-green-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-green-600" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Seasonal Tips Card */}
     

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sprout?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering farmers with cutting-edge technology and data-driven insights for sustainable agriculture
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered crop analysis and soil health monitoring to optimize your farming decisions and maximize yields.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Market Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Direct access to buyers, fair pricing, and transparent market information to get the best value for your produce.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                24/7 access to agricultural experts and AI-powered recommendations for every farming challenge.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed to modernize and optimize your agricultural operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crop Planning</h3>
              <p className="text-gray-600 text-sm">
                Optimize your crop selection and planting schedule based on soil conditions and market demand.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Soil Analysis</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive soil health assessment with detailed recommendations for improvement.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Access</h3>
              <p className="text-gray-600 text-sm">
                Connect directly with buyers and get real-time market prices for your products.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Consulting</h3>
              <p className="text-gray-600 text-sm">
                Personalized AI recommendations for pest control, irrigation, and crop management.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="group flex flex-col items-center justify-center p-6 bg-white border border-green-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-green-200"
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <span className="text-sm text-center font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-green-100 shadow-lg flex justify-around py-4 md:hidden z-50">
        <button className="flex flex-col items-center text-green-600 font-medium">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mb-1">
            <Leaf className="w-4 h-4" />
          </div>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mb-1">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <span className="text-xs">Market</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mb-1">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-xs">Community</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mb-1">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}
