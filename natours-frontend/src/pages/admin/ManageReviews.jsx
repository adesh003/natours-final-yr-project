import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import api from "../../services/api";
import { Trash2, Star, MessageSquare, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews");
        setReviews(res.data.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Delete Review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
      toast.success("Review deleted successfully");
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  // Helper to render Stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
      />
    ));
  };

  return (
    <div className="bg-black min-h-screen text-white flex">
      <Sidebar />

      <div className="flex-1 md:ml-72 p-8 md:p-12">
        <div className="flex items-center justify-between mb-8">
           <div>
              <h1 className="text-3xl font-black text-white">Review Moderation</h1>
              <p className="text-gray-400 text-sm mt-1">Manage what people say about tours.</p>
           </div>
           <div className="bg-[#111] border border-white/10 px-4 py-2 rounded-full text-sm font-bold text-gray-300">
              Total Reviews: <span className="text-green-400">{reviews.length}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {loading ? (
             <div className="text-center py-10 animate-pulse text-gray-500">Loading feedback...</div>
          ) : (
            reviews.map((review) => (
              <div 
                key={review._id} 
                className="bg-[#111] p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 hover:border-white/20 transition-all group"
              >
                {/* 1. User Info */}
                <div className="flex items-center gap-4 md:w-1/4 min-w-[200px]">
                  <img
                    src={`http://localhost:5000/img/users/${review.user?.photo || "default.jpg"}`}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-500/30"
                    alt={review.user?.name}
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{review.user?.name || "Unknown User"}</h4>
                    <p className="text-xs text-gray-500">Verified Traveler</p>
                  </div>
                </div>

                {/* 2. Review Content */}
                <div className="flex-1 space-y-2">
                   <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <MapPin size={12} />
                      {review.tour?.name || "Deleted Tour"}
                   </div>
                   <div className="flex gap-1 mb-2">
                      {renderStars(review.rating)}
                   </div>
                   <p className="text-gray-300 text-sm leading-relaxed italic">
                      "{review.review}"
                   </p>
                </div>

                {/* 3. Actions */}
                <div className="flex items-center justify-end md:w-20">
                   <button 
                      onClick={() => handleDelete(review._id)}
                      className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Review"
                   >
                      <Trash2 size={18} />
                   </button>
                </div>
              </div>
            ))
          )}
          
          {!loading && reviews.length === 0 && (
             <div className="text-center py-20 bg-[#111] rounded-3xl border border-white/10">
                <MessageSquare size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-500">No reviews found yet.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;