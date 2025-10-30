import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import {
  FaStar,
  FaUserTie,
  FaCut,
  FaCalendarAlt,
  FaCheckCircle,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaHeart,
  FaClock,
} from "react-icons/fa";
import { useAuth, useReviews, useServices, useStaff } from "../hooks";
import { formatShortDate, formatTime } from "../utils/dateHelpers";
import "../theme.css";

const Review = () => {
  const { getCurrentUser } = useAuth();
  const {
    reviews,
    createReview,
    fetchReviews,
    loading: reviewsLoading,
  } = useReviews();
  const { services, loading: servicesLoading } = useServices();
  const { staff, loading: staffLoading } = useStaff();

  const [form, setForm] = useState({
    staff_id: "",
    service_id: "",
    rating: 0,
    comment: "",
    experience: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const currentUser = getCurrentUser();

  // Filter only approved reviews
  const approvedReviews = reviews.filter(
    (review) => review.status === "approved"
  );

  const validateForm = () => {
    const newErrors = {};

    if (!form.staff_id) {
      newErrors.staff_id = "Vui lòng chọn thợ barber";
    }
    if (!form.service_id) {
      newErrors.service_id = "Vui lòng chọn dịch vụ";
    }
    if (form.rating === 0) {
      newErrors.rating = "Vui lòng đánh giá sao";
    }
    if (!form.comment.trim()) {
      newErrors.comment = "Vui lòng viết đánh giá";
    }
    if (form.comment.trim().length < 10) {
      newErrors.comment = "Nhận xét phải có ít nhất 10 ký tự";
    }
    if (!form.experience) {
      newErrors.experience = "Vui lòng chọn trải nghiệm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để đánh giá");
      return;
    }

    try {
      setSubmitting(true);
      await createReview({
        user_id: currentUser.id,
        staff_id: parseInt(form.staff_id),
        service_id: parseInt(form.service_id),
        rating: form.rating,
        comment: form.comment.trim(),
        experience: form.experience,
      });

      setSuccess(true);
      toast.success(
        "Cảm ơn bạn đã đánh giá! Đánh giá của bạn sẽ được kiểm duyệt."
      );
      setTimeout(() => setSuccess(false), 5000);

      // Reset form
      setForm({
        staff_id: "",
        service_id: "",
        rating: 0,
        comment: "",
        experience: "",
      });
      setErrors({});

      // Refresh reviews
      fetchReviews();
    } catch (err) {
      toast.error(err.error || "Gửi đánh giá thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-lg ${
              star <= (interactive ? hoveredStar || form.rating : rating)
                ? "text-yellow-400"
                : "text-gray-400"
            } ${
              interactive
                ? "cursor-pointer hover:scale-110 transition-transform"
                : ""
            }`}
            onClick={interactive ? () => onStarClick(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredStar(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
          />
        ))}
      </div>
    );
  };

  const getExperienceText = (experience) => {
    switch (experience) {
      case "excellent":
        return "Tuyệt vời";
      case "good":
        return "Tốt";
      case "average":
        return "Bình thường";
      case "poor":
        return "Không hài lòng";
      default:
        return "";
    }
  };

  const getExperienceIcon = (experience) => {
    switch (experience) {
      case "excellent":
        return <FaHeart className="text-red-500" />;
      case "good":
        return <FaThumbsUp className="text-green-500" />;
      case "average":
        return <FaComment className="text-yellow-500" />;
      case "poor":
        return <FaThumbsDown className="text-red-500" />;
      default:
        return null;
    }
  };

  const isLoading = servicesLoading || staffLoading || reviewsLoading;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-4 shadow-lg">
              <FaStar className="text-xl text-black" />
            </div>
            <h2 className="barber-title text-3xl md:text-4xl mb-3 text-[var(--color-gold)]">
              ĐÁNH GIÁ DỊCH VỤ
            </h2>
            <p className="text-[var(--color-text-light)] max-w-xl mx-auto">
              Chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện dịch vụ
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 text-green-300 px-6 py-4 rounded-lg max-w-2xl mx-auto">
              <FaCheckCircle className="text-xl text-green-400" />
              <div>
                <div className="font-semibold">Cảm ơn bạn đã đánh giá!</div>
                <div className="text-sm opacity-90">
                  Đánh giá đang chờ kiểm duyệt.
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-gold)]"></div>
              <p className="mt-4 text-[var(--color-text-light)]">Đang tải...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Review Form */}
              <div className="lg:col-span-2">
                <div className="barber-box p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                      <FaComment className="text-base text-black" />
                    </div>
                    <h2 className="text-xl font-bold text-[var(--color-gold)]">
                      Viết đánh giá
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Barber and Service Selection - Same Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Barber Selection */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                          <FaUserTie className="text-base" />
                          Chọn thợ *
                        </label>
                        <select
                          value={form.staff_id}
                          onChange={(e) =>
                            setForm({ ...form, staff_id: e.target.value })
                          }
                          className={`barber-input appearance-none transition-all duration-200 ${
                            errors.staff_id
                              ? "border-red-400 bg-red-500/10"
                              : "hover:border-[var(--color-gold)]/50"
                          }`}
                          disabled={submitting}
                        >
                          <option value="">-- Chọn thợ --</option>
                          {staff.map((barber) => (
                            <option key={barber.id} value={barber.id}>
                              {barber.name}
                            </option>
                          ))}
                        </select>
                        {errors.staff_id && (
                          <p className="text-red-400 text-xs flex items-center gap-1">
                            {errors.staff_id}
                          </p>
                        )}
                      </div>

                      {/* Service Selection */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                          <FaCut className="text-base" />
                          Chọn dịch vụ *
                        </label>
                        <select
                          value={form.service_id}
                          onChange={(e) =>
                            setForm({ ...form, service_id: e.target.value })
                          }
                          className={`barber-input appearance-none transition-all duration-200 ${
                            errors.service_id
                              ? "border-red-400 bg-red-500/10"
                              : "hover:border-[var(--color-gold)]/50"
                          }`}
                          disabled={submitting}
                        >
                          <option value="">-- Chọn dịch vụ --</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                        {errors.service_id && (
                          <p className="text-red-400 text-xs flex items-center gap-1">
                            {errors.service_id}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                        <FaStar className="text-base" />
                        Đánh giá *
                      </label>
                      <div className="flex items-center gap-4">
                        {renderStars(form.rating, true, (star) =>
                          setForm({ ...form, rating: star })
                        )}
                        {form.rating > 0 && (
                          <span className="text-sm font-medium text-[var(--color-text-light)]">
                            {form.rating}/5 sao
                          </span>
                        )}
                      </div>
                      {errors.rating && (
                        <p className="text-red-400 text-xs">{errors.rating}</p>
                      )}
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                        <FaHeart className="text-base" />
                        Trải nghiệm *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          {
                            value: "excellent",
                            label: "Tuyệt vời",
                            icon: FaHeart,
                            color: "text-red-500",
                          },
                          {
                            value: "good",
                            label: "Tốt",
                            icon: FaThumbsUp,
                            color: "text-green-500",
                          },
                          {
                            value: "average",
                            label: "Bình thường",
                            icon: FaComment,
                            color: "text-yellow-500",
                          },
                          {
                            value: "poor",
                            label: "Không hài lòng",
                            icon: FaThumbsDown,
                            color: "text-red-500",
                          },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setForm({ ...form, experience: option.value })
                            }
                            disabled={submitting}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                              form.experience === option.value
                                ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                                : "border-[var(--color-border)] hover:border-[var(--color-gold)]/50"
                            } ${
                              submitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1.5">
                              <option.icon
                                className={`text-lg ${option.color}`}
                              />
                              <div className="text-xs font-medium">
                                {option.label}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.experience && (
                        <p className="text-red-400 text-xs">
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                        <FaComment className="text-base" />
                        Nhận xét *
                      </label>
                      <textarea
                        value={form.comment}
                        onChange={(e) =>
                          setForm({ ...form, comment: e.target.value })
                        }
                        className={`barber-textarea transition-all duration-200 resize-none ${
                          errors.comment
                            ? "border-red-400 bg-red-500/10"
                            : "hover:border-[var(--color-gold)]/50"
                        }`}
                        rows={4}
                        placeholder="Chia sẻ trải nghiệm của bạn..."
                        disabled={submitting}
                        maxLength={500}
                      />
                      <div className="flex justify-between items-center text-xs text-[var(--color-text-muted)]">
                        <span>{form.comment.length}/500 ký tự</span>
                      </div>
                      {errors.comment && (
                        <p className="text-red-400 text-xs">{errors.comment}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="barber-btn flex items-center gap-2 mx-auto px-8 py-3 font-semibold rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            <FaStar className="text-base" />
                            Gửi đánh giá
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="mt-8">
                  <div className="barber-box p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                        <FaComment className="text-base text-black" />
                      </div>
                      <h3 className="text-xl font-bold text-[var(--color-gold)]">
                        Đánh giá ({approvedReviews.length})
                      </h3>
                    </div>
                    <div className="space-y-6">
                      {approvedReviews.length === 0 ? (
                        <div className="text-center py-8 text-[var(--color-text-light)]">
                          <FaStar className="text-3xl mx-auto mb-3 opacity-30" />
                          <p className="text-sm">
                            Chưa có đánh giá. Hãy là người đầu tiên!
                          </p>
                        </div>
                      ) : (
                        approvedReviews.map((review) => (
                          <div
                            key={review.id}
                            className="border-b border-[var(--color-border)] pb-6 last:border-b-0"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-4">
                                <img
                                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    review.user_name || "Khách hàng"
                                  )}&background=d4af37&color=000&size=48&bold=true`}
                                  alt={review.user_name || "Khách hàng"}
                                  className="w-12 h-12 rounded-full"
                                />
                                <div>
                                  <div className="font-semibold text-[var(--color-text-main)] text-lg">
                                    {review.user_name || "Khách hàng"}
                                  </div>
                                  <div className="text-sm text-[var(--color-text-light)] flex items-center gap-2">
                                    <FaUserTie className="text-xs" />
                                    {review.staff_name || "N/A"}
                                  </div>
                                  <div className="text-sm text-[var(--color-text-light)] flex items-center gap-2">
                                    <FaCut className="text-xs" />
                                    {review.service_name || "N/A"}
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
                                <FaCalendarAlt className="text-xs" />
                                {review.created_at
                                  ? formatShortDate(review.created_at)
                                  : "N/A"}
                              </div>
                            </div>

                            <div className="flex items-center gap-6 mb-4">
                              <div className="flex items-center gap-2">
                                {renderStars(review.rating || 0)}
                                <span className="text-sm font-medium text-[var(--color-text-light)]">
                                  {review.rating || 0}/5
                                </span>
                              </div>
                              {review.experience && (
                                <div className="flex items-center gap-2 text-sm">
                                  {getExperienceIcon(review.experience)}
                                  <span className="text-[var(--color-text-light)] font-medium">
                                    {getExperienceText(review.experience)}
                                  </span>
                                </div>
                              )}
                            </div>

                            <p className="text-[var(--color-text-light)] mb-4 leading-relaxed text-base">
                              {review.comment || "Không có nhận xét"}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Statistics */}
                <div className="barber-box p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                      <FaStar className="text-sm text-black" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-gold)]">
                      Thống kê
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[var(--color-gold)] mb-2">
                        {approvedReviews.length > 0
                          ? (
                              approvedReviews.reduce(
                                (sum, r) => sum + (r.rating || 0),
                                0
                              ) / approvedReviews.length
                            ).toFixed(1)
                          : "0.0"}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(
                          approvedReviews.length > 0
                            ? Math.round(
                                approvedReviews.reduce(
                                  (sum, r) => sum + (r.rating || 0),
                                  0
                                ) / approvedReviews.length
                              )
                            : 0
                        )}
                      </div>
                      <div className="text-xs text-[var(--color-text-light)]">
                        {approvedReviews.length} đánh giá
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = approvedReviews.filter(
                          (r) => r.rating === star
                        ).length;
                        const percentage =
                          approvedReviews.length > 0
                            ? (count / approvedReviews.length) * 100
                            : 0;
                        return (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-sm w-6 font-medium">
                              {star}
                            </span>
                            <FaStar className="text-yellow-400 text-sm" />
                            <div className="flex-1 bg-[var(--color-border)] rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-[var(--color-gold)] to-[#d4af37] h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-[var(--color-text-muted)] w-12 font-medium text-right">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Barbers Info */}
                <div className="barber-box p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                      <FaUserTie className="text-sm text-black" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-gold)]">
                      Thợ barber
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {staff.map((barber) => (
                      <div
                        key={barber.id}
                        className="border-b border-[var(--color-border)] pb-3 last:border-b-0 hover:bg-[var(--color-gold)]/5 transition-colors duration-200 rounded-lg p-2"
                      >
                        <div className="font-semibold text-[var(--color-text-main)] mb-1">
                          {barber.name}
                        </div>
                        <div className="text-xs text-[var(--color-text-light)] flex items-center gap-1.5 mb-1">
                          <FaCut className="text-xs" />
                          {barber.specialization}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
                          <FaClock className="text-xs" />
                          {barber.experience}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Review;
