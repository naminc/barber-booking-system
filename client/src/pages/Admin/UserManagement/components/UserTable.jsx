import { Edit, Lock, Unlock, Mail, Phone, Loader2 } from "lucide-react";

function RoleBadge({ role }) {
  const config = {
    user: { text: "Khách hàng", color: "bg-blue-100 text-blue-800" },
    admin: { text: "Quản trị viên", color: "bg-green-100 text-green-800" },
  };
  const badge = config[role] || config.user;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}
    >
      {badge.text}
    </span>
  );
}

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

export default function UserTable({ users, onEdit, onToggleStatus, toggling }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tham gia
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
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={user.status || "active"} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.created_at ? (
                    <div className="flex flex-col">
                      <span>
                        {new Date(user.created_at).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(user.created_at).toLocaleTimeString("vi-VN")}
                      </span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.updated_at ? (
                    <div className="flex flex-col">
                      <span>
                        {new Date(user.updated_at).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(user.updated_at).toLocaleTimeString("vi-VN")}
                      </span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        onToggleStatus(
                          user.id,
                          user.status || "active",
                          user.name
                        )
                      }
                      disabled={toggling === user.id}
                      className={`p-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                        user.status === "active"
                          ? "text-orange-600 hover:text-orange-900"
                          : "text-green-600 hover:text-green-900"
                      }`}
                      title={
                        user.status === "active"
                          ? "Khóa tài khoản"
                          : "Mở khóa tài khoản"
                      }
                    >
                      {toggling === user.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : user.status === "active" ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Unlock className="h-4 w-4" />
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
