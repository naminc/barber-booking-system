import axiosClient from "./axiosClient";

const appointmentsApi = {
  // Lấy danh sách tất cả appointments (admin)
  getAllAppointments: () => {
    return axiosClient.get("/appointments");
  },

  // Lấy appointment theo ID
  getAppointmentById: (id) => {
    return axiosClient.get(`/appointments/${id}`);
  },

  // Lấy appointments của user hiện tại
  getMyAppointments: () => {
    return axiosClient.get("/appointments/my-appointments");
  },

  // Lấy appointments theo user ID (admin)
  getAppointmentsByUserId: (userId) => {
    return axiosClient.get(`/appointments/user/${userId}`);
  },

  // Lấy appointments theo status (admin)
  getAppointmentsByStatus: (status) => {
    return axiosClient.get(`/appointments/status/${status}`);
  },

  // Lấy appointments theo staff ID (admin)
  getAppointmentsByStaffId: (staffId) => {
    return axiosClient.get(`/appointments/staff/${staffId}`);
  },

  // Lấy appointments theo khoảng thời gian (admin)
  getAppointmentsByDateRange: (startDate, endDate) => {
    return axiosClient.get("/appointments/date-range", {
      params: { startDate, endDate },
    });
  },

  // Tạo appointment mới
  createAppointment: (data) => {
    return axiosClient.post("/appointments/create", data);
  },

  // Cập nhật appointment
  updateAppointment: (id, data) => {
    return axiosClient.put(`/appointments/${id}`, data);
  },

  // Cập nhật trạng thái appointment (admin)
  updateAppointmentStatus: (id, status) => {
    return axiosClient.patch(`/appointments/${id}/status`, { status });
  },

  // Xóa appointment
  deleteAppointment: (id) => {
    return axiosClient.delete(`/appointments/${id}`);
  },

  // Lấy thống kê appointments (admin)
  getAppointmentStats: () => {
    return axiosClient.get("/appointments/stats");
  },

  // Hủy appointment (user)
  cancelAppointment: (id) => {
    return axiosClient.post(`/appointments/${id}/cancel`);
  },
};

export default appointmentsApi;