import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";

const ProtectedRoute = ({ roles = [] }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  // Check if no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if token is expired
  if (isTokenExpired(token)) {
    // Clear expired token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
  
  // Check role authorization
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
