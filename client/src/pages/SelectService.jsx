import React, { useState } from "react";
import Header from "../components/Header";
import { FaCut, FaArrowRight, FaClock, FaCheckCircle } from "react-icons/fa";
import { useBookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import "../theme.css";

const SelectService = () => {
  const { bookingData, updateBookingData } = useBookingContext();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(bookingData.service || "");

  const services = [
    { 
      name: "Cắt tóc nam + gội đầu", 
      price: "150,000đ", 
      duration: "45 phút",
      description: "Cắt tóc nam chuyên nghiệp kèm gội đầu và tạo kiểu",
      icon: "✂️"
    },
    { 
      name: "Cạo râu + xả stress", 
      price: "200,000đ", 
      duration: "60 phút",
      description: "Cạo râu truyền thống kèm massage mặt thư giãn",
      icon: "🪒"
    },
    { 
      name: "Uốn tóc nam", 
      price: "300,000đ", 
      duration: "90 phút",
      description: "Uốn tóc nam tạo kiểu cá tính và thời trang",
      icon: "💇"
    },
    { 
      name: "Nhuộm tóc tạo kiểu", 
      price: "400,000đ", 
      duration: "120 phút",
      description: "Nhuộm tóc nam với nhiều màu sắc và kiểu dáng hiện đại",
      icon: "🎨"
    },
    { 
      name: "Cắt tóc + cạo râu combo", 
      price: "300,000đ", 
      duration: "75 phút",
      description: "Combo cắt tóc và cạo râu với giá ưu đãi",
      icon: "💫"
    },
    { 
      name: "Massage đầu + gội", 
      price: "100,000đ", 
      duration: "30 phút",
      description: "Massage đầu thư giãn kèm gội đầu sạch sẽ",
      icon: "🧴"
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
                  <span className="text-black font-bold text-sm sm:text-base">1</span>
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
                className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  selectedService === service.name
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 shadow-lg"
                    : "border-[var(--color-border)] bg-[var(--color-dark-bg2)] hover:border-[var(--color-gold)]/50 hover:shadow-md"
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">
                      {service.icon}
                    </div>
                    {selectedService === service.name && (
                      <FaCheckCircle className="text-[var(--color-gold)] text-xl" />
                    )}
                  </div>
                  
                  {/* Service Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-2">
                      {service.name}
                    </h3>
                    
                    <p className="text-[var(--color-text-light)] text-sm leading-relaxed mb-3">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Price and Duration */}
                  <div className="flex items-center justify-between">
                    <div className="text-[var(--color-gold)] font-bold text-lg">
                      {service.price}
                    </div>
                    <div className="flex items-center gap-1 text-[var(--color-text-muted)] text-sm">
                      <FaClock className="text-xs" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
