const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      message: "Đăng ký thành công",
      user: result.user,
      token: result.token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Đăng ký thất bại" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({
      message: "Đăng nhập thành công",
      user: result.user,
      token: result.token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Đăng nhập thất bại" });
  }
};