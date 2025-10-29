const db = require("../config/db");

const Appointment = {
  // Get all appointments
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
      ORDER BY a.appointment_date DESC, a.created_at DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  // Get appointment by ID
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

  // Get appointments by user ID
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
      ORDER BY a.appointment_date DESC, a.created_at DESC
    `;
    const [rows] = await db.query(sql, [userId]);
    return rows;
  },

  // Create appointment
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

  // Update appointment
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

  // Update appointment status
  async updateStatus(id, status) {
    const sql = "UPDATE appointments SET status = ? WHERE id = ?";
    const [result] = await db.query(sql, [status, id]);
    return result.affectedRows;
  },

  // Delete appointment
  async delete(id) {
    const sql = "DELETE FROM appointments WHERE id = ?";
    const [result] = await db.query(sql, [id]);
    return result.affectedRows;
  },

  // Get appointment count
  async getAppointmentCount() {
    const sql = "SELECT COUNT(*) as total FROM appointments";
    const [rows] = await db.query(sql);
    return rows[0].total;
  },

  // Get appointments by status
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

  // Get appointments by date range
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

  // Get appointments by staff
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

  // Check if time slot is available (no conflict)
  async checkTimeConflict(
    staffId,
    appointmentDate,
    serviceId,
    excludeId = null
  ) {
    // Get duration of the new appointment's service
    const [newServiceRows] = await db.query(
      "SELECT duration FROM services WHERE id = ?",
      [serviceId]
    );
    const newServiceDuration = newServiceRows[0]?.duration || 60; // Default 60 minutes

    // Calculate time window to check
    const appointmentTime = new Date(appointmentDate);
    const newAppointmentEnd = new Date(
      appointmentTime.getTime() + newServiceDuration * 60 * 1000
    );

    // Get all active appointments for this staff on the same day
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

    // Exclude current appointment when updating
    if (excludeId) {
      sql += " AND a.id != ?";
      params.push(excludeId);
    }

    const [existingAppointments] = await db.query(sql, params);

    // Check for time slot overlap
    for (const existing of existingAppointments) {
      const existingStart = new Date(existing.appointment_date);
      const existingDuration = existing.service_duration || 60;
      const existingEnd = new Date(
        existingStart.getTime() + existingDuration * 60 * 1000
      );

      // Check if time slots overlap
      // Overlap occurs if: newStart < existingEnd AND existingStart < newEnd
      if (appointmentTime < existingEnd && existingStart < newAppointmentEnd) {
        return true; // Conflict found
      }
    }

    return false; // No conflict
  },
};

module.exports = Appointment;
