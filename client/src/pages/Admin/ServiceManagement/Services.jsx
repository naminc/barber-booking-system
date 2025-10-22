import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, RefreshCw } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useServices } from "../../../hooks";
import LoadingState from "../../../components/LoadingState";
import ErrorState from "../../../components/ErrorState";
import {
  StatsCards,
  SearchFilter,
  ServiceTable,
  Pagination,
  EmptyState,
} from "./components";

export default function Services() {
  const navigate = useNavigate();
  const { services, loading, error, deleteService, fetchServices } =
    useServices();
  const [deleting, setDeleting] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter and search
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.description &&
          service.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus =
        filterStatus === "all" || service.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [services, searchTerm, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredServices, currentPage, itemsPerPage]);

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

  const handleDeleteService = async (serviceId, serviceName) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa dịch vụ "${serviceName}"? Hành động này không thể hoàn tác.`
      )
    ) {
      try {
        setDeleting(serviceId);
        const result = await deleteService(serviceId);
        toast.success(result.message);
      } catch (err) {
        toast.error(err.error || "Xóa dịch vụ thất bại");
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchServices} />;

  const hasActiveFilters = searchTerm || filterStatus !== "all";

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Quản lý dịch vụ
            </h1>
            <p className="text-gray-600 mt-1">Quản lý dịch vụ của cửa hàng</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchServices}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              title="Làm mới"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/admin/services/add")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-4 w-4" />
              Thêm dịch vụ
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
        resultsCount={paginatedServices.length}
        totalCount={filteredServices.length}
      />

      {/* Stats Cards */}
      <StatsCards services={services} />

      {/* Service Table */}
      {filteredServices.length > 0 ? (
        <>
          <ServiceTable
            services={paginatedServices}
            onEdit={(service) => navigate(`/admin/services/edit/${service.id}`)}
            onDelete={handleDeleteService}
            deleting={deleting}
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
