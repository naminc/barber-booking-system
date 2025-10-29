import { useState, useCallback } from "react";
import appointmentsApi from "../api/appointmentsApi";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy appointments của user hiện tại
  const fetchMyAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentsApi.getMyAppointments();

      if (Array.isArray(response)) {
        setAppointments(response);
        return response;
      } else if (response.data && Array.isArray(response.data)) {
        setAppointments(response.data);
        return response.data;
      } else {
        setAppointments([]);
        return [];
      }
    } catch (err) {
      console.error("Error fetching my appointments:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách lịch hẹn";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Tạo appointment mới
  const createAppointment = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentsApi.createAppointment(data);
      return response;
    } catch (err) {
      console.error("Error creating appointment:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Có lỗi xảy ra khi đặt lịch";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy tất cả appointments (admin)
  const fetchAllAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentsApi.getAllAppointments();

      if (Array.isArray(response)) {
        setAppointments(response);
        return response;
      } else if (response.data && Array.isArray(response.data)) {
        setAppointments(response.data);
        return response.data;
      } else {
        setAppointments([]);
        return [];
      }
    } catch (err) {
      console.error("Error fetching all appointments:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách lịch hẹn";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật trạng thái appointment (admin)
  const updateAppointmentStatus = useCallback(async (id, status) => {
    try {
      const response = await appointmentsApi.updateAppointmentStatus(
        id,
        status
      );

      // Cập nhật state local
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status } : appointment
        )
      );

      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Cập nhật trạng thái thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Xóa appointment
  const deleteAppointment = useCallback(async (id) => {
    try {
      const response = await appointmentsApi.deleteAppointment(id);

      // Cập nhật state local
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );

      return { success: true, message: "Xóa lịch hẹn thành công" };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Xóa lịch hẹn thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Cập nhật appointment
  const updateAppointment = useCallback(async (id, data) => {
    try {
      const response = await appointmentsApi.updateAppointment(id, data);

      // Cập nhật state local
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, ...response.appointment }
            : appointment
        )
      );

      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Cập nhật lịch hẹn thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Lấy thống kê appointments (admin)
  const fetchAppointmentStats = useCallback(async () => {
    try {
      const response = await appointmentsApi.getAppointmentStats();
      return response;
    } catch (err) {
      console.error("Error fetching appointment stats:", err);
      throw err;
    }
  }, []);

  // Lấy appointments theo staff ID
  const fetchAppointmentsByStaffId = useCallback(async (staffId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentsApi.getAppointmentsByStaffId(staffId);

      if (Array.isArray(response)) {
        return response;
      } else if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error fetching appointments by staff:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách lịch hẹn";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy appointments theo khoảng thời gian
  const fetchAppointmentsByDateRange = useCallback(
    async (startDate, endDate) => {
      try {
        setLoading(true);
        setError(null);
        const response = await appointmentsApi.getAppointmentsByDateRange(
          startDate,
          endDate
        );

        if (Array.isArray(response)) {
          return response;
        } else if (response.data && Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      } catch (err) {
        console.error("Error fetching appointments by date range:", err);
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Không thể tải danh sách lịch hẹn";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    appointments,
    loading,
    error,
    fetchMyAppointments,
    createAppointment,
    fetchAllAppointments,
    updateAppointmentStatus,
    deleteAppointment,
    updateAppointment,
    fetchAppointmentStats,
    fetchAppointmentsByStaffId,
    fetchAppointmentsByDateRange,
  };
};
