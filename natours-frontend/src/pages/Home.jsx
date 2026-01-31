// import { Link } from "react-router-dom";
// import { 
//   Play, ArrowRight, Star, Mountain, Compass, Users, MapPin, 
//   Facebook, Twitter, Instagram, Mail, Phone, Tent, Flame,
//   Wallet, Camera, Heart
// } from "lucide-react";

// const Home = () => {
//   return (
//     <div className="bg-black min-h-screen text-white overflow-hidden selection:bg-green-500 selection:text-black font-sans">
      
//       {/* ==================== 1. HERO SECTION ==================== */}
//       <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        
//         {/* Animated Glows */}
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[120px] animate-pulse"></div>
//         <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>

//         <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          
//           {/* Left Content */}
//           <div className="md:w-1/2 space-y-8">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-green-400 hover:bg-white/10 transition cursor-default">
//                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
//                Made for Backpackers
//             </div>
            
//             <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tight">
//               Chase <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Freedom.</span> <br />
//               Not WiFi.
//             </h1>
            
//             <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
//               Stop visiting tourist traps. Start living the stories you'll tell your grandkids. 
//               We curate raw, budget-friendly, and community-driven expeditions for the wild at heart.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
//               <Link to="/tours" className="w-full sm:w-auto">
//                 <button className="w-full group px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] flex items-center justify-center gap-2">
//                   Find Your Trip <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
//                 </button>
//               </Link>
//               <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition flex items-center justify-center gap-2">
//                  <Play size={18} fill="currentColor" /> Watch Showreel
//               </button>
//             </div>
            
//             {/* Social Proof Mini */}
//             <div className="flex items-center gap-4 pt-6">
//                 <div className="flex -space-x-4">
//                     {[1,2,3,4].map(i => (
//                         <img key={i} className="w-10 h-10 rounded-full border-2 border-black object-cover" src={`https://randomuser.me/api/portraits/men/${i+20}.jpg`} alt="User" />
//                     ))}
//                 </div>
//                 <div className="text-sm">
//                     <p className="font-bold text-white">Join 10,000+ Nomads</p>
//                     <div className="flex text-yellow-500 text-xs">★★★★★</div>
//                 </div>
//             </div>
//           </div>

//           {/* Right Visuals (Grid Layout) */}
//          {/* Right Visuals (Single Big Hero Image) */}
//           <div className="md:w-1/2 relative hidden md:block">
//              <div className="relative w-full max-w-lg mx-auto">
                
//                 {/* Background Glow for Depth */}
//                 <div className="absolute -inset-4 bg-green-500/20 rounded-[3rem] blur-2xl opacity-40 animate-pulse"></div>

//                 {/* Main Image Container */}
//                 <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl h-[550px] group">
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                    
//                     <img 
//                       src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop" 
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out" 
//                       alt="Camping under stars" 
//                     />

//                     {/* Floating Badge (Glassmorphism) */}
//                     <div className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
//                        <div className="bg-green-500 p-3 rounded-full text-black">
//                           <MapPin size={24} />
//                        </div>
//                        <div>
//                           <p className="text-3xl font-black text-white leading-none">50+</p>
//                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Secret Spots</p>
//                        </div>
//                     </div>
//                 </div>

//                 {/* Decorative Element */}
//                 <div className="absolute -bottom-6 -right-6 z-0 w-24 h-24 bg-stripes opacity-20"></div>
//              </div>
//           </div>

//         </div>
//       </section>

//       {/* ==================== 2. STATS BANNER ==================== */}
//       <div className="border-y border-white/10 bg-white/5 backdrop-blur-sm">
//           <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//               {[
//                   { label: "Happy Trekkers", value: "12k+" },
//                   { label: "Mountains Scaled", value: "85+" },
//                   { label: "Local Guides", value: "150+" },
//                   { label: "Avg. Savings", value: "30%" },
//               ].map((stat, idx) => (
//                   <div key={idx}>
//                       <h3 className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
//                       <p className="text-gray-500 text-xs uppercase tracking-widest">{stat.label}</p>
//                   </div>
//               ))}
//           </div>
//       </div>

