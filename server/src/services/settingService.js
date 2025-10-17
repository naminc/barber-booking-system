// services/settingService.js
const Setting = require("../models/Setting");

exports.getSetting = async () => {
  const setting = await Setting.get();
  if (!setting) throw new Error("Không tìm thấy cấu hình");
  return setting;
};

exports.updateSetting = async (data) => {
  const updated = await Setting.update(data);
  if (!updated) throw new Error("Cập nhật thất bại");
  return await Setting.get();
};