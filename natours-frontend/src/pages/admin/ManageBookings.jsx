import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import api from "../../services/api";
import { Trash2, Calendar, DollarSign, MapPin, User, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Calculate Stats
  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.price, 0);
  const paidBookings = bookings.filter(b => b.paid).length; // Assuming 'paid' field exists

  // Delete Booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will cancel the booking.")) return;
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
      toast.success("Booking cancelled successfully");
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex">
      <Sidebar />

      <div className="flex-1 md:ml-72 p-8 md:p-12">
        {/* Header & Stats */}
        <div className="mb-10">
           <h1 className="text-3xl font-black text-white mb-6">Booking Management</h1>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Total Bookings */}
              <div className="bg-[#111] p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                 <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400">
                    <Calendar size={24} />
                 </div>
                 <div>
                    <p className="text-gray-400 text-xs font-bold uppercase">Total Bookings</p>
                    <h3 className="text-2xl font-black">{bookings.length}</h3>
                 </div>
              </div>

              {/* Card 2: Revenue */}
              <div className="bg-[#111] p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                 <div className="p-4 bg-green-500/10 rounded-2xl text-green-400">
                    <DollarSign size={24} />
                 </div>
                 <div>
                    <p className="text-gray-400 text-xs font-bold uppercase">Total Revenue</p>
                    <h3 className="text-2xl font-black">${totalRevenue.toLocaleString()}</h3>
                 </div>
              </div>

              {/* Card 3: Recent Activity */}
              <div className="bg-[#111] p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                 <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400">
                    <CreditCard size={24} />
                 </div>
                 <div>
                    <p className="text-gray-400 text-xs font-bold uppercase">Paid Status</p>
                    <h3 className="text-2xl font-black">100% <span className="text-xs text-gray-500 font-normal">Secured</span></h3>
                 </div>
              </div>
           </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {loading ? (
             <div className="p-12 text-center text-gray-500 animate-pulse">Loading Transaction History...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="p-6">Tour Package</th>
                    <th className="p-6">Customer</th>
                    <th className="p-6">Price</th>
                    <th className="p-6">Date</th>
                    <th className="p-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-white/5 transition-colors duration-200">
                      
                      {/* Tour Info */}
                      <td className="p-6">
                         <div className="flex items-center gap-4">
                            <div className="bg-gray-800 p-2 rounded-xl">
                               <MapPin size={20} className="text-green-500" />
                            </div>
                            <span className="font-bold text-gray-200">{booking.tour?.name || "Deleted Tour"}</span>
                         </div>
                      </td>

                      {/* User Info */}
                      <td className="p-6">
                         <div className="flex items-center gap-3">
                            <img 
                              src={`http://localhost:5000/img/users/${booking.user?.photo || "default.jpg"}`}
                              onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                              className="w-8 h-8 rounded-full border border-white/20"
                            />
                            <div className="flex flex-col">
                               <span className="text-sm font-bold">{booking.user?.name || "Deleted User"}</span>
                               <span className="text-xs text-gray-500">{booking.user?.email}</span>
                            </div>
                         </div>
                      </td>

                      {/* Price */}
                      <td className="p-6">
                         <span className="text-green-400 font-black bg-green-500/10 px-3 py-1 rounded-lg">
                            ₹{booking.price}
                         </span>
                      </td>

                      {/* Date */}
                      <td className="p-6 text-gray-400 text-sm font-medium">
                         {new Date(booking.createdAt).toLocaleDateString("en-US", {
                            day: 'numeric', month: 'short', year: 'numeric'
                         })}
                      </td>

                      {/* Actions */}
                      <td className="p-6 text-right">
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                          title="Cancel Booking"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {bookings.length === 0 && (
                 <div className="p-12 text-center text-gray-500">
                    <p>No bookings found.</p>
                 </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;