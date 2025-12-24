import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authentication/authSlice';
import tourReducer from './features/tours/tourSlice';
import bookingReducer from './features/bookings/bookingSlice'; 
import reviewReducer from './features/reviews/reviewSlice'; 
const store = configureStore({
  reducer: {
    auth: authReducer,
    tours: tourReducer,
    bookings: bookingReducer, 
    reviews: reviewReducer,
  },
});

export default store;