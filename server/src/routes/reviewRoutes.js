const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Public routes
router.get("/", reviewController.getAll);
router.get("/:id", reviewController.getById);
router.get("/service/:serviceId", reviewController.getByService);
router.get("/staff/:staffId", reviewController.getByStaff);

// Protected routes (user)
router.post("/", verifyToken, reviewController.create);
router.get("/user/:userId", verifyToken, reviewController.getByUser);

// Admin only routes
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  reviewController.update
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  reviewController.delete
);
router.patch(
  "/:id/status",
  verifyToken,
  authorizeRoles("admin"),
  reviewController.updateStatus
);

module.exports = router;
