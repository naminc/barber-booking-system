import axios from "axios";
import { isTokenExpired } from "../utils/jwt";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token tự động vào mọi request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  // Kiểm tra token có hết hạn không
  if (token && isTokenExpired(token)) {
    // Token hết hạn, xóa và đăng xuất
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Chuyển hướng đến trang đăng nhập nếu không phải trang đăng nhập
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    return Promise.reject(new Error("Token hết hạn"));
  }
  
  if (token) config.headers.Authorization = `Bearer ${token}`; // Gắn token vào header của request
  return config;
});

// Xử lý lỗi phản hồi
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Xử lý lỗi 401/403 (Unauthorized/Forbidden) - token hết hạn hoặc không hợp lệ
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const errorMessage = error.response.data?.error || error.response.data?.message;
      
      // Kiểm tra nếu lỗi là do token hết hạn
      if (
        errorMessage?.toLowerCase().includes("expired") ||
        errorMessage?.toLowerCase().includes("invalid") ||
        errorMessage?.toLowerCase().includes("token")
      ) {
        // Xóa token và dữ liệu người dùng
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Chuyển hướng đến trang đăng nhập nếu không phải trang đăng nhập
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    // Nếu có phản hồi từ server, từ chối với cấu trúc lỗi
    if (error.response) {
      return Promise.reject(error);
    }

    // Đối với lỗi mạng hoặc lỗi khác không có phản hồi
    return Promise.reject(error);
  }
);

export default axiosClient;
