import React from "react";
import Header from "../components/Header";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaClock,
  FaUserTie,
  FaCut,
  FaStickyNote,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { useBookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import "../theme.css";

const BookingConfirmation = () => {
  const { bookingData, resetBookingData } = useBookingContext();
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    // Simulate API call
    console.log("Booking confirmed:", bookingData);

    // Show success message
    alert(
      "Đặt lịch thành công! Chúng tôi sẽ liên hệ để xác nhận sớm nhất có thể."
    );

    // Reset booking data and redirect to home
    resetBookingData();
    navigate("/");
  };

  const handleBack = () => {
    navigate("/booking/select-time");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-6 shadow-lg">
              <FaCheckCircle className="text-2xl text-black" />
            </div>
            <h2 className="barber-title text-4xl md:text-5xl mb-4 text-[var(--color-gold)]">
              XÁC NHẬN ĐẶT LỊCH
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto leading-relaxed">
              Vui lòng kiểm tra lại thông tin trước khi xác nhận
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-12 px-4">
            <div className="flex items-center space-x-2 sm:space-x-4 max-w-full">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm sm:text-base">
                    1
                  </span>
                </div>
                <span className="text-[var(--color-gold)] font-semibold text-xs sm:text-sm mt-1">
                  Dịch vụ
                </span>
              </div>
              <div className="w-8 sm:w-16 h-0.5 bg-[var(--color-gold)]"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm sm:text-base">
                    2
                  </span>
                </div>
                <span className="text-[var(--color-gold)] font-semibold text-xs sm:text-sm mt-1">
                  Barber
                </span>
              </div>
              <div className="w-8 sm:w-16 h-0.5 bg-[var(--color-gold)]"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm sm:text-base">
                    3
                  </span>
                </div>
                <span className="text-[var(--color-gold)] font-semibold text-xs sm:text-sm mt-1">
                  Thời gian
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Summary */}
            <div className="lg:col-span-2">
              <div className="barber-box p-8">
                <h3 className="text-2xl font-bold text-[var(--color-gold)] mb-6 flex items-center gap-2">
                  <FaCheckCircle /> Tóm tắt đặt lịch
                </h3>

                <div className="space-y-6">
                  {/* Service Info */}
                  <div className="border-b border-[var(--color-border)] pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                        <FaCut className="text-lg text-black" />
                      </div>
                      <h4 className="text-lg font-semibold text-[var(--color-text-main)]">
                        Dịch vụ
                      </h4>
                    </div>
                    <div className="ml-13">
                      <div className="font-semibold text-[var(--color-text-main)] text-lg mb-1">
                        {bookingData.service}
                      </div>
                      {bookingData.serviceDetails && (
                        <>
                          <div className="text-[var(--color-gold)] font-bold text-lg mb-1">
                            {bookingData.serviceDetails.price}
                          </div>
                          <div className="text-sm text-[var(--color-text-muted)]">
                            Thời gian: {bookingData.serviceDetails.duration}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Barber Info */}
                  <div className="border-b border-[var(--color-border)] pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                        <FaUserTie className="text-lg text-black" />
                      </div>
                      <h4 className="text-lg font-semibold text-[var(--color-text-main)]">
                        Thợ barber
                      </h4>
                    </div>
                    <div className="ml-13">
                      <div className="font-semibold text-[var(--color-text-main)] text-lg mb-1">
                        {bookingData.barber}
                      </div>
                      {bookingData.barberDetails && (
                        <>
                          <div className="text-sm text-[var(--color-text-light)] mb-1">
                            Chuyên môn: {bookingData.barberDetails.specialty}
                          </div>
                          <div className="text-sm text-[var(--color-text-muted)]">
                            Kinh nghiệm: {bookingData.barberDetails.experience}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Time Info */}
                  <div className="border-b border-[var(--color-border)] pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                        <FaClock className="text-lg text-black" />
                      </div>
                      <h4 className="text-lg font-semibold text-[var(--color-text-main)]">
                        Thời gian
                      </h4>
                    </div>
                    <div className="ml-13">
                      <div className="font-semibold text-[var(--color-text-main)] text-lg mb-1">
                        {formatDate(bookingData.date)}
                      </div>
                      <div className="text-[var(--color-gold)] font-bold text-lg">
                        {bookingData.time}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {bookingData.notes && (
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-lg flex items-center justify-center">
                          <FaStickyNote className="text-lg text-black" />
                        </div>
                        <h4 className="text-lg font-semibold text-[var(--color-text-main)]">
                          Ghi chú
                        </h4>
                      </div>
                      <div className="ml-13">
                        <p className="text-[var(--color-text-light)] leading-relaxed">
                          {bookingData.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info & Actions */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="barber-box p-6">
                <h3 className="text-xl font-bold text-[var(--color-gold)] mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt /> Thông tin liên hệ
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--color-gold)]/20 rounded-lg">
                      <FaMapMarkerAlt className="text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--color-text-main)]">
                        Địa chỉ
                      </div>
                      <div className="text-[var(--color-text-light)]">
                        123 Đường ABC, Quận 1, TP.HCM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--color-gold)]/20 rounded-lg">
                      <FaPhone className="text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--color-text-main)]">
                        Điện thoại
                      </div>
                      <div className="text-[var(--color-text-light)]">
                        0123 456 789
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--color-gold)]/20 rounded-lg">
                      <FaEnvelope className="text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--color-text-main)]">
                        Email
                      </div>
                      <div className="text-[var(--color-text-light)]">
                        info@barbershop.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="barber-box p-6">
                <h3 className="text-xl font-bold text-[var(--color-gold)] mb-4">
                  Lưu ý quan trọng
                </h3>
                <div className="space-y-3 text-sm text-[var(--color-text-light)]">
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] font-bold">
                      •
                    </span>
                    <span>Vui lòng đến đúng giờ hẹn</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] font-bold">
                      •
                    </span>
                    <span>Hủy lịch trước 2 giờ nếu không thể đến</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] font-bold">
                      •
                    </span>
                    <span>Thanh toán tại cửa hàng</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] font-bold">
                      •
                    </span>
                    <span>Chúng tôi sẽ gọi điện xác nhận trước 1 ngày</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-12">
            <button
              onClick={handleBack}
              className="barber-btn flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <FaArrowLeft className="text-base" />
              <span>Quay lại</span>
            </button>

            <button
              onClick={handleConfirmBooking}
              className="barber-btn flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <FaCheckCircle className="text-base" />
              <span>Xác nhận đặt lịch</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingConfirmation;
