exports.generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

exports.formatDate = (date) => {
  return new Date(date).toLocaleString("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
};