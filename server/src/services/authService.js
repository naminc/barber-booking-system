const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (data) => {
  const { name, email, password, phone, role } = data;

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role: role || "customer",
  });

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );
  return { user: newUser, token };
};

exports.login = async (email, password) => {
  const user = await User.findByEmail(email);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");
  delete user.password;

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );

  return { user, token };
};

