import {
    Calendar,
    Clock,
    User,
    Phone,
    CheckCircle,
    XCircle,
    Edit,
    Trash2,
  } from "lucide-react";
  
  export default function Bookings() {
    const bookings = [
      {
        id: 1,
        customer: "Nguyễn Văn A",
        phone: "+84 909 090 909",
        service: "Cắt tóc",
        date: "2025-01-15",
        time: "10:00",
        status: "confirmed",
        staff: "Nguyễn Văn B",
      },
      {
        id: 2,
        customer: "Nguyễn Văn C",
        phone: "+84 909 090 909",
        service: "Cắt râu mày",
        date: "2025-01-15",
        time: "11:30",
        status: "pending",
        staff: "Nguyễn Văn C",
      },
      {
        id: 3,
        customer: "Nguyễn Văn B",
        phone: "+84 909 090 909",
        service: "Cắt tóc + Gội đầu",
        date: "2025-01-15",
        time: "2:00",
        status: "completed",
        staff: "Nguyễn Văn D",
      },
      {
        id: 4,
        customer: "Nguyễn Văn A",
        phone: "+84 909 090 909",
        service: "Gội đầu",
        date: "2025-01-16",
        time: "9:00",
        status: "cancelled",
        staff: "Nguyễn Văn E",
      },
    ];
  
    const getStatusColor = (status) => {
      switch (status) {
        case "confirmed":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "completed":
          return "bg-blue-100 text-blue-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
  
    const getStatusIcon = (status) => {
      switch (status) {
        case "confirmed":
          return <CheckCircle className="h-4 w-4" />;
        case "cancelled":
          return <XCircle className="h-4 w-4" />;
        default:
          return <Clock className="h-4 w-4" />;
      }
    };
  
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Quản lý lịch hẹn
              </h1>
              <p className="text-gray-600 mt-1">
                Xem và quản lý lịch hẹn khách hàng
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-900 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors">
                <option value="">Tất cả trạng thái</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <Calendar className="h-4 w-4" />
                Thêm lịch hẹn
              </button>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tổng lịch hẹn
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đã xác nhận</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Chờ xác nhận</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter((b) => b.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đã hủy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter((b) => b.status === "cancelled").length}
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày & Giờ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thợ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.customer}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {booking.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{booking.date}</div>
                      <div className="text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.staff}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 text-sm">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }  