import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowLeft, FaSignInAlt } from "react-icons/fa";
import { useForm, useAuth, useNotification } from "../hooks";
import "../theme.css";

const Login = () => {
  const navigate = useNavigate();
  const { values: form, handleChange } = useForm({
    email: "",
    password: "",
  });
  const { loading, login } = useAuth();
  const { error, showError, clearNotifications } = useNotification();
  const onSubmit = async (e) => {
    e.preventDefault();
    clearNotifications();
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      showError(err.error || "Có lỗi xảy ra, vui lòng thử lại.");
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
        <h1 className="barber-title text-3xl mb-1">ĐĂNG NHẬP</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Chào mừng bạn quay lại tiệm Barber
        </p>

        {error && (
          <div className="bg-red-600/20 text-red-200 text-sm font-medium px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
              <FaEnvelope className="inline mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              className="barber-input pl-5"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
              <FaLock className="inline mr-2" /> Mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                className="barber-input pl-5"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="accent-[var(--color-gold)]" />{" "}
              Ghi nhớ tôi
            </label>
            <Link to="/forgot-password" className="barber-link">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="barber-btn w-full mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <FaSignInAlt className="text-base" />
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-center text-sm mt-4">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="barber-link font-semibold">
              Đăng ký ngay
            </Link>
          </p>
        </form>

        <div className="mt-8 text-center text-sm border-t border-[rgba(194,158,117,0.2)] pt-4">
          <span>Hoặc đặt lịch nhanh: </span>
          <a href="tel:+84347101143" className="barber-link font-semibold">
            +84 347 101 143
          </a>
        </div>
      </div>
    </main>
  );
};

export default Login;
