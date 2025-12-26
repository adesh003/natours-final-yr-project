import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import api from "../services/api"; 

const AIGuide = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I am your personal Natours Travel Assistant. 🌍\nTell me your budget, preferred weather, or duration, and I'll find the perfect trip for you!", 
      sender: "ai" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", { prompt: input });
      const aiMessage = { text: res.data.message, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { text: "Network error. Please try again.", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-10 px-4 md:px-20 text-white font-sans">
      
      {/* HEADER SECTION */}
      <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in-up">
        <div className="inline-block p-3 rounded-full bg-green-500/20 mb-4">
            <Sparkles className="text-green-500 w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          Plan Your Dream Trip
        </h1>
        <p className="text-gray-400">Powered by Gemini AI 🤖</p>
      </div>

      {/* CHAT CONTAINER */}
      <div className="max-w-4xl mx-auto bg-[#111] border border-white/10 rounded-3xl h-[65vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}>
              
              {/* Avatar */}
              {msg.sender === "ai" && (
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3 shadow-lg shadow-green-500/30">
                  <Bot size={20} className="text-black" />
                </div>
              )}

              {/* Message Bubble */}
              <div 
                className={`max-w-[80%] p-4 rounded-2xl text-base leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-white text-black rounded-tr-none font-medium" 
                    : "bg-gray-800/80 border border-white/5 text-gray-100 rounded-tl-none"
                }`}
              >
                {/* Formatting New Lines */}
                {msg.text.split('\n').map((line, i) => (
                    <span key={i}>{line}<br/></span>
                ))}
              </div>

               {/* User Avatar */}
               {msg.sender === "user" && (
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ml-3 border border-white/10">
                  <User size={20} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {loading && (
             <div className="flex justify-start items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Bot size={20} className="text-black" />
                </div>
                <div className="bg-gray-800 p-4 rounded-2xl rounded-tl-none">
                   <div className="flex gap-1">
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                   </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#1a1a1a] border-t border-white/10">
          <form onSubmit={handleSend} className="relative flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: I want a 5-day hiking trip under $1500..."
              className="w-full bg-[#222] text-white pl-6 pr-14 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-white/5 transition-all shadow-inner"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="absolute right-2 bg-green-500 hover:bg-green-400 text-black p-3 rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-green-500/20"
            >
              <Send size={24} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AIGuide;