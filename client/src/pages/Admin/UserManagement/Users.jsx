import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, RefreshCw, Users as UsersIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useUsers } from "../../../hooks";
import LoadingState from "../../../components/LoadingState";
import ErrorState from "../../../components/ErrorState";
import {
  StatsCards,
  SearchFilter,
  UserTable,
  Pagination,
  EmptyState,
} from "./components";

export default function Users() {
  const navigate = useNavigate();
  const { users, loading, error, toggleUserStatus, fetchUsers } = useUsers();
  const [toggling, setToggling] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter and search
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.phone && user.phone.includes(searchTerm));
      const matchesRole = filterRole === "all" || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Handlers
  const resetPage = () => setCurrentPage(1);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    resetPage();
  };

  const handleFilterChange = (value) => {
    setFilterRole(value);
    resetPage();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterRole("all");
    resetPage();
  };

  const handleToggleStatus = async (userId, currentStatus, userName) => {
    const action = currentStatus === "active" ? "khóa" : "mở khóa";
    if (
      window.confirm(
        `Bạn có chắc chắn muốn ${action} người dùng "${userName}"?`
      )
    ) {
      try {
        setToggling(userId);
        const result = await toggleUserStatus(userId, currentStatus);
        toast.success(result.message);
      } catch (err) {
        toast.error(err.error || "Thay đổi trạng thái thất bại");
      } finally {
        setToggling(null);
      }
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchUsers} />;

  const hasActiveFilters = searchTerm || filterRole !== "all";

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Quản lý người dùng
              </h1>
              <p className="text-gray-600 mt-1">Quản lý thông tin khách hàng</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchUsers}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              title="Làm mới"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/admin/users/add")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <UserPlus className="h-4 w-4" />
              Thêm người dùng
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        searchTerm={searchTerm}
        filterRole={filterRole}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        resultsCount={paginatedUsers.length}
        totalCount={filteredUsers.length}
      />

      {/* Stats Cards */}
      <StatsCards users={users} />

      {/* User Table */}
      {filteredUsers.length > 0 ? (
        <>
          <UserTable
            users={paginatedUsers}
            onEdit={(user) => navigate(`/admin/users/edit/${user.id}`)}
            onToggleStatus={handleToggleStatus}
            toggling={toggling}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyState hasFilters={hasActiveFilters} />
      )}
    </div>
  );
}
