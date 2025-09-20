import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import BottomNavBar from "../components/BottomNavBar";

export default function SeedMarketplace() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [seeds, setSeeds] = useState([
    {
      id: 1,
      name: "Cotton Seeds",
      description: "High-quality cotton seeds for optimal yield",
      price: 350,
      unit: "per kg",
      image: "https://via.placeholder.com/150?text=Cotton+Seeds",
      rating: 4.5,
      availability: "In Stock",
    },
    {
      id: 2,
      name: "Rice Seeds",
      description: "Premium rice seeds suitable for local climate",
      price: 280,
      unit: "per kg",
      image: "https://via.placeholder.com/150?text=Rice+Seeds",
      rating: 4.2,
      availability: "In Stock",
    },
    {
      id: 3,
      name: "Wheat Seeds",
      description: "Disease-resistant wheat seeds for better harvest",
      price: 320,
      unit: "per kg",
      image: "https://via.placeholder.com/150?text=Wheat+Seeds",
      rating: 4.0,
      availability: "Limited Stock",
    },
    {
      id: 4,
      name: "Vegetable Seed Kit",
      description: "Variety pack of vegetable seeds for kitchen gardens",
      price: 450,
      unit: "per pack",
      image: "https://via.placeholder.com/150?text=Vegetable+Seeds",
      rating: 4.8,
      availability: "In Stock",
    },
  ]);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      showError(t("auth.errorNotAuthenticated"));
      navigate("/login");
    }
  }, [isAuthenticated, navigate, showError, t]);

  const handlePurchase = (seedId) => {
    // This would be connected to a payment system in a real app
    const selectedSeed = seeds.find((seed) => seed.id === seedId);
    if (selectedSeed) {
      alert(
        `${t("seedMarketplace.purchaseConfirmation")} ${selectedSeed.name}`
      );
      // In a real app, you would initiate checkout process here
    }
  };

  return (
    <div className="container mx-auto px-4 pb-20 pt-4">
      <h1 className="text-2xl font-bold mb-6">{t("seedMarketplace.title")}</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seeds.map((seed) => (
            <div
              key={seed.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-1 bg-gray-200">
                <img
                  src={seed.image}
                  alt={seed.name}
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{seed.name}</h3>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>{seed.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{seed.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">₹{seed.price}</span>
                    <span className="text-gray-500 text-sm"> {seed.unit}</span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      seed.availability === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {seed.availability}
                  </span>
                </div>
                <button
                  onClick={() => handlePurchase(seed.id)}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  {t("seedMarketplace.buyNow")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}
