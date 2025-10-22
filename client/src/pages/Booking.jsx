import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaCut,
  FaUserTie,
  FaClock,
} from "react-icons/fa";
import "../theme.css";

const Booking = () => {
  const navigate = useNavigate();

  const handleStartBooking = () => {
    navigate("/booking/select-service");
  };

  const steps = [
    {
      number: "1",
      title: "Chọn dịch vụ",
      icon: <FaCut />,
    },
    {
      number: "2",
      title: "Chọn barber",
      icon: <FaUserTie />,
    },
    {
      number: "3",
      title: "Chọn thời gian",
      icon: <FaClock />,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-6 shadow-lg">
              <FaCalendarAlt className="text-3xl text-black" />
            </div>
            <h1 className="barber-title text-4xl md:text-5xl mb-4 text-[var(--color-gold)]">
              ĐẶT LỊCH HẸN
            </h1>
            <p className="text-[var(--color-text-light)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Trải nghiệm dịch vụ cắt tóc và chăm sóc râu đẳng cấp
            </p>

            {/* CTA Button */}
            <button
              onClick={handleStartBooking}
              className="group barber-btn flex items-center gap-3 mx-auto px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <FaCalendarAlt className="text-xl" />
              <span>Bắt đầu đặt lịch</span>
              <FaArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Steps */}
          <div className="barber-box p-8 mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-gold)] text-center mb-8">
              Quy trình đặt lịch
            </h2>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full flex items-center justify-center mb-3 shadow-lg">
                      <div className="text-2xl text-black">{step.icon}</div>
                    </div>
                    <div className="w-10 h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center mb-2">
                      <span className="text-black font-bold">
                        {step.number}
                      </span>
                    </div>
                    <span className="text-sm text-[var(--color-text-light)] text-center">
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <FaArrowRight className="text-[var(--color-gold)] text-xl hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="text-center">
            <p className="text-[var(--color-text-light)] text-sm">
              Chỉ với 3 bước đơn giản, bạn đã có thể đặt lịch hẹn tại barbershop
              của chúng tôi
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Booking;
