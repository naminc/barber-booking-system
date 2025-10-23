import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Phone,
  Briefcase,
  Clock,
  ArrowLeft,
  Save,
  X,
  Loader2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import staffApi from "../../../api/staffApi";
import { useStaff } from "../../../hooks";
import ImageUpload from "../../../components/ImageUpload";

export default function EditStaff() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateStaff } = useStaff();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    specialization: "",
    experience: "",
    image: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        const response = await staffApi.getStaffById(id);

        // Handle different response formats
        let staffData;
        if (response && response.id) {
          staffData = response;
        } else if (response.data && response.data.id) {
          staffData = response.data;
        }

        if (staffData) {
          setForm({
            name: staffData.name || "",
            phone: staffData.phone || "",
            specialization: staffData.specialization || "",
            experience: staffData.experience || "",
            image: staffData.image || "",
            status: staffData.status || "active",
          });
        } else {
          toast.error("Không tìm thấy thợ");
          navigate("/admin/staff");
        }
      } catch (err) {
        console.error("Error fetching staff:", err);
        toast.error("Không thể tải thông tin thợ");
        navigate("/admin/staff");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStaffData();
    }
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/admin/staff");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!form.specialization) {
      newErrors.specialization = "Vui lòng chọn chuyên môn";
    }

    if (!form.experience) {
      newErrors.experience = "Vui lòng chọn kinh nghiệm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin");
      return;
    }

    try {
      setSubmitting(true);

      const submitData = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        specialization: form.specialization,
        experience: form.experience,
        image: form.image,
        status: form.status,
      };

      const result = await updateStaff(parseInt(id), submitData);
      toast.success(result.message || "Cập nhật thợ thành công!");

      setTimeout(() => {
        navigate("/admin/staff");
      }, 1000);
    } catch (err) {
      toast.error(err.error || "Cập nhật thợ thất bại");
      console.error("Error updating staff:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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

      {/* Header */}
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
              Chỉnh sửa thợ
            </h1>
            <p className="text-gray-600">Cập nhật thông tin thợ cắt tóc</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Thông tin cá nhân
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Họ và tên *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900`}
                    placeholder="Nhập họ và tên"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Số điện thoại *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900`}
                    placeholder="0123456789"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-green-600" />
              Thông tin chuyên môn
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Specialization */}
              <div>
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Chuyên môn *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="specialization"
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.specialization
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900`}
                  >
                    <option value="">Chọn chuyên môn</option>
                    <option value="Cắt tóc">Cắt tóc</option>
                    <option value="Cắt râu mày">Cắt râu mày</option>
                    <option value="Tạo kiểu">Tạo kiểu</option>
                    <option value="Gội đầu">Gội đầu</option>
                    <option value="Tất cả dịch vụ">Tất cả dịch vụ</option>
                  </select>
                </div>
                {errors.specialization && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.specialization}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Kinh nghiệm *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="experience"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.experience ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900`}
                  >
                    <option value="">Chọn kinh nghiệm</option>
                    <option value="Dưới 1 năm">Dưới 1 năm</option>
                    <option value="1-2 năm">1-2 năm</option>
                    <option value="2-5 năm">2-5 năm</option>
                    <option value="5-10 năm">5-10 năm</option>
                    <option value="Trên 10 năm">Trên 10 năm</option>
                  </select>
                </div>
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.experience}
                  </p>
                )}
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
                  Hình ảnh thợ
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
