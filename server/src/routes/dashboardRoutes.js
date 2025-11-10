const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Lấy thống kê dashboard (admin)
router.get("/stats", verifyToken, authorizeRoles("admin"), dashboardController.getStats);
// Lấy lịch hẹn gần đây (admin)
router.get("/recent-appointments", verifyToken, authorizeRoles("admin"), dashboardController.getRecentAppointments);
// Lấy lịch hẹn sắp tới (admin)
router.get("/upcoming-appointments", verifyToken, authorizeRoles("admin"), dashboardController.getUpcomingAppointments);
// Lấy doanh thu theo tháng (admin)
router.get("/revenue-by-month", verifyToken, authorizeRoles("admin"), dashboardController.getRevenueByMonth);
// Lấy thống kê hôm nay (admin)
router.get("/today", verifyToken, authorizeRoles("admin"), dashboardController.getTodayStats);

module.exports = router;

