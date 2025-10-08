const staffService = require('../services/staffService');

exports.getAll = async (req, res) => {
  try {
    const staff = await staffService.getAllStaff();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await staffService.getStaffById(id);
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, specialization, phone, status } = req.body;
    if (!name || !specialization || !phone || !status)
      return res.status(400).json({ error: 'All fields are required' });
    const result = await staffService.createStaff({ name, specialization, phone, status });
    res.json({ message: 'Staff created', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};