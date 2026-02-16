// // import { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getTour } from "../features/tours/tourSlice";
// // import api from "../services/api"; // Axios instance
// // import ReviewsSection from "../components/ReviewsSection";
// // import TourMap from "../components/TourMap";
// // import TourWeather from "../components/TourWeather";
// // import { 
// //   Clock, MapPin, User, Calendar, Star, ArrowLeft, 
// //   TrendingUp, CheckCircle, Map as MapIcon, CreditCard,
// //   Glasses 
// // } from "lucide-react";
// // import EcoStats from "../components/EcoStats";
// // import Tour360 from "../components/Tour360"; 

// // const TourDetails = () => {
// //   const { slug } = useParams();
// //   const dispatch = useDispatch();
// //   const { tour, isLoading, error } = useSelector((state) => state.tours);
  
// //   const [isBooking, setIsBooking] = useState(false);
// //   const [show360, setShow360] = useState(false); 

// //   useEffect(() => {
// //     dispatch(getTour(slug));
// //   }, [dispatch, slug]);

// //   // ✅ FIXED PAYMENT HANDLER (No Public Key Required)
// //   const handleBooking = async () => {
// //     try {
// //       setIsBooking(true); // Start loading

// //       // 1. Call Backend to generate Checkout Session
// //       const res = await api.get(`/bookings/checkout-session/${tour._id}`);
      
// //       // 2. Backend should return a URL in the session object
// //       const paymentUrl = res.data.session.url;

// //       if (paymentUrl) {
// //         // 3. Redirect browser directly to Stripe
// //         window.location.assign(paymentUrl);
// //       } else {
// //         alert("Server did not provide a payment URL. Please check backend.");
// //         setIsBooking(false);
// //       }

// //     } catch (err) {
// //       console.error("Booking Error:", err);
// //       alert(err.response?.data?.message || 'Something went wrong with booking! Try again.');
// //       setIsBooking(false); // Stop loading on error
// //     }
// //   };

// //   // --- LOADING STATE ---
// //   if (isLoading) return (
// //     <div className="bg-black min-h-screen flex justify-center items-center">
// //       <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
// //     </div>
// //   );
  
// //   // --- ERROR STATE ---
// //   if (error || !tour) return (
// //     <div className="bg-black min-h-screen flex justify-center items-center text-white flex-col gap-4">
// //       <h2 className="text-2xl font-bold text-red-500">Tour not found</h2>
// //       <Link to="/tours" className="text-gray-400 hover:text-white flex items-center gap-2">
// //          <ArrowLeft size={20} /> Back to all tours
// //       </Link>
// //     </div>
// //   );

// //   // --- DATA HELPERS ---
// //   const nextDate = tour.startDates && tour.startDates.length > 0 
// //     ? new Date(tour.startDates[0]).toLocaleString('en-us', {month: 'long', year: 'numeric'}) 
// //     : 'Date TBA';
    
// //   const coverImg = tour.imageCover 
// //     ? `http://localhost:5000/img/tours/${tour.imageCover}` 
// //     : "https://via.placeholder.com/1500x800";

// //   return (
// //     <div className="bg-black min-h-screen text-white pb-20">
      
// //       {/* HERO HEADER */}
// //       <div className="relative h-[60vh] w-full">
// //          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
// //          <img src={coverImg} alt={tour.name} className="w-full h-full object-cover" />
         
// //          <div className="absolute bottom-10 left-6 md:left-12 z-20 max-w-4xl">
// //              <div className="flex items-center gap-2 text-green-400 font-bold tracking-widest uppercase mb-2 text-sm">
// //                 <TrendingUp size={16} /> {tour.difficulty} Level
// //              </div>
// //              <h1 className="text-5xl md:text-7xl font-black text-white mb-4">{tour.name}</h1>
// //              <div className="flex flex-wrap gap-6 text-gray-300 font-medium">
// //                 <span className="flex items-center gap-2"><Clock size={20} className="text-green-500"/> {tour.duration} Days</span>
// //                 <span className="flex items-center gap-2"><MapPin size={20} className="text-green-500"/> {tour.startLocation?.description}</span>
// //              </div>

