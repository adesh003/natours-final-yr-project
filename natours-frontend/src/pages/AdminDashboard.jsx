import { useEffect, useState } from 'react';
import api from '../services/api';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, DollarSign, Calendar, Map, TrendingUp, 
  LayoutDashboard, LogOut, Search, Bell, MoreVertical, 
  Menu, X, ChevronRight, Filter, User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/authentication/authSlice';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 👈 Tab State for Navigation

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
      <div className="w-16 h-16 border-4 border-white/10 border-t-green-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500 font-medium tracking-wide animate-pulse">Loading Command Center...</p>
    </div>
  );

  const { stats = {}, monthlyPlan = [], bestSellers = [], latestBookings = [], newUsers = [] } = data || {};
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'];

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView stats={stats} monthlyPlan={monthlyPlan} bestSellers={bestSellers} latestBookings={latestBookings} newUsers={newUsers} COLORS={COLORS} />;
      case 'bookings':
        return <BookingsView bookings={latestBookings} />;
      case 'travelers':
        return <TravelersView users={newUsers} />;
      case 'tours':
        return <ToursView tours={bestSellers} COLORS={COLORS} />;
      default:
        return <DashboardView stats={stats} monthlyPlan={monthlyPlan} bestSellers={bestSellers} latestBookings={latestBookings} newUsers={newUsers} COLORS={COLORS} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black font-sans text-gray-100">
      
      {/* 📱 MOBILE SIDEBAR OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* 1. SIDEBAR (Dark Theme) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#111] border-r border-white/10 shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col
      `}>
        {/* Logo */}
        <div className="p-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">
              NATOURS<span className="text-green-500">.</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mt-1">Admin Workspace</p>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-gray-400 hover:text-red-500">
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4">Main Menu</p>
          
          <NavItem 
             icon={LayoutDashboard} label="Dashboard" 
             active={activeTab === 'dashboard'} 
             onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} 
          />
          <NavItem 
             icon={Calendar} label="Bookings" 
             active={activeTab === 'bookings'} 
             onClick={() => { setActiveTab('bookings'); setMobileMenuOpen(false); }} 
          />
          <NavItem 
             icon={Users} label="Travelers" 
             active={activeTab === 'travelers'} 
             onClick={() => { setActiveTab('travelers'); setMobileMenuOpen(false); }} 
          />
          <NavItem 
             icon={Map} label="Tours Packages" 
             active={activeTab === 'tours'} 
             onClick={() => { setActiveTab('tours'); setMobileMenuOpen(false); }} 
          />
          
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-8">System</p>
          <NavItem icon={Bell} label="Notifications" badge="3" />
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
           <button 
             onClick={handleLogout}
             className="group flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-2xl transition-all duration-300"
           >
             <div className="p-2 bg-white/5 rounded-full group-hover:bg-red-500/10 transition-colors">
               <LogOut size={18} />
             </div>
             <span>Sign Out</span>
           </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-black relative">
        
        {/* HEADER */}
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/10 px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-gray-400 bg-white/5 rounded-lg">
                <Menu size={20} />
             </button>
             <div>
                <h2 className="text-xl font-bold text-white">{getGreeting()}, Admin 👋</h2>
                <p className="text-xs text-gray-400">Here is what's happening today.</p>
             </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="hidden md:flex items-center gap-3 bg-[#1a1a1a] px-4 py-2.5 rounded-full border border-white/10 focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
               <Search size={18} className="text-gray-500" />
               <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm text-white w-48 placeholder:text-gray-600" />
            </div>
            
            {/* Profile (Click to go to /me) */}
            <div 
              onClick={() => navigate('/me')} 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
              title="Go to Profile"
            >
               <div className="relative p-2 bg-[#1a1a1a] border border-white/10 rounded-full hover:bg-white/5 transition-all">
                  <Bell size={20} className="text-gray-400" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-black rounded-full"></span>
               </div>

               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 p-[2px]">
                  <img src="http://localhost:5000/img/users/default.jpg" alt="Admin" className="w-full h-full rounded-full border-2 border-black object-cover" />
               </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT AREA */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
          {renderContent()}
        </div>

      </main>
    </div>
  );
};


// ----------------------------------------------------
// 👇 SUB-VIEWS (TABS CONTENT)
// ----------------------------------------------------

