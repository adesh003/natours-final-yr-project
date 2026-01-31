// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { LayoutDashboard, Map, Users, Calendar, LogOut, Mountain } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../../features/authentication/authSlice";

// const Sidebar = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Check if the current path matches the link
//   const isActive = (path) => location.pathname === path;

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate('/login');
//   };

//   return (
//     <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-[#111] border-r border-white/10 flex flex-col hidden md:flex">
//        {/* Logo Section */}
//        <div className="p-8">
//           <Link to="/" className="flex items-center gap-2">
//             <h1 className="text-3xl font-black text-white tracking-tighter cursor-pointer">
//               NATOURS<span className="text-green-500">.</span>
//             </h1>
//           </Link>
//           <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mt-1">Super Admin</p>
//        </div>

//        {/* Navigation Links */}
//        <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
//           <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4">Overview</p>
          
//           <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" active={isActive("/admin")} />
//           <NavItem to="/admin/bookings" icon={Calendar} label="Bookings" active={isActive("/admin/bookings")} />
          
//           <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-8">Management</p>
//           <NavItem to="/admin/tours" icon={Map} label="Manage Tours" active={isActive("/admin/tours")} />
//           <NavItem to="/admin/users" icon={Users} label="Manage Users" active={isActive("/admin/users")} />
//        </nav>

//        {/* Logout Button */}
//        <div className="p-6 border-t border-white/10">
//           <button 
//              onClick={handleLogout} 
//              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-2xl transition-all duration-300"
//           >
//              <LogOut size={18} /> Sign Out
//           </button>
//        </div>
//     </aside>
//   );
// };

// // Helper Component for cleaner code
// const NavItem = ({ to, icon: Icon, label, active }) => (
//   <Link 
//     to={to} 
//     className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium text-sm ${
//       active 
//         ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
//         : 'text-gray-400 hover:bg-white/5 hover:text-green-400'
//     }`}
//   >
//     <Icon 
//       size={20} 
//       className={`transition-colors duration-300 ${
//         active ? 'text-white' : 'text-gray-500 group-hover:text-green-400'
//       }`} 
//     />
//     <span>{label}</span>
//   </Link>
// );

// export default Sidebar;




import { Link, useLocation, useNavigate } from "react-router-dom";
// 👇 'Star' icon import kiya hai reviews ke liye
import { LayoutDashboard, Map, Users, Calendar, LogOut, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/authentication/authSlice";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-[#111] border-r border-white/10 flex flex-col hidden md:flex">
       {/* Logo */}
       <div className="p-8">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-white tracking-tighter cursor-pointer">
              NATOURS<span className="text-green-500">.</span>
            </h1>
          </Link>
          <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mt-1">Super Admin</p>
       </div>

       {/* Nav Links */}
       <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4">Overview</p>
          
          <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" active={isActive("/admin")} />
          <NavItem to="/admin/bookings" icon={Calendar} label="Bookings" active={isActive("/admin/bookings")} />
          
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-8">Management</p>
          <NavItem to="/admin/tours" icon={Map} label="Manage Tours" active={isActive("/admin/tours")} />
          <NavItem to="/admin/users" icon={Users} label="Manage Users" active={isActive("/admin/users")} />
          
          {/* 👇 YE WALI LINE MISSING THI */}
          <NavItem to="/admin/reviews" icon={Star} label="Manage Reviews" active={isActive("/admin/reviews")} />
       </nav>

       {/* Logout */}
       <div className="p-6 border-t border-white/10">
          <button 
             onClick={handleLogout} 
             className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-2xl transition-all duration-300"
          >
             <LogOut size={18} /> Sign Out
          </button>
       </div>
    </aside>
  );
};

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium text-sm ${
      active 
        ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
        : 'text-gray-400 hover:bg-white/5 hover:text-green-400'
    }`}
  >
    <Icon 
      size={20} 
      className={`transition-colors duration-300 ${
        active ? 'text-white' : 'text-gray-500 group-hover:text-green-400'
      }`} 
    />
    <span>{label}</span>
  </Link>
);

export default Sidebar;