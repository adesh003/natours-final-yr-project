import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authentication/authSlice'; 
import { LogOut, Map, Settings } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/'); 
      window.location.reload(); 
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 bg-black/30 backdrop-blur-md border-b border-white/10">
      
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-white/10 p-2 rounded-lg group-hover:bg-green-500/20 transition">
           <Map className="text-white group-hover:text-green-400" size={24} />
        </div>
        <span className="text-2xl font-black tracking-widest text-white">
          NATOURS
        </span>
      </Link>

      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center bg-white/10 px-4 py-2 rounded-full border border-white/5 focus-within:border-green-500/50 transition w-1/3">
        <input 
          type="text" 
          placeholder="Search tours..." 
          className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full text-sm"
        />
      </div>

      {/* NAVIGATION / USER */}
      <div className="flex items-center gap-6">
        {user ? (
          <div 
            className="relative h-full flex items-center py-2" // Py-2 added to increase hit area slightly
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-3 focus:outline-none">
              <span className="text-white font-medium hidden md:block">{user.name.split(' ')[0]}</span>
              <img
                src={`http://localhost:5000/img/users/${user.photo}`}
                alt="User"
                className="h-10 w-10 rounded-full border-2 border-green-500 object-cover"
                onError={(e) => { e.target.src = "http://localhost:5000/img/users/default.jpg" }}
              />
            </button>

            {/* DROPDOWN MENU */}
            {showDropdown && (
              // 👇 FIX: 'mt-2' hata diya aur 'pt-4' (padding top) lagaya.
              // Ye padding "Invisible Bridge" ka kaam karegi button aur menu ke beech.
              <div className="absolute right-0 top-full w-56 pt-4 animate-fade-in-down z-50">
                 
                 {/* Asli Card ab iske andar hai */}
                 <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl overflow-hidden py-2">
                    <Link to="/me" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition">
                       <Settings size={18} /> My Account
                    </Link>
                    <Link to="/me" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition">
                       <Map size={18} /> My Bookings
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition">
                       <LogOut size={18} /> Logout
                    </button>
                 </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-white font-medium hover:text-green-400 transition">Log in</Link>
            <Link to="/signup" className="bg-white text-black px-5 py-2.5 rounded-full font-bold hover:bg-green-400 hover:text-black transition shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;