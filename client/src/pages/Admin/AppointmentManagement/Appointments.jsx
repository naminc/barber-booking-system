import { useState, useEffect } from "react";
import { Calendar, RefreshCw, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAppointments } from "../../../hooks";
import LoadingState from "../../../components/LoadingState";
import ErrorState from "../../../components/ErrorState";
import {
  StatsCards,
  AppointmentTable,
  SearchFilter,
  Pagination,
} from "./components";

export default function Appointments() {
  const navigate = useNavigate();
  const {
    appointments,
    loading,
    error,
    fetchAllAppointments,
    updateAppointmentStatus,
    deleteAppointment,
  } = useAppointments();

  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAllAppointments();
  }, [fetchAllAppointments]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdating(id);
      await updateAppointmentStatus(id, newStatus);
      toast.success("Cập nhật trạng thái thành công");
      await fetchAllAppointments();
    } catch (err) {
      toast.error(err.error || "Cập nhật trạng thái thất bại");
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Bạn có chắc chắn muốn xóa lịch hẹn này? Hành động này không thể hoàn tác."
      )
    ) {
      return;
    }

    try {
      setDeleting(id);
      const result = await deleteAppointment(id);
      toast.success(result.message || "Xóa lịch hẹn thành công");
    } catch (err) {
      toast.error(err.error || "Xóa lịch hẹn thất bại");
    } finally {
      setDeleting(null);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchAllAppointments();
      toast.success("Đã làm mới danh sách lịch hẹn");
    } catch (err) {
      toast.error("Không thể làm mới danh sách");
    } finally {
      setRefreshing(false);
    }
  };

  // Filter and search
  const filteredAppointments = appointments.filter((appointment) => {
    // Status filter
    if (statusFilter && appointment.status !== statusFilter) {
      return false;
    }

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesCustomerName = appointment.customer_name
        ?.toLowerCase()
        .includes(search);
      const matchesPhone = appointment.customer_phone?.includes(search);
      const matchesService = appointment.service_name
        ?.toLowerCase()
        .includes(search);
      const matchesStaff = appointment.staff_name
        ?.toLowerCase()
        .includes(search);

      return (
        matchesCustomerName || matchesPhone || matchesService || matchesStaff
      );
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchAllAppointments} />;

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Quản lý lịch hẹn
              </h1>
              <p className="text-gray-600 mt-1">
                Xem và quản lý lịch hẹn khách hàng
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
              title="Làm mới"
            >
              <RefreshCw
                className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={() => navigate("/admin/bookings/add")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-4 w-4" />
              Thêm lịch hẹn
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        totalCount={appointments.length}
        filteredCount={filteredAppointments.length}
      />

      {/* Stats Cards */}
      <StatsCards appointments={appointments} />

      {/* Appointments Table */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chưa có lịch hẹn
          </h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter
              ? "Không tìm thấy lịch hẹn nào khớp với tiêu chí tìm kiếm"
              : "Chưa có lịch hẹn nào trong hệ thống"}
          </p>
        </div>
      ) : (
        <>
          <AppointmentTable
            appointments={paginatedAppointments}
            onUpdateStatus={handleStatusChange}
            onDelete={handleDelete}
            updating={updating}
            deleting={deleting}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredAppointments.length}
          />
        </>
      )}
    </div>
  );
}
