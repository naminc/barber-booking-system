import { useState } from "react";
import {
  Save,
  Settings as SettingsIcon,
  Globe,
  Tag,
  Link,
  Phone,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Settings() {
  const [form, setForm] = useState({
    title: "Barber Booking",
    keywords: "barber, booking, hair, salon, cắt tóc nam, đặt lịch",
    domain: "http://localhost:5173",
    description: "Professional barber booking platform for modern salons",
    owner: "Ngo Dinh Nam",
    phone: "+84 909 090 909",
    email: "admin@naminc.dev",
    address: "615 Âu Cơ, Phú Trung, Tân Phú, TP.HCM",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Cập nhật thành công!");
    } catch (error) {
      toast.error("Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      title: "Barber Booking",
      keywords: "barber, booking, hair, salon, cắt tóc nam, đặt lịch",
      domain: "http://localhost:5173",
      description: "Professional barber booking platform for modern salons",
      phone: "+84 909 090 909",
      email: "admin@naminc.dev",
      owner: "Ngo Dinh Nam",
      address: "615 Âu Cơ, Phú Trung, Tân Phú, TP.HCM",
    });
    toast.success("Đặt lại thành công");
  };

  return (
    <div className="space-y-6">
      <Toaster />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-lg">
            <SettingsIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
            <p className="text-gray-600 mt-1">Quản lý cài đặt hệ thống</p>
          </div>
        </div>
      </div>

      {/* Website Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Cấu hình website
            </h2>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          {/* Website Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tiêu đề website
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="Nhập tiêu đề website..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Đây sẽ là tiêu đề của trang web trong các tab và kết quả tìm kiếm
            </p>
          </div>

          <div>
            <label
              htmlFor="keywords"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <div className="flex items-center">
                <Tag className="h-4 w-4 text-gray-400 mr-1" />
                Từ khóa SEO
              </div>
            </label>
            <textarea
              id="keywords"
              name="keywords"
              rows={3}
              value={form.keywords}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="barber, salon, haircut, booking, cắt tóc nam, đặt lịch..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Phân tách từ khóa bằng dấu phẩy. Các từ khóa này giúp tối ưu hóa
              tìm kiếm của trang web
            </p>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mô tả website
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="Mô tả ngắn về website..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Đây sẽ là mô tả của trang web trong kết quả tìm kiếm
            </p>
          </div>

          {/* Domain */}
          <div>
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <div className="flex items-center">
                <Link className="h-4 w-4 text-gray-400 mr-1" />
                Tên miền
              </div>
            </label>
            <input
              type="url"
              id="domain"
              name="domain"
              value={form.domain}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="https://naminc.dev"
            />
            <p className="mt-1 text-sm text-gray-500">
              Đây là tên miền chính của trang web
            </p>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Thông tin liên hệ
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="+84 909 090 909"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="info@naminc.dev"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Địa chỉ
            </label>
            <textarea
              id="address"
              name="address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="615 Âu Cơ, Phú Trung, Tân Phú, TP.HCM"
            />
          </div>
          {/* Owner */}
          <div>
            <label
              htmlFor="owner"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tên chủ sở hữu
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={form.owner}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="Ngo Dinh Nam"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Đặt lại mặc định
          </button>

          <button
            type="submit"
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
