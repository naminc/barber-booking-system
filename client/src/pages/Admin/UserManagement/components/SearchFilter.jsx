import { Search, X, Filter } from "lucide-react";

export default function SearchFilter({
  searchTerm,
  filterRole,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  resultsCount,
  totalCount,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          {/* Filter by Role */}
          <div className="relative sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => onFilterChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="user">Khách hàng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
        </div>

        {/* Clear Filters & Results Count */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Hiển thị <span className="font-semibold">{resultsCount}</span> /{" "}
            <span className="font-semibold">{totalCount}</span> kết quả
          </div>
          {(searchTerm || filterRole !== "all") && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="h-4 w-4" />
              Xóa lọc
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