const DashboardView = ({ stats, monthlyPlan, bestSellers, latestBookings, newUsers, COLORS }) => (
  <>
    {/* STATS GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Revenue" value={`$${(stats?.revenue || 0).toLocaleString()}`} icon={DollarSign} trend="+12.5%" color="text-green-400" bg="bg-green-500/10" />
      <StatCard title="Bookings" value={stats?.bookings || 0} icon={Calendar} trend="+4.3%" color="text-blue-400" bg="bg-blue-500/10" />
      <StatCard title="Active Users" value={stats?.users || 0} icon={Users} trend="+8.1%" color="text-purple-400" bg="bg-purple-500/10" />
      <StatCard title="Tours Active" value={stats?.tours || 0} icon={Map} trend="Stable" color="text-orange-400" bg="bg-orange-500/10" />
    </div>

    {/* ANALYTICS SECTION */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* AREA CHART */}
      <div className="lg:col-span-2 bg-[#111] p-6 rounded-[2rem] border border-white/10 shadow-lg">
         <div className="flex justify-between items-center mb-8">
            <div><h3 className="font-bold text-white text-lg">Revenue Analytics</h3><p className="text-xs text-gray-400">Income over last 12 months</p></div>
         </div>
         <div className="h-80">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={monthlyPlan || []}>
               <defs>
                 <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
               <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} dy={10} />
               <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} tickFormatter={(value) => `$${value/1000}k`} />
               <Tooltip contentStyle={{backgroundColor: '#000', borderRadius: '12px', border: '1px solid #333', color: '#fff'}} itemStyle={{color: '#fff'}} />
               <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
             </AreaChart>
           </ResponsiveContainer>
         </div>
      </div>

      {/* PIE CHART */}
      <div className="bg-[#111] p-6 rounded-[2rem] border border-white/10 shadow-lg flex flex-col">
        <div className="mb-6"><h3 className="font-bold text-white text-lg">Popular Tours</h3><p className="text-xs text-gray-400">Based on tickets sold</p></div>
        <div className="flex-1 flex flex-col items-center justify-center relative">
           <div className="h-48 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={bestSellers || []} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="numBookings" cornerRadius={4} stroke="none">
                   {(bestSellers || []).map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />))}
                 </Pie>
                 <Tooltip contentStyle={{backgroundColor: '#000', borderRadius: '8px', border: '1px solid #333', color: '#fff'}} itemStyle={{color: '#fff'}} />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-white">{stats?.bookings || 0}</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sold</span>
             </div>
           </div>
        </div>
        <div className="mt-6 space-y-3">
           {(bestSellers || []).slice(0, 3).map((entry, index) => (
             <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                   <span className="text-xs font-bold text-gray-300 truncate w-24">{entry.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-500">{entry.numBookings} sales</span>
             </div>
           ))}
        </div>
      </div>
    </div>

    {/* TABLES */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
       <div className="xl:col-span-2 bg-[#111] p-6 md:p-8 rounded-[2rem] border border-white/10">
          <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-white text-lg">Recent Transactions</h3></div>
          <div className="overflow-x-auto">
             <table className="w-full">
                <thead className="bg-white/5 rounded-lg">
                   <tr className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <th className="p-4 rounded-l-lg">Tour / Customer</th><th className="p-4">Date</th><th className="p-4">Amount</th><th className="p-4 rounded-r-lg">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {(latestBookings || []).map((booking) => (
                     <tr key={booking?._id || Math.random()} className="group hover:bg-white/5 transition-colors cursor-pointer">
                        <td className="p-4">
                           <div className="flex items-center gap-4">
                              <img src={`http://localhost:5000/img/users/${booking?.user?.photo || 'default.jpg'}`} onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}} className="w-10 h-10 rounded-full border-2 border-black" />
                              <div><p className="font-bold text-gray-200 text-sm">{booking?.tour?.name}</p><p className="text-xs text-gray-500">{booking?.user?.name}</p></div>
                           </div>
                        </td>
                        <td className="p-4 text-xs font-medium text-gray-500">{booking?.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="p-4 font-bold text-green-400 text-sm">${booking?.price}</td>
                        <td className="p-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${booking?.paid ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>{booking?.paid ? 'Success' : 'Pending'}</span></td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
       <div className="bg-[#111] p-6 md:p-8 rounded-[2rem] border border-white/10">
          <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-white text-lg">New Joiners</h3></div>
          <div className="space-y-4">
             {(newUsers || []).slice(0, 5).map((user, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition cursor-pointer">
                   <div className="flex items-center gap-3">
                      <img src={`http://localhost:5000/img/users/${user?.photo || 'default.jpg'}`} onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}} className="w-10 h-10 rounded-full border border-white/10" />
                      <div><h4 className="text-sm font-bold text-gray-300">{user?.name}</h4><p className="text-[10px] text-gray-500 uppercase">{user?.role}</p></div>
                   </div>
                   <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">New</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  </>
);

// 👇 OTHER TABS PLACEHOLDERS
const BookingsView = ({ bookings }) => (
  <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 animate-fade-in">
    <h2 className="text-2xl font-bold text-white mb-6">All Bookings Management</h2>
    <div className="grid gap-4">
      {bookings.map(b => (
         <div key={b._id} className="bg-black/40 p-4 rounded-xl flex justify-between items-center border border-white/5">
            <div className="flex gap-4 items-center">
              <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500"><Calendar size={20}/></div>
              <div><h4 className="font-bold text-white">{b.tour?.name}</h4><p className="text-xs text-gray-500">{b.user?.name}</p></div>
            </div>
            <div className="text-right"><p className="font-bold text-green-400">${b.price}</p><p className="text-xs text-gray-500">{new Date(b.createdAt).toLocaleDateString()}</p></div>
         </div>
      ))}
    </div>
  </div>
);

const TravelersView = ({ users }) => (
  <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 animate-fade-in">
    <h2 className="text-2xl font-bold text-white mb-6">User Database</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {users.map(u => (
         <div key={u._id} className="bg-black/40 p-6 rounded-xl border border-white/5 text-center hover:border-green-500/30 transition">
            <img src={`http://localhost:5000/img/users/${u.photo}`} onError={(e)=>{e.target.src="http://localhost:5000/img/users/default.jpg"}} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-green-500" />
            <h3 className="font-bold text-white">{u.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{u.email}</p>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase text-gray-400">{u.role}</span>
         </div>
       ))}
    </div>
  </div>
);

const ToursView = ({ tours, COLORS }) => (
  <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 animate-fade-in">
    <h2 className="text-2xl font-bold text-white mb-6">Tour Packages Performance</h2>
    <div className="space-y-4">
       {tours.map((t, i) => (
         <div key={i} className="flex items-center justify-between bg-black/40 p-5 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black text-gray-600">#{i+1}</span>
              <div><h3 className="font-bold text-white">{t.name}</h3><p className="text-xs text-gray-500">Most Popular Category</p></div>
            </div>
            <div className="text-right">
               <p className="text-xl font-bold text-white">{t.numBookings} <span className="text-sm text-gray-500 font-normal">Bookings</span></p>
               <div className="h-1 w-24 bg-gray-700 rounded-full mt-2 overflow-hidden"><div className="h-full bg-green-500" style={{width: `${(t.numBookings/tours[0].numBookings)*100}%`}}></div></div>
            </div>
         </div>
       ))}
    </div>
  </div>
);

// --- SHARED COMPONENTS ---
const NavItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <div onClick={onClick} className={`relative flex items-center gap-4 px-4 py-3.5 my-1 rounded-xl cursor-pointer transition-all duration-300 font-medium text-sm group ${
    active ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-green-400'
  }`}>
    <Icon size={20} className={active ? 'text-white' : 'text-gray-500 group-hover:text-green-400'} />
    <span>{label}</span>
    {badge && <span className="absolute right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">{badge}</span>}
  </div>
);

const StatCard = ({ title, value, icon: Icon, trend, color, bg }) => (
  <div className="bg-[#111] p-6 rounded-[2rem] border border-white/10 shadow-lg hover:border-green-500/30 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-5">
      <div className={`p-3.5 rounded-2xl ${bg} ${color}`}><Icon size={22} strokeWidth={2.5} /></div>
      <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20"><TrendingUp size={10} /> {trend}</span>
    </div>
    <div><h3 className="text-3xl font-black text-white tracking-tight mb-1">{value}</h3><p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p></div>
  </div>
);

export default AdminDashboard;