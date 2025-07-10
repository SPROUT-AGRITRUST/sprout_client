import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Phone, 
  MessageCircle, 
  Star, 
  Eye,
  Upload,
  DollarSign,
  Package,
  User,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock data for product listings
const mockListings = [
  {
    id: 1,
    productName: 'Basmati Rice Paddy',
    cropType: 'Cereal',
    quantity: 50,
    unit: 'quintals',
    pricePerUnit: 2500,
    farmerName: 'Rajesh Kumar',
    location: { village: 'Mohanpur', district: 'Punjab' },
    harvestDate: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'freshly-harvested',
    description: 'Premium quality basmati paddy, freshly harvested and ready for milling.',
    verifiedFarmer: true,
    offers: [
      { trader: 'ABC Rice Mills', amount: 2400, date: '2024-02-20' },
      { trader: 'Punjab Agro', amount: 2350, date: '2024-02-19' }
    ]
  },
  {
    id: 2,
    productName: 'Yellow Maize',
    cropType: 'Cereal',
    quantity: 75,
    unit: 'quintals',
    pricePerUnit: 1800,
    farmerName: 'Sukhwinder Singh',
    location: { village: 'Ludhiana', district: 'Punjab' },
    harvestDate: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'ready-to-ship',
    description: 'High-quality yellow maize, perfect for animal feed and industrial use.',
    verifiedFarmer: false,
    offers: [
      { trader: 'FeedCorp Ltd', amount: 1750, date: '2024-02-18' }
    ]
  },
  {
    id: 3,
    productName: 'Green Gram (Moong)',
    cropType: 'Pulse',
    quantity: 25,
    unit: 'quintals',
    pricePerUnit: 8500,
    farmerName: 'Priya Sharma',
    location: { village: 'Haryana', district: 'Haryana' },
    harvestDate: '2024-02-12',
    image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'freshly-harvested',
    description: 'Organic green gram, chemical-free farming, premium quality.',
    verifiedFarmer: true,
    offers: []
  },
  {
    id: 4,
    productName: 'Mustard Seeds',
    cropType: 'Oilseed',
    quantity: 30,
    unit: 'quintals',
    pricePerUnit: 5200,
    farmerName: 'Amarjeet Kaur',
    location: { village: 'Bathinda', district: 'Punjab' },
    harvestDate: '2024-02-08',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'ready-to-ship',
    description: 'High oil content mustard seeds, suitable for oil extraction.',
    verifiedFarmer: true,
    offers: [
      { trader: 'OilCo Industries', amount: 5100, date: '2024-02-17' },
      { trader: 'Agro Oil Mills', amount: 5050, date: '2024-02-16' }
    ]
  },
  {
    id: 5,
    productName: 'Wheat',
    cropType: 'Cereal',
    quantity: 100,
    unit: 'quintals',
    pricePerUnit: 2200,
    farmerName: 'Gurpreet Singh',
    location: { village: 'Amritsar', district: 'Punjab' },
    harvestDate: '2024-02-05',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'freshly-harvested',
    description: 'Premium quality wheat, high protein content, suitable for bread making.',
    verifiedFarmer: false,
    offers: []
  }
];

// Crop types for filtering
const cropTypes = ['All', 'Cereal', 'Pulse', 'Oilseed', 'Vegetable', 'Fruit'];

