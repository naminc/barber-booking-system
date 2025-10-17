import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token tự động vào mọi request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Xử lý lỗi phản hồi
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("Lỗi API:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosClient;