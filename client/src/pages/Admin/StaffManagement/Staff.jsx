import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, RefreshCw, Users } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useStaff } from "../../../hooks";
import LoadingState from "../../../components/LoadingState";
import ErrorState from "../../../components/ErrorState";
import {
  StatsCards,
  SearchFilter,
  StaffTable,
  Pagination,
  EmptyState,
} from "./components";

export default function Staff() {
  const navigate = useNavigate();
  const {
    staff,
    stats,
    loading,
    error,
    deleteStaff,
    toggleStaffStatus,
    fetchStaff,
  } = useStaff();
  const [deleting, setDeleting] = useState(null);
  const [toggling, setToggling] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter and search
  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.phone && member.phone.includes(searchTerm)) ||
        (member.specialization &&
          member.specialization
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
      const matchesStatus =
        filterStatus === "all" || member.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [staff, searchTerm, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedStaff = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStaff, currentPage, itemsPerPage]);

  // Handlers
  const resetPage = () => setCurrentPage(1);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    resetPage();
  };

  const handleFilterChange = (value) => {
    setFilterStatus(value);
    resetPage();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    resetPage();
  };

  const handleToggleStatus = async (staffId, currentStatus, staffName) => {
    const action = currentStatus === "active" ? "tắt hoạt động" : "kích hoạt";
    if (window.confirm(`Bạn có chắc chắn muốn ${action} thợ "${staffName}"?`)) {
      try {
        setToggling(staffId);
        const result = await toggleStaffStatus(staffId, currentStatus);
        toast.success(result.message || "Cập nhật trạng thái thành công");
      } catch (err) {
        toast.error(err.error || "Thay đổi trạng thái thất bại");
      } finally {
        setToggling(null);
      }
    }
  };

  const handleDelete = async (staffId, staffName) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa thợ "${staffName}"? Hành động này không thể hoàn tác.`
      )
    ) {
      try {
        setDeleting(staffId);
        const result = await deleteStaff(staffId);
        toast.success(result.message || "Xóa thợ thành công");
      } catch (err) {
        toast.error(err.error || "Xóa thợ thất bại");
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchStaff} />;

  const hasActiveFilters = searchTerm || filterStatus !== "all";

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-teal-100 rounded-lg">
              <Users className="h-6 w-6 text-teal-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">Quản lý thợ</h1>
              <p className="text-gray-600 mt-1">
                Quản lý thông tin thợ cắt tóc
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchStaff}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              title="Làm mới"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/admin/staff/add")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <UserPlus className="h-4 w-4" />
              Thêm thợ
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        resultsCount={paginatedStaff.length}
        totalCount={filteredStaff.length}
      />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Staff Table */}
      {filteredStaff.length > 0 ? (
        <>
          <StaffTable
            staff={paginatedStaff}
            onEdit={(member) => navigate(`/admin/staff/edit/${member.id}`)}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            deleting={deleting}
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
