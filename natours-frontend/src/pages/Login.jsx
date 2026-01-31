import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetState } from "../features/authentication/authSlice";
import { Mail, Lock, ArrowRight, LogIn, ArrowLeft } from "lucide-react"; // ArrowLeft add kiya

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

useEffect(() => {
    if (error) {
      toast.error(error); // ❌ Error Toast
      dispatch(resetState());
    }
    
    if (isAuthenticated) {
      toast.success("Welcome back, Explorer! 👋"); // ✅ Success Toast
      navigate("/");
    }
  }, [error, isAuthenticated, navigate, dispatch]);



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* 🔙 BACK TO HOME BUTTON */}
      <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-gray-400 hover:text-white transition-all z-50 font-medium group">
         <div className="bg-white/10 p-2 rounded-full group-hover:bg-green-500 group-hover:text-black transition-all">
            <ArrowLeft size={20} />
         </div>
         <span>Back to Home</span>
      </Link>

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 mt-2 text-sm">Enter your credentials to access your account.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#111] border border-gray-800 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-green-500 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#111] border border-gray-800 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-green-500 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>
          <div className="flex justify-end mt-2 mb-6">
  <Link 
    to="/forgot-password" 
    className="text-xs font-bold text-green-500 hover:text-green-400 hover:underline transition"
  >
    Forgot Password?
  </Link>
</div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : <>Login <ArrowRight size={20} /></>}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white font-bold hover:text-green-500 transition">Sign up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;