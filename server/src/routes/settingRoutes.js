const express = require("express");
const router = express.Router();
const settingController = require("../controllers/settingController");
const validate = require("../middlewares/validate");
const { updateSettingSchema } = require("../validations/settingValidation");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

router.get("/", settingController.getSetting);
router.put(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  validate(updateSettingSchema),
  settingController.updateSetting
);

module.exports = router;