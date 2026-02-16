import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"; 
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketPDF from '../components/TicketPDF';
import { 
  User, Settings, Map, CreditCard, Star, LogOut, 
  Camera, Save, Lock, ArrowRight, Clock, MapPin, 
  Download, LayoutDashboard, Quote
} from "lucide-react";
import { logoutUser } from "../features/authentication/authSlice"; 
import { getMyBookings } from "../features/bookings/bookingSlice"; 
import TravelMates from "../components/TravelMates";
import UserBadges from "../components/UserBadges";

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            <div className="bg-[#111] border border-white/10 rounded-3xl p-4 overflow-hidden shadow-xl sticky top-28">
               
               {/* User Mini Profile */}
               <div className="flex flex-col items-center pt-4 pb-6 border-b border-white/10 mb-4">
                  <div className="relative">
                    <img 
                      src={`http://localhost:5000/img/users/${user?.photo}`} 
                      onError={(e) => e.target.src = "http://localhost:5000/img/users/default.jpg"}
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-500 p-1"
                    />
                    {user?.role === 'admin' && (
                      <span className="absolute -bottom-1 -right-1 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-black">
                        Admin
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold mt-2">{user?.name}</h3>
               </div>

               <nav className="space-y-2">
                 
                 {/* ADMIN PANEL BUTTON */}
                 {user?.role === 'admin' && (
                    <button 
                       onClick={() => navigate('/admin')}
                       className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl shadow-lg hover:shadow-green-500/20 hover:scale-[1.02] transition-all duration-300 font-bold mb-4"
                    >
                       <LayoutDashboard size={20} /> Admin Panel
                    </button>
                 )}

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
                   onClick={() => {
                     dispatch(logoutUser());
                     navigate('/login');
                   }}
                   className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition font-medium"
                 >
                   <LogOut size={20} /> Logout
                 </button>
               </div>
            </div>
          </div>
               

          {/* --- RIGHT CONTENT AREA --- */}
          <div className="lg:col-span-3 space-y-8">
              {/* Gamification Badge */}
              <UserBadges points={user.points || 50} />

              {/* Tab Content */}
              <div>
                {activeTab === "settings" && <SettingsTab user={user} />}
                {activeTab === "bookings" && <BookingsTab />} 
                {/* 👇 New Premium Reviews Tab */}
                {activeTab === "reviews" && <ReviewsTab user={user} />}
                {activeTab === "billing" && <BillingTab />}
              </div>
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
        ? "bg-white/10 text-white border border-white/5 shadow-inner" 
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    <Icon size={20} className={active ? "text-green-500" : "text-gray-500"} /> 
    {label}
  </button>
);

// 1. SETTINGS TAB
const SettingsTab = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
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
    toast.success("Password updated! (Simulation)");
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
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
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"/>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"/>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition flex items-center gap-2 shadow-lg">
               <Save size={18} /> Save Settings
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
           <Lock className="text-green-500" size={24} /> Security
        </h2>
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"/>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"/>
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

// 2. BOOKINGS TAB
const BookingsTab = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.auth);

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
               
               <TravelMates tourId={tour._id || tour.id} currentUserId={user._id} />
               
               <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center gap-2">
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Price</span>
                    <span className="font-bold text-white text-lg">${tour.price}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <PDFDownloadLink
                        document={<TicketPDF tour={tour} user={user} />}
                        fileName={`ticket-${tour.slug}.pdf`}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-3 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                        {({ loading }) => (
                            loading ? '...' : <><Download size={16} /> Ticket</>
                        )}
                    </PDFDownloadLink>

                    <Link 
                      to={`/tour/${tour.slug}`} 
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                      View <ArrowRight size={16} />
                    </Link>
                  </div>
               </div>
            </div>
         </div>
       ))}
    </div>
  );
};

