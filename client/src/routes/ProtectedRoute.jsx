import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles = [] }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
