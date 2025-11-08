const Appointment = require("../models/Appointment");
const Staff = require("../models/Staff");
const Service = require("../models/Service");
const db = require("../config/db");

exports.getDashboardStats = async () => {
  try {
    // Get total appointments
    const totalAppointments = await Appointment.getAppointmentCount();

    // Get revenue from completed appointments
    const [revenueResult] = await db.query(`
      SELECT SUM(s.price) as total_revenue
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      WHERE a.status = 'completed'
    `);
    const totalRevenue = revenueResult[0].total_revenue || 0;

    // Get staff count
    const totalStaff = await Staff.getStaffCount();
    const activeStaff = await Staff.getActiveStaffCount();

    // Get service count
    const [serviceResult] = await db.query(
      "SELECT COUNT(*) as total FROM services"
    );
    const totalServices = serviceResult[0].total;

    // Get appointments by status
    const [statusCounts] = await db.query(`
      SELECT 
        status,
        COUNT(*) as count
      FROM appointments
      GROUP BY status
    `);

    const statusStats = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    statusCounts.forEach((row) => {
      statusStats[row.status] = row.count;
    });

    return {
      totalAppointments,
      totalRevenue,
      totalStaff,
      activeStaff,
      totalServices,
      statusStats,
    };
  } catch (error) {
    throw error;
  }
};

exports.getRecentAppointments = async (limit = 10) => {
  try {
    const sql = `
      SELECT 
        a.id,
        a.customer_name,
        a.appointment_date,
        a.status,
        s.name as service_name,
        st.name as staff_name,
        u.name as user_name
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN staff st ON a.staff_id = st.id
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT ?
    `;
    const [rows] = await db.query(sql, [limit]);
    return rows;
  } catch (error) {
    throw error;
  }
};

exports.getUpcomingAppointments = async (limit = 10) => {
  try {
    const sql = `
      SELECT 
        a.id,
        a.customer_name,
        a.appointment_date,
        a.status,
        s.name as service_name,
        st.name as staff_name,
        u.name as user_name
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN staff st ON a.staff_id = st.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.appointment_date >= NOW()
        AND a.status IN ('pending', 'confirmed')
      ORDER BY a.appointment_date ASC
      LIMIT ?
    `;
    const [rows] = await db.query(sql, [limit]);
    return rows;
  } catch (error) {
    throw error;
  }
};

exports.getRevenueByMonth = async (year = new Date().getFullYear()) => {
  try {
    const sql = `
      SELECT 
        MONTH(a.appointment_date) as month,
        SUM(s.price) as revenue,
        COUNT(a.id) as appointment_count
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      WHERE YEAR(a.appointment_date) = ?
        AND a.status = 'completed'
      GROUP BY MONTH(a.appointment_date)
      ORDER BY month
    `;
    const [rows] = await db.query(sql, [year]);
    
    // Fill in months with no data
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      revenue: 0,
      appointment_count: 0,
    }));

    rows.forEach((row) => {
      monthlyData[row.month - 1] = {
        month: row.month,
        revenue: Number(row.revenue) || 0,
        appointment_count: row.appointment_count,
      };
    });

    return monthlyData;
  } catch (error) {
    throw error;
  }
};

exports.getTodayStats = async () => {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const [todayAppointments] = await db.query(
      `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
      FROM appointments
      WHERE DATE(appointment_date) = ?
    `,
      [todayStr]
    );

    const [todayRevenue] = await db.query(
      `
      SELECT SUM(s.price) as revenue
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      WHERE DATE(a.appointment_date) = ?
        AND a.status = 'completed'
    `,
      [todayStr]
    );

    return {
      totalAppointments: todayAppointments[0].total || 0,
      completed: todayAppointments[0].completed || 0,
      confirmed: todayAppointments[0].confirmed || 0,
      pending: todayAppointments[0].pending || 0,
      revenue: Number(todayRevenue[0].revenue) || 0,
    };
  } catch (error) {
    throw error;
  }
};

