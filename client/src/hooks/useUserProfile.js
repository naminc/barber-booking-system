import { useState, useEffect, useCallback } from "react";
import authApi from "../api/authApi";

export const useUserProfile = () => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy thông tin người dùng
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authApi.getProfile();

      if (response && response.user) {
        setUserId(response.user.id);
        setUserData(response.user);
      } else {
        setError("Không thể tải thông tin người dùng");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        } else {
          const errorMsg =
            err.response.data?.error ||
            err.response.data?.message ||
            "Không thể tải thông tin người dùng";
          setError(errorMsg);
        }
      } else {
        setError(
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Sử dụng useEffect để lấy dữ liệu
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Giá trị của hook
  return {
    userId,
    userData,
    loading,
    error,
    refetch: fetchProfile,
  };
};
