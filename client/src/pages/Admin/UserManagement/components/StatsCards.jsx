import { Users, User, Shield, CheckCircle } from "lucide-react";

export default function StatsCards({ users }) {
  const stats = [
    {
      title: "Tổng người dùng",
      value: users.length,
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Khách hàng",
      value: users.filter((u) => u.role === "user").length,
      icon: User,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Quản trị viên",
      value: users.filter((u) => u.role === "admin").length,
      icon: Shield,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Hoạt động",
      value: users.filter((u) => u.status === "active").length,
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

