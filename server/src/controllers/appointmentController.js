const appointmentService = require("../services/appointmentService");

// Lấy tất cả lịch hẹn
exports.getAll = async (req, res) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy lịch hẹn theo ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Lịch hẹn không tồn tại" });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy lịch hẹn của người dùng
exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await appointmentService.getAppointmentsByUserId(
      userId
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy lịch hẹn theo ID người dùng (admin)
exports.getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await appointmentService.getAppointmentsByUserId(
      userId
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy lịch hẹn theo trạng thái
exports.getByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const appointments = await appointmentService.getAppointmentsByStatus(
      status
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy lịch hẹn theo ID thợ barber
exports.getByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;
    const appointments = await appointmentService.getAppointmentsByStaffId(
      staffId
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy lịch hẹn theo khoảng thời gian
exports.getByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Ngày bắt đầu và ngày kết thúc là bắt buộc" });
    }
    const appointments = await appointmentService.getAppointmentsByDateRange(
      startDate,
      endDate
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo lịch hẹn
exports.create = async (req, res) => {
  try {
    const {
      user_id,
      customer_name,
      customer_phone,
      service_id,
      staff_id,
      appointment_date,
      status,
      note,
    } = req.body;

    // Kiểm tra dữ liệu
    if (
      !customer_name ||
      !customer_phone ||
      !service_id ||
      !staff_id ||
      !appointment_date
    ) {
      return res.status(400).json({
        error:
          "Vui lòng điền đầy đủ thông tin: tên, số điện thoại, dịch vụ, barber và thời gian",
      });
    }

    // Kiểm tra nếu thời gian lịch hẹn là quá khứ
    // Xử lý cả định dạng ISO và MySQL datetime
    let appointmentTime;
    if (
      typeof appointment_date === "string" &&
      appointment_date.includes(" ")
    ) {
      // Định dạng MySQL: "YYYY-MM-DD HH:mm:ss"
      appointmentTime = new Date(appointment_date.replace(" ", "T"));
    } else {
      appointmentTime = new Date(appointment_date);
    }

    const now = new Date();
    if (appointmentTime <= now) {
      return res.status(400).json({
        error: "Không thể đặt lịch trong quá khứ hoặc thời gian hiện tại",
      });
    }

    // Kiểm tra thời gian trùng lặp
    const hasConflict = await appointmentService.checkTimeConflict(
      staff_id,
      appointment_date,
      service_id
    );

    if (hasConflict) {
      return res.status(409).json({
        error: "Thời gian này đã có người đặt. Vui lòng chọn thời gian khác.",
      });
    }

    // Xác định user_id:
    // - Nếu request body bao gồm user_id (từ admin), sử dụng nó (có thể là null cho khách đến)
    // - Nếu không, sử dụng ID của người dùng đã xác thực
    let finalUserId;
    if (user_id !== undefined) {
      // Admin rõ ràng đặt user_id (có thể là null)
      finalUserId = user_id;
    } else {
      // Người dùng thường hoặc không có user_id trong body - sử dụng ID của người dùng đã xác thực
      finalUserId = req.user ? req.user.id : null;
    }

    const appointmentData = {
      user_id: finalUserId,
      customer_name,
      customer_phone,
      service_id,
      staff_id,
      appointment_date,
      // Admin có thể đặt trạng thái tùy chỉnh, người dùng thường luôn nhận 'pending'
      status: status && req.user && req.user.role === "admin" ? status : "pending",
      note,
    };

    const result = await appointmentService.createAppointment(appointmentData);
    res.status(201).json({
      message:
        "Đặt lịch thành công! Chúng tôi sẽ liên hệ để xác nhận sớm nhất có thể.",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Tạo lịch hẹn thất bại" });
  }
};

// Cập nhật lịch hẹn
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getAppointmentById(id);

    if (!appointment) {
      return res.status(404).json({ error: "Lịch hẹn không tồn tại" });
    }

    // Kiểm tra nếu người dùng là chủ sở hữu hoặc admin
    if (req.user.role !== "admin" && appointment.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Bạn không có quyền cập nhật lịch hẹn này" });
    }

    const updateData = {};
    const allowedFields = [
      "customer_name",
      "customer_phone",
      "service_id",
      "staff_id",
      "appointment_date",
      "note",
      "status",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Nếu cập nhật appointment_date hoặc staff_id, kiểm tra thời gian trùng lặp
    if (updateData.appointment_date || updateData.staff_id) {
      const checkDate =
        updateData.appointment_date || appointment.appointment_date;
      const checkStaffId = updateData.staff_id || appointment.staff_id;

      // Kiểm tra nếu ngày mới là quá khứ
      if (updateData.appointment_date) {
        const appointmentTime = new Date(updateData.appointment_date);
        const now = new Date();
        if (appointmentTime <= now) {
          return res.status(400).json({
            error: "Không thể đặt lịch trong quá khứ hoặc thời gian hiện tại",
          });
        }
      }

      // Kiểm tra thời gian trùng lặp (loại trừ lịch hẹn hiện tại)
      const checkServiceId = updateData.service_id || appointment.service_id;
      const hasConflict = await appointmentService.checkTimeConflict(
        checkStaffId,
        checkDate,
        checkServiceId,
        id
      );
      if (hasConflict) {
        return res.status(409).json({
          error: "Thời gian này đã có người đặt. Vui lòng chọn thời gian khác.",
        });
      }
    }

    const result = await appointmentService.updateAppointment(id, updateData);
    res.json({ message: "Cập nhật lịch hẹn thành công", data: result });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Cập nhật lịch hẹn thất bại" });
  }
};

// Cập nhật trạng thái lịch hẹn
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !status ||
      !["pending", "confirmed", "completed", "cancelled"].includes(status)
    ) {
      return res.status(400).json({ error: "Trạng thái không hợp lệ" });
    }

    const appointment = await appointmentService.getAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Lịch hẹn không tồn tại" });
    }

    await appointmentService.updateAppointmentStatus(id, status);
    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Cập nhật trạng thái thất bại" });
  }
};

// Xóa lịch hẹn
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getAppointmentById(id);

    if (!appointment) {
      return res.status(404).json({ error: "Lịch hẹn không tồn tại" });
    }

    // Kiểm tra nếu người dùng là chủ sở hữu hoặc admin
    if (req.user.role !== "admin" && appointment.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Bạn không có quyền xóa lịch hẹn này" });
    }

    await appointmentService.deleteAppointment(id);
    res.json({ message: "Xóa lịch hẹn thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Xóa lịch hẹn thất bại" });
  }
};

