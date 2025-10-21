import axiosClient from "./axiosClient";

const authApi = {
  login: (credentials) => axiosClient.post("/auth/login", credentials),
  register: (data) => axiosClient.post("/auth/register", data),
  getProfile: () => axiosClient.get("/users/profile"),
  updateProfile: (userId, data) => axiosClient.put(`/users/${userId}`, data),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default authApi; 