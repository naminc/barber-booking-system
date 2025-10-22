import { Scissors } from "lucide-react";

export default function EmptyState({ hasFilters }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="text-center py-12">
        <Scissors className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Không tìm thấy dịch vụ
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {hasFilters
            ? "Không có kết quả phù hợp với bộ lọc. Thử điều chỉnh tìm kiếm."
            : "Chưa có dịch vụ nào trong hệ thống."}
        </p>
      </div>
    </div>
  );
}

