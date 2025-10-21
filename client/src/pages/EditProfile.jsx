import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import authApi from "../api/authApi";
import { logout } from "../utils/auth";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaSave,
  FaCamera,
} from "react-icons/fa";
import "../theme.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await authApi.getProfile();
        
        if (response && response.user) {
          setForm({
            name: response.user.name || "",
            email: response.user.email || "",
            phone: response.user.phone || "",
            password: "",
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Không thể tải thông tin người dùng");
        
        // If unauthorized, redirect to login
        if (err.response && err.response.status === 401) {
          logout(navigate);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cập nhật thông tin thành công!");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
        <Header />
        <div className="px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-gold)] mx-auto"></div>
            <p className="text-gray-400 mt-4">Đang tải thông tin...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
        <Header />
        <div className="px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="barber-btn mt-4 px-6 py-2"
            >
              Thử lại
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-20">
        <div className="barber-box max-w-2xl mx-auto p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group w-28 h-28">
              <img
                src={avatar}
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover border-2 border-[var(--color-gold)] 
                           shadow-[0_0_20px_rgba(194,158,117,0.3)] group-hover:shadow-[0_0_25px_rgba(194,158,117,0.5)] 
                           transition-all duration-300"
              />
              <label
                htmlFor="avatarUpload"
                className="absolute bottom-0 right-0 bg-[var(--color-gold)] text-black p-2 rounded-full 
                           cursor-pointer hover:scale-110 transition-all duration-300 shadow-md"
              >
                <FaCamera />
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </div>

          <h2 className="barber-title text-3xl mb-8 text-center">
            Chỉnh sửa thông tin cá nhân
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaUser className="inline-block mr-2" /> Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="barber-input"
                placeholder="Nhập họ và tên..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaEnvelope className="inline-block mr-2" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="barber-input"
                placeholder="Nhập email..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaPhone className="inline-block mr-2" /> Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="barber-input"
                placeholder="Nhập số điện thoại..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                <FaLock className="inline-block mr-2" /> Mật khẩu mới (tùy chọn)
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="barber-input"
                placeholder="Nhập mật khẩu mới..."
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="barber-btn flex items-center justify-center gap-2 mx-auto px-8 py-3"
              >
                <FaSave className="text-lg" />
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
