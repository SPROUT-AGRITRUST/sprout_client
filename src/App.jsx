import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";  
import CropManagement from "./pages/CropManagement";
import SoilAnalysis from "./pages/SoilAnalysis";
import FarmerProfile from "./pages/FarmerProfile";

const App = () => {
  return (
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crops" element={<CropManagement />} />
        <Route path="/soil-analysis" element={<SoilAnalysis />} />
        <Route path="/profile" element={<FarmerProfile />} />
      </Routes>
  
  );
};

export default App;
