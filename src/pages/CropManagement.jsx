import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Leaf,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import BackToHomeButton from "../components/BackToHomeButton";

// Mock data for initial crops
const mockCrops = [
  {
    id: 1,
    name: "Wheat",
    plantingDate: "2024-01-15",
    expectedHarvestDate: "2024-06-15",
    fieldName: "North Field A",
    cropType: "Cereal",
    notes: "Winter wheat variety, good soil conditions",
    status: "growing",
  },
  {
    id: 2,
    name: "Tomatoes",
    plantingDate: "2024-03-01",
    expectedHarvestDate: "2024-07-15",
    fieldName: "Greenhouse 1",
    cropType: "Vegetable",
    notes: "Cherry tomatoes, organic fertilizer applied",
    status: "nearing",
  },
  {
    id: 3,
    name: "Corn",
    plantingDate: "2024-02-20",
    expectedHarvestDate: "2024-05-20",
    fieldName: "East Field B",
    cropType: "Cereal",
    notes: "Sweet corn variety, needs irrigation check",
    status: "overdue",
  },
];

const cropTypes = [
  "Cereal",
  "Vegetable",
  "Fruit",
  "Legume",
  "Root Crop",
  "Herb",
];

export default function CropManagement() {
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    plantingDate: "",
    expectedHarvestDate: "",
    fieldName: "",
    cropType: "",
    notes: "",
  });

  // Load mock data on component mount
  useEffect(() => {
    setCrops(mockCrops);
  }, []);

  // Calculate crop status based on dates
  const getCropStatus = (plantingDate, expectedHarvestDate) => {
    const today = new Date();
    const harvestDate = new Date(expectedHarvestDate);
    const daysUntilHarvest = Math.ceil(
      (harvestDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilHarvest < 0) return "overdue";
    if (daysUntilHarvest <= 30) return "nearing";
    return "growing";
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "growing":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          color: "bg-green-100 text-green-800 border-green-200",
          text: t("cropManagement.growing"),
        };
      case "nearing":
        return {
          icon: <Clock className="w-4 h-4" />,
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          text: t("cropManagement.nearingHarvest"),
        };
      case "overdue":
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          color: "bg-red-100 text-red-800 border-red-200",
          text: t("cropManagement.needsAttention"),
        };
      default:
        return {
          icon: <Leaf className="w-4 h-4" />,
          color: "bg-gray-100 text-gray-800 border-gray-200",
          text: t("cropManagement.unknown"),
        };
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      plantingDate: "",
      expectedHarvestDate: "",
      fieldName: "",
      cropType: "",
      notes: "",
    });
    setEditingCrop(null);
  };

  // Open modal for adding new crop
  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open modal for editing crop
  const openEditModal = (crop) => {
    setFormData({
      name: crop.name,
      plantingDate: crop.plantingDate,
      expectedHarvestDate: crop.expectedHarvestDate,
      fieldName: crop.fieldName,
      cropType: crop.cropType,
      notes: crop.notes,
    });
    setEditingCrop(crop);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCrop) {
      // Update existing crop
      const updatedCrops = crops.map((crop) =>
        crop.id === editingCrop.id
          ? {
              ...crop,
              ...formData,
              status: getCropStatus(
                formData.plantingDate,
                formData.expectedHarvestDate
              ),
            }
          : crop
      );
      setCrops(updatedCrops);
    } else {
      // Add new crop
      const newCrop = {
        id: Date.now(),
        ...formData,
        status: getCropStatus(
          formData.plantingDate,
          formData.expectedHarvestDate
        ),
      };
      setCrops([...crops, newCrop]);
    }

    closeModal();
  };

  // Delete crop
  const deleteCrop = (cropId) => {
    if (window.confirm(t("cropManagement.deleteConfirm"))) {
      setCrops(crops.filter((crop) => crop.id !== cropId));
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <BackToHomeButton />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t("cropManagement.title")}
              </h1>
              <p className="text-gray-600">{t("cropManagement.subtitle")}</p>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t("cropManagement.addNew")}
          </button>
        </div>

        {/* Crop Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {t("cropManagement.totalCrops")}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {crops.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {t("cropManagement.growing")}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {crops.filter((crop) => crop.status === "growing").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {t("cropManagement.nearingHarvest")}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {crops.filter((crop) => crop.status === "nearing").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {t("cropManagement.needsAttention")}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {crops.filter((crop) => crop.status === "overdue").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => {
            const statusInfo = getStatusInfo(crop.status);
            return (
              <div
                key={crop.id}
                className="bg-white rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {crop.name}
                      </h3>
                      <p className="text-sm text-gray-500">{crop.cropType}</p>
                    </div>
                    <div
                      className={`flex items-center px-2 py-1 rounded-full border text-xs font-medium ${statusInfo.color}`}
                    >
                      {statusInfo.icon}
                      <span className="ml-1">{statusInfo.text}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {crop.fieldName}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Planted: {formatDate(crop.plantingDate)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Harvest: {formatDate(crop.expectedHarvestDate)}
                    </div>
                  </div>

                  {/* Notes */}
                  {crop.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        {crop.notes}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(crop)}
                      className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {t("cropManagement.edit")}
                    </button>
                    <button
                      onClick={() => deleteCrop(crop.id)}
                      className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {crops.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("cropManagement.emptyTitle")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("cropManagement.emptyDescription")}
            </p>
            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              {t("cropManagement.addFirstCrop")}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCrop
                    ? t("cropManagement.editCrop")
                    : t("cropManagement.addNew")}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Crop Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("cropManagement.cropName")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder={t("cropManagement.enterCropName")}
                  />
                </div>

                {/* Field/Plot Name */}
                <div>
                  <label
                    htmlFor="fieldName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("cropManagement.fieldName")} *
                  </label>
                  <input
                    type="text"
                    id="fieldName"
                    name="fieldName"
                    value={formData.fieldName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder={t("cropManagement.enterFieldName")}
                  />
                </div>

                {/* Crop Type */}
                <div>
                  <label
                    htmlFor="cropType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("cropManagement.cropType")} *
                  </label>
                  <select
                    id="cropType"
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white"
                  >
                    <option value="">
                      {t("cropManagement.selectCropType")}
                    </option>
                    {cropTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Planting Date */}
                <div>
                  <label
                    htmlFor="plantingDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("cropManagement.plantingDate")} *
                  </label>
                  <input
                    type="date"
                    id="plantingDate"
                    name="plantingDate"
                    value={formData.plantingDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>

                {/* Expected Harvest Date */}
                <div>
                  <label
                    htmlFor="expectedHarvestDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("cropManagement.expectedHarvestDate")} *
                  </label>
                  <input
                    type="date"
                    id="expectedHarvestDate"
                    name="expectedHarvestDate"
                    value={formData.expectedHarvestDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("cropManagement.notes")}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder={t("cropManagement.addNotes")}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    {t("cropManagement.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  >
                    {editingCrop
                      ? t("cropManagement.updateCrop")
                      : t("cropManagement.addCrop")}
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
