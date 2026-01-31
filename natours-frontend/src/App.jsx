// import { Toaster } from 'react-hot-toast';
// import { useEffect } from "react"; 
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useDispatch } from "react-redux"; 
// import { loadUser } from "./features/authentication/authSlice"; 

// // Components & Pages
// import MainLayout from "./components/MainLayout";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import AllTours from "./pages/AllTours";
// import TourDetails from "./pages/TourDetails";
// import Account from "./pages/Account";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PaymentSuccess from "./pages/PaymentSuccess";
// import AIChatBot from "./components/AIChatBot";
// import AIGuide from "./pages/AIGuide";
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';

// // Admin Pages
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageTours from "./pages/admin/ManageTours";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   return (
//     <BrowserRouter>
//       <Toaster position="top-center" />
      
//       <Routes>
//         {/* GROUP 1: PUBLIC PAGES (With Navbar) */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/tours" element={<AllTours />} />
//           <Route path="/tour/:slug" element={<TourDetails />} />
//           <Route path="/ai-planner" element={<AIGuide />} />
          
//           {/* User Protected Routes */}
//           <Route 
//             path="/me" 
//             element={
//               <ProtectedRoute>
//                 <Account />
//               </ProtectedRoute>
//             } 
//           />
//         </Route>

//         {/* GROUP 2: AUTH PAGES (No Navbar) */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/payment-success" element={<PaymentSuccess/>} />

//         {/* GROUP 3: ADMIN ROUTES (Fully Protected 🛡️) */}
//         <Route element={<ProtectedRoute restrictTo={['admin']} />}>
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/admin/tours" element={<ManageTours />} />
//             {/* Future: <Route path="/admin/users" element={<ManageUsers />} /> */}
//         </Route>

//       </Routes>

//       <AIChatBot />
//     </BrowserRouter>
//   );
// }

// export default App;


// import { Toaster } from 'react-hot-toast';
// import { useEffect } from "react"; 
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useDispatch } from "react-redux"; 
// import { loadUser } from "./features/authentication/authSlice"; 

// // Components & Pages
// import MainLayout from "./components/MainLayout";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import AllTours from "./pages/AllTours";
// import TourDetails from "./pages/TourDetails";
// import Account from "./pages/Account";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PaymentSuccess from "./pages/PaymentSuccess";
// import AIChatBot from "./components/AIChatBot";
// import AIGuide from "./pages/AIGuide";
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';

// // ✅ Admin Pages Import
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageTours from "./pages/admin/ManageTours";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   return (
//     <BrowserRouter>
//       <Toaster position="top-center" />
      
//       <Routes>
//         {/* GROUP 1: PUBLIC PAGES (Navbar Ke Saath) */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/tours" element={<AllTours />} />
//           <Route path="/tour/:slug" element={<TourDetails />} />
//           <Route path="/ai-planner" element={<AIGuide />} />
          
//           {/* User Protected Routes */}
//           <Route 
//             path="/me" 
//             element={
//               <ProtectedRoute>
//                 <Account />
//               </ProtectedRoute>
//             } 
//           />
//         </Route>

//         {/* GROUP 2: AUTH PAGES (Navbar Ke Bina) */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/payment-success" element={<PaymentSuccess/>} />

//         {/* GROUP 3: ADMIN ROUTES (Fully Protected 🛡️) */}
//         {/* Sirf Admin hi access kar sakta hai */}
//         <Route element={<ProtectedRoute restrictTo={['admin']} />}>
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/admin/tours" element={<ManageTours />} />
//         </Route>

//       </Routes>

//       <AIChatBot />
//     </BrowserRouter>
//   );
// }

// export default App;




import { Toaster } from 'react-hot-toast';
import { useEffect } from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { loadUser } from "./features/authentication/authSlice"; 

// Components & Pages
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllTours from "./pages/AllTours";
import TourDetails from "./pages/TourDetails";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentSuccess from "./pages/PaymentSuccess";
import AIChatBot from "./components/AIChatBot";
import AIGuide from "./pages/AIGuide";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// ✅ Admin Pages Import
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTours from "./pages/admin/ManageTours";
import ManageUsers from "./pages/admin/ManageUsers"; 

import ManageReviews from "./pages/admin/ManageReviews";

import ManageBookings from "./pages/admin/ManageBookings";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      
      <Routes>
        {/* GROUP 1: PUBLIC PAGES (Navbar Ke Saath) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<AllTours />} />
          <Route path="/tour/:slug" element={<TourDetails />} />
          <Route path="/ai-planner" element={<AIGuide />} />
          
          {/* User Protected Routes */}
          <Route 
            path="/me" 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* GROUP 2: AUTH PAGES (Navbar Ke Bina) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/payment-success" element={<PaymentSuccess/>} />

        {/* GROUP 3: ADMIN ROUTES (Fully Protected 🛡️) */}
        {/* Fixed Wrapper: Explicitly wrap each route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute restrictTo={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/tours" 
          element={
            <ProtectedRoute restrictTo={['admin']}>
              <ManageTours />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute restrictTo={['admin']}>
              <ManageUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
  path="/admin/bookings" 
  element={
    <ProtectedRoute restrictTo={['admin']}>
      <ManageBookings />
    </ProtectedRoute>
  } 
/>

        <Route 
  path="/admin/reviews" 
  element={
    <ProtectedRoute restrictTo={['admin']}>
      <ManageReviews />
    </ProtectedRoute>
  } 
/>

      </Routes>

      <AIChatBot />
    </BrowserRouter>
  );
}

export default App;