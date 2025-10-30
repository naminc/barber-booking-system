import {
  Calendar,
  User,
  Scissors,
  Clock,
  ArrowLeft,
  Save,
  X,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAppointments, useServices, useStaff } from "../../../hooks";
import LoadingState from "../../../components/LoadingState";

export default function AddAppointment() {
  const navigate = useNavigate();
  const { createAppointment, loading: creating } = useAppointments();
  const { services, loading: servicesLoading } = useServices();
  const { staff, loading: staffLoading } = useStaff();

  const [formData, setFormData] = useState({
    service_id: "",
    staff_id: "",
    appointment_date: "",
    appointment_time: "",
    status: "pending",
    customer_name: "",
    customer_phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Customer validation
    if (!formData.customer_name.trim()) {
      newErrors.customer_name = "Vui lòng nhập tên khách hàng";
    }
    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = "Vui lòng nhập số điện thoại";
    } else if (!/^0\d{9}$/.test(formData.customer_phone)) {
      newErrors.customer_phone = "Số điện thoại không hợp lệ";
    }

    // Booking info validation
    if (!formData.service_id) {
      newErrors.service_id = "Vui lòng chọn dịch vụ";
    }
    if (!formData.staff_id) {
      newErrors.staff_id = "Vui lòng chọn thợ";
    }
    if (!formData.appointment_date) {
      newErrors.appointment_date = "Vui lòng chọn ngày hẹn";
    }
    if (!formData.appointment_time) {
      newErrors.appointment_time = "Vui lòng chọn giờ hẹn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      // Combine date and time into appointment_date
      const appointmentDateTime = `${formData.appointment_date} ${formData.appointment_time}:00`;

      const appointmentData = {
        user_id: null,
        service_id: parseInt(formData.service_id),
        staff_id: parseInt(formData.staff_id),
        appointment_date: appointmentDateTime,
        status: formData.status,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
      };

      await createAppointment(appointmentData);
      toast.success("Thêm lịch hẹn thành công");
      navigate("/admin/bookings");
    } catch (err) {
      toast.error(err.error || "Thêm lịch hẹn thất bại");
    }
  };

  const handleBack = () => {
    navigate("/admin/bookings");
  };

  const isLoading = servicesLoading || staffLoading;

  if (isLoading) {
    return <LoadingState />;
  }

  // Generate time slots
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeSlots.push(time);
    }
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Thêm lịch hẹn mới
            </h1>
            <p className="text-gray-600">Nhập thông tin để tạo lịch hẹn mới</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Thông tin khách hàng
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div>
                <label
                  htmlFor="customer_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tên khách hàng *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      errors.customer_name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Nhập tên khách hàng"
                  />
                </div>
                {errors.customer_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customer_name}
                  </p>
                )}
              </div>

              {/* Customer Phone */}
              <div>
                <label
                  htmlFor="customer_phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Số điện thoại *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    id="customer_phone"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      errors.customer_phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0123456789"
                  />
                </div>
                {errors.customer_phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customer_phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Booking Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Thông tin lịch hẹn
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service */}
              <div>
                <label
                  htmlFor="service_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Dịch vụ *
                </label>
                <div className="relative">
                  <Scissors className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="service_id"
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      errors.service_id ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn dịch vụ</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} -{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(service.price || 0)}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.service_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.service_id}
                  </p>
                )}
              </div>

              {/* Staff */}
              <div>
                <label
                  htmlFor="staff_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Thợ thực hiện *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="staff_id"
                    name="staff_id"
                    value={formData.staff_id}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      errors.staff_id ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn thợ</option>
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} - {s.specialization}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.staff_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.staff_id}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="appointment_date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ngày hẹn *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    id="appointment_date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      errors.appointment_date
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.appointment_date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.appointment_date}
                  </p>
                )}
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="appointment_time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Giờ hẹn *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="appointment_time"
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      errors.appointment_time
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn giờ</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.appointment_time && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.appointment_time}
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Trạng thái
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                >
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="completed">Đã hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={creating}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Hủy
            </button>
            <button
              type="submit"
              disabled={creating}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {creating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang thêm...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Thêm lịch hẹn
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
