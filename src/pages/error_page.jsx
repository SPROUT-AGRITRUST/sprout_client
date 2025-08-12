import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-center px-4 relative"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/duvr3z2z0/image/upload/v1755016772/2D_flat_illustration_of_a_sad_farmer_standing_in_a_rural_farm_field_holding_a_smartphone_showing_a_no_internet_icon._Minimalist_colorful_and_modern_agritech-themed_design_with_soft_pastel_tones_clear_sky_back_yeorhz.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0" />
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Big 404 Number */}
        <h1 className="text-8xl font-extrabold text-gray-800 animate-bounce">
          404
        </h1>
        {/* App Name */}
        <h2 className="text-green-600 font-bold text-5xl mt-2 tracking-wide">
          Sprout
        </h2>
        {/* Description */}
        <p className="text-lg text-gray-700 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2 max-w-md">
          Oops! Looks like the page you’re looking for took a wrong turn.
        </p>
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-200"
        >
          Go Home
        </button>
        {/* Fun Emoji */}
        <div className="mt-6 text-4xl animate-pulse">🌱</div>
      </div>
    </div>
  );
};

export default ErrorPage;
