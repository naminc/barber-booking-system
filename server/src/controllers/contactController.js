const contactService = require("../services/contactService");

exports.getAll = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactService.getContactById(id);
    if (!contact) {
      return res.status(404).json({ error: "Liên hệ không tồn tại" });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
    }

    const contactId = await contactService.createContact({
      name,
      email,
      phone,
      subject: subject || "Liên hệ từ website",
      message,
    });

    res.status(201).json({
      message: "Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.",
      contactId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await contactService.getContactById(id);
    if (!contact) {
      return res.status(404).json({ error: "Liên hệ không tồn tại" });
    }

    await contactService.deleteContact(id);
    res.json({ message: "Xóa liên hệ thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["unread", "read"].includes(status)) {
      return res.status(400).json({ error: "Trạng thái không hợp lệ" });
    }

    const contact = await contactService.getContactById(id);
    if (!contact) {
      return res.status(404).json({ error: "Liên hệ không tồn tại" });
    }

    await contactService.updateContactStatus(id, status);
    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
