import React from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="sprout-loading-screen">
      {/* Animated background sapling */}
      <svg
        className="sprout-bg-sapling"
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Soil */}
        <ellipse cx="160" cy="160" rx="80" ry="18" fill="#b7d7a8" className="soil-ellipse" />
        {/* Seed */}
        <ellipse cx="160" cy="120" rx="7" ry="10" fill="#a67c52" className="seed-drop" />
        {/* Sprout stem */}
        <rect x="157" y="120" width="6" height="0" rx="3" fill="#228B22" className="sprout-stem" />
        {/* Left leaf */}
        <ellipse cx="152" cy="110" rx="0" ry="0" fill="#6fcf97" className="sprout-leaf-left" />
        {/* Right leaf */}
        <ellipse cx="168" cy="110" rx="0" ry="0" fill="#6fcf97" className="sprout-leaf-right" />
      </svg>
      {/* Main Sprout text animation */}
      <svg
        className="sprout-logo"
        viewBox="0 0 320 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Sprout logo animation"
      >
        <text
          x="0"
          y="60"
          className="sprout-text"
        >
          Sprou
        </text>
        <g className="sprout-t-group">
          <text x="180" y="60" className="sprout-t">t</text>
          <g className="sprout-leaf">
            <ellipse cx="200" cy="38" rx="8" ry="16" />
          </g>
        </g>
      </svg>
    </div>
  );
} 