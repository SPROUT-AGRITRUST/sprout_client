import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";  
import CropManagement from "./pages/CropManagement";
import SoilAnalysis from "./pages/SoilAnalysis";
import FarmerProfile from "./pages/FarmerProfile";
import Marketplace from "./pages/Marketplace";
import { NotificationProvider } from './components/NotificationProvider';
import LoadingScreen from './components/LoadingScreen';
import './components/LoadingScreen.css';
import './components/Notification.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NotificationProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crops" element={<CropManagement />} />
        <Route path="/soil-analysis" element={<SoilAnalysis />} />
        <Route path="/profile" element={<FarmerProfile />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </NotificationProvider>
  );
};

export default App;
