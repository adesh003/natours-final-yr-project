import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTours } from "../features/tours/tourSlice";
import { Link } from "react-router-dom";
import { 
  Search, Filter, SlidersHorizontal, Map, 
  MapPin, Clock, Calendar, User, ArrowRight, Star
} from "lucide-react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import { motion, AnimatePresence } from "framer-motion";

const AllTours = () => {
  const dispatch = useDispatch();
  const { tours, isLoading } = useSelector((state) => state.tours);

  // --- FILTER STATES ---
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]); // ✅ 1 Lakh Limit
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [sortBy, setSortBy] = useState("price-asc");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  // --- FILTER LOGIC ---
  const filteredTours = useMemo(() => {
    if (!tours) return [];

    return tours
      .filter((tour) => {
        // 1. Search
        const matchesSearch = tour.name.toLowerCase().includes(search.toLowerCase());
        // 2. Price (Ensure Number conversion)
        const matchesPrice = Number(tour.price) >= priceRange[0] && Number(tour.price) <= priceRange[1];
        // 3. Difficulty
        const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(tour.difficulty);

        return matchesSearch && matchesPrice && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "ratings") return b.ratingsAverage - a.ratingsAverage;
        if (sortBy === "duration") return a.duration - b.duration;
        return 0;
      });
  }, [tours, search, priceRange, selectedDifficulty, sortBy]);

  // Handlers
  const toggleDifficulty = (level) => {
    setSelectedDifficulty(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setPriceRange([0, 100000]);
    setSelectedDifficulty([]);
    setSortBy("price-asc");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
      
      {/* 1. HERO HEADER */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
          Explore Expeditions
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Discover {tours.length} unique adventures crafted for the wild at heart.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
        
        {/* Mobile Filter Toggle */}
        <button 
          className="lg:hidden flex items-center gap-2 bg-[#111] px-4 py-3 rounded-xl border border-white/10 font-bold mb-4"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <SlidersHorizontal size={18} /> Filters
        </button>

        {/* 2. SIDEBAR FILTERS (Sticky) */}
        <aside className={`
          lg:col-span-1 bg-[#111] p-6 rounded-3xl border border-white/10 h-fit sticky top-28
          ${showMobileFilters ? 'block' : 'hidden lg:block'}
        `}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              <Filter size={20} className="text-green-500"/> Filters
            </h3>
            <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-white underline">
              Reset
            </button>
          </div>

          {/* Search */}
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search tours..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-green-500 transition"
            />
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">
              Price Range
            </label>
            <Slider 
              range 
              min={0} 
              max={100000} 
              defaultValue={[0, 100000]} 
              value={priceRange}
              onChange={setPriceRange}
              trackStyle={[{ backgroundColor: '#10B981' }]}
              handleStyle={[{ borderColor: '#10B981', backgroundColor: '#000' }, { borderColor: '#10B981', backgroundColor: '#000' }]}
              railStyle={{ backgroundColor: '#333' }}
            />
            <div className="flex justify-between mt-3 text-sm font-bold text-gray-300">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">
              Difficulty
            </label>
            <div className="space-y-2">
              {['easy', 'medium', 'difficult'].map((level) => (
                <div 
                  key={level}
                  onClick={() => toggleDifficulty(level)}
                  className={`cursor-pointer px-4 py-3 rounded-xl border transition-all flex justify-between items-center group ${
                    selectedDifficulty.includes(level) 
                    ? 'bg-green-500/10 border-green-500 text-green-400' 
                    : 'bg-black/20 border-white/5 text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <span className="capitalize font-medium">{level}</span>
                  {selectedDifficulty.includes(level) && <div className="w-2 h-2 rounded-full bg-green-500" />}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 3. MAIN CONTENT */}
        <div className="lg:col-span-3">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-[#111] p-4 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-sm font-medium mb-2 sm:mb-0">
              Showing <span className="text-white font-bold">{filteredTours.length}</span> adventures
            </p>
            <div className="flex items-center gap-3">
               <span className="text-xs text-gray-500 uppercase font-bold">Sort By:</span>
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="bg-black text-white text-sm px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 cursor-pointer"
               >
                 <option value="price-asc">Price: Low to High</option>
                 <option value="price-desc">Price: High to Low</option>
                 <option value="ratings">Top Rated</option>
                 <option value="duration">Duration: Longest</option>
               </select>
            </div>
          </div>

          {/* 4. TOUR GRID */}
          {isLoading ? (
            <div className="text-center py-20 text-gray-500 animate-pulse">
               Loading adventures...
            </div>
          ) : filteredTours.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredTours.map((tour) => (
                  <motion.div
                    layout
                    key={tour._id || tour.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex"
                  >
                    {/* 👇 INLINED DARK CARD DESIGN (FIXED) */}
                    <div className="group w-full bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] transition-all duration-300 flex flex-col">
                        
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                           <img 
                             src={`http://localhost:5000/img/tours/${tour.imageCover}`} 
                             alt={tour.name} 
                             className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                           />
                           <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                             <Star size={14} className="text-yellow-500" fill="currentColor" />
                             <span className="text-xs font-bold text-white">{tour.ratingsAverage}</span>
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                           <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition">{tour.name}</h3>
                           
                           <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 uppercase tracking-wider">
                              <span className="flex items-center gap-1"><MapPin size={14}/> {tour.startLocation?.description}</span>
                              <span className="flex items-center gap-1"><Clock size={14}/> {tour.duration} Days</span>
                           </div>

                           <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-300">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-green-500"/> 
                                {tour.startDates?.[0] ? new Date(tour.startDates[0]).toLocaleString('en-us', {month: 'short', year: 'numeric'}) : 'N/A'}
                              </div>
                              <div className="flex items-center gap-2"><User size={16} className="text-green-500"/> {tour.maxGroupSize} People</div>
                           </div>

                           {/* Footer */}
                           <div className="border-t border-white/10 pt-6 flex items-center justify-between mt-auto">
                              <div>
                                <p className="text-xs text-gray-500">Starting from</p>
                                <p className="text-xl font-bold text-white">₹{tour.price}</p>
                              </div>
                              <Link 
                                to={`/tour/${tour.slug}`}
                                className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-sm hover:bg-green-500 hover:text-black transition flex items-center gap-2"
                              >
                                Details <ArrowRight size={16} />
                              </Link>
                           </div>
                        </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            // EMPTY STATE
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="bg-[#111] p-6 rounded-full mb-4">
                  <Map size={40} className="text-gray-600" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">No tours found</h3>
               <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
               <button onClick={clearFilters} className="text-green-500 font-bold hover:underline">
                 Clear all filters
               </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AllTours;