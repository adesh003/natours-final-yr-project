import { useEffect, useState } from "react";
import { X, User } from "lucide-react"; // Icons chahiye
import api from "../services/api";

const TravelMates = ({ tourId, currentUserId }) => {
  const [mates, setMates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // 👇 Modal open/close state

  useEffect(() => {
    const fetchMates = async () => {
      try {
        const res = await api.get(`/bookings/tour/${tourId}/travelers`);
        const others = res.data.data.travelers.filter(u => u._id !== currentUserId);
        setMates(others);
      } catch (err) {
        console.error("Failed to load mates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMates();
  }, [tourId, currentUserId]);

  if (loading || mates.length === 0) return null;

  return (
    <>
      {/* --- MAIN DISPLAY (Card ke andar) --- */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider">
          Running into them 🏃‍♂️
        </p>
        
        {/* 👇 Click Event Add Kiya */}
        <div 
          onClick={() => setShowModal(true)} 
          className="flex items-center -space-x-3 overflow-hidden cursor-pointer hover:opacity-80 transition"
          title="Click to view all travelers"
        >
          {mates.slice(0, 5).map((mate, i) => (
            <img
              key={mate._id || i}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#111] object-cover bg-gray-700"
              src={`http://localhost:5000/img/users/${mate.photo}`}
              onError={(e) => {e.target.src = "https://ui-avatars.com/api/?name=" + mate.name}}
              alt={mate.name}
            />
          ))}

          {mates.length > 5 && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-[#111] bg-gray-800 text-xs font-bold text-white z-10">
              +{mates.length - 5}
            </div>
          )}
          
          <span className="ml-4 text-xs text-gray-500 hover:text-green-400 underline decoration-dotted">
             View list
          </span>
        </div>
      </div>

      {/* --- POPUP MODAL (Screen ke upar) --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          
          <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
            
            {/* Header */}
            <div className="bg-green-500 p-4 flex justify-between items-center">
              <h3 className="text-black font-bold text-lg flex items-center gap-2">
                👥 Fellow Travelers
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-black hover:bg-black/10 rounded-full p-1 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="p-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
              <div className="space-y-3">
                {mates.map((mate) => (
                  <div key={mate._id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition">
                    
                    {/* Photo */}
                    <img
                      className="h-10 w-10 rounded-full object-cover border border-gray-600"
                      src={`http://localhost:5000/img/users/${mate.photo}`}
                      onError={(e) => {e.target.src = "https://ui-avatars.com/api/?name=" + mate.name}}
                      alt={mate.name}
                    />
                    
                    {/* Name & Role */}
                    <div>
                      <h4 className="text-white font-medium text-sm">{mate.name}</h4>
                      <p className="text-xs text-gray-400">Traveler</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#111] text-center border-t border-white/5">
              <p className="text-xs text-gray-500">
                You can say hi in the group chat! 👋
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default TravelMates; 