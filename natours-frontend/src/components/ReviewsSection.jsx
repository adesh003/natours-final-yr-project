// import toast from 'react-hot-toast';
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getReviews, createReview, resetReviewState } from "../features/reviews/reviewSlice";
// import { Star, User, MessageSquare } from "lucide-react";

// const ReviewsSection = ({ tourId }) => {
//   const dispatch = useDispatch();
//   const { reviews, isLoading, submitSuccess, error } = useSelector((state) => state.reviews);
//   const { user } = useSelector((state) => state.auth);

//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(5);

//   useEffect(() => {
//     dispatch(getReviews(tourId));
//   }, [dispatch, tourId]);



//   useEffect(() => {
//     if (submitSuccess) {
//       toast.success("Review Submitted Successfully! 🌟"); // ✅ Mast message
//       setReviewText("");
//       setRating(5);
//       dispatch(resetReviewState());
//     }
//   }, [submitSuccess, dispatch]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if(!reviewText) return toast.error("Please write a review first! ✍️");

    
    
//     dispatch(createReview({ 
//       tourId, 
//       review: reviewText, 
//       rating,
//       user: user 
//     }));
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 mt-20 mb-20">
//       <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
//         <MessageSquare className="text-green-500" /> Reviews
//       </h2>

//       {/* --- REVIEWS LIST (Horizontal Scroll) --- */}
//       <div className="flex overflow-x-auto gap-6 pb-8 custom-scrollbar mb-12">
//         {reviews?.length > 0 ? (
//           reviews.map((rev) => (
//             <div key={rev._id} className="min-w-[300px] bg-[#111] p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center">
//               <div className="flex items-center gap-4 mb-4">
//                 <img 
//                   src={`http://localhost:5000/img/users/${rev.user?.photo || 'default.jpg'}`} 
//                   alt={rev.user?.name} 
//                   className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
//                   onError={(e) => { e.target.src = "http://localhost:5000/img/users/default.jpg" }}
//                 />
//                 <h4 className="font-bold text-white uppercase text-sm">{rev.user?.name || 'User'}</h4>
//               </div>
//               <p className="text-gray-400 text-sm italic mb-4">"{rev.review}"</p>
//               <div className="flex gap-1 mt-auto">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star 
//                     key={star} 
//                     size={16} 
//                     className={star <= rev.rating ? "text-green-500 fill-green-500" : "text-gray-600"} 
//                   />
//                 ))}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No reviews yet. Be the first to review!</p>
//         )}
//       </div>

//       {/* --- ADD REVIEW FORM (Only if logged in) --- */}
//       {user ? (
//         <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 max-w-2xl mx-auto">
//           <h3 className="text-xl font-bold text-white mb-6">Leave a Review</h3>
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Rating Select */}
//             <div className="flex items-center gap-4">
//                <label className="text-gray-400 text-sm font-bold uppercase">Rating:</label>
//                <div className="flex gap-2">
//                  {[1, 2, 3, 4, 5].map((star) => (
//                    <button 
//                      key={star} 
//                      type="button"
//                      onClick={() => setRating(star)}
//                      className="focus:outline-none transition-transform hover:scale-125"
//                    >
//                      <Star 
//                        size={28} 
//                        className={star <= rating ? "text-green-500 fill-green-500" : "text-gray-600"} 
//                      />
//                    </button>
//                  ))}
//                </div>
//             </div>

//             {/* Review Text */}
//             <textarea
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               placeholder="Share your experience..."
//               className="w-full bg-[#111] border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-green-500 transition min-h-[120px]"
//             />

//             <button 
//               type="submit" 
//               disabled={isLoading}
//               className="w-full bg-green-500 text-black font-bold py-3 rounded-xl hover:bg-green-400 transition"
//             >
//               {isLoading ? "Submitting..." : "Submit Review"}
//             </button>

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//           </form>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">
//            Please <a href="/login" className="text-green-500 font-bold underline">login</a> to write a review.
//         </p>
//       )}

//     </div>
//   );
// };

// export default ReviewsSection;




import { useState, useEffect } from "react";
import { Star, Send, Lock } from "lucide-react"; // Lock icon add kiya
import { useSelector, useDispatch } from "react-redux";
import { getMyBookings } from "../features/bookings/bookingSlice"; // Action import
import api from "../services/api";
import toast from "react-hot-toast";

const ReviewsSection = ({ tourId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // 👇 Bookings state le rahe hain check karne ke liye
  const { bookings } = useSelector((state) => state.bookings);

  // 1. Check karo ki User ne ye Tour Book kiya hai ya nahi
  // (Admin ko hamesha true milega)
  const hasBooked = user && (
    user.role === 'admin' || 
    bookings?.some(booking => booking.tour._id === tourId || booking.tour.id === tourId)
  );

  useEffect(() => {
    // Agar bookings load nahi hain toh fetch kar lo
    if (user && (!bookings || bookings.length === 0)) {
        dispatch(getMyBookings());
    }

    // Fetch Reviews for this tour
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/tours/${tourId}/reviews`);
        setReviews(res.data.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [tourId, user, dispatch, bookings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please give a star rating!");

    try {
      const res = await api.post(`/tours/${tourId}/reviews`, {
        review: reviewText,
        rating
      });
      
      toast.success("Review submitted! 🌟");
      setReviews([res.data.data.data, ...reviews]); // Add new review to list
      setReviewText("");
      setRating(0);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-8 text-white">Traveler Reviews</h3>

      {/* --- REVIEW LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {reviews.map((review) => (
          <div key={review._id} className="bg-[#111] p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={`http://localhost:5000/img/users/${review?.user?.photo}`} 
                onError={(e) => e.target.src = "http://localhost:5000/img/users/default.jpg"}
                alt={review?.user?.name} 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <div>
                <p className="font-bold text-white text-sm">{review?.user?.name}</p>
                <div className="flex text-yellow-500 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < review?.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm italic">"{review?.review}"</p>
          </div>
        ))}
      </div>

      {/* --- CONDITIONALLY RENDER REVIEW FORM --- */}
      {user ? (
        hasBooked ? (
          // ✅ CASE 1: USER BOOKED THE TOUR (SHOW FORM)
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold mb-6 text-white">Leave a Review</h4>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`${star <= rating ? "text-green-500 fill-green-500" : "text-gray-600"} transition`}
                  >
                    <Star size={24} />
                  </button>
                ))}
              </div>
              <textarea
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-white mb-4 focus:border-green-500 outline-none"
                rows="4"
                placeholder="Share your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
              <button className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition flex items-center gap-2">
                Submit Review <Send size={18} />
              </button>
            </form>
          </div>
        ) : (
          // 🔒 CASE 2: LOGGED IN BUT NOT BOOKED
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10 max-w-2xl mx-auto text-center opacity-70">
             <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-gray-500" />
             </div>
             <h4 className="text-xl font-bold text-white mb-2">Review Locked</h4>
             <p className="text-gray-500">
               Only travelers who have booked this tour can leave a review.
             </p>
          </div>
        )
      ) : (
        // 👤 CASE 3: NOT LOGGED IN
        <div className="text-center">
           <p className="text-gray-500">Please <a href="/login" className="text-green-500 underline">log in</a> to leave a review.</p>
        </div>
      )}

    </div>
  );
};

export default ReviewsSection;