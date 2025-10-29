import {
  Edit,
  Trash2,
  Scissors,
  DollarSign,
  Clock,
  Loader2,
} from "lucide-react";
import { formatShortDate, formatTime } from "../../../../utils/dateHelpers";
import { formatPrice, getImageUrl } from "../../../../utils/formatHelpers";

function StatusBadge({ status }) {
  const config = {
    active: { text: "Hoạt động", color: "bg-green-100 text-green-800" },
    inactive: { text: "Không hoạt động", color: "bg-red-100 text-red-800" },
  };
  const badge = config[status] || config.active;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}
    >
      {badge.text}
    </span>
  );
}

export default function ServiceTable({ services, onEdit, onDelete, deleting }) {

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hình ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dịch vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cập nhật cuối
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex-shrink-0 h-16 w-16">
                    {service.image ? (
                      <img
                        src={getImageUrl(service.image)}
                        alt={service.name}
                        className="h-16 w-16 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';
                        }}
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Scissors className="h-8 w-8 text-blue-600" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {service.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {service.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    {formatPrice(service.price)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    {service.duration} phút
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={service.status || "active"} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.created_at ? (
                    <div className="flex flex-col">
                      <span>{formatShortDate(service.created_at)}</span>
                      <span className="text-xs text-gray-400">
                        {formatTime(service.created_at)}
                      </span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.updated_at ? (
                    <div className="flex flex-col">
                      <span>{formatShortDate(service.updated_at)}</span>
                      <span className="text-xs text-gray-400">
                        {formatTime(service.updated_at)}
                      </span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(service)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(service.id, service.name)}
                      disabled={deleting === service.id}
                      className="text-red-600 hover:text-red-900 p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Xóa dịch vụ"
                    >
                      {deleting === service.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
