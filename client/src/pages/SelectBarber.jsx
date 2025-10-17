import React, { useState } from "react";
import Header from "../components/Header";
import {
  FaUserTie,
  FaArrowRight,
  FaArrowLeft,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { useBookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import "../theme.css";

const SelectBarber = () => {
  const { bookingData, updateBookingData } = useBookingContext();
  const navigate = useNavigate();
  const [selectedBarber, setSelectedBarber] = useState(
    bookingData.barber || ""
  );

  const barbers = [
    {
      name: "Anh Hưng Barber",
      rating: 5,
      specialty: "Cắt tóc nam",
      experience: "8 năm",
      avatar: "👨‍💼",
    },
    {
      name: "Anh Tuấn",
      rating: 4.8,
      specialty: "Cạo râu",
      experience: "6 năm",
      avatar: "👨‍🎨",
    },
    {
      name: "Anh Kiên",
      rating: 4.9,
      specialty: "Tạo kiểu",
      experience: "5 năm",
      avatar: "👨‍🎭",
    },
    {
      name: "Anh Lộc",
      rating: 4.7,
      specialty: "Nhuộm tóc",
      experience: "7 năm",
      avatar: "👨‍🔬",
    },
  ];

  const handleBarberSelect = (barber) => {
    setSelectedBarber(barber.name);
    updateBookingData({ barber: barber.name, barberDetails: barber });
  };

  const handleNext = () => {
    if (!selectedBarber) {
      alert("Vui lòng chọn thợ barber trước khi tiếp tục");
      return;
    }
    navigate("/booking/select-time");
  };

  const handleBack = () => {
    navigate("/booking/select-service");
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-sm ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-6 shadow-lg">
              <FaUserTie className="text-2xl text-black" />
            </div>
            <h2 className="barber-title text-4xl md:text-5xl mb-4 text-[var(--color-gold)]">
              CHỌN THỢ BARBER
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto leading-relaxed">
              Chọn thợ barber phù hợp với dịch vụ bạn đã chọn
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-12 px-4">
            <div className="flex items-center space-x-2 sm:space-x-4 max-w-full">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm sm:text-base">1</span>
                </div>
                <span className="text-[var(--color-gold)] font-semibold text-xs sm:text-sm mt-1">
                  Dịch vụ
                </span>
              </div>
              <div className="w-8 sm:w-16 h-0.5 bg-[var(--color-gold)]"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm sm:text-base">2</span>
                </div>
                <span className="text-[var(--color-gold)] font-semibold text-xs sm:text-sm mt-1">
                  Barber
                </span>
              </div>
              <div className="w-8 sm:w-16 h-0.5 bg-[var(--color-border)]"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--color-border)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--color-text-muted)] font-bold text-sm sm:text-base">
                    3
                  </span>
                </div>
                <span className="text-[var(--color-text-muted)] text-xs sm:text-sm mt-1">
                  Thời gian
                </span>
              </div>
            </div>
          </div>

          {/* Selected Service Info */}
          {bookingData.service && (
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/30 px-4 py-2 rounded-lg">
                <span className="text-[var(--color-gold)] font-semibold">
                  Dịch vụ đã chọn:
                </span>
                <span className="text-[var(--color-text-main)]">
                  {bookingData.service}
                </span>
              </div>
            </div>
          )}

          {/* Barbers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {barbers.map((barber, index) => (
              <div
                key={index}
                onClick={() => handleBarberSelect(barber)}
                className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  selectedBarber === barber.name
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 shadow-lg"
                    : "border-[var(--color-border)] bg-[var(--color-dark-bg2)] hover:border-[var(--color-gold)]/50 hover:shadow-md"
                }`}
              >
                <div className="p-6 text-center">
                  {/* Avatar */}
                  <div className="text-6xl mb-4">
                    {barber.avatar}
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-2">
                    {barber.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {renderStars(barber.rating)}
                    <span className="text-sm text-[var(--color-text-light)]">
                      {barber.rating}/5
                    </span>
                  </div>
                  
                  {/* Specialty */}
                  <div className="text-sm text-[var(--color-gold)] font-semibold mb-2">
                    {barber.specialty}
                  </div>
                  
                  {/* Experience */}
                  <div className="text-xs text-[var(--color-text-muted)] mb-4">
                    {barber.experience} kinh nghiệm
                  </div>
                  
                  {/* Selection Indicator */}
                  {selectedBarber === barber.name && (
                    <div className="flex items-center justify-center">
                      <FaCheckCircle className="text-[var(--color-gold)] text-xl" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
            <button
              onClick={handleBack}
              className="barber-btn flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <FaArrowLeft className="text-base" />
              <span>Quay lại</span>
            </button>

            <button
              onClick={handleNext}
              className={`barber-btn flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                !selectedBarber ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedBarber}
            >
              <span>Tiếp tục</span>
              <FaArrowRight className="text-base" />
            </button>
          </div>
          
          {!selectedBarber && (
            <div className="text-center mt-4">
              <p className="text-[var(--color-text-muted)] text-sm">
                Vui lòng chọn thợ barber để tiếp tục
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SelectBarber;