const staffService = require("../services/staffService");

exports.getAll = async (req, res) => {
  try {
    const staff = await staffService.getAllStaff();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message || "Lỗi khi lấy danh sách thợ" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await staffService.getStaffById(id);
    if (!staff) return res.status(404).json({ error: "Thợ không tồn tại" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await staffService.getStaffStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message || "Lỗi khi lấy thống kê thợ" });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, specialization, phone, experience, image, status } = req.body;

    // Support both file upload and image URL from body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : image || null;

    if (!name || !specialization || !phone)
      return res
        .status(400)
        .json({ error: "Tất cả các trường đều là bắt buộc" });

    const result = await staffService.createStaff({
      name,
      specialization,
      phone,
      experience,
      image: imageUrl,
      status: status || "active",
    });

    res.status(201).json({ message: "Thợ được tạo thành công", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, phone, experience, image, status } = req.body;

    // Check if staff exists
    const existingStaff = await staffService.getStaffById(id);
    if (!existingStaff) {
      return res.status(404).json({ error: "Thợ không tồn tại" });
    }

    // Support both file upload and image URL from body
    let imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (image !== undefined) {
      imageUrl = image; // Use provided URL (could be empty string to remove image)
    } else {
      imageUrl = existingStaff.image; // Keep existing
    }

    if (!name || !specialization || !phone)
      return res
        .status(400)
        .json({ error: "Tất cả các trường đều là bắt buộc" });

    await staffService.updateStaff(id, {
      name,
      specialization,
      phone,
      experience,
      image: imageUrl,
      status,
    });

    res.json({ message: "Thợ được cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if staff exists
    const existingStaff = await staffService.getStaffById(id);
    if (!existingStaff) {
      return res.status(404).json({ error: "Thợ không tồn tại" });
    }

    await staffService.deleteStaff(id);
    res.json({ message: "Thợ được xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
