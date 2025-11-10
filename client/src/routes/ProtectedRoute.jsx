import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";

// Route bảo vệ
const ProtectedRoute = ({ roles = [] }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  // Kiểm tra nếu không có token
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Kiểm tra nếu token hết hạn
  if (isTokenExpired(token)) {
    // Xóa token và user khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
  
  // Kiểm tra quyền truy cập
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }
  
  // Render component
  return <Outlet />;
};

// Giá trị của route
export default ProtectedRoute;
