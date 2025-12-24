import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, createReview, resetReviewState } from "../features/reviews/reviewSlice";
import { Star, User, MessageSquare } from "lucide-react";

const ReviewsSection = ({ tourId }) => {
  const dispatch = useDispatch();
  const { reviews, isLoading, submitSuccess, error } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.auth);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    dispatch(getReviews(tourId));
  }, [dispatch, tourId]);



  useEffect(() => {
    if (submitSuccess) {
      toast.success("Review Submitted Successfully! 🌟"); // ✅ Mast message
      setReviewText("");
      setRating(5);
      dispatch(resetReviewState());
    }
  }, [submitSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!reviewText) return toast.error("Please write a review first! ✍️");

    
    
    dispatch(createReview({ 
      tourId, 
      review: reviewText, 
      rating,
      user: user 
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-20 mb-20">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
        <MessageSquare className="text-green-500" /> Reviews
      </h2>

      {/* --- REVIEWS LIST (Horizontal Scroll) --- */}
      <div className="flex overflow-x-auto gap-6 pb-8 custom-scrollbar mb-12">
        {reviews?.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev._id} className="min-w-[300px] bg-[#111] p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={`http://localhost:5000/img/users/${rev.user?.photo || 'default.jpg'}`} 
                  alt={rev.user?.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                  onError={(e) => { e.target.src = "http://localhost:5000/img/users/default.jpg" }}
                />
                <h4 className="font-bold text-white uppercase text-sm">{rev.user?.name || 'User'}</h4>
              </div>
              <p className="text-gray-400 text-sm italic mb-4">"{rev.review}"</p>
              <div className="flex gap-1 mt-auto">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={16} 
                    className={star <= rev.rating ? "text-green-500 fill-green-500" : "text-gray-600"} 
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* --- ADD REVIEW FORM (Only if logged in) --- */}
      {user ? (
        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6">Leave a Review</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Select */}
            <div className="flex items-center gap-4">
               <label className="text-gray-400 text-sm font-bold uppercase">Rating:</label>
               <div className="flex gap-2">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button 
                     key={star} 
                     type="button"
                     onClick={() => setRating(star)}
                     className="focus:outline-none transition-transform hover:scale-125"
                   >
                     <Star 
                       size={28} 
                       className={star <= rating ? "text-green-500 fill-green-500" : "text-gray-600"} 
                     />
                   </button>
                 ))}
               </div>
            </div>

            {/* Review Text */}
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..."
              className="w-full bg-[#111] border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-green-500 transition min-h-[120px]"
            />

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-500 text-black font-bold py-3 rounded-xl hover:bg-green-400 transition"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>
        </div>
      ) : (
        <p className="text-center text-gray-500">
           Please <a href="/login" className="text-green-500 font-bold underline">login</a> to write a review.
        </p>
      )}

    </div>
  );
};

export default ReviewsSection;