import { Calendar, Users, Scissors, DollarSign } from "lucide-react";

export default function StatsCards({ stats }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const dashboardStats = [
    {
      title: "Tổng lịch hẹn",
      value: stats?.totalAppointments || 0,
      icon: Calendar,
      color: "blue",
    },
    {
      title: "Doanh thu",
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Thợ hoạt động",
      value: `${stats?.activeStaff || 0}/${stats?.totalStaff || 0}`,
      icon: Users,
      color: "purple",
    },
    {
      title: "Dịch vụ",
      value: stats?.totalServices || 0,
      icon: Scissors,
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardStats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

