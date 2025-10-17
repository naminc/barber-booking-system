import React, { useState, useEffect } from "react";
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
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../theme.css";

const Review = () => {
  const [form, setForm] = useState({
    barber: "",
    service: "",
    rating: 0,
    comment: "",
    experience: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [reviews, setReviews] = useState([]);
  const [hoveredStar, setHoveredStar] = useState(0);

  const services = [
    { name: "Cắt tóc nam + gội đầu", price: "150,000đ", duration: "45 phút" },
    { name: "Cạo râu + xả stress", price: "200,000đ", duration: "60 phút" },
    { name: "Uốn tóc nam", price: "300,000đ", duration: "90 phút" },
    { name: "Nhuộm tóc tạo kiểu", price: "400,000đ", duration: "120 phút" },
    { name: "Cắt tóc + cạo râu combo", price: "300,000đ", duration: "75 phút" },
    { name: "Massage đầu + gội", price: "100,000đ", duration: "30 phút" },
  ];

  const barbers = [
    {
      name: "Anh Hưng Barber",
      rating: 5,
      specialty: "Cắt tóc nam",
      experience: "8 năm",
    },
    {
      name: "Anh Tuấn",
      rating: 4.8,
      specialty: "Cạo râu",
      experience: "6 năm",
    },
    {
      name: "Anh Kiên",
      rating: 4.9,
      specialty: "Tạo kiểu",
      experience: "5 năm",
    },
    {
      name: "Anh Lộc",
      rating: 4.7,
      specialty: "Nhuộm tóc",
      experience: "7 năm",
    },
  ];

  // Sample reviews data
  const sampleReviews = [
    {
      id: 1,
      userName: "Nguyễn Văn A",
      barber: "Anh Hưng Barber",
      service: "Cắt tóc nam + gội đầu",
      rating: 5,
      comment:
        "Dịch vụ rất tốt, thợ cắt tóc chuyên nghiệp và nhiệt tình. Tôi rất hài lòng với kiểu tóc mới!",
      experience: "excellent",
      date: "2024-01-15",
      helpful: 12,
    },
    {
      id: 2,
      userName: "Trần Thị B",
      barber: "Anh Tuấn",
      service: "Cạo râu + xả stress",
      rating: 4,
      comment:
        "Cạo râu sạch sẽ, massage thư giãn. Chỉ có một chút nhỏ về thời gian chờ đợi.",
      experience: "good",
      date: "2024-01-14",
      helpful: 8,
    },
    {
      id: 3,
      userName: "Lê Văn C",
      barber: "Anh Kiên",
      service: "Uốn tóc nam",
      rating: 5,
      comment:
        "Kiểu tóc uốn rất đẹp, thợ có kinh nghiệm và tư vấn nhiệt tình. Giá cả hợp lý.",
      experience: "excellent",
      date: "2024-01-13",
      helpful: 15,
    },
    {
      id: 4,
      userName: "Phạm Thị D",
      barber: "Anh Lộc",
      service: "Nhuộm tóc tạo kiểu",
      rating: 4,
      comment:
        "Màu tóc đẹp như mong đợi, nhưng quá trình nhuộm hơi lâu. Nhìn chung là hài lòng.",
      experience: "good",
      date: "2024-01-12",
      helpful: 6,
    },
  ];

  useEffect(() => {
    setReviews(sampleReviews);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!form.barber) {
      newErrors.barber = "Vui lòng chọn thợ barber";
    }
    if (!form.service) {
      newErrors.service = "Vui lòng chọn dịch vụ";
    }
    if (form.rating === 0) {
      newErrors.rating = "Vui lòng đánh giá sao";
    }
    if (!form.comment.trim()) {
      newErrors.comment = "Vui lòng viết đánh giá";
    }
    if (!form.experience) {
      newErrors.experience = "Vui lòng chọn trải nghiệm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Simulate API call
    const newReview = {
      id: reviews.length + 1,
      userName: "Khách hàng",
      barber: form.barber,
      service: form.service,
      rating: form.rating,
      comment: form.comment,
      experience: form.experience,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
    setForm({
      barber: "",
      service: "",
      rating: 0,
      comment: "",
      experience: "",
    });
    setErrors({});
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-6 shadow-lg">
              <FaStar className="text-2xl text-black" />
            </div>
            <h2 className="barber-title text-4xl md:text-5xl mb-4 text-[var(--color-gold)]">
              ĐÁNH GIÁ DỊCH VỤ
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto leading-relaxed">
              Chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện chất lượng
              dịch vụ
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-8 flex items-center justify-center gap-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 text-green-300 px-8 py-5 rounded-2xl text-base font-medium max-w-2xl mx-auto shadow-lg backdrop-blur-sm">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-lg text-white" />
              </div>
              <div>
                <div className="font-semibold text-lg">
                  Cảm ơn bạn đã đánh giá!
                </div>
                <div className="text-sm opacity-90">
                  Đánh giá của bạn đã được gửi thành công.
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Review Form */}
            <div className="lg:col-span-2">
              <div className="barber-box p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                    <FaComment className="text-lg text-black" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-gold)]">
                    Viết đánh giá
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Barber Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                      <FaUserTie className="text-base" />
                      Chọn thợ barber *
                    </label>
                    <select
                      value={form.barber}
                      onChange={(e) =>
                        setForm({ ...form, barber: e.target.value })
                      }
                      className={`barber-input appearance-none transition-all duration-200 ${
                        errors.barber
                          ? "border-red-400 bg-red-500/10"
                          : "hover:border-[var(--color-gold)]/50"
                      }`}
                    >
                      <option value="">-- Chọn thợ barber --</option>
                      {barbers.map((barber, index) => (
                        <option key={index} value={barber.name}>
                          {barber.name} - {barber.specialty} (
                          {barber.experience})
                        </option>
                      ))}
                    </select>
                    {errors.barber && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.barber}
                      </p>
                    )}
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                      <FaCut className="text-base" />
                      Chọn dịch vụ *
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className={`barber-input appearance-none transition-all duration-200 ${
                        errors.service
                          ? "border-red-400 bg-red-500/10"
                          : "hover:border-[var(--color-gold)]/50"
                      }`}
                    >
                      <option value="">-- Chọn dịch vụ --</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.name}>
                          {service.name} - {service.price}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                      <FaStar className="text-base" />
                      Đánh giá sao *
                    </label>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        {renderStars(form.rating, true, (star) =>
                          setForm({ ...form, rating: star })
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-light)]">
                        {form.rating > 0 && (
                          <>
                            <span className="font-medium">{form.rating}/5</span>
                            <span className="text-xs opacity-75">sao</span>
                          </>
                        )}
                      </div>
                    </div>
                    {errors.rating && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.rating}
                      </p>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                      <FaHeart className="text-base" />
                      Trải nghiệm tổng thể *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                          className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                            form.experience === option.value
                              ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)] shadow-lg"
                              : "border-[var(--color-border)] hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <option.icon
                              className={`text-xl ${option.color}`}
                            />
                            <div className="text-xs font-medium text-center">
                              {option.label}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.experience && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  {/* Comment */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)]">
                      <FaComment className="text-base" />
                      Nhận xét chi tiết *
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
                      rows={5}
                      placeholder="Hãy chia sẻ trải nghiệm của bạn về dịch vụ..."
                    />
                    <div className="flex justify-between items-center text-xs text-[var(--color-text-muted)]">
                      <span>Tối thiểu 10 ký tự</span>
                      <span>{form.comment.length}/500</span>
                    </div>
                    {errors.comment && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {errors.comment}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-8">
                    <button
                      type="submit"
                      className="barber-btn flex items-center gap-3 mx-auto px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    >
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <FaStar className="text-lg" />
                      </div>
                      Gửi đánh giá
                    </button>
                  </div>
                </form>
              </div>

              {/* Reviews List */}
              <div className="mt-16">
                <div className="barber-box p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                      <FaComment className="text-lg text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-gold)]">
                      Đánh giá từ khách hàng
                    </h3>
                  </div>
                  <div className="space-y-8">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-[var(--color-border)] pb-8 last:border-b-0"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-gold)]/20 to-[#d4af37]/20 rounded-full flex items-center justify-center">
                              <FaUserTie className="text-[var(--color-gold)] text-lg" />
                            </div>
                            <div>
                              <div className="font-semibold text-[var(--color-text-main)] text-lg">
                                {review.userName}
                              </div>
                              <div className="text-sm text-[var(--color-text-light)] flex items-center gap-2">
                                <FaUserTie className="text-xs" />
                                {review.barber}
                              </div>
                              <div className="text-sm text-[var(--color-text-light)] flex items-center gap-2">
                                <FaCut className="text-xs" />
                                {review.service}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
                            <FaCalendarAlt className="text-xs" />
                            {review.date}
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mb-4">
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-sm font-medium text-[var(--color-text-light)]">
                              {review.rating}/5
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            {getExperienceIcon(review.experience)}
                            <span className="text-[var(--color-text-light)] font-medium">
                              {getExperienceText(review.experience)}
                            </span>
                          </div>
                        </div>

                        <p className="text-[var(--color-text-light)] mb-4 leading-relaxed text-base">
                          {review.comment}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
                          <button className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors duration-200 hover:scale-105">
                            <FaThumbsUp className="text-sm" />
                            <span>Hữu ích ({review.helpful})</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors duration-200 hover:scale-105">
                            <FaComment className="text-sm" />
                            <span>Phản hồi</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Statistics */}
              <div className="barber-box p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                    <FaStar className="text-sm text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-gold)]">
                    Thống kê đánh giá
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[var(--color-gold)] mb-2">
                      4.8
                    </div>
                    <div className="flex justify-center mb-3">
                      {renderStars(4.8)}
                    </div>
                    <div className="text-sm text-[var(--color-text-light)]">
                      Dựa trên {reviews.length} đánh giá
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm w-6 font-medium">{star}</span>
                        <FaStar className="text-yellow-400 text-sm" />
                        <div className="flex-1 bg-[var(--color-border)] rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-[var(--color-gold)] to-[#d4af37] h-2.5 rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                star === 5
                                  ? 60
                                  : star === 4
                                  ? 25
                                  : star === 3
                                  ? 10
                                  : star === 2
                                  ? 3
                                  : 2
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-[var(--color-text-muted)] w-8 font-medium">
                          {star === 5
                            ? "60%"
                            : star === 4
                            ? "25%"
                            : star === 3
                            ? "10%"
                            : star === 2
                            ? "3%"
                            : "2%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Barbers Info */}
              <div className="barber-box p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                    <FaUserTie className="text-sm text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-gold)]">
                    Thợ barber
                  </h3>
                </div>
                <div className="space-y-4">
                  {barbers.map((barber, index) => (
                    <div
                      key={index}
                      className="border-b border-[var(--color-border)] pb-4 last:border-b-0 hover:bg-[var(--color-gold)]/5 transition-colors duration-200 rounded-lg p-3"
                    >
                      <div className="font-semibold text-[var(--color-text-main)] text-lg mb-1">
                        {barber.name}
                      </div>
                      <div className="text-sm text-[var(--color-text-light)] mb-2 flex items-center gap-2">
                        <FaCut className="text-xs" />
                        {barber.specialty}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-medium">{barber.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock className="text-xs" />
                          <span>{barber.experience}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Review;
