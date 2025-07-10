import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavBar.css';

const iconColor = '#ffffff';
const bgColor = '#388e3c';

const HomeIcon = () => (
  <svg width="24" height="24" fill={iconColor} viewBox="0 0 24 24">
    <path d="M3 12L12 4l9 8v7a2 2 0 0 1-2 2h-2a1 1 0 0 1-1-1v-4h-4v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2z"/>
  </svg>
);
const CropsIcon = () => (
  <svg width="24" height="24" fill={iconColor} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="6" />
    <rect x="11" y="2" width="2" height="4" rx="1" />
    <rect x="11" y="18" width="2" height="4" rx="1" />
    <rect x="2" y="11" width="4" height="2" rx="1" />
    <rect x="18" y="11" width="4" height="2" rx="1" />
  </svg>
);
const MarketIcon = () => (
  <svg width="24" height="24" fill={iconColor} viewBox="0 0 24 24">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <rect x="7" y="3" width="2" height="4" rx="1" />
    <rect x="15" y="3" width="2" height="4" rx="1" />
  </svg>
);
const ProfileIcon = () => (
  <svg width="24" height="24" fill={iconColor} viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20a8 8 0 0 1 16 0v1H4v-1z" />
  </svg>
);

const BottomNavBar = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <span className="icon"><HomeIcon /></span>
        <span className="label">Home</span>
      </NavLink>
      <NavLink to="/crops" className="nav-item">
        <span className="icon"><CropsIcon /></span>
        <span className="label">Crops</span>
      </NavLink>
      <NavLink to="/marketplace" className="nav-item">
        <span className="icon"><MarketIcon /></span>
        <span className="label">Market</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item">
        <span className="icon"><ProfileIcon /></span>
        <span className="label">Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavBar; 