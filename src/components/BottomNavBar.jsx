import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSeedling, FaStore, FaUser } from 'react-icons/fa';

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-green-100 shadow-lg rounded-t-3xl">
      <div className="flex justify-around items-center px-4 py-3">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-green-600 bg-green-50 shadow-sm' 
                : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
            }`
          }
        >
          <FaHome className="w-8 h-8 mb-1" />
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        <NavLink 
          to="/crops" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-green-600 bg-green-50 shadow-sm' 
                : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
            }`
          }
        >
          <FaSeedling className="w-8 h-8 mb-1" />
          <span className="text-xs font-medium">Crop</span>
        </NavLink>

        <NavLink 
          to="/marketplace" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-green-600 bg-green-50 shadow-sm' 
                : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
            }`
          }
        >
          <FaStore className="w-8 h-8 mb-1" />
          <span className="text-xs font-medium">Market</span>
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-green-600 bg-green-50 shadow-sm' 
                : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
            }`
          }
        >
          <FaUser className="w-8 h-8 mb-1" />
          <span className="text-xs font-medium">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavBar; 