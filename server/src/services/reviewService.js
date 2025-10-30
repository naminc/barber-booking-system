const Review = require("../models/Review");

exports.getAllReviews = async () => {
  return await Review.getAll();
};

exports.getReviewById = async (id) => {
  const review = await Review.getById(id);
  if (!review) throw new Error("Đánh giá không tồn tại");
  return review;
};

exports.createReview = async (data) => {
  const reviewId = await Review.create(data);
  const review = await Review.getById(reviewId);
  return review;
};

exports.updateReview = async (id, data) => {
  const review = await Review.getById(id);
  if (!review) throw new Error("Đánh giá không tồn tại");

  const updateData = {};
  if (data.rating !== undefined) updateData.rating = data.rating;
  if (data.comment !== undefined) updateData.comment = data.comment;
  if (data.experience !== undefined) updateData.experience = data.experience;
  if (data.status !== undefined) updateData.status = data.status;

  const updatedReview = await Review.update(id, updateData);
  return updatedReview;
};

exports.deleteReview = async (id) => {
  const review = await Review.getById(id);
  if (!review) throw new Error("Đánh giá không tồn tại");

  const affected = await Review.delete(id);
  if (affected === 0) throw new Error("Xóa đánh giá thất bại");

  return { message: "Xóa đánh giá thành công" };
};

exports.updateReviewStatus = async (id, status) => {
  const review = await Review.getById(id);
  if (!review) throw new Error("Đánh giá không tồn tại");

  const updatedReview = await Review.updateStatus(id, status);
  return updatedReview;
};

exports.getReviewsByService = async (serviceId) => {
  return await Review.getByService(serviceId);
};

exports.getReviewsByStaff = async (staffId) => {
  return await Review.getByStaff(staffId);
};

exports.getReviewsByUser = async (userId) => {
  return await Review.getByUser(userId);
};
