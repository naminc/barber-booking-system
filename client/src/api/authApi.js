import axiosClient from "./axiosClient";

const authApi = {
  login: (credentials) => axiosClient.post("/auth/login", credentials),
  register: (data) => axiosClient.post("/auth/register", data),
  getProfile: () => axiosClient.get("/users/profile"),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default authApi; 