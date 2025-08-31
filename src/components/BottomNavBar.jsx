import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaSeedling, FaStore, FaUser } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import "./BottomNavBar.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
const BottomNavBar = () => {
  const { t } = useTranslation();
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 bg-white/90 glass-nav shadow-2xl rounded-3xl md:hidden border border-gray-100">
      <div className="flex flex-row justify-between items-center px-2 py-4 relative">
        {/* Nav Items Group */}
        <div className="flex flex-1 justify-around items-center">
          {/* Regular Nav Items */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-item flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
                isActive
                  ? "nav-item-active text-green-600 bg-green-100 shadow-lg ring-2 ring-green-200"
                  : "text-gray-600 hover:text-green-500 hover:bg-green-50"
              }`
            }
          >
            <FaHome className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 mb-1" />
            <span className="text-sm sm:text-base md:text-lg font-medium">Home</span>
          </NavLink>

          <NavLink
            to="/crops"
            className={({ isActive }) =>
              `nav-item flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
                isActive
                  ? "nav-item-active text-green-600 bg-green-100 shadow-lg ring-2 ring-green-200"
                  : "text-gray-600 hover:text-green-500 hover:bg-green-50"
              }`
            }
          >
            <FaSeedling className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 mb-1" />
            <span className="text-sm sm:text-base md:text-lg font-medium">Crops</span>
          </NavLink>

          {/* Floating Scanner Button */}
          <div className="relative -top-6">
            <NavLink
              to="/soil-analysis"
              className={({ isActive }) =>
                `scanner-button flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 relative overflow-hidden ${
                  isActive
                    ? "ring-4 ring-green-200 shadow-3xl animate-pulse"
                    : "hover:from-green-500 hover:via-green-600 hover:to-green-700"
                }`
              }
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-green-500/20 to-green-600/20 rounded-full animate-ping"></div>
              {/* Scanner Icon */}
              <MdQrCodeScanner className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 text-white relative z-10" />
              {/* Scan Ripple Animation */}
              <div className="absolute inset-0 rounded-full border-2 border-green-300/50 scan-ripple"></div>
              <div className="absolute inset-0 rounded-full border-2 border-green-200/30 scan-ripple-delayed"></div>
            </NavLink>
            {/* Floating Label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <span className="text-sm sm:text-base md:text-lg font-semibold text-green-600 bg-white px-2 py-1 rounded-full shadow-sm">
                Scan
              </span>
            </div>
          </div>

          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              `nav-item flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
                isActive
                  ? "nav-item-active text-green-600 bg-green-100 shadow-lg ring-2 ring-green-200"
                  : "text-gray-600 hover:text-green-500 hover:bg-green-50"
              }`
            }
          >
            <FaStore className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 mb-1" />
            <span className="text-sm sm:text-base md:text-lg font-medium">Marketplace</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-item flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
                isActive
                  ? "nav-item-active text-green-600 bg-green-100 shadow-lg ring-2 ring-green-200"
                  : "text-gray-600 hover:text-green-500 hover:bg-green-50"
              }`
            }
          >
            <FaUser className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 mb-1" />
            <span className="text-sm sm:text-base md:text-lg font-medium">Profile</span>
          </NavLink>
        </div>
        {/* Language Switcher at the end, spaced with extra margin */}
      </div>
    </nav>
  );
};

export default BottomNavBar;
