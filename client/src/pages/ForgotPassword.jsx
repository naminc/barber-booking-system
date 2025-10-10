import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import "../theme.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Vui lòng nhập email của bạn.");
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 800));
      setSent(true);
    } catch {
      setError("Gửi yêu cầu thất bại. Vui lòng thử lại.");
    }
  };
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

        <h1 className="barber-title text-3xl mb-1">QUÊN MẬT KHẨU</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Nhập email để nhận liên kết đặt lại mật khẩu
        </p>

        {error && (
          <div className="bg-red-600/20 text-red-200 text-sm font-medium px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        {sent ? (
          <div className="text-center space-y-4">
            <p className="text-green-300">
              ✅ Liên kết đặt lại mật khẩu đã được gửi đến{" "}
              <span className="text-[var(--color-gold)] font-medium">
                {email}
              </span>
              .
            </p>
            <Link to="/login" className="barber-link font-semibold">
              Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaEnvelope className="inline mr-2" /> Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="barber-input pl-5"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="barber-btn w-full flex items-center justify-center gap-2"
            >
              <FaPaperPlane className="text-base" />
              Gửi liên kết đặt lại
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

export default ForgotPassword;