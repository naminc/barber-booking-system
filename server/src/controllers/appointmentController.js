const appointmentService = require("../services/appointmentService");

// Get all appointments
exports.getAll = async (req, res) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointment by ID
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

// Get user's appointments
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

// Get appointments by user ID (admin)
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

// Get appointments by status
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

// Get appointments by staff ID
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

// Get appointments by date range
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

// Create appointment
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

    // Validation
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

    // Check if appointment date is in the past
    // Handle both ISO and MySQL datetime formats
    let appointmentTime;
    if (
      typeof appointment_date === "string" &&
      appointment_date.includes(" ")
    ) {
      // MySQL format: "YYYY-MM-DD HH:mm:ss"
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

    // Check for time conflicts
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

    // Determine user_id:
    // - If request body explicitly includes user_id (from admin), use it (can be null for walk-in)
    // - Otherwise, use the authenticated user's id
    let finalUserId;
    if (user_id !== undefined) {
      // Admin explicitly set user_id (can be null)
      finalUserId = user_id;
    } else {
      // Regular user or no user_id in body - use authenticated user's id
      finalUserId = req.user ? req.user.id : null;
    }

    const appointmentData = {
      user_id: finalUserId,
      customer_name,
      customer_phone,
      service_id,
      staff_id,
      appointment_date,
      // Admin can set custom status, regular users always get 'pending'
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

// Update appointment
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getAppointmentById(id);

    if (!appointment) {
      return res.status(404).json({ error: "Lịch hẹn không tồn tại" });
    }

    // Check if user is the owner or admin
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

    // If updating appointment_date or staff_id, check for conflicts
    if (updateData.appointment_date || updateData.staff_id) {
      const checkDate =
        updateData.appointment_date || appointment.appointment_date;
      const checkStaffId = updateData.staff_id || appointment.staff_id;

      // Check if new date is in the past
      if (updateData.appointment_date) {
        const appointmentTime = new Date(updateData.appointment_date);
        const now = new Date();
        if (appointmentTime <= now) {
          return res.status(400).json({
            error: "Không thể đặt lịch trong quá khứ hoặc thời gian hiện tại",
          });
        }
      }

      // Check for time conflicts (exclude current appointment)
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

// Update appointment status
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

// Delete appointment
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getAppointmentById(id);

    if (!appointment) {
      return res.status(404).json({ error: "Lịch hẹn không tồn tại" });
    }

    // Check if user is the owner or admin
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

// Get appointment statistics
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
