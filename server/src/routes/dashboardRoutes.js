const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// All dashboard routes require admin role
router.get(
  "/stats",
  verifyToken,
  authorizeRoles("admin"),
  dashboardController.getStats
);

router.get(
  "/recent-appointments",
  verifyToken,
  authorizeRoles("admin"),
  dashboardController.getRecentAppointments
);

router.get(
  "/upcoming-appointments",
  verifyToken,
  authorizeRoles("admin"),
  dashboardController.getUpcomingAppointments
);

router.get(
  "/revenue-by-month",
  verifyToken,
  authorizeRoles("admin"),
  dashboardController.getRevenueByMonth
);

router.get(
  "/today",
  verifyToken,
  authorizeRoles("admin"),
  dashboardController.getTodayStats
);

module.exports = router;

