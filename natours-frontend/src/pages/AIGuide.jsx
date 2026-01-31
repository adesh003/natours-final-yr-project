// import { useState, useRef, useEffect } from "react";
// import { Send, Bot, User, Sparkles } from "lucide-react";
// import api from "../services/api"; 

// const AIGuide = () => {
//   const [messages, setMessages] = useState([
//     { 
//       text: "Hello! I am your personal Natours Travel Assistant. 🌍\nTell me your budget, preferred weather, or duration, and I'll find the perfect trip for you!", 
//       sender: "ai" 
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await api.post("/ai/chat", { prompt: input });
//       const aiMessage = { text: res.data.message, sender: "ai" };
//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (err) {
//       setMessages((prev) => [...prev, { text: "Network error. Please try again.", sender: "ai" }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black pt-28 pb-10 px-4 md:px-20 text-white font-sans">
      
//       {/* HEADER SECTION */}
//       <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in-up">
//         <div className="inline-block p-3 rounded-full bg-green-500/20 mb-4">
//             <Sparkles className="text-green-500 w-8 h-8" />
//         </div>
//         <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-2">
//           Plan Your Dream Trip
//         </h1>
//         <p className="text-gray-400">Powered by Gemini AI 🤖</p>
//       </div>

//       {/* CHAT CONTAINER */}
//       <div className="max-w-4xl mx-auto bg-[#111] border border-white/10 rounded-3xl h-[65vh] flex flex-col shadow-2xl overflow-hidden relative">
        
//         {/* Messages List */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}>
              
//               {/* Avatar */}
//               {msg.sender === "ai" && (
//                 <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3 shadow-lg shadow-green-500/30">
//                   <Bot size={20} className="text-black" />
//                 </div>
//               )}

//               {/* Message Bubble */}
//               <div 
//                 className={`max-w-[80%] p-4 rounded-2xl text-base leading-relaxed ${
//                   msg.sender === "user" 
//                     ? "bg-white text-black rounded-tr-none font-medium" 
//                     : "bg-gray-800/80 border border-white/5 text-gray-100 rounded-tl-none"
//                 }`}
//               >
//                 {/* Formatting New Lines */}
//                 {msg.text.split('\n').map((line, i) => (
//                     <span key={i}>{line}<br/></span>
//                 ))}
//               </div>

//                {/* User Avatar */}
//                {msg.sender === "user" && (
//                 <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ml-3 border border-white/10">
//                   <User size={20} className="text-white" />
//                 </div>
//               )}
//             </div>
//           ))}

//           {loading && (
//              <div className="flex justify-start items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
//                   <Bot size={20} className="text-black" />
//                 </div>
//                 <div className="bg-gray-800 p-4 rounded-2xl rounded-tl-none">
//                    <div className="flex gap-1">
//                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
//                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
//                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
//                    </div>
//                 </div>
//              </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className="p-4 bg-[#1a1a1a] border-t border-white/10">
//           <form onSubmit={handleSend} className="relative flex items-center gap-4">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ex: I want a 5-day hiking trip under $1500..."
//               className="w-full bg-[#222] text-white pl-6 pr-14 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-white/5 transition-all shadow-inner"
//             />
//             <button 
//               type="submit" 
//               disabled={loading}
//               className="absolute right-2 bg-green-500 hover:bg-green-400 text-black p-3 rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-green-500/20"
//             >
//               <Send size={24} />
//             </button>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AIGuide;



import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../services/api"; 

const SUGGESTIONS = [
  "Plan a 5-day budget trip to Manali 🏔️",
  "Best beaches in Goa for couples 🏖️",
  "Itinerary for Golden Triangle India 🕌",
  "Trekking guide for beginners 🥾",
];

const AIGuide = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I am your personal Natours Travel Assistant. 🌍\n\nI can help you with:\n- **Trip Itineraries**\n- **Budget Planning**\n- **Hidden Gems**\n\nWhat's on your mind today?", 
      sender: "ai" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text = input) => { // Allow manual text (for chips)
    if (!text.trim() || loading) return;

    const userMessage = { text: text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", { prompt: text });
      const aiMessage = { text: res.data.message, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { text: "⚠️ Network error. Please check your connection.", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-6 px-4 md:px-8 text-white font-sans flex flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full max-w-5xl flex justify-between items-end mb-6 animate-fade-in-down">
        <div>
            <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 flex items-center gap-3">
              <Bot className="text-green-500 w-8 h-8 md:w-10 md:h-10" /> AI Travel Planner
            </h1>
            <p className="text-gray-400 text-sm mt-1 ml-1">Powered by Natours Intelligence 🧠</p>
        </div>
        <button 
          onClick={clearChat}
          className="text-xs flex items-center gap-2 text-gray-500 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          <RefreshCw size={14} /> Reset Chat
        </button>
      </div>

      {/* MAIN CHAT CONTAINER */}
      <div className="w-full max-w-5xl flex-1 bg-[#111] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,255,100,0.05)] overflow-hidden flex flex-col relative h-[75vh]">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} group`}>
              
              {/* AI Avatar */}
              {msg.sender === "ai" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center mr-3 flex-shrink-0 mt-1 shadow-lg shadow-green-500/20">
                  <Sparkles size={16} className="text-white" />
                </div>
              )}

              {/* Message Bubble */}
              <div 
                className={`max-w-[85%] md:max-w-[75%] px-5 py-3.5 rounded-2xl text-[15px] leading-7 shadow-md ${
                  msg.sender === "user" 
                    ? "bg-white text-black rounded-tr-none font-medium ml-12" 
                    : "bg-[#1a1a1a] border border-white/10 text-gray-200 rounded-tl-none prose prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0"
                }`}
              >
                {msg.sender === "ai" ? (
                  // Markdown for AI (Lists, Bold, Links)
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>

              {/* User Avatar */}
              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ml-3 flex-shrink-0 mt-1 border border-white/10">
                  <User size={16} className="text-gray-300" />
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator (Typing Effect) */}
          {loading && (
             <div className="flex justify-start items-center gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <Bot size={16} className="text-green-500" />
                </div>
                <div className="bg-[#1a1a1a] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-75"></span>
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></span>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="p-4 md:p-6 bg-[#0a0a0a] border-t border-white/10">
          
          {/* Quick Suggestions (Only show if few messages) */}
          {messages.length < 4 && (
            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-none mask-fade-right">
              {SUGGESTIONS.map((sugg, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(sugg)}
                  className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/50 rounded-full text-xs text-gray-300 hover:text-green-400 transition-all flex items-center gap-2"
                >
                  {sugg} <ChevronRight size={12} />
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-end gap-2 bg-[#1a1a1a] border border-white/10 rounded-3xl p-2 focus-within:border-green-500/50 focus-within:ring-1 focus-within:ring-green-500/20 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about travel..."
              className="w-full bg-transparent text-white pl-4 pr-12 py-3 rounded-2xl text-base focus:outline-none placeholder-gray-500"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-400 text-black p-2.5 rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? <Sparkles size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>
          
          <p className="text-center text-[10px] text-gray-600 mt-3">
            AI can make mistakes. Please verify important travel info.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AIGuide;