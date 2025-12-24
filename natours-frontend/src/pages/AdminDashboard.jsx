import { useEffect, useState } from 'react';
import api from '../services/api';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, DollarSign, Calendar, Map, TrendingUp, 
  LayoutDashboard, LogOut, Search, Bell, MoreVertical, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Logout redirect ke liye
import { useDispatch } from 'react-redux'; // Logout action ke liye
import { logoutUser } from '../features/authentication/authSlice';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/bookings/admin-stats');
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  if (loading) return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#f8f9fa]">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading Admin Console...</p>
    </div>
  );

  // 🛡️ SAFETY DESTRUCTURING (Default values agar data null ho)
  const { 
    stats = {}, 
    monthlyPlan = [], 
    bestSellers = [], 
    latestBookings = [], 
    newUsers = [] 
  } = data || {};

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'];

  // Helper for "Time Ago"
  const timeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return "Just now";
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] font-sans">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-white hidden md:flex flex-col border-r border-gray-200 fixed h-full z-20">
        <div className="p-8">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 tracking-wider uppercase">
            Natours<span className="text-xs text-gray-400 block font-medium tracking-normal mt-1">Admin Console</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={LayoutDashboard} label="Overview" active />
          <NavItem icon={Users} label="Manage Users" />
          <NavItem icon={Map} label="Manage Tours" />
          <NavItem icon={Calendar} label="Bookings" />
        </nav>

        <div className="p-4 border-t border-gray-100">
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition"
           >
             <LogOut size={18} /> Logout
           </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-8">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 w-1/3">
             <Search className="text-gray-400" />
             <input type="text" placeholder="Search data..." className="bg-transparent outline-none w-full text-gray-600" />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer">
              <Bell className="text-gray-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800">Admin</p>
                <p className="text-xs text-gray-500">Super User</p>
              </div>
              <img src="http://localhost:5000/img/users/default.jpg" alt="Admin" className="w-10 h-10 rounded-full border-2 border-green-500 p-0.5" />
            </div>
          </div>
        </header>

        {/* STATS GRID (Safe Access) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ModernStatCard 
            title="Total Revenue" 
            value={`$${(stats?.revenue || 0).toLocaleString()}`} 
            icon={DollarSign} 
            trend="+12.5%" 
            color="text-green-600" 
            bg="bg-green-50" 
          />
          <ModernStatCard 
            title="Total Bookings" 
            value={stats?.bookings || 0} 
            icon={Calendar} 
            trend="+4.3%" 
            color="text-blue-600" 
            bg="bg-blue-50" 
          />
          <ModernStatCard 
            title="Active Users" 
            value={stats?.users || 0} 
            icon={Users} 
            trend="+8.1%" 
            color="text-purple-600" 
            bg="bg-purple-50" 
          />
          <ModernStatCard 
            title="Total Tours" 
            value={stats?.tours || 0} 
            icon={Map} 
            trend="Stable" 
            color="text-orange-600" 
            bg="bg-orange-50" 
          />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* REVENUE CHART */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-800 text-lg">Revenue Analytics</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyPlan || []}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* POPULAR TOURS */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="font-bold text-gray-800 text-lg mb-2">Popular Tours</h3>
            <p className="text-xs text-gray-400 mb-4">Top packages by sales</p>
            
            <div className="h-56 relative flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={bestSellers || []} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="numBookings">
                    {(bestSellers || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 <span className="text-2xl font-bold text-gray-800">{stats?.bookings || 0}</span>
                 <p className="text-[10px] text-gray-400 uppercase">Total</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto mt-2 pr-1 space-y-3 custom-scrollbar">
              {(bestSellers || []).map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-gray-600 font-medium truncate w-32">{entry.name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{entry.numBookings} Sold</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- DYNAMIC TABLES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* RECENT BOOKINGS (Safe Map) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-6">Recent Bookings</h3>
            <div className="overflow-x-auto">
              {(!latestBookings || latestBookings.length === 0) ? (
                <p className="text-gray-500 text-center py-4">No recent bookings found.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
                      <th className="pb-3">Tour Name</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {latestBookings.map((booking) => (
                      <tr key={booking?._id || Math.random()} className="group hover:bg-gray-50 transition-colors">
                        
                        {/* Tour Name Safety */}
                        <td className="py-4 font-medium text-gray-800">
                          {booking?.tour?.name || <span className="text-red-400 text-xs italic">Deleted Tour</span>}
                        </td>
                        
                        {/* User Safety */}
                        <td className="py-4 text-gray-600 flex items-center gap-2">
                           <img 
                            src={`http://localhost:5000/img/users/${booking?.user?.photo || 'default.jpg'}`} 
                            onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}}
                            className="w-6 h-6 rounded-full object-cover" 
                           />
                           {booking?.user?.name || <span className="text-gray-400 italic">Deleted User</span>}
                        </td>
                        
                        <td className="py-4 text-gray-500">
                          {booking?.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="py-4 font-bold text-gray-800">${booking?.price || 0}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking?.paid ? 'bg-green-100 text-green-700' : 'bg-green-100 text-green-700'}`}>
                            {booking?.paid ? 'Paid' : 'Confirmed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* NEW USERS (Safe Map) */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-800 text-lg">New Users</h3>
               <MoreVertical size={16} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="space-y-6">
               {(!newUsers || newUsers.length === 0) ? (
                 <p className="text-gray-500">No new users.</p>
               ) : (
                 newUsers.map((user) => (
                   <div key={user?._id || Math.random()} className="flex items-center gap-4">
                      <img 
                        src={`http://localhost:5000/img/users/${user?.photo || 'default.jpg'}`} 
                        onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                      />
                      <div className="flex-1">
                         <h4 className="font-bold text-gray-800 text-sm">{user?.name || 'Unknown'}</h4>
                         <p className="text-xs text-gray-400">{timeAgo(user?.createdAt)}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded border ${user?.role === 'admin' ? 'border-red-200 text-red-500' : 'border-gray-200 text-gray-400'}`}>
                        {user?.role || 'user'}
                      </span>
                   </div>
                 ))
               )}
            </div>
            <button className="w-full mt-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
              View All Users
            </button>
          </div>

        </div>

        <div className="text-center text-gray-400 text-xs mt-12 pb-4">
          <p>&copy; 2025 Natours Admin Panel.</p>
        </div>

      </main>
    </div>
  );
};

// COMPONENTS
const NavItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
    active ? 'bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg shadow-green-200' : 'text-gray-500 hover:bg-gray-50 hover:text-green-600'
  }`}>
    <Icon size={20} className={active ? 'text-white' : 'text-gray-400 group-hover:text-green-600'} />
    <span className={`font-medium ${active ? '' : 'group-hover:translate-x-1 transition-transform'}`}>{label}</span>
  </div>
);

const ModernStatCard = ({ title, value, icon: Icon, trend, color, bg }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${bg} ${color}`}><Icon size={24} /></div>
      <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full"><TrendingUp size={12} /> {trend}</span>
    </div>
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-black text-gray-800 tracking-tight">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;