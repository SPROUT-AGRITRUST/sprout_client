import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";  

const App = () => {
  return (
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    
  );
};

export default App;
