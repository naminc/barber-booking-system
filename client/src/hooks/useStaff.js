import { useState, useEffect, useCallback } from "react";
import staffApi from "../api/staffApi";

export const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await staffApi.getAllStaff();
      
      // Handle different response formats
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
      console.error("Error fetching staff:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách thợ";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStaffStats = useCallback(async () => {
    try {
      const response = await staffApi.getStaffStats();
      
      // Handle different response formats
      if (response && typeof response === 'object' && 'total' in response) {
        setStats(response);
      } else if (response.data && typeof response.data === 'object') {
        setStats(response.data);
      } else {
        setStats({ total: 0, active: 0, inactive: 0 });
      }
    } catch (err) {
      console.error("Error fetching staff stats:", err);
    }
  }, []);

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

  useEffect(() => {
    fetchStaff();
    fetchStaffStats();
  }, [fetchStaff, fetchStaffStats]);

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

