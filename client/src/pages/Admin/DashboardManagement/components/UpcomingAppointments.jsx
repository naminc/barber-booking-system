import { useNavigate } from "react-router-dom";
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function UpcomingAppointments({ appointments }) {
  const navigate = useNavigate();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!appointments || appointments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Lịch hẹn sắp tới
        </h3>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>Không có lịch hẹn sắp tới</p>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/admin/bookings")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Xem tất cả lịch hẹn
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Lịch hẹn sắp tới
      </h3>
      <div className="space-y-4">
        {appointments.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            onClick={() => navigate("/admin/bookings")}
          >
            <div className="flex items-center">
              {getStatusIcon(booking.status)}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {booking.customer_name || booking.user_name || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.service_name || "N/A"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-900">
                {formatDateTime(booking.appointment_date)}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {booking.status === "pending" && "Chờ xác nhận"}
                {booking.status === "confirmed" && "Đã xác nhận"}
                {booking.status === "completed" && "Hoàn thành"}
                {booking.status === "cancelled" && "Đã hủy"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/admin/bookings")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Xem tất cả lịch hẹn
        </button>
      </div>
    </div>
  );
}

