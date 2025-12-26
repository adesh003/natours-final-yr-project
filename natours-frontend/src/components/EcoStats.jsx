import { Leaf, TreeDeciduous, Wind } from "lucide-react";

const EcoStats = ({ duration }) => {
  // 🧠 Fake but Realistic Logic
  // Maan lo har din 12kg CO2 bacha rahe hain aur har 3 din par 1 ped laga rahe hain
  const co2Saved = duration * 12; 
  const treesPlanted = Math.ceil(duration / 3);

  return (
    <div className="mt-8 bg-gradient-to-r from-green-900/40 to-green-800/40 p-6 rounded-3xl border border-green-500/30 relative overflow-hidden">
      
      {/* Background Decor */}
      <Leaf className="absolute -top-4 -right-4 text-green-500/10 w-32 h-32 rotate-12" />

      <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
        <Leaf className="animate-bounce" /> Eco-Friendly Choice
      </h3>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        
        {/* Stat 1: CO2 */}
        <div className="bg-[#111]/80 p-4 rounded-2xl border border-green-500/20 backdrop-blur-sm">
           <div className="flex items-center gap-2 mb-1">
              <Wind size={18} className="text-gray-400" />
              <span className="text-xs text-gray-400 uppercase font-bold">CO₂ Saved</span>
           </div>
           <p className="text-2xl font-black text-white">{co2Saved} kg</p>
           <p className="text-[10px] text-gray-500">vs Standard Flights</p>
        </div>

        {/* Stat 2: Trees */}
        <div className="bg-[#111]/80 p-4 rounded-2xl border border-green-500/20 backdrop-blur-sm">
           <div className="flex items-center gap-2 mb-1">
              <TreeDeciduous size={18} className="text-green-500" />
              <span className="text-xs text-gray-400 uppercase font-bold">We Plant</span>
           </div>
           <p className="text-2xl font-black text-white">{treesPlanted} Trees</p>
           <p className="text-[10px] text-gray-500">included in this trip</p>
        </div>

      </div>

      <p className="text-xs text-green-300/80 mt-4 text-center font-medium">
        ✨ 10% of your payment goes to nature conservation.
      </p>

    </div>
  );
};

export default EcoStats;