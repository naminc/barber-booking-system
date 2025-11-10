import { useState, useEffect, useCallback } from "react";
import reviewsApi from "../api/reviewsApi";

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reviewsApi.getAllReviews();

      // Xử lý các định dạng phản hồi khác nhau
      if (Array.isArray(response)) {
        setReviews(response);
      } else if (response.data && Array.isArray(response.data)) {
        setReviews(response.data);
      } else if (response.reviews && Array.isArray(response.reviews)) {
        setReviews(response.reviews);
      } else {
        setReviews([]);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách đánh giá";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa đánh giá
  const deleteReview = useCallback(async (reviewId) => {
    try {
      await reviewsApi.deleteReview(reviewId);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
      return { success: true, message: "Xóa đánh giá thành công" };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Xóa đánh giá thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Cập nhật đánh giá
  const updateReview = useCallback(async (reviewId, data) => {
    try {
      const response = await reviewsApi.updateReview(reviewId, data);

      // Cập nhật state local
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, ...response.review } : review
        )
      );

      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Cập nhật đánh giá thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Thay đổi trạng thái đánh giá
  const updateReviewStatus = useCallback(async (reviewId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "approved"
          ? "rejected"
          : currentStatus === "rejected"
          ? "approved"
          : "approved";
      const response = await reviewsApi.updateReviewStatus(reviewId, newStatus);

      // Cập nhật state local
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, status: newStatus } : review
        )
      );

      return {
        success: true,
        message:
          newStatus === "approved"
            ? "Duyệt đánh giá thành công"
            : "Từ chối đánh giá thành công",
        newStatus,
      };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Thay đổi trạng thái thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Tạo đánh giá
  const createReview = useCallback(async (data) => {
    try {
      const response = await reviewsApi.createReview(data);

      // Thêm đánh giá mới vào state local
      if (response.review) {
        setReviews((prevReviews) => [response.review, ...prevReviews]);
      }

      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Tạo đánh giá thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Hàm lọc đánh giá
  const filterByStatus = useCallback(
    (status) => {
      if (status === "all") return reviews;
      return reviews.filter((review) => review.status === status);
    },
    [reviews]
  );

  // Hàm lọc đánh giá theo đánh giá
  const filterByRating = useCallback(
    (rating) => {
      if (rating === "all") return reviews;
      return reviews.filter((review) => review.rating === parseInt(rating));
    },
    [reviews]
  );

  // Hàm tìm kiếm đánh giá
  const searchReviews = useCallback(
    (searchTerm) => {
      if (!searchTerm) return reviews;
      const term = searchTerm.toLowerCase();
      return reviews.filter(
        (review) =>
          review.user_name?.toLowerCase().includes(term) ||
          review.staff_name?.toLowerCase().includes(term) ||
          review.service_name?.toLowerCase().includes(term) ||
          review.comment?.toLowerCase().includes(term)
      );
    },
    [reviews]
  );

  // Sử dụng useEffect để lấy dữ liệu
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    deleteReview,
    updateReview,
    createReview,
    updateReviewStatus,
    filterByStatus,
    filterByRating,
    searchReviews,
  };
};
