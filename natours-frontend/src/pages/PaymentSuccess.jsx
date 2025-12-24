import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Map, ArrowRight } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-center">
      
      {/* GLOW EFFECT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-lg w-full bg-[#111] border border-white/10 p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        
        {/* SUCCESS ICON */}
        <div className="mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-500 w-12 h-12 animate-bounce" />
        </div>

        <h1 className="text-4xl font-black text-white mb-2">Payment Successful!</h1>
        <p className="text-gray-400 text-lg mb-8">
          Hooray! Your adventure has been booked. Check your email for details.
        </p>

        {/* BUTTONS */}
        <div className="space-y-4">
          <Link 
            to="/me" 
            className="block w-full bg-green-500 text-black font-bold py-4 rounded-xl hover:bg-green-400 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
          >
            <Map size={20} /> View My Bookings
          </Link>
          
          <Link 
            to="/" 
            className="block w-full bg-white/5 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10"
          >
            Go to Home <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;