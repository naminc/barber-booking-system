import { RefreshCw } from "lucide-react";

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tải lại
        </button>
      </div>
    </div>
  );
}