//       {/* ==================== 3. TRENDING DESTINATIONS ==================== */}
//       <section className="py-24 max-w-7xl mx-auto px-6">
//           <div className="flex justify-between items-end mb-12">
//               <div>
//                   <h2 className="text-3xl md:text-5xl font-bold mb-4">Trending <span className="text-green-500">Expeditions</span></h2>
//                   <p className="text-gray-400">Handpicked adventures for this season.</p>
//               </div>
//               <Link to="/tours" className="hidden md:flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition">View All <ArrowRight size={18}/></Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {[
//                   { title: "Spiti Valley Roadtrip", price: "$499", days: "7 Days", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop" },
//                   { title: "Kasol & Kheerganga", price: "$299", days: "4 Days", img: "https://images.unsplash.com/photo-1598555836262-672ce90eb3af?q=80&w=800&auto=format&fit=crop" },
//                   { title: "Meghalaya Backpacking", price: "$599", days: "6 Days", img: "https://images.unsplash.com/photo-1627546877239-1bc98912444b?q=80&w=800&auto=format&fit=crop" },
//               ].map((tour, i) => (
//                   <div key={i} className="group relative rounded-3xl overflow-hidden cursor-pointer">
//                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
//                       <img src={tour.img} alt={tour.title} className="w-full h-96 object-cover group-hover:scale-110 transition duration-700" />
//                       <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
//                           {tour.days}
//                       </div>
//                       <div className="absolute bottom-6 left-6 z-20">
//                           <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">{tour.title}</h3>
//                           <p className="text-gray-300 text-sm">Starting from <span className="text-white font-bold">{tour.price}</span></p>
//                       </div>
//                   </div>
//               ))}
//           </div>
          
//           <Link to="/tours" className="md:hidden mt-8 flex items-center justify-center gap-2 text-green-400 font-bold border border-green-500/30 py-3 rounded-xl">View All Tours <ArrowRight size={18}/></Link>
//       </section>

//       {/* ==================== 4. WHY BACKPACKERS LOVE US ==================== */}
//       <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the <span className="text-green-500">Wild Ones</span></h2>
//             <p className="text-gray-400 text-lg">We stripped away the luxury fluff. No fancy hotels, no boring buses. Just pure, unfiltered adventure.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <FeatureCard 
//                 icon={Users} 
//                 title="Solo-Traveler Friendly" 
//                 desc="80% of our travelers join solo. You'll leave with a family." 
//             />
//             <FeatureCard 
//                 icon={Wallet} 
//                 title="Budget Hacks" 
//                 desc="We know the cheapest eats and hidden hostels. Travel more, spend less." 
//             />
//             <FeatureCard 
//                 icon={MapPin} 
//                 title="No Tourist Traps" 
//                 desc="We take you where the crowds don't go. Secret waterfalls & hidden caves." 
//             />
//             <FeatureCard 
//                 icon={Tent} 
//                 title="Raw Stays" 
//                 desc="Sleep in tents, mud houses, or under the galaxy. Real experiences only." 
//             />
//           </div>
//         </div>
//       </section>

//       {/* ==================== 5. COMMUNITY / VIBE SECTION ==================== */}
//       <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
//           <div className="flex flex-col md:flex-row items-center gap-12">
//               <div className="md:w-1/2">
//                   <h2 className="text-4xl md:text-6xl font-black mb-6">Not a Group.<br/>A <span className="text-green-500">Tribe.</span></h2>
//                   <p className="text-gray-400 text-lg mb-8 leading-relaxed">
//                       Traveling is about connection. Share stories around a bonfire, jam to acoustic guitars, and make friends who vibe with your frequency.
//                   </p>
//                   <ul className="space-y-4 mb-8">
//                       {['Bonfire Nights & Music Jamming', 'Local Cultural Immersion', 'Post-Trip Reunion Parties'].map((item, i) => (
//                           <li key={i} className="flex items-center gap-3 text-gray-300">
//                               <div className="bg-green-500/20 p-1 rounded-full"><Star size={12} className="text-green-500"/></div> {item}
//                           </li>
//                       ))}
//                   </ul>
//                   <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-green-400 transition flex items-center gap-2">
//                       Join the Community
//                   </button>
//               </div>
//               <div className="md:w-1/2 grid grid-cols-2 gap-4">
//                   <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover transform translate-y-8" alt="Tribe 1"/>
//                   <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover" alt="Tribe 2"/>
//               </div>
//           </div>
//       </section>

