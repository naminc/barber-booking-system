import axiosClient from "./axiosClient";

const settingsApi = {
  getSettings: async () => {
    const response = await axiosClient.get("/settings");
    return response.data || response;
  },

  updateSettings: async (data) => {
    const response = await axiosClient.put("/settings", data);
    return response.data || response;
  },
};

export default settingsApi;