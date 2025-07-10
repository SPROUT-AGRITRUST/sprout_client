import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const letters = "Sprout".split("");

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        {/* Sprout Animated Title */}
        <div className="flex justify-center space-x-1 text-5xl font-bold text-green-600">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Sprout pulse or dot animation */}
        <motion.div
          className="mt-4 w-3 h-3 mx-auto rounded-full bg-green-500"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />

        {/* Optional Loading Text */}
        <p className="mt-3 text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
