// Gemini chat API integration for chat box
export async function sendChatMessage(message, apiKey) {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const body = {
    
    contents: [
      {
        parts: [{ text: message }],
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
    throw new Error("Failed to get chat response from Gemini API");
  }

  const result = await response.json();
  return result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}