// //              {/* 👇 ADDED: 360 VR BUTTON */}
// //              <button 
// //                 onClick={() => setShow360(true)}
// //                 className="mt-6 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 border border-white/30 shadow-lg group"
// //               >
// //                 <Glasses className="group-hover:rotate-12 transition-transform" />
// //                 View in 360° VR
// //              </button>
// //              {/* 👆 ADDED END */}

// //          </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
// //         {/* LEFT CONTENT */}
// //         <div className="lg:col-span-2 space-y-12">
// //            <div className="bg-[#111] p-8 rounded-3xl border border-white/10 flex flex-wrap gap-8 justify-between">
// //               <FactItem icon={Calendar} label="Next Date" value={nextDate} />
// //               <FactItem icon={TrendingUp} label="Difficulty" value={tour.difficulty} />
// //               <FactItem icon={User} label="Participants" value={`${tour.maxGroupSize} People`} />
// //               <FactItem icon={Star} label="Rating" value={`${tour.ratingsAverage} / 5`} />
// //            </div>
// //            <div>
// //              <h2 className="text-3xl font-bold mb-6 text-green-400">About {tour.name}</h2>
// //              <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">{tour.description}</p>
// //            </div>
// //            {tour.startLocation && <TourWeather location={tour.startLocation} />}
// //            {/* Guides */}
// //            <div>
// //               <h3 className="text-2xl font-bold mb-6">Your Tour Guides</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {tour.guides?.map(guide => (
// //                   <div key={guide._id} className="flex items-center gap-4 bg-[#111] p-4 rounded-xl border border-white/5">
// //                       <img 
// //                         src={`http://localhost:5000/img/users/${guide.photo}`} 
// //                         onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}}
// //                         alt={guide.name} 
// //                         className="w-12 h-12 rounded-full object-cover border-2 border-green-500" 
// //                       />
// //                       <div>
// //                          <p className="font-bold text-white">{guide.name}</p>
// //                          <p className="text-xs text-gray-400 uppercase">{guide.role === 'lead-guide' ? 'Lead Guide' : 'Tour Guide'}</p>
// //                       </div>
// //                    </div>
// //                 ))}
// //               </div>
// //            </div>
// //         </div>

// //         {/* RIGHT: BOOKING CARD (Sticky) */}
// //         <div className="relative">
// //            <div className="sticky top-28 bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 shadow-2xl">
// //               <div className="flex justify-between items-end mb-8">
// //                  <div>
// //                     <p className="text-gray-400 text-sm">Total Price</p>
// //                     <p className="text-4xl font-bold text-white">${tour.price}</p>
// //                  </div>
// //                  <div className="bg-green-500/20 px-3 py-1 rounded-full text-green-400 text-xs font-bold">
// //                     Best Value
// //                  </div>
// //               </div>

// //               <div className="space-y-4 mb-8">
// //                  <div className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-green-500" /> <span>Professional Guide included</span></div>
// //                  <div className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-green-500" /> <span>Accommodation provided</span></div>
// //                  <div className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-green-500" /> <span>All Transport included</span></div>
// //               </div>

// //               <button 
// //                 onClick={handleBooking}
// //                 disabled={isBooking}
// //                 className="w-full flex justify-center items-center gap-2 bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-green-500 hover:text-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 {isBooking ? 'Processing...' : 'Book Tour Now'}
// //                 {!isBooking && <CreditCard size={20} />}
// //               </button>
              
// //               <p className="text-center text-xs text-gray-500 mt-4">
// //                  100% Money back guarantee if cancelled 7 days prior.
// //               </p>
// //               <div className="sticky top-[550px]"> {/* Thoda neeche stick karega */}
// //       <EcoStats duration={tour.duration} />
// //    </div>
// //            </div>
// //         </div>

// //       </div>

// //       {/* GALLERY */}
// //       <div className="max-w-7xl mx-auto px-6 mt-20">
// //          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
// //            <MapIcon className="text-green-500"/> Gallery
// //          </h2>
// //          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {tour.images?.map((img, i) => (
// //                <div key={i} className={`overflow-hidden rounded-2xl border border-white/10 ${i === 1 ? 'md:-mt-10 md:mb-10' : ''}`}>
// //                   <img src={`http://localhost:5000/img/tours/${img}`} alt="Gallery" className="w-full h-64 md:h-80 object-cover hover:scale-110 transition duration-700" />
// //                </div>
// //             ))}
// //          </div>
// //          <div className="max-w-7xl mx-auto px-6 mt-20">
// //          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
// //            <MapIcon className="text-green-500"/> Tour Locations
// //          </h2>
// //          <TourMap locations={tour.locations} />
// //       </div>
// //          <ReviewsSection tourId={tour._id} />
// //       </div>

