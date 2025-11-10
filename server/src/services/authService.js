const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");
const emailService = require("../services/emailService");

exports.register = async (data) => {
  try {
    const { name, email, password, role } = data;
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error("Email đã được đăng ký");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      status: "active",
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );
    return { user: newUser, token };
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error("Tài khoản không tồn tại");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Mật khẩu không chính xác");
    }
    if (user.status === "inactive") {
      throw new Error(
        "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên"
      );
    }

    delete user.password;

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );
    return { user, token };
  } catch (error) {
    throw error;
  }
};

/**
 * Gửi email đặt lại mật khẩu
 * @param {string} email - Email người dùng
 */
exports.forgotPassword = async (email) => {
  try {
    const user = await User.findByEmail(email);
    
    if (!user) {
      return { message: "Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu." };
    }

    if (user.status === "inactive") {
      return { message: "Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu." };
    }

    const resetToken = await PasswordReset.createToken(user.id);

    try {
      await emailService.sendPasswordResetEmail(user.email, resetToken, user.name);
    } catch (emailError) {
      await PasswordReset.deleteToken(resetToken);
      throw new Error("Không thể gửi email. Vui lòng thử lại sau.");
    }

    return { message: "Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu." };
  } catch (error) {
    throw error;
  }
};

exports.resetPassword = async (token, newPassword) => {
  try {
    const resetRecord = await PasswordReset.findByToken(token);
    if (!resetRecord) {
      throw new Error("Token không hợp lệ hoặc đã hết hạn");
    }
    const user = await User.findById(resetRecord.user_id);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(resetRecord.user_id, { password: hashedPassword });
    await PasswordReset.deleteToken(token);
    return { message: "Đặt lại mật khẩu thành công" };
  } catch (error) {
    throw error;
  }
};