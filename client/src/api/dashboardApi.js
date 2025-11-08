import axiosClient from "./axiosClient";

const dashboardApi = {
  // Get dashboard statistics
  getStats: async () => {
    try {
      const response = await axiosClient.get("/dashboard/stats");
      // axiosClient interceptor already returns response.data, so response is already the data
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get recent appointments
  getRecentAppointments: async (limit = 10) => {
    try {
      const response = await axiosClient.get(
        `/dashboard/recent-appointments?limit=${limit}`
      );
      // axiosClient interceptor already returns response.data
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get revenue by month
  getRevenueByMonth: async (year) => {
    try {
      const url = year
        ? `/dashboard/revenue-by-month?year=${year}`
        : "/dashboard/revenue-by-month";
      const response = await axiosClient.get(url);
      // axiosClient interceptor already returns response.data
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get today's statistics
  getTodayStats: async () => {
    try {
      const response = await axiosClient.get("/dashboard/today");
      // axiosClient interceptor already returns response.data
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get upcoming appointments
  getUpcomingAppointments: async (limit = 10) => {
    try {
      const response = await axiosClient.get(
        `/dashboard/upcoming-appointments?limit=${limit}`
      );
      // axiosClient interceptor already returns response.data
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default dashboardApi;

