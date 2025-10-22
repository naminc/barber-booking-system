import { useState, useEffect, useCallback } from "react";
import servicesApi from "../api/servicesApi";

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await servicesApi.getAllServices();
      
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
      console.error("Error fetching services:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Không thể tải danh sách dịch vụ";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const filterByStatus = useCallback((status) => {
    if (status === "all") return services;
    return services.filter((service) => service.status === status);
  }, [services]);

  const searchServices = useCallback((searchTerm) => {
    if (!searchTerm) return services;
    const term = searchTerm.toLowerCase();
    return services.filter(
      (service) =>
        service.name?.toLowerCase().includes(term) ||
        service.description?.toLowerCase().includes(term)
    );
  }, [services]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

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