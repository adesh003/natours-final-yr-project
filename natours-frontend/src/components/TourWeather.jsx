import { useEffect, useState } from "react";
import { CloudRain, Sun, Cloud, Wind, Thermometer } from "lucide-react";

const TourWeather = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Natours DB stores coordinates as [Longitude, Latitude]
  const [lng, lat] = location?.coordinates || [0, 0];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 👇 FREE API (No Key Needed)
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
        );
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (lat && lng) fetchWeather();
  }, [lat, lng]);

  if (loading) return (
    <div className="bg-[#111] p-6 rounded-3xl border border-white/10 animate-pulse h-32 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Checking weather... 🌦️</span>
    </div>
  );

  if (!weather) return null;

  // Simple Logic to choose Icon
  const getIcon = (code) => {
    // WMO Weather Codes: 0=Clear, 1-3=Cloudy, 50+=Rain
    if (code <= 1) return <Sun className="text-yellow-400" size={40} />;
    if (code <= 3) return <Cloud className="text-gray-400" size={40} />;
    return <CloudRain className="text-blue-400" size={40} />;
  };

  return (
    <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-6 rounded-3xl border border-white/10 shadow-lg flex items-center justify-between hover:border-green-500/30 transition-all duration-300">
      
      {/* Left: Temp & Condition */}
      <div>
        <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
          <Thermometer size={14} /> Live at {location.description}
        </p>
        <div className="flex items-center gap-4">
          {getIcon(weather.weathercode)}
          <div>
             <h3 className="text-4xl font-black text-white">
                {weather.temperature}°C
             </h3>
             <p className="text-gray-400 text-sm font-medium">
                {weather.weathercode <= 1 ? "Clear Sky ☀️" : "Cloudy/Rainy ☁️"}
             </p>
          </div>
        </div>
      </div>
      
      {/* Right: Wind Speed */}
      <div className="text-right border-l border-white/10 pl-6">
         <div className="flex flex-col items-end gap-1">
            <Wind size={20} className="text-gray-500" />
            <span className="text-xl font-bold text-white">{weather.windspeed}</span>
            <span className="text-xs text-gray-400 uppercase">km/h Wind</span>
         </div>
      </div>
    </div>
  );
};

export default TourWeather;