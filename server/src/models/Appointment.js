const db = require("../config/db");

const Appointment = {
  // Lấy tất cả lịch hẹn
  async getAll() {
    const sql = `
      SELECT 
        a.*,
        u.name as user_name,
        u.email as user_email,
        s.name as service_name,
        s.price as service_price,
        s.duration as service_duration,
        st.name as staff_name,
        st.specialization as staff_specialization
      FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN staff st ON a.staff_id = st.id
      ORDER BY a.created_at DESC, a.appointment_date DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  // Lấy lịch hẹn theo ID
  async getById(id) {
    const sql = `
      SELECT 
        a.*,
        u.name as user_name,
        u.email as user_email,
        s.name as service_name,
        s.price as service_price,
        s.duration as service_duration,
        st.name as staff_name,
        st.specialization as staff_specialization
      FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN staff st ON a.staff_id = st.id
      WHERE a.id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },

  // Lấy lịch hẹn theo ID người dùng
  async getByUserId(userId) {
    const sql = `
      SELECT 
        a.*,
        s.name as service_name,
        s.price as service_price,
        s.duration as service_duration,
        st.name as staff_name,
        st.specialization as staff_specialization
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN staff st ON a.staff_id = st.id
      WHERE a.user_id = ?
      ORDER BY 
        CASE 
          WHEN a.appointment_date >= NOW() THEN 0 
          ELSE 1 
        END,
        a.appointment_date ASC,
        a.created_at DESC
    `;
    const [rows] = await db.query(sql, [userId]);
    return rows;
  },

  // Tạo lịch hẹn
  async create(data) {
    const sql = `
      INSERT INTO appointments 
      (user_id, customer_name, customer_phone, service_id, staff_id, appointment_date, status, note) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.user_id,
      data.customer_name,
      data.customer_phone,
      data.service_id,
      data.staff_id,
      data.appointment_date,
      data.status || "pending",
      data.note || null,
    ]);
    return { id: result.insertId, ...data };
  },

  // Cập nhật lịch hẹn
  async update(id, data) {
    const fields = [];
    const values = [];

    if (data.customer_name !== undefined) {
      fields.push("customer_name = ?");
      values.push(data.customer_name);
    }
    if (data.customer_phone !== undefined) {
      fields.push("customer_phone = ?");
      values.push(data.customer_phone);
    }
    if (data.service_id !== undefined) {
      fields.push("service_id = ?");
      values.push(data.service_id);
    }
    if (data.staff_id !== undefined) {
      fields.push("staff_id = ?");
      values.push(data.staff_id);
    }
    if (data.appointment_date !== undefined) {
      fields.push("appointment_date = ?");
      values.push(data.appointment_date);
    }
    if (data.status !== undefined) {
      fields.push("status = ?");
      values.push(data.status);
    }
    if (data.note !== undefined) {
      fields.push("note = ?");
      values.push(data.note);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(id);
    const sql = `UPDATE appointments SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await db.query(sql, values);
    return result.affectedRows;
  },

  // Cập nhật trạng thái lịch hẹn
  async updateStatus(id, status) {
    const sql = "UPDATE appointments SET status = ? WHERE id = ?";
    const [result] = await db.query(sql, [status, id]);
    return result.affectedRows;
  },

  // Xóa lịch hẹn
  async delete(id) {
    const sql = "DELETE FROM appointments WHERE id = ?";
    const [result] = await db.query(sql, [id]);
    return result.affectedRows;
  },

  // Lấy số lượng lịch hẹn
  async getAppointmentCount() {
    const sql = "SELECT COUNT(*) as total FROM appointments";
    const [rows] = await db.query(sql);
    return rows[0].total;
  },

  // Lấy lịch hẹn theo trạng thái
  async getByStatus(status) {
    const sql = `
      SELECT 
        a.*,
        u.name as user_name,
        u.email as user_email,
        s.name as service_name,
        s.price as service_price,
        st.name as staff_name
      FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN staff st ON a.staff_id = st.id
      WHERE a.status = ?
      ORDER BY a.appointment_date ASC
    `;
    const [rows] = await db.query(sql, [status]);
    return rows;
  },

  // Lấy lịch hẹn theo khoảng thời gian
  async getByDateRange(startDate, endDate) {
    const sql = `
      SELECT 
        a.*,
        u.name as user_name,
        s.name as service_name,
        st.name as staff_name
      FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN staff st ON a.staff_id = st.id
      WHERE a.appointment_date BETWEEN ? AND ?
      ORDER BY a.appointment_date ASC
    `;
    const [rows] = await db.query(sql, [startDate, endDate]);
    return rows;
  },

  // Lấy lịch hẹn theo ID thợ barber
  async getByStaffId(staffId) {
    const sql = `
      SELECT 
        a.*,
        u.name as user_name,
        s.name as service_name
      FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN services s ON a.service_id = s.id
      WHERE a.staff_id = ?
      ORDER BY a.appointment_date DESC
    `;
    const [rows] = await db.query(sql, [staffId]);
    return rows;
  },

  // Kiểm tra nếu thời gian lịch hẹn có thể được sử dụng (không trùng lặp)
  async checkTimeConflict(
    staffId,
    appointmentDate,
    serviceId,
    excludeId = null
  ) {
    // Lấy thời gian của dịch vụ mới lịch hẹn
    const [newServiceRows] = await db.query(
      "SELECT duration FROM services WHERE id = ?",
      [serviceId]
    );
    const newServiceDuration = newServiceRows[0]?.duration || 60; // Mặc định 60 phút

    // Xử lý ngày lịch hẹn - xử lý cả định dạng ISO và MySQL datetime
    // Múi giờ +07:00 (Việt Nam) để đảm bảo đúng múi giờ
    let appointmentTime;
    if (typeof appointmentDate === "string" && appointmentDate.includes(" ")) {
      // Định dạng: "YYYY-MM-DD HH:mm:ss"
      const [datePart, timePart] = appointmentDate.split(" ");
      appointmentTime = new Date(`${datePart}T${timePart}+07:00`);
    } else {
      appointmentTime = new Date(appointmentDate);
    }

    const newAppointmentEnd = new Date(
      appointmentTime.getTime() + newServiceDuration * 60 * 1000
    );

    // Lấy tất cả lịch hẹn hoạt động cho thợ barber trong cùng ngày
    let sql = `
      SELECT 
        a.id, 
        a.appointment_date, 
        a.status,
        s.duration as service_duration
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      WHERE a.staff_id = ?
        AND DATE(a.appointment_date) = DATE(?)
        AND a.status NOT IN ('cancelled', 'completed')
    `;
    const params = [staffId, appointmentDate];

    // Loại trừ lịch hẹn hiện tại khi cập nhật
    if (excludeId) {
      sql += " AND a.id != ?";
      params.push(excludeId);
    }

    const [existingAppointments] = await db.query(sql, params);

    // Kiểm tra thời gian trùng lặp
    for (const existing of existingAppointments) {
      const existingDateStr = existing.appointment_date;
      let existingStart;

      if (existingDateStr instanceof Date) {
        existingStart = existingDateStr;
      } else if (typeof existingDateStr === "string") {
        // MySQL trả về datetime dưới dạng chuỗi trong định dạng "YYYY-MM-DD HH:mm:ss"
        const [datePart, timePart] = existingDateStr.split(" ");
        existingStart = new Date(`${datePart}T${timePart}+07:00`);
      } else {
        existingStart = new Date(existingDateStr);
      }

      const existingDuration = existing.service_duration || 60;
      const existingEnd = new Date(
        existingStart.getTime() + existingDuration * 60 * 1000
      );

      // Kiểm tra nếu thời gian trùng lặp
      // Trùng lặp xảy ra nếu: newStart < existingEnd và existingStart < newEnd
      if (appointmentTime < existingEnd && existingStart < newAppointmentEnd) {
        return true; // Trùng lặp tìm thấy
      }
    }

    return false; // Không có trùng lặp
  },
};

module.exports = Appointment;
