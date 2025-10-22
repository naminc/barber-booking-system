import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  FaClock,
  FaArrowRight,
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaUserTie,
  FaCut,
  FaStickyNote,
} from "react-icons/fa";
import { useBookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import "../theme.css";

const SelectTime = () => {
  const { bookingData, updateBookingData } = useBookingContext();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(bookingData.date || "");
  const [selectedTime, setSelectedTime] = useState(bookingData.time || "");
  const [notes, setNotes] = useState(bookingData.notes || "");
  const [availableTimes, setAvailableTimes] = useState([]);

  // Generate available times based on barber's working hours
  const generateAvailableTimes = (barberName) => {
    const workingHours = {
      "Anh Hưng Barber": { start: 8, end: 20 },
      "Anh Tuấn": { start: 9, end: 19 },
      "Anh Kiên": { start: 10, end: 21 },
      "Anh Lộc": { start: 9, end: 18 },
    };

    const hours = workingHours[barberName] || { start: 9, end: 18 };
    const times = [];

    for (let hour = hours.start; hour < hours.end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        times.push(timeString);
      }
    }

    return times;
  };

  useEffect(() => {
    if (bookingData.barber) {
      setAvailableTimes(generateAvailableTimes(bookingData.barber));
    }
  }, [bookingData.barber]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateBookingData({ date });
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    updateBookingData({ time });
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    updateBookingData({ notes: e.target.value });
  };

  const handleNext = () => {
    if (!selectedDate) {
      alert("Vui lòng chọn ngày hẹn");
      return;
    }
    if (!selectedTime) {
      alert("Vui lòng chọn giờ hẹn");
      return;
    }
    navigate("/booking/confirmation");
  };

  const handleBack = () => {
    navigate("/booking/select-barber");
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

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // Allow booking up to 30 days in advance
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-6 shadow-lg">
              <FaClock className="text-2xl text-black" />
            </div>
            <h2 className="barber-title text-4xl md:text-5xl mb-4 text-[var(--color-gold)]">
              CHỌN THỜI GIAN
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto leading-relaxed">
              Chọn ngày và giờ phù hợp cho lịch hẹn của bạn
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
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="barber-box p-8">
                <h3 className="text-2xl font-bold text-[var(--color-gold)] mb-6 flex items-center gap-2">
                  <FaCalendarAlt /> Chọn thời gian
                </h3>

                {/* Date Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3 text-[var(--color-gold)]">
                    <FaCalendarAlt className="inline-block mr-2" /> Chọn ngày *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="barber-input [color-scheme:dark] w-full"
                  />
                  {selectedDate && (
                    <p className="text-[var(--color-text-light)] text-sm mt-2">
                      {formatDate(selectedDate)}
                    </p>
                  )}
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div className="mb-8">
                    <label className="block text-sm font-semibold mb-4 text-[var(--color-gold)]">
                      <FaClock className="inline-block mr-2" /> Chọn giờ *
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {availableTimes.map((time, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(time)}
                          className={`group relative p-4 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                            selectedTime === time
                              ? "border-[var(--color-gold)] bg-gradient-to-br from-[var(--color-gold)]/30 to-[var(--color-gold)]/10 text-[var(--color-gold)] shadow-[0_0_20px_rgba(194,158,117,0.3)] scale-105"
                              : "border-[var(--color-border)] hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 hover:scale-105"
                          }`}
                          style={{
                            animation: `fadeInScale 0.4s ease-out ${
                              index * 0.02
                            }s both`,
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                          {/* Time Display */}
                          <div className="relative z-10 text-center">
                            <div
                              className={`font-bold text-base mb-1 ${
                                selectedTime === time
                                  ? "text-[var(--color-gold)]"
                                  : "text-[var(--color-text-main)]"
                              }`}
                            >
                              {time}
                            </div>
                            {selectedTime === time && (
                              <FaCheckCircle className="text-[var(--color-gold)] text-xs mx-auto" />
                            )}
                          </div>

                          {/* Selection indicator line */}
                          {selectedTime === time && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <style>{`
                  @keyframes fadeInScale {
                    from {
                      opacity: 0;
                      transform: scale(0.8);
                    }
                    to {
                      opacity: 1;
                      transform: scale(1);
                    }
                  }
                `}</style>

                {/* Notes Field */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3 text-[var(--color-gold)]">
                    <FaStickyNote className="inline-block mr-2" /> Ghi chú thêm
                  </label>
                  <textarea
                    value={notes}
                    onChange={handleNotesChange}
                    className="barber-textarea w-full"
                    rows={4}
                    placeholder="Nhập ghi chú hoặc yêu cầu đặc biệt (không bắt buộc)..."
                  />
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6 sticky top-24">
              <div className="barber-box p-6 bg-gradient-to-br from-[var(--color-gold)]/10 to-transparent border-2 border-[var(--color-gold)]/30">
                <h3 className="text-2xl font-bold text-[var(--color-gold)] mb-6 text-center">
                  Thông tin đặt lịch
                </h3>

                {/* Selected Service */}
                {bookingData.service && (
                  <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[var(--color-gold)]/20 rounded-full flex items-center justify-center">
                        <FaCut className="text-[var(--color-gold)]" />
                      </div>
                      <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                        Dịch vụ
                      </h4>
                    </div>
                    <div className="ml-13 space-y-2">
                      <div className="font-bold text-[var(--color-text-main)] text-lg">
                        {bookingData.service}
                      </div>
                      {bookingData.serviceDetails && (
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--color-gold)] font-bold text-xl">
                            {bookingData.serviceDetails.price}
                          </span>
                          <span className="text-sm text-[var(--color-text-muted)] bg-[var(--color-dark-bg)] px-3 py-1 rounded-full">
                            <FaClock className="inline mr-1" />
                            {bookingData.serviceDetails.duration}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Selected Barber */}
                {bookingData.barber && (
                  <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[var(--color-gold)]/20 rounded-full flex items-center justify-center">
                        <FaUserTie className="text-[var(--color-gold)]" />
                      </div>
                      <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                        Barber
                      </h4>
                    </div>
                    <div className="ml-13 space-y-2">
                      <div className="font-bold text-[var(--color-text-main)] text-lg">
                        {bookingData.barber}
                      </div>
                      {bookingData.barberDetails && (
                        <div className="space-y-1">
                          <div className="text-sm text-[var(--color-gold)] font-medium">
                            {bookingData.barberDetails.specialty}
                          </div>
                          <div className="text-xs text-[var(--color-text-muted)]">
                            <FaCheckCircle className="inline mr-1" />
                            {bookingData.barberDetails.experience} kinh nghiệm
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Selected Time */}
                {(selectedDate || selectedTime) && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[var(--color-gold)]/20 rounded-full flex items-center justify-center">
                        <FaClock className="text-[var(--color-gold)]" />
                      </div>
                      <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                        Thời gian
                      </h4>
                    </div>
                    <div className="ml-13 space-y-3">
                      {selectedDate && (
                        <div className="bg-[var(--color-dark-bg)] p-3 rounded-lg">
                          <div className="text-xs text-[var(--color-text-muted)] mb-1">
                            Ngày hẹn
                          </div>
                          <div className="font-semibold text-[var(--color-text-main)]">
                            <FaCalendarAlt className="inline mr-2 text-[var(--color-gold)]" />
                            {formatDate(selectedDate)}
                          </div>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="bg-[var(--color-gold)]/10 p-3 rounded-lg border border-[var(--color-gold)]/30">
                          <div className="text-xs text-[var(--color-gold)] mb-1">
                            Giờ hẹn
                          </div>
                          <div className="font-bold text-[var(--color-gold)] text-xl">
                            <FaClock className="inline mr-2" />
                            {selectedTime}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Completion Status */}
                {selectedDate && selectedTime && (
                  <div className="mt-6 pt-6 border-t border-[var(--color-gold)]/30">
                    <div className="flex items-center justify-center gap-2 text-green-500">
                      <FaCheckCircle className="text-lg animate-pulse" />
                      <span className="font-semibold">Sẵn sàng xác nhận</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-12">
            <button
              onClick={handleBack}
              className="barber-btn flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <FaArrowLeft className="text-base" />
              <span>Quay lại</span>
            </button>

            <button
              onClick={handleNext}
              className="barber-btn flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <span>Xác nhận</span>
              <FaCheckCircle className="text-base" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SelectTime;
