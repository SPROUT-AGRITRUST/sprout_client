// soil_analyse.js (image analysis)
// Sends a base64 image and prompt to Gemini API and returns the AI response
export async function getGeminiImageAnalysis(
  base64Image,
  apiKey,
  prompt,
  mimeType = "image/jpeg"
) {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent";
  const body = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
        ],
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
    throw new Error("Failed to get image analysis from Gemini API");
  }

  const result = await response.json();
  return result?.candidates?.[0]?.content?.parts?.[0]?.text || "No result";
}
