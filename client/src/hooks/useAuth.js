import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const login = useCallback(async (credentials) => {
    const { email, password } = credentials;

    // Validation
    if (!email) {
      throw { error: "Trường email không được để trống." };
    }
    if (!password) {
      throw { error: "Trường mật khẩu không được để trống." };
    }

    try {
      setLoading(true);
      const res = await authApi.login({ email, password });

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        return { success: true, user: res.user };
      } else if (res.error) {
        throw { error: res.error };
      } else {
        throw { error: "Đăng nhập thất bại, vui lòng thử lại." };
      }
    } catch (err) {
      if (err.response) {
        const errorMsg =
          err.response.data?.error ||
          err.response.data?.message ||
          `Lỗi ${err.response.status}: ${err.response.statusText}`;
        throw { error: errorMsg };
      } else if (err.error) {
        throw { error: err.error };
      } else if (err.message) {
        throw { error: err.message };
      } else {
        throw { error: "Có lỗi xảy ra, vui lòng thử lại." };
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    const { name, email, password } = userData;

    if (!name) {
      throw { error: "Trường họ tên không được để trống." };
    }
    if (!email) {
      throw { error: "Trường email không được để trống." };
    }
    if (!password) {
      throw { error: "Trường mật khẩu không được để trống." };
    }

    try {
      setLoading(true);
      const res = await authApi.register({ name, email, password });

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        return { success: true, user: res.user };
      } else if (res.error) {
        throw { error: res.error };
      } else {
        throw { error: "Đăng ký thất bại, vui lòng thử lại." };
      }
    } catch (err) {
      if (err.response) {
        const errorMsg =
          err.response.data?.error ||
          err.response.data?.message ||
          `Lỗi ${err.response.status}: ${err.response.statusText}`;
        throw { error: errorMsg };
      } else if (err.error) {
        throw { error: err.error };
      } else if (err.message) {
        throw { error: err.message };
      } else {
        throw { error: "Có lỗi xảy ra, vui lòng thử lại." };
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem("token");
    return !!token;
  }, []);

  const getCurrentUser = useCallback(() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }, []);

  return {
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    getCurrentUser,
  };
};