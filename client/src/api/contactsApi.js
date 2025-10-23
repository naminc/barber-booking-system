import axiosClient from "./axiosClient";

const contactsApi = {
  // Lấy danh sách tất cả contacts
  getAllContacts: () => {
    return axiosClient.get("/contacts");
  },

  // Lấy contact theo ID
  getContactById: (id) => {
    return axiosClient.get(`/contacts/${id}`);
  },

  // Tạo contact mới (không cần auth)
  createContact: (data) => {
    return axiosClient.post("/contacts", data);
  },

  // Xóa contact
  deleteContact: (id) => {
    return axiosClient.delete(`/contacts/${id}`);
  },

  // Cập nhật trạng thái contact
  updateContactStatus: (id, status) => {
    return axiosClient.patch(`/contacts/${id}/status`, { status });
  },
};

export default contactsApi;

