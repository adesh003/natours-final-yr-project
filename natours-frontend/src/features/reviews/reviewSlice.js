import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// 1. FETCH REVIEWS (Ek Tour ke liye)
export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async (tourId, { rejectWithValue }) => {
    try {
      // Natours API: GET /tours/:id/reviews
      const response = await api.get(`/tours/${tourId}/reviews`);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

// 2. CREATE REVIEW (Naya Review daalo)
// export const createReview = createAsyncThunk(
//   'reviews/createReview',
//   async ({ tourId, review, rating }, { rejectWithValue }) => {
//     try {
//       // Natours API: POST /tours/:id/reviews
//       const response = await api.post(`/tours/${tourId}/reviews`, { review, rating });
//       return response.data.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to submit review');
//     }
//   }
// );


export const createReview = createAsyncThunk(
  'reviews/createReview',
  // 1. Yahan hum 'user' object bhi receive karenge
  async ({ tourId, review, rating, user }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/tours/${tourId}/reviews`, { review, rating });
      
      // 2. Backend se jo data aaya hai usme 'user' sirf ID hai.
      // Hum usse overwrite karke poora 'user' object (photo ke saath) laga denge.
      const newReviewData = response.data.data.data;
      
      return { ...newReviewData, user: user }; 
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit review');
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    isLoading: false,
    error: null,
    submitSuccess: false, // Review submit hone par true hoga
  },
  reducers: {
    resetReviewState: (state) => {
      state.submitSuccess = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH CASES
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE CASES
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.submitSuccess = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload); // List me naya review add kar do
        state.submitSuccess = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;