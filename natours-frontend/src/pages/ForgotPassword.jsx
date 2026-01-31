// src/pages/ForgotPassword.jsx

import { useState } from 'react';
import api from '../services/api'; // Tumhara axios instance
import toast from 'react-hot-toast';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend ko request bhejo
      await api.post('/users/forgotPassword', { email });
      toast.success('Reset link sent to your email! 📧');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 animate-fade-in">
      <div className="bg-[#111] p-8 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl">
        
        <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm transition">
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="flex justify-center mb-6">
           <div className="bg-green-500/10 p-4 rounded-full">
              <Mail size={40} className="text-green-500" />
           </div>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-2">Forgot Password? 🔒</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
          No worries! Enter your email and we will send you a reset link.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white mt-2 focus:border-green-500 outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold py-3.5 rounded-xl hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/20"
          >
            {loading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;