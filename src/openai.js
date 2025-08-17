// openai.js
// Utility to interact with OpenAI API

export const OPENAI_API_KEY =
  "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"; // <-- Set your key here

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_IMAGE_URL = "https://api.openai.com/v1/images/generations";

export async function sendTextToOpenAI(messages, model = "gpt-3.5-turbo") {
  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });
  if (!res.ok) throw new Error("OpenAI API error");
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No response";
}

export async function sendImageToOpenAI(
  imageBase64,
  prompt = "Analyze this soil image",
  model = "gpt-4-vision-preview"
) {
  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageBase64 } },
          ],
        },
      ],
      max_tokens: 1000,
    }),
  });
  if (!res.ok) throw new Error("OpenAI API error");
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No response";
}
