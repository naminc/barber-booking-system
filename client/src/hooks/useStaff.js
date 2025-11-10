import { useState, useEffect, useCallback } from "react";
import staffApi from "../api/staffApi";

// Hook để sử dụng staff
export const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy danh sách staff
  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await staffApi.getAllStaff();
      
      // Xử lý các định dạng phản hồi khác nhau
      if (Array.isArray(response)) {
        setStaff(response);
      } else if (response.data && Array.isArray(response.data)) {
        setStaff(response.data);
      } else if (response.staff && Array.isArray(response.staff)) {
        setStaff(response.staff);
      } else {
        setStaff([]);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách thợ";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy thống kê staff
  const fetchStaffStats = useCallback(async () => {
    try {
      const response = await staffApi.getStaffStats();
      
      // Xử lý các định dạng phản hồi khác nhau
      if (response && typeof response === 'object' && 'total' in response) {
        setStats(response);
      } else if (response.data && typeof response.data === 'object') {
        setStats(response.data);
      } else {
        setStats({ total: 0, active: 0, inactive: 0 });
      }
    } catch (err) {
      // Silent fail
    }
  }, []);

  // Tạo staff mới
  const createStaff = async (data) => {
    try {
      const response = await staffApi.createStaff(data);
      await fetchStaff();
      await fetchStaffStats();
      return response;
    } catch (err) {
      throw err.response?.data || { error: "Không thể tạo thợ mới" };
    }
  };

  // Cập nhật staff
  const updateStaff = async (id, data) => {
    try {
      const response = await staffApi.updateStaff(id, data);
      await fetchStaff();
      await fetchStaffStats();
      return response;
    } catch (err) {
      throw err.response?.data || { error: "Không thể cập nhật thông tin thợ" };
    }
  };

  // Xóa staff
  const deleteStaff = async (id) => {
    try {
      const response = await staffApi.deleteStaff(id);
      await fetchStaff();
      await fetchStaffStats();
      return response;
    } catch (err) {
      throw err.response?.data || { error: "Không thể xóa thợ" };
    }
  };

  // Thay đổi trạng thái staff
  const toggleStaffStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const staffMember = staff.find((s) => s.id === id);
      if (!staffMember) throw new Error("Staff not found");

      const updateData = {
        name: staffMember.name,
        specialization: staffMember.specialization,
        phone: staffMember.phone,
        experience: staffMember.experience || "",
        image: staffMember.image || "",
        status: newStatus,
      };

      const response = await staffApi.updateStaff(id, updateData);
      await fetchStaff();
      await fetchStaffStats();
      return response;
    } catch (err) {
      throw err.response?.data || { error: "Không thể thay đổi trạng thái" };
    }
  };

  // Sử dụng useEffect để lấy dữ liệu
  useEffect(() => {
    fetchStaff();
    fetchStaffStats();
  }, [fetchStaff, fetchStaffStats]);

  // Giá trị của hook
  return {
    staff,
    stats,
    loading,
    error,
    fetchStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    toggleStaffStatus,
  };
};

