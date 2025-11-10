import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";


export const useTokenExpiration = (checkInterval = 30000) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      
      if (token && isTokenExpired(token)) {
        // Xóa token và user khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Chỉ redirect nếu không đang ở trang login
        if (window.location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      }
    };

    // Kiểm tra ngay lập tức
    checkTokenExpiration();

    // Thiết lập interval để kiểm tra định kỳ
    const interval = setInterval(checkTokenExpiration, checkInterval);

    // Cleanup interval khi unmount
    return () => clearInterval(interval);
  }, [navigate, checkInterval]);
};

// Giá trị của hook
export default useTokenExpiration;

