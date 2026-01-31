// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../features/authentication/authSlice'; 
// import { LogOut, Map, Settings } from "lucide-react";
// import { useState } from "react";

// const Navbar = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogout = () => {
//     dispatch(logoutUser()).then(() => {
//       navigate('/'); 
//       window.location.reload(); 
//     });
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 bg-black/30 backdrop-blur-md border-b border-white/10">
      
//       {/* LOGO */}
//       <Link to="/" className="flex items-center gap-2 group">
//         <div className="bg-white/10 p-2 rounded-lg group-hover:bg-green-500/20 transition">
//            <Map className="text-white group-hover:text-green-400" size={24} />
//         </div>
//         <span className="text-2xl font-black tracking-widest text-white">
//           NATOURS
//         </span>
//       </Link>

//       {/* SEARCH BAR */}
//       <div className="hidden md:flex items-center bg-white/10 px-4 py-2 rounded-full border border-white/5 focus-within:border-green-500/50 transition w-1/3">
//         <input 
//           type="text" 
//           placeholder="Search tours..." 
//           className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full text-sm"
//         />
//       </div>
//       /////// NAV LINKS ///////
      
//       <Link
//       className="flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition-all transform hover:scale-105 ml-4"

//       to="/tours">All Tours</Link>

//         {/* 👇 YE WALA LINK ADD KARO */}
//         <Link 
//           to="/ai-planner" 
//           className="flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition-all transform hover:scale-105 ml-4"
//         >
//           ✨ AI Planner
//         </Link>

//         {/* 👆 YAHAN TAK */}

//       {/* NAVIGATION / USER */}
//       <div className="flex items-center gap-6">
//         {user ? (
//           <div 
//             className="relative h-full flex items-center py-2" // Py-2 added to increase hit area slightly
//             onMouseEnter={() => setShowDropdown(true)}
//             onMouseLeave={() => setShowDropdown(false)}
//           >
//             <button className="flex items-center gap-3 focus:outline-none">
//               <span className="text-white font-medium hidden md:block">{user.name.split(' ')[0]}</span>
//               <img
//                 src={`http://localhost:5000/img/users/${user.photo}`}
//                 alt="User"
//                 className="h-10 w-10 rounded-full border-2 border-green-500 object-cover"
//                 onError={(e) => { e.target.src = "http://localhost:5000/img/users/default.jpg" }}
//               />
//             </button>

//             {/* DROPDOWN MENU */}
//             {showDropdown && (
//               // 👇 FIX: 'mt-2' hata diya aur 'pt-4' (padding top) lagaya.
//               // Ye padding "Invisible Bridge" ka kaam karegi button aur menu ke beech.
//               <div className="absolute right-0 top-full w-56 pt-4 animate-fade-in-down z-50">
                 
//                  {/* Asli Card ab iske andar hai */}
//                  <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl overflow-hidden py-2">
//                     <Link to="/me" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition">
//                        <Settings size={18} /> My Account
//                     </Link>
//                     <Link to="/me" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition">
//                        <Map size={18} /> My Bookings
//                     </Link>
//                     <div className="border-t border-gray-700 my-1"></div>
//                     <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition">
//                        <LogOut size={18} /> Logout
//                     </button>
//                  </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="flex items-center gap-4">
//             <Link to="/login" className="text-white font-medium hover:text-green-400 transition">Log in</Link>
//             <Link to="/signup" className="bg-white text-black px-5 py-2.5 rounded-full font-bold hover:bg-green-400 hover:text-black transition shadow-[0_0_15px_rgba(255,255,255,0.3)]">
//               Sign up
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authentication/authSlice'; 
import { LogOut, Map, Settings, Menu, X, Search, Sparkles } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Desktop Dropdown & Mobile Menu States
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/'); 
      window.location.reload(); 
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      
        {/* 1. LOGO SECTION */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-lg shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
             <Map className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:to-green-400 transition-all">
            NATOURS
          </span>
        </Link>

        {/* 2. DESKTOP NAV LINKS (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
           <Link to="/tours" className="text-sm font-bold text-gray-300 hover:text-green-400 transition uppercase tracking-wider">
             All Tours
           </Link>
           <Link to="/ai-planner" className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-green-400 transition uppercase tracking-wider group">
             <Sparkles size={16} className="text-yellow-400 group-hover:rotate-12 transition-transform"/> AI Planner
           </Link>
        </div>

        {/* 3. SEARCH & PROFILE SECTION */}
        <div className="flex items-center gap-4">
          
          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10 focus-within:border-green-500/50 focus-within:bg-black transition w-64">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search tours..." 
              className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-full text-sm"
            />
          </div>

          {/* User Auth Section */}
          {user ? (
            <div 
              className="relative h-full flex items-center py-2"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center gap-3 focus:outline-none group">
                <span className="text-white font-medium hidden md:block group-hover:text-green-400 transition">{user.name.split(' ')[0]}</span>
                <img
                  src={`http://localhost:5000/img/users/${user.photo}`}
                  alt="User"
                  className="h-10 w-10 rounded-full border-2 border-white/20 group-hover:border-green-500 object-cover transition"
                  onError={(e) => { e.target.src = "http://localhost:5000/img/users/default.jpg" }}
                />
              </button>

              {/* DROPDOWN MENU */}
              {showDropdown && (
                <div className="absolute right-0 top-full w-56 pt-2 animate-fade-in-down">
                   <div className="bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 backdrop-blur-xl">
                      <Link to="/me" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-green-400 transition">
                         <Settings size={18} /> My Account
                      </Link>
                      <Link to="/me" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-green-400 transition">
                         <Map size={18} /> My Bookings
                      </Link>
                      <div className="border-t border-white/10 my-1"></div>
                      <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition">
                         <LogOut size={18} /> Logout
                      </button>
                   </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-white font-bold hover:text-green-400 transition">Log in</Link>
              <Link to="/signup" className="bg-white text-black px-5 py-2.5 rounded-full font-bold hover:bg-green-500 hover:text-white transition shadow-lg hover:shadow-green-500/30">
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden text-white hover:text-green-400 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE MENU (Slide Down) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 absolute w-full left-0 top-full px-6 py-8 flex flex-col gap-6 shadow-2xl animate-fade-in">
           {/* Mobile Search */}
           <div className="flex items-center bg-white/10 px-4 py-3 rounded-xl border border-white/5">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search tours..." className="bg-transparent border-none outline-none text-white w-full" />
           </div>

           {/* Mobile Links */}
           <Link to="/tours" className="text-lg font-bold text-white hover:text-green-400" onClick={() => setIsMobileMenuOpen(false)}>
             All Tours
           </Link>
           <Link to="/ai-planner" className="text-lg font-bold text-white hover:text-green-400 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
             <Sparkles size={18} className="text-yellow-400"/> AI Planner
           </Link>

           {!user && (
             <div className="flex flex-col gap-4 mt-4 border-t border-white/10 pt-6">
                <Link to="/login" className="text-center text-white font-bold py-3 border border-white/20 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                <Link to="/signup" className="text-center bg-green-500 text-black font-bold py-3 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
             </div>
           )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;