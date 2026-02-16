import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// 1. GET ALL TOURS
export const getAllTours = createAsyncThunk(
  'tours/getAllTours',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/tours');
      // Jonas API structure: response.data.data.data (Array of tours)
      return response.data.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// 2. GET SINGLE TOUR (Smart Logic: Filter + Fallback)
export const getTour = createAsyncThunk(
  'tours/getTour',
  async (slug, { rejectWithValue }) => {
    try {
      console.log(`🔍 Searching for tour with slug: ${slug}`);

      // STEP 1: Try Direct Backend Filtering
      // Backend should ideally support ?slug=tour-name
      const response = await api.get(`/tours?slug=${slug}`);
      const data = response.data.data.data;

      // Check if data was found immediately
      if (Array.isArray(data) && data.length > 0) {
         console.log("✅ Tour found via API filter:", data[0].name);
         return data[0]; 
      }

      console.warn("⚠️ API filter returned empty. Trying fallback...");

      // STEP 2: Fallback Mechanism
      // If direct filtering fails, fetch ALL tours and find the specific one client-side
      const allToursResponse = await api.get('/tours');
      const allTours = allToursResponse.data.data.data;
      
      const foundTour = allTours.find(tour => tour.slug === slug);

      if (foundTour) {
        console.log("✅ Tour found via Fallback:", foundTour.name);
        return foundTour;
      }

      // If still not found, throw error
      throw new Error('Tour not found with this name');

    } catch (error) {
      console.error("❌ Error in getTour:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const tourSlice = createSlice({
  name: 'tours',
  initialState: {
    tours: [],
    tour: null, 
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // --- Get All Tours Cases ---
    builder
      .addCase(getAllTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tours = action.payload;
      })
      .addCase(getAllTours.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    // --- Get Single Tour Cases ---
      .addCase(getTour.pending, (state) => {
        state.isLoading = true;
        state.tour = null; // Clear previous tour data to prevent flickering
        state.error = null;
      })
      .addCase(getTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tour = action.payload;
      })
      .addCase(getTour.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default tourSlice.reducer;