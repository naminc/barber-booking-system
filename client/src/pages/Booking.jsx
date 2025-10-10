import React, { useState } from "react";
import Header from "../components/Header";
import { FaCalendarAlt, FaClock, FaUserTie, FaCut, FaCheckCircle } from "react-icons/fa";
import "../theme.css";

const Booking = () => {
  const [form, setForm] = useState({
    service: "",
    barber: "",
    date: "",
    time: "",
  });

  const [success, setSuccess] = useState(false);

  const services = [
    "Cắt tóc nam + gội đầu",
    "Cạo râu + xả stress",
    "Uốn tóc nam",
    "Nhuộm tóc tạo kiểu",
  ];

  const barbers = ["Anh Hưng Barber", "Anh Tuấn", "Anh Kiên", "Anh Lộc"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.service || !form.barber || !form.date || !form.time) {
      alert("Vui lòng điền đầy đủ thông tin đặt lịch!");
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
    setForm({ service: "", barber: "", date: "", time: "" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-24 flex justify-center">
        <div className="barber-box w-full max-w-3xl p-8">
          <h2 className="barber-title text-3xl mb-6 flex items-center gap-2 justify-center">
            <FaCalendarAlt /> ĐẶT LỊCH HẸN
          </h2>

          {success && (
            <div className="mb-6 flex items-center justify-center gap-2 bg-green-500/20 border border-green-400/40 text-green-300 px-4 py-3 rounded-lg text-sm font-medium">
              <FaCheckCircle className="text-lg" />
              Đặt lịch thành công! Chúng tôi sẽ liên hệ để xác nhận sớm nhất.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaCut className="inline-block mr-2" /> Chọn dịch vụ
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="barber-input appearance-none"
              >
                <option value="">-- Chọn dịch vụ --</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Barber: Thợ Barber */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaUserTie className="inline-block mr-2" /> Chọn thợ Barber
              </label>
              <select
                value={form.barber}
                onChange={(e) => setForm({ ...form, barber: e.target.value })}
                className="barber-input appearance-none"
              >
                <option value="">-- Chọn barber --</option>
                {barbers.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Date: Ngày hẹn */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaCalendarAlt className="inline-block mr-2" /> Ngày hẹn
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="barber-input [color-scheme:dark]"
              />
            </div>

            {/* Time: Giờ hẹn */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaClock className="inline-block mr-2" /> Giờ hẹn
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="barber-input [color-scheme:dark]"
              />
            </div>

            {/* Button: Xác nhận đặt lịch */}
            <div className="text-center pt-4">
              <button type="submit" className="barber-btn flex items-center gap-2 mx-auto px-8 py-3">
                <FaCalendarAlt className="text-lg" /> Xác nhận đặt lịch
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Booking;