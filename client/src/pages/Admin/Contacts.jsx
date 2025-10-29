import { useState, Fragment } from "react";
import {
  Mail,
  Trash2,
  RefreshCw,
  MessageSquare,
  User,
  Phone,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useContacts } from "../../hooks";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import { formatDateTime } from "../../utils/dateHelpers";

export default function Contacts() {
  const {
    contacts,
    loading,
    error,
    deleteContact,
    updateContactStatus,
    fetchContacts,
  } = useContacts();
  const [deleting, setDeleting] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const handleDelete = async (id, name) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa liên hệ từ "${name}"? Hành động này không thể hoàn tác.`
      )
    ) {
      try {
        setDeleting(id);
        const result = await deleteContact(id);
        toast.success(result.message || "Xóa liên hệ thành công");
      } catch (err) {
        toast.error(err.error || "Xóa liên hệ thất bại");
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "read" ? "unread" : "read";
    try {
      setUpdatingStatus(id);
      const result = await updateContactStatus(id, newStatus);
      toast.success(result.message || "Cập nhật trạng thái thành công");
    } catch (err) {
      toast.error(err.error || "Cập nhật trạng thái thất bại");
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchContacts} />;

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Quản lý liên hệ
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý các liên hệ từ khách hàng
              </p>
            </div>
          </div>
          <button
            onClick={fetchContacts}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            title="Làm mới"
          >
            <RefreshCw className="h-4 w-4" />
            Làm mới
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng liên hệ</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <EyeOff className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chưa đọc</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter((c) => c.status === "unread").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã đọc</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter((c) => c.status === "read").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      {contacts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người gửi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiêu đề
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <Fragment key={contact.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm font-medium text-gray-900">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            {contact.name}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Mail className="h-3 w-3 mr-2" />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Phone className="h-3 w-3 mr-2" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {contact.subject}
                        </div>
                        <button
                          onClick={() =>
                            setExpandedId(
                              expandedId === contact.id ? null : contact.id
                            )
                          }
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                        >
                          {expandedId === contact.id
                            ? "Ẩn nội dung"
                            : "Xem nội dung"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contact.status === "read"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {contact.status === "read" ? (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Đã đọc
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" />
                              Chưa đọc
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDateTime(contact.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleToggleStatus(contact.id, contact.status)
                            }
                            disabled={updatingStatus === contact.id}
                            className={`transition-colors disabled:opacity-50 ${
                              contact.status === "read"
                                ? "text-orange-600 hover:text-orange-900"
                                : "text-green-600 hover:text-green-900"
                            }`}
                            title={
                              contact.status === "read"
                                ? "Đánh dấu chưa đọc"
                                : "Đánh dấu đã đọc"
                            }
                          >
                            {contact.status === "read" ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(contact.id, contact.name)
                            }
                            disabled={deleting === contact.id}
                            className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === contact.id && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 bg-gray-50">
                          <div className="text-sm text-gray-700">
                            <strong className="text-gray-900">Nội dung:</strong>
                            <p className="mt-2 whitespace-pre-wrap">
                              {contact.message}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chưa có liên hệ nào
            </h3>
            <p className="text-gray-600">
              Các liên hệ từ khách hàng sẽ hiển thị ở đây
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
