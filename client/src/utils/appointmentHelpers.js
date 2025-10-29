export const getAppointmentStatusText = (status) => {
  const statusMap = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  };
  return statusMap[status] || status;
};

export const getAppointmentStatusColor = (status) => {
  const colorMap = {
    "Hoàn thành": "text-emerald-400",
    "Đã xác nhận": "text-blue-400",
    "Đã hủy": "text-rose-400",
    "Chờ xác nhận": "text-amber-300",
  };
  return colorMap[status] || "text-gray-400";
};