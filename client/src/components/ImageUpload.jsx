import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  
  // Nếu value là relative path, thêm base URL để hiển thị
  const getFullUrl = (url) => {
    if (!url) return "";
    if (url.startsWith('http')) return url;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${apiUrl.replace('/api', '')}${url}`;
  };
  
  const [preview, setPreview] = useState(getFullUrl(value));

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith('image/')) {
      alert('Chỉ chấp nhận file ảnh!');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File quá lớn! Tối đa 5MB');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${apiUrl}/upload/image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        // Lưu relative path vào DB - frontend sẽ tự thêm domain khi hiển thị
        onChange(data.imageUrl);
      } else {
        alert(data.error || 'Upload thất bại');
        setPreview(value || "");
      }
    } catch (err) {
      alert('Lỗi upload: ' + err.message);
      setPreview(value || "");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />

      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
        >
          {uploading ? (
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Nhấn để chọn ảnh</p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF (max 5MB)</p>
            </>
          )}
        </label>
      )}
    </div>
  );
}