//       {/* ==================== 6. NEWSLETTER / LEAD MAGNET ==================== */}
//       <section className="py-20 px-6">
//           <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-900/40 to-black border border-green-500/30 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
//               <div className="relative z-10">
//                   <div className="inline-block bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Free Guide</div>
//                   <h2 className="text-3xl md:text-5xl font-bold mb-6">The Ultimate Backpacker's <br/> Packing Checklist</h2>
//                   <p className="text-gray-300 mb-8 max-w-lg mx-auto">Don't overpack. Don't forget the essentials. Get our battle-tested list for free.</p>
                  
//                   <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
//                       <input type="email" placeholder="Enter your email" className="flex-1 bg-black/50 border border-white/20 rounded-full px-6 py-4 text-white focus:outline-none focus:border-green-500" />
//                       <button className="bg-green-500 text-black font-bold px-8 py-4 rounded-full hover:bg-green-400 transition">Send it</button>
//                   </div>
//               </div>
//           </div>
//       </section>

//       {/* ==================== FOOTER SECTION ==================== */}
//       <footer className="bg-black border-t border-white/10 pt-20 pb-10">
//         <div className="max-w-7xl mx-auto px-6">
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
//             {/* Brand */}
//             <div className="md:col-span-1">
//                <div className="flex items-center gap-2 mb-6">
//                   <div className="bg-green-500 p-1.5 rounded">
//                      <Mountain className="text-black" size={20} />
//                   </div>
//                   <span className="text-2xl font-black tracking-widest text-white">NATOURS</span>
//                </div>
//                <p className="text-gray-500 text-sm leading-relaxed">
//                  We are a community of dreamers, explorers, and nature lovers. We bring you closer to the world, one trek at a time.
//                </p>
//             </div>

//             {/* Links 1 */}
//             <div>
//               <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Company</h4>
//               <ul className="space-y-4 text-gray-400 text-sm">
//                 <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition">Our Guides</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition">Sustainable Travel</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition">Careers</a></li>
//               </ul>
//             </div>

//             {/* Links 2 */}
//             <div>
//               <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Support</h4>
//               <ul className="space-y-4 text-gray-400 text-sm">
//                 <li><a href="#" className="hover:text-green-400 transition">Help Center</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition">Safety Info</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition">Cancellation Policy</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition">Contact Us</a></li>
//               </ul>
//             </div>

//             {/* Contact */}
//             <div>
//               <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Get in Touch</h4>
//               <ul className="space-y-4 text-gray-400 text-sm">
//                 <li className="flex items-center gap-3"><MapPin size={16}/> 123 Forest Avenue, New Delhi</li>
//                 <li className="flex items-center gap-3"><Phone size={16}/> +91 98765 43210</li>
//                 <li className="flex items-center gap-3"><Mail size={16}/> hello@natours.com</li>
//                 <div className="flex gap-4 pt-4">
//                    <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Facebook size={18}/></a>
//                    <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Twitter size={18}/></a>
//                    <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Instagram size={18}/></a>
//                 </div>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//              <p className="text-gray-600 text-sm">
//                &copy; 2025 Natours Inc. All rights reserved.
//              </p>
//              <div className="flex gap-6 text-gray-600 text-sm">
//                 <a href="#" className="hover:text-white transition">Privacy Policy</a>
//                 <a href="#" className="hover:text-white transition">Terms</a>
//              </div>
//           </div>

//         </div>
//       </footer>

//     </div>
//   );
// };

// // Helper Component for Features
// const FeatureCard = ({ icon: Icon, title, desc }) => (
//     <div className="bg-[#111] border border-white/10 p-8 rounded-3xl hover:border-green-500/50 hover:bg-white/5 transition duration-300 group">
//         <div className="bg-green-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition">
//             <Icon size={28} />
//         </div>
//         <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
//         <p className="text-gray-400 text-sm leading-relaxed">
//             {desc}
//         </p>
//     </div>
// );

// export default Home;



