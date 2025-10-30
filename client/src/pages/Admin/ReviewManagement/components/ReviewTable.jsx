import { Fragment } from "react";
import {
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Loader2,
} from "lucide-react";
import { formatShortDate, formatTime } from "../../../../utils/dateHelpers";

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">{rating}/5</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    approved: {
      text: "Đã duyệt",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    pending: {
      text: "Chờ duyệt",
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    rejected: {
      text: "Từ chối",
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  };
  const badge = config[status] || config.pending;
  const Icon = badge.icon;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}
    >
      <Icon className="h-3 w-3 mr-1" />
      {badge.text}
    </span>
  );
}

function ExperienceBadge({ experience }) {
  const config = {
    excellent: {
      text: "Tuyệt vời",
      color: "bg-purple-100 text-purple-800",
    },
    good: {
      text: "Tốt",
      color: "bg-blue-100 text-blue-800",
    },
    average: {
      text: "Bình thường",
      color: "bg-gray-100 text-gray-800",
    },
    poor: {
      text: "Không hài lòng",
      color: "bg-red-100 text-red-800",
    },
  };
  const badge = config[experience] || config.average;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}
    >
      {badge.text}
    </span>
  );
}

export default function ReviewTable({
  reviews,
  onToggleStatus,
  onDelete,
  toggling,
  deleting,
  expandedId,
  onToggleExpand,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dịch vụ / Thợ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đánh giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <Fragment key={review.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700">
                            {review.user_name
                              ? review.user_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "KH"}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {review.user_name || "Khách hàng"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.user_email || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {review.service_name || "N/A"}
                      </div>
                      <div className="text-gray-500">
                        Thợ: {review.staff_name || "N/A"}
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleExpand(review.id)}
                      className="text-xs text-blue-600 hover:text-blue-800 mt-1 transition-colors"
                    >
                      {expandedId === review.id
                        ? "Ẩn chi tiết"
                        : "Xem chi tiết"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RatingStars rating={review.rating || 0} />
                    <div className="mt-1">
                      <ExperienceBadge experience={review.experience} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={review.status || "pending"} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {review.created_at ? (
                      <div className="flex flex-col">
                        <span>{formatShortDate(review.created_at)}</span>
                        <span className="text-xs text-gray-400">
                          {formatTime(review.created_at)}
                        </span>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onToggleStatus(
                            review.id,
                            review.status || "pending",
                            review.user_name
                          )
                        }
                        disabled={toggling === review.id}
                        className={`transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          review.status === "approved"
                            ? "text-orange-600 hover:text-orange-900"
                            : "text-green-600 hover:text-green-900"
                        }`}
                        title={
                          review.status === "approved"
                            ? "Từ chối đánh giá"
                            : "Duyệt đánh giá"
                        }
                      >
                        {toggling === review.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : review.status === "approved" ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => onDelete(review.id, review.user_name)}
                        disabled={deleting === review.id}
                        className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Xóa đánh giá"
                      >
                        {deleting === review.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === review.id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <strong className="text-sm font-medium text-gray-900">
                            Nhận xét chi tiết:
                          </strong>
                          <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap break-words">
                            {review.comment || "Không có nhận xét"}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                          <div>
                            <span className="text-xs font-medium text-gray-500">
                              Ngày cập nhật:
                            </span>
                            <p className="text-sm text-gray-900">
                              {review.updated_at
                                ? `${formatShortDate(
                                    review.updated_at
                                  )} ${formatTime(review.updated_at)}`
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500">
                              ID đánh giá:
                            </span>
                            <p className="text-sm text-gray-900">
                              #{review.id}
                            </p>
                          </div>
                        </div>
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
  );
}
