// gemini.js
// Utility to interact with Google Gemini API

export const GEMINI_API_KEY = "AIzaSyCULIO55zvXRGyDGh9pqMF7IBA_Z1MxHwI"; // <-- Set your Gemini key here

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" +
  GEMINI_API_KEY;

export async function sendTextToGemini(prompt) {
  const res = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Gemini API error");
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}
