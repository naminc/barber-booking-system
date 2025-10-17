const express = require("express");
const router = express.Router();
const settingController = require("../controllers/settingController");
const validate = require("../middlewares/validate");
const { updateSettingSchema } = require("../validations/settingValidation");

router.get("/", settingController.getSetting);
router.put("/", validate(updateSettingSchema), settingController.updateSetting);

module.exports = router;