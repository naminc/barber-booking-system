const userService = require("../services/userService");

exports.getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password || !phone || !role)
      return res.status(400).json({ error: "All fields are required" });
    const newUser = await userService.createUser({
      name,
      email,
      password,
      phone,
      role,
    });
    res.json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (err) {
    const msg = err.message;
    if (msg === "ID is required") return res.status(400).json({ error: msg });
    if (msg === "User not found") return res.status(404).json({ error: msg });
    res.status(500).json({ error: msg });
  }
};