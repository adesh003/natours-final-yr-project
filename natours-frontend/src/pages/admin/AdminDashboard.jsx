// import { useEffect, useState } from 'react';
// import api from '../../services/api';
// // 👇 Sidebar import fixed (ensure file is named Sidebar.jsx in src/components/admin/)
// import Sidebar from '../../components/admin/Sidebar'; 
// import { 
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell
// } from 'recharts';
// import { Users, DollarSign, Calendar, Map, TrendingUp } from 'lucide-react';

// const AdminDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get('/bookings/admin-stats');
//         // Optional chaining added to prevent crash if data structure is different
//         setData(res?.data?.data);
//       } catch (err) { console.error(err); } 
//       finally { setLoading(false); }
//     };
//     fetchStats();
//   }, []);

//   if (loading) return <div className="bg-black h-screen text-white flex justify-center items-center">Loading Admin...</div>;

//   // Optional chaining added here as well
//   const stats = data?.stats || {};
//   const monthlyPlan = data?.monthlyPlan || [];
//   const bestSellers = data?.bestSellers || [];
  
//   const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'];

//   return (
//     <div className="flex min-h-screen bg-black font-sans text-gray-100">
      
//       {/* 1. Sidebar */}
//       <Sidebar />

//       {/* 2. Content Area */}
//       <main className="flex-1 md:ml-72 p-8 md:p-12 overflow-y-auto">
//          <h1 className="text-3xl font-black text-white mb-8">Dashboard Overview</h1>

//          {/* STATS CARDS */}
//          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <StatCard title="Total Revenue" value={`$${(stats?.revenue || 0).toLocaleString()}`} icon={DollarSign} trend="+12.5%" color="text-green-400" bg="bg-green-500/10" />
//             <StatCard title="Bookings" value={stats?.bookings || 0} icon={Calendar} trend="+4.3%" color="text-blue-400" bg="bg-blue-500/10" />
//             <StatCard title="Active Users" value={stats?.users || 0} icon={Users} trend="+8.1%" color="text-purple-400" bg="bg-purple-500/10" />
//             <StatCard title="Tours Active" value={stats?.tours || 0} icon={Map} trend="Stable" color="text-orange-400" bg="bg-orange-500/10" />
//          </div>

//          {/* CHARTS SECTION */}
//          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Revenue Chart */}
//             <div className="lg:col-span-2 bg-[#111] p-6 rounded-[2rem] border border-white/10 shadow-lg">
//                 <h3 className="font-bold text-white text-lg mb-6">Revenue Analytics</h3>
//                 <div className="h-80">
//                    <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={monthlyPlan}>
//                          <defs>
//                             <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
//                             </linearGradient>
//                          </defs>
//                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
//                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#666'}} />
//                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#666'}} />
//                          <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
//                          <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
//                       </AreaChart>
//                    </ResponsiveContainer>
//                 </div>
//             </div>

//             {/* Pie Chart */}
//             <div className="bg-[#111] p-6 rounded-[2rem] border border-white/10 shadow-lg flex flex-col">
//                 <h3 className="font-bold text-white text-lg mb-6">Top Sellers</h3>
//                 <div className="flex-1 h-64">
//                    <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                          <Pie data={bestSellers} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="numBookings" stroke="none">
//                             {bestSellers.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
//                          </Pie>
//                          <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
//                       </PieChart>
//                    </ResponsiveContainer>
//                 </div>
//             </div>
//          </div>
//       </main>
//     </div>
//   );
// };

// const StatCard = ({ title, value, icon: Icon, trend, color, bg }) => (
//   <div className="bg-[#111] p-6 rounded-[2rem] border border-white/10 hover:border-green-500/30 transition">
//     <div className="flex justify-between items-start mb-5">
//       <div className={`p-3.5 rounded-2xl ${bg} ${color}`}><Icon size={22} /></div>
//       <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full"><TrendingUp size={10} /> {trend}</span>
//     </div>
//     <div><h3 className="text-3xl font-black text-white">{value}</h3><p className="text-xs text-gray-500 uppercase font-bold">{title}</p></div>
//   </div>
// );

// export default AdminDashboard;


