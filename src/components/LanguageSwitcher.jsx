import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllLanguages } from "../services/languageService";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ variant = "default" }) {
  const { i18n, t } = useTranslation();

  // Static language names in their respective native scripts
  const staticLanguages = [
    { code: "en", label: "English" },
    { code: "te", label: "తెలుగు" },
    { code: "ta", label: "தமிழ்" },
    { code: "hi", label: "हिन्दी" },
    { code: "bn", label: "বাংলা" },
  ];

  const [languages, setLanguages] = useState(staticLanguages);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch available languages from the server
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const availableLanguages = await getAllLanguages();
        if (availableLanguages && availableLanguages.length > 0) {
          const mappedLanguages = availableLanguages.map((lang) => {
            // Find the static label or use the server name
            const staticLang = staticLanguages.find(
              (sl) => sl.code === lang.code
            );
            return {
              code: lang.code,
              label: staticLang ? staticLang.label : lang.name,
            };
          });
          setLanguages(mappedLanguages);
        }
      } catch (error) {
        console.error("Failed to load languages:", error);
        // Fall back to static languages if API fails
        setLanguages(staticLanguages);
      }
    };

    fetchLanguages();
  }, []); // Removed 't' dependency since we're using static labels

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    // Save language preference
    localStorage.setItem("i18nextLng", langCode);
  };

  // Minimal variant (icon only for mobile)
  if (variant === "minimal") {
    return (
      <div className="relative">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change language"
        >
          <Globe className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`w-full text-left px-4 py-2 hover:bg-green-50 transition-colors ${
                  i18n.language === lang.code
                    ? "bg-green-100 text-green-700 font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default variant (select dropdown)
  return (
    <div className="flex items-center">
      <Globe className="w-4 h-4 mr-2 text-green-600" />
      <select
        className="border border-green-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
      <a
        href="/language-settings"
        className="ml-2 text-green-600 hover:text-green-800 text-sm underline"
      >
        {t("language.more")}
      </a>
    </div>
  );
}
