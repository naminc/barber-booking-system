import { useState, useCallback } from "react";
import authApi from "../api/authApi";

const validateProfileData = (formData) => {
  if (!formData.name || formData.name.trim() === "") {
    return { isValid: false, error: "Trường họ và tên không được để trống" };
  }
  if (formData.name.trim().length < 2) {
    return {
      isValid: false,
      error: "Trường họ và tên phải có ít nhất 2 ký tự",
    };
  }

  // Email validation
  if (!formData.email || formData.email.trim() === "") {
    return { isValid: false, error: "Trường email không được để trống" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email.trim())) {
    return { isValid: false, error: "Trường email không hợp lệ" };
  }

  // Phone validation
  if (formData.phone && formData.phone.trim() !== "") {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      return { isValid: false, error: "Số điện thoại phải có 10-11 chữ số" };
    }
  }

  // Password validation
  if (formData.password && formData.password.trim() !== "") {
    if (formData.password.length < 6) {
      return { isValid: false, error: "Mật khẩu phải có ít nhất 6 ký tự" };
    }
  }

  return { isValid: true, error: null };
};

export const useProfileUpdate = () => {
  const [submitting, setSubmitting] = useState(false);

  const updateProfile = useCallback(async (userId, formData) => {
    // Validate form data
    const validation = validateProfileData(formData);
    if (!validation.isValid) {
      throw { error: validation.error };
    }
    const updateData = {};

    if (formData.name && formData.name.trim() !== "") {
      updateData.name = formData.name.trim();
    }

    if (formData.email && formData.email.trim() !== "") {
      updateData.email = formData.email.trim();
    }

    if (formData.phone && formData.phone.trim() !== "") {
      updateData.phone = formData.phone.trim();
    }

    if (formData.password && formData.password.trim() !== "") {
      updateData.password = formData.password;
    }

    try {
      setSubmitting(true);
      const response = await authApi.updateProfile(userId, updateData);
      return response;
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          throw {
            error: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
          };
        } else {
          const errorMessage =
            err.response.data?.error ||
            err.response.data?.message ||
            "Cập nhật thông tin thất bại";
          throw { error: errorMessage };
        }
      } else if (err.request) {
        throw {
          error:
            "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.",
        };
      } else if (err.error) {
        throw { error: err.error || "Cập nhật thông tin thất bại" };
      } else {
        throw { error: "Đã xảy ra lỗi không xác định. Vui lòng thử lại." };
      }
    } finally {
      setSubmitting(false);
    }
  }, []);

  return {
    submitting,
    updateProfile,
  };
};