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

import { useTranslation } from "react-i18next";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-green-100">
        <div className="flex justify-between items-center px-4 py-4 md:px-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Sprout <span className="text-green-600">🌱</span>
          </h1>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                  <Bell
                    className="w-5 h-5 text-green-600"
                    onClick={() => {
                      navigate("/notifications");
                    }}
                  />
                  <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                </button>
                <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 ml-2">
                  <User
                    className="w-6 h-6 text-green-700"
                    title="Profile"
                    onClick={() => {
                      navigate("/profile");
                    }}
                  />
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="hidden md:block px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                >
                  {t("home.signIn")}
                </NavLink>
                <NavLink
                  to="/signup"
                  className="hidden md:block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  {t("home.getStarted")}
                </NavLink>
                <button className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                  <Bell
                    className="w-5 h-5 text-green-600"
                    onClick={() => {
                      navigate("/notifications");
                    }}
                  />
                  <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                </button>
              </>
            )}
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
              placeholder={t("home.searchPlaceholder")}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
            />
            <button className="absolute inset-y-0 right-0 px-6 bg-green-600 text-white rounded-r-2xl hover:bg-green-700 transition-colors duration-200 font-medium">
              {t("home.searchButton", "Search")}
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
                  to="/soil-analysis"
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200 text-center"
                >
                  {t("home.learnMore")}
                </NavLink>
              </div>
            </div>
            <div className="flex-1 p-8 md:p-12">
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

      <div className="px-4 py-6 md:px-8">
        

        {/* Services Section */}
        <div className="mb-16">
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

          <div className="grid grid-cols-2 gap-6">
             <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
             
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
               Affordable Quality Seeds
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                High-quality seeds at competitive prices to ensure a bountiful harvest.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("home.cropPlanning")}
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                {t("home.cropPlanningDescription")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("home.soilAnalysis")}
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                {t("home.soilAnalysisDescription")}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Community & Resource
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                Connect with local agricultural communities and resources, share
                knowledge, and access support networks.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("home.marketAccess")}
              </h3>
              <p className="text-gray-600 text-sm hidden md:inline">
                {t("home.marketAccessDescription")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
                className="group flex flex-col items-center justify-center p-6 bg-white border border-green-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-green-200"
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
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

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-green-100 shadow-lg flex justify-around py-2 md:hidden z-50">
        <NavLink
          to="/"
          className="flex flex-col items-center text-green-600 font-medium"
        >
          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mb-1">
            <Leaf className="w-3 h-3" />
          </div>
          <span className="text-xs">{t("home.mobileNav.home")}</span>
        </NavLink>
        <NavLink
          to="/crops"
          className="flex flex-col items-center text-gray-500 hover:text-green-600 transition-colors duration-200"
        >
          <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mb-1">
            <Leaf className="w-3 h-3" />
          </div>
          <span className="text-xs">{t("home.mobileNav.crops")}</span>
        </NavLink>
        <NavLink
          to="/soil-analysis"
          className="flex flex-col items-center text-gray-500 hover:text-green-600 transition-colors duration-200"
        >
          <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mb-1">
            <Search className="w-3 h-3" />
          </div>
          <span className="text-xs">{t("home.mobileNav.soil")}</span>
        </NavLink>
        <NavLink
          to="/profile"
          className="flex flex-col items-center text-gray-500 hover:text-green-600 transition-colors duration-200"
        >
          <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mb-1">
            <User className="w-3 h-3" />
          </div>
          <span className="text-xs">{t("home.mobileNav.profile")}</span>
        </NavLink>
      </div>
    </div>
  );
}
