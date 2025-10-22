import React, { useState } from "react";
import Header from "../components/Header";
import { FaCut, FaArrowRight, FaClock, FaCheckCircle } from "react-icons/fa";
import { useBookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { useServices } from "../hooks";
import "../theme.css";

const SelectService = () => {
  const { bookingData, updateBookingData } = useBookingContext();
  const navigate = useNavigate();
  const { services: allServices, loading } = useServices();
  const [selectedService, setSelectedService] = useState(
    bookingData.service || ""
  );

  // Lọc chỉ lấy dịch vụ active
  const services = allServices.filter((s) => s.status === "active");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    return `${apiUrl.replace("/api", "")}${imagePath}`;
  };

  const getServiceIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("cắt")) return "✂️";
    if (lowerName.includes("râu") || lowerName.includes("cạo")) return "🪒";
    if (lowerName.includes("uốn")) return "💇";
    if (lowerName.includes("nhuộm") || lowerName.includes("màu")) return "🎨";
    if (lowerName.includes("gội") || lowerName.includes("massage")) return "🧴";
    if (lowerName.includes("combo")) return "💫";
    return "✨";
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service.id);
    updateBookingData({
      serviceId: service.id,
      service: service.name,
      serviceDetails: {
        ...service,
        price: formatPrice(service.price),
        duration: service.duration ? `${service.duration} phút` : "N/A",
      },
    });
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
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-4 animate-spin">
                <FaClock className="text-2xl text-black" />
              </div>
              <p className="text-[var(--color-text-light)] text-lg">
                Đang tải dịch vụ...
              </p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--color-text-muted)] text-lg">
                Chưa có dịch vụ nào
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                    selectedService === service.id
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
                  {selectedService === service.id && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-[var(--color-gold)] rounded-full flex items-center justify-center shadow-lg animate-bounce z-20">
                      <FaCheckCircle className="text-black text-2xl" />
                    </div>
                  )}

                  <div className="p-7 relative z-10">
                    {/* Icon/Image with glow effect */}
                    <div className="mb-5">
                      <div
                        className={`inline-flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 overflow-hidden ${
                          selectedService === service.id
                            ? "bg-[var(--color-gold)]/20 border-2 border-[var(--color-gold)] shadow-[0_0_20px_rgba(194,158,117,0.5)] scale-110"
                            : "bg-[var(--color-gold)]/10 group-hover:bg-[var(--color-gold)]/20 group-hover:scale-110"
                        }`}
                      >
                        {service.image && getImageUrl(service.image) ? (
                          <img
                            src={getImageUrl(service.image)}
                            alt={service.name}
                            className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
                          />
                        ) : (
                          <div
                            className={`text-4xl transition-transform group-hover:scale-110 ${
                              selectedService === service.id
                                ? "text-[var(--color-gold)]"
                                : ""
                            }`}
                          >
                            {getServiceIcon(service.name)}
                          </div>
                        )}
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
                          {formatPrice(service.price)}
                        </span>
                      </div>
                      {service.duration && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-dark-bg)] rounded-lg border border-[var(--color-border)]">
                          <FaClock className="text-[var(--color-gold)] text-sm" />
                          <span className="text-[var(--color-text-light)] text-sm font-medium">
                            {service.duration} phút
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom highlight line for selected */}
                  {selectedService === service.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          )}

          <style>{`
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
