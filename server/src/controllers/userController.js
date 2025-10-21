const userService = require("../services/userService");

exports.getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Lấy danh sách người dùng thất bại" });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, password, phone, role, status } = req.body;

    const newUser = await userService.createUser({
      name,
      email,
      password,
      phone: phone || null,
      role,
      status: status || "active",
    });

    res.json({ message: "Tạo tài khoản thành công", user: newUser });
  } catch (err) {
    const msg = err.message;
    if (
      msg === "Email đã được sử dụng" ||
      msg === "Số điện thoại đã được sử dụng"
    ) {
      return res.status(400).json({ error: msg });
    }
    res.status(500).json({ error: msg || "Tạo tài khoản thất bại" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (err) {
    const msg = err.message;
    if (msg === "ID là bắt buộc") return res.status(400).json({ error: msg });
    if (msg === "Tài khoản không tồn tại")
      return res.status(404).json({ error: msg });
    res.status(500).json({ error: msg || "Xóa tài khoản thất bại" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getProfile(userId);

    res.json({
      message: "Lấy thông tin tài khoản thành công",
      user,
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Lấy thông tin tài khoản thất bại" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.user.id !== parseInt(id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Bạn không có quyền cập nhật thông tin này" });
    }
    if (req.user.role !== "admin" && data.role) {
      delete data.role;
    }

    const updatedUser = await userService.updateProfile(id, data);
    res.json({
      message: "Cập nhật tài khoản thành công",
      user: updatedUser,
    });
  } catch (err) {
    const msg = err.message;
    if (msg === "Tài khoản không tồn tại")
      return res.status(404).json({ error: msg });
    if (msg === "Email đã được sử dụng")
      return res.status(400).json({ error: msg });
    if (msg === "Số điện thoại đã được sử dụng")
      return res.status(400).json({ error: msg });
    res.status(500).json({ error: msg || "Cập nhật tài khoản thất bại" });
  }
};
