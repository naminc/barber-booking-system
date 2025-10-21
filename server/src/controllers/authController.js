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
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({ 
      error: err.message || "Đăng ký thất bại",
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        error: "Email và mật khẩu không được để trống" 
      });
    }

    const result = await authService.login(email, password);
    res.json({
      message: "Đăng nhập thành công",
      user: result.user,
      token: result.token,
    });
  } catch (err) {
    
    const errorMessage = err.message || "Đăng nhập thất bại";
    const statusCode = err.statusCode || 400;
    
    res.status(statusCode).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};