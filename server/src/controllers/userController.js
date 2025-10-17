const userService = require("../services/userService");

exports.getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Lấy danh sách người dùng thất bại' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password || !phone || !role)
      return res.status(400).json({ error: "Tất cả các trường đều là bắt buộc" });
    const newUser = await userService.createUser({
      name,
      email,
      password,
      phone,
      role,
    });
    res.json({ message: "Tạo tài khoản thành công", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Tạo tài khoản thất bại' });
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
    if (msg === "Tài khoản không tồn tại") return res.status(404).json({ error: msg });
    res.status(500).json({ error: msg || 'Xóa tài khoản thất bại'});
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
    res.status(400).json({ error: err.message || 'Lấy thông tin tài khoản thất bại' });
  }
};