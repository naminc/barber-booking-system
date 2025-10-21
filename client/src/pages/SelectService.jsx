import React, { useState } from "react";
import Header from "../components/Header";
import { FaCut, FaArrowRight, FaClock, FaCheckCircle } from "react-icons/fa";
import { useBookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import "../theme.css";

const SelectService = () => {
  const { bookingData, updateBookingData } = useBookingContext();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(
    bookingData.service || ""
  );

  const services = [
    {
      name: "Cắt tóc nam + gội đầu",
      price: "150,000đ",
      duration: "45 phút",
      description: "Cắt tóc nam chuyên nghiệp kèm gội đầu và tạo kiểu",
      icon: "✂️",
    },
    {
      name: "Cạo râu + xả stress",
      price: "200,000đ",
      duration: "60 phút",
      description: "Cạo râu truyền thống kèm massage mặt thư giãn",
      icon: "🪒",
    },
    {
      name: "Uốn tóc nam",
      price: "300,000đ",
      duration: "90 phút",
      description: "Uốn tóc nam tạo kiểu cá tính và thời trang",
      icon: "💇",
    },
    {
      name: "Nhuộm tóc tạo kiểu",
      price: "400,000đ",
      duration: "120 phút",
      description: "Nhuộm tóc nam với nhiều màu sắc và kiểu dáng hiện đại",
      icon: "🎨",
    },
    {
      name: "Cắt tóc + cạo râu combo",
      price: "300,000đ",
      duration: "75 phút",
      description: "Combo cắt tóc và cạo râu với giá ưu đãi",
      icon: "💫",
    },
    {
      name: "Massage đầu + gội",
      price: "100,000đ",
      duration: "30 phút",
      description: "Massage đầu thư giãn kèm gội đầu sạch sẽ",
      icon: "🧴",
    },
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service.name);
    updateBookingData({ service: service.name, serviceDetails: service });
  };

  const handleNext = () => {
    if (!selectedService) {
      alert("Vui lòng chọn dịch vụ trước khi tiếp tục");
      return;
    }
    navigate("/booking/select-barber");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-6 shadow-lg">
              <FaCut className="text-2xl text-black" />
            </div>
            <h2 className="barber-title text-4xl md:text-5xl mb-4 text-[var(--color-gold)]">
              CHỌN DỊCH VỤ
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto leading-relaxed">
              Chọn dịch vụ phù hợp với nhu cầu của bạn
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
              <div className="w-8 sm:w-16 h-0.5 bg-[var(--color-border)]"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--color-border)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--color-text-muted)] font-bold text-sm sm:text-base">
                    2
                  </span>
                </div>
                <span className="text-[var(--color-text-muted)] text-xs sm:text-sm mt-1">
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

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceSelect(service)}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                  selectedService === service.name
                    ? "border-[var(--color-gold)] bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 shadow-[0_0_30px_rgba(194,158,117,0.4)] scale-105"
                    : "border-[var(--color-border)] bg-[var(--color-dark-bg2)] hover:border-[var(--color-gold)]/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-105"
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                {/* Selection indicator badge */}
                {selectedService === service.name && (
                  <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-gold)] rounded-full flex items-center justify-center shadow-lg animate-bounce z-20">
                    <FaCheckCircle className="text-black text-2xl" />
                  </div>
                )}

                <div className="p-7 relative z-10">
                  {/* Icon with glow effect */}
                  <div className="mb-5">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${
                        selectedService === service.name
                          ? "bg-[var(--color-gold)] shadow-[0_0_20px_rgba(194,158,117,0.5)] scale-110"
                          : "bg-[var(--color-gold)]/10 group-hover:bg-[var(--color-gold)]/20 group-hover:scale-110"
                      }`}
                    >
                      <div
                        className={`text-4xl transition-transform group-hover:scale-110 ${
                          selectedService === service.name ? "grayscale-0" : ""
                        }`}
                      >
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-[var(--color-text-light)] text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mb-5"></div>

                  {/* Price and Duration */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-[var(--color-text-muted)] mb-1">
                        Giá dịch vụ
                      </span>
                      <span className="text-[var(--color-gold)] font-bold text-xl group-hover:scale-110 inline-block transition-transform origin-left">
                        {service.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-dark-bg)] rounded-lg border border-[var(--color-border)]">
                      <FaClock className="text-[var(--color-gold)] text-sm" />
                      <span className="text-[var(--color-text-light)] text-sm font-medium">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom highlight line for selected */}
                {selectedService === service.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Next Button */}
          <div className="text-center">
            <button
              onClick={handleNext}
              className={`flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                selectedService
                  ? "barber-btn"
                  : "bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed"
              }`}
              disabled={!selectedService}
            >
              <span>Tiếp tục</span>
              <FaArrowRight className="text-base" />
            </button>

            {!selectedService && (
              <p className="text-[var(--color-text-muted)] text-sm mt-3">
                Vui lòng chọn dịch vụ để tiếp tục
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SelectService;
