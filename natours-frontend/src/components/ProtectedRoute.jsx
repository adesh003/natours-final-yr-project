import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, restrictTo = [] }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // 1. Loading Check
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2. Auth Check
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 👇 DEBUGGING LOGS (Console check karna)
  console.log("🔐 PROTECTED ROUTE CHECK:");
  console.log("👤 Current User Role:", user.role);
  console.log("🛡️ Required Roles:", restrictTo);

  // 3. Role Restriction Check
  // Agar user ka role allowed list mein nahi hai
  if (restrictTo.length > 0 && !restrictTo.includes(user.role)) {
    console.warn("🚫 Access Denied! Role mismatch.");
    alert(`Access Denied! Your role is '${user.role}', but this page requires: ${restrictTo.join(', ')}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;