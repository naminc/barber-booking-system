import { Search, Filter } from "lucide-react";

export default function SearchFilter({
  searchTerm,
  filterRole,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  resultsCount,
  totalCount,
}) {
  const hasActiveFilters = searchTerm || filterRole !== "all";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
        </div>

        {/* Filter by Role */}
        <div className="w-full md:w-48">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => onFilterChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="user">Khách hàng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-3 text-sm text-gray-600">
        Hiển thị {resultsCount} / {totalCount} người dùng
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>
    </div>
  );
}