// Hủy lịch hẹn (người dùng)
exports.cancel = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getAppointmentById(id);

    if (!appointment) {
      return res.status(404).json({ error: "Lịch hẹn không tồn tại" });
    }

    // Kiểm tra nếu người dùng là chủ sở hữu
    if (appointment.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Bạn không có quyền hủy lịch hẹn này" });
    }

    // Kiểm tra nếu lịch hẹn có thể được hủy
    if (appointment.status === "cancelled") {
      return res.status(400).json({ error: "Lịch hẹn này đã được hủy" });
    }

    if (appointment.status === "completed") {
      return res.status(400).json({ error: "Không thể hủy lịch hẹn đã hoàn thành" });
    }

    // Kiểm tra nếu ngày lịch hẹn đã qua
    const appointmentTime = new Date(appointment.appointment_date);
    const now = new Date();
    if (appointmentTime <= now) {
      return res.status(400).json({ 
        error: "Không thể hủy lịch hẹn đã qua thời gian" 
      });
    }

    // Kiểm tra nếu hủy lịch hẹn là ít nhất 1 giờ trước lịch hẹn
    const timeDiff = appointmentTime - now;
    const oneHourInMs = 60 * 60 * 1000; // 1 giờ trong milliseconds
    if (timeDiff < oneHourInMs) {
      return res.status(400).json({ 
        error: "Chỉ có thể hủy lịch hẹn trước 1 giờ" 
      });
    }

    await appointmentService.updateAppointmentStatus(id, "cancelled");
    res.json({ message: "Hủy lịch hẹn thành công" });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Hủy lịch hẹn thất bại" });
  }
};

// Lấy thống kê lịch hẹn
exports.getStats = async (req, res) => {
  try {
    const total = await appointmentService.getAppointmentCount();
    const pending = await appointmentService.getAppointmentsByStatus("pending");
    const confirmed = await appointmentService.getAppointmentsByStatus(
      "confirmed"
    );
    const completed = await appointmentService.getAppointmentsByStatus(
      "completed"
    );
    const cancelled = await appointmentService.getAppointmentsByStatus(
      "cancelled"
    );

    res.json({
      total,
      pending: pending.length,
      confirmed: confirmed.length,
      completed: completed.length,
      cancelled: cancelled.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