// //       {/* 👇 ADDED: 360 MODAL RENDER (Conditional) */}
// //       {show360 && <Tour360 onClose={() => setShow360(false)} />}
      
// //     </div>
// //   );
// // };

// // const FactItem = ({ icon: Icon, label, value }) => (
// //   <div className="flex items-center gap-4">
// //      <div className="bg-white/10 p-3 rounded-full text-green-400"><Icon size={24} /></div>
// //      <div><p className="text-xs text-gray-400 uppercase font-bold">{label}</p><p className="text-lg font-bold text-white capitalize">{value}</p></div>
// //   </div>
// // );

// // export default TourDetails;


// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getTour } from "../features/tours/tourSlice";
// import api from "../services/api"; 
// import ReviewsSection from "../components/ReviewsSection";
// import TourMap from "../components/TourMap";
// import TourWeather from "../components/TourWeather";
// import { 
//   Clock, MapPin, User, Calendar, Star, ArrowLeft, 
//   TrendingUp, CheckCircle, Map as MapIcon, CreditCard,
//   Glasses, Camera, Quote
// } from "lucide-react";
// import EcoStats from "../components/EcoStats";
// import Tour360 from "../components/Tour360"; 

// const TourDetails = () => {
//   const { slug } = useParams();
//   const dispatch = useDispatch();
//   const { tour, isLoading, error } = useSelector((state) => state.tours);
  
//   const [isBooking, setIsBooking] = useState(false);
//   const [show360, setShow360] = useState(false); 

//   useEffect(() => {
//     dispatch(getTour(slug));
//   }, [dispatch, slug]);

//   const handleBooking = async () => {
//     try {
//       setIsBooking(true);
//       const res = await api.get(`/bookings/checkout-session/${tour._id}`);
//       const paymentUrl = res.data.session.url;

//       if (paymentUrl) {
//         window.location.assign(paymentUrl);
//       } else {
//         alert("Server did not provide a payment URL. Please check backend.");
//         setIsBooking(false);
//       }
//     } catch (err) {
//       console.error("Booking Error:", err);
//       alert(err.response?.data?.message || 'Something went wrong with booking! Try again.');
//       setIsBooking(false);
//     }
//   };

//   if (isLoading) return (
//     <div className="bg-black min-h-screen flex justify-center items-center">
//       <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );
  
//   if (error || !tour) return (
//     <div className="bg-black min-h-screen flex justify-center items-center text-white flex-col gap-4">
//       <h2 className="text-2xl font-bold text-red-500">Tour not found</h2>
//       <Link to="/tours" className="text-gray-400 hover:text-white flex items-center gap-2">
//          <ArrowLeft size={20} /> Back to all tours
//       </Link>
//     </div>
//   );

//   const nextDate = tour.startDates && tour.startDates.length > 0 
//     ? new Date(tour.startDates[0]).toLocaleString('en-us', {month: 'long', year: 'numeric'}) 
//     : 'Date TBA';
    
//   const coverImg = tour.imageCover 
//     ? `http://localhost:5000/img/tours/${tour.imageCover}` 
//     : "https://via.placeholder.com/1500x800";

//   return (
//     <div className="bg-black min-h-screen text-white">
      
//       {/* ==================== 1. HERO SECTION ==================== */}
//       <div className="relative h-[85vh] w-full">
//          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10" />
//          <img src={coverImg} alt={tour.name} className="w-full h-full object-cover fixed top-0 left-0 -z-10" /> {/* Parallax Effect */}
         
//          <div className="absolute bottom-20 left-0 w-full z-20 px-6">
//              <div className="max-w-7xl mx-auto">
//                 <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 font-bold tracking-widest uppercase mb-4 text-xs px-3 py-1 rounded-full">
//                     <TrendingUp size={14} /> {tour.difficulty} Level
//                 </div>
//                 <h1 className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl">{tour.name}</h1>
                
