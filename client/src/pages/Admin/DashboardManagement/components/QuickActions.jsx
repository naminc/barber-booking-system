import { useNavigate } from "react-router-dom";
import { Calendar, Users, Scissors } from "lucide-react";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Hành động nhanh
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/admin/bookings/add")}
          className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
        >
          <Calendar className="h-6 w-6 text-blue-500 mr-2" />
          <span className="text-gray-700 font-medium">Thêm lịch hẹn</span>
        </button>
        <button
          onClick={() => navigate("/admin/staff/add")}
          className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
        >
          <Users className="h-6 w-6 text-green-500 mr-2" />
          <span className="text-gray-700 font-medium">Thêm thợ</span>
        </button>
        <button
          onClick={() => navigate("/admin/services/add")}
          className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
        >
          <Scissors className="h-6 w-6 text-purple-500 mr-2" />
          <span className="text-gray-700 font-medium">Thêm dịch vụ</span>
        </button>
      </div>
    </div>
  );
}

