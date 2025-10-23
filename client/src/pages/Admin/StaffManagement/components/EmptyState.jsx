import { Users } from "lucide-react";

export default function EmptyState({ hasFilters }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {hasFilters ? "Không tìm thấy kết quả" : "Chưa có thợ nào"}
        </h3>
        <p className="text-gray-600 max-w-sm">
          {hasFilters
            ? "Thử thay đổi bộ lọc hoặc tìm kiếm để xem kết quả khác"
            : "Bắt đầu bằng cách thêm thợ đầu tiên vào hệ thống"}
        </p>
      </div>
    </div>
  );
}
