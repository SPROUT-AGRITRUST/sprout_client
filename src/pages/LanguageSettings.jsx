import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getAllLanguages } from "../services/languageService";

const LanguageSettings = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const availableLanguages = await getAllLanguages();
        if (availableLanguages && availableLanguages.length > 0) {
          const mappedLanguages = availableLanguages.map((lang) => ({
            code: lang.code,
            name: t(`language.${lang.code}`) || lang.name,
          }));
          setLanguages(mappedLanguages);
        }
      } catch (error) {
        console.error("Failed to load languages:", error);
        // Fall back to default languages
        setLanguages([
          { code: "en", name: t("language.english") },
          { code: "te", name: t("language.telugu") },
        ]);
      }
    };

    fetchLanguages();
  }, [t]);

  const handleLanguageChange = (langCode) => {
    setSelectedLang(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem("i18nextLng", langCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-green-100">
        <div className="flex justify-between items-center px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">
            {t("language.settings")}
          </h1>
          <div className="w-8" /> {/* Empty div for spacing */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg">
        <div className="flex items-center justify-center mb-8">
          <div className="p-4 bg-green-100 rounded-full">
            <Globe className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          {t("language.selectLanguage")}
        </h2>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center px-6 py-4 text-left transition-colors ${
                  selectedLang === lang.code
                    ? "bg-green-50 text-green-800"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="text-lg font-medium">{lang.name}</span>
                {selectedLang === lang.code && (
                  <span className="ml-auto bg-green-600 text-white p-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>{t("language.helpTranslate")}</p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
