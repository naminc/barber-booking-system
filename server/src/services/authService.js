const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (data) => {
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
  });

  const token = jwt.sign(
    { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );
  return { user: newUser, token };
};

exports.login = async (email, password) => {
  const user = await User.findByEmail(email);
  if (!user) throw new Error("Tài khoản không tồn tại");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Mật khẩu không chính xác");
  delete user.password;
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );
  return { user, token };
};