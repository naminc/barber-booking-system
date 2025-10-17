import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";
import "../theme.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullname || !form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      navigate("/login");
    } catch {
      setError("Đăng ký thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white px-4 sm:px-6 md:px-8">
      <Link
        to="/"
        className="absolute top-5 left-4 flex items-center gap-2 barber-link text-sm font-medium"
      >
        <FaArrowLeft className="text-xs" />
        <span>Quay lại trang chủ</span>
      </Link>

      <div
        className="barber-box w-full max-w-sm sm:max-w-md bg-[#111]/90 backdrop-blur-md border border-[#c29e75]/30 
                 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-6 sm:p-8 text-center"
      >
        <img
          src="https://static.vecteezy.com/system/resources/previews/043/182/089/non_2x/logo-barbershop-vintage-retro-logo-template-free-vector.jpg"
          alt="Logo"
          className="mx-auto mb-4 w-24 h-24 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] rounded-full barber-avatar bg-[#1a1a1a]/40 p-1"
          onError={(e) => (e.target.style.display = "none")}
        />
        <h1 className="barber-title text-3xl mb-1">ĐĂNG KÝ TÀI KHOẢN</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Tạo tài khoản mới để đặt lịch và nhận ưu đãi.
        </p>

        {error && (
          <div className="bg-red-600/20 text-red-200 text-sm font-medium px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
              <FaUser className="inline mr-2" /> Họ tên
            </label>
            <div className="relative">
              <input
                name="fullname"
                type="text"
                className="barber-input pl-5"
                placeholder="Nguyễn Văn B"
                value={form.fullname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
              <FaEnvelope className="inline mr-2" /> Email
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                className="barber-input pl-5"
                placeholder="you@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
              <FaLock className="inline mr-2" /> Mật khẩu
            </label>
            <div className="relative">
              <input
                name="password"
                type="password"
                className="barber-input pl-5"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="barber-btn w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <FaUserPlus className="text-base" />
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-center text-sm mt-4">
            Đã có tài khoản?{" "}
            <Link to="/login" className="barber-link font-semibold">
              Đăng nhập ngay
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;