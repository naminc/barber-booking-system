import React, { useState } from "react";
import Header from "../components/Header";
import {
  FaCalendarAlt,
  FaClock,
  FaUserTie,
  FaCut,
  FaCheckCircle,
  FaStickyNote,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import "../theme.css";

const Booking = () => {
  const [form, setForm] = useState({
    service: "",
    barber: "",
    date: "",
    time: "",
    notes: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const services = [
    { name: "Cắt tóc nam + gội đầu", price: "150,000đ", duration: "45 phút" },
    { name: "Cạo râu + xả stress", price: "200,000đ", duration: "60 phút" },
    { name: "Uốn tóc nam", price: "300,000đ", duration: "90 phút" },
    { name: "Nhuộm tóc tạo kiểu", price: "400,000đ", duration: "120 phút" },
    { name: "Cắt tóc + cạo râu combo", price: "300,000đ", duration: "75 phút" },
    { name: "Massage đầu + gội", price: "100,000đ", duration: "30 phút" },
  ];

  const barbers = [
    {
      name: "Anh Hưng Barber",
      rating: 5,
      specialty: "Cắt tóc nam",
      experience: "8 năm",
    },
    {
      name: "Anh Tuấn",
      rating: 4.8,
      specialty: "Cạo râu",
      experience: "6 năm",
    },
    {
      name: "Anh Kiên",
      rating: 4.9,
      specialty: "Tạo kiểu",
      experience: "5 năm",
    },
    {
      name: "Anh Lộc",
      rating: 4.7,
      specialty: "Nhuộm tóc",
      experience: "7 năm",
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!form.service) {
      newErrors.service = "Vui lòng chọn dịch vụ";
    }
    if (!form.barber) {
      newErrors.barber = "Vui lòng chọn thợ barber";
    }
    if (!form.date) {
      newErrors.date = "Vui lòng chọn ngày hẹn";
    }
    if (!form.time) {
      newErrors.time = "Vui lòng chọn giờ hẹn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
    setForm({
      service: "",
      barber: "",
      date: "",
      time: "",
      notes: "",
    });
    setErrors({});
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="barber-title text-4xl md:text-5xl mb-4 flex items-center justify-center gap-3">
              <FaCalendarAlt className="text-[var(--color-gold)]" />
              ĐẶT LỊCH HẸN
            </h2>
            <p className="text-[var(--color-text-light)] text-lg max-w-2xl mx-auto">
              Đặt lịch hẹn tại barber shop của chúng tôi để trải nghiệm dịch vụ
              chuyên nghiệp và chất lượng cao
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-8 flex items-center justify-center gap-3 bg-green-500/20 border border-green-400/40 text-green-300 px-6 py-4 rounded-xl text-base font-medium max-w-2xl mx-auto">
              <FaCheckCircle className="text-xl" />
              <div>
                <div className="font-semibold">Đặt lịch thành công!</div>
                <div className="text-sm">
                  Chúng tôi sẽ liên hệ để xác nhận sớm nhất có thể.
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="barber-box">
                <h2 className="text-2xl font-bold text-[var(--color-gold)] mb-6 flex items-center gap-2">
                  <FaCalendarAlt /> Thông tin đặt lịch
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                      <FaCut className="inline-block mr-2" /> Chọn dịch vụ *
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className={`barber-input appearance-none ${
                        errors.service ? "border-red-400" : ""
                      }`}
                    >
                      <option value="">-- Chọn dịch vụ --</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.name}>
                          {service.name} - {service.price} ({service.duration})
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Barber Selection */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                      <FaUserTie className="inline-block mr-2" /> Chọn thợ
                      barber *
                    </label>
                    <select
                      value={form.barber}
                      onChange={(e) =>
                        setForm({ ...form, barber: e.target.value })
                      }
                      className={`barber-input appearance-none ${
                        errors.barber ? "border-red-400" : ""
                      }`}
                    >
                      <option value="">-- Chọn thợ barber --</option>
                      {barbers.map((barber, index) => (
                        <option key={index} value={barber.name}>
                          {barber.name} - {barber.specialty} (
                          {barber.experience})
                        </option>
                      ))}
                    </select>
                    {errors.barber && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.barber}
                      </p>
                    )}
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                        <FaCalendarAlt className="inline-block mr-2" /> Ngày hẹn
                        *
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        className={`barber-input [color-scheme:dark] ${
                          errors.date ? "border-red-400" : ""
                        }`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.date && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                        <FaClock className="inline-block mr-2" /> Giờ hẹn *
                      </label>
                      <input
                        type="time"
                        value={form.time}
                        onChange={(e) =>
                          setForm({ ...form, time: e.target.value })
                        }
                        className={`barber-input [color-scheme:dark] ${
                          errors.time ? "border-red-400" : ""
                        }`}
                      />
                      {errors.time && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Notes Field */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                      <FaStickyNote className="inline-block mr-2" /> Ghi chú
                      thêm
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      className="barber-textarea"
                      rows={4}
                      placeholder="Nhập ghi chú hoặc yêu cầu đặc biệt (không bắt buộc)..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <button
                      type="submit"
                      className="barber-btn flex items-center gap-4 mx-auto px-8 py-3 text-lg font-semibold"
                    >
                      <FaCalendarAlt className="text-xl" />
                      Xác nhận đặt lịch
                    </button>
                  </div>
                </form>
              </div>
              {/* Contact Info Section */}
              <div className="mt-12">
                <div className="barber-box max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-[var(--color-gold)] mb-6 flex items-center gap-2">
                    <FaMapMarkerAlt /> Thông tin liên hệ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[var(--color-gold)]/20 rounded-lg">
                        <FaMapMarkerAlt className="text-[var(--color-gold)] text-lg" />
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
                      <div className="p-3 bg-[var(--color-gold)]/20 rounded-lg">
                        <FaPhone className="text-[var(--color-gold)] text-lg" />
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
                      <div className="p-3 bg-[var(--color-gold)]/20 rounded-lg">
                        <FaEnvelope className="text-[var(--color-gold)] text-lg" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-text-main)]">
                          Email
                        </div>
                        <div className="text-[var(--color-text-light)]">
                          info@naminc.dev
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Services Info */}
              <div className="barber-box">
                <h3 className="text-xl font-bold text-[var(--color-gold)] mb-4 flex items-center gap-2">
                  <FaCut /> Dịch vụ của chúng tôi
                </h3>
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="border-b border-[var(--color-border)] pb-3 last:border-b-0"
                    >
                      <div className="font-semibold text-[var(--color-text-main)]">
                        {service.name}
                      </div>
                      <div className="text-sm text-[var(--color-gold)]">
                        {service.price}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">
                        {service.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barbers Info */}
              <div className="barber-box">
                <h3 className="text-xl font-bold text-[var(--color-gold)] mb-4 flex items-center gap-2">
                  <FaUserTie /> Thợ barber
                </h3>
                <div className="space-y-3">
                  {barbers.map((barber, index) => (
                    <div
                      key={index}
                      className="border-b border-[var(--color-border)] pb-3 last:border-b-0"
                    >
                      <div className="font-semibold text-[var(--color-text-main)]">
                        {barber.name}
                      </div>
                      <div className="text-sm text-[var(--color-text-light)]">
                        {barber.specialty}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                        <FaStar className="text-yellow-400" />
                        {barber.rating} • {barber.experience}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Booking;
