import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import api from "../../services/api";
import { Trash2, Search, Mail, Shield, User } from "lucide-react";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Jonas API endpoint usually /users for admin
        const res = await api.get("/users");
        setUsers(res.data.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete User Handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User removed successfully");
    } catch (err) {
      toast.error("Error deleting user");
    }
  };

  // Filter Users based on Search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white flex">
      <Sidebar />

      <div className="flex-1 md:ml-72 p-8 md:p-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Manage Users
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Total Members: <span className="text-green-400 font-bold">{users.length}</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-full py-3 pl-12 pr-6 text-white outline-none focus:border-green-500 transition-all"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-gray-500 animate-pulse">Loading Users...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="p-6">User</th>
                    <th className="p-6">Role</th>
                    <th className="p-6">Email</th>
                    <th className="p-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-white/5 transition-colors duration-200">
                      
                      {/* User Info */}
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={`http://localhost:5000/img/users/${user.photo}`}
                            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                          <span className="font-bold text-gray-200">{user.name}</span>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="p-6">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${
                            user.role === "admin"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : user.role === "guide" || user.role === "lead-guide"
                              ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {user.role === "admin" && <Shield size={10} />}
                          {user.role}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="p-6 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                           <Mail size={14} /> {user.email}
                        </div>
                      </td>

                      {/* Delete Action */}
                      <td className="p-6 text-right">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Empty State */}
              {filteredUsers.length === 0 && (
                 <div className="p-12 text-center text-gray-500">
                    <User size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No users found matching "{searchTerm}"</p>
                 </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;