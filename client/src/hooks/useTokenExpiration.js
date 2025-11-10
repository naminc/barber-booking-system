import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired, getTokenTimeRemaining } from "../utils/jwt";

export const useTokenExpiration = (checkInterval = 5000) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const logout = () => {
      // Xóa token và user khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Chỉ redirect nếu không đang ở trang login
      if (window.location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }
    };

    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Nếu không có token, clear timeout và interval
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        return;
      }

      if (isTokenExpired(token)) {
        // Token đã hết hạn, logout ngay lập tức
        logout();
        return;
      }

      // Tính thời gian còn lại của token
      const timeRemaining = getTokenTimeRemaining(token);

      // Nếu có timeout cũ, clear nó
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Đặt timeout chính xác khi token hết hạn
      // Thêm 1 giây buffer để đảm bảo token đã hết hạn
      timeoutRef.current = setTimeout(() => {
        logout();
      }, timeRemaining + 1000);
    };

    // Kiểm tra ngay lập tức
    checkTokenExpiration();

    // Thiết lập interval để kiểm tra định kỳ (để xử lý trường hợp token bị thay đổi)
    // Với token ngắn hạn (1m), kiểm tra mỗi 5 giây là hợp lý
    intervalRef.current = setInterval(checkTokenExpiration, checkInterval);

    // Cleanup khi unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [navigate, checkInterval]);
};

// Giá trị của hook
export default useTokenExpiration;
