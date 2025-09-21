/**
 * Service for handling language-related operations
 */

// The base URL for the language API
const API_BASE_URL = "/api/language";

/**
 * Fetches all available languages from the server
 * @returns {Promise<Array>} Array of language objects with code and name
 */
export const getAllLanguages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch languages");
    }

    return data.languages;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};

/**
 * Fetches translations for a specific language
 * @param {string} langCode - The language code to fetch translations for
 * @returns {Promise<Object>} Object containing the translations
 */
export const getTranslations = async (langCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${langCode}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(
        data.message || `Failed to fetch translations for ${langCode}`
      );
    }

    return data.translations;
  } catch (error) {
    console.error(`Error fetching translations for ${langCode}:`, error);
    throw error;
  }
};
