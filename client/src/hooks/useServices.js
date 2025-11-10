import { useState, useEffect, useCallback } from "react";
import servicesApi from "../api/servicesApi";

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy danh sách dịch vụ từ API
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await servicesApi.getAllServices();
      
      // Xử lý các định dạng phản hồi khác nhau
      if (Array.isArray(response)) {
        setServices(response);
      } else if (response.data && Array.isArray(response.data)) {
        setServices(response.data);
      } else if (response.services && Array.isArray(response.services)) {
        setServices(response.services);
      } else {
        setServices([]);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách dịch vụ";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa dịch vụ
  const deleteService = useCallback(async (serviceId) => {
    try {
      await servicesApi.deleteService(serviceId);
      setServices((prevServices) => 
        prevServices.filter((service) => service.id !== serviceId)
      );
      return { success: true, message: "Xóa dịch vụ thành công" };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Xóa dịch vụ thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Cập nhật dịch vụ
  const updateService = useCallback(async (serviceId, data) => {
    try {
      const response = await servicesApi.updateService(serviceId, data);
      
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === serviceId ? { ...service, ...response.service } : service
        )
      );
      
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Cập nhật dịch vụ thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Thay đổi trạng thái dịch vụ
  const toggleServiceStatus = useCallback(async (serviceId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await servicesApi.updateService(serviceId, { status: newStatus });
      
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === serviceId ? { ...service, status: newStatus } : service
        )
      );
      
      return { 
        success: true, 
        message: `${newStatus === "active" ? "Kích hoạt" : "Vô hiệu hóa"} dịch vụ thành công`,
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

  // Tạo dịch vụ
  const createService = useCallback(async (data) => {
    try {
      const response = await servicesApi.createService(data);
      if (response.data) {
        setServices((prevServices) => [...prevServices, response.data]);
      }
      
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Tạo dịch vụ thất bại";
      throw { error: errorMessage };
    }
  }, []);

  // Hàm lọc dịch vụ theo trạng thái
  const filterByStatus = useCallback((status) => {
    if (status === "all") return services;
    return services.filter((service) => service.status === status);
  }, [services]);

  // Hàm tìm kiếm dịch vụ
  const searchServices = useCallback((searchTerm) => {
    if (!searchTerm) return services;
    const term = searchTerm.toLowerCase();
    return services.filter(
      (service) =>
        service.name?.toLowerCase().includes(term) ||
        service.description?.toLowerCase().includes(term)
    );
  }, [services]);

  // Sử dụng useEffect để lấy dữ liệu
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Giá trị của hook
  return {
    services,
    loading,
    error,
    fetchServices,
    deleteService,
    updateService,
    createService,
    toggleServiceStatus,
    filterByStatus,
    searchServices,
  };
};