export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  return `${apiUrl.replace("/api", "")}${imagePath}`;
};

export const getServiceIcon = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("cắt")) return "✂️";
  if (lowerName.includes("râu") || lowerName.includes("cạo")) return "🪒";
  if (lowerName.includes("uốn")) return "💇";
  if (lowerName.includes("nhuộm") || lowerName.includes("màu")) return "🎨";
  if (lowerName.includes("gội") || lowerName.includes("massage")) return "🧴";
  if (lowerName.includes("combo")) return "💫";
  return "✨";
};
