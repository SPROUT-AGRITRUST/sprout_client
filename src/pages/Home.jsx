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
        <div className="rounded-3xl overflow-hidden shadow-xl bg-white border border-green-100 mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="relative">
            <img
              src="https://eu-images.contentstack.com/v3/assets/bltdd43779342bd9107/blt1645b96b020bdced/64380d5d8d2c523d0da7467d/543212762.jpg?width=1280&auto=webp&quality=80&format=jpg&disable=upscale"
              alt="Seasonal Field"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">🌿</span>
              </div>
              <h2 className="text-2xl font-bold text-green-800">
                Seasonal Tips
              </h2>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              Get tailored advice for your crops and region. Boost your yield with
              our expert guidance and stay ahead of seasonal challenges.
            </p>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 font-medium">
              Learn More
            </button>
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
