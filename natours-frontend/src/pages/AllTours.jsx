import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTours } from "../features/tours/tourSlice";
import { Link } from "react-router-dom";
import { 
  MapPin, Calendar, User, ArrowRight, Search, 
  Filter, Star, Clock 
} from "lucide-react";

const AllTours = () => {
  const dispatch = useDispatch();
  const { tours, isLoading, error } = useSelector((state) => state.tours);
  
  // Local State for Filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  // Filtering & Sorting Logic
  const filteredTours = tours
    .filter((tour) => 
      tour.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.ratingsAverage - a.ratingsAverage;
      return 0;
    });

  return (
    <div className="bg-black min-h-screen text-white pt-24 pb-20 px-6">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">All Expeditions</span>
        </h1>
        <p className="text-gray-400">Find the perfect adventure that matches your soul.</p>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by tour name (e.g. Forest, Sea)..." 
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-green-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative md:w-64">
             <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
             <select 
               className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-green-500 appearance-none cursor-pointer"
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
             >
               <option value="default">Sort By: Featured</option>
               <option value="price-low">Price: Low to High</option>
               <option value="price-high">Price: High to Low</option>
               <option value="rating">Top Rated</option>
             </select>
          </div>
        </div>
      </div>

      {/* --- TOURS GRID --- */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="h-64 flex justify-center items-center">
             <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-20 text-xl">Error loading tours: {error}</div>
        ) : filteredTours.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No tours found matching "{searchTerm}"</p>
            <button onClick={() => setSearchTerm("")} className="mt-4 text-green-500 hover:underline">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              
              // --- DARK TOUR CARD ---
              <div key={tour._id} className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] transition-all duration-300 flex flex-col">
                
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src={`http://localhost:5000/img/tours/${tour.imageCover}`} 
                    alt={tour.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Star size={14} className="text-yellow-500" fill="currentColor" />
                    <span className="text-xs font-bold">{tour.ratingsAverage}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition">{tour.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 uppercase tracking-wider">
                     <span className="flex items-center gap-1"><MapPin size={14}/> {tour.startLocation?.description}</span>
                     <span className="flex items-center gap-1"><Clock size={14}/> {tour.duration} Days</span>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                    {tour.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-300">
                     <div className="flex items-center gap-2"><Calendar size={16} className="text-green-500"/> {new Date(tour.startDates[0]).toLocaleString('en-us', {month: 'short', year: 'numeric'})}</div>
                     <div className="flex items-center gap-2"><User size={16} className="text-green-500"/> {tour.maxGroupSize} People</div>
                  </div>

                  {/* Footer / CTA */}
                  <div className="border-t border-white/10 pt-6 flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="text-xl font-bold text-white">${tour.price}</p>
                    </div>
                    <Link 
                      to={`/tour/${tour.slug}`}
                      className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-green-500 hover:text-black transition flex items-center gap-2"
                    >
                      Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTours;