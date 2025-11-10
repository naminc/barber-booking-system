import { useState, useEffect } from "react";
import dashboardApi from "../api/dashboardApi";

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [todayStats, setTodayStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Lấy dữ liệu dashboard
      const [statsData, recentData, upcomingData, revenueData, todayData] = await Promise.all(
        [
          dashboardApi.getStats(),
          dashboardApi.getRecentAppointments(4),
          dashboardApi.getUpcomingAppointments(4),
          dashboardApi.getRevenueByMonth(),
          dashboardApi.getTodayStats(),
        ]
      );

      setStats(statsData);
      setRecentAppointments(recentData);
      setUpcomingAppointments(upcomingData);
      setRevenueByMonth(revenueData);
      setTodayStats(todayData);
    } catch (err) {
      setError(err.response?.data?.error || "Không thể tải dữ liệu bảng điều khiển");
    } finally {
      setLoading(false);
    }
  };

  // Lấy dữ liệu dashboard
  const refreshStats = async () => {
    try {
      const statsData = await dashboardApi.getStats();
      setStats(statsData);
    } catch (err) {
      // Silent fail
    }
  };

  // Lấy dữ liệu dashboard
  const refreshRecentAppointments = async () => {
    try {
      const recentData = await dashboardApi.getRecentAppointments(4);
      setRecentAppointments(recentData);
    } catch (err) {
      // Silent fail
    }
  };

  // Lấy dữ liệu dashboard
  const refreshTodayStats = async () => {
    try {
      const todayData = await dashboardApi.getTodayStats();
      setTodayStats(todayData);
    } catch (err) {
      // Silent fail
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Lấy dữ liệu dashboard
  const refreshUpcomingAppointments = async () => {
    try {
      const upcomingData = await dashboardApi.getUpcomingAppointments(4);
      setUpcomingAppointments(upcomingData);
    } catch (err) {
      // Silent fail
    }
  };

  // Giá trị của hook
  return {
    stats,
    recentAppointments,
    upcomingAppointments,
    revenueByMonth,
    todayStats,
    loading,
    error,
    refetch: fetchDashboardData,
    refreshStats,
    refreshRecentAppointments,
    refreshUpcomingAppointments,
    refreshTodayStats,
  };
};

export default useDashboard;

