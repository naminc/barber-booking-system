import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowLeft,
  FaUserPlus,
} from "react-icons/fa";
import authApi from "../api/authApi";
import "../theme.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name) {
      setError("Trường họ tên không được để trống.");
      return;
    }
    if (!email) {
      setError("Trường email không được để trống.");
      return;
    }
    if (!password) {
      setError("Trường mật khẩu không được để trống.");
      return;
    }
    try {
      setLoading(true);
      const res = await authApi.register({ name, email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        console.log(res.user);
        navigate("/");
      } else if (res.error) {
        setError(res.error);
      } else {
        setError("Đăng ký thất bại, vui lòng thử lại.");
      }
    } catch (err) {
      if (err.error) setError(err.error);
      else if (err.message) setError(err.message);
      else setError("Có lỗi xảy ra, vui lòng thử lại.");
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

        <form onSubmit={onSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
              <FaUser className="inline mr-2" /> Họ và tên
            </label>
            <input
              type="text"
              className="barber-input pl-5"
              placeholder="Nhập họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
              <FaEnvelope className="inline mr-2" /> Email
            </label>
            <input
              type="email"
              className="barber-input pl-5"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
              <FaLock className="inline mr-2" /> Mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                className="barber-input pl-5"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="barber-btn w-full mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
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

export default Register;
