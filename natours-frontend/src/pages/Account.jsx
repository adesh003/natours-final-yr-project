import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"; 
import api from "../services/api"; 
import { 
  User, Settings, Map, CreditCard, Star, LogOut, 
  Camera, Save, Lock, ArrowRight, Clock, MapPin 
} from "lucide-react";
import { logoutUser } from "../features/authentication/authSlice"; 
import { getMyBookings } from "../features/bookings/bookingSlice"; // ✅ Import Redux Action

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <div className="bg-green-500/20 p-2 rounded-lg text-green-500">
             <User size={28} />
          </div>
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#111] border border-white/10 rounded-3xl p-4 overflow-hidden">
               <nav className="space-y-2">
                 <SidebarItem 
                   icon={Settings} 
                   label="Settings" 
                   active={activeTab === "settings"} 
                   onClick={() => setActiveTab("settings")} 
                 />
                 <SidebarItem 
                   icon={Map} 
                   label="My Bookings" 
                   active={activeTab === "bookings"} 
                   onClick={() => setActiveTab("bookings")} 
                 />
                 <SidebarItem 
                   icon={Star} 
                   label="My Reviews" 
                   active={activeTab === "reviews"} 
                   onClick={() => setActiveTab("reviews")} 
                 />
                 <SidebarItem 
                   icon={CreditCard} 
                   label="Billing" 
                   active={activeTab === "billing"} 
                   onClick={() => setActiveTab("billing")} 
                 />
               </nav>

               <div className="border-t border-white/10 my-4 pt-4">
                 <button 
                   onClick={() => dispatch(logoutUser())}
                   className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition font-medium"
                 >
                   <LogOut size={20} /> Logout
                 </button>
               </div>
            </div>
          </div>

          {/* --- RIGHT CONTENT AREA --- */}
          <div className="lg:col-span-3">
             {activeTab === "settings" && <SettingsTab user={user} />}
             {/* 👇 Ab ye Redux se chalega */}
             {activeTab === "bookings" && <BookingsTab />} 
             {activeTab === "reviews" && <PlaceholderTab title="My Reviews" />}
             {activeTab === "billing" && <PlaceholderTab title="Billing Details" />}
          </div>

        </div>
      </div>
    </div>
  );
};

// --- COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      active 
        ? "bg-green-500 text-black shadow-[0_0_15px_rgba(74,222,128,0.4)]" 
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    <Icon size={20} /> {label}
  </button>
);

// 1. SETTINGS TAB (Profile & Password)
const SettingsTab = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // ✅ UPDATE: Sync state when user data loads (Refresh Fix)
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

const handleUpdateData = async (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully! ✅");
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    alert("Password updated! (Simulation)");
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Account Settings */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Account Settings
        </h2>
        
        <form onSubmit={handleUpdateData} className="space-y-6">
          <div className="flex items-center gap-6 mb-8">
            <img 
              src={`http://localhost:5000/img/users/${user?.photo}`} 
              onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}}
              alt="User" 
              className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
            />
            <div>
               <label htmlFor="photo" className="cursor-pointer flex items-center gap-2 text-green-400 hover:text-green-300 transition text-sm font-bold uppercase tracking-wider">
                 <Camera size={18} /> Upload new photo
               </label>
               <input type="file" id="photo" className="hidden" accept="image/*" />
               <p className="text-xs text-gray-500 mt-1">JPG or PNG. Max 5MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition flex items-center gap-2 shadow-lg">
               <Save size={18} /> Save Settings
            </button>
          </div>
        </form>
      </div>

      {/* Password Change */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
           <Lock className="text-green-500" size={24} /> Security
        </h2>
        
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition shadow-lg">
               Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. BOOKINGS TAB (✅ Updated with REDUX)
const BookingsTab = () => {
  const dispatch = useDispatch();
  // 👇 Redux Store se data nikal rahe hain
  const { bookings, isLoading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  if (isLoading) return (
    <div className="text-center py-20">
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  if (!bookings || bookings.length === 0) return (
    <div className="bg-[#111] border border-white/10 rounded-3xl p-12 text-center animate-fade-in-up">
       <Map size={48} className="mx-auto text-gray-600 mb-4" />
       <h3 className="text-xl font-bold mb-2 text-white">No bookings yet</h3>
       <p className="text-gray-500 mb-6">You haven't booked any adventures yet.</p>
       <Link to="/tours" className="inline-block bg-green-500 text-black px-6 py-3 rounded-full font-bold hover:bg-green-400 transition">
         Find a Tour
       </Link>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
       {bookings.map(tour => (
         <div key={tour._id || tour.id} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/50 transition group flex flex-col h-full">
            
            {/* Image Area */}
            <div className="h-48 overflow-hidden relative">
               <img 
                 src={`http://localhost:5000/img/tours/${tour.imageCover}`} 
                 alt={tour.name} 
                 className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
               />
               <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-green-400 border border-white/10">
                 Booked
               </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
               <h3 className="text-xl font-bold mb-4 text-white line-clamp-1">{tour.name}</h3>
               
               <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1">
                    <Clock size={16} className="text-green-500"/> {tour.duration} Days
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} className="text-green-500"/> {tour.startLocation?.description || 'Location'}
                  </span>
               </div>
               
               {/* Footer (Price & Button) */}
               <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Price</span>
                    <span className="font-bold text-white text-lg">${tour.price}</span>
                  </div>
                  <Link 
                    to={`/tour/${tour.slug}`} 
                    className="flex items-center gap-2 bg-white/10 hover:bg-green-500 hover:text-black text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                  >
                    View Tour <ArrowRight size={16} />
                  </Link>
               </div>
            </div>
         </div>
       ))}
    </div>
  );
};

// 3. PLACEHOLDER TAB
const PlaceholderTab = ({ title }) => (
  <div className="bg-[#111] border border-white/10 rounded-3xl p-12 text-center animate-fade-in-up">
    <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      <Settings size={32} className="text-gray-500" />
    </div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-gray-500">This feature is coming soon to your dashboard.</p>
  </div>
);

export default Account;