import { useState, useMemo } from "react";
import { Star, RefreshCw } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useReviews } from "../../../hooks";
import LoadingState from "../../../components/LoadingState";
import ErrorState from "../../../components/ErrorState";
import {
  StatsCards,
  SearchFilter,
  ReviewTable,
  Pagination,
  EmptyState,
} from "./components";

export default function Reviews() {
  const {
    reviews,
    loading,
    error,
    updateReviewStatus,
    deleteReview,
    fetchReviews,
  } = useReviews();
  const [toggling, setToggling] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [expandedId, setExpandedId] = useState(null);

  // Filter and search
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.staff_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || review.status === filterStatus;
      const matchesRating =
        filterRating === "all" || review.rating === parseInt(filterRating);
      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [reviews, searchTerm, filterStatus, filterRating]);

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredReviews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredReviews, currentPage, itemsPerPage]);

  // Handlers
  const resetPage = () => setCurrentPage(1);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    resetPage();
  };

  const handleStatusChange = (value) => {
    setFilterStatus(value);
    resetPage();
  };

  const handleRatingChange = (value) => {
    setFilterRating(value);
    resetPage();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterRating("all");
    resetPage();
  };

  const handleToggleStatus = async (reviewId, currentStatus, userName) => {
    const action = currentStatus === "approved" ? "từ chối" : "duyệt";
    if (
      window.confirm(
        `Bạn có chắc chắn muốn ${action} đánh giá của "${userName}"?`
      )
    ) {
      try {
        setToggling(reviewId);
        const result = await updateReviewStatus(reviewId, currentStatus);
        toast.success(result.message);
      } catch (err) {
        toast.error(err.error || "Thay đổi trạng thái thất bại");
      } finally {
        setToggling(null);
      }
    }
  };

  const handleDelete = async (reviewId, userName) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa đánh giá của "${userName}"? Hành động này không thể hoàn tác.`
      )
    ) {
      try {
        setDeleting(reviewId);
        const result = await deleteReview(reviewId);
        toast.success(result.message);
      } catch (err) {
        toast.error(err.error || "Xóa đánh giá thất bại");
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleToggleExpand = (reviewId) => {
    setExpandedId(expandedId === reviewId ? null : reviewId);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchReviews} />;

  const hasActiveFilters =
    searchTerm || filterStatus !== "all" || filterRating !== "all";

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Quản lý đánh giá
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý và kiểm duyệt đánh giá từ khách hàng
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchReviews}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              title="Làm mới"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        filterRating={filterRating}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onRatingChange={handleRatingChange}
        onClearFilters={handleClearFilters}
        resultsCount={paginatedReviews.length}
        totalCount={filteredReviews.length}
      />

      {/* Stats Cards */}
      <StatsCards reviews={reviews} />

      {/* Review Table */}
      {filteredReviews.length > 0 ? (
        <>
          <ReviewTable
            reviews={paginatedReviews}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            toggling={toggling}
            deleting={deleting}
            expandedId={expandedId}
            onToggleExpand={handleToggleExpand}
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
