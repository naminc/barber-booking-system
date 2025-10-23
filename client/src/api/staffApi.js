import axiosClient from "./axiosClient";

const staffApi = {
  // Lấy danh sách tất cả staff
  getAllStaff: () => {
    return axiosClient.get("/staff");
  },

  // Lấy thống kê staff
  getStaffStats: () => {
    return axiosClient.get("/staff/stats");
  },

  // Lấy staff theo ID
  getStaffById: (id) => {
    return axiosClient.get(`/staff/${id}`);
  },

  // Tạo staff mới
  createStaff: (data) => {
    return axiosClient.post("/staff", data);
  },

  // Cập nhật staff
  updateStaff: (id, data) => {
    return axiosClient.put(`/staff/${id}`, data);
  },

  // Xóa staff
  deleteStaff: (id) => {
    return axiosClient.delete(`/staff/${id}`);
  },
};

export default staffApi;
