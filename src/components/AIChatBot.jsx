import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { sendChatMessage } from "../services/chat_service";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ Warning: Never expose real API keys in frontend code in production
  const GEMINI_API_KEY = import.meta.env.VITE_CHAT_BOT;
  
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    // You can replace 'Farmer' with a dynamic name variable if available
    const userName = "Farmer";
    const prompt = `You are an agriculture expert. Greet the user by their name (${userName}), and ask about their crop. Answer ONLY about agriculture, using Indian methods and practices. Keep your answer VERY SHORT and relevant. Include some emoji's.\nUser: ${input}`;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setLoading(true);

    try {
      const aiResponse = await sendChatMessage(prompt, GEMINI_API_KEY);
      console.log(aiResponse);
      setMessages((msgs) => [...msgs, { sender: "bot", text: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: "Sorry, I couldn't get a response. Please try again.",
        },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="fixed bottom-4 right-4 z-50 bg-green-600 text-white rounded-full shadow-lg p-3 sm:p-4 hover:bg-green-700 transition-colors flex items-center justify-center"
        onClick={() => setOpen(true)}
        aria-label="Open AI Chat Bot"
        style={{
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          width: "48px",
          height: "48px",
          minWidth: "48px",
          minHeight: "48px",
        }}
      >
        <MessageCircle
          className="w-7 h-7"
          style={{ width: "28px", height: "28px" }}
        />
      </button>

      {/* Sidebar Chat */}
      {open && (
        <div
          className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-green-100 animate-slideIn"
          style={{ maxWidth: "100vw" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold text-green-700">AI Chat Bot</h2>
            <div className="flex gap-2 items-center">
              <button
                className="text-gray-400 hover:text-green-600 text-xs border border-green-200 rounded px-2 py-1"
                style={{ fontSize: "0.8rem" }}
                onClick={() =>
                  setMessages([
                    { sender: "bot", text: "Hi! How can I help you today?" },
                  ])
                }
                aria-label="Clear Chat"
              >
                Clear
              </button>
              <button
                className="text-gray-500 hover:text-green-600 text-2xl sm:text-base"
                onClick={() => setOpen(false)}
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg max-w-[80vw] sm:max-w-xs text-sm ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Chatbot thinking animation */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-green-100 text-green-900 max-w-[80vw] sm:max-w-xs text-sm">
                  <span className="dot-typing"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 sm:p-4 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded-lg px-2 py-2 sm:px-3 sm:py-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              style={{ minWidth: 0 }}
            />
            <button
              className="bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-green-700 text-base sm:text-sm disabled:opacity-60"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}

      {/* Animations & Media Queries */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease;
        }
        @media (max-width: 640px) {
          .fixed.top-0.right-0.h-full.w-full {
            border-radius: 0 !important;
            border-left: none !important;
          }
        }
        /* Chatbot thinking animation */
        .dot-typing {
          position: relative;
          width: 2em;
          height: 1em;
        }
        .dot-typing::before, .dot-typing::after, .dot-typing span {
          content: '';
          display: inline-block;
          position: absolute;
          width: 0.5em;
          height: 0.5em;
          background: #22c55e;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }
        .dot-typing::before {
          left: 0;
          animation-delay: 0s;
        }
        .dot-typing span {
          left: 0.7em;
          animation-delay: 0.2s;
        }
        .dot-typing::after {
          left: 1.4em;
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
// Note: This component is a simplified AI chat bot interface using Gemini API. In a real application, ensure secure handling of API keys and consider backend integration for API calls.
