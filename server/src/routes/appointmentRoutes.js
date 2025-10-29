const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const {
  createAppointmentSchema,
  updateAppointmentSchema,
  updateStatusSchema,
} = require("../validations/appointmentValidation");

router.get(
  "/my-appointments",
  verifyToken,
  appointmentController.getMyAppointments
);
router.post(
  "/create",
  verifyToken,
  validate(createAppointmentSchema, "body"),
  appointmentController.create
);
router.put(
  "/:id",
  verifyToken,
  validate(updateAppointmentSchema, "body"),
  appointmentController.update
);
router.delete("/:id", verifyToken, appointmentController.delete);

// Admin routes
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  appointmentController.getAll
);
router.get(
  "/stats",
  verifyToken,
  authorizeRoles("admin"),
  appointmentController.getStats
);
router.get(
  "/status/:status",
  verifyToken,
  authorizeRoles("admin"),
  appointmentController.getByStatus
);
router.get(
  "/staff/:staffId",
  verifyToken,
  authorizeRoles("admin"),
  appointmentController.getByStaffId
);
router.get(
  "/user/:userId",
  verifyToken,
  authorizeRoles("admin"),
  appointmentController.getByUserId
);
router.get(
  "/date-range",
  verifyToken,
  authorizeRoles("admin"),
  appointmentController.getByDateRange
);
router.get("/:id", verifyToken, appointmentController.getById);
router.patch(
  "/:id/status",
  verifyToken,
  authorizeRoles("admin"),
  validate(updateStatusSchema, "body"),
  appointmentController.updateStatus
);

module.exports = router;
