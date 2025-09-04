import React from "react";
import { useNavigate } from "react-router-dom";

const BackToHomeButton = ({ className = "" }) => {
  const navigate = useNavigate();
  return (
    <button
              className="bg-green-600 text-white rounded px-3 py-2 text-sm font-bold mr-2 transition-colors duration-200 hover:bg-green-700"
              onClick={() => navigate("/")}
            >
             ⟵
            </button>
  );
};

export default BackToHomeButton;
