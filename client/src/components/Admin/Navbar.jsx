import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Search, LogOut } from "lucide-react";
import { logout } from "../../utils/auth";

export default function AdminNavbar({ onToggleSidebar, sidebarOpen }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      logout(navigate);
    }
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Mở sidebar</span>
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm lịch hẹn, người dùng..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 focus:bg-white sm:text-sm transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Admin"
                  />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">admin@naminc.dev</p>
                </div>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
