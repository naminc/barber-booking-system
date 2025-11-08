const dashboardService = require("../services/dashboardService");

exports.getStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Lấy thống kê bảng điều khiển thất bại",
    });
  }
};

exports.getRecentAppointments = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const appointments = await dashboardService.getRecentAppointments(limit);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Lấy danh sách lịch hẹn gần đây thất bại",
    });
  }
};

exports.getUpcomingAppointments = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const appointments = await dashboardService.getUpcomingAppointments(limit);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Lấy danh sách lịch hẹn sắp tới thất bại",
    });
  }
};

exports.getRevenueByMonth = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const data = await dashboardService.getRevenueByMonth(year);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Lấy thống kê doanh thu theo tháng thất bại",
    });
  }
};

exports.getTodayStats = async (req, res) => {
  try {
    const stats = await dashboardService.getTodayStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Lấy thống kê hôm nay thất bại",
    });
  }
};