import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // 👈 Redux Imports
import { getAllTours } from "../features/tours/tourSlice"; // 👈 Your Action
import { 
  Play, ArrowRight, Star, Mountain, Compass, Users, MapPin, 
  Facebook, Twitter, Instagram, Mail, Phone, Tent, Flame, 
  Wallet, Camera, Heart
} from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  // 👇 Redux se data le rahe hain
  const { tours, isLoading } = useSelector((state) => state.tours);

  useEffect(() => {
    // Agar tours pehle se loaded nahi hain, tabhi fetch karo (Optimization)
    if (!tours || tours.length === 0) {
        dispatch(getAllTours());
    }
  }, [dispatch, tours]);

  // 👇 Top 3 Trending Tours nikalna (High Rating First)
  const trendingTours = useMemo(() => {
     if (!tours) return [];
     // Copy lekar sort kar rahe hain taaki original state mutate na ho
     return [...tours]
        .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
        .slice(0, 3);
  }, [tours]);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden selection:bg-green-500 selection:text-black font-sans">
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        
        {/* Animated Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>

        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          
          {/* Left Content */}
          <div className="md:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-green-400 hover:bg-white/10 transition cursor-default">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
               Made for Backpackers
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tight">
              Chase <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Freedom.</span> <br />
              Not WiFi.
            </h1>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Stop visiting tourist traps. Start living the stories you'll tell your grandkids. 
              We curate raw, budget-friendly, and community-driven expeditions for the wild at heart.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link to="/tours" className="w-full sm:w-auto">
                <button className="w-full group px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] flex items-center justify-center gap-2">
                  Find Your Trip <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </button>
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition flex items-center justify-center gap-2">
                 <Play size={18} fill="currentColor" /> Watch Showreel
              </button>
            </div>
            
            {/* Social Proof Mini */}
            <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                        <img key={i} className="w-10 h-10 rounded-full border-2 border-black object-cover" src={`https://randomuser.me/api/portraits/men/${i+20}.jpg`} alt="User" />
                    ))}
                </div>
                <div className="text-sm">
                    <p className="font-bold text-white">Join 10,000+ Nomads</p>
                    <div className="flex text-yellow-500 text-xs">★★★★★</div>
                </div>
            </div>
          </div>

          {/* Right Visuals (Single Big Hero Image) */}
          <div className="md:w-1/2 relative hidden md:block">
             <div className="relative w-full max-w-lg mx-auto">
                
                {/* Background Glow */}
                <div className="absolute -inset-4 bg-green-500/20 rounded-[3rem] blur-2xl opacity-40 animate-pulse"></div>

                {/* Main Image Container */}
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl h-[550px] group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                    
                    <img 
                      src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop" 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out" 
                      alt="Camping under stars" 
                    />

                    {/* Floating Badge */}
                    <div className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
                       <div className="bg-green-500 p-3 rounded-full text-black">
                          <MapPin size={24} />
                       </div>
                       <div>
                          <p className="text-3xl font-black text-white leading-none">50+</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Secret Spots</p>
                       </div>
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 z-0 w-24 h-24 bg-stripes opacity-20"></div>
             </div>
          </div>

        </div>
      </section>

      {/* ==================== 2. STATS BANNER ==================== */}
      <div className="border-y border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                  { label: "Happy Trekkers", value: "12k+" },
                  { label: "Mountains Scaled", value: "85+" },
                  { label: "Local Guides", value: "150+" },
                  { label: "Avg. Savings", value: "30%" },
              ].map((stat, idx) => (
                  <div key={idx}>
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
                      <p className="text-gray-500 text-xs uppercase tracking-widest">{stat.label}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* ==================== 3. TRENDING DESTINATIONS (REDUX DATA) ==================== */}
      <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
              <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Trending <span className="text-green-500">Expeditions</span></h2>
                  <p className="text-gray-400">Handpicked, top-rated adventures for this season.</p>
              </div>
              <Link to="/tours" className="hidden md:flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition">View All <ArrowRight size={18}/></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {isLoading || trendingTours.length === 0 ? (
                // SKELETON LOADING (While Redux is fetching)
                [1,2,3].map(i => (
                  <div key={i} className="h-96 rounded-3xl bg-white/5 animate-pulse border border-white/10"></div>
                ))
              ) : (
                // REAL REDUX DATA
                trendingTours.map((tour) => (
                  <Link to={`/tour/${tour.slug}`} key={tour._id || tour.id} className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 block h-96">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                      
                      <img 
                        src={`http://localhost:5000/img/tours/${tour.imageCover}`} 
                        alt={tour.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=800&auto=format&fit=crop" }} 
                      />
                      
                      <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                          {tour.duration} Days
                      </div>

                      <div className="absolute bottom-6 left-6 z-20">
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">{tour.name}</h3>
                          <div className="flex items-center gap-2">
                             <p className="text-gray-300 text-sm">Starting from <span className="text-white font-bold">${tour.price}</span></p>
                             <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                <Star size={12} fill="currentColor"/> {tour.ratingsAverage}
                             </div>
                          </div>
                      </div>
                  </Link>
                ))
              )}
          </div>
          
          <Link to="/tours" className="md:hidden mt-8 flex items-center justify-center gap-2 text-green-400 font-bold border border-green-500/30 py-3 rounded-xl">View All Tours <ArrowRight size={18}/></Link>
      </section>

      {/* ==================== 4. WHY BACKPACKERS LOVE US ==================== */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the <span className="text-green-500">Wild Ones</span></h2>
            <p className="text-gray-400 text-lg">We stripped away the luxury fluff. No fancy hotels, no boring buses. Just pure, unfiltered adventure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
                icon={Users} 
                title="Solo-Traveler Friendly" 
                desc="80% of our travelers join solo. You'll leave with a family." 
            />
            <FeatureCard 
                icon={Wallet} 
                title="Budget Hacks" 
                desc="We know the cheapest eats and hidden hostels. Travel more, spend less." 
            />
            <FeatureCard 
                icon={MapPin} 
                title="No Tourist Traps" 
                desc="We take you where the crowds don't go. Secret waterfalls & hidden caves." 
            />
            <FeatureCard 
                icon={Tent} 
                title="Raw Stays" 
                desc="Sleep in tents, mud houses, or under the galaxy. Real experiences only." 
            />
          </div>
        </div>
      </section>

      {/* ==================== 5. COMMUNITY / VIBE SECTION ==================== */}
      <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                  <h2 className="text-4xl md:text-6xl font-black mb-6">Not a Group.<br/>A <span className="text-green-500">Tribe.</span></h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                      Traveling is about connection. Share stories around a bonfire, jam to acoustic guitars, and make friends who vibe with your frequency.
                  </p>
                  <ul className="space-y-4 mb-8">
                      <li className="flex items-center gap-3 text-gray-300">
                          <div className="bg-green-500/20 p-1 rounded-full"><Flame size={16} className="text-green-500"/></div> Bonfire Nights & Music Jamming
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                          <div className="bg-green-500/20 p-1 rounded-full"><Star size={16} className="text-green-500"/></div> Local Cultural Immersion
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                          <div className="bg-green-500/20 p-1 rounded-full"><Heart size={16} className="text-green-500"/></div> Post-Trip Reunion Parties
                      </li>
                  </ul>
                  <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-green-400 transition flex items-center gap-2">
                      Join the Community
                  </button>
              </div>
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover transform translate-y-8" alt="Tribe 1"/>
                  <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover" alt="Tribe 2"/>
              </div>
          </div>
      </section>

      {/* ==================== 6. NEWSLETTER ==================== */}
      <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-900/40 to-black border border-green-500/30 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              <div className="relative z-10">
                  <div className="inline-block bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Free Guide</div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">The Ultimate Backpacker's <br/> Packing Checklist</h2>
                  <p className="text-gray-300 mb-8 max-w-lg mx-auto">Don't overpack. Don't forget the essentials. Get our battle-tested list for free.</p>
                  
                  <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                      <input type="email" placeholder="Enter your email" className="flex-1 bg-black/50 border border-white/20 rounded-full px-6 py-4 text-white focus:outline-none focus:border-green-500" />
                      <button className="bg-green-500 text-black font-bold px-8 py-4 rounded-full hover:bg-green-400 transition">Send it</button>
                  </div>
              </div>
          </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-black border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
               <div className="flex items-center gap-2 mb-6">
                  <div className="bg-green-500 p-1.5 rounded">
                     <Mountain className="text-black" size={20} />
                  </div>
                  <span className="text-2xl font-black tracking-widest text-white">NATOURS</span>
               </div>
               <p className="text-gray-500 text-sm leading-relaxed">
                 We are a community of dreamers, explorers, and nature lovers. We bring you closer to the world, one trek at a time.
               </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Company</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Support</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Get in Touch</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-center gap-3"><MapPin size={16}/> New Delhi, India</li>
                <li className="flex items-center gap-3"><Mail size={16}/> hello@natours.com</li>
                <div className="flex gap-4 pt-4">
                   <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Facebook size={18}/></a>
                   <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Instagram size={18}/></a>
                </div>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-gray-600 text-sm">&copy; 2025 Natours Inc.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

// Helper Component for Features
const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className="bg-[#111] border border-white/10 p-8 rounded-3xl hover:border-green-500/50 hover:bg-white/5 transition duration-300 group">
        <div className="bg-green-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition">
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
            {desc}
        </p>
    </div>
);

export default Home;