// 3. BILLING TAB
const BillingTab = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  if (isLoading) return <div className="text-center py-10">Loading payments...</div>;

  return (
    <div className="bg-[#111] border border-white/10 rounded-3xl p-8 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <CreditCard className="text-green-500" size={24} /> Billing & Invoices
      </h2>

      {(!bookings || bookings.length === 0) ? (
        <p className="text-gray-500">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-white/10 uppercase tracking-wider">
                <th className="py-4 font-bold">Date</th>
                <th className="py-4 font-bold">Tour Description</th>
                <th className="py-4 font-bold">Amount</th>
                <th className="py-4 font-bold">Status</th>
                <th className="py-4 font-bold text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300">
              {bookings.map((tour) => (
                <tr key={tour.id || tour._id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-4">
                    {new Date(Date.now()).toLocaleDateString()}
                  </td>
                  <td className="py-4 font-medium text-white">
                    {tour.name}
                  </td>
                  <td className="py-4 font-bold text-green-400">
                    ₹{tour.price}
                  </td>
                  <td className="py-4">
                    <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-bold uppercase">
                      Paid
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-gray-400 hover:text-white flex items-center gap-1 ml-auto text-xs border border-white/20 px-2 py-1 rounded-lg">
                      <Download size={14} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-8 bg-black/40 p-4 rounded-xl border border-white/5 flex items-center gap-4">
         <div className="bg-white/10 p-2 rounded-lg">
            <CreditCard size={20} className="text-white"/>
         </div>
         <div>
            <p className="text-xs text-gray-400 uppercase font-bold">Payment Method</p>
            <p className="text-sm text-white font-bold">MasterCard ending in •••• 4242</p>
         </div>
         <button className="ml-auto text-xs text-green-500 font-bold hover:underline">Manage Card</button>
      </div>
    </div>
  );
};

// 4. REVIEWS TAB (Premium & Detailed ✨)
const ReviewsTab = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const res = await api.get(`/reviews?user=${user._id}`);
        setReviews(res.data.data.data || []);
      } catch (err) {
        console.error("Error fetching reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyReviews();
  }, [user._id]);

  if (loading) return (
    <div className="text-center py-20">
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  if (reviews.length === 0) return (
    <div className="bg-[#111] border border-white/10 rounded-3xl p-12 text-center animate-fade-in-up">
       <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
         <Star size={32} className="text-gray-500" />
       </div>
       <h2 className="text-2xl font-bold mb-2 text-white">No reviews yet</h2>
       <p className="text-gray-500">Book a tour and share your experience!</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4 px-2">
         <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Star className="text-green-500 fill-green-500" size={28} /> 
            My Reviews 
            <span className="text-sm font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">{reviews.length}</span>
         </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="relative bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-green-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all duration-300 group overflow-hidden">
             
             {/* 🎨 Watermark Icon */}
             <Quote className="absolute top-2 right-6 text-white/[0.03] rotate-180 group-hover:text-white/[0.06] transition-colors" size={120} />

             <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                
                {/* 1. Tour Image */}
                <div className="w-full sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-black border border-white/10 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                   {review.tour ? (
                     <img 
                       src={`http://localhost:5000/img/tours/${review.tour.imageCover}`} 
                       alt={review.tour.name} 
                       className="w-full h-full object-cover"
                       onError={(e) => e.target.src = "https://via.placeholder.com/150/111/333?text=Tour"}
                     />
                   ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-gray-900">
                        <Map size={24} />
                        <span className="text-[10px] mt-1 uppercase font-bold">Deleted</span>
                     </div>
                   )}
                </div>

                {/* 2. Content */}
                <div className="flex-1 flex flex-col">
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                      <div>
                         <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                            {review.tour ? review.tour.name : "Unknown Tour"}
                         </h3>
                         <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                           {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                         </p>
                      </div>
                      
                      {/* Stars */}
                      <div className="flex gap-1 mt-2 sm:mt-0 bg-black/40 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16} 
                            className={`${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-700"} transition-all`} 
                          />
                        ))}
                      </div>
                   </div>

                   {/* Review Text */}
                   <div className="mb-6">
                     <p className="text-gray-300 text-base leading-relaxed italic border-l-4 border-green-500/30 pl-4 py-1">
                       "{review.review}"
                     </p>
                   </div>

                   {/* Footer Link */}
                   {review.tour && (
                     <Link 
                       to={`/tour/${review.tour.slug}`} 
                       className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-green-500 hover:text-green-400 hover:underline transition-all w-fit"
                     >
                       Visit Tour Page <ArrowRight size={16} />
                     </Link>
                   )}
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;