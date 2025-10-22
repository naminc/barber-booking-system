import { Loader2 } from "lucide-react";

export default function LoadingState({ message = "Đang tải dữ liệu..." }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}