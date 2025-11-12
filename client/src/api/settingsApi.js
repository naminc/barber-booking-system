import axiosClient from "./axiosClient";

const settingsApi = {
  // Lấy cấu hình
  getSettings: async () => {
    const response = await axiosClient.get("/settings");
    // axiosClient returns response.data, so response is already { success: true, data }
    return response?.data || response;
  },

  // Cập nhật cấu hình
  updateSettings: async (data) => {
    const response = await axiosClient.put("/settings", data);
    // axiosClient returns response.data, so response is already { success: true, message, data }
    return response?.data || response;
  },
};

export default settingsApi;