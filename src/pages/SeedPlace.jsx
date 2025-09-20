import React, { useState } from "react";
import BackToHomeButton from "../components/BackToHomeButton";
import { useNavigate } from "react-router-dom";// Example trusted seed industry data (replace with real API/data in production)
const trustedIndustries = [
  {
    id: 1,
    name: "Bharat Seeds Pvt Ltd",
    logo: "https://img.icons8.com/color/96/000000/seedling.png",
    description:
      "Certified supplier of high-yielding, disease-resistant seeds.",
    website: "https://bharatseeds.com",
    seeds: [
      { id: 101, name: "Hybrid Rice", price: 1200, unit: "20kg bag" },
      { id: 102, name: "Maize Super-10", price: 950, unit: "10kg bag" },
    ],
  },
  {
    id: 2,
    name: "AgroTrust Seeds Co.",
    logo: "https://img.icons8.com/color/96/000000/plant-under-sun.png",
    description: "Trusted for organic and non-GMO seeds.",
    website: "https://agrotrustseeds.com",
    seeds: [
      { id: 201, name: "Organic Wheat", price: 800, unit: "25kg bag" },
      { id: 202, name: "Soybean Premium", price: 1100, unit: "15kg bag" },
    ],
  },
];
const SeedPlace = () => {
const [cart, setCart] = useState([]);
const [message, setMessage] = useState("");
const navigate = useNavigate();

const addToCart = (industry, seed) => {
  setCart((prev) => [...prev, { ...seed, industry: industry.name }]);
  setMessage(`${seed.name} added to cart!`);
  setTimeout(() => setMessage(""), 2000);
};

const handleCheckout = () => {
  // Store cart information in localStorage to persist it across pages
  localStorage.setItem('seedCart', JSON.stringify(cart));
  
  // Display success message
  setMessage("Proceeding to checkout...");
  
  // Navigate to payment page
  setTimeout(() => {
    navigate("/payment", { 
      state: { 
        cart: cart,
        totalAmount: cart.reduce((sum, item) => sum + item.price, 0),
        orderType: "seeds"
      } 
    });
  }, 1000);
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="mb-4">
        <BackToHomeButton />
      </div>
      <h1 className="text-3xl font-bold text-center mb-6 text-green-900">
        Seed Marketplace
      </h1>
      <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
        Buy seeds directly from trusted, certified industries. All suppliers are
        verified for quality and reliability. Browse, compare, and order seeds
        for your farm with confidence.
      </p>
      {message && (
        <div className="text-green-700 bg-green-100 border border-green-300 rounded-lg px-4 py-2 text-center mb-4 max-w-md mx-auto">
          {message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {trustedIndustries.map((industry) => (
          <div
            key={industry.id}
            className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-4 mb-2">
              <img
                src={industry.logo}
                alt={industry.name}
                className="w-16 h-16 rounded-full border border-green-200"
              />
              <div>
                <h2 className="text-xl font-bold text-green-800">
                  {industry.name}
                </h2>
                <p className="text-gray-600 text-sm">{industry.description}</p>
                <a
                  href={industry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs underline"
                >
                  Visit Website
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 mb-2">
                Available Seeds:
              </h3>
              <ul className="space-y-2">
                {industry.seeds.map((seed) => (
                  <li
                    key={seed.id}
                    className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2"
                  >
                    <div>
                      <span className="font-medium text-green-900">
                        {seed.name}
                      </span>
                      <span className="text-gray-600 text-xs ml-2">
                        ({seed.unit})
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-700 font-bold">
                        ₹{seed.price}
                      </span>
                      <button
                        onClick={() => addToCart(industry, seed)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border border-green-200 rounded-xl shadow-lg p-4 w-72 z-50">
          <h3 className="font-bold text-green-800 mb-2">Cart</h3>
          <ul className="mb-2 max-h-40 overflow-y-auto">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center text-sm py-1 border-b border-green-50 last:border-b-0"
              >
                <span>
                  {item.name}{" "}
                  <span className="text-gray-500">({item.unit})</span>
                </span>
                <span className="text-green-700 font-semibold">
                  ₹{item.price}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-green-900">
              ₹{cart.reduce((sum, item) => sum + item.price, 0)}
            </span>
          </div>
          <button className="w-full mt-3 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition-colors duration-200" 
          onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default SeedPlace;
