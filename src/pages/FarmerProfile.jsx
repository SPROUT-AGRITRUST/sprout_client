import React, { useState, useEffect } from 'react';
import BackToHomeButton from "../components/BackToHomeButton";
import { User, MapPin, Phone, Mail, Calendar, Download, Filter, Eye, Edit3, Camera, Navigation } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

// Mock data for transactions and receipts
const mockTransactions = [
  {
    id: 1,
    itemName: 'Wheat Seeds',
    type: 'Seed',
    purchaseDate: '2024-01-15',
    amount: 2500,
    vendor: 'AgriSupply Co.',
    receiptUrl: '#'
  },
  {
    id: 2,
    itemName: 'NPK Fertilizer',
    type: 'Fertilizer',
    purchaseDate: '2024-01-20',
    amount: 1800,
    vendor: 'FarmMart',
    receiptUrl: '#'
  },
  {
    id: 3,
    itemName: 'Irrigation Pump',
    type: 'Equipment',
    purchaseDate: '2024-02-01',
    amount: 8500,
    vendor: 'AgriTech Solutions',
    receiptUrl: '#'
  },
  {
    id: 4,
    itemName: 'Pesticides',
    type: 'Chemical',
    purchaseDate: '2024-02-10',
    amount: 1200,
    vendor: 'CropCare Ltd.',
    receiptUrl: '#'
  },
  {
    id: 5,
    itemName: 'Corn Seeds',
    type: 'Seed',
    purchaseDate: '2024-02-15',
    amount: 3200,
    vendor: 'AgriSupply Co.',
    receiptUrl: '#'
  }
];

// Mock farmer profile data
const mockFarmerProfile = {
  fullName: 'Rajesh Kumar',
  phoneNumber: '+91 98765 43210',
  email: 'rajesh.kumar@email.com',
  farmName: 'Kumar Farms',
  age: 45,
  gender: 'Male',
  profilePicture: null,
  location: {
    village: 'Mohanpur',
    district: 'Punjab',
    state: 'Punjab',
    coordinates: {
      lat: 30.7333,
      lng: 76.7794
    }
  }
};

export default function FarmerProfile() {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'dashboard'
  const [isEditing, setIsEditing] = useState(false);
  const [locationMode, setLocationMode] = useState('manual'); // 'auto' or 'manual'
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { showToast } = useToast();
  
  // Profile form state
  const [profileData, setProfileData] = useState(mockFarmerProfile);
  const [profileImage, setProfileImage] = useState(null);
  
  // Dashboard state
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  // Calculate total spend
  const totalSpend = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = filterType === 'all' || transaction.type === filterType;
    const dateMatch = filterDate === 'all' || true; // Add date filtering logic if needed
    return typeMatch && dateMatch;
  });

  // Get unique transaction types for filter
  const transactionTypes = ['all', ...new Set(transactions.map(t => t.type))];

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle location input changes
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };
  
  // Detect location automatically
  const detectLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setProfileData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              coordinates: {
                lat: latitude,
                lng: longitude
              }
            }
          }));
          setIsLoadingLocation(false);
          setLocationMode('auto');
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          showToast('Unable to detect location. Please enter manually.', 'error');
        }
      );
    } else {
      setIsLoadingLocation(false);
      showToast('Geolocation is not supported by this browser.', 'error');
    }
  };


  // Save profile changes
  const saveProfile = () => {
    // Here you would typically make an API call to save the data
    console.log('Saving profile:', profileData);
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  // Download receipt
  const downloadReceipt = (transaction) => {
    // Mock download functionality
    console.log('Downloading receipt for:', transaction.itemName);
    showToast(`Downloading receipt for ${transaction.itemName}`, 'info');
  };

  // View transaction details
  const viewTransactionDetails = (transaction) => {
    // Mock view functionality
    console.log('Viewing details for:', transaction);
    showToast(`Viewing details for ${transaction.itemName}`, 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 md:p-8 relative">
      <BackToHomeButton />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Farmer Profile & Dashboard</h1>
            <p className="text-xl text-gray-600">Manage your profile and track your farming activities</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="w-5 h-5 inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === 'dashboard'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Dashboard
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'profile' ? (
              /* Profile Section */
              <div className="space-y-8">
                {/* Profile Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {/* Profile Picture */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                      {profileImage || profileData.profilePicture ? (
                        <img
                          src={profileImage || profileData.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-16 h-16 text-green-600" />
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors duration-200">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Name *
                    </label>
                    <input
                      type="text"
                      name="farmName"
                      value={profileData.farmName}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={profileData.age}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-50 bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Location Section */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Location Information</h3>
                  
                  {/* Location Mode Toggle */}
                  <div className="flex space-x-4 mb-6">
                    <button
                      onClick={() => setLocationMode('auto')}
                      className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center ${
                        locationMode === 'auto'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Auto Detect
                    </button>
                    <button
                      onClick={() => setLocationMode('manual')}
                      className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center ${
                        locationMode === 'manual'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Manual Entry
                    </button>
                  </div>

                  {locationMode === 'auto' ? (
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <Navigation className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-gray-700 mb-4">Click below to detect your location</p>
                      <button
                        onClick={detectLocation}
                        disabled={isLoadingLocation}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                      >
                        {isLoadingLocation ? 'Detecting...' : 'Detect Location'}
                      </button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Village/Town Name *
                        </label>
                        <input
                          type="text"
                          name="village"
                          value={profileData.location.village}
                          onChange={handleLocationChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          District *
                        </label>
                        <input
                          type="text"
                          name="district"
                          value={profileData.location.district}
                          onChange={handleLocationChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={profileData.location.state}
                          onChange={handleLocationChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  )}

                  {/* Map Preview */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Preview
                    </label>
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">
                          {profileData.location.coordinates.lat && profileData.location.coordinates.lng
                            ? `GPS: ${profileData.location.coordinates.lat.toFixed(4)}, ${profileData.location.coordinates.lng.toFixed(4)}`
                            : 'No location data'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="text-center pt-6">
                    <button
                      onClick={saveProfile}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Dashboard Section */
              <div className="space-y-8">
                {/* Dashboard Header */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Farming Dashboard</h2>
                  <p className="text-gray-600">Track your transactions</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Transactions</p>
                        <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                        <Download className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Spend</p>
                        <p className="text-2xl font-bold text-gray-900">₹{totalSpend.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                        <Eye className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-gray-900">₹{totalSpend.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                    <div className="flex space-x-2">
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {transactionTypes.map(type => (
                          <option key={type} value={type}>
                            {type === 'all' ? 'All Types' : type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Item</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{transaction.itemName}</p>
                                <p className="text-sm text-gray-500">{transaction.vendor}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                {transaction.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {new Date(transaction.purchaseDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-900">
                              ₹{transaction.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => viewTransactionDetails(transaction)}
                                  className="p-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => downloadReceipt(transaction)}
                                  className="p-1 text-green-600 hover:text-green-800 transition-colors duration-200"
                                  title="Download Receipt"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upcoming Activities */}
                <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Activities</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">Fertilizer Delivery</p>
                        <p className="text-sm text-gray-600">Expected: March 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">Irrigation System Maintenance</p>
                        <p className="text-sm text-gray-600">Scheduled: March 20, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 