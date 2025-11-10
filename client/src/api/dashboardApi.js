import axiosClient from "./axiosClient";

const dashboardApi = {
  // Lấy thống kê dashboard
  getStats: async () => {
    try {
      const response = await axiosClient.get("/dashboard/stats");
      // axiosClient interceptor đã trả về response.data, nên response đã là dữ liệu
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Lấy lịch hẹn gần nhất
  getRecentAppointments: async (limit = 10) => {
    try {
      const response = await axiosClient.get(
        `/dashboard/recent-appointments?limit=${limit}`
      );
      // axiosClient interceptor đã trả về response.data
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Lấy doanh thu theo tháng
  getRevenueByMonth: async (year) => {
    try {
      const url = year
        ? `/dashboard/revenue-by-month?year=${year}`
        : "/dashboard/revenue-by-month";
      const response = await axiosClient.get(url);
      // axiosClient interceptor đã trả về response.data
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Lấy thống kê hôm nay
  getTodayStats: async () => {
    try {
      const response = await axiosClient.get("/dashboard/today");
      // axiosClient interceptor đã trả về response.data
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Lấy lịch hẹn sắp tới
  getUpcomingAppointments: async (limit = 10) => {
    try {
      const response = await axiosClient.get(
        `/dashboard/upcoming-appointments?limit=${limit}`
      );
      // axiosClient interceptor đã trả về response.data
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default dashboardApi;

