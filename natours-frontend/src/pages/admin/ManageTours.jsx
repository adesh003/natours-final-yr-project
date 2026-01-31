import { useEffect, useState } from "react";
// 👇 Yahan dhyaan dena: file ka naam 'Sidebar' hai
import Sidebar from "../../components/admin/Sidebar"; 
import api from "../../services/api";
import { Edit, Trash2, Plus, Star } from "lucide-react";
import toast from "react-hot-toast";

const ManageTours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await api.get("/tours");
      // Optional chaining added
      setTours(res?.data?.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch tours");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await api.delete(`/tours/${id}`);
      setTours(tours.filter(tour => tour?._id !== id)); 
      toast.success("Tour deleted successfully");
    } catch (err) {
      toast.error("Failed to delete tour");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex">
      {/* Sidebar */}
      <Sidebar />      
      <div className="flex-1 md:ml-72 p-8 md:p-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-black">Manage Tours</h1>
            <button className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition">
                <Plus size={20} /> Create New Tour
            </button>
        </div>

        <div className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold">
                    <tr>
                        <th className="p-6">Tour Name</th>
                        <th className="p-6">Price</th>
                        <th className="p-6">Difficulty</th>
                        <th className="p-6">Rating</th>
                        <th className="p-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {tours.map((tour) => (
                        <tr key={tour?._id} className="hover:bg-white/5 transition">
                            <td className="p-6 flex items-center gap-4">
                                <img 
                                  // Optional chaining added
                                  src={`http://localhost:5000/img/tours/${tour?.imageCover}`} 
                                  onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                                  className="w-12 h-12 rounded-lg object-cover" 
                                  alt="" 
                                />
                                <span className="font-bold">{tour?.name}</span>
                            </td>
                            <td className="p-6">${tour?.price}</td>
                            <td className="p-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                    tour?.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                    tour?.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                }`}>
                                    {tour?.difficulty}
                                </span>
                            </td>
                            <td className="p-6 flex items-center gap-1">
                                <Star size={14} className="text-yellow-400 fill-yellow-400" /> {tour?.ratingsAverage}
                            </td>
                            <td className="p-6 text-right space-x-2">
                                <button className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition">
                                    <Edit size={18} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(tour?._id)}
                                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTours;