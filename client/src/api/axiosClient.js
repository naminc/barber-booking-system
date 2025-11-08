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
  
  // Check if token is expired before making request
  if (token && isTokenExpired(token)) {
    // Token expired, clear and logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to login if not already there
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    return Promise.reject(new Error("Token expired"));
  }
  
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Xử lý lỗi phản hồi
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 401/403 (Unauthorized/Forbidden) - token expired or invalid
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const errorMessage = error.response.data?.error || error.response.data?.message;
      
      // Check if it's a token expiration error
      if (
        errorMessage?.toLowerCase().includes("expired") ||
        errorMessage?.toLowerCase().includes("invalid") ||
        errorMessage?.toLowerCase().includes("token")
      ) {
        // Clear token and user data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Redirect to login if not already there
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    // If we have a response from server, reject with the error structure
    if (error.response) {
      return Promise.reject(error);
    }

    // For network errors or other errors without response
    return Promise.reject(error);
  }
);

export default axiosClient;
