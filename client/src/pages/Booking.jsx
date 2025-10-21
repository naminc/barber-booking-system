import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaCut,
  FaUserTie,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaAward,
} from "react-icons/fa";
import "../theme.css";

const Booking = () => {
  const navigate = useNavigate();

  const handleStartBooking = () => {
    navigate("/booking/select-service");
  };

  const features = [
    {
      icon: <FaCut className="text-3xl" />,
      title: "Dịch vụ đa dạng",
      description: "Hơn 10+ dịch vụ chăm sóc tóc và râu chuyên nghiệp",
    },
    {
      icon: <FaUserTie className="text-3xl" />,
      title: "Thợ giàu kinh nghiệm",
      description: "Đội ngũ barber 5-10 năm kinh nghiệm",
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Đặt lịch linh hoạt",
      description: "Chọn thời gian phù hợp với lịch trình của bạn",
    },
    {
      icon: <FaAward className="text-3xl" />,
      title: "Chất lượng đảm bảo",
      description: "Cam kết dịch vụ chất lượng cao, khách hàng hài lòng",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Chọn dịch vụ",
      description: "Lựa chọn dịch vụ phù hợp với nhu cầu",
      icon: <FaCut />,
    },
    {
      number: "2",
      title: "Chọn barber",
      description: "Chọn thợ cắt tóc yêu thích của bạn",
      icon: <FaUserTie />,
    },
    {
      number: "3",
      title: "Chọn thời gian",
      description: "Đặt ngày giờ thuận tiện nhất",
      icon: <FaClock />,
    },
    {
      number: "4",
      title: "Xác nhận",
      description: "Hoàn tất đặt lịch và nhận thông báo",
      icon: <FaCheckCircle />,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white overflow-hidden">
      <Header />

      <div className="px-4 py-20 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-gold)]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[var(--color-gold)] via-[#d4af37] to-[#c29e75] rounded-full mb-8 shadow-2xl animate-pulse">
              <FaCalendarAlt className="text-3xl text-black" />
            </div>
            <h1 className="barber-title text-5xl md:text-6xl lg:text-7xl mb-6 text-[var(--color-gold)] drop-shadow-lg">
              ĐẶT LỊCH HẸN
            </h1>
            <p className="text-[var(--color-text-light)] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
              Trải nghiệm dịch vụ cắt tóc và chăm sóc râu đẳng cấp <br />
              <span className="text-[var(--color-gold)]">Đặt lịch dễ dàng - Phục vụ tận tâm</span>
            </p>
            
            {/* CTA Button */}
            <button
              onClick={handleStartBooking}
              className="group relative barber-btn flex items-center gap-4 mx-auto px-14 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(194,158,117,0.4)] transition-all duration-300 hover:scale-110 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <FaCalendarAlt className="text-3xl relative z-10" />
              <span className="relative z-10">Bắt đầu đặt lịch</span>
              <FaArrowRight className="text-2xl relative z-10 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group barber-box p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,158,117,0.3)] cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-[var(--color-gold)]">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mb-20">
            <h2 className="barber-title text-3xl md:text-4xl text-center mb-12 text-[var(--color-gold)]">
              QUY TRÌNH ĐẶT LỊCH
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[var(--color-gold)] to-transparent"></div>
                  )}
                  
                  <div className="barber-box p-6 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    {/* Number Badge */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--color-gold)]/20 rounded-full flex items-center justify-center">
                      <span className="text-[var(--color-gold)] font-bold text-sm">
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-4 group-hover:rotate-12 transition-transform shadow-lg">
                      <div className="text-2xl text-black">{step.icon}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-light)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="barber-box p-8 md:p-12 mb-10 bg-gradient-to-br from-[var(--color-gold)]/10 to-transparent border-2 border-[var(--color-gold)]/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group hover:scale-110 transition-transform">
                <div className="text-4xl md:text-5xl font-bold text-[var(--color-gold)] mb-2">
                  1000+
                </div>
                <div className="text-sm text-[var(--color-text-light)]">
                  Khách hàng hài lòng
                </div>
              </div>
              <div className="group hover:scale-110 transition-transform">
                <div className="text-4xl md:text-5xl font-bold text-[var(--color-gold)] mb-2 flex items-center justify-center gap-2">
                  <FaStar className="text-3xl" /> 4.9
                </div>
                <div className="text-sm text-[var(--color-text-light)]">
                  Đánh giá trung bình
                </div>
              </div>
              <div className="group hover:scale-110 transition-transform">
                <div className="text-4xl md:text-5xl font-bold text-[var(--color-gold)] mb-2">
                  10+
                </div>
                <div className="text-sm text-[var(--color-text-light)]">
                  Năm kinh nghiệm
                </div>
              </div>
              <div className="group hover:scale-110 transition-transform">
                <div className="text-4xl md:text-5xl font-bold text-[var(--color-gold)] mb-2">
                  24/7
                </div>
                <div className="text-sm text-[var(--color-text-light)]">
                  Hỗ trợ đặt lịch
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <p className="text-[var(--color-text-light)] mb-4">
              Sẵn sàng để có mái tóc hoàn hảo?
            </p>
            <button
              onClick={handleStartBooking}
              className="group barber-btn flex items-center gap-3 mx-auto px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span>Đặt lịch ngay</span>
              <FaArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Booking;
