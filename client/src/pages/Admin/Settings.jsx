import { useState, useEffect } from "react";
import {
  Save,
  Settings as SettingsIcon,
  Globe,
  Tag,
  Link,
  Phone,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useSettingsContext } from "../../context/SettingsContext";

export default function Settings() {
  const {
    settings: contextSettings,
    loading,
    error,
    updateSettings: updateContextSettings,
    fetchSettings,
  } = useSettingsContext();

  const [settings, setSettings] = useState({});
  const [initialSettings, setInitialSettings] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (contextSettings) {
      setSettings(contextSettings);
      setInitialSettings(contextSettings);
    }
  }, [contextSettings]);

  const hasChanges = () => {
    return JSON.stringify(settings) !== JSON.stringify(initialSettings);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await updateContextSettings(settings);
      setInitialSettings(settings);
      await fetchSettings();
      toast.success("Cập nhật thành công!");
    } catch (err) {
      toast.error(err.message || "Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-12 w-12 text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="text-red-500 text-lg font-semibold">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tải lại trang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

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
              value={settings.title || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="Nhập tiêu đề website..."
              required
            />
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
              value={settings.keywords || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="barber, salon, haircut, booking, cắt tóc nam, đặt lịch..."
            />
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
              value={settings.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="Mô tả ngắn về website..."
            />
          </div>
          {/* Tên website */}
          <div>
            <label
              htmlFor="websiteName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-gray-400 mr-1" />
                Tên website
              </div>
            </label>
            <input
              type="text"
              id="websiteName"
              name="websiteName"
              value={settings.websiteName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="NAMINC"
            />
          </div>

          {/* Tên website */}
          <div>
            <label
              htmlFor="slogan"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 text-gray-400 mr-1" />
                Slogan
              </div>
            </label>
            <input
              type="text"
              id="slogan"
              name="slogan"
              value={settings.slogan || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="Nhập slogan của website..."
            />
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
              value={settings.domain || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="https://naminc.dev"
            />
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
              value={settings.phone || ""}
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
              value={settings.email || ""}
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
              value={settings.address || ""}
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
              value={settings.owner || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-colors"
              placeholder="Ngo Dinh Nam"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-end">
          <button
            type="submit"
            onClick={handleSave}
            disabled={submitting || !hasChanges()}
            className="flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
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
