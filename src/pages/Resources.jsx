import React, { useState } from "react";
import {
  Newspaper,
  Lightbulb,
  Users,
  ChevronDown,
  ChevronUp,
  Volume2,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock Data
const mockNews = [
  {
    id: 1,
    title: "Government Launches New Crop Insurance Scheme",
    summary:
      "Farmers can now avail better protection against crop losses due to natural calamities.",
    date: "2025-09-01",
    link: "#",
  },
  {
    id: 2,
    title: "Monsoon Forecast: Tips for Water Management",
    summary:
      "Experts share advice on irrigation and water conservation for the upcoming season.",
    date: "2025-08-28",
    link: "#",
  },
];

const mockTips = [
  {
    id: 1,
    tip: "Rotate crops each season to improve soil health and reduce pests.",
  },
  {
    id: 2,
    tip: "Test your soil regularly to optimize fertilizer use and boost yields.",
  },
];

const mockExperiences = [
  {
    id: 1,
    author: "Ravi Kumar",
    story:
      "Last year, I switched to drip irrigation and saw a 30% increase in tomato yield!",
    date: "2025-08-15",
  },
  {
    id: 2,
    author: "Sita Devi",
    story: "Using organic compost has made my soil richer and crops healthier.",
    date: "2025-07-30",
  },
];

// Accordion Component
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-6">
      <button
        className="w-full flex justify-between items-center px-6 py-4 bg-green-100 rounded-xl font-bold text-lg text-green-900 shadow hover:bg-green-200 transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {title}
        {open ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {open && (
        <div className="bg-white border border-green-100 rounded-xl shadow p-6 mt-2 text-gray-900">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Resources() {
  const [activeTab, setActiveTab] = useState("news");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("news")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === "news"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Newspaper className="w-5 h-5" /> News
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === "tips"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Lightbulb className="w-5 h-5" /> Tips
          </button>
          <button
            onClick={() => setActiveTab("experiences")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === "experiences"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Users className="w-5 h-5" /> Experiences
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "news" && (
          <div className="space-y-6">
            {mockNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-xl shadow p-6 border border-green-100"
              >
                <h2 className="text-xl font-bold mb-2">{news.title}</h2>
                <p className="text-gray-700 mb-2">{news.summary}</p>
                <p className="text-sm text-gray-500">{news.date}</p>
                <a
                  href={news.link}
                  className="text-green-700 font-medium hover:underline"
                >
                  Read more →
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tips" && (
          <div>
            {/* Tip of the Week & Audio */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 bg-green-100 rounded-xl p-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-green-700" />
                <span className="font-semibold text-green-900">
                  Tip of the Week:
                </span>
                <span className="text-green-800">{mockTips[0].tip}</span>
              </div>
              <div className="flex-1 bg-green-50 rounded-xl p-4 flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-green-700" />
                <span className="font-semibold text-green-900">Audio Guide:</span>
                <span className="text-green-800">
                  [Coming soon: Listen to best practices]
                </span>
              </div>
            </div>

            {/* Accordions */}
            <Accordion title="Best Practices for Farming" defaultOpen>
              <ul className="list-disc list-inside text-green-900 space-y-2">
                <li>
                  Rotate crops to maintain soil fertility.{" "}
                  <span className="text-gray-700">
                    Example: wheat → legumes
                  </span>
                </li>
                <li>Use integrated pest management (IPM) to minimize chemicals.</li>
                <li>Test soil regularly and apply fertilizers based on need.</li>
                <li>Adopt drip or sprinkler irrigation.</li>
              </ul>
            </Accordion>

            <Accordion title="Practical Farming Tips">
              <ul className="list-disc list-inside text-green-900 space-y-2">
                <li>Choose seeds suited to your local climate.</li>
                <li>
                  Plant at the right time—check weather and sowing calendars.
                </li>
                <li>Use compost to enrich soil.</li>
              </ul>
            </Accordion>

            <Accordion title="Inventory Management for Farmers">
              <ul className="list-disc list-inside text-green-900 space-y-2">
                <li>
                  Track seeds, fertilizers, and equipment to avoid shortages.
                </li>
                <li>
                  Use a notebook or mobile app (Kisan Suvidha, AgriApp) for
                  inventory tracking.
                </li>
                <li>Store chemicals and seeds in cool, dry places.</li>
                <li>Check expiry dates and reorder in time.</li>
                <li>
                  Example: Farmer Suresh tracks fertilizer in a diary and saves
                  money.
                </li>
              </ul>
            </Accordion>
          </div>
        )}

        {activeTab === "experiences" && (
          <div className="space-y-6">
            {mockExperiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-xl shadow p-6 border border-green-100"
              >
                <p className="text-gray-800 mb-2">"{exp.story}"</p>
                <p className="text-sm text-gray-500">
                  – {exp.author}, {exp.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
