import { Toaster } from 'react-hot-toast';
import { useEffect } from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { loadUser } from "./features/authentication/authSlice"; 

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
import AIChatBot from "./components/AIChatBot"; // ✅ Imported
import AIGuide from "./pages/AIGuide";
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
              primary: '#10B981', 
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444', 
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
          <Route path="/ai-planner" element={<AIGuide />} />  
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

      {/* 👇 YAHAN ADD KIYA HAI AI CHATBOT KO */}
      {/* Ye sabse neeche rahega taaki har page ke upar float kare */}
      <AIChatBot />

    </BrowserRouter>
  );
}

export default App;