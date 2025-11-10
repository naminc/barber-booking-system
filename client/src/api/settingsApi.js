import axiosClient from "./axiosClient";

const settingsApi = {
  // Lấy cấu hình
  getSettings: async () => {
    const response = await axiosClient.get("/settings");
    return response.data || response;
  },

  // Cập nhật cấu hình
  updateSettings: async (data) => {
    const response = await axiosClient.put("/settings", data);
    return response.data || response;
  },
};

export default settingsApi;