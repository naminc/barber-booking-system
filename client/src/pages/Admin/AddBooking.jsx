import { Calendar, User, Scissors, Clock, ArrowLeft, Save, X, Phone, Users } from "lucide-react";
import { useState } from "react";

export default function AddBooking() {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const users = [
    { id: 1, name: "Nguyễn Văn An", email: "an.nguyen@email.com", phone: "0123456789" },
    { id: 2, name: "Trần Thị Bình", email: "binh.tran@email.com", phone: "0987654321" },
    { id: 3, name: "Lê Văn Cường", email: "cuong.le@email.com", phone: "0369852147" },
    { id: 4, name: "Phạm Thị Dung", email: "dung.pham@email.com", phone: "0741852963" },
  ];

  const handleCustomerChange = (e) => {
    const value = e.target.value;
    setSelectedCustomer(value);
    setShowCustomerForm(value === "new");
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="space-y-6">
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
            <p className="text-gray-600">
              Nhập thông tin để tạo lịch hẹn mới
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form className="p-6 space-y-6">
          {/* Customer Selection Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Chọn khách hàng
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Customer Selection */}
              <div>
                <label
                  htmlFor="customerSelect"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Khách hàng
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="customerSelect"
                    name="customerSelect"
                    value={selectedCustomer}
                    onChange={handleCustomerChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                  >
                    <option value="">Chọn khách hàng</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.phone}
                      </option>
                    ))}
                    <option value="new">+ Thêm khách hàng mới</option>
                  </select>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Chọn khách hàng đã đăng ký hoặc thêm khách hàng mới
                </p>
              </div>

              {/* Customer Information Form - Only show when "new" is selected */}
              {showCustomerForm && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    Thông tin khách hàng mới
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Customer Name */}
                    <div>
                      <label
                        htmlFor="customerName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Tên khách hàng *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          id="customerName"
                          name="customerName"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                          placeholder="Nhập tên khách hàng"
                        />
                      </div>
                    </div>

                    {/* Customer Phone */}
                    <div>
                      <label
                        htmlFor="customerPhone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          id="customerPhone"
                          name="customerPhone"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                          placeholder="0123456789"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Dịch vụ *
                </label>
                <div className="relative">
                  <Scissors className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="service"
                    name="service"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                  >
                    <option value="">Chọn dịch vụ</option>
                    <option value="haircut">Cắt tóc</option>
                    <option value="beard">Cắt râu mày</option>
                    <option value="shampoo">Rửa tóc</option>
                    <option value="styling">Tạo kiểu</option>
                    <option value="haircut-shampoo">Cắt tóc + Gội đầu</option>
                  </select>
                </div>
              </div>

              {/* Staff */}
              <div>
                <label
                  htmlFor="staff"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Thợ thực hiện *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="staff"
                    name="staff"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                  >
                    <option value="">Chọn thợ</option>
                    <option value="staff1">Nguyễn Văn A</option>
                    <option value="staff2">Trần Thị B</option>
                    <option value="staff3">Lê Văn C</option>
                    <option value="staff4">Phạm Thị D</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ngày hẹn *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Giờ hẹn *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="time"
                    name="time"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                  >
                    <option value="">Chọn giờ</option>
                    <option value="08:00">08:00</option>
                    <option value="08:30">08:30</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                  </select>
                </div>
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
              className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4" />
              Hủy
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              Thêm lịch hẹn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