import { useEffect, useState } from 'react';
import api from '../../services/api';
import Sidebar from '../../components/admin/Sidebar'; 
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, DollarSign, Calendar, Map, TrendingUp, ArrowRight, PlusCircle, UserPlus } from 'lucide-react';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/bookings/admin-stats');
        setData(res?.data?.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="bg-black h-screen text-white flex justify-center items-center">Loading Command Center...</div>;

  const stats = data?.stats || {};
  const monthlyPlan = data?.monthlyPlan || [];
  const bestSellers = data?.bestSellers || [];
  
  // Custom Colors
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'];

  // 👇 DUMMY DATA FOR TABLE (Backend se 'latestBookings' mangwa lena)
  const recentBookings = [
    { id: 1, user: "Aarav Sharma", tour: "The Forest Hiker", price: 297, date: "Today, 10:23 AM", status: "Success" },
    { id: 2, user: "Priya Verma", tour: "The Sea Explorer", price: 497, date: "Yesterday, 4:15 PM", status: "Pending" },
    { id: 3, user: "Rohan Das", tour: "The Snow Adventurer", price: 997, date: "24 Dec, 2025", status: "Success" },
    { id: 4, user: "Sneha Gupta", tour: "The City Wanderer", price: 150, date: "23 Dec, 2025", status: "Failed" },
  ];

  return (
    <div className="flex min-h-screen bg-black font-sans text-gray-100">
      
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Content Area */}
      <main className="flex-1 md:ml-72 p-8 md:p-10 overflow-y-auto">
         
         {/* HEADER SECTION */}
         <div className="flex justify-between items-end mb-10">
            <div>
                <h1 className="text-4xl font-black text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your tours today.</p>
            </div>
            <div className="flex gap-3">
                <button className="bg-[#222] hover:bg-[#333] text-white px-4 py-2 rounded-xl text-sm font-bold border border-white/10 flex items-center gap-2 transition">
                    <UserPlus size={16} /> Add User
                </button>
                <button className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition">
                    <PlusCircle size={16} /> Create Tour
                </button>
            </div>
         </div>

         {/* 1. STATS CARDS (Updated Design) */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Revenue" value={`₹
${(stats?.revenue || 0).toLocaleString()}`} icon={DollarSign} trend="+12.5%" color="text-green-400" bg="bg-green-500/10" border="border-green-500/20" />
            <StatCard title="Total Bookings" value={stats?.bookings || 0} icon={Calendar} trend="+4.3%" color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/20" />
            <StatCard title="Active Users" value={stats?.users || 0} icon={Users} trend="+8.1%" color="text-purple-400" bg="bg-purple-500/10" border="border-purple-500/20" />
            <StatCard title="Tours Active" value={stats?.tours || 0} icon={Map} trend="Stable" color="text-orange-400" bg="bg-orange-500/10" border="border-orange-500/20" />
         </div>

         {/* 2. CHARTS SECTION (New Layout) */}
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
            
            {/* LEFT: Monthly Activity (BAR CHART - Looks fuller) */}
            <div className="xl:col-span-2 bg-[#111] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="font-bold text-white text-xl">Monthly Performance</h3>
                        <p className="text-sm text-gray-500">Revenue vs Bookings per month</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1 text-xs text-gray-400"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Revenue</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Bookings</span>
                    </div>
                </div>
                <div className="h-[350px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyPlan} barSize={20}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                         <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} dy={10} />
                         <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                         <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                         <Tooltip 
                            contentStyle={{backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px'}} 
                            cursor={{fill: '#ffffff05'}}
                         />
                         <Legend />
                         <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="#10B981" radius={[4, 4, 0, 0]} />
                         <Bar yAxisId="right" dataKey="numTourStarts" name="Bookings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
            </div>

            {/* RIGHT: Top Sellers (DONUT CHART + LIST) */}
            <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 shadow-2xl flex flex-col">
                <h3 className="font-bold text-white text-xl mb-6">Popular Tours</h3>
                
                {/* Donut Chart */}
                <div className="h-48 w-full mb-6 relative">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie 
                            data={bestSellers} 
                            innerRadius={60} 
                            outerRadius={80} 
                            paddingAngle={5} 
                            dataKey="numBookings" 
                            stroke="none"
                         >
                            {bestSellers.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                         </Pie>
                         <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px'}} />
                      </PieChart>
                   </ResponsiveContainer>
                   {/* Center Text */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <span className="block text-3xl font-black text-white">{bestSellers.reduce((acc, curr) => acc + curr.numBookings, 0)}</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Sold</span>
                        </div>
                   </div>
                </div>

                {/* List of Top 3 */}
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    {bestSellers.slice(0, 4).map((tour, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-200">{tour.name}</h4>
                                    <p className="text-xs text-gray-500">{tour.numBookings} bookings</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
         </div>

         {/* 3. NEW SECTION: RECENT ACTIVITY TABLE (To fill space) */}
         <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white text-xl">Recent Transactions</h3>
                <button className="text-green-500 text-sm font-bold flex items-center gap-1 hover:underline">
                    View All <ArrowRight size={16} />
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-500 text-xs uppercase border-b border-white/10">
                            <th className="py-4 font-bold">Customer</th>
                            <th className="py-4 font-bold">Tour Package</th>
                            <th className="py-4 font-bold">Date</th>
                            <th className="py-4 font-bold">Amount</th>
                            <th className="py-4 font-bold text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-300">
                        {/* Use real data here later */}
                        {recentBookings.map((booking) => (
                            <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                <td className="py-4 font-bold flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs text-white">
                                        {booking.user.charAt(0)}
                                    </div>
                                    {booking.user}
                                </td>
                                <td className="py-4">{booking.tour}</td>
                                <td className="py-4 text-gray-500">{booking.date}</td>
                                <td className="py-4 font-bold text-white">₹{booking.price}</td>
                                <td className="py-4 text-right">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                        booking.status === 'Success' ? 'bg-green-500/10 text-green-500' :
                                        booking.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-red-500/10 text-red-500'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>

      </main>
    </div>
  );
};

// Reusable Card Component
const StatCard = ({ title, value, icon: Icon, trend, color, bg, border }) => (
  <div className={`bg-[#111] p-6 rounded-[2rem] border ${border || 'border-white/10'} hover:scale-[1.02] transition-transform duration-300 shadow-xl`}>
    <div className="flex justify-between items-start mb-5">
      <div className={`p-3.5 rounded-2xl ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
        <TrendingUp size={10} /> {trend}
      </span>
    </div>
    <div>
      <h3 className="text-3xl font-black text-white tracking-tighter">{value}</h3>
      <p className="text-xs text-gray-500 uppercase font-bold mt-1 tracking-wider">{title}</p>
    </div>
  </div>
);

export default AdminDashboard;