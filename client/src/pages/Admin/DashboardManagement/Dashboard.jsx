import { LayoutDashboard } from "lucide-react";
import { useDashboard } from "../../../hooks";
import LoadingState from "../../../components/LoadingState";
import ErrorState from "../../../components/ErrorState";
import {
  StatsCards,
  RecentAppointments,
  UpcomingAppointments,
  RevenueChart,
  QuickActions,
} from "./components";

export default function Dashboard() {
  const {
    stats,
    recentAppointments,
    upcomingAppointments,
    revenueByMonth,
    loading,
    error,
    refetch,
  } = useDashboard();

  if (loading) {
    return <LoadingState message="Đang tải dữ liệu bảng điều khiển..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-lg">
            <LayoutDashboard className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Bảng điều khiển
            </h1>
            <p className="text-gray-600 mt-1">
              Chào mừng bạn đến với trang quản lý của cửa hàng.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Recent and Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAppointments appointments={recentAppointments} />
        <UpcomingAppointments appointments={upcomingAppointments} />
      </div>

      {/* Revenue Chart */}
      <RevenueChart revenueByMonth={revenueByMonth} />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}

