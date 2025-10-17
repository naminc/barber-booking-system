const settingService = require("../services/settingService");

exports.getSetting = async (req, res) => {
  try {
    const data = await settingService.getSetting();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const updated = await settingService.updateSetting(req.body);
    res.status(200).json({
      success: true,
      message: "Cập nhật thông tin cấu hình thành công",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};