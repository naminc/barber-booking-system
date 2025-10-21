import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaSave,
  FaCamera,
} from "react-icons/fa";
import {
  useForm,
  useUserProfile,
  useAvatar,
  useNotification,
  useProfileUpdate,
} from "../hooks";
import "../theme.css";

const EditProfile = () => {
  const navigate = useNavigate();

  // Custom hooks
  const {
    values: form,
    handleChange,
    setFormValues,
    setFieldValue,
  } = useForm({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { userId, userData, loading, error: fetchError } = useUserProfile();
  const { avatar, handleAvatarChange } = useAvatar();
  const { success, error, showSuccess, showError, clearNotifications } =
    useNotification();
  const { submitting, updateProfile } = useProfileUpdate();

  // Load user data into form when available (only once)
  useEffect(() => {
    if (userData) {
      setFormValues({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        password: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]); // Only depend on userData

  // Show fetch error if any (only once)
  useEffect(() => {
    if (fetchError) {
      showError(fetchError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchError]); // Only depend on fetchError

  // Handle form change with notification clearing
  const handleFormChange = (e) => {
    handleChange(e);
    clearNotifications();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      showError("Không tìm thấy thông tin người dùng");
      return;
    }

    try {
      clearNotifications();
      const response = await updateProfile(userId, form);

      showSuccess(response.message || "Cập nhật thông tin thành công!");
      setFieldValue("password", "");

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      showError(err.error || "Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-20">
        <div className="barber-box max-w-2xl mx-auto p-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-gold)] mx-auto"></div>
              <p className="text-gray-400 mt-4">Đang tải thông tin...</p>
            </div>
          ) : (
            <>
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

              {success && (
                <div className="bg-green-600/20 text-green-200 text-sm font-medium px-4 py-3 rounded-md mb-4 text-center">
                  {success}
                </div>
              )}

              {error && (
                <div className="bg-red-600/20 text-red-200 text-sm font-medium px-4 py-3 rounded-md mb-4 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                    <FaUser className="inline-block mr-2" /> Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    className="barber-input"
                    placeholder="Nhập họ và tên..."
                    minLength={2}
                    maxLength={50}
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
                    onChange={handleFormChange}
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
                    onChange={handleFormChange}
                    className="barber-input"
                    placeholder="Nhập số điện thoại..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-[var(--color-gold)]">
                    <FaLock className="inline-block mr-2" /> Mật khẩu mới (tùy
                    chọn)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleFormChange}
                    className="barber-input"
                    placeholder="Nhập mật khẩu mới..."
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="barber-btn flex items-center justify-center gap-2 mx-auto px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current"></div>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <FaSave className="text-lg" />
                        Lưu thay đổi
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
