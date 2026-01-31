// src/pages/ResetPassword.jsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Lock, CheckCircle } from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams(); // URL se token nikalega
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ password: '', passwordConfirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwords.password !== passwords.passwordConfirm) {
      return toast.error('Passwords do not match! ❌');
    }

    setLoading(true);
    try {
      // Backend ko token ke saath naya password bhejo
      await api.patch(`/users/resetPassword/${token}`, {
        password: passwords.password,
        passwordConfirm: passwords.passwordConfirm
      });
      
      toast.success('Password changed successfully! Redirecting... 🥳');
      
      // Thoda wait karke login page par bhej do
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Token invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 animate-fade-in">
      <div className="bg-[#111] p-8 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl">
        
        <div className="flex justify-center mb-6">
           <div className="bg-green-500/10 p-4 rounded-full">
              <Lock size={40} className="text-green-500" />
           </div>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-2">Set New Password 🔑</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Your new password must be different from previous used passwords.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
            <input 
              type="password" 
              className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white mt-2 focus:border-green-500 outline-none transition"
              onChange={(e) => setPasswords({...passwords, password: e.target.value})}
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm Password</label>
            <input 
              type="password" 
              className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white mt-2 focus:border-green-500 outline-none transition"
              onChange={(e) => setPasswords({...passwords, passwordConfirm: e.target.value})}
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-green-500 text-black font-bold py-3.5 rounded-xl hover:bg-green-400 transition disabled:opacity-50 shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2"
          >
            {loading ? 'Updating...' : <><CheckCircle size={18}/> Reset Password</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;