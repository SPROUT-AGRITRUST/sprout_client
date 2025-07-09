import React from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="sprout-loading-screen">
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