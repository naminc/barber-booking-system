import axiosClient from "./axiosClient";

const reviewsApi = {
  // Lấy danh sách tất cả reviews
  getAllReviews: () => {
    return axiosClient.get("/reviews");
  },

  // Tạo review mới
  createReview: (data) => {
    return axiosClient.post("/reviews", data);
  },

  // Xóa review
  deleteReview: (id) => {
    return axiosClient.delete(`/reviews/${id}`);
  },

  // Cập nhật review
  updateReview: (id, data) => {
    return axiosClient.put(`/reviews/${id}`, data);
  },

  // Cập nhật trạng thái review
  updateReviewStatus: (id, status) => {
    return axiosClient.patch(`/reviews/${id}/status`, { status });
  },

  // Lấy review theo ID
  getReviewById: (id) => {
    return axiosClient.get(`/reviews/${id}`);
  },

  // Lấy reviews theo service
  getReviewsByService: (serviceId) => {
    return axiosClient.get(`/reviews/service/${serviceId}`);
  },

  // Lấy reviews theo staff
  getReviewsByStaff: (staffId) => {
    return axiosClient.get(`/reviews/staff/${staffId}`);
  },

  // Lấy reviews theo user
  getReviewsByUser: (userId) => {
    return axiosClient.get(`/reviews/user/${userId}`);
  },
};

export default reviewsApi;
