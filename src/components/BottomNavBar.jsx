import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSeedling, FaStore, FaUser } from 'react-icons/fa';
import { MdQrCodeScanner } from 'react-icons/md';

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 bg-white  shadow-xl rounded-2xl md:hidden">
      <div className="flex justify-around items-center px-1 py-4">
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
          <FaHome className="w-7 h-7 mb-2" />
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
          <FaSeedling className="w-7 h-7 mb-2" />
          <span className="text-xs font-medium">Crop</span>
        </NavLink>

        {/* Center Soil Scanner Button - Elevated */}
       
          <NavLink 
            to="/soil-analysis" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 ${
                isActive 
                  ? 'ring-4 ring-green-200 shadow-3xl' 
                  : 'hover:from-green-600 hover:to-green-700'
              }`
            }
          >
            <MdQrCodeScanner className="w-8 h-8 text-white" />
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
          <FaStore className="w-7 h-7 mb-2" />
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
          <FaUser className="w-7 h-7 mb-2" />
          <span className="text-xs font-medium">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavBar; 