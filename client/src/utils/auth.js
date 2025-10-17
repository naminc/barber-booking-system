import axiosClient from "../api/axiosClient";

export const logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  delete axiosClient.defaults.headers.common["Authorization"];
  navigate("/login", { replace: true });
};