import {
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  User,
  Phone,
  Loader2,
} from "lucide-react";
import { parseAppointmentDate } from "../../../../utils/dateHelpers";
import { getAppointmentStatusText } from "../../../../utils/appointmentHelpers";

function StatusBadge({ status }) {
  const config = {
    pending: {
      text: "Chờ xác nhận",
      color: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="h-4 w-4" />,
    },
    confirmed: {
      text: "Đã xác nhận",
      color: "bg-blue-100 text-blue-800",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    completed: {
      text: "Hoàn thành",
      color: "bg-green-100 text-green-800",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    cancelled: {
      text: "Đã hủy",
      color: "bg-red-100 text-red-800",
      icon: <XCircle className="h-4 w-4" />,
    },
  };

  const badge = config[status] || config.pending;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}
    >
      {badge.icon}
      {badge.text}
    </span>
  );
}

export default function AppointmentTable({
  appointments,
  onUpdateStatus,
  onDelete,
  updating,
  deleting,
}) {
  const handleStatusChange = async (id, newStatus) => {
    if (onUpdateStatus) {
      await onUpdateStatus(id, newStatus);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dịch vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày & Giờ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thợ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => {
              const { date, time } = parseAppointmentDate(
                appointment.appointment_date
              );

              return (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.customer_name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {appointment.customer_phone || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.service_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{date}</div>
                    <div className="text-gray-500">{time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.staff_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={appointment.status} />
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(appointment.id, e.target.value)
                        }
                        disabled={updating === appointment.id}
                        className="text-xs bg-white text-gray-900 border border-gray-300 rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 font-medium"
                      >
                        <option value="pending">Chờ xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDelete(appointment.id)}
                        disabled={deleting === appointment.id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        title="Xóa lịch hẹn"
                      >
                        {deleting === appointment.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
