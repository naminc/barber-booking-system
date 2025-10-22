const serviceService = require('../services/serviceService');

exports.getAll = async (req, res) => {
  try {
    const service = await serviceService.getAllService();
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceService.getServiceById(id);
    if (!service) return res.status(404).json({ error: 'Dịch vụ không tồn tại' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description, price, duration, image, status } = req.body;
    if (!name || !description || !price || !duration || !image || !status)
      return res.status(400).json({ error: 'Tất cả các trường đều là bắt buộc' });
    const result = await serviceService.createService({ name, description, price, duration, image, status });
    res.json({ message: 'Dịch vụ được tạo thành công', data: result });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Tạo dịch vụ thất bại' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration, image, status } = req.body;
    const service = await serviceService.getServiceById(id);
    if (!service) return res.status(404).json({ error: 'Dịch vụ không tồn tại' });
    
    const result = await serviceService.updateService(id, { name, description, price, duration, image, status });
    res.json({ message: 'Cập nhật dịch vụ thành công', service: result });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Cập nhật dịch vụ thất bại' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceService.getServiceById(id);
    if (!service) return res.status(404).json({ error: 'Dịch vụ không tồn tại' });
    
    await serviceService.deleteService(id);
    res.json({ message: 'Xóa dịch vụ thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Xóa dịch vụ thất bại' });
  }
};