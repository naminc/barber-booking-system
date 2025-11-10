import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { FaLock, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import authApi from "../api/authApi";
import "../theme.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Token không hợp lệ. Vui lòng kiểm tra lại liên kết.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!token) {
      setError("Token không hợp lệ. Vui lòng kiểm tra lại liên kết.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setLoading(true);
      await authApi.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || "Đặt lại mật khẩu thất bại. Vui lòng thử lại.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 relative">
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 barber-link text-sm font-medium"
        >
          <FaArrowLeft className="text-xs" />
          <span>Quay lại trang chủ</span>
        </Link>

        <div className="barber-box w-full max-w-md text-center">
          <h1 className="barber-title text-3xl mb-1">LỖI</h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            Token không hợp lệ hoặc đã hết hạn
          </p>
          <div className="bg-red-600/20 text-red-200 text-sm font-medium px-4 py-2 rounded-md mb-4">
            {error || "Token không hợp lệ. Vui lòng kiểm tra lại liên kết."}
          </div>
          <Link to="/forgot-password" className="barber-link font-semibold">
            Yêu cầu liên kết mới
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 barber-link text-sm font-medium"
      >
        <FaArrowLeft className="text-xs" />
        <span>Quay lại trang chủ</span>
      </Link>

      <div className="barber-box w-full max-w-md text-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/043/182/089/non_2x/logo-barbershop-vintage-retro-logo-template-free-vector.jpg"
          alt="Logo"
          className="mx-auto mb-4 w-24 h-24 object-contain rounded-full barber-avatar bg-[#1a1a1a]/40 p-1"
          onError={(e) => (e.target.style.display = "none")}
        />

        <h1 className="barber-title text-3xl mb-1">ĐẶT LẠI MẬT KHẨU</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Nhập mật khẩu mới cho tài khoản của bạn
        </p>

        {error && (
          <div className="bg-red-600/20 text-red-200 text-sm font-medium px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center space-y-4">
            <div className="text-green-300 text-4xl mb-2">
              <FaCheckCircle className="mx-auto" />
            </div>
            <p className="text-green-300">
              ✅ Đặt lại mật khẩu thành công!
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Đang chuyển hướng đến trang đăng nhập...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaLock className="inline mr-2" /> Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="barber-input pl-5"
                  placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaLock className="inline mr-2" /> Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="barber-input pl-5"
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="barber-btn w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaLock className="text-base" />
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>

            <p className="text-center text-sm mt-4">
              Nhớ mật khẩu?{" "}
              <Link to="/login" className="barber-link font-semibold">
                Đăng nhập
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;

