import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Scissors,
  CalendarDays,
  Settings,
  X,
  Users,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar({ isOpen, onClose }) {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const menuItems = [
    {
      name: "Bảng điều khiển",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      description: "Tổng quan và phân tích",
    },
    {
      name: "Dịch vụ",
      path: "/admin/services",
      icon: Scissors,
      description: "Quản lý dịch vụ",
    },
    {
      name: "Lịch hẹn",
      path: "/admin/bookings",
      icon: CalendarDays,
      description: "Quản lý lịch hẹn",
    },
    {
      name: "Thợ",
      path: "/admin/staff",
      icon: Users,
      description: "Quản lý thợ",
    },
    {
      name: "Người dùng",
      path: "/admin/users",
      icon: Users,
      description: "Quản lý người dùng",
    },
    {
      name: "Liên hệ",
      path: "/admin/contacts",
      icon: MessageCircle,
      description: "Quản lý liên hệ",
    },
    {
      name: "Cài đặt",
      path: "/admin/settings",
      icon: Settings,
      description: "Cài đặt hệ thống",
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-gray-900 pt-5 pb-4 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Scissors className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <h1 className="text-white text-lg font-semibold">ADMIN</h1>
                </div>
              </div>
            </div>

            <nav className="mt-8 flex-1 px-2 space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-white"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Footer */}
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || "Admin"
                    )}&background=3b82f6&color=fff`}
                    alt={user?.name || "Admin"}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user?.email || "admin@admin.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col w-64 h-full bg-gray-900">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Scissors className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-3 text-white text-lg font-semibold">ADMIN</h1>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-md p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile footer */}
          <div className="flex-shrink-0 border-t border-gray-700 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || "Admin"
                  )}&background=3b82f6&color=fff`}
                  alt={user?.name || "Admin"}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-400">
                  {user?.email || "admin@admin.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
