// services/settingService.js
const Setting = require("../models/Setting");

exports.getSetting = async () => {
  const setting = await Setting.get();
  if (!setting) throw new Error("Không tìm thấy cấu hình");
  return setting;
};

exports.updateSetting = async (data) => {
  // Loại bỏ các trường không được phép update (id, created_at, updated_at)
  // MySQL sẽ tự động cập nhật updated_at với ON UPDATE current_timestamp()
  const { id, created_at, updated_at, ...updateData } = data;
  
  const updated = await Setting.update(updateData);
  if (!updated) throw new Error("Cập nhật thất bại");
  return await Setting.get();
};