// Status options
const statusOptions = ['All', 'freshly-harvested', 'ready-to-ship', 'in-storage'];

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('buy'); // 'buy', 'sell', 'my-listings'
  const [listings, setListings] = useState(mockListings);
  const [filteredListings, setFilteredListings] = useState(mockListings);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropType, setSelectedCropType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  // Form states
  const [uploadForm, setUploadForm] = useState({
    productName: '',
    cropType: '',
    quantity: '',
    unit: 'quintals',
    pricePerUnit: '',
    harvestDate: '',
    description: '',
    image: null
  });

  // Bid form state
  const [bidAmount, setBidAmount] = useState('');

  // Filter listings based on search and filters
  useEffect(() => {
    let filtered = listings;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.village.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Crop type filter
    if (selectedCropType !== 'All') {
      filtered = filtered.filter(listing => listing.cropType === selectedCropType);
    }

    // Status filter
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(listing => listing.status === selectedStatus);
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(listing => listing.pricePerUnit >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(listing => listing.pricePerUnit <= parseInt(priceRange.max));
    }

    setFilteredListings(filtered);
  }, [listings, searchTerm, selectedCropType, selectedStatus, priceRange]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadForm(prev => ({
        ...prev,
        image: URL.createObjectURL(file)
      }));
    }
  };

  // Submit new listing
  const handleSubmitListing = (e) => {
    e.preventDefault();
    
    const newListing = {
      id: Date.now(),
      ...uploadForm,
      farmerName: 'Current User', // In real app, get from auth context
      location: { village: 'Current Village', district: 'Current District' }, // In real app, get from user profile
      status: 'freshly-harvested',
      verifiedFarmer: false,
      offers: [],
      image: uploadForm.image || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    };

    setListings([newListing, ...listings]);
    setShowUploadModal(false);
    setUploadForm({
      productName: '',
      cropType: '',
      quantity: '',
      unit: 'quintals',
      pricePerUnit: '',
      harvestDate: '',
      description: '',
      image: null
    });
  };

  // Submit bid
  const handleSubmitBid = (e) => {
    e.preventDefault();
    
    if (selectedListing) {
      const newOffer = {
        trader: 'Your Company', // In real app, get from auth context
        amount: parseInt(bidAmount),
        date: new Date().toISOString().split('T')[0]
      };

      const updatedListings = listings.map(listing =>
        listing.id === selectedListing.id
          ? { ...listing, offers: [...listing.offers, newOffer] }
          : listing
      );

      setListings(updatedListings);
      setShowBidModal(false);
      setBidAmount('');
      setSelectedListing(null);
    }
  };

  // Get status info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'freshly-harvested':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          text: 'Freshly Harvested',
          icon: <CheckCircle className="w-4 h-4" />
        };
      case 'ready-to-ship':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          text: 'Ready to Ship',
          icon: <Package className="w-4 h-4" />
        };
      case 'in-storage':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          text: 'In Storage',
          icon: <Clock className="w-4 h-4" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          text: 'Unknown',
          icon: <AlertCircle className="w-4 h-4" />
        };
    }
  };

  // Get crop type color
  const getCropTypeColor = (type) => {
    switch (type) {
      case 'Cereal':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pulse':
        return 'bg-green-100 text-green-800';
      case 'Oilseed':
        return 'bg-orange-100 text-orange-800';
      case 'Vegetable':
        return 'bg-blue-100 text-blue-800';
      case 'Fruit':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 md:p-8 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === 'buy'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Buy Produce
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === 'sell'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sell Produce
            </button>
            <button
              onClick={() => setActiveTab('my-listings')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === 'my-listings'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Listings
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'buy' && (
              /* Buy Produce Section */
              <div>
                {/* Search and Filters */}
                <div className="mb-6 space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search for products or farmers"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={selectedCropType}
                        onChange={(e) => setSelectedCropType(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                      >
                        {cropTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status === 'All' ? 'All Statuses' : status.replace('-', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                      <input
                        type="number"
                        placeholder="Min Price"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                      <input
                        type="number"
                        placeholder="Max Price"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => {
                    const statusInfo = getStatusInfo(listing.status);
                    return (
                      <div key={listing.id} className="bg-white rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
                        {/* Product Image */}
                        <div className="relative">
                          <img
                            src={listing.image}
                            alt={listing.productName}
                            className="w-full h-48 object-cover rounded-t-2xl"
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCropTypeColor(listing.cropType)}`}>
                              {listing.cropType}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className={`flex items-center px-2 py-1 rounded-full border text-xs font-medium ${statusInfo.color}`}>
                              {statusInfo.icon}
                              <span className="ml-1">{statusInfo.text}</span>
                            </div>
                          </div>
                          {listing.verifiedFarmer && (
                            <div className="absolute bottom-3 left-3">
                              <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{listing.productName}</h3>
                          <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Package className="w-4 h-4 mr-2" />
                              {listing.quantity} {listing.unit}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="w-4 h-4 mr-2" />
                              ₹{listing.pricePerUnit.toLocaleString()} per {listing.unit.slice(0, -1)}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="w-4 h-4 mr-2" />
                              {listing.farmerName}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              {listing.location.village}, {listing.location.district}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              Harvested: {new Date(listing.harvestDate).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Offers Count */}
                          {listing.offers.length > 0 && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                {listing.offers.length} offer{listing.offers.length > 1 ? 's' : ''} received
                              </p>
                              <p className="text-xs text-blue-600">
                                Highest: ₹{Math.max(...listing.offers.map(o => o.amount)).toLocaleString()}
                              </p>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedListing(listing);
                                setShowContactModal(true);
                              }}
                              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                            >
                              <Phone className="w-4 h-4 inline mr-1" />
                              Contact
                            </button>
                            <button
                              onClick={() => {
                                setSelectedListing(listing);
                                setShowBidModal(true);
                              }}
                              className="flex-1 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200 text-sm font-medium"
                            >
                              <DollarSign className="w-4 h-4 inline mr-1" />
                              Make Offer
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Empty State */}
                {filteredListings.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">Try adjusting your search</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sell' && (
              /* Sell Produce Section */
              <div className="text-center py-12">
                <Upload className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Sell</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  List your produce now
                </p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  List Your Produce Now
                </button>
              </div>
            )}

            {activeTab === 'my-listings' && (
              /* My Listings Section */
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">My Product Listings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.filter(listing => listing.farmerName === 'Current User').map((listing) => {
                    const statusInfo = getStatusInfo(listing.status);
                    return (
                      <div key={listing.id} className="bg-white rounded-2xl shadow-lg border border-green-100">
                        <img
                          src={listing.image}
                          alt={listing.productName}
                          className="w-full h-32 object-cover rounded-t-2xl"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{listing.productName}</h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCropTypeColor(listing.cropType)}`}>
                              {listing.cropType}
                            </span>
                            <div className={`flex items-center px-2 py-1 rounded-full border text-xs font-medium ${statusInfo.color}`}>
                              {statusInfo.icon}
                              <span className="ml-1">{statusInfo.text}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {listing.quantity} {listing.unit} • ₹{listing.pricePerUnit.toLocaleString()}
                          </p>
                          {listing.offers.length > 0 && (
                            <div className="p-2 bg-blue-50 rounded-lg mb-2">
                              <p className="text-xs text-blue-800">
                                {listing.offers.length} offer{listing.offers.length > 1 ? 's' : ''} received
                              </p>
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <button className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors duration-200">
                              View Offers
                            </button>
                            <button className="flex-1 px-3 py-1 border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-50 transition-colors duration-200">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">List Your Produce</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitListing} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={uploadForm.productName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder="e.g. Basmati Rice Paddy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Type *
                  </label>
                  <select
                    name="cropType"
                    value={uploadForm.cropType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select Crop Type</option>
                    {cropTypes.slice(1).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={uploadForm.quantity}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit
                    </label>
                    <select
                      name="unit"
                      value={uploadForm.unit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="quintals">quintals</option>
                      <option value="kg">kilograms</option>
                      <option value="tons">tons</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Unit (₹) *
                  </label>
                  <input
                    type="number"
                    name="pricePerUnit"
                    value={uploadForm.pricePerUnit}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder="2500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harvest Date *
                  </label>
                  <input
                    type="date"
                    name="harvestDate"
                    value={uploadForm.harvestDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={uploadForm.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Describe your product quality and farming methods"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  >
                    List Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Contact Farmer</h2>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedListing.productName}</h3>
                  <p className="text-sm text-gray-600">by {selectedListing.farmerName}</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Farmer
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send WhatsApp Message
                  </button>
                </div>

                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Make An Offer</h2>
                <button
                  onClick={() => setShowBidModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitBid} className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedListing.productName}</h3>
                  <p className="text-sm text-gray-600">
                    Current Price ₹{selectedListing.pricePerUnit.toLocaleString()} per {selectedListing.unit.slice(0, -1)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Offer (₹ per {selectedListing.unit.slice(0, -1)}) *
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter Your Offer Amount"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBidModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  >
                    Submit Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 