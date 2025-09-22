import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  Leaf,
  Bot,
  ShoppingCart,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import WeatherBox from "../components/WeatherBox";
import MobileWeatherBox from "../components/MobileWeatherBox";
import LanguageSwitcher from "../components/LanguageSwitcher";

import { useTranslation } from "react-i18next";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTagline, setCurrentTagline] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Inspiring taglines for farmers
  const taglines = [
    { text: "🌱 Every seed planted is a hope for tomorrow", emoji: "🌱" },
    { text: "🚜 Smart farming for a sustainable future", emoji: "🚜" },
    { text: "🌾 From soil to success, we grow together", emoji: "🌾" },
    { text: "💚 Technology meets tradition in agriculture", emoji: "💚" },
    { text: "🌿 Cultivating dreams, harvesting success", emoji: "🌿" },
    { text: "🔬 Data-driven decisions for better yields", emoji: "🔬" },
    { text: "🌍 Growing food, growing the future", emoji: "🌍" },
  ];

  // Move quickActions and carouselData here so t is defined
  const quickActions = [
    {
      label: t("home.quickActions.soil"),
      icon: <Search className="w-6 h-6" />,
      link: "/soil-analysis",
    },
    {
      label: t("home.quickActions.crops"),
      icon: <Leaf className="w-6 h-6" />,
      link: "/crops",
    },
    {
      label: t("home.quickActions.profile"),
      icon: <User className="w-6 h-6" />,
      link: "/profile",
    },
    {
      label: t("home.quickActions.market"),
      icon: <ShoppingCart className="w-6 h-6" />,
      link: "/marketplace",
    },
  ];

  const carouselData = [
    {
      id: 1,
      title: t("carousel1.title"),
      subtitle: t("carousel1.subtitle"),
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bgColor: "from-emerald-500 to-green-600",
    },
    {
      id: 2,
      title: t("carousel2.title"),
      subtitle: t("carousel2.subtitle"),
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bgColor: "from-green-500 to-emerald-600",
    },
    {
      id: 3,
      title: t("carousel3.title"),
      subtitle: t("carousel3.subtitle"),
      image:
        "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      bgColor: "from-teal-500 to-green-600",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance taglines with alternating animations
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-32 md:pb-0">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-green-100">
        <div className="flex justify-between items-center px-4 py-4 md:px-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Sprout <span className="text-green-600 text-2xl">🌱</span>
          </h1>
          <div className="flex items-center space-x-4">
            {/* Language Switcher - visible on desktop */}
            <div className="hidden md:flex items-center">
              <LanguageSwitcher variant="minimal" />
            </div>

            {/* More Link - visible on desktop */}
            <a
              href="/language-settings"
              className="hidden md:flex items-center px-3 py-2 text-green-600 hover:text-green-800 text-sm font-medium underline hover:no-underline transition-all duration-200"
            >
              {t("language.more", "More")}
            </a>

            {/* Profile Icon - visible on desktop */}
            <button
              className="hidden md:flex p-3 bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
              onClick={() => navigate("/profile")}
            >
              <User className="w-6 h-6 text-white" title="Profile" />
            </button>

            {/* Notification Icon - always visible */}
            <button
              className="relative p-3 bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-2 right-2 h-3 w-3 bg-white rounded-full animate-pulse border border-green-600" />
            </button>
            {/* Language Switcher - mobile only */}
            <div className="flex items-center md:hidden">
              <LanguageSwitcher variant="minimal" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout - Vertical Stack */}
          <div className="flex flex-col md:hidden gap-6">
            {/* Welcome Box - Mobile */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-lg text-gray-600 mb-2 font-medium">
                {t("home.welcome", "Welcome back")} 👋
              </h2>
              <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text font-serif tracking-tight leading-tight">
                {user?.name || t("home.farmer", "Farmer")}
              </h1>
              <p className="text-base text-gray-500 mt-2 font-light italic">
                Ready to grow something amazing today? 🌱
              </p>
            </div>

            {/* Animated Taglines Section - Mobile */}
            <div className="relative h-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/30 to-transparent rounded-xl"></div>
              {taglines.map((tagline, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                    index === currentTagline
                      ? "translate-y-0 opacity-100"
                      : index % 2 === 0
                      ? "-translate-y-full opacity-0"
                      : "translate-y-full opacity-0"
                  }`}
                >
                  <div className="text-center px-4">
                    <p className="text-lg font-semibold text-transparent bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text tracking-wide">
                      {tagline.text}
                    </p>
                    <div className="flex justify-center mt-2">
                      <div className="flex space-x-1">
                        {taglines.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              i === currentTagline
                                ? "bg-green-600 w-6"
                                : "bg-green-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Weather Box - Mobile */}
            <div>
              <MobileWeatherBox />
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-12 gap-3 items-stretch">
            {/* Welcome Box - Desktop */}
            <div className="col-span-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-center min-h-[100px  ]">
              <h2 className="text-lg text-gray-600 mb-1 font-medium text-center">
                {t("home.welcome", "Welcome back")} 👋
              </h2>
              <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text font-serif tracking-tight leading-tight mb-1 text-center">
                {user?.name || t("home.farmer", "Farmer")}
              </h1>
              <p className="text-base text-gray-500 font-light italic text-center">
                Ready to grow! 🌱
              </p>
            </div>

            {/* Animated Taglines Section - Desktop (Wider) */}
            <div className="col-span-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-center min-h-[120px]">
              <div className="relative h-10 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/30 to-transparent rounded-md"></div>
                {taglines.map((tagline, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                      index === currentTagline
                        ? "translate-y-0 opacity-100"
                        : index % 2 === 0
                        ? "-translate-y-full opacity-0"
                        : "translate-y-full opacity-0"
                    }`}
                  >
                    <div className="text-center px-3">
                      <p className="text-lg font-semibold text-transparent bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
                        {tagline.text}
                      </p>
                      <div className="flex justify-center mt-1">
                        <div className="flex space-x-1">
                          {taglines.map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                i === currentTagline
                                  ? "bg-green-600 w-4"
                                  : "bg-green-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Box - Desktop */}
            <div className="col-span-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-2 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col min-h-[30px]">
              <h3 className="text-xs font-semibold text-gray-800 mb-1 text-center">
                {t("weather.title", "Weather Info")} 🌤️
              </h3>
              <div className="flex-1">
                <WeatherBox fullHeight={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Soil Report Banner */}
      <div className="px-4 py-6 md:px-8 mb-8">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-center">
            {/* Content */}
            <div className="flex-1 p-4 md:p-12 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t("home.soilReportTitle")}
                </h2>
              </div>
              <p className="text-xl text-green-100 mb-6 leading-relaxed">
                {t("home.soilReportDescription")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink
                  to="/soil-analysis"
                  className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors duration-200 shadow-lg text-center"
                >
                  {t("home.uploadSoilReport")}
                </NavLink>
                <NavLink
                  to="/learn-more"
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200 text-center"
                >
                  {t("home.learnMore")}
                </NavLink>
              </div>
            </div>
            <div className="flex-1 p-8 md:p-12 hidden md:block">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                {carouselData.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                          <Leaf className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {slide.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 md:px-8 mb-8 md:mb-0">
        {/* Services Section */}
        <div className="mb-16 md:mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("home.ourServices")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto *:">
              <span className="hidden md:inline">
                {t("home.ourServicesDescription")}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {t("home.affordableSeeds", "Affordable Quality Seeds")}
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                {t(
                  "home.affordableSeedsDescription",
                  "High-quality seeds at competitive prices to ensure a bountiful harvest."
                )}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {t("home.cropPlanning")}
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                {t("home.cropPlanningDescription")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {t("home.soilAnalysis")}
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                {t("home.soilAnalysisDescription")}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {t("home.community", "Community & Resource")}
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                {t(
                  "home.communityDescription",
                  "Connect with local agricultural communities and resources, share knowledge, and access support networks."
                )}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {t("home.marketAccess")}
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                {t("home.marketAccessDescription")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {t("home.aiConsulting")}
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                {t("home.aiConsultingDescription")}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-20 hidden md:block">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            {t("home.quickActions.title")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <NavLink
                key={action.label}
                to={action.link}
                className="group flex flex-col items-center justify-center p-4 bg-white border border-green-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:border-green-200"
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl text-green-600 mb-3 group-hover:scale-105 transition-transform duration-300">
                  {action.icon}
                </div>
                <span className="text-sm text-center font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  {action.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