//                 <div className="flex flex-wrap items-center gap-8 text-gray-200 font-bold text-lg">
//                     <span className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
//                         <Clock size={20} className="text-green-500"/> {tour.duration} Days
//                     </span>
//                     <span className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
//                         <MapPin size={20} className="text-green-500"/> {tour.startLocation?.description}
//                     </span>
//                 </div>

//                 <button 
//                     onClick={() => setShow360(true)}
//                     className="mt-8 flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold transition-all hover:bg-green-400 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
//                 >
//                     <Glasses className="group-hover:rotate-12 transition-transform" />
//                     Experience in 360° VR
//                 </button>
//              </div>
//          </div>
//       </div>

//       {/* ==================== 2. DETAILS & BOOKING (White Background Wrapper for Content) ==================== */}
//       <div className="relative z-30 bg-black rounded-t-[3rem] -mt-10 border-t border-white/10 shadow-2xl overflow-hidden">
        
//         <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
            
//             {/* LEFT: INFO */}
//             <div className="lg:col-span-2 space-y-16">
                
//                 {/* Quick Stats Grid */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <FactItem icon={Calendar} label="Next Date" value={nextDate} />
//                     <FactItem icon={TrendingUp} label="Difficulty" value={tour.difficulty} />
//                     <FactItem icon={User} label="Participants" value={`${tour.maxGroupSize} People`} />
//                     <FactItem icon={Star} label="Rating" value={`${tour.ratingsAverage} / 5`} />
//                 </div>

//                 {/* Description */}
//                 <div>
//                     <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
//                         About the Adventure
//                     </h2>
//                     <p className="text-gray-300 text-lg leading-loose whitespace-pre-line font-light">
//                         {tour.description}
//                     </p>
//                 </div>

//                 {/* Weather */}
//                 {tour.startLocation && <TourWeather location={tour.startLocation} />}

//                 {/* Guides */}
//                 <div>
//                     <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                         <User className="text-green-500"/> Your Guides
//                     </h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                         {tour.guides?.map(guide => (
//                         <div key={guide._id} className="flex items-center gap-4 bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition duration-300">
//                             <img 
//                                 src={`http://localhost:5000/img/users/${guide.photo}`} 
//                                 onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}}
//                                 alt={guide.name} 
//                                 className="w-14 h-14 rounded-full object-cover border-2 border-green-500/50" 
//                             />
//                             <div>
//                                 <p className="font-bold text-white text-lg">{guide.name}</p>
//                                 <p className="text-xs text-green-400 uppercase tracking-wider font-bold">
//                                     {guide.role === 'lead-guide' ? 'Lead Guide' : 'Tour Guide'}
//                                 </p>
//                             </div>
//                         </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* RIGHT: STICKY BOOKING CARD */}
//             <div className="relative">
//                 <div className="sticky top-28 bg-[#111] p-8 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -z-10"></div>
                    
//                     <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-8">
//                         <div>
//                             <p className="text-gray-400 text-sm font-medium">Total Price</p>
//                             <p className="text-4xl font-black text-white">${tour.price}</p>
//                         </div>
//                         <div className="flex items-center gap-1 bg-green-900/30 px-3 py-1 rounded-lg text-green-400 text-xs font-bold border border-green-500/20">
//                             <CheckCircle size={12} /> Best Value
//                         </div>
//                     </div>

//                     <div className="space-y-5 mb-10">
//                         <div className="flex items-center gap-4 text-gray-300">
//                             <div className="bg-green-500/20 p-2 rounded-full text-green-500"><User size={16} /></div>
//                             <span className="text-sm">Professional Guide included</span>
//                         </div>
//                         <div className="flex items-center gap-4 text-gray-300">
//                             <div className="bg-green-500/20 p-2 rounded-full text-green-500"><MapPin size={16} /></div>
//                             <span className="text-sm">Transport & Hotels included</span>
//                         </div>
//                     </div>

//                     <button 
//                         onClick={handleBooking}
//                         disabled={isBooking}
//                         className="w-full group relative overflow-hidden bg-white text-black py-5 rounded-2xl font-black text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         <span className="relative z-10 flex justify-center items-center gap-2">
//                              {isBooking ? 'Processing...' : 'Book Tour Now'} {!isBooking && <CreditCard size={20} />}
//                         </span>
//                         <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
//                         <span className="absolute inset-0 z-10 flex justify-center items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             Let's Go! <ArrowLeft className="rotate-180" size={20} />
//                         </span>
//                     </button>
                    
