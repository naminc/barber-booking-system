import axiosClient from "./axiosClient";

const servicesApi = {
  // Lấy danh sách tất cả services
  getAllServices: () => {
    return axiosClient.get("/services");
  },

  // Lấy service theo ID
  getServiceById: (id) => {
    return axiosClient.get(`/services/${id}`);
  },

  // Tạo service mới
  createService: (data) => {
    return axiosClient.post("/services/create", data);
  },

  // Cập nhật service
  updateService: (id, data) => {
    return axiosClient.put(`/services/${id}`, data);
  },

  // Xóa service
  deleteService: (id) => {
    return axiosClient.delete(`/services/${id}`);
  },
};

export default servicesApi;

