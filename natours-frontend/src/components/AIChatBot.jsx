import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import api from "../services/api"; // Apni API file import karo
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I am Natours AI. Ask me about any tour! 🌲", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-scroll to bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. User message add karo
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // 2. Backend ko call karo
      const res = await api.post("/ai/chat", { prompt: input });

      // 3. AI response add karo
      const aiMessage = { text: res.data.message, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { text: "Sorry, something went wrong! 😓", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="bg-[#111] border border-white/10 w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up mb-4">

          {/* Header */}
          <div className="bg-green-500 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="text-black bg-white p-1 rounded-full w-8 h-8" />
              <h3 className="font-bold text-black">Natours Guide</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black hover:bg-black/10 rounded-full p-1 transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                      ? "bg-green-500 text-black rounded-tr-none"
                      : "bg-gray-800 text-white rounded-tl-none prose prose-invert prose-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0"
                    }`}
                >
                  {msg.sender === "ai" ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-white p-3 rounded-2xl rounded-tl-none text-sm animate-pulse">
                  Thinking... 🤔
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-[#1a1a1a] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Suggest a cheap tour..."
              className="flex-1 bg-[#222] text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-400 text-black p-2 rounded-full transition disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING BUTTON (FAB) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-[0_0_20px_rgba(85,197,122,0.6)] transition-all hover:scale-110 flex items-center gap-2 font-bold"
        >
          <Bot size={24} />
          <span className="hidden md:inline">Plan Trip</span>
        </button>
      )}
    </div>
  );
};

export default AIChatBot;