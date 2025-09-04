// soil_analyse.js
// Sends soil analysis data to Gemini API and returns the AI response
export async function getGeminiSoilAnalysis(soilData, apiKey) {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  // Build prompt from soilData
  const prompt = `Soil Analysis Data:\n\npH: ${soilData.pH}\nNitrogen: ${soilData.nitrogen}\nPhosphorus: ${soilData.phosphorus}\nPotassium: ${soilData.potassium}\nOrganic Matter: ${soilData.organicMatter}\nSoil Texture: ${soilData.soilTexture}\n\nAnswer strictly in this format (no extra text):
  Remember to give only indian crops and fertilizers.
Crops: [comma separated crop names]
Fertilizers: [comma separated fertilizer names]
Irrigation: [very short note]
`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to get analysis from Gemini API");
  }

  const result = await response.json();
  // Gemini returns output in result.candidates[0].content.parts[0].text
  return result?.candidates?.[0]?.content?.parts?.[0]?.text || "No result";
}
