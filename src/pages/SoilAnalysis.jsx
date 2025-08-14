import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Edit3,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Droplets,
  Zap,
  Info,
  User,
} from "lucide-react";
import { useToast } from "../contexts/ToastContext";
import BackToHomeButton from "../components/BackToHomeButton";

// Soil texture options
const soilTextures = [
  "Sandy",
  "Sandy Loam",
  "Loam",
  "Silt Loam",
  "Clay Loam",
  "Clay",
  "Silty Clay",
];

// Mock crop recommendations based on soil conditions
const cropRecommendations = {
  acidic: ["Blueberries", "Potatoes", "Sweet Potatoes", "Raspberries"],
  neutral: ["Wheat", "Corn", "Soybeans", "Tomatoes", "Lettuce"],
  alkaline: ["Asparagus", "Beets", "Cabbage", "Cauliflower", "Spinach"],
  highNitrogen: ["Corn", "Leafy Greens", "Brassicas"],
  lowNitrogen: ["Legumes", "Beans", "Peas"],
  sandy: ["Carrots", "Radishes", "Sweet Potatoes", "Peanuts"],
  clay: ["Rice", "Wheat", "Corn", "Soybeans"],
  loamy: ["Most crops", "Vegetables", "Fruits", "Grains"],
};

export default function SoilAnalysis() {
  // Removed i18n translation

  const [activeTab, setActiveTab] = useState("upload"); // 'upload' or 'manual'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showForm, setShowForm] = useState(false); // controls if the rest of the form is shown
  const [showExtendedForm, setShowExtendedForm] = useState(false); // controls if the extended form is shown
  const { showToast } = useToast();

  // Form data for manual input
  const [soilData, setSoilData] = useState({
    pH: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    organicMatter: "",
    soilTexture: "",
  });

  // Analysis results
  const [analysisResults, setAnalysisResults] = useState({
    pHStatus: "",
    nitrogenStatus: "",
    phosphorusStatus: "",
    potassiumStatus: "",
    organicMatterStatus: "",
    recommendations: [],
    cropSuggestions: [],
    fertilizerRecommendations: [],
    irrigationNotes: "",
  });

  // Handle file upload
  const handleFileUpload = (event) => {
    //check whether the user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      showToast("Please log in to upload soil data.", "warning");
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);

      // If it's a JSON file, try to parse and populate form
      if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            setSoilData({
              pH: jsonData.pH || "",
              nitrogen: jsonData.nitrogen || "",
              phosphorus: jsonData.phosphorus || "",
              potassium: jsonData.potassium || "",
              organicMatter: jsonData.organicMatter || "",
              soilTexture: jsonData.soilTexture || "",
            });
          } catch (error) {
            console.error("Error parsing JSON file:", error);
          }
        };
        reader.readAsText(file);
      }
    }
  };

  // Handle manual input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSoilData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Soil Texture selection and show rest of form
  const handleSoilTextureChange = (e) => {
    setSoilData((prev) => ({
      ...prev,
      soilTexture: e.target.value,
    }));
  };

  // Analyze soil data and generate recommendations
  const analyzeSoil = () => {
    setIsAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      const results = generateAnalysis(soilData);
      setAnalysisResults(results);
      setAnalysisComplete(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  // Generate analysis based on soil data
  const generateAnalysis = (data) => {
    const recommendations = [];
    const cropSuggestions = [];
    const fertilizerRecommendations = [];
    let irrigationNotes = "";

    // pH Analysis
    let pHStatus = "";
    if (data.pH) {
      const pH = parseFloat(data.pH);
      if (pH < 6.0) {
        pHStatus = "low";
        recommendations.push(
          "Soil pH is low. Consider adding lime to raise pH."
        );
        cropSuggestions.push(...cropRecommendations.acidic);
      } else if (pH > 7.5) {
        pHStatus = "high";
        recommendations.push(
          "Soil pH is high. Consider adding sulfur to lower pH."
        );
        cropSuggestions.push(...cropRecommendations.alkaline);
      } else {
        pHStatus = "optimal";
        cropSuggestions.push(...cropRecommendations.neutral);
      }
    }

    // Nitrogen Analysis
    let nitrogenStatus = "";
    if (data.nitrogen) {
      const nitrogen = parseFloat(data.nitrogen);
      if (nitrogen < 50) {
        nitrogenStatus = "low";
        recommendations.push("Nitrogen is low. Add nitrogen-rich fertilizer.");
        cropSuggestions.push(...cropRecommendations.lowNitrogen);
      } else if (nitrogen > 200) {
        nitrogenStatus = "high";
        recommendations.push(
          "Nitrogen is high. Avoid adding more nitrogen fertilizer."
        );
        cropSuggestions.push(...cropRecommendations.highNitrogen);
      } else {
        nitrogenStatus = "optimal";
      }
    }

    // Phosphorus Analysis
    let phosphorusStatus = "";
    if (data.phosphorus) {
      const phosphorus = parseFloat(data.phosphorus);
      if (phosphorus < 20) {
        phosphorusStatus = "low";
        recommendations.push("Phosphorus is low. Add phosphorus fertilizer.");
      } else if (phosphorus > 100) {
        phosphorusStatus = "high";
        recommendations.push(
          "Phosphorus is high. Avoid adding more phosphorus fertilizer."
        );
      } else {
        phosphorusStatus = "optimal";
      }
    }

    // Potassium Analysis
    let potassiumStatus = "";
    if (data.potassium) {
      const potassium = parseFloat(data.potassium);
      if (potassium < 100) {
        potassiumStatus = "low";
        recommendations.push("Potassium is low. Add potassium fertilizer.");
      } else if (potassium > 300) {
        potassiumStatus = "high";
        recommendations.push(
          "Potassium is high. Avoid adding more potassium fertilizer."
        );
      } else {
        potassiumStatus = "optimal";
      }
    }

    // Organic Matter Analysis
    let organicMatterStatus = "";
    if (data.organicMatter) {
      const organicMatter = parseFloat(data.organicMatter);
      if (organicMatter < 2) {
        organicMatterStatus = "low";
        recommendations.push("Organic matter is low. Add compost or manure.");
      } else if (organicMatter > 8) {
        organicMatterStatus = "high";
        recommendations.push("Organic matter is high. No need to add more.");
      } else {
        organicMatterStatus = "optimal";
      }
    }

    // Soil Texture Analysis
    if (data.soilTexture) {
      if (data.soilTexture.toLowerCase().includes("sandy")) {
        cropSuggestions.push(...cropRecommendations.sandy);
        irrigationNotes = "Sandy soil: Water frequently but lightly.";
      } else if (data.soilTexture.toLowerCase().includes("clay")) {
        cropSuggestions.push(...cropRecommendations.clay);
        irrigationNotes = "Clay soil: Water less often but deeply.";
      } else {
        cropSuggestions.push(...cropRecommendations.loamy);
        irrigationNotes = "Loamy soil: Water moderately.";
      }
    }

    // Fertilizer recommendations based on deficiencies
    if (nitrogenStatus === "low") {
      fertilizerRecommendations.push("Apply Urea fertilizer.");
    }
    if (phosphorusStatus === "low") {
      fertilizerRecommendations.push("Apply DAP fertilizer.");
    }
    if (potassiumStatus === "low") {
      fertilizerRecommendations.push("Apply MOP fertilizer.");
    }

    // Remove duplicates from crop suggestions
    const uniqueCropSuggestions = [...new Set(cropSuggestions)];

    return {
      pHStatus,
      nitrogenStatus,
      phosphorusStatus,
      potassiumStatus,
      organicMatterStatus,
      recommendations,
      cropSuggestions: uniqueCropSuggestions.slice(0, 8), // Limit to 8 suggestions
      fertilizerRecommendations,
      irrigationNotes,
    };
  };

  // Get status icon and styling
  const getStatusInfo = (status) => {
    switch (status) {
      case "low":
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          color: "bg-red-100 text-red-800 border-red-200",
          text: "Low",
        };
      case "high":
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          color: "bg-orange-100 text-orange-800 border-orange-200",
          text: "High",
        };
      case "optimal":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          color: "bg-green-100 text-green-800 border-green-200",
          text: "Optimal",
        };
      default:
        return {
          icon: <Info className="w-4 h-4" />,
          color: "bg-gray-100 text-gray-800 border-gray-200",
          text: "Not Analyzed",
        };
    }
  };

  // Reset form
  const resetForm = () => {
    setSoilData({
      pH: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      organicMatter: "",
      soilTexture: "",
    });
    setUploadedFile(null);
    setAnalysisComplete(false);
    setAnalysisResults({
      pHStatus: "",
      nitrogenStatus: "",
      phosphorusStatus: "",
      potassiumStatus: "",
      organicMatterStatus: "",
      recommendations: [],
      cropSuggestions: [],
      fertilizerRecommendations: [],
      irrigationNotes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Sticky Header with Home button, titles, and Profile Icon */}
        <div className="flex items-center gap-4 mb-8 sticky top-0 bg-gradient-to-br from-green-50 to-white z-40 py-4">
          <BackToHomeButton />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Soil Analysis
            </h1>
            <p className="text-gray-600">
              Analyze your soil and get recommendations
            </p>
          </div>
          <div className="ml-auto flex items-center">
            <User
              className="w-8 h-8 text-green-700 cursor-pointer"
              title="Profile"
            />
          </div>
        </div>

        {/* Input Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === "upload"
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Upload Soil Data
            </button>
            <button
              onClick={() => setActiveTab("manual")}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === "manual"
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Edit3 className="w-5 h-5 inline mr-2" />
              Manual Entry
            </button>
          </div>

          <div className="p-6">
            {activeTab === "upload" ? (
              /* Upload Section */
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-green-400 transition-colors duration-200">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload Soil Report
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Upload a PDF, CSV, or JSON file with your soil data.
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
                {uploadedFile && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800">
                        {uploadedFile.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Manual Entry Section */
              <div>
                {/* Soil Texture Selection (mandatory) */}
                {!showForm && !showExtendedForm && (
                  <div className="max-w-xs mx-auto">
                    <label
                      htmlFor="soilTexture"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Soil Texture<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="soilTexture"
                      name="soilTexture"
                      value={soilData.soilTexture}
                      onChange={handleSoilTextureChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white"
                      required
                    >
                      <option value="">Select Soil Texture</option>
                      {soilTextures.map((texture) => (
                        <option key={texture} value={texture}>
                          {texture}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-col gap-3 mt-6">
                      <button
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                        disabled={!soilData.soilTexture}
                        onClick={() => setShowForm(true)}
                        type="button"
                      >
                        Continue
                      </button>
                      <button
                        className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
                        disabled={!soilData.soilTexture}
                        onClick={() => setShowExtendedForm(true)}
                        type="button"
                      >
                        {"moreInputs"}
                      </button>
                    </div>
                  </div>
                )}
                {/* Rest of the form, shown only after Soil Texture is selected and Continue is clicked */}
                {showForm && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={analyzeSoil}
                      className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium"
                    >
                      Analyze Soil
                    </button>
                  </div>
                )}
                {/* Extended form, shown only after 'I can provide more inputs' is clicked */}
                {showExtendedForm && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label
                          htmlFor="pH"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Soil pH
                        </label>
                        <input
                          type="number"
                          id="pH"
                          name="pH"
                          value={soilData.pH}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          max="14"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Enter soil pH (0-14)"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="nitrogen"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Nitrogen (mg/kg)
                        </label>
                        <input
                          type="number"
                          id="nitrogen"
                          name="nitrogen"
                          value={soilData.nitrogen}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Enter nitrogen level"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phosphorus"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phosphorus (mg/kg)
                        </label>
                        <input
                          type="number"
                          id="phosphorus"
                          name="phosphorus"
                          value={soilData.phosphorus}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Enter phosphorus level"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="potassium"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Potassium (mg/kg)
                        </label>
                        <input
                          type="number"
                          id="potassium"
                          name="potassium"
                          value={soilData.potassium}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Enter potassium level"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="organicMatter"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Organic Matter (%)
                        </label>
                        <input
                          type="number"
                          id="organicMatter"
                          name="organicMatter"
                          value={soilData.organicMatter}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          max="100"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Enter organic matter %"
                        />
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <button
                        onClick={analyzeSoil}
                        disabled={
                          isAnalyzing ||
                          (!soilData.pH &&
                            !soilData.nitrogen &&
                            !soilData.phosphorus &&
                            !soilData.potassium &&
                            !soilData.organicMatter)
                        }
                        className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAnalyzing ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Analyzing Soil...
                          </div>
                        ) : (
                          <span>Analyze Soil</span>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        {analysisComplete && (
          <div className="space-y-8">
            {/* Soil Parameters Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Soil Parameters Summary
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Only show if value is present */}
                {soilData.pH && (
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Soil pH
                      </span>
                      {analysisResults.pHStatus && (
                        <div
                          className={`flex items-center px-2 py-1 rounded-full border text-xs font-medium ${
                            getStatusInfo(analysisResults.pHStatus).color
                          }`}
                        >
                          {getStatusInfo(analysisResults.pHStatus).icon}
                          <span className="ml-1">
                            {getStatusInfo(analysisResults.pHStatus).text}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {soilData.pH}
                    </p>
                  </div>
                )}

                {soilData.nitrogen && (
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Nitrogen
                      </span>
                      {analysisResults.nitrogenStatus && (
                        <div
                          className={`flex items-center px-2 py-1 rounded-full border text-xs font-medium ${
                            getStatusInfo(analysisResults.nitrogenStatus).color
                          }`}
                        >
                          {getStatusInfo(analysisResults.nitrogenStatus).icon}
                          <span className="ml-1">
                            {getStatusInfo(analysisResults.nitrogenStatus).text}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {soilData.nitrogen} mg/kg
                    </p>
                  </div>
                )}

                {soilData.phosphorus && (
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Phosphorus
                      </span>
                      {analysisResults.phosphorusStatus && (
                        <div
                          className={`flex items-center px-2 py-1 rounded-full border text-xs font-medium ${
                            getStatusInfo(analysisResults.phosphorusStatus)
                              .color
                          }`}
                        >
                          {getStatusInfo(analysisResults.phosphorusStatus).icon}
                          <span className="ml-1">
                            {
                              getStatusInfo(analysisResults.phosphorusStatus)
                                .text
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {soilData.phosphorus} mg/kg
                    </p>
                  </div>
                )}

                {soilData.potassium && (
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Potassium
                      </span>
                      {analysisResults.potassiumStatus && (
                        <div
                          className={`flex items-center px-2 py-1 rounded-full border text-xs font-medium ${
                            getStatusInfo(analysisResults.potassiumStatus).color
                          }`}
                        >
                          {getStatusInfo(analysisResults.potassiumStatus).icon}
                          <span className="ml-1">
                            {
                              getStatusInfo(analysisResults.potassiumStatus)
                                .text
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {soilData.potassium} mg/kg
                    </p>
                  </div>
                )}

                {soilData.organicMatter && (
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Organic Matter
                      </span>
                      {analysisResults.organicMatterStatus && (
                        <div
                          className={`flex items-center px-2 py-1 rounded-full border text-xs font-medium ${
                            getStatusInfo(analysisResults.organicMatterStatus)
                              .color
                          }`}
                        >
                          {
                            getStatusInfo(analysisResults.organicMatterStatus)
                              .icon
                          }
                          <span className="ml-1">
                            {
                              getStatusInfo(analysisResults.organicMatterStatus)
                                .text
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {soilData.organicMatter}%
                    </p>
                  </div>
                )}

                {/* Always show Soil Texture */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Soil Texture
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {soilData.soilTexture || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Crop Suggestions */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <div className="flex items-center mb-4">
                <Leaf className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">
                  Recommended Crops
                </h3>
              </div>
              <div className="space-y-2">
                {analysisResults.cropSuggestions.map((crop, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-green-50 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-800">{crop}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fertilizer Recommendations */}
            {analysisResults.fertilizerRecommendations.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <div className="flex items-center mb-4">
                  <Droplets className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Fertilizer Recommendations
                  </h3>
                </div>
                <ul className="list-disc list-inside text-gray-800">
                  {analysisResults.fertilizerRecommendations.map(
                    (recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Irrigation Notes */}
            {analysisResults.irrigationNotes && (
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Irrigation Notes
                  </h3>
                </div>
                <p className="text-gray-800">
                  {analysisResults.irrigationNotes}
                </p>
              </div>
            )}

            {/* Recommendations */}
            {analysisResults.recommendations.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <div className="flex items-center mb-4">
                  <Info className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Recommendations
                  </h3>
                </div>
                <ul className="list-disc list-inside text-gray-800">
                  {analysisResults.recommendations.map(
                    (recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Start New Analysis /************* ✨ Windsurf Command 🌟
                *************/
              </button>
              <p className="mt-2 text-xs text-gray-600">
                Reset all form fields and start a new analysis.
              </p>
              /******* ad426211-9cda-4779-9a07-c15dca63b83f *******/
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
