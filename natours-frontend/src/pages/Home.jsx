import { Link } from "react-router-dom";
import { 
  Play, ArrowRight, ShieldCheck, Zap, Star, 
  Mountain, Compass, Users, MapPin, 
  Facebook, Twitter, Instagram, Mail, Phone 
} from "lucide-react";

const Home = () => {
  return (
    <div className="bg-black min-h-screen text-white overflow-hidden selection:bg-green-500 selection:text-black">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        
        {/* Glow Effects */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-green-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          
          {/* Left Text */}
          <div className="md:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-green-400 hover:bg-white/10 transition cursor-default">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Trusted by 10,000+ Trekkers
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              We Don't Do Tours. <br />
              We Curate <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Expeditions.</span>
            </h1>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Forget crowded buses and tourist traps. Natours specializes in high-altitude trekking and off-beat adventures for those who seek the extraordinary.
            </p>

            <div className="flex items-center gap-4">
              <button className="group px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] flex items-center gap-2">
              <Link to="/tours"> Start Exploring </Link> <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition flex items-center gap-2">
                 <Play size={18} fill="currentColor" /> Our Story
              </button>
            </div>
          </div>

          {/* Right Visuals */}
          <div className="md:w-1/2 relative hidden md:block">
             <div className="relative z-20 bg-gray-900/50 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500 hover:scale-[1.02]">
                <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop" alt="Hero" className="rounded-2xl w-full h-80 object-cover" />
                <div className="mt-4 flex justify-between items-center">
                   <div>
                      <h3 className="font-bold text-lg text-white">The Himalayan Hiker</h3>
                      <p className="text-xs text-gray-400">14 Days Expedition</p>
                   </div>
                   <div className="flex text-yellow-500">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* ==================== FEATURES / NICHE SECTION ==================== */}
      <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Not Just Another <span className="text-green-500">Travel Agency</span>
            </h2>
            <p className="text-gray-400 text-lg">
              We focus on what matters: Raw nature, small groups, and expert guidance. 
              We are niche, we are specific, and we are obsessed with quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition duration-300 group">
              <div className="bg-green-500/20 w-14 h-14 rounded-xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition">
                <Mountain size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pure Trekking Focus</h3>
              <p className="text-gray-400 leading-relaxed">
                We don't do city tours. Our expertise lies in the mountains. From the Alps to the Himalayas, we know every trail, every peak, and every challenge.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition duration-300 group">
              <div className="bg-blue-500/20 w-14 h-14 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition">
                <Compass size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Off The Beaten Path</h3>
              <p className="text-gray-400 leading-relaxed">
                We hate tourist traps as much as you do. Our itineraries are hand-crafted to take you to hidden gems where the crowds can't follow.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition duration-300 group">
              <div className="bg-purple-500/20 w-14 h-14 rounded-xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Small Group Dynamics</h3>
              <p className="text-gray-400 leading-relaxed">
                Adventure is best shared, but not with a crowd. We cap our groups at 10 people to ensure personalized attention and camaraderie.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== FOOTER SECTION ==================== */}
      <footer className="bg-black border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
               <div className="flex items-center gap-2 mb-6">
                  <div className="bg-green-500 p-1.5 rounded">
                     <Mountain className="text-black" size={20} />
                  </div>
                  <span className="text-2xl font-black tracking-widest text-white">NATOURS</span>
               </div>
               <p className="text-gray-500 text-sm leading-relaxed">
                 Redefining adventure travel since 2025. We bring you closer to nature with sustainable and thrilling expeditions.
               </p>
            </div>

            {/* Links 1 */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Company</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">About Natours</a></li>
                <li><a href="#" className="hover:text-green-400 transition">For Business</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Travel Guides</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Careers</a></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Support</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Safety Information</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Cancellation Options</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Contact</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-center gap-3"><MapPin size={16}/> 123 Forest Avenue, New Delhi</li>
                <li className="flex items-center gap-3"><Phone size={16}/> +91 98765 43210</li>
                <li className="flex items-center gap-3"><Mail size={16}/> hello@natours.com</li>
                <div className="flex gap-4 pt-4">
                   <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Facebook size={18}/></a>
                   <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Twitter size={18}/></a>
                   <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-green-500 hover:text-black transition"><Instagram size={18}/></a>
                </div>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-gray-600 text-sm">
               &copy; 2025 Natours Inc. All rights reserved. Designed by Adesh Kumar.
             </p>
             <div className="flex gap-6 text-gray-600 text-sm">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
             </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;