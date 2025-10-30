const reviewService = require("../services/reviewService");

exports.getAll = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Lấy danh sách đánh giá thất bại" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id);
    res.json(review);
  } catch (err) {
    const msg = err.message;
    if (msg === "Đánh giá không tồn tại") {
      return res.status(404).json({ error: msg });
    }
    res.status(500).json({ error: msg || "Lấy thông tin đánh giá thất bại" });
  }
};

exports.create = async (req, res) => {
  try {
    const { user_id, service_id, staff_id, rating, comment, experience } =
      req.body;

    const newReview = await reviewService.createReview({
      user_id,
      service_id,
      staff_id,
      rating,
      comment,
      experience,
      status: "pending",
    });

    res.json({ message: "Tạo đánh giá thành công", review: newReview });
  } catch (err) {
    res.status(500).json({ error: err.message || "Tạo đánh giá thất bại" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedReview = await reviewService.updateReview(id, data);
    res.json({
      message: "Cập nhật đánh giá thành công",
      review: updatedReview,
    });
  } catch (err) {
    const msg = err.message;
    if (msg === "Đánh giá không tồn tại") {
      return res.status(404).json({ error: msg });
    }
    res.status(500).json({ error: msg || "Cập nhật đánh giá thất bại" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewService.deleteReview(id);
    res.json(result);
  } catch (err) {
    const msg = err.message;
    if (msg === "Đánh giá không tồn tại") {
      return res.status(404).json({ error: msg });
    }
    res.status(500).json({ error: msg || "Xóa đánh giá thất bại" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedReview = await reviewService.updateReviewStatus(id, status);
    res.json({
      message: "Cập nhật trạng thái đánh giá thành công",
      review: updatedReview,
    });
  } catch (err) {
    const msg = err.message;
    if (msg === "Đánh giá không tồn tại") {
      return res.status(404).json({ error: msg });
    }
    res.status(500).json({ error: msg || "Cập nhật trạng thái thất bại" });
  }
};

exports.getByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const reviews = await reviewService.getReviewsByService(serviceId);
    res.json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Lấy danh sách đánh giá thất bại" });
  }
};

exports.getByStaff = async (req, res) => {
  try {
    const { staffId } = req.params;
    const reviews = await reviewService.getReviewsByStaff(staffId);
    res.json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Lấy danh sách đánh giá thất bại" });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await reviewService.getReviewsByUser(userId);
    res.json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Lấy danh sách đánh giá thất bại" });
  }
};