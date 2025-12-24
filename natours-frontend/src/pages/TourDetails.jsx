import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTour } from "../features/tours/tourSlice";
import api from "../services/api"; // Axios instance
import ReviewsSection from "../components/ReviewsSection";
import { 
  Clock, MapPin, User, Calendar, Star, ArrowLeft, 
  TrendingUp, CheckCircle, Map as MapIcon, CreditCard 
} from "lucide-react";

// ❌ Removed: import { loadStripe }... (Not needed anymore)
// ❌ Removed: const stripePromise... (Not needed anymore)

const TourDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { tour, isLoading, error } = useSelector((state) => state.tours);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    dispatch(getTour(slug));
  }, [dispatch, slug]);

  // ✅ FIXED PAYMENT HANDLER (No Public Key Required)
  const handleBooking = async () => {
    try {
      setIsBooking(true); // Start loading

      // 1. Call Backend to generate Checkout Session
      const res = await api.get(`/bookings/checkout-session/${tour._id}`);
      
      // 2. Backend should return a URL in the session object
      const paymentUrl = res.data.session.url;

      if (paymentUrl) {
        // 3. Redirect browser directly to Stripe
        window.location.assign(paymentUrl);
      } else {
        alert("Server did not provide a payment URL. Please check backend.");
        setIsBooking(false);
      }

    } catch (err) {
      console.error("Booking Error:", err);
      alert(err.response?.data?.message || 'Something went wrong with booking! Try again.');
      setIsBooking(false); // Stop loading on error
    }
  };

  // --- LOADING STATE ---
  if (isLoading) return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  // --- ERROR STATE ---
  if (error || !tour) return (
    <div className="bg-black min-h-screen flex justify-center items-center text-white flex-col gap-4">
      <h2 className="text-2xl font-bold text-red-500">Tour not found</h2>
      <Link to="/tours" className="text-gray-400 hover:text-white flex items-center gap-2">
         <ArrowLeft size={20} /> Back to all tours
      </Link>
    </div>
  );

  // --- DATA HELPERS ---
  const nextDate = tour.startDates && tour.startDates.length > 0 
    ? new Date(tour.startDates[0]).toLocaleString('en-us', {month: 'long', year: 'numeric'}) 
    : 'Date TBA';
    
  const coverImg = tour.imageCover 
    ? `http://localhost:5000/img/tours/${tour.imageCover}` 
    : "https://via.placeholder.com/1500x800";

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      
      {/* HERO HEADER */}
      <div className="relative h-[60vh] w-full">
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
         <img src={coverImg} alt={tour.name} className="w-full h-full object-cover" />
         
         <div className="absolute bottom-10 left-6 md:left-12 z-20 max-w-4xl">
             <div className="flex items-center gap-2 text-green-400 font-bold tracking-widest uppercase mb-2 text-sm">
                <TrendingUp size={16} /> {tour.difficulty} Level
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-white mb-4">{tour.name}</h1>
             <div className="flex flex-wrap gap-6 text-gray-300 font-medium">
                <span className="flex items-center gap-2"><Clock size={20} className="text-green-500"/> {tour.duration} Days</span>
                <span className="flex items-center gap-2"><MapPin size={20} className="text-green-500"/> {tour.startLocation?.description}</span>
             </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-12">
           <div className="bg-[#111] p-8 rounded-3xl border border-white/10 flex flex-wrap gap-8 justify-between">
              <FactItem icon={Calendar} label="Next Date" value={nextDate} />
              <FactItem icon={TrendingUp} label="Difficulty" value={tour.difficulty} />
              <FactItem icon={User} label="Participants" value={`${tour.maxGroupSize} People`} />
              <FactItem icon={Star} label="Rating" value={`${tour.ratingsAverage} / 5`} />
           </div>
           <div>
             <h2 className="text-3xl font-bold mb-6 text-green-400">About {tour.name}</h2>
             <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">{tour.description}</p>
           </div>
           
           {/* Guides */}
           <div>
              <h3 className="text-2xl font-bold mb-6">Your Tour Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tour.guides?.map(guide => (
                  <div key={guide._id} className="flex items-center gap-4 bg-[#111] p-4 rounded-xl border border-white/5">
                     <img 
                       src={`http://localhost:5000/img/users/${guide.photo}`} 
                       onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}}
                       alt={guide.name} 
                       className="w-12 h-12 rounded-full object-cover border-2 border-green-500" 
                     />
                     <div>
                        <p className="font-bold text-white">{guide.name}</p>
                        <p className="text-xs text-gray-400 uppercase">{guide.role === 'lead-guide' ? 'Lead Guide' : 'Tour Guide'}</p>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* RIGHT: BOOKING CARD (Sticky) */}
        <div className="relative">
           <div className="sticky top-28 bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <p className="text-gray-400 text-sm">Total Price</p>
                    <p className="text-4xl font-bold text-white">${tour.price}</p>
                 </div>
                 <div className="bg-green-500/20 px-3 py-1 rounded-full text-green-400 text-xs font-bold">
                    Best Value
                 </div>
              </div>

              <div className="space-y-4 mb-8">
                 <div className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-green-500" /> <span>Professional Guide included</span></div>
                 <div className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-green-500" /> <span>Accommodation provided</span></div>
                 <div className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-green-500" /> <span>All Transport included</span></div>
              </div>

              <button 
                onClick={handleBooking}
                disabled={isBooking}
                className="w-full flex justify-center items-center gap-2 bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-green-500 hover:text-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBooking ? 'Processing...' : 'Book Tour Now'}
                {!isBooking && <CreditCard size={20} />}
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                 100% Money back guarantee if cancelled 7 days prior.
              </p>
           </div>
        </div>

      </div>

      {/* GALLERY */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
         <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
           <MapIcon className="text-green-500"/> Gallery
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tour.images?.map((img, i) => (
               <div key={i} className={`overflow-hidden rounded-2xl border border-white/10 ${i === 1 ? 'md:-mt-10 md:mb-10' : ''}`}>
                  <img src={`http://localhost:5000/img/tours/${img}`} alt="Gallery" className="w-full h-64 md:h-80 object-cover hover:scale-110 transition duration-700" />
               </div>
            ))}
         </div>
         <ReviewsSection tourId={tour._id} />
      </div>

    </div>
  );
};

const FactItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4">
     <div className="bg-white/10 p-3 rounded-full text-green-400"><Icon size={24} /></div>
     <div><p className="text-xs text-gray-400 uppercase font-bold">{label}</p><p className="text-lg font-bold text-white capitalize">{value}</p></div>
  </div>
);

export default TourDetails;