import {
    Calendar,
    Users,
    Scissors,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
  } from "lucide-react";
  
  export default function Dashboard() {
    const stats = [
      {
        title: "Tổng lịch hẹn",
        value: "156",
        changeType: "positive",
        icon: Calendar,
        color: "blue",
      },
      {
        title: "Doanh thu",
        value: "22.000.000 VNĐ",
        changeType: "positive",
        icon: DollarSign,
        color: "green",
      },
      {
        title: "Thợ",
        value: "8",
        changeType: "positive",
        icon: Users,
        color: "purple",
      },
      {
        title: "Dịch vụ",
        value: "12",
        changeType: "neutral",
        icon: Scissors,
        color: "orange",
      },
    ];
  
    const recentBookings = [
      {
        id: 1,
        customer: "Nguyễn Văn A",
        service: "Cắt tóc",
        time: "10:00",
        status: "confirmed",
      },
      {
        id: 2,
        customer: "Nguyễn Văn B",
        service: "Cắt râu mày",
        time: "11:30",
        status: "pending",
      },
      {
        id: 3,
        customer: "Nguyễn Văn C",
        service: "Cắt tóc + Gội đầu",
        time: "2:00 PM",
        status: "completed",
      },
      {
        id: 4,
        customer: "Nguyễn Văn D",
        service: "Gội đầu",
        time: "3:30",
        status: "confirmed",
      },
    ];
  
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
  
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Bảng điều khiển</h1>
          <p className="text-gray-600 mt-1">
            Chào mừng bạn đến với trang quản lý của cửa hàng.
          </p>
        </div>
  
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>

                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart Placeholder */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tổng quan doanh thu
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Biểu đồ sẽ được triển khai ở đây</p>
              </div>
            </div>
          </div>
  
          {/* Recent Bookings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Lịch hẹn gần nhất
            </h3>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    {getStatusIcon(booking.status)}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {booking.customer}
                      </p>
                      <p className="text-sm text-gray-500">{booking.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {booking.time}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Xem tất cả lịch hẹn
              </button>
            </div>
          </div>
        </div>
  
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Hành động nhanh
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
              <Calendar className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Thêm lịch hẹn</span>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition">
              <Users className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Thêm thợ</span>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition">
              <Scissors className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Thêm dịch vụ</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  