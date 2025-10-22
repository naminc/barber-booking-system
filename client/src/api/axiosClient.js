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

    // If we have a response from server, reject with the error structure
    if (error.response) {
      return Promise.reject(error);
    }

    // For network errors or other errors without response
    return Promise.reject(error);
  }
);

export default axiosClient;
