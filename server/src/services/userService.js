const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getAllUsers = async () => {
  return await User.getAll();
};

exports.createUser = async (data) => {
  const existingUserByEmail = await User.findByEmail(data.email);
  if (existingUserByEmail) {
    throw new Error("Email đã được sử dụng");
  }

  if (data.phone) {
    const existingUserByPhone = await User.findByPhone(data.phone);
    if (existingUserByPhone) {
      throw new Error("Số điện thoại đã được sử dụng");
    }
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userData = { ...data, password: hashedPassword };
  const newUser = await User.create(userData);
  return newUser;
};

exports.deleteUser = async (id) => {
  const affected = await User.delete(id);
  if (affected === 0) throw new Error("Tài khoản không tồn tại");
  return { message: "Xóa tài khoản thành công" };
};

exports.getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Tài khoản không tồn tại");
  return user;
};

exports.updateProfile = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new Error("Tài khoản không tồn tại");

  if (data.email && data.email !== user.email) {
    const existingUser = await User.findByEmail(data.email);
    if (existingUser && existingUser.id !== parseInt(id)) {
      throw new Error("Email đã được sử dụng");
    }
  }

  if (data.phone !== undefined && data.phone !== user.phone) {
    if (data.phone) {
      const existingUserByPhone = await User.findByPhone(data.phone);
      if (existingUserByPhone && existingUserByPhone.id !== parseInt(id)) {
        throw new Error("Số điện thoại đã được sử dụng");
      }
    }
  }

  const updateData = {};
  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.phone !== undefined) updateData.phone = data.phone || null;
  if (data.role) updateData.role = data.role;
  if (data.status) updateData.status = data.status;

  if (data.password && data.password.trim() !== "") {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await User.update(id, updateData);
  return updatedUser;
};
