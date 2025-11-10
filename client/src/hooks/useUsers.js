import { useState, useEffect, useCallback } from "react";
import usersApi from "../api/usersApi";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usersApi.getAllUsers();
      
      // Xử lý các định dạng phản hồi khác nhau
      if (Array.isArray(response)) {
        setUsers(response);
      } else if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.users && Array.isArray(response.users)) {
        setUsers(response.users);
      } else {
        setUsers([]);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách người dùng";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa người dùng
  const deleteUser = useCallback(async (userId) => {
    try {
      await usersApi.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      return { success: true, message: "Xóa người dùng thành công" };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Xóa người dùng thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Cập nhật người dùng
  const updateUser = useCallback(async (userId, data) => {
    try {
      const response = await usersApi.updateUser(userId, data);
      
      // Cập nhật state local
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...response.user } : user
        )
      );
      
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Cập nhật người dùng thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Thay đổi trạng thái người dùng
  const toggleUserStatus = useCallback(async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await usersApi.updateUser(userId, { status: newStatus });
      
      // Cập nhật state local
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
      
      return { 
        success: true, 
        message: `${newStatus === "active" ? "Mở khóa" : "Khóa"} người dùng thành công`,
        newStatus 
      };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Thay đổi trạng thái thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Tạo người dùng
  const createUser = useCallback(async (data) => {
    try {
      const response = await usersApi.createUser(data);
      
      // Thêm người dùng mới vào state local
      if (response.user) {
        setUsers((prevUsers) => [...prevUsers, response.user]);
      }
      
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Tạo người dùng thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Hàm lọc người dùng theo vai trò
  const filterByRole = useCallback((role) => {
    if (role === "all") return users;
    return users.filter((user) => user.role === role);
  }, [users]);

  // Hàm tìm kiếm người dùng
  const searchUsers = useCallback((searchTerm) => {
    if (!searchTerm) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phone?.includes(term)
    );
  }, [users]);

  // Sử dụng useEffect để lấy dữ liệu
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Giá trị của hook
  return {
    users,
    loading,
    error,
    fetchUsers,
    deleteUser,
    updateUser,
    createUser,
    toggleUserStatus,
    filterByRole,
    searchUsers,
  };
};

