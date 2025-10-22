import { Scissors, CheckCircle, XCircle } from "lucide-react";

export default function StatsCards({ services }) {
  const activeServices = services.filter((s) => s.status === "active");
  const inactiveServices = services.filter((s) => s.status === "inactive");

  const stats = [
    {
      title: "Tổng dịch vụ",
      value: services.length,
      icon: Scissors,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Hoạt động",
      value: activeServices.length,
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Không hoạt động",
      value: inactiveServices.length,
      icon: XCircle,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
