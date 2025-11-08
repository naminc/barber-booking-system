export const formatPhoneForTel = (phone) => {
  if (!phone) return "";
  let formatted = phone.replace(/[\s\(\)\-]/g, "");
  if (formatted.startsWith("+84")) {
    formatted = "0" + formatted.substring(3);
  }
  return formatted;
};
export const formatPhoneForDisplay = (phone) => {
  return phone || "";
};
