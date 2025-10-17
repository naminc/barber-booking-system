import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import "../theme.css";

const Booking = () => {
  const navigate = useNavigate();

  const handleStartBooking = () => {
    navigate("/booking/select-service");
  };


  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[#d4af37] rounded-full mb-6 shadow-lg">
              <FaCalendarAlt className="text-2xl text-black" />
            </div>
            <h2 className="barber-title text-4xl md:text-5xl mb-4 text-[var(--color-gold)]">
              ĐẶT LỊCH HẸN
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto leading-relaxed">
              Đặt lịch hẹn tại barber shop của chúng tôi để trải nghiệm dịch vụ
              chuyên nghiệp và chất lượng cao
            </p>
          </div>

          {/* Start Booking Button */}
          <div className="text-center mb-16">
            <button
              onClick={handleStartBooking}
              className="barber-btn flex items-center gap-4 mx-auto px-12 py-5 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <FaCalendarAlt className="text-2xl" />
              <span>Bắt đầu đặt lịch</span>
              <FaArrowRight className="text-xl" />
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Booking;
