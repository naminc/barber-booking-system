import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Scissors,
  DollarSign,
  Clock,
  FileText,
  ArrowLeft,
  Save,
  X,
  Loader2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useServices } from "../../../hooks";
import ImageUpload from "../../../components/ImageUpload";

export default function EditService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { services, updateService } = useServices();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image: "",
    status: "active",
  });

  useEffect(() => {
    const service = services.find((s) => s.id === parseInt(id));
    if (service) {
      setForm({
        name: service.name || "",
        description: service.description || "",
        price: service.price || "",
        duration: service.duration || "",
        image: service.image || "",
        status: service.status || "active",
      });
      setLoading(false);
    } else if (services.length > 0) {
      toast.error("Không tìm thấy dịch vụ");
      navigate("/admin/services");
    }
  }, [id, services, navigate]);

  const handleBack = () => {
    navigate("/admin/services");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Vui lòng nhập tên dịch vụ");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Vui lòng nhập mô tả");
      return;
    }
    if (!form.price || form.price <= 0) {
      toast.error("Vui lòng nhập giá hợp lệ");
      return;
    }
    if (!form.duration || form.duration <= 0) {
      toast.error("Vui lòng nhập thời gian hợp lệ");
      return;
    }

    try {
      setSubmitting(true);
      const updateData = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        duration: parseInt(form.duration),
        image: form.image || "",
        status: form.status,
      };

      await updateService(parseInt(id), updateData);
      toast.success("Cập nhật dịch vụ thành công!");
      setTimeout(() => {
        navigate("/admin/services");
      }, 1000);
    } catch (err) {
      toast.error(err.error || "Cập nhật dịch vụ thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Chỉnh sửa dịch vụ
            </h1>
            <p className="text-gray-600">
              Cập nhật thông tin dịch vụ
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Service Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Scissors className="h-5 w-5 text-blue-600" />
              Thông tin dịch vụ
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tên dịch vụ *
                </label>
                <div className="relative">
                  <Scissors className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    placeholder="Nhập tên dịch vụ"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Giá dịch vụ *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    placeholder="70000"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">Giá tính bằng VNĐ</p>
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Thời gian thực hiện *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    min="1"
                    max="300"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    placeholder="30"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">Thời gian tính bằng phút</p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mô tả dịch vụ *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-gray-900"
                    placeholder="Mô tả chi tiết về dịch vụ"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Trạng thái
                </label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh dịch vụ
                </label>
                <ImageUpload
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="h-4 w-4" />
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Cập nhật
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

