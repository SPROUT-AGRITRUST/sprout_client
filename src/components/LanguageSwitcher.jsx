import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", label: t("language.english") },
    { code: "te", label: t("language.telugu") }
  ];

  return (
    <select
      className="border rounded px-2 py-1 text-sm"
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
} 