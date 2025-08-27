import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // Simulate loading user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Example login function (you can replace with API calls)
  const login = async (userData) => {
    try {
      // Simulate API success
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      showToast('Logged in successfully!', 'success');
    } catch (error) {
      console.error('Login error:', error);
      showToast('An error occurred during login. Please try again.', 'error');
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      showToast('Logged out successfully!', 'success');
    } catch (error) {
      console.error('Logout error:', error);
      showToast('An error occurred during logout. Please try again.', 'error');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
