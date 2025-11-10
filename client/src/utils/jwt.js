export const decodeToken = (token) => {
  try {
    if (!token) return null;

    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  // exp là thời gian hết hạn token, Date.now() là thời gian hiện tại
  const currentTime = Date.now() / 1000;

  // Token hết hạn nếu exp nhỏ hơn thời gian hiện tại
  // Thêm một khoảng thời gian nhỏ (5 giây) để tính đến sự khác biệt của đồng hồ
  return decoded.exp < currentTime - 5;
};

export const getTokenExpiration = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return null;

  return new Date(decoded.exp * 1000);
};

// Tính thời gian còn lại của token (milliseconds)
export const getTokenTimeRemaining = (token) => {
  if (!token) return 0;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return 0;

  const currentTime = Date.now() / 1000;
  const timeRemaining = (decoded.exp - currentTime) * 1000; // Chuyển sang milliseconds

  return Math.max(0, timeRemaining);
};