//                     <p className="text-center text-xs text-gray-600 mt-6 font-medium">
//                         Secure payment powered by Stripe
//                     </p>

//                     <div className="mt-8 pt-6 border-t border-white/5">
//                         <EcoStats duration={tour.duration} />
//                     </div>
//                 </div>
//             </div>

//         </div>
//       </div>

//       {/* ==================== 3. GALLERY SECTION (Full Width Dark) ==================== */}
//       <section className="relative z-30 py-24 bg-[#050505] border-t border-white/5">
//          <div className="max-w-7xl mx-auto px-6">
//             <div className="flex items-center justify-between mb-12">
//                 <h2 className="text-4xl font-black flex items-center gap-4">
//                    <div className="bg-white/10 p-3 rounded-2xl"><Camera size={32} className="text-green-500"/></div>
//                    Captured Moments
//                 </h2>
//                 <p className="hidden md:block text-gray-500">Swipe to explore visuals</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
//                 {tour.images?.map((img, i) => (
//                     <div key={i} className={`group relative overflow-hidden rounded-3xl border border-white/10 ${i === 0 ? 'md:col-span-2' : ''}`}>
//                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
//                         <img 
//                            src={`http://localhost:5000/img/tours/${img}`} 
//                            alt="Gallery" 
//                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out" 
//                         />
//                     </div>
//                 ))}
//             </div>
//          </div>
//       </section>

//       {/* ==================== 4. MAP SECTION (Slightly Lighter Dark) ==================== */}
//       <section className="relative z-30 py-24 bg-[#0a0a0a]">
//           <div className="max-w-7xl mx-auto px-6">
//              <div className="mb-12 text-center max-w-2xl mx-auto">
//                  <h2 className="text-4xl font-black mb-4 flex justify-center items-center gap-3">
//                     <MapIcon size={36} className="text-green-500"/> The Route
//                  </h2>
//                  <p className="text-gray-400">
//                     Explore the path we will take. Every stop is curated for the best experience.
//                  </p>
//              </div>
             
//              {/* Map Container - Glassmorphism Border */}
//              <div className="rounded-[2.5rem] overflow-hidden border-4 border-white/5 shadow-2xl h-[500px] relative">
//                  <TourMap locations={tour.locations} />
                 
//                  {/* Decorative Overlay */}
//                  <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 z-[1000] pointer-events-none">
//                      <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Start Location</p>
//                      <p className="text-white font-bold">{tour.startLocation?.description}</p>
//                  </div>
//              </div>
//           </div>
//       </section>

//       {/* ==================== 5. REVIEWS SECTION (Darkest) ==================== */}
//       <section className="relative z-30 py-24 bg-black border-t border-white/10">
//           <div className="max-w-7xl mx-auto px-6">
//              <div className="flex items-center gap-4 mb-16">
//                  <div className="h-px bg-white/10 flex-1"></div>
//                  <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-300">
//                     <Quote className="rotate-180 text-green-500" size={24}/> Traveler Reviews
//                  </h2>
//                  <div className="h-px bg-white/10 flex-1"></div>
//              </div>
             
//              <ReviewsSection tourId={tour._id} />
//           </div>
//       </section>

//       {/* 360 MODAL */}
//       {show360 && <Tour360 onClose={() => setShow360(false)} />}
      
//     </div>
//   );
// };

// // HELPER COMPONENT FOR STATS
// const FactItem = ({ icon: Icon, label, value }) => (
//   <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-green-500/30 transition-colors">
//      <div className="bg-green-500/10 p-3 rounded-xl text-green-500">
//         <Icon size={24} />
//      </div>
//      <div>
//         <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{label}</p>
//         <p className="text-base font-bold text-white capitalize">{value}</p>
//      </div>
//   </div>
// );

// export default TourDetails;
//

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTour } from "../features/tours/tourSlice";
import api from "../services/api"; 
import ReviewsSection from "../components/ReviewsSection";
import TourMap from "../components/TourMap";
import TourWeather from "../components/TourWeather";
import { 
  Clock, MapPin, User, Calendar, Star, ArrowLeft, 
  TrendingUp, CheckCircle, Map as MapIcon, CreditCard,
  Glasses, Camera, Phone, Mail, Globe, ShieldCheck
} from "lucide-react";
import EcoStats from "../components/EcoStats";
import Tour360 from "../components/Tour360"; 

const TourDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { tour, isLoading, error } = useSelector((state) => state.tours);
  
  const [isBooking, setIsBooking] = useState(false);
  const [show360, setShow360] = useState(false); 

  useEffect(() => {
    dispatch(getTour(slug));
  }, [dispatch, slug]);

  const handleBooking = async () => {
    try {
      setIsBooking(true);
      const res = await api.get(`/bookings/checkout-session/${tour._id}`);
      const paymentUrl = res.data.session.url;

      if (paymentUrl) {
        window.location.assign(paymentUrl);
      } else {
        alert("Server did not provide a payment URL.");
        setIsBooking(false);
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert(err.response?.data?.message || 'Something went wrong!');
      setIsBooking(false);
    }
  };

  if (isLoading) return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (error || !tour) return (
    <div className="bg-black min-h-screen flex justify-center items-center text-white flex-col gap-4">
      <h2 className="text-2xl font-bold text-red-500">Tour not found</h2>
      <Link to="/tours" className="text-gray-400 hover:text-white flex items-center gap-2">
         <ArrowLeft size={20} /> Back to all tours
      </Link>
    </div>
  );

  const nextDate = tour.startDates && tour.startDates.length > 0 
    ? new Date(tour.startDates[0]).toLocaleString('en-us', {month: 'long', year: 'numeric'}) 
    : 'Date TBA';
    
  // ✅ Fixed Cover Image with Fallback
  const coverImg = tour.imageCover 
    ? `http://localhost:5000/img/tours/${tour.imageCover}` 
    : "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1600";

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      
      {/* ==================== 1. HERO HEADER (FIXED) ==================== */}
      <div className="relative h-[70vh] w-full overflow-hidden">
         {/* Gradient Overlay for Text Readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/30 z-10" />
         
         {/* Main Image */}
         <img 
            src={coverImg} 
            alt={tour.name} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[20s]" 
         />
         
         <div className="absolute bottom-0 left-0 w-full z-20 px-6 pb-12">
             <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <TrendingUp size={12} /> {tour.difficulty}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400"/> {tour.ratingsAverage} ({tour.ratingsQuantity})
                    </span>
                </div>
                
                <h1 className="text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-xl leading-tight">
                    {tour.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-200 font-medium text-lg">
                    <span className="flex items-center gap-2">
                        <Clock size={22} className="text-green-500"/> {tour.duration} Days
                    </span>
                    <span className="flex items-center gap-2">
                        <MapPin size={22} className="text-green-500"/> {tour.startLocation?.description}
                    </span>
                    <button 
                        onClick={() => setShow360(true)}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-full font-bold text-sm transition-all border border-white/20"
                    >
                        <Glasses size={18} /> 360° VR View
                    </button>
                </div>
             </div>
         </div>
      </div>

      {/* ==================== 2. MAIN CONTENT GRID ==================== */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- LEFT COLUMN: INFO --- */}
        <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111] p-6 rounded-2xl border border-white/10">
                <FactItem icon={Calendar} label="Next Date" value={nextDate} />
                <FactItem icon={TrendingUp} label="Difficulty" value={tour.difficulty} />
                <FactItem icon={User} label="Group Size" value={`${tour.maxGroupSize} Max`} />
                <FactItem icon={Star} label="Rating" value={`${tour.ratingsAverage} / 5`} />
            </div>

            {/* Description */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                   About the Tour
                   <div className="h-px bg-green-500 flex-grow ml-4 opacity-50"></div>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line font-light">
                    {tour.description}
                </p>
            </div>

            {/* Weather Widget */}
            {tour.startLocation && <TourWeather location={tour.startLocation} />}

            {/* Guides Section */}
            <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Your Expert Guides</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tour.guides?.map(guide => (
                    <div key={guide._id} className="flex items-center gap-4 bg-[#111] p-4 rounded-xl border border-white/5 hover:border-green-500/30 transition">
                        <img 
                            src={`http://localhost:5000/img/users/${guide.photo}`} 
                            onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}}
                            alt={guide.name} 
                            className="w-14 h-14 rounded-full object-cover border-2 border-green-500/30" 
                        />
                        <div>
                            <p className="font-bold text-white">{guide.name}</p>
                            <p className="text-xs text-green-400 uppercase font-bold tracking-wider">
                                {guide.role === 'lead-guide' ? 'Lead Guide' : 'Tour Guide'}
                            </p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Eco Stats */}
            <EcoStats duration={tour.duration} />

        </div>

        {/* --- RIGHT COLUMN: STICKY BOOKING CARD --- */}
        <div className="relative">
            <div className="sticky top-28 bg-[#151515] p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="flex flex-col gap-1 mb-6 border-b border-white/10 pb-6">
                    <p className="text-gray-400 text-sm font-medium">Total Price per person</p>
                    <div className="flex items-end gap-2">
                        <p className="text-4xl font-black text-white">₹{tour.price}</p>
                        <span className="text-green-500 text-sm font-bold mb-2">Best Price</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" /> Professional Guide
                    </li>
                    <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" /> Transport & Hotels
                    </li>
                    <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" /> Meals Included
                    </li>
                    <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" /> Tax & Service Charges
                    </li>
                </div>

                <button 
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full bg-green-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition-all shadow-lg hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {isBooking ? 'Processing...' : 'Book Now'} {!isBooking && <CreditCard size={20} />}
                </button>
                
                <div className="mt-6 flex justify-center items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck size={14} /> Secure Payment via Stripe
                </div>
            </div>
        </div>

      </div>

      {/* ==================== 3. ORIGINAL GALLERY STYLE ==================== */}
      <section className="bg-black py-20 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 text-white">
                <Camera className="text-green-500"/> Tour Gallery
            </h2>
            
            {/* Original Grid Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tour.images?.map((img, i) => (
                    <div key={i} className={`overflow-hidden rounded-2xl border border-white/10 group ${i === 1 ? 'md:-mt-12 md:mb-12 shadow-2xl relative z-10' : ''}`}>
                        <img 
                            src={`http://localhost:5000/img/tours/${img}`} 
                            alt="Gallery" 
                            className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100" 
                            onError={(e)=>{e.target.src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800"}}
                        />
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* ==================== 4. MAP SECTION ==================== */}
      <section className="py-20 bg-[#0a0a0a]">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 text-white">
                <MapIcon className="text-green-500"/> Tour Location
            </h2>
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[450px]">
                <TourMap locations={tour.locations} />
            </div>
         </div>
      </section>

      {/* ==================== 5. REVIEWS SECTION ==================== */}
      <section className="py-20 bg-black border-t border-white/10">
         <div className="max-w-7xl mx-auto px-6">
             <ReviewsSection tourId={tour._id} />
         </div>
      </section>

      {/* ==================== 6. NEW FOOTER (ADDED) ==================== */}
      <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="md:col-span-1">
                    <h4 className="text-2xl font-black text-white mb-4 tracking-widest">NATOURS</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Natours is a fictional tour booking platform built for backpackers and adventure lovers.
                    </p>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-4 uppercase text-sm">Company</h5>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        <li><a href="#" className="hover:text-green-500 transition">About Us</a></li>
                        <li><a href="#" className="hover:text-green-500 transition">Careers</a></li>
                        <li><a href="#" className="hover:text-green-500 transition">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-4 uppercase text-sm">Contact</h5>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        <li className="flex items-center gap-2"><Mail size={14}/> hello@natours.io</li>
                        <li className="flex items-center gap-2"><Phone size={14}/> +1 123 456 7890</li>
                        <li className="flex items-center gap-2"><MapPin size={14}/> San Francisco, USA</li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-4 uppercase text-sm">Social</h5>
                    <div className="flex gap-4">
                        <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Globe size={18}/></a>
                        <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Mail size={18}/></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-gray-600 text-sm">
                &copy; 2025 Natours Inc. All rights reserved.
            </div>
        </div>
      </footer>

      {/* 360 MODAL */}
      {show360 && <Tour360 onClose={() => setShow360(false)} />}
      
    </div>
  );
};

// HELPER FOR STATS
const FactItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center text-center">
     <div className="text-green-500 mb-2"><Icon size={24} /></div>
     <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">{label}</p>
     <p className="text-base font-bold text-white capitalize">{value}</p>
  </div>
);

export default TourDetails;