import { Toaster } from 'react-hot-toast';
import { useEffect } from "react"; // 👈 useEffect import kiya
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux"; // 👈 useDispatch import kiya
import { loadUser } from "./features/authentication/authSlice"; // 👈 loadUser import kiya

import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllTours from "./pages/AllTours";
import TourDetails from "./pages/TourDetails";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
    <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10B981', // Green
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444', // Red
              secondary: 'white',
            },
          },
        }}
      />
      <Routes>
        
        {/* GROUP 1: WITH NAVBAR */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<AllTours />} />
          <Route path="/tour/:slug" element={<TourDetails />} />
          
          <Route 
            path="/me" 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* GROUP 2: WITHOUT NAVBAR */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment-success" element={<PaymentSuccess/>} />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute restrictTo={['admin']}> 
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;