import axiosClient from "./axiosClient";

const usersApi = {
  // Lấy danh sách tất cả users
  getAllUsers: () => {
    return axiosClient.get("/users");
  },

  // Tạo user mới
  createUser: (data) => {
    return axiosClient.post("/users/create", data);
  },

  // Xóa user
  deleteUser: (id) => {
    return axiosClient.delete(`/users/${id}`);
  },

  // Cập nhật user
  updateUser: (id, data) => {
    return axiosClient.put(`/users/${id}`, data);
  },

  // Lấy thông tin profile
  getProfile: () => {
    return axiosClient.get("/users/profile");
  },
};

export default usersApi;

