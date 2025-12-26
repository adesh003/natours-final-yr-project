import { Trophy, Star, Map, Crown } from "lucide-react";

const UserBadges = ({ points = 50 }) => {
  // 1. Level Logic Define Karo
  let level = "Newbie 🎒";
  let nextLevel = "Explorer";
  let maxPoints = 100;
  let icon = <Star className="text-yellow-400" size={24} />;
  let color = "from-blue-400 to-blue-600";

  if (points >= 100 && points < 500) {
    level = "Explorer 🧭";
    nextLevel = "Legend";
    maxPoints = 500;
    icon = <Map className="text-green-400" size={24} />;
    color = "from-green-400 to-green-600";
  } else if (points >= 500) {
    level = "Legend 👑";
    nextLevel = "God Mode";
    maxPoints = 1000;
    icon = <Crown className="text-yellow-500" size={24} />;
    color = "from-purple-400 to-purple-600";
  }

  // 2. Progress Calculation
  const progress = Math.min((points / maxPoints) * 100, 100);

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 shadow-lg mb-8 animate-fade-in-up">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
            Current Rank
          </h2>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            {level} {icon}
          </h1>
        </div>
        
        <div className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-2">
          <Trophy size={14} className="text-yellow-400" />
          <span className="text-white font-mono font-bold">{points} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-2">
        <div 
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${color} transition-all duration-1000`}
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer Effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 font-medium">
        <span>0 XP</span>
        <span className="text-green-400">
          {maxPoints - points} XP to {nextLevel} 🚀
        </span>
        <span>{maxPoints} XP</span>
      </div>

    </div>
  );
};

export default UserBadges;