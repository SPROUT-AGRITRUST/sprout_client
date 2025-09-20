import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getGeminiSoilAnalysis } from "../services/soil_analyse";
import { getGeminiImageAnalysis } from "../services/soil_analyse_image";
import Buffering from "../components/Buffering";
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
  const navigate = useNavigate();
  // ...existing code...
  // const GEMINI_API_KEY = "AIzaSyAb0qSksdFMjjMqaePYPeGYi2xSIOyNflE";
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [activeTab, setActiveTab] = useState("upload"); // 'upload' or 'manual'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [aiImageResult, setAiImageResult] = useState("");
  const [aiImageLoading, setAiImageLoading] = useState(false);
  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(file);
      // Automatically trigger Gemini analysis after image upload
      setAiImageResult("");
      setAiImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];
        const prompt = `The uploaded image is a soil report. Based on the soil report, analyse and list only the recommended crops for this soil. Do not include any explanation, description, or extra content—just output the crop names, also make sure that the crops are Indian crop names and separated by commas if there are multiple. Also give me the irrigation notes in short bullet points for the soil report. Note: The output should be in Telugu language, add proper emojis.`;
        try {
          const result = await getGeminiImageAnalysis(
            base64Image,
            GEMINI_API_KEY,
            prompt,
            file.type // Pass the actual MIME type
          );
          setAiImageResult(result);
        } catch (error) {
          setAiImageResult(
            "Error getting AI image analysis. Please try again."
          );
        }
        setAiImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Send image to Gemini API for analysis
  const handleGeminiImageAnalysis = async () => {
    if (!uploadedImage) return;
    setAiImageLoading(true);
    setAiImageResult("");
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];
        // Compose prompt for Gemini
        const prompt = `Prompt:
You are an expert agronomist. Based on the provided soil analysis report or image, generate a detailed, well-structured recommendation document. The entire output must be in a valid JSON format with the following structure:

{
  "replymsg": "A short summary or greeting for the user.",
  "cropsRecommended": [
    {
      "name": "Crop Name",
      "whySuitable": "Reason this crop is suitable for the field.",
      "nutrientNeeds": "Key nutrient needs or considerations.",
      "varietyNotes": "Any variety traits or special notes."
    },
    // ...more crops
  ],
  "seedRecommendations": [
    {
      "crop": "Crop Name",
      "variety": "Recommended seed variety",
      "notes": "Notes on yield, resistance, or local adaptation."
    }
    // ...more seeds
  ],
  "fertilizerPlan": [
    {
      "stage": "Pre-planting | Starter | Maintenance",
      "type": "Fertilizer type",
      "rate": "Application rate",
      "method": "Application method"
    }
    // ...more stages
  ],
  "irrigationNotes": {
    "earlyGrowth": "Guidelines for early growth stage.",
    "midGrowth": "Guidelines for mid-growth stage.",
    "maturation": "Guidelines for maturation stage.",
    "risks": "Any risks or special notes (e.g., waterlogging, drought)."
  }
}

Output only valid JSON in this structure. Do not include any text or explanation outside the JSON.`;
        // Call Gemini API (assume a new function getGeminiImageAnalysis exists)
        try {
          const result = await getGeminiImageAnalysis(
            base64Image,
            GEMINI_API_KEY,
            prompt
          );
          setAiImageResult(result);
        } catch (error) {
          setAiImageResult(
            "Error getting AI image analysis. Please try again."
          );
        }
        setAiImageLoading(false);
      };
      reader.readAsDataURL(uploadedImage);
    } catch (error) {
      setAiImageResult("Error processing image. Please try again.");
      setAiImageLoading(false);
    }
  };

  const [showForm, setShowForm] = useState(false); // controls if the rest of the form is shown
  const [showExtendedForm, setShowExtendedForm] = useState(false); // controls if the extended form is shown
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
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

  // Analyze soil data using Gemini API directly
  const analyzeSoil = async () => {
    setAiLoading(true);
    setAiResult("");
    try {
      const result = await getGeminiSoilAnalysis(soilData, GEMINI_API_KEY);
      setAiResult(result);
    } catch (error) {
      setAiResult("Error getting AI analysis. Please try again.");
      showToast("Gemini API error: " + error.message, "error");
    }
    setAiLoading(false);
  };

  // AI-powered analysis using Gemini
  const handleGeminiAnalysis = async () => {
    setAiLoading(true);
    setAiResult("");
    try {
      const result = await getGeminiSoilAnalysis(soilData, GEMINI_API_KEY);
      setAiResult(result);
    } catch (error) {
      setAiResult("Error getting AI analysis. Please try again.");
      showToast("Gemini API error: " + error.message, "error");
    }
    setAiLoading(false);
  };

  // generateAnalysis removed (now handled by Gemini API)

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
    setShowForm(false);
    setShowExtendedForm(false);
    setAiResult("");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 md:p-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Sticky Header with Home button, titles, and Profile Icon */}
          <div className="flex items-center gap-4 mb-8 sticky top-0 bg-gradient-to-br from-green-50 to-white z-40 py-4">
            <div className="hidden md:block">
              <BackToHomeButton />
            </div>
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
                /* Combined Upload Section */
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-green-400 transition-colors duration-200 mb-6">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Upload Soil Report or Image
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Upload a PDF, CSV, JSON file with your soil data, or a
                      photo of your soil report/sample (JPG, PNG).
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.csv,.json,image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        if (file.type.startsWith("image/")) {
                          handleImageUpload(e);
                          setUploadedFile(null);
                        } else {
                          handleFileUpload(e);
                          setUploadedImage(null);
                        }
                      }}
                      className="hidden"
                      id="combined-upload"
                    />
                    <label
                      htmlFor="combined-upload"
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Choose File or Image
                    </label>
                    {/* Show file or image preview */}
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
                    {uploadedImage && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <img
                          src={URL.createObjectURL(uploadedImage)}
                          alt="Soil Report"
                          className="mx-auto mb-2 max-h-40 rounded"
                        />
                        <span className="text-green-800">
                          {uploadedImage.name}
                        </span>
                      </div>
                    )}
                    {/* Show loading state for image analysis */}
                    {uploadedImage && aiImageLoading && (
                      <div className="mt-4 text-green-700 font-medium">
                        Analyzing Image...
                      </div>
                    )}
                    {/* Show AI image result */}
                    {aiImageResult && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-left text-green-900 shadow">
                        <h4 className="font-bold mb-2">
                          AI Soil Report Analysis:
                        </h4>
                        <div>{aiImageResult}</div>
                      </div>
                    )}
                  </div>
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

          {/* AI Result for manual entry */}
          {aiResult && (
            <>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-left text-green-900 shadow">
                <h4 className="font-bold mb-2">AI Soil Recommendations:</h4>
                <div>{aiResult}</div>
              </div>

              {/* Go to Seed Place - Only visible after analysis */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => navigate("/seed-place")}
                  className="bg-green-700 text-white px-10 py-5 rounded-2xl font-extrabold text-2xl shadow-lg hover:bg-green-800 transition-colors duration-200 border-4 border-green-300 focus:outline-none focus:ring-4 focus:ring-green-400"
                  style={{ minWidth: "320px" }}
                >
                  🌱 Go to Seed Place
                </button>
              </div>
            </>
          )}

          {/* Show AI image analysis result and Seed Place button if image was analyzed */}
          {aiImageResult && !aiImageLoading && !aiResult && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => navigate("/seed-place")}
                className="bg-green-700 text-white px-10 py-5 rounded-2xl font-extrabold text-2xl shadow-lg hover:bg-green-800 transition-colors duration-200 border-4 border-green-300 focus:outline-none focus:ring-4 focus:ring-green-400"
                style={{ minWidth: "320px" }}
              >
                🌱 Go to Seed Place
              </button>
            </div>
          )}
        </div>
        {(aiLoading || aiImageLoading) && <Buffering />}
      </div>
    </>
  );
}
