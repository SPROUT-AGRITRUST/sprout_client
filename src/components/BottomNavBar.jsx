import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSeedling, FaStore, FaUser } from 'react-icons/fa';
import { MdQrCodeScanner } from 'react-icons/md';

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-green-100 shadow-lg rounded-t-3xl md:hidden">
      <div className="flex justify-around items-center px-2 py-2 relative">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-green-600 bg-green-50 shadow-sm' 
                : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
            }`
          }
        >
          <FaHome className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        <NavLink 
          to="/crops" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-green-600 bg-green-50 shadow-sm' 
                : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
            }`
          }
        >
          <FaSeedling className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">Crop</span>
        </NavLink>

        {/* Center Soil Scanner Button - Elevated */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-3">
          <NavLink 
            to="/soil-analysis" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 ${
                isActive 
                  ? 'ring-4 ring-green-200 shadow-2xl' 
                  : 'hover:from-green-600 hover:to-green-700'
              }`
            }
          >
            <MdQrCodeScanner className="w-5 h-5 text-white" />
          </NavLink>
        </div>

        <NavLink 
          to="/marketplace" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-green-600 bg-green-50 shadow-sm' 
                : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
            }`
          }
        >
          <FaStore className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">Market</span>
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-green-600 bg-green-50 shadow-sm' 
                : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
            }`
          }
        >
          <FaUser className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavBar; 