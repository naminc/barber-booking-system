import { Star, Filter } from "lucide-react";

export default function EmptyState({ hasFilters }) {
  if (hasFilters) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <Filter className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Không tìm thấy kết quả
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Không có đánh giá nào khớp với bộ lọc hiện tại. Hãy thử thay đổi bộ
            lọc hoặc xóa bộ lọc.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
      <div className="text-center">
        <Star className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Chưa có đánh giá
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Hiện tại chưa có đánh giá nào trong hệ thống.
        </p>
      </div>
    </div>
  );
}
