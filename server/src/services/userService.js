const User = require('../models/User');

exports.getAllUsers = async () => {
  return await User.getAll();
};

exports.createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userData = { ...data, password: hashedPassword };
  const newUser = await User.create(userData);
  return newUser;
};

exports.deleteUser = async (id) => {
  const affected = await User.delete(id);
  if (affected === 0) throw new Error("User not found");
  return { message: "User deleted successfully" };
};